# Revision 49 Correction Contract

## Trigger

Revision 48's independent pre-freeze review returned `fix` on five concrete release-authority and causal-verification gaps.

## Objective

Make the exact candidate dependency boundary self-contained, portable, failure-auditable, and causally covered before consuming another one-shot gate.

## Required Behavior

1. Execute the TypeScript version pinned by the exact candidate lock from candidate-private `node_modules`.
2. Reject any ancestor `node_modules` fallback before and after verification.
3. Evaluate lockfile OS, CPU, and Linux `libc` constraints exactly.
4. Write an immutable receipt and bound raw install logs when offline `npm ci` fails, then prove cleanup.
5. Compile the real `tsconfig.json` and launch fresh ESM imports of `ajv` and `jsonc-parser` in the copied lifecycle.
6. Independently re-derive the v1alpha4 authority in R2.

## Scope

Release-gate execution, receipt validation, copied lifecycle, focused regressions, and release trace only. V12 product APIs, IDE Run Loop semantics, provider neutrality, and external host effects are unchanged.

## Route

`review -> fix -> verify -> commit -> lifecycle -> gate`
