import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  cp,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { RELEASE_REVIEW_TEST_HOOKS } from "../../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import {
  observeTypeScriptVersion,
  resolveTypeScriptEntrypointBinding,
  TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY,
} from "../../scripts/run-typescript.mjs";
import { RELEASE_GATE_TEST_HOOKS } from "../../scripts/run-v12-release-gate.mjs";
import { RELEASE_REVIEW_PARENT_TEST_HOOKS } from "../../scripts/run-v12-release-review.mjs";

const SOURCE_ROOT = fileURLToPath(new URL("../../", import.meta.url));
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const RUN_ROOT = `${REVIEW_ROOT}/runs`;
const GATE_ROOT = `${REVIEW_ROOT}/inputs/canonical-gates`;
const IMPLEMENTATION_ROOT = "docs/specs/v12-ide-run-loop/evidence/implementation";
const R22_ROOT = `${IMPLEMENTATION_ROOT}/release-correction-r22`;
const FIRST_POST_FIXTURE_CORRECTION_REVISION = 22;
const CORRECTION_REVISION_ROOT_PATTERN = new RegExp(
  `^${IMPLEMENTATION_ROOT}/release-correction-r([1-9][0-9]*)(?:/|$)`,
  "u",
);
const PARENT_PATH = "scripts/run-v12-release-review.mjs";
const GATE_PATH = "scripts/run-v12-release-gate.mjs";
const HARNESS_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const GATE_TEST_PATH = "test/v12-release-gate.test.mjs";
const TYPESCRIPT_RUNNER_PATH = "scripts/run-typescript.mjs";
const TYPESCRIPT_SMOKE_PATH = "test/fixtures/v12-lifecycle-typescript-smoke.ts";
const TYPESCRIPT_COMPILE_SENTINEL = "SWECIRCUIT_LIFECYCLE_TYPESCRIPT_COMPILE sentinel-v1";
const TYPESCRIPT_MUTATION_SENTINEL = "SWECIRCUIT_LIFECYCLE_TYPESCRIPT_MUTATION sentinel-v1";
const FIXTURE_TYPESCRIPT_ARGUMENTS = Object.freeze([
  "--ignoreConfig",
  "--noEmit",
  "--pretty",
  "false",
  "--skipLibCheck",
  TYPESCRIPT_SMOKE_PATH,
]);
const PACKAGE_PATH = "package.json";
const LOCK_PATH = "package-lock.json";
const PROCESS_TIMEOUT_MS = 900_000;
const MAX_OUTPUT_BYTES = 536_870_912;

const FIXTURE_VERIFY_COMMAND = [
  `node --check ${GATE_PATH}`,
  `node --check ${PARENT_PATH}`,
  `node --check ${HARNESS_PATH}`,
  `node --check ${VERIFIER_PATH}`,
  `node ${TYPESCRIPT_RUNNER_PATH} ${FIXTURE_TYPESCRIPT_ARGUMENTS.join(" ")}`,
].join(" && ");

export const PRODUCTION_IDENTITIES = Object.freeze({
  [PARENT_PATH]: Object.freeze({
    bytes: 102_629,
    digest: "sha256:433c8840bb18d377212400dbe32d3c2b479c09c1ab0bc0abf8c9752e6b8e8f62",
  }),
  [GATE_PATH]: Object.freeze({
    bytes: 47_552,
    digest: "sha256:5f8820b9ec79252aa519346246f3dd3d436e206208d9bfefe66a612cbaf22f61",
  }),
  [HARNESS_PATH]: Object.freeze({
    bytes: 141_650,
    digest: "sha256:c290abcd9ce48491bf92fc3495d179f5ed734d506eaeb71ee42502afcc04567f",
  }),
  [VERIFIER_PATH]: Object.freeze({
    bytes: 30_840,
    digest: "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
  }),
  [GATE_TEST_PATH]: Object.freeze({
    bytes: 48_604,
    digest: "sha256:5daff1366e453c9cc28985d3ecd65793708127e88ffb53d7413ca600721511e2",
  }),
  [TYPESCRIPT_RUNNER_PATH]: Object.freeze({
    bytes: 7_064,
    digest: "sha256:3390a3bdea97140e8c02ad0f917dcb62bbaf2e12921ea5fd1a2255362475c25f",
  }),
  [TYPESCRIPT_SMOKE_PATH]: Object.freeze({
    bytes: 87,
    digest: "sha256:2bd37583948fb1aee98dc67f3c3cacbf4437eb9296c4b90f83bb7eacbe0332b5",
  }),
  [PACKAGE_PATH]: Object.freeze({
    bytes: 4_043,
    digest: "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
  }),
});

const LOCK_IDENTITY = Object.freeze({
  bytes: 21_014,
  digest: "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
});

const COPY_EXCLUSIONS = Object.freeze([
  ".git",
  ".local",
  "dist",
  "node_modules",
  `${REVIEW_ROOT}/handoffs`,
  `${REVIEW_ROOT}/inputs/source-snapshots`,
  `${REVIEW_ROOT}/package`,
  `${REVIEW_ROOT}/approval.json`,
  `${REVIEW_ROOT}/compilation-summary.json`,
  `${REVIEW_ROOT}/package-envelope.json`,
  `${REVIEW_ROOT}/phase-metadata.json`,
  `${REVIEW_ROOT}/request.json`,
  RUN_ROOT,
  GATE_ROOT,
  R22_ROOT,
]);

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function canonicalJson(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function strictUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    assert.fail(`${label} is not strict UTF-8`);
  }
}

function parseCanonicalJson(bytes, label) {
  const value = JSON.parse(strictUtf8(bytes, label));
  assert.deepEqual(Buffer.from(bytes), canonicalJson(value), `${label} must be canonical JSON`);
  return value;
}

