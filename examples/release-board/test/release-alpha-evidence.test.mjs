import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const REPOSITORY_ROOT = new URL("../../../", import.meta.url);
const ATTESTATION_URL = new URL(
  "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/release-alpha-attestation.json",
  REPOSITORY_ROOT
);

async function sha256(path) {
  return createHash("sha256")
    .update(await readFile(new URL(path, REPOSITORY_ROOT)))
    .digest("hex");
}

test("small Windows alpha attestation binds integration and independent review evidence", async () => {
  const attestation = JSON.parse(await readFile(ATTESTATION_URL, "utf8"));
  assert.equal(attestation.kind, "small_windows_alpha_attestation");
  assert.equal(attestation.smallWindowsAlphaUsable, true);
  assert.equal(attestation.generalV14ReleaseApproved, false);
  assert.equal(attestation.independentReview.verdict, "pass");
  assert.equal(attestation.independentReview.findings, 0);
  assert.ok(attestation.remainingGates.length >= 6);

  assert.equal(
    await sha256(attestation.integrationRecord.path),
    attestation.integrationRecord.sha256
  );
  assert.equal(
    await sha256(attestation.independentReview.path),
    attestation.independentReview.sha256
  );
});
