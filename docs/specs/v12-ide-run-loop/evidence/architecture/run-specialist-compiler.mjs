import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const INPUTS = join(EVIDENCE, "inputs");
const PACKAGE_DIR = join(EVIDENCE, "package");
const mode = process.argv[2] ?? "prepare";

const ANALYZE_PRODUCT = "analyze.product-run-loop";
const ANALYZE_LIFECYCLE = "analyze.lifecycle-recovery";
const ANALYZE_AUTHORITY = "analyze.authority-portability";
const INTEGRATE_ARCHITECTURE = "integrate.architecture";

const SOURCE_DEFINITIONS = [
  {
    id: "context.v12-spec",
    path: "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
    description: "Immutable V12 feature-spec snapshot.",
    allowedWorkUnits: [
      ANALYZE_PRODUCT,
      ANALYZE_LIFECYCLE,
      ANALYZE_AUTHORITY,
      INTEGRATE_ARCHITECTURE,
    ],
  },
  {
    id: "context.v12-goal-synthesis",
    path: "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
    description: "Immutable V12 goal-synthesis snapshot.",
    allowedWorkUnits: [
      ANALYZE_PRODUCT,
      ANALYZE_LIFECYCLE,
      ANALYZE_AUTHORITY,
      INTEGRATE_ARCHITECTURE,
    ],
  },
  {
    id: "context.readme",
    path: "README.md",
    description: "Released V11.1 public product and host boundary.",
    allowedWorkUnits: [ANALYZE_PRODUCT],
  },
  {
    id: "context.ide-kickoff",
    path: "docs/ide/specialist-agent-kickoff.md",
    description: "Current visible IDE specialist workflow.",
    allowedWorkUnits: [ANALYZE_PRODUCT, ANALYZE_AUTHORITY, INTEGRATE_ARCHITECTURE],
  },
  {
    id: "context.handbook",
    path: "docs/ai/handbook.md",
    description: "Current workflow, interaction, parallelization, and integration rules.",
    allowedWorkUnits: [ANALYZE_PRODUCT, ANALYZE_LIFECYCLE],
  },
  {
    id: "context.adr-0003",
    path: "docs/architecture/decisions/0003-portable-orchestration-control-plane.md",
    description: "Deferred universal runtime-control-plane design evidence.",
    allowedWorkUnits: [ANALYZE_LIFECYCLE],
  },
  {
    id: "context.adr-0004",
    path: "docs/architecture/decisions/0004-specialist-compiler-first.md",
    description: "Accepted compiler-first boundary and deferred runtime list.",
    allowedWorkUnits: [
      ANALYZE_PRODUCT,
      ANALYZE_LIFECYCLE,
      ANALYZE_AUTHORITY,
      INTEGRATE_ARCHITECTURE,
    ],
  },
  {
    id: "context.round-4",
    path: "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
    description: "Independent findings against the coupled universal runtime.",
    allowedWorkUnits: [ANALYZE_LIFECYCLE, ANALYZE_AUTHORITY],
  },
  {
    id: "context.correction-design",
    path: "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
    description: "Mandatory correction record for later runtime-adjacent work.",
    allowedWorkUnits: [ANALYZE_LIFECYCLE, ANALYZE_AUTHORITY, INTEGRATE_ARCHITECTURE],
  },
  {
    id: "context.compiler-contract",
    path: "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
    description: "Normative V11 package, handoff, fan-in, and host contract.",
    allowedWorkUnits: [ANALYZE_PRODUCT, ANALYZE_AUTHORITY, INTEGRATE_ARCHITECTURE],
  },
  {
    id: "context.executor-boundary",
    path: "docs/framework/executor-boundary.md",
    description: "Existing bounded host-injected execution boundary.",
    allowedWorkUnits: [ANALYZE_LIFECYCLE, ANALYZE_AUTHORITY],
  },
  {
    id: "context.public-api",
    path: "src/index.ts",
    description: "Current public kernel export surface.",
    allowedWorkUnits: [ANALYZE_PRODUCT, ANALYZE_AUTHORITY],
  },
  {
    id: "context.handoff-implementation",
    path: "src/specialist-handoff.ts",
    description: "Current raw handoff and dependency fan-in implementation.",
    allowedWorkUnits: [ANALYZE_LIFECYCLE, ANALYZE_AUTHORITY],
  },
  {
    id: "context.package",
    path: "package.json",
    description: "Current package, scripts, and installed-consumer surface.",
    allowedWorkUnits: [ANALYZE_PRODUCT, ANALYZE_AUTHORITY],
  },
];

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics.map((item) => `${item.code}:${item.message}`).join("\n");
    throw new Error(`${stage} failed\n${diagnostics}`);
  }
  return result.value;
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function freezeInputs() {
  await mkdir(INPUTS, { recursive: true });
  const snapshots = [
    ["docs/specs/v12-ide-run-loop/spec.md", "spec.md"],
    ["docs/specs/v12-ide-run-loop/goal-synthesis.md", "goal-synthesis.md"],
  ];
  for (const [source, target] of snapshots) {
    await writeFile(join(INPUTS, target), await readFile(join(ROOT, source)));
  }
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
        allowedWorkUnits: source.allowedWorkUnits,
        readScope: source.path,
      };
    }),
  );
}

