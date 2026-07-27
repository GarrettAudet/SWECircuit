import { Buffer } from "node:buffer";
import { types as utilTypes } from "node:util";
import { validateAdaptiveHostEventSchema } from "./adaptive-run-schema.js";
import {
  adaptiveRunSessionInternals,
  createAdaptiveRunSession,
  projectAdaptiveLaunchCommand,
  validateAdaptiveRunSession,
} from "./adaptive-run-session.js";
import {
  ADAPTIVE_RUN_LIMITS,
  type AdaptiveHostEvent,
  type AdaptiveRoute,
  type AdaptiveRunAcceptedEvent,
  type AdaptiveRunSession,
  type HostAdapterFailure,
  type HostLaunchAuthorization,
  type HostLifecycleObservation,
  type HostMaterializationClaim,
  type HostMaterializationFieldName,
  type HostResultCapture,
  type HostSteeringAuthorization,
} from "./adaptive-run-types.js";
import { boundedUtf8ByteLength, canonicalJson, digestCanonicalJson } from "./canonical-json.js";
import { hasParsingErrors, parseJsonBuffer } from "./json.js";
import type { JsonValue } from "./model.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { recordSpecialistRunHandoff } from "./specialist-run-transition.js";
import type { AgentBlueprint, AgentBlueprintCompilation } from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { OperationResult, WorkflowOutcome } from "./types.js";

const EVENT_ARTIFACT = "adaptive-host-event.json";
const SESSION_ARTIFACT = "adaptive-run-session.json";

interface RawEventSnapshot {
  readonly bytes: Uint8Array | null;
  readonly limitExceeded: boolean;
}

interface ParsedAcceptedEvent {
  readonly row: AdaptiveRunAcceptedEvent;
  readonly event: AdaptiveHostEvent;
}

const MATERIALIZATION_FIELDS = Object.freeze([
  "model",
  "effort",
  "tools",
  "skills",
  "isolation",
  "permissions",
  "workspace",
  "context",
] as const);

const TERMINAL_HOST_STATUSES = new Set([
  "completed",
  "failed",
  "stopped",
  "liveness_failed",
  "unknown",
]);

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function sameJson(left: unknown, right: unknown): boolean {
  return canonicalJson(asJson(left)) === canonicalJson(asJson(right));
}

function snapshotRawEvent(input: unknown): RawEventSnapshot {
  try {
    if (
      typeof input !== "object" ||
      input === null ||
      utilTypes.isProxy(input) ||
      !utilTypes.isUint8Array(input)
    ) {
      return Object.freeze({ bytes: null, limitExceeded: false });
    }
    const value = input as Uint8Array;
    if (value.byteLength > ADAPTIVE_RUN_LIMITS.maxEventBytes) {
      return Object.freeze({ bytes: null, limitExceeded: true });
    }
    return Object.freeze({ bytes: new Uint8Array(value), limitExceeded: false });
  } catch {
    return Object.freeze({ bytes: null, limitExceeded: false });
  }
}

function safeEventText(value: JsonValue, property = ""): boolean {
  if (typeof value === "string") {
    if (
      containsControlCharacters(value) ||
      containsLoneSurrogate(value) ||
      containsHighConfidenceSecret(value)
    ) {
      return false;
    }
    if (property.endsWith("Base64")) {
      return true;
    }
    const limit =
      property.endsWith("Id") ||
      property === "kind" ||
      property === "status" ||
      property === "field"
        ? 128
        : 16_384;
    return boundedUtf8ByteLength(value, limit) !== null;
  }
  if (value === null || typeof value !== "object") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((entry) => safeEventText(entry, property));
  }
  return Object.entries(value).every(([key, entry]) => safeEventText(entry as JsonValue, key));
}

