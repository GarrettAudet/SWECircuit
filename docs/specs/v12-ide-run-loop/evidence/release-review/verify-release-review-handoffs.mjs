import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { verifySpecialistHandoff } from "../../../../../dist/index.js";

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

async function main() {
  if (handoffPaths.length === 0) {
    throw new Error(
      "Usage: verify-release-review-handoffs.mjs <raw-handoff> [raw-handoff...]",
    );
  }
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const approval = JSON.parse(
    await readFile(join(EVIDENCE, "approval.json"), "utf8"),
  );
  const expectedAgentIds = specialistPackage.manifest.agents
    .map((agent) => agent.agentId)
    .sort();
  const verified = [];
  for (const handoffPath of handoffPaths) {
    const raw = await readFile(join(EVIDENCE, handoffPath));
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
  const receivedAgentIds = verified.map((entry) => entry.agentId).sort();
  const uniqueAgentIds = new Set(receivedAgentIds);
  const complete =
    uniqueAgentIds.size === receivedAgentIds.length &&
    expectedAgentIds.length === receivedAgentIds.length &&
    expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]);
  const releaseReady =
    complete && verified.every((entry) => entry.outcome === "pass");
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ReleaseReviewHandoffVerification",
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    expectedAgentIds,
    receivedAgentIds,
    complete,
    verifiedHandoffs: verified,
    releaseReady,
    note:
      "Every raw reviewer handoff is verified against the owner-approved package. A verified non-pass outcome remains a workflow route and cannot authorize release.",
  };
  await writeFile(
    join(EVIDENCE, "handoff-verification.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!releaseReady) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : "Unknown error"}\n`,
  );
  process.exitCode = 1;
});
