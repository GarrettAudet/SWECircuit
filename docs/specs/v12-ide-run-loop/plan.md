# Implementation Plan

## Status

The product implementation is complete. Candidate-addressed external evidence is authoritative
for exact-candidate state. ADR 0006 makes v0.1 Windows-only. Revision 69 passed its copied
lifecycle, then the complete verifier rejected the README bytes against the preserved V11 trust
binding; it is retired with its canonical gate unused. Revision 70 restores the approved README,
keeps Windows scope in the linked support contract, and refreshes the affected executable
identity. V11 and V12 dogfood pass; `releaseReady: false`.

## Steps

1. Preserve Revision 69's exact copied-lifecycle pass, complete-verifier failure, and unused
   canonical gate.
2. Restore the approved concise README context, keep Windows support in `SUPPORT.md`, and refresh
   the affected public-support and lifecycle identity checks.
3. Run focused and complete mutable-source qualification plus independent read-only review.
4. Freeze one exact Revision 70 source and run copied lifecycle, complete verification,
   non-consuming rehearsal, and the three-job hosted Windows matrix.
5. Consume one canonical gate, run fresh three-domain R2, close memory and the milestone, then
   merge only on complete all-pass evidence.

## Architecture Approach

Keep the accepted four-operation `SpecialistRunSession` contract unchanged. Revision 69 changes
only release-review process authority and its evidence: the parent admits
`__CF_USER_TEXT_ENCODING` only on Darwin, includes the exact raw value in the complete invocation
binding, excludes the host-specific value from stable package identity, and rejects every
undeclared environment key as before.

## Dependencies

- V11.1 remains the exact baseline and compiler used for dogfooding.
- Approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be` must be available to historical proof tests.
- The tracked `.npmrc` provides the repository-local offline npm-cache supply.
- Architecture fan-in remains bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
