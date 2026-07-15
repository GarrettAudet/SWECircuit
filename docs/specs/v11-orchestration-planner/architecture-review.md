# V11 Architecture Review Packet

## Status

Draft review packet. It becomes reviewable only when bound to an immutable bootstrap commit.

## Review Scope

Review the proposed V11 control plane, not an IDE integration and not a provider router. The system should accept a human goal, selected circuit and module catalog, available capability profiles, and policy limits; produce a bounded plan or clarification request; expose safe ready assignments; ingest V10 child results; enforce fan-in and integrated gates; and preserve a parent trace.

## Required Invariants

1. SWECircuit owns portable workflow policy, module contracts, decomposition validity, assignment rules, readiness, gates, and trace semantics.
2. IDEs, CLIs, CI systems, agent frameworks, and model providers are replaceable hosts or adapters that execute assigned effects.
3. A planner may be human-authored, deterministic, or AI-assisted, but its output is untrusted proposal data until core validation and compilation pass.
4. Capability matching uses declared role, skill, input/output, authority, isolation, and capacity facts. It must not inspect or switch on provider, model, API, or IDE identity.
5. V10 remains the bounded one-packet execution primitive. V11 does not load executable code from manifests or grant authority through files.
6. Parallel work requires satisfied dependencies, non-conflicting scopes, explicit bounds, and host-enforced isolation when overlapping writes would otherwise conflict.
7. Worker completion cannot satisfy fan-in, integrated verification, review, or merge by itself.
8. Clarification and approval are first-class resumable states tied to the exact plan and state revision.
9. Parent trace links source goal, module invocations, packets, assignments, child runs, gates, evidence, clarification, and final outcome without copying raw chats, prompts, logs, secrets, or provider payloads.
10. Every guarantee distinguishes deterministic core checks from host persistence, isolation, credentials, cancellation, and side effects.

## Proposed Vertical Slice

```txt
goal + selected circuit + module catalog + agent profiles + limits
  -> host planner proposes plan or asks for input
  -> core validates and compiles immutable work graph
  -> core capability-matches and computes a bounded ready wave
  -> host claims and executes each assignment through V10
  -> core reduces child summaries into the next immutable state
  -> core evaluates joins and integration gates
  -> parent events and memory candidates describe the complete run
```

The host drives the loop and performs effects. The core owns the transition rules and returns immutable operation results.

## Questions Requiring Review

### Artifact Strategy

Should V11 add canonical `Goal`, `AgentProfile`, `OrchestrationPlan`, and `OrchestrationState` artifacts, or keep some as bounded runtime values? Which records must be portable JSON to support pause, resume, audit, and cross-host equivalence without expanding v1alpha1 too broadly?

### Planner Trust Boundary

What minimum input must a planner receive? How are proposal size, graph size, text, references, permissions, and secret canaries bounded before any reflective or schema operation? Can invalid proposals always produce zero worker calls?

### Capability Matching

What profile fields are stable enough for core matching? How are required capabilities, supported module contracts, input/output kinds, authority ceilings, capacity, and isolation support ranked deterministically? Which host metadata must remain opaque and ignored?

### Reducer And Claims

What immutable revision and transition contract prevents stale updates inside one orchestrator? How does the design state that cross-process double-claim prevention requires host serialization or atomic compare-and-swap persistence rather than implying a distributed lock in core?

### Clarification And Approval

How are input requests, allowed responses, exact revision binding, expiry policy, and consumption represented? Which approval decisions are host-enforced, and how does core reject stale or mismatched resumes without claiming global replay prevention?

### Dependency, Conflict, And Isolation

How are file, artifact, service, and migration conflict scopes normalized? When may distinct host-issued workspace leases permit overlapping writes? What safe default serializes work if isolation cannot be evidenced?

### Fan-In And Integration

How are `all` and `any` joins, failed or uncertain children, integration ownership, regression checks, review, and merge approval represented? How does the reducer keep packet success separate from goal success?

### Parent Trace

Should orchestration use the existing RunEvent kind with parent and child links, or a narrowly extended event vocabulary? Which facts are reconstructable from events alone, and which source artifacts must remain separately referenced?

### Limits And Liveness

What maximum packets, dependencies, agents, ready assignments, concurrent calls, retries, clarifications, revisions, events, and retained evidence references keep the core bounded? How are stalled planners or workers surfaced without making the core a timer, scheduler service, or process supervisor?

### Public Surface And Compatibility

Can the first API remain a small functional core such as `planGoal`, `compilePlan`, `getReadyAssignments`, `claimAssignment`, `applyExecutionResults`, and `resumeOrchestration`? Which names are premature before the artifact decision?

## Required Reviewers

| Review | Primary Concern | Required Evidence |
| --- | --- | --- |
| Product and architecture | Goal fidelity, simplicity, ownership boundaries | Missing capability or needless-complexity findings |
| Public API and compatibility | Portable data, closed states, semver and schema impact | Minimal contract and invalid-state analysis |
| Workflow and concurrency | Deterministic waves, stale transitions, fan-in, failure | Adversarial scenario matrix |
| Security and trace | Authority, hostile inputs, privacy, isolation truthfulness | Threat cases and required negative fixtures |

## Acceptance Gate

ADR 0003 may move from Proposed to Accepted for implementation only when:

- one immutable commit contains the complete review packet and source chain;
- every required reviewer returns `PASS` against that exact commit;
- all high and medium findings are resolved or explicitly owner-accepted;
- the final design names core guarantees and host responsibilities separately;
- the planned public surface is the smallest vertical slice that can be dogfooded;
- template validation and diff checks pass.

A green checker is necessary but is not architecture acceptance.
