import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import { digestCanonicalJson } from "../dist/canonical-json.js";
import { compileAgentBlueprints } from "../dist/specialist-compiler.js";
import { assessSpecialistHandoffs, verifySpecialistHandoff } from "../dist/specialist-handoff.js";
import { inspectSpecialistRunSession } from "../dist/specialist-run-inspection.js";
import { createSpecialistRunSession } from "../dist/specialist-run-session.js";
import { renderSpecialistPackage } from "../dist/specialist-render.js";

const encoder = new TextEncoder();
const SESSION_DIGEST_DOMAIN = "swecircuit/specialist-run/session/v1alpha1";
const INSPECTION_DIGEST_DOMAIN = "swecircuit/specialist-run/inspection/v1alpha1";

const DEFINITIONS = [
  { id: "unit.a", dependencies: [] },
  { id: "unit.b", dependencies: ["unit.a"] },
  { id: "unit.c", dependencies: ["unit.a"] },
  { id: "unit.d", dependencies: ["unit.b", "unit.c"] },
  { id: "unit.e", dependencies: [] },
  { id: "unit.f", dependencies: ["unit.d"] },
];

function assertOk(result, message) {
  assert.equal(result.ok, true, `${message}: ${JSON.stringify(result.diagnostics)}`);
  assert.notEqual(result.value, null, message);
  return result.value;
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

function buildRequest() {
  const workUnitIds = DEFINITIONS.map((definition) => definition.id);
  const evidenceByUnit = new Map(workUnitIds.map((id) => [id, []]));
  const acceptanceCriteria = [];
  for (let left = 0; left < workUnitIds.length; left += 1) {
    for (let right = left + 1; right < workUnitIds.length; right += 1) {
      const producerId = workUnitIds[left];
      const reviewerId = workUnitIds[right];
      const suffix = `${left + 1}-${right + 1}`;
      const produceId =
        left === 0 && right === 1
          ? "evidence.9-counterordered.produce"
          : left === 0 && right === 2
            ? "evidence.0-counterordered.produce"
            : `evidence.${suffix}.produce`;
      const reviewId = `evidence.${suffix}.review`;
      evidenceByUnit.get(producerId).push(produceId);
      evidenceByUnit.get(reviewerId).push(reviewId);
      acceptanceCriteria.push({
        id: `criterion.${suffix}`,
        description: `Keep ${producerId} and ${reviewerId} independently evidenced.`,
        evidenceRequirements: [
          {
            id: produceId,
            kind: "artifact",
            duty: "produce",
            description: `Produce evidence for ${producerId}.`,
            independentFromProducer: false,
          },
          {
            id: reviewId,
            kind: "review",
            duty: "review",
            description: `Review evidence for ${reviewerId}.`,
            independentFromProducer: true,
          },
        ],
      });
    }
  }

  const writeScopes = workUnitIds.map((id) => `src/${id}.ts`);
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "goal.session-inspection-test",
      revision: 1,
      objective: "Verify deterministic specialist run inspection across a complete DAG.",
      integrationOwner: "codex.main",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria,
      contextSources: [
        {
          id: "context.session-inspection-test",
          kind: "repository",
          locator: "path:src/context.ts",
          digest: `sha256:${"1".repeat(64)}`,
          bytes: 1,
          description: "Bounded test context.",
          allowedWorkUnits: workUnitIds,
          readScope: "src/context.ts",
        },
      ],
      authority: {
        allowedModules: ["module.session-inspection-test"],
        allowedCapabilities: ["inspect.deterministic-dag"],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: ["src/context.ts"] },
          { kind: "filesystem.write", scopes: writeScopes },
        ],
        forbiddenEffects: ["Do not perform host effects."],
        maxAgents: workUnitIds.length,
        maxConcurrency: workUnitIds.length,
      },
      optimization: {
        agentStartupCost: 0,
        handoffCost: 0,
      },
      workUnits: DEFINITIONS.map((definition, index) => ({
        id: definition.id,
        objective: `Complete ${definition.id}.`,
        weight: index + 1,
        module: {
          id: "module.session-inspection-test",
          action: "Derive deterministic DAG evidence.",
          inputPorts: [{ name: "input", artifactType: "DagEvidence" }],
          outputPorts: [{ name: "output", artifactType: "DagEvidence" }],
        },
        dependencies: definition.dependencies,
        requiredCapabilities: ["inspect.deterministic-dag"],
        contextUses: [
          {
            sourceId: "context.session-inspection-test",
            purpose: `Verify ${definition.id}.`,
          },
        ],
        scope: {
          read: ["src/context.ts"],
          write: [`src/${definition.id}.ts`],
          conflictZones: [],
        },
        permissions: [
          { kind: "filesystem.read", scopes: ["src/context.ts"] },
          { kind: "filesystem.write", scopes: [`src/${definition.id}.ts`] },
        ],
        evidenceRequirementIds: evidenceByUnit.get(definition.id),
        handoffArtifacts: [`artifact.${index + 1}.md`],
        stopConditions: [`Stop if ${definition.id} cannot be verified.`],
      })),
    },
    proposedCandidates: [
      {
        id: "candidate.one-agent-per-unit",
        groups: workUnitIds.map((id) => [id]),
      },
    ],
  };
}

