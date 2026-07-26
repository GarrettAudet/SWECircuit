# Implementation Plan

## Status

The product implementation is complete. Candidate-addressed external evidence is authoritative
for exact-candidate state. Revision 68 is retired after exact local qualification; its Windows
jobs passed and its macOS failures triggered an owner support-scope review. ADR 0006 now makes
v0.1 Windows-only. Revision 69 aligns CI, support documentation, and release evidence with that
decision. `releaseReady: false`.

## Steps

1. Preserve Revision 68's exact local passes, final hosted matrix, failed macOS logs, and unused
   one-shot gate.
2. Record the owner's Windows-only support decision, align public support claims, and constrain
   hosted release qualification to Template Check plus Windows Node 22/24.
3. Obtain independent read-only review, synchronize trace artifacts, freeze exact source, and
   commit once.
4. Run exact copied lifecycle, complete verification, non-consuming rehearsal, and the three-job
   hosted Windows matrix against that frozen commit.
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
