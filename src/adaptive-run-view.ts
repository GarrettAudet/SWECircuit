import type {
  AdaptiveRoute,
  AdaptiveRunInspection,
  RunView,
  RunViewStatus,
} from "./adaptive-run-types.js";
import { boundedJsonUtf8ByteLength, digestCanonicalJson } from "./canonical-json.js";
import { ADAPTIVE_RUN_API_VERSION, ADAPTIVE_RUN_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { snapshotJsonValue } from "./snapshot.js";
import type { OperationResult } from "./types.js";

const ARTIFACT = "adaptive-run-view.json";
const INSPECTION_DOMAIN = "swecircuit/adaptive-run/inspection/v1alpha1";
const VIEW_DOMAIN = "swecircuit/adaptive-run/run-view/v1alpha1";
const PLACEHOLDER_DIGEST = `sha256:${"0".repeat(64)}`;

type JsonValue = Parameters<typeof digestCanonicalJson>[1];
type Discriminator = Readonly<{ apiVersion?: unknown; kind?: unknown }>;

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed RunView is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function validateInspection(value: unknown): AdaptiveRunInspection | null {
  const candidate = value as Discriminator;
  if (
    candidate.apiVersion !== ADAPTIVE_RUN_API_VERSION ||
    candidate.kind !== "AdaptiveRunInspection"
  ) {
    return null;
  }
  const inspection = value as AdaptiveRunInspection;
  const { contentDigest, ...base } = inspection;
  return contentDigest === digestCanonicalJson(INSPECTION_DOMAIN, asJson(base)) ? inspection : null;
}

function validateRunView(value: unknown): RunView | null {
  const candidate = value as Discriminator;
  if (candidate.apiVersion !== ADAPTIVE_RUN_API_VERSION || candidate.kind !== "RunView") {
    return null;
  }
  const view = value as RunView;
  const { contentDigest, ...base } = view;
  return contentDigest === digestCanonicalJson(VIEW_DOMAIN, asJson(base)) ? view : null;
}

function stableStatus(inspection: AdaptiveRunInspection): RunViewStatus {
  if (inspection.integrationReady) return "Ready to integrate";
  if (inspection.stage === "host_active") return "Running (host-reported)";
  if (inspection.stage === "needs_attention") return "Needs attention";
  if (inspection.stage === "awaiting_authorization") return "Ready";
  return "Planning";
}

function isBlocker(route: AdaptiveRoute): boolean {
  return route.outcome !== "pass";
}

export function renderAdaptiveRunView(input: unknown): OperationResult<RunView> {
  try {
    const snapshot = snapshotJsonValue(input);
    if (snapshot.failure !== null || snapshot.value === null) {
      return operationResult<RunView>([createDiagnostic("SC4601", ARTIFACT)], null);
    }
    const existing = validateRunView(snapshot.value);
    if (existing !== null) {
      return operationResult<RunView>([], freezeJson(existing));
    }
    const inspection = validateInspection(snapshot.value);
    if (inspection === null) {
      return operationResult<RunView>([createDiagnostic("SC4601", ARTIFACT)], null);
    }
    const base: Omit<RunView, "contentDigest"> = {
      apiVersion: ADAPTIVE_RUN_API_VERSION,
      kind: "RunView",
      runId: inspection.runId,
      runRevision: inspection.runRevision,
      stage: inspection.stage,
      status: stableStatus(inspection),
      sessionDigest: inspection.sessionDigest,
      assignmentDigest: inspection.assignmentDigest,
      compilationDigest: inspection.compilationDigest,
      packageDigest: inspection.packageDigest,
      executionMode: inspection.executionMode,
      agents: [...inspection.agents].sort((left, right) =>
        left.agentId < right.agentId ? -1 : left.agentId > right.agentId ? 1 : 0,
      ),
      routes: inspection.routes,
      blockers: inspection.routes.filter(isBlocker),
      nextAction: inspection.nextActions.find((entry) => entry.availability === "enabled") ?? null,
      nextActions: inspection.nextActions,
      integrationReady: inspection.integrationReady,
      sourceInspectionDigest: inspection.contentDigest,
    };
    if (
      boundedJsonUtf8ByteLength(
        asJson({ ...base, contentDigest: PLACEHOLDER_DIGEST }),
        ADAPTIVE_RUN_LIMITS.maxRunViewBytes,
      ) === null
    ) {
      return operationResult<RunView>([createDiagnostic("SC4602", ARTIFACT)], null);
    }
    return operationResult<RunView>(
      [],
      freezeJson({
        ...base,
        contentDigest: digestCanonicalJson(VIEW_DOMAIN, asJson(base)),
      }),
    );
  } catch {
    return operationResult<RunView>([createDiagnostic("SC9001", ARTIFACT)], null);
  }
}

function cell(value: unknown): string {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

export function renderAdaptiveRunViewMarkdown(input: unknown): OperationResult<string> {
  const rendered = renderAdaptiveRunView(input);
  if (!rendered.ok || rendered.value === null) {
    return operationResult<string>(rendered.diagnostics, null);
  }
  try {
    const view = rendered.value;
    const lines = [
      `# Adaptive Run ${cell(view.runId)}`,
      "",
      `Status: ${cell(view.status)}; stage: ${cell(view.stage)}.`,
      `Next action: ${cell(view.nextAction?.kind ?? "none")}.`,
      `Assignment: ${cell(view.assignmentDigest)}.`,
      "",
      "## Assignments",
      "| Agent | Profile | Effort | Native status | Truth |",
      "|---|---|---|---|---|",
      ...view.agents.map(
        (agent) =>
          `| ${cell(agent.agentId)} | ${cell(agent.profileId)} | ${cell(agent.effortId)} | ${cell(agent.native.status)} | ${cell(agent.truth)} |`,
      ),
      "",
      "## Routing Detail",
      ...view.agents.flatMap((agent) => [
        `- ${cell(agent.agentId)}: ${agent.assignment.alternatives.length} feasible alternative(s), ${agent.assignment.rejectedAlternatives.length} rejected.`,
        ...agent.assignment.rejectedAlternatives.map(
          (rejected) =>
            `  - ${cell(rejected.calibrationRowId)}: ${cell(rejected.rejectionCodes.join(", "))}.`,
        ),
      ]),
      "",
      "## Routes And Evidence",
      ...view.routes.map((route) => `- Route: ${cell(route.outcome)} (${cell(route.truth)}).`),
      ...view.agents.flatMap((agent) =>
        (agent.acceptedEvidence?.artifacts ?? []).map(
          (artifact) => `- Accepted artifact: ${cell(artifact.name)} (${cell(artifact.digest)}).`,
        ),
      ),
      "",
      `Source inspection: ${cell(view.sourceInspectionDigest)}. Host-reported status is not kernel proof.`,
    ];
    const markdown = lines.join("\n");
    if (boundedJsonUtf8ByteLength(asJson(markdown), ADAPTIVE_RUN_LIMITS.maxRunViewBytes) === null) {
      return operationResult<string>([createDiagnostic("SC4602", ARTIFACT)], null);
    }
    return operationResult<string>([], markdown);
  } catch {
    return operationResult<string>([createDiagnostic("SC9001", ARTIFACT)], null);
  }
}