function absolute(root, logicalPath) {
  return resolve(root, ...logicalPath.split("/"));
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

async function identity(path) {
  const bytes = await readFile(path);
  return { bytes: bytes.byteLength, digest: digest(bytes) };
}

function assertIdentity(actual, expected, label) {
  assert.deepEqual(actual, expected, `${label} byte identity changed`);
}

function setEnvironmentValue(environment, key, value) {
  for (const existing of Object.keys(environment)) {
    if (existing.toLowerCase() === key.toLowerCase()) {
      delete environment[existing];
    }
  }
  if (value !== null) {
    environment[key] = value;
  }
}

function fixtureRepositoryEnvironment(sourceEnvironment = process.env) {
  const environment = { ...sourceEnvironment };
  for (const key of Object.keys(environment)) {
    if (key.toUpperCase().startsWith("GIT_")) {
      Reflect.deleteProperty(environment, key);
    }
  }
  setEnvironmentValue(environment, "GIT_CONFIG_NOSYSTEM", "1");
  setEnvironmentValue(
    environment,
    "GIT_CONFIG_GLOBAL",
    process.platform === "win32" ? "NUL" : "/dev/null",
  );
  setEnvironmentValue(environment, "GIT_TERMINAL_PROMPT", "0");
  return environment;
}

function directKillEvidence(child, signal = undefined) {
  try {
    return { accepted: child.kill(signal), error: null };
  } catch (error) {
    return {
      accepted: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function terminateProcessTree(child) {
  const started = process.hrtime.bigint();
  const pid = child.pid;
  if (!Number.isInteger(pid)) {
    return {
      method: "unavailable-pid",
      pid: null,
      accepted: false,
      durationMs: 0,
      error: "Child process had no integer PID.",
    };
  }

  if (process.platform === "win32") {
    const tree = await new Promise((resolvePromise) => {
      let killer;
      try {
        killer = spawn("taskkill.exe", ["/PID", String(pid), "/T", "/F"], {
          env: process.env,
          stdio: "ignore",
          windowsHide: true,
        });
      } catch (error) {
        resolvePromise({
          status: null,
          signal: null,
          error: error instanceof Error ? error.message : String(error),
        });
        return;
      }
      let settled = false;
      killer.once("error", (error) => {
        if (!settled) {
          settled = true;
          resolvePromise({
            status: null,
            signal: null,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      });
      killer.once("close", (status, signal) => {
        if (!settled) {
          settled = true;
          resolvePromise({ status, signal, error: null });
        }
      });
    });
    const treeAccepted = tree.status === 0 && tree.signal === null && tree.error === null;
    const fallback = treeAccepted ? null : directKillEvidence(child);
    const accepted = treeAccepted || fallback?.accepted === true;
    return {
      method: "taskkill-tree",
      pid,
      accepted,
      tree,
      directFallback: fallback,
      durationMs: Number(process.hrtime.bigint() - started) / 1_000_000,
    };
  }

  let groupError = null;
  try {
    process.kill(-pid, "SIGKILL");
  } catch (error) {
    groupError = error instanceof Error ? error.message : String(error);
  }
  const groupAccepted = groupError === null;
  const fallback = groupAccepted ? null : directKillEvidence(child, "SIGKILL");
  const accepted = groupAccepted || fallback?.accepted === true;
  return {
    method: "process-group-sigkill",
    pid,
    accepted,
    groupError,
    directFallback: fallback,
    durationMs: Number(process.hrtime.bigint() - started) / 1_000_000,
  };
}

async function runProcess(command, arguments_, options = {}) {
  const started = process.hrtime.bigint();
  const timeoutMs = options.timeoutMs ?? PROCESS_TIMEOUT_MS;
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, arguments_, {
      cwd: options.cwd,
      env: options.env,
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
      windowsHide: true,
    });
    const stdout = [];
    const stderr = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let timedOut = false;
    let timeoutAtMs = null;
    let terminationPromise = Promise.resolve(null);
    let settled = false;

    const timer = setTimeout(() => {
      timedOut = true;
      timeoutAtMs = Number(process.hrtime.bigint() - started) / 1_000_000;
      terminationPromise = terminateProcessTree(child);
    }, timeoutMs);

    const collect = (chunks, kind) => (chunk) => {
      const bytes = Buffer.from(chunk);
      if (kind === "stdout") {
        stdoutBytes += bytes.byteLength;
        assert.ok(stdoutBytes <= MAX_OUTPUT_BYTES, "child stdout exceeded the test bound");
      } else {
        stderrBytes += bytes.byteLength;
        assert.ok(stderrBytes <= MAX_OUTPUT_BYTES, "child stderr exceeded the test bound");
      }
      chunks.push(bytes);
    };
    child.stdout.on("data", collect(stdout, "stdout"));
    child.stderr.on("data", collect(stderr, "stderr"));
    child.once("error", (error) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        rejectPromise(error);
      }
    });
    child.once("close", async (status, signal) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      const termination = await terminationPromise;
      resolvePromise({
        command,
        arguments: [...arguments_],
        pid: child.pid,
        status,
        signal,
        timedOut,
        timeout:
          timedOut === true
            ? {
                boundMs: timeoutMs,
                observedAtMs: timeoutAtMs,
                termination,
              }
            : null,
        durationMs: Number(process.hrtime.bigint() - started) / 1_000_000,
        stdout: Buffer.concat(stdout),
        stderr: Buffer.concat(stderr),
      });
    });
  });
}

function commandFailure(result) {
  return strictUtf8(result.stderr, "command stderr").trim();
}

function assertParentOperationRootCleanup(result, label) {
  if (result.operationRootCleanup === undefined) {
    return;
  }
  const cleanup = result.operationRootCleanup;
  assert.equal(
    cleanup.testOwnedTempRootRemoved,
    true,
    `${label} test-owned temp root was not removed: ${cleanup.cleanupError ?? "unknown failure"}`,
  );
  assert.equal(
    cleanup.noNewOperationRoots,
    true,
    `${label} left owned operation roots: ${cleanup.leakedOperationRoots.join(", ") || "unknown"}`,
  );
  assert.equal(cleanup.cleanupError, null, `${label} temp cleanup failed`);
}

function assertCommandPassed(result, label) {
  assert.equal(result.timedOut, false, `${label} timed out`);
  assert.equal(result.signal, null, `${label} was signaled`);
  assert.equal(result.status, 0, `${label} failed: ${commandFailure(result)}`);
  assertParentOperationRootCleanup(result, label);
  return result;
}

function assertCommandFailed(result, label, pattern) {
  assert.equal(result.timedOut, false, `${label} timed out`);
  assert.equal(result.signal, null, `${label} was signaled`);
  assert.notEqual(result.status, 0, `${label} unexpectedly passed`);
  const stderr = commandFailure(result);
  assert.match(stderr, pattern, `${label} failed through the wrong route: ${stderr}`);
  assertParentOperationRootCleanup(result, label);
  return stderr;
}

async function runGit(repository, arguments_, options = {}) {
  assert.equal(
    options.env !== null && typeof options.env === "object",
    true,
    "Git commands require an explicit environment",
  );
  const result = await runProcess("git", ["-c", "core.longpaths=true", ...arguments_], {
    cwd: repository,
    env: options.env,
    timeoutMs: options.timeoutMs ?? 180_000,
  });
  return assertCommandPassed(result, `git ${arguments_.join(" ")}`);
}

function isContainedPath(root, target) {
  const fromRoot = relative(resolve(root), resolve(target));
  return (
    fromRoot === "" ||
    (!isAbsolute(fromRoot) && fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`))
  );
}

function rootsAreDisjoint(left, right) {
  return !isContainedPath(left, right) && !isContainedPath(right, left);
}

function normalizedRelative(path) {
  return path.replaceAll("\\", "/");
}

function isPostFixtureCorrection(relativePath) {
  const match = CORRECTION_REVISION_ROOT_PATTERN.exec(relativePath);
  return match !== null && Number.parseInt(match[1], 10) >= FIRST_POST_FIXTURE_CORRECTION_REVISION;
}

function isExcluded(relativePath) {
  return (
    isPostFixtureCorrection(relativePath) ||
    COPY_EXCLUSIONS.some(
      (prefix) => relativePath === prefix || relativePath.startsWith(`${prefix}/`),
    )
  );
}

async function copyFixtureRepository(destination) {
  await cp(SOURCE_ROOT, destination, {
    recursive: true,
    filter(source) {
      const relativePath = normalizedRelative(relative(SOURCE_ROOT, source));
      return relativePath === "" || !isExcluded(relativePath);
    },
  });
  for (const excluded of COPY_EXCLUSIONS) {
    assert.equal(
      await pathExists(absolute(destination, excluded)),
      false,
      `fixture copy retained excluded path ${excluded}`,
    );
  }
  const implementationEntries = await readdir(absolute(SOURCE_ROOT, IMPLEMENTATION_ROOT), {
    withFileTypes: true,
  });
  for (const entry of implementationEntries) {
    const relativePath = `${IMPLEMENTATION_ROOT}/${entry.name}`;
    if (entry.isDirectory() && isPostFixtureCorrection(relativePath)) {
      assert.equal(
        await pathExists(absolute(destination, relativePath)),
        false,
        `fixture copy retained post-R21 correction evidence ${relativePath}`,
      );
    }
  }
}

async function copyHostNpmCacheSupply(destination) {
  const source = RELEASE_GATE_TEST_HOOKS.hostNpmCache;
  assert.equal(await pathExists(source), true, "release-gate host npm cache supply is missing");
  assert.equal(
    await pathExists(destination),
    false,
    "lifecycle-owned npm cache destination already exists",
  );
  const resolvedSource = await realpath(source);
  const sourceStats = await stat(resolvedSource);
  assert.equal(sourceStats.isDirectory(), true, "release-gate host npm cache is not a directory");
  assert.equal(
    rootsAreDisjoint(resolvedSource, destination),
    true,
    "release-gate host npm cache overlaps the lifecycle-owned copy",
  );
  await cp(resolvedSource, destination, { recursive: true });
  assert.equal((await stat(destination)).isDirectory(), true);
  return Object.freeze({
    source: resolvedSource,
    sourceSelection: "release-gate-host-npm-cache",
    destination,
    rootsDisjoint: true,
  });
}

async function authenticateFiles(root, identities) {
  const rows = {};
  for (const [path, expected] of Object.entries(identities)) {
    const actual = await identity(absolute(root, path));
    assertIdentity(actual, expected, path);
    rows[path] = actual;
  }
  return rows;
}

async function applyFixtureVerifyException(fixtureRoot) {
  const sourceBytes = await readFile(absolute(SOURCE_ROOT, PACKAGE_PATH));
  const fixturePath = absolute(fixtureRoot, PACKAGE_PATH);
  const copiedBytes = await readFile(fixturePath);
  assert.deepEqual(copiedBytes, sourceBytes, "fixture package must be exact before its exception");
  const sourcePackage = JSON.parse(strictUtf8(sourceBytes, "source package.json"));
  const fixturePackage = structuredClone(sourcePackage);
  const originalVerify = fixturePackage.scripts.verify;
  fixturePackage.scripts.verify = FIXTURE_VERIFY_COMMAND;
  const restored = structuredClone(fixturePackage);
  restored.scripts.verify = originalVerify;
  assert.deepEqual(
    restored,
    sourcePackage,
    "fixture package exception changed more than scripts.verify",
  );
  await writeFile(fixturePath, canonicalJson(fixturePackage));
  return {
    path: PACKAGE_PATH,
    originalVerify,
    fixtureVerify: FIXTURE_VERIFY_COMMAND,
    copiedIdentity: { bytes: sourceBytes.byteLength, digest: digest(sourceBytes) },
    committedIdentity: await identity(fixturePath),
    onlyScriptsVerifyChanged: true,
  };
}

async function initializeFixtureGit(fixtureRoot, sourceEnvironment = process.env) {
  const gitEnvironment = fixtureRepositoryEnvironment(sourceEnvironment);
  setEnvironmentValue(gitEnvironment, "GIT_AUTHOR_DATE", "2000-01-01T00:00:00Z");
  setEnvironmentValue(gitEnvironment, "GIT_COMMITTER_DATE", "2000-01-01T00:00:00Z");
  await runGit(fixtureRoot, ["init", "--initial-branch=main"], { env: gitEnvironment });
  await runGit(fixtureRoot, ["config", "core.autocrlf", "false"], { env: gitEnvironment });
  await runGit(fixtureRoot, ["config", "core.longpaths", "true"], { env: gitEnvironment });
  await runGit(fixtureRoot, ["config", "user.name", "SWECircuit Lifecycle Fixture"], {
    env: gitEnvironment,
  });
  await runGit(fixtureRoot, ["config", "user.email", "fixture@example.invalid"], {
    env: gitEnvironment,
  });
  await runGit(fixtureRoot, ["add", "--all"], { env: gitEnvironment });
  await runGit(
    fixtureRoot,
    ["commit", "--no-gpg-sign", "-m", "Revision 22 isolated production lifecycle"],
    { env: gitEnvironment },
  );
  const commit = strictUtf8(
    (await runGit(fixtureRoot, ["rev-parse", "HEAD"], { env: gitEnvironment })).stdout,
    "fixture commit",
  ).trim();
  assert.match(commit, /^[0-9a-f]{40}$/u);
  const trackedState = (
    await runGit(fixtureRoot, ["status", "--porcelain=v1", "--untracked-files=no"], {
      env: gitEnvironment,
    })
  ).stdout;
  assert.equal(trackedState.byteLength, 0, "fixture commit is not tracked-clean");
  return { commit, gitEnvironment };
}

async function authenticateFixtureBlobs(fixtureRoot, commit, expected, gitEnvironment) {
  const rows = {};
  for (const [path, identity_] of Object.entries(expected)) {
    const raw = (
      await runGit(fixtureRoot, ["cat-file", "blob", `${commit}:${path}`], {
        env: gitEnvironment,
      })
    ).stdout;
    const actual = { bytes: raw.byteLength, digest: digest(raw) };
    assertIdentity(actual, identity_, `fixture Git blob ${path}`);
    rows[path] = actual;
  }
  const treePaths = strictUtf8(
    (
      await runGit(fixtureRoot, ["ls-tree", "-r", "--name-only", commit], {
        env: gitEnvironment,
      })
    ).stdout,
    "fixture tree paths",
  )
    .split(/\r?\n/u)
    .filter(Boolean)
    .map(normalizedRelative);
  for (const excluded of COPY_EXCLUSIONS) {
    assert.equal(
      treePaths.some((path) => path === excluded || path.startsWith(`${excluded}/`)),
      false,
      `fixture commit contains excluded path ${excluded}`,
    );
  }
  assert.equal(
    treePaths.some(isPostFixtureCorrection),
    false,
    "fixture commit contains post-R21 correction evidence",
  );
  return {
    rows,
    treeFiles: treePaths.length,
    exclusions: [...COPY_EXCLUSIONS],
    postFixtureCorrectionExclusion: Object.freeze({
      implementationRoot: IMPLEMENTATION_ROOT,
      firstRevision: FIRST_POST_FIXTURE_CORRECTION_REVISION,
    }),
  };
}

async function resolveHostGitSupply(lifecycleRoot) {
  const execPathResult = await runProcess("git", ["--exec-path"], {
    cwd: SOURCE_ROOT,
    env: process.env,
    timeoutMs: 30_000,
  });
  assertCommandPassed(execPathResult, "host Git exec-path inspection");
  const execRoot = strictUtf8(execPathResult.stdout, "host Git exec path").trim();
  const sourceExecutable =
    process.platform === "win32"
      ? resolve(execRoot, "..", "..", "..", "cmd", "git.exe")
      : resolve(execRoot, "..", "..", "bin", "git");
  const sourceStats = await stat(sourceExecutable);
  let executable = sourceExecutable;
  let copiedClosure = null;
  if (sourceStats.nlink !== 1) {
    assert.equal(process.platform, "win32", "linked Git supply lacks a portable copy plan");
    const sourceRoot = resolve(execRoot, "..", "..", "..");
    const copiedRoot = join(lifecycleRoot, "host-git");
    await cp(sourceRoot, copiedRoot, { recursive: true });
    executable = join(copiedRoot, "cmd", "git.exe");
    const copiedStats = await stat(executable);
    assert.equal(copiedStats.nlink, 1, "copied host Git executable remains linked");
    assert.deepEqual(
      await identity(executable),
      await identity(sourceExecutable),
      "copied host Git executable bytes changed",
    );
    copiedClosure = {
      sourceRoot,
      sourceExecutable,
      sourceNlink: sourceStats.nlink,
      copiedRoot,
      copiedNlink: copiedStats.nlink,
      files: (await listRegularFiles(copiedRoot)).length,
      cleanup: "lifecycle-root-recursive-removal",
    };
  }
  const versionEnvironment = { ...process.env };
  setEnvironmentValue(
    versionEnvironment,
    "PATH",
    [dirname(executable), dirname(process.execPath)].join(delimiter),
  );
  const versionResult = await runProcess(executable, ["--version"], {
    cwd: SOURCE_ROOT,
    env: versionEnvironment,
    timeoutMs: 30_000,
  });
  assertCommandPassed(versionResult, "one-link host Git version inspection");
  return {
    path: executable,
    identity: await identity(executable),
    version: strictUtf8(versionResult.stdout, "host Git version").trim(),
    selection: "one-link executable from an exact disposable copy of the installed Git closure",
    copiedClosure,
  };
}
async function resolveHostNpmSupply() {
  const hostNpmCli = await realpath(
    join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js"),
  );
  const hostManifest = JSON.parse(
    await readFile(join(dirname(process.execPath), "node_modules", "npm", "package.json"), "utf8"),
  );
  const stats = await stat(hostNpmCli);
  assert.equal(
    stats.isFile() && stats.nlink === 1,
    true,
    "installed npm CLI must be one plain file",
  );
  assert.match(hostManifest.version, /^11\./u, "focused lifecycle requires installed npm 11");
  return {
    path: hostNpmCli,
    identity: await identity(hostNpmCli),
    version: hostManifest.version,
    selection: "installed npm CLI passed unchanged to the copied production parent",
    compatibilityAdapter: "absent",
  };
}

function parentEnvironment(
  cacheRoot,
  parentDigest,
  npmCliPath,
  gitExecutablePath,
  sourceEnvironment = process.env,
) {
  const environment = fixtureRepositoryEnvironment(sourceEnvironment);
  setEnvironmentValue(environment, "SWECIRCUIT_RELEASE_REVIEW_WORKER_CONTEXT", null);
  setEnvironmentValue(environment, "SWECIRCUIT_RELEASE_REVIEW_WORKER_TOKEN", null);
  setEnvironmentValue(environment, "SWECIRCUIT_RELEASE_REVIEW_PARENT_DIGEST", parentDigest);
  setEnvironmentValue(environment, "SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE", cacheRoot);
  setEnvironmentValue(environment, "npm_execpath", npmCliPath);
  setEnvironmentValue(
    environment,
    "PATH",
    [dirname(process.execPath), dirname(gitExecutablePath)].join(delimiter),
  );
  return environment;
}

function gateEnvironment(cacheRoot, typeScriptEntrypoint, sourceEnvironment = process.env) {
  const environment = fixtureRepositoryEnvironment(sourceEnvironment);
  setEnvironmentValue(environment, "npm_config_cache", cacheRoot);
  setEnvironmentValue(environment, "SWECIRCUIT_TYPESCRIPT_ENTRYPOINT", typeScriptEntrypoint);
  return environment;
}

function lifecycleCompilerAdapterSource(delegatedEntrypoint) {
  return [
    'import { spawnSync } from "node:child_process";',
    `const delegatedEntrypoint = ${JSON.stringify(delegatedEntrypoint)};`,
    "const arguments_ = process.argv.slice(2);",
    "const result = spawnSync(process.execPath, [delegatedEntrypoint, ...arguments_], {",
    "  cwd: process.cwd(),",
    "  env: process.env,",
    '  stdio: "inherit",',
    "  windowsHide: true,",
    "});",
    "if (result.error) {",
    "  throw result.error;",
    "}",
    "if (result.signal !== null) {",
    '  process.stderr.write("Delegated TypeScript was terminated by " + result.signal + ".\\n");',
    "  process.exitCode = 1;",
    "} else {",
    '  if (result.status === 0 && !arguments_.includes("--version")) {',
    `    process.stdout.write(${JSON.stringify(`${TYPESCRIPT_COMPILE_SENTINEL}\n`)});`,
    "  }",
    "  process.exitCode = result.status ?? 1;",
    "}",
    "",
  ].join("\n");
}

function mutatingLifecycleCompilerSource() {
  return [
    'import { writeFileSync } from "node:fs";',
    'import { fileURLToPath } from "node:url";',
    "const arguments_ = process.argv.slice(2);",
    'if (arguments_.includes("--version")) {',
    '  process.stdout.write("Version 0.0.0-swecircuit-mutation\\n");',
    "} else {",
    "  const ownPath = fileURLToPath(import.meta.url);",
    '  writeFileSync(ownPath, "export const swecircuitMutationPersisted = true;\\n", "utf8");',
    `  process.stdout.write(${JSON.stringify(`${TYPESCRIPT_MUTATION_SENTINEL}\n`)});`,
    "}",
    "",
  ].join("\n");
}

function environmentWithTypeScriptEntrypoint(sourceEnvironment, entrypoint) {
  const environment = { ...sourceEnvironment };
  setEnvironmentValue(environment, TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY, entrypoint);
  return environment;
}

async function writeLifecycleCompiler(path, source, fixtureRoot, label) {
  assert.equal(await pathExists(path), false, `${label} already exists`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, source, { encoding: "utf8", flag: "wx" });
  const environment = environmentWithTypeScriptEntrypoint({}, path);
  const binding = resolveTypeScriptEntrypointBinding({
    environment,
    projectRoot: fixtureRoot,
    outsidePolicy: "always",
    label,
  });
  assert.equal(binding.supplied, true);
  return binding;
}

async function createLifecycleTypeScriptSupply(
  lifecycleRoot,
  fixtureRoot,
  sourceEnvironment = process.env,
) {
  const delegatedBinding = resolveTypeScriptEntrypointBinding({
    environment: sourceEnvironment,
    projectRoot: SOURCE_ROOT,
    outsidePolicy: "supplied",
    label: "Delegated lifecycle TypeScript entrypoint",
  });
  const path = join(lifecycleRoot, "typescript-supply", "lifecycle-tsc.mjs");
  const binding = await writeLifecycleCompiler(
    path,
    lifecycleCompilerAdapterSource(delegatedBinding.path),
    fixtureRoot,
    "Lifecycle TypeScript adapter",
  );
  const environment = environmentWithTypeScriptEntrypoint(sourceEnvironment, binding.path);
  const version = observeTypeScriptVersion(binding, { cwd: fixtureRoot, environment });
  const receipt = Object.freeze({ ...binding, version });
  const smokeInput = await identity(absolute(fixtureRoot, TYPESCRIPT_SMOKE_PATH));
  assertIdentity(smokeInput, PRODUCTION_IDENTITIES[TYPESCRIPT_SMOKE_PATH], TYPESCRIPT_SMOKE_PATH);
  return Object.freeze({
    binding,
    delegatedBinding,
    environment,
    receipt,
    smokeInput,
    arguments: FIXTURE_TYPESCRIPT_ARGUMENTS,
    sentinel: TYPESCRIPT_COMPILE_SENTINEL,
  });
}

async function createMutatingLifecycleTypeScriptSupply(lifecycleRoot, fixtureRoot) {
  const path = join(lifecycleRoot, "mutation-typescript-supply", "mutating-tsc.mjs");
  const binding = await writeLifecycleCompiler(
    path,
    mutatingLifecycleCompilerSource(),
    fixtureRoot,
    "Mutating lifecycle TypeScript adapter",
  );
  const environment = environmentWithTypeScriptEntrypoint(process.env, binding.path);
  const version = observeTypeScriptVersion(binding, { cwd: fixtureRoot, environment });
  return Object.freeze({
    binding,
    environment,
    receipt: Object.freeze({ ...binding, version }),
    originalIdentity: Object.freeze({ bytes: binding.bytes, digest: binding.digest }),
    sentinel: TYPESCRIPT_MUTATION_SENTINEL,
  });
}

function parseLifecycleTypeScriptEvidence(rawLog, supply) {
  const text = strictUtf8(rawLog, "canonical TypeScript log");
  const prefix = "SWECIRCUIT_TYPESCRIPT_BINDING ";
  const receiptLines = text.split("\n").filter((line) => line.startsWith(prefix));
  assert.equal(receiptLines.length, 1, "canonical log must contain one TypeScript receipt");
  let receipt;
  try {
    receipt = JSON.parse(receiptLines[0].slice(prefix.length));
  } catch {
    assert.fail("canonical TypeScript receipt is not valid JSON");
  }
  assert.deepEqual(receipt, supply.receipt, "canonical TypeScript receipt changed");
  const sentinelCount = text.split(supply.sentinel).length - 1;
  assert.equal(sentinelCount, 1, "canonical log must contain one compiler sentinel");
  return Object.freeze({
    receipt,
    sentinel: supply.sentinel,
    sentinelCount,
  });
}

async function runPersistentCompilerMutationRoute(lifecycleRoot, cacheRoot) {
  const fixtureRoot = join(lifecycleRoot, "mutation-repository");
  let evidence;
  try {
    await copyFixtureRepository(fixtureRoot);
    const copiedProduction = await authenticateFiles(fixtureRoot, PRODUCTION_IDENTITIES);
    assertIdentity(
      await identity(absolute(fixtureRoot, LOCK_PATH)),
      LOCK_IDENTITY,
      "mutation fixture lockfile",
    );
    const fixtureException = await applyFixtureVerifyException(fixtureRoot);
    const { commit, gitEnvironment } = await initializeFixtureGit(fixtureRoot);
    const committedBlobs = await authenticateFixtureBlobs(
      fixtureRoot,
      commit,
      {
        ...PRODUCTION_IDENTITIES,
        [PACKAGE_PATH]: fixtureException.committedIdentity,
        [LOCK_PATH]: LOCK_IDENTITY,
      },
      gitEnvironment,
    );
    const supply = await createMutatingLifecycleTypeScriptSupply(lifecycleRoot, fixtureRoot);
    const gateResult = await runProcess(
      process.execPath,
      [absolute(fixtureRoot, GATE_PATH), commit],
      {
        cwd: fixtureRoot,
        env: gateEnvironment(cacheRoot, supply.binding.path),
      },
    );
    assert.equal(gateResult.timedOut, false, "mutation canonical gate timed out");
    assert.equal(gateResult.signal, null, "mutation canonical gate was signaled");
    assert.equal(gateResult.status, 2, "mutation canonical gate used the wrong failure route");
    const gateSummary = parseCanonicalJson(gateResult.stdout, "mutation canonical gate stdout");
    assert.equal(gateSummary.outcome, "fail");
    assert.equal(gateSummary.candidateCommit, commit);
    const receiptBytes = await readFile(absolute(fixtureRoot, gateSummary.receipt));
    const receipt = parseCanonicalJson(receiptBytes, "mutation canonical gate receipt");
    const stdout = await readFile(absolute(fixtureRoot, receipt.stdout.path));
    const stderr = await readFile(absolute(fixtureRoot, receipt.stderr.path));
    assert.equal(receipt.result, "fail");
    assert.equal(Number.isInteger(receipt.exitCode), true);
    assert.notEqual(receipt.exitCode, 0);
    assert.equal(receipt.signal, null);
    assert.equal(receipt.repository.headBefore, commit);
    assert.equal(receipt.repository.headAfter, commit);
    assert.equal(receipt.repository.trackedStateBefore, "clean");
    assert.equal(receipt.repository.trackedStateAfter, "clean");
    assert.equal(receipt.materialization.digestBefore, receipt.materialization.digestAfter);
    assert.equal(receipt.materialization.inspectionError, null);
    assert.equal(receipt.materialization.cleanupError, null);
    assert.equal(receipt.gitContext.headBefore, commit);
    assert.equal(receipt.gitContext.headAfter, commit);
    assert.equal(receipt.gitContext.trackedStateBefore, "clean");
    assert.equal(receipt.gitContext.trackedStateAfter, "clean");
    assert.equal(receipt.stdout.bytes, stdout.byteLength);
    assert.equal(receipt.stdout.digest, digest(stdout));
    assert.equal(receipt.stderr.bytes, stderr.byteLength);
    assert.equal(receipt.stderr.digest, digest(stderr));
    const typeScript = parseLifecycleTypeScriptEvidence(stdout, supply);
    const error = strictUtf8(stderr, "mutation canonical gate stderr");
    assert.match(error, /TypeScript binding changed after compilation\./u);
    const mutatedIdentity = await identity(supply.binding.path);
    assert.notDeepEqual(mutatedIdentity, supply.originalIdentity);
    const trackedState = (
      await runGit(fixtureRoot, ["status", "--porcelain=v1", "--untracked-files=no"], {
        env: gitEnvironment,
      })
    ).stdout;
    assert.equal(trackedState.byteLength, 0, "mutation route changed tracked fixture bytes");
    evidence = {
      command: processEvidence("negative-persistent-typescript-mutation", gateResult),
      route: {
        label: "persistent TypeScript mutation during compilation",
        route: "copied-production-canonical-gate",
        status: "pass",
        error: "TypeScript binding changed after compilation.",
        candidateCommit: commit,
        copiedProduction,
        committedTreeFiles: committedBlobs.treeFiles,
        receipt: {
          bytes: receiptBytes.byteLength,
          digest: digest(receiptBytes),
        },
        stdout: { bytes: stdout.byteLength, digest: digest(stdout) },
        stderr: { bytes: stderr.byteLength, digest: digest(stderr) },
        typeScript,
        compilerIdentity: {
          before: supply.originalIdentity,
          after: mutatedIdentity,
        },
      },
    };
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
  assert.ok(evidence, "mutation route completed without evidence");
  return evidence;
}

async function operationRootNames(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("swr2-"))
    .map((entry) => entry.name)
    .sort();
}

function scopedParentEnvironment(environment, parentTempRoot) {
  const scoped = { ...environment };
  for (const name of ["TEMP", "TMP", "TMPDIR"]) {
    setEnvironmentValue(scoped, name, parentTempRoot);
  }
  return scoped;
}

async function runScopedParentProcess(command, arguments_, options) {
  const parentTempRoot = await realpath(
    await mkdtemp(join(resolve(tmpdir()), "swecircuit-parent-")),
  );
  let result;
  let processError = null;
  let before = [];
  let after = [];
  let cleanupError = null;
  let testOwnedTempRootRemoved = false;

  try {
    before = await operationRootNames(parentTempRoot);
    result = await runProcess(command, arguments_, {
      cwd: options.cwd,
      env: scopedParentEnvironment(options.environment, parentTempRoot),
      timeoutMs: options.timeoutMs,
    });
    after = await operationRootNames(parentTempRoot);
  } catch (error) {
    processError = error;
  } finally {
    try {
      await rm(parentTempRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      testOwnedTempRootRemoved = !(await pathExists(parentTempRoot));
    } catch (error) {
      cleanupError = error instanceof Error ? error.message : String(error);
    }
  }

  if (processError !== null) {
    if (cleanupError !== null) {
      throw new AggregateError(
        [processError, new Error(cleanupError)],
        "Scoped parent process and test-owned temp cleanup both failed.",
      );
    }
    throw processError;
  }
  assert.ok(result, "Scoped parent process completed without a result.");
  const beforeSet = new Set(before);
  const leaked = after.filter((name) => !beforeSet.has(name));
  result.operationRootCleanup = {
    scope: "invocation-owned-temp",
    ownedTempRoot: parentTempRoot,
    checkedAfterExit: true,
    noNewOperationRoots: leaked.length === 0,
    leakedOperationRoots: leaked,
    beforeCount: before.length,
    afterCount: after.length,
    testOwnedTempRootRemoved,
    cleanupError,
  };
  return result;
}

async function runParent(fixtureRoot, environment, phase, commit, phaseArguments) {
  return runScopedParentProcess(
    process.execPath,
    [absolute(fixtureRoot, PARENT_PATH), phase, commit, ...phaseArguments],
    { cwd: fixtureRoot, environment },
  );
}

function processEvidence(label, result) {
  return {
    label,
    executable: result.command,
    arguments: [...result.arguments],
    pid: result.pid,
    status: result.status,
    signal: result.signal,
    timedOut: result.timedOut,
    timeout: result.timeout,
    durationMs: Number(result.durationMs.toFixed(3)),
    stdout: { bytes: result.stdout.byteLength, digest: digest(result.stdout) },
    stderr: { bytes: result.stderr.byteLength, digest: digest(result.stderr) },
    operationRootCleanup: result.operationRootCleanup,
  };
}

function updateFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(length);
  hash.update(value);
}

function rawSetSummary(snapshot, paths) {
  const ordered = [...new Set(paths)].sort((left, right) =>
    Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")),
  );
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from("swecircuit/r21/raw-output-set/v1alpha1", "utf8"));
  let bytes = 0;
  for (const path of ordered) {
    const value = snapshot.get(path);
    assert.ok(value, `raw output snapshot lacks ${path}`);
    bytes += value.byteLength;
    updateFrame(hash, Buffer.from(path, "utf8"));
    updateFrame(hash, value);
  }
  return {
    paths: ordered.length,
    bytes,
    digest: `sha256:${hash.digest("hex")}`,
  };
}

async function snapshotPaths(root, paths) {
  const snapshot = new Map();
  for (const path of [...new Set(paths)]) {
    snapshot.set(path, await readFile(absolute(root, path)));
  }
  return snapshot;
}

async function assertSnapshotUnchanged(root, baseline, paths, label) {
  for (const path of paths) {
    const actual = await readFile(absolute(root, path));
    assert.deepEqual(actual, baseline.get(path), `${label} changed raw output ${path}`);
  }
  return { equal: true, ...rawSetSummary(baseline, paths) };
}

async function parseParentReceipt(fixtureRoot, parentResult, expectedPhase) {
  assertCommandPassed(parentResult, `${expectedPhase} parent`);
  const summary = parseCanonicalJson(parentResult.stdout, `${expectedPhase} parent stdout`);
  assert.equal(summary.outcome, "pass");
  assert.equal(summary.phase, expectedPhase);
  const binding = summary.parentExecutionReceipt;
  const receiptPath = absolute(fixtureRoot, binding.path);
  const receiptBytes = await readFile(receiptPath);
  assert.equal(receiptBytes.byteLength, binding.bytes);
  assert.equal(digest(receiptBytes), binding.digest);
  const receipt = parseCanonicalJson(receiptBytes, `${expectedPhase} parent receipt`);
  assert.equal(receipt.phase, expectedPhase);
  assert.equal(receipt.promotion.strategy, "full-set-preflight-immutable-files-receipt-last");
  assert.equal(receipt.promotion.completionReceipt, binding.path);
  assert.equal(
    receipt.promotion.outputs.some((entry) => entry.path === binding.path),
    false,
  );
  assert.deepEqual(receipt.cleanup, {
    candidateMaterializationRemoved: true,
    disposableGitContextRemoved: true,
    privateNpmConfigurationFilesRemoved: true,
    operationRootRemoved: true,
  });

  const npmConfiguration = receipt.privateNpmConfiguration;
  assert.equal(npmConfiguration.apiVersion, "swecircuit/release-review-npm-configuration/v1alpha1");
  assert.equal(npmConfiguration.kind, "ReleaseReviewPrivateNpmConfigurationEvidence");
  assert.deepEqual(
    npmConfiguration.policy,
    RELEASE_REVIEW_PARENT_TEST_HOOKS.PRIVATE_NPM_CONFIGURATION_POLICY,
  );
  assert.equal(npmConfiguration.pathsDistinctCaseInsensitively, true);
  assert.equal(npmConfiguration.containedByExactOperationRoot, true);
  assert.equal(npmConfiguration.outsideRepositoryCandidateAndCache, true);
  assert.equal(npmConfiguration.hostConfigurationExcluded, true);
  assert.equal(npmConfiguration.npmInspection.hostConfigurationExcluded, true);
  assert.match(npmConfiguration.npmInspection.version, /^11\./u);
  assert.equal(
    npmConfiguration.npmInspection.userConfig.reportedPath,
    npmConfiguration.userConfig.path,
  );
  assert.equal(
    npmConfiguration.npmInspection.globalConfig.reportedPath,
    npmConfiguration.globalConfig.path,
  );
  assert.equal(
    npmConfiguration.userConfig.path.toLowerCase() !==
      npmConfiguration.globalConfig.path.toLowerCase(),
    true,
  );
  assert.equal(
    npmConfiguration.userConfig.realPath.toLowerCase() !==
      npmConfiguration.globalConfig.realPath.toLowerCase(),
    true,
  );
  assert.equal(
    rootsAreDisjoint(npmConfiguration.operationRoot, fixtureRoot) &&
      rootsAreDisjoint(
        npmConfiguration.operationRoot,
        receipt.stableReconstruction.offlineCache.path,
      ),
    true,
  );
  for (const [name, config] of [
    ["user", npmConfiguration.userConfig],
    ["global", npmConfiguration.globalConfig],
  ]) {
    assert.equal(dirname(config.path), npmConfiguration.operationRoot);
    assert.equal(config.path, config.realPath);
    assert.equal(config.bytes, 0);
    assert.equal(config.digest, RELEASE_REVIEW_PARENT_TEST_HOOKS.EMPTY_FILE_DIGEST);
    assert.equal(config.links, 1);
    assert.deepEqual(Object.keys(config.identity), [
      "device",
      "inode",
      "mode",
      "ctimeNanoseconds",
      "birthtimeNanoseconds",
    ]);
    assert.equal(
      Object.values(config.identity).every((value) => /^\d+$/u.test(value)),
      true,
      `${expectedPhase} ${name} config filesystem identity is invalid`,
    );
    assert.equal(await pathExists(config.path), false);
  }
  assert.equal(await pathExists(npmConfiguration.operationRoot), false);
  assert.equal(npmConfiguration.preSpawnValidation.everySpawnValidated, true);
  assert.equal(
    npmConfiguration.preSpawnValidation.count,
    npmConfiguration.preSpawnValidation.events.length,
  );
  assert.ok(npmConfiguration.preSpawnValidation.count >= 4);
  npmConfiguration.preSpawnValidation.events.forEach((entry, index) => {
    assert.equal(entry.ordinal, index + 1);
    const { digest: eventDigest, ...event } = entry;
    assert.equal(eventDigest, digest(Buffer.from(JSON.stringify(event), "utf8")));
  });

  const outputPaths = receipt.promotion.outputs.map((entry) => entry.path);
  const outputSnapshot = await snapshotPaths(fixtureRoot, outputPaths);
  for (const output of receipt.promotion.outputs) {
    const bytes = outputSnapshot.get(output.path);
    assert.equal(bytes.byteLength, output.bytes, `${expectedPhase} output byte count changed`);
    assert.equal(digest(bytes), output.digest, `${expectedPhase} output digest changed`);
  }
  assert.deepEqual(
    receipt.staging.outputs.map(({ path, bytes, digest: digest_ }) => ({
      path,
      bytes,
      digest: digest_,
    })),
    receipt.promotion.outputs.map(({ path, bytes, digest: digest_ }) => ({
      path,
      bytes,
      digest: digest_,
    })),
    `${expectedPhase} staging and promotion bindings differ`,
  );

  const receiptStats = await stat(receiptPath, { bigint: true });
  const outputStats = await Promise.all(
    outputPaths.map((path) => stat(absolute(fixtureRoot, path), { bigint: true })),
  );
  const latestOutputBirthtime = outputStats.reduce(
    (latest, value) => (value.birthtimeNs > latest ? value.birthtimeNs : latest),
    0n,
  );
  assert.ok(
    receiptStats.birthtimeNs >= latestOutputBirthtime,
    `${expectedPhase} completion receipt was not created after its outputs`,
  );

  return {
    summary,
    receipt,
    receiptBytes,
    outputSnapshot,
    evidence: {
      phase: expectedPhase,
      path: binding.path,
      bytes: binding.bytes,
      digest: binding.digest,
      disposition: binding.disposition,
      receiptLastObserved: true,
      privateNpmConfiguration: {
        operationRoot: npmConfiguration.operationRoot,
        userConfig: npmConfiguration.userConfig,
        globalConfig: npmConfiguration.globalConfig,
        npmVersion: npmConfiguration.npmInspection.version,
        hostConfigurationExcluded: npmConfiguration.hostConfigurationExcluded,
        validationCount: npmConfiguration.preSpawnValidation.count,
        validationEvents: npmConfiguration.preSpawnValidation.events,
        removedBeforePromotion: true,
      },
      outputCount: outputPaths.length,
      outputSet: rawSetSummary(outputSnapshot, outputPaths),
      freshChildPhases: receipt.freshChildRoster.map((entry) => entry.phase),
      stableReconstructionDigest: receipt.stableReconstructionDigest,
      requestedPhaseAuthorityDigest: receipt.requestedPhaseAuthorityDigest,
      invocationDigest: receipt.invocationDigest,
    },
  };
}

function handoffTemplate(contract) {
  const marker = contract.indexOf("## Required Handoff Envelope");
  assert.notEqual(marker, -1, "generated agent contract lacks its handoff section");
  const start = contract.indexOf("```json", marker);
  const end = contract.indexOf("```", start + 7);
  assert.ok(start >= 0 && end > start, "generated agent contract lacks its handoff JSON");
  return JSON.parse(contract.slice(start + 7, end).trim());
}

async function writePackageBoundHandoffs(fixtureRoot, commit, specialistPackage) {
  const runRoot = `${RUN_ROOT}/${commit}`;
  const handoffRoot = absolute(fixtureRoot, `${runRoot}/handoffs`);
  await mkdir(handoffRoot, { recursive: true });
  const manifestAgents = [...specialistPackage.manifest.agents].sort((left, right) =>
    Buffer.compare(Buffer.from(left.agentId, "utf8"), Buffer.from(right.agentId, "utf8")),
  );
  const handoffs = [];
  for (let index = 0; index < manifestAgents.length; index += 1) {
    const agent = manifestAgents[index];
    const contractFile = specialistPackage.files.find((file) => file.path === agent.contractFile);
    assert.ok(contractFile, `package lacks contract ${agent.contractFile}`);
    const handoff = handoffTemplate(contractFile.content);
    assert.equal(handoff.agent.id, agent.agentId);
    assert.equal(handoff.agent.blueprintDigest, agent.blueprintDigest);
    assert.equal(handoff.compilationDigest, specialistPackage.compilationDigest);
    handoff.summary = `Isolated production-lifecycle fixture pass for ${agent.agentId}.`;
    for (const artifact of handoff.artifacts) {
      artifact.content =
        `# Isolated Production Lifecycle\n\n` +
        `This package-bound handoff exercises the real verifier for ${agent.agentId}.\n`;
    }
    const raw = canonicalJson(handoff);
    const requestedPath = `handoffs/reviewer-${index + 1}.json`;
    await writeFile(absolute(fixtureRoot, `${runRoot}/${requestedPath}`), raw, { flag: "wx" });
    handoffs.push({
      requestedPath,
      agentId: agent.agentId,
      blueprintDigest: agent.blueprintDigest,
      outcome: handoff.outcome,
      bytes: raw.byteLength,
      digest: digest(raw),
    });
  }
  return handoffs;
}

function captureSynchronousFailure(label, callback, pattern) {
  let error;
  try {
    callback();
  } catch (caught) {
    error = caught;
  }
  assert.ok(error instanceof Error, `${label} unexpectedly passed`);
  assert.match(error.message, pattern, `${label} failed through the wrong validator`);
  return { label, route: "exact-production-validator", status: "pass", error: error.message };
}

async function exactValidatorNegativeRoutes({
  lifecycleRoot,
  fixtureRoot,
  packageEnvelope,
  compileReceipt,
  baseline,
  preparePaths,
}) {
  const routes = [];
  const pair = {
    compilationDigest: packageEnvelope.compilationDigest,
    packageDigest: packageEnvelope.packageDigest,
  };
  routes.push(
    captureSynchronousFailure(
      "wrong owner compilation digest",
      () =>
        RELEASE_REVIEW_TEST_HOOKS.assertOwnerPackageExpectation(packageEnvelope, {
          ...pair,
          compilationDigest: `sha256:${"a".repeat(64)}`,
        }),
      /owner digest pair/u,
    ),
  );
  routes.push(
    captureSynchronousFailure(
      "wrong owner package digest",
      () =>
        RELEASE_REVIEW_TEST_HOOKS.assertOwnerPackageExpectation(packageEnvelope, {
          ...pair,
          packageDigest: `sha256:${"b".repeat(64)}`,
        }),
      /owner digest pair/u,
    ),
  );

  const materializedFiles = [];
  for (const file of packageEnvelope.files) {
    materializedFiles.push({
      path: file.path,
      bytes: await readFile(
        absolute(fixtureRoot, `${RUN_ROOT}/${compileReceipt.candidateCommit}/package/${file.path}`),
      ),
    });
  }
  RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(materializedFiles, packageEnvelope);
  const substitutedFiles = materializedFiles.map((entry) => ({
    path: entry.path,
    bytes: Buffer.from(entry.bytes),
  }));
  substitutedFiles[0].bytes = Buffer.concat([
    substitutedFiles[0].bytes,
    Buffer.from("substituted\n", "utf8"),
  ]);
  routes.push(
    captureSynchronousFailure(
      "package file substitution",
      () => RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(substitutedFiles, packageEnvelope),
      /differs from reconstruction/u,
    ),
  );

  RELEASE_REVIEW_TEST_HOOKS.validateStableReconstruction(
    compileReceipt.stableReconstruction,
    compileReceipt.stableReconstructionDigest,
  );
  const substitutedStable = structuredClone(compileReceipt.stableReconstruction);
  substitutedStable.expectedParentDigest = `sha256:${"c".repeat(64)}`;
  routes.push(
    captureSynchronousFailure(
      "stable binding substitution",
      () =>
        RELEASE_REVIEW_TEST_HOOKS.validateStableReconstruction(
          substitutedStable,
          compileReceipt.stableReconstructionDigest,
        ),
      /stable-reconstruction digest mismatch/u,
    ),
  );

  RELEASE_REVIEW_TEST_HOOKS.validatePhaseAuthority(
    compileReceipt.requestedPhaseAuthority,
    compileReceipt.requestedPhaseAuthorityDigest,
    "compile",
  );
  const substitutedAuthority = structuredClone(compileReceipt.requestedPhaseAuthority);
  substitutedAuthority.phase = "prepare";
  routes.push(
    captureSynchronousFailure(
      "phase authority substitution",
      () =>
        RELEASE_REVIEW_TEST_HOOKS.validatePhaseAuthority(
          substitutedAuthority,
          compileReceipt.requestedPhaseAuthorityDigest,
          "compile",
        ),
      /phase-authority identity mismatch/u,
    ),
  );

  const staleRoot = join(lifecycleRoot, "stale-output-validator");
  await mkdir(staleRoot);
  const stalePath = "request.json";
  await writeFile(absolute(staleRoot, stalePath), Buffer.from("stale\n", "utf8"));
  await assert.rejects(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionEntriesAtRoot(staleRoot, [
      {
        path: stalePath,
        bytes: baseline.get(preparePaths.find((path) => path.endsWith("/request.json"))),
      },
    ]),
    /Immutable live output differs/u,
  );
  routes.push({
    label: "stale output",
    route: "exact-production-promotion-validator",
    status: "pass",
    error: "Immutable live output differs",
  });

  const conflictRoot = join(lifecycleRoot, "conflicting-promotion-validator");
  await mkdir(conflictRoot);
  const completionReceipt = "completion.json";
  const expectedOutput = Buffer.from("expected\n", "utf8");
  const preflight = await RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
    conflictRoot,
    [
      { path: "output.json", bytes: expectedOutput },
      { path: completionReceipt, bytes: Buffer.from("receipt\n", "utf8") },
    ],
    completionReceipt,
  );
  await writeFile(absolute(conflictRoot, "output.json"), Buffer.from("conflict\n", "utf8"));
  await assert.rejects(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.promotePreflightedSetAtRoot(preflight),
    /Immutable live output differs/u,
  );
  assert.equal(await pathExists(absolute(conflictRoot, completionReceipt)), false);
  routes.push({
    label: "conflicting promoted output",
    route: "exact-production-promotion-validator",
    status: "pass",
    error: "Immutable live output differs before completion receipt",
  });

  const receiptLastRoot = join(lifecycleRoot, "receipt-last-validator");
  await mkdir(receiptLastRoot);
  const receiptLastPreflight = await RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
    receiptLastRoot,
    [
      { path: "output.json", bytes: Buffer.from("output\n", "utf8") },
      { path: completionReceipt, bytes: Buffer.from("receipt\n", "utf8") },
    ],
    completionReceipt,
  );
  await assert.rejects(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.promotePreflightedSetAtRoot(receiptLastPreflight, {
      failAfterOutputs: 1,
    }),
    /Injected promotion failure/u,
  );
  assert.equal(await pathExists(absolute(receiptLastRoot, "output.json")), true);
  assert.equal(await pathExists(absolute(receiptLastRoot, completionReceipt)), false);
  routes.push({
    label: "receipt-last interrupted promotion",
    route: "exact-production-promotion-validator",
    status: "pass",
    error: "completion receipt absent after injected output-only failure",
  });

  return routes;
}

async function listRegularFiles(root) {
  if (!(await pathExists(root))) {
    return [];
  }
  const files = [];
  async function visit(directory, prefix) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const local = prefix ? `${prefix}/${entry.name}` : entry.name;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path, local);
      } else if (entry.isFile()) {
        files.push(local);
      }
    }
  }
  await visit(root, "");
  return files.sort();
}

