# Revision 57 Correction Contract

## Trigger

Revision 56 commit `6dfb99f86a88837ad94c2e73a422c0f6ba2d8c1f` passed its exact copied lifecycle and full verifier. Its sole canonical gate then returned `fail` after 457/458 core tests because the Windows long-path self-test made the process working directory 260 characters under the gate's nested private `TEMP`.

## Objective

Preserve the production long-path guarantee while moving the test's length pressure into the committed repository-relative path and keeping source-repository and process-working-directory paths below Windows process-creation limits.

## Required Behavior

1. Keep production release-gate code unchanged.
2. Keep the complete materialized tracked path above 260 characters.
3. Keep the disposable worktree path below 260 characters on Windows.
4. Exercise candidate-context inspection and `git diff --quiet` under a nested private `TEMP`.
5. Preserve Revision 56's exact receipt and logs; never rerun its consumed gate.

## Scope

- `test/v12-release-gate.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 56 retirement and Revision 57 trace evidence

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
