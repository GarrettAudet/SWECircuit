import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const REPOSITORY_ROOT = new URL("../../../", import.meta.url);
const EVIDENCE_URL = new URL(
  "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/browser/qa-result.json",
  REPOSITORY_ROOT
);

async function sha256(url) {
  return createHash("sha256").update(await readFile(url)).digest("hex");
}

test("browser evidence is complete and bound to the exact app sources and screenshots", async () => {
  const evidence = JSON.parse(await readFile(EVIDENCE_URL, "utf8"));
  assert.equal(evidence.schemaVersion, 1);
  assert.equal(evidence.target, "http://127.0.0.1:4174/");

  const requiredAssertions = [
    "add_check",
    "status_transition",
    "filter_passed",
    "reload_persistence",
    "delete_check",
    "delete_focus_recovery",
    "add_shortcut_focus",
    "reduced_motion_branch",
    "no_horizontal_overflow",
    "console_clean"
  ];
  assert.deepEqual(
    evidence.assertions.map(({ id }) => id),
    requiredAssertions
  );
  assert.ok(evidence.assertions.every(({ status }) => status === "pass"));

  assert.equal(evidence.desktop.observedInnerWidth, 1280);
  assert.ok(evidence.desktop.observedMainWidth >= 1200);
  assert.equal(evidence.mobile.observedScrollWidth, evidence.mobile.observedClientWidth);
  assert.equal(evidence.mobile.prefersReducedMotion, true);
  assert.equal(evidence.mobile.addShortcutFocused, "check-title");
  assert.deepEqual(evidence.console, { warnings: 0, errors: 0 });

  for (const source of evidence.sourceFiles) {
    assert.equal(await sha256(new URL(source.path, REPOSITORY_ROOT)), source.sha256, source.path);
  }
  for (const screenshot of evidence.screenshots) {
    assert.equal(
      await sha256(new URL(screenshot.path, REPOSITORY_ROOT)),
      screenshot.sha256,
      screenshot.path
    );
  }
});
