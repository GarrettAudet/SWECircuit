# Candidate 15 Retirement

## Identity

- Commit: `ee297d8e11466763acc9b4c630de445eb57b00c3`
- Tree: `c55d4fc1ee1110b4a0be7df9b0cbf367fe38fdda`
- Canonical gate outcome: `fail`
- Receipt: `inputs/canonical-gates/ee297d8e11466763acc9b4c630de445eb57b00c3/canonical-gate-receipt.json`

## Stable Evidence

- Candidate source: 3,597 files, 109,159,647 bytes, `sha256:cf402052aaa882327678253763f8fe7ef55d9a5d884bbdec9cb90267e1c2789b`.
- Materialization digest, candidate Git context, source repository, and cleanup remained exact.
- The core suite passed 443 of 445 tests.
- Both failures were Git-batch fixture setup races on the inherited candidate `GIT_INDEX_FILE`; product and kernel assertions did not fail.
- Receipt: 2,296 bytes, `sha256:27d7fe234f8b1201e0b0f2b8079dcfea439e6e0527822a7b11244a72927589d8`.
- Stdout: 37,597 bytes, `sha256:76b48df2f50ebed0921d55c0a2ada36abfb30362c5c3bfacc4a478dd521a6f81`.
- Stderr: 19,492 bytes, `sha256:00ce84e8736d7583a9716c2cc28900f92401a907f381c72e074578739408805e`.

## Retirement Reason

The isolated Git-batch fixture copied the host process environment, including the canonical gate's `GIT_DIR`, `GIT_WORK_TREE`, and shared `GIT_INDEX_FILE`. Node ran the release-gate and release-review test files concurrently, so both temporary fixture repositories addressed the candidate context and contended on `candidate.index.lock` instead of using their own `.git` directories.

Revision 37 strips repository-scoping Git variables and dynamic `GIT_CONFIG_*` bindings before every fixture Git process while retaining only explicit closed configuration. A direct hostile-environment regression and the complete concurrent release-gate/release-review suites prove the isolation boundary.

## Route

Outcome: `verify -> diagnose -> fix`.

Never rerun this candidate's exact gate. A different committed source identity must pass broader verification and package-bound review before another one-shot gate.
