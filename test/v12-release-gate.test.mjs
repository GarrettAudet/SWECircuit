import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import {
  access,
  link,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rename,
  rm,
  rmdir,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  basename,
  delimiter,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  win32,
} from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { compileAgentBlueprints } from "../dist/index.js";
import { RELEASE_REVIEW_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_GATE_TEST_HOOKS } from "../scripts/run-v12-release-gate.mjs";
import { RELEASE_REVIEW_PARENT_TEST_HOOKS } from "../scripts/run-v12-release-review.mjs";
import {
  fixtureGitEnvironment,
  assertConstantBatchRead,
  BINARY_FIXTURE_BYTES,
  createGitBlobLoaderFixture,
  createRecordedGitRunner,
} from "./helpers/git-blob-loader-fixture.mjs";
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const CI_WORKFLOW_PATH = join(ROOT, ".github/workflows/template-check.yml");
const NPM_CONFIG_PATH = join(ROOT, ".npmrc");
const RUN_TYPESCRIPT_PATH = join(ROOT, "scripts/run-typescript.mjs");
const RELEASE_GATE_PATH = join(ROOT, "scripts/run-v12-release-gate.mjs");
const PACKED_CONSUMER_PATH = join(ROOT, "scripts/check-packed-consumer.mjs");
const REVIEW_HARNESS_PATH = join(
  ROOT,
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
);
const RELEASE_REVIEW_LIFECYCLE_PATH = join(ROOT, "test/helpers/v12-release-review-lifecycle.mjs");
const ENCLOSING_CANDIDATE_PROBE_PATH = join(
  ROOT,
  "test/fixtures/v12-enclosing-candidate-git-probe.mjs",
);
const ciWorkflowSource = (await readFile(CI_WORKFLOW_PATH, "utf8")).replaceAll("\r\n", "\n");
const npmConfigSource = await readFile(NPM_CONFIG_PATH, "utf8");
const releaseReviewLifecycleSource = await readFile(RELEASE_REVIEW_LIFECYCLE_PATH, "utf8");
const enclosingCandidateProbeSource = await readFile(ENCLOSING_CANDIDATE_PROBE_PATH);
const runTypeScriptSource = await readFile(RUN_TYPESCRIPT_PATH);
const RELEASE_REVIEW_PARENT_PATH = join(ROOT, "scripts/run-v12-release-review.mjs");
const releaseGateSource = await readFile(RELEASE_GATE_PATH, "utf8");
const packedConsumerSource = await readFile(PACKED_CONSUMER_PATH, "utf8");
const reviewHarnessSource = await readFile(REVIEW_HARNESS_PATH, "utf8");
const releaseReviewParentSource = await readFile(RELEASE_REVIEW_PARENT_PATH, "utf8");

function runFixtureNode(root, args) {
  return spawnSync(process.execPath, args, {
    cwd: root,
    encoding: "utf8",
    env: fixtureGitEnvironment(),
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });
}

function gitOutput(gitRunner, args) {
  return Buffer.from(gitRunner(args).stdout).toString("utf8").trim();
}

async function createReleaseGatePathFixture() {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-gate-paths-")));
  const scripts = join(root, "scripts");
  const gitRunner = createRecordedGitRunner(root, []);
  await mkdir(scripts);
  await Promise.all([
    writeFile(join(root, ".gitattributes"), await readFile(join(ROOT, ".gitattributes"))),
    writeFile(join(root, ".gitignore"), await readFile(join(ROOT, ".gitignore"))),
    writeFile(join(scripts, "run-typescript.mjs"), runTypeScriptSource),
    writeFile(join(scripts, "run-v12-release-gate.mjs"), releaseGateSource),
  ]);
  gitRunner(["init", "--quiet"]);
  gitRunner(["add", "--all"]);
  gitRunner([
    "-c",
    "user.name=SWECircuit Tests",
    "-c",
    "user.email=tests@swecircuit.invalid",
    "commit",
    "--quiet",
    "-m",
    "release gate path fixture",
  ]);
  return { root, gatePath: join(scripts, "run-v12-release-gate.mjs") };
}

