import assert from "node:assert/strict";
import { test } from "node:test";

import {
  applyRuntimeAssignmentOverride,
  compileRuntimeAssignments,
  RUNTIME_ROUTING_LIMITS,
  verifyRuntimeAssignmentCompilation,
} from "swecircuit";

import {
  assertOk,
  assertRejected,
  clone,
  inventoryRow,
  makeRoutingFixture,
  reverseObjectProperties,
  row,
} from "./helpers/runtime-routing-fixture.mjs";

function compileFixture(fixture, message = "runtime assignments should compile") {
  return assertOk(compileRuntimeAssignments(fixture.request), message);
}

function selectedByCalibrationRowId(compilation) {
  return new Map(compilation.selected.rows.map((entry) => [entry.calibrationRowId, entry]));
}

function selectedProducerRowId(compilation) {
  return compilation.selected.rows.find((entry) => entry.profileId.startsWith("profile.producer."))
    .calibrationRowId;
}

function rowEvaluation(compilation, calibrationRowId) {
  const evaluation = compilation.evaluations.find(
    (entry) => entry.calibrationRowId === calibrationRowId,
  );
  assert.notEqual(evaluation, undefined, `missing evaluation for ${calibrationRowId}`);
  return evaluation;
}

function makeComparatorTieFixture() {
  const fixture = makeRoutingFixture();
  for (const id of [
    "row.checker.domain-a",
    "row.checker.domain-b",
    "row.producer.domain-a",
    "row.producer.domain-b",
  ]) {
    const entry = row(fixture, id);
    entry.costRank = 1;
    entry.latencyRank = 1;
    entry.effortRank = 1;
    entry.contextLimitBytes = 4096;
    entry.tools = ["tool.alpha"];
    entry.skills = ["skill.alpha"];
  }
  return fixture;
}

test("runtime routing derives demand and selects a deterministic exact vector", () => {
  const fixture = makeRoutingFixture();
  const first = compileFixture(fixture);
  const reordered = clone(fixture);
  reordered.request = reverseObjectProperties(reordered.request);
  const second = assertOk(
    compileRuntimeAssignments(reordered.request),
    "property insertion order must not affect the assignment",
  );

  assert.deepEqual(second, first);
  assert.equal(first.demands.length, 2);
  assert.equal(
    first.demands.every((demand) => demand.contextBytes === 1024),
    true,
  );
  assert.equal(
    first.demands.every((demand) => demand.requiredTools.includes("tool.alpha")),
    true,
  );
  assert.equal(first.search.mode, "exact");
  assert.equal(first.search.claim, "exhaustive_assignment_vector_search");
  assert.equal(first.search.potentialVectors, 9);
  assert.equal(first.search.evaluatedVectors, 9);
  assert.equal(first.search.feasibleVectors, 7);
  assert.equal(first.selected.selectionReason, "lowest_exact_vector");
  assert.deepEqual([...selectedByCalibrationRowId(first).keys()].sort(), [
    "row.checker.domain-b",
    "row.producer.domain-a",
  ]);
  assert.equal(
    verifyRuntimeAssignmentCompilation(first, {
      compilationDigest: fixture.request.packageExpectation.compilationDigest,
      packageDigest: fixture.request.packageExpectation.packageDigest,
      policyDigest: first.policyDigest,
      calibrationDigest: first.calibrationDigest,
      inventoryDigest: first.inventoryDigest,
      assignmentDigest: first.contentDigest,
    }).ok,
    true,
  );
});

test("runtime routing accumulates every hard-gate rejection in closed order", () => {
  const fixture = makeRoutingFixture();
  const target = row(fixture, "row.producer.domain-a");
  target.capabilities[0].qualityTier = "quality.base";
  target.reasoningTier = "reasoning.base";
  target.contextLimitBytes = 0;
  target.tools = [];
  target.skills = [];
  target.isolationFeatures = [];
  target.permissionFeatures = [];
  target.observationModes.model = "unavailable";
  const availability = inventoryRow(fixture, target.id);
  availability.availability = "unavailable";
  availability.availabilityReason = "maintenance";

  const compilation = compileFixture(fixture);
  const evaluation = rowEvaluation(compilation, target.id);
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
  assert.equal(evaluation.comparator, null);
});

test("runtime routing enforces producer-checker independence across the full vector", () => {
  const fixture = makeRoutingFixture();
  for (const entry of fixture.request.calibration.runtimeRows) {
    entry.independenceDomain = "domain.collapsed";
  }

  assertRejected(
    compileRuntimeAssignments(fixture.request),
    "SC4506",
    "a roster with no independent producer-checker vector must fail closed",
  );
});

test("runtime routing reports bounded search without claiming a global optimum", () => {
  const fixture = makeRoutingFixture();
  fixture.request.policy.search.exactVectorLimit = 1;
  fixture.request.policy.search.boundedBeamWidth = 1;

  const compilation = compileFixture(fixture);
  assert.equal(compilation.search.mode, "bounded");
  assert.equal(compilation.search.claim, "bounded_evaluated_set_no_global_optimum");
  assert.equal(compilation.selected.selectionReason, "lowest_bounded_evaluated_vector");
  assert.equal(compilation.search.evaluatedVectors < compilation.search.potentialVectors, true);
});

