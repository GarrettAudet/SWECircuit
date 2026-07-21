import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  access,
  link,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  rmdir,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { compileAgentBlueprints } from "../dist/index.js";
import { RELEASE_REVIEW_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_GATE_TEST_HOOKS } from "../scripts/run-v12-release-gate.mjs";
import { RELEASE_REVIEW_PARENT_TEST_HOOKS } from "../scripts/run-v12-release-review.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const RELEASE_GATE_PATH = join(ROOT, "scripts/run-v12-release-gate.mjs");
const PACKED_CONSUMER_PATH = join(ROOT, "scripts/check-packed-consumer.mjs");
const REVIEW_HARNESS_PATH = join(
  ROOT,
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
);
const RELEASE_REVIEW_LIFECYCLE_PATH = join(ROOT, "test/helpers/v12-release-review-lifecycle.mjs");
const releaseReviewLifecycleSource = await readFile(RELEASE_REVIEW_LIFECYCLE_PATH, "utf8");
const RELEASE_REVIEW_PARENT_PATH = join(ROOT, "scripts/run-v12-release-review.mjs");
const releaseGateSource = await readFile(RELEASE_GATE_PATH, "utf8");
const packedConsumerSource = await readFile(PACKED_CONSUMER_PATH, "utf8");
const reviewHarnessSource = await readFile(REVIEW_HARNESS_PATH, "utf8");
const releaseReviewParentSource = await readFile(RELEASE_REVIEW_PARENT_PATH, "utf8");

