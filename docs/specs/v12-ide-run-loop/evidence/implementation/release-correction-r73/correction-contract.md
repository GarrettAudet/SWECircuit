# Revision 73 Correction Contract

## Goal

Retire the externally terminated R72 one-shot attempt without relabeling it, preserve its exact
hosted and canonical-attempt evidence, prove the corrected launch transport with a candidate-neutral
test fixture, and qualify one evidence-only successor whose long-running canonical process is owned
by a short-lived Windows host launch rather than an open IDE tool call.

## Fixed Facts

- R72 commit: `5bc547eab6b22b862e798ad72df0d35aaa64771f`.
- R72 tree: `e7352a65cd57ad26b56d13562cf41448b7287388`.
- Exact copied lifecycle, complete immutable verification, and disposable exact-candidate
  rehearsal: pass.
- Hosted run `30207051835`: exactly three Windows jobs, all pass.
- The real R72 gate was invoked exactly once and terminated externally after about 539.5 seconds
  with decimal status `1073807364`, hexadecimal status `0x40010004`,
  `DBG_TERMINATE_PROCESS`.
- Its stdout records 482/482 core tests passing and lifecycle starting. No canonical receipt was
  published.
- No matching child process or owned scratch root remained after termination.
- R72 is permanently retired. Its candidate slot and exact raw logs must never be deleted,
  rewritten, completed by hand, or invoked again.

## Authorized Change

- Preserve exact R72 hosted metadata and source-preserving job-log envelopes.
- Preserve the exact failed canonical slot and add a closed interruption observation.
- Reconcile active status, diagnosis, test plan, review, and memory.
- Add executable authentication for the R72 hosted pass, interruption status, exact log bytes,
  absent receipt, and permanent retirement.
- Preserve and explicitly reject the accidental exact-R72 replay as release qualification.
- Add and independently review a dedicated transport fixture that never receives or invokes a
  candidate commit.

No kernel, runtime, public API, schema, package metadata, dependency, release-gate implementation,
review harness, verifier, or support-platform behavior may change.

## Host Invocation Contract

The external Windows host must:

1. Confirm the exact candidate commit, tree, clean tracked state, absent candidate slot, immutable
   local qualification, rehearsal pass, and hosted three-job pass.
2. Start exactly one hidden background `node scripts/run-v12-release-gate.mjs <commit>` process
   with stdout and stderr redirected to external files.
3. Persist the candidate commit, process ID, executable, arguments, working directory, launch time,
   and output paths before the launching shell exits.
4. Poll the process and candidate slot without invoking the gate again.
5. Treat any missing, malformed, non-pass, or identity-mismatched receipt as permanent candidate
   retirement.

This is external-host execution supply. It does not add a process-launch effect to SWECircuit core
or weaken the one-shot rule.

## Acceptance

- A dedicated candidate-neutral fixture proves that a launcher can exit before its worker while a
  later timestamped poll observes continued process activity and one bound receipt: pass.
- R72 evidence authenticates byte-for-byte and proves no receipt exists.
- The accidental exact-R72 replay is preserved, classified invalid, and rejected as release
  qualification.
- Focused, complete mutable, checker, dogfood, and independent review gates pass.
- R73 then freezes once and must independently pass immutable local, rehearsal, hosted, canonical,
  and fresh three-agent R2 gates.

## Transport-Fixture Result

Probe `5ab49c21-83e2-48d7-98a1-f065d69e47b2` started hidden process `16232`. The
launcher exited after about 507 ms with no receipt. A later timestamped poll observed a
post-launcher heartbeat, and the same process published one `pass` receipt without another launch.

- Probe nonce, PID, process start time, source digests, request digest, and launch digest are
  cross-bound.
- Launcher exit, 20 receipt-free polls, one final poll, heartbeat, receipt, completion, and raw
  streams preserve
  one identity.
- Worker result and exit code: `pass` and zero.
- Launcher stdout is an exact captured 122-byte LF-stable process-identity record; launcher stderr and worker
  stdout/stderr are zero captured bytes.
- No candidate commit, candidate slot, or canonical release command is an input to the fixture.

The first fixture attempt retained captured standard handles, causing the supervising call to
appear live until the worker completed. The corrected runner captures launcher output through
dedicated files while the worker owns separate output files, proving the intended detached
boundary without discarding streams. Both attempts are recorded as diagnostic history; only the
corrected result qualifies the transport.

The earlier exact-R72 replay mechanically completed but violated the commit-level one-shot rule.
It is preserved under `inputs/r72-invalid-replay/` with
`releaseQualificationValid: false`; it cannot qualify R72, R73, or the transport correction.

`releaseReady: false`.
