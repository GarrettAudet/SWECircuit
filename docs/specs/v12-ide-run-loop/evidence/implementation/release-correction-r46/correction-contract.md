# Revision 46 Correction Contract

## Trigger

Revision 45 proved environment-key isolation but reproduced source-checkout ancestor fallback through repository-contained private temp storage.

## Objective

Keep all canonical-gate materialization, Git context, home, and temporary state outside source and candidate repository ancestry.

## Scope

- Release-gate scratch-root selection and validation.
- Scratch-boundary regression and exact production identities.
- Candidate 22 retirement and release trace.

Gate receipt semantics, product APIs, schemas, specialist compilation, IDE Run Loop behavior, and runtime host effects are out of scope.

## Required Behavior

1. Resolve the host temp directory canonically at startup.
2. Create only SWECircuit-owned scratch descendants under that external root.
3. Fail closed if the scratch root is inside the source repository.
4. Keep unique materialization and Git context ownership plus guarded cleanup.
5. Assert the scratch parent is outside repository ancestry.
6. Pass exact lifecycle and all later release gates.

## Route

`verify -> diagnose -> redesign -> verify`