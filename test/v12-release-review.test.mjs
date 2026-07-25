import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { copyFile, link, mkdir, mkdtemp, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { RELEASE_REVIEW_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_REVIEW_HANDOFF_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs";
import { RELEASE_GATE_TEST_HOOKS } from "../scripts/run-v12-release-gate.mjs";
import { RELEASE_REVIEW_PARENT_TEST_HOOKS } from "../scripts/run-v12-release-review.mjs";
import {
  PRODUCTION_IDENTITIES,
  V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS,
} from "./helpers/v12-release-review-lifecycle.mjs";
import {
  assertConstantBatchRead,
  BINARY_FIXTURE_BYTES,
  createGitBlobLoaderFixture,
  createRecordedGitOutput,
  fixtureGitEnvironment,
} from "./helpers/git-blob-loader-fixture.mjs";
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const APPROVED_CHECKPOINT = "1b47e0ad10a5c3209fae53397892b7df3cd837be";
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const CORRECTION_ROOT = "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction";
const HARNESS_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const R9_ROOT = `${CORRECTION_ROOT}-r9`;
const PARENT_ENTRYPOINT = fileURLToPath(
  new URL("../scripts/run-v12-release-review.mjs", import.meta.url),
);
const HARNESS_ENTRYPOINT = fileURLToPath(new URL(`../${HARNESS_PATH}`, import.meta.url));
const VERIFIER_ENTRYPOINT = fileURLToPath(new URL(`../${VERIFIER_PATH}`, import.meta.url));
const HOST_CACHE_PROBE_ENTRYPOINT = fileURLToPath(
  new URL("./fixtures/v12-host-cache-supply-child.mjs", import.meta.url),
);
const GIT_ENVIRONMENT_PROBE_ENTRYPOINT = fileURLToPath(
  new URL("./fixtures/v12-git-environment-boundary-child.mjs", import.meta.url),
);
const GIT_BLOB_FIXTURE_PROBE_ENTRYPOINT = fileURLToPath(
  new URL("./fixtures/git-blob-loader-environment-child.mjs", import.meta.url),
);
const HOST_CACHE_PROBE_SOURCE_PATHS = Object.freeze([
  "scripts/run-v12-release-gate.mjs",
  "scripts/run-typescript.mjs",
  "scripts/run-v12-release-review.mjs",
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
  "test/helpers/v12-release-review-lifecycle.mjs",
]);
const REQUIRED_SECURITY_REVIEW_SOURCES = Object.freeze([
  {
    path: "scripts/run-typescript.mjs",
    allowedWorkUnits: ["review.r2.security-trace-authority"],
  },
  {
    path: "test/helpers/git-blob-loader-fixture.mjs",
    allowedWorkUnits: ["review.r2.security-trace-authority"],
  },
  {
    path: "test/helpers/v12-release-review-lifecycle.mjs",
    allowedWorkUnits: ["review.r2.lifecycle-correctness", "review.r2.security-trace-authority"],
  },
  {
    path: "test/lifecycle/v12-release-review-lifecycle.test.mjs",
    allowedWorkUnits: ["review.r2.lifecycle-correctness", "review.r2.security-trace-authority"],
  },
  {
    path: "test/fixtures/v12-enclosing-candidate-git-probe.mjs",
    allowedWorkUnits: ["review.r2.lifecycle-correctness", "review.r2.security-trace-authority"],
  },
  {
    path: "test/fixtures/v12-host-cache-supply-child.mjs",
    allowedWorkUnits: ["review.r2.security-trace-authority"],
  },
  {
    path: "test/fixtures/v12-git-environment-boundary-child.mjs",
    allowedWorkUnits: ["review.r2.security-trace-authority"],
  },
  {
    path: "test/fixtures/git-blob-loader-environment-child.mjs",
    allowedWorkUnits: ["review.r2.security-trace-authority"],
  },
]);

function staticImportSpecifiers(source) {
  return [...source.matchAll(/^\s*import(?:\s+[\s\S]*?\s+from\s+|\s*)["']([^"']+)["'];/gmu)].map(
    (match) => match[1],
  );
}

function unboundWorkerEnvironment() {
  const environment = { ...process.env };
  for (const key of Object.keys(environment)) {
    if (
      key.toLowerCase() === "swecircuit_release_review_worker_context" ||
      key.toLowerCase() === "swecircuit_release_review_worker_token"
    ) {
      delete environment[key];
    }
  }
  return environment;
}

function environmentWithNpmCache(cache) {
  const environment = unboundWorkerEnvironment();
  const forbidden = new Set([
    "npm_config_cache",
    "swecircuit_host_dependency_root",
    "swecircuit_typescript_entrypoint",
  ]);
  for (const key of Object.keys(environment)) {
    if (forbidden.has(key.toLowerCase())) {
      delete environment[key];
    }
  }
  environment.npm_config_cache = cache;
  return environment;
}

async function materializeHostCacheProbeSource(sourceRoot) {
  for (const relativePath of HOST_CACHE_PROBE_SOURCE_PATHS) {
    const destination = join(sourceRoot, relativePath);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(ROOT, relativePath), destination);
  }
}

function runHostCacheProbe(sourceRoot, cache, destination) {
  return spawnSync(
    process.execPath,
    [
      HOST_CACHE_PROBE_ENTRYPOINT,
      join(sourceRoot, "scripts/run-v12-release-gate.mjs"),
      join(sourceRoot, "test/helpers/v12-release-review-lifecycle.mjs"),
      destination,
      join(sourceRoot, ".local/npm-cache"),
    ],
    {
      cwd: ROOT,
      env: environmentWithNpmCache(cache),
      encoding: "utf8",
      timeout: 30_000,
      windowsHide: true,
    },
  );
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function updateFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(length);
  hash.update(value);
}

function domainDigest(domain, value) {
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from(domain, "utf8"));
  updateFrame(hash, Buffer.from(JSON.stringify(value), "utf8"));
  return `sha256:${hash.digest("hex")}`;
}

function candidateSourceFixture(path, bytes) {
  const commit = "a".repeat(40);
  const tree = "b".repeat(40);
  const entry = {
    mode: "100644",
    objectId: "c".repeat(40),
    path,
    segments: path.split("/"),
    alias: path.toLowerCase(),
    bytes: Buffer.from(bytes),
  };
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from("swecircuit/release-gate/materialization/v1alpha1", "utf8"));
  updateFrame(hash, Buffer.from(entry.mode, "ascii"));
  updateFrame(hash, Buffer.from(entry.path, "utf8"));
  updateFrame(hash, entry.bytes);
  return {
    commit,
    tree,
    entries: [entry],
    binding: {
      commit,
      tree,
      files: 1,
      bytes: entry.bytes.byteLength,
      digest: `sha256:${hash.digest("hex")}`,
    },
  };
}

function stableAuthorityFixture() {
  const gateReceiptDigest = `sha256:${"1".repeat(64)}`;
  const stableValue = {
    apiVersion: "swecircuit/release-review-stable-reconstruction/v1alpha1",
    kind: "ReleaseReviewStableReconstruction",
    expectedParentDigest: `sha256:${"2".repeat(64)}`,
    offlineCache: {
      path: resolve(tmpdir(), "explicit-r20-cache"),
      provisioning: "external-host-untrusted-content-offline-only",
    },
    canonicalGate: {
      expectedReceiptDigest: gateReceiptDigest,
      files: [
        {
          path: "gate/receipt.json",
          mediaType: "application/json",
          bytes: 1,
          digest: gateReceiptDigest,
        },
        {
          path: "gate/stdout.log",
          mediaType: "application/octet-stream",
          bytes: 2,
          digest: `sha256:${"3".repeat(64)}`,
        },
        {
          path: "gate/stderr.log",
          mediaType: "application/octet-stream",
          bytes: 0,
          digest: `sha256:${"4".repeat(64)}`,
        },
      ],
    },
    externalHostBoundary:
      "The external host declares reconstruction inputs without authenticated provenance.",
  };
  const ownerExpectation = {
    compilationDigest: `sha256:${"5".repeat(64)}`,
    packageDigest: `sha256:${"6".repeat(64)}`,
  };
  const verifyAuthority = {
    apiVersion: "swecircuit/release-review-phase-authority/v1alpha1",
    kind: "ReleaseReviewPhaseAuthority",
    phase: "verify",
    ownerExpectation,
    handoffs: [
      {
        requestedPath: "handoffs/reviewer.json",
        path: "run/handoffs/reviewer.json",
        mediaType: "application/json",
        bytes: 3,
        digest: `sha256:${"7".repeat(64)}`,
      },
    ],
  };
  return {
    stable: {
      value: stableValue,
      digest: domainDigest("swecircuit/release-review-stable-reconstruction/v1alpha1", stableValue),
    },
    verify: {
      value: verifyAuthority,
      digest: domainDigest("swecircuit/release-review-phase-authority/v1alpha1", verifyAuthority),
    },
    ownerExpectation,
  };
}
function correctionPathsThrough(maxRevision, omitted = []) {
  const omittedSet = new Set(omitted);
  const paths = [];
  for (let revision = 1; revision <= maxRevision; revision += 1) {
    if (omittedSet.has(revision)) {
      continue;
    }
    const root = revision === 1 ? CORRECTION_ROOT : `${CORRECTION_ROOT}-r${revision}`;
    paths.push(
      `${root}/approval.json`,
      `${root}/handoff-verification.json`,
      `${root}/package-envelope.json`,
    );
  }
  return paths;
}

function correctionSpec(revision) {
  const root = revision === 1 ? CORRECTION_ROOT : `${CORRECTION_ROOT}-r${revision}`;
  return {
    id: `release-correction-r${revision}`,
    root,
    goalId: "v12.ide-run-loop.implementation.release-correction",
    goalRevision: revision,
    reportKind: "ImplementationPhaseHandoffVerification",
    phase: revision === 1 ? "release-correction" : `release-correction-r${revision}`,
    readinessField: "phaseReady",
  };
}

function activeSection(path, headingName) {
  const content = readFileSync(path, "utf8");
  const heading = `## ${headingName}\n`;
  const start = content.indexOf(heading);
  assert.notEqual(start, -1, `${path} must contain an active ${headingName} section`);
  const statusStart = start + heading.length;
  const nextHeading = content.indexOf("\n## ", statusStart);
  return content.slice(statusStart, nextHeading === -1 ? content.length : nextHeading);
}

