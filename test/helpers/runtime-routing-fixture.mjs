import assert from "node:assert/strict";

import { compileAgentBlueprints, renderSpecialistPackage } from "swecircuit";

export const ROUTING_API_VERSION = "swecircuit/runtime-routing/v1alpha1";

export function clone(value) {
  return structuredClone(value);
}

export function assertOk(result, message) {
  assert.equal(result.ok, true, `${message}: ${JSON.stringify(result.diagnostics)}`);
  assert.notEqual(result.value, null, message);
  return result.value;
}

export function assertRejected(result, code, message) {
  assert.equal(result.ok, false, message);
  assert.equal(result.value, null, message);
  assert.equal(
    result.diagnostics.some((diagnostic) => diagnostic.code === code),
    true,
    `${message}: ${JSON.stringify(result.diagnostics)}`,
  );
}

export function row(fixture, id) {
  const value = fixture.request.calibration.runtimeRows.find((entry) => entry.id === id);
  assert.notEqual(value, undefined, `missing calibration row ${id}`);
  return value;
}

export function inventoryRow(fixture, calibrationRowId) {
  const value = fixture.request.inventory.rows.find(
    (entry) => entry.calibrationRowId === calibrationRowId,
  );
  assert.notEqual(value, undefined, `missing inventory row ${calibrationRowId}`);
  return value;
}

export function reverseObjectProperties(value) {
  if (Array.isArray(value)) {
    return value.map(reverseObjectProperties);
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .reverse()
      .map(([key, entry]) => [key, reverseObjectProperties(entry)]),
  );
}

function specialistRequest() {
  const source = {
    id: "context.runtime-routing",
    kind: "repository",
    locator: "path:src/runtime-routing-context.ts",
    digest: `sha256:${"1".repeat(64)}`,
    bytes: 1024,
    description: "Bounded routing test context.",
    allowedWorkUnits: ["unit.producer", "unit.checker"],
    readScope: "src/runtime-routing-context.ts",
  };
  const evidence = [
    {
      id: "evidence.routing.produce",
      kind: "artifact",
      duty: "produce",
      description: "Produce routing evidence.",
      independentFromProducer: false,
    },
    {
      id: "evidence.routing.review",
      kind: "review",
      duty: "review",
      description: "Independently review routing evidence.",
      independentFromProducer: true,
    },
  ];
  const units = [
    {
      id: "unit.producer",
      capability: "capability.producer",
      evidenceRequirementIds: ["evidence.routing.produce"],
      write: "src/runtime-routing-producer.ts",
    },
    {
      id: "unit.checker",
      capability: "capability.checker",
      evidenceRequirementIds: ["evidence.routing.review"],
      write: "src/runtime-routing-checker.ts",
    },
  ];

  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "goal.runtime-routing",
      revision: 1,
      objective: "Verify a deterministic runtime assignment.",
      integrationOwner: "codex.main",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.routing",
          description: "Routing evidence has an independent checker.",
          evidenceRequirements: evidence,
        },
      ],
      contextSources: [source],
      authority: {
        allowedModules: ["module.runtime-routing"],
        allowedCapabilities: units.map((unit) => unit.capability).sort(),
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [source.readScope] },
          { kind: "filesystem.write", scopes: units.map((unit) => unit.write).sort() },
        ],
        forbiddenEffects: ["Do not perform host effects."],
        maxAgents: 2,
        maxConcurrency: 2,
      },
      optimization: {
        agentStartupCost: 0,
        handoffCost: 0,
      },
      workUnits: units.map((unit, index) => ({
        id: unit.id,
        objective: `Complete ${unit.id}.`,
        weight: index + 1,
        module: {
          id: "module.runtime-routing",
          action: "Verify a bounded runtime-routing fixture.",
          inputPorts: [{ name: "input", artifactType: "RuntimeRoutingEvidence" }],
          outputPorts: [{ name: "output", artifactType: "RuntimeRoutingEvidence" }],
        },
        dependencies: [],
        requiredCapabilities: [unit.capability],
        contextUses: [
          {
            sourceId: source.id,
            purpose: `Verify ${unit.id}.`,
          },
        ],
        scope: {
          read: [source.readScope],
          write: [unit.write],
          conflictZones: [],
        },
        permissions: [
          { kind: "filesystem.read", scopes: [source.readScope] },
          { kind: "filesystem.write", scopes: [unit.write] },
        ],
        evidenceRequirementIds: unit.evidenceRequirementIds,
        handoffArtifacts: [`${unit.id}.md`],
        stopConditions: [`Stop if ${unit.id} cannot be verified.`],
      })),
    },
    proposedCandidates: [
      {
        id: "candidate.runtime-routing.atomic",
        groups: units.map((unit) => [unit.id]),
      },
    ],
  };
}

function observationModes() {
  return {
    model: "observed",
    effort: "observed",
    tools: "observed",
    skills: "observed",
    isolation: "observed",
    permissions: "observed",
    workspace: "observed",
    context: "observed",
  };
}

function calibrationRow({ id, capabilityId, domain, costRank, profileId }) {
  return {
    id,
    profileId,
    effortId: "effort.standard",
    effortRank: 1,
    runtimeFamily: "family.test",
    independenceDomain: domain,
    reasoningTier: "reasoning.high",
    capabilities: [{ capabilityId, qualityTier: "quality.high" }],
    contextLimitBytes: 4096,
    tools: ["tool.alpha"],
    skills: ["skill.alpha"],
    isolationFeatures: ["isolation.alpha"],
    permissionFeatures: ["permission.alpha"],
    observationModes: observationModes(),
    costRank,
    latencyRank: 1,
    evidence: [
      {
        id: `evidence.${id}`,
        kind: "owner_assessment",
        locator: `path:calibration/${id}.json`,
        digest: `sha256:${"2".repeat(64)}`,
        bytes: 1,
      },
    ],
  };
}

