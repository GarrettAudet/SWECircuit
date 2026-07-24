# Revision 42 Correction Contract

## Trigger

Revision 41 failed its exact committed-source verifier in the copied-production lifecycle before any canonical gate invocation.

## Objective

Preserve closed execution authority while carrying the exact reviewed host TypeScript supply into the canonical gate child.

## Scope

- `scripts/run-v12-release-gate.mjs`
- Exact lifecycle production-identity pin
- Candidate 18 retirement and release-status trace

Product APIs, schemas, specialist compilation, IDE Run Loop behavior, review topology, provider selection, spawning, persistence, integration, and merge effects are out of scope.

## Required Behavior

1. Resolve the optional host TypeScript supply exactly once from the gate startup environment.
2. Validate the resolved supply through the existing plain-file and outside-candidate policy.
3. Inject only that exact resolved path into the closed verification environment.
4. Keep ambient environment channels excluded.
5. Pass focused release-gate checks, the copied-production lifecycle, the full exact verifier, one canonical gate, fresh R2, hosted CI, and merge closeout.

## Route

`verify -> diagnose -> fix -> verify`