import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NPM_CACHE = join(ROOT, ".local", "npm-cache");
const NPM_EXEC_PATH = process.env.npm_execpath;
assert.equal(typeof NPM_EXEC_PATH, "string", "Run the packed-consumer check through npm.");
assert.notEqual(NPM_EXEC_PATH.length, 0, "npm_execpath must identify npm's JavaScript entrypoint.");
const REQUIRED_PACKED_FILES = Object.freeze([
  "dist/execution.d.ts",
  "dist/index.d.ts",
  "dist/index.js",
  "docs/framework/executor-boundary.md",
  "package.json",
  "schemas/v1alpha1/common.schema.json",
  "schemas/v1alpha1/project.schema.json",
  "schemas/v1alpha1/run-event.schema.json",
]);
const FORBIDDEN_PACKED_FILES = new Set([".npmrc"]);
const FORBIDDEN_PACKED_PREFIXES = Object.freeze(["scripts/", "src/", "test/"]);

const CONSUMER_PROGRAM = String.raw`
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createDeterministicTestExecutor,
  createToolchainProbe,
  executeWorkPacket,
  initializeProject,
  inspectTrace,
  TOOLCHAIN,
  validateProject,
} from "swecircuit";

const consumerRoot = process.cwd();
const projectRoot = process.argv[2];
assert.equal(typeof projectRoot, "string");

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
assert.equal(existsSync(join(installedPackage, "src")), false);

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

process.stdout.write(
  JSON.stringify({
    artifactSource: "installed-package",
    executedEvents: executed.value.events.length,
    executionDisposition: executed.value.disposition,
    initialized: true,
    inspectedEvents: inspected.value.eventCount,
    inspectedExecutionEvents: executionInspection.value.eventCount,
    privateInterface: true,
    projectId: validated.value.projectId,
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
  assert.equal(stats.isDirectory(), true, `Expected an owned directory: ${path}`);
  assert.equal(stats.isSymbolicLink(), false, `Refusing a symbolic-link workspace: ${path}`);
  return Object.freeze({ device: stats.dev, inode: stats.ino });
}

function assertOwnedTemporaryRoot(path) {
  const temporaryRoot = realpathSync(tmpdir());
  const ownedRoot = realpathSync(path);
  const fromTemporaryRoot = relative(temporaryRoot, ownedRoot);
  assert.notEqual(fromTemporaryRoot, "");
  assert.equal(isAbsolute(fromTemporaryRoot), false);
  assert.notEqual(fromTemporaryRoot, "..");
  assert.equal(fromTemporaryRoot.startsWith(`..${sep}`), false);
  return directoryIdentity(ownedRoot);
}

const rootManifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
assert.equal(rootManifest.name, "swecircuit");
assert.equal(rootManifest.private, true);
assert.equal(rootManifest.bin, undefined);
assert.equal(typeof rootManifest.dependencies, "object");
assert.equal(rootManifest.dependencies.swecircuit, undefined);

const ownedRoot = mkdtempSync(join(tmpdir(), "swecircuit-packed-consumer-"));
const ownedIdentity = assertOwnedTemporaryRoot(ownedRoot);

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

  run(
    process.execPath,
    [
      join(ROOT, "node_modules", "typescript", "bin", "tsc"),
      "--noEmit",
      "--strict",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2022",
      "--lib",
      "ES2022,DOM",
      "host.ts",
    ],
    consumerDirectory,
    "packed consumer TypeScript host",
  );

  const consumerOutput = run(
    process.execPath,
    [join(consumerDirectory, "verify.mjs"), projectDirectory],
    consumerDirectory,
    "packed consumer verification",
  );
  assert.deepEqual(JSON.parse(consumerOutput), {
    artifactSource: "installed-package",
    executedEvents: 6,
    executionDisposition: "completed",
    initialized: true,
    inspectedEvents: 2,
    inspectedExecutionEvents: 6,
    privateInterface: true,
    projectId: "clean-consumer",
    validated: true,
  });

  process.stdout.write(
    "Packed consumer check passed (private artifact, offline install, public types, init, validate, execute, inspect).\n",
  );
} finally {
  if (existsSync(ownedRoot)) {
    assert.deepEqual(
      directoryIdentity(ownedRoot),
      ownedIdentity,
      "Owned workspace identity changed.",
    );
    rmSync(ownedRoot, { force: true, recursive: true });
  }
}
