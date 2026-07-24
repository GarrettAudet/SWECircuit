# Revision 55 Correction Contract

## Trigger

Revision 54 passed the exact committed lifecycle, then full verification failed one stale cross-component TypeScript authority assertion.

## Objective

Make the core contract enforce the current candidate-private exact-lock TypeScript boundary rather than the retired host-supplied resolver.

## Required Behavior

1. Keep package build and typecheck routed through `scripts/run-typescript.mjs`.
2. Require the gate to contain candidate-private TypeScript under the installed dependency root.
3. Require the gate to bind and receipt the candidate TypeScript entrypoint.
4. Reject reintroduction of `resolveTypeScriptEntrypointBinding` into the gate.
5. Keep packed-consumer resolver and execution assertions unchanged.
6. Leave every production and release-gate byte unchanged.

## Scope

One core test contract and release trace only.

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
