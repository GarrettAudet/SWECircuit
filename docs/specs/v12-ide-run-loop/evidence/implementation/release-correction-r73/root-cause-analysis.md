# Revision 73 Root-Cause Analysis

## Failure

The only real R72 canonical invocation ended after about 539.5 seconds with no wrapper output and
no published receipt.

## Stable Evidence

- Candidate `5bc547eab6b22b862e798ad72df0d35aaa64771f` was clean and exact before invocation.
- Its copied lifecycle, complete immutable verifier, disposable rehearsal, and all three hosted
  Windows jobs had already passed.
- Canonical stdout is 38,625 raw bytes at
  `sha256:14a24014ee8158675a9ab0a1d0c1cf16684030e2850f1f0240a7b9a98714c9e4`.
- Canonical stderr is 19,096 raw bytes at
  `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.
- Stdout records 482 tests, 482 passes, zero failures, and entry into the copied lifecycle.
- The process status was decimal `1073807364`, or `0x40010004`.
- Microsoft's NTSTATUS table names `0x40010004` `DBG_TERMINATE_PROCESS`: the debugger terminated
  the process.
- No canonical receipt, matching process, or owned `C:\tmp\swg` scratch root remained afterward.

## Hypotheses

| Hypothesis | Test | Result |
| --- | --- | --- |
| R72 product or core tests failed | Inspect exact canonical stdout counts | Rejected; 482/482 pass |
| The Windows probe regressed | Inspect focused test line and hosted jobs | Rejected |
| Candidate source mutated | Compare prior rehearsal and clean live Git state | Rejected |
| Canonical code emitted a fail receipt | Inspect reserved candidate slot | Rejected; no receipt |
| The outer IDE execution host terminated the process | Decode `0x40010004` through NTSTATUS | Confirmed |

## Confirmed Cause

The gate process was synchronously owned by a long-running IDE shell-tool call. The external host
terminated that process while copied lifecycle work was in progress. The candidate produced no
semantic failure and no receipt, but a missing receipt is intentionally fail-closed.

This is an external execution-transport interruption, not a kernel, probe, package, or hosted-CI
defect. It still consumes the candidate attempt because retrying after partial execution would
break the one-shot invariant.

## Causal Correction

Do not keep the next candidate's long gate process inside an open IDE tool call. A short-lived
Windows host command starts one hidden background process, redirects its streams externally,
persists a launch record, and exits. The integration owner polls the process and candidate slot.
The gate implementation, canonical command, candidate evidence schema, and pass criteria remain
unchanged.

An attempted proof replayed the exact R72 canonical command in a clone. It mechanically passed,
but cloning did not create a new candidate identity. The attempt violated the commit-level
one-shot rule and is invalid release qualification. Its exact bytes remain preserved as a failed
attempt.

The valid proof uses a dedicated candidate-neutral fixture. It cross-binds one UUID nonce, PID,
process start time, request and launch digests, source digests, launcher exit, timestamped polls,
heartbeat, receipt, completion, and raw streams. The launcher exited while no receipt existed; a
post-exit heartbeat and later receipt came from the same process without another launch.

The fixture's first runner captured launcher stdout and stderr. Those inherited handles kept the
supervising call open until the worker closed them, so the attempt could not prove the shell
boundary even though the worker succeeded. Ignoring inherited standard handles was the smallest
causal correction. The corrected fixture passes and is preserved byte-for-byte.

## Retirement Rule

R72 is permanently retired. The preserved slot is evidence of the sole attempt. It must never be
removed to manufacture retry eligibility, and no later passing rehearsal or clone replay can
promote R72.

## Review Route

Independent review attempt 1 returned `block` because the replay was contradictory, active routing
still referenced retired revisions, and hosted/interruption evidence lacked executable
cross-bindings. R73 remains mutable until the dedicated fixture, evidence authentication, active
routing, and fail-closed tests all pass a fresh independent review.

## Reference

Microsoft's authoritative NTSTATUS table:
<https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55>.
