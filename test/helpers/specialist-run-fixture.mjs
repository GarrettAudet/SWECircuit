import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { TextEncoder } from "node:util";

import {
  compileAgentBlueprints,
  createSpecialistRunSession,
  renderSpecialistPackage,
  SPECIALIST_LIMITS,
  SPECIALIST_RUN_LIMITS,
} from "swecircuit";

const encoder = new TextEncoder();
export function assertOk(result, message) {
  assert.equal(result.ok, true, `${message}: ${JSON.stringify(result.diagnostics)}`);
  assert.notEqual(result.value, null, message);
  return result.value;
}

export function diagnosticCodes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

export function assertRejected(result, code, message) {
  assert.equal(result.ok, false, message);
  assert.equal(result.value, null, message);
  assert.ok(
    diagnosticCodes(result).includes(code),
    `${message}: ${JSON.stringify(result.diagnostics)}`,
  );
}

export function assertDeepFrozen(value, path = "value", seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  assert.equal(Object.isFrozen(value), true, `${path} is not frozen`);
  for (const [key, entry] of Object.entries(value)) {
    assertDeepFrozen(entry, `${path}.${key}`, seen);
  }
}

function buildRequest(definitions, suffix) {
  const workUnitIds = definitions.map((definition) => definition.id);
  const evidenceByUnit = new Map(workUnitIds.map((id) => [id, []]));
  const acceptanceCriteria = [];

  for (let left = 0; left < workUnitIds.length; left += 1) {
    for (let right = left + 1; right < workUnitIds.length; right += 1) {
      const producerId = workUnitIds[left];
      const reviewerId = workUnitIds[right];
      const pair = `${left + 1}-${right + 1}`;
      const produceId = `evidence.${suffix}.${pair}.produce`;
      const reviewId = `evidence.${suffix}.${pair}.review`;
      evidenceByUnit.get(producerId).push(produceId);
      evidenceByUnit.get(reviewerId).push(reviewId);
      acceptanceCriteria.push({
        id: `criterion.${suffix}.${pair}`,
        description: `Keep ${producerId} and ${reviewerId} independently evidenced.`,
        evidenceRequirements: [
          {
            id: produceId,
            kind: "artifact",
            duty: "produce",
            description: `Produce bounded evidence for ${producerId}.`,
            independentFromProducer: false,
          },
          {
            id: reviewId,
            kind: "review",
            duty: "review",
            description: `Independently review ${reviewerId}.`,
            independentFromProducer: true,
          },
        ],
      });
    }
  }

  if (workUnitIds.length === 1) {
    const requirementId = `evidence.${suffix}.produce`;
    evidenceByUnit.get(workUnitIds[0]).push(requirementId);
    acceptanceCriteria.push({
      id: `criterion.${suffix}.produce`,
      description: "Produce bounded evidence for the root specialist.",
      evidenceRequirements: [
        {
          id: requirementId,
          kind: "test",
          duty: "produce",
          description: "Produce root verification evidence.",
          independentFromProducer: false,
        },
      ],
    });
  }

  const writeScopes = workUnitIds.map((id) => `src/${id.replaceAll(".", "-")}.ts`);
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: `goal.${suffix}`,
      revision: 1,
      objective: `Verify the ${suffix} specialist run graph without host effects.`,
      integrationOwner: "codex.main",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria,
      contextSources: [
        {
          id: `context.${suffix}`,
          kind: "repository",
          locator: `path:src/context-${suffix}.ts`,
          digest: `sha256:${"1".repeat(64)}`,
          bytes: 1,
          description: "Bounded graph verification context.",
          allowedWorkUnits: workUnitIds,
          readScope: `src/context-${suffix}.ts`,
        },
      ],
      authority: {
        allowedModules: ["module.run-verification"],
        allowedCapabilities: ["verify.run-graph"],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [`src/context-${suffix}.ts`] },
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
      workUnits: definitions.map((definition, index) => ({
        id: definition.id,
        objective: `Complete ${definition.id}.`,
        weight: index + 1,
        module: {
          id: "module.run-verification",
          action: "Derive deterministic specialist run evidence.",
          inputPorts: [{ name: "input", artifactType: "RunEvidence" }],
          outputPorts: [{ name: "output", artifactType: "RunEvidence" }],
        },
        dependencies: definition.dependencies,
        requiredCapabilities: ["verify.run-graph"],
        contextUses: [
          {
            sourceId: `context.${suffix}`,
            purpose: `Verify ${definition.id}.`,
          },
        ],
        scope: {
          read: [`src/context-${suffix}.ts`],
          write: [writeScopes[index]],
          conflictZones: [],
        },
        permissions: [
          { kind: "filesystem.read", scopes: [`src/context-${suffix}.ts`] },
          { kind: "filesystem.write", scopes: [writeScopes[index]] },
        ],
        evidenceRequirementIds: evidenceByUnit.get(definition.id),
        handoffArtifacts: definition.handoffArtifacts ?? [`artifact.${suffix}.${index + 1}.md`],
        stopConditions: [`Stop if ${definition.id} cannot be verified.`],
      })),
    },
    proposedCandidates: [
      {
        id: `candidate.${suffix}.atomic`,
        groups: workUnitIds.map((id) => [id]),
      },
    ],
  };
}

