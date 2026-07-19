import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { verifySpecialistHandoff } from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const phase = process.argv[2];
const handoffPaths = process.argv.slice(3);

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
  if (phase === undefined || handoffPaths.length === 0) {
    throw new Error(
      "Usage: verify-phase-handoffs.mjs <phase> <raw-handoff> [raw-handoff...]",
    );
  }
  const phaseDirectory = join(EVIDENCE, phase);
  const specialistPackage = JSON.parse(
    await readFile(join(phaseDirectory, "package-envelope.json"), "utf8"),
  );
  const approval = JSON.parse(
    await readFile(join(phaseDirectory, "approval.json"), "utf8"),
  );
  const expectedAgentIds = specialistPackage.manifest.agents
    .map((agent) => agent.agentId)
    .sort();
  const verified = [];
  for (const handoffPath of handoffPaths) {
    const raw = await readFile(join(phaseDirectory, handoffPath));
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
  const phaseReady =
    complete && verified.every((entry) => entry.outcome === "pass");
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ImplementationPhaseHandoffVerification",
    phase,
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    expectedAgentIds,
    receivedAgentIds,
    complete,
    verifiedHandoffs: verified,
    phaseReady,
    note:
      "This is an external complete-package gate. Each raw handoff was verified by V11 core; a verified non-pass outcome remains a workflow route.",
  };
  await writeFile(
    join(phaseDirectory, "handoff-verification.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!phaseReady) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : "Unknown error"}\n`,
  );
  process.exitCode = 1;
});
