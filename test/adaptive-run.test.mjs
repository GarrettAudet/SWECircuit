import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import test from "node:test";

import {
  ADAPTIVE_RUN_LIMITS,
  createAdaptiveRunSession,
  inspectAdaptiveRunSession,
  recordAdaptiveHostEvent,
  renderAdaptiveRunView,
  renderAdaptiveRunViewMarkdown,
  restoreAdaptiveRunSession,
} from "swecircuit";

import {
  adapterFailureEvent,
  appendEvent,
  assertOk,
  assertRejected,
  baseEvent,
  clone,
  launchAndMaterialize,
  launchEvent,
  lifecycleEvent,
  makeAdaptiveFixture,
  materializationEvent,
  rawJson,
  reverseObjectProperties,
  resultCaptureEvent,
  steeringEvent,
} from "./helpers/adaptive-run-fixture.mjs";

function firstAgent(fixture) {
  return fixture.assignment.selected.rows[0].agentId;
}

test("adaptive session binds the approved assignment, package, and full expectation", () => {
  const fixture = makeAdaptiveFixture();
  assert.equal(fixture.session.assignment.contentDigest, fixture.assignment.contentDigest);
  assert.equal(
    fixture.session.specialistRun.packageDigest,
    fixture.specialistPackage.packageDigest,
  );

  for (const key of [
    "compilationDigest",
    "packageDigest",
    "policyDigest",
    "calibrationDigest",
    "inventoryDigest",
    "assignmentDigest",
    "authorizedHostId",
  ]) {
    const expectation = clone(fixture.expectation);
    expectation[key] = `sha256:${"f".repeat(64)}`;
    assertRejected(
      createAdaptiveRunSession(fixture.assignment, fixture.specialistPackage, expectation),
      "SC4603",
      `rejects a mismatched ${key}`,
    );
  }
});

test("all host event kinds retain exact raw bytes and settle through V12", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  let session = appendEvent(
    fixture,
    fixture.session,
    launchEvent(fixture, fixture.session, agentId),
  );
  session = appendEvent(fixture, session, materializationEvent(fixture, session, agentId));
  session = appendEvent(fixture, session, lifecycleEvent(fixture, session, agentId, "running"));
  session = appendEvent(fixture, session, steeringEvent(fixture, session, agentId));
  session = appendEvent(fixture, session, lifecycleEvent(fixture, session, agentId, "completed"));
  session = appendEvent(fixture, session, resultCaptureEvent(fixture, session, agentId));

  assert.deepEqual(
    session.hostEvents.map((event) => event.kind),
    [
      "HostLaunchAuthorization",
      "HostMaterializationClaim",
      "HostLifecycleObservation",
      "HostSteeringAuthorization",
      "HostLifecycleObservation",
      "HostResultCapture",
    ],
  );
  assert.equal(session.hostEvents.at(-1).rawBytes > 0, true);
  assert.equal(session.specialistRun.acceptedHandoffs.length, 1);
  const capture = JSON.parse(
    Buffer.from(session.hostEvents.at(-1).rawBase64, "base64").toString("utf8"),
  );
  assert.equal(session.specialistRun.acceptedHandoffs[0].rawBase64, capture.rawHandoffBase64);
});

test("host event sequence, digest-chain, and raw-event idempotence fail closed", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  const launch = launchEvent(fixture, fixture.session, agentId);
  const raw = rawJson(launch);
  const session = appendEvent(fixture, fixture.session, launch);
  const idempotent = assertOk(
    recordAdaptiveHostEvent(session, fixture.expectation, raw),
    "accept exact duplicate raw launch idempotently",
  );
  assert.equal(idempotent.contentDigest, session.contentDigest);

  const conflicting = clone(launch);
  conflicting.attestedBy = "adapter.conflict";
  assertRejected(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(conflicting)),
    "SC4605",
    "rejects a different event at an occupied sequence",
  );
  const stale = materializationEvent(fixture, session, agentId);
  stale.priorEventDigest = null;
  assertRejected(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(stale)),
    "SC4605",
    "rejects a stale prior digest",
  );
});

