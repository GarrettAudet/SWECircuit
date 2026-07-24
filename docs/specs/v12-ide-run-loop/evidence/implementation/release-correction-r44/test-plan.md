# Revision 44 Test Plan

## Causal Checks

- Import the copied gate from a checkout without `node_modules`.
- Supply external npm cache, TypeScript, and dependency closure roots explicitly.
- Reject ambient or candidate-local fallback.
- Match the effective dependency-root environment value to the receipt closure root.
- Preserve exact before/after dependency digest, file count, and byte count.

## Integrated Checks

- Release-gate suite.
- Release-review consumer suite.
- Exact committed copied-production lifecycle.
- Complete repository verifier.
- One exact canonical gate.
- Fresh three-domain R2.
- Hosted CI.

## Current Evidence

Focused release suites pass 53/53. Exact committed lifecycle and later gates remain pending.