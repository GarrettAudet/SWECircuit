import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  RUNTIME_ROUTING_API_VERSION,
  compileRuntimeAssignments,
  verifyRuntimeAssignmentCompilation,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(EVIDENCE, "routing-dogfood");

const EXPECTED = Object.freeze({
  "agent.95953cd44c0575970b3b29064d34f109e06d3d164888386446d532ba2a4201db":
    ["profile.codex.sol", "effort.high"],
  "agent.c4f622940194362296821ae5839d1de09edb0b694ad4d97773f7e20cb6e053d4":
    ["profile.codex.terra", "effort.medium"],
  "agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467":
    ["profile.codex.terra", "effort.high"],
});

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(
      `${label}: ${result.diagnostics.map((item) => `${item.code}:${item.message}`).join(", ")}`,
    );
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

function capability(capabilityId, qualityTier) {
  return { capabilityId, qualityTier };
}

function runtimeRow({
  id,
  profileId,
  effortId,
  effortRank,
  reasoningTier,
  capabilities,
  costRank,
  evidence,
}) {
  return {
    id,
    profileId,
    effortId,
    effortRank,
    runtimeFamily: profileId,
    independenceDomain: profileId,
    reasoningTier,
    capabilities: [...capabilities].sort((left, right) =>
      left.capabilityId.localeCompare(right.capabilityId),
    ),
    contextLimitBytes: 1_000_000,
    tools: ["node", "npm.cmd", "rg"],
    skills: [],
    isolationFeatures: ["isolation.scoped-worktree"],
    permissionFeatures: [
      "permission.filesystem.read",
      "permission.filesystem.write",
      "permission.process.spawn",
    ],
    observationModes: observationModes(),
    costRank,
    latencyRank: costRank,
    evidence: [evidence],
  };
}

