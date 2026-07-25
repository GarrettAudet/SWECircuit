# Revision 59 Root-Cause Analysis

## Status

Confirmed and fixed before freeze.

## Trigger

Hosted run `30139492037` failed all seven jobs after Revision 58 had passed focused and broad pre-freeze tests.

## Reproduction

1. Run the exact R58 full verifier: V11 dogfood rejects `CONTRIBUTING.md` at 2451 bytes and digest `sha256:7e63f83bd389f16088daa410d1da306de64819d33b14f94673419d63074bea4d`.
2. Restore that file and rerun V11 dogfood: it rejects `README.md` at 3937 bytes and digest `sha256:bdac5322b56adb5dd16befcb05b7bf7be1712c175d7b8db6a1225d17846699e4`.
3. Scan all tracked non-exempt files with the hosted whitespace rule: 1985 matches occur in immutable `.log` evidence; the same scan with `.log` in the closed exemption set returns zero.

## Stable Evidence

- R58 exact lifecycle result: pass, 2/2.
- R58 exact full verifier: fail at `dogfood:v11` after 460/460 core tests, 2/2 lifecycle tests, specialist example, and V10 dogfood pass.
- Fresh full-history clone with a fresh repository-local npm cache: same V11 context mismatch.
- Hosted run `30139492037`: six kernel failures at `Verify kernel`; template failure at `Check tracked whitespace`.

## Hypotheses

| Hypothesis | Experiment | Result |
| --- | --- | --- |
| Checkout or history remained incomplete | Inspect all hosted step results and fresh-clone history | Rejected; checkout and install passed, and the approved checkpoint is present. |
| The exact lifecycle was broken | Run the copied lifecycle against R58 | Rejected; 2/2 tests passed. |
| R58 invalidated a context-bound V11 input | Run the exact full verifier and fresh-clone verifier | Confirmed; both reject changed README/contributor identities. |
| Source files contain accidental trailing whitespace | Exclude raw evidence extensions and rescan | Rejected; zero normal-source failures remain. |
| Raw evidence is incompatible with normalization | Count matches by extension | Confirmed; all 1985 matches are preserved `.log` artifacts. |

## Confirmed Root Cause

R58 changed two files that the approved V11 dogfood package authenticates byte-for-byte, but its pre-freeze suite did not execute the full `npm run verify` chain. Separately, hosted whitespace validation treated immutable raw logs as editable source text even though `.patch` evidence was already exempt.

## Why It Was Missed

The pre-freeze suite ran the core and release-specific tests independently but did not run every downstream dogfood command in the canonical verifier. The whitespace check existed only inline in hosted YAML and had no mutation regression for raw logs.

Independent review then found two layers of incomplete policy authentication: Attempt 1 showed that authenticating only the exemption declaration did not close widening or control-flow bypass, and Attempt 2 showed that authenticating only the literal step did not close job disablement, Git-environment poisoning, empty enumeration, or missing-file skipping. Attempt 3 showed that script-body authentication still did not bind step-level failure semantics such as `continue-on-error`. Attempt 4 showed that a complete template-job contract still left the six kernel jobs outside the authenticated boundary.

## Fix

Restore both V11 context files exactly, move the Windows prerequisite to `WINDOWS.md`, classify the closed raw-evidence extension set explicitly, bind the entire hosted workflow byte-for-byte in `test/v12-release-gate.test.mjs`, clear Git enumeration overrides, and fail closed on incomplete enumeration.

## Regression Coverage

The hosted-workflow regression now fails if either job is disabled, any step is made non-blocking, Git enumeration is poisoned or accepted empty, a tracked path is skipped, `.log` leaves the exact exemption set, or exemption/control flow is widened. V11 dogfood is run directly before freeze and remains part of the canonical full verifier.

## Follow-Up Work

Evaluate whether historical dogfood packages should bind snapshots rather than mutable top-level documentation. This is not required to close the R59 release defect.

## Memory Update

The context-binding and raw-evidence policies will be promoted to active context and known issues at release closeout.
