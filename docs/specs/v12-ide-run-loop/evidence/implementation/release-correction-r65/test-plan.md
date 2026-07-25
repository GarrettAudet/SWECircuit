# Revision 65 Test Plan

## Focused

- Parse the release gate, lifecycle helper, and release-gate tests.
- Run `test/v12-release-gate.test.mjs`.
- Run the complete V12 release-gate and release-review pair.
- Assert the exact scratch namespace, causal locked leaf, 54-character reduction, and Windows
  path headroom.
- Decode the preserved diagnostic streams and verify byte counts and SHA-256 digests.

## Broad

- Run format, lint, typecheck, build, template checking, and the checker mutation matrix.
- Run strict V11 dogfood.
- Run the complete canonical `npm.cmd run verify`.
- Confirm tracked whitespace and a clean staged candidate.
- Obtain independent final-delta review.

## Exact Candidate

1. Freeze and commit one exact Revision 65 source.
2. Run copied lifecycle from that commit.
3. Run the complete verifier from that commit.
4. Run the non-consuming exact-candidate rehearsal.
5. Require all seven hosted jobs to pass.
6. Confirm a clean worktree and an absent Revision 65 canonical evidence slot.
7. Invoke the Revision 65 canonical gate exactly once.
8. On `pass`, run fresh source-bound R2 reviewers across all three domains.
9. Close memory and the milestone, then merge to `main`.

## Failure Rule

Any failed exact, hosted, canonical, or independent check retires Revision 65. A consumed
canonical gate is never rerun.