function runGit(args) {
  const result = spawnSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function runNode(args) {
  return spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
}

function escapedPattern(value) {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

async function createPrivateNpmFixture() {
  const operationRoot = await realpath(await mkdtemp(join(resolve(tmpdir()), "swr2-config-test-")));
  const cacheRoot = await realpath(
    await mkdtemp(join(resolve(tmpdir()), "swecircuit-r22-config-cache-")),
  );
  const configuration = await RELEASE_REVIEW_PARENT_TEST_HOOKS.createPrivateNpmConfiguration(
    operationRoot,
    cacheRoot,
  );
  const tools = {
    node: { path: process.execPath },
    git: { path: process.execPath },
  };
  return { operationRoot, cacheRoot, configuration, tools };
}

async function cleanupPrivateNpmFixture(fixture) {
  await RELEASE_REVIEW_PARENT_TEST_HOOKS.removeOperationRoot(fixture.operationRoot);
  await rm(fixture.cacheRoot, { recursive: true, force: true });
}

test("host TypeScript entrypoint supply is singular, plain, absolute, and external", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-entrypoint-"));
  const candidateRoot = join(root, "candidate");
  const hostRoot = join(root, "host");
  const hostEntrypoint = join(hostRoot, "tsc.mjs");
  const candidateEntrypoint = join(candidateRoot, "tsc.mjs");
  const symbolicEntrypoint = join(root, "typescript-link");
  const environmentKey = RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey;
  const resolveSupply = (environment, defaultEntrypoint = hostEntrypoint) =>
    RELEASE_GATE_TEST_HOOKS.resolveHostTypeScriptEntrypoint(
      environment,
      candidateRoot,
      defaultEntrypoint,
    );

  try {
    await mkdir(candidateRoot);
    await mkdir(hostRoot);
    await writeFile(hostEntrypoint, "export {};\n", "utf8");
    await writeFile(candidateEntrypoint, "export {};\n", "utf8");
    await symlink(
      process.platform === "win32" ? hostRoot : hostEntrypoint,
      symbolicEntrypoint,
      process.platform === "win32" ? "junction" : "file",
    );

    const defaultEntrypoint = resolveSupply({});
    assert.equal(defaultEntrypoint, await realpath(hostEntrypoint));
    assert.equal(isAbsolute(defaultEntrypoint), true);
    const defaultFromCandidate = relative(candidateRoot, defaultEntrypoint);
    assert.equal(
      isAbsolute(defaultFromCandidate) ||
        defaultFromCandidate === ".." ||
        defaultFromCandidate.startsWith("../") ||
        defaultFromCandidate.startsWith("..\\"),
      true,
    );

    assert.throws(() => resolveSupply({}, "relative/tsc.mjs"), /absolute/u);
    assert.throws(() => resolveSupply({}, symbolicEntrypoint), /symbolic link/u);
    assert.throws(() => resolveSupply({}, candidateEntrypoint), /outside/u);

    assert.equal(
      resolveSupply({ [environmentKey.toLowerCase()]: hostEntrypoint }),
      await realpath(hostEntrypoint),
    );
    assert.throws(
      () =>
        resolveSupply({
          [environmentKey]: hostEntrypoint,
          [environmentKey.toLowerCase()]: hostEntrypoint,
        }),
      /at most once/u,
    );
    assert.throws(() => resolveSupply({ [environmentKey]: "" }), /non-empty/u);
    assert.throws(() => resolveSupply({ [environmentKey]: "relative/tsc.mjs" }), /absolute/u);
    assert.throws(() => resolveSupply({ [environmentKey]: join(hostRoot, "missing.mjs") }), {
      code: "ENOENT",
    });
    assert.throws(() => resolveSupply({ [environmentKey]: hostRoot }), /plain regular file/u);
    assert.throws(() => resolveSupply({ [environmentKey]: symbolicEntrypoint }), /symbolic link/u);
    assert.throws(
      () => resolveSupply({ [environmentKey]: candidateEntrypoint }),
      /outside the candidate materialization/u,
    );
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test("packed consumer validates and uses the TypeScript entrypoint supply", () => {
  assert.match(packedConsumerSource, /supplies\.length <= 1/u);
  assert.match(packedConsumerSource, /const stats = lstatSync\(path\);/u);
  assert.match(packedConsumerSource, /stats\.isSymbolicLink\(\)/u);
  assert.match(packedConsumerSource, /stats\.isFile\(\)/u);
  assert.match(packedConsumerSource, /isOutsideRoot\(ROOT, entrypoint\)/u);
  assert.match(
    packedConsumerSource,
    /const TYPESCRIPT_ENTRYPOINT = resolveTypeScriptEntrypoint\(process\.env\);/u,
  );

  const compilationStart = packedConsumerSource.indexOf(
    `  run(\n    process.execPath,\n    [\n      TYPESCRIPT_ENTRYPOINT,`,
  );
  const compilationEnd = packedConsumerSource.indexOf("  const typedHostOutput", compilationStart);
  assert.notEqual(compilationStart, -1);
  assert.ok(compilationEnd > compilationStart);
  const compilationSource = packedConsumerSource.slice(compilationStart, compilationEnd);
  assert.match(compilationSource, /\[\s*TYPESCRIPT_ENTRYPOINT,\s*"--ignoreConfig"/u);
  assert.doesNotMatch(
    compilationSource,
    /join\(ROOT, "node_modules", "typescript", "bin", "tsc"\)/u,
  );
});

test("candidate materialization excludes and detects uncommitted verification inputs", async () => {
  const candidateCommit = runGit(["rev-parse", "--verify", "HEAD"]);
  const candidateTree = runGit(["rev-parse", "--verify", `${candidateCommit}^{tree}`]);
  const materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit);

  try {
    assert.equal(materialization.source.commit, candidateCommit);
    assert.equal(materialization.source.tree, candidateTree);
    assert.ok(materialization.source.files > 0);
    assert.ok(materialization.source.bytes > 0);

    const injectedPath = join(
      materialization.root,
      "test",
      "untracked-release-gate-injection.test.mjs",
    );
    await writeFile(injectedPath, 'throw new Error("untracked input executed");\n', "utf8");
    await assert.rejects(
      RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
        materialization.root,
        materialization.entries,
      ),
      /outside the committed Git tree/u,
    );
    await rm(injectedPath);

    const exact = await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
      materialization.root,
      materialization.entries,
    );
    assert.equal(exact.digest, materialization.source.digest);

    const packagePath = join(materialization.root, "package.json");
    const packageBytes = await readFile(packagePath);
    await writeFile(packagePath, Buffer.concat([packageBytes, Buffer.from("\n")]));
    const changed = await RELEASE_GATE_TEST_HOOKS.inspectMaterialization(
      materialization.root,
      materialization.entries,
    );
    assert.notEqual(changed.digest, materialization.source.digest);

    await writeFile(packagePath, packageBytes);
    const restored = await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
      materialization.root,
      materialization.entries,
    );
    assert.equal(restored.digest, materialization.source.digest);

    const generated = join(materialization.root, "dist");
    await mkdir(generated);
    await writeFile(join(generated, "index.js"), "generated output\n", "utf8");
    assert.equal(
      await RELEASE_GATE_TEST_HOOKS.removeGeneratedBuildOutput(
        materialization.root,
        materialization.entries,
      ),
      true,
    );
    assert.equal(await pathExists(generated), false);

    const undeclared = join(materialization.root, ".local");
    await mkdir(undeclared);
    await assert.rejects(
      RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
        materialization.root,
        materialization.entries,
      ),
      /unexpected directory: \.local/u,
    );
    await rmdir(undeclared);
  } finally {
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
  }
});

