# Revision 42 Test Plan

## Causal Checks

- Supply an external lifecycle TypeScript adapter.
- Materialize an exact candidate without `node_modules`.
- Verify the gate retains the reviewed absolute supply while excluding ambient host variables.
- Authenticate TypeScript bytes and version before and after execution.

## Integrated Checks

- Release-gate suite.
- Exact committed copied-production lifecycle.
- Full repository verifier.
- One exact canonical gate.
- Fresh three-domain R2.
- Hosted CI.

## Current Evidence

Release-gate regressions pass 18/18. Exact committed lifecycle and later gates remain pending.