function eventTextLimitExceeded(value: JsonValue, property = ""): boolean {
  if (typeof value === "string") {
    if (property.endsWith("Base64")) {
      return false;
    }
    const limit =
      property.endsWith("Id") ||
      property === "kind" ||
      property === "status" ||
      property === "field"
        ? 128
        : 16_384;
    return boundedUtf8ByteLength(value, limit) === null;
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return value.some((entry) => eventTextLimitExceeded(entry, property));
  }
  return Object.entries(value).some(([key, entry]) =>
    eventTextLimitExceeded(entry as JsonValue, key),
  );
}
function decodeAccepted(row: AdaptiveRunAcceptedEvent): ParsedAcceptedEvent {
  const bytes = new Uint8Array(Buffer.from(row.rawBase64, "base64"));
  const parsed = parseJsonBuffer(bytes, EVENT_ARTIFACT, ADAPTIVE_RUN_LIMITS.maxEventBytes);
  if (hasParsingErrors(parsed) || parsed.value === null) {
    throw new TypeError("Accepted host event cannot be parsed.");
  }
  return Object.freeze({
    row,
    event: parsed.value as unknown as AdaptiveHostEvent,
  });
}

function acceptedEvents(session: AdaptiveRunSession): readonly ParsedAcceptedEvent[] {
  return Object.freeze(session.hostEvents.map(decodeAccepted));
}

function compilation(session: AdaptiveRunSession): AgentBlueprintCompilation {
  return adaptiveRunSessionInternals.parseCompilation(session);
}

function dependencyClosure(
  specialistCompilation: AgentBlueprintCompilation,
  target: AgentBlueprint,
): readonly string[] {
  const byId = new Map(
    specialistCompilation.blueprints.map((blueprint) => [blueprint.id, blueprint] as const),
  );
  const pending = [...target.dependencies];
  const result = new Set<string>();
  while (pending.length > 0) {
    const id = pending.pop();
    if (id === undefined || result.has(id)) {
      continue;
    }
    const dependency = byId.get(id);
    if (dependency === undefined) {
      throw new TypeError("Verified specialist dependency is missing.");
    }
    result.add(id);
    pending.push(...dependency.dependencies);
  }
  return Object.freeze([...result].sort());
}

function dependencyEligible(session: AdaptiveRunSession, agentId: string): boolean {
  const specialistCompilation = compilation(session);
  const blueprint = specialistCompilation.blueprints.find((candidate) => candidate.id === agentId);
  if (blueprint === undefined) {
    return false;
  }
  const accepted = new Map(
    session.specialistRun.acceptedHandoffs.map((row) => [row.agentId, row] as const),
  );
  return dependencyClosure(specialistCompilation, blueprint).every(
    (dependencyId) => accepted.get(dependencyId)?.outcome === "pass",
  );
}

function launchForAttempt(
  events: readonly ParsedAcceptedEvent[],
  attemptId: string,
): (ParsedAcceptedEvent & { readonly event: HostLaunchAuthorization }) | undefined {
  return events.find(
    (entry): entry is ParsedAcceptedEvent & { readonly event: HostLaunchAuthorization } =>
      entry.event.kind === "HostLaunchAuthorization" && entry.event.attemptId === attemptId,
  );
}

function materializationForAttempt(
  events: readonly ParsedAcceptedEvent[],
  attemptId: string,
): (ParsedAcceptedEvent & { readonly event: HostMaterializationClaim }) | undefined {
  return events.find(
    (entry): entry is ParsedAcceptedEvent & { readonly event: HostMaterializationClaim } =>
      entry.event.kind === "HostMaterializationClaim" && entry.event.attemptId === attemptId,
  );
}

function lifecyclesForAttempt(
  events: readonly ParsedAcceptedEvent[],
  attemptId: string,
): readonly (ParsedAcceptedEvent & { readonly event: HostLifecycleObservation })[] {
  return events.filter(
    (entry): entry is ParsedAcceptedEvent & { readonly event: HostLifecycleObservation } =>
      entry.event.kind === "HostLifecycleObservation" && entry.event.attemptId === attemptId,
  );
}

function steeringForAttempt(
  events: readonly ParsedAcceptedEvent[],
  attemptId: string,
): readonly (ParsedAcceptedEvent & { readonly event: HostSteeringAuthorization })[] {
  return events.filter(
    (entry): entry is ParsedAcceptedEvent & { readonly event: HostSteeringAuthorization } =>
      entry.event.kind === "HostSteeringAuthorization" && entry.event.attemptId === attemptId,
  );
}

