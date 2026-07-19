import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assessSpecialistHandoffs,
  verifySpecialistHandoff,
} from "../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const HANDOFFS = join(EVIDENCE, "handoffs");
const mode = process.argv[2] ?? "wave1";

const WAVE_ONE = [
  {
    name: "product-run-loop-review",
    agentId:
      "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
  },
  {
    name: "authority-portability-review",
    agentId:
      "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
  },
  {
    name: "lifecycle-recovery-review",
    agentId:
      "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486",
  },
];

const INTEGRATION = {
  name: "v12-run-loop-architecture",
  agentId:
    "agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145",
};

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.pointer}`)
      .join(",");
    throw new Error(`${stage} failed: ${diagnostics}`);
  }
  return result.value;
}

async function loadContext() {
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const approval = JSON.parse(
    await readFile(join(EVIDENCE, "approval.json"), "utf8"),
  );
  return { specialistPackage, expectation: approval.expectation };
}

async function verifyOne(context, expected) {
  const raw = await readFile(join(HANDOFFS, `${expected.name}.json`));
  const verified = requireValue(
    verifySpecialistHandoff(
      context.specialistPackage,
      context.expectation,
      raw,
    ),
    `${expected.name} handoff verification`,
  );
  if (verified.handoff.agent.id !== expected.agentId) {
    throw new Error(`${expected.name} handoff returned the wrong agent identity.`);
  }
  return { name: expected.name, raw, verified };
}

function summarize(entry) {
  return {
    name: entry.name,
    agentId: entry.verified.handoff.agent.id,
    outcome: entry.verified.handoff.outcome,
    rawBytes: entry.verified.rawBytes,
    rawDigest: entry.verified.rawDigest,
    semanticDigest: entry.verified.semanticDigest,
    verifiedDigest: entry.verified.verifiedDigest,
  };
}

async function verifyWaveOne(context) {
  const entries = await Promise.all(
    WAVE_ONE.map((expected) => verifyOne(context, expected)),
  );
  const assessment = requireValue(
    assessSpecialistHandoffs(
      context.specialistPackage,
      context.expectation,
      INTEGRATION.agentId,
      entries.map((entry) => entry.raw),
    ),
    "integration fan-in assessment",
  );
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ArchitectureWaveVerification",
    compilationDigest: context.expectation.compilationDigest,
    packageDigest: context.expectation.packageDigest,
    targetAgentId: INTEGRATION.agentId,
    verifiedHandoffs: entries.map(summarize),
    fanIn: assessment,
  };
  await writeFile(
    join(EVIDENCE, "wave1-verification.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!assessment.integrationReady) {
    process.exitCode = 2;
  }
}

async function verifyIntegration(context) {
  const entry = await verifyOne(context, INTEGRATION);
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ArchitectureIntegrationVerification",
    compilationDigest: context.expectation.compilationDigest,
    packageDigest: context.expectation.packageDigest,
    verifiedHandoff: summarize(entry),
  };
  await writeFile(
    join(EVIDENCE, "integration-verification.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (entry.verified.handoff.outcome !== "pass") {
    process.exitCode = 2;
  }
}

async function main() {
  const context = await loadContext();
  if (mode === "wave1") {
    await verifyWaveOne(context);
    return;
  }
  if (mode === "integration") {
    await verifyIntegration(context);
    return;
  }
  throw new Error(`Unknown mode: ${mode}`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
