# Revision 67 Test Plan

## Focused

- Parse both changed test surfaces and the copied-lifecycle identity helper.
- Run the causal Git-context fixture alone.
- Run the complete release-gate test file.
- Verify exact R66 workflow, job, and Ubuntu log bytes.
- Run the complete release-gate and release-review pair.

## Broad

- Run format, lint, typecheck, build, core, dogfood, package, consumer, and workflow checker gates.
- Obtain independent final-delta review.

## Exact Candidate

1. Freeze and commit one exact Revision 67 source.
2. Run copied lifecycle from that commit.
3. Run the complete verifier from that commit.
4. Run the non-consuming exact-candidate rehearsal.
5. Require all seven hosted jobs to pass.
6. Confirm a clean worktree and absent Revision 67 canonical evidence slot.
7. Invoke the Revision 67 canonical gate exactly once.
8. On `pass`, run fresh source-bound R2 reviewers across all three domains.
9. Close memory and the milestone, then merge to `main`.

## Failure Rule

Any failed exact, hosted, canonical, or independent check retires Revision 67. A consumed canonical
gate is never rerun.
