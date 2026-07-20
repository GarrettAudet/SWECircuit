import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LOCAL_STATE_ROOT = join(ROOT, ".local");
const NPM_CACHE = join(ROOT, ".local", "npm-cache");
const CONSUMER_WORKSPACE_PREFIX = join(NPM_CACHE, "swecircuit-packed-consumer-");
const NPM_EXEC_PATH = process.env.npm_execpath;
assert.equal(typeof NPM_EXEC_PATH, "string", "Run the packed-consumer check through npm.");
assert.notEqual(NPM_EXEC_PATH.length, 0, "npm_execpath must identify npm's JavaScript entrypoint.");
const REQUIRED_PACKED_FILES = Object.freeze([
  "dist/execution.d.ts",
  "dist/index.d.ts",
  "dist/index.js",
  "dist/specialist-compiler.d.ts",
  "dist/specialist-handoff.d.ts",
  "dist/specialist-render.d.ts",
  "dist/specialist-run-inspection.d.ts",
  "dist/specialist-run-session.d.ts",
  "dist/specialist-run-transition.d.ts",
  "dist/specialist-run-types.d.ts",
  "dist/specialist-types.d.ts",
  "docs/framework/executor-boundary.md",
  "package.json",
  "schemas/v1alpha1/common.schema.json",
  "schemas/v1alpha1/project.schema.json",
  "schemas/v1alpha1/run-event.schema.json",
  "schemas/v1alpha1/specialist-compiler.schema.json",
  "schemas/v1alpha1/specialist-handoff.schema.json",
  "schemas/v1alpha1/specialist-run.schema.json",
]);
const FORBIDDEN_PACKED_FILES = new Set([".npmrc"]);
const FORBIDDEN_PACKED_PREFIXES = Object.freeze(["scripts/", "src/", "test/"]);
const RETAINED_SPECIALIST_EXPECTATION = Object.freeze({
  compilationDigest: "sha256:92881440b8d0b58de756bd706631ed4481565b20fd3cadad669637006b157659",
  packageDigest: "sha256:913c04c71beaef362e81a1859f740587e2cf0017a83585d5c6468cbda2e84a43",
});

