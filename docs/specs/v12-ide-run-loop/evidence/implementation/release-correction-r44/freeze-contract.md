# Revision 44 Freeze Contract

## Included Change

- Explicit host dependency root startup supply.
- Outside-materialization enforcement and closed PATH propagation.
- R2 consumer binding to the dependency closure root.
- Isolated fixture supply, production identity refresh, and Candidate 20 retirement.

No V12 product or public API behavior changes.

## Pre-Commit Gate

- Format and syntax pass.
- Release-gate tests pass 18/18.
- Release-review tests pass 35/35.
- Template and diff checks pass.

## Post-Commit Gate

1. Run the exact copied-production lifecycle.
2. Run the complete repository verifier.
3. Only on `pass`, invoke the canonical gate exactly once.
4. Run fresh three-domain R2, hosted CI, and merge closeout.

Never replace a supplied dependency closure with candidate-local fallback.