import { Buffer } from "node:buffer";
import { validateAdaptiveRunSession } from "./adaptive-run-session.js";
import { deriveAdaptiveRoutes } from "./adaptive-run-transition.js";
import type {
  AdaptiveAgentInspection,
  AdaptiveHostEvent,
  AdaptiveNextAction,
  AdaptiveRoute,
  AdaptiveRunAcceptedEvent,
  AdaptiveRunInspection,
  AdaptiveRunSession,
  AdaptiveTruthClass,
  HostLaunchAuthorization,
  HostLifecycleObservation,
  HostMaterializationClaim,
  HostSteeringAuthorization,
} from "./adaptive-run-types.js";
import { boundedJsonUtf8ByteLength, digestCanonicalJson } from "./canonical-json.js";
import { ADAPTIVE_RUN_API_VERSION, ADAPTIVE_RUN_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { snapshotJsonValue } from "./snapshot.js";
import { inspectSpecialistRunSession } from "./specialist-run-inspection.js";
import type { SpecialistRunInspection } from "./specialist-run-types.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  SpecialistPackageExpectation,
} from "./specialist-types.js";
import type { OperationResult } from "./types.js";

const ARTIFACT = "adaptive-run-inspection.json";
const DOMAIN = "swecircuit/adaptive-run/inspection/v1alpha1";
const PLACEHOLDER_DIGEST = `sha256:${"0".repeat(64)}`;

type JsonValue = Parameters<typeof digestCanonicalJson>[1];
type ParsedEvent = Readonly<{
  row: AdaptiveRunAcceptedEvent;
  event: AdaptiveHostEvent;
}>;
type EventKind = AdaptiveHostEvent["kind"];
type EventOfKind<K extends EventKind> = Extract<AdaptiveHostEvent, { readonly kind: K }>;

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed adaptive inspection is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function packageExpectation(session: AdaptiveRunSession): SpecialistPackageExpectation {
  return {
    compilationDigest: session.expectation.compilationDigest,
    packageDigest: session.expectation.packageDigest,
  };
}

function parseCompilation(session: AdaptiveRunSession): AgentBlueprintCompilation | null {
  const file = session.specialistRun.package.files.find(
    (entry) => entry.path === "compilation.json",
  );
  if (file === undefined) {
    return null;
  }
  try {
    return JSON.parse(file.content) as AgentBlueprintCompilation;
  } catch {
    return null;
  }
}

function parseEvents(session: AdaptiveRunSession): readonly ParsedEvent[] | null {
  try {
    return session.hostEvents.map((row) => ({
      row,
      event: JSON.parse(Buffer.from(row.rawBase64, "base64").toString("utf8")) as AdaptiveHostEvent,
    }));
  } catch {
    return null;
  }
}

function latestEvent<K extends EventKind>(
  events: readonly ParsedEvent[],
  agentId: string,
  kind: K,
): EventOfKind<K> | undefined {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index]?.event;
    if (event?.agentId === agentId && event.kind === kind) {
      return event as EventOfKind<K>;
    }
  }
  return undefined;
}

function stageFor(
  session: AdaptiveRunSession,
  events: readonly ParsedEvent[],
  routes: readonly AdaptiveRoute[],
): AdaptiveRunInspection["stage"] {
  if (routes.some((route) => route.outcome === "pass")) {
    return "integration_ready";
  }
  if (routes.length > 0) {
    return "needs_attention";
  }
  const settled = new Set(session.specialistRun.acceptedHandoffs.map((row) => row.agentId));
  const hostActive = events.some(
    ({ event }) =>
      !settled.has(event.agentId) &&
      (event.kind === "HostLaunchAuthorization" ||
        event.kind === "HostMaterializationClaim" ||
        (event.kind === "HostLifecycleObservation" &&
          (event.status === "running" ||
            event.status === "waiting_permission" ||
            event.status === "completed"))),
  );
  return hostActive ? "host_active" : "awaiting_authorization";
}

function action(
  id: string,
  kind: AdaptiveNextAction["kind"],
  actor: AdaptiveNextAction["actor"],
  reasonCode: string,
  sourceDigests: readonly string[],
): AdaptiveNextAction {
  return { id, kind, actor, availability: "enabled", reasonCode, sourceDigests };
}