test("runtime routing applies the vector comparator order and canonical tie-break", () => {
  const dimensions = [
    {
      name: "cost before all later comparator fields",
      mutate: (left, right) => {
        left.costRank = 2;
        right.costRank = 1;
      },
    },
    {
      name: "maximum latency after total cost",
      mutate: (left, right) => {
        left.latencyRank = 2;
        right.latencyRank = 1;
      },
    },
    {
      name: "quality excess after latency",
      mutate: (left) => {
        left.capabilities[0].qualityTier = "quality.elite";
      },
    },
    {
      name: "reasoning excess after quality",
      mutate: (left) => {
        left.reasoningTier = "reasoning.elite";
      },
    },
    {
      name: "context excess after reasoning",
      mutate: (left) => {
        left.contextLimitBytes = 8192;
      },
    },
    {
      name: "tool excess after context",
      mutate: (left) => {
        left.tools = ["tool.alpha", "tool.zeta"];
      },
    },
    {
      name: "skill excess after tool excess",
      mutate: (left) => {
        left.skills = ["skill.alpha", "skill.zeta"];
      },
    },
    {
      name: "effort rank after skill excess",
      mutate: (left) => {
        left.effortRank = 2;
      },
    },
  ];

  for (const dimension of dimensions) {
    const fixture = makeComparatorTieFixture();
    const left = row(fixture, "row.producer.domain-a");
    const right = row(fixture, "row.producer.domain-b");
    dimension.mutate(left, right);
    const compilation = compileFixture(fixture, dimension.name);
    assert.equal(selectedProducerRowId(compilation), right.id, dimension.name);
  }

  const tied = compileFixture(makeComparatorTieFixture(), "canonical tie-break");
  const selected = tied.selected.rows
    .map((entry) => `${entry.agentId}=${entry.profileId}/${entry.effortId}`)
    .sort()
    .join("|");
  const alternatives = [
    ["profile.checker.a", "profile.producer.b"],
    ["profile.checker.b", "profile.producer.a"],
  ]
    .map((profiles) => {
      const values = tied.selected.rows.map((entry) => {
        const profileId = entry.profileId.startsWith("profile.checker")
          ? profiles.find((profile) => profile.startsWith("profile.checker"))
          : profiles.find((profile) => profile.startsWith("profile.producer"));
        return `${entry.agentId}=${profileId}/effort.standard`;
      });
      return values.sort().join("|");
    })
    .sort();
  assert.equal(selected, alternatives[0], "the final tie-break must use canonical vector identity");
});

test("runtime routing accepts only a feasible one-row owner override", () => {
  const fixture = makeRoutingFixture();
  const base = compileFixture(fixture);
  const producer = base.selected.rows.find((entry) =>
    entry.profileId.startsWith("profile.producer."),
  );
  assert.notEqual(producer, undefined);
  const validOverride = {
    apiVersion: fixture.request.apiVersion,
    kind: "RuntimeAssignmentOverride",
    predecessorAssignmentDigest: base.contentDigest,
    agentId: producer.agentId,
    replacementCalibrationRowId: "row.producer.domain-c",
    requestedBy: "owner.runtime-routing",
    rationale: "Exercise an auditable feasible override.",
  };
  const overridden = assertOk(
    applyRuntimeAssignmentOverride(base, validOverride),
    "a feasible one-row override should compile",
  );
  assert.equal(overridden.predecessorAssignmentDigest, base.contentDigest);
  assert.equal(overridden.selected.selectionReason, "owner_override");
  assert.equal(selectedProducerRowId(overridden), "row.producer.domain-c");
  assert.notEqual(overridden.contentDigest, base.contentDigest);

  const invalidOverride = {
    ...validOverride,
    replacementCalibrationRowId: "row.producer.domain-b",
  };
  assertRejected(
    applyRuntimeAssignmentOverride(base, invalidOverride),
    "SC4508",
    "an override must not collapse producer-checker independence",
  );
});

test("runtime routing fails closed for malformed requests and published limits", () => {
  assertRejected(
    compileRuntimeAssignments(null),
    "SC4501",
    "a null routing request must fail closed",
  );

  const unknownProperty = makeRoutingFixture();
  unknownProperty.request.policy.unreviewedExtension = true;
  assertRejected(
    compileRuntimeAssignments(unknownProperty.request),
    "SC4501",
    "unknown policy properties must fail the closed schema",
  );

  const excessiveLimit = makeRoutingFixture();
  excessiveLimit.request.policy.search.exactVectorLimit =
    RUNTIME_ROUTING_LIMITS.maxExactVectors + 1;
  assertRejected(
    compileRuntimeAssignments(excessiveLimit.request),
    "SC4502",
    "caller search limits must not exceed the published maximum",
  );
});
