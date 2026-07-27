# Implementation Plan

## Status

The product implementation is complete. Candidate-addressed external evidence is authoritative
for exact-candidate state. ADR 0006 makes v0.1 Windows-only. Revisions 70 through 72 are
permanently retired. R72 passed all pre-canonical gates, then its only protected invocation was
externally terminated with no receipt. Revision 73 preserves that evidence, rejects an accidental
exact-R72 replay as qualification, and proves the corrected host transport through a
candidate-neutral fixture. Independent review attempts 1 through 3 returned `block`; all evidence,
routing, authentication, stream-preservation, and stale-description findings are corrected.
Attempt 4 returned `pass` with no unresolved finding. R73 has not frozen and its protected gate has
not been invoked; `releaseReady: false`.

## Steps

1. Preserve and authenticate R72's exact hosted pass, interrupted one-shot slot, raw streams, and
   absent receipt; permanently reject retry or relabeling.
2. Preserve the accidental exact-R72 replay as invalid qualification and prove transport through
   the dedicated candidate-neutral Windows fixture.
3. Reconcile every active R73 route, add fail-closed regressions, pass complete mutable gates, and
   obtain a fresh independent all-clear review.
4. Freeze one exact R73 source and run copied lifecycle, complete verification, non-consuming
   rehearsal, and the three-job hosted Windows matrix.
5. Launch one background R73 canonical process, poll without reinvocation, require its exact pass
   receipt, run fresh three-domain R2, close memory and the milestone, then merge and verify `main`.

## Architecture Approach

Keep the accepted four-operation `SpecialistRunSession` contract unchanged. The accepted source
materialization gives each implicit source a full SHA-256 alias over
a canonical domain/context-ID/original-path tuple. The candidate manifest retains the readable
original path plus exact Git mode, object ID, byte count, and digest. Both alias and explicit paths
share one 180-character logical cap, and collisions are rejected before any immutable write.
The parent mirrors only the compact `inputs/s` root. Runtime supply and every external host effect
remain outside core. R73 changes release trace and qualification evidence only.

## Dependencies

- V11.1 remains the exact baseline and compiler used for dogfooding.
- Approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be` must be available to historical proof tests.
- The tracked `.npmrc` provides the repository-local offline npm-cache supply.
- Architecture fan-in remains bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
