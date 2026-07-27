import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { TextEncoder } from "node:util";

import {
  adaptiveMaterializationExpectedDigest,
  compileRuntimeAssignments,
  createAdaptiveRunSession,
  projectAdaptiveLaunchCommand,
  recordAdaptiveHostEvent,
} from "swecircuit";

import {
  assertOk,
  assertRejected,
  clone,
  makeRoutingFixture,
  reverseObjectProperties,
} from "./runtime-routing-fixture.mjs";

export const ADAPTIVE_RUN_API_VERSION = "swecircuit/adaptive-run/v1alpha1";

const encoder = new TextEncoder();

export { assertOk, assertRejected, clone, reverseObjectProperties };

export function sha256(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

export function digestJson(value) {
  return sha256(encoder.encode(JSON.stringify(value)));
}

export function rawJson(value) {
  return encoder.encode(JSON.stringify(value));
}

export function makeAdaptiveFixture(options = {}) {
  const routing = makeRoutingFixture();
  const assignment = assertOk(
    compileRuntimeAssignments(routing.request),
    "compile adaptive routing assignment",
  );
  const expectation = {
    compilationDigest: assignment.compilationDigest,
    packageDigest: assignment.packageDigest,
    policyDigest: assignment.policyDigest,
    calibrationDigest: assignment.calibrationDigest,
    inventoryDigest: assignment.inventoryDigest,
    assignmentDigest: assignment.contentDigest,
    runId: options.runId ?? "run.adaptive.fixture",
    runRevision: options.runRevision ?? 1,
    predecessorRun: options.predecessorRun ?? null,
    workspaceBaselineDigest: options.workspaceBaselineDigest ?? `sha256:${"7".repeat(64)}`,
    authorizedHostId: options.authorizedHostId ?? assignment.inventory.hostId,
    authorizedAdapterId: options.authorizedAdapterId ?? assignment.inventory.adapterId,
    authorizedAdapterRevision:
      options.authorizedAdapterRevision ?? assignment.inventory.adapterRevision,
    authorizationIssuerId: options.authorizationIssuerId ?? "owner.adaptive.fixture",
    maxHostEvents: options.maxHostEvents ?? 64,
    lineageDepth: options.lineageDepth ?? 0,
    maxLineageDepth: options.maxLineageDepth ?? 8,
  };
  const session = assertOk(
    createAdaptiveRunSession(assignment, routing.specialistPackage, expectation),
    "create adaptive run session",
  );
  return Object.freeze({ ...routing, assignment, expectation, session });
}

export function assignmentFor(fixture, agentId) {
  const assignment = fixture.assignment.selected.rows.find((entry) => entry.agentId === agentId);
  assert.notEqual(assignment, undefined, `missing runtime assignment for ${agentId}`);
  return assignment;
}

export function blueprintFor(fixture, agentId) {
  const blueprint = fixture.compilation.blueprints.find((entry) => entry.id === agentId);
  assert.notEqual(blueprint, undefined, `missing blueprint ${agentId}`);
  return blueprint;
}

export function commandFor(fixture, agentId) {
  return clone(
    assertOk(
      projectAdaptiveLaunchCommand(fixture.session, fixture.expectation, agentId),
      `project launch command for ${agentId}`,
    ),
  );
}

export function baseEvent(fixture, session, agentId, kind, fields = {}) {
  const prior = session.hostEvents.at(-1);
  return {
    apiVersion: ADAPTIVE_RUN_API_VERSION,
    kind,
    runId: fixture.expectation.runId,
    runRevision: fixture.expectation.runRevision,
    sequence: session.hostEvents.length + 1,
    priorEventDigest: prior?.rawDigest ?? null,
    agentId,
    blueprintDigest: blueprintFor(fixture, agentId).contentDigest,
    assignmentDigest: fixture.assignment.contentDigest,
    hostId: fixture.expectation.authorizedHostId,
    adapterId: fixture.expectation.authorizedAdapterId,
    adapterRevision: fixture.expectation.authorizedAdapterRevision,
    attestedBy: "adapter.adaptive.fixture",
    ...fields,
  };
}

export function launchEvent(fixture, session, agentId, fields = {}) {
  return baseEvent(fixture, session, agentId, "HostLaunchAuthorization", {
    attestedBy: fixture.expectation.authorizationIssuerId,
    attemptId: `attempt.${agentId}`,
    authorizationId: `authorization.${agentId}`,
    workspaceBaselineDigest: fixture.expectation.workspaceBaselineDigest,
    command: commandFor(fixture, agentId),
    ...fields,
  });
}

export function materializationFields(fixture, agentId, command = commandFor(fixture, agentId)) {
  const expected = {
    model: command.profileId,
    effort: command.effortId,
    tools: command.tools,
    skills: command.skills,
    isolation: command.isolationFeatures,
    permissions: command.permissions,
    workspace: fixture.expectation.workspaceBaselineDigest,
    context: command.contextSources,
  };
  return Object.entries(expected).map(([field, value]) => ({
    field,
    status: "observed",
    expectedDigest: adaptiveMaterializationExpectedDigest(field, value),
    observedDigest: adaptiveMaterializationExpectedDigest(field, value),
  }));
}

export function materializationEvent(fixture, session, agentId, fields = {}) {
  const authorization = session.hostEvents.at(-1);
  assert.equal(authorization?.kind, "HostLaunchAuthorization", "materialization needs launch");
  const attemptId = `attempt.${agentId}`;
  return baseEvent(fixture, session, agentId, "HostMaterializationClaim", {
    attemptId,
    authorizationEventDigest: authorization.rawDigest,
    nativeHandle: `native.${agentId}`,
    fields: materializationFields(fixture, agentId),
    ...fields,
  });
}

export function lifecycleEvent(fixture, session, agentId, status, fields = {}) {
  const materialization = session.hostEvents.find(
    (event) => event.kind === "HostMaterializationClaim" && event.agentId === agentId,
  );
  const authorization = session.hostEvents.find(
    (event) => event.kind === "HostLaunchAuthorization" && event.agentId === agentId,
  );
  assert.notEqual(authorization, undefined, "lifecycle needs launch");
  assert.notEqual(materialization, undefined, "lifecycle needs prior event");
  return baseEvent(fixture, session, agentId, "HostLifecycleObservation", {
    attemptId: `attempt.${agentId}`,
    authorizationEventDigest: authorization.rawDigest,
    materializationEventDigest: materialization.rawDigest,
    nativeHandle: `native.${agentId}`,
    status,
    evidence: [],
    ...fields,
  });
}

export function steeringEvent(fixture, session, agentId, fields = {}) {
  const authorization = session.hostEvents.find(
    (event) => event.kind === "HostLaunchAuthorization" && event.agentId === agentId,
  );
  assert.notEqual(authorization, undefined, "steering needs launch");
  return baseEvent(fixture, session, agentId, "HostSteeringAuthorization", {
    attemptId: `attempt.${agentId}`,
    authorizationEventDigest: authorization.rawDigest,
    requestedBy: "owner.adaptive.fixture",
    message: "Continue with the approved contract.",
    rationale: "Record a bounded user instruction.",
    ...fields,
  });
}

export function adapterFailureEvent(fixture, session, agentId, fields = {}) {
  return baseEvent(fixture, session, agentId, "HostAdapterFailure", {
    attemptId: null,
    phase: "authorization",
    certainty: "no_effect",
    code: "adapter.fixture.failure",
    evidence: [],
    ...fields,
  });
}

export function handoffFor(fixture, agentId, outcome = "pass") {
  const blueprint = blueprintFor(fixture, agentId);
  const artifacts = blueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: name.endsWith(".json") ? "application/json" : "text/markdown",
    content: `# Adaptive evidence\n\n${agentId} completed with ${outcome}.\n`,
  }));
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistAgentHandoff",
    outcome,
    destination: blueprint.handoff.destination,
    goal: {
      id: fixture.compilation.goal.id,
      revision: fixture.compilation.goal.revision,
      digest: fixture.compilation.goalDigest,
    },
    agent: { id: agentId, blueprintDigest: blueprint.contentDigest },
    compilationDigest: fixture.compilation.contentDigest,
    summary: `${agentId} completed with ${outcome}.`,
    workUnitsCompleted: outcome === "pass" ? blueprint.workUnitIds : [],
    artifacts,
    evidence: blueprint.evidenceDuties.map((duty, index) => ({
      criterionId: duty.criterionId,
      requirementId: duty.requirementId,
      kind: duty.kind,
      duty: duty.duty,
      status: outcome,
      artifact: artifacts[index % artifacts.length].name,
    })),
    assumptions: [],
    risks: outcome === "pass" ? [] : ["The integration owner must route this outcome."],
    followUps: [],
  };
}

