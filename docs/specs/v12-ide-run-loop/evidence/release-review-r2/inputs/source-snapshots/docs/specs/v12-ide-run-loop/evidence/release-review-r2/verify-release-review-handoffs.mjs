import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const handoffPaths = process.argv.slice(2);
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

function assertExactStringArray(actual, expected, label) {
  requireCondition(
    Array.isArray(actual) &&
      actual.length === expected.length &&
      actual.every((value, index) => value === expected[index]),
    `${label} mismatch.`,
  );
}

function expectedPackageAgentIds(specialistPackage) {
  const compilationFiles = specialistPackage.files.filter(
    (file) => file.path === "compilation.json",
  );
  requireCondition(
    compilationFiles.length === 1,
    "Approved release-review-r2 package has an unexpected compilation-file roster.",
  );
  const compilation = JSON.parse(compilationFiles[0].content);
  requireCondition(
    compilation.goal?.id === EXPECTED_GOAL_ID &&
      compilation.goal.revision === EXPECTED_GOAL_REVISION &&
      Array.isArray(compilation.goal.workUnits) &&
      Array.isArray(compilation.blueprints),
    "Approved release-review-r2 package goal binding mismatch.",
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

function safeHandoffPath(path) {
  requireCondition(
    typeof path === "string" && path.startsWith("handoffs/"),
    `Handoff path must be relative to the handoffs directory: ${String(path)}.`,
  );
  const segments = path.split("/");
  requireCondition(
    segments.length === 2 && segments.every((segment) => segment !== "" && segment !== "." && segment !== ".."),
    `Unsafe handoff path: ${path}.`,
  );
  requireCondition(path.endsWith(".json"), `Handoff must be JSON: ${path}.`);
  return join(EVIDENCE, ...segments);
}

async function writeImmutableJson(path, value) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
  try {
    const existing = await readFile(path);
    requireCondition(existing.equals(bytes), `Immutable output differs: ${path}.`);
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    await writeFile(path, bytes, { flag: "wx" });
  }
}

async function main() {
  requireCondition(
    handoffPaths.length > 0,
    "Usage: verify-release-review-handoffs.mjs handoffs/<raw-handoff.json> [handoffs/<raw-handoff.json>...]",
  );
  requireCondition(
    new Set(handoffPaths).size === handoffPaths.length,
    "Duplicate raw handoff path supplied.",
  );

  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const approval = JSON.parse(
    await readFile(join(EVIDENCE, "approval.json"), "utf8"),
  );
  requireValue(
    verifySpecialistPackage(specialistPackage, approval.expectation),
    "Approval-bound release-review-r2 package verification",
  );

  const expectedAgentIds = expectedPackageAgentIds(specialistPackage);
  const verified = [];
  for (const handoffPath of handoffPaths) {
    const raw = await readFile(safeHandoffPath(handoffPath));
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, approval.expectation, raw),
      `${handoffPath} verification`,
    );
    verified.push({
      file: basename(handoffPath),
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      rawBytes: value.rawBytes,
      rawDigest: value.rawDigest,
      semanticDigest: value.semanticDigest,
      contentDigest: value.contentDigest,
    });
  }

  verified.sort((left, right) =>
    left.agentId < right.agentId ? -1 : left.agentId > right.agentId ? 1 : 0,
  );
  const receivedAgentIds = verified.map((entry) => entry.agentId);
  const complete =
    new Set(receivedAgentIds).size === receivedAgentIds.length &&
    expectedAgentIds.length === receivedAgentIds.length &&
    expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]);
  const releaseReady = complete && verified.every((entry) => entry.outcome === "pass");
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ReleaseReviewHandoffVerification",
    phase: "release-review-r2",
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    expectedAgentIds,
    receivedAgentIds,
    complete,
    verifiedHandoffs: verified,
    releaseReady,
    note:
      "Every exact raw reviewer handoff was verified against the owner-approved R2 package. A verified non-pass remains a workflow route and cannot authorize release.",
  };
  await writeImmutableJson(join(EVIDENCE, "handoff-verification.json"), report);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!releaseReady) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