function uses(sourceIds, purpose) {
  return sourceIds.map((sourceId) => ({ sourceId, purpose }));
}

function unit({
  id,
  objective,
  weight,
  moduleId,
  action,
  inputType,
  outputType,
  dependencies = [],
  capability,
  sourceIds,
  sourcePaths,
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
      inputPorts: [{ name: "input", artifactType: inputType }],
      outputPorts: [{ name: "output", artifactType: outputType }],
    },
    dependencies,
    requiredCapabilities: [capability],
    contextUses: uses(sourceIds, "Inspect the exact frozen V12 architecture input."),
    scope: { read: sourcePaths, write: [], conflictZones: [] },
    permissions: [{ kind: "filesystem.read", scopes: sourcePaths }],
    evidenceRequirementIds: [evidenceId],
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
      "Do not edit files, run tests, access the network, launch descendants, or change Git state.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(contextSources) {
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...sourceIds) => sourceIds.map((id) => pathById.get(id)).sort();
  const productSourceIds = [
    "context.v12-spec",
    "context.v12-goal-synthesis",
    "context.readme",
    "context.ide-kickoff",
    "context.handbook",
    "context.adr-0004",
    "context.compiler-contract",
    "context.public-api",
    "context.package",
  ];
  const lifecycleSourceIds = [
    "context.v12-spec",
    "context.v12-goal-synthesis",
    "context.handbook",
    "context.adr-0003",
    "context.adr-0004",
    "context.round-4",
    "context.correction-design",
    "context.executor-boundary",
    "context.handoff-implementation",
  ];
  const authoritySourceIds = [
    "context.v12-spec",
    "context.v12-goal-synthesis",
    "context.ide-kickoff",
    "context.adr-0004",
    "context.round-4",
    "context.correction-design",
    "context.compiler-contract",
    "context.executor-boundary",
    "context.public-api",
    "context.handoff-implementation",
    "context.package",
  ];
  const integrationSourceIds = [
    "context.v12-spec",
    "context.v12-goal-synthesis",
    "context.ide-kickoff",
    "context.adr-0004",
    "context.correction-design",
    "context.compiler-contract",
  ];
  const allPaths = [...new Set(contextSources.map((source) => source.readScope))].sort();

  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "v12.ide-run-loop.architecture",
      revision: 1,
      objective:
        "Produce an implementation-ready architecture for a portable host-assisted IDE Run Loop over one approved V11 specialist package.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.host-assisted",
          statement: "V12 derives host instructions and evidence but performs no host runtime effect.",
          rationale: "This is the smallest usable IDE-neutral layer over V11 without repeating the universal runtime coupling.",
        },
        {
          id: "assumption.single-package",
          statement: "One V12 run binds one approved V11 specialist package.",
          rationale: "Multi-package runtime graphs are unnecessary for the first usable run loop.",
        },
        {
          id: "assumption.caller-persistence",
          statement: "The external host persists immutable JSON-serializable session values.",
          rationale: "Core can remain deterministic and effect-free while runs remain restartable from caller-owned files.",
        },
      ],
      unresolvedDecisions: [
        {
          id: "decision.operation-shape",
          question: "What is the smallest public operation set for session creation, inspection, handoff acceptance, routing, and closeout?",
          owner: "codex.main",
          blocking: false,
          proceedRationale: "Architecture specialists own a recommendation; implementation remains gated on integrated acceptance.",
        },
        {
          id: "decision.closeout-envelope",
          question: "Which closeout facts can core derive without claiming host-owned tests, merge, persistence, or memory effects?",
          owner: "codex.main",
          blocking: false,
          proceedRationale: "The architecture pass can compare bounded options before any public API is frozen.",
        },
      ],
      acceptanceCriteria: [
        {
          id: "criterion.product-run-loop",
          description: "The design gives an IDE one clear path from an approved package to visible launch, fan-in, integration, and closeout instructions.",
          evidenceRequirements: [
            {
              id: "evidence.product-run-loop-review",
              kind: "review",
              duty: "produce",
              description: "Preserve the exact product and IDE usability review.",
              independentFromProducer: false,
            },
          ],
        },
        {
          id: "criterion.lifecycle-recovery",
          description: "The design has deterministic monotonic state, explicit outcomes, safe dependency readiness, and a bounded relationship to deferred runtime corrections.",
          evidenceRequirements: [
            {
              id: "evidence.lifecycle-recovery-review",
              kind: "review",
              duty: "produce",
              description: "Preserve the exact lifecycle and recovery review.",
              independentFromProducer: false,
            },
          ],
        },
        {
          id: "criterion.authority-portability",
          description: "The design preserves exact package and handoff identity, least authority, caller persistence, and IDE/provider neutrality without claiming runtime effects.",
          evidenceRequirements: [
            {
              id: "evidence.authority-portability-review",
              kind: "review",
              duty: "produce",
              description: "Preserve the exact authority, security, and portability review.",
              independentFromProducer: false,
            },
          ],
        },
        {
          id: "criterion.integrated-architecture",
          description: "One implementation-ready decision maps operations, state, routes, tests, deferred behavior, and work units to V12 AC1-AC9.",
          evidenceRequirements: [
            {
              id: "evidence.integrated-architecture",
              kind: "review",
              duty: "produce",
              description: "Preserve the integrated architecture decision brief.",
              independentFromProducer: false,
            },
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: [
          "review.product-run-loop",
          "review.lifecycle-recovery",
          "review.authority-portability",
          "architecture.synthesize-run-loop",
        ],
        allowedCapabilities: [
          "analyze.ide-product-flow",
          "analyze.monotonic-lifecycle",
          "audit.authority-portability",
          "synthesize.run-loop-architecture",
        ],
        permissionCeiling: [{ kind: "filesystem.read", scopes: allPaths }],
        forbiddenEffects: [
          "Do not write files, run tests, access the network, launch descendants, change Git state, or claim that core performs host effects.",
        ],
        maxAgents: 4,
        maxConcurrency: 3,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        unit({
          id: ANALYZE_PRODUCT,
          objective:
            "Define the smallest V12 behavior and one-message IDE experience that makes an approved V11 specialist package usable without hiding host responsibilities.",
          weight: 6,
          moduleId: "review.product-run-loop",
          action:
            "Trace the developer and IDE journey, identify indispensable artifacts and decisions, reject ceremony, and return testable product/API recommendations mapped to AC1-AC9.",
          inputType: "FrozenV12Intent",
          outputType: "ProductRunLoopReview",
          capability: "analyze.ide-product-flow",
          sourceIds: productSourceIds,
          sourcePaths: paths(...productSourceIds),
          evidenceId: "evidence.product-run-loop-review",
          artifact: "product-run-loop-review.md",
        }),
        unit({
          id: ANALYZE_LIFECYCLE,
          objective:
            "Design a deterministic monotonic session lifecycle over the fixed V11 package DAG and separate it rigorously from the deferred universal scheduler.",
          weight: 7,
          moduleId: "review.lifecycle-recovery",
          action:
            "Map states, transitions, non-pass routes, dependency readiness, serialization, replay, and failure boundaries against every relevant Round-4 correction; identify mandatory versus deferred behavior.",
          inputType: "FrozenV12Intent",
          outputType: "LifecycleRecoveryReview",
          capability: "analyze.monotonic-lifecycle",
          sourceIds: lifecycleSourceIds,
          sourcePaths: paths(...lifecycleSourceIds),
          evidenceId: "evidence.lifecycle-recovery-review",
          artifact: "lifecycle-recovery-review.md",
        }),
        unit({
          id: ANALYZE_AUTHORITY,
          objective:
            "Audit the proposed V12 layer for exact identity, least authority, immutable caller persistence, security, public API truth, and IDE/provider portability.",
          weight: 7,
          moduleId: "review.authority-portability",
          action:
            "Define trust inputs and outputs, reject confused-deputy and stale-evidence paths, enumerate forbidden host claims, and return concrete schema/API/test obligations mapped to AC1-AC9.",
          inputType: "FrozenV12Intent",
          outputType: "AuthorityPortabilityReview",
          capability: "audit.authority-portability",
          sourceIds: authoritySourceIds,
          sourcePaths: paths(...authoritySourceIds),
          evidenceId: "evidence.authority-portability-review",
          artifact: "authority-portability-review.md",
        }),
        unit({
          id: INTEGRATE_ARCHITECTURE,
          objective:
            "Synthesize the three verified reviews into one bounded implementation-ready V12 architecture and work decomposition.",
          weight: 5,
          moduleId: "architecture.synthesize-run-loop",
          action:
            "Reconcile product, lifecycle, and authority evidence; produce exact operation boundaries, state and routing model, artifact flow, deferred list, acceptance mapping, implementation units, and stop conditions.",
          inputType: "VerifiedArchitectureReviews",
          outputType: "RunLoopArchitectureDecision",
          dependencies: [ANALYZE_PRODUCT, ANALYZE_LIFECYCLE, ANALYZE_AUTHORITY],
          capability: "synthesize.run-loop-architecture",
          sourceIds: integrationSourceIds,
          sourcePaths: paths(...integrationSourceIds),
          evidenceId: "evidence.integrated-architecture",
          artifact: "v12-run-loop-architecture.md",
        }),
      ],
    },
  };
}