export function makeFixture(definitions, suffix) {
  const compilation = assertOk(
    compileAgentBlueprints(buildRequest(definitions, suffix)),
    `${suffix} compilation`,
  );
  assert.equal(compilation.blueprints.length, definitions.length);
  assert.equal(
    compilation.blueprints.every((blueprint) => blueprint.workUnitIds.length === 1),
    true,
    `${suffix} did not preserve atomic work units`,
  );
  const specialistPackage = assertOk(
    renderSpecialistPackage(compilation),
    `${suffix} package render`,
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  const initialSession = assertOk(
    createSpecialistRunSession(specialistPackage, expectation),
    `${suffix} session creation`,
  );
  const blueprintByUnit = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.workUnitIds[0], blueprint]),
  );
  return {
    definitions,
    compilation,
    specialistPackage,
    expectation,
    initialSession,
    blueprintByUnit,
  };
}

export function handoffFor(fixture, unitId, outcome = "pass") {
  const blueprint = fixture.blueprintByUnit.get(unitId);
  assert.notEqual(blueprint, undefined, `missing blueprint for ${unitId}`);
  const artifacts = blueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: name.endsWith(".json") ? "application/json" : "text/markdown",
    content: `# Evidence\n\n${unitId} returned ${outcome}.\n`,
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
    agent: {
      id: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
    },
    compilationDigest: fixture.compilation.contentDigest,
    summary: `${unitId} completed with ${outcome}.`,
    workUnitsCompleted: outcome === "pass" ? [...blueprint.workUnitIds] : [],
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

export function rawHandoff(fixture, unitId, outcome = "pass") {
  return encoder.encode(JSON.stringify(handoffFor(fixture, unitId, outcome)));
}

export function maximumRawHandoff(fixture, unitId) {
  const handoff = handoffFor(fixture, unitId);
  for (const artifact of handoff.artifacts) {
    artifact.content = "x";
  }
  let padding =
    SPECIALIST_RUN_LIMITS.rawHandoffBytes - encoder.encode(JSON.stringify(handoff)).byteLength;
  assert.ok(padding >= 0, `${unitId} exceeds the raw handoff boundary before padding`);
  for (const artifact of handoff.artifacts) {
    const addition = Math.min(SPECIALIST_LIMITS.textBytes - artifact.content.length, padding);
    artifact.content += "x".repeat(addition);
    padding -= addition;
  }
  assert.equal(padding, 0, `${unitId} artifacts could not reach the raw handoff boundary`);
  const raw = encoder.encode(JSON.stringify(handoff));
  assert.equal(raw.byteLength, SPECIALIST_RUN_LIMITS.rawHandoffBytes);
  return raw;
}

export function jsonByteLength(value) {
  return Buffer.byteLength(JSON.stringify(value));
}
