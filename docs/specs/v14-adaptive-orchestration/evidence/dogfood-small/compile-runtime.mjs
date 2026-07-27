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
const OUTPUT = join(EVIDENCE, "routing");

const DOMAIN = "implement.release-board-domain";
const INTERFACE = "implement.release-board-interface";

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
    tools: ["node", "rg"],
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
      "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/runtime-plan.json",
    digest: digest(runtimePlanBytes),
    bytes: runtimePlanBytes.byteLength,
  };
  const low = "quality.low";
  const balanced = "quality.balanced";
  const frontier = "quality.frontier";

  const runtimeRows = [
    runtimeRow({
      id: "row.luna.medium",
      profileId: "profile.codex.luna",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      capabilities: [
        capability(DOMAIN, low),
        capability(INTERFACE, balanced),
      ],
      costRank: 0,
      evidence: { id: "evidence.row.luna.medium", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.medium",
      profileId: "profile.codex.terra",
      effortId: "effort.medium",
      effortRank: 1,
      reasoningTier: "reasoning.medium",
      capabilities: [
        capability(DOMAIN, balanced),
        capability(INTERFACE, balanced),
      ],
      costRank: 1,
      evidence: { id: "evidence.row.terra.medium", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.terra.high",
      profileId: "profile.codex.terra",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      capabilities: [
        capability(DOMAIN, balanced),
        capability(INTERFACE, frontier),
      ],
      costRank: 2,
      evidence: { id: "evidence.row.terra.high", ...evidenceBase },
    }),
    runtimeRow({
      id: "row.sol.high",
      profileId: "profile.codex.sol",
      effortId: "effort.high",
      effortRank: 2,
      reasoningTier: "reasoning.high",
      capabilities: [
        capability(DOMAIN, frontier),
        capability(INTERFACE, frontier),
      ],
      costRank: 3,
      evidence: { id: "evidence.row.sol.high", ...evidenceBase },
    }),
  ].sort((left, right) => left.id.localeCompare(right.id));

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
      id: "policy.v14.release-board",
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
          capabilityId: DOMAIN,
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.high",
          requiredTools: ["node", "rg"],
          requiredSkills: [],
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: [
            "permission.filesystem.read",
            "permission.filesystem.write",
            "permission.process.spawn",
          ],
        },
        {
          capabilityId: INTERFACE,
          minimumQualityTier: balanced,
          minimumReasoningTier: "reasoning.medium",
          requiredTools: ["rg"],
          requiredSkills: [],
          requiredIsolationFeatures: ["isolation.scoped-worktree"],
          requiredPermissionFeatures: [
            "permission.filesystem.read",
            "permission.filesystem.write",
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
      search: {
        exactVectorLimit: 64,
        boundedBeamWidth: 8,
      },
    },
    calibration: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "RuntimeCalibrationCatalog",
      id: "calibration.codex-desktop.release-board",
      revision: 1,
      assessedBy: "repository-owner-via-standing-release-authorization",
      adapterId: "codex-desktop",
      adapterRevision: "v14-alpha",
      runtimeRows,
    },
    inventory: {
      apiVersion: RUNTIME_ROUTING_API_VERSION,
      kind: "HostCapabilityInventory",
      id: "inventory.codex-desktop.release-board",
      revision: 1,
      hostId: "codex-desktop.windows",
      adapterId: "codex-desktop",
      adapterRevision: "v14-alpha",
      catalogRevision: "multi-agent-tool-schema.2026-07-27",
      completeness: "declared_subset",
      maxConcurrentAgents: 2,
      rows: runtimeRows.map((row) => ({
        calibrationRowId: row.id,
        availability: "available",
        availabilityReason: "Exposed by the current native multi-agent host tool.",
      })),
    },
  };

  const assignmentCompilation = requireValue(
    "compile Release Board runtime assignments",
    compileRuntimeAssignments(request),
  );
  requireValue(
    "verify Release Board runtime assignments",
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
    selectionReason: assignment.selectionReason,
  }));
  const domainAssignment = selected.find((row) => row.workUnitIds?.includes(DOMAIN));
  const interfaceAssignment = selected.find((row) =>
    row.workUnitIds?.includes(INTERFACE),
  );
  if (
    domainAssignment?.profileId !== "profile.codex.terra" ||
    domainAssignment.effortId !== "effort.high"
  ) {
    throw new Error(`Unexpected domain assignment: ${JSON.stringify(domainAssignment)}`);
  }
  if (
    interfaceAssignment?.profileId !== "profile.codex.luna" ||
    interfaceAssignment.effortId !== "effort.medium"
  ) {
    throw new Error(`Unexpected interface assignment: ${JSON.stringify(interfaceAssignment)}`);
  }

  await writeJson(join(OUTPUT, "request.json"), request);
  await writeJson(join(OUTPUT, "compilation.json"), assignmentCompilation);
  await writeJson(join(OUTPUT, "summary.json"), {
    outcome: "pass",
    selected,
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
