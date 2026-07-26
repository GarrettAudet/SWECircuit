# Implementation Plan

## Status

The product implementation is complete. Candidate-addressed external evidence is authoritative
for exact-candidate state. ADR 0006 makes v0.1 Windows-only. Revision 70 passed copied lifecycle,
the complete verifier, exact-candidate rehearsal, hosted Windows CI, and its one-shot canonical
gate, then fresh R2 blocked because 48 immutable sources exceeded ordinary Windows path reach.
Revision 70 is permanently retired and its gate is consumed. Revision 71 uses bounded,
domain-separated source aliases while preserving original paths and exact Git/content bindings.
Its exact R70 causal regression, complete mutable qualification, V11/V12 dogfood, and independent
review pass; `releaseReady: false`.

## Steps

1. Preserve Revision 70's exact source, hosted, canonical, compilation, package, and verified R2
   evidence; permanently retire its consumed gate.
2. Replace mirrored reviewer-source paths with bounded full-SHA-256 aliases while preserving every
   original path and exact Git/content binding.
3. Bind the exact 225-row R70 roster, ordinary Windows PowerShell readability, path overflow, and
   collision behavior in regression tests; run broad qualification and independent review.
4. Freeze one exact Revision 71 source and run copied lifecycle, complete verification,
   non-consuming rehearsal, and the three-job hosted Windows matrix.
5. Consume one canonical gate, run fresh three-domain R2, close memory and the milestone, then
   merge only on complete all-pass evidence.

## Architecture Approach

Keep the accepted four-operation `SpecialistRunSession` contract unchanged. Revision 71 changes
only release-review source materialization. Each implicit source receives a full SHA-256 alias over
a canonical domain/context-ID/original-path tuple. The candidate manifest retains the readable
original path plus exact Git mode, object ID, byte count, and digest. Both alias and explicit paths
share one 180-character logical cap, and all collisions are rejected before any immutable write.
The parent mirrors only the compact `inputs/s` root. Runtime supply and every external host effect
remain outside core.

## Dependencies

- V11.1 remains the exact baseline and compiler used for dogfooding.
- Approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be` must be available to historical proof tests.
- The tracked `.npmrc` provides the repository-local offline npm-cache supply.
- Architecture fan-in remains bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
