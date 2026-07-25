import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { RELEASE_GATE_TEST_HOOKS } from "../scripts/run-v12-release-gate.mjs";

const candidateCommit = process.argv[2];
assert.match(candidateCommit ?? "", /^[0-9a-f]{40}$/u);

const outputRoot = join(process.cwd(), ".local");
const npmCli = RELEASE_GATE_TEST_HOOKS.canonicalCommand.arguments[0];
let materialization;
let gitContext;
let dependenciesInstalled = false;

function runNpm(root, environment, arguments_) {
  const result = spawnSync(
    RELEASE_GATE_TEST_HOOKS.canonicalCommand.executable,
    [npmCli, ...arguments_],
    {
      cwd: root,
      env: environment,
      encoding: null,
      maxBuffer: 128 * 1024 * 1024,
      windowsHide: true,
    },
  );
  if (result.error) {
    throw result.error;
  }
  return result;
}

try {
  materialization =
    await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit);
  gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
    candidateCommit,
    materialization.root,
  );
  const environment = RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext);
  const dependencies = await RELEASE_GATE_TEST_HOOKS.installCandidateDependencies(
    materialization.root,
    materialization.entries,
    environment,
    RELEASE_GATE_TEST_HOOKS.runtimeIdentity(),
  );
  assert.equal(dependencies.ready, true, dependencies.setupError);
  dependenciesInstalled = true;

  const build = runNpm(materialization.root, environment, ["run", "build", "--silent"]);
  await writeFile(join(outputRoot, "r61-lifecycle-build.stdout.log"), build.stdout ?? Buffer.alloc(0));
  await writeFile(join(outputRoot, "r61-lifecycle-build.stderr.log"), build.stderr ?? Buffer.alloc(0));
  assert.equal(build.signal, null);
  assert.equal(build.status, 0);

  const lifecycle = runNpm(materialization.root, environment, ["run", "test:lifecycle"]);
  await writeFile(
    join(outputRoot, "r61-lifecycle-test.stdout.log"),
    lifecycle.stdout ?? Buffer.alloc(0),
  );
  await writeFile(
    join(outputRoot, "r61-lifecycle-test.stderr.log"),
    lifecycle.stderr ?? Buffer.alloc(0),
  );
  await writeFile(
    join(outputRoot, "r61-lifecycle-diagnosis.json"),
    `${JSON.stringify(
      {
        candidateCommit,
        materialization: materialization.source,
        build: { status: build.status, signal: build.signal },
        lifecycle: { status: lifecycle.status, signal: lifecycle.signal },
      },
      null,
      2,
    )}\n`,
  );
  process.stdout.write(
    `${JSON.stringify({
      candidateCommit,
      buildStatus: build.status,
      lifecycleStatus: lifecycle.status,
    })}\n`,
  );
  process.exitCode = lifecycle.status ?? 1;
} finally {
  if (dependenciesInstalled && materialization !== undefined) {
    await RELEASE_GATE_TEST_HOOKS.removeCandidateDependencies(
      materialization.root,
      materialization.entries,
    );
  }
  if (gitContext !== undefined) {
    await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
  }
  if (materialization !== undefined) {
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
  }
}
