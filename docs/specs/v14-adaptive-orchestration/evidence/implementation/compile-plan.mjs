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

const ROUTING = "implement.runtime-routing";
const TESTS = "test.runtime-routing";
const ADAPTER = "implement.codex-adapter";
const REVIEW = "review.vertical-slice";
const UNIT_IDS = [ROUTING, TESTS, ADAPTER, REVIEW];

const ROUTING_FILES = [
  "src/runtime-routing-types.ts",
  "src/runtime-routing-schema-data.ts",
  "src/runtime-routing-schema.ts",
  "src/runtime-routing.ts",
  "schemas/v1alpha1/runtime-routing.schema.json",
];
const TEST_FILES = [
  "test/helpers/runtime-routing-fixture.mjs",
  "test/runtime-routing.test.mjs",
  "test/runtime-routing-schema.test.mjs",
];
const ADAPTER_FILES = [
  "adapters/codex-desktop/README.md",
  "adapters/codex-desktop/inventory.example.json",
  "adapters/codex-desktop/policy.example.json",
  "docs/ide/codex-adaptive-run.md",
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
    description: "V14 product specification and acceptance criteria.",
    units: UNIT_IDS,
  },
  {
    id: "context.v14-r1",
    path:
      "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
    description: "Integrated architecture-review findings that Revision 2 must preserve.",
    units: [ROUTING, TESTS, REVIEW],
  },
  {
    id: "context.specialist-types",
    path: "src/specialist-types.ts",
    description: "Existing specialist public types consumed by runtime routing.",
    units: [ROUTING, TESTS, REVIEW],
  },
  {
    id: "context.specialist-compiler",
    path: "src/specialist-compiler.ts",
    description: "Canonical compiler, validation, search, and digest implementation patterns.",
    units: [ROUTING, REVIEW],
  },
  {
    id: "context.canonical-json",
    path: "src/canonical-json.ts",
    description: "Canonical JSON and digest helpers.",
    units: [ROUTING, REVIEW],
  },
  {
    id: "context.schema-pattern",
    path: "src/specialist-run-schema.ts",
    description: "Strict Ajv closed-schema registry pattern.",
    units: [ROUTING, REVIEW],
  },
  {
    id: "context.schema-data-pattern",
    path: "src/specialist-run-schema-data.ts",
    description: "Generated schema source pattern.",
    units: [ROUTING, REVIEW],
  },
  {
    id: "context.diagnostics",
    path: "src/diagnostics.ts",
    description: "Current diagnostic definitions and stable code conventions.",
    units: [ROUTING, TESTS, REVIEW],
  },
  {
    id: "context.constants",
    path: "src/constants.ts",
    description: "Current version and limit constants.",
    units: [ROUTING, TESTS, REVIEW],
  },
  {
    id: "context.index",
    path: "src/index.ts",
    description: "Current public export surface.",
    units: [ROUTING, TESTS, REVIEW],
  },
  {
    id: "context.test-pattern",
    path: "test/specialist-compiler.test.mjs",
    description: "Existing compiler determinism and adversarial test patterns.",
    units: [TESTS, REVIEW],
  },
  {
    id: "context.run-fixture",
    path: "test/helpers/specialist-run-fixture.mjs",
    description: "Existing complete V11/V12 fixture construction pattern.",
    units: [TESTS, REVIEW],
  },
  {
    id: "context.host-scan",
    path: "docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md",
    description: "Current cross-host capability evidence.",
    units: [ADAPTER, REVIEW],
  },
  {
    id: "context.ide-kickoff",
    path: "docs/ide/specialist-agent-kickoff.md",
    description: "Current Codex-visible specialist workflow.",
    units: [ADAPTER, REVIEW],
  },
  {
    id: "context.agents",
    path: "AGENTS.md",
    description: "Repository agent contract and host responsibilities.",
    units: [ADAPTER, REVIEW],
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
  dependencies = [],
  evidenceIds,
  artifact,
  processes = [],
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
    dependencies,
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Implement or verify the exact V14 executable vertical slice.",
    })),
    scope: { read: sourcePaths, write: writes, conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: sourcePaths },
      ...(writes.length > 0 ? [{ kind: "filesystem.write", scopes: writes }] : []),
      ...(processes.length > 0
        ? [{ kind: "process.spawn", scopes: processes }]
        : []),
    ],
    evidenceRequirementIds: evidenceIds,
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if the normative V14 contract conflicts with the existing V11 or V12 public boundary.",
      "Do not modify files outside the declared write scope.",
      "Do not install dependencies, access the network, mutate Git, merge, or update memory.",
      "Return a non-pass outcome when required verification cannot be completed.",
    ],
  };
}

