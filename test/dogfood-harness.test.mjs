import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runDogfood } from "../scripts/run-v9-dogfood.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SCRIPT = join(ROOT, "scripts", "run-v9-dogfood.mjs");
const EXAMPLE = join(ROOT, "examples", "minimal");
const OBSERVATION = join(
  ROOT,
  "docs",
  "specs",
  "v9-devrail-kernel",
  "evidence",
  "v9-t010-observation.json",
);
const TRACE_RELATIVE = "docs/specs/v9-devrail-kernel/evidence/v9-t010-trace.jsonl";
const TRACE = join(ROOT, ...TRACE_RELATIVE.split("/"));

function snapshotTree(root) {
  const entries = [];

  function visit(directory, prefix = "") {
    for (const name of readdirSync(directory).sort()) {
      const absolutePath = join(directory, name);
      const relativePath = prefix === "" ? name : `${prefix}/${name}`;
      const stats = lstatSync(absolutePath);
      if (stats.isDirectory()) {
        entries.push({ kind: "directory", path: `${relativePath}/` });
        visit(absolutePath, relativePath);
      } else if (stats.isFile()) {
        entries.push({
          bytes: readFileSync(absolutePath).toString("base64"),
          kind: "file",
          path: relativePath,
        });
      } else {
        throw new Error(`Unsupported dogfood example entry: ${relativePath}`);
      }
    }
  }

  visit(root);
  return entries;
}

function executeHarness() {
  const result = spawnSync(process.execPath, [SCRIPT], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
    windowsHide: true,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.signal, null);
  assert.equal(result.stderr, "");
  assert.equal(result.stdout.endsWith("\n"), true);
  assert.equal(result.stdout.slice(0, -1).includes("\n"), false);
  return JSON.parse(result.stdout);
}

function expectedStepContracts() {
  return [
    ["source-validate", "kernel", "validate", "success", "success", 0, []],
    ["source-inspect", "kernel", "inspect", "success", "success", 0, []],
    ["isolated-init", "kernel", "init", "success", "success", 0, []],
    ["isolated-validate", "kernel", "validate", "success", "success", 0, []],
    ["missing-trace-inspect", "kernel", "inspect", "controlled-failure", "failure", 4, ["SC1001"]],
    ["caller-recovery-copy", "caller", "copy-trace", "success", "success", null, []],
    ["recovered-trace-inspect", "kernel", "inspect", "success", "success", 0, []],
    [
      "repeat-init-collision",
      "kernel",
      "init",
      "controlled-failure",
      "failure",
      4,
      ["SC1021", "SC1021"],
    ],
    ["preserved-project-validate", "kernel", "validate", "success", "success", 0, []],
    ["owned-temp-cleanup", "caller", "remove-temp", "success", "success", null, []],
  ];
}

