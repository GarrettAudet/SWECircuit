# Bounded Executor Boundary

## Status

V10 provides an unstable, provider-neutral library boundary for executing exactly one host-selected `WorkPacket`. It is available from the private source package and is not a scheduler, provider adapter, or sandbox.

## Core Expression

```txt
validated packet + manifest declaration + host grant + injected executor
  | executeWorkPacket
  | frozen execution summary + V9-compatible event journal
```

The host selects a dependency-ready packet and injects trusted executable code. SWECircuit validates the contract, bounds the invocation lifecycle, and returns traceable events. The caller owns persistence and enforcement outside this boundary.

## Host Responsibilities

The embedding host must:

- Select one packet whose dependencies are ready.
- Prepare and isolate any workspace.
- Obtain user approvals and protect credentials.
- Construct an invocation-scoped grant.
- Inject an executor whose ID and version match the manifest and grant.
- Enforce granted authority in its own tools or sandbox.
- Persist returned events only after its own storage and privacy checks.
- Treat `abort_unconfirmed` as potentially live work.

`Invocation-scoped` describes the grant's identity and permission binding only. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.

SWECircuit does not discover projects, resolve dependencies, load providers, schedule retries, enforce filesystem or process permissions, terminate process trees, write traces, merge branches, or update memory through this API.

## Preflight Gate

Executor code is called only after all inputs pass preflight. The boundary verifies:

- A valid `WorkPacket` and compatible `AdapterManifest`.
- Matching packet, run, attempt, executor, and grant identities.
- An `agent_runtime` manifest with `launch_agent`, `WorkPacket` input, structured errors, acknowledged cancellation, and a finite timeout.
- A closed invocation grant.
- Permission coverage in all three directions: every manifest request is granted, every grant entry was requested, and every grant entry fits inside the packet ceiling.
- Bounded, detached, accessor-free input snapshots and return-bound privacy canaries.

Preflight failure returns `ok: false`, stable diagnostics, `value: null`, and makes zero executor calls.

## Embedding Shape

```ts
import {
  executeWorkPacket,
  type WorkPacketExecutor,
} from "swecircuit";

const executor: WorkPacketExecutor = {
  id: "host.agent-runtime",
  version: "1.0.0",
  async execute({ workPacket, grant, signal }) {
    // The trusted host maps this frozen request to its own isolated runtime.
    await runInTrustedHost({ workPacket, grant, signal });
    return {
      state: "completed",
      workflow: { stage: "implement", outcome: "pass" },
    };
  },
};

const result = await executeWorkPacket({
  workPacket,
  adapterManifest,
  grant,
  executor,
  runId: "run.feature",
  attemptId: "attempt.frontend",
  correlationId: "feature-123",
  policy: {
    timeoutMs: 300_000,
    abortAcknowledgementMs: 5_000,
  },
});

if (!result.ok || result.value === null) {
  reportDiagnostics(result.diagnostics);
} else if (result.value.disposition === "abort_unconfirmed") {
  quarantinePotentiallyLiveWork(result.value);
} else {
  persistCallerOwnedEvents(result.value.events);
}
```

The helper names in the example are host-owned placeholders. The packed-consumer gate compiles and executes this shape from a clean offline installation.

## Result Semantics

`OperationResult.ok` reports whether SWECircuit validly processed the invocation. Work outcome is separate:

| Disposition | Meaning |
| --- | --- |
| `completed` | The executor returned a valid completed settlement. |
| `failed` | The executor declared failure, threw, or returned an invalid settlement. |
| `cancelled` | Abort or deadline won before invocation, or caller cancellation won after invocation and the executor produced contract-compliant acknowledgment inside the bound. |
| `timed_out` | The effective deadline won after invocation and the executor produced contract-compliant acknowledgment inside the bound. |
| `abort_unconfirmed` | Abort was requested, but the executor did not settle before the acknowledgment bound; work may still be live. |

`cancellationAcknowledged: true` means the kernel has terminal certainty: either no executor call occurred, or an invoked executor produced contract-compliant acknowledgment inside the bound. It does not claim executor acknowledgment on a no-call path.

For invoked work, the executor promise must remain pending until all activity capable of advancing the invocation or producing invocation effects has stopped. Transferring live work to host ownership is not acknowledgment. Harmless cleanup may continue only when it cannot affect the packet, exercise invocation authority, or produce invocation evidence.

The returned journal is detached, deeply frozen, timestamp-free, and inspectable with `inspectTrace` after the caller writes it as JSONL. `abort_unconfirmed` intentionally omits a terminal attempt state and `run.completed`.

## Test Executor

`createDeterministicTestExecutor` provides a no-I/O executor for host tests and examples. It proves contract integration; it does not simulate provider behavior, isolation, retries, or durable execution.

## Version Boundary

The executor API is an unstable 0.x library surface. The six canonical `swecircuit/v1alpha1` artifact kinds are unchanged, and `ExecutionGrant` remains a runtime object rather than a self-authorizing artifact.
