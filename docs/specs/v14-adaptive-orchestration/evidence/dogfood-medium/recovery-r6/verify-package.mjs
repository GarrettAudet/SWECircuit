import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SPECIALIST_API_VERSION,
  verifySpecialistPackage,
} from "../../../../../../dist/index.js";

const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ENVELOPE_PATH = join(EVIDENCE, "package-envelope.json");
const MANIFEST_PATH = join(EVIDENCE, "package", "manifest.json");
const SUMMARY_PATH = join(EVIDENCE, "team-summary.json");
const RECEIPT_PATH = join(EVIDENCE, "receipts", "package-verification.json");

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function binding(path, bytes) {
  return { path, digest: digest(bytes), bytes: bytes.byteLength };
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(
      `${label}: ${result.diagnostics.map((item) => `${item.code}:${item.message}`).join(", ")}`,
    );
  }
  return result.value;
}

async function main() {
  const [packageEnvelopeBytes, manifestBytes, summaryBytes] = await Promise.all([
    readFile(PACKAGE_ENVELOPE_PATH),
    readFile(MANIFEST_PATH),
    readFile(SUMMARY_PATH),
  ]);
  const specialistPackage = JSON.parse(packageEnvelopeBytes.toString("utf8"));
  const expectation = JSON.parse(summaryBytes.toString("utf8")).expectation;
  requireValue(
    "verify revision-6 package",
    verifySpecialistPackage(specialistPackage, expectation),
  );

  const base =
    "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r6";
  const receipt = {
    apiVersion: "swecircuit/dogfood-package-verification-receipt/v1alpha1",
    kind: "DogfoodPackageVerificationReceipt",
    outcome: "pass",
    verifiedBy: "codex.main",
    verifier: {
      operation: "verifySpecialistPackage",
      specialistApiVersion: SPECIALIST_API_VERSION,
    },
    expectation,
    packageEnvelope: binding(`${base}/package-envelope.json`, packageEnvelopeBytes),
    manifest: binding(`${base}/package/manifest.json`, manifestBytes),
    candidateLaunchApproved: false,
  };

  await mkdir(dirname(RECEIPT_PATH), { recursive: true });
  await writeFile(RECEIPT_PATH, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
}

await main();
