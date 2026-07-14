# ADR 0002: Bounded Executor Boundary

## Status

Accepted for V10 implementation on 2026-07-14 after three independent initial reviews returned `REVISE`, two focused revision checks returned `REVISE`, and the final architecture and security acceptance checks returned `PASS` with no unresolved blocker.

## Date

2026-07-14.

## Context

ADR 0001 created a private kernel that initializes projects, validates canonical artifacts, and inspects caller-owned traces. It explicitly deferred launchers, schedulers, writers, adapter execution, and merge automation.

V10 needs the first executable handoff: one validated work packet sent to one trusted executor supplied by an IDE or automation host. The boundary must remain provider-neutral and offline, distinguish requested authority from granted authority, and produce trace evidence without claiming sandboxing or durable persistence.

Primary-source research also shows that a portable Node child-process wrapper cannot guarantee descendant termination or isolation. V10 therefore needs an execution port, not a shell abstraction.

## Decision Drivers

- Declarations must never self-authorize execution.
- One work packet should be executable without introducing a scheduler.
- Provider, workspace, credential, sandbox, and approval policy belong to the host.
- Lifecycle evidence must be compatible with the V9 RunEvent model.
- Cancellation claims must match what can actually be observed.
- Core must remain offline, dependency-minimal, and embeddable.
- The public surface must be small enough for an IDE author to understand quickly.

## Decision

### One Invocation And Host Readiness

V10 adds one asynchronous library operation for one work packet and one attempt. It does not discover work, select an agent, allocate a workspace, retry, merge, persist memory, or launch another packet.

The host selects a packet it considers ready. V10 performs schema and standalone execution checks only. It does not resolve packet dependencies, load context references, inspect branches, validate baseline commits, prepare a workspace, or prove that allowed and disallowed actions were enforced.

### Host-Injected Executable

The executable is a caller-supplied object implementing a typed `WorkPacketExecutor` port. The kernel never imports, fetches, evaluates, or spawns anything named by `AdapterManifest` content. Manifest source, provenance, and configuration references remain declarative evidence only.

The embedding host is responsible for obtaining the executor, sandboxing it, presenting approvals, controlling credentials, and enforcing actual filesystem, process, network, and secret access.

### Invocation-Scoped Execution Grant

Before executor invocation, the host supplies an `ExecutionGrant` runtime object bound to grant ID, issuer, run ID, attempt ID, work-packet ID, executor ID and version, and the permission set actually granted for this invocation.

The grant is not a canonical artifact and is not loaded from disk. Invocation-scoped describes its binding, not cryptographic freshness or single use. The stateless kernel cannot authenticate the issuer, prevent replay, prove revocation, or prove that the host enforced the recorded permission set.

After validating the closed and bounded grant structure, preflight applies these directional predicates using `(requirement, container)` coverage semantics:

```txt
every manifest request is covered by the grant
every grant entry is covered by the manifest request set
every grant entry is covered by the work-packet ceiling
```

The first two predicates make request and grant coverage-equivalent in V10. Partial grants are not supported. Unknown, malformed, missing, mismatched, duplicate, or excessive authority fails closed before executor code runs. The executable object's captured ID and version must match both manifest metadata and grant binding.

`WorkPacket.authority.allowedActions` and `disallowedActions` remain instructions. Only the host sandbox can enforce them or revoke ambient Node authority.

### Public Contract

The unstable 0.x root export follows this shape. Exact readonly aliases may be refined during implementation without changing these semantics.

