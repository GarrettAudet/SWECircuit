# Revision 45 Freeze Contract

## Included Change

- Two gate-only environment keys removed at the release-review parent boundary.
- Causal consumer assertions.
- Candidate 21 retirement and trace updates.

## Pre-Commit Gate

- Formatting passes.
- Release-review tests pass 35/35.
- Release-gate tests remain 18/18.
- Template and diff checks pass.

## Post-Commit Gate

1. Run the exact copied-production lifecycle.
2. Run the complete repository verifier.
3. Only on `pass`, invoke the canonical gate once.
4. Run fresh R2, hosted CI, and merge closeout.

Authority supplied to one process role must not cross into another role implicitly.