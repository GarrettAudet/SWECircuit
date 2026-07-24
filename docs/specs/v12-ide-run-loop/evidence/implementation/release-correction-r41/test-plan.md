# Revision 41 Test Plan

## Causal Checks

- Inject hostile Node, npm, Git, script-shell, registry, and secret values.
- Assert the exact effective environment excludes undeclared keys.
- Authenticate private npm files, exact tools, and host dependency closure.
- Require stable before/after identities.
- Require receipt v1alpha2 in the R2 consumer.
- Require all six transitive sources exactly once with correct ownership.
- Preserve the historical context-bounding regression.

## Integrated Checks

- Formatting and lint.
- Complete release-gate and release-review suites.
- Lifecycle production-identity parity.
- Full repository verifier against one frozen commit.
- One exact canonical gate.
- Fresh three-domain R2 and hosted CI.

## Current Evidence

All 53 release-specific tests pass. Frozen verification and later gates remain pending.
