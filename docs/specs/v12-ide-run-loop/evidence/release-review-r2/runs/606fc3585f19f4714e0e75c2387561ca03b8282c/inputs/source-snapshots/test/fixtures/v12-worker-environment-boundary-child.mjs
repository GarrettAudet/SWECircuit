import assert from "node:assert/strict";

import { RELEASE_REVIEW_TEST_HOOKS } from "../../docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
import { RELEASE_REVIEW_HANDOFF_TEST_HOOKS } from "../../docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs";

const target = process.argv[2];
const expected = JSON.parse(Buffer.from(process.argv[3] ?? "", "base64url").toString("utf8"));
const hooks =
  target === "harness"
    ? RELEASE_REVIEW_TEST_HOOKS
    : target === "verifier"
      ? RELEASE_REVIEW_HANDOFF_TEST_HOOKS
      : null;
assert.ok(hooks, "probe target must be harness or verifier");

const actual = hooks.validateEffectiveWorkerEnvironment(expected);
process.stdout.write(
  `${JSON.stringify({
    target,
    contentDigest: actual.contentDigest,
    entries: actual.entries.length,
  })}\n`,
);
