import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import {
  analyzeSpecialistCandidates,
  compileAgentBlueprints,
  deriveTaskAuthorityProjection,
  renderSpecialistPackage,
  SPECIALIST_LIMITS,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../dist/index.js";
import {
  boundedJsonUtf8ByteLength,
  boundedUtf8ByteLength,
  canonicalJson,
  digestCanonicalJson,
} from "../dist/canonical-json.js";
import { createDiagnostic } from "../dist/diagnostics.js";
import { verifyCompilationDigest } from "../dist/specialist-compiler.js";

const GOLDEN_CASES = [
  "one-agent-optimal",
  "genuinely-parallel",
  "under-split",
  "over-split",
  "conflict-heavy",
  "generic-role",
];

const FORBIDDEN_RUNTIME_KEYS = new Set([
  "credential",
  "credentials",
  "executor",
  "model",
  "profile",
  "prompt",
  "provider",
  "role",
  "runtime",
  "runtimeprofile",
]);

const encoder = new TextEncoder();

function clone(value) {
  return structuredClone(value);
}

function fixture(name) {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/specialist-compiler/${name}.json`, import.meta.url), "utf8"),
  );
}

function diagnosticCodes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

function assertCompiles(request, message = "specialist request should compile") {
  const result = compileAgentBlueprints(request);
  assert.equal(result.ok, true, `${message}: ${JSON.stringify(result.diagnostics)}`);
  assert.notEqual(result.value, null, message);
  return result.value;
}

function assertRejected(result, code, message) {
  assert.equal(result.ok, false, message);
  assert.equal(result.value, null, message);
  assert.equal(diagnosticCodes(result).includes(code), true, message);
}

function partitionKey(partition) {
  return JSON.stringify(partition);
}

function allVisibleEvaluations(compilation) {
  const byId = new Map();
  for (const evaluation of [
    compilation.serialBaseline,
    compilation.selected,
    ...compilation.proposalEvaluations,
    ...compilation.alternatives,
  ]) {
    byId.set(evaluation.id, evaluation);
  }
  return [...byId.values()];
}

function evaluationFor(compilation, partition) {
  const expected = partitionKey(partition);
  return allVisibleEvaluations(compilation).find(
    (evaluation) => partitionKey(evaluation.partition) === expected,
  );
}

function withoutContentDigest(value) {
  const copy = { ...value };
  delete copy.contentDigest;
  return copy;
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function mergedPermissions(units) {
  const scopesByKind = new Map();
  for (const unit of units) {
    for (const permission of unit.permissions) {
      const scopes = scopesByKind.get(permission.kind) ?? new Set();
      for (const scope of permission.scopes) {
        scopes.add(scope);
      }
      scopesByKind.set(permission.kind, scopes);
    }
  }
  return [...scopesByKind.entries()]
    .map(([kind, scopes]) => ({ kind, scopes: [...scopes].sort() }))
    .sort((left, right) => left.kind.localeCompare(right.kind));
}

function expectedPackageDigest(rendered) {
  return digestCanonicalJson("swecircuit.specialist.package-root.v1", {
    compilationDigest: rendered.compilationDigest,
    manifestDigest: rendered.manifest.contentDigest,
    files: rendered.files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      bytes: file.bytes,
      digest: file.digest,
    })),
  });
}

function refreshRenderedFile(file) {
  const bytes = encoder.encode(file.content);
  file.bytes = bytes.byteLength;
  file.digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function assertDeepFrozen(value, path = "value", seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  assert.equal(Object.isFrozen(value), true, `${path} is not frozen`);
  for (const [key, entry] of Object.entries(value)) {
    assertDeepFrozen(entry, `${path}.${key}`, seen);
  }
}

function assertNoRuntimeFields(value, path = "value") {
  if (value === null || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      assertNoRuntimeFields(entry, `${path}[${index}]`);
    }
    return;
  }
  for (const [key, entry] of Object.entries(value)) {
    assert.equal(
      FORBIDDEN_RUNTIME_KEYS.has(key.toLowerCase()),
      false,
      `${path}.${key} is a forbidden runtime/provider field`,
    );
    assertNoRuntimeFields(entry, `${path}.${key}`);
  }
}

function sizedRequest(workUnitCount, options = {}) {
  const request = clone(fixture("generic-role").request);
  delete request.proposedCandidates;

  const ids = Array.from(
    { length: workUnitCount },
    (_, index) => `unit.${String(index + 1).padStart(2, "0")}`,
  );
  const goal = request.goal;
  goal.id = `generated.partition-count-${workUnitCount}`;
  goal.objective = `Compile ${workUnitCount} independent work units.`;
  goal.authority.maxAgents = options.maxAgents ?? workUnitCount;
  goal.authority.maxConcurrency = options.maxConcurrency ?? goal.authority.maxAgents;
  goal.contextSources[0].allowedWorkUnits = ids;
  goal.acceptanceCriteria = ids.map((id, index) => ({
    id: `criterion.${String(index + 1).padStart(2, "0")}`,
    description: `Work unit ${id} is complete.`,
    evidenceRequirements: [
      {
        id: `evidence.${String(index + 1).padStart(2, "0")}`,
        kind: "test",
        duty: "produce",
        description: `Preserve evidence for ${id}.`,
        independentFromProducer: false,
      },
    ],
  }));
  const baseUnit = fixture("generic-role").request.goal.workUnits[0];
  goal.workUnits = ids.map((id, index) => {
    const unit = clone(baseUnit);
    const suffix = String(index + 1).padStart(2, "0");
    unit.id = id;
    unit.objective = `Implement independent work unit ${id}.`;
    unit.weight = index + 1;
    unit.scope.write = [`src/unit-${suffix}.ts`];
    unit.permissions.find((permission) => permission.kind === "filesystem.write").scopes = [
      `src/unit-${suffix}.ts`,
    ];
    unit.evidenceRequirementIds = [`evidence.${suffix}`];
    unit.handoffArtifacts = [`artifact.${suffix}`];
    unit.stopConditions = [`Stop if work unit ${id} is ambiguous.`];
    return unit;
  });
  return request;
}

function schedulerRequest(name, definitions, options = {}) {
  const request = sizedRequest(definitions.length, {
    maxAgents: definitions.length,
    maxConcurrency: options.maxConcurrency ?? definitions.length,
  });
  const proposalId = `candidate.scheduler.${name}`;

  request.goal.id = `scheduler.${name}`;
  request.goal.objective = `Verify the fixed scheduler rule for ${name}.`;
  request.goal.optimization.agentStartupCost = 0;
  request.goal.optimization.handoffCost = options.handoffCost ?? 0;
  for (const [index, definition] of definitions.entries()) {
    const unit = request.goal.workUnits[index];
    unit.objective = definition.objective;
    unit.weight = definition.weight;
    unit.dependencies = (definition.dependencies ?? []).map(
      (dependencyIndex) => request.goal.workUnits[dependencyIndex].id,
    );
    unit.scope.conflictZones = definition.conflictZones ?? [];
  }
  request.proposedCandidates = [
    {
      id: proposalId,
      groups: request.goal.workUnits.map((unit) => [unit.id]),
    },
  ];

  return { request, proposalId };
}

function schedulerProposal(name, definitions, options = {}) {
  const { request, proposalId } = schedulerRequest(name, definitions, options);
  const compilation = assertCompiles(request, `${name} scheduler request should compile`);
  const evaluation = compilation.proposalEvaluations.find((candidate) =>
    candidate.proposalIds.includes(proposalId),
  );
  assert.notEqual(evaluation, undefined, `${name} scheduler proposal should be visible`);
  assert.equal(evaluation.eligible, true, `${name} scheduler proposal should be eligible`);
  return evaluation;
}

function reverseObjectKeys(value) {
  if (Array.isArray(value)) {
    return value.map(reverseObjectKeys);
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .reverse()
      .map(([key, entry]) => [key, reverseObjectKeys(entry)]),
  );
}

function logicallyPermutedRequest(source) {
  const request = clone(source);
  request.proposedCandidates.reverse();
  for (const proposal of request.proposedCandidates) {
    proposal.groups.reverse();
    for (const group of proposal.groups) {
      group.reverse();
    }
  }

  const goal = request.goal;
  goal.acceptanceCriteria.reverse();
  for (const criterion of goal.acceptanceCriteria) {
    criterion.evidenceRequirements.reverse();
  }
  goal.contextSources.reverse();
  for (const source of goal.contextSources) {
    source.allowedWorkUnits.reverse();
  }
  goal.authority.allowedModules.reverse();
  goal.authority.allowedCapabilities.reverse();
  goal.authority.permissionCeiling.reverse();
  for (const permission of goal.authority.permissionCeiling) {
    permission.scopes.reverse();
  }
  goal.authority.forbiddenEffects.reverse();
  goal.workUnits.reverse();
  for (const unit of goal.workUnits) {
    unit.module.inputPorts.reverse();
    unit.module.outputPorts.reverse();
    unit.dependencies.reverse();
    unit.requiredCapabilities.reverse();
    unit.contextUses.reverse();
    unit.scope.read.reverse();
    unit.scope.write.reverse();
    unit.scope.conflictZones.reverse();
    unit.permissions.reverse();
    for (const permission of unit.permissions) {
      permission.scopes.reverse();
    }
    unit.evidenceRequirementIds.reverse();
    unit.handoffArtifacts.reverse();
    unit.stopConditions.reverse();
  }
  return reverseObjectKeys(request);
}

function assertBlueprintClosure(compilation) {
  const unitsById = new Map(compilation.goal.workUnits.map((unit) => [unit.id, unit]));
  const sourcesById = new Map(compilation.goal.contextSources.map((source) => [source.id, source]));
  const requirementsById = new Map();
  for (const criterion of compilation.goal.acceptanceCriteria) {
    for (const requirement of criterion.evidenceRequirements) {
      requirementsById.set(requirement.id, { criterion, requirement });
    }
  }
  const blueprintByUnit = new Map();
  for (const blueprint of compilation.blueprints) {
    for (const unitId of blueprint.workUnitIds) {
      assert.equal(blueprintByUnit.has(unitId), false, `duplicate blueprint owner for ${unitId}`);
      blueprintByUnit.set(unitId, blueprint);
    }
  }
  assert.deepEqual([...blueprintByUnit.keys()].sort(), [...unitsById.keys()].sort());

  for (const blueprint of compilation.blueprints) {
    const units = blueprint.workUnitIds.map((id) => unitsById.get(id));
    assert.equal(units.every(Boolean), true);
    assert.equal(blueprint.goalId, compilation.goal.id);
    assert.equal(blueprint.goalRevision, compilation.goal.revision);
    assert.equal(blueprint.goalDigest, compilation.goalDigest);
    assert.equal(blueprint.candidateId, compilation.selected.id);
    assert.deepEqual(
      blueprint.objectives,
      units
        .map((unit) => ({ workUnitId: unit.id, objective: unit.objective }))
        .sort((left, right) => left.workUnitId.localeCompare(right.workUnitId)),
    );

    const modules = new Map(units.map((unit) => [unit.module.id, unit.module]));
    assert.deepEqual(
      blueprint.modules,
      [...modules.values()].sort((left, right) => left.id.localeCompare(right.id)),
    );
    const dependencies = sortedUnique(
      units.flatMap((unit) =>
        unit.dependencies
          .map((dependency) => blueprintByUnit.get(dependency))
          .filter((owner) => owner !== undefined && owner.id !== blueprint.id)
          .map((owner) => owner.id),
      ),
    );
    assert.deepEqual(blueprint.dependencies, dependencies);

    const uses = new Map();
    for (const unit of units) {
      for (const contextUse of unit.contextUses) {
        const entry = uses.get(contextUse.sourceId) ?? {
          purposes: new Set(),
          workUnitIds: new Set(),
        };
        entry.purposes.add(contextUse.purpose);
        entry.workUnitIds.add(unit.id);
        uses.set(contextUse.sourceId, entry);
      }
    }
    const expectedContextUses = [...uses.entries()]
      .map(([sourceId, use]) => {
        const source = sourcesById.get(sourceId);
        const common = {
          sourceId,
          kind: source.kind,
          locator: source.locator,
          digest: source.digest,
          bytes: source.bytes,
          purposes: [...use.purposes].sort(),
          workUnitIds: [...use.workUnitIds].sort(),
        };
        return source.kind === "repository" ? { ...common, readScope: source.readScope } : common;
      })
      .sort((left, right) => left.sourceId.localeCompare(right.sourceId));
    assert.deepEqual(blueprint.contextUses, expectedContextUses);

    assert.deepEqual(
      blueprint.authority.requiredCapabilities,
      sortedUnique(units.flatMap((unit) => unit.requiredCapabilities)),
    );
    assert.deepEqual(blueprint.authority.scope, {
      read: sortedUnique(units.flatMap((unit) => unit.scope.read)),
      write: sortedUnique(units.flatMap((unit) => unit.scope.write)),
      conflictZones: sortedUnique(units.flatMap((unit) => unit.scope.conflictZones)),
    });
    assert.deepEqual(blueprint.authority.permissions, mergedPermissions(units));
    assert.deepEqual(
      blueprint.authority.forbiddenEffects,
      compilation.goal.authority.forbiddenEffects,
    );

    const evidenceDuties = units
      .flatMap((unit) =>
        unit.evidenceRequirementIds.map((requirementId) => {
          const entry = requirementsById.get(requirementId);
          return {
            criterionId: entry.criterion.id,
            criterion: entry.criterion.description,
            requirementId,
            kind: entry.requirement.kind,
            duty: entry.requirement.duty,
            description: entry.requirement.description,
            independentFromProducer: entry.requirement.independentFromProducer,
          };
        }),
      )
      .sort(
        (left, right) =>
          left.criterionId.localeCompare(right.criterionId) ||
          left.requirementId.localeCompare(right.requirementId),
      );
    assert.deepEqual(blueprint.evidenceDuties, evidenceDuties);
    assert.deepEqual(blueprint.handoff, {
      destination: compilation.goal.integrationOwner,
      artifacts: sortedUnique(units.flatMap((unit) => unit.handoffArtifacts)),
      requiredFields: [
        "apiVersion",
        "kind",
        "outcome",
        "destination",
        "goal",
        "agent",
        "compilationDigest",
        "summary",
        "workUnitsCompleted",
        "artifacts",
        "evidence",
        "assumptions",
        "risks",
        "followUps",
      ],
    });
    assert.deepEqual(
      blueprint.stopConditions,
      sortedUnique(units.flatMap((unit) => unit.stopConditions)),
    );
    assert.equal(
      blueprint.contentDigest,
      digestCanonicalJson("swecircuit.specialist.blueprint.v1", withoutContentDigest(blueprint)),
    );
  }

  const expectedWaves = new Map();
  for (const item of compilation.selected.schedule) {
    const agents = expectedWaves.get(item.start) ?? [];
    agents.push(item.agentId);
    expectedWaves.set(item.start, agents);
  }
  assert.deepEqual(
    compilation.launchWaves,
    [...expectedWaves.entries()]
      .sort((left, right) => left[0] - right[0])
      .map(([start, agentIds]) => ({ start, agentIds: agentIds.sort() })),
  );
}

for (const name of GOLDEN_CASES) {
  test(`golden specialist selection: ${name}`, () => {
    const golden = fixture(name);
    assert.equal(golden.case, name);
    const compilation = assertCompiles(golden.request, `${name} should compile`);
    const expected = golden.expected;

    assert.equal(compilation.search.mode, expected.search.mode);
    assert.equal(compilation.search.evaluatedCandidates, expected.search.evaluatedCandidates);
    assert.equal(compilation.search.eligibleCandidates, expected.search.eligibleCandidates);
    assert.equal(compilation.search.workUnitCount, golden.request.goal.workUnits.length);
    assert.deepEqual(compilation.selected.partition, expected.selectedPartition);
    assert.deepEqual(compilation.selected.metrics, expected.selectedMetrics);
    assert.equal(compilation.selected.eligible, true);
    assert.equal(compilation.selected.metrics.agentCount, compilation.blueprints.length);
    assert.equal(compilation.serialBaseline.origins.includes("serial_baseline"), true);

    if (expected.comparisonPartition !== undefined) {
      const comparison = evaluationFor(compilation, expected.comparisonPartition);
      assert.notEqual(comparison, undefined, `${name} comparison candidate was not retained`);
      assert.equal(comparison.eligible, expected.comparisonEligible);
      assert.deepEqual(comparison.rejectionCodes, expected.comparisonRejectionCodes);
      assert.deepEqual(comparison.metrics, expected.comparisonMetrics);
    }
    if (expected.requiredOrigins !== undefined) {
      assert.deepEqual(compilation.selected.origins, expected.requiredOrigins);
      assert.deepEqual(compilation.selected.proposalIds, expected.proposalIds);
    }

    if (expected.decisiveProperty === "projectedMakespan") {
      const comparison = evaluationFor(compilation, expected.comparisonPartition);
      assert.equal(
        compilation.selected.metrics.projectedMakespan < comparison.metrics.projectedMakespan,
        true,
      );
    } else if (expected.decisiveProperty === "conflictPairs") {
      const comparison = evaluationFor(compilation, expected.comparisonPartition);
      assert.equal(
        compilation.selected.metrics.projectedMakespan,
        comparison.metrics.projectedMakespan,
      );
      assert.equal(
        compilation.selected.metrics.conflictPairs < comparison.metrics.conflictPairs,
        true,
      );
    } else if (expected.decisiveProperty === "evidence_independence") {
      assert.deepEqual(compilation.serialBaseline.rejectionCodes, ["evidence_independence"]);
      assert.equal(compilation.serialBaseline.eligible, false);
    } else {
      assert.deepEqual(
        compilation.blueprints.flatMap((blueprint) => blueprint.workUnitIds),
        ["unit.compile"],
      );
    }
  });
}

test("candidate analysis exposes deterministic rejection evidence when no team is eligible", () => {
  const request = clone(fixture("under-split").request);
  request.goal.authority.maxAgents = 1;
  request.goal.authority.maxConcurrency = 1;
  request.proposedCandidates = [
    {
      id: "candidate.independent-pair",
      groups: [["unit.produce"], ["unit.verify"]],
    },
  ];

  const first = analyzeSpecialistCandidates(request);
  const second = analyzeSpecialistCandidates(clone(request));

  assert.equal(first.ok, true);
  assert.notEqual(first.value, null);
  assert.deepEqual(second, first);
  assert.equal(first.value.kind, "SpecialistCandidateAnalysis");
  assert.equal(first.value.selectionStatus, "no_eligible_candidate");
  assert.equal(first.value.selected, null);
  assert.equal(first.value.selectionReason, null);
  assert.equal(first.value.search.eligibleCandidates, 0);
  assert.deepEqual(first.value.serialBaseline.rejectionCodes, ["evidence_independence"]);
  assert.equal(first.value.proposalEvaluations.length, 1);
  assert.deepEqual(first.value.proposalEvaluations[0].rejectionCodes, ["agent_limit"]);
  assertDeepFrozen(first.value);

  const compiled = compileAgentBlueprints(request);
  assertRejected(compiled, "SC4306", "compilation must remain fail-closed");
  assert.match(
    compiled.diagnostics.find((diagnostic) => diagnostic.code === "SC4306").hint,
    /analyzeSpecialistCandidates/,
  );
});

test("candidate analysis and compilation select the same exact team", () => {
  const request = fixture("genuinely-parallel").request;
  const analysis = analyzeSpecialistCandidates(request);
  const compilation = compileAgentBlueprints(request);

  assert.equal(analysis.ok, true);
  assert.equal(compilation.ok, true);
  assert.notEqual(analysis.value, null);
  assert.notEqual(compilation.value, null);
  assert.equal(analysis.value.selectionStatus, "selected");
  assert.equal(analysis.value.selected.id, compilation.value.selected.id);
  assert.deepEqual(analysis.value.search, compilation.value.search);
  assert.deepEqual(analysis.value.serialBaseline, compilation.value.serialBaseline);
  assert.deepEqual(analysis.value.selectionReason, compilation.value.selectionReason);
});

test("generated team and agent identifiers retain the full SHA-256 suffix", () => {
  const compilation = assertCompiles(fixture("over-split").request);
  for (const evaluation of allVisibleEvaluations(compilation)) {
    assert.match(evaluation.id, /^team\.[0-9a-f]{64}$/);
    for (const item of evaluation.schedule) {
      assert.match(item.agentId, /^agent\.[0-9a-f]{64}$/);
    }
  }
  for (const blueprint of compilation.blueprints) {
    assert.match(blueprint.id, /^agent\.[0-9a-f]{64}$/);
    for (const dependency of blueprint.dependencies) {
      assert.match(dependency, /^agent\.[0-9a-f]{64}$/);
    }
  }
  for (const wave of compilation.launchWaves) {
    for (const agentId of wave.agentIds) {
      assert.match(agentId, /^agent\.[0-9a-f]{64}$/);
    }
  }
});

test("selected blueprints close exact ownership, authority, context, evidence, handoff, and digests", () => {
  const compilation = assertCompiles(fixture("over-split").request);
  assertBlueprintClosure(compilation);
  assert.equal(
    compilation.goalDigest,
    digestCanonicalJson("swecircuit.specialist.goal.v1", compilation.goal),
  );
  assert.equal(verifyCompilationDigest(compilation), true);

  const authority = deriveTaskAuthorityProjection(compilation.goal);
  assert.equal(authority.ok, true, JSON.stringify(authority.diagnostics));
  assert.deepEqual(authority.value, compilation.authority);
  assert.equal(
    authority.value.contentDigest,
    digestCanonicalJson(
      "swecircuit.specialist.authority.v1",
      withoutContentDigest(authority.value),
    ),
  );

  for (const evaluation of allVisibleEvaluations(compilation)) {
    assert.equal(
      evaluation.contentDigest,
      digestCanonicalJson(
        "swecircuit.specialist.candidate-evaluation.v1",
        withoutContentDigest(evaluation),
      ),
    );
  }
  const evaluationSet = allVisibleEvaluations(compilation)
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((evaluation) => ({ id: evaluation.id, contentDigest: evaluation.contentDigest }));
  assert.equal(
    compilation.search.evaluationSetDigest,
    digestCanonicalJson("swecircuit.specialist.evaluation-set.v1", evaluationSet),
  );
});

test("exact search evaluates every allowed canonical partition through the declared limit", () => {
  const bellNumbers = [1, 2, 5, 15, 52, 203, 877, 4_140];
  assert.equal(SPECIALIST_LIMITS.exactSearchWorkUnits, bellNumbers.length);

  for (const [index, expectedCount] of bellNumbers.entries()) {
    const workUnitCount = index + 1;
    const compilation = assertCompiles(
      sizedRequest(workUnitCount),
      `${workUnitCount}-unit exact search should compile`,
    );
    assert.equal(compilation.search.mode, "exact");
    assert.equal(compilation.search.claim, "exhaustive_partition_search_fixed_scheduler");
    assert.equal(compilation.search.workUnitCount, workUnitCount);
    assert.equal(compilation.search.evaluatedCandidates, expectedCount);
    assert.equal(compilation.search.eligibleCandidates, expectedCount);
  }

  const capped = assertCompiles(sizedRequest(5, { maxAgents: 2, maxConcurrency: 2 }));
  assert.equal(capped.search.mode, "exact");
  assert.equal(capped.search.claim, "exhaustive_partition_search_fixed_scheduler");
  assert.equal(capped.search.evaluatedCandidates, 16);
  assert.equal(capped.search.eligibleCandidates, 16);
});

test("fixed scheduler prioritizes the longer remaining critical path", () => {
  const evaluation = schedulerProposal(
    "critical-path-priority",
    [
      { objective: "Prepare the release input.", weight: 2 },
      { objective: "Complete an unrelated implementation.", weight: 8 },
      { objective: "Verify the prepared release input.", weight: 10, dependencies: [0] },
    ],
    { maxConcurrency: 1 },
  );

  assert.deepEqual(
    evaluation.schedule.map(({ start, finish }) => ({ start, finish })),
    [
      { start: 0, finish: 2 },
      { start: 2, finish: 12 },
      { start: 12, finish: 20 },
    ],
  );
});

test("fixed scheduler breaks equal critical paths by longer duration", () => {
  const evaluation = schedulerProposal(
    "duration-tie-break",
    [
      { objective: "Build the longer first slice.", weight: 5 },
      { objective: "Verify the longer first slice.", weight: 1, dependencies: [0] },
      { objective: "Build the shorter first slice.", weight: 3 },
      { objective: "Verify the shorter first slice.", weight: 3, dependencies: [2] },
    ],
    { maxConcurrency: 1 },
  );

  assert.deepEqual(evaluation.schedule[0], {
    agentId: evaluation.schedule[0].agentId,
    start: 0,
    finish: 5,
  });
});

test("fixed scheduler breaks remaining ties by agent ID", () => {
  const evaluation = schedulerProposal(
    "agent-id-tie-break",
    [
      { objective: "Implement the first equivalent slice.", weight: 3 },
      { objective: "Implement the second equivalent slice.", weight: 3 },
    ],
    { maxConcurrency: 1 },
  );
  const orderedAgentIds = evaluation.schedule.map((item) => item.agentId).sort();

  assert.equal(evaluation.schedule[0].start, 0);
  assert.equal(evaluation.schedule[0].agentId, orderedAgentIds[0]);
});

test("fixed scheduler enforces maximum concurrency", () => {
  const evaluation = schedulerProposal(
    "maximum-concurrency",
    [
      { objective: "Implement independent slice A.", weight: 4 },
      { objective: "Implement independent slice B.", weight: 4 },
      { objective: "Implement independent slice C.", weight: 4 },
    ],
    { maxConcurrency: 2 },
  );

  assert.deepEqual(
    evaluation.schedule.map(({ start, finish }) => ({ start, finish })),
    [
      { start: 0, finish: 4 },
      { start: 0, finish: 4 },
      { start: 4, finish: 8 },
    ],
  );
  assert.equal(evaluation.metrics.peakConcurrency, 2);
});

test("fixed scheduler serializes declared conflict zones", () => {
  const evaluation = schedulerProposal("declared-conflicts", [
    {
      objective: "Update the first surface in a shared release zone.",
      weight: 3,
      conflictZones: ["release.shared"],
    },
    {
      objective: "Update the second surface in a shared release zone.",
      weight: 3,
      conflictZones: ["release.shared"],
    },
  ]);

  assert.deepEqual(
    evaluation.schedule.map(({ start, finish }) => ({ start, finish })),
    [
      { start: 0, finish: 3 },
      { start: 3, finish: 6 },
    ],
  );
  assert.equal(evaluation.metrics.conflictPairs, 1);
  assert.equal(evaluation.metrics.peakConcurrency, 1);
});

test("fixed scheduler releases dependencies after the handoff cost", () => {
  const evaluation = schedulerProposal(
    "handoff-release",
    [
      { objective: "Produce the implementation handoff.", weight: 2 },
      { objective: "Verify the implementation handoff.", weight: 4, dependencies: [0] },
    ],
    { handoffCost: 3 },
  );

  assert.deepEqual(
    evaluation.schedule.map(({ start, finish }) => ({ start, finish })),
    [
      { start: 0, finish: 2 },
      { start: 5, finish: 9 },
    ],
  );
  assert.equal(evaluation.metrics.handoffCount, 1);
  assert.equal(evaluation.metrics.totalHandoffCost, 3);
});

test("above-limit goals use deterministic bounded structural candidates without an optimum claim", () => {
  const request = sizedRequest(SPECIALIST_LIMITS.exactSearchWorkUnits + 1, {
    maxAgents: 4,
    maxConcurrency: 4,
  });
  const first = assertCompiles(request);
  const second = assertCompiles(clone(request));

  assert.equal(first.search.mode, "bounded");
  assert.equal(first.search.claim, "bounded_evaluated_set_no_global_optimum");
  assert.equal(first.search.workUnitCount, 9);
  assert.equal(first.search.evaluatedCandidates, 4);
  assert.equal(first.search.eligibleCandidates, 4);
  assert.equal(first.search.evaluatedCandidates < 21_147, true);
  assert.match(first.search.evaluationSetDigest, /^sha256:[0-9a-f]{64}$/);
  assert.deepEqual(first, second);
  assert.deepEqual(first.serialBaseline.origins, [
    "serial_baseline",
    "bounded_dependency",
    "bounded_evidence",
    "bounded_module",
  ]);
  assert.equal(
    allVisibleEvaluations(first).some((evaluation) =>
      evaluation.origins.includes("bounded_balanced"),
    ),
    true,
  );
  const outputKeys = new Set();
  const collectKeys = (value) => {
    if (value === null || typeof value !== "object") return;
    if (Array.isArray(value)) {
      for (const entry of value) collectKeys(entry);
      return;
    }
    for (const [key, entry] of Object.entries(value)) {
      outputKeys.add(key);
      collectKeys(entry);
    }
  };
  collectKeys(first);
  for (const forbiddenClaim of ["globalOptimal", "isOptimal", "optimal", "optimalityClaim"]) {
    assert.equal(outputKeys.has(forbiddenClaim), false);
  }
});

test("every supplied proposal remains inspectable beyond the retained-alternative window", () => {
  const request = sizedRequest(SPECIALIST_LIMITS.exactSearchWorkUnits + 1, {
    maxAgents: 4,
    maxConcurrency: 4,
  });
  const ids = request.goal.workUnits.map((unit) => unit.id);
  request.proposedCandidates = [
    ...Array.from({ length: 8 }, (_, index) => {
      const cut = index + 1;
      return {
        id: `proposal.two-groups-${cut}`,
        groups: [ids.slice(0, cut), ids.slice(cut)],
      };
    }),
    ...Array.from({ length: 4 }, (_, index) => {
      const cut = index + 1;
      return {
        id: `proposal.three-groups-${cut}`,
        groups: [ids.slice(0, cut), ids.slice(cut, 8), ids.slice(8)],
      };
    }),
  ];

  const compilation = assertCompiles(request);
  const expectedProposalIds = request.proposedCandidates.map((proposal) => proposal.id).sort();
  const inspectedProposalIds = sortedUnique(
    compilation.proposalEvaluations.flatMap((evaluation) => evaluation.proposalIds),
  );
  assert.deepEqual(inspectedProposalIds, expectedProposalIds);
  assert.equal(
    compilation.proposalEvaluations.every((evaluation) => evaluation.proposalIds.length > 0),
    true,
  );
  assert.deepEqual(
    compilation.proposalEvaluations.map((evaluation) => evaluation.id),
    compilation.proposalEvaluations.map((evaluation) => evaluation.id).sort(),
  );
  assert.equal(compilation.search.retainedAlternatives, SPECIALIST_LIMITS.retainedAlternatives);

  const retainedIds = new Set([
    compilation.selected.id,
    ...compilation.alternatives.map((evaluation) => evaluation.id),
  ]);
  assert.equal(
    compilation.proposalEvaluations.some((evaluation) => !retainedIds.has(evaluation.id)),
    true,
  );
  const visibleIds = new Set(allVisibleEvaluations(compilation).map((evaluation) => evaluation.id));
  assert.equal(
    compilation.proposalEvaluations.every((evaluation) => visibleIds.has(evaluation.id)),
    true,
  );
});

test("logical array and object-key permutations produce byte-identical compiled semantics", () => {
  const request = clone(fixture("over-split").request);
  request.proposedCandidates = [
    {
      id: "candidate.atomic",
      groups: [["unit.core"], ["unit.docs"], ["unit.test"]],
    },
    {
      id: "candidate.cohesive",
      groups: [["unit.docs"], ["unit.core", "unit.test"]],
    },
  ];
  const permuted = logicallyPermutedRequest(request);

  const first = assertCompiles(request);
  const second = assertCompiles(permuted);
  assert.deepEqual(second, first);
  assert.equal(JSON.stringify(second), JSON.stringify(first));
  assert.equal(canonicalJson(second), canonicalJson(first));
  assert.equal(second.search.evaluationSetDigest, first.search.evaluationSetDigest);
  assert.equal(second.contentDigest, first.contentDigest);

  const firstPackage = renderSpecialistPackage(first);
  const secondPackage = renderSpecialistPackage(second);
  assert.equal(firstPackage.ok, true, JSON.stringify(firstPackage.diagnostics));
  assert.equal(secondPackage.ok, true, JSON.stringify(secondPackage.diagnostics));
  assert.deepEqual(secondPackage.value, firstPackage.value);
  assert.equal(secondPackage.value.packageDigest, firstPackage.value.packageDigest);
});

test("compiled values are deeply frozen and detached from mutable caller input", () => {
  const request = clone(fixture("generic-role").request);
  const compilation = assertCompiles(request);
  const preserved = clone(compilation);

  request.goal.objective = "Caller mutation after compilation.";
  request.goal.contextSources[0].allowedWorkUnits.length = 0;
  request.goal.workUnits[0].objective = "Mutated work unit.";
  request.proposedCandidates[0].groups[0].push("unit.injected");

  assert.deepEqual(compilation, preserved);
  assertDeepFrozen(compilation, "compilation");
  assert.throws(() => {
    compilation.goal.objective = "Mutation must fail.";
  }, TypeError);
  assert.throws(() => {
    compilation.blueprints[0].workUnitIds.push("unit.injected");
  }, TypeError);
});

test("reviewed assumptions and nonblocking decisions are digest-bound and rendered", () => {
  const baselineRequest = clone(fixture("generic-role").request);
  const baseline = assertCompiles(baselineRequest);

  const assumedRequest = clone(baselineRequest);
  assumedRequest.goal.assumptions = [
    {
      id: "assumption.context-current",
      statement: "The declared repository context is current.",
      rationale: "The integration owner reviewed its digest before compilation.",
    },
  ];
  const assumed = assertCompiles(assumedRequest);
  assert.notEqual(assumed.goalDigest, baseline.goalDigest);
  assert.notEqual(assumed.contentDigest, baseline.contentDigest);

  const decidedRequest = clone(assumedRequest);
  decidedRequest.goal.unresolvedDecisions = [
    {
      id: "decision.follow-up-format",
      question: "Should a later version add another handoff format?",
      owner: "integration.owner",
      blocking: false,
      proceedRationale: "The current JSON handoff fully satisfies this goal.",
    },
  ];
  const decided = assertCompiles(decidedRequest);
  assert.notEqual(decided.goalDigest, assumed.goalDigest);
  assert.notEqual(decided.contentDigest, assumed.contentDigest);

  const rendered = renderSpecialistPackage(decided);
  assert.equal(rendered.ok, true, JSON.stringify(rendered.diagnostics));
  const integration = rendered.value.files.find((file) => file.path === "integration.md");
  assert.notEqual(integration, undefined);
  assert.equal(integration.content.includes("assumption.context-current"), true);
  assert.equal(integration.content.includes("The declared repository context is current."), true);
  assert.equal(integration.content.includes("decision.follow-up-format"), true);
  assert.equal(
    integration.content.includes("The current JSON handoff fully satisfies this goal."),
    true,
  );
  assert.equal(integration.content.includes(decided.search.claim), true);
  assert.equal(integration.content.includes(decided.selectionReason.decisiveField), true);
});

test("blocking unresolved decisions reject before team construction", () => {
  const request = clone(fixture("generic-role").request);
  request.goal.unresolvedDecisions = [
    {
      id: "decision.public-api",
      question: "Should the public API change?",
      owner: "integration.owner",
      blocking: true,
      proceedRationale: "No work may proceed until the owner decides.",
    },
  ];

  const result = compileAgentBlueprints(request);
  assertRejected(result, "SC4302", "blocking decisions must route back to clarification");
  assert.equal(
    result.diagnostics.some(
      (diagnostic) => diagnostic.pointer === "/unresolvedDecisions/0/blocking",
    ),
    true,
  );
});

test("selection reason reports the first decisive baseline comparison", () => {
  const serial = assertCompiles(fixture("one-agent-optimal").request);
  assert.deepEqual(serial.selectionReason, {
    kind: "serial_selected",
    decisiveField: "serial_baseline",
    selectedValue: serial.selected.id,
    serialValue: serial.serialBaseline.id,
    serialRejectionCodes: [],
  });

  const parallel = assertCompiles(fixture("genuinely-parallel").request);
  assert.deepEqual(parallel.selectionReason, {
    kind: "lower_metric",
    decisiveField: "projectedMakespan",
    selectedValue: parallel.selected.metrics.projectedMakespan,
    serialValue: parallel.serialBaseline.metrics.projectedMakespan,
    serialRejectionCodes: [],
  });

  const independent = assertCompiles(fixture("under-split").request);
  assert.deepEqual(independent.selectionReason, {
    kind: "serial_ineligible",
    decisiveField: "evidence_independence",
    selectedValue: "eligible",
    serialValue: "ineligible",
    serialRejectionCodes: ["evidence_independence"],
  });
});

test("repository locators reject leading and nested dot or parent segments", () => {
  const invalidLocators = [
    "path:./src/context.md",
    "path:../outside.md",
    "path:src/./context.md",
    "path:src/../outside.md",
  ];

  for (const locator of invalidLocators) {
    const request = clone(fixture("generic-role").request);
    request.goal.contextSources[0].locator = locator;
    const result = compileAgentBlueprints(request);
    assertRejected(result, "SC4301", `${locator} must be rejected`);
    assert.equal(
      result.diagnostics.some((diagnostic) => diagnostic.pointer === "/contextSources/0/locator"),
      true,
      locator,
    );
  }
});

test("repository locator paths cannot exceed their declared read scope", () => {
  const escaped = clone(fixture("one-agent-optimal").request);
  escaped.goal.contextSources[0].locator = "path:private/secret.md";
  const escapedResult = compileAgentBlueprints(escaped);
  assertRejected(escapedResult, "SC4303", "locator path must stay inside readScope");
  assert.deepEqual(
    escapedResult.diagnostics.map((diagnostic) => diagnostic.pointer),
    ["/contextSources/0/locator"],
  );

  const covered = clone(fixture("one-agent-optimal").request);
  covered.goal.contextSources[0].readScope = "src/**";
  for (const unit of covered.goal.workUnits) {
    unit.scope.read = ["src/**"];
    unit.permissions.find((permission) => permission.kind === "filesystem.read").scopes = [
      "src/**",
    ];
  }
  covered.goal.authority.permissionCeiling.find(
    (permission) => permission.kind === "filesystem.read",
  ).scopes = ["src/**"];
  assertCompiles(covered, "a repository locator inside a recursive read scope should compile");
});

test("authority, context, and evidence violations reject before a launchable roster exists", () => {
  const cases = [
    {
      name: "module exceeds authority",
      code: "SC4303",
      mutate(request) {
        request.goal.workUnits[0].module.id = "review";
      },
    },
    {
      name: "capability exceeds authority",
      code: "SC4303",
      mutate(request) {
        request.goal.workUnits[0].requiredCapabilities = ["deploy.code"];
      },
    },
    {
      name: "permission exceeds authority",
      code: "SC4303",
      mutate(request) {
        request.goal.workUnits[0].scope.write = ["outside/alpha.ts"];
        request.goal.workUnits[0].permissions.find(
          (permission) => permission.kind === "filesystem.write",
        ).scopes = ["outside/alpha.ts"];
      },
    },
    {
      name: "filesystem permission has surplus work-unit authority",
      code: "SC4303",
      pointer: "/workUnits/0/scope/write",
      mutate(request) {
        request.goal.workUnits[0].permissions
          .find((permission) => permission.kind === "filesystem.write")
          .scopes.push("src/surplus.ts");
      },
    },
    {
      name: "context source is unresolved",
      code: "SC4302",
      mutate(request) {
        request.goal.workUnits[0].contextUses[0].sourceId = "context.missing";
      },
    },
    {
      name: "context use is outside its allowlist",
      code: "SC4303",
      mutate(request) {
        request.goal.contextSources[0].allowedWorkUnits = ["unit.beta"];
      },
    },
    {
      name: "context digest is malformed",
      code: "SC4301",
      mutate(request) {
        request.goal.contextSources[0].digest = "sha256:deadbeef";
      },
    },
    {
      name: "evidence requirement is unowned",
      code: "SC4304",
      mutate(request) {
        request.goal.workUnits[0].evidenceRequirementIds = ["evidence.beta"];
      },
    },
    {
      name: "evidence requirement has duplicate owners",
      code: "SC4304",
      mutate(request) {
        request.goal.workUnits[0].evidenceRequirementIds.push("evidence.beta");
      },
    },
  ];

  for (const scenario of cases) {
    const request = clone(fixture("genuinely-parallel").request);
    scenario.mutate(request);
    const result = compileAgentBlueprints(request);
    assertRejected(result, scenario.code, scenario.name);
    if (scenario.pointer !== undefined) {
      assert.deepEqual(
        result.diagnostics.map((diagnostic) => diagnostic.pointer),
        [scenario.pointer],
      );
    }
  }
});

test("goal dependency cycles and partition-induced agent cycles are rejected", () => {
  const cyclicGoal = clone(fixture("one-agent-optimal").request);
  cyclicGoal.goal.workUnits[0].dependencies = ["unit.beta"];
  assertRejected(
    compileAgentBlueprints(cyclicGoal),
    "SC4302",
    "a cyclic GoalContract must be rejected",
  );

  const groupCycle = sizedRequest(3);
  const [alpha, beta, gamma] = groupCycle.goal.workUnits;
  beta.dependencies = [alpha.id];
  gamma.dependencies = [beta.id];
  groupCycle.proposedCandidates = [
    {
      id: "candidate.group-cycle",
      groups: [[alpha.id, gamma.id], [beta.id]],
    },
  ];
  const compilation = assertCompiles(groupCycle);
  const rejected = allVisibleEvaluations(compilation).find((evaluation) =>
    evaluation.proposalIds.includes("candidate.group-cycle"),
  );
  assert.notEqual(rejected, undefined);
  assert.equal(rejected.eligible, false);
  assert.deepEqual(rejected.rejectionCodes, ["dependency_cycle"]);
  assert.equal(rejected.metrics, null);
  assert.deepEqual(rejected.schedule, []);
});

test("generic role and provider/runtime extensions fail closed while exact ownership stays supply-free", () => {
  const golden = fixture("generic-role");
  const valid = assertCompiles(golden.request);
  assertNoRuntimeFields(valid, "compilation");

  const attach = {
    role(request, field, value) {
      request.proposedCandidates[0][field] = value;
    },
    provider(request, field, value) {
      request[field] = value;
    },
    model(request, field, value) {
      request.goal[field] = value;
    },
    prompt(request, field, value) {
      request.goal.workUnits[0][field] = value;
    },
    executor(request, field, value) {
      request.goal.authority[field] = value;
    },
    runtime(request, field, value) {
      request.goal.contextSources[0][field] = value;
    },
    runtimeProfile(request, field, value) {
      request.proposedCandidates[0][field] = value;
    },
    credential(request, field, value) {
      request.goal.workUnits[0].module[field] = value;
    },
  };

  for (const field of golden.expected.rejectedExtensionFields) {
    const request = clone(golden.request);
    const value = `forbidden-${field.toLowerCase()}`;
    attach[field](request, field, value);
    const result = compileAgentBlueprints(request);
    assertRejected(result, "SC4301", `${field} must fail the closed contract`);
    assert.equal(JSON.stringify(result).includes(value), false, `${field} value leaked`);
  }
});

test("C1 controls fail closed before diagnostics or rendering", () => {
  const controls = ["\u0085", "\u009b"];

  for (const control of controls) {
    const valueRequest = clone(fixture("one-agent-optimal").request);
    valueRequest.goal.objective = `before${control}after`;
    const valueResult = compileAgentBlueprints(valueRequest);
    assertRejected(valueResult, "SC4301", "C1 text values must be rejected");
    assert.deepEqual(
      valueResult.diagnostics.map((diagnostic) => diagnostic.pointer),
      ["/goal/objective"],
    );
    assert.equal(JSON.stringify(valueResult).includes(control), false);

    const keyRequest = clone(fixture("one-agent-optimal").request);
    keyRequest.goal[`unknown${control}key`] = "extension";
    const keyResult = compileAgentBlueprints(keyRequest);
    assertRejected(keyResult, "SC4301", "C1 property keys must be rejected");
    assert.deepEqual(
      keyResult.diagnostics.map((diagnostic) => diagnostic.pointer),
      ["/goal"],
    );
    assert.equal(JSON.stringify(keyResult).includes(control), false);

    const defensive = createDiagnostic(
      "SC4301",
      "specialist-request.json",
      `/goal/before${control}after/nested`,
    );
    assert.equal(defensive.pointer, "/goal");
    assert.equal(JSON.stringify(defensive).includes(control), false);
  }

  const compilation = assertCompiles(fixture("one-agent-optimal").request);
  const tampered = clone(compilation);
  tampered.goal.objective = `before${controls[0]}after`;
  const rendered = renderSpecialistPackage(tampered);
  assert.equal(rendered.ok, false);
  assert.equal(rendered.value, null);
  assert.deepEqual(diagnosticCodes(rendered), ["SC4307"]);
  assert.equal(JSON.stringify(rendered).includes(controls[0]), false);

  const acceptedPackage = renderSpecialistPackage(compilation);
  assert.equal(acceptedPackage.ok, true);
  assert.notEqual(acceptedPackage.value, null);
  assert.equal(
    acceptedPackage.value.files.some((file) => /[\u0080-\u009f]/u.test(file.content)),
    false,
  );
});

test("Unicode bidi controls fail closed before diagnostics or rendering", () => {
  const controls = [
    "\u061c",
    "\u200e",
    "\u200f",
    "\u202a",
    "\u202b",
    "\u202c",
    "\u202d",
    "\u202e",
    "\u2066",
    "\u2067",
    "\u2068",
    "\u2069",
  ];

  for (const control of controls) {
    const valueRequest = clone(fixture("one-agent-optimal").request);
    valueRequest.goal.objective = `before${control}after`;
    const valueResult = compileAgentBlueprints(valueRequest);
    assertRejected(valueResult, "SC4301", "bidi text values must be rejected");
    assert.deepEqual(
      valueResult.diagnostics.map((diagnostic) => diagnostic.pointer),
      ["/goal/objective"],
    );
    assert.equal(JSON.stringify(valueResult).includes(control), false);

    const keyRequest = clone(fixture("one-agent-optimal").request);
    keyRequest.goal[`unknown${control}key`] = "extension";
    const keyResult = compileAgentBlueprints(keyRequest);
    assertRejected(keyResult, "SC4301", "bidi property keys must be rejected");
    assert.deepEqual(
      keyResult.diagnostics.map((diagnostic) => diagnostic.pointer),
      ["/goal"],
    );
    assert.equal(JSON.stringify(keyResult).includes(control), false);

    const defensive = createDiagnostic(
      "SC4301",
      "specialist-request.json",
      `/goal/before${control}after/nested`,
    );
    assert.equal(defensive.pointer, "/goal");
    assert.equal(JSON.stringify(defensive).includes(control), false);
  }

  const compilation = assertCompiles(fixture("one-agent-optimal").request);
  const tampered = clone(compilation);
  tampered.goal.objective = `before${controls[0]}after`;
  const rendered = renderSpecialistPackage(tampered);
  assert.equal(rendered.ok, false);
  assert.equal(rendered.value, null);
  assert.deepEqual(diagnosticCodes(rendered), ["SC4307"]);
  assert.equal(JSON.stringify(rendered).includes(controls[0]), false);

  const acceptedPackage = renderSpecialistPackage(compilation);
  assert.equal(acceptedPackage.ok, true);
  assert.notEqual(acceptedPackage.value, null);
  assert.equal(
    acceptedPackage.value.files.some((file) =>
      /[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/u.test(file.content),
    ),
    false,
  );
});

test("bounded UTF-8 measurement matches raw and JSON encoding boundaries", () => {
  const raw = 'ASCII " \\ \u0000 \ud800 \ud83d\ude80';
  const rawBytes = encoder.encode(raw).byteLength;
  assert.equal(boundedUtf8ByteLength(raw, rawBytes), rawBytes);
  assert.equal(boundedUtf8ByteLength(raw, rawBytes - 1), null);

  const value = {
    ascii: 'quote " and slash \\',
    controls: "\b\t\n\f\r\u0000",
    unicode: "\u00a2\u20ac\ud83d\ude80",
    loneSurrogate: "\ud800",
  };
  const compactBytes = encoder.encode(JSON.stringify(value)).byteLength;
  const prettyBytes = encoder.encode(JSON.stringify(value, null, 2)).byteLength;
  assert.equal(boundedJsonUtf8ByteLength(value, compactBytes), compactBytes);
  assert.equal(boundedJsonUtf8ByteLength(value, compactBytes - 1), null);
  assert.equal(boundedJsonUtf8ByteLength(value, prettyBytes, 2), prettyBytes);
  assert.equal(boundedJsonUtf8ByteLength(value, prettyBytes - 1, 2), null);
});

test("secret-bearing unknown property keys stop at the parent before schema validation", () => {
  const secret = "sk-proj-abcdefghijklmnopqrstuvwxyz0123456789";
  const request = clone(fixture("one-agent-optimal").request);
  request.goal[secret] = "unknown extension";
  request.goal.unexpectedExtension = "schema validation must not run";

  const result = compileAgentBlueprints(request);
  assertRejected(result, "SC4309", "a secret-bearing property key must be rejected");
  assert.deepEqual(diagnosticCodes(result), ["SC4309"]);
  assert.deepEqual(
    result.diagnostics.map((diagnostic) => diagnostic.pointer),
    ["/goal"],
  );
  assert.equal(JSON.stringify(result).includes(secret), false);

  const defensive = createDiagnostic("SC4301", "specialist-request.json", `/goal/${secret}/nested`);
  assert.equal(defensive.pointer, "/goal");
  assert.equal(JSON.stringify(defensive).includes(secret), false);
});

test("oversized compiler input rejects before serialization or UTF-8 buffer allocation", () => {
  const request = clone(fixture("one-agent-optimal").request);
  const hostile = "x".repeat(SPECIALIST_LIMITS.inputBytes + 1);
  request.goal.objective = hostile;

  const originalStringify = JSON.stringify;
  const originalEncode = TextEncoder.prototype.encode;
  let serializedHostileInput = false;
  let encodedHostileInput = false;
  let result;
  JSON.stringify = function guardedStringify(value, ...rest) {
    if (value !== null && typeof value === "object" && value.goal?.objective === hostile) {
      serializedHostileInput = true;
      throw new Error("oversized compiler input reached JSON.stringify");
    }
    return originalStringify.call(JSON, value, ...rest);
  };
  TextEncoder.prototype.encode = function guardedEncode(value) {
    if (
      value === hostile ||
      (typeof value === "string" && value.length > SPECIALIST_LIMITS.inputBytes)
    ) {
      encodedHostileInput = true;
      throw new Error("oversized compiler input reached TextEncoder.encode");
    }
    return originalEncode.call(this, value);
  };
  try {
    result = compileAgentBlueprints(request);
  } finally {
    JSON.stringify = originalStringify;
    TextEncoder.prototype.encode = originalEncode;
  }

  assert.notEqual(result, undefined);
  assertRejected(result, "SC4308", "oversized compiler input must use the stable limit code");
  assert.equal(serializedHostileInput, false);
  assert.equal(encodedHostileInput, false);
});
test("secret-bearing input is rejected without echoing the secret", () => {
  const secret = "sk-proj-abcdefghijklmnopqrstuvwxyz0123456789";
  const request = clone(fixture("one-agent-optimal").request);
  request.goal.objective = `Reject this secret canary: ${secret}`;

  const result = compileAgentBlueprints(request);
  assertRejected(result, "SC4309", "secret-bearing input must be rejected");
  const serialized = JSON.stringify(result);
  assert.equal(serialized.includes(secret), false);
  assert.equal(serialized.includes("sk-proj-"), false);
  assert.equal(serialized.includes("abcdefghijklmnopqrstuvwxyz0123456789"), false);
});

test("digest tampering fails verification and renderer reconstruction", () => {
  const compilation = assertCompiles(fixture("generic-role").request);
  assert.equal(verifyCompilationDigest(compilation), true);

  const topLevelTamper = clone(compilation);
  topLevelTamper.contentDigest = `sha256:${"0".repeat(64)}`;
  assert.equal(verifyCompilationDigest(topLevelTamper), false);
  assertRejected(
    renderSpecialistPackage(topLevelTamper),
    "SC4307",
    "top-level digest tampering must be rejected",
  );

  const nestedTamper = clone(compilation);
  nestedTamper.selected.metrics.projectedMakespan += 1;
  nestedTamper.contentDigest = digestCanonicalJson(
    "swecircuit.specialist.compilation.v1",
    withoutContentDigest(nestedTamper),
  );
  assert.equal(verifyCompilationDigest(nestedTamper), true);
  assertRejected(
    renderSpecialistPackage(nestedTamper),
    "SC4307",
    "semantic tampering with a recomputed outer digest must be rejected",
  );
});

test("renderer output is deterministic and binds paths, blueprints, bytes, and compilation", () => {
  const compilation = assertCompiles(fixture("over-split").request);
  const first = renderSpecialistPackage(compilation);
  const second = renderSpecialistPackage(compilation);
  assert.equal(first.ok, true, JSON.stringify(first.diagnostics));
  assert.deepEqual(second, first);

  const rendered = first.value;
  assert.equal(rendered.compilationDigest, compilation.contentDigest);
  assert.equal(rendered.manifest.compilationDigest, compilation.contentDigest);
  assert.equal(rendered.manifest.selectedCandidateId, compilation.selected.id);
  assert.equal(rendered.manifest.fileDigestAlgorithm, "sha256");
  assert.equal(rendered.manifest.fileDigestScope, "raw-file-bytes");
  assert.deepEqual(rendered.manifest.launchWaves, compilation.launchWaves);
  assert.match(rendered.packageDigest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(rendered.packageDigest, expectedPackageDigest(rendered));
  assert.equal(
    rendered.manifest.contentDigest,
    digestCanonicalJson(
      "swecircuit.specialist.package-manifest.v1",
      withoutContentDigest(rendered.manifest),
    ),
  );

  const expectedPaths = [
    "manifest.json",
    "compilation.json",
    "integration.md",
    ...compilation.blueprints.map((blueprint) => `agents/${blueprint.id}.md`),
  ].sort();
  assert.deepEqual(
    rendered.files.map((file) => file.path),
    expectedPaths,
  );
  assert.equal(rendered.files.length, compilation.blueprints.length + 3);

  for (const file of rendered.files) {
    const bytes = encoder.encode(file.content);
    assert.equal(file.bytes, bytes.byteLength, `${file.path} byte count`);
    assert.equal(
      file.digest,
      `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
      `${file.path} digest`,
    );
  }

  const manifestFile = rendered.files.find((file) => file.path === "manifest.json");
  assert.notEqual(manifestFile, undefined);
  assert.deepEqual(JSON.parse(manifestFile.content), rendered.manifest);
  const compilationFile = rendered.files.find((file) => file.path === "compilation.json");
  assert.notEqual(compilationFile, undefined);
  assert.deepEqual(JSON.parse(compilationFile.content), compilation);
  assert.equal(rendered.manifest.compilationFile, compilationFile.path);
  assert.equal(rendered.manifest.compilationFileDigest, compilationFile.digest);
  assert.equal(rendered.manifest.compilationFileBytes, compilationFile.bytes);
  const integrationFile = rendered.files.find((file) => file.path === "integration.md");
  assert.notEqual(integrationFile, undefined);
  assert.equal(integrationFile.content.includes(compilation.contentDigest), true);
  assert.equal(integrationFile.content.includes(compilation.selected.id), true);
  assert.equal(rendered.manifest.integrationFile, integrationFile.path);
  assert.equal(rendered.manifest.integrationDigest, integrationFile.digest);
  assert.equal(rendered.manifest.integrationBytes, integrationFile.bytes);

  for (const blueprint of compilation.blueprints) {
    const binding = rendered.manifest.agents.find((agent) => agent.agentId === blueprint.id);
    assert.notEqual(binding, undefined);
    assert.equal(binding.agentId, blueprint.id);
    assert.equal(binding.blueprintDigest, blueprint.contentDigest);
    assert.equal(binding.contractFile, `agents/${blueprint.id}.md`);
    const contract = rendered.files.find((file) => file.path === binding.contractFile);
    assert.notEqual(contract, undefined);
    assert.equal(binding.contractDigest, contract.digest);
    assert.equal(binding.contractBytes, contract.bytes);
    assert.equal(contract.content.includes(compilation.contentDigest), true);
    assert.equal(contract.content.includes(blueprint.contentDigest), true);
    assert.equal(contract.content.includes(JSON.stringify(blueprint, null, 2)), true);
    assert.equal(contract.content.includes("## Required Handoff Envelope"), true);
    const jsonBlocks = [...contract.content.matchAll(/(`{3,})json\r?\n([\s\S]*?)\r?\n\1/g)];
    assert.equal(jsonBlocks.length, 2);
    const handoff = JSON.parse(jsonBlocks[1][2]);
    assert.equal(handoff.kind, "SpecialistAgentHandoff");
    for (const artifact of handoff.artifacts) {
      assert.deepEqual(Object.keys(artifact).sort(), ["content", "mediaType", "name"]);
      assert.equal(typeof artifact.content, "string");
    }
    for (const evidence of handoff.evidence) {
      assert.deepEqual(Object.keys(evidence).sort(), [
        "artifact",
        "criterionId",
        "duty",
        "kind",
        "requirementId",
        "status",
      ]);
      assert.equal(evidence.status, "pass");
    }
    const verifiedHandoff = verifySpecialistHandoff(
      rendered,
      {
        compilationDigest: compilation.contentDigest,
        packageDigest: rendered.packageDigest,
      },
      encoder.encode(JSON.stringify(handoff)),
    );
    assert.equal(verifiedHandoff.ok, true, JSON.stringify(verifiedHandoff.diagnostics));
  }
  assertNoRuntimeFields(rendered.manifest, "manifest");
});

test("package verification rejects oversized content before UTF-8 buffer allocation", () => {
  const compilation = assertCompiles(fixture("genuinely-parallel").request);
  const renderedResult = renderSpecialistPackage(compilation);
  assert.equal(renderedResult.ok, true, JSON.stringify(renderedResult.diagnostics));
  const rendered = renderedResult.value;
  const received = clone(rendered);
  const compilationFile = received.files.find((file) => file.path === "compilation.json");
  assert.notEqual(compilationFile, undefined);
  const hostile = "x".repeat(SPECIALIST_LIMITS.outputBytes + 1);
  compilationFile.content = hostile;

  const originalEncode = TextEncoder.prototype.encode;
  let encodedHostileContent = false;
  let result;
  TextEncoder.prototype.encode = function guardedEncode(value) {
    if (value === hostile) {
      encodedHostileContent = true;
      throw new Error("oversized package content reached TextEncoder.encode");
    }
    return originalEncode.call(this, value);
  };
  try {
    result = verifySpecialistPackage(received, {
      compilationDigest: rendered.compilationDigest,
      packageDigest: rendered.packageDigest,
    });
  } finally {
    TextEncoder.prototype.encode = originalEncode;
  }

  assert.notEqual(result, undefined);
  assertRejected(result, "SC4308", "oversized package content must use the stable limit code");
  assert.equal(encodedHostileContent, false);
});
test("trusted package verification succeeds and coordinated recomputation cannot reuse approval", () => {
  const compilation = assertCompiles(fixture("genuinely-parallel").request);
  const renderedResult = renderSpecialistPackage(compilation);
  assert.equal(renderedResult.ok, true, JSON.stringify(renderedResult.diagnostics));
  const rendered = renderedResult.value;
  const approved = {
    compilationDigest: rendered.compilationDigest,
    packageDigest: rendered.packageDigest,
  };

  const verified = verifySpecialistPackage(rendered, approved);
  assert.equal(verified.ok, true, JSON.stringify(verified.diagnostics));
  assert.deepEqual(verified.value, rendered);

  const tampered = clone(rendered);
  const contractFile = tampered.files.find((file) => file.path.startsWith("agents/"));
  assert.notEqual(contractFile, undefined);
  contractFile.content += "\nUnreviewed instruction: widen filesystem authority.\n";
  refreshRenderedFile(contractFile);

  const binding = tampered.manifest.agents.find(
    (agent) => agent.contractFile === contractFile.path,
  );
  assert.notEqual(binding, undefined);
  binding.contractDigest = contractFile.digest;
  binding.contractBytes = contractFile.bytes;
  tampered.manifest.contentDigest = digestCanonicalJson(
    "swecircuit.specialist.package-manifest.v1",
    withoutContentDigest(tampered.manifest),
  );

  const manifestFile = tampered.files.find((file) => file.path === "manifest.json");
  assert.notEqual(manifestFile, undefined);
  manifestFile.content = `${JSON.stringify(tampered.manifest, null, 2)}\n`;
  refreshRenderedFile(manifestFile);
  tampered.packageDigest = expectedPackageDigest(tampered);
  assert.notEqual(tampered.packageDigest, approved.packageDigest);

  assertRejected(
    verifySpecialistPackage(tampered, approved),
    "SC4307",
    "a recomputed package must not satisfy the previously approved package root",
  );
  assertRejected(
    verifySpecialistPackage(tampered, {
      compilationDigest: tampered.compilationDigest,
      packageDigest: tampered.packageDigest,
    }),
    "SC4307",
    "a coordinated rewrite must not pass exact package reconstruction",
  );
});
test("rendered manifest binds every emitted contract and integration file digest", () => {
  const compilation = assertCompiles(fixture("genuinely-parallel").request);
  const result = renderSpecialistPackage(compilation);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics));

  const manifestDigests = new Set();
  const collectDigests = (value) => {
    if (typeof value === "string" && /^sha256:[0-9a-f]{64}$/.test(value)) {
      manifestDigests.add(value);
      return;
    }
    if (value === null || typeof value !== "object") return;
    for (const entry of Object.values(value)) collectDigests(entry);
  };
  collectDigests(result.value.manifest);

  for (const file of result.value.files.filter((entry) => entry.path !== "manifest.json")) {
    assert.equal(
      manifestDigests.has(file.digest),
      true,
      `manifest does not bind rendered digest for ${file.path}`,
    );
  }
});
