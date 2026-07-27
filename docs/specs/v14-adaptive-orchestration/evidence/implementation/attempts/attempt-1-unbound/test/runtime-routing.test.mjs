import assert from "node:assert/strict";
import { test } from "node:test";

import {
  RUNTIME_ROUTING_API_VERSION,
  RUNTIME_ROUTING_LIMITS,
  applyRuntimeAssignmentOverride,
  compileRuntimeAssignments,
  verifyRuntimeAssignmentCompilation,
} from "swecircuit";

import {
  OBSERVED,
  assertOk,
  assertRejected,
  clone,
  makeRoutingFixture,
  reverseLogicalCollections,
  rowFor,
} from "./helpers/runtime-routing-fixture.mjs";

test("runtime routing derives complete demand and selects a least-cost independent exact vector", () => {
  const fixture = makeRoutingFixture();
  const compilation = assertOk(compileRuntimeAssignments(fixture.request), "routing should compile");

  assert.equal(compilation.apiVersion, RUNTIME_ROUTING_API_VERSION);
  assert.equal(compilation.demands.length, 2);
  assert.equal(compilation.demands.every((demand) => demand.requiredCapabilities.length === 1), true);
  assert.equal(compilation.demands.every((demand) => demand.contextBytes === 1), true);
  assert.equal(compilation.demands.some((demand) => demand.producerAgentIds.length > 0), true);
  assert.equal(compilation.demands.some((demand) => demand.checkerAgentIds.length > 0), true);
  assert.equal(compilation.search.mode, "exact");
  assert.equal(compilation.search.claim, "exhaustive_assignment_vector_search");
  assert.equal(compilation.search.potentialVectors, 9);
  assert.equal(compilation.search.evaluatedVectors, 9);
  assert.equal(compilation.selected.selectionReason, "lowest_exact_vector");
  assert.equal(compilation.selected.rows.length, 2);
  assert.equal(
    new Set(compilation.selected.rows.map((assignment) => assignment.independenceDomain)).size,
    2,
    "producer and checker must be assigned to distinct exact independence domains",
  );
  assert.deepEqual(
    compilation.selected.comparator,
    {
      totalCostRank: 3,
      maximumLatencyRank: 3,
      totalLatencyRank: 5,
      totalQualityExcess: 2,
      totalReasoningExcess: 2,
      totalContextExcessBytes: 8190,
      totalToolExcess: 0,
      totalSkillExcess: 0,
      totalEffortRank: 2,
      canonicalIdentity: compilation.selected.comparator.canonicalIdentity,
    },
    "the vector comparator must apply the published field order before canonical identity",
  );
  assertOk(
    verifyRuntimeAssignmentCompilation(compilation, {
      compilationDigest: compilation.contentDigest,
      packageDigest: fixture.specialist.expectation.packageDigest,
    }),
    "fresh assignment compilation should verify against its trusted expectation",
  );
});

test("row evaluation accumulates every hard-gate failure in the closed rejection-code order", () => {
  const fixture = makeRoutingFixture();
  const bad = rowFor(fixture, "row.alpha");
  bad.reasoningTier = "reasoning-0";
  bad.capabilities = [{ capabilityId: "verify.run-graph", qualityTier: "quality-0" }];
  bad.contextLimitBytes = 0;
  bad.tools = [];
  bad.skills = [];
  bad.isolationFeatures = [];
  bad.permissionFeatures = [];
  bad.observationModes = { ...OBSERVED, model: "unavailable" };
  fixture.inventory.rows[0].availability = "unavailable";

  const compilation = assertOk(compileRuntimeAssignments(fixture.request), "other rows remain feasible");
  const evaluation = compilation.evaluations.find(
    (entry) => entry.calibrationRowId === "row.alpha",
  );
  assert.notEqual(evaluation, undefined, "unavailable rows remain visible for correction");
  assert.equal(evaluation.eligible, false);
  assert.deepEqual(evaluation.rejectionCodes, [
    "unavailable",
    "quality_tier",
    "reasoning_tier",
    "context_capacity",
    "required_tool",
    "required_skill",
    "isolation_feature",
    "permission_feature",
    "observation_mode",
  ]);
});

test("coverage and source-binding gates reject before routing", () => {
  const missingCoverage = makeRoutingFixture();
  missingCoverage.policy.capabilityRules = [];
  assertRejected(
    compileRuntimeAssignments(missingCoverage.request),
    "SC4503",
    "every blueprint capability needs exactly one policy rule",
  );

  const duplicateCoverage = makeRoutingFixture();
  duplicateCoverage.policy.evidenceRules.push(clone(duplicateCoverage.policy.evidenceRules[0]));
  assertRejected(
    compileRuntimeAssignments(duplicateCoverage.request),
    "SC4503",
    "every owned evidence pair needs exactly one policy rule",
  );

  const adapterMismatch = makeRoutingFixture();
  adapterMismatch.inventory.adapterRevision = "different";
  assertRejected(
    compileRuntimeAssignments(adapterMismatch.request),
    "SC4504",
    "inventory and calibration adapter identities are a hard binding",
  );
});

