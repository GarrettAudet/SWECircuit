import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { mkdtemp, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { RELEASE_GATE_TEST_HOOKS } from "../../scripts/run-v12-release-gate.mjs";
import {
  PRODUCTION_IDENTITIES,
  V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS,
} from "../helpers/v12-release-review-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const LIFECYCLE_PATH = "test/fixtures/v12-release-review-lifecycle-child.mjs";
const ENCLOSING_GIT_ENVIRONMENT = Object.freeze({ ...process.env });

test("lifecycle test hooks are bound before isolated execution", () => {
  assert.equal(typeof V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.isSupportedNpmVersion, "function");
});

function runEnclosingGit(args, options = {}) {
  const result = spawnSync(
    RELEASE_GATE_TEST_HOOKS.hostGitPath,
    ["-c", "core.longpaths=true", ...args],
    {
      cwd: ROOT,
      env: ENCLOSING_GIT_ENVIRONMENT,
      encoding: null,
      input: options.input,
      maxBuffer: 128 * 1024 * 1024,
      timeout: 180_000,
      windowsHide: true,
    },
  );
  if (result.error) {
    throw result.error;
  }
  return result;
}

function assertCommittedProductionIdentities(candidateCommit) {
  for (const [path, expected] of Object.entries(PRODUCTION_IDENTITIES)) {
    const probe = runEnclosingGit(["show", `${candidateCommit}:${path}`]);
    assert.equal(probe.signal, null, `committed production identity probe was terminated: ${path}`);
    assert.equal(probe.status, 0, Buffer.from(probe.stderr ?? Buffer.alloc(0)).toString("utf8"));
    const bytes = Buffer.from(probe.stdout);
    assert.deepEqual(
      {
        bytes: bytes.byteLength,
        digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
      },
      expected,
      `committed HEAD production identity differs from the live expectation: ${path}`,
    );
  }
}

test("isolated copied production entrypoints complete one exact compile-to-verify lifecycle", {
  timeout: 3_900_000,
}, async () => {
  const headProbe = runEnclosingGit(["rev-parse", "--verify", "HEAD"]);
  assert.equal(headProbe.signal, null, "source HEAD probe was terminated");
  assert.equal(headProbe.status, 0, Buffer.from(headProbe.stderr ?? []).toString("utf8"));
  const candidateCommit = Buffer.from(headProbe.stdout).toString("ascii").trim();
  assert.match(candidateCommit, /^[0-9a-f]{40}$/u);
  assertCommittedProductionIdentities(candidateCommit);

  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r26-lifecycle-")));
  const outputPath = join(root, "lifecycle.json");
  let materialization;
  let gitContext;
  let lifecycle;
  try {
    materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit, {
      gitRunner: runEnclosingGit,
    });
    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      materialization.root,
      { sourceGitRunner: runEnclosingGit },
    );
    const probe = spawnSync(
      process.execPath,
      [join(materialization.root, LIFECYCLE_PATH), outputPath],
      {
        cwd: materialization.root,
        env: RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext),
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        timeout: 3_600_000,
        windowsHide: true,
      },
    );
    assert.equal(probe.signal, null, "candidate-context lifecycle was terminated");
    assert.equal(probe.status, 0, probe.stderr || probe.stdout);
    const summary = JSON.parse(probe.stdout);
    assert.deepEqual(summary, {
      outcome: "pass",
      rootRemoved: true,
      sourceStatusUnchanged: true,
    });
    lifecycle = JSON.parse(readFileSync(outputPath, "utf8"));
    assert.deepEqual(
      RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext),
      gitContext.before,
      "copied lifecycle mutated its enclosing candidate Git context",
    );
    assert.deepEqual(
      await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
        materialization.root,
        materialization.entries,
      ),
      {
        files: materialization.source.files,
        bytes: materialization.source.bytes,
        digest: materialization.source.digest,
      },
      "copied lifecycle mutated its exact candidate materialization",
    );
  } finally {
    if (gitContext !== undefined) {
      await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
    }
    if (materialization !== undefined) {
      await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
    }
    await rm(root, { recursive: true, force: true });
  }

  assert.equal(lifecycle.outcome, "pass");
  assert.equal(lifecycle.fixture.repositoryWasOutsideSource, true);
  assert.equal(lifecycle.fixture.packageException.onlyScriptsVerifyChanged, true);
  assert.equal(lifecycle.fixture.hostNpmSupply.compatibilityAdapter, "absent");
  assert.equal(
    V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.isSupportedNpmVersion(
      lifecycle.fixture.hostNpmSupply.version,
    ),
    true,
  );
  assert.equal(lifecycle.fixture.hostNpmCacheSupply.sourceSelection, "release-gate-host-npm-cache");
  assert.equal(lifecycle.fixture.hostNpmCacheSupply.rootsDisjoint, true);
  assert.equal(lifecycle.fixture.postFixtureCorrectionExclusion.firstRevision, 22);
  assert.equal(lifecycle.receipts.compatibilityAdapter, "absent");
  assert.equal(lifecycle.receipts.installedNpmVersion, lifecycle.fixture.hostNpmSupply.version);
  assert.equal(
    lifecycle.gate.fixtureVerifyCommandObservedInRawLog,
    true,
    "fixture-only aggregate verify command was not observed in the raw gate log",
  );
  assert.match(
    lifecycle.fixture.packageException.fixtureVerify,
    /node scripts[/\\]run-typescript\.mjs -p tsconfig\.json --noEmit/u,
  );
  assert.match(
    lifecycle.fixture.packageException.fixtureVerify,
    /await import\('ajv'\); await import\('jsonc-parser'\)/u,
  );
  assert.equal(lifecycle.gate.typeScript.candidatePrivate, true);
  assert.equal(lifecycle.gate.typeScript.receipt.supplied, false);
  assert.match(
    lifecycle.gate.typeScript.receipt.path,
    /node_modules[/\\]typescript[/\\]bin[/\\]tsc$/u,
  );
  assert.match(lifecycle.gate.typeScript.receipt.version, /^Version\s+\S+/u);
  assert.equal(lifecycle.gate.runtimeDependencies.sentinelCount, 1);
  assert.equal(
    lifecycle.gate.runtimeDependencies.sentinel,
    "SWECIRCUIT_LIFECYCLE_RUNTIME_IMPORTS sentinel-v1",
  );

  assert.match(lifecycle.packagePair.compilationDigest, /^sha256:[0-9a-f]{64}$/u);
  assert.match(lifecycle.packagePair.packageDigest, /^sha256:[0-9a-f]{64}$/u);

  for (const category of ["prepare", "compile", "package", "summary", "shared"]) {
    const baseline = lifecycle.rawComparisons.compileBaseline[category];
    const standalone = lifecycle.rawComparisons.standaloneApprove[category];
    const verified = lifecycle.rawComparisons.verify[category];
    assert.equal(standalone.equal, true);
    assert.equal(verified.equal, true);
    assert.deepEqual(standalone, baseline);
    assert.deepEqual(verified, baseline);
  }
  assert.equal(lifecycle.rawComparisons.approvalBytesEqual, true);
  assert.deepEqual(
    lifecycle.rawComparisons.verifyPrefixApproval,
    lifecycle.rawComparisons.standaloneApproval,
  );

  assert.equal(lifecycle.handoffs.length, 3);
  assert.equal(lifecycle.verifier.complete, true);
  assert.equal(lifecycle.verifier.releaseReadyInIsolatedFixtureOnly, true);
  assert.deepEqual(lifecycle.verifier.expectedAgentIds, lifecycle.verifier.receivedAgentIds);
  assert.equal(lifecycle.receipts.receiptLastObservedForEveryParent, true);
  assert.equal(lifecycle.receipts.distinctRequestedAuthorityDigests.length, 3);
  assert.equal(new Set(lifecycle.receipts.distinctRequestedAuthorityDigests).size, 3);
  assert.equal(new Set(lifecycle.receipts.distinctInvocationDigests).size, 3);
  assert.deepEqual(lifecycle.receipts.compile.freshChildPhases, ["prepare", "compile"]);
  assert.equal(lifecycle.receipts.privateNpmConfigurations.length, 3);
  assert.equal(new Set(lifecycle.receipts.distinctPrivateNpmOperationRoots).size, 3);
  assert.equal(lifecycle.receipts.stableRuntimeExcludedInvocationPaths, true);
  assert.equal(
    lifecycle.receipts.privateNpmConfigurations.every(
      (entry) =>
        entry.pathsDistinctCaseInsensitively === true &&
        entry.containedByExactOperationRoot === true &&
        entry.outsideRepositoryCandidateAndCache === true &&
        entry.hostConfigurationExcluded === true &&
        entry.preSpawnValidation.everySpawnValidated === true &&
        entry.preSpawnValidation.count === entry.preSpawnValidation.events.length &&
        entry.npmInspection.userConfig.reportedPath === entry.userConfig.path &&
        entry.npmInspection.globalConfig.reportedPath === entry.globalConfig.path,
    ),
    true,
  );
  assert.deepEqual(lifecycle.receipts.approve.freshChildPhases, ["prepare", "compile", "approve"]);
  assert.deepEqual(lifecycle.receipts.verify.freshChildPhases, [
    "prepare",
    "compile",
    "approve",
    "verify",
  ]);

  assert.deepEqual(
    lifecycle.negativeRoutes.map((entry) => entry.label),
    [
      "wrong canonical-gate digest",
      "wrong owner compilation digest",
      "wrong owner package digest",
      "package file substitution",
      "stable binding substitution",
      "phase authority substitution",
      "stale output",
      "conflicting promoted output",
      "receipt-last interrupted promotion",
      "wrong raw handoff digest",
      "pre-spawn lock rejection emits immutable receipt",
      "failed exact-lock install emits immutable receipt",
    ],
  );
  assert.equal(
    lifecycle.negativeRoutes.every((entry) => entry.status === "pass"),
    true,
  );
  const setupFailureRoute = lifecycle.negativeRoutes.at(-2);
  assert.equal(setupFailureRoute.route, "copied-production-canonical-gate");
  assert.equal(setupFailureRoute.cleanup.attempted, true);
  assert.equal(setupFailureRoute.cleanup.removed, false);
  assert.equal(setupFailureRoute.cleanup.absentAfter, true);
  assert.equal(setupFailureRoute.cleanup.error, null);
  assert.match(setupFailureRoute.error, /^SyntaxError:/u);
  assert.match(setupFailureRoute.malformedLock.digest, /^sha256:[0-9a-f]{64}$/u);

  const installFailureRoute = lifecycle.negativeRoutes.at(-1);
  assert.equal(installFailureRoute.route, "copied-production-canonical-gate");
  assert.equal(installFailureRoute.cleanup.attempted, true);
  assert.equal(installFailureRoute.cleanup.absentAfter, true);
  assert.equal(installFailureRoute.cleanup.error, null);
  assert.match(installFailureRoute.installStderr.digest, /^sha256:[0-9a-f]{64}$/u);
  assert.ok(installFailureRoute.installStderr.bytes > 0);
  assert.match(installFailureRoute.error, /Candidate dependency installation failed/u);

  for (const [path, expected] of Object.entries(PRODUCTION_IDENTITIES)) {
    assert.deepEqual(lifecycle.sourceFrozenBefore[path], expected);
    assert.deepEqual(lifecycle.cleanup.sourceFrozenAfter[path], expected);
  }
  assert.equal(lifecycle.cleanup.attempted, true);
  assert.equal(lifecycle.cleanup.rootRemoved, true);
  assert.equal(lifecycle.cleanup.sourceStatusUnchanged, true);
  assert.ok(lifecycle.lifecycleDurationMs > 0);
});
