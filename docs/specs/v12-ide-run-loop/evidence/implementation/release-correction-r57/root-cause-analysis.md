# Revision 57 Root-Cause Analysis

## Reproduction

- Exact Revision 56 commit: `6dfb99f86a88837ad94c2e73a422c0f6ba2d8c1f`.
- Exact copied lifecycle: pass, 2/2.
- Full `npm.cmd run verify`: pass, including 458/458 core tests.
- Its only canonical gate returned `fail` with 457/458 core tests passing.
- The sole failure was `candidate Git context is disposable, exact, and usable from the materialization`.

## Stable Evidence

- Receipt: 14,996 bytes, `sha256:214dcb0703567aeb5b4da4f791a872373586e07705c764311823a779736a4cc5`.
- Standard output: 37,669 bytes, `sha256:a796962604033252f93adde9b00672e8c4f1c6876effd944cf5677612fde617c`.
- Standard error: 19,096 bytes, `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.
- Exact source, materialization, disposable Git identity, execution authority, dependency closure, and cleanup all passed.
- The failing spawn used a valid private `git.exe` but returned `ENOENT` before Git executed.

## Failure Classification

Windows test-fixture path-budget defect exposed by the canonical nested private `TEMP`; no production gate, Git discovery, or candidate-materialization defect was observed.

## Hypotheses

- Private Git was missing or substituted: rejected by the authenticated runtime and successful surrounding Git operations.
- Disposable candidate Git context was corrupt: rejected by the receipt's exact source and materialization checks.
- The test's working directory exceeded the Windows process-creation boundary: confirmed by the 260-character `cwd`, the old 96-character filler, and a focused reproduction under nested private `TEMP`.

## Confirmed Cause

The R56 self-test created long-path pressure by extending the disposable worktree directory. The canonical gate already runs tests below a nested private `TEMP`, so the composed working directory reached 260 characters. Windows could not create the Git child process even though the executable path was valid.

## Causal Fix

Keep production behavior unchanged. Build the long entry from two bounded repository-relative path components and choose the disposable worktree filler dynamically around a 160-character target. The source fixture and child-process `cwd` remain bounded while the complete materialized tracked path still exceeds 260 characters.

## Rejected Attempt

The first R57 draft used two 80-character path components and almost no worktree filler. A nested-`TEMP` probe rejected it before freeze because the source fixture itself became too long for Git to stat. The final bounded 45-character components preserve the intended materialized-path crossing without overgrowing the source repository.

## Regression Coverage

- The focused long-path test passes under a disposable 96-character nested `TEMP`.
- The exact committed long entry is present.
- The Windows worktree path is below 260 characters.
- The complete materialized tracked path is above 260 characters.
- Candidate-context inspection and `git diff --quiet` both pass.
