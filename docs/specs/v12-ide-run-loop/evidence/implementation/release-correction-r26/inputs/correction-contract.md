# Revision 26 Correction Contract

## Trigger

Revision 25's verified independent review returned `fix`. It found that `authenticateFixtureBlobs` omitted the sanitized environment, inherited Git-local variables remained injectable, and the focused regression compared environment objects without executing the complete Git path. A focused release-gate test also exposed a source-text guard collision in the initial deletion implementation.

## Objective

Make every fixture-scoped Git operation explicitly independent of all inherited Git environment state and prove the exact init-to-blob-authentication path in a hostile fresh process.

## Scope

- Remove the implicit `process.env` fallback from the lifecycle `runGit` helper.
- Pass an explicit environment to every Git call; source-status calls explicitly retain the enclosing candidate context, while fixture calls use the closed fixture environment.
- Remove every inherited case-insensitive `GIT_*` key, then add only `GIT_CONFIG_NOSYSTEM`, platform-correct `GIT_CONFIG_GLOBAL`, and `GIT_TERMINAL_PROMPT`; fixture commit dates are added by the fixture initializer.
- Pass the fixture environment through `authenticateFixtureBlobs` for `cat-file` and `ls-tree`.
- Add a fresh-process probe that invokes the actual initializer and blob authenticator under outer routing keys, Git configuration tuples, `GIT_CONFIG_PARAMETERS`, all Git-reported local variables, and an unknown future `GIT_*` key.
- Prove copied gate and parent environment builders apply the same closed boundary and preserve their declared non-Git runtime supplies.

## Boundaries

- Preserve Candidate 12 and Revision 25 evidence exactly.
- Do not rerun Candidate 12's gate or rewrite either Revision 25 handoff.
- Do not change production kernel behavior, release entrypoints, package metadata, lock data, compiler behavior, schemas, or trust policy.
- Do not freeze a successor until focused verification, a hostile-context complete lifecycle, pre-freeze verification, and a new independent semantic review pass.

## Acceptance

- No fixture-scoped Git call can omit an environment without failing its helper contract.
- No inherited `GIT_*` value survives into fixture, copied-gate, or copied-parent process environments except the three explicitly reconstructed controls.
- Actual fixture `init`, `add`, `commit`, `cat-file`, and `ls-tree` operations pass from a fresh process carrying hostile outer Git state.
- The complete copied-production lifecycle passes with an enclosing candidate-style Git context.
- Focused release-review and release-gate tests pass without weakening their existing assertions.
