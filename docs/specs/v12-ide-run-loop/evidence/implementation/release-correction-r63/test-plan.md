# Revision 63 Test Plan

## Focused

- Confirm `.gitattributes` restores the V11-approved byte count and digest.
- Confirm the R61 stdout blob is unchanged and LF-only.
- Confirm the V11 dogfood runner test remains byte-for-byte unchanged.
- Decode and authenticate both R62 raw failure envelopes.
- Run strict V11 dogfood.
- Run the V12 release-gate and release-review suites.

## Pre-Freeze

- Run format, lint, typecheck, build, complete core tests, template checker, checker mutation
  tests, V10/V11/V12 dogfood, specialist example, package inspection, and installed consumer.
- Complete independent scope and release-boundary review.
- Freeze exact source identities and one Revision 63 commit.

## Exact Candidate

1. Run copied lifecycle from the exact commit.
2. Run the complete canonical verifier from the exact commit.
3. Run the non-consuming exact-candidate rehearsal.
4. Require all seven hosted CI jobs to pass.
5. Confirm a clean tracked worktree and an absent Revision 63 evidence slot.
6. Invoke the Revision 63 canonical gate exactly once.
7. On `pass`, run fresh three-domain R2 against the exact digest pair.

## Stop Rule

Any failed exact, hosted, canonical, or independent check retires Revision 63. A consumed
canonical gate is never rerun.
