# Revision 52 Correction Contract

## Trigger

Revision 51's exact-byte independent review returned `fix` on npm compatibility, setup cleanup, atomic receipt publication, and Windows npm command authority.

## Objective

Close all four paths without changing V12 product behavior or expanding release scope.

## Required Behavior

1. Accept authenticated npm major versions 10 and newer.
2. Execute the exact bound npm CLI through the exact bound Node binary on every OS.
3. Include runtime detection inside the owned preparation cleanup boundary.
4. Attempt every owned cleanup in deterministic order and retain aggregate failures.
5. Publish a complete receipt atomically without replacing an existing receipt.
6. Have R2 reconstruct the exact Node and npm CLI command independently.

## Scope

Canonical gate authority, failure cleanup, receipt publication, R2 validation, copied lifecycle assertions, and focused regressions only.

## Route

`review -> fix -> verify -> review -> freeze`
