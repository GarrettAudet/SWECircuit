# Feature Spec: V10 Bounded Executor Boundary

## Status

Complete.

## Problem

V9 can initialize and validate SWECircuit projects and inspect caller-owned traces, but it cannot execute a validated work packet. An IDE or agent host therefore has no standard contract for handing one bounded goal to an executor, recording which authority the kernel checked, or returning lifecycle evidence without inventing provider-specific behavior.

V10 must add that boundary without turning manifest declarations into authority, dynamically loading third-party code, claiming process isolation, or expanding into a scheduler.

## Users Or Actors

- Developers embedding SWECircuit in an AI-capable IDE or local automation host.
- Integration owners delegating one bounded work packet to a specialized executor.
- Adapter authors connecting a trusted agent runtime to the SWECircuit kernel.
- Reviewers and CI systems verifying execution authority and lifecycle evidence.

## Goals

- Execute one schema-valid `WorkPacket` through one caller-injected, provider-neutral executor adapter.
- Require a host-issued authority grant with invocation-scoped identity and permission assertions before executor code runs. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Record that the executor request and invocation grant passed the work-packet permission ceiling checks without claiming host enforcement.
- Return a deterministic, schema-valid lifecycle journal that the caller may persist and inspect.
- Bound timeout and cancellation behavior without falsely claiming that unresponsive work stopped.
- Provide a deterministic, in-process test executor for tests and embedding examples.
- Preserve V9's offline core and zero-provider default.

## Non-Goals

- Scheduling multiple work packets, selecting agents, retrying work, or merging branches.
- Dynamically importing an executable from an `AdapterManifest`.
- Running arbitrary shell commands or promising cross-platform process-tree isolation.
- Persisting traces, evidence, conversations, prompts, command output, or secrets.
- Implementing MCP Tasks, A2A, Codex, Claude, or another provider adapter in core.
- Resuming `input_required` work, automatic memory updates, or autonomous approval decisions.
- Publishing a package or stabilizing the 0.x API.

## Requirements

- `executeWorkPacket` must snapshot and validate its `WorkPacket` and `AdapterManifest` before invoking executor code.
- The host must select a dependency-ready packet; V10 must not discover a project, resolve dependencies, load context, prepare a workspace, or select work.
- The manifest must declare current API compatibility, `adapterKind: agent_runtime`, `launch_agent`, `WorkPacket` input, an empty `outputKinds` list because the kernel creates the journal, structured errors, acknowledged cancellation, and a finite timeout maximum.
- The executable `WorkPacketExecutor` must be supplied as a trusted host object with an ID and version matching both manifest and grant. Manifest content and references must never be imported, fetched, or executed.
- The host must supply an invocation-scoped `ExecutionGrant` bound to grant ID, issuer, run ID, attempt ID, work-packet ID, executor ID, and executor version. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Grant shape must be closed and bounded. Every manifest request must be covered by the grant, every grant entry by the manifest request set, and every grant entry by the packet ceiling.
- Preflight failure must return stable diagnostics with `ok: false`, `value: null`, and zero executor calls.
- Once invocation starts, every work disposition returns `ok: true`; work success is represented only by `ExecutionSummary.disposition`, state, and terminal fields.
- Packet, manifest, grant, executor request, normalized settlement, summary, and events must be detached bounded snapshots and deeply frozen.
- The executor receives the frozen packet and grant plus an `AbortSignal`; it receives no authority-enforcing handle from the kernel.
- Completion is a closed completed-or-failed settlement with an optional complete workflow stage-and-outcome pair. Throws, rejections, and malformed or secret-bearing output become fixed failure classifications without stringifying or copying raw values. Every input-derived string copied into the summary or journal must pass the same preflight canary policy.
- Each call returns one standalone V9-compatible journal with attempt one, zero-based contiguous sequences, deterministic IDs, fixed kernel actor, grant link, linear causation, and no timestamps.
- The effective deadline is the earlier of invocation timeout and packet deadline. First observed abort or deadline wins over later settlement, and an already-aborted or expired call never invokes the executor.
- If abort or deadline wins before invocation, the no-call journal may terminate because no executor work started. After invocation, terminal cancellation or timeout requires in-window executor promise settlement after all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. Otherwise return `abort_unconfirmed`, keep the attempt running, omit `run.completed`, observe late rejection, and never mutate the returned journal.
- Returned events must pass the same schema, order, causation, transition, and privacy semantics as the V9 inspector; V10 does not persist them.
- No production dependency may be added.

## Acceptance Criteria

- [x] AC1: Given a valid packet, compatible manifest, matching grant, and deterministic executor, when execution runs, then the executor is called once and a completed, inspectable lifecycle journal is returned.
- [x] AC2: Given an invalid artifact, incompatible manifest, identity mismatch, or malformed grant, when preflight runs, then stable diagnostics are returned and the executor is not called.
- [x] AC3: Given permissions that are missing, unrequested, or outside the work-packet ceiling, when preflight runs, then execution fails closed before adapter invocation.
- [x] AC4: Given an executor completion, failure, thrown exception, or malformed result, when execution ends, then the returned state and events are deterministic and no raw exception or provider payload is persisted.
- [x] AC5: Given a timeout or caller cancellation that the executor acknowledges, when execution ends, then cancellation intent and the correct terminal state are traceable.
- [x] AC6: Given an executor that ignores cancellation beyond the acknowledgment window, when execution returns, then it reports `abort_unconfirmed`, emits no false terminal event, and documents the residual live-work risk.
- [x] AC7: Given V9 projects and traces, when the canonical verification gate runs, then all existing behavior remains compatible and no external provider or network is required.
- [x] AC8: Given the V10 package, when the version reaches review, then research, architecture review, implementation evidence, dogfood observations, memory updates, and a milestone form one traceable chain.

## Architecture Impact

V10 crosses the runtime and authorization boundary deferred by ADR 0001. ADR 0002 defines the host-injected executor port, invocation-scoped grant model, cooperative cancellation semantics, and caller-owned event journal. The six canonical `v1alpha1` artifact kinds remain unchanged; `ExecutionGrant` is deliberately a runtime object rather than a self-authorizing artifact.

## Risks

- A host may inject an adapter that ignores the granted scope because the kernel cannot sandbox host code.
- Cooperative cancellation can leave work running after the API returns.
- A convenient subprocess helper could be mistaken for isolation or reliable process-tree termination.
- Returning provider content could leak prompts, source, command output, or secrets into traces.
- Expanding the first execution API too far could recreate a scheduler inside the kernel.

## Open Questions

No question blocks implementation. A provider adapter, durable event sink, resumed input flow, retry scheduler, native process sandbox, and remote protocol mapping remain explicit future decisions.

## Assumptions

- The user's approval to proceed authorizes a provider-neutral V10 execution boundary on `codex/v10-executor-adapter`.
- Primary-source research justifies replacing the initially considered generic subprocess adapter with an in-process test executor and deferring process isolation.
- Embedding hosts remain responsible for sandboxing, approval UI, workspace lifecycle, credential access, and durable persistence.
- V10 may add an unstable 0.x library API without changing the canonical `swecircuit/v1alpha1` artifact vocabulary.