let cachedFixture;

function graphFixture() {
  if (cachedFixture !== undefined) {
    return cachedFixture;
  }
  const compilation = assertOk(
    compileAgentBlueprints(buildRequest()),
    "DAG request should compile",
  );
  assert.equal(compilation.blueprints.length, DEFINITIONS.length);
  assert.equal(
    compilation.blueprints.every((blueprint) => blueprint.workUnitIds.length === 1),
    true,
    "independent evidence duties should preserve one blueprint per DAG node",
  );
  const rendered = assertOk(renderSpecialistPackage(compilation), "package should render");
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: rendered.packageDigest,
  };
  const initialSession = assertOk(
    createSpecialistRunSession(rendered, expectation),
    "session should be created",
  );
  const blueprintByUnit = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.workUnitIds[0], blueprint]),
  );
  cachedFixture = {
    compilation,
    rendered,
    expectation,
    initialSession,
    blueprintByUnit,
  };
  return cachedFixture;
}

function rawHandoff(fixture, unitId, outcome = "pass") {
  const blueprint = fixture.blueprintByUnit.get(unitId);
  assert.notEqual(blueprint, undefined, `missing blueprint for ${unitId}`);
  const artifacts = blueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: "text/markdown",
    content: `# Evidence\n\n${unitId} produced ${outcome}.\n`,
  }));
  const handoff = {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistAgentHandoff",
    outcome,
    destination: blueprint.handoff.destination,
    goal: {
      id: fixture.compilation.goal.id,
      revision: fixture.compilation.goal.revision,
      digest: fixture.compilation.goalDigest,
    },
    agent: {
      id: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
    },
    compilationDigest: fixture.compilation.contentDigest,
    summary: `${unitId} returned ${outcome}.`,
    workUnitsCompleted: outcome === "pass" ? [...blueprint.workUnitIds] : [],
    artifacts,
    evidence: blueprint.evidenceDuties.map((duty) => ({
      criterionId: duty.criterionId,
      requirementId: duty.requirementId,
      kind: duty.kind,
      duty: duty.duty,
      status: outcome,
      artifact: artifacts[0].name,
    })),
    assumptions: [],
    risks: [],
    followUps: [],
  };
  const raw = encoder.encode(JSON.stringify(handoff));
  const verified = assertOk(
    verifySpecialistHandoff(fixture.rendered, fixture.expectation, raw),
    `${unitId} handoff should verify`,
  );
  return { raw, verified };
}

function acceptedRow(handoff) {
  return {
    agentId: handoff.verified.handoff.agent.id,
    blueprintDigest: handoff.verified.handoff.agent.blueprintDigest,
    outcome: handoff.verified.handoff.outcome,
    rawEncoding: "base64",
    rawBytes: handoff.verified.rawBytes,
    rawDigest: handoff.verified.rawDigest,
    rawBase64: Buffer.from(handoff.raw).toString("base64"),
  };
}

function sessionWithRows(fixture, rows) {
  const acceptedHandoffs = [...rows].sort((left, right) =>
    left.agentId < right.agentId ? -1 : left.agentId > right.agentId ? 1 : 0,
  );
  const base = {
    apiVersion: fixture.initialSession.apiVersion,
    kind: fixture.initialSession.kind,
    goal: fixture.initialSession.goal,
    compilationDigest: fixture.initialSession.compilationDigest,
    packageDigest: fixture.initialSession.packageDigest,
    selectedCandidateId: fixture.initialSession.selectedCandidateId,
    package: fixture.initialSession.package,
    acceptedHandoffs,
  };
  return {
    ...base,
    contentDigest: digestCanonicalJson(SESSION_DIGEST_DOMAIN, base),
  };
}

function statusForUnit(fixture, inspection, unitId) {
  const agentId = fixture.blueprintByUnit.get(unitId).id;
  const status = inspection.agents.find((entry) => entry.agentId === agentId);
  assert.notEqual(status, undefined, `missing status for ${unitId}`);
  return status;
}

function agentIdsForUnits(fixture, unitIds) {
  return unitIds
    .map((unitId) => fixture.blueprintByUnit.get(unitId).id)
    .sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
}

