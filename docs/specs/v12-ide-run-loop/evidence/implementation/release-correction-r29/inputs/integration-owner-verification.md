# Revision 29 Integration-Owner Verification

## Correction Evidence

- The copied-production lifecycle now performs a bounded TypeScript compile through `scripts/run-typescript.mjs` rather than substituting a syntax-only command.
- Its authenticated external adapter delegates to the host TypeScript entrypoint and emits a success-only sentinel.
- The lifecycle binds the complete version-bearing TypeScript receipt from canonical raw evidence.
- A separate copied candidate persistently mutates the compiler entrypoint during compilation and reaches the required fail-closed route.
- Revision 28 evidence and retired release candidates remain unchanged.

## Focused Verification

- Focused TypeScript lifecycle cases: `pass`, 4 of 4 in 1.6 seconds.
- Copied-production release-review suite: `pass`, 26 of 26 in 92.9 seconds.
- V12 release-gate suite: `pass`, 16 of 16 in 387.6 seconds outside the write-blocking sandbox.
- Touched-file format and lint: `pass`, zero diagnostics.
- Authenticated TypeScript 7.0.2 typecheck and build: `pass`; build ran outside the write-blocking sandbox.
- Template checker and Git whitespace check: `pass`.

## Immutable Lifecycle

- Checkpoint `9bf22621cb19df25e781fa357b3a47fbb766ca57`, tree `498c47cd183160d70d13bf4b9ed89f05dc412ae1`.
- Complete serialized lifecycle: `pass`, 1 of 1; runner duration 2,296,381.9695 ms, or 38 minutes 16.4 seconds.
- All 11 negative routes passed, the source worktree remained clean, and Candidate 13 was not created or consumed.

## V11 Revision 43 Replay

- All 58 repository source bindings match exact current bytes; only `.gitattributes` changed from Revision 42.
- Candidate A `sha256:ed88b5f8f1991ea49e4fc0928fbbb35673399125293062c9f143a1113625c819` / `sha256:59c890b194f22e5297d68639b1c7ec59b9f1fcf1961271b52e80acf94610a480` and Audit B `sha256:ee381b407c6cce2a48171617079ef80cca7e99f1e8c5745a7d6fa80731eda998` / `sha256:3926e14b49194f64ad8e764ba41e4afa2434258cf2fcab9b06c55560ad7b4492` reconstruct and verify.
- Exact commit-bound binder fan-in, fresh authority-compliant semantic Audit B, cross-package authorization, and canonical `--check-evidence` replay pass.
- The first semantic reviewer attempt is retained as a truthful `fix` after it disclosed undeclared reads. A later `pass` became stale when approval bytes were normalized and was not accepted; the entire downstream receipt, binder, review, and authorization chain was repeated against the LF-stable bytes.
- Revision 42 remains preserved in a manifest-bound archive.

## Remaining Gates

- Run the full aggregate gate and obtain a fresh immutable package-bound independent `pass`.
- Freeze Candidate 13 only after those pre-candidate gates pass.
- Run Candidate 13's canonical gate exactly once, fresh three-lane R2 review, hosted CI, milestone closeout, and owner merge.

## Route

Integration-owner result: `pass` to aggregate verification and fresh immutable package-bound review. Release remains blocked and Candidate 13 remains unconsumed.
