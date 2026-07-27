import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { verifySpecialistHandoff, verifySpecialistPackage } from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const packageEnvelope = JSON.parse(await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"));
const expectation = {
  compilationDigest: packageEnvelope.compilationDigest,
  packageDigest: packageEnvelope.packageDigest,
};

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

requireValue("adaptive package", verifySpecialistPackage(packageEnvelope, expectation));

for (const name of process.argv.slice(2)) {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error(`Invalid handoff name: ${name}`);
  }
  const raw = new Uint8Array(await readFile(join(EVIDENCE, "handoffs", `${name}-raw.txt`)));
  const verified = requireValue(
    `${name} handoff`,
    verifySpecialistHandoff(packageEnvelope, expectation, raw),
  );
  const summary = {
    outcome: "pass",
    agentId: verified.handoff.agent.id,
    workflowOutcome: verified.handoff.outcome,
    rawBytes: verified.rawBytes,
    rawDigest: verified.rawDigest,
    semanticDigest: verified.semanticDigest,
    artifactBindings: verified.artifactBindings,
    contentDigest: verified.contentDigest,
  };
  await writeFile(
    join(EVIDENCE, "handoffs", `${name}-verification.json`),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify({ name, ...summary })}\n`);
}