function materializationBlocked(
  event: HostMaterializationClaim,
  launch: HostLaunchAuthorization,
): boolean {
  const expected = materializationExpectedDigests(launch);
  return event.fields.some((field) => {
    const requirement =
      launch.command.observability[field.field as keyof typeof launch.command.observability];
    return (
      field.expectedDigest !== expected[field.field] ||
      field.status === "unavailable" ||
      (field.status === "observed" && field.observedDigest !== field.expectedDigest) ||
      (field.status === "host_attested_unobservable" &&
        (requirement !== "host_attestation_allowed" || field.observedDigest !== null))
    );
  });
}

function route(
  agentId: string | null,
  outcome: WorkflowOutcome,
  reason: AdaptiveRoute["reason"],
  sourceDigests: readonly string[],
  truth: AdaptiveRoute["truth"],
): AdaptiveRoute {
  return Object.freeze({
    agentId,
    outcome,
    reason,
    sourceDigests: Object.freeze([...sourceDigests]),
    truth,
  });
}

export function deriveAdaptiveRoutes(session: AdaptiveRunSession): readonly AdaptiveRoute[] {
  const events = acceptedEvents(session);

  for (const entry of events) {
    if (entry.event.kind === "HostMaterializationClaim") {
      const launch = launchForAttempt(events, entry.event.attemptId);
      if (launch !== undefined && materializationBlocked(entry.event, launch.event)) {
        return Object.freeze([
          route(
            entry.event.agentId,
            "block",
            "materialization_mismatch",
            [entry.row.rawDigest],
            "host_attested",
          ),
        ]);
      }
    }
  }

  for (const entry of events) {
    if (
      entry.event.kind === "HostAdapterFailure" &&
      entry.event.certainty === "no_effect" &&
      (entry.event.attemptId === null ||
        materializationForAttempt(events, entry.event.attemptId) === undefined)
    ) {
      return Object.freeze([
        route(
          entry.event.agentId,
          "block",
          "host_effect_uncertain",
          [entry.row.rawDigest],
          "host_attested",
        ),
      ]);
    }
  }

  for (const entry of events) {
    if (
      (entry.event.kind === "HostAdapterFailure" &&
        (entry.event.certainty !== "no_effect" ||
          (entry.event.attemptId !== null &&
            materializationForAttempt(events, entry.event.attemptId) !== undefined))) ||
      (entry.event.kind === "HostLifecycleObservation" &&
        (entry.event.status === "failed" ||
          entry.event.status === "liveness_failed" ||
          entry.event.status === "unknown"))
    ) {
      const reason =
        entry.event.kind === "HostLifecycleObservation" && entry.event.status === "liveness_failed"
          ? "liveness_failure"
          : entry.event.kind === "HostLifecycleObservation" && entry.event.status === "unknown"
            ? "unknown_host_status"
            : "host_effect_uncertain";
      return Object.freeze([
        route(entry.event.agentId, "diagnose", reason, [entry.row.rawDigest], "host_attested"),
      ]);
    }
  }

  const nonPass = session.specialistRun.acceptedHandoffs.find((row) => row.outcome !== "pass");
  if (nonPass !== undefined) {
    return Object.freeze([
      route(
        nonPass.agentId,
        nonPass.outcome,
        "specialist_non_pass",
        [nonPass.rawDigest],
        "specialist_verified",
      ),
    ]);
  }

  const stopped = events.find(
    (entry) => entry.event.kind === "HostLifecycleObservation" && entry.event.status === "stopped",
  );
  if (stopped !== undefined) {
    return Object.freeze([
      route(
        stopped.event.agentId,
        "block",
        "host_user_stop",
        [stopped.row.rawDigest],
        "host_attested",
      ),
    ]);
  }

  if (
    session.specialistRun.acceptedHandoffs.length === session.assignment.selected.rows.length &&
    session.specialistRun.acceptedHandoffs.every((row) => row.outcome === "pass")
  ) {
    return Object.freeze([
      route(
        null,
        "pass",
        "all_handoffs_pass",
        session.specialistRun.acceptedHandoffs.map((row) => row.rawDigest),
        "specialist_verified",
      ),
    ]);
  }
  return Object.freeze([]);
}

