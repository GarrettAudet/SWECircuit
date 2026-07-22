# Revision 25 Test Plan

## Focused Regression

Run the focused release-review test that supplies mixed-case outer candidate Git variables and injected Git configuration tuples. Prove that fixture initialization, copied gate, and copied parent environments remove repository routing while retaining their declared runtime supplies.

## Source Checks

- Format and lint the lifecycle helper and release-review tests.
- Confirm Candidate 12 evidence bytes remain unchanged.
- Confirm no production kernel, package metadata, lock data, or release entrypoint changed.

## Complete Lifecycle

Run the complete isolated copied-production lifecycle once after the correction. Require the nested canonical gate, compile/approve/verify parent phases, raw handoff verification, negative routes, source immutability, and cleanup to pass.

## Pre-Freeze

- Run `npm.cmd run verify` from the mutable successor source.
- Run the workflow template checker and checker mutation matrix.
- Replay the V11 evidence verifier.
- Obtain an independent read-only semantic review over immutable snapshots of the exact correction and verification evidence.
- Only then freeze a new commit and run its canonical gate exactly once.
