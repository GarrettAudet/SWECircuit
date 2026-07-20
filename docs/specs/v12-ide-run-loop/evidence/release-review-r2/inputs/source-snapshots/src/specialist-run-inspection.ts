import { Buffer } from "node:buffer";
import { boundedJsonUtf8ByteLength, digestCanonicalJson } from "./canonical-json.js";
import { SPECIALIST_RUN_API_VERSION, SPECIALIST_RUN_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { snapshotJsonValue } from "./snapshot.js";
import { verifySpecialistHandoff } from "./specialist-handoff.js";
import { validateSpecialistRunInspectionSchema } from "./specialist-run-schema.js";
import { validateSpecialistRunSession } from "./specialist-run-session.js";
import type {
  SpecialistRunAcceptedEvidence,
  SpecialistRunAgentStatus,
  SpecialistRunEligibleContract,
  SpecialistRunEvidenceBinding,
  SpecialistRunInspection,
  SpecialistRunNextAction,
  SpecialistRunRoute,
  SpecialistRunSession,
  SpecialistRunStage,
} from "./specialist-run-types.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  SpecialistHandoffArtifactBinding,
  SpecialistPackageExpectation,
  VerifiedSpecialistHandoff,
} from "./specialist-types.js";
import type { Diagnostic, OperationResult } from "./types.js";

const INSPECTION_ARTIFACT = "specialist-run-inspection.json";
const INSPECTION_DIGEST_DOMAIN = "swecircuit/specialist-run/inspection/v1alpha1";
const PLACEHOLDER_DIGEST = `sha256:${"0".repeat(64)}`;

type CanonicalJsonValue = Parameters<typeof digestCanonicalJson>[1];

function asJson(value: unknown): CanonicalJsonValue {
  return value as CanonicalJsonValue;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareNumber(left: number, right: number): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist run inspection is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function compilationFromSession(session: SpecialistRunSession): AgentBlueprintCompilation {
  const file = session.package.files.find((candidate) => candidate.path === "compilation.json");
  if (file === undefined) {
    throw new TypeError("Verified specialist package is missing compilation.json.");
  }
  const parsed: unknown = JSON.parse(file.content);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new TypeError("Verified specialist package has an invalid compilation.json.");
  }
  return parsed as AgentBlueprintCompilation;
}

function dependencyClosure(
  blueprint: AgentBlueprint,
  blueprintById: ReadonlyMap<string, AgentBlueprint>,
): readonly string[] {
  const pending = [...blueprint.dependencies];
  const required = new Set<string>();
  while (pending.length > 0) {
    const agentId = pending.pop();
    if (agentId === undefined || required.has(agentId)) {
      continue;
    }
    const dependency = blueprintById.get(agentId);
    if (dependency === undefined) {
      throw new TypeError("Verified blueprint dependency is missing.");
    }
    required.add(agentId);
    pending.push(...dependency.dependencies);
  }
  return Object.freeze([...required].sort(compareText));
}

function compareRoutes(left: SpecialistRunRoute, right: SpecialistRunRoute): number {
  return compareText(left.agentId, right.agentId) || compareText(left.outcome, right.outcome);
}

function compareArtifactBindings(
  left: SpecialistHandoffArtifactBinding,
  right: SpecialistHandoffArtifactBinding,
): number {
  return (
    compareText(left.name, right.name) ||
    compareText(left.mediaType, right.mediaType) ||
    compareNumber(left.bytes, right.bytes) ||
    compareText(left.digest, right.digest)
  );
}

function compareEvidenceBindings(
  left: SpecialistRunEvidenceBinding,
  right: SpecialistRunEvidenceBinding,
): number {
  return (
    compareText(left.requirementId, right.requirementId) ||
    compareText(left.criterionId, right.criterionId) ||
    compareText(left.kind, right.kind) ||
    compareText(left.duty, right.duty) ||
    compareText(left.status, right.status) ||
    compareText(left.artifact, right.artifact)
  );
}

function acceptedEvidenceFrom(verified: VerifiedSpecialistHandoff): SpecialistRunAcceptedEvidence {
  const artifacts = verified.artifactBindings
    .map((artifact) => ({
      name: artifact.name,
      mediaType: artifact.mediaType,
      bytes: artifact.bytes,
      digest: artifact.digest,
    }))
    .sort(compareArtifactBindings);
  const evidence = verified.handoff.evidence
    .map((entry) => ({
      criterionId: entry.criterionId,
      requirementId: entry.requirementId,
      kind: entry.kind,
      duty: entry.duty,
      status: entry.status,
      artifact: entry.artifact,
    }))
    .sort(compareEvidenceBindings);
  return {
    agentId: verified.handoff.agent.id,
    blueprintDigest: verified.handoff.agent.blueprintDigest,
    outcome: verified.handoff.outcome,
    rawBytes: verified.rawBytes,
    rawDigest: verified.rawDigest,
    semanticDigest: verified.semanticDigest,
    artifacts,
    evidence,
  };
}