function activeAttempts(events: readonly ParsedAcceptedEvent[]): number | null {
  let active = 0;
  for (const launch of events) {
    if (launch.event.kind !== "HostLaunchAuthorization") {
      continue;
    }
    const materialization = materializationForAttempt(events, launch.event.attemptId);
    if (materialization === undefined) {
      continue;
    }
    const lifecycles = lifecyclesForAttempt(events, launch.event.attemptId);
    const latest = lifecycles.at(-1);
    if (latest?.event.status === "unknown") {
      return null;
    }
    if (latest === undefined || !TERMINAL_HOST_STATUSES.has(latest.event.status)) {
      active += 1;
    }
  }
  return active;
}

function commonBindingsValid(session: AdaptiveRunSession, event: AdaptiveHostEvent): boolean {
  const assignment = session.assignment.selected.rows.find((row) => row.agentId === event.agentId);
  return (
    event.apiVersion === session.apiVersion &&
    event.runId === session.expectation.runId &&
    event.runRevision === session.expectation.runRevision &&
    event.assignmentDigest === session.assignment.contentDigest &&
    event.hostId === session.expectation.authorizedHostId &&
    event.adapterId === session.expectation.authorizedAdapterId &&
    event.adapterRevision === session.expectation.authorizedAdapterRevision &&
    assignment !== undefined &&
    assignment.blueprintDigest === event.blueprintDigest
  );
}

function uniqueEvidence(evidence: readonly { readonly id: string }[]): boolean {
  return new Set(evidence.map((entry) => entry.id)).size === evidence.length;
}

export function adaptiveMaterializationExpectedDigest(
  field: HostMaterializationFieldName,
  value: unknown,
): string {
  return digestCanonicalJson(
    `swecircuit/adaptive-run/materialization-field/${field}/v1alpha1`,
    asJson(value),
  );
}

function materializationExpectedDigests(
  authorization: HostLaunchAuthorization,
): Readonly<Record<HostMaterializationFieldName, string>> {
  const command = authorization.command;
  return Object.freeze({
    model: adaptiveMaterializationExpectedDigest("model", command.profileId),
    effort: adaptiveMaterializationExpectedDigest("effort", command.effortId),
    tools: adaptiveMaterializationExpectedDigest("tools", command.tools),
    skills: adaptiveMaterializationExpectedDigest("skills", command.skills),
    isolation: adaptiveMaterializationExpectedDigest("isolation", command.isolationFeatures),
    permissions: adaptiveMaterializationExpectedDigest("permissions", command.permissions),
    workspace: adaptiveMaterializationExpectedDigest(
      "workspace",
      authorization.workspaceBaselineDigest,
    ),
    context: adaptiveMaterializationExpectedDigest("context", command.contextSources),
  });
}

function launchValid(
  session: AdaptiveRunSession,
  event: HostLaunchAuthorization,
  events: readonly ParsedAcceptedEvent[],
): boolean {
  if (
    event.attestedBy !== session.expectation.authorizationIssuerId ||
    event.workspaceBaselineDigest !== session.expectation.workspaceBaselineDigest ||
    !dependencyEligible(session, event.agentId) ||
    session.specialistRun.acceptedHandoffs.some((row) => row.agentId === event.agentId) ||
    events.some(
      (entry) =>
        entry.event.kind === "HostLaunchAuthorization" &&
        (entry.event.agentId === event.agentId ||
          entry.event.attemptId === event.attemptId ||
          entry.event.authorizationId === event.authorizationId),
    )
  ) {
    return false;
  }
  const active = activeAttempts(events);
  if (active === null || active >= session.assignment.inventory.maxConcurrentAgents) {
    return false;
  }
  const projected = projectAdaptiveLaunchCommand(session, session.expectation, event.agentId);
  return projected.ok && projected.value !== null && sameJson(projected.value, event.command);
}

function materializationValid(
  event: HostMaterializationClaim,
  events: readonly ParsedAcceptedEvent[],
): boolean {
  const launch = launchForAttempt(events, event.attemptId);
  if (
    launch === undefined ||
    launch.event.agentId !== event.agentId ||
    event.authorizationEventDigest !== launch.row.rawDigest ||
    materializationForAttempt(events, event.attemptId) !== undefined ||
    events.some(
      (entry) =>
        entry.event.kind === "HostMaterializationClaim" &&
        entry.event.nativeHandle === event.nativeHandle,
    )
  ) {
    return false;
  }
  return event.fields.every(
    (field, index) =>
      field.field === MATERIALIZATION_FIELDS[index] &&
      !(field.status === "observed" && field.observedDigest === null) &&
      !(field.status !== "observed" && field.observedDigest !== null),
  );
}