```ts
type FailedTerminalCode =
  | "execution_failed"
  | "verification_failed"
  | "review_failed"
  | "handoff_failed"
  | "integration_failed";

interface ExecutionGrantPermission {
  readonly kind: string;
  readonly scopes: readonly string[];
}

interface ExecutionGrant {
  readonly id: string;
  readonly issuer: string;
  readonly runId: string;
  readonly attemptId: string;
  readonly workPacket: string;
  readonly executor: { readonly id: string; readonly version: string };
  readonly permissions: readonly ExecutionGrantPermission[];
}

interface ExecutionPolicy {
  readonly timeoutMs: number;
  readonly abortAcknowledgementMs: number;
}

interface WorkPacketExecutorRequest {
  readonly workPacket: WorkPacketArtifact;
  readonly grant: ExecutionGrant;
  readonly signal: AbortSignal;
}

interface ExecutionWorkflow {
  readonly stage: WorkflowStage;
  readonly outcome: WorkflowOutcome;
}

type WorkPacketExecutorSettlement =
  | {
      readonly state: "completed";
      readonly workflow?: ExecutionWorkflow;
      readonly evidence?: readonly RunEventEvidenceReference[];
    }
  | {
      readonly state: "failed";
      readonly terminalCode: FailedTerminalCode;
      readonly workflow?: ExecutionWorkflow;
      readonly evidence?: readonly RunEventEvidenceReference[];
    };

interface WorkPacketExecutor {
  readonly id: string;
  readonly version: string;
  execute(request: WorkPacketExecutorRequest): Promise<WorkPacketExecutorSettlement>;
}

interface ExecuteWorkPacketOptions {
  readonly workPacket: unknown;
  readonly adapterManifest: unknown;
  readonly grant: unknown;
  readonly executor: WorkPacketExecutor;
  readonly runId: string;
  readonly attemptId: string;
  readonly correlationId: string;
  readonly policy: ExecutionPolicy;
  readonly signal?: AbortSignal;
}

type ExecutionDisposition =
  | "completed"
  | "failed"
  | "cancelled"
  | "timed_out"
  | "abort_unconfirmed";

type ExecutionFailureCode =
  | "executor_declared_failure"
  | "executor_threw"
  | "executor_result_invalid";

interface ExecutionSummaryBase {
  readonly runId: string;
  readonly attemptId: string;
  readonly workPacket: string;
  readonly executor: { readonly id: string; readonly version: string };
  readonly grant: ExecutionGrant;
  readonly events: readonly RunEventArtifact[];
}

type ExecutionSummary =
  | (ExecutionSummaryBase & {
      readonly disposition: "completed";
      readonly state: "completed";
      readonly terminalCode: "success";
      readonly workflow?: ExecutionWorkflow;
    })
  | (ExecutionSummaryBase & {
      readonly disposition: "failed";
      readonly state: "failed";
      readonly terminalCode: FailedTerminalCode;
      readonly failureCode: ExecutionFailureCode;
      readonly workflow?: ExecutionWorkflow;
    })
  | (ExecutionSummaryBase & {
      readonly disposition: "cancelled";
      readonly state: "cancelled";
      readonly terminalCode: "cancelled_by_user" | "cancelled_by_policy";
      readonly abortCause: "caller" | "deadline";
      readonly cancellationAcknowledged: true;
    })
  | (ExecutionSummaryBase & {
      readonly disposition: "timed_out";
      readonly state: "timed_out";
      readonly terminalCode: "deadline_exceeded";
      readonly abortCause: "deadline";
      readonly cancellationAcknowledged: true;
    })
  | (ExecutionSummaryBase & {
      readonly disposition: "abort_unconfirmed";
      readonly state: "running";
      readonly abortCause: "caller" | "deadline";
      readonly cancellationAcknowledged: false;
    });

declare function executeWorkPacket(
  options: ExecuteWorkPacketOptions,
): Promise<OperationResult<ExecutionSummary>>;
```

`OperationResult.ok` answers whether preflight and invocation processing succeeded. `ok: false` always has `value: null`, produces no executor call, and contains stable diagnostics. Once the executor is invoked, declared failure, throw, malformed settlement, cancellation, timeout, and `abort_unconfirmed` are normalized execution outcomes returned with `ok: true`. Work success is never inferred from `OperationResult.ok`.

### Bounded Immutable Snapshots

Before validation, V10 creates bounded detached snapshots of the packet, manifest, and grant. It rejects cycles, accessor properties, proxies, non-plain objects, excessive depth, excessive node count, and invalid primitive values. Array length and object key count are checked against the remaining node budget before descriptor traversal. The same packet snapshot is validated and passed to the executor. Packet, grant, request, normalized settlement, summary, and events are deeply frozen.

The executor receives immutable copies of the validated work packet and grant plus an `AbortSignal`. The kernel supplies no filesystem handle, process API, network client, environment dump, secret, or implicit credential. It does not freeze or trust the caller's original objects.

### Closed Settlement Contract

The executor returns a small allowlisted settlement: completed or failed state, a workflow outcome when applicable, a failure terminal code, and bounded evidence references. Cancellation and timeout are operation dispositions created only by the kernel after abort wins. Arbitrary provider payloads, full prompts, chats, command output, environment values, credentials, and raw exception messages are not returned or persisted.

