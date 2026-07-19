import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { verifySpecialistHandoff } from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const EXPECTED_AGENTS = new Map([
  [
    "visual",
    "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
  ],
  [
    "boundary",
    "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d",
  ],
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

async function main() {
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const approval = JSON.parse(
    await readFile(join(EVIDENCE, "approval.json"), "utf8"),
  );
  const verified = [];
  for (const [name, expectedAgentId] of EXPECTED_AGENTS) {
    const raw = await readFile(join(EVIDENCE, "handoffs", `${name}.json`));
    const result = requireValue(
      verifySpecialistHandoff(specialistPackage, approval.expectation, raw),
      `${name} handoff verification`,
    );
    if (result.handoff.agent.id !== expectedAgentId) {
      throw new Error(`${name} handoff returned the wrong agent identity.`);
    }
    verified.push({ name, ...result });
  }

  const integrationReady = verified.every(
    (entry) => entry.handoff.outcome === "pass",
  );
  const report = {
    apiVersion: "swecircuit/review-gate/v1alpha1",
    kind: "ExternalReviewGate",
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    verifiedHandoffs: verified,
    integrationReady,
    note:
      "Each raw handoff was verified by core. This external gate does not claim a SpecialistHandoffSetAssessment because the integration owner is not a dependent AgentBlueprint.",
  };
  await writeFile(
    join(EVIDENCE, "verified-handoffs.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        integrationReady,
        handoffs: verified.map((entry) => ({
          name: entry.name,
          agentId: entry.handoff.agent.id,
          outcome: entry.handoff.outcome,
          rawBytes: entry.rawBytes,
          rawDigest: entry.rawDigest,
          semanticDigest: entry.semanticDigest,
        })),
      },
      null,
      2,
    )}\n`,
  );
  if (!integrationReady) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
