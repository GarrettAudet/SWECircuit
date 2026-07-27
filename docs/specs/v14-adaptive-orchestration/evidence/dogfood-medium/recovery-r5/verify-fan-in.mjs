import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assessSpecialistHandoffs,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function main() {
  const [targetAgentId, ...handoffPaths] = process.argv.slice(2);
  if (targetAgentId === undefined || handoffPaths.length === 0) {
    throw new Error("Usage: verify-fan-in.mjs <targetAgentId> <handoffPath>...");
  }

  const specialistPackage = await readJson(join(EVIDENCE, "package-envelope.json"));
  const summary = await readJson(join(EVIDENCE, "team-summary.json"));
  const expectation = summary.expectation;
  requireValue(
    "verify successor package",
    verifySpecialistPackage(specialistPackage, expectation),
  );

  const raws = await Promise.all(
    handoffPaths.map((path) => readFile(join(ROOT, path))),
  );
  const verified = raws.map((raw, index) =>
    requireValue(
      `verify handoff ${handoffPaths[index]}`,
      verifySpecialistHandoff(specialistPackage, expectation, raw),
    ),
  );
  const assessment = requireValue(
    `assess fan-in for ${targetAgentId}`,
    assessSpecialistHandoffs(specialistPackage, expectation, targetAgentId, raws),
  );
  if (!assessment.integrationReady) {
    throw new Error(`Fan-in is not integration-ready: ${JSON.stringify(assessment)}`);
  }

  const output = {
    outcome: "pass",
    targetAgentId,
    sourcePaths: handoffPaths,
    verified: verified.map((entry) => ({
      agentId: entry.handoff.agent.id,
      outcome: entry.handoff.outcome,
      rawBytes: entry.rawBytes,
      rawDigest: entry.rawDigest,
      semanticDigest: entry.semanticDigest,
    })),
    assessment,
  };
  const outputPath = join(EVIDENCE, "assessments", `${targetAgentId}.json`);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

await main();
