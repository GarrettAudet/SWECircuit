# Revision 23 Clean-Materialization Cache Supply Contract

## Goal

Retire Candidate 11 and remove the copied-production lifecycle's dependency on ignored checkout-local npm cache state without weakening exact candidate, private npm configuration, or cleanup guarantees.

## Frozen Failure

- Candidate: `e541393bfe9f6656177ea3bba2cf92940cf4b7b9`.
- Gate outcome: `fail`; 423 of 424 tests passed.
- Candidate source stayed byte-identical before and after the command.
- The failing helper tried to copy candidate-local `.local/npm-cache` before its nested lifecycle began.

## Required Correction

1. Consume the canonical gate's resolved host npm cache supply.
2. Copy it into a fresh lifecycle-owned destination outside the source cache.
3. Reject a missing source, pre-existing destination, non-directory source, or overlapping roots before copy.
4. Preserve the production gate, exact materialization, private npm config, phase authority, handoff, negative-route, and cleanup semantics.
5. Add a fast regression and pass the exact formerly failing lifecycle.
6. Preserve Candidate 11's receipt and raw logs without modification or rerun.

## Scope

Editable source is limited to:

- `test/helpers/v12-release-review-lifecycle.mjs`
- `test/v12-release-review.test.mjs`

The integration owner may add trace, RCA, memory, review, and milestone artifacts. No production kernel or release entrypoint change is authorized by this correction.

## Acceptance Evidence

- Exact Candidate 11 receipt and raw log identities.
- Exact pre-edit Candidate 11 blobs and exact final source identities.
- Fast cache-supply and overlap regression result.
- One complete copied-production lifecycle pass with source reauthentication and cleanup.
- Independent package-bound review of the exact correction.
- Complete pre-freeze verification before a successor commit.
