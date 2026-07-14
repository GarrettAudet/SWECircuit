# Implementation Plan: V10 Bounded Executor Boundary

## Status

Active.

## Summary

Add one narrow asynchronous library operation that validates a work packet, adapter declaration, host grant, and run identity before invoking a caller-injected executor. The kernel will collect canonical lifecycle events, normalize bounded completion data, and return an honest non-terminal result when cooperative cancellation cannot be confirmed.

## Impacted Areas

- `src/`: executor types, preflight, lifecycle journal, permission checks, and public exports.
- `test/`: success, failure, permissions, timeout, cancellation, privacy, and regression cases.
- `docs/architecture/decisions/`: ADR 0002 for the new runtime and authority boundary.
- `docs/framework/`: adapter guidance and module registry status.
- `docs/research/`: dated evidence and practice-register decisions.
- `README.md` and `docs/ai/handbook.md`: current capability and embedding path.
- `docs/memory/` and `docs/milestones/`: durable V10 trace.

## Approach

- Keep canonical artifact schemas unchanged and snapshot packet, manifest, and grant values before strict validation.
- Introduce a typed `WorkPacketExecutor` port implemented by a host object, never by executable manifest fields.
- Introduce an invocation-scoped `ExecutionGrant` bound to one run, attempt, packet, and executor version.
- Reuse directional permission coverage with three explicit predicates: request in grant, grant in request, and grant in packet ceiling.
- Keep `OperationResult.ok` as the preflight and processing channel; represent work outcome only in a discriminated execution summary.
- Generate one deterministic standalone `RunEvent` journal and re-inspect the complete in-memory JSONL through V9 semantics before return.
- Normalize only allowlisted completed or failed settlements; convert throws, rejections, malformed data, and secret-bearing strings into fixed failures without copying raw values.
- Linearize completion, external abort, packet deadline, invocation timeout, acknowledgment, and late settlement through an internal controllable clock seam.
- Add `createDeterministicTestExecutor`, which performs no filesystem, process, network, or secret access.

## Interfaces And Data

The unstable 0.x root surface will add an asynchronous `executeWorkPacket` operation returning an `OperationResult` that wraps `ExecutionSummary`, plus `WorkPacketExecutor`, `WorkPacketExecutorRequest`, `WorkPacketExecutorSettlement`, `ExecutionGrant`, `ExecutionPolicy`, `ExecutionDisposition`, `ExecutionFailureCode`, and `createDeterministicTestExecutor`. Artifact and event types needed by a TypeScript host will also be exported deliberately. ADR 0002 contains the normative type sketch and lifecycle matrices.

A clean packed TypeScript consumer will implement the port, construct a grant and policy, invoke the operation, and exhaustively narrow every disposition. No CLI command, canonical artifact kind, JSON schema, persisted state, or network protocol is added in V10.

## Architecture And ADR Impact

ADR 0002 is required because V10 introduces executable host code, runtime authority, cancellation, and event production. ADR 0001 remains the foundation and is amended only by the explicitly approved V10 boundary.

## Security And Privacy

- Declarations never grant authority; only the invocation-bound host grant does.
- The kernel does not load adapter code, execute shell strings, inherit credentials, or persist provider data.
- Direct values are traversed into detached, bounded, deeply frozen plain-data snapshots before validation.
- Raw exceptions, rejection values, abort reasons, unknown-field values, and secret-bearing output are not copied into any return channel.
- Timeout is cooperative and uses first-winner precedence plus an absolute deadline recheck. Before invocation, abort or deadline can terminate because no work started. After invocation, an unacknowledged abort is reported as live-work uncertainty, not terminal success or cancellation.
- The host, not the kernel, enforces workspace readiness, sandboxing, permissions, credentials, and revocation.

## Rollback Or Recovery

The change is additive. Revert the V10 executor module, exports, tests, and documentation while retaining the V9 initializer, validator, and inspector. No data migration or persisted runtime state requires recovery.

## Risks And Mitigations

- Risk: host code exceeds declared permissions.
- Mitigation: make host sandboxing an explicit prerequisite and validate the grant boundary before invocation.
- Risk: cancellation races produce false terminal evidence.
- Mitigation: terminalize a pre-invocation abort or deadline only on the proven no-call path; after invocation, terminalize only after adapter settlement and otherwise return `abort_unconfirmed`.
- Risk: generated journals drift from the RunEvent schema.
- Mitigation: validate generated events and inspect them in integration tests.
- Risk: API surface grows into orchestration.
- Mitigation: execute exactly one work packet, with no selection, retry, persistence, merge, or memory automation.
