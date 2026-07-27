import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const REPOSITORY_ROOT = new URL("../../../", import.meta.url);
const RECORD_URL = new URL(
  "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/integration-record.json",
  REPOSITORY_ROOT
);

async function sha256(path) {
  return createHash("sha256")
    .update(await readFile(new URL(path, REPOSITORY_ROOT)))
    .digest("hex");
}

test("post-fan-in integration evidence binds both RunView forms and browser evidence", async () => {
  const record = JSON.parse(await readFile(RECORD_URL, "utf8"));
  assert.equal(record.stage, "integrated_and_verified");
  assert.equal(record.sourceFanIn.runViewStage, "integration_ready");
  assert.equal(record.sourceFanIn.nextActionAtFanIn, "integrate_and_verify");
  assert.equal(record.currentGate, "independent_review");
  assert.equal(record.releaseAlphaApproved, false);

  assert.equal(
    await sha256(record.sourceFanIn.runViewJsonPath),
    record.sourceFanIn.runViewJsonSha256
  );
  assert.equal(
    await sha256(record.sourceFanIn.runViewMarkdownPath),
    record.sourceFanIn.runViewMarkdownSha256
  );
  assert.equal(
    await sha256(record.integratedArtifact.browserEvidence),
    record.integratedArtifact.browserEvidenceSha256
  );
  assert.ok(record.verification.every(({ result }) => result === "pass"));
});
