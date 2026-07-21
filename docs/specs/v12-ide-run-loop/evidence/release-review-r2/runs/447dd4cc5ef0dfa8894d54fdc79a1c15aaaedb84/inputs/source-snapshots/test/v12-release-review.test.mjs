import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { RELEASE_REVIEW_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_REVIEW_HANDOFF_TEST_HOOKS } from "../docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs";

const APPROVED_CHECKPOINT = "1b47e0ad10a5c3209fae53397892b7df3cd837be";
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const CORRECTION_ROOT = "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction";
const HARNESS_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const R9_ROOT = `${CORRECTION_ROOT}-r9`;

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
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