function nextActions(
  session: AdaptiveRunSession,
  specialist: SpecialistRunInspection,
  events: readonly ParsedEvent[],
  routes: readonly AdaptiveRoute[],
  stage: AdaptiveRunInspection["stage"],
): readonly AdaptiveNextAction[] {
  if (stage === "integration_ready") {
    return [
      action(
        "integrate-and-verify",
        "integrate_and_verify",
        "integration_owner",
        "all_exact_pass_handoffs",
        routes.flatMap((route) => route.sourceDigests),
      ),
    ];
  }
  if (stage === "needs_attention") {
    return [
      action(
        "create-successor-run",
        "create_successor_run",
        "integration_owner",
        routes[0]?.reason ?? "terminal_route",
        routes.flatMap((route) => route.sourceDigests),
      ),
    ];
  }

  const accepted = new Set(session.specialistRun.acceptedHandoffs.map((row) => row.agentId));
  const actions: AdaptiveNextAction[] = [];
  for (const row of session.assignment.selected.rows) {
    if (accepted.has(row.agentId)) {
      continue;
    }
    const lifecycle = latestEvent(events, row.agentId, "HostLifecycleObservation");
    if (lifecycle?.status === "waiting_permission") {
      actions.push(
        action(
          `permission:${row.agentId}`,
          "respond_to_permission",
          "user",
          "native_permission_requested",
          [session.assignment.contentDigest, row.blueprintDigest],
        ),
      );
    } else if (lifecycle?.status === "completed") {
      actions.push(
        action(
          `capture:${row.agentId}`,
          "capture_result",
          "external_host",
          "native_agent_completed",
          [session.assignment.contentDigest, row.blueprintDigest],
        ),
      );
    } else if (lifecycle?.status === "running") {
      actions.push(
        action(
          `observe:${row.agentId}`,
          "observe_native_agent",
          "external_host",
          "native_agent_running",
          [session.assignment.contentDigest, row.blueprintDigest],
        ),
      );
    }
  }

  const activeAgentIds = new Set(
    session.assignment.selected.rows
      .filter(
        (row) =>
          !accepted.has(row.agentId) &&
          latestEvent(events, row.agentId, "HostLaunchAuthorization") !== undefined,
      )
      .map((row) => row.agentId),
  );
  const capacity = Math.max(
    0,
    session.assignment.inventory.maxConcurrentAgents - activeAgentIds.size,
  );
  if (capacity > 0) {
    const launchable = specialist.dependencyEligibleContracts
      .filter(
        (contract) =>
          !accepted.has(contract.agentId) &&
          latestEvent(events, contract.agentId, "HostLaunchAuthorization") === undefined,
      )
      .slice()
      .sort((left, right) => compareText(left.agentId, right.agentId))
      .slice(0, capacity);
    for (const contract of launchable) {
      actions.push(
        action(
          `launch:${contract.agentId}`,
          "launch_native_agent",
          "external_host",
          "dependency_eligible_and_capacity_available",
          [session.assignment.contentDigest, contract.blueprintDigest],
        ),
      );
    }
  }
  return actions;
}

function nativeStatus(
  accepted: boolean,
  lifecycle: HostLifecycleObservation | undefined,
  materialization: HostMaterializationClaim | undefined,
  authorization: HostLaunchAuthorization | undefined,
): AdaptiveAgentInspection["native"]["status"] {
  if (accepted) return "settled";
  if (lifecycle !== undefined) return lifecycle.status;
  if (materialization !== undefined) return "materialized";
  if (authorization !== undefined) return "authorized";
  return "unresolved";
}

function agentStatus(
  accepted: boolean,
  route: AdaptiveRoute | null,
  lifecycle: HostLifecycleObservation | undefined,
  materialization: HostMaterializationClaim | undefined,
  authorization: HostLaunchAuthorization | undefined,
): AdaptiveAgentInspection["status"] {
  if (accepted) return "settled";
  if (route !== null) return "needs_attention";
  if (lifecycle?.status === "running" || lifecycle?.status === "waiting_permission") {
    return "host_active";
  }
  if (materialization !== undefined) return "materialized";
  if (authorization !== undefined) return "authorized";
  return "awaiting_authorization";
}

function truthFor(
  accepted: boolean,
  lifecycle: HostLifecycleObservation | undefined,
  materialization: HostMaterializationClaim | undefined,
  authorization: HostLaunchAuthorization | undefined,
): AdaptiveTruthClass {
  if (accepted) return "specialist_verified";
  if (lifecycle !== undefined || materialization !== undefined || authorization !== undefined) {
    return "host_attested";
  }
  return "unresolved";
}

