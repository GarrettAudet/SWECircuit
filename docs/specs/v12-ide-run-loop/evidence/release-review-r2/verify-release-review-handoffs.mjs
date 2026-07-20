import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const handoffPaths = process.argv.slice(2);

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

  const expectedAgentIds = specialistPackage.manifest.agents
    .map((agent) => agent.agentId)
    .sort();
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
