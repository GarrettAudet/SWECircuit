# Revision 21 Test Plan

## Behavioral Proof

- Authenticate the isolated fixture's production parent, gate, harness, and verifier against the source bytes before execution.
- Run the real canonical gate for the fixture commit and authenticate its exact receipt and raw logs.
- Run real compile, approve, and verify parent invocations in separate processes.
- Compare actual raw prepare, compile, package, summary, and approval outputs across phases.
- Verify a complete roster of schema-valid package-bound raw handoffs through the real verifier.
- Inspect actual parent execution receipts for stable identity, distinct phase authority, child prefixes, output bindings, cleanup, and receipt-last promotion.
- Exercise the closed negative routes from the correction contract.
- Assert no source-repository test output or tracked-byte mutation remains.

## Commands

Run at minimum:

```powershell
node --check test/v12-release-review.test.mjs
node --check test/helpers/v12-release-review-lifecycle.mjs
node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git -c core.longpaths=true diff --check
```

If the optional helper is not created, omit its syntax command. Use a measured timeout above the complete isolated-lifecycle floor. Do not run a release gate or R2 phase against the real repository, refresh V11, mutate Git state, use network access, or claim release readiness.

## Evidence

Report:

- Exact changed-file identities and unchanged frozen production identities.
- Fixture commit and production-entrypoint authentication.
- Exact compile/package pair and stable/authority digests.
- Raw shared-output and approval comparisons.
- Exact handoff roster and verifier result.
- Parent receipt and negative-route results.
- Command results, duration, cleanup proof, assumptions, and residual external-host boundaries.