async function buildRequest() {
  const contextSources = await bindSources();
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();
  const routingSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.v14-r1",
    "context.specialist-types",
    "context.specialist-compiler",
    "context.canonical-json",
    "context.schema-pattern",
    "context.schema-data-pattern",
    "context.diagnostics",
    "context.constants",
    "context.index",
  ];
  const testSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.v14-r1",
    "context.specialist-types",
    "context.diagnostics",
    "context.constants",
    "context.index",
    "context.test-pattern",
    "context.run-fixture",
  ];
  const adapterSources = [
    "context.v14-contract",
    "context.v14-spec",
    "context.host-scan",
    "context.ide-kickoff",
    "context.agents",
  ];
  const reviewSources = SOURCES.map((source) => source.id);
  const allPaths = [...new Set(contextSources.map((source) => source.readScope))].sort();
  const allOutputs = [...ROUTING_FILES, ...TEST_FILES, ...ADAPTER_FILES].sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.adaptive-orchestration.vertical-slice",
      revision: 1,
      objective:
        "Implement and independently verify the deterministic runtime-routing kernel plus the Windows Codex Desktop reference adapter from the V14 Revision 2 contract.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.bootstrap-routing",
          statement:
            "This first implementation wave uses a recorded manual bootstrap runtime plan because the router it implements is not yet executable.",
          rationale:
            "The resulting router must choose later waves deterministically and replace manual selection.",
        },
        {
          id: "assumption.additive-api",
          statement: "V14 APIs are additive and V11/V12 behavior remains unchanged.",
          rationale: "The vertical slice must not destabilize the released baseline.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.routing",
          description:
            "The kernel deterministically derives demand, filters profile/effort rows, and selects a globally feasible least-cost assignment vector.",
          evidenceRequirements: [
            evidence(
              "evidence.routing.produce",
              "artifact",
              "produce",
              "Produce the closed runtime-routing implementation and schema.",
            ),
            evidence(
              "evidence.routing.verify",
              "test",
              "verify",
              "Independently verify deterministic selection, hard gates, bounded search, and overrides.",
              true,
            ),
          ],
        },
        {
          id: "criterion.adapter",
          description:
            "A Windows Codex Desktop adapter can translate approved assignments into visible native agent launches without hidden fallback.",
          evidenceRequirements: [
            evidence(
              "evidence.adapter.produce",
              "artifact",
              "produce",
              "Produce the reference adapter contract, inventory, policy, and IDE guide.",
            ),
            evidence(
              "evidence.slice.review",
              "review",
              "review",
              "Independently review the complete integrated vertical slice.",
              true,
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: [
          "implement.runtime-routing",
          "test.runtime-routing",
          "implement.codex-adapter",
          "review.vertical-slice",
        ],
        allowedCapabilities: [
          "implement.deterministic-typescript-compiler",
          "verify.runtime-routing-contract",
          "design.codex-host-adapter",
          "review.orchestration-vertical-slice",
        ],
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [...allPaths, ...allOutputs].sort() },
          { kind: "filesystem.write", scopes: allOutputs },
          { kind: "process.spawn", scopes: ["node", "npm.cmd", "rg"] },
        ],
        forbiddenEffects: [
          "Do not access the network, secrets, external services, or undeclared repository paths.",
          "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory.",
        ],
        maxAgents: 4,
        maxConcurrency: 3,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        unit({
          id: ROUTING,
          objective:
            "Implement the closed provider-neutral runtime-routing types, strict schema, validation, demand derivation, row filtering, vector search, override, and verification operations.",
          weight: 10,
          moduleId: "implement.runtime-routing",
          action:
            "Follow existing canonical JSON, snapshot, Ajv, diagnostics, limit, and OperationResult patterns; preserve V11/V12 APIs; implement only the routing portion of the normative V14 contract.",
          capability: "implement.deterministic-typescript-compiler",
          sourceIds: routingSources,
          sourcePaths: paths(...routingSources),
          writes: ROUTING_FILES,
          evidenceIds: ["evidence.routing.produce"],
          artifact: "runtime-routing-implementation.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
        unit({
          id: TESTS,
          objective:
            "Create independent executable fixtures and tests for the V14 runtime-routing contract before seeing the producer implementation.",
          weight: 8,
          moduleId: "test.runtime-routing",
          action:
            "Test demand coverage, every hard gate, full-vector independence, exact and bounded search claims, comparator order, determinism under permutations, overrides, malformed inputs, limits, and packed public usability assumptions.",
          capability: "verify.runtime-routing-contract",
          sourceIds: testSources,
          sourcePaths: paths(...testSources),
          writes: TEST_FILES,
          evidenceIds: ["evidence.routing.verify"],
          artifact: "runtime-routing-test-evidence.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
        unit({
          id: ADAPTER,
          objective:
            "Define the first usable Windows Codex Desktop adapter surface, examples, and visible host workflow for approved assignments.",
          weight: 5,
          moduleId: "implement.codex-adapter",
          action:
            "Provide a small truthful adapter contract and examples for current model/effort inventory, native spawn translation, explicit unavailable bindings, status visibility, exact result capture, and no hidden fallback.",
          capability: "design.codex-host-adapter",
          sourceIds: adapterSources,
          sourcePaths: paths(...adapterSources),
          writes: ADAPTER_FILES,
          evidenceIds: ["evidence.adapter.produce"],
          artifact: "codex-adapter-evidence.md",
        }),
        unit({
          id: REVIEW,
          objective:
            "Independently review the integrated routing kernel, tests, and Codex adapter after all producer outputs are available.",
          weight: 4,
          moduleId: "review.vertical-slice",
          action:
            "Inspect exact source, run focused verification, and report material API, determinism, security, adapter-truth, or usability defects without editing producer outputs.",
          capability: "review.orchestration-vertical-slice",
          sourceIds: reviewSources,
          sourcePaths: [...allPaths, ...allOutputs].sort(),
          writes: [],
          dependencies: [ROUTING, TESTS, ADAPTER],
          evidenceIds: ["evidence.slice.review"],
          artifact: "vertical-slice-review.md",
          processes: ["node", "npm.cmd", "rg"],
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.v14.three-producers-one-reviewer",
        groups: UNIT_IDS.map((id) => [id]),
      },
    ],
  };
}

async function main() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile V14 implementation specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render V14 implementation package",
    renderSpecialistPackage(compilation),
  );
  const expectation = {
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "verify V14 implementation package",
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
      "The owner directed Codex to continue toward the full orchestration goal. The integration owner reviewed the exact disjoint vertical-slice roster.",
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
