# Revision 61 Root-Cause Analysis

## Status

Root cause confirmed and corrected. Focused, broad pre-freeze, and independent review gates pass.

## Reproduction

Invoke the canonical gate once for Revision 60 commit `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3`.

## Stable Evidence

- Canonical receipt result: `fail`.
- Canonical command exit code: `1`.
- Core suite inside the exact candidate: 461 pass, 0 fail.
- Copied lifecycle: 1 pass, 1 fail.
- Failing operation: nested `materializeCandidateSource(candidateCommit)`.
- Diagnostic: `Unable to resolve candidate commit.`
- Immutable receipt:
  `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/d7f95dff6dc098dfcd38f64de4e21edfe4b587c3/canonical-gate-receipt.json`.

## Confirmed Cause

The canonical gate correctly executed `npm run verify` inside a disposable exact candidate Git context. The copied lifecycle then imported the gate helper and attempted a second candidate materialization. Its default Git runner intentionally constructs a fresh sanitized environment and therefore discarded the enclosing candidate's `GIT_DIR`, `GIT_WORK_TREE`, and index bindings. Because the copied source tree contains no discoverable `.git` directory, the nested commit lookup failed.

Local and hosted verification ran from ordinary repository checkouts, where the default runner could discover Git metadata. Those checks therefore did not exercise the extra enclosing candidate boundary.

## Causal Correction

The lifecycle test now supplies one explicit `runEnclosingGit` function to both:

1. `materializeCandidateSource` as `gitRunner`.
2. `createCandidateGitContext` as `sourceGitRunner`.

The runner uses the lifecycle process's exact environment. Under the canonical gate, that environment is already the closed candidate Git authority. Under ordinary repository verification, it resolves the current exact checkout. The production gate's default sanitized runner remains unchanged.

## Regression Strategy

The regular release-review suite now inspects the canonical lifecycle source and requires both explicit bindings. A fresh-process blob-only fixture proves the default failure, explicit success, exact nested and outer identities, and complete cleanup. The fixture's own bytes are independently bound and assigned to both lifecycle and security R2 reviewers.

The copied lifecycle remains the full executable proof that nested materialization, nested Git context, candidate-owned execution, source immutability, and cleanup all complete together after source freeze.