test("candidate Git context is disposable, exact, and usable from the materialization", async () => {
  const candidateCommit = runGit(["rev-parse", "--verify", "HEAD"]);
  const liveGitDirectory = runGit(["rev-parse", "--path-format=absolute", "--git-dir"]);
  const liveHeadBefore = runGit(["rev-parse", "--verify", "HEAD"]);
  const materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit);
  let gitContext;

  try {
    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      materialization.root,
    );
    assert.notEqual(resolve(gitContext.root), resolve(liveGitDirectory));
    assert.equal(dirname(gitContext.root), join(ROOT, ".local", "v12-release-gate"));
    assert.deepEqual(RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext), {
      head: candidateCommit,
      trackedState: "clean",
    });

    const environment = RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext);
    const childHead = spawnSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: materialization.root,
      encoding: "utf8",
      env: environment,
      windowsHide: true,
    });
    assert.equal(childHead.status, 0, childHead.stderr);
    assert.equal(childHead.stdout.trim(), candidateCommit);
    assert.equal(environment.GIT_DIR, gitContext.root);
    assert.equal(environment.GIT_WORK_TREE, materialization.root);
    assert.equal(environment.npm_config_cache, RELEASE_GATE_TEST_HOOKS.hostNpmCache);
    assert.equal(isAbsolute(environment.npm_config_cache), true);
    const cacheFromMaterialization = relative(materialization.root, environment.npm_config_cache);
    assert.equal(
      cacheFromMaterialization === ".." ||
        cacheFromMaterialization.startsWith("../") ||
        cacheFromMaterialization.startsWith("..\\"),
      true,
    );
    const typeScriptKey = RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey;
    assert.deepEqual(
      Object.keys(environment).filter((key) => key.toLowerCase() === typeScriptKey.toLowerCase()),
      [typeScriptKey],
    );
    assert.equal(isAbsolute(environment[typeScriptKey]), true);
    const typeScriptFromMaterialization = relative(
      materialization.root,
      environment[typeScriptKey],
    );
    assert.equal(
      isAbsolute(typeScriptFromMaterialization) ||
        typeScriptFromMaterialization === ".." ||
        typeScriptFromMaterialization.startsWith("../") ||
        typeScriptFromMaterialization.startsWith("..\\"),
      true,
    );
    assert.notEqual(resolve(environment.GIT_DIR), resolve(liveGitDirectory));
    assert.equal(runGit(["rev-parse", "--verify", "HEAD"]), liveHeadBefore);
  } finally {
    if (gitContext !== undefined) {
      await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
    }
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
  }
});

test("candidate scratch cleanup supports reverse owner order", async () => {
  const parent = RELEASE_GATE_TEST_HOOKS.materializationParent;
  await mkdir(parent, { recursive: true });
  const materializationRoot = await mkdtemp(join(parent, "candidate-"));
  const gitRoot = await mkdtemp(join(parent, "git-"));

  try {
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materializationRoot);
    assert.equal(await pathExists(materializationRoot), false);
    assert.equal(await pathExists(gitRoot), true);
    await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitRoot);
    assert.equal(await pathExists(gitRoot), false);
  } finally {
    if (await pathExists(materializationRoot)) {
      await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materializationRoot);
    }
    if (await pathExists(gitRoot)) {
      await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitRoot);
    }
  }
});

