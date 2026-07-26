# Revision 72 Test Plan

## Causal Tests

1. Load the exact R70 Git tree and collect its complete 225-source R2 set.
2. Materialize every source below the same representative 72-character Windows repository root.
3. Require every absolute target to remain below 260 characters.
4. Use ordinary Windows PowerShell `Test-Path` and `Get-Item` for path and length checks.
5. Hash the opened stream with .NET SHA-256 and compare every expected digest.
6. Require the probe source to contain no `Get-FileHash` dependency.
7. Force the second of two identical rows to fail inside `ComputeHash`; require a nonzero exit,
   empty stdout, and non-empty stderr so prior hash state cannot produce success.
8. Require success to emit the exact row count with empty stderr.
9. Require both hosted Windows Node jobs to pass the exact tests.

## Qualification Ladder

1. Focused exact-candidate Windows path regression.
2. Complete release-review and release-gate suites.
3. Format, lint, typecheck, build, and complete core suite.
4. Template checker and complete checker regression matrix.
5. V11 and V12 dogfood.
6. Independent read-only correction review.
7. Exact R72 source freeze.
8. Copied lifecycle, complete immutable verifier, and non-consuming rehearsal.
9. Hosted Template Check plus Windows Node 22 and 24.
10. One-shot canonical gate and fresh three-domain R2.
11. Milestone, memory, and merge closeout.

## Expected Outcomes

- An unreadable source, byte mismatch, or lost assertion emits `fix`.
- A test that still requires `Get-FileHash` emits `fix`.
- An ambiguous requirement emits `clarify` before source freeze.
- A hosted failure prevents canonical invocation.
- A verified non-pass fresh R2 outcome retires R72.
- Only a complete exact roster of three independently verified `pass` handoffs can authorize
  release closeout.
