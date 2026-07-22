# Revision 27 Full Verify Attempt 1 Diagnosis

## Bound Input

- Checkpoint: `42c5ddb`.
- Command: `npm.cmd run verify`.
- This was mutable-source pre-freeze verification, not a canonical candidate gate.

## Failure Boundary

- Outcome: `fail`; total duration 2,389.8 seconds.
- Format passed: 101 files.
- Lint passed: 87 files with informational diagnostics only.
- Authenticated typecheck and build passed with the bound TypeScript 7.0.2 receipt.
- The chain stopped during `npm test`, before specialist examples, V10-V12 dogfood, package inspection, or installed-consumer verification.

## Diagnosis

The exact 37-minute lifecycle test lived inside `test/v12-release-review.test.mjs`, which was selected by the same parallel root glob as every core test. Node test-name filtering could not safely exclude the child because the containing file-level test matched the negative pattern. A diagnostic intended to omit the lifecycle therefore launched it again, reached its nested verify stage, and hit the diagnostic command's 30-minute bound.

No non-lifecycle failure appeared in the captured partial ledger. The timeout left one exact descendant process tree and four owned temporary roots. The six verified descendant PIDs were stopped, all four roots were path-checked, read-only Git object attributes were handled, and every owned root was removed. The Git worktree remained clean.

## Correction

- Move the exact lifecycle test unchanged to `test/lifecycle/v12-release-review-lifecycle.test.mjs`.
- Define `test:core` for `test/*.test.mjs` and `test:lifecycle` for `test/lifecycle/*.test.mjs`.
- Make `npm test` run build, core tests, then lifecycle serially.
- Make the V12 release-review test command run its core files before the lifecycle phase.
- Add a fast regression that binds the scripts and proves the lifecycle test is absent from the root file and present in the lifecycle file.
- Refresh the authenticated package identity used by the copied lifecycle.

## Core Isolation Follow-Up

Checkpoint `2b9f5a7` ran the new core-only phase and returned 433 passes and 2 failures in 457,860.2749 ms. The failures were exact closure drift from Revision 27:

- The fresh-process cache probe copied `scripts/run-v12-release-gate.mjs` without its new `scripts/run-typescript.mjs` dependency.
- A static release-review script assertion retained the pre-partition command.

The probe source bundle and script assertion were corrected. Both focused regressions then passed, 2 of 2, in 648.9753 ms.
## Route

Route: `diagnose -> redesign test scheduling -> verify`. Release remains blocked until core, lifecycle, full verify, and independent review pass from exact checkpoints.
