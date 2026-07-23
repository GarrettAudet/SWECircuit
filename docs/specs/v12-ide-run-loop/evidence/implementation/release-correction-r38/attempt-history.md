# Revision 38 Attempt History

## Revision 37 Review

Exact Revision 37 passed its external aggregate with 446/446 core tests, copied lifecycle, package inspection, and offline installed-consumer verification. A separately compiled reviewer authenticated all 57 declared sources and returned a kernel-verified `fix`: the fixture sanitizer retained `GIT_CONFIG_PARAMETERS` and additional inherited `GIT_*` authority channels. `successorFreezeApproved` remained false.

## Correction

The fixture policy now removes every inherited `GIT_*` key case-insensitively and reapplies only the three explicit local configuration controls. Git operations and the environment observer share one spawn path. A fresh child runs under hostile configuration and repository routing, observes only the closed keys, and completes the real two-commit fixture.

## Harness Attempts

1. The first fresh-process assertion reached and completed the child, then rejected one extra literal `}` after the JSON object. The probe source was corrected under its exact SHA-256 guard; no product or boundary logic changed.
2. The first complete concurrent run passed 46/50 and reported four `EPERM` failures while creating declared `.local/v12-release-gate` temp directories under the restricted shell. The authorized rerun, with identical source, passed 50/50. Treat the first result as a sandbox setup failure, not executable acceptance evidence.

## Current Evidence

- Closed-policy and fresh-process causal checks: 2/2 `pass`.
- Causal plus formerly contended constant-process checks: 4/4 `pass`.
- Complete concurrent release-gate/release-review files: 50/50 `pass` in the authorized test environment.
- Complete mutable-source `npm.cmd run verify`: 447/447 core tests, copied lifecycle, V10/V11/V12 dogfood, 148-file package inspection, and offline installed-consumer compatibility `pass` in 679.3 seconds.

Route: `review -> fix -> verify -> pass`. The pass applies only to the mutable Revision 38 source; an immutable commit, fresh aggregate, and package-bound independent review remain required.

## Broad Verification Status Contract

The first complete `npm.cmd run verify` reached the core suite and stopped at 445/447. The only failures were the two active-release documentation contracts: status compression had removed the exact package/handoff verification phrases and the candidate-addressed external-evidence phrase. The full 92,278-byte stdout is preserved as canonical Base64 under `attempts/core-status-failure.stdout.log.b64` and bound by its receipt.

The correction restores those stable phrases while retaining the exact Revision 37 non-pass and Revision 38 state. No implementation, authority, process, or package behavior changed. Both anti-drift tests passed before the repeated complete verifier.

The repeated `npm.cmd run verify` passed in 679.3 seconds. Its 608,320-byte stdout and 50,732-byte stderr are preserved as canonical Base64 under `attempts/` and bound by `npm-verify-pass-receipt.json`. This evidence verifies the mutable working source only; `releaseApproved` remains false.
