import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { copyFile, link, mkdir, mkdtemp, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { RELEASE_REVIEW_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_REVIEW_HANDOFF_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs";
import { RELEASE_REVIEW_PARENT_TEST_HOOKS } from "../scripts/run-v12-release-review.mjs";
import {
  R22_OUTPUT_IDENTITIES,
  V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS,
  runReleaseReviewProductionLifecycle,
} from "./helpers/v12-release-review-lifecycle.mjs";

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
const HOST_CACHE_PROBE_SOURCE_PATHS = Object.freeze([
  "scripts/run-v12-release-gate.mjs",
  "scripts/run-v12-release-review.mjs",
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
  "test/helpers/v12-release-review-lifecycle.mjs",
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
  for (const key of Object.keys(environment)) {
    if (key.toLowerCase() === "npm_config_cache") {
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
    paths.push(`${root}/approval.json`);
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
  const root = await mkdtemp(join(tmpdir(), "swecircuit-host-cache-copy-"));
  const sourceRoot = join(root, "isolated-candidate");
  const externalCache = join(root, "external-host-cache");
  const sentinel = Buffer.from("external host cache sentinel\n", "utf8");
  try {
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
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("isolated copied production entrypoints complete one exact compile-to-verify lifecycle", {
  timeout: 3_600_000,
}, async () => {
  const lifecycle = await runReleaseReviewProductionLifecycle();
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

  for (const [path, expected] of Object.entries(R22_OUTPUT_IDENTITIES)) {
    assert.deepEqual(lifecycle.sourceFrozenBefore[path], expected);
    assert.deepEqual(lifecycle.cleanup.sourceFrozenAfter[path], expected);
  }
  assert.equal(lifecycle.cleanup.attempted, true);
  assert.equal(lifecycle.cleanup.rootRemoved, true);
  assert.equal(lifecycle.cleanup.sourceStatusUnchanged, true);
  assert.ok(lifecycle.lifecycleDurationMs > 0);
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
  const root = await mkdtemp(join(tmpdir(), "swecircuit-r19-resolver-"));
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
    "node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs",
  );
  for (const command of ["format", "format:check", "lint"]) {
    for (const path of ["scripts/run-v12-release-review.mjs", HARNESS_PATH, VERIFIER_PATH]) {
      assert.ok(packageJson.scripts[command].includes(path), `${command}: ${path}`);
    }
  }
});
test("active release status avoids candidate-ordinal drift and preserves outcome distinctions", () => {
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
    assert.doesNotMatch(activeStatus(path), /\bCandidates?\s+\d+\b/u, path);
  }

  const testPlanStatus = activeStatus("docs/specs/v12-ide-run-loop/test-plan.md");
  assert.match(testPlanStatus, /Package identity verification and handoff schema verification/u);
  assert.match(testPlanStatus, /Revision 1 has incomplete fan-in/u);
  assert.match(testPlanStatus, /Revisions 2 and 3 retain \x60split\x60 workflow outcomes/u);
  assert.match(
    testPlanStatus,
    /Later correction phases retain their recorded \x60pass\x60 routes/u,
  );
  assert.match(testPlanStatus, /releaseReady: false/u);
});

test("live release routing sections avoid consumed candidate ordinals", () => {
  const liveSections = [
    ["docs/memory/active-context.md", ["Next Likely Work"]],
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
    ["docs/specs/v12-ide-run-loop/tasks.md", ["Parallelization"]],
    ["docs/specs/v12-ide-run-loop/test-plan.md", ["Current Evidence"]],
  ];

  for (const [path, headings] of liveSections) {
    for (const heading of headings) {
      assert.doesNotMatch(
        activeSection(path, heading),
        /\bCandidates?\s+\d+\b/u,
        `${path} ${heading}`,
      );
    }
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

  const throughEleven = RELEASE_REVIEW_TEST_HOOKS.discoverCorrectionEvidenceSpecs(
    correctionPathsThrough(11),
  );
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