Malformed settlements and synchronous throws or rejected promises become fixed execution failures. V10 never stringifies or copies a thrown value, cause, stack, rejection value, unknown-field value, or `AbortSignal.reason`. Every caller-, manifest-, grant-, and settlement-derived string that will be copied into a summary or event is checked for high-confidence secret patterns before journal creation. Unsafe return-bound identity, permission, workflow, or evidence data fails preflight or becomes `executor_result_invalid` as appropriate; suppression markers are not substituted into schema identities. The canary is never copied into a diagnostic, summary, or event. Unexpected failures in kernel-owned logic may still throw to the host.

### Caller-Owned Lifecycle Journal

The kernel creates deterministic, schema-valid `RunEvent` artifacts in memory. Each invocation is one standalone, non-appendable journal. It uses attempt number one, zero-based contiguous sequences, bounded IDs `event.<sequence>` that are independent of caller ID length, caller-supplied run and correlation IDs, fixed actor `swecircuit.kernel`, no timestamps, the grant ID in the initial event's `links`, and a linear previous-event causation chain.

Before return, the complete journal is serialized in memory and passed through the same schema, order, causation, transition, and privacy semantics as the V9 trace inspector. Persistence remains caller-owned. The grant link records which assertion the kernel checked; it does not prove host enforcement.

V10 has no event sink callback because sink failure during execution creates an ambiguous persistence boundary. A durable writer needs a separate idempotency and recovery decision.

### Lifecycle Matrices

`workflow.outcome` is emitted only when a normalized settlement contains the complete `workflow.stage` and `workflow.outcome` pair. `evidence.recorded` is emitted only for one or more validated references. Every terminal invocation, including failed work, ends with `run.completed`; `abort_unconfirmed` does not.

| Case | Summary Disposition | Attempt State | Terminal Code | Cancellation Reason | Ordered Events |
| --- | --- | --- | --- | --- | --- |
| completed | `completed` | `completed` | `success` | none | start, queued, running, optional workflow, optional evidence, terminal, complete |
| failed | `failed` | `failed` | declared failed code or `execution_failed` | none | start, queued, running, optional workflow, optional evidence, terminal, complete |
| caller abort before start | `cancelled` | `cancelled` | `cancelled_by_user` | `user_request` | start, queued, cancellation request, terminal, complete |
| deadline expired before start | `cancelled` | `cancelled` | `cancelled_by_policy` | `policy` | start, queued, cancellation request, terminal, complete |
| caller abort after start, acknowledged | `cancelled` | `cancelled` | `cancelled_by_user` | `user_request` | start, queued, running, cancellation request, terminal, complete |
| deadline after start, acknowledged | `timed_out` | `timed_out` | `deadline_exceeded` | `policy` | start, queued, running, cancellation request, terminal, complete |
| caller abort unconfirmed | `abort_unconfirmed` | `running` | none | `user_request` | start, queued, running, cancellation request |
| deadline abort unconfirmed | `abort_unconfirmed` | `running` | none | `policy` | start, queued, running, cancellation request |

Declared failure preserves its allowed failed terminal code. Thrown and malformed settlements use `execution_failed`. Settlement content observed after abort wins is discarded and produces no outcome or evidence event.

### Timeout, Deadline, And Cancellation

Every policy has a finite positive `timeoutMs` and `abortAcknowledgementMs`. Timeout must not exceed the manifest's required finite `maximumSeconds`; acknowledgment is separately capped at 60 seconds. The manifest must declare timeout support, cancellation support and acknowledgment, structured errors, `agent_runtime`, `launch_agent`, `WorkPacket` input, an empty `outputKinds` list because the kernel owns journal creation, and current API compatibility.

At invocation start, V10 samples wall and monotonic clocks once. It converts the packet wall-clock deadline into a remaining duration, projects that duration onto the monotonic clock, and chooses the earlier of that projected point and monotonic start plus `timeoutMs`. It never directly compares wall and monotonic values. An already-aborted signal or packet deadline expired immediately before invocation produces the exact terminal no-call journal above. The caller's abort reason is ignored.

Race linearization uses the first event observed by the kernel, with an absolute deadline check when settlement is observed:

1. Register external cancellation and the deadline before invoking executor code.
2. Recheck cancellation and packet deadline immediately before the executor call.
3. Preserve settlement only when observed before cancellation and strictly before the effective deadline.
4. If cancellation is observed first, or settlement is observed at or after the effective deadline, abort wins and its first cause is immutable.
5. Caller cancellation wins over a later deadline; deadline wins over later caller cancellation.
6. If abort wins before invocation, return the terminal no-call journal. If abort wins after invocation, discard settlement content and wait only for bounded acknowledgment.

