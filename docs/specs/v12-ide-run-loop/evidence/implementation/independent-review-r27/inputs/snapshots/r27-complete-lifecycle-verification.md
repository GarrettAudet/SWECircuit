# Revision 27 Complete Lifecycle Verification

## Bound Input

- Corrected implementation checkpoint: `e5fa310bc0f7ca4b0f567a71c7adb3824874a0d4`.
- Candidate tree: `d3bca1683eac29b09d3498bfe68a0dc3d7cf9bb0`.
- Source identity: 3,167 files, 97,137,692 bytes, `sha256:bf562a9fb1b2a8553e2fecd3a1b93b03c577e38b6919f6ab75a7f370c18fcd92`.
- Command: `node --test --test-name-pattern="isolated copied production entrypoints complete one exact compile-to-verify lifecycle" test\v12-release-review.test.mjs`.
- This was repeatable pre-freeze verification, not a canonical candidate gate.

## Attempt History

Checkpoint `4a24027` failed before its copied canonical gate because the lifecycle production identity manifest still described the pre-Revision-27 release gate. Outcome: `fail`, 0 of 1; runner duration 170,055.2269 ms. `lifecycle-attempt-1-diagnosis.md` preserves the evidence and root cause. No candidate gate ran.

The identity manifest was refreshed, renamed to describe current production identities, extended to cover `scripts/run-typescript.mjs`, and guarded by a fast source-byte regression. The two fast lifecycle boundary tests passed in 106.1986 ms.

The corrected exact lifecycle passed: 1 of 1; test duration 2,201,332.8069 ms; runner duration 2,201,441.4493 ms.

## Proven Path

- Exact Git-blob materialization and disposable candidate Git context.
- Authenticated production entrypoints, including the TypeScript launcher.
- Closed Git environment, external npm cache, and external TypeScript supply.
- Compile, package, approve, verify, and exact raw handoff verification.
- Negative substitution, stale-output, conflicting-output, and interrupted-promotion routes.
- Immutable source, candidate Git context, materialization, and cleanup checks.

## Cleanup

- Candidate materialization and disposable Git context were removed.
- `.local/v12-release-gate` was absent after both attempts.
- The source repository remained clean and bound to the checkpoint.

## Result

Outcome: `pass` to mutable-source verification and independent semantic review. This is not release approval.