const CONSUMER_PROGRAM = String.raw`
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Ajv2020 } from "ajv/dist/2020.js";
import {
  analyzeSpecialistCandidates,
  assessSpecialistHandoffs,
  SPECIALIST_API_VERSION,
  SPECIALIST_KINDS,
  SPECIALIST_LIMITS,
  SPECIALIST_RUN_API_VERSION,
  SPECIALIST_RUN_KINDS,
  SPECIALIST_RUN_LIMITS,
  compileAgentBlueprints,
  createDeterministicTestExecutor,
  createSpecialistRunSession,
  createToolchainProbe,
  deriveTaskAuthorityProjection,
  executeWorkPacket,
  initializeProject,
  inspectSpecialistRunSession,
  inspectTrace,
  recordSpecialistRunHandoff,
  renderSpecialistPackage,
  restoreSpecialistRunSession,
  TOOLCHAIN,
  verifySpecialistPackage,
  verifySpecialistHandoff,
  validateProject,
} from "swecircuit";

const consumerRoot = process.cwd();
const projectRoot = process.argv[2];
assert.equal(typeof projectRoot, "string");
const retainedSpecialistExpectationText = process.argv[3];
assert.equal(typeof retainedSpecialistExpectationText, "string");
const retainedSpecialistExpectation = Object.freeze(JSON.parse(retainedSpecialistExpectationText));
assert.deepEqual(Object.keys(retainedSpecialistExpectation).sort(), [
  "compilationDigest",
  "packageDigest",
]);

const installedEntry = realpathSync(fileURLToPath(import.meta.resolve("swecircuit")));
const installedPackage = realpathSync(join(consumerRoot, "node_modules", "swecircuit"));
const entryRelativeToPackage = relative(installedPackage, installedEntry);
assert.equal(isAbsolute(entryRelativeToPackage), false);
assert.notEqual(entryRelativeToPackage, "..");
assert.equal(entryRelativeToPackage.startsWith("../"), false);
assert.equal(entryRelativeToPackage.startsWith("..\\"), false);
assert.equal(existsSync(join(installedPackage, "dist", "index.js")), true);
assert.equal(existsSync(join(installedPackage, "docs", "framework", "executor-boundary.md")), true);
assert.equal(existsSync(join(installedPackage, "schemas", "v1alpha1", "project.schema.json")), true);
assert.equal(
  existsSync(join(installedPackage, "schemas", "v1alpha1", "specialist-compiler.schema.json")),
  true,
);
assert.equal(
  existsSync(join(installedPackage, "schemas", "v1alpha1", "specialist-handoff.schema.json")),
  true,
);
assert.equal(
  existsSync(join(installedPackage, "schemas", "v1alpha1", "specialist-run.schema.json")),
  true,
);
assert.equal(existsSync(join(installedPackage, "src")), false);

const commonSchemaPath = realpathSync(
  fileURLToPath(import.meta.resolve("swecircuit/schemas/common.schema.json")),
);
assert.equal(
  relative(installedPackage, commonSchemaPath).replaceAll("\\", "/"),
  "schemas/v1alpha1/common.schema.json",
);
const commonSchema = JSON.parse(readFileSync(commonSchemaPath, "utf8"));
assert.equal(
  commonSchema.$id,
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/common.schema.json",
);
const specialistSchemaPath = realpathSync(
  fileURLToPath(import.meta.resolve("swecircuit/schemas/specialist-compiler.schema.json")),
);
assert.equal(
  relative(installedPackage, specialistSchemaPath).replaceAll("\\", "/"),
  "schemas/v1alpha1/specialist-compiler.schema.json",
);
const specialistSchema = JSON.parse(readFileSync(specialistSchemaPath, "utf8"));
assert.equal(
  specialistSchema.$id,
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-compiler.schema.json",
);
const handoffSchemaPath = realpathSync(
  fileURLToPath(import.meta.resolve("swecircuit/schemas/specialist-handoff.schema.json")),
);
assert.equal(
  relative(installedPackage, handoffSchemaPath).replaceAll("\\", "/"),
  "schemas/v1alpha1/specialist-handoff.schema.json",
);
const handoffSchema = JSON.parse(readFileSync(handoffSchemaPath, "utf8"));
assert.equal(
  handoffSchema.$id,
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-handoff.schema.json",
);
const specialistRunSchemaPath = realpathSync(
  fileURLToPath(import.meta.resolve("swecircuit/schemas/specialist-run.schema.json")),
);
assert.equal(
  relative(installedPackage, specialistRunSchemaPath).replaceAll("\\", "/"),
  "schemas/v1alpha1/specialist-run.schema.json",
);
const specialistRunSchema = JSON.parse(readFileSync(specialistRunSchemaPath, "utf8"));
assert.equal(
  specialistRunSchema.$id,
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-run.schema.json",
);
const specialistSchemaRegistry = new Ajv2020({
  allErrors: true,
  strict: true,
  validateFormats: false,
});
specialistSchemaRegistry.addSchema(commonSchema);
specialistSchemaRegistry.addSchema(specialistSchema);
specialistSchemaRegistry.addSchema(handoffSchema);
specialistSchemaRegistry.addSchema(specialistRunSchema);
for (const schema of [specialistSchema, handoffSchema, specialistRunSchema]) {
  assert.equal(typeof specialistSchemaRegistry.getSchema(schema.$id), "function");
  for (const definition of Object.keys(schema.$defs)) {
    assert.doesNotThrow(() =>
      specialistSchemaRegistry.compile({ $ref: schema.$id + "#/$defs/" + definition }),
    );
  }
}

mkdirSync(projectRoot);
const initialized = initializeProject({ project: projectRoot, projectId: "clean-consumer" });
assert.equal(initialized.ok, true, JSON.stringify(initialized.diagnostics));
assert.equal(initialized.value?.projectId, "clean-consumer");

const validated = validateProject({ project: projectRoot });
assert.equal(validated.ok, true, JSON.stringify(validated.diagnostics));
assert.equal(validated.value?.projectId, "clean-consumer");

const traceDirectory = join(projectRoot, "traces");
mkdirSync(traceDirectory);
const trace = [
  {
    apiVersion: "swecircuit/v1alpha1",
    kind: "RunEvent",
    metadata: { id: "consumer-started" },
    spec: {
      type: "run.started",
      eventTypeVersion: "1.0.0",
      runId: "consumer-run",
      sequence: 0,
      correlationId: "consumer-check",
      actor: "consumer",
    },
  },
  {
    apiVersion: "swecircuit/v1alpha1",
    kind: "RunEvent",
    metadata: { id: "consumer-completed" },
    spec: {
      type: "run.completed",
      eventTypeVersion: "1.0.0",
      runId: "consumer-run",
      sequence: 1,
      correlationId: "consumer-check",
      causationId: "consumer-started",
      actor: "consumer",
    },
  },
];
writeFileSync(
  join(traceDirectory, "consumer.jsonl"),
  trace.map((event) => JSON.stringify(event)).join("\n") + "\n",
  "utf8",
);

const inspected = inspectTrace({ project: projectRoot, trace: "traces/consumer.jsonl" });
assert.equal(inspected.ok, true, JSON.stringify(inspected.diagnostics));
assert.equal(inspected.value?.eventCount, 2);
assert.equal(inspected.value?.runs.length, 1);
assert.equal(inspected.value?.runs[0]?.hasCompletedEvent, true);

const executionPacket = {
  apiVersion: "swecircuit/v1alpha1",
  kind: "WorkPacket",
  metadata: {
    id: "consumer-packet",
    description: "A bounded packet executed from the installed artifact.",
  },
  spec: {
    goal: "Prove the packed execution boundary works.",
    completionEvidence: [
      {
        id: "consumer_execution",
        kind: "test",
        description: "The installed package executes and reconstructs one packet.",
        required: true,
      },
    ],
    nonGoals: ["Invoke a real provider."],
    source: {
      featurePackage: "docs/specs/consumer",
      branch: "consumer",
      baselineCommit: "0000000",
    },
    scope: {
      include: ["src/**"],
      exclude: [],
      conflictZones: [],
    },
    role: {
      capability: "Deterministic package verification.",
      owner: "consumer-agent",
    },
    dependencies: [],
    context: [
      {
        id: "consumer_spec",
        kind: "artifact",
        ref: "path:docs/specs/consumer/spec.md",
        immutable: false,
      },
    ],
    authority: {
      allowedActions: ["Read the declared source scope."],
      disallowedActions: ["Write files or spawn processes."],
      permissionCeiling: [
        {
          kind: "filesystem.read",
          scopes: ["src/**"],
        },
      ],
    },
    verification: [
      {
        id: "consumer_execution",
        kind: "test",
        description: "The installed package executes and reconstructs one packet.",
        required: true,
      },
    ],
    handoff: {
      destination: "integration-owner",
      requiredFields: [
        "summary",
        "filesChanged",
        "verificationEvidence",
        "assumptions",
        "risks",
        "followUps",
      ],
    },
    stopConditions: ["Stop when the declared boundary cannot be honored."],
  },
};
const executionManifest = {
  apiVersion: "swecircuit/v1alpha1",
  kind: "AdapterManifest",
  metadata: {
    id: "consumer.executor",
    version: "1.0.0",
    description: "A deterministic installed-package executor.",
  },
  spec: {
    adapterKind: "agent_runtime",
    compatibility: { apiVersions: ["swecircuit/v1alpha1"] },
    capabilities: ["launch_agent"],
    requestedPermissions: [
      {
        kind: "filesystem.read",
        scopes: ["src/**"],
        reason: "Read the packet's declared source scope.",
      },
    ],
    inputKinds: ["WorkPacket"],
    outputKinds: [],
    behavior: {
      health: { mode: "passive" },
      timeout: { supported: true, maximumSeconds: 10 },
      cancellation: { supported: true, acknowledged: true },
      errors: { structured: true, retryableDeclared: false },
    },
    provenance: {
      source: "https://example.invalid/consumer-executor",
      maintainer: "SWECircuit package check",
    },
  },
};
const executionGrant = {
  id: "grant.consumer",
  issuer: "integration.owner",
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  workPacket: "consumer-packet",
  executor: { id: "consumer.executor", version: "1.0.0" },
  permissions: [{ kind: "filesystem.read", scopes: ["src/**"] }],
};
const executed = await executeWorkPacket({
  workPacket: executionPacket,
  adapterManifest: executionManifest,
  grant: executionGrant,
  executor: createDeterministicTestExecutor({
    id: "consumer.executor",
    version: "1.0.0",
    settlement: {
      state: "completed",
      workflow: { stage: "implement", outcome: "pass" },
    },
  }),
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  correlationId: "consumer-check",
  policy: {
    timeoutMs: 1_000,
    abortAcknowledgementMs: 100,
  },
});
assert.equal(executed.ok, true, JSON.stringify(executed.diagnostics));
assert.equal(executed.value?.disposition, "completed");
assert.equal(executed.value?.events.length, 6);

const executionTrace = join(traceDirectory, "execution.jsonl");
writeFileSync(
  executionTrace,
  executed.value.events.map((event) => JSON.stringify(event)).join("\n") + "\n",
  "utf8",
);
const executionInspection = inspectTrace({
  project: projectRoot,
  trace: "traces/execution.jsonl",
});
assert.equal(executionInspection.ok, true, JSON.stringify(executionInspection.diagnostics));
assert.equal(executionInspection.value?.eventCount, 6);
assert.equal(executionInspection.value?.runs[0]?.attempts[0]?.state, "completed");
assert.equal(executionInspection.value?.runs[0]?.hasCompletedEvent, true);

const manifest = JSON.parse(readFileSync(join(projectRoot, "swecircuit.json"), "utf8"));
assert.equal(manifest.metadata.id, "clean-consumer");
assert.deepEqual(createToolchainProbe(), {
  duplicateKeysVisible: true,
  parsed: true,
  schemaValid: true,
});
assert.equal(TOOLCHAIN.apiVersion, "swecircuit/v1alpha1");

assert.equal(SPECIALIST_API_VERSION, "swecircuit/specialist/v1alpha1");
assert.deepEqual(SPECIALIST_KINDS, [
  "GoalContract",
  "SpecialistCompilationRequest",
  "SpecialistCandidateAnalysis",
  "TaskAuthorityProjection",
  "AgentBlueprint",
  "AgentBlueprintCompilation",
  "SpecialistAgentHandoff",
  "VerifiedSpecialistHandoff",
  "SpecialistHandoffSetAssessment",
  "SpecialistPackageManifest",
]);
assert.equal(SPECIALIST_LIMITS.exactSearchWorkUnits, 8);
assert.equal(SPECIALIST_LIMITS.agents, 16);
assert.equal(Object.isFrozen(SPECIALIST_LIMITS), true);

assert.equal(SPECIALIST_RUN_API_VERSION, "swecircuit/specialist-run/v1alpha1");
assert.deepEqual(SPECIALIST_RUN_KINDS, [
  "SpecialistRunSession",
  "SpecialistRunInspection",
]);
assert.deepEqual(SPECIALIST_RUN_LIMITS, {
  rawSessionInputBytes: 67_108_864,
  canonicalSessionBytes: 134_217_728,
  acceptedHandoffs: 16,
  rawHandoffBytes: 1_048_576,
  rawHandoffBase64Chars: 1_398_104,
  canonicalInspectionBytes: 67_108_864,
});
assert.equal(Object.isFrozen(SPECIALIST_RUN_KINDS), true);
assert.equal(Object.isFrozen(SPECIALIST_RUN_LIMITS), true);

const specialistGoal = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "GoalContract",
  id: "consumer.goal",
  revision: 1,
  objective: "Compile one provider-neutral specialist contract.",
  integrationOwner: "integration.owner",
  assumptions: [
    {
      id: "assumption.reviewed-context",
      statement: "The declared package context is current.",
      rationale: "The installed consumer binds the exact source declarations.",
    },
  ],
  unresolvedDecisions: [
    {
      id: "decision.future-adapter",
      question: "Should a later release add another host adapter?",
      owner: "integration.owner",
      blocking: false,
      proceedRationale: "No adapter is required to verify this package.",
    },
  ],
  acceptanceCriteria: [
    {
      id: "criterion.package",
      description: "The specialist package is compiled and rendered.",
      evidenceRequirements: [
        {
          id: "evidence.package",
          kind: "artifact",
          duty: "produce",
          description: "A digest-bound specialist package.",
          independentFromProducer: false,
        },
      ],
    },
  ],
  contextSources: [
    {
      id: "context.source",
      kind: "repository",
      locator: "path:src/specialist-compiler.ts",
      digest: "sha256:" + "0".repeat(64),
      bytes: 1024,
      description: "The repository compiler source.",
      allowedWorkUnits: ["compile.package"],
      readScope: "src/**",
    },
    {
      id: "context.contract",
      kind: "documentation",
      locator: "path:docs/specs/v11-specialist-compiler/spec.md",
      digest: "sha256:" + "1".repeat(64),
      bytes: 512,
      description: "The reviewed specialist contract.",
      allowedWorkUnits: ["compile.package"],
    },
  ],
  authority: {
    allowedModules: ["module.compile"],
    allowedCapabilities: ["specialist.compile"],
    permissionCeiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
    forbiddenEffects: ["Do not invoke providers or runtime executors."],
    maxAgents: 1,
    maxConcurrency: 1,
  },
  optimization: {
    agentStartupCost: 1,
    handoffCost: 1,
  },
  workUnits: [
    {
      id: "compile.package",
      objective: "Compile and render the specialist package.",
      weight: 3,
      module: {
        id: "module.compile",
        action: "Compile exact task demand into one specialist contract.",
        inputPorts: [{ name: "goal", artifactType: "GoalContract" }],
        outputPorts: [{ name: "package", artifactType: "SpecialistPackage" }],
      },
      dependencies: [],
      requiredCapabilities: ["specialist.compile"],
      contextUses: [
        { sourceId: "context.source", purpose: "Inspect the compiler boundary." },
        { sourceId: "context.contract", purpose: "Follow the reviewed contract." },
      ],
      scope: {
        read: ["src/**"],
        write: [],
        conflictZones: [],
      },
      permissions: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      evidenceRequirementIds: ["evidence.package"],
      handoffArtifacts: ["specialist.package"],
      stopConditions: ["Stop if the declared authority is insufficient."],
    },
  ],
};
const specialistRequest = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistCompilationRequest",
  goal: specialistGoal,
  proposedCandidates: [
    {
      id: "candidate.serial",
      groups: [["compile.package"]],
    },
  ],
};
const forbiddenSpecialistKeys = new Set([
  "role",
  "provider",
  "model",
  "prompt",
  "executor",
  "credential",
  "grant",
  "runtime",
  "runtimeProfile",
  "agentProfile",
  "assignment",
]);
function assertProviderNeutralKeys(value, pointer = "$") {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => assertProviderNeutralKeys(entry, pointer + "/" + index));
    return;
  }
  if (value === null || typeof value !== "object") {
    return;
  }
  for (const [key, entry] of Object.entries(value)) {
    assert.equal(
      forbiddenSpecialistKeys.has(key),
      false,
      "forbidden specialist key at " + pointer + "/" + key,
    );
    assertProviderNeutralKeys(entry, pointer + "/" + key);
  }
}

const authorityProjection = deriveTaskAuthorityProjection(specialistGoal);
assert.equal(authorityProjection.ok, true, JSON.stringify(authorityProjection.diagnostics));
assert.notEqual(authorityProjection.value, null);
assert.equal(authorityProjection.value.kind, "TaskAuthorityProjection");
assert.equal(authorityProjection.value.goalId, "consumer.goal");
assert.deepEqual(authorityProjection.value.allowedCapabilities, ["specialist.compile"]);
assert.match(authorityProjection.value.contentDigest, /^sha256:[0-9a-f]{64}$/);
assertProviderNeutralKeys(authorityProjection.value);

const specialistAnalysisResult = analyzeSpecialistCandidates(specialistRequest);
assert.equal(
  specialistAnalysisResult.ok,
  true,
  JSON.stringify(specialistAnalysisResult.diagnostics),
);
assert.notEqual(specialistAnalysisResult.value, null);
assert.equal(specialistAnalysisResult.value.selectionStatus, "selected");

const specialistCompilationResult = compileAgentBlueprints(specialistRequest);
assert.equal(
  specialistCompilationResult.ok,
  true,
  JSON.stringify(specialistCompilationResult.diagnostics),
);
assert.notEqual(specialistCompilationResult.value, null);
const specialistCompilation = specialistCompilationResult.value;
assert.equal(specialistCompilation.kind, "AgentBlueprintCompilation");
assert.equal(specialistCompilation.search.mode, "exact");
assert.equal(
  specialistCompilation.search.claim,
  "exhaustive_partition_search_fixed_scheduler",
);
assert.equal(specialistCompilation.search.workUnitCount, 1);
assert.equal(specialistCompilation.search.evaluatedCandidates, 1);
assert.equal(specialistCompilation.selected.id, specialistCompilation.serialBaseline.id);
assert.equal(
  specialistAnalysisResult.value.selected.id,
  specialistCompilation.selected.id,
);
assert.deepEqual(specialistCompilation.selectionReason, {
  kind: "serial_selected",
  decisiveField: "serial_baseline",
  selectedValue: specialistCompilation.selected.id,
  serialValue: specialistCompilation.serialBaseline.id,
  serialRejectionCodes: [],
});
assert.equal(specialistCompilation.selected.metrics.agentCount, 1);
assert.equal(specialistCompilation.blueprints.length, 1);
assert.deepEqual(specialistCompilation.blueprints[0].workUnitIds, ["compile.package"]);
assert.deepEqual(specialistCompilation.blueprints[0].authority.requiredCapabilities, [
  "specialist.compile",
]);
assert.equal(specialistCompilation.launchWaves.length, 1);
assert.deepEqual(specialistCompilation.launchWaves[0].agentIds, [
  specialistCompilation.blueprints[0].id,
]);
assert.match(specialistCompilation.contentDigest, /^sha256:[0-9a-f]{64}$/);
assertProviderNeutralKeys(specialistCompilation);

const specialistPackageResult = renderSpecialistPackage(specialistCompilation);
assert.equal(specialistPackageResult.ok, true, JSON.stringify(specialistPackageResult.diagnostics));
assert.notEqual(specialistPackageResult.value, null);
const specialistPackage = specialistPackageResult.value;
assert.equal(specialistPackage.compilationDigest, specialistCompilation.contentDigest);
assert.equal(specialistPackage.manifest.compilationDigest, specialistCompilation.contentDigest);
assert.equal(specialistPackage.manifest.agents.length, specialistCompilation.blueprints.length);
assert.equal(specialistPackage.files.length, specialistCompilation.blueprints.length + 3);
assert.equal(
  specialistPackage.files.some((file) => file.path === "manifest.json"),
  true,
);
assert.equal(
  specialistPackage.files.some((file) => file.path === "integration.md"),
  true,
);
assert.equal(
  specialistPackage.files.some((file) => file.path === "compilation.json"),
  true,
);
assert.match(specialistPackage.packageDigest, /^sha256:[0-9a-f]{64}$/);
assert.equal(specialistPackage.manifest.compilationFile, "compilation.json");
for (const file of specialistPackage.files) {
  assert.equal(file.bytes, Buffer.byteLength(file.content, "utf8"));
  assert.match(file.digest, /^sha256:[0-9a-f]{64}$/);
}
const renderedManifest = specialistPackage.files.find((file) => file.path === "manifest.json");
assert.notEqual(renderedManifest, undefined);
assert.deepEqual(JSON.parse(renderedManifest.content), specialistPackage.manifest);
const renderedCompilation = specialistPackage.files.find(
  (file) => file.path === "compilation.json",
);
assert.notEqual(renderedCompilation, undefined);
assert.deepEqual(JSON.parse(renderedCompilation.content), specialistCompilation);
const renderedIntegration = specialistPackage.files.find((file) => file.path === "integration.md");
assert.notEqual(renderedIntegration, undefined);
assert.equal(renderedIntegration.content.includes("assumption.reviewed-context"), true);
assert.equal(renderedIntegration.content.includes("decision.future-adapter"), true);
const renderedPackageIdentity = {
  compilationDigest: specialistPackage.compilationDigest,
  packageDigest: specialistPackage.packageDigest,
};
assert.deepEqual(
  renderedPackageIdentity,
  retainedSpecialistExpectation,
  "The retained approval must be updated independently. Rendered identity: " +
    JSON.stringify(renderedPackageIdentity),
);
const specialistVerification = verifySpecialistPackage(
  specialistPackage,
  retainedSpecialistExpectation,
);
assert.equal(specialistVerification.ok, true, JSON.stringify(specialistVerification.diagnostics));
assert.deepEqual(specialistVerification.value, specialistPackage);
const specialistBlueprint = specialistCompilation.blueprints[0];
assert.notEqual(specialistBlueprint, undefined);
assert.ok(specialistBlueprint.handoff.artifacts.length > 0);
function expectedHandoffMediaType(name) {
  if (name.endsWith(".json")) return "application/json";
  if (name.endsWith(".md")) return "text/markdown";
  return "text/plain";
}
const specialistHandoff = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistAgentHandoff",
  outcome: "pass",
  destination: specialistBlueprint.handoff.destination,
  goal: {
    id: specialistCompilation.goal.id,
    revision: specialistCompilation.goal.revision,
    digest: specialistCompilation.goalDigest,
  },
  agent: {
    id: specialistBlueprint.id,
    blueprintDigest: specialistBlueprint.contentDigest,
  },
  compilationDigest: specialistCompilation.contentDigest,
  summary: "The installed-package specialist contract completed.",
  workUnitsCompleted: [...specialistBlueprint.workUnitIds],
  artifacts: specialistBlueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: expectedHandoffMediaType(name),
    content: "{}",
  })),
  evidence: specialistBlueprint.evidenceDuties.map((duty, index) => ({
    criterionId: duty.criterionId,
    requirementId: duty.requirementId,
    kind: duty.kind,
    duty: duty.duty,
    status: "pass",
    artifact:
      specialistBlueprint.handoff.artifacts[
        index % specialistBlueprint.handoff.artifacts.length
      ],
  })),
  assumptions: [],
  risks: [],
  followUps: [],
};
const rawSpecialistHandoff = new TextEncoder().encode(JSON.stringify(specialistHandoff));
const specialistHandoffVerification = verifySpecialistHandoff(
  specialistPackage,
  retainedSpecialistExpectation,
  rawSpecialistHandoff,
);
assert.equal(
  specialistHandoffVerification.ok,
  true,
  JSON.stringify(specialistHandoffVerification.diagnostics),
);
assert.notEqual(specialistHandoffVerification.value, null);

const specialistRunCreation = createSpecialistRunSession(
  specialistPackage,
  retainedSpecialistExpectation,
);
assert.equal(specialistRunCreation.ok, true, JSON.stringify(specialistRunCreation.diagnostics));
assert.notEqual(specialistRunCreation.value, null);
const specialistRunSession = specialistRunCreation.value;
assert.equal(specialistRunSession.apiVersion, SPECIALIST_RUN_API_VERSION);
assert.equal(specialistRunSession.kind, SPECIALIST_RUN_KINDS[0]);
assert.deepEqual(specialistRunSession.acceptedHandoffs, []);
assert.equal(Object.isFrozen(specialistRunSession), true);

const specialistRunInitialInspection = inspectSpecialistRunSession(
  specialistRunSession,
  retainedSpecialistExpectation,
);
assert.equal(
  specialistRunInitialInspection.ok,
  true,
  JSON.stringify(specialistRunInitialInspection.diagnostics),
);
assert.notEqual(specialistRunInitialInspection.value, null);
assert.equal(specialistRunInitialInspection.value.stage, "collecting");
assert.equal(specialistRunInitialInspection.value.integrationReady, false);
assert.deepEqual(
  specialistRunInitialInspection.value.dependencyEligibleContracts.map(
    (contract) => contract.agentId,
  ),
  [specialistBlueprint.id],
);

const specialistRunRecord = recordSpecialistRunHandoff(
  specialistRunSession,
  retainedSpecialistExpectation,
  rawSpecialistHandoff,
);
assert.equal(specialistRunRecord.ok, true, JSON.stringify(specialistRunRecord.diagnostics));
assert.notEqual(specialistRunRecord.value, null);
assert.equal(specialistRunRecord.value.acceptedHandoffs.length, 1);
assert.equal(
  specialistRunRecord.value.acceptedHandoffs[0].rawBase64,
  Buffer.from(rawSpecialistHandoff).toString("base64"),
);
const rawSpecialistRunSession = new TextEncoder().encode(
  JSON.stringify(specialistRunRecord.value),
);
const specialistRunRestore = restoreSpecialistRunSession(
  rawSpecialistRunSession,
  retainedSpecialistExpectation,
);
assert.equal(specialistRunRestore.ok, true, JSON.stringify(specialistRunRestore.diagnostics));
assert.notEqual(specialistRunRestore.value, null);
assert.deepEqual(specialistRunRestore.value, specialistRunRecord.value);

const specialistRunFinalInspection = inspectSpecialistRunSession(
  specialistRunRestore.value,
  retainedSpecialistExpectation,
);
assert.equal(
  specialistRunFinalInspection.ok,
  true,
  JSON.stringify(specialistRunFinalInspection.diagnostics),
);
assert.notEqual(specialistRunFinalInspection.value, null);
assert.equal(specialistRunFinalInspection.value.stage, "integration_ready");
assert.equal(specialistRunFinalInspection.value.integrationReady, true);
assert.equal(specialistRunFinalInspection.value.specialistOutcome, "pass");
assert.equal(specialistRunFinalInspection.value.acceptedEvidence.length, 1);
assertProviderNeutralKeys(specialistRunRestore.value);
assertProviderNeutralKeys(specialistRunFinalInspection.value);

const mismatchedSpecialistExpectation = Object.freeze({
  ...retainedSpecialistExpectation,
  packageDigest: "sha256:" + "f".repeat(64),
});
const mismatchedSpecialistVerification = verifySpecialistPackage(
  specialistPackage,
  mismatchedSpecialistExpectation,
);
assert.equal(mismatchedSpecialistVerification.ok, false);
assert.equal(mismatchedSpecialistVerification.value, null);
assert.deepEqual(
  mismatchedSpecialistVerification.diagnostics.map((diagnostic) => diagnostic.code),
  ["SC4307"],
);
assertProviderNeutralKeys(specialistPackage);
const specialistFanIn = assessSpecialistHandoffs(
  specialistPackage,
  retainedSpecialistExpectation,
  specialistBlueprint.id,
  [],
);
assert.equal(specialistFanIn.ok, true, JSON.stringify(specialistFanIn.diagnostics));
assert.notEqual(specialistFanIn.value, null);
assert.equal(specialistFanIn.value.integrationReady, true);
assert.deepEqual(specialistFanIn.value.requiredAgentIds, []);

process.stdout.write(
  JSON.stringify({
    approvalBoundVerification: true,
    artifactSource: "installed-package",
    candidateAnalysis: true,
    commonSchemaSubpath: true,
    executedEvents: executed.value.events.length,
    executionDisposition: executed.value.disposition,
    fanInReady: specialistFanIn.value.integrationReady,
    handoffSchemaSubpath: true,
    handoffVerified: specialistHandoffVerification.value.kind === "VerifiedSpecialistHandoff",
    initialized: true,
    runAcceptedHandoffs: specialistRunRestore.value.acceptedHandoffs.length,
    runIntegrationReady: specialistRunFinalInspection.value.integrationReady,
    runSchemaSubpath: true,
    runSessionRestored:
      specialistRunRestore.value.contentDigest === specialistRunRecord.value.contentDigest,
    inspectedEvents: inspected.value.eventCount,
    mismatchedApprovalRejected: true,
    inspectedExecutionEvents: executionInspection.value.eventCount,
    privateInterface: true,
    projectId: validated.value.projectId,
    specialistAgents: specialistCompilation.blueprints.length,
    specialistFiles: specialistPackage.files.length,
    specialistRunApiVersion: specialistRunSession.apiVersion,
    specialistSchemaSubpath: true,
    strictSpecialistRunSchemaRegistry: true,
    strictSpecialistSchemaRegistry: true,
    validated: true,
  }) + "\n",
);
`;