function routingPolicy() {
  return {
    apiVersion: ROUTING_API_VERSION,
    kind: "RuntimeDemandPolicy",
    id: "policy.runtime-routing",
    revision: 1,
    qualityTiers: [
      { id: "quality.base", rank: 0 },
      { id: "quality.high", rank: 1 },
      { id: "quality.elite", rank: 2 },
    ],
    reasoningTiers: [
      { id: "reasoning.base", rank: 0 },
      { id: "reasoning.high", rank: 1 },
      { id: "reasoning.elite", rank: 2 },
    ],
    capabilityRules: [
      {
        capabilityId: "capability.checker",
        minimumQualityTier: "quality.high",
        minimumReasoningTier: "reasoning.high",
        requiredTools: ["tool.alpha"],
        requiredSkills: ["skill.alpha"],
        requiredIsolationFeatures: ["isolation.alpha"],
        requiredPermissionFeatures: ["permission.alpha"],
      },
      {
        capabilityId: "capability.producer",
        minimumQualityTier: "quality.high",
        minimumReasoningTier: "reasoning.high",
        requiredTools: ["tool.alpha"],
        requiredSkills: ["skill.alpha"],
        requiredIsolationFeatures: ["isolation.alpha"],
        requiredPermissionFeatures: ["permission.alpha"],
      },
    ],
    evidenceRules: [
      {
        kind: "artifact",
        duty: "produce",
        minimumQualityTier: "quality.high",
        minimumReasoningTier: "reasoning.high",
      },
      {
        kind: "review",
        duty: "review",
        minimumQualityTier: "quality.high",
        minimumReasoningTier: "reasoning.high",
      },
    ],
    permissionRules: [
      {
        kind: "filesystem.read",
        requiredIsolationFeatures: [],
        requiredPermissionFeatures: [],
      },
      {
        kind: "filesystem.write",
        requiredIsolationFeatures: [],
        requiredPermissionFeatures: [],
      },
    ],
    observability: {
      model: "observed",
      effort: "observed",
      tools: "observed",
      skills: "observed",
      isolation: "observed",
      permissions: "observed",
      workspace: "observed",
      context: "observed",
    },
    search: {
      exactVectorLimit: 64,
      boundedBeamWidth: 4,
    },
  };
}

export function makeRoutingFixture() {
  const compilation = assertOk(
    compileAgentBlueprints(specialistRequest()),
    "runtime-routing specialist compilation",
  );
  const specialistPackage = assertOk(
    renderSpecialistPackage(compilation),
    "runtime-routing specialist package",
  );
  const runtimeRows = [
    calibrationRow({
      id: "row.checker.domain-a",
      capabilityId: "capability.checker",
      domain: "domain.a",
      costRank: 0,
      profileId: "profile.checker.a",
    }),
    calibrationRow({
      id: "row.checker.domain-b",
      capabilityId: "capability.checker",
      domain: "domain.b",
      costRank: 2,
      profileId: "profile.checker.b",
    }),
    calibrationRow({
      id: "row.checker.domain-d",
      capabilityId: "capability.checker",
      domain: "domain.d",
      costRank: 8,
      profileId: "profile.checker.d",
    }),
    calibrationRow({
      id: "row.producer.domain-a",
      capabilityId: "capability.producer",
      domain: "domain.a",
      costRank: 1,
      profileId: "profile.producer.a",
    }),
    calibrationRow({
      id: "row.producer.domain-b",
      capabilityId: "capability.producer",
      domain: "domain.b",
      costRank: 4,
      profileId: "profile.producer.b",
    }),
    calibrationRow({
      id: "row.producer.domain-c",
      capabilityId: "capability.producer",
      domain: "domain.c",
      costRank: 8,
      profileId: "profile.producer.c",
    }),
  ];
  const calibration = {
    apiVersion: ROUTING_API_VERSION,
    kind: "RuntimeCalibrationCatalog",
    id: "calibration.runtime-routing",
    revision: 1,
    assessedBy: "owner.runtime-routing",
    adapterId: "adapter.test",
    adapterRevision: "1",
    runtimeRows,
  };
  const inventory = {
    apiVersion: ROUTING_API_VERSION,
    kind: "HostCapabilityInventory",
    id: "inventory.runtime-routing",
    revision: 1,
    hostId: "host.test",
    adapterId: calibration.adapterId,
    adapterRevision: calibration.adapterRevision,
    catalogRevision: String(calibration.revision),
    completeness: "complete_host_catalog",
    maxConcurrentAgents: 1,
    rows: runtimeRows.map((entry) => ({
      calibrationRowId: entry.id,
      availability: "available",
      availabilityReason: "available",
    })),
  };
  return {
    compilation,
    specialistPackage,
    request: {
      apiVersion: ROUTING_API_VERSION,
      kind: "CompileRuntimeAssignmentsRequest",
      compilation,
      packageExpectation: {
        compilationDigest: compilation.contentDigest,
        packageDigest: specialistPackage.packageDigest,
      },
      policy: routingPolicy(),
      calibration,
      inventory,
    },
  };
}
