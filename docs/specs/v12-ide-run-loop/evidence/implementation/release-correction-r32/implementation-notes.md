# Revision 32 Batch-Coverage Correction

## Trigger

Exact checkpoint `4275ce9eb31e04995f4bb49c599d6d930c9685a7` passed the complete `npm.cmd run verify` aggregate, including 443 of 443 core tests and the copied-production lifecycle. Its immutable package-bound Revision 31 review then returned verified `fix`: the release parent used one strict Git blob batch, but the embedded review harness and canonical release gate still spawned one `git cat-file blob` process per tree entry.

The review package is preserved under `../independent-review-r31/`. Its exact 10,421-byte handoff is `sha256:975bce5edc9937a3b266e1e072dea09e607bf653f2b0f8e7bcc261bdcde95c15` and verifies against compilation/package `sha256:9c65708c068cae09daae6e16b058f999989f423ba15327304f0eb7433f4d23fa` / `sha256:a4d31dde14baf173980ab47d59c60ec8e607f9b7b749b63b247afb1a8b7a35ab`.

## Correction

- Added sorted, deduplicated, binary-safe `git cat-file --batch` loading to the embedded review harness used by the verifier.
- Added the same fail-closed batch protocol to canonical candidate materialization.
- Kept candidate-tree caches production-only when tests inject an exact Git executor.
- Added a real temporary Git fixture with duplicate blobs, binary bytes, and 3-file and 35-file revisions.
- Exercised the actual parent, verifier harness, and gate entry points and required exactly four Git invocations, exactly one batch read, zero per-blob reads, stable binary reconstruction, and duplicate-object deduplication at both sizes.

## Focused Verification

- Syntax checks: `pass` for all three production entry points and both test files.
- Release-review suite: 31/31 `pass` in 6.7 seconds outside the Windows process-control sandbox.
- Release-gate suite: 17/17 `pass` in 32.5 seconds with its declared scratch-write boundary.
- Format check, lint, and typecheck: `pass`.
- Restricted-host process termination and candidate materialization attempts failed only at host sandbox boundaries; the identical declared-authority runs passed and are not classified as product failures.

## Remaining Gates

Commit the exact Revision 32 source, run a fresh complete aggregate, and obtain a fresh immutable package-bound independent `pass`. Only then may the integration owner freeze one successor for the one-shot canonical gate, fresh R2 review, hosted CI, milestone closeout, and owner merge decision.
