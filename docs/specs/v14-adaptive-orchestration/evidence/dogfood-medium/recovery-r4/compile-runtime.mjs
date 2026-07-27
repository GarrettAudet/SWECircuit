import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  RUNTIME_ROUTING_API_VERSION,
  compileRuntimeAssignments,
  verifyRuntimeAssignmentCompilation,
} from "../../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(EVIDENCE, "routing");
const UNIT = "fix.changed-row-accessibility";
const CAPABILITY = "repair.impact-planner-accessibility";

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function observations() {
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

async function main() {
  const compilation = await readJson(join(EVIDENCE, "compilation.json"));
  const specialistPackage = await readJson(join(EVIDENCE, "package-envelope.json"));
  const planPath = join(EVIDENCE, "..", "runtime-plan.json");
  const planBytes = await readFile(planPath);
  const qualityTiers = [
    { id: "quality.low", rank: 0 },
    { id: "quality.balanced", rank: 1 },
    { id: "quality.frontier", rank: 2 },
  ];
  const reasoningTiers = [
    { id: "reasoning.medium", rank: 0 },
    { id: "reasoning.high", rank: 1 },
  ];
  const profiles = [
    ["row.luna.medium", "profile.codex.luna", "effort.medium", 1, "reasoning.medium", "quality.low", 0],
    ["row.terra.medium", "profile.codex.terra", "effort.medium", 1, "reasoning.medium", "quality.balanced", 1],
    ["row.terra.high", "profile.codex.terra", "effort.high", 2, "reasoning.high", "quality.balanced", 2],
    ["row.sol.high", "profile.codex.sol", "effort.high", 2, "reasoning.high", "quality.frontier", 3],
    ["row.gpt55.high", "profile.codex.gpt55", "effort.high", 2, "reasoning.high", "quality.frontier", 4],
  ];
  const runtimeRows = profiles.map(
    ([id, profileId, effortId, effortRank, reasoningTier, qualityTier, costRank]) => ({
      id,
      profileId,
      effortId,
      effortRank,
      runtimeFamily: profileId,
      independenceDomain: profileId,
      reasoningTier,
      capabilities: [{ capabilityId: CAPABILITY, qualityTier }],
      contextLimitBytes: 2_000_000,
      tools: effortId === "effort.high" ? ["node", "npm.cmd", "rg"] : ["node", "rg"],
      skills: [],
      isolationFeatures: ["isolation.scoped-worktree"],
      permissionFeatures: [
        "permission.filesystem.read",
        "permission.filesystem.write",
        "permission.process.spawn",
      ],
      observationModes: observations(),
      costRank,
      latencyRank: costRank,
      evidence: [
        {
          id: `evidence.${id}`,
          kind: "owner_assessment",
          locator:
            "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/runtime-plan.json",
          digest: digest(planBytes),
          bytes: planBytes.byteLength,
        },
      ],
    }),
  ).sort((left, right) => left.id.localeCompare(right.id));
  const request = {
    apiVersion: RUNTIME_ROUTING_API_VERSION,
    kind: "CompileRuntimeAssignmentsRequest",
    compilation,
    packageExpectation: {
      compilationDigest: compilation.contentDigest,
      packageDigest: specialistPackage.packageDigest,
    },
    policy: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeDemandPolicy",
      id: "policy.v14.impact-planner.recovery-r4",
      revision: 1,
      qualityTiers,
      reasoningTiers,
      capabilityRules: [
        {
          capabilityId: CAPABILITY,
          minimumQualityTier: "quality.balanced",
          minimumReasoningTier: "reasoning.high",
          requiredTools: ["node", "npm.cmd", "rg"],
          requiredSkills: [],
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: [
            "permission.filesystem.read",
            "permission.filesystem.write",
            "permission.process.spawn",
          ],
        },
      ],
      evidenceRules: [
        {
          kind: "test",
          duty: "produce",
          minimumQualityTier: "quality.balanced",
          minimumReasoningTier: "reasoning.high",
        },
      ],
      permissionRules: [
        {
          kind: "filesystem.read",
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: ["permission.filesystem.read"],
        },
        {
          kind: "filesystem.write",
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: ["permission.filesystem.write"],
        },
        {
          kind: "process.spawn",
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: ["permission.process.spawn"],
        },
      ],
      observability: observations(),
      search: { exactVectorLimit: 200000, boundedBeamWidth: 64 },
    },
    calibration: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeCalibrationCatalog",
      id: "calibration.codex-desktop.impact-planner.recovery-r4",
      revision: 1,
      assessedBy: "repository-owner-via-standing-release-authorization",
      adapterId: "codex-desktop",
      adapterRevision: "v14-alpha",
      runtimeRows,
    },
    inventory: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "HostCapabilityInventory",
      id: "inventory.codex-desktop.impact-planner.recovery-r4",
      revision: 1,
      hostId: "codex-desktop.windows",
      adapterId: "codex-desktop",
      adapterRevision: "v14-alpha",
      catalogRevision: "multi-agent-tool-schema.2026-07-27",
      completeness: "declared_subset",
      maxConcurrentAgents: 1,
      rows: runtimeRows.map((row) => ({
        calibrationRowId: row.id,
        availability: "available",
        availabilityReason: "Exposed by the current native multi-agent host tool.",
      })),
    },
  };
  await writeJson(join(OUTPUT, "request.json"), request);
  const assignments = requireValue(
    "compile accessibility fix runtime",
    compileRuntimeAssignments(request),
  );
  requireValue(
    "verify accessibility fix runtime",
    verifyRuntimeAssignmentCompilation(assignments, {
      compilationDigest: compilation.contentDigest,
      packageDigest: specialistPackage.packageDigest,
      policyDigest: assignments.policyDigest,
      calibrationDigest: assignments.calibrationDigest,
      inventoryDigest: assignments.inventoryDigest,
      assignmentDigest: assignments.contentDigest,
    }),
  );
  const blueprint = compilation.blueprints[0];
  const assignment = assignments.selected.rows[0];
  if (
    blueprint.workUnitIds[0] !== UNIT ||
    assignment.profileId !== "profile.codex.terra" ||
    assignment.effortId !== "effort.high"
  ) {
    throw new Error(`Unexpected accessibility assignment: ${JSON.stringify(assignment)}`);
  }
  await writeJson(join(OUTPUT, "compilation.json"), assignments);
  const summary = {
    outcome: "pass",
    selected: [
      {
        agentId: assignment.agentId,
        workUnitIds: blueprint.workUnitIds,
        profileId: assignment.profileId,
        effortId: assignment.effortId,
        requiredTools: assignment.requiredTools,
        requiredSkills: assignment.requiredSkills,
        selectionReason: assignment.selectionReason,
      },
    ],
    search: assignments.search,
    compilationDigest: assignments.contentDigest,
  };
  await writeJson(join(OUTPUT, "summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

await main();
