# Revision 62 Test Plan

## Focused

- Parse the changed helper and lifecycle test.
- Assert the named 30-minute positive-gate bound.
- Run `test/v12-release-gate.test.mjs` and `test/v12-release-review.test.mjs`.

## Pre-Freeze

- Run format, lint, typecheck, build, complete core tests, template checker, checker mutation
  tests, dogfood circuits, package inspection, and installed-consumer verification.
- Complete independent scope and release-boundary review.
- Freeze exact source identities and one Revision 62 commit.

## Exact Candidate

1. Run copied lifecycle from the exact commit.
2. Run the complete canonical verifier from the exact commit.
3. Run the non-consuming blob-only exact-candidate rehearsal.
4. Require all seven hosted CI jobs to pass.
5. Confirm a clean tracked worktree and an absent Revision 62 evidence slot.
6. Invoke the Revision 62 canonical gate exactly once.
7. On `pass`, run fresh three-domain R2 review against the exact digest pair.

## Stop Rule

Any failed exact, hosted, canonical, or independent check retires Revision 62. A consumed
canonical gate is never rerun.