async function createEnclosingCandidateGitFixture() {
  const fixture = await createReleaseGatePathFixture();
  const probeRelativePath = "test/fixtures/v12-enclosing-candidate-git-probe.mjs";
  const probePath = resolve(fixture.root, ...probeRelativePath.split("/"));
  const gitRunner = createRecordedGitRunner(fixture.root, []);
  await mkdir(dirname(probePath), { recursive: true });
  await writeFile(probePath, enclosingCandidateProbeSource);
  gitRunner(["add", "--all"]);
  gitRunner([
    "-c",
    "user.name=SWECircuit Tests",
    "-c",
    "user.email=tests@swecircuit.invalid",
    "commit",
    "--quiet",
    "-m",
    "enclosing candidate Git probe",
  ]);
  return { ...fixture, probeRelativePath };
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

function assertHostedWorkflowContract(source) {
  const workflowPreamble = [
    "name: SWECircuit Checks",
    "",
    "on:",
    "  pull_request:",
    "  push:",
    "    branches:",
    "      - main",
    '      - "codex/**"',
    "",
    "permissions:",
    "  contents: read",
    "",
    "jobs:",
  ].join("\n");
  const templateCheckJob = source.match(
    /^  template-check:\n[\s\S]*?(?=^  kernel-toolchain:)/mu,
  )?.[0];
  const templateCheckJobLevelKeys =
    templateCheckJob?.match(/^    [A-Za-z][A-Za-z0-9_-]*:/gmu)?.map((line) => line.trim()) ?? [];
  const checkoutContract = [
    "      - name: Enable Git long paths",
    "        if: runner.os == 'Windows'",
    "        shell: pwsh",
    "        run: git config --global core.longpaths true",
    "",
    "      - name: Check out repository",
    "        uses: actions/checkout@v7",
    "        with:",
    "          fetch-depth: 0",
  ].join("\n");
  const checkoutReferences = source.match(/actions\/checkout@/gu) ?? [];
  const protectedCheckoutCount = source.split(checkoutContract).length - 1;
  const permissionReferences = source.match(/\bpermissions\b/gu) ?? [];
  const permissionBlock = source
    .match(/^permissions:\n(?:^[ \t]+[^\n]*(?:\n|$))*/mu)?.[0]
    .trimEnd();
  const whitespaceContract = [
    "      - name: Check tracked whitespace",
    "        shell: pwsh",
    "        run: |",
    "          Remove-Item Env:GIT_INDEX_FILE -ErrorAction SilentlyContinue",
    "          Remove-Item Env:GIT_DIR -ErrorAction SilentlyContinue",
    "          Remove-Item Env:GIT_WORK_TREE -ErrorAction SilentlyContinue",
    "          Remove-Item Env:GIT_COMMON_DIR -ErrorAction SilentlyContinue",
    "          $trackedFiles = @(git -C . ls-files --cached)",
    "          if ($LASTEXITCODE -ne 0) {",
    '            Write-Error "Unable to enumerate tracked files."',
    "            exit 1",
    "          }",
    "          if ($trackedFiles.Count -eq 0) {",
    '            Write-Error "Tracked-file enumeration returned no files."',
    "            exit 1",
    "          }",
    '          $whitespaceExemptExtensions = @(".png", ".jpg", ".jpeg", ".gif", ".pdf", ".patch", ".log")',
    "          $failures = @()",
    "          foreach ($file in $trackedFiles) {",
    "            $extension = [System.IO.Path]::GetExtension($file).ToLowerInvariant()",
    "            if ($whitespaceExemptExtensions -contains $extension) { continue }",
    "            if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {",
    '              $failures += "${file}: tracked path is missing or is not a regular file"',
    "              continue",
    "            }",
    "            $lineNumber = 0",
    "            foreach ($line in Get-Content -LiteralPath $file) {",
    "              $lineNumber += 1",
    '              if ($line -match "[ \\t]+$") {',
    '                $failures += "${file}:${lineNumber}: trailing whitespace"',
    "              }",
    "            }",
    "          }",
    "          if ($failures.Count -gt 0) {",
    "            $failures | ForEach-Object { Write-Error $_ }",
    "            exit 1",
    "          }",
  ].join("\n");
  const whitespaceStepReferences = source.match(/- name: Check tracked whitespace/gu) ?? [];
  const protectedWhitespaceCount = source.split(whitespaceContract).length - 1;
  const templateCheckJobContract = [
    "  template-check:",
    "    name: Template Check",
    "    runs-on: windows-latest",
    "    steps:",
    checkoutContract,
    "",
    "      - name: Run SWECircuit checker",
    "        shell: pwsh",
    "        run: .\\scripts\\check-template.ps1",
    "",
    "      - name: Run checker regression tests",
    "        shell: pwsh",
    "        run: .\\scripts\\test-check-template.ps1",
    "",
    whitespaceContract,
    "",
  ].join("\n");

  assert.ok(
    source.startsWith(`${workflowPreamble}\n`),
    "hosted CI must preserve the enabled top-level workflow contract",
  );
  assert.ok(templateCheckJob, "hosted CI must declare one template-check job");
  assert.deepEqual(
    templateCheckJobLevelKeys,
    ["name:", "runs-on:", "steps:"],
    "template-check must remain enabled and expose only its closed job-level keys",
  );
  assert.equal(
    protectedCheckoutCount,
    checkoutReferences.length,
    "every checkout must have the Windows long-path and full-history contract",
  );
  assert.equal(checkoutReferences.length, 2, "hosted CI must declare exactly two checkout steps");
  assert.equal(
    permissionReferences.length,
    1,
    "hosted CI must use one top-level permissions declaration with no job override",
  );
  assert.equal(
    permissionBlock,
    "permissions:\n  contents: read",
    "hosted CI must grant only top-level contents read authority",
  );
  assert.equal(
    whitespaceStepReferences.length,
    1,
    "hosted CI must declare exactly one tracked-whitespace step",
  );
  assert.equal(
    protectedWhitespaceCount,
    1,
    "hosted CI must preserve the complete closed tracked-whitespace step",
  );
  assert.equal(
    templateCheckJob,
    templateCheckJobContract,
    "template-check job must preserve its complete blocking contract",
  );
  const workflowBytes = Buffer.from(source, "utf8");
  assert.equal(workflowBytes.byteLength, 3_143, "complete hosted workflow byte length must match");
  assert.equal(
    `sha256:${createHash("sha256").update(workflowBytes).digest("hex")}`,
    "sha256:9509732b0eb21bbec0e4a4f013c213b6b5083345e01573c4e22b5a1bb04a28cc",
    "complete hosted workflow digest must match",
  );
}

test("hosted CI supplies complete Git history and a repository-local npm cache", () => {
  assertHostedWorkflowContract(ciWorkflowSource);
  assert.equal(npmConfigSource.trim(), "cache=.local/npm-cache");
});

test("hosted CI contract rejects unprotected checkout and write authority", () => {
  const unprotectedCheckout = `${ciWorkflowSource}
  shadow-job:
    steps:
      - uses: "actions/checkout@v7" # checkout
`;
  assert.throws(
    () => assertHostedWorkflowContract(unprotectedCheckout),
    /every checkout must have/u,
  );

  const writeAuthority = ciWorkflowSource.replace(
    "  contents: read",
    '  contents: read\n  issues: "write" # grant',
  );
  assert.throws(
    () => assertHostedWorkflowContract(writeAuthority),
    /enabled top-level workflow contract/u,
  );

  const jobOverride = `${ciWorkflowSource}
  shadow-job:
    permissions: { issues: "write" }
`;
  assert.throws(
    () => assertHostedWorkflowContract(jobOverride),
    /one top-level permissions declaration/u,
  );

  const disabledTemplateJob = ciWorkflowSource.replace(
    "    runs-on: windows-latest\n    steps:",
    "    runs-on: windows-latest\n    if: ${{ false }}\n    steps:",
  );
  assert.throws(() => assertHostedWorkflowContract(disabledTemplateJob), /remain enabled/u);

  const poisonedEnumeration = ciWorkflowSource.replace(
    "          $trackedFiles = @(git -C . ls-files --cached)",
    '          $env:GIT_INDEX_FILE = "missing-index"\n          $trackedFiles = @(git -C . ls-files --cached)',
  );
  assert.throws(
    () => assertHostedWorkflowContract(poisonedEnumeration),
    /closed tracked-whitespace step/u,
  );

  const emptyEnumerationAccepted = ciWorkflowSource.replace(
    '            Write-Error "Tracked-file enumeration returned no files."\n            exit 1',
    '            Write-Output "Tracked-file enumeration returned no files."',
  );
  assert.throws(
    () => assertHostedWorkflowContract(emptyEnumerationAccepted),
    /closed tracked-whitespace step/u,
  );

  const missingTrackedFileSkipped = ciWorkflowSource.replace(
    '              $failures += "${file}: tracked path is missing or is not a regular file"\n              continue',
    "              continue",
  );
  assert.throws(
    () => assertHostedWorkflowContract(missingTrackedFileSkipped),
    /closed tracked-whitespace step/u,
  );

  const nonBlockingWhitespace = ciWorkflowSource.replace(
    "            exit 1\n          }\n  kernel-toolchain:",
    "            exit 1\n          }\n        continue-on-error: true\n  kernel-toolchain:",
  );
  assert.throws(
    () => assertHostedWorkflowContract(nonBlockingWhitespace),
    /complete blocking contract/u,
  );

  const disabledKernelJob = ciWorkflowSource.replace(
    "    runs-on: ${{ matrix.os }}\n    strategy:",
    "    runs-on: ${{ matrix.os }}\n    if: ${{ false }}\n    strategy:",
  );
  assert.throws(
    () => assertHostedWorkflowContract(disabledKernelJob),
    /complete hosted workflow byte length/u,
  );

  const nonBlockingKernel = ciWorkflowSource.replace(
    "      - name: Verify kernel\n        run: npm run verify",
    "      - name: Verify kernel\n        continue-on-error: true\n        run: npm run verify",
  );
  assert.throws(
    () => assertHostedWorkflowContract(nonBlockingKernel),
    /complete hosted workflow byte length/u,
  );

  const rewrittenEvidence = ciWorkflowSource.replace('".log")', '".txt")');
  assert.throws(
    () => assertHostedWorkflowContract(rewrittenEvidence),
    /closed tracked-whitespace step/u,
  );

  const widenedEvidence = ciWorkflowSource.replace(
    "          $failures = @()",
    '          $whitespaceExemptExtensions += ".md"\n          $failures = @()',
  );
  assert.throws(
    () => assertHostedWorkflowContract(widenedEvidence),
    /closed tracked-whitespace step/u,
  );

  const bypassedSource = ciWorkflowSource.replace(
    "            if ($whitespaceExemptExtensions -contains $extension) { continue }",
    '            if ($extension -eq ".md") { continue }\n            if ($whitespaceExemptExtensions -contains $extension) { continue }',
  );
  assert.throws(
    () => assertHostedWorkflowContract(bypassedSource),
    /closed tracked-whitespace step/u,
  );
});

test("candidate lock applicability distinguishes glibc and musl", () => {
  const glibcPackage = { os: ["linux"], cpu: ["x64"], libc: ["glibc"] };
  const muslPackage = { os: ["linux"], cpu: ["x64"], libc: ["musl"] };
  assert.equal(RELEASE_GATE_TEST_HOOKS.packageApplies(glibcPackage, "linux", "x64", "glibc"), true);
  assert.equal(RELEASE_GATE_TEST_HOOKS.packageApplies(glibcPackage, "linux", "x64", "musl"), false);
  assert.equal(RELEASE_GATE_TEST_HOOKS.packageApplies(muslPackage, "linux", "x64", "musl"), true);
  assert.equal(RELEASE_GATE_TEST_HOOKS.packageApplies(muslPackage, "linux", "x64", "glibc"), false);
  assert.equal(RELEASE_GATE_TEST_HOOKS.packageApplies(glibcPackage, "win32", "x64", null), false);

  assert.equal(
    RELEASE_GATE_TEST_HOOKS.detectRuntimeLibc("linux", {
      header: { glibcVersionRuntime: "2.39" },
      sharedObjects: [],
    }),
    "glibc",
  );
  assert.equal(
    RELEASE_GATE_TEST_HOOKS.detectRuntimeLibc("linux", {
      header: {},
      sharedObjects: ["/lib/ld-musl-x86_64.so.1"],
    }),
    "musl",
  );
  assert.equal(RELEASE_GATE_TEST_HOOKS.detectRuntimeLibc("win32"), null);
  assert.deepEqual(
    RELEASE_GATE_TEST_HOOKS.runtimeIdentity("linux", "arm64", {
      header: { glibcVersionRuntime: "2.39" },
      sharedObjects: [],
    }),
    { platform: "linux", architecture: "arm64", libc: "glibc" },
  );
  assert.throws(
    () =>
      RELEASE_GATE_TEST_HOOKS.detectRuntimeLibc("linux", {
        header: {},
        sharedObjects: [],
      }),
    /Unable to determine/u,
  );
});

test("candidate dependency and canonical commands use one authenticated npm CLI", async () => {
  const install = RELEASE_GATE_TEST_HOOKS.candidateDependencyInstallCommand();
  assert.equal(install.executable, RELEASE_GATE_TEST_HOOKS.hostNodePath);
  assert.deepEqual(install.arguments, [
    RELEASE_GATE_TEST_HOOKS.hostNpmCliPath,
    "ci",
    "--offline",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    "--cache",
    RELEASE_GATE_TEST_HOOKS.hostNpmCache,
  ]);

  const expectedNpmCli =
    process.platform === "win32"
      ? await realpath(
          join(
            dirname(RELEASE_GATE_TEST_HOOKS.hostNpmCommandPath),
            "node_modules",
            "npm",
            "bin",
            "npm-cli.js",
          ),
        )
      : RELEASE_GATE_TEST_HOOKS.hostNpmPath;
  assert.equal(RELEASE_GATE_TEST_HOOKS.hostNpmCliPath, expectedNpmCli);
  assert.equal(
    await realpath(RELEASE_GATE_TEST_HOOKS.hostNpmCommandPath),
    RELEASE_GATE_TEST_HOOKS.hostNpmPath,
  );
  const closedEntries = RELEASE_GATE_TEST_HOOKS.closedPath().split(delimiter);
  const npmCommandDirectory = dirname(RELEASE_GATE_TEST_HOOKS.hostNpmCommandPath);
  const nodeDirectory = dirname(RELEASE_GATE_TEST_HOOKS.hostNodePath);
  assert.ok(closedEntries.includes(npmCommandDirectory));
  assert.ok(closedEntries.includes(nodeDirectory));
  if (npmCommandDirectory !== nodeDirectory) {
    assert.ok(closedEntries.indexOf(npmCommandDirectory) < closedEntries.indexOf(nodeDirectory));
  }
  assert.deepEqual(RELEASE_GATE_TEST_HOOKS.canonicalCommand, {
    executable: RELEASE_GATE_TEST_HOOKS.hostNodePath,
    arguments: [RELEASE_GATE_TEST_HOOKS.hostNpmCliPath, "run", "verify"],
    canonical: "node npm-cli.js run verify",
  });
});

test("canonical evidence slot is atomically owned, published, and retry-safe", async () => {
  const candidate = randomBytes(20).toString("hex");
  const outputs = RELEASE_GATE_TEST_HOOKS.candidateEvidencePaths(candidate);
  const root = dirname(outputs.receipt);
  const pending = RELEASE_GATE_TEST_HOOKS.candidateReceiptPendingPath(outputs);
  const receipt = Buffer.from('{"result":"pass"}\n', "utf8");
  assert.equal(await pathExists(root), false);
  try {
    await RELEASE_GATE_TEST_HOOKS.reserveCandidateEvidenceSlot(outputs);
    assert.equal(await pathExists(outputs.stdout), true);
    assert.equal(await pathExists(outputs.stderr), true);
    assert.equal(await pathExists(outputs.receipt), false);
    await assert.rejects(
      RELEASE_GATE_TEST_HOOKS.reserveCandidateEvidenceSlot(outputs),
      /evidence slot already exists/u,
    );
    await RELEASE_GATE_TEST_HOOKS.publishCandidateReceipt(outputs, receipt);
    assert.deepEqual(await readFile(outputs.receipt), receipt);
    assert.equal(await pathExists(pending), false);
    await assert.rejects(
      RELEASE_GATE_TEST_HOOKS.publishCandidateReceipt(
        outputs,
        Buffer.from('{"result":"substituted"}\n', "utf8"),
      ),
      /EEXIST/u,
    );
    assert.deepEqual(await readFile(outputs.receipt), receipt);
    assert.equal(await pathExists(pending), false);
  } finally {
    await RELEASE_GATE_TEST_HOOKS.removeCandidateEvidenceSlot(outputs);
  }
  assert.equal(await pathExists(root), false);
});

test("aggregate preparation failures retain every nested cause", () => {
  const rendered = RELEASE_GATE_TEST_HOOKS.renderError(
    new AggregateError(
      [
        new Error("runtime libc unsupported"),
        new AggregateError(
          [new Error("evidence cleanup failed"), new Error("Git cleanup failed")],
          "owned cleanup failed",
        ),
      ],
      "preparation failed",
    ),
  );
  for (const message of [
    "AggregateError: preparation failed",
    "Error: runtime libc unsupported",
    "AggregateError: owned cleanup failed",
    "Error: evidence cleanup failed",
    "Error: Git cleanup failed",
  ]) {
    assert.match(rendered, new RegExp(escapedPattern(message), "u"));
  }
});

test("failed preparation removes every owned resource", async () => {
  const candidate = randomBytes(20).toString("hex");
  const outputs = RELEASE_GATE_TEST_HOOKS.candidateEvidencePaths(candidate);
  await RELEASE_GATE_TEST_HOOKS.reserveCandidateEvidenceSlot(outputs);
  await mkdir(RELEASE_GATE_TEST_HOOKS.materializationParent, { recursive: true });
  const materialization = {
    root: await mkdtemp(join(RELEASE_GATE_TEST_HOOKS.materializationParent, "candidate-")),
  };
  const gitContext = {
    root: await mkdtemp(join(RELEASE_GATE_TEST_HOOKS.materializationParent, "git-")),
  };
  await RELEASE_GATE_TEST_HOOKS.cleanupFailedCandidatePreparation(
    outputs,
    materialization,
    gitContext,
  );
  assert.equal(await pathExists(dirname(outputs.receipt)), false);
  assert.equal(await pathExists(materialization.root), false);
  assert.equal(await pathExists(gitContext.root), false);
});

test("packed consumer retains and executes the complete TypeScript binding", () => {
  assert.match(packedConsumerSource, /executeTypeScript/u);
  assert.match(packedConsumerSource, /resolveTypeScriptEntrypointBinding/u);
  assert.match(
    packedConsumerSource,
    /const TYPESCRIPT_BINDING = resolveTypeScriptEntrypointBinding\(\{/u,
  );
  assert.doesNotMatch(
    packedConsumerSource,
    /const TYPESCRIPT_ENTRYPOINT = TYPESCRIPT_BINDING\.path;/u,
  );

  const compilationStart = packedConsumerSource.indexOf(`  runTypeScript(\n    [`);
  const compilationEnd = packedConsumerSource.indexOf("  const typedHostOutput", compilationStart);
  assert.notEqual(compilationStart, -1);
  assert.ok(compilationEnd > compilationStart);
  const compilationSource = packedConsumerSource.slice(compilationStart, compilationEnd);
  assert.match(compilationSource, /runTypeScript\(\s*\[\s*"--ignoreConfig"/u);
  assert.match(packedConsumerSource, /binding: TYPESCRIPT_BINDING/u);
  assert.match(packedConsumerSource, /assert\.deepEqual\(observedReceipt, execution\.receipt\)/u);
  assert.doesNotMatch(
    compilationSource,
    /join\(ROOT, "node_modules", "typescript", "bin", "tsc"\)/u,
  );
});

test("canonical gate materialization uses a constant-process Git blob batch", async () => {
  const fixture = await createGitBlobLoaderFixture();

  try {
    for (const revision of fixture.revisions) {
      const calls = [];
      const materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(
        revision.commit,
        { gitRunner: createRecordedGitRunner(fixture.root, calls) },
      );
      try {
        assert.equal(materialization.source.files, revision.files);
        assert.deepEqual(
          await readFile(join(materialization.root, "binary.bin")),
          BINARY_FIXTURE_BYTES,
        );
        assertConstantBatchRead(calls, revision.files);
      } finally {
        await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
      }
    }
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});
test("candidate materialization excludes and detects uncommitted verification inputs", async () => {
  const fixture = await createGitBlobLoaderFixture();
  const gitRunner = createRecordedGitRunner(fixture.root, []);
  const candidateCommit = fixture.revisions.at(-1).commit;
  const candidateTree = gitOutput(gitRunner, [
    "rev-parse",
    "--verify",
    `${candidateCommit}^{tree}`,
  ]);
  const materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(
    candidateCommit,
    { gitRunner },
  );

  try {
    assert.equal(materialization.source.commit, candidateCommit);
    assert.equal(materialization.source.tree, candidateTree);
    assert.ok(materialization.source.files > 0);
    assert.ok(materialization.source.bytes > 0);

    const injectedPath = join(materialization.root, "untracked-release-gate-injection.test.mjs");
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

    const alphaPath = join(materialization.root, "alpha.txt");
    const alphaBytes = await readFile(alphaPath);
    await writeFile(alphaPath, Buffer.concat([alphaBytes, Buffer.from("\n")]));
    const changed = await RELEASE_GATE_TEST_HOOKS.inspectMaterialization(
      materialization.root,
      materialization.entries,
    );
    assert.notEqual(changed.digest, materialization.source.digest);

    await writeFile(alphaPath, alphaBytes);
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
    try {
      await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  }
});

test("candidate lock and private dependency closure reject substitution", async () => {
  const lockBytes = await readFile(join(ROOT, "package-lock.json"));
  const lockSupply = RELEASE_GATE_TEST_HOOKS.validateCandidateLockSupply(lockBytes);
  assert.equal(lockSupply.receipt.path, "package-lock.json");
  assert.equal(lockSupply.receipt.bytes, lockBytes.byteLength);
  assert.ok(lockSupply.receipt.packages > 0);
  assert.equal(
    lockSupply.receipt.libc,
    process.platform === "linux" ? RELEASE_GATE_TEST_HOOKS.detectRuntimeLibc() : null,
  );
  assert.match(lockSupply.receipt.inventoryDigest, /^sha256:[0-9a-f]{64}$/u);

  const lock = JSON.parse(lockBytes.toString("utf8"));
  const packagePath = Object.keys(lock.packages).find((path) => path !== "");
  assert.ok(packagePath);
  const linked = structuredClone(lock);
  linked.packages[packagePath].link = true;
  assert.throws(
    () =>
      RELEASE_GATE_TEST_HOOKS.validateCandidateLockSupply(
        Buffer.from(JSON.stringify(linked), "utf8"),
      ),
    /Locked package is linked/u,
  );
  const local = structuredClone(lock);
  local.packages[packagePath].resolved = "file:../substitution";
  assert.throws(
    () =>
      RELEASE_GATE_TEST_HOOKS.validateCandidateLockSupply(
        Buffer.from(JSON.stringify(local), "utf8"),
      ),
    /non-registry supply/u,
  );

  const root = await mkdtemp(join(tmpdir(), "swecircuit-candidate-dependencies-"));
  const dependencyRoot = join(root, "node_modules");
  const packageRoot = join(dependencyRoot, "example");
  const entries = [{ path: "package.json", segments: ["package.json"] }];
  try {
    await mkdir(packageRoot, { recursive: true });
    await writeFile(join(root, "package.json"), "{}\n", "utf8");
    const source = join(packageRoot, "index.js");
    await writeFile(source, "export {};\n", "utf8");
    const before = await RELEASE_GATE_TEST_HOOKS.inspectCandidateDependencyClosure(dependencyRoot);
    assert.ok(before.files > 0);
    assert.ok(before.directories > 0);
    assert.match(before.digest, /^sha256:[0-9a-f]{64}$/u);
    await writeFile(source, "changed\n", "utf8");
    const after = await RELEASE_GATE_TEST_HOOKS.inspectCandidateDependencyClosure(dependencyRoot);
    assert.notEqual(after.digest, before.digest);
    const alias = join(packageRoot, "hard-link.js");
    await link(source, alias);
    await assert.rejects(
      RELEASE_GATE_TEST_HOOKS.inspectCandidateDependencyClosure(dependencyRoot),
      /hard-linked file/u,
    );
    await rm(alias);
    assert.equal(await RELEASE_GATE_TEST_HOOKS.removeCandidateDependencies(root, entries), true);
    assert.equal(await pathExists(dependencyRoot), false);
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test("runtime ancestor package supply is detected before candidate execution", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "swecircuit-ancestor-supply-")));
  const candidate = join(root, "work", "candidate");
  const hostileSupply = join(root, "node_modules");
  try {
    await mkdir(candidate, { recursive: true });
    let inspection = await RELEASE_GATE_TEST_HOOKS.inspectRuntimeAncestorSupply(candidate);
    assert.equal(inspection.absent, true);
    assert.equal(inspection.found, null);
    assert.deepEqual(
      inspection.checkedPaths,
      RELEASE_GATE_TEST_HOOKS.runtimeAncestorSupplyPaths(candidate),
    );

    await mkdir(hostileSupply);
    inspection = await RELEASE_GATE_TEST_HOOKS.inspectRuntimeAncestorSupply(candidate);
    assert.equal(inspection.absent, false);
    assert.deepEqual(inspection.found, {
      path: hostileSupply,
      kind: "directory",
    });
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});

test("release gate scratch namespace preserves nested Windows install headroom", async () => {
  const layout = RELEASE_GATE_TEST_HOOKS.materializationLayout;
  assert.deepEqual(layout, {
    namespace: "swg",
    parent: "w",
    runtime: "r",
    temp: "t",
  });
  assert.equal(basename(RELEASE_GATE_TEST_HOOKS.materializationBase), layout.namespace);

  const lockedDependencySegments = [
    "node_modules",
    "typescript",
    "vendor",
    "vscode-jsonrpc",
    "lib",
    "common",
    "sharedArrayCancellation.d.ts",
  ];
  const lockedDependencyPath = join(...lockedDependencySegments);
  await access(join(ROOT, lockedDependencyPath));

  const projectedCurrentCandidate = () => {
    let nested = join(dirname(RELEASE_GATE_TEST_HOOKS.materializationBase), layout.namespace);
    for (let depth = 0; depth < 2; depth += 1) {
      nested = join(
        nested,
        layout.parent,
        "git-XXXXXX",
        layout.runtime,
        layout.temp,
        layout.namespace,
      );
    }
    return join(nested, layout.parent, "candidate-XXXXXX");
  };

  if (process.platform === "win32") {
    const currentLeaf = join(projectedCurrentCandidate(), lockedDependencyPath);
    assert.ok(currentLeaf.length < 260, `nested install path lacks headroom: ${currentLeaf}`);
  }

  const projectedFourLevelLeaf = (candidateLayout) => {
    const windowsTempRoot = `C:\\${"t".repeat(61)}`;
    assert.equal(windowsTempRoot.length, 64);
    let nested = win32.join(windowsTempRoot, candidateLayout.namespace);
    for (let depth = 0; depth < 3; depth += 1) {
      nested = win32.join(
        nested,
        candidateLayout.parent,
        "git-XXXXXX",
        candidateLayout.runtime,
        candidateLayout.temp,
        candidateLayout.namespace,
      );
    }
    return win32.join(
      nested,
      candidateLayout.parent,
      "candidate-XXXXXX",
      ...lockedDependencySegments,
    );
  };

  const priorLeaf = projectedFourLevelLeaf({
    namespace: "swc-v12-g",
    parent: "work",
    runtime: "host-runtime",
    temp: "temp",
  });
  const correctedLeaf = projectedFourLevelLeaf(layout);
  assert.equal(priorLeaf.length - correctedLeaf.length, 78);
  assert.ok(
    260 - correctedLeaf.length >= 24,
    `fixed Windows path budget is ${correctedLeaf.length}`,
  );
});

test("candidate Git context is disposable, exact, and usable from the materialization", async () => {
  const fixture = await createGitBlobLoaderFixture();
  const gitRunner = createRecordedGitRunner(fixture.root, []);
  const longPathDirectory = `long-path-${"y".repeat(45)}`;
  const longPathLeaf = `leaf-${"z".repeat(45)}.txt`;
  const longPathEntry = `${longPathDirectory}/${longPathLeaf}`;
  await mkdir(join(fixture.root, longPathDirectory));
  await writeFile(
    join(fixture.root, longPathDirectory, longPathLeaf),
    "long path fixture\n",
    "utf8",
  );
  gitRunner(["add", "--all"]);
  gitRunner([
    "-c",
    "user.name=SWECircuit Tests",
    "-c",
    "user.email=tests@swecircuit.invalid",
    "commit",
    "--quiet",
    "-m",
    "long path fixture",
  ]);
  const candidateCommit = gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]);
  const sourceGitDirectory = gitOutput(gitRunner, [
    "rev-parse",
    "--path-format=absolute",
    "--git-dir",
  ]);
  const sourceHeadBefore = gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]);
  const materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(
    candidateCommit,
    { gitRunner },
  );
  const deepRoot = await mkdtemp(
    join(RELEASE_GATE_TEST_HOOKS.materializationParent, "long-path-context-"),
  );
  const targetWorktreePathLength = 160;
  const nestedSegmentLength = Math.min(
    96,
    Math.max(1, targetWorktreePathLength - deepRoot.length - "candidate".length - 2),
  );
  const nestedRoot = join(deepRoot, "x".repeat(nestedSegmentLength));
  const worktree = join(nestedRoot, "candidate");
  let gitContext;
  let materializationMoved = false;

  try {
    await mkdir(nestedRoot, { recursive: true });
    await rename(materialization.root, worktree);
    materializationMoved = true;
    assert.equal(
      materialization.entries.some((entry) => entry.path === longPathEntry),
      true,
      "causal long-path entry is missing from the exact materialization",
    );
    if (process.platform === "win32") {
      assert.ok(worktree.length < 260, "causal worktree exceeds the Windows process boundary");
    }
    const longMaterializedPathLength = join(worktree, ...longPathEntry.split("/")).length;
    assert.ok(
      longMaterializedPathLength > 260,
      "causal tracked entry did not cross the Windows long-path boundary",
    );

    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      worktree,
      { sourceGitRunner: gitRunner },
    );
    assert.notEqual(resolve(gitContext.root), resolve(sourceGitDirectory));
    assert.equal(dirname(gitContext.root), RELEASE_GATE_TEST_HOOKS.materializationParent);
    const scratchFromRepository = relative(ROOT, RELEASE_GATE_TEST_HOOKS.materializationParent);
    assert.equal(
      isAbsolute(scratchFromRepository) ||
        scratchFromRepository === ".." ||
        scratchFromRepository.startsWith("../") ||
        scratchFromRepository.startsWith("..\\"),
      true,
      "release-gate scratch must remain outside repository ancestry",
    );
    assert.deepEqual(RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext), {
      head: candidateCommit,
      trackedState: "clean",
    });

    const environment = RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext);
    const childHead = spawnSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: worktree,
      encoding: "utf8",
      env: environment,
      windowsHide: true,
    });
    assert.equal(childHead.status, 0, childHead.stderr);
    assert.equal(childHead.stdout.trim(), candidateCommit);
    assert.equal(environment.GIT_DIR, gitContext.root);
    assert.equal(environment.GIT_WORK_TREE, worktree);

    const longPaths = spawnSync("git", ["config", "--bool", "--get", "core.longpaths"], {
      cwd: worktree,
      encoding: "utf8",
      env: environment,
      windowsHide: true,
    });
    assert.equal(longPaths.status, 0, longPaths.stderr);
    assert.equal(longPaths.stdout.trim(), "true");

    const exactDiff = spawnSync(
      "git",
      ["diff", "--no-ext-diff", "--no-textconv", "--quiet", "HEAD", "--"],
      {
        cwd: worktree,
        encoding: "utf8",
        env: environment,
        windowsHide: true,
      },
    );
    assert.equal(exactDiff.status, 0, exactDiff.stderr);

    assert.equal(environment.PATH.split(delimiter)[0], join(worktree, "node_modules", ".bin"));
    assert.equal(environment.npm_config_cache, RELEASE_GATE_TEST_HOOKS.hostNpmCache);
    assert.equal(isAbsolute(environment.npm_config_cache), true);
    const cacheFromMaterialization = relative(
      await realpath(worktree),
      await realpath(environment.npm_config_cache),
    );
    assert.equal(
      isAbsolute(cacheFromMaterialization) ||
        cacheFromMaterialization === ".." ||
        cacheFromMaterialization.startsWith("../") ||
        cacheFromMaterialization.startsWith("..\\"),
      true,
    );
    const typeScriptKey = RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey;
    assert.deepEqual(
      Object.keys(environment).filter((key) => key.toLowerCase() === typeScriptKey.toLowerCase()),
      [],
    );
    assert.equal(
      await pathExists(resolve(worktree, "node_modules", "typescript", "bin", "tsc")),
      false,
      "candidate compiler must not exist before exact-lock installation",
    );
    assert.notEqual(resolve(environment.GIT_DIR), resolve(sourceGitDirectory));
    assert.equal(gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]), sourceHeadBefore);
  } finally {
    try {
      if (gitContext !== undefined) {
        await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
      }
    } finally {
      try {
        await rm(deepRoot, { recursive: true, force: true });
        if (!materializationMoved) {
          await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
        }
      } finally {
        await rm(fixture.root, { recursive: true, force: true });
      }
    }
  }
});

