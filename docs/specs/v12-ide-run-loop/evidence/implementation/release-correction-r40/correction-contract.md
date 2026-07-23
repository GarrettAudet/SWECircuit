# Revision 40 Correction Contract

## Trigger

Candidate 16 commit `a9ee60d31cf302c91f6600ac977d0b62cb153f3f` passed its exact one-shot canonical gate. Fresh R2 preparation then failed closed because diagnostic-only correction folders were interpreted as package-backed specialist revisions.

## Objective

Make correction-lineage discovery classify evidence by a complete package marker contract instead of directory naming alone.

## Scope

- Update `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`.
- Add focused lineage regressions in `test/v12-release-review.test.mjs`.
- Refresh only the exact lifecycle production-identity pin required by the changed harness bytes.
- Preserve Candidate 16 gate evidence and update release trace records.

Product APIs, schemas, specialist runtime behavior, package contents, and the canonical release-gate runner are out of scope.

## Required Behavior

1. A correction revision participates in lineage only when its root contains `package-envelope.json`, `approval.json`, and `handoff-verification.json`.
2. A root containing some but not all package markers fails closed.
3. A diagnostic-only `release-correction-rN` root with none of the markers does not claim a specialist-package revision.
4. Package-backed revisions remain contiguous from Revision 1 and retain the existing minimum-revision gate.
5. The exact Candidate 16 tree resolves to 22 contiguous package-backed revisions.
6. Revision 40 must pass focused checks, all 50 concurrent release tests, the canonical repository verifier, a new one-shot gate, fresh R2, hosted CI, and closeout before merge.

## Route

`review -> diagnose -> fix -> verify`