test("empty-directory pruning preserves unrelated state", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-empty-prune-"));
  const empty = join(root, "empty");
  const shared = join(root, "shared");
  const sentinel = join(shared, "sentinel.txt");
  try {
    await mkdir(empty);
    await RELEASE_GATE_TEST_HOOKS.pruneEmptyDirectory(empty);
    assert.equal(await pathExists(empty), false);

    await mkdir(shared);
    await writeFile(sentinel, "preserve\n", "utf8");
    await RELEASE_GATE_TEST_HOOKS.pruneEmptyDirectory(shared);
    assert.equal(await readFile(sentinel, "utf8"), "preserve\n");
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test("canonical command is pinned to the authenticated materialization", () => {
  const mainSource = releaseGateSource.slice(releaseGateSource.indexOf("async function main()"));
  assert.match(
    mainSource,
    /const materialization = await materializeCandidateSource\(candidateCommit\);/u,
  );
  assert.match(
    mainSource,
    /gitContext = await createCandidateGitContext\(candidateCommit, materialization\.root\);/u,
  );
  assert.match(
    mainSource,
    /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: materialization\.root,[\s\S]*?env: commandEnvironment\(gitContext\),/u,
  );
  assert.doesNotMatch(mainSource, /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: ROOT,/u);
  assert.match(mainSource, /removeGeneratedBuildOutput\(materialization\.root/u);
  assert.match(mainSource, /inspectExactMaterialization\(materialization\.root/u);
  assert.match(mainSource, /strategy: GIT_CONTEXT_STRATEGY/u);
  assert.match(mainSource, /await removeCandidateGitContext\(gitContext\.root\);/u);
  assert.match(mainSource, /materializationDigestAfter === materialization\.source\.digest/u);
  assert.match(mainSource, /cleanupError: materializationCleanupError/u);
});

test("R2 closes the stronger receipt and all six causal security sources", () => {
  assert.match(
    reviewHarnessSource,
    /const expectedCandidateSource = candidateSourceBinding\(candidate\);/u,
  );
  assert.match(
    reviewHarnessSource,
    /receipt\.materialization\.strategy === "exact-git-blob-materialization"/u,
  );
  assert.match(
    reviewHarnessSource,
    /receipt\.materialization\.digestAfter === expectedCandidateSource\.digest/u,
  );
  assert.match(reviewHarnessSource, /receipt\.gitContext\.strategy ===/u);
  assert.match(reviewHarnessSource, /for \(const path of REQUIRED_SECURITY_CAUSAL_SOURCES\)/u);

  const requiredCausalSecuritySources = [
    ".gitattributes",
    ".gitignore",
    "src/specialist-handoff-schema-data.ts",
    "src/specialist-handoff-schema.ts",
    "src/specialist-schema-data.ts",
    "src/specialist-schema.ts",
  ];
  for (const path of requiredCausalSecuritySources) {
    const occurrences = reviewHarnessSource.match(new RegExp(escapedPattern(`"${path}"`), "gu"));
    assert.ok(
      occurrences && occurrences.length >= 2,
      `R2 does not both snapshot and require ${path} for security review.`,
    );
  }
});

test("R2 correction review context remains bounded with primary evidence", async () => {
  const candidate = "0482bf3783e085c6cef3111d63003daa5197eca8";
  const failedRequestPath = join(
    ROOT,
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs",
    candidate,
    "request.json",
  );
  const failedRequest = JSON.parse(await readFile(failedRequestPath, "utf8"));
  const originalContexts = failedRequest.goal.contextSources;
  const originalAuthorityScopes = failedRequest.goal.authority.permissionCeiling.find(
    (permission) => permission.kind === "filesystem.read",
  ).scopes;
  assert.equal(originalContexts.length, 261);
  assert.equal(originalAuthorityScopes.length, 261);

  const originalPathMarker = " Original candidate path: ";
  const contextsByOriginalPath = new Map();
  const directContexts = [];
  for (const context of originalContexts) {
    const marker = context.description.lastIndexOf(originalPathMarker);
    if (marker === -1) {
      directContexts.push(context);
      continue;
    }
    const originalPath = context.description.slice(marker + originalPathMarker.length);
    assert.equal(contextsByOriginalPath.has(originalPath), false);
    contextsByOriginalPath.set(originalPath, context);
  }
  assert.equal(contextsByOriginalPath.size, 257);
  assert.deepEqual(directContexts.map((context) => context.id).sort(), [
    "context.candidate-manifest",
    "context.canonical-gate-receipt",
    "context.canonical-gate-stderr",
    "context.canonical-gate-stdout",
  ]);

  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(candidate);
  const selectedSources = RELEASE_REVIEW_TEST_HOOKS.collectSourceSpecs(candidateTree);
  const selectedPaths = selectedSources.map((source) => source.path);
  const selectedPathSet = new Set(selectedPaths);
  const removedPaths = [...contextsByOriginalPath.keys()].filter(
    (path) => !selectedPathSet.has(path),
  );
  assert.equal(removedPaths.length, 94);
  assert.equal(selectedSources.length, 163);
  assert.deepEqual(
    selectedPaths,
    [...contextsByOriginalPath.keys()]
      .filter((path) => !RELEASE_REVIEW_TEST_HOOKS.isCorrectionNavigationDuplicate(path))
      .sort(),
  );
  for (const path of removedPaths) {
    assert.equal(RELEASE_REVIEW_TEST_HOOKS.isCorrectionNavigationDuplicate(path), true);
    assert.match(
      path,
      /^docs\/specs\/v12-ide-run-loop\/evidence\/implementation\/release-correction(?:-r[1-9][0-9]*)?\/(?:inputs\/|(?:compilation-summary|phase-metadata|request)\.json$)/u,
    );
  }
  assert.equal(
    RELEASE_REVIEW_TEST_HOOKS.isCorrectionNavigationDuplicate(
      "docs/specs/v12-ide-run-loop/inputs/request.json",
    ),
    false,
  );

  const correctionSpecs = RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs(candidateTree);
  assert.equal(correctionSpecs.length, 14);
  for (const correction of correctionSpecs) {
    for (const path of [
      `${correction.root}/package-envelope.json`,
      `${correction.root}/approval.json`,
      `${correction.root}/handoff-verification.json`,
    ]) {
      assert.equal(selectedPathSet.has(path), true, `missing primary evidence: ${path}`);
    }
    assert.equal(
      selectedPaths.some((path) => path.startsWith(`${correction.root}/handoffs/`)),
      true,
      `missing raw correction handoff: ${correction.root}`,
    );
  }
  const correctionReplans = candidateTree.paths.filter(
    (path) =>
      path.startsWith("docs/specs/v12-ide-run-loop/evidence/implementation/release-correction") &&
      path.endsWith("/replan.json"),
  );
  assert.ok(correctionReplans.length > 0);
  for (const path of correctionReplans) {
    assert.equal(selectedPathSet.has(path), true, `missing correction replan: ${path}`);
  }
  for (const path of [
    ".gitattributes",
    ".gitignore",
    "src/specialist-handoff-schema-data.ts",
    "src/specialist-handoff-schema.ts",
    "src/specialist-schema-data.ts",
    "src/specialist-schema.ts",
  ]) {
    assert.equal(selectedPathSet.has(path), true, `missing security-causal source: ${path}`);
  }

  const boundedContexts = [
    ...selectedSources.map((source) => contextsByOriginalPath.get(source.path)),
    ...directContexts,
  ].sort((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0));
  assert.equal(boundedContexts.every(Boolean), true);
  assert.equal(boundedContexts.length, 167);
  const boundedRequest = RELEASE_REVIEW_TEST_HOOKS.requestFor(boundedContexts, candidate);
  assert.equal(boundedRequest.goal.contextSources.length <= 256, true);
  assert.equal(boundedRequest.goal.workUnits.length, 3);
  for (const permission of boundedRequest.goal.authority.permissionCeiling) {
    if (permission.kind === "filesystem.read") {
      assert.equal(permission.scopes.length, 167);
      assert.equal(permission.scopes.length <= 256, true);
    }
  }
  for (const workUnit of boundedRequest.goal.workUnits) {
    assert.equal(workUnit.contextUses.length <= 256, true);
    assert.equal(workUnit.scope.read.length <= 256, true);
    const readPermission = workUnit.permissions.find(
      (permission) => permission.kind === "filesystem.read",
    );
    assert.ok(readPermission);
    assert.equal(readPermission.scopes.length <= 256, true);
  }

  const compilation = compileAgentBlueprints(boundedRequest);
  assert.equal(compilation.ok, true, JSON.stringify(compilation.diagnostics));
  assert.notEqual(compilation.value, null);
  assert.equal(compilation.value.blueprints.length, 3);
});

test("paths mode remains closed and rejects malformed candidate identities", () => {
  const candidate = "0123456789abcdef0123456789abcdef01234567";
  const valid = runNode([RELEASE_GATE_PATH, "paths", candidate]);
  assert.equal(valid.status, 0, valid.stderr);
  assert.deepEqual(JSON.parse(valid.stdout), {
    candidateCommit: candidate,
    receipt: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate-receipt.json`,
    stdout: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate.stdout.log`,
    stderr: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate.stderr.log`,
  });

  const malformed = runNode([RELEASE_GATE_PATH, "paths", "A".repeat(40)]);
  assert.equal(malformed.status, 1);
  assert.equal(
    malformed.stderr,
    "Usage: node scripts/run-v12-release-gate.mjs [paths] <exact-40-character-candidate-commit>\n",
  );
});

test("release-review parent rejects unsafe paths and non-exact lock supply", async () => {
  const safe = RELEASE_REVIEW_PARENT_TEST_HOOKS.safeTreePath(Buffer.from("src/index.ts", "utf8"));
  assert.equal(safe.path, "src/index.ts");
  assert.equal(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.safeTreePath(Buffer.from("Src/Index.ts", "utf8")).alias,
    safe.alias,
  );
  assert.equal(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.safeTreePath(
      Buffer.from("src/supplementary-\u{1f600}.ts", "utf8"),
    ).path,
    "src/supplementary-\u{1f600}.ts",
  );
  for (const path of [
    "../escape",
    ".git/config",
    "src\\escape.ts",
    "src/a:b.ts",
    "src/trailing.",
    "src/trailing ",
    "CON",
    "src/LPT1.txt",
    "src/control\n.ts",
    "src/control-\u007f.ts",
    "src/control-\u0085.ts",
    "src/control-\u061c.ts",
    "src/control-\u200e.ts",
    "src/control-\u200f.ts",
    "src/control-\u202a.ts",
    "src/control-\u202e.ts",
    "src/control-\u2066.ts",
    "src/control-\u2069.ts",
    "src/non-nfc-e\u0301.ts",
  ]) {
    assert.throws(() => RELEASE_REVIEW_PARENT_TEST_HOOKS.safeTreePath(Buffer.from(path, "utf8")));
  }
  for (const surrogateBytes of [Buffer.from([0xed, 0xa0, 0x80]), Buffer.from([0xed, 0xb0, 0x80])]) {
    assert.throws(
      () => RELEASE_REVIEW_PARENT_TEST_HOOKS.safeTreePath(surrogateBytes),
      /strict UTF-8/u,
    );
  }
  assert.match(releaseReviewParentSource, /aliases\.has\(safe\.alias\)/u);
  assert.match(releaseReviewParentSource, /Candidate tree must contain only regular files/u);

  const lockBytes = await readFile(join(ROOT, "package-lock.json"));
  const validated = RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(lockBytes);
  assert.ok(validated.packages > 0);
  const lock = JSON.parse(lockBytes.toString("utf8"));
  const packagePath = Object.keys(lock.packages).find((path) => path !== "");
  assert.ok(packagePath);

  const missingIntegrity = JSON.parse(JSON.stringify(lock));
  delete missingIntegrity.packages[packagePath].integrity;
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(
        Buffer.from(JSON.stringify(missingIntegrity), "utf8"),
      ),
    /valid SRI/u,
  );

  const localSupply = JSON.parse(JSON.stringify(lock));
  localSupply.packages[packagePath].resolved = "file:../substitution";
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(
        Buffer.from(JSON.stringify(localSupply), "utf8"),
      ),
    /non-registry supply/u,
  );

  const emptySupply = JSON.parse(JSON.stringify(lock));
  emptySupply.packages = { "": emptySupply.packages[""] };
  assert.throws(
    () =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(
        Buffer.from(JSON.stringify(emptySupply), "utf8"),
      ),
    /no installed package supply/u,
  );
});

test("release-review parent detects closure mutation and promotes immutable bytes", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-r18-parent-"));
  const closureRoot = join(root, "closure");
  const promotionRoot = join(root, "promotion");
  const linkClosure = join(root, "link-closure");
  const externalTarget = join(root, "external-target");

  try {
    await mkdir(closureRoot);
    await mkdir(promotionRoot);
    const source = join(closureRoot, "runtime.js");
    await writeFile(source, "export const value = 1;\n", "utf8");
    const before = await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(closureRoot, {
      label: "test closure",
      allowSymlinks: false,
    });
    await writeFile(source, "export const value = 2;\n", "utf8");
    const after = await RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(closureRoot, {
      label: "test closure",
      allowSymlinks: false,
    });
    assert.notEqual(after.digest, before.digest);

    const hardlink = join(closureRoot, "runtime-hardlink.js");
    await link(source, hardlink);
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(closureRoot, {
        label: "hard-linked closure",
        allowSymlinks: false,
      }),
      /hard-linked file/u,
    );

    await mkdir(linkClosure);
    await mkdir(externalTarget);
    await symlink(
      externalTarget,
      join(linkClosure, "escape"),
      process.platform === "win32" ? "junction" : "dir",
    );
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(linkClosure, {
        label: "linked closure",
        allowSymlinks: false,
      }),
      /symbolic link/u,
    );
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.inspectClosure(linkClosure, {
        label: "linked closure",
        allowSymlinks: true,
      }),
      /link escapes closure/u,
    );

    const bytes = Buffer.from("verified evidence\n", "utf8");
    const created = await RELEASE_REVIEW_PARENT_TEST_HOOKS.atomicPromoteBytesAtRoot(
      promotionRoot,
      "evidence/result.txt",
      bytes,
    );
    assert.equal(created.disposition, "created");
    const existing = await RELEASE_REVIEW_PARENT_TEST_HOOKS.atomicPromoteBytesAtRoot(
      promotionRoot,
      "evidence/result.txt",
      bytes,
    );
    assert.equal(existing.disposition, "verified-existing");
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.atomicPromoteBytesAtRoot(
        promotionRoot,
        "evidence/result.txt",
        Buffer.from("substituted\n", "utf8"),
      ),
      /Immutable live output differs/u,
    );
    assert.deepEqual(await readFile(join(promotionRoot, "evidence", "result.txt")), bytes);
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.atomicPromoteBytesAtRoot(
        promotionRoot,
        "../escape.txt",
        bytes,
      ),
      /unsafe cross-platform path|escapes repository root/u,
    );
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test("release-review promotion preflights the full set and commits the receipt last", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-r19-promotion-"));
  const external = await mkdtemp(join(tmpdir(), "swecircuit-r19-promotion-external-"));
  try {
    const receiptPath = "evidence/completion.json";
    const entries = [
      { path: "evidence/a.txt", bytes: Buffer.from("a\n", "utf8") },
      { path: "evidence/b.txt", bytes: Buffer.from("b\n", "utf8") },
      { path: receiptPath, bytes: Buffer.from('{"complete":true}\n', "utf8") },
    ];
    const first = await RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
      root,
      entries,
      receiptPath,
    );
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.promotePreflightedSetAtRoot(first, {
        failAfterOutputs: 1,
      }),
      /before completion receipt/u,
    );
    assert.equal(await pathExists(join(root, receiptPath)), false);
    assert.deepEqual(await readFile(join(root, "evidence", "a.txt")), Buffer.from("a\n"));
    assert.equal(await pathExists(join(root, "evidence", "b.txt")), false);

    const retry = await RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
      root,
      entries,
      receiptPath,
    );
    const promoted = await RELEASE_REVIEW_PARENT_TEST_HOOKS.promotePreflightedSetAtRoot(retry);
    assert.equal(promoted.receipt.path, receiptPath);
    assert.deepEqual(await readFile(join(root, receiptPath)), Buffer.from('{"complete":true}\n'));
    assert.deepEqual(await readFile(join(root, "evidence", "b.txt")), Buffer.from("b\n"));

    await writeFile(join(root, "conflict.txt"), "wrong\n");
    const conflicting = [
      { path: "new-before-conflict.txt", bytes: Buffer.from("new\n") },
      { path: "conflict.txt", bytes: Buffer.from("expected\n") },
      { path: "conflict-receipt.json", bytes: Buffer.from("{}\n") },
    ];
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
        root,
        conflicting,
        "conflict-receipt.json",
      ),
      /Immutable live output differs/u,
    );
    assert.equal(await pathExists(join(root, "new-before-conflict.txt")), false);
    assert.equal(await pathExists(join(root, "conflict-receipt.json")), false);

    const linkedAncestor = join(root, "linked");
    await symlink(external, linkedAncestor, process.platform === "win32" ? "junction" : "dir");
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
        root,
        [
          { path: "linked/output.txt", bytes: Buffer.from("output\n") },
          { path: "linked-receipt.json", bytes: Buffer.from("{}\n") },
        ],
        "linked-receipt.json",
      ),
      /ancestor is linked/u,
    );

    const hardlinkSource = join(external, "hardlink-source.txt");
    const hardlinkTarget = join(root, "hardlink-target.txt");
    await writeFile(hardlinkSource, "same\n");
    await link(hardlinkSource, hardlinkTarget);
    await assert.rejects(
      RELEASE_REVIEW_PARENT_TEST_HOOKS.preflightPromotionSetAtRoot(
        root,
        [
          { path: "hardlink-target.txt", bytes: Buffer.from("same\n") },
          { path: "hardlink-receipt.json", bytes: Buffer.from("{}\n") },
        ],
        "hardlink-receipt.json",
      ),
      /linked or not one regular file/u,
    );
  } finally {
    await rm(root, { force: true, recursive: true });
    await rm(external, { force: true, recursive: true });
  }
});

test("release-review parent closes environment, outputs, cleanup, and promotion order", async () => {
  const candidate = "f".repeat(40);
  const paths = RELEASE_REVIEW_PARENT_TEST_HOOKS.candidateRunPaths(candidate);
  const before = new Map([
    ["package.json", "file"],
    [paths.runtimeBinding, "file"],
  ]);
  const allowed = new Map(before);
  allowed.set(paths.candidateManifest, "file");
  RELEASE_REVIEW_PARENT_TEST_HOOKS.assertOutputDelta(before, allowed, "prepare", paths);

  const unexpected = new Map(allowed);
  unexpected.set(`${paths.root}/unexpected.bin`, "file");
  assert.throws(
    () => RELEASE_REVIEW_PARENT_TEST_HOOKS.assertOutputDelta(before, unexpected, "prepare", paths),
    /unexpected output/u,
  );

  RELEASE_REVIEW_PARENT_TEST_HOOKS.requireDisjointRoots(
    join(tmpdir(), "r18-left"),
    join(tmpdir(), "r18-right"),
  );
  assert.throws(
    () => RELEASE_REVIEW_PARENT_TEST_HOOKS.requireDisjointRoots(ROOT, join(ROOT, "nested")),
    /outside repository ancestry/u,
  );

  const fixture = await createPrivateNpmFixture();
  try {
    const environment = RELEASE_REVIEW_PARENT_TEST_HOOKS.closedEnvironment(
      fixture.tools,
      fixture.cacheRoot,
      fixture.configuration,
    );
    assert.equal(environment.npm_config_offline, "true");
    assert.equal(environment.npm_config_ignore_scripts, "true");
    assert.equal(environment.npm_config_audit, "false");
    assert.equal(environment.npm_config_fund, "false");
    assert.equal(environment.GIT_CONFIG_NOSYSTEM, "1");
    assert.equal(environment.GIT_TERMINAL_PROMPT, "0");
    assert.equal(
      Object.keys(environment).some((key) =>
        ["node_options", "node_path"].includes(key.toLowerCase()),
      ),
      false,
    );
    assert.equal(environment.npm_config_userconfig, fixture.configuration.userConfig.path);
    assert.equal(environment.npm_config_globalconfig, fixture.configuration.globalConfig.path);
    assert.notEqual(
      environment.npm_config_userconfig.toLowerCase(),
      environment.npm_config_globalconfig.toLowerCase(),
    );
  } finally {
    await cleanupPrivateNpmFixture(fixture);
  }
  assert.equal(await pathExists(fixture.operationRoot), false);
  assert.match(
    releaseReviewParentSource,
    /"ci", "--offline", "--ignore-scripts", "--no-audit", "--no-fund"/u,
  );
  assert.match(releaseReviewParentSource, /freshProcess: true/u);
  assert.match(releaseReviewParentSource, /full-set-preflight-immutable-files-receipt-last/u);
  assert.doesNotMatch(releaseReviewParentSource, /seedInputs/u);
  assert.doesNotMatch(releaseReviewLifecycleSource, /npm-cli-adapter|delete environment\[key\]/u);
  assert.doesNotMatch(releaseReviewParentSource, /npm_config_userconfig = nullDevice/u);
  assert.doesNotMatch(reviewHarnessSource, /npm_config_userconfig === .*NUL/u);
});

test("installed npm 11 uses exact production private configs and rejects the old alias", async () => {
  const fixture = await createPrivateNpmFixture();
  const candidateRoot = join(fixture.operationRoot, "candidate");
  await mkdir(candidateRoot);
  try {
    const environment = RELEASE_REVIEW_PARENT_TEST_HOOKS.closedEnvironment(
      fixture.tools,
      fixture.cacheRoot,
      fixture.configuration,
    );
    const npmCli = RELEASE_REVIEW_PARENT_TEST_HOOKS.resolveNpmCli(process.execPath);
    const runNpm = (arguments_, label) =>
      RELEASE_REVIEW_PARENT_TEST_HOOKS.runWithPrivateNpmConfiguration(
        process.execPath,
        [npmCli, ...arguments_],
        {
          cwd: candidateRoot,
          environment,
          npmConfiguration: fixture.configuration,
          label,
        },
      );
    const version = runNpm(["--version"], "focused npm version");
    assert.equal(version.status, 0, version.stderr.toString("utf8"));
    assert.match(version.stdout.toString("utf8").trim(), /^11\./u);
    const userConfig = runNpm(["config", "get", "userconfig"], "focused npm userconfig");
    const globalConfig = runNpm(["config", "get", "globalconfig"], "focused npm globalconfig");
    assert.equal(userConfig.stdout.toString("utf8").trim(), fixture.configuration.userConfig.path);
    assert.equal(
      globalConfig.stdout.toString("utf8").trim(),
      fixture.configuration.globalConfig.path,
    );

    const harnessEvidence = await RELEASE_REVIEW_TEST_HOOKS.validateWorkerPrivateNpmConfiguration({
      candidateRoot,
      cacheRoot: fixture.cacheRoot,
      environment,
      environmentPolicy: RELEASE_REVIEW_PARENT_TEST_HOOKS.environmentPolicy({}),
    });
    assert.equal(harnessEvidence.hostConfigurationExcluded, true);
    assert.equal(harnessEvidence.userConfig.bytes, 0);
    assert.equal(harnessEvidence.globalConfig.bytes, 0);

    const aliased = {
      ...environment,
      npm_config_globalconfig: environment.npm_config_userconfig,
    };
    const oldResult = spawnSync(process.execPath, [npmCli, "--version"], {
      cwd: candidateRoot,
      env: aliased,
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
      windowsHide: true,
    });
    assert.equal(oldResult.status, 1);
    assert.match(oldResult.stderr, /double-loading config/u);
    await assert.rejects(
      RELEASE_REVIEW_TEST_HOOKS.validateWorkerPrivateNpmConfiguration({
        candidateRoot,
        cacheRoot: fixture.cacheRoot,
        environment: {
          ...environment,
          npm_config_userconfig: process.platform === "win32" ? "NUL" : "/dev/null",
          npm_config_globalconfig: process.platform === "win32" ? "NUL" : "/dev/null",
        },
        environmentPolicy: RELEASE_REVIEW_PARENT_TEST_HOOKS.environmentPolicy({}),
      }),
      /distinct absolute paths|plain, unlinked regular file/u,
    );
  } finally {
    const userPath = fixture.configuration.userConfig.path;
    const globalPath = fixture.configuration.globalConfig.path;
    await cleanupPrivateNpmFixture(fixture);
    assert.equal(await pathExists(userPath), false);
    assert.equal(await pathExists(globalPath), false);
    assert.equal(await pathExists(fixture.operationRoot), false);
  }
});

test("private npm substitution routes stop before process spawn and clean up", async () => {
  const markerCommand = (marker) => [
    "-e",
    `require("node:fs").writeFileSync(${JSON.stringify(marker)}, "spawned")`,
  ];
  const rejectBeforeSpawn = async (fixture, environment, pattern, label) => {
    const marker = join(fixture.operationRoot, `${label}.marker`);
    assert.throws(
      () =>
        RELEASE_REVIEW_PARENT_TEST_HOOKS.runWithPrivateNpmConfiguration(
          process.execPath,
          markerCommand(marker),
          {
            cwd: fixture.operationRoot,
            environment,
            npmConfiguration: fixture.configuration,
            label,
          },
        ),
      pattern,
    );
    assert.equal(await pathExists(marker), false, `${label} spawned unexpectedly`);
  };

  const environmentFixture = await createPrivateNpmFixture();
  try {
    const environment = RELEASE_REVIEW_PARENT_TEST_HOOKS.closedEnvironment(
      environmentFixture.tools,
      environmentFixture.cacheRoot,
      environmentFixture.configuration,
    );
    await rejectBeforeSpawn(
      environmentFixture,
      { ...environment, npm_config_globalconfig: environment.npm_config_userconfig },
      /differs from its private configuration binding/u,
      "same-path-alias",
    );
    const outside = join(environmentFixture.cacheRoot, "outside-npm-config");
    await writeFile(outside, Buffer.alloc(0), { flag: "wx" });
    await rejectBeforeSpawn(
      environmentFixture,
      { ...environment, npm_config_globalconfig: outside },
      /differs from its private configuration binding/u,
      "out-of-root-substitution",
    );
    await rejectBeforeSpawn(
      environmentFixture,
      { ...environment, npm_config_prefix: join(environmentFixture.cacheRoot, "host-prefix") },
      /undeclared npm setting/u,
      "host-config-injection",
    );
  } finally {
    await cleanupPrivateNpmFixture(environmentFixture);
  }

  for (const scenario of [
    {
      label: "empty-file-replacement",
      mutate: async (fixture) => {
        await rm(fixture.configuration.globalConfig.path);
        await writeFile(fixture.configuration.globalConfig.path, Buffer.alloc(0), {
          flag: "wx",
        });
      },
      pattern: /substituted after creation/u,
    },
    {
      label: "hard-link-alias",
      mutate: async (fixture) => {
        await rm(fixture.configuration.globalConfig.path);
        await link(fixture.configuration.userConfig.path, fixture.configuration.globalConfig.path);
      },
      pattern: /plain, unlinked regular file/u,
    },
    {
      label: "non-empty-config",
      mutate: async (fixture) => {
        await writeFile(fixture.configuration.globalConfig.path, "not empty\n");
      },
      pattern: /exactly zero bytes/u,
    },
    {
      label: "missing-config",
      mutate: async (fixture) => {
        await rm(fixture.configuration.globalConfig.path);
      },
      pattern: /ENOENT/u,
    },
  ]) {
    const fixture = await createPrivateNpmFixture();
    try {
      const environment = RELEASE_REVIEW_PARENT_TEST_HOOKS.closedEnvironment(
        fixture.tools,
        fixture.cacheRoot,
        fixture.configuration,
      );
      await scenario.mutate(fixture);
      await rejectBeforeSpawn(fixture, environment, scenario.pattern, scenario.label);
    } finally {
      await cleanupPrivateNpmFixture(fixture);
    }
  }
});
