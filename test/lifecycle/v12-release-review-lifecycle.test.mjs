import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdtemp, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { RELEASE_GATE_TEST_HOOKS } from "../../scripts/run-v12-release-gate.mjs";
import { PRODUCTION_IDENTITIES } from "../helpers/v12-release-review-lifecycle.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const LIFECYCLE_PATH = "test/fixtures/v12-release-review-lifecycle-child.mjs";

test("isolated copied production entrypoints complete one exact compile-to-verify lifecycle", {
  timeout: 3_900_000,
}, async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r26-lifecycle-")));
  const outputPath = join(root, "lifecycle.json");
  const headProbe = spawnSync(
    "git",
    ["-c", "core.longpaths=true", "rev-parse", "--verify", "HEAD"],
    {
      cwd: ROOT,
      env: process.env,
      encoding: "utf8",
      timeout: 30_000,
      windowsHide: true,
    },
  );
  assert.equal(headProbe.signal, null, "source HEAD probe was terminated");
  assert.equal(headProbe.status, 0, headProbe.stderr);
  const candidateCommit = headProbe.stdout.trim();
  assert.match(candidateCommit, /^[0-9a-f]{40}$/u);

  let materialization;
  let gitContext;
  let lifecycle;
  try {
    materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit);
    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      materialization.root,
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
  assert.match(lifecycle.fixture.hostNpmSupply.version, /^11\./u);
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
    ],
  );
  assert.equal(
    lifecycle.negativeRoutes.every((entry) => entry.status === "pass"),
    true,
  );

  for (const [path, expected] of Object.entries(PRODUCTION_IDENTITIES)) {
    assert.deepEqual(lifecycle.sourceFrozenBefore[path], expected);
    assert.deepEqual(lifecycle.cleanup.sourceFrozenAfter[path], expected);
  }
  assert.equal(lifecycle.cleanup.attempted, true);
  assert.equal(lifecycle.cleanup.rootRemoved, true);
  assert.equal(lifecycle.cleanup.sourceStatusUnchanged, true);
  assert.ok(lifecycle.lifecycleDurationMs > 0);
});
