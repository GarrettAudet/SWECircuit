# Revision 40 Test Plan

## Focused

- Syntax-check the corrected release-review harness.
- Prove complete marker triads are included.
- Prove diagnostic-only numbered roots are ignored.
- Prove partial marker sets fail closed.
- Prove the exact Candidate 16 tree resolves to Revisions 1 through 22.
- Prove the lifecycle production-identity pin matches current source bytes.

## Release Harness

- Run `test/v12-release-gate.test.mjs` and `test/v12-release-review.test.mjs` together.
- Require 50 of 50 tests to pass outside the restricted process sandbox.

## Repository

- Run format, lint, typecheck, template checking, strict V11 replay, and `npm.cmd run verify`.
- Bind exact raw verification evidence before freezing the successor.

## Release

- Commit a new source identity.
- Run its canonical gate exactly once.
- Require fresh three-domain R2 review, hosted CI, milestone closeout, and owner merge.