function activeStatus(path) {
  return activeSection(path, "Status");
}

function gitBlobBatchRecord(objectId, bytes, options = {}) {
  const content = Buffer.from(bytes);
  const type = options.type ?? "blob";
  const size = options.size ?? String(content.byteLength);
  return Buffer.concat([
    Buffer.from(`${objectId} ${type} ${size}\n`, "ascii"),
    content,
    Buffer.from("\n", "ascii"),
  ]);
}

function processExists(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ESRCH") {
      return false;
    }
    throw error;
  }
}

test("candidate blob batch parsing preserves binary bytes and fails closed", () => {
  const firstObject = "1".repeat(40);
  const secondObject = "2".repeat(40);
  const firstBytes = Buffer.from([0x00, 0x0a, 0x0d, 0x7f, 0x80, 0xff]);
  const secondBytes = Buffer.alloc(0);
  const valid = Buffer.concat([
    gitBlobBatchRecord(firstObject, firstBytes),
    gitBlobBatchRecord(secondObject, secondBytes),
  ]);
  const parsed = RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
    [firstObject, secondObject],
    valid,
  );
  assert.deepEqual([...parsed.keys()], [firstObject, secondObject]);
  assert.deepEqual(parsed.get(firstObject), firstBytes);
  assert.deepEqual(parsed.get(secondObject), secondBytes);
  for (const parser of [
    RELEASE_REVIEW_TEST_HOOKS.parseGitBlobBatch,
    RELEASE_GATE_TEST_HOOKS.parseGitBlobBatch,
  ]) {
    const boundaryParsed = parser([firstObject, secondObject], valid);
    assert.deepEqual([...boundaryParsed.keys()], [firstObject, secondObject]);
    assert.deepEqual(boundaryParsed.get(firstObject), firstBytes);
    assert.throws(
      () => parser([firstObject], gitBlobBatchRecord(secondObject, firstBytes)),
      /unexpected object/u,
    );
    assert.throws(
      () =>
        parser(
          [firstObject],
          Buffer.concat([gitBlobBatchRecord(firstObject, firstBytes), Buffer.from("extra")]),
        ),
      /trailing bytes/u,
    );
  }

  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject],
        gitBlobBatchRecord(secondObject, firstBytes),
      ),
    /unexpected object/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject],
        gitBlobBatchRecord(firstObject, firstBytes, { type: "tree" }),
      ),
    /malformed header/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject],
        gitBlobBatchRecord(firstObject, Buffer.alloc(0), { size: "9007199254740992" }),
      ),
    /unsafe object size/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject],
        gitBlobBatchRecord(firstObject, firstBytes).subarray(0, -1),
      ),
    /truncated before the object delimiter/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject],
        Buffer.concat([gitBlobBatchRecord(firstObject, firstBytes), Buffer.from("extra")]),
      ),
    /trailing bytes/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch(
        [firstObject, firstObject],
        Buffer.concat([
          gitBlobBatchRecord(firstObject, firstBytes),
          gitBlobBatchRecord(firstObject, firstBytes),
        ]),
      ),
    /duplicate request/u,
  );
  const nonAsciiHeader = gitBlobBatchRecord(firstObject, firstBytes);
  nonAsciiHeader[0] = 0xff;
  assert.throws(
    () => RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitBlobBatch([firstObject], nonAsciiHeader),
    /non-ASCII header/u,
  );
});

test("parent and verifier harness loaders use constant-process Git blob batches", async () => {
  const fixture = await createGitBlobLoaderFixture();
  const verifierSource = readFileSync(VERIFIER_ENTRYPOINT, "utf8");
  assert.match(verifierSource, /RELEASE_REVIEW_TEST_HOOKS\.loadCandidateTree\(candidate\)/u);

  try {
    for (const revision of fixture.revisions) {
      const parentCalls = [];
      const parentOutput = createRecordedGitOutput(fixture.root, parentCalls);
      const source = RELEASE_REVIEW_PARENT_TEST_HOOKS.candidateSource(
        {},
        revision.commit,
        (_tools, args, options) => parentOutput(args, options),
      );
      assert.equal(source.entries.length, revision.files);
      assert.deepEqual(
        source.entries.find((entry) => entry.path === "binary.bin").bytes,
        BINARY_FIXTURE_BYTES,
      );
      assertConstantBatchRead(parentCalls, revision.files);

      const harnessCalls = [];
      const harnessOutput = createRecordedGitOutput(fixture.root, harnessCalls);
      const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(
        revision.commit,
        harnessOutput,
      );
      assert.equal(candidateTree.paths.length, revision.files);
      assert.deepEqual(candidateTree.file("binary.bin").bytes, BINARY_FIXTURE_BYTES);
      assertConstantBatchRead(harnessCalls, revision.files);
    }
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});
test("Git blob fixtures retain only explicit closed Git configuration", () => {
  const inherited = {
    PATH: "host-path",
    SWECIRCUIT_ENVIRONMENT_SENTINEL: "preserved",
    git_dir: "host-git-dir",
    GIT_WORK_TREE: "host-worktree",
    GIT_INDEX_FILE: "host-index",
    GIT_COMMON_DIR: "host-common-dir",
    GIT_OBJECT_DIRECTORY: "host-objects",
    GIT_ALTERNATE_OBJECT_DIRECTORIES: "host-alternates",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "core.hooksPath",
    GIT_CONFIG_VALUE_0: "host-hooks",
    GIT_CONFIG_PARAMETERS: "'core.worktree'='injected-worktree'",
    GIT_QUARANTINE_PATH: "host-quarantine",
    GIT_IMPLICIT_WORK_TREE: "0",
    git_namespace: "host-namespace",
    GIT_SHALLOW_FILE: "host-shallow",
    git_graft_file: "host-grafts",
    GIT_REPLACE_REF_BASE: "refs/replace-hostile/",
    git_no_replace_objects: "0",
    GiT_FuTuRe_RePoSiToRy_RoUtEr: "host-future-router",
    GIT_CONFIG_GLOBAL: "host-global",
    GIT_CONFIG_NOSYSTEM: "0",
    GIT_TERMINAL_PROMPT: "1",
  };

  const environment = fixtureGitEnvironment(inherited);
  assert.equal(environment.PATH, inherited.PATH);
  assert.equal(environment.SWECIRCUIT_ENVIRONMENT_SENTINEL, "preserved");
  assert.deepEqual(
    Object.keys(environment)
      .filter((key) => key.toUpperCase().startsWith("GIT_"))
      .sort(),
    ["GIT_CONFIG_GLOBAL", "GIT_CONFIG_NOSYSTEM", "GIT_TERMINAL_PROMPT"],
  );
  assert.equal(environment.GIT_CONFIG_GLOBAL, process.platform === "win32" ? "NUL" : "/dev/null");
  assert.equal(environment.GIT_CONFIG_NOSYSTEM, "1");
  assert.equal(environment.GIT_TERMINAL_PROMPT, "0");
});
test("Git blob fixtures execute in a fresh process under the closed Git environment", () => {
  const hostileEnvironment = { ...process.env };
  for (const key of Object.keys(hostileEnvironment)) {
    if (key.toUpperCase().startsWith("GIT_")) {
      Reflect.deleteProperty(hostileEnvironment, key);
    }
  }
  Object.assign(hostileEnvironment, {
    GIT_DIR: "host-git-dir",
    git_work_tree: "host-worktree",
    GIT_INDEX_FILE: "host-index",
    GIT_COMMON_DIR: "host-common-dir",
    GIT_OBJECT_DIRECTORY: "host-objects",
    git_alternate_object_directories: "host-alternates",
    GIT_CONFIG_PARAMETERS: "'core.worktree'='injected-worktree' 'core.hooksPath'='injected-hooks'",
    GIT_CONFIG_COUNT: "1",
    git_config_key_0: "core.hooksPath",
    GIT_CONFIG_VALUE_0: "injected-hooks",
    GIT_QUARANTINE_PATH: "host-quarantine",
    GIT_IMPLICIT_WORK_TREE: "0",
    git_namespace: "host-namespace",
    GIT_SHALLOW_FILE: "host-shallow",
    git_graft_file: "host-grafts",
    GIT_REPLACE_REF_BASE: "refs/replace-hostile/",
    git_no_replace_objects: "0",
    GIT_PREFIX: "host-prefix/",
    GIT_OPTIONAL_LOCKS: "0",
    GiT_FuTuRe_RePoSiToRy_RoUtEr: "host-future-router",
    Git_Config_Global: "host-global",
    git_config_nosystem: "0",
    Git_Terminal_Prompt: "1",
    SWECIRCUIT_ENVIRONMENT_SENTINEL: "preserved",
  });

  const probe = spawnSync(process.execPath, [GIT_BLOB_FIXTURE_PROBE_ENTRYPOINT], {
    cwd: ROOT,
    env: hostileEnvironment,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    timeout: 180_000,
    windowsHide: true,
  });
  assert.equal(probe.signal, null, "Git blob fixture environment probe was terminated");
  assert.equal(probe.status, 0, probe.stderr);
  const evidence = JSON.parse(probe.stdout);
  assert.deepEqual(evidence.childGitKeys, [
    "GIT_CONFIG_GLOBAL",
    "GIT_CONFIG_NOSYSTEM",
    "GIT_TERMINAL_PROMPT",
  ]);
  assert.equal(evidence.sentinel, "preserved");
  assert.deepEqual(
    evidence.revisions.map(({ files }) => files),
    [3, 35],
  );
  for (const revision of evidence.revisions) {
    assert.match(revision.commit, /^[0-9a-f]{40}$/u);
  }
});
test("Git changed-path diagnostics are canonical and fail closed", () => {
  assert.deepEqual(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitChangedPaths(
      Buffer.from("zeta.txt\0alpha.txt\0", "utf8"),
      "changed paths",
    ),
    ["alpha.txt", "zeta.txt"],
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitChangedPaths(
        Buffer.from("alpha.txt\0ALPHA.TXT\0", "utf8"),
        "changed paths",
      ),
    /duplicate path/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitChangedPaths(
        Buffer.from("../escape.txt\0", "utf8"),
        "changed paths",
      ),
    /unsafe cross-platform path/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parseGitChangedPaths(
        Buffer.from("unterminated", "utf8"),
        "changed paths",
      ),
    /not NUL terminated/u,
  );
});

test("scoped parent timeout owns residue, kills descendants, and reports timeout first", async () => {
  const fixtureRoot = await realpath(
    await mkdtemp(join(tmpdir(), "swecircuit-timeout-regression-")),
  );
  const descendantPidPath = join(fixtureRoot, "descendant.pid");
  const foreignRoot = await realpath(await mkdtemp(join(tmpdir(), "swr2-foreign-")));
  let descendantPid = null;

  const childSource = [
    'const { mkdirSync, writeFileSync } = require("node:fs");',
    'const { spawn } = require("node:child_process");',
    'const { tmpdir } = require("node:os");',
    'const { join } = require("node:path");',
    'mkdirSync(join(tmpdir(), "swr2-owned"));',
    'const descendant = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], { stdio: "ignore" });',
    `writeFileSync(${JSON.stringify(descendantPidPath)}, String(descendant.pid));`,
    "setInterval(() => {}, 1000);",
  ].join("\n");

  try {
    const result = await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.runScopedParentProcess(
      process.execPath,
      ["-e", childSource],
      {
        cwd: fixtureRoot,
        environment: process.env,
        timeoutMs: 1_000,
      },
    );
    descendantPid = Number(readFileSync(descendantPidPath, "utf8"));
    assert.equal(result.timedOut, true);
    assert.equal(result.timeout.boundMs, 1_000);
    assert.equal(result.timeout.termination.accepted, true);
    if (process.platform === "win32") {
      const termination = result.timeout.termination;
      const treeAccepted =
        termination.tree.status === 0 &&
        termination.tree.signal === null &&
        termination.tree.error === null;
      assert.equal(
        termination.accepted,
        treeAccepted || termination.directFallback?.accepted === true,
      );
    }
    assert.deepEqual(result.operationRootCleanup.leakedOperationRoots, ["swr2-owned"]);
    assert.equal(result.operationRootCleanup.noNewOperationRoots, false);
    assert.equal(result.operationRootCleanup.testOwnedTempRootRemoved, true);
    assert.equal(existsSync(foreignRoot), true);

    let primaryError = null;
    try {
      V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.assertCommandPassed(
        result,
        "scoped timeout regression",
      );
    } catch (error) {
      primaryError = error;
    }
    assert.ok(primaryError instanceof Error);
    assert.match(primaryError.message, /scoped timeout regression timed out/u);
    assert.doesNotMatch(primaryError.message, /operation root/u);

    for (let attempt = 0; attempt < 20 && processExists(descendantPid); attempt += 1) {
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 50));
    }
    assert.equal(processExists(descendantPid), false, "timed-out descendant remained alive");
  } finally {
    if (Number.isInteger(descendantPid) && processExists(descendantPid)) {
      process.kill(descendantPid, "SIGKILL");
    }
    await rm(foreignRoot, { recursive: true, force: true });
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});

