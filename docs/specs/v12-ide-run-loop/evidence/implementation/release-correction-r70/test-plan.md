# Revision 70 Test Plan

## Causal Tests

1. Authenticate the R69 verifier envelope, exact raw bytes, and failure text.
2. Require README to equal the approved 3,843-byte digest.
3. Require README to link `SUPPORT.md` and expose external host provider selection.
4. Require `SUPPORT.md` and hosted CI to remain Windows-only.
5. Bind R70's active goal, qualification, stop, and completion sections to the same Windows-only
   and IDE/provider-neutral policy.
5. Require copied-lifecycle production identities to match current source.
6. Run V11 and V12 dogfood against the restored context.

## Qualification Ladder

1. Focused support, evidence, identity, and dogfood checks.
2. Format, lint, typecheck, build, release-review, release-gate, and full core suites.
3. Template checker and complete checker regression matrix.
4. Independent read-only correction review.
5. Exact source freeze.
6. Copied lifecycle, complete verifier, and non-consuming rehearsal.
7. Template Check plus Windows Node 22 and 24.
8. One-shot canonical gate and fresh three-domain R2.
9. Milestone, memory, and merge closeout.

## Stop Conditions

- Any trust-root mismatch emits `fix` and retires the source.
- Any loss of Windows-only support or IDE/provider neutrality emits `redesign`.
- The canonical gate remains forbidden until every prior immutable and hosted gate passes.
