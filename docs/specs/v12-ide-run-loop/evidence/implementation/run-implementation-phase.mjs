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
const phase = process.argv[2] ?? "foundation";
const mode = process.argv[3] ?? "prepare";
const checkpoint = process.argv[4];
const PHASE_DIR = join(EVIDENCE, phase);
const INPUTS = join(PHASE_DIR, "inputs");
const PACKAGE_DIR = join(PHASE_DIR, "package");

const SNAPSHOTS = [
  {
    id: "context.v12-spec",
    source: "docs/specs/v12-ide-run-loop/spec.md",
    target: "spec.md",
    description: "Frozen V12 feature specification.",
  },
  {
    id: "context.run-contract",
    source: "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
    target: "specialist-run-contract.md",
    description: "Frozen normative Specialist Run contract.",
  },
  {
    id: "context.adr-0005",
    source: "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
    target: "adr-0005.md",
    description: "Accepted immutable Specialist Run Session decision.",
  },
  {
    id: "context.test-plan",
    source: "docs/specs/v12-ide-run-loop/test-plan.md",
    target: "test-plan.md",
    description: "Frozen V12 verification obligations.",
  },
];

const REPOSITORY_SOURCES = {
  "context.specialist-types": [
    "src/specialist-types.ts",
    "Existing V11 compiler, package, and handoff types.",
  ],
  "context.specialist-handoff": [
    "src/specialist-handoff.ts",
    "Existing package-bound raw handoff and fan-in implementation.",
  ],
  "context.specialist-render": [
    "src/specialist-render.ts",
    "Existing rendered package verification and manifest resolution.",
  ],
  "context.canonical-json": [
    "src/canonical-json.ts",
    "Existing bounded canonical JSON and framed digest primitives.",
  ],
  "context.json-parser": [
    "src/json.ts",
    "Existing duplicate-aware bounded raw JSON parser.",
  ],
  "context.snapshot": [
    "src/snapshot.ts",
    "Existing defensive JSON snapshot and deep-freeze boundary.",
  ],
  "context.privacy": [
    "src/privacy.ts",
    "Existing high-confidence secret detection.",
  ],
  "context.text": [
    "src/text.ts",
    "Existing control-character and Unicode checks.",
  ],
  "context.model": ["src/model.ts", "Existing closed JSON model types."],
  "context.constants": ["src/constants.ts", "Existing public kernel constants and limits."],
  "context.diagnostics": [
    "src/diagnostics.ts",
    "Existing diagnostic registry and stable operation result helpers.",
  ],
  "context.index": ["src/index.ts", "Existing public package export surface."],
  "context.package": ["package.json", "Existing package scripts and export map."],
  "context.specialist-schema-code": [
    "src/specialist-schema.ts",
    "Existing Specialist Compiler schema validator pattern.",
  ],
  "context.specialist-schema-json": [
    "schemas/v1alpha1/specialist-compiler.schema.json",
    "Existing closed Specialist Compiler schema pattern.",
  ],
  "context.handoff-schema-code": [
    "src/specialist-handoff-schema.ts",
    "Existing Specialist Handoff schema validator pattern.",
  ],
  "context.handoff-schema-json": [
    "schemas/v1alpha1/specialist-handoff.schema.json",
    "Existing closed Specialist Handoff schema pattern.",
  ],
  "context.handoff-tests": [
    "test/specialist-handoff.test.mjs",
    "Existing adversarial package and handoff tests.",
  ],
  "context.compiler-tests": [
    "test/specialist-compiler.test.mjs",
    "Existing package construction and verification fixtures.",
  ],
  "context.packed-host": [
    "scripts/fixtures/packed-consumer-host.ts",
    "Installed-consumer TypeScript host fixture.",
  ],
  "context.packed-check": [
    "scripts/check-packed-consumer.mjs",
    "Installed-package export and runtime verification.",
  ],
  "context.schema-readme": [
    "schemas/v1alpha1/README.md",
    "Published schema catalog and semantics.",
  ],
  "context.ide-guide": [
    "docs/ide/specialist-agent-kickoff.md",
    "Current visible IDE specialist workflow.",
  ],
  "context.modules-readme": [
    "docs/modules/README.md",
    "Current module catalog guidance.",
  ],
  "context.readme": ["README.md", "Current concise public product surface."],
  "context.run-types": [
    "src/specialist-run-types.ts",
    "Frozen V12 run-session wire and public types.",
  ],
  "context.run-schema-code": [
    "src/specialist-run-schema.ts",
    "Frozen V12 run-session schema validator.",
  ],
  "context.run-schema-json": [
    "schemas/v1alpha1/specialist-run.schema.json",
    "Frozen V12 run-session JSON Schema.",
  ],
  "context.run-session": [
    "src/specialist-run-session.ts",
    "Frozen V12 session creation, restoration, and validation foundation.",
  ],
  "context.run-transition": [
    "src/specialist-run-transition.ts",
    "V12 handoff transition implementation.",
  ],
  "context.run-inspection": [
    "src/specialist-run-inspection.ts",
    "V12 deterministic inspection implementation.",
  ],
  "context.transition-tests": [
    "test/specialist-run-transition.test.mjs",
    "Focused V12 transition tests.",
  ],
  "context.inspection-tests": [
    "test/specialist-run-inspection.test.mjs",
    "Focused V12 inspection tests.",
  ],
};

