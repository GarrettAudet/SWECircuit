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

const VERIFY = "verify.impact-planner-rebound";
const REVIEW = "review.impact-planner-rebound";
const UNIT_IDS = [VERIFY, REVIEW].sort();

const APP_FILES = [
  "examples/impact-planner/README.md",
  "examples/impact-planner/index.html",
  "examples/impact-planner/package.json",
  "examples/impact-planner/server.mjs",
  "examples/impact-planner/src/app.js",
  "examples/impact-planner/src/codec.js",
  "examples/impact-planner/src/graph.js",
  "examples/impact-planner/src/storage.js",
  "examples/impact-planner/src/ui-policy.js",
  "examples/impact-planner/src/view.js",
  "examples/impact-planner/styles.css",
  "examples/impact-planner/test/codec.test.mjs",
  "examples/impact-planner/test/graph.test.mjs",
  "examples/impact-planner/test/integration.test.mjs",
  "examples/impact-planner/test/interface.test.mjs",
  "examples/impact-planner/test/server.test.mjs",
  "examples/impact-planner/test/storage.test.mjs",
].sort();

const SOURCE_DEFINITIONS = [
  {
    id: "context.recovery-goal",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/goal.md",
    description: "Closed revision-5 final verification objective and acceptance criteria.",
  },
  {
    id: "context.predecessor",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/predecessor.json",
    description: "Exact revision-4 pass route, accessibility fix, and recovery lineage identities.",
  },
  {
    id: "context.app-contract",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
    description: "Original closed Impact Planner product and evidence contract.",
  },
  {
    id: "context.agent-contract",
    path: "AGENTS.md",
    description: "Repository authority, recovery, verification, and traceability invariants.",
  },
  {
    id: "context.codec-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
    description: "Verified initial codec PASS handoff.",
  },
  {
    id: "context.interface-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
    description: "Verified initial interface PASS handoff.",
  },
  {
    id: "context.graph-recovery-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json",
    description: "Verified revision-2 graph recovery PASS handoff.",
  },
  {
    id: "context.integration-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json",
    description: "Verified revision-2 integration PASS handoff.",
  },
  {
    id: "context.review-fix-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
    description: "Verified revision-3 accessibility review FIX handoff.",
  },
  {
    id: "context.accessibility-fix-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/handoffs/fix-raw.json",
    description: "Verified revision-4 accessibility correction PASS handoff.",
  },
  ...APP_FILES.map((path, index) => ({
    id: `context.app.${String(index + 1).padStart(2, "0")}`,
    path,
    description: `Exact current candidate bytes for ${path}.`,
  })),
];

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

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function bindSources() {
  return Promise.all(
    SOURCE_DEFINITIONS.map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits: UNIT_IDS,
        readScope: source.path,
      };
    }),
  );
}

function evidence(id, kind, duty, description, independentFromProducer = false) {
  return { id, kind, duty, description, independentFromProducer };
}

function workUnit({
  id,
  objective,
  weight,
  capability,
  action,
  dependencies = [],
  evidenceIds,
  artifact,
  sourceIds,
  sourcePaths,
}) {
  return {
    id,
    objective,
    weight,
    module: {
      id,
      action,
      inputPorts: [{ name: "candidate", artifactType: "ImpactPlannerReboundContract" }],
      outputPorts: [{ name: "handoff", artifactType: artifact }],
    },
    dependencies,
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Verify the exact rebound package, current candidate, and predecessor evidence.",
    })),
    scope: { read: sourcePaths, write: [], conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: sourcePaths },
      { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
    ],
    evidenceRequirementIds: evidenceIds,
    handoffArtifacts: [artifact],
    stopConditions: [
      "Do not modify application, test, workflow, evidence, memory, or Git files.",
      "Do not access the network or secrets or install dependencies.",
      "Verify every delivered repository context against its declared raw digest and byte count before using it.",
      "A dependent unit starts only after exact transitive handoff assessment is integration-ready.",
      "Return non-pass for any identity mismatch, product regression, evidence gap, or material finding.",
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const sourceIds = contextSources.map((source) => source.id).sort();
  const sourcePaths = contextSources.map((source) => source.readScope).sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.dogfood.impact-planner",
      revision: 5,
      objective:
        "Bind the accessibility-corrected candidate, verify the complete Impact Planner in the browser, and obtain a fresh independent review without changing application code.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.no-product-change",
          statement:
            "The revision-5 candidate is the exact current Impact Planner state produced by the verified revision-4 accessibility fix; final verification changes only package identity and evidence.",
          rationale:
            "The revision-4 specialist changed only the reviewed runtime class and focused regression test, then passed 23 tests.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.context-identity",
          description:
            "Every repository context item and predecessor handoff is bound to the exact current bytes and independently reviewed.",
          evidenceRequirements: [
            evidence(
              "evidence.context-rebind.verify",
              "test",
              "produce",
              "Verify all repository context digests, byte counts, package identities, and predecessor handoffs.",
            ),
            evidence(
              "evidence.context-rebind.review",
              "review",
              "review",
              "Independently review all rebound context and predecessor identities.",
              true,
            ),
          ],
        },
        {
          id: "criterion.product-regression",
          description:
            "The exact corrected Impact Planner remains functionally, securely, and accessibly complete without application changes.",
          evidenceRequirements: [
            evidence(
              "evidence.product-regression.verify",
              "test",
              "produce",
              "Run the complete suite and bounded browser verification against the exact candidate.",
            ),
            evidence(
              "evidence.product-regression.review",
              "review",
              "review",
              "Independently review product acceptance, security, accessibility, and evidence.",
              true,
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: UNIT_IDS,
        allowedCapabilities: [
          "review.impact-planner.rebound",
          "verify.impact-planner.rebound",
        ].sort(),
        permissionCeiling: [
          { kind: "filesystem.read", scopes: sourcePaths },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, modify files, mutate Git, merge, or update durable memory.",
          "Do not weaken or amend product, package, context, or handoff verification.",
        ],
        maxAgents: 2,
        maxConcurrency: 1,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        workUnit({
          id: VERIFY,
          objective:
            "Verify the fresh context bindings, exact predecessor handoffs, full suite, and bounded browser behavior.",
          weight: 6,
          capability: "verify.impact-planner.rebound",
          action:
            "Check every declared digest and byte count, verify predecessor handoffs, run all tests and syntax checks, and inspect the critical localhost browser path.",
          evidenceIds: [
            "evidence.context-rebind.verify",
            "evidence.product-regression.verify",
          ].sort(),
          artifact: "impact-rebound-verification.md",
          sourceIds,
          sourcePaths,
        }),
        workUnit({
          id: REVIEW,
          objective:
            "Independently review the rebound package, current candidate, predecessor lineage, and verification evidence.",
          weight: 5,
          capability: "review.impact-planner.rebound",
          action:
            "Recompute context identities, run the complete suite, inspect all acceptance boundaries, and report material findings before verdict.",
          dependencies: [VERIFY],
          evidenceIds: [
            "evidence.context-rebind.review",
            "evidence.product-regression.review",
          ].sort(),
          artifact: "impact-rebound-review.md",
          sourceIds,
          sourcePaths,
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.impact-planner.rebound-two-stage",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile Impact Planner rebound specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render Impact Planner rebound package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify Impact Planner rebound package",
    verifySpecialistPackage(specialistPackage, expectation),
  );
  if (
    compilation.blueprints.length !== 2 ||
    compilation.search.claim !== "exhaustive_partition_search_fixed_scheduler"
  ) {
    throw new Error(`Unexpected rebound team: ${JSON.stringify(compilation.selected)}`);
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
