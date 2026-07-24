# Revision 56 Root-Cause Analysis

## Reproduction

- Exact Revision 55 commit: `7c0135c9604893f6baa933d123cd026323ee2912`.
- Its only canonical gate returned `fail` with 454/458 core tests passing.
- The four failures were candidate materialization, disposable Git context, hostile host environment, and paths mode.

## Stable Evidence

- The immutable gate receipt records exact source, unchanged materialization digest, exact disposable Git head, clean tracked state, closed execution authority, and cleanup.
- All four failures reported inability to resolve the candidate commit or inspect Git ignore policy.
- The same tests passed in the development worktree, where `.git` was filesystem-discoverable.
- The canonical command ran inside an exact Git-blob materialization without `.git`, with a separate disposable Git context supplied through environment bindings.

## Failure Classification

Test-isolation defect exposed by exact release execution; no product or candidate-materialization failure was observed.

## Hypotheses

- Candidate source or Git context was corrupt: rejected by the immutable receipt.
- Production sanitization removed authority required by the gate: rejected because the canonical command started and 454 tests passed under the closed context.
- Four self-tests implicitly depended on ambient repository discovery: confirmed by their direct default Git calls and paths-mode subprocess.

## Confirmed Cause

Repository-sensitive self-tests were written against the ordinary development checkout. When recursively executed from the exact candidate materialization, their helpers intentionally scrubbed inherited `GIT_*` state and then tried to rediscover a repository that was not present on disk.

## Causal Fix

Keep the production sanitizer unchanged. Add a narrow source-runner injection seam to `createCandidateGitContext`, then give each affected test a private conventional Git fixture and explicit runner. The paths-mode test executes an exact copied gate inside its fixture.

## Regression Coverage

- Four causal tests pass together outside ambient repository discovery.
- The complete 24-test release-gate file passes.
- Hostile `GIT_*` inputs remain stripped and the long-path case still crosses 260 characters.