function lifecycleValid(
  event: HostLifecycleObservation,
  events: readonly ParsedAcceptedEvent[],
): boolean {
  const launch = launchForAttempt(events, event.attemptId);
  const materialization = materializationForAttempt(events, event.attemptId);
  const prior = lifecyclesForAttempt(events, event.attemptId);
  const latest = prior.at(-1);
  return (
    launch !== undefined &&
    materialization !== undefined &&
    launch.event.agentId === event.agentId &&
    event.authorizationEventDigest === launch.row.rawDigest &&
    event.materializationEventDigest === materialization.row.rawDigest &&
    event.nativeHandle === materialization.event.nativeHandle &&
    (latest === undefined || !TERMINAL_HOST_STATUSES.has(latest.event.status)) &&
    uniqueEvidence(event.evidence)
  );
}

function steeringValid(
  event: HostSteeringAuthorization,
  events: readonly ParsedAcceptedEvent[],
): boolean {
  const launch = launchForAttempt(events, event.attemptId);
  const latest = lifecyclesForAttempt(events, event.attemptId).at(-1);
  return (
    launch !== undefined &&
    launch.event.agentId === event.agentId &&
    event.authorizationEventDigest === launch.row.rawDigest &&
    (latest === undefined || !TERMINAL_HOST_STATUSES.has(latest.event.status)) &&
    boundedUtf8ByteLength(event.message, ADAPTIVE_RUN_LIMITS.maxSteeringBytes) !== null
  );
}

function failureValid(event: HostAdapterFailure, events: readonly ParsedAcceptedEvent[]): boolean {
  if (!uniqueEvidence(event.evidence)) {
    return false;
  }
  if (event.attemptId === null) {
    return event.phase === "inventory" || event.phase === "authorization";
  }
  const launch = launchForAttempt(events, event.attemptId);
  return launch !== undefined && launch.event.agentId === event.agentId;
}

function captureBindingsValid(
  event: HostResultCapture,
  events: readonly ParsedAcceptedEvent[],
): boolean {
  const launch = launchForAttempt(events, event.attemptId);
  const materialization = materializationForAttempt(events, event.attemptId);
  const lifecycle = lifecyclesForAttempt(events, event.attemptId).at(-1);
  const steering = steeringForAttempt(events, event.attemptId);
  return (
    launch !== undefined &&
    materialization !== undefined &&
    lifecycle !== undefined &&
    launch.event.agentId === event.agentId &&
    !materializationBlocked(materialization.event, launch.event) &&
    lifecycle.event.status === "completed" &&
    event.authorizationEventDigest === launch.row.rawDigest &&
    event.materializationEventDigest === materialization.row.rawDigest &&
    event.terminalLifecycleEventDigest === lifecycle.row.rawDigest &&
    sameJson(
      event.steeringEventDigests,
      steering.map((entry) => entry.row.rawDigest),
    ) &&
    !events.some(
      (entry) =>
        entry.event.kind === "HostResultCapture" &&
        (entry.event.attemptId === event.attemptId || entry.event.agentId === event.agentId),
    )
  );
}

function acceptedRow(
  event: AdaptiveHostEvent,
  raw: Uint8Array,
  digest: string,
): AdaptiveRunAcceptedEvent {
  return Object.freeze({
    sequence: event.sequence,
    kind: event.kind,
    agentId: event.agentId,
    attemptId: "attemptId" in event ? event.attemptId : null,
    rawEncoding: "base64",
    rawBytes: raw.byteLength,
    rawDigest: digest,
    rawBase64: Buffer.from(raw).toString("base64"),
  });
}

