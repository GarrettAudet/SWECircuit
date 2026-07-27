import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SPECIALIST_API_VERSION,
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(EVIDENCE, "package");

const GRAPH = "implement.impact-graph";
const CODEC = "implement.impact-codec-storage";
const INTERFACE = "implement.impact-interface";
const INTEGRATION = "integrate.impact-planner";
const REVIEW = "review.impact-planner";
const UNIT_IDS = [GRAPH, CODEC, INTERFACE, INTEGRATION, REVIEW].sort();

const GRAPH_FILES = [
  "examples/impact-planner/src/graph.js",
  "examples/impact-planner/test/graph.test.mjs",
];
const CODEC_FILES = [
  "examples/impact-planner/src/codec.js",
  "examples/impact-planner/src/storage.js",
  "examples/impact-planner/test/codec.test.mjs",
  "examples/impact-planner/test/storage.test.mjs",
];
const INTERFACE_FILES = [
  "examples/impact-planner/index.html",
  "examples/impact-planner/styles.css",
  "examples/impact-planner/src/view.js",
  "examples/impact-planner/test/interface.test.mjs",
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
const PRODUCER_FILES = [
  ...GRAPH_FILES,
  ...CODEC_FILES,
  ...INTERFACE_FILES,
  ...INTEGRATION_FILES,
].sort();

const units = (...ids) => [...ids].sort();
const SOURCES = [
  {
    id: "context.goal",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
    description: "Closed medium-dogfood product goal and acceptance criteria.",
    units: UNIT_IDS,
  },
  {
    id: "context.app-contract",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
    description: "Closed graph, codec, interface, integration, and handoff contract.",
    units: UNIT_IDS,
  },
  {
    id: "context.agent-contract",
    path: "AGENTS.md",
    description: "Repository workflow, authority, verification, and memory invariants.",
    units: UNIT_IDS,
  },
  {
    id: "context.domain-pattern",
    path: "examples/release-board/src/model.js",
    description: "Current immutable dependency-free domain pattern.",
    units: units(GRAPH, INTEGRATION, REVIEW),
  },
  {
    id: "context.domain-test-pattern",
    path: "examples/release-board/test/model.test.mjs",
    description: "Current deterministic Node domain-test pattern.",
    units: units(GRAPH, INTEGRATION, REVIEW),
  },
  {
    id: "context.codec-pattern",
    path: "examples/release-board/src/storage.js",
    description: "Current fail-safe local serialization pattern.",
    units: units(CODEC, INTEGRATION, REVIEW),
  },
  {
    id: "context.codec-test-pattern",
    path: "examples/release-board/test/storage.test.mjs",
    description: "Current storage test pattern.",
    units: units(CODEC, INTEGRATION, REVIEW),
  },
  {
    id: "context.interface-pattern",
    path: "examples/release-board/index.html",
    description: "Current semantic static application shell.",
    units: units(INTERFACE, INTEGRATION, REVIEW),
  },
  {
    id: "context.style-pattern",
    path: "examples/release-board/styles.css",
    description: "Current responsive operational interface styling.",
    units: units(INTERFACE, INTEGRATION, REVIEW),
  },
  {
    id: "context.app-pattern",
    path: "examples/release-board/src/app.js",
    description: "Current local state and event-integration pattern.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.server-pattern",
    path: "examples/release-board/server.mjs",
    description: "Current local server and closed-network CSP pattern.",
    units: units(INTEGRATION, REVIEW),
  },
  {
    id: "context.integration-test-pattern",
    path: "examples/release-board/test/integration.test.mjs",
    description: "Current static-shell and server integration-test pattern.",
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
  action,
  capability,
  sourceIds,
  sourcePaths,
  writes,
  dependencies = [],
  evidenceIds,
  artifact,
  processes = [],
  requiredSkills = [],
}) {
  return {
    id,
    objective,
    weight,
    module: {
      id,
      action,
      inputPorts: [{ name: "contract", artifactType: "ImpactPlannerContract" }],
      outputPorts: [{ name: "handoff", artifactType: artifact }],
    },
    dependencies,
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Produce, integrate, or independently review the closed Impact Planner module.",
    })),
    scope: {
      read: [...new Set(sourcePaths)].sort(),
      write: writes,
      conflictZones: [],
    },
    permissions: [
      { kind: "filesystem.read", scopes: [...new Set(sourcePaths)].sort() },
      ...(writes.length > 0 ? [{ kind: "filesystem.write", scopes: writes }] : []),
      ...(processes.length > 0
        ? [{ kind: "process.spawn", scopes: processes }]
        : []),
    ],
    evidenceRequirementIds: evidenceIds,
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if the closed product goal conflicts with the application contract.",
      "Do not modify files outside the declared write scope.",
      "Do not install dependencies, access the network or secrets, mutate Git, merge, or update memory.",
      "A dependent unit must not start until every required handoff verifies and assesses integration-ready.",
      "Return a non-pass outcome when required evidence cannot be produced.",
      ...(requiredSkills.length > 0
        ? [`Stop if the host cannot deliver required skills: ${requiredSkills.join(", ")}.`]
        : []),
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();

  const common = ["context.goal", "context.app-contract", "context.agent-contract"];
  const graphSources = [...common, "context.domain-pattern", "context.domain-test-pattern"];
  const codecSources = [...common, "context.codec-pattern", "context.codec-test-pattern"];
  const interfaceSources = [...common, "context.interface-pattern", "context.style-pattern"];
  const integrationSources = [
    ...common,
    "context.app-pattern",
    "context.server-pattern",
    "context.integration-test-pattern",
  ];
  const reviewSources = SOURCES.map((source) => source.id);
  const allSourcePaths = [...new Set(contextSources.map((source) => source.readScope))].sort();

  const producer = (id, kind, description) =>
    evidence(id, kind, "produce", description, false);
  const reviewer = (id, description) =>
    evidence(id, "review", "review", description, true);

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.dogfood.impact-planner",
      revision: 1,
      objective:
        "Build, integrate, and independently review the medium offline Impact Planner through dependency-safe native Codex Desktop specialists.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.product-choice",
          statement:
            "Impact Planner is the medium task selected to exercise graph semantics, safe data exchange, interface work, dependency fan-in, and independent review.",
          rationale:
            "Its modules are independently implementable but require a real dependency-bound integration wave.",
        },
        {
          id: "assumption.host-skill",
          statement:
            "The Codex Desktop host can deliver the installed in-app browser skill to the integration agent.",
          rationale:
            "The current host exposes skill items and the browser skill is installed.",
        },
        {
          id: "assumption.owner-boundary",
          statement:
            "The main IDE agent remains the sole release and memory owner after independent review.",
          rationale:
            "Native specialists have bounded implementation or read-only review authority.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.graph",
          description:
            "Graph validation and impact analysis are immutable, deterministic, cycle-safe, and completely tested.",
          evidenceRequirements: [
            producer(
              "evidence.graph.produce",
              "test",
              "Produce the graph module and passing deterministic Node tests.",
            ),
            reviewer(
              "evidence.graph.review",
              "Independently review graph correctness, determinism, edge cases, and tests.",
            ),
          ],
        },
        {
          id: "criterion.codec",
          description:
            "Versioned import, export, and persistence reject unsafe input and preserve valid state.",
          evidenceRequirements: [
            producer(
              "evidence.codec.produce",
              "test",
              "Produce codec and storage modules with adversarial tests.",
            ),
            reviewer(
              "evidence.codec.review",
              "Independently review structural validation, byte limits, unsafe keys, and storage failure handling.",
            ),
          ],
        },
        {
          id: "criterion.interface",
          description:
            "The static interface and view projection are semantic, keyboard-operable, responsive, and integration-ready.",
          evidenceRequirements: [
            producer(
              "evidence.interface.produce",
              "test",
              "Produce the complete interface, view projection, and static contract tests.",
            ),
            reviewer(
              "evidence.interface.review",
              "Independently review accessibility, responsive constraints, integration hooks, and rendering behavior.",
            ),
          ],
        },
        {
          id: "criterion.integration",
          description:
            "Verified producer outputs integrate into one offline application with browser-observable acceptance behavior.",
          evidenceRequirements: [
            producer(
              "evidence.integration.produce",
              "test",
              "Integrate all producer modules and provide passing integration and server tests plus browser observations.",
            ),
            reviewer(
              "evidence.integration.review",
              "Independently review the complete application, test evidence, host boundary, and acceptance alignment.",
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: UNIT_IDS,
        allowedCapabilities: [
          "implement.impact-graph",
          "implement.safe-workspace-codec",
          "implement.accessible-impact-interface",
          "integrate.impact-planner",
          "review.impact-planner",
        ].sort(),
        permissionCeiling: [
          {
            kind: "filesystem.read",
            scopes: [...new Set([...allSourcePaths, ...PRODUCER_FILES])].sort(),
          },
          { kind: "filesystem.write", scopes: PRODUCER_FILES },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory.",
          "Do not widen a dependency, permission, runtime, skill, or evidence contract after approval.",
        ],
        maxAgents: 5,
        maxConcurrency: 3,
      },
      optimization: {
        agentStartupCost: 1,
        handoffCost: 1,
      },
      workUnits: [
        workUnit({
          id: GRAPH,
          objective:
            "Implement deterministic graph validation, immutable component transitions, transitive impact paths, and risk analysis.",
          weight: 8,
          action:
            "Implement the exact graph contract, cycle diagnostics, lexicographic shortest paths, risk formula, and exhaustive deterministic tests.",
          capability: "implement.impact-graph",
          sourceIds: graphSources,
          sourcePaths: paths(...graphSources),
          writes: GRAPH_FILES,
          evidenceIds: ["evidence.graph.produce"],
          artifact: "impact-graph-handoff.md",
          processes: ["node"],
        }),
        workUnit({
          id: CODEC,
          objective:
            "Implement safe versioned workspace import, deterministic export, persistence, and adversarial tests.",
          weight: 6,
          action:
            "Implement exact structural validation, byte and count limits, unsafe-key rejection, deterministic JSON, fail-safe storage, and tests.",
          capability: "implement.safe-workspace-codec",
          sourceIds: codecSources,
          sourcePaths: paths(...codecSources),
          writes: CODEC_FILES,
          evidenceIds: ["evidence.codec.produce"],
          artifact: "impact-codec-handoff.md",
          processes: ["node"],
        }),
        workUnit({
          id: INTERFACE,
          objective:
            "Implement the complete semantic Impact Planner shell, responsive styling, DOM projection helpers, and static tests.",
          weight: 6,
          action:
            "Implement every stable integration hook and render function while preserving keyboard, focus, error, responsive, and reduced-motion requirements.",
          capability: "implement.accessible-impact-interface",
          sourceIds: interfaceSources,
          sourcePaths: paths(...interfaceSources),
          writes: INTERFACE_FILES,
          evidenceIds: ["evidence.interface.produce"],
          artifact: "impact-interface-handoff.md",
          processes: ["node"],
        }),
        workUnit({
          id: INTEGRATION,
          objective:
            "Integrate the three verified producer modules into the complete offline application and observe its primary browser workflow.",
          weight: 7,
          action:
            "Consume exact verified dependency handoffs, wire state and events, implement the local server and integration tests, then use the delivered browser skill for a bounded smoke observation.",
          capability: "integrate.impact-planner",
          sourceIds: integrationSources,
          sourcePaths: [
            ...paths(...integrationSources),
            ...GRAPH_FILES,
            ...CODEC_FILES,
            ...INTERFACE_FILES,
          ].sort(),
          writes: INTEGRATION_FILES,
          dependencies: [GRAPH, CODEC, INTERFACE].sort(),
          evidenceIds: ["evidence.integration.produce"],
          artifact: "impact-integration-handoff.md",
          processes: ["node", "npm.cmd", "rg"],
          requiredSkills: ["skill.browser.control-in-app-browser"],
        }),
        workUnit({
          id: REVIEW,
          objective:
            "Independently review the exact integrated Impact Planner and all producer evidence without editing it.",
          weight: 4,
          action:
            "Run the complete suite and inspect graph, codec, storage, accessibility, browser, security, integration, and evidence behavior; report findings first.",
          capability: "review.impact-planner",
          sourceIds: reviewSources,
          sourcePaths: [...new Set([...allSourcePaths, ...PRODUCER_FILES])].sort(),
          writes: [],
          dependencies: [INTEGRATION],
          evidenceIds: [
            "evidence.graph.review",
            "evidence.codec.review",
            "evidence.interface.review",
            "evidence.integration.review",
          ].sort(),
          artifact: "impact-planner-review.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.impact-planner.parallel-roots-integration-review",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile Impact Planner specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render Impact Planner package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify Impact Planner package",
    verifySpecialistPackage(specialistPackage, expectation),
  );

  if (
    compilation.blueprints.length !== 5 ||
    compilation.selected.metrics.peakConcurrency !== 3 ||
    compilation.search.claim !== "exhaustive_partition_search_fixed_scheduler"
  ) {
    throw new Error(
      `Unexpected team shape: ${JSON.stringify({
        agents: compilation.blueprints.length,
        metrics: compilation.selected.metrics,
        search: compilation.search,
      })}`,
    );
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
