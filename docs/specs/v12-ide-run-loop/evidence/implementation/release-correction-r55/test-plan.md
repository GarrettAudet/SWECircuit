# Revision 55 Test Plan

## Focused Checks

- Updated TypeScript authority contract.
- Complete TypeScript toolchain test file.
- Active release-status invariant.
- Complete 61-test release contract.
- Complete 458-test core suite.
- Format, lint, typecheck, template, syntax, identities, and diff.
- Independent exact-byte review.

## Post-Commit Gates

- Exact copied production lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact successor commit.
- Fresh three-lane R2.
- Hosted CI.

## Stop Condition

Do not invoke the canonical gate until the exact committed lifecycle and full verifier pass.