test("full-vector independence rejects otherwise eligible assignments", () => {
  const fixture = makeRoutingFixture();
  for (const calibrationRow of fixture.calibration.runtimeRows) {
    calibrationRow.independenceDomain = "shared-domain";
  }
  assertRejected(
    compileRuntimeAssignments(fixture.request),
    "SC4506",
    "independence is a full-roster feasibility gate, not a per-row preference",
  );
});

test("exact and bounded searches make only their respective claims", () => {
  const exact = makeRoutingFixture({ exactVectorLimit: 9 });
  const exactCompilation = assertOk(compileRuntimeAssignments(exact.request), "exact boundary compiles");
  assert.equal(exactCompilation.search.mode, "exact");
  assert.equal(exactCompilation.search.claim, "exhaustive_assignment_vector_search");

  const bounded = makeRoutingFixture({ exactVectorLimit: 8, boundedBeamWidth: 1 });
  const boundedCompilation = assertOk(
    compileRuntimeAssignments(bounded.request),
    "bounded search compiles",
  );
  assert.equal(boundedCompilation.search.mode, "bounded");
  assert.equal(
    boundedCompilation.search.claim,
    "bounded_evaluated_set_no_global_optimum",
  );
  assert.equal(boundedCompilation.selected.selectionReason, "lowest_bounded_evaluated_vector");
  assert.ok(boundedCompilation.search.evaluatedVectors < boundedCompilation.search.potentialVectors);
});

test("logical input permutations preserve the same digest and selected vector", () => {
  const fixture = makeRoutingFixture();
  const first = assertOk(compileRuntimeAssignments(fixture.request), "canonical input compiles");
  const permuted = assertOk(
    compileRuntimeAssignments(reverseLogicalCollections(fixture.request)),
    "permuted logical collections compile",
  );
  assert.equal(permuted.contentDigest, first.contentDigest);
  assert.deepEqual(permuted.selected, first.selected);
  assert.deepEqual(permuted.demands, first.demands);
});

test("owner overrides retain the full vector but cannot bypass feasibility", () => {
  const fixture = makeRoutingFixture();
  const original = assertOk(compileRuntimeAssignments(fixture.request), "base assignment compiles");
  const target = original.selected.rows[0];
  const replacement = rowFor(fixture, "row.gamma");
  const override = {
    apiVersion: RUNTIME_ROUTING_API_VERSION,
    kind: "RuntimeAssignmentOverride",
    predecessorAssignmentDigest: original.contentDigest,
    agentId: target.agentId,
    replacementCalibrationRowId: replacement.id,
    requestedBy: "fixture.owner",
    rationale: "Use the independently feasible reviewed alternative.",
  };
  const overridden = assertOk(
    applyRuntimeAssignmentOverride(original, override),
    "a feasible owner override is recorded as a new compilation",
  );
  assert.equal(overridden.predecessorAssignmentDigest, original.contentDigest);
  assert.equal(overridden.override.replacementCalibrationRowId, replacement.id);
  assert.equal(overridden.selected.selectionReason, "owner_override");
  assert.notEqual(overridden.contentDigest, original.contentDigest);
  assert.equal(overridden.selected.rows.length, original.selected.rows.length);

  const conflicting = {
    ...override,
    replacementCalibrationRowId: original.selected.rows[1].calibrationRowId,
  };
  assertRejected(
    applyRuntimeAssignmentOverride(original, conflicting),
    "SC4508",
    "an override cannot collapse a producer/checker independence edge",
  );
});

test("malformed inputs and published routing limits fail closed", () => {
  const malformed = makeRoutingFixture();
  malformed.request.unexpected = "closed roots reject unknown properties";
  assertRejected(
    compileRuntimeAssignments(malformed.request),
    "SC4501",
    "routing roots are closed objects",
  );

  const oversizedSearch = makeRoutingFixture();
  oversizedSearch.policy.search.exactVectorLimit = RUNTIME_ROUTING_LIMITS.maxExactVectors + 1;
  assertRejected(
    compileRuntimeAssignments(oversizedSearch.request),
    "SC4502",
    "caller search limits cannot exceed the published maximum",
  );

  const impossibleBoundedSearch = makeRoutingFixture();
  impossibleBoundedSearch.policy.search.boundedBeamWidth = 0;
  assertRejected(
    compileRuntimeAssignments(impossibleBoundedSearch.request),
    "SC4501",
    "search widths must remain positive finite integers",
  );
});