function run(command, args, cwd, label) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error !== undefined) {
    throw new Error(`${label} could not start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `${label} failed with exit ${String(result.status)}.\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
  return result.stdout;
}

function runNpm(args, cwd, label) {
  return run(process.execPath, [NPM_EXEC_PATH, ...args], cwd, label);
}

function productionPackageRecords(rootLock, rootDependencies) {
  assert.equal(rootLock.lockfileVersion, 3);
  assert.equal(typeof rootLock.packages, "object");
  const records = {};
  const pending = [...Object.keys(rootDependencies)].sort();
  const visited = new Set();

  while (pending.length > 0) {
    const dependency = pending.shift();
    if (visited.has(dependency)) {
      continue;
    }
    visited.add(dependency);
    const path = `node_modules/${dependency}`;
    const record = rootLock.packages[path];
    assert.notEqual(record, undefined, `Root lock is missing ${path}`);
    records[path] = record;
    for (const child of Object.keys(record.dependencies ?? {}).sort()) {
      pending.push(child);
    }
  }

  return records;
}

function directoryIdentity(path) {
  const stats = lstatSync(path, { bigint: true });
  assert.equal(stats.isSymbolicLink(), false, `Refusing a symbolic-link workspace: ${path}`);
  assert.equal(stats.isDirectory(), true, `Expected an owned directory: ${path}`);
  return Object.freeze({ device: stats.dev, inode: stats.ino });
}

function lstatIfPresent(path) {
  try {
    return lstatSync(path, { bigint: true });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function ensurePlainDirectory(path) {
  if (lstatIfPresent(path) === null) {
    mkdirSync(path);
  }
  return directoryIdentity(path);
}

function ensureCacheTree(repositoryRoot) {
  const resolvedRoot = resolve(repositoryRoot);
  const localStateRoot = resolve(resolvedRoot, ".local");
  const cacheRoot = resolve(localStateRoot, "npm-cache");
  assert.equal(relative(resolvedRoot, localStateRoot), ".local");
  assert.equal(relative(localStateRoot, cacheRoot), "npm-cache");

  const localStateIdentity = ensurePlainDirectory(localStateRoot);
  const cacheIdentity = ensurePlainDirectory(cacheRoot);
  assert.deepEqual(
    directoryIdentity(localStateRoot),
    localStateIdentity,
    "Local state root identity changed during cache creation.",
  );
  return Object.freeze({ cacheIdentity, cacheRoot, localStateIdentity, localStateRoot });
}

function runMissingCacheRootCheck() {
  const checkRoot = mkdtempSync(join(NPM_CACHE, "swecircuit-missing-cache-check-"));
  const checkIdentity = directoryIdentity(checkRoot);
  try {
    assert.equal(lstatIfPresent(join(checkRoot, ".local")), null);
    const checkTree = ensureCacheTree(checkRoot);
    assert.deepEqual(directoryIdentity(checkTree.localStateRoot), checkTree.localStateIdentity);
    assert.deepEqual(directoryIdentity(checkTree.cacheRoot), checkTree.cacheIdentity);
  } finally {
    assert.deepEqual(
      directoryIdentity(checkRoot),
      checkIdentity,
      "Missing-cache check root identity changed.",
    );
    rmSync(checkRoot, { force: true, recursive: true });
  }
}

function assertOwnedCacheRoot(path) {
  const cacheRoot = resolve(NPM_CACHE);
  const ownedRoot = resolve(path);
  const fromCacheRoot = relative(cacheRoot, ownedRoot);
  assert.notEqual(fromCacheRoot, "");
  assert.equal(isAbsolute(fromCacheRoot), false);
  assert.notEqual(fromCacheRoot, "..");
  assert.equal(fromCacheRoot.startsWith(`..${sep}`), false);
  assert.equal(fromCacheRoot.includes(sep), false);
  assert.equal(fromCacheRoot.startsWith("swecircuit-packed-consumer-"), true);
  return directoryIdentity(ownedRoot);
}

const rootManifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
assert.equal(rootManifest.name, "swecircuit");
assert.equal(rootManifest.private, true);
assert.equal(rootManifest.bin, undefined);
assert.equal(typeof rootManifest.dependencies, "object");
assert.equal(rootManifest.dependencies.swecircuit, undefined);

const cacheTree = ensureCacheTree(ROOT);
assert.equal(cacheTree.localStateRoot, resolve(LOCAL_STATE_ROOT));
assert.equal(cacheTree.cacheRoot, resolve(NPM_CACHE));
runMissingCacheRootCheck();
const ownedRoot = mkdtempSync(CONSUMER_WORKSPACE_PREFIX);
const ownedIdentity = assertOwnedCacheRoot(ownedRoot);

try {
  const artifactDirectory = join(ownedRoot, "artifacts");
  const consumerDirectory = join(ownedRoot, "consumer");
  const projectDirectory = join(consumerDirectory, "project");
  mkdirSync(artifactDirectory);
  mkdirSync(consumerDirectory);

  const packOutput = runNpm(
    [
      "pack",
      "--json",
      "--ignore-scripts",
      "--offline",
      "--cache",
      NPM_CACHE,
      "--pack-destination",
      artifactDirectory,
    ],
    ROOT,
    "npm pack",
  );
  const packed = JSON.parse(packOutput);
  assert.equal(Array.isArray(packed), true);
  assert.equal(packed.length, 1);
  const packageRecord = packed[0];
  assert.equal(packageRecord.name, "swecircuit");
  assert.equal(packageRecord.version, "0.0.0");
  assert.equal(packageRecord.filename, "swecircuit-0.0.0.tgz");
  assert.match(packageRecord.integrity, /^sha512-[A-Za-z0-9+/=]+$/);
  assert.equal(Array.isArray(packageRecord.files), true);

  const packedFiles = new Set(
    packageRecord.files.map((file) => String(file.path).replaceAll("\\", "/")),
  );
  for (const required of REQUIRED_PACKED_FILES) {
    assert.equal(packedFiles.has(required), true, `Packed artifact is missing ${required}`);
  }
  for (const path of packedFiles) {
    assert.equal(FORBIDDEN_PACKED_FILES.has(path), false, `Packed artifact contains ${path}`);
    assert.equal(
      FORBIDDEN_PACKED_PREFIXES.some((prefix) => path.startsWith(prefix)),
      false,
      `Packed artifact unexpectedly contains ${path}`,
    );
  }

  const tarball = resolve(artifactDirectory, packageRecord.filename);
  assert.equal(existsSync(tarball), true);
  const tarballRelative = relative(artifactDirectory, tarball);
  assert.notEqual(tarballRelative, "");
  assert.equal(isAbsolute(tarballRelative), false);
  assert.notEqual(tarballRelative, "..");
  assert.equal(tarballRelative.startsWith(`..${sep}`), false);

  const localPackageSpec = `file:../artifacts/${packageRecord.filename}`;
  const rootLock = JSON.parse(readFileSync(join(ROOT, "package-lock.json"), "utf8"));
  assert.deepEqual(rootLock.packages?.[""]?.dependencies, rootManifest.dependencies);
  const consumerManifest = {
    name: "swecircuit-clean-consumer",
    private: true,
    type: "module",
    dependencies: { swecircuit: localPackageSpec },
  };
  const consumerLock = {
    name: consumerManifest.name,
    lockfileVersion: 3,
    requires: true,
    packages: {
      "": {
        name: consumerManifest.name,
        dependencies: consumerManifest.dependencies,
      },
      "node_modules/swecircuit": {
        version: rootManifest.version,
        resolved: localPackageSpec,
        integrity: packageRecord.integrity,
        dependencies: rootManifest.dependencies,
        engines: rootManifest.engines,
      },
      ...productionPackageRecords(rootLock, rootManifest.dependencies),
    },
  };

  writeFileSync(
    join(consumerDirectory, "package.json"),
    `${JSON.stringify(consumerManifest, null, 2)}\n`,
    "utf8",
  );
  writeFileSync(
    join(consumerDirectory, "package-lock.json"),
    `${JSON.stringify(consumerLock, null, 2)}\n`,
    "utf8",
  );
  writeFileSync(join(consumerDirectory, "verify.mjs"), CONSUMER_PROGRAM.trimStart(), "utf8");
  writeFileSync(
    join(consumerDirectory, "host.ts"),
    readFileSync(join(ROOT, "scripts", "fixtures", "packed-consumer-host.ts"), "utf8"),
    "utf8",
  );

  runNpm(
    ["ci", "--offline", "--cache", NPM_CACHE, "--ignore-scripts", "--no-audit", "--no-fund"],
    consumerDirectory,
    "offline consumer clean install",
  );
  const installedManifest = JSON.parse(
    readFileSync(join(consumerDirectory, "node_modules", "swecircuit", "package.json"), "utf8"),
  );
  assert.equal(installedManifest.private, true);
  assert.equal(installedManifest.bin, undefined);
  assert.equal(installedManifest.exports?.["."]?.import, "./dist/index.js");
  assert.equal(installedManifest.exports?.["."]?.types, "./dist/index.d.ts");
  assert.equal(
    installedManifest.exports?.["./schemas/common.schema.json"],
    "./schemas/v1alpha1/common.schema.json",
  );
  assert.equal(
    installedManifest.exports?.["./schemas/specialist-compiler.schema.json"],
    "./schemas/v1alpha1/specialist-compiler.schema.json",
  );

  assert.equal(
    installedManifest.exports?.["./schemas/specialist-handoff.schema.json"],
    "./schemas/v1alpha1/specialist-handoff.schema.json",
  );
  assert.equal(
    installedManifest.exports?.["./schemas/specialist-run.schema.json"],
    "./schemas/v1alpha1/specialist-run.schema.json",
  );
  run(
    process.execPath,
    [
      join(ROOT, "node_modules", "typescript", "bin", "tsc"),
      "--ignoreConfig",
      "--strict",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2022",
      "--lib",
      "ES2022,DOM",
      "--outDir",
      "typed-host",
      "host.ts",
    ],
    consumerDirectory,
    "packed consumer TypeScript host compilation",
  );
  const typedHostOutput = run(
    process.execPath,
    [join(consumerDirectory, "typed-host", "host.js")],
    consumerDirectory,
    "packed consumer TypeScript host execution",
  );
  assert.deepEqual(JSON.parse(typedHostOutput), {
    approvalBoundVerification: true,
    artifactSource: "installed-package-typescript",
    candidateAnalysis: true,
    fanInReady: true,
    handoffVerified: true,
    runAcceptedHandoffs: 1,
    runIntegrationReady: true,
    runSessionRestored: true,
    specialistAgents: 1,
    specialistFiles: 4,
    specialistRunApiVersion: "swecircuit/specialist-run/v1alpha1",
  });

  const consumerOutput = run(
    process.execPath,
    [
      join(consumerDirectory, "verify.mjs"),
      projectDirectory,
      JSON.stringify(RETAINED_SPECIALIST_EXPECTATION),
    ],
    consumerDirectory,
    "packed consumer verification",
  );
  assert.deepEqual(JSON.parse(consumerOutput), {
    approvalBoundVerification: true,
    artifactSource: "installed-package",
    candidateAnalysis: true,
    commonSchemaSubpath: true,
    executedEvents: 6,
    executionDisposition: "completed",
    fanInReady: true,
    handoffSchemaSubpath: true,
    handoffVerified: true,
    initialized: true,
    inspectedEvents: 2,
    inspectedExecutionEvents: 6,
    mismatchedApprovalRejected: true,
    privateInterface: true,
    projectId: "clean-consumer",
    runAcceptedHandoffs: 1,
    runIntegrationReady: true,
    runSchemaSubpath: true,
    runSessionRestored: true,
    specialistAgents: 1,
    specialistFiles: 4,
    specialistRunApiVersion: "swecircuit/specialist-run/v1alpha1",
    specialistSchemaSubpath: true,
    strictSpecialistRunSchemaRegistry: true,
    strictSpecialistSchemaRegistry: true,
    validated: true,
  });

  process.stdout.write(
    "Maintainer installed-package compatibility gate passed (private artifact, offline install, public TypeScript host, compile, render, handoff, run restore, fan-in, approval-bound verify).\n",
  );
} finally {
  assert.deepEqual(
    directoryIdentity(LOCAL_STATE_ROOT),
    cacheTree.localStateIdentity,
    "Local state root identity changed.",
  );
  assert.deepEqual(
    directoryIdentity(NPM_CACHE),
    cacheTree.cacheIdentity,
    "Npm cache identity changed.",
  );
  assert.deepEqual(
    directoryIdentity(ownedRoot),
    ownedIdentity,
    "Owned workspace identity changed.",
  );
  rmSync(ownedRoot, { force: true, recursive: true });
}