function assertInspectionDigest(inspection) {
  const base = structuredClone(inspection);
  delete base.contentDigest;
  assert.equal(inspection.contentDigest, digestCanonicalJson(INSPECTION_DIGEST_DOMAIN, base));
}

test("inspection derives manifest contracts, DAG statuses, evidence, and complete-roster readiness", () => {
  const fixture = graphFixture();
  const initial = assertOk(
    inspectSpecialistRunSession(fixture.initialSession, fixture.expectation),
    "initial inspection should succeed",
  );
  const initialEligible = agentIdsForUnits(fixture, ["unit.a", "unit.e"]);
  assert.equal(initial.stage, "collecting");
  assert.equal(initial.integrationReady, false);
  assert.equal(initial.specialistOutcome, null);
  assert.deepEqual(
    initial.dependencyEligibleContracts.map((contract) => contract.agentId),
    initialEligible,
  );
  assert.deepEqual(initial.nextAction, {
    kind: "external_host.evaluate_dependency_eligible_contracts",
    actor: "external_host",
    agentIds: initialEligible,
  });
  assert.equal(statusForUnit(fixture, initial, "unit.a").status, "dependency_eligible");
  assert.equal(statusForUnit(fixture, initial, "unit.e").status, "dependency_eligible");
  assert.deepEqual(
    statusForUnit(fixture, initial, "unit.b").waitingForAgentIds,
    agentIdsForUnits(fixture, ["unit.a"]),
  );
  assert.deepEqual(
    statusForUnit(fixture, initial, "unit.d").waitingForAgentIds,
    agentIdsForUnits(fixture, ["unit.b", "unit.c"]),
  );

  for (const contract of initial.dependencyEligibleContracts) {
    const binding = fixture.rendered.manifest.agents.find(
      (agent) => agent.agentId === contract.agentId,
    );
    const file = fixture.rendered.files.find((entry) => entry.path === binding.contractFile);
    assert.deepEqual(contract, {
      agentId: binding.agentId,
      blueprintDigest: binding.blueprintDigest,
      path: binding.contractFile,
      mediaType: "text/markdown",
      bytes: file.bytes,
      digest: file.digest,
      content: file.content,
    });
  }

  const handoffs = new Map(
    DEFINITIONS.map((definition) => [definition.id, rawHandoff(fixture, definition.id)]),
  );
  const partialRows = ["unit.a", "unit.b", "unit.c"].map((unitId) =>
    acceptedRow(handoffs.get(unitId)),
  );
  const partial = assertOk(
    inspectSpecialistRunSession(sessionWithRows(fixture, partialRows), fixture.expectation),
    "partial inspection should succeed",
  );
  assert.equal(statusForUnit(fixture, partial, "unit.a").status, "accepted_pass");
  assert.equal(statusForUnit(fixture, partial, "unit.d").status, "dependency_eligible");
  assert.deepEqual(
    partial.dependencyEligibleContracts.map((contract) => contract.agentId),
    agentIdsForUnits(fixture, ["unit.d", "unit.e"]),
  );
  assert.equal(partial.acceptedEvidence.length, 3);
  for (const evidence of partial.acceptedEvidence) {
    const handoff = [...handoffs.values()].find(
      (candidate) => candidate.verified.handoff.agent.id === evidence.agentId,
    );
    assert.notEqual(handoff, undefined);
    assert.equal(evidence.rawDigest, handoff.verified.rawDigest);
    assert.equal(evidence.semanticDigest, handoff.verified.semanticDigest);
    assert.deepEqual(evidence.artifacts, handoff.verified.artifactBindings);
    assert.equal(
      evidence.artifacts.every((artifact) => !("content" in artifact)),
      true,
    );
    assert.deepEqual(
      evidence.evidence.map((entry) => entry.requirementId),
      [...handoff.verified.handoff.evidence].map((entry) => entry.requirementId).sort(),
    );
  }

  const unitAEvidence = partial.acceptedEvidence.find(
    (entry) => entry.agentId === fixture.blueprintByUnit.get("unit.a").id,
  );
  assert.notEqual(unitAEvidence, undefined);
  assert.deepEqual(
    [unitAEvidence.evidence[0].criterionId, unitAEvidence.evidence[0].requirementId],
    ["criterion.1-3", "evidence.0-counterordered.produce"],
  );
  assert.deepEqual(
    [unitAEvidence.evidence.at(-1).criterionId, unitAEvidence.evidence.at(-1).requirementId],
    ["criterion.1-2", "evidence.9-counterordered.produce"],
  );

  const dependencyUnits = ["unit.a", "unit.b", "unit.c", "unit.d"];
  const dependencyRows = dependencyUnits.map((unitId) => acceptedRow(handoffs.get(unitId)));
  const beforeSink = assertOk(
    inspectSpecialistRunSession(sessionWithRows(fixture, dependencyRows), fixture.expectation),
    "pre-sink inspection should succeed",
  );
  const sinkAgentId = fixture.blueprintByUnit.get("unit.f").id;
  assert.equal(statusForUnit(fixture, beforeSink, "unit.f").status, "dependency_eligible");
  assert.deepEqual(
    beforeSink.dependencyEligibleContracts.map((contract) => contract.agentId),
    agentIdsForUnits(fixture, ["unit.e", "unit.f"]),
  );
  assert.equal(beforeSink.integrationReady, false);
  const differential = assertOk(
    assessSpecialistHandoffs(
      fixture.rendered,
      fixture.expectation,
      sinkAgentId,
      dependencyUnits.map((unitId) => handoffs.get(unitId).raw),
    ),
    "V11 dependency assessment should succeed",
  );
  assert.equal(differential.integrationReady, true);

  const allRows = DEFINITIONS.map((definition) => acceptedRow(handoffs.get(definition.id)));
  const complete = assertOk(
    inspectSpecialistRunSession(sessionWithRows(fixture, allRows), fixture.expectation),
    "complete inspection should succeed",
  );
  assert.equal(complete.stage, "integration_ready");
  assert.equal(complete.integrationReady, true);
  assert.equal(complete.specialistOutcome, "pass");
  assert.equal(
    complete.agents.every((agent) => agent.status === "accepted_pass"),
    true,
  );
  assert.deepEqual(complete.dependencyEligibleContracts, []);
  assert.deepEqual(complete.nextAction, {
    kind: "integration_owner.integrate_and_verify",
    actor: "integration_owner",
    integrationOwner: fixture.compilation.goal.integrationOwner,
  });
  const converged = assertOk(
    inspectSpecialistRunSession(
      sessionWithRows(fixture, [...allRows].reverse()),
      fixture.expectation,
    ),
    "permuted accepted rows should converge",
  );
  assert.deepEqual(converged, complete);
  assertInspectionDigest(complete);
  assertDeepFrozen(complete);

  const wrongExpectation = inspectSpecialistRunSession(fixture.initialSession, {
    compilationDigest: fixture.expectation.compilationDigest,
    packageDigest: `sha256:${"0".repeat(64)}`,
  });
  assert.equal(wrongExpectation.ok, false);
  assert.equal(
    wrongExpectation.diagnostics.some((entry) => entry.code === "SC4307"),
    true,
  );
});

