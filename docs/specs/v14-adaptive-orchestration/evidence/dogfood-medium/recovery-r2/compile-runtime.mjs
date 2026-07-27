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

const FIX_UNIT = "fix.impact-graph";
const FIX_CAPABILITY = "repair.impact-graph-evidence";
const INTEGRATION = "integrate.impact-planner";
const REVIEW = "review.impact-planner";
const BROWSER_SKILL = "skill.browser.control-in-app-browser";

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
  qualities,
  tools,
  skills = [],
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
    capabilities: [FIX_CAPABILITY, INTEGRATION, REVIEW]
      .map((id) => capability(id, qualities[id] ?? "quality.low"))
      .sort((left, right) => left.capabilityId.localeCompare(right.capabilityId)),
    contextLimitBytes: 2_000_000,
    tools: [...tools].sort(),
    skills: [...skills].sort(),
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
  const runtimePlanPath = join(EVIDENCE, "..", "runtime-plan.json");
  const runtimePlanBytes = await readFile(runtimePlanPath);
  const evidenceBase = {
    kind: "owner_assessment",
    locator:
      "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/runtime-plan.json",
    digest: digest(runtimePlanBytes),
    bytes: runtimePlanBytes.byteLength,
  };
  const balanced = "quality.balanced";
  const frontier = "quality.frontier";

  const runtimeRows = [
    runtimeRow({
      id: "row.luna.medium",
      profileId: "profile.codex.luna",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      qualities: {},
      tools: ["node", "rg"],
      costRank: 0,
      evidence: { id: "evidence.row.luna.medium", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.medium",
      profileId: "profile.codex.terra",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      qualities: {
        [FIX_CAPABILITY]: balanced,
        [INTEGRATION]: balanced,
        [REVIEW]: balanced,
      },
      tools: ["node", "rg"],
      costRank: 1,
      evidence: { id: "evidence.row.terra.medium", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.high",
      profileId: "profile.codex.terra",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      qualities: {
        [FIX_CAPABILITY]: frontier,
        [INTEGRATION]: balanced,
        [REVIEW]: balanced,
      },
      tools: ["node", "npm.cmd", "rg"],
      costRank: 2,
      evidence: { id: "evidence.row.terra.high", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.sol.high",
      profileId: "profile.codex.sol",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      qualities: {
        [FIX_CAPABILITY]: frontier,
        [INTEGRATION]: frontier,
        [REVIEW]: frontier,
      },
      tools: ["node", "npm.cmd", "rg"],
      skills: [BROWSER_SKILL],
      costRank: 3,
      evidence: { id: "evidence.row.sol.high", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.gpt55.high",
      profileId: "profile.codex.gpt55",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      qualities: {
        [FIX_CAPABILITY]: frontier,
        [INTEGRATION]: balanced,
        [REVIEW]: frontier,
      },
      tools: ["node", "npm.cmd", "rg"],
      costRank: 4,
      evidence: { id: "evidence.row.gpt55.high", ...evidenceBase },
    }),
  ].sort((left, right) => left.id.localeCompare(right.id));

  const capabilityRule = ({
    capabilityId,
    quality,
    reasoning,
    tools,
    skills = [],
  }) => ({
    capabilityId,
    minimumQualityTier: quality,
    minimumReasoningTier: reasoning,
    requiredTools: [...tools].sort(),
    requiredSkills: [...skills].sort(),
    requiredIsolationFeatures: ["isolation.scoped-worktree"],
    requiredPermissionFeatures: [
      "permission.filesystem.read",
      "permission.filesystem.write",
      "permission.process.spawn",
    ],
  });

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
      id: "policy.v14.impact-planner.recovery-r2",
      revision: 1,
      qualityTiers: [
        { id: "quality.low", rank: 0 },
        { id: balanced, rank: 1 },
        { id: frontier, rank: 2 },
      ],
      reasoningTiers: [
        { id: "reasoning.medium", rank: 0 },
        { id: "reasoning.high", rank: 1 },
      ],
      capabilityRules: [
        capabilityRule({
          capabilityId: FIX_CAPABILITY,
          quality: balanced,
          reasoning: "reasoning.high",
          tools: ["node", "rg"],
        }),
        capabilityRule({
          capabilityId: INTEGRATION,
          quality: frontier,
          reasoning: "reasoning.high",
          tools: ["node", "npm.cmd", "rg"],
          skills: [BROWSER_SKILL],
        }),
        capabilityRule({
          capabilityId: REVIEW,
          quality: frontier,
          reasoning: "reasoning.high",
          tools: ["node", "npm.cmd", "rg"],
        }),
      ].sort((left, right) => left.capabilityId.localeCompare(right.capabilityId)),
      evidenceRules: [
        {
          kind: "test",
          duty: "produce",
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.medium",
        },
        {
          kind: "handoff",
          duty: "verify",
          minimumQualityTier: frontier,
          minimumReasoningTier: "reasoning.high",
        },
        {
          kind: "review",
          duty: "review",
          minimumQualityTier: frontier,
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
      observability: observationModes(),
      search: { exactVectorLimit: 200000, boundedBeamWidth: 64 },
    },
    calibration: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeCalibrationCatalog",
      id: "calibration.codex-desktop.impact-planner.recovery-r2",
      revision: 1,
      assessedBy: "repository-owner-via-standing-release-authorization",
      adapterId: "codex-desktop",
      adapterRevision: "v14-alpha",
      runtimeRows,
    },
    inventory: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "HostCapabilityInventory",
      id: "inventory.codex-desktop.impact-planner.recovery-r2",
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
  const assignmentCompilation = requireValue(
    "compile Impact Planner recovery assignments",
    compileRuntimeAssignments(request),
  );
  requireValue(
    "verify Impact Planner recovery assignments",
    verifyRuntimeAssignmentCompilation(assignmentCompilation, {
      compilationDigest: compilation.contentDigest,
      packageDigest: packageEnvelope.packageDigest,
      policyDigest: assignmentCompilation.policyDigest,
      calibrationDigest: assignmentCompilation.calibrationDigest,
      inventoryDigest: assignmentCompilation.inventoryDigest,
      assignmentDigest: assignmentCompilation.contentDigest,
    }),
  );

  const byAgent = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.id, blueprint.workUnitIds]),
  );
  const selected = assignmentCompilation.selected.rows.map((assignment) => ({
    agentId: assignment.agentId,
    workUnitIds: byAgent.get(assignment.agentId),
    profileId: assignment.profileId,
    effortId: assignment.effortId,
    requiredTools: assignment.requiredTools,
    requiredSkills: assignment.requiredSkills,
    selectionReason: assignment.selectionReason,
  }));
  const expected = new Map([
    [FIX_UNIT, ["profile.codex.terra", "effort.high"]],
    [INTEGRATION, ["profile.codex.sol", "effort.high"]],
    [REVIEW, ["profile.codex.gpt55", "effort.high"]],
  ]);
  for (const [workUnitId, [profileId, effortId]] of expected) {
    const assignment = selected.find((row) => row.workUnitIds?.includes(workUnitId));
    if (assignment?.profileId !== profileId || assignment.effortId !== effortId) {
      throw new Error(`Unexpected ${workUnitId} assignment: ${JSON.stringify(assignment)}`);
    }
  }
  if (
    assignmentCompilation.search.mode !== "exact" ||
    assignmentCompilation.search.claim !== "exhaustive_assignment_vector_search"
  ) {
    throw new Error(`Unexpected runtime search: ${JSON.stringify(assignmentCompilation.search)}`);
  }

  await writeJson(join(OUTPUT, "compilation.json"), assignmentCompilation);
  const summary = {
    outcome: "pass",
    selected,
    search: assignmentCompilation.search,
    compilationDigest: assignmentCompilation.contentDigest,
  };
  await writeJson(join(OUTPUT, "summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

await main();