export function inspectAdaptiveRunSession(
  sessionInput: unknown,
  expectation: unknown,
): OperationResult<AdaptiveRunInspection> {
  try {
    const validated = validateAdaptiveRunSession(sessionInput, expectation);
    if (!validated.ok || validated.value === null) {
      return operationResult<AdaptiveRunInspection>(validated.diagnostics, null);
    }
    const session = validated.value;
    const specialist = inspectSpecialistRunSession(
      session.specialistRun,
      packageExpectation(session),
    );
    if (!specialist.ok || specialist.value === null) {
      return operationResult<AdaptiveRunInspection>(specialist.diagnostics, null);
    }
    const compilation = parseCompilation(session);
    const events = parseEvents(session);
    if (compilation === null || events === null) {
      return operationResult<AdaptiveRunInspection>([createDiagnostic("SC4608", ARTIFACT)], null);
    }
    const serialBaselineMetrics = compilation.serialBaseline.metrics;
    const selectedMetrics = compilation.selected.metrics;
    if (serialBaselineMetrics === null || selectedMetrics === null) {
      return operationResult<AdaptiveRunInspection>([createDiagnostic("SC4608", ARTIFACT)], null);
    }
    const blueprintById = new Map<string, AgentBlueprint>(
      compilation.blueprints.map((blueprint) => [blueprint.id, blueprint]),
    );
    const evidenceByAgent = new Map(
      specialist.value.acceptedEvidence.map((evidence) => [evidence.agentId, evidence]),
    );
    const routes = deriveAdaptiveRoutes(session);
    const stage = stageFor(session, events, routes);
    const agents = session.assignment.selected.rows
      .map((row): AdaptiveAgentInspection => {
        const blueprint = blueprintById.get(row.agentId);
        if (blueprint === undefined) {
          throw new TypeError(`Missing blueprint ${row.agentId}.`);
        }
        const authorization = latestEvent(events, row.agentId, "HostLaunchAuthorization");
        const materialization = latestEvent(events, row.agentId, "HostMaterializationClaim");
        const lifecycle = latestEvent(events, row.agentId, "HostLifecycleObservation");
        const acceptedEvidence = evidenceByAgent.get(row.agentId) ?? null;
        const agentRoute =
          routes.find((route) => route.agentId === null || route.agentId === row.agentId) ?? null;
        const truth = truthFor(
          acceptedEvidence !== null,
          lifecycle,
          materialization,
          authorization,
        );
        const evaluations = session.assignment.evaluations.filter(
          (evaluation) => evaluation.agentId === row.agentId,
        );
        return {
          agentId: row.agentId,
          blueprintDigest: row.blueprintDigest,
          modules: blueprint.modules,
          workUnitIds: blueprint.workUnitIds,
          dependencies: [...blueprint.dependencies].sort(compareText),
          contextUses: blueprint.contextUses,
          authority: blueprint.authority,
          evidenceDuties: blueprint.evidenceDuties,
          assignment: {
            ...row,
            alternatives: evaluations.filter(
              (evaluation) =>
                evaluation.eligible && evaluation.calibrationRowId !== row.calibrationRowId,
            ),
            rejectedAlternatives: evaluations.filter((evaluation) => !evaluation.eligible),
            selectionReason: session.assignment.selected.selectionReason,
            override:
              session.assignment.override?.agentId === row.agentId
                ? session.assignment.override
                : null,
            truth: "kernel_derived",
          },
          profileId: row.profileId,
          effortId: row.effortId,
          status: agentStatus(
            acceptedEvidence !== null,
            agentRoute,
            lifecycle,
            materialization,
            authorization,
          ),
          native: {
            status: nativeStatus(
              acceptedEvidence !== null,
              lifecycle,
              materialization,
              authorization,
            ),
            truth,
            authorization: authorization ?? null,
            materialization: materialization ?? null,
          },
          acceptedEvidence,
          truth,
          route: agentRoute,
        };
      })
      .sort((left, right) => compareText(left.agentId, right.agentId));

    const base: Omit<AdaptiveRunInspection, "contentDigest"> = {
      apiVersion: ADAPTIVE_RUN_API_VERSION,
      kind: "AdaptiveRunInspection",
      runId: session.expectation.runId,
      runRevision: session.expectation.runRevision,
      goal: session.specialistRun.goal,
      workspaceBaselineDigest: session.expectation.workspaceBaselineDigest,
      host: {
        hostId: session.expectation.authorizedHostId,
        adapterId: session.expectation.authorizedAdapterId,
        adapterRevision: session.expectation.authorizedAdapterRevision,
        authorizationIssuerId: session.expectation.authorizationIssuerId,
      },
      predecessorRun: session.expectation.predecessorRun,
      sessionDigest: session.contentDigest,
      assignmentDigest: session.assignment.contentDigest,
      compilationDigest: session.assignment.compilationDigest,
      packageDigest: session.assignment.packageDigest,
      stage,
      executionMode: {
        selectedCandidateId: compilation.selected.id,
        selectedAgentCount: agents.length,
        serialBaselineMetrics,
        selectedMetrics,
        selectionReason: compilation.selectionReason,
        launchWaves: compilation.launchWaves,
        truth: "kernel_derived",
      },
      agents,
      steering: events
        .filter(({ event }) => event.kind === "HostSteeringAuthorization")
        .map(({ event }) => event as HostSteeringAuthorization),
      routes,
      nextActions: nextActions(session, specialist.value, events, routes, stage),
      integrationReady: stage === "integration_ready",
    };
    if (
      boundedJsonUtf8ByteLength(
        asJson({ ...base, contentDigest: PLACEHOLDER_DIGEST }),
        ADAPTIVE_RUN_LIMITS.maxInspectionBytes,
      ) === null
    ) {
      return operationResult<AdaptiveRunInspection>([createDiagnostic("SC4602", ARTIFACT)], null);
    }
    return operationResult<AdaptiveRunInspection>(
      [],
      freezeJson({
        ...base,
        contentDigest: digestCanonicalJson(DOMAIN, asJson(base)),
      }),
    );
  } catch {
    return operationResult<AdaptiveRunInspection>([createDiagnostic("SC9001", ARTIFACT)], null);
  }
}
