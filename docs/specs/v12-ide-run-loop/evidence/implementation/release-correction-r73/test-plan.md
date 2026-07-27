# Revision 73 Test Plan

## Evidence Authentication

- Authenticate exact R72 commit, tree, source inventory, and source digest.
- Authenticate hosted run and jobs JSON bytes.
- Reconstruct all three hosted log envelopes and compare raw byte counts and SHA-256 digests.
- Require exactly three hosted Windows jobs and three successful conclusions.
- Authenticate the exact canonical stdout and stderr bytes.
- Require 482/482 core pass, lifecycle entry, and absent canonical receipt.
- Bind decimal `1073807364` to hexadecimal `0x40010004` and
  `DBG_TERMINATE_PROCESS`.
- Require no R72 rerun or replacement receipt.

## Transport-Fixture Proof

Run the dedicated test-only Windows fixture:

1. Generate one UUID probe nonce and bind the exact runner, launcher, and worker source digests.
2. Start one hidden worker and persist PID, process start time, request digest, and launch digest.
3. Require the launcher to exit while the receipt is absent.
4. Preserve timestamped polls and require a post-exit heartbeat from the same process.
5. Require one bound pass receipt and zero worker exit code without another launch.
6. Authenticate launch, launcher exit, polls, receipt, completion, and all raw streams.
7. Reject any fixture input that names a release candidate, candidate slot, or canonical gate.

Result: pass for probe `5ab49c21-83e2-48d7-98a1-f065d69e47b2`. The launcher exited
after about 507 ms, the first post-exit poll was receipt-free, and a later heartbeat proved process
continuity. The same PID published one pass receipt. The exact proof is under
`inputs/transport-fixture-proof/`.

The first implementation captured launcher pipe handles, which kept the supervising call open
until worker completion. The corrected runner captures launcher streams in dedicated files while
the worker owns separate stream files and is covered by a live regression.

The earlier exact-R72 replay is preserved separately under `inputs/r72-invalid-replay/`.
Executable authentication requires `releaseQualificationValid: false` and rejects it as transport
or release qualification.

## Mutable R73 Gates

- Focused R72/R73 evidence and active-status tests.
- Complete release-review and release-gate suites.
- Complete core suite.
- Format, lint, typecheck, and build.
- Template checker and complete checker regression matrix.
- V11 specialist-compiler and deterministic V12 run-loop dogfood.
- Fresh bounded independent review.

## Immutable R73 Gates

1. Freeze one exact commit and tree.
2. Run copied lifecycle and complete `npm.cmd run verify`.
3. Run a non-consuming disposable exact-candidate rehearsal.
4. Require exactly three successful hosted Windows jobs.
5. Confirm the real R73 candidate slot is absent.
6. Launch one background real canonical process and poll it without reinvocation.
7. Require one exact pass receipt.
8. Compile and approve a fresh three-agent R2 review and require three verified `pass` outcomes.
9. Complete milestone, memory, merge, and merged-main verification.

Any missing or non-pass exact-candidate evidence permanently retires R73.
R70, R71, and R72 must never be launched, invoked, frozen, or released again.

`releaseReady: false`.
