# Tasks: V10 Bounded Executor Boundary

## Status

T006 acceptance closeout active.

## Task List

Each task has a bounded scope and explicit verification evidence.

## Tasks

- [x] T001: Retrieve the V9 baseline and research current execution boundaries.
  Scope: Review kernel contracts, ADR 0001, memory, Codex subagent behavior, MCP Tasks, A2A, Node process semantics, guardrails, tracing, and CI security.
  Verification: `docs/research/snapshots/2026-07-14-v10-executor-boundary-scan.md` links findings to primary sources.
- [x] T002: Freeze ADR 0002 after independent review.
  Scope: Define authority, adapter loading, lifecycle, cancellation, trace ownership, and deferred process isolation.
  Verification: Three bounded review handoffs are reconciled in `architecture-review.md`; ADR status and required changes are explicit.
- [x] T003: Implement executor preflight and authority checks.
  Scope: Validate artifacts, identities, capabilities, grant structure, permission relationships, and timeout declarations before invocation.
  Verification: Unit tests prove every invalid case fails closed and the executor call count remains zero.
- [x] T004: Implement one-work-packet lifecycle execution.
  Scope: Invoke the injected adapter, normalize completion, collect schema-valid events, handle exceptions, and represent acknowledged and unacknowledged aborts.
  Verification: Integration tests inspect success, failure, timeout, cancellation, and `abort_unconfirmed` journals.
- [x] T005: Add the deterministic test executor and public embedding docs.
  Scope: Provide an in-process, no-I/O adapter and document the current capability without implying provider execution or sandboxing.
  Verification: Consumer test imports the built package, runs the deterministic test executor, and inspects its returned journal offline.
- [ ] T006: Run canonical verification and complete the V10 trace.
  Scope: Run checker tests and `npm.cmd run verify`, review the diff, record dogfood friction, update governance and memory, and publish the milestone.
  Verification: `test-plan.md`, `review.md`, memory files, and `docs/milestones/v10.md` contain linked passing evidence and residual risks.

## Dependencies

- T002 depends on T001.
- T003 and T004 depend on accepted ADR 0002.
- T005 depends on the stable executor interface from T003 and T004.
- T006 depends on T002 through T005.

## Out Of Scope

- A Codex, Claude, MCP, A2A, shell, child-process, container, or hosted executor.
- Scheduling, retry, workspace management, durable event writing, approval UI, merge, or automatic memory mutation.
- Public package distribution or a stable 1.0 API.
