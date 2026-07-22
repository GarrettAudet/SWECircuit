# Revision 26 Independent Review Contract

## Objective

Independently determine whether Revision 26 closes Candidate 12's nested Git-environment failure and Revision 25's review findings without weakening release, materialization, authority, evidence, or cleanup guarantees.

## Required Review Points

1. Authenticate every declared snapshot before relying on it.
2. Confirm every lifecycle Git call has an explicit environment and distinguish outer source-status authority from nested fixture authority.
3. Determine whether removing every case-insensitive inherited `GIT_*` key and reconstructing only the declared controls closes known and future Git environment injection paths.
4. Confirm fixture initialization and blob authentication use the same closed environment for real `init`, `add`, `commit`, `cat-file`, and `ls-tree` operations.
5. Evaluate whether the hostile fresh-process regression meaningfully exercises routing, configuration tuples, mixed-case keys, and unknown future Git variables rather than merely comparing objects.
6. Evaluate whether the complete lifecycle truly runs from exact Git blobs under a disposable candidate context with external npm and TypeScript supplies, and whether its identity and cleanup assertions can be bypassed.
7. Confirm the local TypeScript fallback and declared external supply cannot create duplicate, candidate-contained, linked, missing, or ambiguous toolchain authority.
8. Compare the exact pre- and post-correction source and identify any regression, omitted call site, test gap, false-positive assertion, mutable evidence path, or scope expansion.
9. Confirm Candidate 12 and Revision 25 evidence remain immutable and that no canonical candidate gate was rerun or implicitly treated as passing.
10. Return `pass` only if no blocking defect remains. Otherwise return `fix`, `diagnose`, or `redesign` with exact source references, causal reasoning, and required regression coverage.

## Boundaries

- Read only the declared package sources.
- Do not edit files, use network access, install dependencies, mutate Git state, rerun a candidate gate, launch descendants, or claim release readiness.
- Integration-owner prose and tests are evidence, not the independent verdict.
- Return only the exact generated `SpecialistAgentHandoff` JSON object.
