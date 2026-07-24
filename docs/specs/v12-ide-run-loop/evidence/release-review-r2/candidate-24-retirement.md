# Candidate 24 Retirement

## Candidate

V12 Revision 47 commit `5efa889e5db5906108d44d51d58bc0817ebd9c7a`, tree `80dc147cf12117a0786cefbaa553694f83064bf7`.

## Verification Outcome

The exact committed copied lifecycle and complete `npm.cmd run verify` passed. The candidate's one permitted canonical gate then returned `fail` with exit code 1 at TypeScript `TS2688`: `@types/node` was not resolvable from the exact dependency-free materialization.

The 10,678-byte receipt is `sha256:4653e36c35deb180e74a7f06a5d3c163116d3d4343d6fa14ab3c9bbb96238f53`. Its 2,122-byte stdout is `sha256:c3208c852e1eba5d2c951940c29f948275ac772cbfa8ece3366890b5324862bf`; its 19,096-byte stderr is `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.

## Root Cause

The gate authenticated an external TypeScript entrypoint and host dependency closure but did not create a candidate-local dependency resolution path. TypeScript resolved `types: ["node"]` from candidate ancestry, and later Node ESM imports of `ajv` and `jsonc-parser` would have failed for the same reason.

## Retirement

Revision 47's gate evidence is immutable and must not be rerun. Candidate 24 is retired. Revision 48 provisions the exact candidate lock offline into candidate-private `node_modules`, binds its evidence and closure, and removes it before final source authentication.