export function resultCaptureEvent(fixture, session, agentId, outcome = "pass", fields = {}) {
  const authorization = session.hostEvents.find(
    (event) => event.kind === "HostLaunchAuthorization" && event.agentId === agentId,
  );
  const materialization = session.hostEvents.find(
    (event) => event.kind === "HostMaterializationClaim" && event.agentId === agentId,
  );
  const terminal = session.hostEvents.at(-1);
  assert.equal(terminal?.kind, "HostLifecycleObservation", "capture needs terminal lifecycle");
  const rawHandoff = rawJson(handoffFor(fixture, agentId, outcome));
  return baseEvent(fixture, session, agentId, "HostResultCapture", {
    attemptId: `attempt.${agentId}`,
    authorizationEventDigest: authorization.rawDigest,
    materializationEventDigest: materialization.rawDigest,
    terminalLifecycleEventDigest: terminal.rawDigest,
    steeringEventDigests: session.hostEvents
      .filter((event) => event.kind === "HostSteeringAuthorization" && event.agentId === agentId)
      .map((event) => event.rawDigest),
    rawHandoffEncoding: "base64",
    rawHandoffBytes: rawHandoff.byteLength,
    rawHandoffDigest: sha256(rawHandoff),
    rawHandoffBase64: Buffer.from(rawHandoff).toString("base64"),
    ...fields,
  });
}

export function appendEvent(fixture, session, event) {
  return assertOk(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(event)),
    `record ${event.kind}`,
  );
}

export function launchAndMaterialize(fixture, agentId) {
  let session = fixture.session;
  session = appendEvent(fixture, session, launchEvent(fixture, session, agentId));
  return appendEvent(fixture, session, materializationEvent(fixture, session, agentId));
}
