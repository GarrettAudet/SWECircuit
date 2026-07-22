# Revision 29 Implementation Notes

## Implemented

- Replaced the copied fixture's TypeScript syntax check with a bounded compile through `scripts/run-typescript.mjs`.
- Added an authenticated, single-link external adapter that delegates version inspection and compilation to the host TypeScript entrypoint.
- Bound the complete version-bearing launcher receipt and one success-only compile sentinel from the canonical raw log.
- Added a separate copied-candidate route whose compiler mutates itself during compilation; the production launcher detects the persistent byte change after child return and the canonical gate records `fail`.
- Added focused real-compiler, fake-compiler, receipt-parser, failed-compilation, and persistent-mutation coverage.

## Diagnostic Notes

- TypeScript 7.0.2 rejected the initial bounded file command with `TS5112` because a project configuration was present while files were supplied. Adding the explicit TypeScript 7 `--ignoreConfig` option made the command unambiguous without weakening compilation.
- Sandboxed reruns could read but not write existing `dist/` files or create candidate scratch directories under `.local/`; ordinary file attributes and ACLs were valid. Identical unsandboxed commands passed, so these stops are retained as host-sandbox evidence rather than classified as product failures.

## Pre-Checkpoint Verification

- Focused TypeScript lifecycle cases: 4/4 pass in 1.6 seconds.
- Complete release-review suite: 26/26 pass in 92.9 seconds.
- Complete release-gate suite: 16/16 pass in 387.6 seconds outside the write-blocking sandbox.
- Exact copied-production lifecycle: 1/1 pass in 38 minutes 16.4 seconds against commit `9bf22621cb19df25e781fa357b3a47fbb766ca57`.
- Touched-file format and lint: pass with zero diagnostics.
- Typecheck: pass with authenticated TypeScript 7.0.2.
- TypeScript build: pass with authenticated TypeScript 7.0.2 outside the write-blocking sandbox.
- Template checker and `git diff --check`: pass.

## Remaining Gates

The refreshed V11 Revision 43 source-bound replay and canonical aggregate pass. A fresh immutable package-bound independent review remains required. Candidate 13 remains unconsumed.
