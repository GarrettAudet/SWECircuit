import assert from "node:assert/strict";
import { test } from "node:test";

import * as swecircuit from "swecircuit";

import { assertRejected, makeRoutingFixture } from "./helpers/runtime-routing-fixture.mjs";

test("the packed public runtime-routing surface exports every normative operation and limit", () => {
  assert.equal(swecircuit.RUNTIME_ROUTING_API_VERSION, "swecircuit/runtime-routing/v1alpha1");
  assert.equal(typeof swecircuit.RUNTIME_ROUTING_LIMITS, "object");
  assert.equal(swecircuit.RUNTIME_ROUTING_LIMITS.maxExactVectors, 200000);
  assert.equal(swecircuit.RUNTIME_ROUTING_LIMITS.maxBeamWidth, 512);

  for (const operation of [
    "compileRuntimeAssignments",
    "applyRuntimeAssignmentOverride",
    "verifyRuntimeAssignmentCompilation",
    "createAdaptiveRunSession",
    "restoreAdaptiveRunSession",
    "inspectAdaptiveRunSession",
    "recordAdaptiveHostEvent",
    "renderAdaptiveRunView",
    "renderAdaptiveRunViewMarkdown",
  ]) {
    assert.equal(typeof swecircuit[operation], "function", `${operation} must be publicly callable`);
  }
});

test("the packed schemas are publicly importable and match their source constants", async () => {
  const [runtimeModule, adaptiveModule] = await Promise.all([
    import("swecircuit/schemas/v1alpha1/runtime-routing.schema.json", {
      with: { type: "json" },
    }),
    import("swecircuit/schemas/v1alpha1/adaptive-run.schema.json", {
      with: { type: "json" },
    }),
  ]);

  for (const [name, module] of [
    ["runtime", runtimeModule],
    ["adaptive", adaptiveModule],
  ]) {
    assert.equal(typeof module.default, "object", `${name} schema export must be JSON`);
    assert.equal(typeof module.default.$schema, "string", `${name} schema must declare a dialect`);
  }
  assert.deepEqual(JSON.parse(swecircuit.RUNTIME_ROUTING_SCHEMA_SOURCE), runtimeModule.default);
  assert.deepEqual(JSON.parse(swecircuit.ADAPTIVE_RUN_SCHEMA_SOURCE), adaptiveModule.default);
});

test("schema validation rejects unknown roots and incomplete trust expectations", () => {
  const unknownRoot = makeRoutingFixture();
  unknownRoot.request.unreviewedExtension = true;
  assertRejected(
    swecircuit.compileRuntimeAssignments(unknownRoot.request),
    "SC4501",
    "routing request roots must be closed",
  );

  const compilation = swecircuit.compileRuntimeAssignments(makeRoutingFixture().request);
  assert.equal(compilation.ok, true, JSON.stringify(compilation.diagnostics));
  assert.notEqual(compilation.value, null);
  assertRejected(
    swecircuit.verifyRuntimeAssignmentCompilation(compilation.value, {
      compilationDigest: compilation.value.compilationDigest,
    }),
    "SC4501",
    "assignment expectations must be complete closed objects",
  );
});