const FOUNDATION_WRITES = [
  "schemas/v1alpha1/specialist-run.schema.json",
  "src/constants.ts",
  "src/diagnostics.ts",
  "src/specialist-run-schema.ts",
  "src/specialist-run-session.ts",
  "src/specialist-run-types.ts",
];

const TRANSITION_WRITES = [
  "src/specialist-run-transition.ts",
  "test/specialist-run-transition.test.mjs",
];

const INSPECTION_WRITES = [
  "src/specialist-run-inspection.ts",
  "test/specialist-run-inspection.test.mjs",
];

const PUBLIC_WRITES = [
  "package.json",
  "schemas/v1alpha1/README.md",
  "scripts/check-packed-consumer.mjs",
  "scripts/fixtures/packed-consumer-host.ts",
  "src/index.ts",
];

const VERIFICATION_WRITES = [
  "test/specialist-run-schema.test.mjs",
  "test/specialist-run.test.mjs",
];

const DOGFOOD_WRITES = [
  "docs/ide/specialist-agent-kickoff.md",
  "docs/modules/README.md",
  "docs/modules/specialist-run-session.md",
  "scripts/run-v12-dogfood.mjs",
];

const CONFIGS = {
  foundation: {
    objective:
      "Implement the source-preserving Specialist Run foundation exactly as frozen in ADR 0005 and the V12 normative contract.",
    maxAgents: 1,
    maxConcurrency: 1,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.specialist-types",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.canonical-json",
      "context.json-parser",
      "context.snapshot",
      "context.privacy",
      "context.text",
      "context.model",
      "context.constants",
      "context.diagnostics",
      "context.specialist-schema-code",
      "context.specialist-schema-json",
      "context.handoff-schema-code",
      "context.handoff-schema-json",
      "context.handoff-tests",
      "context.compiler-tests",
      "context.package",
    ],
    workUnits: [
      {
        id: "implement.foundation",
        objective:
          "Add the closed types, schema, limits, diagnostics, defensive validator, create operation, and raw restore operation for SpecialistRunSession.",
        weight: 13,
        moduleId: "implementation.run-session-foundation",
        action:
          "Implement only the frozen wire contract and create/restore semantics by composing V11 package, parser, snapshot, privacy, and digest primitives; add focused foundation coverage without widening host claims.",
        inputType: "FrozenSpecialistRunContract",
        outputType: "RunSessionFoundation",
        capability: "implement.source-preserving-session",
        evidenceId: "evidence.foundation-implementation",
        evidenceDescription:
          "Provide focused build and foundation conformance evidence mapped to AC1 and AC6.",
        artifact: "foundation-implementation.md",
        writes: FOUNDATION_WRITES,
      },
    ],
  },
  parallel: {
    objective:
      "Implement exact Specialist Run handoff transitions and deterministic inspection in parallel over the frozen foundation.",
    maxAgents: 2,
    maxConcurrency: 2,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.specialist-types",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.canonical-json",
      "context.snapshot",
      "context.constants",
      "context.diagnostics",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.handoff-tests",
      "context.compiler-tests",
    ],
    workUnits: [
      {
        id: "implement.handoff-transition",
        objective:
          "Implement monotonic handoff recording, exact replay, conflict rejection, dependency gates, terminal non-pass routing, and unchanged-state failure.",
        weight: 7,
        moduleId: "implementation.run-handoff-transition",
        action:
          "Compose V11 handoff verification with the frozen session validator and add the complete transition matrix for AC3 and AC4.",
        inputType: "VerifiedRunSessionFoundation",
        outputType: "RunHandoffTransition",
        capability: "implement.monotonic-transition",
        evidenceId: "evidence.transition-implementation",
        evidenceDescription:
          "Provide transition, replay, routing, diagnostic precedence, and immutability evidence for AC3 and AC4.",
        artifact: "handoff-transition-implementation.md",
        writes: TRANSITION_WRITES,
      },
      {
        id: "implement.session-inspection",
        objective:
          "Implement every-agent status, manifest-resolved dependency eligibility, accepted evidence, routes, complete-roster readiness, and closed next actions.",
        weight: 7,
        moduleId: "implementation.run-session-inspection",
        action:
          "Derive the closed inspection from the frozen package DAG and accepted handoffs, add DAG and differential readiness coverage, and preserve the external-host boundary for AC2 and AC5.",
        inputType: "VerifiedRunSessionFoundation",
        outputType: "RunSessionInspection",
        capability: "implement.deterministic-inspection",
        evidenceId: "evidence.inspection-implementation",
        evidenceDescription:
          "Provide DAG status, manifest resolution, evidence binding, and complete-roster readiness evidence for AC2 and AC5.",
        artifact: "session-inspection-implementation.md",
        writes: INSPECTION_WRITES,
      },
    ],
  },
  public: {
    objective:
      "Integrate the accepted Specialist Run implementation into the additive public package surface without changing V11 identities.",
    maxAgents: 1,
    maxConcurrency: 1,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.constants",
      "context.diagnostics",
      "context.index",
      "context.package",
      "context.schema-readme",
      "context.packed-host",
      "context.packed-check",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.run-transition",
      "context.run-inspection",
      "context.transition-tests",
      "context.inspection-tests",
    ],
    workUnits: [
      {
        id: "integrate.public-surface",
        objective:
          "Export the four operations, constants, and closed types; publish the schema path; and prove clean installed-consumer use.",
        weight: 6,
        moduleId: "integration.run-public-surface",
        action:
          "Update only the additive export, package, schema catalog, and packed-consumer surfaces; retain every V11 export and add the V12 dogfood command without implementing host effects.",
        inputType: "VerifiedRunImplementation",
        outputType: "IntegratedRunPublicSurface",
        capability: "integrate.public-package-surface",
        evidenceId: "evidence.public-integration",
        evidenceDescription:
          "Provide declaration, schema export, packed-consumer, and V11 compatibility evidence for AC6 and AC9.",
        artifact: "public-surface-integration.md",
        writes: PUBLIC_WRITES,
      },
    ],
  },
  verification: {
    objective:
      "Complete independent V12 adversarial verification and the visible IDE dogfood surface over the frozen public candidate.",
    maxAgents: 2,
    maxConcurrency: 2,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.package",
      "context.index",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.run-transition",
      "context.run-inspection",
      "context.transition-tests",
      "context.inspection-tests",
      "context.handoff-tests",
      "context.compiler-tests",
      "context.packed-host",
      "context.packed-check",
      "context.ide-guide",
      "context.modules-readme",
      "context.readme",
    ],
    workUnits: [
      {
        id: "verify.run-session",
        objective:
          "Independently attack the complete V12 contract, schema, transitions, inspection, limits, authority boundary, and public surface.",
        weight: 9,
        moduleId: "verification.run-session",
        action:
          "Add adversarial, boundary, permutation, fresh-process, differential, public-export, and compatibility tests without repairing production code.",
        inputType: "FrozenRunReleaseCandidate",
        outputType: "RunSessionVerification",
        capability: "verify.adversarial-run-session",
        evidenceId: "evidence.run-verification",
        evidenceDescription:
          "Provide independent negative, boundary, lifecycle, schema, and package-consumer evidence for AC1-AC6 and AC9.",
        artifact: "run-session-verification.md",
        writes: VERIFICATION_WRITES,
      },
      {
        id: "dogfood.ide-run-loop",
        objective:
          "Make the four-operation IDE journey visible and dogfoodable without hiding external host responsibilities.",
        weight: 6,
        moduleId: "dogfood.ide-run-loop",
        action:
          "Add a deterministic V12 dogfood script and concise module/IDE guidance that shows goal review, package approval, dependency eligibility, exact fan-in, routing, and separate integration closeout.",
        inputType: "FrozenRunReleaseCandidate",
        outputType: "IdeRunLoopDogfood",
        capability: "document.dogfood-ide-run-loop",
        evidenceId: "evidence.ide-dogfood",
        evidenceDescription:
          "Provide a replayable IDE journey and measured host-boundary evidence for AC7 and AC8.",
        artifact: "ide-run-loop-dogfood.md",
        writes: DOGFOOD_WRITES,
      },
    ],
  },
};

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.message}`)
      .join("\n");
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
  for (const snapshot of SNAPSHOTS) {
    await writeFile(
      join(INPUTS, snapshot.target),
      await readFile(join(ROOT, snapshot.source)),
    );
  }
}

function sourceDefinitions(config) {
  const snapshotSources = SNAPSHOTS.map((snapshot) => ({
    id: snapshot.id,
    path: `docs/specs/v12-ide-run-loop/evidence/implementation/${phase}/inputs/${snapshot.target}`,
    description: snapshot.description,
  }));
  const repositorySources = config.sourceIds
    .filter((sourceId) => !SNAPSHOTS.some((snapshot) => snapshot.id === sourceId))
    .map((sourceId) => {
      const definition = REPOSITORY_SOURCES[sourceId];
      if (definition === undefined) {
        throw new Error(`Unknown source ID for ${phase}: ${sourceId}`);
      }
      return {
        id: sourceId,
        path: definition[0],
        description: definition[1],
      };
    });
  return [...snapshotSources, ...repositorySources].filter((source) =>
    config.sourceIds.includes(source.id),
  );
}

async function bindSources(config) {
  return Promise.all(
    sourceDefinitions(config).map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits: config.workUnits.map((workUnit) => workUnit.id),
        readScope: source.path,
      };
    }),
  );
}

function uses(sourceIds) {
  return sourceIds.map((sourceId) => ({
    sourceId,
    purpose: `Implement or verify the exact frozen V12 ${phase} contract.`,
  }));
}

function unit(config, definition, sourcePaths) {
  const read = [...new Set([...sourcePaths, ...definition.writes])].sort();
  const write = [...definition.writes].sort();
  return {
    id: definition.id,
    objective: definition.objective,
    weight: definition.weight,
    module: {
      id: definition.moduleId,
      action: definition.action,
      inputPorts: [{ name: "input", artifactType: definition.inputType }],
      outputPorts: [{ name: "output", artifactType: definition.outputType }],
    },
    dependencies: [],
    requiredCapabilities: [definition.capability],
    contextUses: uses(config.sourceIds),
    scope: { read, write, conflictZones: write },
    permissions: [
      { kind: "filesystem.read", scopes: read },
      { kind: "filesystem.write", scopes: write },
      { kind: "process.spawn", scopes: ["node", "npm"] },
    ],
    evidenceRequirementIds: [definition.evidenceId],
    handoffArtifacts: [definition.artifact],
    stopConditions: [
      "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
      "Write only the exact declared write scope; do not change Git state, use the network, launch descendants, or widen the public contract.",
      "Run only local focused verification allowed by the contract and report every failing command truthfully.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(config, contextSources) {
  const sourcePaths = contextSources.map((source) => source.readScope).sort();
  const allWrites = [...new Set(config.workUnits.flatMap((workUnit) => workUnit.writes))].sort();
  const allowedModules = config.workUnits.map((workUnit) => workUnit.moduleId).sort();
  const allowedCapabilities = config.workUnits
    .map((workUnit) => workUnit.capability)
    .sort();
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: `v12.ide-run-loop.implementation.${phase}`,
      revision: 1,
      objective: config.objective,
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.architecture-frozen",
          statement: "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
          rationale: "Architecture fan-in passed and no blocking decision remains.",
        },
        {
          id: "assumption.host-effects-external",
          statement: "All runtime, persistence, Git, merge, and memory effects remain external to core.",
          rationale: "V12 is a pure evidence session, not the deferred universal scheduler.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: config.workUnits.map((workUnit) => ({
        id: `criterion.${workUnit.id}`,
        description: workUnit.objective,
        evidenceRequirements: [
          {
            id: workUnit.evidenceId,
            kind: workUnit.id.startsWith("verify.") ? "test" : "review",
            duty: "produce",
            description: workUnit.evidenceDescription,
            independentFromProducer: false,
          },
        ],
      })),
      contextSources,
      authority: {
        allowedModules,
        allowedCapabilities,
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [...new Set([...sourcePaths, ...allWrites])].sort() },
          { kind: "filesystem.write", scopes: allWrites },
          { kind: "process.spawn", scopes: ["node", "npm"] },
        ],
        forbiddenEffects: [
          "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects.",
        ],
        maxAgents: config.maxAgents,
        maxConcurrency: config.maxConcurrency,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: config.workUnits.map((workUnit) =>
        unit(config, workUnit, sourcePaths),
      ),
    },
  };
}

async function prepare() {
  if (typeof checkpoint !== "string" || !/^[0-9a-f]{40}$/.test(checkpoint)) {
    throw new Error("prepare requires the exact 40-character Git checkpoint.");
  }
  const config = CONFIGS[phase];
  if (config === undefined) {
    throw new Error(`Unknown implementation phase: ${phase}`);
  }
  await freezeInputs();
  const request = requestFor(config, await bindSources(config));
  await writeJson(join(PHASE_DIR, "request.json"), request);
  await writeJson(join(PHASE_DIR, "phase-metadata.json"), {
    phase,
    checkpoint,
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    runtimeInvoked: false,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "goal-contract-prepared",
        phase,
        checkpoint,
        goalId: request.goal.id,
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
  const request = JSON.parse(
    await readFile(join(PHASE_DIR, "request.json"), "utf8"),
  );
  const compilation = requireValue(
    compileAgentBlueprints(request),
    `${phase} compilation`,
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    `${phase} package rendering`,
  );
  await mkdir(PACKAGE_DIR, { recursive: true });
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(PHASE_DIR, "package-envelope.json"), specialistPackage);
  const summary = {
    phase,
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
      digest: blueprint.contentDigest,
      workUnitIds: blueprint.workUnitIds,
      dependencyAgentIds: blueprint.dependencies,
      contractFile: specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === blueprint.id,
      )?.contractFile,
    })),
    packageVerified: false,
    runtimeInvoked: false,
  };
  await writeJson(join(PHASE_DIR, "compilation-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const request = JSON.parse(
    await readFile(join(PHASE_DIR, "request.json"), "utf8"),
  );
  const specialistPackage = JSON.parse(
    await readFile(join(PHASE_DIR, "package-envelope.json"), "utf8"),
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
  await writeJson(join(PHASE_DIR, "approval.json"), {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    approvedBy: "repository-owner-via-main-agent",
    approvalBasis:
      "The owner authorized V12 implementation and the integration owner reviewed this exact phase contract, deterministic roster, authority, and digest pair before launch.",
    expectation,
  });
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    `approval-bound ${phase} package verification`,
  );
  const summaryPath = join(PHASE_DIR, "compilation-summary.json");
  const summary = JSON.parse(await readFile(summaryPath, "utf8"));
  summary.packageVerified = true;
  await writeJson(summaryPath, summary);
  process.stdout.write(
    `${JSON.stringify(
      { outcome: "pass", stage: "package-approved", phase, ...expectation },
      null,
      2,
    )}\n`,
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
