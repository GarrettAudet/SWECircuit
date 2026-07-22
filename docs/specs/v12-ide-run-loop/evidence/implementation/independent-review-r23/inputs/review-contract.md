# Independent Revision 23 Review Contract

## Objective

Independently determine whether Revision 23 removes the Candidate 11 checkout-relative cache dependency without weakening source identity, runtime-supply separation, private npm configuration, copied-production lifecycle, or cleanup guarantees.

## Required Review Points

1. Authenticate every declared context source before semantic review.
2. Reconstruct Candidate 11's exact pre-edit helper and test blobs and compare them with final snapshots.
3. Confirm only the two authorized test files changed for the causal correction.
4. Confirm the lifecycle consumes the cache identity resolved by the canonical release gate and contains no fallback to candidate-local `.local/npm-cache`.
5. Confirm source absence, destination pre-existence, non-directory source, and source/destination overlap fail before copy.
6. Confirm the destination is lifecycle-owned and removed by the existing bounded cleanup path on pass and failure.
7. Confirm no production kernel, gate, parent, harness, verifier, package, lock, or private npm configuration behavior changed.
8. Assess whether importing the gate test hook creates side effects, circular initialization, candidate-relative resolution, or authority widening.
9. Assess the fast regression for causal specificity and the complete lifecycle result for real-process coverage.
10. Confirm Candidate 11 evidence is immutable, the candidate is retired, and only a new commit may receive another one-shot gate.
11. Search for a new trust, path, link, race, cleanup, evidence, or test-quality bypass introduced by the fix.

## Verdict Rules

Return `pass` only if every review point is resolved with exact evidence and no release-blocking defect remains. Return `fix`, `diagnose`, `redesign`, or `block` with concrete evidence otherwise. Do not claim release readiness, hosted CI, merge approval, or external host enforcement.

Return only the exact generated `SpecialistAgentHandoff` JSON object. Do not edit reviewed source or evidence.