async function prepare() {
  await freezeInputs();
  const request = requestFor(await bindSources());
  await writeJson(join(EVIDENCE, "request.json"), request);
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "goal-contract-prepared",
        goalId: request.goal.id,
        revision: request.goal.revision,
        criteria: request.goal.acceptanceCriteria.length,
        workUnits: request.goal.workUnits.map((workUnit) => workUnit.id),
        contextSources: request.goal.contextSources.length,
        maxAgents: request.goal.authority.maxAgents,
        maxConcurrency: request.goal.authority.maxConcurrency,
      },
      null,
      2,
    )}\n`,
  );
}

async function compile() {
  const request = JSON.parse(await readFile(join(EVIDENCE, "request.json"), "utf8"));
  const compilation = requireValue(compileAgentBlueprints(request), "Architecture compilation");
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Architecture package rendering",
  );
  await mkdir(PACKAGE_DIR, { recursive: true });
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(EVIDENCE, "package-envelope.json"), specialistPackage);
  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    search: compilation.search,
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    retainedAlternatives: compilation.alternatives,
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    launchWaves: specialistPackage.manifest.launchWaves,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      digest: blueprint.digest,
      workUnitIds: blueprint.workUnitIds,
      dependencyAgentIds: blueprint.dependencyAgentIds,
      contractFile: specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === blueprint.id,
      )?.contractFile,
    })),
    packageVerified: false,
    runtimeInvoked: false,
  };
  await writeJson(join(EVIDENCE, "compilation-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const request = JSON.parse(await readFile(join(EVIDENCE, "request.json"), "utf8"));
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  if (
    typeof specialistPackage.compilationDigest !== "string" ||
    typeof specialistPackage.packageDigest !== "string"
  ) {
    throw new Error("Rendered package envelope is missing its digest pair.");
  }
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  const approval = {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    approvedBy: "repository-owner-via-main-agent",
    approvalBasis:
      "The owner explicitly approved proceeding with V12 dogfood; the main agent separately reviewed this exact deterministic roster before launch.",
    expectation,
  };
  await writeJson(join(EVIDENCE, "approval.json"), approval);
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Approval-bound architecture package verification",
  );
  const summaryPath = join(EVIDENCE, "compilation-summary.json");
  const summary = JSON.parse(await readFile(summaryPath, "utf8"));
  summary.packageVerified = true;
  await writeJson(summaryPath, summary);
  process.stdout.write(
    `${JSON.stringify({ outcome: "pass", stage: "package-approved", ...expectation }, null, 2)}\n`,
  );
}

if (mode === "prepare") {
  await prepare();
} else if (mode === "compile") {
  await compile();
} else if (mode === "approve") {
  await approve();
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
