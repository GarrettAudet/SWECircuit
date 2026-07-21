# Revision 16 Test Plan

## Required Checks

1. Authenticate every declared source against its exact byte count and SHA-256 digest before editing.
2. Add a focused regression in `test/v12-release-review.test.mjs` that extracts active `## Status` sections from the designated V12 source-of-truth documents and rejects `Candidate N` or `Candidates N` language there.
3. Assert that the test-plan status distinguishes package identity verification from Revision 1 incomplete fan-in, Revisions 2-3 `split`, later `pass` routes, and release readiness.
4. Run `node --test test/v12-release-review.test.mjs`.
5. Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
6. Run the repository formatter and linter checks over the changed source set without rewriting files outside the declared scope.
7. Run `git diff --check` and inspect the complete diff for scope and semantic accuracy.

## Success

All focused checks pass, every active status banner describes one consistent evidence state without predicting a candidate ordinal, exact historical outcomes remain intact, and no runtime behavior or immutable evidence changes.

## Stop

Return `fix`, `diagnose`, or `block` if a source binding fails, a required truth cannot be established from preserved evidence, a check fails for a causal reason, or the correction requires edits outside declared scope.
