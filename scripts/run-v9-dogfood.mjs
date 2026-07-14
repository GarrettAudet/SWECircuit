import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CLI = join(ROOT, "dist", "cli.js");
const EXAMPLE = join(ROOT, "examples", "minimal");
const EXAMPLE_TRACE = join(EXAMPLE, "traces", "example.jsonl");
const WORKSPACE_PREFIX = "swecircuit-v9-dogfood-";
const CLI_TIMEOUT_MS = 15_000;
const CLI_MAX_BUFFER_BYTES = 1024 * 1024;

class DogfoodFailure extends Error {
  constructor(code, message) {
    super(message);
    this.name = "DogfoodFailure";
    this.code = code;
  }
}

function requireCondition(condition, code, message) {
  if (!condition) {
    throw new DogfoodFailure(code, message);
  }
}

function samePath(left, right) {
  const normalizedLeft = resolve(left);
  const normalizedRight = resolve(right);
  return process.platform === "win32"
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight;
}

function roundMilliseconds(value) {
  return Number(value.toFixed(3));
}

function digestBytes(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function digestTree(root) {
  const digest = createHash("sha256");

  function visit(directory, prefix = "") {
    for (const name of readdirSync(directory).sort()) {
      const absolutePath = join(directory, name);
      const relativePath = prefix === "" ? name : `${prefix}/${name}`;
      const stats = lstatSync(absolutePath);
      requireCondition(!stats.isSymbolicLink(), "DOGFOOD_SOURCE_TYPE", "Source tree has a link.");

      if (stats.isDirectory()) {
        digest.update(`directory\0${relativePath}\0`);
        visit(absolutePath, relativePath);
      } else if (stats.isFile()) {
        const bytes = readFileSync(absolutePath);
        digest.update(`file\0${relativePath}\0${bytes.length}\0`);
        digest.update(bytes);
      } else {
        throw new DogfoodFailure("DOGFOOD_SOURCE_TYPE", "Source tree has an unsupported entry.");
      }
    }
  }

  visit(root);
  return `sha256:${digest.digest("hex")}`;
}

function diagnosticCodes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

function summarizeOperation(operation, result) {
  if (!result.ok) {
    return { diagnosticCount: result.diagnostics.length };
  }

  switch (operation) {
    case "init":
      return {
        projectArtifact: result.value.projectArtifact,
        projectId: result.value.projectId,
      };
    case "validate":
      return {
        artifactCount: result.value.artifacts.length,
        projectArtifact: result.value.projectArtifact,
        projectId: result.value.projectId,
      };
    case "inspect":
      return {
        eventCount: result.value.eventCount,
        runCount: result.value.runs.length,
        traceArtifact: result.value.traceArtifact,
      };
    default:
      throw new DogfoodFailure("DOGFOOD_OPERATION", "Unsupported operation summary.");
  }
}

function runCliStep({ id, operation, target, args, expectedExitCode, expectedCodes }) {
  const started = performance.now();
  const child = spawnSync(process.execPath, [CLI, operation, ...args, "--json"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: CLI_MAX_BUFFER_BYTES,
    timeout: CLI_TIMEOUT_MS,
    windowsHide: true,
  });
  const durationMs = roundMilliseconds(performance.now() - started);

  requireCondition(child.error === undefined, "DOGFOOD_CHILD", "Kernel command did not complete.");
  requireCondition(child.signal === null, "DOGFOOD_CHILD", "Kernel command received a signal.");
  requireCondition(typeof child.status === "number", "DOGFOOD_CHILD", "Kernel exit is missing.");
  requireCondition(child.stderr === "", "DOGFOOD_STREAM", "JSON mode wrote to stderr.");
  requireCondition(child.stdout.endsWith("\n"), "DOGFOOD_STREAM", "JSON output lacks newline.");
  const body = child.stdout.slice(0, -1);
  requireCondition(!body.includes("\n"), "DOGFOOD_STREAM", "JSON output is not one line.");

  let result;
  try {
    result = JSON.parse(body);
  } catch {
    throw new DogfoodFailure("DOGFOOD_JSON", "Kernel output is not valid JSON.");
  }

  requireCondition(child.status === expectedExitCode, "DOGFOOD_EXIT", "Unexpected exit class.");
  requireCondition(result.exitCode === child.status, "DOGFOOD_EXIT", "Exit fields disagree.");
  requireCondition(
    result.ok === (expectedExitCode === 0),
    "DOGFOOD_RESULT",
    "Result state disagrees.",
  );
  requireCondition(
    JSON.stringify(diagnosticCodes(result)) === JSON.stringify(expectedCodes),
    "DOGFOOD_DIAGNOSTIC",
    "Diagnostic sequence disagrees with the contract.",
  );

  return {
    actor: "kernel",
    diagnosticCodes: expectedCodes,
    durationMs,
    exitCode: child.status,
    expectation: expectedExitCode === 0 ? "success" : "controlled-failure",
    gate: "pass",
    id,
    observed: result.ok ? "success" : "failure",
    operation,
    summary: summarizeOperation(operation, result),
    target,
  };
}

function runCallerStep({ id, operation, target, action, summary }) {
  const started = performance.now();
  action();
  return {
    actor: "caller",
    diagnosticCodes: [],
    durationMs: roundMilliseconds(performance.now() - started),
    expectation: "success",
    gate: "pass",
    id,
    observed: "success",
    operation,
    summary,
    target,
  };
}

function captureWorkspaceIdentity(root, temporaryBase) {
  const stats = lstatSync(root);
  requireCondition(stats.isDirectory(), "DOGFOOD_OWNERSHIP", "Workspace is not a directory.");
  requireCondition(!stats.isSymbolicLink(), "DOGFOOD_OWNERSHIP", "Workspace is a link.");
  const canonical = realpathSync(root);
  requireCondition(
    samePath(dirname(canonical), temporaryBase),
    "DOGFOOD_OWNERSHIP",
    "Workspace escaped the temporary base.",
  );
  requireCondition(
    basename(canonical).startsWith(WORKSPACE_PREFIX),
    "DOGFOOD_OWNERSHIP",
    "Workspace prefix is invalid.",
  );
  return { canonical, dev: stats.dev, ino: stats.ino, temporaryBase };
}

function removeOwnedWorkspace(root, identity) {
  requireCondition(existsSync(root), "DOGFOOD_CLEANUP", "Owned workspace disappeared early.");
  const stats = lstatSync(root);
  requireCondition(stats.isDirectory(), "DOGFOOD_CLEANUP", "Owned workspace changed type.");
  requireCondition(!stats.isSymbolicLink(), "DOGFOOD_CLEANUP", "Owned workspace became a link.");
  requireCondition(stats.dev === identity.dev, "DOGFOOD_CLEANUP", "Workspace device changed.");
  requireCondition(stats.ino === identity.ino, "DOGFOOD_CLEANUP", "Workspace identity changed.");
  requireCondition(
    samePath(realpathSync(root), identity.canonical),
    "DOGFOOD_CLEANUP",
    "Workspace canonical path changed.",
  );
  requireCondition(
    samePath(dirname(identity.canonical), identity.temporaryBase),
    "DOGFOOD_CLEANUP",
    "Cleanup target escaped the temporary base.",
  );
  requireCondition(
    basename(identity.canonical).startsWith(WORKSPACE_PREFIX),
    "DOGFOOD_CLEANUP",
    "Cleanup prefix is invalid.",
  );
  rmSync(root, { recursive: true });
  requireCondition(!existsSync(root), "DOGFOOD_CLEANUP", "Owned workspace still exists.");
}

export function runDogfood({ onStep = () => {}, onWorkspaceCreated = () => {} } = {}) {
  const runStarted = performance.now();
  const steps = [];
  const recordStep = (step) => {
    steps.push(step);
    onStep(step);
  };
  const sourceDigestBefore = digestTree(EXAMPLE);
  const temporaryBase = realpathSync(tmpdir());
  const workspace = mkdtempSync(join(temporaryBase, WORKSPACE_PREFIX));
  const identity = captureWorkspaceIdentity(workspace, temporaryBase);
  const project = join(workspace, "project");

  let runError;
  let cleanupError;
  let manifestDigestBeforeCollision = null;
  let manifestDigestAfterCollision = null;
  let sourceDigestAfter = null;

  try {
    onWorkspaceCreated(workspace);
    mkdirSync(project);
    recordStep(
      runCliStep({
        id: "source-validate",
        operation: "validate",
        target: "repository-example",
        args: ["--project", "examples/minimal"],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );
    recordStep(
      runCliStep({
        id: "source-inspect",
        operation: "inspect",
        target: "repository-example-trace",
        args: ["--project", "examples/minimal", "--trace", "traces/example.jsonl"],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );
    recordStep(
      runCliStep({
        id: "isolated-init",
        operation: "init",
        target: "isolated-project",
        args: ["--project", project, "--project-id", "v9-dogfood"],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );
    recordStep(
      runCliStep({
        id: "isolated-validate",
        operation: "validate",
        target: "isolated-project",
        args: ["--project", project],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );

    const recoveryTrace = join(project, "traces", "recovery.jsonl");
    requireCondition(
      !existsSync(recoveryTrace),
      "DOGFOOD_PRECONDITION",
      "Recovery trace exists early.",
    );
    recordStep(
      runCliStep({
        id: "missing-trace-inspect",
        operation: "inspect",
        target: "missing-caller-trace",
        args: ["--project", project, "--trace", "traces/recovery.jsonl"],
        expectedExitCode: 4,
        expectedCodes: ["SC1001"],
      }),
    );
    recordStep(
      runCallerStep({
        id: "caller-recovery-copy",
        operation: "copy-trace",
        target: "isolated-project-trace",
        action: () => {
          mkdirSync(dirname(recoveryTrace), { recursive: true });
          copyFileSync(EXAMPLE_TRACE, recoveryTrace);
        },
        summary: {
          destination: "traces/recovery.jsonl",
          source: "examples/minimal/traces/example.jsonl",
        },
      }),
    );
    recordStep(
      runCliStep({
        id: "recovered-trace-inspect",
        operation: "inspect",
        target: "recovered-caller-trace",
        args: ["--project", project, "--trace", "traces/recovery.jsonl"],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );

    const manifest = join(project, "swecircuit.json");
    manifestDigestBeforeCollision = digestBytes(readFileSync(manifest));
    recordStep(
      runCliStep({
        id: "repeat-init-collision",
        operation: "init",
        target: "initialized-project",
        args: ["--project", project, "--project-id", "v9-dogfood-replacement"],
        expectedExitCode: 4,
        expectedCodes: ["SC1021", "SC1021"],
      }),
    );
    manifestDigestAfterCollision = digestBytes(readFileSync(manifest));
    requireCondition(
      manifestDigestAfterCollision === manifestDigestBeforeCollision,
      "DOGFOOD_COLLISION",
      "Repeat initialization changed the manifest.",
    );
    recordStep(
      runCliStep({
        id: "preserved-project-validate",
        operation: "validate",
        target: "preserved-project",
        args: ["--project", project],
        expectedExitCode: 0,
        expectedCodes: [],
      }),
    );

    sourceDigestAfter = digestTree(EXAMPLE);
    requireCondition(
      sourceDigestAfter === sourceDigestBefore,
      "DOGFOOD_SOURCE_MUTATION",
      "Repository example changed during dogfood.",
    );
  } catch (error) {
    runError = error;
  }

  try {
    recordStep(
      runCallerStep({
        id: "owned-temp-cleanup",
        operation: "remove-temp",
        target: "owned-workspace",
        action: () => removeOwnedWorkspace(workspace, identity),
        summary: { removedOwnedWorkspace: true },
      }),
    );
  } catch (error) {
    cleanupError = error;
  }

  if (runError !== undefined) {
    throw runError;
  }
  if (cleanupError !== undefined) {
    throw cleanupError;
  }

  return {
    assertions: {
      cleanupConfirmed: !existsSync(workspace),
      manifestPreservedAfterCollision:
        manifestDigestBeforeCollision === manifestDigestAfterCollision,
      recoveryRetrySucceeded:
        steps.some((step) => step.id === "missing-trace-inspect" && step.observed === "failure") &&
        steps.some((step) => step.id === "recovered-trace-inspect" && step.observed === "success"),
      sourceExampleUnchanged: sourceDigestBefore === sourceDigestAfter,
    },
    collisionControl: {
      code: "SC1021",
      failureStep: "repeat-init-collision",
      manifestPreserved: true,
      verificationStep: "preserved-project-validate",
    },
    digests: {
      initializedManifest: manifestDigestAfterCollision,
      sourceExample: sourceDigestAfter,
    },
    failureRecovery: {
      code: "SC1001",
      failedStep: "missing-trace-inspect",
      interventionStep: "caller-recovery-copy",
      recovered: true,
      retryStep: "recovered-trace-inspect",
    },
    reportVersion: "1.0.0",
    result: "pass",
    runId: "v9-t010-local-dogfood",
    runtime: {
      architecture: process.arch,
      node: process.version,
      platform: process.platform,
    },
    steps,
    totals: {
      callerActionCount: steps.filter((step) => step.actor === "caller").length,
      controlledFailureCount: steps.filter((step) => step.expectation === "controlled-failure")
        .length,
      durationMs: roundMilliseconds(performance.now() - runStarted),
      kernelOperationCount: steps.filter((step) => step.actor === "kernel").length,
      retryCount: 1,
      stepCount: steps.length,
    },
  };
}

const entry = process.argv[1];
if (entry !== undefined && samePath(entry, fileURLToPath(import.meta.url))) {
  try {
    process.stdout.write(`${JSON.stringify(runDogfood())}\n`);
  } catch (error) {
    const code = error instanceof DogfoodFailure ? error.code : "DOGFOOD_UNEXPECTED";
    process.stderr.write(`Dogfood run failed (${code}).\n`);
    process.exitCode = 1;
  }
}
