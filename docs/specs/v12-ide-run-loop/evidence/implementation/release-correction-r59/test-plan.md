# Revision 59 Test Plan

## Focused Checks

1. Confirm `README.md` and `CONTRIBUTING.md` match the V11 goal-contract byte and digest identities.
2. Run `npm.cmd run dogfood:v11`.
3. Run `node --test test/v12-release-gate.test.mjs`, including whole-workflow identity plus negative template/kernel job-disable, step-nonblocking, Git-enumeration, missing-file, exemption-widening, and control-flow mutations.
4. Run the complete 63-test release-specific contract.
5. Run the tracked-whitespace rule over every non-exempt tracked file.

## Broad Checks

1. Template checker and mutation matrix.
2. Format, lint, and typecheck.
3. Complete core suite.
4. V10, V11, and V12 dogfood.
5. Package inspection and clean consumer check.

## Exact Release Checks

1. Freeze and commit exact source identity.
2. Run one copied lifecycle and one full verifier against that commit.
3. Require all seven hosted jobs to pass for the exact commit.
4. Invoke the distinct canonical gate once only after those prerequisites pass.
5. Run fresh package-bound independent review across lifecycle correctness, security/trace authority, and product/API/IDE behavior.

## Failure Routing

Any failed exact or hosted check retires Revision 59. Its one-shot gate must remain unconsumed unless all prerequisite checks pass.