function resolveEligibleContract(
  session: SpecialistRunSession,
  blueprint: AgentBlueprint,
): SpecialistRunEligibleContract {
  const manifestAgent = session.package.manifest.agents.find(
    (candidate) => candidate.agentId === blueprint.id,
  );
  if (manifestAgent === undefined || manifestAgent.blueprintDigest !== blueprint.contentDigest) {
    throw new TypeError("Verified specialist manifest is missing an agent binding.");
  }
  const file = session.package.files.find(
    (candidate) => candidate.path === manifestAgent.contractFile,
  );
  if (
    file === undefined ||
    file.mediaType !== "text/markdown" ||
    file.bytes !== manifestAgent.contractBytes ||
    file.digest !== manifestAgent.contractDigest
  ) {
    throw new TypeError("Verified specialist manifest has an invalid contract binding.");
  }
  return {
    agentId: blueprint.id,
    blueprintDigest: blueprint.contentDigest,
    path: manifestAgent.contractFile,
    mediaType: "text/markdown",
    bytes: file.bytes,
    digest: file.digest,
    content: file.content,
  };
}

function buildAgentStatus(
  blueprint: AgentBlueprint,
  acceptedByAgent: ReadonlyMap<string, SpecialistRunSession["acceptedHandoffs"][number]>,
  blueprintById: ReadonlyMap<string, AgentBlueprint>,
  routes: readonly SpecialistRunRoute[],
): SpecialistRunAgentStatus {
  const accepted = acceptedByAgent.get(blueprint.id);
  const dependencies = [...blueprint.dependencies].sort(compareText);
  if (accepted?.outcome === "pass") {
    return {
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      dependencies,
      status: "accepted_pass",
      outcome: "pass",
      waitingForAgentIds: [],
      blockingRoutes: [],
    };
  }
  if (accepted !== undefined) {
    const route = routes.find((candidate) => candidate.agentId === blueprint.id);
    if (route === undefined) {
      throw new TypeError("Accepted non-pass handoff is missing its route.");
    }
    return {
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      dependencies,
      status: "accepted_non_pass",
      outcome: accepted.outcome,
      waitingForAgentIds: [],
      blockingRoutes: [route],
    };
  }

  const waitingForAgentIds = dependencies.filter(
    (agentId) => acceptedByAgent.get(agentId)?.outcome !== "pass",
  );
  if (routes.length > 0) {
    return {
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      dependencies,
      status: "session_routed",
      outcome: null,
      waitingForAgentIds,
      blockingRoutes: [...routes],
    };
  }

  const dependencyEligible = dependencyClosure(blueprint, blueprintById).every(
    (agentId) => acceptedByAgent.get(agentId)?.outcome === "pass",
  );
  return {
    agentId: blueprint.id,
    blueprintDigest: blueprint.contentDigest,
    dependencies,
    status: dependencyEligible ? "dependency_eligible" : "waiting_for_dependencies",
    outcome: null,
    waitingForAgentIds: dependencyEligible ? [] : waitingForAgentIds,
    blockingRoutes: [],
  };
}

function nextActionFor(
  stage: SpecialistRunStage,
  session: SpecialistRunSession,
  eligibleAgentIds: readonly string[],
  routes: readonly SpecialistRunRoute[],
): SpecialistRunNextAction {
  if (stage === "collecting") {
    return {
      kind: "external_host.evaluate_dependency_eligible_contracts",
      actor: "external_host",
      agentIds: eligibleAgentIds,
    };
  }
  if (stage === "routed") {
    return {
      kind: "integration_owner.route_specialist_outcome",
      actor: "integration_owner",
      integrationOwner: session.goal.integrationOwner,
      routes,
    };
  }
  return {
    kind: "integration_owner.integrate_and_verify",
    actor: "integration_owner",
    integrationOwner: session.goal.integrationOwner,
  };
}

