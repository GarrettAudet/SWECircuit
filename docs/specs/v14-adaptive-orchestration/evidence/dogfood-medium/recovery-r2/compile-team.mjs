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

const FIX = "fix.impact-graph";
const INTEGRATION = "integrate.impact-planner";
const REVIEW = "review.impact-planner";
const UNIT_IDS = [FIX, INTEGRATION, REVIEW].sort();

const GRAPH_FILES = [
  "examples/impact-planner/src/graph.js",
  "examples/impact-planner/test/graph.test.mjs",
];
const REUSED_FILES = [
  "examples/impact-planner/index.html",
  "examples/impact-planner/styles.css",
  "examples/impact-planner/src/view.js",
  "examples/impact-planner/src/codec.js",
  "examples/impact-planner/src/storage.js",
  "examples/impact-planner/test/interface.test.mjs",
  "examples/impact-planner/test/codec.test.mjs",
  "examples/impact-planner/test/storage.test.mjs",
];
const INTEGRATION_FILES = [
  "examples/impact-planner/README.md",
  "examples/impact-planner/package.json",
  "examples/impact-planner/server.mjs",
  "examples/impact-planner/src/app.js",
  "examples/impact-planner/src/ui-policy.js",
  "examples/impact-planner/test/integration.test.mjs",
  "examples/impact-planner/test/server.test.mjs",
];
const ALL_FILES = [...GRAPH_FILES, ...REUSED_FILES, ...INTEGRATION_FILES].sort();

