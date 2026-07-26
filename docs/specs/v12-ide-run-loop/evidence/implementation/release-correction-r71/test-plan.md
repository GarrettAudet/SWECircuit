# Revision 71 Test Plan

## Causal Tests

1. Load the exact R70 Git tree and collect its complete R2 source set.
2. Require one unique full-SHA-256 snapshot alias per source.
3. Require every reviewer-facing logical snapshot path to remain at or below 180 characters.
4. Materialize all sources beneath a representative 72-character Windows repository root and
   require every absolute target to remain below 260 characters.
5. Use ordinary Windows PowerShell `Test-Path`, `Get-Item`, and `Get-FileHash` to authenticate every
   materialized source.
6. Require the candidate manifest to preserve original paths and exact Git/content bindings.
7. Require copied-lifecycle production identities to match current source bytes.

## Qualification Ladder

1. Focused exact-candidate Windows path regression.
2. Complete release-review and release-gate suites.
3. Format, lint, typecheck, build, and complete core suite.
4. Template checker and complete checker regression matrix.
5. V11 and V12 dogfood.
6. Independent read-only correction review.
7. Exact R71 source freeze.
8. Copied lifecycle, complete immutable verifier, and non-consuming rehearsal.
9. Hosted Template Check plus Windows Node 22 and 24.
10. One-shot canonical gate and fresh three-domain R2.
11. Milestone, memory, and merge closeout.

## Expected Outcomes

- An unreadable source, alias collision, or binding mismatch emits `fix`.
- An ambiguous requirement emits `clarify` before source freeze.
- A verified non-pass fresh R2 outcome retires R71.
- Only a complete exact roster of three independently verified `pass` handoffs can authorize
  release closeout.