export async function runReleaseReviewProductionLifecycle() {
  const lifecycleStarted = process.hrtime.bigint();
  const sourceStatusBefore = (
    await runGit(SOURCE_ROOT, ["status", "--porcelain=v1", "-z"], { env: process.env })
  ).stdout;
  const sourceFrozenBefore = await authenticateFiles(SOURCE_ROOT, PRODUCTION_IDENTITIES);
  assertIdentity(await identity(absolute(SOURCE_ROOT, LOCK_PATH)), LOCK_IDENTITY, LOCK_PATH);

  const lifecycleRoot = await realpath(
    await mkdtemp(join(resolve(tmpdir()), "swecircuit-r22-lifecycle-")),
  );
  const fixtureRoot = join(lifecycleRoot, "repository");
  const cacheRoot = join(lifecycleRoot, "npm-cache");
  let result;
  let failure;
  const cleanup = { attempted: false, rootRemoved: false, sourceStatusUnchanged: false };

  try {
    const setupStarted = process.hrtime.bigint();
    await copyFixtureRepository(fixtureRoot);
    const hostNpmCacheSupply = await copyHostNpmCacheSupply(cacheRoot);
    const npmSupply = await resolveHostNpmSupply();
    const gitSupply = await resolveHostGitSupply(lifecycleRoot);
    assert.equal(await pathExists(absolute(fixtureRoot, R22_ROOT)), false);
    assert.equal(await pathExists(absolute(fixtureRoot, RUN_ROOT)), false);
    assert.equal(await pathExists(absolute(fixtureRoot, GATE_ROOT)), false);

    const copiedProduction = await authenticateFiles(fixtureRoot, PRODUCTION_IDENTITIES);
    assertIdentity(
      await identity(absolute(fixtureRoot, LOCK_PATH)),
      LOCK_IDENTITY,
      "fixture lockfile",
    );
    const fixtureException = await applyFixtureVerifyException(fixtureRoot);
    const { commit, gitEnvironment } = await initializeFixtureGit(fixtureRoot);
    const committedExpected = {
      ...PRODUCTION_IDENTITIES,
      [PACKAGE_PATH]: fixtureException.committedIdentity,
      [LOCK_PATH]: LOCK_IDENTITY,
    };
    const committedBlobs = await authenticateFixtureBlobs(
      fixtureRoot,
      commit,
      committedExpected,
      gitEnvironment,
    );
    const setupDurationMs = Number(process.hrtime.bigint() - setupStarted) / 1_000_000;

    const typeScriptSupply = await createLifecycleTypeScriptSupply(lifecycleRoot, fixtureRoot);
    const gateResult = await runProcess(
      process.execPath,
      [absolute(fixtureRoot, GATE_PATH), commit],
      {
        cwd: fixtureRoot,
        env: gateEnvironment(cacheRoot, typeScriptSupply.binding.path),
      },
    );
    assertCommandPassed(gateResult, "copied production canonical gate");
    const gateSummary = parseCanonicalJson(gateResult.stdout, "canonical gate stdout");
    assert.equal(gateSummary.outcome, "pass");
    assert.equal(gateSummary.candidateCommit, commit);
    const gateReceiptBytes = await readFile(absolute(fixtureRoot, gateSummary.receipt));
    const gateReceipt = parseCanonicalJson(gateReceiptBytes, "canonical gate receipt");
    const gateReceiptDigest = digest(gateReceiptBytes);
    const gateStdout = await readFile(absolute(fixtureRoot, gateReceipt.stdout.path));
    const gateStderr = await readFile(absolute(fixtureRoot, gateReceipt.stderr.path));
    assert.equal(gateReceipt.result, "pass");
    assert.equal(
      gateReceipt.command.canonical,
      process.platform === "win32" ? "npm.cmd run verify" : "npm run verify",
    );
    assert.equal(gateReceipt.stdout.bytes, gateStdout.byteLength);
    assert.equal(gateReceipt.stdout.digest, digest(gateStdout));
    assert.equal(gateReceipt.stderr.bytes, gateStderr.byteLength);
    assert.equal(gateReceipt.stderr.digest, digest(gateStderr));
    const gateLogText = strictUtf8(gateStdout, "canonical gate log");
    assert.match(gateLogText, /node --check scripts[/\\]run-v12-release-gate\.mjs/u);
    assert.match(gateLogText, /run-v12-release-review\.mjs/u);
    const fixtureVerifyCommandObservedInRawLog = gateLogText.includes(
      `node ${TYPESCRIPT_RUNNER_PATH} ${FIXTURE_TYPESCRIPT_ARGUMENTS.join(" ")}`,
    );
    assert.equal(
      fixtureVerifyCommandObservedInRawLog,
      true,
      "fixture TypeScript command was not observed in the canonical log",
    );
    const gateTypeScript = parseLifecycleTypeScriptEvidence(gateStdout, typeScriptSupply);
    const reboundTypeScript = resolveTypeScriptEntrypointBinding({
      environment: environmentWithTypeScriptEntrypoint({}, typeScriptSupply.binding.path),
      projectRoot: fixtureRoot,
      outsidePolicy: "always",
      label: "Lifecycle TypeScript adapter after canonical gate",
    });
    assert.deepEqual(reboundTypeScript, typeScriptSupply.binding);
    assertIdentity(
      await identity(typeScriptSupply.delegatedBinding.path),
      {
        bytes: typeScriptSupply.delegatedBinding.bytes,
        digest: typeScriptSupply.delegatedBinding.digest,
      },
      "delegated lifecycle TypeScript entrypoint",
    );
    assert.equal(
      (await stat(typeScriptSupply.delegatedBinding.path)).nlink,
      typeScriptSupply.delegatedBinding.nlink,
    );

    const parentDigest = PRODUCTION_IDENTITIES[PARENT_PATH].digest;
    const environment = parentEnvironment(cacheRoot, parentDigest, npmSupply.path, gitSupply.path);
    const commandEvidence = [processEvidence("canonical-gate", gateResult)];
    const negativeRoutes = [];
    const mutationEvidence = await runPersistentCompilerMutationRoute(lifecycleRoot, cacheRoot);
    commandEvidence.push(mutationEvidence.command);

    const wrongGateDigest = `sha256:${"d".repeat(64)}`;
    assert.notEqual(wrongGateDigest, gateReceiptDigest);
    const wrongGate = await runParent(fixtureRoot, environment, "compile", commit, [
      wrongGateDigest,
    ]);
    const wrongGateError = assertCommandFailed(
      wrongGate,
      "wrong canonical-gate digest",
      /External input digest mismatch: .*canonical-gate-receipt\.json/u,
    );
    commandEvidence.push(processEvidence("negative-wrong-canonical-gate-digest", wrongGate));
    negativeRoutes.push({
      label: "wrong canonical-gate digest",
      route: "copied-production-parent",
      status: "pass",
      error: wrongGateError,
    });

    const compileResult = await runParent(fixtureRoot, environment, "compile", commit, [
      gateReceiptDigest,
    ]);
    commandEvidence.push(processEvidence("parent-compile", compileResult));
    const compiled = await parseParentReceipt(fixtureRoot, compileResult, "compile");
    assert.deepEqual(compiled.receipt.phasePrefix, ["prepare", "compile"]);
    const runPaths = RELEASE_REVIEW_PARENT_TEST_HOOKS.candidateRunPaths(commit);
    const packageEnvelopeBytes = await readFile(absolute(fixtureRoot, runPaths.packageEnvelope));
    const packageEnvelope = parseCanonicalJson(packageEnvelopeBytes, "compiled package envelope");
    const compilationSummaryBytes = await readFile(
      absolute(fixtureRoot, runPaths.compilationSummary),
    );
    const compilationSummary = parseCanonicalJson(compilationSummaryBytes, "compiled summary");
    const pair = {
      compilationDigest: packageEnvelope.compilationDigest,
      packageDigest: packageEnvelope.packageDigest,
    };
    assert.deepEqual(pair, {
      compilationDigest: compilationSummary.compilationDigest,
      packageDigest: compilationSummary.packageDigest,
    });
    assert.deepEqual(pair, {
      compilationDigest: compiled.summary.child.compilationDigest,
      packageDigest: compiled.summary.child.packageDigest,
    });
    const compileChildByPhase = new Map(
      compiled.receipt.freshChildRoster.map((entry) => [entry.phase, entry]),
    );
    const preparePaths = compileChildByPhase.get("prepare").outputs.map((entry) => entry.path);
    const compilePaths = compileChildByPhase.get("compile").outputs.map((entry) => entry.path);
    const sharedPaths = [...new Set([...preparePaths, ...compilePaths])];
    const packagePaths = compilePaths.filter(
      (path) => path === runPaths.packageEnvelope || path.startsWith(`${runPaths.packageDir}/`),
    );
    const summaryPaths = [runPaths.compilationSummary];
    const baseline = await snapshotPaths(fixtureRoot, sharedPaths);
    const baselineComparisons = {
      prepare: { equal: true, ...rawSetSummary(baseline, preparePaths) },
      compile: { equal: true, ...rawSetSummary(baseline, compilePaths) },
      package: { equal: true, ...rawSetSummary(baseline, packagePaths) },
      summary: { equal: true, ...rawSetSummary(baseline, summaryPaths) },
      shared: { equal: true, ...rawSetSummary(baseline, sharedPaths) },
    };

    const handoffs = await writePackageBoundHandoffs(fixtureRoot, commit, packageEnvelope);
    assert.deepEqual(
      handoffs.map((entry) => entry.agentId).sort(),
      packageEnvelope.manifest.agents.map((entry) => entry.agentId).sort(),
    );
    assert.equal(
      handoffs.every((entry) => entry.outcome === "pass"),
      true,
    );

    const approveResult = await runParent(fixtureRoot, environment, "approve", commit, [
      gateReceiptDigest,
      pair.compilationDigest,
      pair.packageDigest,
    ]);
    commandEvidence.push(processEvidence("parent-standalone-approve", approveResult));
    const approved = await parseParentReceipt(fixtureRoot, approveResult, "approve");
    assert.deepEqual(approved.receipt.phasePrefix, ["prepare", "compile", "approve"]);
    const approveComparisons = {
      prepare: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        preparePaths,
        "standalone approve prepare",
      ),
      compile: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        compilePaths,
        "standalone approve compile",
      ),
      package: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        packagePaths,
        "standalone approve package",
      ),
      summary: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        summaryPaths,
        "standalone approve summary",
      ),
      shared: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        sharedPaths,
        "standalone approve shared outputs",
      ),
    };
    const standaloneApproval = await readFile(absolute(fixtureRoot, runPaths.approval));

    const verifyArguments = [
      gateReceiptDigest,
      pair.compilationDigest,
      pair.packageDigest,
      ...handoffs.flatMap((entry) => [entry.requestedPath, entry.digest]),
    ];
    const verifyResult = await runParent(
      fixtureRoot,
      environment,
      "verify",
      commit,
      verifyArguments,
    );
    commandEvidence.push(processEvidence("parent-verify", verifyResult));
    const verified = await parseParentReceipt(fixtureRoot, verifyResult, "verify");
    assert.deepEqual(verified.receipt.phasePrefix, ["prepare", "compile", "approve", "verify"]);
    const verifyComparisons = {
      prepare: await assertSnapshotUnchanged(fixtureRoot, baseline, preparePaths, "verify prepare"),
      compile: await assertSnapshotUnchanged(fixtureRoot, baseline, compilePaths, "verify compile"),
      package: await assertSnapshotUnchanged(fixtureRoot, baseline, packagePaths, "verify package"),
      summary: await assertSnapshotUnchanged(fixtureRoot, baseline, summaryPaths, "verify summary"),
      shared: await assertSnapshotUnchanged(
        fixtureRoot,
        baseline,
        sharedPaths,
        "verify shared outputs",
      ),
    };
    const verifyPrefixApproval = await readFile(absolute(fixtureRoot, runPaths.approval));
    assert.deepEqual(
      verifyPrefixApproval,
      standaloneApproval,
      "verify-prefix approval differs from standalone approval",
    );
    const handoffReportBytes = await readFile(absolute(fixtureRoot, runPaths.handoffVerification));
    const handoffReport = parseCanonicalJson(handoffReportBytes, "real verifier report");
    assert.equal(handoffReport.complete, true);
    assert.equal(handoffReport.releaseReady, true);
    assert.deepEqual(handoffReport.expectedAgentIds, handoffReport.receivedAgentIds);
    assert.deepEqual(
      handoffReport.receivedAgentIds,
      handoffs
        .map((entry) => entry.agentId)
        .sort((left, right) =>
          Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")),
        ),
    );
    assert.equal(handoffReport.verifiedHandoffs.length, handoffs.length);
    for (const row of handoffReport.verifiedHandoffs) {
      const handoff = handoffs.find((entry) => entry.agentId === row.agentId);
      assert.ok(handoff);
      assert.equal(row.outcome, "pass");
      assert.equal(row.rawBytes, handoff.bytes);
      assert.equal(row.rawDigest, handoff.digest);
    }

    const receipts = [compiled.receipt, approved.receipt, verified.receipt];
    assert.equal(new Set(receipts.map((entry) => entry.stableReconstructionDigest)).size, 1);
    assert.equal(new Set(receipts.map((entry) => entry.requestedPhaseAuthorityDigest)).size, 3);
    assert.equal(new Set(receipts.map((entry) => entry.invocationDigest)).size, 3);
    assert.equal(new Set(receipts.map((entry) => entry.runtimeBindingDigest)).size, 1);
    const npmConfigurationEvidence = receipts.map((entry) => entry.privateNpmConfiguration);
    assert.equal(
      new Set(npmConfigurationEvidence.map((entry) => entry.operationRoot)).size,
      receipts.length,
    );
    assert.equal(
      new Set(
        npmConfigurationEvidence.flatMap((entry) => [
          entry.userConfig.path.toLowerCase(),
          entry.globalConfig.path.toLowerCase(),
        ]),
      ).size,
      receipts.length * 2,
    );
    assert.equal(
      npmConfigurationEvidence.every(
        (entry) =>
          /^11\./u.test(entry.npmInspection.version) &&
          entry.hostConfigurationExcluded === true &&
          entry.preSpawnValidation.everySpawnValidated === true,
      ),
      true,
    );
    const runtimeBindingBytes = await readFile(absolute(fixtureRoot, runPaths.runtimeBinding));
    for (const entry of npmConfigurationEvidence) {
      for (const configPath of [entry.userConfig.path, entry.globalConfig.path]) {
        assert.equal(runtimeBindingBytes.includes(Buffer.from(configPath, "utf8")), false);
        assert.equal(JSON.stringify(entry.policy).includes(configPath), false);
      }
    }
    const authorityByReceipt = receipts.map((receipt) =>
      Object.fromEntries(receipt.childPhaseAuthorities.map((entry) => [entry.phase, entry.digest])),
    );
    assert.equal(authorityByReceipt[0].prepare, authorityByReceipt[1].prepare);
    assert.equal(authorityByReceipt[0].prepare, authorityByReceipt[2].prepare);
    assert.equal(authorityByReceipt[0].compile, authorityByReceipt[1].compile);
    assert.equal(authorityByReceipt[0].compile, authorityByReceipt[2].compile);
    assert.equal(authorityByReceipt[1].approve, authorityByReceipt[2].approve);
    const processIdentities = receipts.flatMap((receipt) =>
      receipt.freshChildRoster.map((entry) => entry.processIdentity),
    );
    assert.equal(new Set(processIdentities).size, processIdentities.length);

    negativeRoutes.push(
      ...(await exactValidatorNegativeRoutes({
        lifecycleRoot,
        fixtureRoot,
        packageEnvelope,
        compileReceipt: compiled.receipt,
        baseline,
        preparePaths,
      })),
    );

    const wrongHandoff = await runParent(fixtureRoot, environment, "verify", commit, [
      gateReceiptDigest,
      pair.compilationDigest,
      pair.packageDigest,
      handoffs[0].requestedPath,
      `sha256:${"e".repeat(64)}`,
    ]);
    const wrongHandoffError = assertCommandFailed(
      wrongHandoff,
      "wrong raw handoff digest",
      /External input digest mismatch: .*reviewer-1\.json/u,
    );
    commandEvidence.push(processEvidence("negative-wrong-raw-handoff-digest", wrongHandoff));
    negativeRoutes.push({
      label: "wrong raw handoff digest",
      route: "copied-production-parent",
      status: "pass",
      error: wrongHandoffError,
    });
    negativeRoutes.push(mutationEvidence.route);

    assert.equal(negativeRoutes.length, 11);
    assert.equal(
      negativeRoutes.every((entry) => entry.status === "pass"),
      true,
    );
    const receiptFiles = await listRegularFiles(absolute(fixtureRoot, runPaths.parentExecutions));
    assert.equal(receiptFiles.length, 3, "failed parent routes promoted a completion receipt");
    const fixtureTrackedAfter = (
      await runGit(fixtureRoot, ["status", "--porcelain=v1", "--untracked-files=no"], {
        env: gitEnvironment,
      })
    ).stdout;
    assert.equal(fixtureTrackedAfter.byteLength, 0, "lifecycle changed tracked fixture bytes");
    const fixtureProductionAfter = await authenticateFiles(fixtureRoot, {
      ...PRODUCTION_IDENTITIES,
      [PACKAGE_PATH]: fixtureException.committedIdentity,
    });

    result = {
      outcome: "pass",
      sourceRoot: SOURCE_ROOT,
      fixture: {
        repositoryWasOutsideSource: rootsAreDisjoint(fixtureRoot, SOURCE_ROOT),
        commit,
        treeFiles: committedBlobs.treeFiles,
        exclusions: committedBlobs.exclusions,
        postFixtureCorrectionExclusion: committedBlobs.postFixtureCorrectionExclusion,
        setupDurationMs: Number(setupDurationMs.toFixed(3)),
        packageException: fixtureException,
        hostNpmSupply: npmSupply,
        hostNpmCacheSupply,
        hostGitSupply: gitSupply,
        typeScriptSupply: {
          binding: typeScriptSupply.binding,
          delegatedBinding: typeScriptSupply.delegatedBinding,
          receipt: typeScriptSupply.receipt,
          smokeInput: typeScriptSupply.smokeInput,
          arguments: [...typeScriptSupply.arguments],
          sentinel: typeScriptSupply.sentinel,
        },
        copiedProduction,
        committedBlobs: committedBlobs.rows,
        productionAfter: fixtureProductionAfter,
      },
      gate: {
        receipt: {
          path: gateSummary.receipt,
          bytes: gateReceiptBytes.byteLength,
          digest: gateReceiptDigest,
        },
        stdout: { bytes: gateStdout.byteLength, digest: digest(gateStdout) },
        stderr: { bytes: gateStderr.byteLength, digest: digest(gateStderr) },
        command: gateReceipt.command.canonical,
        fixtureVerifyCommand: FIXTURE_VERIFY_COMMAND,
        fixtureVerifyCommandObservedInRawLog,
        typeScript: gateTypeScript,
      },
      packagePair: pair,
      rawComparisons: {
        compileBaseline: baselineComparisons,
        standaloneApprove: approveComparisons,
        verify: verifyComparisons,
        standaloneApproval: {
          bytes: standaloneApproval.byteLength,
          digest: digest(standaloneApproval),
        },
        verifyPrefixApproval: {
          bytes: verifyPrefixApproval.byteLength,
          digest: digest(verifyPrefixApproval),
        },
        approvalBytesEqual: true,
        packageEnvelope: {
          bytes: packageEnvelopeBytes.byteLength,
          digest: digest(packageEnvelopeBytes),
        },
        compilationSummary: {
          bytes: compilationSummaryBytes.byteLength,
          digest: digest(compilationSummaryBytes),
        },
      },
      handoffs,
      verifier: {
        report: {
          bytes: handoffReportBytes.byteLength,
          digest: digest(handoffReportBytes),
        },
        expectedAgentIds: handoffReport.expectedAgentIds,
        receivedAgentIds: handoffReport.receivedAgentIds,
        complete: handoffReport.complete,
        releaseReadyInIsolatedFixtureOnly: handoffReport.releaseReady,
        verifiedHandoffs: handoffReport.verifiedHandoffs,
      },
      receipts: {
        compile: compiled.evidence,
        approve: approved.evidence,
        verify: verified.evidence,
        oneStableReconstructionDigest: compiled.receipt.stableReconstructionDigest,
        distinctRequestedAuthorityDigests: receipts.map(
          (entry) => entry.requestedPhaseAuthorityDigest,
        ),
        distinctInvocationDigests: receipts.map((entry) => entry.invocationDigest),
        commonRuntimeBindingDigest: compiled.receipt.runtimeBindingDigest,
        childAuthorityPrefixes: receipts.map((entry) => entry.childPhaseAuthorities),
        distinctChildProcessIdentities: processIdentities.length,
        receiptLastObservedForEveryParent: true,
        privateNpmConfigurations: npmConfigurationEvidence,
        distinctPrivateNpmOperationRoots: npmConfigurationEvidence.map(
          (entry) => entry.operationRoot,
        ),
        installedNpmVersion: npmSupply.version,
        compatibilityAdapter: npmSupply.compatibilityAdapter,
        stableRuntimeExcludedInvocationPaths: true,
      },
      negativeRoutes,
      commands: commandEvidence,
      sourceFrozenBefore,
      network: "not requested; copied parent enforced offline npm and disabled lifecycle scripts",
      lifecycleDurationMs: null,
    };
  } catch (error) {
    failure = error;
  } finally {
    cleanup.attempted = true;
    await rm(lifecycleRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    cleanup.rootRemoved = !(await pathExists(lifecycleRoot));
    const sourceStatusAfter = (
      await runGit(SOURCE_ROOT, ["status", "--porcelain=v1", "-z"], { env: process.env })
    ).stdout;
    cleanup.sourceStatusUnchanged = sourceStatusAfter.equals(sourceStatusBefore);
    cleanup.sourceFrozenAfter = await authenticateFiles(SOURCE_ROOT, PRODUCTION_IDENTITIES);
    cleanup.sourceLockAfter = await identity(absolute(SOURCE_ROOT, LOCK_PATH));
    assertIdentity(cleanup.sourceLockAfter, LOCK_IDENTITY, "source lockfile after lifecycle");
  }

  if (failure) {
    throw failure;
  }
  assert.ok(result, "lifecycle completed without evidence");
  assert.equal(cleanup.rootRemoved, true, "isolated lifecycle root was not removed");
  assert.equal(cleanup.sourceStatusUnchanged, true, "source repository status changed");
  result.cleanup = cleanup;
  result.lifecycleDurationMs = Number(
    (Number(process.hrtime.bigint() - lifecycleStarted) / 1_000_000).toFixed(3),
  );
  return result;
}

export const V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS = Object.freeze({
  assertCommandPassed,
  authenticateFixtureBlobs,
  copyHostNpmCacheSupply,
  createLifecycleTypeScriptSupply,
  createMutatingLifecycleTypeScriptSupply,
  fixtureRepositoryEnvironment,
  fixtureTypeScriptArguments: FIXTURE_TYPESCRIPT_ARGUMENTS,
  gateEnvironment,
  hostNpmCache: RELEASE_GATE_TEST_HOOKS.hostNpmCache,
  initializeFixtureGit,
  isPostFixtureCorrection,
  parentEnvironment,
  parseLifecycleTypeScriptEvidence,
  runGit,
  runScopedParentProcess,
  typeScriptCompileSentinel: TYPESCRIPT_COMPILE_SENTINEL,
  typeScriptMutationSentinel: TYPESCRIPT_MUTATION_SENTINEL,
  typeScriptRunnerPath: TYPESCRIPT_RUNNER_PATH,
  typeScriptSmokePath: TYPESCRIPT_SMOKE_PATH,
});
