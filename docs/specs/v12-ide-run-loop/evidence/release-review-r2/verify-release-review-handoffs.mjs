import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";
import { RELEASE_REVIEW_TEST_HOOKS } from "./run-release-review.mjs";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const [candidate, ...handoffPaths] = process.argv.slice(2);
const EXPECTED_GOAL_ID = "v12.ide-run-loop.release-review-r2";
const EXPECTED_GOAL_REVISION = 1;
const EXPECTED_WORK_UNIT_IDS = Object.freeze([
  "review.r2.lifecycle-correctness",
  "review.r2.product-api-ide",
  "review.r2.security-trace-authority",
]);

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.pointer}`)
      .join(",");
    throw new Error(`${stage} failed: ${diagnostics}`);
  }
  return result.value;
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function compareOrdinal(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function absolute(path) {
  return join(ROOT, ...path.split("/"));
}

function assertExactKeys(value, expected, label) {
  requireCondition(
    value !== null && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object.`,
  );
  const actual = Object.keys(value);
  requireCondition(
    actual.length === expected.length &&
      actual.every((key, index) => key === expected[index]),
    `${label} is not closed or canonical.`,
  );
}

function assertExactStringArray(actual, expected, label) {
  requireCondition(
    Array.isArray(actual) &&
      actual.length === expected.length &&
      actual.every((value, index) => value === expected[index]),
    `${label} mismatch.`,
  );
}

function decodeCanonicalJson(bytes, label) {
  const snapshot = Buffer.from(bytes);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(snapshot);
  } catch {
    throw new Error(`${label} is not strict UTF-8.`);
  }
  const value = JSON.parse(text);
  requireCondition(
    `${JSON.stringify(value, null, 2)}\n` === text,
    `${label} is not canonical JSON with normalized LF.`,
  );
  return { bytes: snapshot, value };
}

async function readCanonicalJson(path) {
  return decodeCanonicalJson(await readFile(absolute(path)), path);
}

function expectedPackageAgentIds(
  specialistPackage,
  candidateCommit,
  runPaths,
  candidateManifestBinding,
) {
  const compilationFiles = specialistPackage.files.filter(
    (file) => file.path === "compilation.json",
  );
  requireCondition(
    compilationFiles.length === 1,
    "Approved release-review-r2 package has an unexpected compilation-file roster.",
  );
  const compilation = decodeCanonicalJson(
    Buffer.from(compilationFiles[0].content, "utf8"),
    "approved release-review-r2 compilation",
  ).value;
  requireCondition(
    compilation.goal?.id === EXPECTED_GOAL_ID &&
      compilation.goal.revision === EXPECTED_GOAL_REVISION &&
      compilation.goal.objective.includes(candidateCommit) &&
      Array.isArray(compilation.goal.workUnits) &&
      Array.isArray(compilation.goal.contextSources) &&
      Array.isArray(compilation.blueprints),
    "Approved release-review-r2 package goal binding mismatch.",
  );
  const candidateContext = compilation.goal.contextSources.find(
    (entry) => entry.id === "context.candidate-manifest",
  );
  requireCondition(
    candidateContext?.locator === `path:${runPaths.candidateManifest}` &&
      candidateContext.readScope === runPaths.candidateManifest &&
      candidateContext.bytes === candidateManifestBinding.bytes.byteLength &&
      candidateContext.digest === digest(candidateManifestBinding.bytes),
    "Approved release-review-r2 package is not bound to these exact candidate manifest bytes.",
  );

  const requestedWorkUnitIds = compilation.goal.workUnits
    .map((unit) => unit.id)
    .sort(compareOrdinal);
  assertExactStringArray(
    requestedWorkUnitIds,
    EXPECTED_WORK_UNIT_IDS,
    "Approved release-review-r2 request roster",
  );

  const blueprintWorkUnitIds = [];
  for (const blueprint of compilation.blueprints) {
    requireCondition(
      Array.isArray(blueprint.workUnitIds) &&
        blueprint.workUnitIds.length === 1 &&
        Array.isArray(blueprint.dependencies) &&
        blueprint.dependencies.length === 0,
      `Unexpected release-review-r2 blueprint shape: ${String(blueprint.id)}.`,
    );
    blueprintWorkUnitIds.push(blueprint.workUnitIds[0]);
  }
  blueprintWorkUnitIds.sort(compareOrdinal);
  assertExactStringArray(
    blueprintWorkUnitIds,
    EXPECTED_WORK_UNIT_IDS,
    "Approved release-review-r2 blueprint roster",
  );

  const blueprintAgentIds = compilation.blueprints
    .map((blueprint) => blueprint.id)
    .sort(compareOrdinal);
  const manifestAgentIds = specialistPackage.manifest.agents
    .map((agent) => agent.agentId)
    .sort(compareOrdinal);
  assertExactStringArray(
    manifestAgentIds,
    blueprintAgentIds,
    "Approved release-review-r2 manifest roster",
  );
  return manifestAgentIds;
}

function safeHandoffPath(path, runPaths) {
  requireCondition(
    typeof path === "string" && path.startsWith("handoffs/"),
    `Handoff path must be relative to the candidate handoffs directory: ${String(path)}.`,
  );
  const segments = path.split("/");
  requireCondition(
    segments.length === 2 &&
      segments.every((segment) => segment !== "" && segment !== "." && segment !== "..") &&
      !segments[1].includes("\\") &&
      // biome-ignore lint/suspicious/noControlCharactersInRegex: raw handoff paths reject every unsafe control.
      !/[\u0000-\u001f\u007f]/u.test(path),
    `Unsafe handoff path: ${path}.`,
  );
  requireCondition(path.endsWith(".json"), `Handoff must be JSON: ${path}.`);
  return { file: segments[1], path: `${runPaths.handoffs}/${segments[1]}` };
}