test("release-review parent and workers preserve the candidate-runtime import boundary", () => {
  const parentSource = readFileSync(PARENT_ENTRYPOINT, "utf8");
  const harnessSource = readFileSync(HARNESS_ENTRYPOINT, "utf8");
  const verifierSource = readFileSync(VERIFIER_ENTRYPOINT, "utf8");

  for (const [label, source] of [
    ["parent", parentSource],
    ["harness", harnessSource],
    ["verifier", verifierSource],
  ]) {
    assert.deepEqual(
      staticImportSpecifiers(source).filter((specifier) => !specifier.startsWith("node:")),
      [],
      `${label} must have built-in-only static imports`,
    );
  }
  assert.doesNotMatch(parentSource, /\bimport\s*\(/u);
  assert.doesNotMatch(harnessSource, /from\s+["'][^"']*dist\/index\.js["']/u);
  assert.doesNotMatch(
    verifierSource,
    /from\s+["'][^"']*(?:dist\/index\.js|run-release-review\.mjs)["']/u,
  );
  assert.match(harnessSource, /specialistRuntime = await import\(/u);
  assert.match(verifierSource, /const harnessModule = await import\(/u);

  const environment = unboundWorkerEnvironment();
  for (const [label, entrypoint, arguments_] of [
    ["harness", HARNESS_ENTRYPOINT, ["prepare", "a".repeat(40)]],
    ["verifier", VERIFIER_ENTRYPOINT, ["a".repeat(40), "handoffs/reviewer.json"]],
  ]) {
    const result = spawnSync(process.execPath, [entrypoint, ...arguments_], {
      cwd: ROOT,
      env: environment,
      encoding: "utf8",
      timeout: 10_000,
      windowsHide: true,
    });
    assert.equal(result.signal, null, `${label} was terminated`);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /requires an absolute parent context/u);
  }
});

test("runtime binding is deterministic and fails closed after identity mutation", () => {
  const identity = {
    apiVersion: "swecircuit/release-review-runtime/v1alpha1",
    kind: "ReleaseReviewRuntimeBinding",
    candidateCommit: "b".repeat(40),
    candidateSource: {
      commit: "b".repeat(40),
      tree: "c".repeat(40),
      files: 3,
      bytes: 30,
      digest: `sha256:${"1".repeat(64)}`,
    },
    tooling: {
      parent: { path: "scripts/run-v12-release-review.mjs", digest: `sha256:${"2".repeat(64)}` },
      harness: { path: HARNESS_PATH, digest: `sha256:${"3".repeat(64)}` },
      verifier: { path: VERIFIER_PATH, digest: `sha256:${"4".repeat(64)}` },
    },
    lockedSupply: {
      lockfile: { path: "package-lock.json", digest: `sha256:${"5".repeat(64)}` },
      supplyDigest: `sha256:${"6".repeat(64)}`,
      installed: { digest: `sha256:${"7".repeat(64)}` },
    },
    toolchain: {
      node: { version: process.version, digest: `sha256:${"8".repeat(64)}` },
      npm: { version: "test", digest: `sha256:${"9".repeat(64)}` },
      git: { version: "test", digest: `sha256:${"a".repeat(64)}` },
      typescript: { version: "test", digest: `sha256:${"b".repeat(64)}` },
    },
    platform: { platform: process.platform, architecture: process.arch },
    environmentPolicy: { npmNetwork: "offline", npmLifecycleScripts: "disabled" },
    externalDeclarations: {
      stableReconstructionDigest: `sha256:${"d".repeat(64)}`,
      executableTrust: "external-host-observed-entrypoint-bytes-only",
      hostileProcessIsolation: "external-host",
    },
    generatedRuntime: {
      entrypoint: "dist/index.js",
      files: 1,
      bytes: 10,
      digest: `sha256:${"c".repeat(64)}`,
    },
  };

  const first = RELEASE_REVIEW_PARENT_TEST_HOOKS.createRuntimeBinding(identity);
  const second = RELEASE_REVIEW_PARENT_TEST_HOOKS.createRuntimeBinding(
    JSON.parse(JSON.stringify(identity)),
  );
  assert.deepEqual(first, second);
  assert.equal(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.verifyRuntimeBinding(first),
    first.runtimeBindingDigest,
  );

  const tampered = JSON.parse(JSON.stringify(first));
  tampered.generatedRuntime.digest = `sha256:${"d".repeat(64)}`;
  assert.throws(
    () => RELEASE_REVIEW_PARENT_TEST_HOOKS.verifyRuntimeBinding(tampered),
    /Runtime binding digest mismatch/u,
  );
});

test("stable runtime policy excludes invocation-specific temporary paths", () => {
  const firstRoot = join(ROOT, ".local", "parent-temp-one");
  const secondRoot = join(ROOT, ".local", "parent-temp-two");
  const common = { HOME: join(ROOT, ".local", "home"), LANG: "C" };
  const policy = (root) =>
    RELEASE_REVIEW_PARENT_TEST_HOOKS.environmentPolicy({
      ...common,
      TEMP: root,
      TMP: root,
      TMPDIR: root,
    });

  const first = policy(firstRoot);
  const second = policy(secondRoot);
  assert.deepEqual(first, second);
  assert.deepEqual(first.inherited, common);
  assert.equal(
    first.invocationTemporaryPaths,
    "external-host-bound-invocation-paths-excluded-from-stable-runtime-identity",
  );
  assert.doesNotMatch(JSON.stringify(first), /parent-temp-(?:one|two)/u);
  assert.notDeepEqual(
    first,
    RELEASE_REVIEW_PARENT_TEST_HOOKS.environmentPolicy({
      ...common,
      LANG: "en_CA.UTF-8",
      TEMP: secondRoot,
      TMP: secondRoot,
      TMPDIR: secondRoot,
    }),
  );
});
test("closed phase grammar reconstructs prefixes from exact external inputs", () => {
  assert.deepEqual(RELEASE_REVIEW_PARENT_TEST_HOOKS.PHASE_PREFIXES, {
    prepare: ["prepare"],
    compile: ["prepare", "compile"],
    approve: ["prepare", "compile", "approve"],
    verify: ["prepare", "compile", "approve", "verify"],
    paths: ["paths"],
  });
  const gateDigest = `sha256:${"1".repeat(64)}`;
  const compilationDigest = `sha256:${"2".repeat(64)}`;
  const packageDigest = `sha256:${"3".repeat(64)}`;
  const handoffDigest = `sha256:${"4".repeat(64)}`;
  const parsed = RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("verify", [
    gateDigest,
    compilationDigest,
    packageDigest,
    "handoffs/reviewer.json",
    handoffDigest,
  ]);
  assert.deepEqual(parsed, {
    gateReceiptDigest: gateDigest,
    ownerExpectation: { compilationDigest, packageDigest },
    handoffs: [{ path: "handoffs/reviewer.json", rawDigest: handoffDigest }],
  });

  const candidate = "d".repeat(40);
  const paths = RELEASE_REVIEW_PARENT_TEST_HOOKS.candidateRunPaths(candidate);
  const declared = RELEASE_REVIEW_PARENT_TEST_HOOKS.declaredExternalInputPaths(
    parsed,
    paths,
    candidate,
  );
  assert.equal(declared.canonicalGate.length, 3);
  assert.deepEqual(
    declared.handoffs.map((entry) => [entry.requestedPath, entry.path, entry.expectedDigest]),
    [["handoffs/reviewer.json", `${paths.handoffs}/reviewer.json`, handoffDigest]],
  );
  const declaredPaths = [
    ...declared.canonicalGate.map((entry) => entry.path),
    ...declared.handoffs.map((entry) => entry.path),
  ];
  for (const forbidden of [
    paths.packageEnvelope,
    paths.compilationSummary,
    paths.approval,
    paths.runtimeBinding,
    paths.phaseMetadata,
  ]) {
    assert.equal(declaredPaths.includes(forbidden), false, forbidden);
  }

  assert.throws(
    () => RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("compile", []),
    /wrong number/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("approve", [
        gateDigest,
        compilationDigest,
        `SHA256:${"3".repeat(64)}`,
      ]),
    /digest pair/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("verify", [
        gateDigest,
        compilationDigest,
        packageDigest,
        "../reviewer.json",
        handoffDigest,
      ]),
    /Unsafe handoff/u,
  );
});

test("handoff paths reject non-scalars, controls, non-NFC text, and aliases before use", () => {
  const gateDigest = `sha256:${"1".repeat(64)}`;
  const compilationDigest = `sha256:${"2".repeat(64)}`;
  const packageDigest = `sha256:${"3".repeat(64)}`;
  const handoffDigest = `sha256:${"4".repeat(64)}`;
  const candidate = "d".repeat(40);
  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(candidate);
  const invalidPaths = [
    `handoffs/${String.fromCharCode(0xd800)}.json`,
    `handoffs/${String.fromCharCode(0xdc00)}.json`,
    ...[
      "\u0001",
      "\u007f",
      "\u0085",
      "\u061c",
      "\u200e",
      "\u200f",
      "\u202a",
      "\u202e",
      "\u2066",
      "\u2069",
    ].map((control) => `handoffs/reviewer${control}.json`),
    "handoffs/reviewe\u0301r.json",
    "../reviewer.json",
    "handoffs/../reviewer.json",
    "handoffs/nested/reviewer.json",
    "handoffs\\reviewer.json",
    "handoffs/CON.json",
    "handoffs/reviewer.json.",
    "handoffs/reviewer.json ",
  ];
  for (const path of invalidPaths) {
    assert.throws(() =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("verify", [
        gateDigest,
        compilationDigest,
        packageDigest,
        path,
        handoffDigest,
      ]),
    );
    assert.throws(() => RELEASE_REVIEW_TEST_HOOKS.safeAuthorityHandoffPath(path, "test handoff"));
    assert.throws(() => RELEASE_REVIEW_HANDOFF_TEST_HOOKS.safeHandoffPath(path, runPaths));
  }

  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("verify", [
        gateDigest,
        compilationDigest,
        packageDigest,
        "handoffs/Reviewer.json",
        handoffDigest,
        "handoffs/reviewer.json",
        handoffDigest,
      ]),
    /alias/u,
  );
  const duplicateFixture = stableAuthorityFixture().verify.value;
  duplicateFixture.handoffs.push({
    ...duplicateFixture.handoffs[0],
    requestedPath: "handoffs/Reviewer.json",
    path: "run/handoffs/Reviewer.json",
  });
  const duplicateDigest = domainDigest(
    "swecircuit/release-review-phase-authority/v1alpha1",
    duplicateFixture,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.validatePhaseAuthority(duplicateFixture, duplicateDigest, "verify"),
    /alias/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_HANDOFF_TEST_HOOKS.validateVerifierPhaseAuthority(
        duplicateFixture,
        duplicateDigest,
      ),
    /alias/u,
  );

  const supplementary = "handoffs/reviewer-\u{1f600}.json";
  const parsed = RELEASE_REVIEW_PARENT_TEST_HOOKS.parsePhaseInputs("verify", [
    gateDigest,
    compilationDigest,
    packageDigest,
    supplementary,
    handoffDigest,
  ]);
  assert.equal(parsed.handoffs[0].path, supplementary);
  const resolved = RELEASE_REVIEW_HANDOFF_TEST_HOOKS.safeHandoffPath(supplementary, runPaths);
  assert.equal(resolved.file, "reviewer-\u{1f600}.json");
  assert.equal(resolved.path, `${runPaths.handoffs}/reviewer-\u{1f600}.json`);
});
test("stable reconstruction and phase authority reject substitution independently", () => {
  const fixture = stableAuthorityFixture();
  assert.equal(
    RELEASE_REVIEW_TEST_HOOKS.validateStableReconstruction(
      fixture.stable.value,
      fixture.stable.digest,
    ),
    fixture.stable.value,
  );
  assert.equal(
    RELEASE_REVIEW_HANDOFF_TEST_HOOKS.validateVerifierStableReconstruction(
      fixture.stable.value,
      fixture.stable.digest,
    ),
    fixture.stable.value,
  );
  assert.equal(
    RELEASE_REVIEW_TEST_HOOKS.validatePhaseAuthority(
      fixture.verify.value,
      fixture.verify.digest,
      "verify",
    ),
    fixture.verify.value,
  );
  assert.equal(
    RELEASE_REVIEW_HANDOFF_TEST_HOOKS.validateVerifierPhaseAuthority(
      fixture.verify.value,
      fixture.verify.digest,
    ),
    fixture.verify.value,
  );

  const substituted = structuredClone(fixture.verify.value);
  substituted.ownerExpectation.packageDigest = `sha256:${"8".repeat(64)}`;
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.validatePhaseAuthority(
        substituted,
        fixture.verify.digest,
        "verify",
      ),
    /digest mismatch/u,
  );

  const specialistPackage = {
    compilationDigest: fixture.ownerExpectation.compilationDigest,
    packageDigest: fixture.ownerExpectation.packageDigest,
    files: [
      { path: "agents/reviewer.md", content: "reviewer\n" },
      { path: "manifest.json", content: "{}\n" },
    ],
  };
  assert.deepEqual(
    RELEASE_REVIEW_TEST_HOOKS.assertOwnerPackageExpectation(
      specialistPackage,
      fixture.ownerExpectation,
    ),
    fixture.ownerExpectation,
  );
  const actual = specialistPackage.files.map((file) => ({
    path: file.path,
    bytes: Buffer.from(file.content, "utf8"),
  }));
  assert.equal(RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(actual, specialistPackage).length, 2);
  assert.throws(
    () => RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(actual.slice(0, 1), specialistPackage),
    /roster mismatch/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(
        [...actual, { path: "extra.json", bytes: Buffer.from("{}\n") }],
        specialistPackage,
      ),
    /roster mismatch/u,
  );
  const substitutedActual = actual.map((entry) => ({
    path: entry.path,
    bytes: Buffer.from(entry.bytes),
  }));
  substitutedActual[0].bytes = Buffer.from("substituted\n", "utf8");
  assert.throws(
    () => RELEASE_REVIEW_TEST_HOOKS.assertPackageFileSet(substitutedActual, specialistPackage),
    /differs from reconstruction/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.assertOwnerPackageExpectation(specialistPackage, {
        ...fixture.ownerExpectation,
        packageDigest: `sha256:${"9".repeat(64)}`,
      }),
    /owner digest pair/u,
  );
});
test("copied production lifecycle excludes correction evidence after its sealed history", () => {
  const { isPostFixtureCorrection } = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS;
  const root = "docs/specs/v12-ide-run-loop/evidence/implementation";
  assert.equal(isPostFixtureCorrection(`${root}/release-correction-r21`), false);
  assert.equal(isPostFixtureCorrection(`${root}/release-correction-r22`), true);
  assert.equal(isPostFixtureCorrection(`${root}/release-correction-r24/inputs/test-plan.md`), true);
  assert.equal(isPostFixtureCorrection(`${root}/release-correction-r19-independent-review`), false);
});