test("copied lifecycle preserves enclosing candidate Git authority", async () => {
  const fixture = await createEnclosingCandidateGitFixture();
  const gitRunner = createRecordedGitRunner(fixture.root, []);
  const candidateCommit = gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]);
  const sourceHeadBefore = gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]);
  let materialization;
  let gitContext;

  try {
    materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit, {
      gitRunner,
    });
    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      materialization.root,
      { sourceGitRunner: gitRunner },
    );
    assert.equal(await pathExists(join(materialization.root, ".git")), false);
    const sourceBefore = await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
      materialization.root,
      materialization.entries,
    );
    const contextBefore = RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext);
    const probe = spawnSync(
      process.execPath,
      [resolve(materialization.root, ...fixture.probeRelativePath.split("/"))],
      {
        cwd: materialization.root,
        env: RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext),
        encoding: "utf8",
        maxBuffer: 128 * 1024 * 1024,
        timeout: 180_000,
        windowsHide: true,
      },
    );
    assert.equal(probe.signal, null, "enclosing candidate Git probe was terminated");
    assert.equal(probe.status, 0, probe.stderr || probe.stdout);
    const summary = JSON.parse(probe.stdout);
    assert.equal(summary.outcome, "pass");
    assert.equal(summary.candidateCommit, candidateCommit);
    assert.match(summary.defaultFailure, /Unable to resolve candidate commit/u);
    assert.deepEqual(summary.nestedSource, sourceBefore);
    assert.deepEqual(summary.nestedContext, contextBefore);
    assert.deepEqual(summary.cleanup, {
      gitContextRemoved: true,
      materializationRemoved: true,
    });
    assert.deepEqual(
      await RELEASE_GATE_TEST_HOOKS.inspectExactMaterialization(
        materialization.root,
        materialization.entries,
      ),
      sourceBefore,
    );
    assert.deepEqual(RELEASE_GATE_TEST_HOOKS.inspectCandidateGitContext(gitContext), contextBefore);
    assert.equal(gitOutput(gitRunner, ["rev-parse", "--verify", "HEAD"]), sourceHeadBefore);
  } finally {
    try {
      if (gitContext !== undefined) {
        await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
      }
    } finally {
      try {
        if (materialization !== undefined) {
          await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
        }
      } finally {
        await rm(fixture.root, { recursive: true, force: true });
      }
    }
  }
});

