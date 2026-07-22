# Revision 23 Integration-Owner Reproduction

## Candidate 11

Command:

```powershell
node scripts/run-v12-release-gate.mjs e541393bfe9f6656177ea3bba2cf92940cf4b7b9
```

Result: `fail`. Candidate source, materialization, disposable Git context, and outer repository remained exact. The test suite passed 423 of 424 tests. The only failure was an `ENOENT` read of candidate-local `.local/npm-cache` in the copied-production lifecycle helper.

## Fast Regression

Command:

```powershell
node --test --test-name-pattern "copied production lifecycle uses the release-gate host npm cache supply" test/v12-release-review.test.mjs
```

Result: one pass, zero failures; test duration 14.981 ms.

## Exact Causal Regression

Command:

```powershell
node --test --test-name-pattern "isolated copied production entrypoints complete one exact compile-to-verify lifecycle" test/v12-release-review.test.mjs
```

Result: one pass, zero failures; lifecycle duration `1,908,536.9107 ms`, outer duration `1,908,671.9631 ms`. The source tree was not edited while the lifecycle ran. Post-run `git diff --check` passed, and repository status contained only the intended correction and preserved failure evidence.
