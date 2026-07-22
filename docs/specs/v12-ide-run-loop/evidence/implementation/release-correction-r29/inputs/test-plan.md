# Revision 29 Test Plan

## Focused Positive Tests

- The fixture verify command includes `node scripts/run-typescript.mjs` with one bounded TypeScript input.
- External wrapper construction binds exact path, bytes, digest, link count, and delegated host compiler.
- The wrapper delegates `--version` and compilation to a real supplied compiler and emits one compile sentinel only after success.
- Canonical-log parsing rejects missing, duplicate, malformed, stale, non-supplied, or mismatched binding receipts and missing or duplicate sentinels.

## Focused Negative Tests

- Candidate-contained, linked, missing, directory, and multi-link wrapper paths remain rejected by existing production binding checks.
- Persistent self-mutation happens only during compilation and leaves changed bytes after child return.
- The copied negative canonical gate returns `fail` with exit code 2 and its bound raw stderr contains `TypeScript binding changed after compilation.`

## Exact Lifecycle

Run the serialized copied-production lifecycle once after focused checks. Require positive receipt/sentinel evidence, the new mutation negative route, all existing ten negative routes, source immutability, exact materialization, Git-context integrity, and complete cleanup.

## Aggregate And Trust Replay

- `npm.cmd run verify`
- Refresh and independently verify V11 source-bound dogfood because `.gitattributes`, lifecycle helper/tests, and any bound source tuples changed.
- Compile a new immutable package-bound independent review and require verified `pass` before Candidate 13 freeze.

## Stop Conditions

Stop and return to diagnosis on any non-obvious failure, receipt mismatch, persistent external file, cleanup leak, source mutation, stale V11 binding, or independent non-pass outcome. Never rerun Candidate 13 because it remains unconsumed.