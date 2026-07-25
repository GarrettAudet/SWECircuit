# Revision 61 Test Plan

## Focused Checks

1. Parse-check the modified lifecycle test.
2. Require the regular release-review test to bind both explicit enclosing Git runners.
3. Run the complete copied lifecycle from an ordinary checkout.
4. Run the complete core suite.

## Broad Checks

1. Template checker and complete checker mutation matrix.
2. Format, lint, typecheck, and build.
3. Full `npm.cmd run verify`.
4. V10, V11, and V12 dogfood.
5. Package inspection and clean installed consumer.

## Exact Release Checks

1. Complete independent review and freeze one exact Revision 61 commit.
2. Reconstruct that commit in a disposable candidate Git context and run the copied lifecycle before the irreversible gate.
3. Require all seven hosted jobs to pass on the exact commit.
4. Invoke the Revision 61 canonical gate exactly once.
5. Complete fresh three-domain R2 review, milestone, memory, merge, and release closeout.

## Failure Routing

Any failed exact, hosted, canonical, or independent check permanently retires Revision 61. A consumed canonical gate is never rerun.
