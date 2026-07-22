# Revision 27 Lifecycle Attempt 1 Diagnosis

## Bound Input

- Implementation checkpoint: `4a24027`.
- Command: `node --test --test-name-pattern="isolated copied production entrypoints complete one exact compile-to-verify lifecycle" test\v12-release-review.test.mjs`.
- This was repeatable pre-freeze verification, not a canonical candidate gate.

## Failure

- Outcome: `fail`, 0 of 1; runner duration 170,055.2269 ms.
- The copied lifecycle stopped before its canonical gate because `scripts/run-v12-release-gate.mjs` did not match the lifecycle's authenticated production identity manifest.
- Actual identity: 30,623 bytes, `sha256:6e1e398c7d15a0b5ac3562ccb90913ecb6480f700a9e53cb1aaf076f2f704b21`.
- Stale expected identity: 31,791 bytes, `sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0`.

## Root Cause

Revision 27 changed the release gate, release-gate test, and package manifest and added `scripts/run-typescript.mjs`, but the lifecycle's pinned production identity manifest still described the earlier files. The lifecycle correctly rejected this incomplete traceability update.

## Correction

- Rename the manifest to describe current production identities rather than an old revision.
- Refresh every changed identity and include `scripts/run-typescript.mjs`.
- Add the launcher to copied-fixture syntax verification.
- Add a fast source-byte identity regression so stale entries fail before the expensive lifecycle starts.

## Cleanup And Route

- `.local/v12-release-gate` was absent after the failure.
- No canonical candidate gate ran and no immutable candidate evidence was consumed.
- Route: `diagnose -> fix -> verify`.
