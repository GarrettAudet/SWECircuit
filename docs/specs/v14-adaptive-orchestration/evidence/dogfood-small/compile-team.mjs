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

const DOMAIN = "implement.release-board-domain";
const INTERFACE = "implement.release-board-interface";
const UNIT_IDS = [DOMAIN, INTERFACE];

const DOMAIN_FILES = [
  "examples/release-board/src/model.js",
  "examples/release-board/src/storage.js",
  "examples/release-board/test/model.test.mjs",
  "examples/release-board/test/storage.test.mjs",
];
const INTERFACE_FILES = [
  "examples/release-board/index.html",
  "examples/release-board/styles.css",
];

const SOURCES = [
  {
    id: "context.goal",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
    description: "Closed product goal and acceptance criteria.",
    units: UNIT_IDS,
  },
  {
    id: "context.app-contract",
    path: "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
    description: "Closed module and integration contract.",
    units: UNIT_IDS,
  },
  {
    id: "context.agent-contract",
    path: "AGENTS.md",
    description: "Repository operating and handoff invariants.",
    units: UNIT_IDS,
  },
  {
    id: "context.domain-pattern",
    path: "examples/triage-board/src/model.js",
    description: "Current dependency-free immutable domain pattern.",
    units: [DOMAIN],
  },
  {
    id: "context.storage-pattern",
    path: "examples/triage-board/src/storage.js",
    description: "Current pure local-storage serialization pattern.",
    units: [DOMAIN],
  },
  {
    id: "context.domain-test-pattern",
    path: "examples/triage-board/test/model.test.mjs",
    description: "Current Node domain-test pattern.",
    units: [DOMAIN],
  },
  {
    id: "context.storage-test-pattern",
    path: "examples/triage-board/test/storage.test.mjs",
    description: "Current Node storage-test pattern.",
    units: [DOMAIN],
  },
  {
    id: "context.interface-pattern",
    path: "examples/triage-board/index.html",
    description: "Current semantic static-app interface pattern.",
    units: [INTERFACE],
  },
  {
    id: "context.style-pattern",
    path: "examples/triage-board/styles.css",
    description: "Current responsive operational-app styling pattern.",
    units: [INTERFACE],
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

function evidence(id, kind, description) {
  return {
    id,
    kind,
    duty: "produce",
    description,
    independentFromProducer: false,
  };
}

function unit({
  id,
  objective,
  weight,
  action,
  capability,
  sourceIds,
  sourcePaths,
  writes,
  evidenceId,
  artifact,
  processScopes,
}) {
  const permissions = [
    { kind: "filesystem.read", scopes: sourcePaths },
    { kind: "filesystem.write", scopes: writes },
  ];
  if (processScopes.length > 0) {
    permissions.push({ kind: "process.spawn", scopes: processScopes });
  }
  return {
    id,
    objective,
    weight,
    module: {
      id,
      action,
      inputPorts: [{ name: "contract", artifactType: "ReleaseBoardContract" }],
      outputPorts: [{ name: "implementation", artifactType: artifact }],
    },
    dependencies: [],
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Produce one disjoint Release Board module.",
    })),
    scope: {
      read: sourcePaths,
      write: writes,
      conflictZones: [],
    },
    permissions,
    evidenceRequirementIds: [evidenceId],
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if the product goal conflicts with the application contract.",
      "Do not modify files outside the declared write scope.",
      "Do not access the network, install dependencies, mutate Git, merge, or update memory.",
      "Do not claim browser behavior that was not observed.",
      "Return non-pass when the assigned artifact cannot be produced and verified.",
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();
  const domainSources = [
    "context.goal",
    "context.app-contract",
    "context.agent-contract",
    "context.domain-pattern",
    "context.storage-pattern",
    "context.domain-test-pattern",
    "context.storage-test-pattern",
  ];
  const interfaceSources = [
    "context.goal",
    "context.app-contract",
    "context.agent-contract",
    "context.interface-pattern",
    "context.style-pattern",
  ];
  const allPaths = [...new Set(contextSources.map((source) => source.readScope))].sort();
  const allOutputs = [...DOMAIN_FILES, ...INTERFACE_FILES].sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.dogfood.release-board",
      revision: 1,
      objective:
        "Build the independent domain and semantic interface modules for a small dependency-free Release Board application, then hand them to one IDE integration owner.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.product-choice",
          statement:
            "Release Board is the low-risk small application chosen to validate the V14 orchestration alpha.",
          rationale:
            "The owner requested a small application dogfood but did not prescribe a product.",
        },
        {
          id: "assumption.integration-owner",
          statement:
            "The main IDE agent owns event wiring, final verification, browser inspection, and review routing after both roots pass.",
          rationale:
            "The two roots have disjoint writes and the small goal does not justify another implementation specialist.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.domain",
          description:
            "Pure immutable domain and versioned storage operations satisfy the closed check, filter, summary, and invalid-data contract.",
          evidenceRequirements: [
            evidence(
              "evidence.domain.tests",
              "test",
              "Produce passing deterministic Node tests with the domain and storage modules.",
            ),
          ],
        },
        {
          id: "criterion.interface",
          description:
            "A semantic responsive interface exposes every required control, state region, focus treatment, and integration hook without application state.",
          evidenceRequirements: [
            evidence(
              "evidence.interface.artifact",
              "artifact",
              "Produce the complete static HTML and CSS interface module.",
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: UNIT_IDS,
        allowedCapabilities: [
          "implement.release-board-domain",
          "implement.release-board-interface",
        ],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [...allPaths, ...allOutputs].sort() },
          { kind: "filesystem.write", scopes: allOutputs },
          { kind: "process.spawn", scopes: ["node"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, mutate Git, launch descendants, integrate, merge, or update memory.",
        ],
        maxAgents: 2,
        maxConcurrency: 2,
      },
      optimization: {
        agentStartupCost: 1,
        handoffCost: 1,
      },
      workUnits: [
        unit({
          id: DOMAIN,
          objective:
            "Implement pure immutable release-check operations, safe versioned serialization, and deterministic Node tests.",
          weight: 6,
          action:
            "Implement the exact check shape, closed filters, readiness summary, immutable transitions, and fail-safe storage parsing.",
          capability: "implement.release-board-domain",
          sourceIds: domainSources,
          sourcePaths: paths(...domainSources),
          writes: DOMAIN_FILES,
          evidenceId: "evidence.domain.tests",
          artifact: "release-board-domain-handoff.md",
          processScopes: ["node"],
        }),
        unit({
          id: INTERFACE,
          objective:
            "Implement the complete semantic and responsive Release Board HTML and CSS interface without application state.",
          weight: 5,
          action:
            "Create the required form, summary, filters, list, template, live region, responsive layout, and visible focus states.",
          capability: "implement.release-board-interface",
          sourceIds: interfaceSources,
          sourcePaths: paths(...interfaceSources),
          writes: INTERFACE_FILES,
          evidenceId: "evidence.interface.artifact",
          artifact: "release-board-interface-handoff.md",
          processScopes: [],
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.release-board.parallel-roots",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile Release Board specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render Release Board package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify Release Board package",
    verifySpecialistPackage(specialistPackage, expectation),
  );

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
  await writeJson(join(EVIDENCE, "team-summary.json"), {
    outcome: "pass",
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    search: compilation.search,
    launchWaves: compilation.launchWaves,
    agents,
    expectation,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        serialBaseline: compilation.serialBaseline.metrics,
        selected: compilation.selected.metrics,
        selectionReason: compilation.selectionReason,
        search: compilation.search,
        launchWaves: compilation.launchWaves,
        agents,
        expectation,
      },
      null,
      2,
    )}\n`,
  );
}

await main();