async function main() {
  const compilation = await readJson(join(EVIDENCE, "compilation.json"));
  const packageEnvelope = await readJson(join(EVIDENCE, "package-envelope.json"));
  const runtimePlanPath = join(EVIDENCE, "runtime-plan.json");
  const runtimePlanBytes = await readFile(runtimePlanPath);
  const evidenceBase = {
    kind: "owner_assessment",
    locator:
      "path:docs/specs/v14-adaptive-orchestration/evidence/adaptive/runtime-plan.json",
    digest: digest(runtimePlanBytes),
    bytes: runtimePlanBytes.byteLength,
  };
  const low = "quality.low";
  const balanced = "quality.balanced";
  const frontier = "quality.frontier";
  const testCapability = "author.adaptive-contract-tests";
  const viewCapability = "implement.portable-run-view";
  const controllerCapability = "implement.pure-adaptive-controller";

  const runtimeRows = [
    runtimeRow({
      id: "row.luna.medium",
      profileId: "profile.codex.luna",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      capabilities: [
        capability(testCapability, low),
        capability(viewCapability, low),
        capability(controllerCapability, low),
      ],
      costRank: 0,
      evidence: { id: "evidence.row.luna.medium", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.sol.high",
      profileId: "profile.codex.sol",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      capabilities: [
        capability(testCapability, frontier),
        capability(viewCapability, frontier),
        capability(controllerCapability, frontier),
      ],
      costRank: 3,
      evidence: { id: "evidence.row.sol.high", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.high",
      profileId: "profile.codex.terra",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      capabilities: [
        capability(testCapability, balanced),
        capability(viewCapability, balanced),
        capability(controllerCapability, balanced),
      ],
      costRank: 2,
      evidence: { id: "evidence.row.terra.high", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.medium",
      profileId: "profile.codex.terra",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      capabilities: [
        capability(testCapability, balanced),
        capability(viewCapability, balanced),
        capability(controllerCapability, balanced),
      ],
      costRank: 1,
      evidence: { id: "evidence.row.terra.medium", ...evidenceBase },
    }),
  ];

  const request = {
    apiVersion: RUNTIME_ROUTING_API_VERSION,
    kind: "CompileRuntimeAssignmentsRequest",
    compilation,
    packageExpectation: {
      compilationDigest: compilation.contentDigest,
      packageDigest: packageEnvelope.packageDigest,
    },
    policy: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeDemandPolicy",
      id: "policy.v14.adaptive-wave",
      revision: 1,
      qualityTiers: [
        { id: low, rank: 0 },
        { id: balanced, rank: 1 },
        { id: frontier, rank: 2 },
      ],
      reasoningTiers: [
        { id: "reasoning.medium", rank: 0 },
        { id: "reasoning.high", rank: 1 },
      ],
      capabilityRules: [
        {
          capabilityId: testCapability,
          minimumQualityTier: balanced,
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
        {
          capabilityId: viewCapability,
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.medium",
          requiredTools: ["node", "npm.cmd", "rg"],
          requiredSkills: [],
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: [
            "permission.filesystem.read",
            "permission.filesystem.write",
            "permission.process.spawn",
          ],
        },
        {
          capabilityId: controllerCapability,
          minimumQualityTier: frontier,
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
      ].sort((left, right) => left.capabilityId.localeCompare(right.capabilityId)),
      evidenceRules: [
        {
          kind: "artifact",
          duty: "produce",
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.medium",
        },
        {
          kind: "test",
          duty: "produce",
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.medium",
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
        boundedBeamWidth: 8,
      },
    },
    calibration: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeCalibrationCatalog",
      id: "calibration.codex-desktop.v14",
      revision: 1,
      assessedBy: "repository-owner-via-standing-release-authorization",
      adapterId: "codex-desktop",
      adapterRevision: "v14-revision-2",
      runtimeRows,
    },
    inventory: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "HostCapabilityInventory",
      id: "inventory.codex-desktop.current-task",
      revision: 1,
      hostId: "codex-desktop.windows",
      adapterId: "codex-desktop",
      adapterRevision: "v14-revision-2",
      catalogRevision: "multi-agent-tool-schema.2026-07-27",
      completeness: "declared_subset",
      maxConcurrentAgents: 3,
      rows: runtimeRows.map((row) => ({
        calibrationRowId: row.id,
        availability: "available",
        availabilityReason: "Exposed by the current native multi-agent host tool.",
      })),
    },
  };

  const assignmentCompilation = requireValue(
    "compile adaptive-wave runtime assignments",
    compileRuntimeAssignments(request),
  );
  requireValue(
    "verify adaptive-wave runtime assignments",
    verifyRuntimeAssignmentCompilation(assignmentCompilation, {
      compilationDigest: compilation.contentDigest,
      packageDigest: packageEnvelope.packageDigest,
      policyDigest: assignmentCompilation.policyDigest,
      calibrationDigest: assignmentCompilation.calibrationDigest,
      inventoryDigest: assignmentCompilation.inventoryDigest,
      assignmentDigest: assignmentCompilation.contentDigest,
    }),
  );

  const selected = Object.fromEntries(
    assignmentCompilation.selected.rows.map((assignment) => [
      assignment.agentId,
      [assignment.profileId, assignment.effortId],
    ]),
  );
  for (const [agentId, expected] of Object.entries(EXPECTED)) {
    if (JSON.stringify(selected[agentId]) !== JSON.stringify(expected)) {
      throw new Error(
        `Unexpected assignment for ${agentId}: ${JSON.stringify(selected[agentId])}`,
      );
    }
  }

  await writeJson(join(OUTPUT, "request.json"), request);
  await writeJson(join(OUTPUT, "compilation.json"), assignmentCompilation);
  await writeJson(join(OUTPUT, "summary.json"), {
    outcome: "pass",
    selected,
    expected: EXPECTED,
    bootstrapAgreement: true,
    search: assignmentCompilation.search,
    compilationDigest: assignmentCompilation.contentDigest,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        selected,
        search: assignmentCompilation.search,
        compilationDigest: assignmentCompilation.contentDigest,
      },
      null,
      2,
    )}\n`,
  );
}

await main();