export function recordAdaptiveHostEvent(
  sessionInput: unknown,
  expectationInput: unknown,
  rawEventInput: unknown,
): OperationResult<AdaptiveRunSession> {
  try {
    const validated = validateAdaptiveRunSession(sessionInput, expectationInput);
    if (!validated.ok || validated.value === null) {
      return adaptiveRunSessionInternals.result(validated.diagnostics, null);
    }
    const session = validated.value;
    const rawSnapshot = snapshotRawEvent(rawEventInput);
    if (rawSnapshot.bytes === null) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic(
            rawSnapshot.limitExceeded ? "SC4602" : "SC4601",
            EVENT_ARTIFACT,
          ),
        ],
        null,
      );
    }
    const raw = rawSnapshot.bytes;
    const rawEventDigest = adaptiveRunSessionInternals.rawDigest(raw);
    const parsed = parseJsonBuffer(raw, EVENT_ARTIFACT, ADAPTIVE_RUN_LIMITS.maxEventBytes);
    if (hasParsingErrors(parsed) || parsed.value === null) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4601", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    if (eventTextLimitExceeded(parsed.value)) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4602", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    if (!safeEventText(parsed.value)) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4601", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    const schemaIssues = validateAdaptiveHostEventSchema(parsed.value);
    if (schemaIssues.length > 0) {
      const candidate = parsed.value as Readonly<Record<string, JsonValue>> & {
        readonly kind?: JsonValue;
      };
      if (candidate.kind === "HostMaterializationClaim") {
        return adaptiveRunSessionInternals.result(
          [
            ...validated.diagnostics,
            adaptiveRunSessionInternals.diagnostic(
              schemaIssues.some((issue) => issue.limit) ? "SC4602" : "SC4606",
              EVENT_ARTIFACT,
            ),
          ],
          null,
        );
      }
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          ...schemaIssues.map((issue) =>
            adaptiveRunSessionInternals.diagnostic(
              issue.limit ? "SC4602" : "SC4601",
              EVENT_ARTIFACT,
              issue.pointer,
            ),
          ),
        ],
        null,
      );
    }
    const event = parsed.value as unknown as AdaptiveHostEvent;
    const occupied = session.hostEvents.find((row) => row.sequence === event.sequence);
    if (occupied !== undefined) {
      if (
        occupied.rawDigest === rawEventDigest &&
        occupied.rawBase64 === Buffer.from(raw).toString("base64")
      ) {
        return adaptiveRunSessionInternals.result(validated.diagnostics, session);
      }
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4605", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    const previous = session.hostEvents.at(-1);
    if (
      event.sequence !== session.hostEvents.length + 1 ||
      event.priorEventDigest !== (previous?.rawDigest ?? null)
    ) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4605", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    if (
      session.hostEvents.length >= session.expectation.maxHostEvents ||
      session.hostEvents.length >= ADAPTIVE_RUN_LIMITS.maxHostEvents
    ) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4602", EVENT_ARTIFACT),
        ],
        null,
      );
    }
    if (deriveAdaptiveRoutes(session).length > 0) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4609", SESSION_ARTIFACT),
        ],
        null,
      );
    }
    if (!commonBindingsValid(session, event)) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4603", EVENT_ARTIFACT),
        ],
        null,
      );
    }

    const events = acceptedEvents(session);
    let transitionValid = false;
    if (event.kind === "HostLaunchAuthorization") {
      transitionValid = launchValid(session, event, events);
    } else if (event.kind === "HostMaterializationClaim") {
      transitionValid = materializationValid(event, events);
    } else if (event.kind === "HostLifecycleObservation") {
      transitionValid = lifecycleValid(event, events);
    } else if (event.kind === "HostSteeringAuthorization") {
      transitionValid = steeringValid(event, events);
    } else if (event.kind === "HostAdapterFailure") {
      transitionValid = failureValid(event, events);
    } else if (event.kind === "HostResultCapture") {
      transitionValid = captureBindingsValid(event, events);
    }
    if (!transitionValid) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic(
            event.kind === "HostResultCapture" ? "SC4607" : "SC4604",
            EVENT_ARTIFACT,
          ),
        ],
        null,
      );
    }

    let specialistRun = session.specialistRun;
    if (event.kind === "HostResultCapture") {
      let handoff: Uint8Array;
      try {
        const decoded = Buffer.from(event.rawHandoffBase64, "base64");
        if (
          decoded.toString("base64") !== event.rawHandoffBase64 ||
          decoded.byteLength !== event.rawHandoffBytes ||
          decoded.byteLength > ADAPTIVE_RUN_LIMITS.maxEventBytes
        ) {
          throw new TypeError("Noncanonical handoff bytes.");
        }
        handoff = new Uint8Array(decoded);
      } catch {
        return adaptiveRunSessionInternals.result(
          [
            ...validated.diagnostics,
            adaptiveRunSessionInternals.diagnostic("SC4607", EVENT_ARTIFACT),
          ],
          null,
        );
      }
      if (adaptiveRunSessionInternals.rawDigest(handoff) !== event.rawHandoffDigest) {
        return adaptiveRunSessionInternals.result(
          [
            ...validated.diagnostics,
            adaptiveRunSessionInternals.diagnostic("SC4607", EVENT_ARTIFACT),
          ],
          null,
        );
      }
      const settled = recordSpecialistRunHandoff(
        specialistRun,
        adaptiveRunSessionInternals.packageExpectation(session.expectation),
        handoff,
      );
      if (!settled.ok || settled.value === null) {
        return adaptiveRunSessionInternals.result(
          [
            ...validated.diagnostics,
            ...settled.diagnostics,
            adaptiveRunSessionInternals.diagnostic("SC4607", EVENT_ARTIFACT),
          ],
          null,
        );
      }
      const settledRow = settled.value.acceptedHandoffs.find(
        (row) => row.agentId === event.agentId,
      );
      if (
        settledRow === undefined ||
        settledRow.rawDigest !== event.rawHandoffDigest ||
        settledRow.rawBytes !== event.rawHandoffBytes
      ) {
        return adaptiveRunSessionInternals.result(
          [
            ...validated.diagnostics,
            adaptiveRunSessionInternals.diagnostic("SC4607", EVENT_ARTIFACT),
          ],
          null,
        );
      }
      specialistRun = settled.value;
    }

    const hostEvents = Object.freeze([
      ...session.hostEvents,
      acceptedRow(event, raw, rawEventDigest),
    ]);
    const successor = adaptiveRunSessionInternals.buildSession(
      session.expectation,
      session.assignment,
      specialistRun,
      hostEvents,
    );
    if (successor === null) {
      return adaptiveRunSessionInternals.result(
        [
          ...validated.diagnostics,
          adaptiveRunSessionInternals.diagnostic("SC4602", SESSION_ARTIFACT),
        ],
        null,
      );
    }
    return adaptiveRunSessionInternals.result(validated.diagnostics, successor);
  } catch {
    return adaptiveRunSessionInternals.result(
      [adaptiveRunSessionInternals.diagnostic("SC4604", EVENT_ARTIFACT)],
      null,
    );
  }
}

