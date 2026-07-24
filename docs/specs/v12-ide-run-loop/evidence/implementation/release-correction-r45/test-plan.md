# Revision 45 Test Plan

## Causal Checks

- Seed both gate-only supply keys into a review-parent source environment.
- Assert both are absent from the resulting parent environment.
- Preserve explicit supplies in the separate gate environment.

## Integrated Checks

- Release-review suite.
- Release-gate suite.
- Exact committed copied-production lifecycle.
- Complete repository verifier.
- One exact canonical gate.
- Fresh three-domain R2 and hosted CI.

## Current Evidence

Release-review tests pass 35/35; release-gate tests remain 18/18. Exact committed lifecycle remains pending.