async function writeImmutableJson(path, value) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
  const output = absolute(path);
  try {
    const existing = await readFile(output);
    requireCondition(existing.equals(bytes), `Immutable output differs: ${path}.`);
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    await writeFile(output, bytes, { flag: "wx" });
  }
}

async function main() {
  requireCondition(
    typeof candidate === "string" && handoffPaths.length > 0,
    "Usage: verify-release-review-handoffs.mjs <candidate> handoffs/<raw-handoff.json> [handoffs/<raw-handoff.json>...]",
  );
  requireCondition(
    new Set(handoffPaths).size === handoffPaths.length,
    "Duplicate raw handoff path supplied.",
  );

  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(candidate);
  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(candidate);
  await RELEASE_REVIEW_TEST_HOOKS.verifyCheckpoint(candidate, runPaths);
  const reviewTooling =
    await RELEASE_REVIEW_TEST_HOOKS.authenticateReviewTooling(candidateTree);
  const candidateManifestBinding = await readCanonicalJson(runPaths.candidateManifest);
  const candidateManifest = candidateManifestBinding.value;
  assertExactKeys(
    candidateManifest,
    [
      "apiVersion",
      "kind",
      "version",
      "baselineCommit",
      "candidateCommit",
      "branch",
      "runRoot",
      "reviewTooling",
      "canonicalGate",
      "preIntegrationReview",
      "verifiedEvidenceSets",
      "correctionLineage",
      "reviewedSources",
    ],
    "candidate manifest",
  );
  requireCondition(
    candidateManifest.apiVersion === "swecircuit/release-candidate/v1alpha1" &&
      candidateManifest.kind === "ReleaseCandidateManifest" &&
      candidateManifest.candidateCommit === candidate &&
      candidateManifest.runRoot === runPaths.root &&
      JSON.stringify(candidateManifest.reviewTooling) === JSON.stringify(reviewTooling),
    "Candidate manifest does not bind this exact candidate and verifier identity.",
  );

  const specialistPackage = (await readCanonicalJson(runPaths.packageEnvelope)).value;
  const approval = (await readCanonicalJson(runPaths.approval)).value;
  assertExactKeys(
    approval,
    [
      "apiVersion",
      "kind",
      "goalId",
      "goalRevision",
      "candidateCommit",
      "approvedBy",
      "approvalBasis",
      "expectation",
    ],
    "release-review-r2 approval",
  );
  assertExactKeys(
    approval.expectation,
    ["compilationDigest", "packageDigest"],
    "release-review-r2 approval expectation",
  );
  requireCondition(
    approval.apiVersion === "swecircuit/review-approval/v1alpha1" &&
      approval.kind === "SpecialistReviewApproval" &&
      approval.goalId === EXPECTED_GOAL_ID &&
      approval.goalRevision === EXPECTED_GOAL_REVISION &&
      approval.candidateCommit === candidate,
    "Release-review-r2 approval is not candidate-bound.",
  );
  requireValue(
    verifySpecialistPackage(specialistPackage, approval.expectation),
    "Approval-bound release-review-r2 package verification",
  );

  const expectedAgentIds = expectedPackageAgentIds(
    specialistPackage,
    candidate,
    runPaths,
    candidateManifestBinding,
  );
  const verified = [];
  const seenAgentIds = new Set();
  for (const handoffPath of handoffPaths) {
    const resolved = safeHandoffPath(handoffPath, runPaths);
    const raw = await readFile(absolute(resolved.path));
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, approval.expectation, raw),
      `${handoffPath} verification`,
    );
    requireCondition(
      !seenAgentIds.has(value.handoff.agent.id),
      `Duplicate reviewer handoff supplied for agent ${value.handoff.agent.id}.`,
    );
    seenAgentIds.add(value.handoff.agent.id);
    verified.push({
      file: resolved.file,
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      rawBytes: value.rawBytes,
      rawDigest: value.rawDigest,
      semanticDigest: value.semanticDigest,
      contentDigest: value.contentDigest,
    });
  }

  verified.sort((left, right) => compareOrdinal(left.agentId, right.agentId));
  const receivedAgentIds = verified.map((entry) => entry.agentId);
  const complete =
    expectedAgentIds.length === receivedAgentIds.length &&
    expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]);
  const releaseReady = complete && verified.every((entry) => entry.outcome === "pass");
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ReleaseReviewHandoffVerification",
    phase: "release-review-r2",
    candidateCommit: candidate,
    runRoot: runPaths.root,
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    expectedAgentIds,
    receivedAgentIds,
    complete,
    verifiedHandoffs: verified,
    releaseReady,
    note:
      "Every exact raw reviewer handoff was verified against this candidate's owner-approved R2 package. A verified non-pass remains a workflow route and cannot authorize release.",
  };
  await writeImmutableJson(runPaths.handoffVerification, report);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!releaseReady) {
    process.exitCode = 2;
  }
}

export const RELEASE_REVIEW_HANDOFF_TEST_HOOKS = Object.freeze({
  decodeCanonicalJson,
  expectedPackageAgentIds,
  safeHandoffPath,
});

if (process.argv[1] && resolve(process.argv[1]) === resolve(SCRIPT_PATH)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
