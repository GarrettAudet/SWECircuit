import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SPECIALIST_API_VERSION,
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistPackage,
} from "../../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(EVIDENCE, "package");
const UNIT = "fix.changed-row-accessibility";
const CAPABILITY = "repair.impact-planner-accessibility";
const WRITES = [
  "examples/impact-planner/src/app.js",
  "examples/impact-planner/test/integration.test.mjs",
].sort();
const SOURCES = [
  ["context.recovery-goal", "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/goal.md"],
  ["context.predecessor", "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/predecessor.json"],
  ["context.app-contract", "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"],
  ["context.agent-contract", "AGENTS.md"],
  ["context.review-finding", "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json"],
  ["context.app-source", "examples/impact-planner/src/app.js"],
  ["context.styles", "examples/impact-planner/styles.css"],
  ["context.integration-tests", "examples/impact-planner/test/integration.test.mjs"],
  ["context.interface-tests", "examples/impact-planner/test/interface.test.mjs"],
];

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  const contextSources = await Promise.all(
    SOURCES.map(async ([id, path]) => {
      const bytes = await readFile(join(ROOT, path));
      return {
        id,
        kind: "repository",
        locator: `path:${path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: `Exact revision-4 source for ${path}.`,
        allowedWorkUnits: [UNIT],
        readScope: path,
      };
    }),
  );
  const sourceIds = contextSources.map((source) => source.id).sort();
  const reads = contextSources.map((source) => source.readScope).sort();
  const request = {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.dogfood.impact-planner",
      revision: 4,
      objective:
        "Correct the verified changed-row accessibility binding with the smallest causal source and regression-test change.",
      integrationOwner: "codex.main",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.changed-row-binding",
          description:
            "Runtime change-set rows use the exact accessible stylesheet class and focused regression coverage prevents drift.",
          evidenceRequirements: [
            {
              id: "evidence.changed-row-fix.produce",
              kind: "test",
              duty: "produce",
              description:
                "Apply the exact class correction, add the runtime-to-stylesheet binding assertion, and pass the complete app suite.",
              independentFromProducer: false,
            },
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: [UNIT],
        allowedCapabilities: [CAPABILITY],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: reads },
          { kind: "filesystem.write", scopes: WRITES },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared paths.",
          "Do not install dependencies, mutate Git, merge, update memory, or alter styles.",
          "Do not modify files outside app.js and integration.test.mjs.",
        ],
        maxAgents: 1,
        maxConcurrency: 1,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        {
          id: UNIT,
          objective:
            "Align the runtime changed-component row class with the accessible stylesheet and lock it with a regression test.",
          weight: 2,
          module: {
            id: UNIT,
            action:
              "Replace changed-row with changed-item, add a focused source/CSS binding assertion, and run all app tests and syntax checks.",
            inputPorts: [{ name: "finding", artifactType: "ImpactPlannerReviewFinding" }],
            outputPorts: [{ name: "handoff", artifactType: "impact-accessibility-fix.md" }],
          },
          dependencies: [],
          requiredCapabilities: [CAPABILITY],
          contextUses: sourceIds.map((sourceId) => ({
            sourceId,
            purpose: "Apply and verify the exact reviewed accessibility correction.",
          })),
          scope: { read: reads, write: WRITES, conflictZones: [] },
          permissions: [
            { kind: "filesystem.read", scopes: reads },
            { kind: "filesystem.write", scopes: WRITES },
            { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
          ],
          evidenceRequirementIds: ["evidence.changed-row-fix.produce"],
          handoffArtifacts: ["impact-accessibility-fix.md"],
          stopConditions: [
            "Do not modify files outside the declared write scope.",
            "Do not weaken or remove existing tests.",
            "Return non-pass if the focused assertion or complete suite does not pass.",
          ],
        },
      ],
    },
    proposedCandidates: [
      { id: "candidate.impact-planner.accessibility-fix", groups: [[UNIT]] },
    ],
  };
  const compilation = requireValue("compile accessibility fix", compileAgentBlueprints(request));
  const specialistPackage = requireValue(
    "render accessibility fix package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify accessibility fix package",
    verifySpecialistPackage(specialistPackage, expectation),
  );
  if (compilation.blueprints.length !== 1) {
    throw new Error(`Unexpected fix team: ${JSON.stringify(compilation.selected)}`);
  }
  await writeJson(join(EVIDENCE, "request.json"), request);
  await writeJson(join(EVIDENCE, "compilation.json"), compilation);
  await writeJson(join(EVIDENCE, "package-envelope.json"), specialistPackage);
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  const agents = compilation.blueprints.map((blueprint) => ({
    id: blueprint.id,
    workUnitIds: blueprint.workUnitIds,
    dependencies: blueprint.dependencies,
    contentDigest: blueprint.contentDigest,
    contractFile:
      specialistPackage.manifest.agents.find((agent) => agent.agentId === blueprint.id)
        ?.contractFile ?? null,
  }));
  const summary = {
    outcome: "pass",
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    search: compilation.search,
    launchWaves: compilation.launchWaves,
    agents,
    expectation,
  };
  await writeJson(join(EVIDENCE, "team-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

await main();