const units = (...ids) => [...ids].sort();
const SOURCES = [
  {
    id: "context.successor-goal",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
    description: "Closed successor objective and recovery acceptance criteria.",
    units: UNIT_IDS,
  },
  {
    id: "context.predecessor",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
    description: "Exact predecessor run, route, handoff, and lineage identities.",
    units: UNIT_IDS,
  },
  {
    id: "context.app-contract",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
    description: "Original closed application and handoff contract.",
    units: UNIT_IDS,
  },
  {
    id: "context.agent-contract",
    path: "AGENTS.md",
    description: "Repository authority, recovery, verification, and memory invariants.",
    units: UNIT_IDS,
  },
  {
    id: "context.graph-source",
    path: "examples/impact-planner/src/graph.js",
    description: "Failed graph implementation requiring the smallest causal correction.",
    units: units(FIX, INTEGRATION, REVIEW),
  },
  {
    id: "context.graph-tests",
    path: "examples/impact-planner/test/graph.test.mjs",
    description: "Graph regression suite containing the failing unknown-key assertion.",
    units: units(FIX, INTEGRATION, REVIEW),
  },
  {
    id: "context.graph-fix-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
    description: "Verified predecessor FIX evidence and proposed causal correction.",
    units: units(FIX, INTEGRATION, REVIEW),
  },
  {
    id: "context.codec-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
    description: "Verified predecessor codec PASS handoff.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.interface-handoff",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
    description: "Verified predecessor interface PASS handoff.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.release-app-pattern",
    path: "examples/release-board/src/app.js",
    description: "Current bounded local-state integration pattern.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.release-server-pattern",
    path: "examples/release-board/server.mjs",
    description: "Current local server and closed-network policy pattern.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.release-test-pattern",
    path: "examples/release-board/test/integration.test.mjs",
    description: "Current integration and server test pattern.",
    units: units(INTEGRATION, REVIEW),
  },
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
    SOURCES.map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits: source.units,
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
  sourceIds,
  sourcePaths,
  writes,
  dependencies = [],
  evidenceIds,
  artifact,
  processes,
}) {
  const read = [...new Set(sourcePaths)].sort();
  return {
    id,
    objective,
    weight,
    module: {
      id,
      action,
      inputPorts: [{ name: "successor", artifactType: "ImpactPlannerRecoveryContract" }],
      outputPorts: [{ name: "handoff", artifactType: artifact }],
    },
    dependencies,
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Correct, integrate, or independently review the exact successor run.",
    })),
    scope: { read, write: writes, conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: read },
      ...(writes.length > 0 ? [{ kind: "filesystem.write", scopes: writes }] : []),
      { kind: "process.spawn", scopes: processes },
    ],
    evidenceRequirementIds: evidenceIds,
    handoffArtifacts: [artifact],
    stopConditions: [
      "Do not widen or reinterpret the original product contract.",
      "Do not modify files outside the declared write scope.",
      "Do not access the network or secrets, install dependencies, mutate Git, merge, or update memory.",
      "Use the smallest causal correction and preserve the failing regression assertion.",
      "A dependent unit starts only after exact transitive handoff assessment is integration-ready.",
      "Return non-pass when required evidence cannot be produced.",
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();
  const common = [
    "context.successor-goal",
    "context.predecessor",
    "context.app-contract",
    "context.agent-contract",
  ];
  const fixSources = [
    ...common,
    "context.graph-source",
    "context.graph-tests",
    "context.graph-fix-handoff",
  ];
  const integrationSources = [
    ...common,
    "context.graph-fix-handoff",
    "context.codec-handoff",
    "context.interface-handoff",
    "context.release-app-pattern",
    "context.release-server-pattern",
    "context.release-test-pattern",
  ];
  const reviewSources = SOURCES.map((source) => source.id);
  const allSourcePaths = [...new Set(contextSources.map((source) => source.readScope))].sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.dogfood.impact-planner",
      revision: 2,
      objective:
        "Recover the verified graph failure, reuse exact predecessor pass outputs, integrate the Impact Planner, and independently review the successor result.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.predecessor-pass-reuse",
          statement:
            "Codec and interface source files remain the exact outputs described by their verified predecessor PASS handoffs.",
          rationale:
            "The successor binds both handoffs and source files and avoids rerunning successful work.",
        },
        {
          id: "assumption.causal-fix",
          statement:
            "The graph defect is localized to returning accumulated top-level exact-key errors before canonical validation.",
          rationale:
            "The failing test and verified FIX handoff identify one reproducible causal condition.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.graph-recovery",
          description:
            "The smallest graph correction closes unknown-key validation and all scoped graph tests pass.",
          evidenceRequirements: [
            evidence(
              "evidence.graph-recovery.produce",
              "test",
              "produce",
              "Apply and verify the causal graph correction without weakening regression coverage.",
            ),
            evidence(
              "evidence.graph-recovery.integrate",
              "handoff",
              "verify",
              "Independently verify the exact graph recovery handoff before integration starts.",
              true,
            ),
            evidence(
              "evidence.graph-recovery.review",
              "review",
              "review",
              "Independently review the graph correction and complete graph suite.",
              true,
            ),
          ],
        },
        {
          id: "criterion.successor-integration",
          description:
            "Exact predecessor pass outputs and corrected graph output integrate into the complete offline application.",
          evidenceRequirements: [
            evidence(
              "evidence.successor-integration.produce",
              "test",
              "produce",
              "Produce the complete integrated app, passing suite, and bounded browser observation.",
            ),
            evidence(
              "evidence.successor-integration.review",
              "review",
              "review",
              "Independently review acceptance, security, accessibility, integration, and evidence.",
              true,
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: UNIT_IDS,
        allowedCapabilities: [
          "repair.impact-graph-evidence",
          "integrate.impact-planner",
          "review.impact-planner",
        ].sort(),
        permissionCeiling: [
          {
            kind: "filesystem.read",
            scopes: [...new Set([...allSourcePaths, ...ALL_FILES])].sort(),
          },
          {
            kind: "filesystem.write",
            scopes: [...GRAPH_FILES, ...INTEGRATION_FILES].sort(),
          },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory.",
          "Do not modify predecessor codec or interface outputs.",
        ],
        maxAgents: 3,
        maxConcurrency: 1,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        workUnit({
          id: FIX,
          objective:
            "Apply the exact causal graph validation correction and prove all graph tests pass.",
          weight: 2,
          capability: "repair.impact-graph-evidence",
          action:
            "Return accumulated top-level exact-key errors before canonical validation; preserve all tests and rerun the scoped suite.",
          sourceIds: fixSources,
          sourcePaths: paths(...fixSources),
          writes: GRAPH_FILES,
          evidenceIds: ["evidence.graph-recovery.produce"],
          artifact: "impact-graph-recovery-handoff.md",
          processes: ["node"],
        }),
        workUnit({
          id: INTEGRATION,
          objective:
            "Integrate the corrected graph with exact predecessor codec and interface outputs into the complete app.",
          weight: 7,
          capability: "integrate.impact-planner",
          action:
            "Verify the dependency handoff, wire state and events, add server and tests, run the full suite, and perform a bounded browser-skill observation.",
          sourceIds: integrationSources,
          sourcePaths: [
            ...paths(...integrationSources),
            ...GRAPH_FILES,
            ...REUSED_FILES,
          ].sort(),
          writes: INTEGRATION_FILES,
          dependencies: [FIX],
          evidenceIds: [
            "evidence.graph-recovery.integrate",
            "evidence.successor-integration.produce",
          ].sort(),
          artifact: "impact-successor-integration-handoff.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
        workUnit({
          id: REVIEW,
          objective:
            "Independently review the exact successor implementation and all recovery evidence.",
          weight: 4,
          capability: "review.impact-planner",
          action:
            "Run the complete suite, inspect every acceptance boundary and predecessor binding, and report material findings before verdict.",
          sourceIds: reviewSources,
          sourcePaths: [...new Set([...allSourcePaths, ...ALL_FILES])].sort(),
          writes: [],
          dependencies: [INTEGRATION],
          evidenceIds: [
            "evidence.graph-recovery.review",
            "evidence.successor-integration.review",
          ].sort(),
          artifact: "impact-successor-review.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.impact-planner.successor-three-stage",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile Impact Planner successor specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render Impact Planner successor package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify Impact Planner successor package",
    verifySpecialistPackage(specialistPackage, expectation),
  );
  if (
    compilation.blueprints.length !== 3 ||
    compilation.search.claim !== "exhaustive_partition_search_fixed_scheduler"
  ) {
    throw new Error(`Unexpected successor team: ${JSON.stringify(compilation.selected)}`);
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
