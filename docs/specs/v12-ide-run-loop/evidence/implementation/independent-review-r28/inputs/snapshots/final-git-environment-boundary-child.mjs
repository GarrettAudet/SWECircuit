import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { isAbsolute, join, resolve } from "node:path";

import { V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS } from "../helpers/v12-release-review-lifecycle.mjs";

const root = resolve(process.argv[2] ?? "");
assert.equal(isAbsolute(root), true, "probe root must be absolute");

const fixtureRoot = join(root, "fixture");
const samplePath = "sample.txt";
const sampleBytes = Buffer.from("nested fixture Git boundary\n", "utf8");
await mkdir(fixtureRoot, { recursive: true });
await writeFile(join(fixtureRoot, samplePath), sampleBytes);

const { commit, gitEnvironment } =
  await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.initializeFixtureGit(fixtureRoot);
const authenticated = await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.authenticateFixtureBlobs(
  fixtureRoot,
  commit,
  {
    [samplePath]: {
      bytes: sampleBytes.byteLength,
      digest: `sha256:${createHash("sha256").update(sampleBytes).digest("hex")}`,
    },
  },
  gitEnvironment,
);

await assert.rejects(
  V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.runGit(fixtureRoot, ["status"]),
  /explicit environment/u,
);

const cacheRoot = join(root, "cache");
const typeScriptEntrypoint = join(root, "tools", "tsc");
const gateEnvironment = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.gateEnvironment(
  cacheRoot,
  typeScriptEntrypoint,
);
const parentEnvironment = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parentEnvironment(
  cacheRoot,
  ["sha256:", "a".repeat(64)].join(""),
  join(root, "tools", "npm-cli.js"),
  join(root, "tools", "git"),
);

const gitKeys = (environment) =>
  Object.keys(environment)
    .filter((key) => key.toUpperCase().startsWith("GIT_"))
    .sort();
const expectedGitKeys = ["GIT_CONFIG_GLOBAL", "GIT_CONFIG_NOSYSTEM", "GIT_TERMINAL_PROMPT"];
assert.deepEqual(gitKeys(gitEnvironment), [
  "GIT_AUTHOR_DATE",
  "GIT_COMMITTER_DATE",
  ...expectedGitKeys,
]);
assert.equal(gitEnvironment.GIT_AUTHOR_DATE, "2000-01-01T00:00:00Z");
assert.equal(gitEnvironment.GIT_COMMITTER_DATE, "2000-01-01T00:00:00Z");
for (const environment of [gateEnvironment, parentEnvironment]) {
  assert.deepEqual(gitKeys(environment), expectedGitKeys);
  assert.equal(environment.GIT_CONFIG_NOSYSTEM, "1");
  assert.equal(environment.GIT_CONFIG_GLOBAL, process.platform === "win32" ? "NUL" : "/dev/null");
  assert.equal(environment.GIT_TERMINAL_PROMPT, "0");
  assert.equal(environment.SWECIRCUIT_ENVIRONMENT_SENTINEL, "preserved");
}

assert.equal(gateEnvironment.npm_config_cache, cacheRoot);
assert.equal(gateEnvironment.SWECIRCUIT_TYPESCRIPT_ENTRYPOINT, typeScriptEntrypoint);
assert.equal(parentEnvironment.SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE, cacheRoot);

process.stdout.write(
  `${JSON.stringify({
    commit,
    authenticated,
    gitKeys: {
      fixture: gitKeys(gitEnvironment),
      gate: gitKeys(gateEnvironment),
      parent: gitKeys(parentEnvironment),
    },
    explicitEnvironmentRequired: true,
  })}\n`,
);
