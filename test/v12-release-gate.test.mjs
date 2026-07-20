import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { RELEASE_GATE_TEST_HOOKS } from "../scripts/run-v12-release-gate.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const RELEASE_GATE_PATH = join(ROOT, "scripts/run-v12-release-gate.mjs");
const REVIEW_HARNESS_PATH = join(
  ROOT,
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
);
const releaseGateSource = await readFile(RELEASE_GATE_PATH, "utf8");
const reviewHarnessSource = await readFile(REVIEW_HARNESS_PATH, "utf8");

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
  } finally {
    await RELEASE_GATE_TEST_HOOKS.removeMaterialization(materialization.root);
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
    /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: materialization\.root,[\s\S]*?env: commandEnvironment\(\),/u,
  );
  assert.doesNotMatch(mainSource, /spawnSync\(COMMAND\.executable,[\s\S]*?cwd: ROOT,/u);
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
