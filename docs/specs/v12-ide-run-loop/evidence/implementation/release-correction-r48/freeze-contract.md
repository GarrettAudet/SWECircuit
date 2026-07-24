# Revision 48 Freeze Contract

## Included Change

- Immutable Revision 47 one-shot failure and Candidate 24 retirement.
- Candidate-private exact-lock dependency provisioning.
- Receipt v1alpha3 producer and independent consumer.
- Lock, closure, PATH, mutation, and cleanup regressions.
- Active release-truth updates.

## Pre-Commit Gate

- Syntax, formatting, and lint pass.
- Focused release suite passes 54/54.
- An independent pre-freeze security review must return no blocker.

## Post-Commit Gate

1. Run the exact committed copied-production lifecycle.
2. Run the complete exact-commit repository verifier.
3. Only after both pass, invoke the successor canonical gate exactly once.
4. Run fresh three-lane R2, hosted CI, milestone closeout, and merge.

No scope expansion is permitted before `2026-07-25 00:03 MDT`; only failures from these release gates may change source.