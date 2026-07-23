# Revision 38 Git-Environment Closure Contract

## Goal

Close the exact Revision 37 independent-review finding without changing the V12 product kernel or weakening release evidence.

## Source

- Reviewed commit: `148f546cba4c3c9ceecd2bbca07d47fe94878afa`
- Reviewed tree: `b5161396357505cd98e7443997248ee4a2e06e53`
- Verified handoff: 10,105 bytes, `sha256:a9de6ffa8e8a8e3dbee3a3ba4b473ff550d71a4c4b0685e665828e09159ae79f`
- Review outcome: `fix`

## Required Change

1. Remove every inherited environment key whose name starts with `GIT_`, case-insensitively.
2. Reapply only `GIT_CONFIG_GLOBAL`, `GIT_CONFIG_NOSYSTEM`, and `GIT_TERMINAL_PROMPT` for the local fixture process.
3. Preserve unrelated runtime supply such as `PATH` and the test sentinel.
4. Use the same environment builder for the actual fixture Git processes and an observable child process.
5. Prove real fixture init, add, commit, and revision reads from a fresh process carrying hostile repository, configuration, quarantine, namespace, ref, and unknown future `GIT_*` bindings.

## Scope

- `test/helpers/git-blob-loader-fixture.mjs`
- `test/fixtures/git-blob-loader-environment-child.mjs`
- `test/v12-release-review.test.mjs`
- V12 evidence, status, review, RCA, milestone, and memory records

Do not change the product kernel, schemas, public APIs, release-gate semantics, process counts, test selection, or external-host boundary.

## Outcome Rule

The correction emits `pass` only after causal, concurrent, broad repository, and trace checks succeed. Any retained inherited `GIT_*` key, child-process failure, concurrency regression, or package-review non-pass emits `fix` or `diagnose` and retires the source from release use.
