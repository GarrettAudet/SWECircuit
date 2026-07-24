# Revision 56 Correction Contract

## Trigger

Revision 55 passed its exact lifecycle and full verifier, then its sole canonical gate returned `fail`: 454/458 core tests passed and four release-gate self-tests could not discover Git metadata from the exact blob materialization.

## Objective

Make repository-sensitive release-gate self-tests own explicit conventional Git fixtures while preserving the production gate's closed Git environment and default behavior.

## Required Behavior

1. Keep production Git sanitization unchanged.
2. Permit `createCandidateGitContext` tests to inject only the source-repository Git runner; production calls retain the closed default.
3. Materialization, Git-context, hostile-environment, and paths-mode tests must run without ambient repository metadata.
4. Preserve exact candidate materialization, disposable Git context, long-path coverage, and hostile `GIT_*` rejection.
5. Never rerun Revision 55's consumed gate or reuse its candidate-addressed evidence slot.

## Scope

- `scripts/run-v12-release-gate.mjs`
- `test/v12-release-gate.test.mjs`
- Revision 55 retirement and Revision 56 trace evidence

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
