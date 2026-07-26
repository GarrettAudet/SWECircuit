# Revision 72 Root Cause Analysis

## Reproduction

Run `npm run verify` in the Windows Node 22 and Node 24 jobs for exact Revision 71 commit
`841b38a1430ec9b7845dcb11e1104ecbf7f1d75d`.

## Stable Evidence

Hosted run `30203059470` contains exactly three declared jobs. Kernel jobs `89796267518` and
`89796267520` each pass 479 of 480 core tests and fail only
`reviewer snapshot aliases remain byte-readable through ordinary Windows PowerShell paths`.
Their raw logs report `Get-FileHash` as an unavailable command at the hash line. The R71 one-shot
canonical gate was never invoked.
The two exact raw logs are retained inside canonical `swecircuit.raw-evidence.v1` base64 envelopes
so source bytes remain recoverable without changing the approval-bound Git attributes policy.

## Classification

Windows hosted test-harness portability failure.

## Hypotheses

| Hypothesis | Test | Result |
| --- | --- | --- |
| Reviewer aliases are still unreadable | Inspect missing-path output and preceding path operations | Rejected |
| Candidate bytes changed | Compare exact commit/tree and prior immutable local rehearsal | Rejected |
| One Node version regressed | Compare Node 22 and Node 24 outcomes | Rejected |
| The hash probe requires unavailable host supply | Inspect identical command-resolution errors | Confirmed |

## Confirmed Cause

The regression used `Get-FileHash`, so its result depended on PowerShell module exposure as well as
file readability. The GitHub workflow launches `npm run verify` from `pwsh`, then the test starts an
explicit Windows PowerShell child. In that hosted child, `Get-FileHash` is unavailable even though
the path and item operations succeed.

## Causal Fix

Open each already bounded target with `System.IO.File::OpenRead`, compute SHA-256 with
`System.Security.Cryptography.SHA256`, dispose both resources, and compare the same lowercase
`sha256:` digest. This removes only the undeclared module dependency and keeps the regression's
path, length, and content guarantees.

## Independent Review Finding

Attempt 1 confirmed the causal replacement and every hosted-evidence binding, then found a
fail-open test edge. Windows PowerShell method errors can be non-terminating, and loop variables
persist between iterations. Two adjacent roster entries have identical bytes and digests, so a
second-row hash error could reuse the first row's hash, write an error to `stderr`, and still exit
zero because the probe checked only status and parsed stdout.

## Follow-Up Correction

Set `ErrorActionPreference` to `Stop`, clear all per-row item, stream, algorithm, byte, and hash
state, require exact stdout and empty stderr on success, and add a negative regression with two
identical files whose second `ComputeHash` call receives a forced null input. The negative must
exit nonzero with no success output. This changes only the proof harness, not snapshot
materialization or product behavior.
