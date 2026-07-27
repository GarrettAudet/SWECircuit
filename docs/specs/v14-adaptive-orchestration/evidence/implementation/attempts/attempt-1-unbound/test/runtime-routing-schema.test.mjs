import assert from "node:assert/strict";
import { test } from "node:test";

import Ajv2020 from "ajv/dist/2020.js";
import {
  RUNTIME_ROUTING_API_VERSION,
  RUNTIME_ROUTING_LIMITS,
  applyRuntimeAssignmentOverride,
  compileRuntimeAssignments,
  verifyRuntimeAssignmentCompilation,
} from "swecircuit";
import runtimeRoutingSchema from "swecircuit/schemas/v1alpha1/runtime-routing.schema.json" with { type: "json" };

import {
  assertOk,
  assertRejected,
  clone,
  makeRoutingFixture,
} from "./helpers/runtime-routing-fixture.mjs";

function validate(value) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validator = ajv.compile(runtimeRoutingSchema);
  return { valid: validator(value), errors: validator.errors };
}

test("the packed public API exposes every runtime-routing operation and schema", () => {
  assert.equal(RUNTIME_ROUTING_API_VERSION, "swecircuit/runtime-routing/v1alpha1");
  assert.equal(RUNTIME_ROUTING_LIMITS.maxExactVectors, 200000);
  assert.equal(typeof compileRuntimeAssignments, "function");
  assert.equal(typeof applyRuntimeAssignmentOverride, "function");
  assert.equal(typeof verifyRuntimeAssignmentCompilation, "function");
  assert.equal(runtimeRoutingSchema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(typeof runtimeRoutingSchema.$id, "string");
});

test("the public schema accepts the same valid routing request accepted by the runtime", () => {
  const fixture = makeRoutingFixture();
  const schemaResult = validate(fixture.request);
  assert.equal(schemaResult.valid, true, JSON.stringify(schemaResult.errors));
  assertOk(compileRuntimeAssignments(fixture.request), "schema-valid request compiles");
});

test("closed-schema failures and runtime failures agree for malformed routing input", () => {
  const fixture = makeRoutingFixture();
  const malformed = clone(fixture.request);
  malformed.unexpected = true;
  const schemaResult = validate(malformed);
  assert.equal(schemaResult.valid, false, "schema must reject an unknown root property");
  assertRejected(
    compileRuntimeAssignments(malformed),
    "SC4501",
    "runtime must reject the same closed-schema violation",
  );
});

test("schema and runtime preserve published numeric bounds", () => {
  const fixture = makeRoutingFixture();
  fixture.request.policy.search.exactVectorLimit = RUNTIME_ROUTING_LIMITS.maxExactVectors + 1;
  const schemaResult = validate(fixture.request);
  assert.equal(schemaResult.valid, false, "schema must cap exact-vector limits");
  assertRejected(
    compileRuntimeAssignments(fixture.request),
    "SC4502",
    "runtime must report the matching routing resource limit",
  );
});
