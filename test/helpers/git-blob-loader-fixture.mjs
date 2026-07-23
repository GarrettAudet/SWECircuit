import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const BINARY_FIXTURE_BYTES = Buffer.from([0x00, 0x0a, 0x0d, 0x7f, 0x80, 0xff]);

export function fixtureGitEnvironment(source = process.env) {
  const environment = { ...source };
  const repositoryKeys = new Set([
    "GIT_ALTERNATE_OBJECT_DIRECTORIES",
    "GIT_CEILING_DIRECTORIES",
    "GIT_COMMON_DIR",
    "GIT_DIR",
    "GIT_INDEX_FILE",
    "GIT_INTERNAL_SUPER_PREFIX",
    "GIT_OBJECT_DIRECTORY",
    "GIT_OPTIONAL_LOCKS",
    "GIT_PREFIX",
    "GIT_WORK_TREE",
  ]);
  for (const key of Object.keys(environment)) {
    const upper = key.toUpperCase();
    if (repositoryKeys.has(upper) || /^GIT_CONFIG_(?:COUNT|KEY_\d+|VALUE_\d+)$/u.test(upper)) {
      delete environment[key];
    }
  }
  environment.GIT_CONFIG_GLOBAL = process.platform === "win32" ? "NUL" : "/dev/null";
  environment.GIT_CONFIG_NOSYSTEM = "1";
  environment.GIT_TERMINAL_PROMPT = "0";
  return environment;
}

function runFixtureGit(root, args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: null,
    env: fixtureGitEnvironment(),
    input: options.input,
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(Buffer.from(result.stderr ?? []).toString("utf8"));
  }
  return result;
}

function fixtureGitOutput(root, args, options = {}) {
  return Buffer.from(runFixtureGit(root, args, options).stdout);
}

function exactCommit(root) {
  return fixtureGitOutput(root, ["rev-parse", "--verify", "HEAD"]).toString("ascii").trim();
}

async function commitFixture(root, message) {
  runFixtureGit(root, ["add", "--all"]);
  runFixtureGit(root, [
    "-c",
    "user.name=SWECircuit Tests",
    "-c",
    "user.email=tests@swecircuit.invalid",
    "commit",
    "--quiet",
    "-m",
    message,
  ]);
  return exactCommit(root);
}

export async function createGitBlobLoaderFixture() {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-git-batch-"));
  await mkdir(join(root, "nested"));
  runFixtureGit(root, ["init", "--quiet"]);
  await writeFile(join(root, "alpha.txt"), "shared blob\n", "utf8");
  await writeFile(join(root, "nested", "beta.txt"), "shared blob\n", "utf8");
  await writeFile(join(root, "binary.bin"), BINARY_FIXTURE_BYTES);
  const small = await commitFixture(root, "small fixture");

  await mkdir(join(root, "many"));
  for (let index = 0; index < 32; index += 1) {
    await writeFile(
      join(root, "many", `entry-${String(index).padStart(2, "0")}.txt`),
      `unique fixture ${index}\n`,
      "utf8",
    );
  }
  const large = await commitFixture(root, "large fixture");

  return {
    root,
    revisions: [
      { commit: small, files: 3 },
      { commit: large, files: 35 },
    ],
  };
}

export function createRecordedGitRunner(root, calls) {
  return (args, options = {}) => {
    calls.push({
      args: [...args],
      input: options.input === undefined ? null : Buffer.from(options.input),
    });
    return runFixtureGit(root, args, options);
  };
}

export function createRecordedGitOutput(root, calls) {
  const runner = createRecordedGitRunner(root, calls);
  return (args, options = {}) => Buffer.from(runner(args, options).stdout);
}

export function assertConstantBatchRead(calls, fileCount) {
  const batchCalls = calls.filter(
    ({ args }) => args.length === 2 && args[0] === "cat-file" && args[1] === "--batch",
  );
  const perBlobCalls = calls.filter(
    ({ args }) => args.length >= 2 && args[0] === "cat-file" && args[1] === "blob",
  );
  assert.equal(calls.length, 4);
  assert.equal(batchCalls.length, 1);
  assert.equal(perBlobCalls.length, 0);
  assert.ok(batchCalls[0].input);
  const requested = batchCalls[0].input.toString("ascii").trim().split("\n");
  assert.deepEqual(requested, [...new Set(requested)].sort());
  assert.ok(requested.length < fileCount, "duplicate blobs must be requested only once");
}
