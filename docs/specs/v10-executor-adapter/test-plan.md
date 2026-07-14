# Test Plan: V10 Bounded Executor Boundary

## Status

Acceptance-candidate verification active.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Valid execution test, installed-package execution, and file-backed `inspectTrace` reconstruction |
| AC2 | Table-driven artifact, manifest, identity, grant, policy, proxy, and signal rejection with zero-call assertions |
| AC3 | Missing, extra, broad, narrow, and ceiling-exceeding permission tests |
| AC4 | Completed, declared-failed, thrown, rejected, malformed, revoked, and secret-bearing settlement tests |
| AC5 | Pre-abort, expired packet, acknowledged caller cancellation, acknowledged timeout, absolute-deadline, and first-observation tests |
| AC6 | Grace-expiry, late-rejection, and settlement-beyond-acknowledgment tests proving non-terminal `abort_unconfirmed` journals |
| AC7 | Full V9 regression suite, offline dogfood, package dry run, and clean installed consumer |
| AC8 | Feature package, research, ADR, review records, dogfood evidence, memory links, and V10 milestone |

## Automated Checks

- Preflight: valid artifacts, exact kinds, manifest capabilities, matching identities, closed grants, all three permission directions, policy bounds, and zero invocation on rejection.
- Snapshots: nulls, cycles, accessors, input mutation detachment, fulfillment resolve-then-mutate detachment, sparse arrays, dense oversized objects, excessive depth, revoked proxies, live proxy traps, forged signals, and revoked signal proxies.
- Lifecycle: completion, declared failure, throw, malformed settlement, pre-start cancellation, pre-start expiry, acknowledged caller cancellation, acknowledged timeout, unconfirmed abort, completion at or after deadline, early timer re-arming, final pre-call deadline crossing, and caller-versus-deadline precedence.
- Privacy: return-bound identity canaries, thrown-value suppression, unknown-field suppression, and secret-bearing evidence rejection.
- Journal: deterministic IDs, contiguous sequence, grant link, causation, immutability, internal V9 inspection for every returned summary, and file-backed inspection for a completed execution.
- Package: offline tarball installation, package-file allowlist, independent declaration compilation, class-based executor implementation, real result narrowing, installed execution, and installed trace inspection.
- Dogfood: one controlled `SC4206` grant failure with zero calls, one corrected invocation, a seven-event caller-owned trace, byte-checked evidence, and identity-checked cleanup.

## Manual Checks

- Confirm the public guide makes host-owned sandboxing, approvals, persistence, scheduling, retry, merge, and memory responsibilities explicit.
- Confirm the API never claims that an abort signal proves work stopped.
- Confirm the six canonical artifact kinds and V9 CLI remain unchanged.
- Confirm package documentation links resolve from the installed artifact.

## Regression Coverage

- The V9 initialization, project-validation, schema, path, privacy, CLI, trace-inspection, quick-start, and dogfood suites remain part of `npm.cmd run verify`.
- Every preflight rejection tested against a counting executor must leave the count at zero.
- A deadline wake-up observed early must re-arm rather than cancel work.
- A deadline reached at the final invocation boundary must produce the no-call queued-to-cancelled journal.
- A settlement observed at or beyond the acknowledgment bound must remain `abort_unconfirmed`.
- A live proxy must be rejected before its reflection traps execute.
- A packed TypeScript consumer must compile and narrow the root-exported contract under independent compiler settings.
- A fulfilled settlement must be normalized and detached before a later microtask can mutate the provider-owned source object.

## Skipped Checks

No live provider, network, shell, process tree, container, remote protocol, destructive workspace, scheduler, retry, merge, or automatic memory mutation is exercised because V10 implements none of those capabilities.

## Verification Evidence

- Baseline `2b7bef37fb2477e3fc8779171c5971a3db42f20b`: `npm.cmd run verify` passed with 209 tests; both workflow checkers passed with 42 negative scenarios.
- Corrected V10 implementation: `npm.cmd run verify` passed with 275 tests, deterministic V10 dogfood, dry-run package inspection, and the clean offline installed consumer.
- Corrected working-tree evidence before the next freeze: the positive checker and all 43 V10-aware negative scenarios passed. Both workflow checkers will run again against the exact committed candidate.
- Independent postimplementation review first returned three `REVISE` verdicts. Candidate `e3453e0` then returned `REVISE / PASS / REVISE` despite green CI. Candidate `9d8907a` returned three `PASS` verdicts and passed all seven jobs in run `29357443883`.
- The first pre-closeout phrase search found one stale no-call requirement in the feature spec. `2c6dff4` then returned `PASS / REVISE / REVISE`; `dbbeeb1` returned `REVISE / REVISE / PASS` for one ADR race rule and stale ephemeral terminology. The source corrections require the positive and 43-scenario checker replay, exact review, and hosted CI before acceptance.