# Revision 62 Correction Contract

## Goal

Allow the positive copied-production canonical gate enough bounded time to complete in the
deeper exact-candidate topology without weakening ordinary child-process timeout policy.

## Scope

- `test/helpers/v12-release-review-lifecycle.mjs`
- `test/lifecycle/v12-release-review-lifecycle.test.mjs`
- Revision 62 release evidence and live routing status

## Invariants

- The production release gate and its one-shot semantics do not change.
- The ordinary lifecycle child-process timeout remains 15 minutes.
- Only the positive copied-production canonical gate receives a 30-minute bound.
- The enclosing lifecycle retains its existing 60-minute child bound and 65-minute test bound.
- Timeout, process-tree termination, output limits, cleanup, source identity, and Git authority
  checks remain active.
- Revision 61's one-shot gate is not invoked.

## Completion Evidence

- The timeout exception is exposed through the lifecycle test hooks and asserted exactly.
- Focused release-gate and release-review suites pass.
- An exact committed Revision 62 candidate passes copied lifecycle, full verification,
  exact-candidate rehearsal, hosted CI, the one-shot canonical gate, and fresh R2 review.

## Route

`verify -> diagnose -> fix -> Revision 62`
