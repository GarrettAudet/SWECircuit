# Revision 38 Test Plan

## Causal

- Assert the pure environment builder retains only the three explicit Git configuration keys.
- Inject `GIT_CONFIG_PARAMETERS`, count/key/value tuples, mixed-case repository variables, quarantine, shallow/graft/replacement/namespace/prefix/optional-lock routes, and an unknown future `GIT_*` key.
- Spawn a fresh Node probe under that hostile environment.
- Observe the environment delivered through the shared fixture spawn path.
- Complete real fixture Git init, add, two commits, and revision reads.

## Concurrency

- Run both constant-process Git-batch tests concurrently with both closure regressions.
- Run the complete release-gate and release-review files concurrently.
- Preserve sandbox-denied setup attempts separately from authorized test results.

## Broad Gates

- Format, lint, typecheck, build, unit tests, package dry run, and offline installed-consumer verification through `npm.cmd run verify` before candidate freeze.
- Template checker and checker regression suite.
- V11 strict evidence replay.
- Fresh immutable aggregate and a newly compiled package-bound independent review for the committed successor.

## Release Boundary

Do not run a one-shot canonical candidate gate on mutable Revision 38 work or reuse Revision 37 aggregate/review evidence as proof of changed bytes.
