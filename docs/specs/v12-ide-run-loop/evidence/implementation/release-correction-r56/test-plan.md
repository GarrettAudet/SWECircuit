# Revision 56 Test Plan

## Focused Checks

- The four R55 gate-only failures as one causal test selection.
- Complete `test/v12-release-gate.test.mjs` execution.
- Production source confirms default calls still use closed `runGit` behavior.
- Syntax, format, lint, diff, and source identities.

## Pre-Freeze Checks

- Complete release contract.
- Complete core suite.
- Template checker and release-status invariants.
- Independent read-only correction review.

## Post-Commit Gates

- Exact copied production lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact Revision 56 commit.
- Fresh three-lane R2 review.
- Hosted CI matrix.

## Stop Condition

Do not freeze or invoke the successor gate unless every pre-freeze check passes. Never rerun Revision 55's canonical gate.
