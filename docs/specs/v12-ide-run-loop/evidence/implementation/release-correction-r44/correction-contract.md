# Revision 44 Correction Contract

## Trigger

Revision 43's copied canonical gate rejected missing candidate-local `node_modules` after identity and TypeScript-supply checks passed.

## Objective

Make the offline host dependency closure explicit, closed, portable across copied candidates, and receipt-bound.

## Scope

- Canonical-gate host dependency root resolution and child propagation.
- R2 receipt-consumer validation.
- Copied lifecycle and isolated cache-probe supplies.
- Exact production identities and Candidate 20 retirement.

Product APIs, schemas, specialist compilation, IDE Run Loop semantics, provider routing, spawning, integration, and merge effects are out of scope.

## Required Behavior

1. Resolve one non-empty host dependency root from startup authority.
2. Require its canonical directory outside the candidate materialization.
3. Add only that canonical path to the exact child environment.
4. Build PATH from its `.bin` directory and exact tool directories.
5. Bind the same complete dependency closure before and after verification.
6. Require the R2 consumer to match the environment supply to the receipt closure root.
7. Pass exact lifecycle, full verification, one gate, fresh R2, hosted CI, and merge closeout.

## Route

`verify -> diagnose -> fix -> verify`