function assertReport(report) {
  assert.equal(report.reportVersion, "1.0.0");
  assert.equal(report.runId, "v9-t010-local-dogfood");
  assert.equal(report.result, "pass");
  assert.match(report.runtime.node, /^v\d+\.\d+\.\d+$/);
  assert.ok(["darwin", "linux", "win32"].includes(report.runtime.platform));
  assert.equal(typeof report.runtime.architecture, "string");
  assert.notEqual(report.runtime.architecture, "");

  assert.deepEqual(
    report.steps.map((step) => [
      step.id,
      step.actor,
      step.operation,
      step.expectation,
      step.observed,
      step.exitCode ?? null,
      step.diagnosticCodes,
    ]),
    expectedStepContracts(),
  );
  for (const step of report.steps) {
    assert.equal(step.gate, "pass");
    assert.equal(Number.isFinite(step.durationMs), true);
    assert.ok(step.durationMs >= 0);
    assert.equal(typeof step.target, "string");
    assert.equal(typeof step.summary, "object");
  }

  assert.deepEqual(report.assertions, {
    cleanupConfirmed: true,
    manifestPreservedAfterCollision: true,
    recoveryRetrySucceeded: true,
    sourceExampleUnchanged: true,
  });
  assert.deepEqual(report.failureRecovery, {
    code: "SC1001",
    failedStep: "missing-trace-inspect",
    interventionStep: "caller-recovery-copy",
    recovered: true,
    retryStep: "recovered-trace-inspect",
  });
  assert.deepEqual(report.collisionControl, {
    code: "SC1021",
    failureStep: "repeat-init-collision",
    manifestPreserved: true,
    verificationStep: "preserved-project-validate",
  });
  assert.match(report.digests.sourceExample, /^sha256:[0-9a-f]{64}$/);
  assert.match(report.digests.initializedManifest, /^sha256:[0-9a-f]{64}$/);
  assert.deepEqual(
    {
      callerActionCount: report.totals.callerActionCount,
      controlledFailureCount: report.totals.controlledFailureCount,
      kernelOperationCount: report.totals.kernelOperationCount,
      retryCount: report.totals.retryCount,
      stepCount: report.totals.stepCount,
    },
    {
      callerActionCount: 2,
      controlledFailureCount: 2,
      kernelOperationCount: 8,
      retryCount: 1,
      stepCount: 10,
    },
  );
  assert.equal(Number.isFinite(report.totals.durationMs), true);
  assert.ok(report.totals.durationMs >= 0);

  const serialized = JSON.stringify(report);
  assert.equal(serialized.includes(ROOT), false);
  assert.equal(serialized.includes(tmpdir()), false);
  assert.doesNotMatch(serialized, /[A-Za-z]:\\\\/);
  assert.doesNotMatch(serialized, /"\/(?:Users|home|tmp|var)\//);
}

function withoutTimings(report) {
  return {
    ...report,
    steps: report.steps.map((step) => ({ ...step, durationMs: 0 })),
    totals: { ...report.totals, durationMs: 0 },
  };
}

test("the V9 dogfood circuit is measured, bounded, and semantically repeatable", () => {
  const sourceBefore = snapshotTree(EXAMPLE);
  const first = executeHarness();
  const second = executeHarness();
  assertReport(first);
  assertReport(second);
  assert.deepEqual(withoutTimings(second), withoutTimings(first));
  assert.deepEqual(snapshotTree(EXAMPLE), sourceBefore);
});

test("the V9 dogfood harness removes its owned workspace after an injected failure", () => {
  const sourceBefore = snapshotTree(EXAMPLE);
  let workspace;

  assert.throws(
    () =>
      runDogfood({
        onStep(step) {
          if (step.id === "missing-trace-inspect") {
            throw new Error("injected dogfood failure");
          }
        },
        onWorkspaceCreated(value) {
          workspace = value;
        },
      }),
    /injected dogfood failure/,
  );

  assert.equal(typeof workspace, "string");
  assert.equal(existsSync(workspace), false);
  assert.deepEqual(snapshotTree(EXAMPLE), sourceBefore);
});
test("the V9 dogfood harness cleans up when setup fails after ownership capture", () => {
  let workspace;

  assert.throws(
    () =>
      runDogfood({
        onWorkspaceCreated(value) {
          workspace = value;
          throw new Error("injected setup failure");
        },
      }),
    /injected setup failure/,
  );

  assert.equal(typeof workspace, "string");
  assert.equal(existsSync(workspace), false);
});
test("the committed observation digest and caller-owned retry trace stay linked", () => {
  const observationBytes = readFileSync(OBSERVATION);
  const observation = JSON.parse(observationBytes.toString("utf8"));
  assertReport(observation);
  const observationDigest = `sha256:${createHash("sha256").update(observationBytes).digest("hex")}`;

  const traceEvents = readFileSync(TRACE, "utf8")
    .trimEnd()
    .split("\n")
    .map((line) => JSON.parse(line));
  const observationEvidence = traceEvents
    .flatMap((event) => event.spec.evidence ?? [])
    .find((evidence) => evidence.id === "dogfood-observation");
  assert.deepEqual(observationEvidence, {
    digest: observationDigest,
    id: "dogfood-observation",
    immutable: true,
    kind: "artifact",
    ref: "path:docs/specs/v9-devrail-kernel/evidence/v9-t010-observation.json",
  });

  const inspection = spawnSync(
    process.execPath,
    [
      join(ROOT, "dist", "cli.js"),
      "inspect",
      "--project",
      ".",
      "--trace",
      TRACE_RELATIVE,
      "--json",
    ],
    { cwd: ROOT, encoding: "utf8", timeout: 60_000, windowsHide: true },
  );
  assert.equal(inspection.status, 0, inspection.stderr);
  assert.equal(inspection.stderr, "");
  const result = JSON.parse(inspection.stdout);
  assert.equal(result.ok, true);
  assert.equal(result.value.eventCount, 22);
  assert.equal(result.value.runs.length, 1);
  assert.deepEqual(
    result.value.runs[0].attempts.map(({ id, number, state, retryOf, terminalCode }) => ({
      id,
      number,
      state,
      retryOf,
      terminalCode,
    })),
    [
      {
        id: "source-example-1",
        number: 1,
        retryOf: undefined,
        state: "completed",
        terminalCode: "success",
      },
      {
        id: "isolated-project-1",
        number: 1,
        retryOf: undefined,
        state: "completed",
        terminalCode: "success",
      },
      {
        id: "inspect-trace-1",
        number: 1,
        retryOf: undefined,
        state: "failed",
        terminalCode: "execution_failed",
      },
      {
        id: "inspect-trace-2",
        number: 2,
        retryOf: "inspect-trace-1",
        state: "completed",
        terminalCode: "success",
      },
    ],
  );
  assert.deepEqual(
    result.value.runs[0].workflowOutcomes.map(({ stage, outcome, attemptId }) => ({
      stage,
      outcome,
      attemptId,
    })),
    [
      { attemptId: "inspect-trace-1", outcome: "diagnose", stage: "verify" },
      { attemptId: "inspect-trace-2", outcome: "pass", stage: "verify" },
    ],
  );
});