test("canonical gate closes hostile host environment and binds effective authority", async () => {
  const fixture = await createGitBlobLoaderFixture();
  const gitRunner = createRecordedGitRunner(fixture.root, []);
  const candidateCommit = fixture.revisions.at(-1).commit;
  const hostileMarker = "swecircuit-hostile-environment-canary";
  const hostile = {
    CUSTOM_RELEASE_SECRET: hostileMarker,
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "core.hooksPath",
    GIT_CONFIG_VALUE_0: hostileMarker,
    NODE_OPTIONS: `--require=${hostileMarker}`,
    NODE_PATH: hostileMarker,
    npm_config_registry: `https://${hostileMarker}.invalid`,
    npm_config_script_shell: hostileMarker,
  };
  const previous = new Map(Object.keys(hostile).map((key) => [key, process.env[key]]));
  let materialization;
  let gitContext;

  try {
    Object.assign(process.env, hostile);
    materialization = await RELEASE_GATE_TEST_HOOKS.materializeCandidateSource(candidateCommit, {
      gitRunner,
    });
    gitContext = await RELEASE_GATE_TEST_HOOKS.createCandidateGitContext(
      candidateCommit,
      materialization.root,
      { sourceGitRunner: gitRunner },
    );
    const environment = RELEASE_GATE_TEST_HOOKS.commandEnvironment(gitContext);

    for (const key of [
      "CUSTOM_RELEASE_SECRET",
      "GIT_CONFIG_COUNT",
      "GIT_CONFIG_KEY_0",
      "GIT_CONFIG_VALUE_0",
      "NODE_OPTIONS",
      "NODE_PATH",
      "npm_config_registry",
    ]) {
      assert.equal(environment[key], undefined, key);
    }
    assert.notEqual(environment.npm_config_script_shell, hostileMarker);
    assert.equal(environment.PATH.includes(hostileMarker), false);
    assert.equal(environment.npm_config_offline, "true");
    assert.equal(environment.npm_config_ignore_scripts, "true");
    assert.equal(environment.GIT_CONFIG_NOSYSTEM, "1");
    assert.equal(environment.GIT_TERMINAL_PROMPT, "0");
    assert.equal(Object.hasOwn(environment, "SWECIRCUIT_HOST_DEPENDENCY_ROOT"), false);
    assert.equal(
      environment[RELEASE_GATE_TEST_HOOKS.typeScriptEntrypointEnvironmentKey],
      undefined,
    );

    const binding = await RELEASE_GATE_TEST_HOOKS.executionEnvironmentBinding(
      environment,
      gitContext.runtime,
    );
    assert.deepEqual(binding.effective, environment);
    assert.equal(binding.policy.allowlist, "exact-effective-map");
    assert.equal(binding.policy.nodeOptions, "absent");
    assert.equal(binding.policy.nodePath, "absent");
    assert.equal(binding.npm.userConfig.bytes, 0);
    assert.equal(binding.npm.globalConfig.bytes, 0);

    assert.equal(
      await pathExists(join(materialization.root, "node_modules", "typescript", "bin", "tsc")),
      false,
      "candidate compiler must not exist before exact-lock installation",
    );
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    try {
      if (gitContext !== undefined) {
        await RELEASE_GATE_TEST_HOOKS.removeCandidateGitContext(gitContext.root);
      }
      if (materialization !== undefined) {
        await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
      }
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
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
    /materialization = await materializeCandidateSource\(candidateCommit\);/u,
  );
  assert.match(
    mainSource,
    /gitContext = await createCandidateGitContext\(candidateCommit, materialization\.root\);/u,
  );
  assert.ok(
    mainSource.indexOf("await reserveCandidateEvidenceSlot(outputs)") <
      mainSource.indexOf("materialization = await materializeCandidateSource(candidateCommit)"),
  );
  assert.match(
    mainSource,
    /await cleanupFailedCandidatePreparation\(outputs, materialization, gitContext\);/u,
  );
  assert.match(
    mainSource,
    /try \{[\s\S]*?runtime = runtimeIdentity\(\);[\s\S]*?\} catch \(error\) \{/u,
  );
  assert.match(mainSource, /await publishCandidateReceipt\(/u);
  assert.match(mainSource, /renderError\(error\)/u);
  assert.doesNotMatch(mainSource, /writeFile\(outputs\.receipt/u);
  assert.doesNotMatch(
    mainSource,
    /Promise\.all\(\[\s*writeFile\(outputs\.stdout[\s\S]*?writeFile\(outputs\.stderr/u,
  );
  assert.match(mainSource, /const environment = commandEnvironment\(gitContext\);/u);
  assert.match(
    mainSource,
    /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: materialization\.root,[\s\S]*?env: environment,/u,
  );
  assert.doesNotMatch(mainSource, /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: ROOT,/u);
  assert.match(mainSource, /removeGeneratedBuildOutput\(materialization\.root/u);
  assert.match(mainSource, /inspectExactMaterialization\(materialization\.root/u);
  assert.match(mainSource, /strategy: GIT_CONTEXT_STRATEGY/u);
  assert.match(mainSource, /await removeCandidateGitContext\(gitContext\.root\);/u);
  assert.match(mainSource, /materializationDigestAfter === materialization\.source\.digest/u);
  assert.match(mainSource, /cleanupError: materializationCleanupError/u);
  assert.match(mainSource, /environmentBinding = await executionEnvironmentBinding/u);
  assert.match(mainSource, /toolchainBefore = await inspectToolchain/u);
  assert.match(mainSource, /candidateDependencies\.ready/u);
  assert.match(mainSource, /inspectRuntimeAncestorSupply\(materialization\.root\)/u);
  assert.match(mainSource, /const stdoutHandle = await open\(outputs\.stdout, "r\+"\);/u);
  assert.match(mainSource, /candidateDependencies = await installCandidateDependencies/u);
  assert.match(
    mainSource,
    /JSON\.stringify\(candidateDependencies\.closure\) ===[\s\S]*?JSON\.stringify\(candidateDependenciesAfter\)/u,
  );
  assert.match(mainSource, /candidateDependencyRemoved/u);
  assert.match(mainSource, /candidateDependencyAbsentAfter === true/u);
  assert.match(
    mainSource,
    /JSON\.stringify\(toolchainBefore\) === JSON\.stringify\(toolchainAfter\)/u,
  );
  assert.match(mainSource, /candidateDependencyCleanupAttempted/u);
  assert.match(mainSource, /ancestorSupplyPreserved/u);
  assert.match(mainSource, /candidateDependencies\.lock\.platform === runtime\.platform/u);
  assert.match(mainSource, /executionAuthority: \{\s*environment: environmentBinding,\s*runtime,/u);
  assert.match(mainSource, /let operationError = null;/u);
  assert.match(mainSource, /operationError = normalizedError\(error\);/u);
  assert.match(mainSource, /operationError === null/u);
  assert.match(mainSource, /operationError,\s*result: passed \? "pass" : "fail"/u);
  assert.match(mainSource, /apiVersion: "swecircuit\/release-gate\/v1alpha4"/u);
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
  assert.match(reviewHarnessSource, /validateCandidateDependencies\([\s\S]*?candidateTree/u);
  assert.match(reviewHarnessSource, /candidate-private-exact-lock-offline-npm-ci/u);
  assert.match(reviewHarnessSource, /const authenticatedInstallCommand =/u);
  assert.doesNotMatch(reviewHarnessSource, /portableInstallCommand/u);
  assert.match(reviewHarnessSource, /npmLauncher\.commandPath/u);
  assert.match(reviewHarnessSource, /realpathSync\.native\(value\.commandPath\)/u);
  assert.match(
    reviewHarnessSource,
    /command\.executable === value\.toolchain\.before\.node\.path/u,
  );
  assert.match(reviewHarnessSource, /value\.toolchain\.before\.npmCli\.path, "run", "verify"/u);
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
  const selectedPaths = [...contextsByOriginalPath.keys()]
    .filter((path) => !RELEASE_REVIEW_TEST_HOOKS.isCorrectionNavigationDuplicate(path))
    .sort();
  const selectedSources = selectedPaths.map((path) => ({ path }));
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

test("paths mode remains closed and rejects malformed candidate identities", async () => {
  const candidate = "0123456789abcdef0123456789abcdef01234567";
  const fixture = await createReleaseGatePathFixture();

  try {
    const valid = runFixtureNode(fixture.root, [fixture.gatePath, "paths", candidate]);
    assert.equal(valid.status, 0, valid.stderr);
    assert.deepEqual(JSON.parse(valid.stdout), {
      candidateCommit: candidate,
      receipt: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate-receipt.json`,
      stdout: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate.stdout.log`,
      stderr: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/${candidate}/canonical-gate.stderr.log`,
    });

    const malformed = runFixtureNode(fixture.root, [fixture.gatePath, "paths", "A".repeat(40)]);
    assert.equal(malformed.status, 1);
    assert.equal(
      malformed.stderr,
      "Usage: node scripts/run-v12-release-gate.mjs [paths] <exact-40-character-candidate-commit>\n",
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
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
  const glibcSupply = RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(lockBytes, {
    platform: "linux",
    architecture: "x64",
    libc: "glibc",
  });
  const muslSupply = RELEASE_REVIEW_PARENT_TEST_HOOKS.validateLockSupply(lockBytes, {
    platform: "linux",
    architecture: "x64",
    libc: "musl",
  });
  const applies = (supply, packagePath) =>
    supply.entries.find((entry) => entry.path === packagePath)?.applies;
  const glibcBiome = "node_modules/@biomejs/cli-linux-x64";
  const muslBiome = "node_modules/@biomejs/cli-linux-x64-musl";
  assert.equal(applies(glibcSupply, glibcBiome), true);
  assert.equal(applies(glibcSupply, muslBiome), false);
  assert.equal(applies(muslSupply, glibcBiome), false);
  assert.equal(applies(muslSupply, muslBiome), true);
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

test("operation-root cleanup canonicalizes aliases and rejects unowned roots", async () => {
  assert.notEqual(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("/tmp", "linux"),
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("/TMP", "linux"),
  );
  assert.notEqual(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("/var", "darwin"),
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("/VAR", "darwin"),
  );
  assert.equal(
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("C:\\Temp", "win32"),
    RELEASE_REVIEW_PARENT_TEST_HOOKS.pathAlias("c:\\temp", "win32"),
  );
  const temporaryRoot = await realpath(resolve(tmpdir()));
  const owned = await mkdtemp(join(resolve(tmpdir()), "swr2-"));
  await RELEASE_REVIEW_PARENT_TEST_HOOKS.removeOperationRoot(owned);
  assert.equal(await pathExists(owned), false);

  const wrongPrefix = await mkdtemp(join(temporaryRoot, "swecircuit-unowned-"));
  const nestedParent = await mkdtemp(join(temporaryRoot, "swecircuit-cleanup-parent-"));
  const nested = await mkdtemp(join(nestedParent, "swr2-"));
  const linkedTarget = await mkdtemp(join(temporaryRoot, "swecircuit-cleanup-target-"));
  const linkedRoot = await mkdtemp(join(temporaryRoot, "swr2-link-"));
  await rm(linkedRoot, { recursive: true, force: true });
  await symlink(linkedTarget, linkedRoot, process.platform === "win32" ? "junction" : "dir");

  try {
    for (const root of [wrongPrefix, nested, linkedRoot]) {
      await assert.rejects(
        RELEASE_REVIEW_PARENT_TEST_HOOKS.removeOperationRoot(root),
        /unexpected operation root/u,
      );
      assert.equal(await pathExists(root), true);
    }
  } finally {
    await rm(wrongPrefix, { recursive: true, force: true });
    await rm(nestedParent, { recursive: true, force: true });
    await rm(linkedRoot, { recursive: true, force: true });
    await rm(linkedTarget, { recursive: true, force: true });
  }
});

test("installed npm 10 or newer uses exact production private configs and rejects the old alias", async () => {
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
    const npmVersion = version.stdout.toString("utf8").trim();
    const npmMajor = Number.parseInt(npmVersion.split(".")[0], 10);
    assert.equal(Number.isSafeInteger(npmMajor) && npmMajor >= 10, true, npmVersion);
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
