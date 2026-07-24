# Revision 47 Freeze Contract

## Included Change

- Native canonical startup authority.
- Field-name-only receipt mismatch diagnostics.
- Exact shell binding regression and identity refresh.
- Candidate 23 retirement and preserved pre-freeze lifecycle evidence.

## Pre-Commit Gate

- Formatting and syntax pass.
- Combined release suite passes 53/53.
- Complete direct copied lifecycle passes.
- Template and diff checks pass.

## Post-Commit Gate

1. Run the exact committed copied-production lifecycle.
2. Run the complete repository verifier.
3. Only on `pass`, invoke the canonical gate once.
4. Run fresh R2, hosted CI, and merge closeout.

Canonical path identity must be established by the producer, not relaxed by the consumer.