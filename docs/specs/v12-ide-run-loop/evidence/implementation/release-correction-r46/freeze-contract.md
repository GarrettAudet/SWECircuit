# Revision 46 Freeze Contract

## Included Change

- External two-level release-gate scratch root.
- Source-ancestry fail-closed check.
- Causal scratch-boundary regression and exact identity refresh.
- Candidate 22 retirement and trace updates.

## Pre-Commit Gate

- Formatting and syntax pass.
- Release-gate tests pass 18/18.
- Release-review tests pass 35/35.
- Template and diff checks pass.

## Post-Commit Gate

1. Run the exact copied-production lifecycle.
2. Run the complete repository verifier.
3. Only on `pass`, invoke the canonical gate once.
4. Run fresh R2, hosted CI, and merge closeout.

Private runtime isolation requires filesystem ancestry isolation as well as environment isolation.