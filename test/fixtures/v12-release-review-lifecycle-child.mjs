import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";

import { runReleaseReviewProductionLifecycle } from "../helpers/v12-release-review-lifecycle.mjs";

const suppliedOutputPath = process.argv[2];
assert.equal(typeof suppliedOutputPath, "string", "lifecycle output path is required");
const outputPath = resolve(suppliedOutputPath);
assert.equal(isAbsolute(outputPath), true, "lifecycle output path must be absolute");

const lifecycle = await runReleaseReviewProductionLifecycle();
await writeFile(outputPath, `${JSON.stringify(lifecycle)}\n`, {
  encoding: "utf8",
  flag: "wx",
});

process.stdout.write(
  `${JSON.stringify({
    outcome: lifecycle.outcome,
    rootRemoved: lifecycle.cleanup.rootRemoved,
    sourceStatusUnchanged: lifecycle.cleanup.sourceStatusUnchanged,
  })}\n`,
);
