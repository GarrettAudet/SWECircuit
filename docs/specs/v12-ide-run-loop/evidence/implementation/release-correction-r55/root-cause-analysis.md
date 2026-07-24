# Revision 55 Root-Cause Analysis

## Reproduction

- Candidate: `5b6a5f7f5ca447dc446660666053f638a34c9827`.
- Tree: `cf64f2c14daa822ba58b0aebc4c99945332d7d21`.
- Exact copied lifecycle: 2/2 pass.
- Full verifier core suite: 457/458 pass.
- Failure: `test/typescript-toolchain.test.mjs:336` expected `resolveTypeScriptEntrypointBinding` in the gate source.

## Stable Evidence

- The gate installs the exact candidate lock offline into candidate-private `node_modules`.
- The gate contains TypeScript under that dependency root, binds its bytes and version, and receipts the entrypoint.
- The exact copied lifecycle compiled the candidate successfully with `supplied: false`.
- The failed assertion described the earlier external host-TypeScript adapter.

## Hypotheses

- TypeScript authority was accidentally removed: rejected by the exact lifecycle and gate receipt logic.
- The core test retained the pre-candidate-private architecture: confirmed.

## Confirmed Cause

The R48-R53 release correction replaced external host TypeScript supply with candidate-private exact-lock authority, but the broad core contract was not updated with the release-specific tests.

## Causal Fix

Change only the static core assertions to require dependency-root containment, candidate TypeScript binding, receipt exposure, and absence of the retired gate resolver.