A host timer is only a wake-up signal. V10 rechecks monotonic time and re-arms when a timer wakes before its absolute deadline. The final monotonic and observed-abort gate sits directly beside the synchronous executor call; the `running` event is emitted immediately after invocation begins so an expired no-call path retains the queued-to-cancelled journal. The acknowledgment bound is `abort.observedAt + abortAcknowledgementMs`, and only settlement observed strictly before that absolute point is acknowledgment.

The executor port contract requires its promise to remain pending until all activity capable of advancing the invocation or producing invocation effects has stopped. Transfer to host ownership is not acknowledgment. Harmless cleanup may continue only when it cannot affect the packet, exercise invocation authority, or produce invocation evidence. For invoked work, settlement within the acknowledgment window is the only V10 acknowledgment signal. Otherwise V10 returns `abort_unconfirmed`, keeps the attempt non-terminal, observes late rejection, and never mutates the frozen journal.

A synchronously blocking in-process executor can prevent timers, cancellation handlers, and the API itself from running. V10 cannot preempt it. Hosts that require preemption must isolate code in a worker, process, container, or remote runtime.

### Preflight Diagnostics

Stable V10 diagnostics distinguish invalid direct values, wrong kinds, incompatible manifests, identity mismatch, invalid grant shape, request/grant mismatch, ceiling excess, and invalid timing policy. New diagnostics update the normative catalog compatibility note. Every preflight diagnostic path asserts that executor call count remains zero.

### Deterministic Test Executor

V10 includes `createDeterministicTestExecutor`, an in-process test port that returns a supplied bounded settlement, observes abort, and performs no I/O. It is test and conformance infrastructure, not a production provider.

### Compatibility

The six `swecircuit/v1alpha1` artifact kinds and V9 CLI remain unchanged. Root exports include the packet, manifest, permission, event, executor, grant, policy, settlement, and summary types needed by a TypeScript host. A packed external TypeScript consumer must compile and narrow every disposition. No production dependency is added.

## Consequences

### Positive

- IDEs and runtimes get one standard handoff and evidence boundary.
- Actual authority is explicit, invocation-bound, and distinct from declarations.
- The kernel stays provider-neutral and does not become a code loader.
- Cancellation evidence remains honest under unresponsive executors.
- V9 traces become useful runtime output without hidden persistence.

### Negative

- The host must implement real sandboxing.
- A defective in-process executor can ignore abort, retain ambient authority, block the event loop, or continue running.
- `abort_unconfirmed` requires callers to surface uncertainty and possibly isolate or terminate the host.
- Provider adapters need explicit glue.
- Streaming, durable events, input resumption, and retries remain deferred.

## Alternatives Considered

- **Generic child-process executor:** deferred because Node cannot guarantee portable process-tree containment or termination.
- **Dynamic imports from adapter manifests:** rejected because declarative files would become executable supply-chain inputs.
- **ExecutionGrant as a seventh artifact kind:** rejected because a file must not grant its own runtime authority.
- **Persist events inside the kernel:** deferred because durability and recovery need a separate boundary.
- **Return raw provider responses:** rejected because it creates unstable contracts and privacy leakage.
- **Treat an in-flight abort as terminal immediately:** rejected because signal delivery is not execution acknowledgment. A pre-invocation abort remains terminal on the proven no-call path.
- **Adopt MCP Tasks or A2A in core:** deferred for future adapters.

## Source Evidence

- `docs/research/snapshots/2026-07-14-v10-executor-boundary-scan.md`
- `docs/specs/v10-executor-adapter/spec.md`
- `docs/specs/v10-executor-adapter/architecture-review.md`
- `docs/specs/v10-executor-adapter/decomposition-plan.md`
- `docs/architecture/decisions/0001-executable-kernel-foundation.md`

## Review Triggers

Revisit this decision when:

- A real provider adapter is proposed.
- SWECircuit needs streaming, durable event writing, resumed input, retries, or scheduling.
- A native, container, hosted, or platform-specific isolation layer is evaluated.
- Executor code must run outside the embedding host process.
- A canonical grant artifact or remote authorization protocol is proposed.
- The 0.x executor interface is considered for stabilization.
