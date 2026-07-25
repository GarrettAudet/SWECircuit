# Revision 66 Test Plan

## Focused

- Parse the release gate, lifecycle helper, and release tests.
- Run the four-level path-budget regression alone.
- Run the complete release-gate test file.
- Decode the R65 rehearsal streams and verify wrapper, stream, candidate, failure, and disposition
  identities.
- Run the complete release-gate and release-review pair.

## Broad

- Run format, lint, typecheck, build, core, dogfood, package, consumer, and workflow checker gates.
- Obtain independent final-delta review.

## Exact Candidate

1. Freeze and commit one exact Revision 66 source.
2. Run copied lifecycle from that commit.
3. Run the complete verifier from that commit.
4. Run the non-consuming exact-candidate rehearsal.
5. Require all seven hosted jobs to pass.
6. Confirm a clean worktree and absent Revision 66 canonical evidence slot.
7. Invoke the Revision 66 canonical gate exactly once.
8. On `pass`, run fresh source-bound R2 reviewers across all three domains.
9. Close memory and the milestone, then merge to `main`.

## Failure Rule

Any failed exact, hosted, canonical, or independent check retires Revision 66. A consumed canonical
gate is never rerun.
