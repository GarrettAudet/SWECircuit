import assert from "node:assert/strict";

import { makeFixture } from "./specialist-run-fixture.mjs";

export const OBSERVED = Object.freeze({
  model: "observed",
  effort: "observed",
  tools: "observed",
  skills: "observed",
  isolation: "observed",
  permissions: "observed",
  workspace: "observed",
  context: "observed",
});

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

function evidence(id) {
  return [{
    id: `evidence.${id}`,
    kind: "owner_assessment",
    locator: `path:docs/${id}.md`,
    digest: `sha256:${"a".repeat(64)}`,
    bytes: 1,
  }];
}

function row(id, profileId, effortId, independenceDomain, costRank, latencyRank, options = {}) {
  return {
    id,
    profileId,
    effortId,
    effortRank: options.effortRank ?? 1,
    runtimeFamily: options.runtimeFamily ?? "fixture-runtime",
    independenceDomain,
    reasoningTier: options.reasoningTier ?? "reasoning-2",
    capabilities: options.capabilities ?? [{ capabilityId: "verify.run-graph", qualityTier: "quality-2" }],
    contextLimitBytes: options.contextLimitBytes ?? 4096,
    tools: options.tools ?? ["node"],
    skills: options.skills ?? ["routing"],
    isolationFeatures: options.isolationFeatures ?? ["workspace"],
    permissionFeatures: options.permissionFeatures ?? ["filesystem.read", "filesystem.write"],
    observationModes: options.observationModes ?? OBSERVED,
    costRank,
    latencyRank,
    evidence: evidence(id),
  };
}

export function makeRoutingFixture(options = {}) {
  const specialist = makeFixture(
    [
      { id: "producer", dependencies: [] },
      { id: "checker", dependencies: [] },
    ],
    options.suffix ?? "runtime-routing",
  );
  const policy = {
    apiVersion: "swecircuit/runtime-routing/v1alpha1",
    kind: "RuntimeDemandPolicy",
    id: "policy.runtime-routing",
    revision: 1,
    qualityTiers: [
      { id: "quality-0", rank: 0 },
      { id: "quality-1", rank: 1 },
      { id: "quality-2", rank: 2 },
    ],
    reasoningTiers: [
      { id: "reasoning-0", rank: 0 },
      { id: "reasoning-1", rank: 1 },
      { id: "reasoning-2", rank: 2 },
    ],
    capabilityRules: [{
      capabilityId: "verify.run-graph",
      minimumQualityTier: "quality-1",
      minimumReasoningTier: "reasoning-1",
      requiredTools: ["node"],
      requiredSkills: ["routing"],
      requiredIsolationFeatures: ["workspace"],
      requiredPermissionFeatures: ["filesystem.read"],
    }],
    evidenceRules: [
      {
        kind: "artifact",
        duty: "produce",
        minimumQualityTier: "quality-1",
        minimumReasoningTier: "reasoning-1",
      },
      {
        kind: "review",
        duty: "review",
        minimumQualityTier: "quality-2",
        minimumReasoningTier: "reasoning-2",
      },
    ],
    permissionRules: [
      {
        kind: "filesystem.read",
        requiredIsolationFeatures: ["workspace"],
        requiredPermissionFeatures: ["filesystem.read"],
      },
      {
        kind: "filesystem.write",
        requiredIsolationFeatures: ["workspace"],
        requiredPermissionFeatures: ["filesystem.write"],
      },
    ],
    observability: OBSERVED,
    search: {
      exactVectorLimit: options.exactVectorLimit ?? 16,
      boundedBeamWidth: options.boundedBeamWidth ?? 4,
    },
  };
  const calibration = {
    apiVersion: "swecircuit/runtime-routing/v1alpha1",
    kind: "RuntimeCalibrationCatalog",
    id: "calibration.runtime-routing",
    revision: 1,
    assessedBy: "fixture.owner",
    adapterId: "fixture.adapter",
    adapterRevision: "1",
    runtimeRows: [
      row("row.alpha", "alpha", "low", "domain.alpha", 1, 3),
      row("row.beta", "beta", "low", "domain.beta", 2, 2),
      row("row.gamma", "gamma", "high", "domain.gamma", 9, 1, { effortRank: 3 }),
    ],
  };
  const inventory = {
    apiVersion: "swecircuit/runtime-routing/v1alpha1",
    kind: "HostCapabilityInventory",
    id: "inventory.runtime-routing",
    revision: 1,
    hostId: "fixture.host",
    adapterId: "fixture.adapter",
    adapterRevision: "1",
    catalogRevision: "1",
    completeness: "complete_host_catalog",
    maxConcurrentAgents: 1,
    rows: calibration.runtimeRows.map((calibrationRow) => ({
      calibrationRowId: calibrationRow.id,
      availability: "available",
      availabilityReason: "available for deterministic fixture tests",
    })),
  };
  return {
    specialist,
    policy,
    calibration,
    inventory,
    request: {
      apiVersion: "swecircuit/runtime-routing/v1alpha1",
      kind: "CompileRuntimeAssignmentsRequest",
      compilation: specialist.compilation,
      packageExpectation: specialist.expectation,
      policy,
      calibration,
      inventory,
    },
  };
}

export function rowFor(fixture, id) {
  const found = fixture.calibration.runtimeRows.find((entry) => entry.id === id);
  assert.notEqual(found, undefined, `missing calibration row ${id}`);
  return found;
}

export function reverseLogicalCollections(value) {
  const copy = clone(value);
  copy.policy.qualityTiers.reverse();
  copy.policy.reasoningTiers.reverse();
  copy.policy.evidenceRules.reverse();
  copy.policy.permissionRules.reverse();
  copy.calibration.runtimeRows.reverse();
  copy.inventory.rows.reverse();
  return copy;
}