test("materialization checks exact authority and offers no hidden fallback", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  let session = appendEvent(
    fixture,
    fixture.session,
    launchEvent(fixture, fixture.session, agentId),
  );
  const missing = materializationEvent(fixture, session, agentId);
  missing.fields.pop();
  assertRejected(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(missing)),
    "SC4606",
    "rejects missing materialization evidence",
  );
  const widened = materializationEvent(fixture, session, agentId);
  widened.fields.find((field) => field.field === "tools").observedDigest =
    `sha256:${"1".repeat(64)}`;
  const widenedSession = assertOk(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(widened)),
    "preserves mismatched observed authority as evidence",
  );
  assert.equal(
    assertOk(inspectAdaptiveRunSession(widenedSession, fixture.expectation)).routes.some(
      (route) => route.outcome === "block",
    ),
    true,
  );
  const unavailable = materializationEvent(fixture, session, agentId);
  unavailable.fields.find((field) => field.field === "model").status = "unavailable";
  unavailable.fields.find((field) => field.field === "model").observedDigest = null;
  const unavailableSession = assertOk(
    recordAdaptiveHostEvent(session, fixture.expectation, rawJson(unavailable)),
    "preserves unavailable model observation as evidence",
  );
  assert.equal(
    assertOk(inspectAdaptiveRunSession(unavailableSession, fixture.expectation)).routes.some(
      (route) => route.outcome === "block",
    ),
    true,
  );
  session = appendEvent(fixture, session, materializationEvent(fixture, session, agentId));
  assert.equal(session.hostEvents.length, 2);
});

test("inspection limits launches to V12 eligibility and host concurrency", () => {
  const fixture = makeAdaptiveFixture();
  const inspection = assertOk(
    inspectAdaptiveRunSession(fixture.session, fixture.expectation),
    "inspect fresh adaptive session",
  );
  const launches = inspection.nextActions.filter(
    (action) => action.kind === "launch_native_agent" && action.availability === "enabled",
  );
  assert.equal(launches.length <= fixture.assignment.inventory.maxConcurrentAgents, true);
  const active = launchAndMaterialize(fixture, firstAgent(fixture));
  const activeInspection = assertOk(
    inspectAdaptiveRunSession(active, fixture.expectation),
    "inspect host-active adaptive session",
  );
  assert.equal(
    activeInspection.nextActions.some(
      (action) => action.kind === "launch_native_agent" && action.availability === "enabled",
    ),
    false,
    "active capacity does not permit an untracked concurrent launch",
  );
});

test("adapter failures, unknown status, and liveness failures route to bounded attention", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  const noEffect = appendEvent(
    fixture,
    fixture.session,
    adapterFailureEvent(fixture, fixture.session, agentId),
  );
  const noEffectInspection = assertOk(inspectAdaptiveRunSession(noEffect, fixture.expectation));
  assert.equal(
    noEffectInspection.routes.some((route) => route.outcome === "block"),
    true,
  );

  const active = launchAndMaterialize(fixture, agentId);
  for (const status of ["unknown", "liveness_failed"]) {
    const session = appendEvent(fixture, active, lifecycleEvent(fixture, active, agentId, status));
    const inspection = assertOk(inspectAdaptiveRunSession(session, fixture.expectation));
    assert.equal(
      inspection.routes.some((route) => route.outcome === "diagnose"),
      true,
      status,
    );
  }
});

test("verified V12 non-pass outcomes route without being reclassified as completion", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  let session = launchAndMaterialize(fixture, agentId);
  session = appendEvent(fixture, session, lifecycleEvent(fixture, session, agentId, "completed"));
  session = appendEvent(fixture, session, resultCaptureEvent(fixture, session, agentId, "fix"));
  const inspection = assertOk(inspectAdaptiveRunSession(session, fixture.expectation));
  assert.equal(inspection.integrationReady, false);
  assert.equal(
    inspection.routes.some((route) => route.outcome === "fix"),
    true,
  );
  assertRejected(
    recordAdaptiveHostEvent(
      session,
      fixture.expectation,
      rawJson(launchEvent(fixture, session, agentId)),
    ),
    "SC4609",
    "terminal V12 settlement rejects a second launch",
  );
});

