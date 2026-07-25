# Implementation Plan

## Status

The product implementation is complete. Revision 58 is retired, and Revision 59 is the active release correction in pre-freeze rereview.

## Steps

1. Preserve Revision 58's exact lifecycle pass, exact full-verifier failure, hosted-CI failure, and unconsumed gate evidence.
2. Restore the approved V11 documentation identities and close the hosted raw-evidence whitespace policy with positive and adversarial tests.
3. Obtain independent read-only rereview, freeze exact source identities, and commit once.
4. Run the exact copied lifecycle, full verifier, and hosted matrix against the frozen commit.
5. Consume one canonical gate, run fresh three-domain R2, close memory and the milestone, then merge only on complete all-pass evidence.

## Architecture Approach

Keep the accepted four-operation `SpecialistRunSession` contract unchanged. Revision 59 changes release evidence and hosted validation only: R58's full-history and Windows checkout bootstrap remain, V11-approved mutable documentation returns to its exact bytes, raw `.log` and `.patch` artifacts remain source-preserving, and the complete tracked-whitespace step is regression-bound.

## Dependencies

- V11.1 remains the exact baseline and compiler used for dogfooding.
- Approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be` must be available to historical proof tests.
- The tracked `.npmrc` provides the repository-local offline npm-cache supply.
- Architecture fan-in remains bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
