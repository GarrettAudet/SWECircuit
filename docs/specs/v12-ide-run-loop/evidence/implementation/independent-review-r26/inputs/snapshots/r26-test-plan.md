# Revision 26 Test Plan

## Focused Behavior

- Spawn a fresh Node process with hostile mixed-case outer Git routing, configuration tuples, `GIT_CONFIG_PARAMETERS`, every Git-reported repository-local variable, and an unknown future `GIT_*` variable.
- In that process, call the real fixture initializer and blob authenticator and require `init`, `add`, `commit`, `cat-file`, and `ls-tree` to succeed against the fixture repository.
- Verify fixture, copied-gate, and copied-parent environments retain only the three reconstructed Git controls plus their declared non-Git supplies.
- Verify `runGit` rejects a missing explicit environment.

## Focused Suites

- Run the cache, fixture-history, Git-environment, and copied-production lifecycle selectors.
- Run `test/v12-release-gate.test.mjs` with workspace permissions sufficient for its owned `.local` scratch root.
- Run targeted syntax, formatting, lint, diff, template, and V11 package/handoff checks.

## Complete Lifecycle

Run the complete copied-production lifecycle with a disposable enclosing candidate-style Git context. Require all nested gate, parent, handoff, negative-route, immutability, and cleanup evidence to pass.

## Pre-Freeze

- Run `npm.cmd run verify` from the mutable successor source.
- Run the workflow checker and checker mutation matrix.
- Replay V11 evidence verification.
- Obtain a new package-bound independent semantic review over immutable Revision 26 snapshots.
- Only then freeze a new commit and run its canonical gate exactly once.