test("successor lineage is explicit, bounded, and cannot silently reuse a terminal session", () => {
  const predecessor = {
    runId: "run.predecessor",
    sessionDigest: `sha256:${"9".repeat(64)}`,
    terminalOutcome: "diagnose",
    evidenceDigest: `sha256:${"8".repeat(64)}`,
  };
  const valid = makeAdaptiveFixture({
    runId: "run.successor",
    predecessorRun: predecessor,
    lineageDepth: 1,
  });
  assert.equal(valid.session.expectation.predecessorRun.runId, predecessor.runId);
  const invalidExpectation = clone(valid.expectation);
  invalidExpectation.lineageDepth = ADAPTIVE_RUN_LIMITS.maxLineageDepth + 1;
  assertRejected(
    createAdaptiveRunSession(valid.assignment, valid.specialistPackage, invalidExpectation),
    "SC4610",
    "lineage cannot exceed the published maximum",
  );
});

test("restore rejects substitutions and remains deterministic under JSON key permutations", () => {
  const fixture = makeAdaptiveFixture();
  const raw = rawJson(fixture.session);
  const restored = assertOk(
    restoreAdaptiveRunSession(raw, fixture.expectation),
    "restore exact session",
  );
  assert.equal(restored.contentDigest, fixture.session.contentDigest);
  const substituted = clone(fixture.session);
  substituted.assignment.packageDigest = `sha256:${"e".repeat(64)}`;
  assertRejected(
    restoreAdaptiveRunSession(rawJson(substituted), fixture.expectation),
    "SC4608",
    "restore rejects embedded assignment substitution",
  );
  const permuted = JSON.stringify(reverseObjectProperties(fixture.session));
  assertOk(restoreAdaptiveRunSession(new TextEncoder().encode(permuted), fixture.expectation));
});

test("RunView preserves provenance, redacts secrets, source links, interventions, and serialization", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  let session = launchAndMaterialize(fixture, agentId);
  session = appendEvent(fixture, session, steeringEvent(fixture, session, agentId));
  const inspection = assertOk(inspectAdaptiveRunSession(session, fixture.expectation));
  const view = assertOk(renderAdaptiveRunView(inspection), "render RunView");
  const markdown = assertOk(renderAdaptiveRunViewMarkdown(view), "render RunView markdown");
  const serialized = JSON.stringify(view);
  assert.equal(serialized.includes("kernel proof"), false);
  assert.equal(serialized.includes(fixture.assignment.contentDigest), true);
  assert.equal(markdown.includes("host-reported"), true);
  assert.deepEqual(assertOk(renderAdaptiveRunView(JSON.parse(serialized))), view);
});

test("adaptive event, session, and RunView limits reject before unbounded work", () => {
  const fixture = makeAdaptiveFixture({ maxHostEvents: 1 });
  const agentId = firstAgent(fixture);
  const launched = appendEvent(
    fixture,
    fixture.session,
    launchEvent(fixture, fixture.session, agentId),
  );
  assertRejected(
    recordAdaptiveHostEvent(
      launched,
      fixture.expectation,
      rawJson(materializationEvent(fixture, launched, agentId)),
    ),
    "SC4602",
    "expectation-narrowed event count is enforced",
  );
  const oversized = baseEvent(fixture, fixture.session, agentId, "HostAdapterFailure", {
    attemptId: null,
    phase: "inventory",
    certainty: "no_effect",
    code: "x".repeat(ADAPTIVE_RUN_LIMITS.maxSteeringBytes + 1),
    evidence: [],
  });
  assertRejected(
    recordAdaptiveHostEvent(fixture.session, fixture.expectation, rawJson(oversized)),
    "SC4602",
    "host event byte and text limits are enforced",
  );
});
