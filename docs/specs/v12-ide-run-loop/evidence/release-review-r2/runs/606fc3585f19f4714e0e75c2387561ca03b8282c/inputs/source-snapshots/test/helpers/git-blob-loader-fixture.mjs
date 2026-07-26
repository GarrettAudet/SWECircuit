import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const BINARY_FIXTURE_BYTES = Buffer.from([0x00, 0x0a, 0x0d, 0x7f, 0x80, 0xff]);

export function fixtureGitEnvironment(source = process.env) {
  const environment = { ...source };
  for (const key of Object.keys(environment)) {
    if (key.toUpperCase().startsWith("GIT_")) {
      delete environment[key];
    }
  }
  environment.GIT_CONFIG_GLOBAL = process.platform === "win32" ? "NUL" : "/dev/null";
  environment.GIT_CONFIG_NOSYSTEM = "1";
  environment.GIT_TERMINAL_PROMPT = "0";
  return environment;
}

function runFixtureProcess(command, root, args, options = {}, source = process.env) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: null,
    env: fixtureGitEnvironment(source),
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

function runFixtureGit(root, args, options = {}) {
  return runFixtureProcess("git", root, args, options);
}

export function observeFixtureChildEnvironment(source = process.env) {
  const result = runFixtureProcess(
    process.execPath,
    process.cwd(),
    ["--input-type=module", "--eval", "process.stdout.write(JSON.stringify(process.env));"],
    {},
    source,
  );
  return JSON.parse(Buffer.from(result.stdout).toString("utf8"));
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
