import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { runV10Dogfood } from "../scripts/run-v10-dogfood.mjs";

test("the V10 executor dogfood trace is bounded, inspectable, and repeatable", async () => {
  const result = await runV10Dogfood({ checkEvidence: true });

  assert.equal(result.report.result, "pass");
  assert.deepEqual(result.report.preflightControl.diagnosticCodes, ["SC4206"]);
  assert.equal(result.report.preflightControl.executorCallsAfterFailure, 0);
  assert.equal(result.report.assertions.correctedGrantInvokedOnce, true);
  assert.equal(result.report.assertions.journalInspectable, true);
  assert.equal(result.report.execution.disposition, "completed");
  assert.equal(result.report.trace.finalAttemptState, "completed");
  assert.match(result.report.trace.digest, /^sha256:[a-f0-9]{64}$/);
});

test("the V10 dogfood harness removes its owned workspace after an injected failure", async () => {
  let workspace;

  await assert.rejects(
    runV10Dogfood({
      onWorkspaceCreated(path) {
        workspace = path;
        throw new Error("injected failure");
      },
    }),
    /injected failure/,
  );

  assert.equal(typeof workspace, "string");
  assert.equal(existsSync(workspace), false);
});
