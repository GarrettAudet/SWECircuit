import assert from "node:assert/strict";
import test from "node:test";

import {
  ADAPTIVE_RUN_API_VERSION,
  ADAPTIVE_RUN_LIMITS,
  ADAPTIVE_RUN_SCHEMA_SOURCE,
  createAdaptiveRunSession,
  RUNTIME_ROUTING_API_VERSION,
  RUNTIME_ROUTING_LIMITS,
  RUNTIME_ROUTING_SCHEMA_SOURCE,
  recordAdaptiveHostEvent,
} from "swecircuit";

import {
  assertRejected,
  clone,
  launchEvent,
  makeAdaptiveFixture,
  rawJson,
} from "./helpers/adaptive-run-fixture.mjs";

function firstAgent(fixture) {
  return fixture.assignment.selected.rows[0].agentId;
}

function schema(source, name) {
  const parsed = JSON.parse(source);
  assert.equal(parsed.$schema, "https://json-schema.org/draft/2020-12/schema", `${name} dialect`);
  assert.equal(typeof parsed.$id, "string", `${name} id`);
  assert.equal(typeof parsed.$defs, "object", `${name} definitions`);
  return parsed;
}

test("published V14 schema sources are closed JSON Schema documents", () => {
  const routing = schema(RUNTIME_ROUTING_SCHEMA_SOURCE, "runtime-routing");
  const adaptive = schema(ADAPTIVE_RUN_SCHEMA_SOURCE, "adaptive-run");
  for (const document of [routing, adaptive]) {
    assert.equal(JSON.stringify(document).includes('"additionalProperties":false'), true);
    assert.equal(JSON.stringify(document).includes("contentDigest"), true);
  }
  assert.equal(RUNTIME_ROUTING_API_VERSION, "swecircuit/runtime-routing/v1alpha1");
  assert.equal(ADAPTIVE_RUN_API_VERSION, "swecircuit/adaptive-run/v1alpha1");
});

test("runtime and adaptive public limits retain the normative V14 bounds", () => {
  assert.deepEqual(
    RUNTIME_ROUTING_LIMITS,
    {
      maxBlueprints: 16,
      maxPolicyRules: 256,
      maxCalibrationRows: 192,
      maxInventoryRows: 192,
      maxLogicalSetItems: 256,
      maxEvidenceBindings: 512,
      maxExactVectors: 200000,
      maxBeamWidth: 512,
      maxIdentifierBytes: 128,
      maxTextBytes: 16384,
      maxContextBytes: 134217728,
      maxCanonicalBytes: 16777216,
    },
    "routing limits are public and exact",
  );
  assert.deepEqual(ADAPTIVE_RUN_LIMITS, {
    maxHostEvents: 512,
    maxEventBytes: 1048576,
    maxHostEvidenceBindings: 512,
    maxSteeringBytes: 16384,
    maxLineageDepth: 8,
    maxSessionBytes: 268435456,
    maxInspectionBytes: 16777216,
    maxRunViewBytes: 16777216,
  });
});

test("schema and runtime reject closed-root additions and malformed expectation values alike", () => {
  const fixture = makeAdaptiveFixture();
  const unknownExpectation = clone(fixture.expectation);
  unknownExpectation.unexpected = true;
  assertRejected(
    createAdaptiveRunSession(fixture.assignment, fixture.specialistPackage, unknownExpectation),
    "SC4601",
    "adaptive expectation runtime mirrors its closed schema",
  );
  const event = launchEvent(fixture, fixture.session, firstAgent(fixture));
  event.unexpected = true;
  assertRejected(
    recordAdaptiveHostEvent(fixture.session, fixture.expectation, rawJson(event)),
    "SC4601",
    "host event runtime mirrors its closed schema",
  );
});

test("raw event parser rejects duplicate keys, unsafe UTF-8, and schema-invalid event variants", () => {
  const fixture = makeAdaptiveFixture();
  const agentId = firstAgent(fixture);
  const duplicate = `{"apiVersion":"${ADAPTIVE_RUN_API_VERSION}","apiVersion":"${ADAPTIVE_RUN_API_VERSION}"}`;
  assertRejected(
    recordAdaptiveHostEvent(
      fixture.session,
      fixture.expectation,
      new TextEncoder().encode(duplicate),
    ),
    "SC4601",
    "duplicate raw JSON keys fail closed",
  );
  const invalidUtf8 = new Uint8Array([0xff, 0xfe, 0xfd]);
  assertRejected(
    recordAdaptiveHostEvent(fixture.session, fixture.expectation, invalidUtf8),
    "SC4601",
    "invalid UTF-8 fails before event processing",
  );
  const event = launchEvent(fixture, fixture.session, agentId);
  delete event.command.agentContractDigest;
  assertRejected(
    recordAdaptiveHostEvent(fixture.session, fixture.expectation, rawJson(event)),
    "SC4601",
    "runtime requires every schema-bound launch field",
  );
});

test("V14 additions preserve V11 and V12 public boundary names", async () => {
  const api = await import("swecircuit");
  for (const name of [
    "compileAgentBlueprints",
    "renderSpecialistPackage",
    "verifySpecialistHandoff",
    "createSpecialistRunSession",
    "restoreSpecialistRunSession",
    "recordSpecialistRunHandoff",
    "inspectSpecialistRunSession",
    "compileRuntimeAssignments",
    "verifyRuntimeAssignmentCompilation",
    "createAdaptiveRunSession",
    "restoreAdaptiveRunSession",
    "recordAdaptiveHostEvent",
    "inspectAdaptiveRunSession",
    "renderAdaptiveRunView",
    "renderAdaptiveRunViewMarkdown",
  ]) {
    assert.equal(typeof api[name], "function", `${name} remains a packed public operation`);
  }
  assert.equal(typeof api.SPECIALIST_RUN_API_VERSION, "string");
  assert.equal(typeof api.RUNTIME_ROUTING_SCHEMA_SOURCE, "string");
  assert.equal(typeof api.ADAPTIVE_RUN_SCHEMA_SOURCE, "string");
});
