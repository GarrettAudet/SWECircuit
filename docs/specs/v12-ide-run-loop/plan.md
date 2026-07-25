# Implementation Plan

## Status

The product implementation is complete. Revision 58 is the active release correction and is in pre-freeze verification.

## Steps

1. Preserve Revision 57's local pass and hosted-CI retirement evidence.
2. Verify Revision 58's Windows checkout and full-history correction with focused and broad local gates.
3. Obtain independent read-only review, freeze exact source identities, and commit once.
4. Run the exact copied lifecycle, full verifier, and hosted matrix against the frozen commit.
5. Consume one canonical gate, run fresh three-domain R2, close memory and the milestone, then merge only on complete all-pass evidence.

## Architecture Approach

Keep the accepted four-operation `SpecialistRunSession` contract unchanged. Revision 58 changes release-environment supply only: hosted jobs declare complete Git history, Windows long-path checkout support, read-only permissions, and the existing tracked npm-cache contract.

## Dependencies

- V11.1 remains the exact baseline and compiler used for dogfooding.
- Approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be` must be available to historical proof tests.
- The tracked `.npmrc` provides the repository-local offline npm-cache supply.
- Architecture fan-in remains bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
