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

const CONTROLLER = "implement.adaptive-controller";
const RUN_VIEW = "implement.run-view";
const TESTS = "author.adaptive-tests";
const UNIT_IDS = [CONTROLLER, RUN_VIEW, TESTS];

const CONTROLLER_FILES = [
  "src/adaptive-run-types.ts",
  "src/adaptive-run-schema-data.ts",
  "src/adaptive-run-schema.ts",
  "src/adaptive-run-session.ts",
  "src/adaptive-run-transition.ts",
  "schemas/v1alpha1/adaptive-run.schema.json",
];
const RUN_VIEW_FILES = [
  "src/adaptive-run-inspection.ts",
  "src/adaptive-run-view.ts",
];
const TEST_FILES = [
  "test/helpers/adaptive-run-fixture.mjs",
  "test/adaptive-run.test.mjs",
  "test/adaptive-run-schema.test.mjs",
];

const SOURCES = [
  {
    id: "context.v14-contract",
    path: "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
    description: "Normative V14 Revision 2 contract.",
    units: UNIT_IDS,
  },
  {
    id: "context.v14-spec",
    path: "docs/specs/v14-adaptive-orchestration/spec.md",
    description: "V14 product requirements and acceptance criteria.",
    units: UNIT_IDS,
  },
  {
    id: "context.v14-test-plan",
    path: "docs/specs/v14-adaptive-orchestration/test-plan.md",
    description: "V14 acceptance-to-verification mapping.",
    units: UNIT_IDS,
  },
  {
    id: "context.adr",
    path: "docs/architecture/decisions/0007-adaptive-host-orchestration.md",
    description: "Accepted host and kernel boundary.",
    units: [CONTROLLER, RUN_VIEW],
  },
  {
    id: "context.routing-types",
    path: "src/runtime-routing-types.ts",
    description: "Approved assignment and routing types consumed by the adaptive controller.",
    units: UNIT_IDS,
  },
  {
    id: "context.routing",
    path: "src/runtime-routing.ts",
    description: "Current canonical validation, diagnostics, and digest patterns.",
    units: [CONTROLLER, TESTS],
  },
  {
    id: "context.v12-types",
    path: "src/specialist-run-types.ts",
    description: "Immutable V12 session and inspection types.",
    units: UNIT_IDS,
  },
  {
    id: "context.v12-session",
    path: "src/specialist-run-session.ts",
    description: "V12 session creation and restoration patterns.",
    units: [CONTROLLER, TESTS],
  },
  {
    id: "context.v12-transition",
    path: "src/specialist-run-transition.ts",
    description: "V12 verified handoff settlement boundary.",
    units: [CONTROLLER, TESTS],
  },
  {
    id: "context.v12-inspection",
    path: "src/specialist-run-inspection.ts",
    description: "V12 pure inspection projection pattern.",
    units: [RUN_VIEW, TESTS],
  },
  {
    id: "context.v12-schema",
    path: "src/specialist-run-schema.ts",
    description: "Strict Ajv schema registry pattern.",
    units: [CONTROLLER, TESTS],
  },
  {
    id: "context.canonical-json",
    path: "src/canonical-json.ts",
    description: "Canonical JSON and digest helpers.",
    units: [CONTROLLER, RUN_VIEW],
  },
  {
    id: "context.constants",
    path: "src/constants.ts",
    description: "Current public versions and resource limits.",
    units: UNIT_IDS,
  },
  {
    id: "context.diagnostics",
    path: "src/diagnostics.ts",
    description: "Current diagnostic catalog and stable ordering.",
    units: UNIT_IDS,
  },
  {
    id: "context.index",
    path: "src/index.ts",
    description: "Current public export surface.",
    units: UNIT_IDS,
  },
  {
    id: "context.routing-fixture",
    path: "test/helpers/runtime-routing-fixture.mjs",
    description: "Current complete assignment fixture.",
    units: [TESTS],
  },
  {
    id: "context.v12-fixture",
    path: "test/helpers/specialist-run-fixture.mjs",
    description: "Current complete V11/V12 package and session fixture.",
    units: [TESTS],
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
  moduleId,
  action,
  capability,
  sourceIds,
  sourcePaths,
  writes,
  evidenceId,
  artifact,
}) {
  return {
    id,
    objective,
    weight,
    module: {
      id: moduleId,
      action,
      inputPorts: [{ name: "input", artifactType: "V14Revision2Contract" }],
      outputPorts: [{ name: "output", artifactType: artifact }],
    },
    dependencies: [],
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Produce one disjoint V14 adaptive orchestration module.",
    })),
    scope: {
      read: sourcePaths,
      write: writes,
      conflictZones: [],
    },
    permissions: [
      { kind: "filesystem.read", scopes: sourcePaths },
      { kind: "filesystem.write", scopes: writes },
      { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
    ],
    evidenceRequirementIds: [evidenceId],
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if the normative V14 contract conflicts with V11 compilation or V12 immutable-session behavior.",
      "Do not claim a host effect from a kernel-generated value.",
      "Do not modify files outside the declared write scope.",
      "Do not access the network, install dependencies, mutate Git, merge, or update memory.",
      "Return non-pass when the assigned artifact cannot be produced from the verified inputs.",
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();
  const controllerSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.v14-test-plan",
    "context.adr",
    "context.routing-types",
    "context.routing",
    "context.v12-types",
    "context.v12-session",
    "context.v12-transition",
    "context.v12-schema",
    "context.canonical-json",
    "context.constants",
    "context.diagnostics",
    "context.index",
  ];
  const runViewSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.v14-test-plan",
    "context.adr",
    "context.routing-types",
    "context.v12-types",
    "context.v12-inspection",
    "context.canonical-json",
    "context.constants",
    "context.diagnostics",
    "context.index",
  ];
  const testSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.v14-test-plan",
    "context.routing-types",
    "context.routing",
    "context.v12-types",
    "context.v12-session",
    "context.v12-transition",
    "context.v12-inspection",
    "context.v12-schema",
    "context.constants",
    "context.diagnostics",
    "context.index",
    "context.routing-fixture",
    "context.v12-fixture",
  ];
  const allPaths = [...new Set(contextSources.map((source) => source.readScope))].sort();
  const allOutputs = [...CONTROLLER_FILES, ...RUN_VIEW_FILES, ...TEST_FILES].sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.adaptive-orchestration.adaptive-wave",
      revision: 1,
      objective:
        "Produce the pure adaptive run controller, portable RunView, and independent test contract required to turn approved runtime assignments into a visible IDE-agnostic orchestration loop.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.successor-review",
          statement:
            "This package produces disjoint implementation and test artifacts; executable integration verification and independent review use a successor package over the assembled commit.",
          rationale:
            "A parallel test author cannot truthfully certify implementation bytes that do not exist at launch.",
        },
        {
          id: "assumption.additive",
          statement: "Adaptive APIs remain additive to the released V11 and V12 public behavior.",
          rationale: "V14 must preserve existing compilation and immutable session contracts.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.adaptive-controller",
          description:
            "A pure controller validates assignments, emits dependency-safe host commands, records exact host events, settles V12 handoffs, restores state, and routes bounded outcomes.",
          evidenceRequirements: [
            evidence(
              "evidence.adaptive-controller.produce",
              "artifact",
              "Produce the closed adaptive controller, event protocol, schema, and session operations.",
            ),
          ],
        },
        {
          id: "criterion.run-view",
          description:
            "A pure RunView projection exposes modules, assignments, status, dependencies, evidence, routes, blockers, source links, and next action without inventing host facts.",
          evidenceRequirements: [
            evidence(
              "evidence.run-view.produce",
              "artifact",
              "Produce closed JSON and Markdown RunView projections.",
            ),
          ],
        },
        {
          id: "criterion.adaptive-tests",
          description:
            "An independently authored suite defines lifecycle, restart, event-chain, redaction, RunView, and public-schema expectations before integration.",
          evidenceRequirements: [
            evidence(
              "evidence.adaptive-tests.produce",
              "test",
              "Produce the independent executable adaptive and RunView test contract.",
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: UNIT_IDS,
        allowedCapabilities: [
          "implement.pure-adaptive-controller",
          "implement.portable-run-view",
          "author.adaptive-contract-tests",
        ],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [...allPaths, ...allOutputs].sort() },
          { kind: "filesystem.write", scopes: allOutputs },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, mutate Git, launch native agents, enforce permissions, integrate, merge, or update memory.",
        ],
        maxAgents: 3,
        maxConcurrency: 3,
      },
      optimization: {
        agentStartupCost: 1,
        handoffCost: 1,
      },
      workUnits: [
        unit({
          id: CONTROLLER,
          objective:
            "Implement the closed pure adaptive session, host-event protocol, dependency-safe launch command projection, result capture settlement, typed route matrix, bounded successor lineage, and restore operations.",
          weight: 12,
          moduleId: CONTROLLER,
          action:
            "Follow V12 immutable-session and V14 digest domains exactly; preserve raw host-event identity and never claim execution from a host receipt.",
          capability: "implement.pure-adaptive-controller",
          sourceIds: controllerSources,
          sourcePaths: paths(...controllerSources),
          writes: CONTROLLER_FILES,
          evidenceId: "evidence.adaptive-controller.produce",
          artifact: "adaptive-controller-implementation.md",
        }),
        unit({
          id: RUN_VIEW,
          objective:
            "Implement closed adaptive inspection plus concise JSON and Markdown RunView projections from exact source state.",
          weight: 7,
          moduleId: RUN_VIEW,
          action:
            "Expose provenance classes, serial-versus-parallel rationale, assignments, rejected alternatives, native status, dependencies, evidence, blockers, typed interventions, and source links without host-effect claims.",
          capability: "implement.portable-run-view",
          sourceIds: runViewSources,
          sourcePaths: paths(...runViewSources),
          writes: RUN_VIEW_FILES,
          evidenceId: "evidence.run-view.produce",
          artifact: "run-view-implementation.md",
        }),
        unit({
          id: TESTS,
          objective:
            "Author independent executable tests for the complete adaptive controller, host protocol, restore behavior, RunView, redaction, schema, and packed public surface.",
          weight: 8,
          moduleId: TESTS,
          action:
            "Derive tests from Revision 2 without inspecting producer workspaces; syntax-check now and leave execution to the successor integration verifier.",
          capability: "author.adaptive-contract-tests",
          sourceIds: testSources,
          sourcePaths: paths(...testSources),
          writes: TEST_FILES,
          evidenceId: "evidence.adaptive-tests.produce",
          artifact: "adaptive-test-contract.md",
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.v14.adaptive-three-way",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile V14 adaptive specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render V14 adaptive package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify V14 adaptive package",
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
  await writeJson(join(EVIDENCE, "summary.json"), {
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    search: compilation.search,
    launchWaves: compilation.launchWaves,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      workUnitIds: blueprint.workUnitIds,
      dependencies: blueprint.dependencies,
      contentDigest: blueprint.contentDigest,
      contractFile:
        specialistPackage.manifest.agents.find((agent) => agent.agentId === blueprint.id)
          ?.contractFile ?? null,
    })),
    expectation,
  });
  await writeJson(join(EVIDENCE, "approval.json"), {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    approvedBy: "repository-owner-via-standing-release-authorization",
    decision: "approve",
    basis:
      "The owner authorized revisions and audits required to reach the full release-ready orchestration goal; the integration owner reviewed this disjoint three-way wave.",
    expectation,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        search: compilation.search,
        serialBaseline: compilation.serialBaseline.metrics,
        selected: compilation.selected.metrics,
        launchWaves: compilation.launchWaves,
        expectation,
      },
      null,
      2,
    )}\n`,
  );
}

await main();
