# Revision 42 Freeze Contract

## Included Change

- Startup binding for the exact host TypeScript entrypoint.
- Closed-child propagation of only the resolved entrypoint path.
- Updated lifecycle source identity.
- Candidate 18 retirement and trace updates.

No V12 product or public API behavior changes.

## Pre-Commit Gate

- Syntax passes.
- Focused release-gate suite passes 18/18.
- Diff and template checks pass.

## Post-Commit Gate

1. Run the copied-production lifecycle against the exact clean Revision 42 commit.
2. Run the complete repository verifier against that same commit.
3. Only on `pass`, invoke its canonical release gate exactly once.
4. Only on gate `pass`, run fresh three-domain R2.
5. Require hosted CI, milestone closeout, and owner merge evidence.

Never rerun a consumed canonical gate.