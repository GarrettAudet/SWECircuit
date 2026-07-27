import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { RELEASE_GATE_TEST_HOOKS } from "../../scripts/run-v12-release-gate.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const ENCLOSING_GIT_ENVIRONMENT = Object.freeze({ ...process.env });

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

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

assert.equal(await pathExists(join(ROOT, ".git")), false);
const head = runEnclosingGit(["rev-parse", "--verify", "HEAD"]);
assert.equal(head.signal, null);
assert.equal(head.status, 0, Buffer.from(head.stderr ?? []).toString("utf8"));
const candidateCommit = Buffer.from(head.stdout).toString("ascii").trim();
assert.match(candidateCommit, /^[0-9a-f]{40}$/u);

let defaultFailure = null;
try {
  await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit);
} catch (error) {
  defaultFailure = error instanceof Error ? error.message : String(error);
}
assert.match(defaultFailure, /Unable to resolve candidate commit/u);

let materialization;
let gitContext;
let materializationRoot;
let gitContextRoot;
let nestedSource;
let nestedContext;
try {
  materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit, {
    gitRunner: runEnclosingGit,
  });
  materializationRoot = materialization.root;
  gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
    candidateCommit,
    materialization.root,
    { sourceGitRunner: runEnclosingGit },
  );
  gitContextRoot = gitContext.root;
  nestedSource = await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
    materialization.root,
    materialization.entries,
  );
  nestedContext = RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext);
  assert.deepEqual(nestedSource, {
    files: materialization.source.files,
    bytes: materialization.source.bytes,
    digest: materialization.source.digest,
  });
  assert.deepEqual(nestedContext, {
    head: candidateCommit,
    trackedState: "clean",
  });
} finally {
  if (gitContext !== undefined) {
    await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
  }
  if (materialization !== undefined) {
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
  }
}

assert.equal(await pathExists(gitContextRoot), false);
assert.equal(await pathExists(materializationRoot), false);
process.stdout.write(
  `${JSON.stringify({
    outcome: "pass",
    candidateCommit,
    defaultFailure,
    nestedSource,
    nestedContext,
    cleanup: {
      gitContextRemoved: true,
      materializationRemoved: true,
    },
  })}\n`,
);
