# Architecture Review: V10 Bounded Executor Boundary

## Status

Complete. Initial fan-out and two focused revision rounds completed on 2026-07-14; final architecture and security checks returned `PASS` with no unresolved blocker, so ADR 0002 is accepted for implementation.

## Review Units

| Unit | Reviewer | Verdict | Primary Concern |
| --- | --- | --- | --- |
| Architecture and API | `019f614a-8f33-7651-ac07-d43980a8f8f6` | REVISE | Result channels, journal contract, identity binding, and standalone scope were underspecified. |
| Authorization and cancellation | `019f614a-cf72-7010-9008-b3d36fd0c287` | REVISE | Race precedence, deadline behavior, permission direction, privacy, and deep snapshots were underspecified. |
| Developer experience and testability | `019f614b-0dbc-7af0-908a-f2cb87b64189` | REVISE | Public signatures, recovery semantics, event matrices, diagnostics, and consumer typing were missing. |

## Reconciled Must-Fix Findings

### R1: Freeze A Complete Public Contract

The ADR must define `WorkPacketExecutor`, its immutable identity, invocation request, invocation-scoped grant, timing policy, closed settlement, execution summary, and `OperationResult` semantics before code.

Disposition: accepted. ADR 0002 receives a complete TypeScript sketch. `OperationResult.ok` means preflight and invocation processing succeeded; work success is represented only by `ExecutionSummary.disposition` and terminal fields.

### R2: Define Exact Lifecycle Journals

The contract must define standalone run ownership, sequence origin, attempt number, event IDs, actor, correlation, grant link, causation, legal transitions, and exact event order for every disposition.

Disposition: accepted. Every V10 call creates one standalone, non-appendable journal with attempt number one, zero-based contiguous sequences, deterministic event IDs, fixed kernel actor, and a linear causation chain. The whole journal is re-inspected through V9 semantics before return.

### R3: Make Cancellation Linear And Honest

Completion, caller abort, and deadline need one first-winner rule. Packet deadline, invocation timeout, pre-abort, grace expiry, late settlement, synchronous blocking, and simultaneous causes must be explicit.

Disposition: accepted. The earliest observed external abort or effective monotonic deadline wins over later settlement. Deadline is checked again when settlement is observed, so a delayed timer cannot turn an over-deadline result into success. Once abort wins, result content is discarded. Unacknowledged abort stays non-terminal, and synchronous event-loop blocking is an explicit host risk.

### R4: Formalize Authority Direction And Trust Limits

The grant must be structurally closed and the three directional permission predicates must be written without shorthand ambiguity. Identity matching records a checked assertion but cannot prove host enforcement, freshness, revocation, single use, or executable provenance.

Disposition: accepted. Request must be covered by grant, grant by request, and grant by packet ceiling. The executor object, manifest, and grant IDs and versions must match. Documentation uses `invocation-scoped`, not `ephemeral` or `single-use`.

### R5: Seal Inputs, Outputs, And Privacy

Readonly TypeScript fields are insufficient. Inputs, completion data, summary, and events need bounded detached snapshots and deep freezing. Raw exceptions, rejection values, abort reasons, extra output values, and secret-shaped evidence strings must not reach any return channel.

Disposition: accepted. V10 uses closed traversal and fixed classifications, does not stringify thrown values, rejects unsafe completion data, and tests the entire serialized API result with secret canaries.

### R6: Keep Host Readiness Out Of The Kernel

Standalone packet validation must not imply dependency readiness, context loading, branch checks, workspace allocation, sandboxing, or permission enforcement.

Disposition: accepted. The host selects a ready packet and owns those controls. V10 validates only standalone artifact, compatibility, identity, authority, policy, settlement, and journal contracts.

### R7: Test The Adapter-Author Surface

The packed consumer gate must compile a TypeScript host against root declarations and narrow every result disposition, not merely assert declaration files exist.

Disposition: accepted. T005 includes a clean external TypeScript consumer compile using the repository's existing TypeScript dependency and packed package.

## Focused Review Results

- First focused architecture check: REVISE for workflow pairing, summary discrimination, bounded event IDs, and exact cancellation values.
- First focused security check: REVISE for live-work acknowledgment and incomplete canary coverage.
- Final architecture check: PASS; all four blockers and output ownership ambiguity resolved.
- Final security check: PASS; legal lifecycle values, monotonic deadline projection, complete return-bound canary policy, and stopped-work acknowledgment resolved.
- No reviewer edited repository state. The primary IDE agent remained integration owner.

## Validated Choices

- One host-injected executor, one selected packet, and one attempt is the right V10 scope.
- `ExecutionGrant` remains a runtime object, not a seventh artifact kind.
- No manifest-driven loading, shell, provider dependency, event sink, scheduler, retry, merge, or memory automation belongs in V10.
- `abort_unconfirmed` remains a result disposition represented by a non-terminal RunEvent journal.
- A deterministic no-I/O test executor is the right first conformance implementation.

## Second Review Gate

The focused second review must confirm:

- The public type sketch is complete and internally consistent.
- Every lifecycle matrix is legal under V9 trace semantics.
- The three authority predicates are directional and fail closed.
- Deadline and abort precedence cannot create false success or false terminal evidence.
- Snapshot, privacy, and late-settlement rules are testable.

## ADR Recommendation

Accept ADR 0002 for implementation. Any implementation deviation from its public contract, authority predicates, lifecycle matrices, privacy boundary, or abort semantics returns the work to architecture review.