export function inspectSpecialistRunSession(
  session: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunInspection> {
  try {
    const validated = validateSpecialistRunSession(session, expectation);
    if (!validated.ok || validated.value === null) {
      return operationResult<SpecialistRunInspection>(validated.diagnostics, null);
    }

    const canonicalSession = validated.value;
    const compilation = compilationFromSession(canonicalSession);
    const blueprints = [...compilation.blueprints].sort((left, right) =>
      compareText(left.id, right.id),
    );
    const blueprintById = new Map(
      blueprints.map((blueprint) => [blueprint.id, blueprint] as const),
    );
    const acceptedByAgent = new Map(
      canonicalSession.acceptedHandoffs.map((row) => [row.agentId, row] as const),
    );
    const routes: SpecialistRunRoute[] = [];
    for (const row of canonicalSession.acceptedHandoffs) {
      if (row.outcome !== "pass") {
        routes.push({ agentId: row.agentId, outcome: row.outcome });
      }
    }
    routes.sort(compareRoutes);

    const allAcceptedPass =
      acceptedByAgent.size === blueprints.length &&
      blueprints.every((blueprint) => acceptedByAgent.get(blueprint.id)?.outcome === "pass");
    const stage: SpecialistRunStage =
      routes.length > 0 ? "routed" : allAcceptedPass ? "integration_ready" : "collecting";
    const agents = blueprints.map((blueprint) =>
      buildAgentStatus(blueprint, acceptedByAgent, blueprintById, routes),
    );

    const eligibleBlueprints =
      stage === "collecting"
        ? blueprints.filter(
            (blueprint) =>
              !acceptedByAgent.has(blueprint.id) &&
              dependencyClosure(blueprint, blueprintById).every(
                (agentId) => acceptedByAgent.get(agentId)?.outcome === "pass",
              ),
          )
        : [];
    const dependencyEligibleContracts = eligibleBlueprints.map((blueprint) =>
      resolveEligibleContract(canonicalSession, blueprint),
    );

    const diagnostics: Diagnostic[] = [...validated.diagnostics];
    const acceptedEvidence: SpecialistRunAcceptedEvidence[] = [];
    const trustedExpectation = Object.freeze({
      compilationDigest: canonicalSession.compilationDigest,
      packageDigest: canonicalSession.packageDigest,
    });
    for (const row of canonicalSession.acceptedHandoffs) {
      const raw = new Uint8Array(Buffer.from(row.rawBase64, "base64"));
      const verified = verifySpecialistHandoff(canonicalSession.package, trustedExpectation, raw);
      diagnostics.push(...verified.diagnostics);
      if (!verified.ok || verified.value === null) {
        return operationResult<SpecialistRunInspection>(diagnostics, null);
      }
      if (
        verified.value.handoff.agent.id !== row.agentId ||
        verified.value.handoff.agent.blueprintDigest !== row.blueprintDigest ||
        verified.value.handoff.outcome !== row.outcome ||
        verified.value.rawBytes !== row.rawBytes ||
        verified.value.rawDigest !== row.rawDigest
      ) {
        throw new TypeError("Reverified handoff does not match its accepted row.");
      }
      acceptedEvidence.push(acceptedEvidenceFrom(verified.value));
    }
    acceptedEvidence.sort(
      (left, right) =>
        compareText(left.agentId, right.agentId) ||
        compareText(left.blueprintDigest, right.blueprintDigest),
    );

    const eligibleAgentIds = eligibleBlueprints.map((blueprint) => blueprint.id);
    const specialistOutcome =
      stage === "routed"
        ? (routes[0]?.outcome ?? null)
        : stage === "integration_ready"
          ? "pass"
          : null;
    const base = {
      apiVersion: SPECIALIST_RUN_API_VERSION,
      kind: "SpecialistRunInspection",
      goal: canonicalSession.goal,
      compilationDigest: canonicalSession.compilationDigest,
      packageDigest: canonicalSession.packageDigest,
      selectedCandidateId: canonicalSession.selectedCandidateId,
      sessionDigest: canonicalSession.contentDigest,
      stage,
      agents,
      dependencyEligibleContracts,
      acceptedEvidence,
      routes,
      specialistOutcome,
      integrationReady: stage === "integration_ready",
      nextAction: nextActionFor(stage, canonicalSession, eligibleAgentIds, routes),
    } as const;
    if (
      boundedJsonUtf8ByteLength(
        asJson({ ...base, contentDigest: PLACEHOLDER_DIGEST }),
        SPECIALIST_RUN_LIMITS.canonicalInspectionBytes,
      ) === null
    ) {
      return operationResult<SpecialistRunInspection>(
        [...diagnostics, createDiagnostic("SC4402", INSPECTION_ARTIFACT)],
        null,
      );
    }

    const inspection = freezeJson({
      ...base,
      contentDigest: digestCanonicalJson(INSPECTION_DIGEST_DOMAIN, asJson(base)),
    } as SpecialistRunInspection);
    const schemaDiagnostics = validateSpecialistRunInspectionSchema(
      asJson(inspection),
      INSPECTION_ARTIFACT,
    );
    if (hasErrors(schemaDiagnostics)) {
      return operationResult<SpecialistRunInspection>(
        [...diagnostics, createDiagnostic("SC9001", INSPECTION_ARTIFACT)],
        null,
      );
    }
    return operationResult([...diagnostics, ...schemaDiagnostics], inspection);
  } catch {
    return operationResult<SpecialistRunInspection>(
      [createDiagnostic("SC9001", INSPECTION_ARTIFACT)],
      null,
    );
  }
}
