# Revision 28 Integration-Owner Verification

## Correction Evidence

- The packed-consumer gate now passes the complete authenticated TypeScript binding through `executeTypeScript`, retains the returned receipt, and checks every bound identity field.
- Declared and fallback toolchain tests install platform-selectable conflicting `tsc` commands and prove neither ambient PATH command executes.
- Persistent compiler-entrypoint mutation during compilation fails the post-execution identity check.
- The public executor boundary distinguishes stable pre/post entrypoint authentication from host-owned concurrent-writer isolation and transitive toolchain trust.
- Revision 27 evidence and retired release candidates remain unchanged.

## Focused Verification

- JavaScript syntax checks: `pass`.
- TypeScript toolchain suite: `pass`, 7 of 7; runner duration 739.261 ms.
- Clean offline installed-consumer gate: `pass`; elapsed time 6.6 seconds.
- V12 release-gate suite: `pass`, 16 of 16; runner duration 452,922.6129 ms.
- Copied-production release-review suite: `pass`, 23 of 23; runner duration 83,485.5956 ms.
- Biome format: `pass`, 102 files.
- Biome lint: `pass`, 88 files with 71 informational diagnostics and no errors.
- Authenticated TypeScript 7.0.2 typecheck and build: `pass`.
- Git whitespace check: `pass`.

## Estimation Evidence

The preceding Revision 27 aggregate gate was forecast at 46-50 minutes and completed in 45 minutes 43 seconds. Its subsequent independent package-bound review still emitted `fix`, demonstrating that elapsed-time calibration and semantic release readiness are separate controls.

## Immutable Lifecycle

- Checkpoint `49ed27c859a6530ccaf69fcf53e6b2f418053f15`, tree `1270625bee3bee512777fe84342ad4edd8d21f3c`.
- Complete serialized lifecycle: `pass`, 1 of 1; runner duration 2,284,557.1611 ms, or 38 minutes 4.6 seconds.
- The source worktree remained clean and Candidate 13 was not created or consumed.

## V11 Revision 42 Replay

- All 58 repository source bindings match exact current bytes.
- Candidate A `sha256:7c8e142daf69975ad6a2304842fbd8e7fa66a745504a85e3896f15622b310867` / `sha256:5f5c4c6b41d1911a6c1d3f3e0cd132a82bac1b3c5dc03bc074208db65d09dfb9` and Audit B `sha256:d31d6c34c2c5ee4ecb07ce4d108f50010191f7e6089209775d332cfcf013bf42` / `sha256:d9ad9befb8af509cba8e7be6ccaa0d22073d30cea760640721fe2b20823f8770` reconstruct and verify.
- Exact binder fan-in, independent semantic Audit B, cross-package authorization, and canonical `--check-evidence` replay pass.
- Revision 41 remains preserved in a verified 28-file archive.

## Remaining Gates

- Run the full aggregate gate and obtain a fresh immutable package-bound independent `pass`.
- Freeze Candidate 13 only after those pre-candidate gates pass.
- Run Candidate 13's canonical gate exactly once, fresh three-lane R2 review, hosted CI, milestone closeout, and owner merge.

## Route

Integration-owner result: `pass` to aggregate verification and fresh immutable package-bound review. Release remains blocked and Candidate 13 remains unconsumed.