export function replayAdaptiveRunSession(
  target: AdaptiveRunSession,
  expectationInput: unknown,
): OperationResult<AdaptiveRunSession> {
  try {
    const initial = createAdaptiveRunSession(
      target.assignment,
      target.specialistRun.package,
      expectationInput,
    );
    if (!initial.ok || initial.value === null) {
      return adaptiveRunSessionInternals.result(initial.diagnostics, null);
    }
    let current = initial.value;
    for (const row of target.hostEvents) {
      const raw = new Uint8Array(Buffer.from(row.rawBase64, "base64"));
      const next = recordAdaptiveHostEvent(current, expectationInput, raw);
      if (!next.ok || next.value === null) {
        return adaptiveRunSessionInternals.result(
          [...next.diagnostics, adaptiveRunSessionInternals.diagnostic("SC4608", SESSION_ARTIFACT)],
          null,
        );
      }
      current = next.value;
    }
    if (!sameJson(current, target)) {
      return adaptiveRunSessionInternals.result(
        [adaptiveRunSessionInternals.diagnostic("SC4608", SESSION_ARTIFACT)],
        null,
      );
    }
    return adaptiveRunSessionInternals.result([], current);
  } catch {
    return adaptiveRunSessionInternals.result(
      [adaptiveRunSessionInternals.diagnostic("SC4608", SESSION_ARTIFACT)],
      null,
    );
  }
}
