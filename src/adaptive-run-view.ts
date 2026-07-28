import type {
  AdaptiveRoute,
  AdaptiveRunInspection,
  RunView,
  RunViewStatus,
} from "./adaptive-run-types.js";
import { validateAdaptiveRunInspectionSchema } from "./adaptive-run-schema.js";
import { boundedJsonUtf8ByteLength, digestCanonicalJson } from "./canonical-json.js";
import { ADAPTIVE_RUN_API_VERSION, ADAPTIVE_RUN_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { snapshotJsonValue } from "./snapshot.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
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

function containsUnsafeText(value: JsonValue): boolean {
  if (typeof value === "string") {
    return containsControlCharacters(value) || containsLoneSurrogate(value);
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return value.some(containsUnsafeText);
  }
  return Object.values(value).some((entry) => containsUnsafeText(entry));
}

function validateInspection(
  value: unknown,
  expectedInspectionDigest: unknown,
): AdaptiveRunInspection | null {
  const candidate = value as Discriminator;
  if (
    candidate.apiVersion !== ADAPTIVE_RUN_API_VERSION ||
    candidate.kind !== "AdaptiveRunInspection"
  ) {
    return null;
  }
  if (
    validateAdaptiveRunInspectionSchema(asJson(value)).length > 0 ||
    containsUnsafeText(asJson(value))
  ) {
    return null;
  }
  const inspection = value as AdaptiveRunInspection;
  const { contentDigest, ...base } = inspection;
  return typeof expectedInspectionDigest === "string" &&
    /^sha256:[0-9a-f]{64}$/u.test(expectedInspectionDigest) &&
    contentDigest === expectedInspectionDigest &&
    contentDigest === digestCanonicalJson(INSPECTION_DOMAIN, asJson(base))
    ? inspection
    : null;
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

export function renderAdaptiveRunView(
  input: unknown,
  expectedInspectionDigest: unknown,
): OperationResult<RunView> {
  try {
    const snapshot = snapshotJsonValue(input);
    if (snapshot.failure !== null || snapshot.value === null) {
      return operationResult<RunView>([createDiagnostic("SC4601", ARTIFACT)], null);
    }
    const inspection = validateInspection(snapshot.value, expectedInspectionDigest);
    if (inspection === null) {
      return operationResult<RunView>([createDiagnostic("SC4601", ARTIFACT)], null);
    }
    const base: Omit<RunView, "contentDigest"> = {
      apiVersion: ADAPTIVE_RUN_API_VERSION,
      kind: "RunView",
      runId: inspection.runId,
      runRevision: inspection.runRevision,
      goal: inspection.goal,
      workspaceBaselineDigest: inspection.workspaceBaselineDigest,
      host: inspection.host,
      predecessorRun: inspection.predecessorRun,
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
      steering: inspection.steering,
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
    .replaceAll("\\", "\\\\")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(/([`*_[\]{}()#+\-.!|~])/gu, "\\$1")
    .replaceAll("\n", " ");
}

export function renderAdaptiveRunViewMarkdown(
  input: unknown,
  expectedInspectionDigest: unknown,
): OperationResult<string> {
  const rendered = renderAdaptiveRunView(input, expectedInspectionDigest);
  if (!rendered.ok || rendered.value === null) {
    return operationResult<string>(rendered.diagnostics, null);
  }
  try {
    const view = rendered.value;
    const lines = [
      `# Adaptive Run ${cell(view.runId)}`,
      "",
      `Goal: ${cell(view.goal.id)} r${cell(view.goal.revision)}; owner: ${cell(view.goal.integrationOwner)}.`,
      `Run revision: ${cell(view.runRevision)}; workspace version: ${cell(view.workspaceBaselineDigest)}.`,
      `Host: ${cell(view.host.hostId)} via ${cell(view.host.adapterId)}@${cell(view.host.adapterRevision)}.`,
      `Status: ${cell(view.status)}; stage: ${cell(view.stage)}; next: ${cell(view.nextAction?.kind ?? "none")}.`,
      `Predecessor: ${cell(view.predecessorRun?.runId ?? "none")}.`,
      "",
      "## Execution Mode",
      `Selected ${cell(view.executionMode.selectedCandidateId)} with ${cell(view.executionMode.selectedAgentCount)} agent(s).`,
      `Projected makespan: ${cell(view.executionMode.selectedMetrics.projectedMakespan)} vs serial ${cell(view.executionMode.serialBaselineMetrics.projectedMakespan)}; peak concurrency: ${cell(view.executionMode.selectedMetrics.peakConcurrency)}.`,
      `Selection: ${cell(view.executionMode.selectionReason.kind)} via ${cell(view.executionMode.selectionReason.decisiveField)}.`,
      "",
      "## Assignments",
      "| Agent | Modules | Work units | Dependencies | Runtime | Status | Truth |",
      "|---|---|---|---|---|---|---|",
      ...view.agents.map(
        (agent) =>
          `| ${cell(agent.agentId)} | ${cell(agent.modules.map((module) => module.id).join(", "))} | ${cell(agent.workUnitIds.join(", "))} | ${cell(agent.dependencies.join(", ") || "none")} | ${cell(agent.profileId)}/${cell(agent.effortId)} | ${cell(agent.native.status)} | ${cell(agent.truth)} |`,
      ),
      "",
      "## Agent Contracts",
      ...view.agents.flatMap((agent) => [
        `### ${cell(agent.agentId)}`,
        `- Read scope: ${cell(agent.authority.scope.read.join(", ") || "none")}.`,
        `- Write scope: ${cell(agent.authority.scope.write.join(", ") || "none")}.`,
        `- Context: ${cell(agent.contextUses.map((source) => `${source.sourceId} (${source.locator})`).join(", ") || "none")}.`,
        `- Delivered context: ${cell(agent.native.authorization?.command.contextSources.map((source) => `${source.sourceId}:${source.delivery}`).join(", ") ?? "not host-attested")}.`,
        `- Evidence duties: ${cell(agent.evidenceDuties.map((duty) => `${duty.requirementId}:${duty.duty}`).join(", ") || "none")}.`,
        `- Decision: ${cell(agent.assignment.selectionReason)}; ${agent.assignment.alternatives.length} feasible alternative(s), ${agent.assignment.rejectedAlternatives.length} rejected; override ${cell(agent.assignment.override?.replacementCalibrationRowId ?? "none")}.`,
        ...agent.assignment.rejectedAlternatives.map(
          (rejected) =>
            `  - ${cell(rejected.calibrationRowId)}: ${cell(rejected.rejectionCodes.join(", "))}.`,
        ),
      ]),
      "",
      "## Steering",
      ...(view.steering.length === 0
        ? ["- None."]
        : view.steering.map(
            (entry) =>
              `- ${cell(entry.requestedBy)}: ${cell(entry.message)} (${cell(entry.rationale)}).`,
          )),
      "",
      "## Routes And Evidence",
      ...(view.routes.length === 0
        ? ["- No terminal routes."]
        : view.routes.map(
            (route) =>
              `- ${cell(route.agentId ?? "run")}: ${cell(route.outcome)} because ${cell(route.reason)} (${cell(route.truth)}).`,
          )),
      ...view.agents.flatMap((agent) =>
        (agent.acceptedEvidence?.artifacts ?? []).map(
          (artifact) => `- Accepted artifact: ${cell(artifact.name)} (${cell(artifact.digest)}).`,
        ),
      ),
      "",
      "## Next Actions",
      ...view.nextActions.map(
        (entry) =>
          `- ${cell(entry.kind)}: ${cell(entry.availability)} for ${cell(entry.actor)} (${cell(entry.reasonCode)}).`,
      ),
      "",
      `Assignment: ${cell(view.assignmentDigest)}. Source inspection: ${cell(view.sourceInspectionDigest)}.`,
      "Host-reported status and materialization are attestations, not kernel proof.",
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