test("inspection closes every non-pass route and marks all unsettled work session-routed", () => {
  const fixture = graphFixture();
  const passA = acceptedRow(rawHandoff(fixture, "unit.a"));
  const nonPassOutcomes = ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"];

  for (const outcome of nonPassOutcomes) {
    const routeE = acceptedRow(rawHandoff(fixture, "unit.e", outcome));
    const inspection = assertOk(
      inspectSpecialistRunSession(sessionWithRows(fixture, [passA, routeE]), fixture.expectation),
      `${outcome} route inspection should succeed`,
    );
    const route = {
      agentId: fixture.blueprintByUnit.get("unit.e").id,
      outcome,
    };
    assert.equal(inspection.stage, "routed");
    assert.equal(inspection.specialistOutcome, outcome);
    assert.equal(inspection.integrationReady, false);
    assert.deepEqual(inspection.routes, [route]);
    assert.deepEqual(inspection.dependencyEligibleContracts, []);
    assert.deepEqual(inspection.nextAction, {
      kind: "integration_owner.route_specialist_outcome",
      actor: "integration_owner",
      integrationOwner: fixture.compilation.goal.integrationOwner,
      routes: [route],
    });
    assert.equal(statusForUnit(fixture, inspection, "unit.a").status, "accepted_pass");
    assert.deepEqual(statusForUnit(fixture, inspection, "unit.e"), {
      agentId: route.agentId,
      blueprintDigest: fixture.blueprintByUnit.get("unit.e").contentDigest,
      dependencies: [],
      status: "accepted_non_pass",
      outcome,
      waitingForAgentIds: [],
      blockingRoutes: [route],
    });
    assert.equal(statusForUnit(fixture, inspection, "unit.b").status, "session_routed");
    assert.deepEqual(statusForUnit(fixture, inspection, "unit.b").waitingForAgentIds, []);
    assert.deepEqual(
      statusForUnit(fixture, inspection, "unit.f").waitingForAgentIds,
      agentIdsForUnits(fixture, ["unit.d"]),
    );
    assert.equal(
      inspection.agents
        .filter((agent) => ![passA.agentId, routeE.agentId].includes(agent.agentId))
        .every((agent) => agent.status === "session_routed"),
      true,
    );
    assertInspectionDigest(inspection);
  }
});
