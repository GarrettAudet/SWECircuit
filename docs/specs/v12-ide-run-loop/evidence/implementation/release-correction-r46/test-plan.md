# Revision 46 Test Plan

## Causal Checks

- Resolve the release-gate scratch parent outside the repository.
- Create materialization, Git, home, and temp state only beneath that parent.
- Preserve unique ownership and guarded cleanup.
- Reject a source-contained scratch resolution.

## Integrated Checks

- Release-gate suite.
- Release-review suite and exact identity parity.
- Exact committed copied-production lifecycle.
- Complete repository verifier.
- One exact canonical gate.
- Fresh three-domain R2 and hosted CI.

## Current Evidence

Gate tests pass 18/18 and review tests pass 35/35. Exact committed lifecycle remains pending.