test("copied production lifecycle consumes the fresh-process release-gate cache supply", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-host-cache-copy-")));
  const sourceRoot = join(root, "isolated-candidate");
  const externalCache = join(root, "external-host-cache");
  const sentinel = Buffer.from("external host cache sentinel\n", "utf8");
  try {
    const typeScriptKey = RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey;
    const isolatedParentEnvironment = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parentEnvironment(
      externalCache,
      `sha256:${"0".repeat(64)}`,
      RELEASE_GATE_TEST_HOOKS.hostNpmCliPath,
      RELEASE_GATE_TEST_HOOKS.hostGitPath,
      {
        ...process.env,
        SWECIRCUIT_HOST_DEPENDENCY_ROOT: "legacy-gate-only-dependency-supply",
        [typeScriptKey]: "legacy-gate-only-typescript-supply",
      },
    );
    assert.equal(isolatedParentEnvironment.SWECIRCUIT_HOST_DEPENDENCY_ROOT, undefined);
    assert.equal(isolatedParentEnvironment[typeScriptKey], undefined);

    await materializeHostCacheProbeSource(sourceRoot);
    await materializeHostCacheProbeSource(sourceRoot);
    await mkdir(externalCache);
    await writeFile(join(externalCache, "sentinel.txt"), sentinel);

    const destination = join(root, "lifecycle-cache");
    const success = runHostCacheProbe(sourceRoot, externalCache, destination);
    assert.equal(success.signal, null, "fresh-process cache probe was terminated");
    assert.equal(success.status, 0, success.stderr);
    const result = JSON.parse(success.stdout);
    const canonicalExternalCache = await realpath(externalCache);
    assert.equal(result.configuredSource, canonicalExternalCache);
    assert.equal(result.gateSource, externalCache);
    assert.equal(result.evidence.source, canonicalExternalCache);
    assert.equal(result.evidence.sourceSelection, "release-gate-host-npm-cache");
    assert.equal(result.evidence.rootsDisjoint, true);
    assert.equal(result.checkoutLocalCacheAbsent, true);
    assert.equal(result.sentinel, sentinel.toString("base64"));
    assert.deepEqual(readFileSync(join(destination, "sentinel.txt")), sentinel);

    const nonDirectoryCache = join(root, "not-a-cache-directory");
    await writeFile(nonDirectoryCache, "not a directory\n", "utf8");
    const existingDestination = join(root, "existing-destination");
    await mkdir(existingDestination);
    const failures = [
      {
        cache: join(root, "missing-cache"),
        destination: join(root, "missing-cache-destination"),
        message: /release-gate host npm cache supply is missing/u,
      },
      {
        cache: nonDirectoryCache,
        destination: join(root, "non-directory-destination"),
        message: /release-gate host npm cache is not a directory/u,
      },
      {
        cache: externalCache,
        destination: existingDestination,
        message: /lifecycle-owned npm cache destination already exists/u,
      },
      {
        cache: externalCache,
        destination: join(externalCache, "nested-copy"),
        message: /release-gate host npm cache overlaps the lifecycle-owned copy/u,
      },
    ];
    for (const failure of failures) {
      const probe = runHostCacheProbe(sourceRoot, failure.cache, failure.destination);
      assert.equal(probe.signal, null, "fresh-process cache guard probe was terminated");
      assert.equal(probe.status, 1, probe.stderr);
      assert.match(probe.stderr, failure.message);
    }
    assert.equal(existsSync(join(externalCache, "nested-copy")), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("nested fixture repository processes discard an enclosing candidate Git context", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r26-git-env-")));
  const hostileEnvironment = { ...process.env };
  for (const key of Object.keys(hostileEnvironment)) {
    if (key.toUpperCase().startsWith("GIT_")) {
      Reflect.deleteProperty(hostileEnvironment, key);
    }
  }
  Object.assign(hostileEnvironment, {
    GIT_DIR: join(root, "outer-git"),
    GIT_WORK_TREE: join(root, "outer-worktree"),
    GIT_INDEX_FILE: join(root, "outer.index"),
    git_common_dir: join(root, "outer-common"),
    GIT_OBJECT_DIRECTORY: join(root, "outer-objects"),
    git_alternate_object_directories: join(root, "outer-alternates"),
    GIT_CONFIG: join(root, "hostile-config"),
    GIT_CONFIG_PARAMETERS: "'core.worktree'='injected-worktree'",
    GIT_CONFIG_COUNT: "1",
    git_config_key_0: "core.worktree",
    GIT_CONFIG_VALUE_0: join(root, "injected-worktree"),
    GIT_IMPLICIT_WORK_TREE: "0",
    git_graft_file: join(root, "hostile-grafts"),
    GIT_NO_REPLACE_OBJECTS: "0",
    git_replace_ref_base: "refs/replace-hostile/",
    GIT_PREFIX: "hostile-prefix/",
    git_shallow_file: join(root, "hostile-shallow"),
    GIT_CEILING_DIRECTORIES: root,
    git_internal_super_prefix: "hostile-super-prefix/",
    GIT_OPTIONAL_LOCKS: "0",
    git_namespace: "hostile-namespace",
    GIT_QUARANTINE_PATH: join(root, "hostile-quarantine"),
    GiT_FuTuRe_RePoSiToRy_RoUtEr: join(root, "future-router"),
    Git_Config_Global: join(root, "hostile-global.gitconfig"),
    git_config_nosystem: "0",
    Git_Terminal_Prompt: "1",
    SWECIRCUIT_ENVIRONMENT_SENTINEL: "preserved",
  });

  try {
    const probe = spawnSync(process.execPath, [GIT_ENVIRONMENT_PROBE_ENTRYPOINT, root], {
      cwd: ROOT,
      env: hostileEnvironment,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      timeout: 180_000,
      windowsHide: true,
    });
    assert.equal(probe.signal, null, "Git environment probe was terminated");
    assert.equal(probe.status, 0, probe.stderr);
    const evidence = JSON.parse(probe.stdout);
    assert.match(evidence.commit, /^[0-9a-f]{40}$/u);
    assert.equal(evidence.authenticated.rows["sample.txt"].bytes, 28);
    assert.equal(evidence.explicitEnvironmentRequired, true);
    const expectedGitKeys = ["GIT_CONFIG_GLOBAL", "GIT_CONFIG_NOSYSTEM", "GIT_TERMINAL_PROMPT"];
    assert.deepEqual(evidence.gitKeys.fixture, [
      "GIT_AUTHOR_DATE",
      "GIT_COMMITTER_DATE",
      ...expectedGitKeys,
    ]);
    assert.deepEqual(evidence.gitKeys.gate, expectedGitKeys);
    assert.deepEqual(evidence.gitKeys.parent, expectedGitKeys);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("materialized lifecycle executes and receipts one external TypeScript adapter", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r29-typescript-")));
  const fixtureRoot = join(root, "fixture");
  const lifecycleRoot = join(root, "lifecycle");
  const smokePath = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptSmokePath;
  const smokeFile = resolve(fixtureRoot, ...smokePath.split("/"));
  const entrypoint = join(root, "host-tsc.mjs");
  const expectedSmoke =
    'const lifecycleProbe: string = "swecircuit-lifecycle-typescript";\nvoid lifecycleProbe;\n';
  await mkdir(dirname(smokeFile), { recursive: true });
  await writeFile(smokeFile, expectedSmoke, "utf8");
  await writeFile(
    entrypoint,
    [
      'import { readFileSync } from "node:fs";',
      'import { resolve } from "node:path";',
      "const arguments_ = process.argv.slice(2);",
      'if (arguments_.includes("--version")) {',
      '  process.stdout.write("Version 7.0.2-lifecycle-test\\n");',
      "} else {",
      `  const smokePath = ${JSON.stringify(smokePath)};`,
      `  const expected = ${JSON.stringify(expectedSmoke)};`,
      "  if (!arguments_.includes(smokePath)) {",
      '    process.stderr.write("bounded smoke input missing\\n");',
      "    process.exitCode = 9;",
      '  } else if (readFileSync(resolve(process.cwd(), ...smokePath.split("/")), "utf8") !== expected) {',
      '    process.stderr.write("bounded smoke input changed\\n");',
      "    process.exitCode = 10;",
      "  }",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  const supplyKey = RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey;
  const environment = { ...process.env };
  for (const key of Object.keys(environment)) {
    if (key.toLowerCase() === supplyKey.toLowerCase()) Reflect.deleteProperty(environment, key);
  }
  environment[supplyKey] = entrypoint;

  try {
    const supply = await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.createLifecycleTypeScriptSupply(
      lifecycleRoot,
      fixtureRoot,
      environment,
    );
    assert.equal(supply.delegatedBinding.path, await realpath(entrypoint));
    assert.equal(supply.binding.supplied, true);
    assert.match(supply.receipt.version, /^Version 7\.0\.2-lifecycle-test$/u);
    assert.deepEqual(
      supply.arguments,
      V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.fixtureTypeScriptArguments,
    );
    const runner = resolve(ROOT, V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptRunnerPath);
    const result = spawnSync(process.execPath, [runner, ...supply.arguments], {
      cwd: fixtureRoot,
      env: supply.environment,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      timeout: 30_000,
      windowsHide: true,
    });
    assert.equal(result.signal, null);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, "");
    const evidence = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseLifecycleTypeScriptEvidence(
      Buffer.from(result.stdout, "utf8"),
      supply,
    );
    assert.deepEqual(evidence.receipt, supply.receipt);
    assert.equal(evidence.sentinelCount, 1);
    await assert.rejects(
      V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.createLifecycleTypeScriptSupply(
        join(root, "duplicate-lifecycle"),
        fixtureRoot,
        { ...environment, [supplyKey.toLowerCase()]: entrypoint },
      ),
      /must be supplied at most once/u,
    );

    await writeFile(smokeFile, "changed bounded input\n", "utf8");
    const failedResult = spawnSync(process.execPath, [supply.binding.path, ...supply.arguments], {
      cwd: fixtureRoot,
      env: supply.environment,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      timeout: 30_000,
      windowsHide: true,
    });
    assert.equal(failedResult.signal, null);
    assert.equal(failedResult.status, 10, failedResult.stderr);
    assert.equal(failedResult.stdout.includes(supply.sentinel), false);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("lifecycle TypeScript evidence parser fails closed", () => {
  const receipt = {
    path: "C:\\external\\lifecycle-tsc.mjs",
    bytes: 123,
    digest: `sha256:${"a".repeat(64)}`,
    nlink: 1,
    supplied: true,
    version: "Version 7.0.2-test",
  };
  const sentinel = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptCompileSentinel;
  const supply = { receipt, sentinel };
  const bindingLine = `SWECIRCUIT_TYPESCRIPT_BINDING ${JSON.stringify(receipt)}`;
  const parse = (text) =>
    V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseLifecycleTypeScriptEvidence(
      Buffer.from(text, "utf8"),
      supply,
    );

  assert.throws(() => parse(`${sentinel}\n`), /must contain one TypeScript receipt/u);
  assert.throws(
    () => parse(`${bindingLine}\n${bindingLine}\n${sentinel}\n`),
    /must contain one TypeScript receipt/u,
  );
  assert.throws(
    () => parse(`SWECIRCUIT_TYPESCRIPT_BINDING {\n${sentinel}\n`),
    /receipt is not valid JSON/u,
  );
  assert.throws(
    () =>
      parse(
        `SWECIRCUIT_TYPESCRIPT_BINDING ${JSON.stringify({ ...receipt, supplied: false })}\n${sentinel}\n`,
      ),
    /receipt changed/u,
  );
  assert.throws(() => parse(`${bindingLine}\n`), /must contain one compiler sentinel/u);
  assert.throws(
    () => parse(`${bindingLine}\n${sentinel}\n${sentinel}\n`),
    /must contain one compiler sentinel/u,
  );
});

test("release runtime and npm compatibility policies are portable and closed", () => {
  assert.deepEqual(
    RELEASE_REVIEW_TEST_HOOKS.releaseReviewRuntimeIdentity("linux", "x64", {
      header: {},
      sharedObjects: ["/lib/ld-musl-x86_64.so.1"],
    }),
    { platform: "linux", architecture: "x64", libc: "musl" },
  );
  assert.equal(
    RELEASE_REVIEW_TEST_HOOKS.detectReleaseReviewLibc("linux", {
      header: { glibcVersionRuntime: "2.39" },
      sharedObjects: [],
    }),
    "glibc",
  );
  const supported = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.isSupportedNpmVersion;
  assert.equal(supported("10.9.8"), true);
  assert.equal(supported("11.11.0"), true);
  assert.equal(supported("12.0.0-beta.1"), true);
  assert.equal(supported("9.9.4"), false);
  assert.equal(supported("not-semver"), false);
});

test("candidate TypeScript log uses canonical compact JSON and private binding", () => {
  const path = "C:\\candidate\\node_modules\\typescript\\bin\\tsc";
  const expected = {
    path,
    bytes: 44,
    digest: `sha256:${"1".repeat(64)}`,
    nlink: 1,
    version: "Version 7.0.2",
  };
  const receipt = { ...expected, supplied: false };
  const gateReceipt = {
    executionAuthority: {
      toolchain: { before: { typescript: expected } },
      candidateDependencies: { typeScriptEntrypoint: path },
    },
  };
  const prefix = "SWECIRCUIT_TYPESCRIPT_BINDING ";
  const evidence = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseCandidateTypeScriptEvidence(
    Buffer.from(`${prefix}${JSON.stringify(receipt)}\n`, "utf8"),
    gateReceipt,
  );
  assert.equal(evidence.candidatePrivate, true);
  assert.deepEqual(evidence.receipt, receipt);

  const noncanonical = JSON.stringify(receipt).replace('{"path"', '{ "path"');
  assert.throws(
    () =>
      V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseCandidateTypeScriptEvidence(
        Buffer.from(`${prefix}${noncanonical}\n`, "utf8"),
        gateReceipt,
      ),
    /canonical inline JSON/u,
  );
});

test("lifecycle adapter compiles the bounded input with host TypeScript", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r29-host-typescript-")));
  const fixtureRoot = join(root, "fixture");
  const lifecycleRoot = join(root, "lifecycle");
  const smokePath = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptSmokePath;
  const smokeFile = resolve(fixtureRoot, ...smokePath.split("/"));
  await mkdir(dirname(smokeFile), { recursive: true });
  await copyFile(resolve(ROOT, ...smokePath.split("/")), smokeFile);

  try {
    const supply = await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.createLifecycleTypeScriptSupply(
      lifecycleRoot,
      fixtureRoot,
    );
    assert.match(supply.receipt.version, /^Version 7\.0\.2$/u);
    const runner = resolve(ROOT, V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptRunnerPath);
    const result = spawnSync(process.execPath, [runner, ...supply.arguments], {
      cwd: fixtureRoot,
      env: supply.environment,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      timeout: 30_000,
      windowsHide: true,
    });
    assert.equal(result.signal, null);
    assert.equal(result.status, 0, result.stderr);
    const evidence = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseLifecycleTypeScriptEvidence(
      Buffer.from(result.stdout, "utf8"),
      supply,
    );
    assert.deepEqual(evidence.receipt, supply.receipt);
    assert.equal(evidence.sentinelCount, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("materialized lifecycle detects persistent compiler mutation after child return", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r29-mutation-")));
  const fixtureRoot = join(root, "fixture");
  const lifecycleRoot = join(root, "lifecycle");
  const smokePath = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptSmokePath;
  await mkdir(dirname(resolve(fixtureRoot, ...smokePath.split("/"))), { recursive: true });
  await writeFile(resolve(fixtureRoot, ...smokePath.split("/")), "bounded mutation input\n");

  try {
    const supply =
      await V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.createMutatingLifecycleTypeScriptSupply(
        lifecycleRoot,
        fixtureRoot,
      );
    const before = readFileSync(supply.binding.path);
    const runner = resolve(ROOT, V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.typeScriptRunnerPath);
    const result = spawnSync(
      process.execPath,
      [runner, ...V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.fixtureTypeScriptArguments],
      {
        cwd: fixtureRoot,
        env: supply.environment,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
        timeout: 30_000,
        windowsHide: true,
      },
    );
    assert.equal(result.signal, null);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /TypeScript binding changed after compilation\./u);
    assert.notDeepEqual(readFileSync(supply.binding.path), before);
    const evidence = V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.parseLifecycleTypeScriptEvidence(
      Buffer.from(result.stdout, "utf8"),
      supply,
    );
    assert.deepEqual(evidence.receipt, supply.receipt);
    assert.equal(evidence.sentinelCount, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("the positive copied gate alone receives the extended lifecycle timeout", () => {
  const source = readFileSync(
    resolve(ROOT, "test/helpers/v12-release-review-lifecycle.mjs"),
    "utf8",
  );
  assert.equal(V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.processTimeoutMs, 900_000);
  assert.equal(V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.canonicalGateTimeoutMs, 1_800_000);
  assert.equal(source.match(/timeoutMs: CANONICAL_GATE_TIMEOUT_MS/gu)?.length, 1);
  assert.match(
    source,
    /const gateResult = await runProcess\([\s\S]{0,500}timeoutMs: CANONICAL_GATE_TIMEOUT_MS,[\s\S]{0,200}assertCommandPassed\(gateResult, "copied production canonical gate"\);/u,
  );
});

test("lifecycle production identities match current source bytes", () => {
  assert.equal(Object.hasOwn(PRODUCTION_IDENTITIES, "scripts/run-typescript.mjs"), true);
  for (const [path, expected] of Object.entries(PRODUCTION_IDENTITIES)) {
    const bytes = readFileSync(resolve(ROOT, ...path.split("/")));
    assert.deepEqual({ bytes: bytes.byteLength, digest: digest(bytes) }, expected, path);
  }
});

test("canonical npm test schedules the exact lifecycle after the core suite", () => {
  const manifest = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
  const coreSource = readFileSync(resolve(ROOT, "test/v12-release-review.test.mjs"), "utf8");
  const lifecycleSource = readFileSync(
    resolve(ROOT, "test/lifecycle/v12-release-review-lifecycle.test.mjs"),
    "utf8",
  );

  assert.equal(
    manifest.scripts.test,
    "npm run build --silent && npm run test:core && npm run test:lifecycle",
  );
  assert.equal(manifest.scripts["test:core"], "node --test test/*.test.mjs");
  assert.equal(manifest.scripts["test:lifecycle"], "node --test test/lifecycle/*.test.mjs");
  assert.doesNotMatch(
    coreSource,
    /test\("isolated copied production entrypoints complete one exact compile-to-verify lifecycle"/u,
  );
  assert.match(
    lifecycleSource,
    /test\("isolated copied production entrypoints complete one exact compile-to-verify lifecycle"/u,
  );
  const identityPreflight = lifecycleSource.indexOf(
    "assertCommittedProductionIdentities(candidateCommit);",
  );
  const expensiveMaterialization = lifecycleSource.indexOf(
    "RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit,",
  );
  assert.ok(identityPreflight >= 0, "committed production identity preflight is missing");
  assert.ok(
    identityPreflight < expensiveMaterialization,
    "committed production identity preflight must precede expensive materialization",
  );
  assert.match(
    lifecycleSource,
    /materializeCandidateSource\(candidateCommit,\s*\{\s*gitRunner: runEnclosingGit,\s*\}\)/u,
  );
  assert.match(
    lifecycleSource,
    /createCandidateGitContext\(\s*candidateCommit,\s*materialization\.root,\s*\{\s*sourceGitRunner: runEnclosingGit\s*\},\s*\)/u,
  );
  assert.match(
    lifecycleSource,
    /const ENCLOSING_GIT_ENVIRONMENT = Object\.freeze\(\{ \.\.\.process\.env \}\);/u,
  );
  assert.match(lifecycleSource, /spawnSync\(\s*RELEASE_GATE_TEST_HOOKS\.hostGitPath,/u);
});
test("materialized package closure rejects linked and hard-linked entries", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-r20-package-"));
  const packageRoot = join(root, "package");
  const external = join(root, "external");
  try {
    await mkdir(packageRoot);
    await mkdir(external);
    await writeFile(join(packageRoot, "manifest.json"), "{}\n");
    assert.equal((await RELEASE_REVIEW_TEST_HOOKS.listPackageFilesAtRoot(packageRoot)).length, 1);

    const linked = join(packageRoot, "linked");
    await symlink(external, linked, process.platform === "win32" ? "junction" : "dir");
    await assert.rejects(
      RELEASE_REVIEW_TEST_HOOKS.listPackageFilesAtRoot(packageRoot),
      /linked or not one file/u,
    );
    await rm(linked, { force: true });

    const source = join(external, "source.json");
    await writeFile(source, "{}\n");
    await link(source, join(packageRoot, "hardlink.json"));
    await assert.rejects(
      RELEASE_REVIEW_TEST_HOOKS.listPackageFilesAtRoot(packageRoot),
      /linked or not one file/u,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test("closed private state rejects source mutation and undeclared post-build files", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-r19-state-"));
  try {
    const sourceBytes = Buffer.from("export const value = 1;\n", "utf8");
    const source = candidateSourceFixture("src/value.js", sourceBytes);
    await mkdir(join(root, "src"));
    await writeFile(join(root, "src", "value.js"), sourceBytes);
    const materialized = await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosedPrivateState({
      candidateRoot: root,
      source,
    });
    assert.equal(materialized.candidateSource.digest, source.binding.digest);

    await writeFile(join(root, "rogue.js"), "throw new Error('executed');\n");
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosedPrivateState({
        candidateRoot: root,
        source,
      }),
      /undeclared state/u,
    );
    await rm(join(root, "rogue.js"));

    await writeFile(join(root, "src", "value.js"), "export const value = 2;\n");
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosedPrivateState({
        candidateRoot: root,
        source,
      }),
      /materialization changed/u,
    );
    await writeFile(join(root, "src", "value.js"), sourceBytes);

    await mkdir(join(root, "node_modules", "private-dependency"), {
      recursive: true,
    });
    await writeFile(join(root, "node_modules", "private-dependency", "package.json"), "{}\n");
    const installed = await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(
      join(root, "node_modules"),
      { label: "test installed closure", allowSymlinks: true },
    );
    await mkdir(join(root, "dist"));
    await writeFile(join(root, "dist", "index.js"), "export {};\n");
    const generatedClosure = await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(
      join(root, "dist"),
      {
        label: "test generated closure",
        allowSymlinks: false,
      },
    );
    const generated = { entrypoint: "dist/index.js", ...generatedClosure };
    await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosedPrivateState({
      candidateRoot: root,
      source,
      installed,
      generated,
    });

    await writeFile(join(root, "post-build-substitution.js"), "export {};\n");
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosedPrivateState({
        candidateRoot: root,
        source,
        installed,
        generated,
      }),
      /undeclared state/u,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("explicit cache and ancestor resolver boundaries fail closed", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-r19-resolver-")));
  const candidateRoot = join(root, "candidate");
  const cache = join(root, "cache");
  try {
    await mkdir(candidateRoot);
    await mkdir(cache);
    const repositoryAlias = join(root, "repository-alias");
    await symlink(ROOT, repositoryAlias, process.platform === "win32" ? "junction" : "dir");
    assert.throws(
      () => RELEASE_REVIEW_PARENT_TEST_HOOKS.requireRealpathDisjointRoots(ROOT, repositoryAlias),
      /realpaths must be disjoint/u,
    );
    RELEASE_REVIEW_PARENT_TEST_HOOKS.requireRealpathDisjointRoots(ROOT, root);
    assert.equal(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({
        SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE: cache,
      }),
      await realpath(cache),
    );
    for (const overlapping of [ROOT, join(ROOT, "scripts"), dirname(ROOT), repositoryAlias]) {
      assert.throws(
        () =>
          RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({
            SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE: overlapping,
          }),
        /realpaths must be disjoint/u,
      );
    }
    for (const unsafe of [
      String.fromCharCode(0xd800),
      join(root, "cache-\u0001"),
      join(root, "cache-\u061c"),
      join(root, "cache-e\u0301"),
    ]) {
      assert.throws(() =>
        RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({
          SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE: unsafe,
        }),
      );
    }
    const supplementaryCache = join(root, "cache-\u{1f600}");
    await mkdir(supplementaryCache);
    assert.equal(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({
        SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE: supplementaryCache,
      }),
      await realpath(supplementaryCache),
    );
    assert.throws(() => RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({}), /explicit absolute path/u);
    assert.throws(
      () =>
        RELEASE_REVIEW_PARENT_TEST_HOOKS.cachePath({
          SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE: "relative-cache",
        }),
      /explicit absolute path/u,
    );

    const parentSource = readFileSync(PARENT_ENTRYPOINT, "utf8");
    assert.ok(
      parentSource.indexOf("validateCacheLocation(cache, [ROOT, operationRoot]);") <
        parentSource.indexOf(
          "const npmConfiguration = await createPrivateNpmConfiguration(operationRoot, cache);",
        ) &&
        parentSource.indexOf("const npmConfiguration = await createPrivateNpmConfiguration") <
          parentSource.indexOf("const tools = await resolveHostTools(cache, npmConfiguration);"),
      "cache overlap must be rejected before private config creation and tool inspection",
    );

    await mkdir(join(root, "node_modules"));
    assert.throws(
      () => RELEASE_REVIEW_PARENT_TEST_HOOKS.requireNoAncestorNodeModules(candidateRoot),
      /fallback package supply/u,
    );
    await assert.rejects(
      RELEASE_REVIEW_TEST_HOOKS.requireNoRuntimeAncestorSupply(candidateRoot),
      /fallback package supply/u,
    );
    await rm(join(root, "node_modules"), { recursive: true });
    RELEASE_REVIEW_PARENT_TEST_HOOKS.requireNoAncestorNodeModules(candidateRoot);
    await RELEASE_REVIEW_TEST_HOOKS.requireNoRuntimeAncestorSupply(candidateRoot);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("stable reconstruction is package-defining while phase authority stays separate", () => {
  const parentSource = readFileSync(PARENT_ENTRYPOINT, "utf8");
  const harnessSource = readFileSync(HARNESS_ENTRYPOINT, "utf8");
  const verifierSource = readFileSync(VERIFIER_ENTRYPOINT, "utf8");
  const combined = `${parentSource}\n${harnessSource}\n${verifierSource}`;
  for (const pattern of [
    /"context\.runtime-binding"/u,
    /manifest\.runtimeBindingDigest === runtimeBindingDigest/u,
    /manifest\.stableReconstructionDigest === stableReconstructionDigest/u,
    /phaseMetadata\.stableReconstructionDigest ===/u,
    /compilationSummary\.stableReconstructionDigest ===/u,
    /approval\.phaseAuthorityDigest === approvalAuthority\.digest/u,
    /approvedBy: "external-host-declared-owner-pair"/u,
  ]) {
    assert.match(combined, pattern);
  }
  assert.doesNotMatch(combined, /externalInputsDigest|ReleaseReviewExternalInputs/u);

  const manifestStart = harnessSource.indexOf("  const candidateManifest = {");
  const manifestEnd = harnessSource.indexOf(
    "  await writeImmutableJson(paths.candidateManifest, candidateManifest);",
    manifestStart,
  );
  const candidateManifestSource = harnessSource.slice(manifestStart, manifestEnd);
  assert.match(candidateManifestSource, /stableReconstructionDigest/u);
  assert.doesNotMatch(candidateManifestSource, /phaseAuthority|ownerExpectation|handoffs/u);

  const compileStart = harnessSource.indexOf("async function compile()");
  const summaryStart = harnessSource.indexOf("  const summary = {", compileStart);
  const summaryEnd = harnessSource.indexOf(
    "  await writeImmutableJson(paths.compilationSummary, summary);",
    summaryStart,
  );
  const sharedCompileSource = harnessSource.slice(summaryStart, summaryEnd);
  assert.match(sharedCompileSource, /stableReconstructionDigest/u);
  assert.doesNotMatch(sharedCompileSource, /phaseAuthority|ownerExpectation|handoffs/u);

  const packageJson = JSON.parse(
    readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8"),
  );
  assert.equal(
    packageJson.scripts["release-review:v12"],
    "node scripts/run-v12-release-review.mjs",
  );
  assert.equal(
    packageJson.scripts["test:release-review:v12"],
    "node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs && npm run test:lifecycle",
  );
  for (const command of ["format", "format:check", "lint"]) {
    for (const path of ["scripts/run-v12-release-review.mjs", HARNESS_PATH, VERIFIER_PATH]) {
      assert.ok(packageJson.scripts[command].includes(path), `${command}: ${path}`);
    }
  }
});
const VOLATILE_RELEASE_STATE_PATTERN =
  /\bCandidates?\s+\d+\b|\b(?:remains? unconsumed|freeze ready|ready to freeze|current release candidate|next release gate)\b/iu;

test("active release status avoids volatile candidate-state drift and preserves outcomes", () => {
  const statusPaths = [
    "docs/specs/v12-ide-run-loop/spec.md",
    "docs/specs/v12-ide-run-loop/implementation-notes.md",
    "docs/specs/v12-ide-run-loop/test-plan.md",
    "docs/specs/v12-ide-run-loop/review.md",
    "docs/specs/v12-ide-run-loop/tasks.md",
    "docs/specs/v12-ide-run-loop/debug-notes.md",
    "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
    "docs/milestones/v12.md",
  ];

  for (const path of statusPaths) {
    assert.doesNotMatch(activeStatus(path), VOLATILE_RELEASE_STATE_PATTERN, path);
  }

  const testPlanStatus = activeStatus("docs/specs/v12-ide-run-loop/test-plan.md");
  assert.match(testPlanStatus, /Package and handoff verification authenticate artifacts/u);
  assert.match(testPlanStatus, /canonical gate failed.*permanently retired/u);
  assert.match(testPlanStatus, /exact registry\/SRI lock.*offline/u);
  assert.match(testPlanStatus, /binds install logs and the private closure/u);
  assert.match(testPlanStatus, /releaseReady: false/u);
});

test("live release routing delegates volatile state to candidate-addressed evidence", () => {
  const liveSections = [
    ["docs/memory/active-context.md", ["Current Focus", "Current Stage", "Next Likely Work"]],
    [
      "docs/milestones/v12.md",
      [
        "Current Stage",
        "Approval Gate",
        "Residual Risks",
        "Next Recommended Work",
        "User-Facing Overview",
      ],
    ],
    ["docs/specs/v12-ide-run-loop/review.md", ["Current Outcome"]],
    ["docs/specs/v12-ide-run-loop/tasks.md", ["Parallelization"]],
    ["docs/specs/v12-ide-run-loop/test-plan.md", ["Current Evidence"]],
  ];

  for (const [path, headings] of liveSections) {
    for (const heading of headings) {
      assert.doesNotMatch(
        activeSection(path, heading),
        VOLATILE_RELEASE_STATE_PATTERN,
        `${path} ${heading}`,
      );
    }
  }

  for (const [path, heading] of [
    ["docs/memory/active-context.md", "Current Stage"],
    ["docs/milestones/v12.md", "Status"],
    ["docs/specs/v12-ide-run-loop/review.md", "Current Outcome"],
  ]) {
    assert.match(
      activeSection(path, heading),
      /candidate-addressed external (?:evidence|receipts?)/iu,
      `${path} ${heading}`,
    );
  }
});

test("candidate-addressed run roots are closed, disjoint, and preserve Candidate 3 evidence", () => {
  const firstCandidate = "a".repeat(40);
  const secondCandidate = "b".repeat(40);
  const first = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(firstCandidate);
  const second = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(secondCandidate);

  assert.notEqual(first.root, second.root);
  assert.equal(first.root, `${REVIEW_ROOT}/runs/${firstCandidate}`);
  assert.equal(second.root, `${REVIEW_ROOT}/runs/${secondCandidate}`);
  for (const value of Object.values(first)) {
    assert.ok(value === first.root || value.startsWith(`${first.root}/`));
  }
  for (const value of Object.values(second)) {
    assert.ok(value === second.root || value.startsWith(`${second.root}/`));
  }

  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(APPROVED_CHECKPOINT);
  const retirement = candidateTree.file(`${REVIEW_ROOT}/candidate-3-retirement.md`).bytes;
  assert.equal(retirement.byteLength, 1920);
  assert.equal(
    digest(retirement),
    "sha256:d4f8c06ffe5cad4d11d288e226d1983e8bf557ec722afac29cf0d682cb64be6f",
  );
});

test("correction lineage requires revisions 1 through 10 and has no terminal count", () => {
  const throughTen = RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs(
    correctionPathsThrough(10),
  );
  assert.deepEqual(
    throughTen.map((entry) => entry.goalRevision),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
  assert.equal(throughTen[8].root, R9_ROOT);
  assert.equal(throughTen[9].root, `${CORRECTION_ROOT}-r10`);

  const throughEleven = RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs([
    ...correctionPathsThrough(11),
    `${CORRECTION_ROOT}-r23/attempt-history.md`,
    `${CORRECTION_ROOT}-r29/inputs/diagnosis.md`,
    `${CORRECTION_ROOT}-r38/implementation-notes.md`,
  ]);
  assert.equal(throughEleven.at(-1).goalRevision, 11);

  assert.throws(
    () => RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs(correctionPathsThrough(9)),
    /stops before required revision 10/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs(correctionPathsThrough(10, [5])),
    /missing revision 5/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs([
        ...correctionPathsThrough(10),
        `${CORRECTION_ROOT}-r11/approval.json`,
      ]),
    /revision 11 has an incomplete package marker set/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs([
        ...correctionPathsThrough(10),
        `${CORRECTION_ROOT}-rten/approval.json`,
      ]),
    /Malformed correction revision directory/u,
  );
});

test("working-tree-only inputs and unsafe handoff paths fail closed", () => {
  const candidate = "c".repeat(40);
  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(candidate);
  const gatePaths = RELEASE_REVIEW_TEST_HOOKS.gateEvidencePaths(candidate);

  RELEASE_REVIEW_TEST_HOOKS.requireNoWorkingTreeOnlySources(runPaths, gatePaths, [
    runPaths.request,
    `${runPaths.handoffs}/agent.json`,
    ...Object.values(gatePaths),
  ]);
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.requireNoWorkingTreeOnlySources(runPaths, gatePaths, [
        "test/working-tree-only-source.test.mjs",
      ]),
    /Working-tree-only source is outside the candidate run root/u,
  );
  assert.throws(
    () =>
      RELEASE_REVIEW_TEST_HOOKS.requireNoWorkingTreeOnlySources(runPaths, gatePaths, [
        `${gatePaths.receipt}.substituted`,
      ]),
    /Working-tree-only source is outside the candidate run root/u,
  );

  assert.deepEqual(
    RELEASE_REVIEW_HANDOFF_TEST_HOOKS.safeHandoffPath("handoffs/agent.json", runPaths),
    {
      file: "agent.json",
      path: `${runPaths.handoffs}/agent.json`,
      alias: "handoffs/agent.json",
    },
  );
  for (const unsafe of [
    "../agent.json",
    "handoffs/../agent.json",
    "handoffs/nested/agent.json",
    "handoffs\\agent.json",
    "handoffs/agent.txt",
    "handoffs/evil\n.json",
  ]) {
    assert.throws(() => RELEASE_REVIEW_HANDOFF_TEST_HOOKS.safeHandoffPath(unsafe, runPaths));
  }
});

test("review package covers every transitive release-security source exactly once", () => {
  const revision = spawnSync("git", ["rev-parse", "--verify", "HEAD^{commit}"], {
    cwd: ROOT,
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(revision.signal, null, revision.stderr);
  assert.equal(revision.status, 0, revision.stderr);
  const candidate = revision.stdout.trim();
  assert.match(candidate, /^[0-9a-f]{40}$/u);

  const sources = RELEASE_REVIEW_TEST_HOOKS.collectSourceSpecs(
    RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(candidate),
  );
  for (const expected of REQUIRED_SECURITY_REVIEW_SOURCES) {
    const matches = sources.filter((entry) => entry.path === expected.path);
    assert.equal(matches.length, 1, `${expected.path} must appear exactly once`);
    assert.deepEqual(
      matches[0].allowedWorkUnits,
      expected.allowedWorkUnits,
      `${expected.path} review ownership`,
    );
  }
});

test("release-review receipt consumer requires bound v1alpha4 execution authority", () => {
  const validator = RELEASE_REVIEW_TEST_HOOKS.validateGateReceipt.toString();
  assert.match(validator, /receipt\.apiVersion === "swecircuit\/release-gate\/v1alpha4"/u);
  assert.match(validator, /"executionAuthority"/u);
  assert.match(
    validator,
    /validateExecutionAuthority\(receipt\.executionAuthority, receipt\.command, candidateTree\)/u,
  );

  const harness = readFileSync(HARNESS_ENTRYPOINT, "utf8");
  assert.match(harness, /value\.environment\.policy\.nodeOptions === "absent"/u);
  assert.match(harness, /const independentRuntime = releaseReviewRuntimeIdentity\(\);/u);
  assert.match(
    harness,
    /expectedCandidateLockReceipt\(\s*candidateTree,\s*runtime\.platform,\s*runtime\.architecture,\s*runtime\.libc,/u,
  );
  assert.doesNotMatch(
    harness,
    /expectedCandidateLockReceipt\(\s*candidateTree,\s*value\.lock\.platform/u,
  );
  assert.match(harness, /value\.environment\.policy\.nodePath === "absent"/u);
  assert.match(harness, /value\.environment\.policy\.npmNetwork === "offline"/u);
  assert.match(
    harness,
    /JSON\.stringify\(value\.toolchain\.before\) === JSON\.stringify\(value\.toolchain\.after\)/u,
  );
  assert.match(harness, /value\.typeScriptEntrypoint === expectedTypeScriptEntrypoint/u);
  assert.match(harness, /value\.ancestorSupply\.before/u);
  assert.match(harness, /runtime\.libc/u);
  assert.match(harness, /candidate-private-exact-lock-offline-npm-ci/u);
  assert.match(
    harness,
    /Canonical-gate runtime differs from the independent same-host review runtime/u,
  );
  assert.match(harness, /expectedCandidateLockReceipt/u);
  assert.match(harness, /validateInlineBytesBinding/u);
  assert.match(harness, /value\.result\.attempted === true/u);
  assert.match(harness, /authenticatedInstallCommand/u);
  assert.match(harness, /npmLauncher\.commandPath/u);
  assert.match(harness, /realpathSync\.native\(value\.commandPath\)/u);
  assert.match(harness, /receipt\.operationError === null/u);
  assert.match(harness, /value\.cleanup\.absentAfter === true/u);
  assert.match(harness, /assertExactStringArray\(Object\.keys\(effective\), expectedKeys/u);
});

test("post-commit gate evidence is captured outside the candidate without self-reference", () => {
  const candidate = "e".repeat(40);
  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(candidate);
  const original = RELEASE_REVIEW_TEST_HOOKS.gateEvidencePaths(candidate);
  const captured = RELEASE_REVIEW_TEST_HOOKS.capturedGateEvidencePaths(runPaths);
  assert.deepEqual(captured, {
    receipt: runPaths.gateReceiptSnapshot,
    stdout: runPaths.gateStdoutSnapshot,
    stderr: runPaths.gateStderrSnapshot,
  });

  const gate = {
    paths: original,
    receiptBytes: Buffer.from('{"outcome":"pass"}\n', "utf8"),
    stdoutBytes: Buffer.from("verified\n", "utf8"),
    stderrBytes: Buffer.alloc(0),
  };
  const bindings = RELEASE_REVIEW_TEST_HOOKS.gateEvidenceBindings(gate, runPaths);
  assert.deepEqual(bindings.receipt, {
    originalPath: original.receipt,
    snapshotPath: captured.receipt,
    mediaType: "application/json",
    bytes: gate.receiptBytes.byteLength,
    digest: digest(gate.receiptBytes),
  });
  assert.deepEqual(bindings.stdout, {
    originalPath: original.stdout,
    snapshotPath: captured.stdout,
    mediaType: "text/plain; charset=utf-8",
    bytes: gate.stdoutBytes.byteLength,
    digest: digest(gate.stdoutBytes),
  });
  assert.deepEqual(bindings.stderr, {
    originalPath: original.stderr,
    snapshotPath: captured.stderr,
    mediaType: "text/plain; charset=utf-8",
    bytes: 0,
    digest: digest(gate.stderrBytes),
  });
  assert.notEqual(bindings.receipt.originalPath, bindings.receipt.snapshotPath);
  assert.match(
    RELEASE_REVIEW_TEST_HOOKS.validateGateReceipt.toString(),
    /!candidateTree\.has\(path\)/u,
  );
});

test("reviewer snapshots and tooling identity use exact candidate Git blobs", () => {
  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(APPROVED_CHECKPOINT);
  for (const path of [HARNESS_PATH, VERIFIER_PATH]) {
    const bytes = candidateTree.file(path).bytes;
    const binding = RELEASE_REVIEW_TEST_HOOKS.authenticateToolBytes(
      candidateTree,
      path,
      bytes,
      path,
    );
    assert.equal(binding.bytes, bytes.byteLength);
    assert.equal(binding.digest, digest(bytes));
    assert.equal(binding.objectId, candidateTree.file(path).objectId);
    assert.throws(() =>
      RELEASE_REVIEW_TEST_HOOKS.authenticateToolBytes(
        candidateTree,
        path,
        Buffer.concat([bytes, Buffer.from("\n")]),
        path,
      ),
    );
  }

  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths("d".repeat(40));
  const packageBytes = candidateTree.file("package.json").bytes;
  const materialization = RELEASE_REVIEW_TEST_HOOKS.reviewedSourceMaterialization(
    {
      id: "context.package",
      path: "package.json",
      description: "Candidate package metadata.",
      allowedWorkUnits: ["review.r2.product-api-ide"],
      snapshotPath: null,
    },
    candidateTree,
    runPaths,
  );
  assert.ok(materialization.bytes.equals(packageBytes));
  assert.equal(materialization.row.snapshotPath, `${runPaths.snapshotRoot}/package.json`);
  assert.equal(materialization.row.bytes, packageBytes.byteLength);
  assert.equal(materialization.row.digest, digest(packageBytes));
  assert.equal(materialization.row.candidateObjectId, candidateTree.file("package.json").objectId);
});

test("revision 9 package and handoff verification rejects substituted bytes", async () => {
  RELEASE_REVIEW_TEST_HOOKS.installSpecialistRuntimeForTests(await import("../dist/index.js"));
  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(APPROVED_CHECKPOINT);
  const spec = correctionSpec(9);
  const verified = await RELEASE_REVIEW_TEST_HOOKS.verifyEvidenceSet(candidateTree, spec);
  assert.equal(verified.goalRevision, 9);
  assert.equal(verified.complete, true);
  assert.equal(verified.ready, true);
  assert.equal(verified.rawHandoffs.length, 1);
  assert.equal(
    verified.rawHandoffs[0].digest,
    "sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956",
  );

  const packagePath = `${R9_ROOT}/package-envelope.json`;
  const substitutedPackageTree = RELEASE_REVIEW_TEST_HOOKS.candidateTreeWithOverrides(
    candidateTree,
    {
      [packagePath]: Buffer.concat([candidateTree.file(packagePath).bytes, Buffer.from("\n")]),
    },
  );
  await assert.rejects(RELEASE_REVIEW_TEST_HOOKS.verifyEvidenceSet(substitutedPackageTree, spec));

  const handoffPath =
    R9_ROOT +
    "/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json";
  const substitutedHandoff = JSON.parse(candidateTree.file(handoffPath).bytes.toString("utf8"));
  substitutedHandoff.summary += " substituted";
  const substitutedHandoffTree = RELEASE_REVIEW_TEST_HOOKS.candidateTreeWithOverrides(
    candidateTree,
    {
      [handoffPath]: Buffer.from(`${JSON.stringify(substitutedHandoff, null, 2)}\n`, "utf8"),
    },
  );
  await assert.rejects(RELEASE_REVIEW_TEST_HOOKS.verifyEvidenceSet(substitutedHandoffTree, spec));
});
