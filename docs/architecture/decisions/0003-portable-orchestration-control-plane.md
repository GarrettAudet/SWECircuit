# ADR 0003: Portable Orchestration Control Plane

## Status

Proposed revision 2 on 2026-07-15. Round 1 returned `REVISE` against commit `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`. No V11 implementation is authorized until this revised design passes independent product, API, lifecycle, and security review against one exact commit.

## Context

V9 supplies a deterministic offline kernel for project artifacts. V10 supplies one bounded invocation of one host-selected WorkPacket. The missing product layer starts with a human software goal, applies user-selected modules and a circuit, decomposes the goal into bounded work, assigns compatible specialists, runs dependency-safe work in parallel, integrates and verifies the results, and preserves the complete execution trace.

SWECircuit is not an IDE router, API gateway, model selector, provider switch, prompt framework, or agent marketplace. An IDE, CLI, CI runner, desktop application, local runtime, or remote service may host the workflow without changing its meaning.

## Product Invariant

```txt
goal | circuit policy | concrete work | capable agents | safe waves
     | integrated gates | owner decision | evidence | memory candidates
```

The same contract serves one agent and many agents. One agent is a profile with concurrency one. Additional agents add profiles and capacity; they do not change the workflow model.

## Decision

### Simple Surface

The primary facade is:

```txt
runGoal(goal, circuit, modules, authority, planner, agents, callbacks, policy?)
  -> planning input | blocked result | completed run
```

`agents` defaults to one profile with one slot. The default coordinator is in-memory and serialized, automatic retries are zero, overlapping writes never run together, and merge remains an owner action. The facade composes the advanced operations `startPlanning`, `applyPlannerResult`, `resumePlanning`, `startRun`, `prepareWave`, `applyWaveResults`, `resumeRun`, and `cancelRun`.

The facade is a software-work coordinator. It never chooses an IDE, API, model, provider, prompt, price, or reasoning setting.

### Closed Operation Results

V11 does not reuse a generic result shape that can carry success data and failure together. Planning operations return exactly `planning_advanced` with the next session and optional compiled plan, or `planning_rejected` with stable diagnostics plus the unchanged prior-session digest, or the request digest when no session exists. Run operations return exactly `transition_advanced` with previous/next digests, next state, emitted events, and optional tickets; `transition_deferred` with unchanged state and a typed temporary reason such as `capacity_unavailable`; or `transition_rejected` with diagnostics plus the unchanged prior-state digest, or the plan digest when no run state exists. A rejected or deferred result contains no successor state or events.

`runGoal` returns one closed user-facing case: `input_required`, `waiting`, `completed`, `failed`, `blocked`, `cancelled`, or `uncertain`. `waiting` preserves a valid `ready` state when compatible agents exist but no live slot is available; it is not a busy-loop instruction. The host must provide changed availability, cancel, or hand the state back later.

### Contract Family And Identity

V11 adds a separate closed JSON contract family with `apiVersion: swecircuit/orchestration/v1alpha1`. Its roots are `PlanningSession`, `OrchestrationPlan`, `AgentProfile`, `OrchestrationState`, and `OrchestrationEvent`. Nested contracts include `RunAuthority`, `PlanProposal`, `InputRequest`, `InputResponse`, `AvailabilitySnapshot`, `Assignment`, `ExecutionTicket`, `ChildResultEnvelope`, `OutputReference`, and `MemoryCandidate`.

These are not added to the existing six `swecircuit/v1alpha1` project artifact kinds. Existing project artifacts and V10 `RunEvent` 1.0.0 remain unchanged.

Every durable root has a closed discriminator, version, identifier, revision where applicable, and content digest. Digests use RFC 8785 JSON Canonicalization Scheme followed by SHA-256 and the form `sha256:` followed by 64 lowercase hexadecimal characters. The digest field itself is omitted while hashing. Contract numbers are safe integers. Strings are not Unicode-normalized; callers must preserve exact code points.

### Policy Graph And Instance Graph

The selected Circuit is the policy graph and is authoritative for:

- module slots, entry nodes, exits, and permitted fan-out;
- typed input and output ports and transfers;
- outcome routes and gates;
- `all` or `any` joins;
- integration ownership;
- verification, review, stop, and completion rules.

A Module remains the reusable contract for input, action, output, gate, and outcome.

An OrchestrationPlan is a validated instance graph. It owns concrete invocation identifiers, immutable WorkPacket snapshots and digests, exact capability requirements, canonical read/write/conflict scopes, readiness prerequisites, and concrete port bindings derived from the Circuit.

A planner may instantiate only Circuit-authorized module slots and fan-out ranges. It cannot add or replace modules, routes, gates, joins, integration owners, or completion policy. Additional prerequisites may delay readiness but may not activate a node, transfer data, route an outcome, or make a node optional. The compiler rejects every proposal that cannot prove this derivation.

### Planning Lifecycle

A host-injected planner receives bounded references, selected Circuit and Module snapshots, acceptance criteria, RunAuthority, and allowlisted AgentProfiles. It returns closed proposal data, a bounded clarification request, or a block reason. Planner code and output are not authority.

`PlanningSession` has exactly four states:

```txt
ready | input_required | compiled | blocked
```

It owns a planning identity, revision, proposal digest, and at most one pending request. A response binds the planning identity, request identifier and digest, expected revision, responder identity, responder role, and response digest. The host attests responder identity; core validates that the role is permitted by RunAuthority. Planning is limited to eight rounds. No worker ticket exists before `compiled`.

| Planning state | Accepted operation | Next state |
| --- | --- | --- |
| absent | `startPlanning` | `ready` |
| `ready` | `applyPlannerResult(proposal)` | `compiled` |
| `ready` | `applyPlannerResult(question)` | `input_required` |
| `ready` | `applyPlannerResult(block)` | `blocked` |
| `input_required` | `resumePlanning(response)` | `ready` |
| `compiled` or `blocked` | none | unchanged rejection |

The advanced API accepts planner results as data; only `runGoal` invokes the host planner callback. The same validated proposal bytes and digest, Circuit and Module digests, profiles, RunAuthority, and compiler version must produce the same OrchestrationPlan. Different planners are not required to invent the same proposal.

### Authority And Trust

`RunAuthority` is immutable, host-supplied, and independent of planner output. It binds the parent run, source baseline, selected Circuit and Module digests, allowed repository scope, maximum permissions, allowed capability identifiers, allowlisted AgentProfile digests, node and concurrency ceilings, permitted responder roles, and owner-only merge approval.

Authority narrows in this order:

```txt
RunAuthority -> Circuit/Module policy -> WorkPacket -> AgentProfile ceiling
             -> Availability binding -> V10 invocation grant
```

No later object may expand an earlier ceiling. A profile describes capability; it is not a credential. Availability describes current capacity and executor binding; it grants no permission. A V10 grant is the invocation authority and must fit every preceding ceiling. Adapter manifests remain descriptive and never load executable code.

The host is responsible for authenticating people, profiles, executors, persistence, credentials, workspaces, sandboxes, processes, and side effects. Core validates claims and records provenance but does not overstate enforcement.

### Capability Matching

An AgentProfile contains an identifier and version, exact capability identifiers, supported Module digests, accepted input and output kinds, a permission ceiling, an explicit non-quality priority, provenance reference, and profile digest. RunAuthority must allowlist that digest.

An AvailabilitySnapshot binds a profile digest to an executor identifier, executor-manifest digest, reservation identifier, and available slot count for one state revision. Provider, model, API, IDE, price, and hidden quality metadata are rejected or ignored by matching.

A candidate is eligible only when it supports the Module and I/O kinds, contains every required capability, fits all authority ceilings, is allowlisted, and has capacity. Assignment is a deterministic capacity-constrained matching:

1. maximize the number of ready invocations assigned;
2. prefer candidates that are not strict permission supersets of another feasible candidate;
3. minimize capability surplus;
4. apply explicit profile priority for incomparable minima;
5. break remaining ties by profile identifier and version against invocations ordered by topological rank and identifier.

Assignments are dynamic state, not part of the immutable plan. They bind the exact profile, availability, executor, packet, claim, plan, and state revision.

### Serialized Coordinator And Parallel Waves

V11 has one serialized coordinator. Multi-process coordinators, durable compare-and-swap claims, remote queues, and crash recovery are deferred.

`OrchestrationState` has exactly these states:

```txt
ready | claimed | input_required | completed | failed | blocked | cancelled | uncertain
```

| Current state | Accepted operation | Legal next state |
| --- | --- | --- |
| absent | `startRun` | `ready` |
| `ready` | `prepareWave` | `claimed`, `blocked`, or deferred unchanged `ready` |
| `ready` | `cancelRun` | `cancelled` |
| `claimed` | `applyWaveResults` | `ready`, `input_required`, `completed`, `failed`, `blocked`, `cancelled`, or `uncertain` |
| `claimed` | `cancelRun` | revised `claimed` with cancellation requested |
| `input_required` | `resumeRun` | `ready`, `blocked`, or `cancelled` |
| `input_required` | `cancelRun` | `cancelled` |
| terminal states | none | unchanged rejection |

`completed`, `failed`, `blocked`, `cancelled`, and `uncertain` are terminal. `prepareWave` may defer without mutation only when statically compatible profiles exist but the supplied AvailabilitySnapshot has no eligible slot. An unreachable graph becomes terminal `blocked`; temporary capacity does not.

`prepareWave` validates an AvailabilitySnapshot, selects a complete bounded wave, creates assignments and claims, advances the state revision to `claimed`, and emits ExecutionTickets. The caller must install that returned state before invoking workers. The high-level facade does this before callbacks. A low-level host that cannot serialize this boundary is non-conformant.

Tickets in one wave may execute concurrently. The host returns one result for every claimed assignment, including a typed `not_started` result. `applyWaveResults` validates the complete batch, sorts it by assignment identifier, and performs one immutable reduction. Clarification and approval can begin only at wave boundaries, so active result races cannot mutate an input-required state.

Capacity lost before any executor call produces `not_started` and returns the invocation to `ready`. Any ambiguity about whether an effect began produces `uncertain`. Automatic retry count is zero; retry, fix, and diagnosis must be explicit Circuit routes.

### Conflict Safety

Each invocation declares canonical repository-relative, slash-separated read prefixes, write prefixes, conflict zones, and whether scope discovery is complete. Paths reject roots, drive letters, empty segments, `.` and `..`; overlap uses path-segment prefix comparison.

Read/read overlap is allowed. Write/write and write/read overlap serialize. Shared writer conflict zones serialize. Unknown or incomplete scope serializes against every writer. V11 has no declaration that permits overlapping writes, even when a host uses separate worktrees. An isolation adapter and overlapping-write semantics require a later ADR.

### Execution And Handoff

An ExecutionTicket binds parent run, plan revision and digest, state revision, wave, assignment and claim, Circuit node and concrete invocation, WorkPacket digest, source baseline, AgentProfile digest, executor and manifest digests, V10 run/attempt/grant identifiers, required output ports, and evidence requirements.

A ChildResultEnvelope binds that ticket identity and contains the immutable V10 summary and digest, child journal reference and digest, port-bound OutputReferences, base and head commits where applicable, changed paths, diff digest, evidence references, and producer ownership. An OutputReference binds a producer, output port, kind/version, source reference, content digest, byte size, and optional schema reference.

A stale, duplicate, missing, cross-plan, cross-profile, cross-packet, or digest-mismatched result leaves state unchanged and returns a stable diagnostic.

### V10 Result Mapping

| V10 disposition | Parent action |
| --- | --- |
| `not_started` with proof of zero executor calls | Release claim and return invocation to `ready` |
| `completed` with workflow outcome | Route the exact Circuit outcome |
| `completed` without workflow outcome | Contract failure; route `diagnose` if declared, otherwise `blocked` |
| `failed` with workflow outcome | Route the exact Circuit outcome |
| `failed` without workflow outcome | Route `diagnose` if declared, otherwise `blocked` |
| acknowledged cancellation | Cancel an active parent cancellation; otherwise route or block |
| timeout with confirmed termination | Route `diagnose` if declared, otherwise `blocked` |
| `abort_unconfirmed` or unknown effect state | Terminal `uncertain`; prohibit retry, output transfer, fan-in, verify, review, and merge |

### Fan-In And Completion

V11 preserves the existing `all` and `any` joins and adds no threshold join. `all` advances only when every required branch succeeds. `any` evaluates branches in canonical invocation order; waves are contiguous in that order, and the lowest-identifier successful branch in the first successful closed wave wins. Unclaimed later branches become skipped. Already claimed branches settle and retain evidence, but only the winner transfers outputs. No join closes while a relevant branch is active or uncertain.

Integration, architecture review, diagnosis, fix, verification, review, and memory candidate creation are ordinary Circuit modules. A run completes only when every activated path reaches a declared exit, required port transfers and joins are closed, integration-owner evidence exists, acceptance verification and review pass, owner approval required by RunAuthority is recorded, and no claim, input request, uncertainty, unresolved failure, or deadlock remains.

The core never performs a branch merge. It emits a merge-ready decision and evidence for the owner or host.

Cancellation while a wave is claimed requests cancellation for every ticket and waits for the complete batch. Any unconfirmed abort makes the parent `uncertain`. A ready state with no reachable work, no valid input request, and no terminal rule becomes `blocked` with a deadlock explanation.

### Parent Trace And Memory

`OrchestrationEvent` is a separate closed union with parent sequence, causation, plan and state revision, actor ownership, and bounded typed payload references. It references child run and attempt identifiers plus V10 summary and journal digests; it never copies or renumbers child events. Evidence owner roles distinguish planner, worker, integration, verifier, reviewer, owner, and host.

Core returns a bounded journal; durable persistence is caller-owned. V11 emits reviewable MemoryCandidates with source references and evidence digests. It does not mutate durable memory automatically.

### Privacy And Bounds

Planner context contains source references by default. Inline excerpts require explicit host selection. Secret scanning is defense in depth, not a confidentiality guarantee; the host owns remote disclosure, consent, and retention.

Canonical artifacts exclude full prompts, chats, hidden reasoning, credentials, environment dumps, raw command output, provider payloads, and evidence bodies.

| Limit | V11 ceiling |
| --- | ---: |
| Direct object UTF-8 bytes | 1,048,576 |
| One string UTF-8 bytes | 16,384 |
| Identifier characters | 128 |
| Snapshot depth / visited nodes | 64 / 100,000 |
| Source references / inline excerpts | 256 / 128 |
| One excerpt / aggregate excerpt bytes | 8,192 / 262,144 |
| AgentProfiles / capabilities per profile or invocation | 64 / 64 |
| Circuit and Module references | 256 |
| Concrete invocations | 256 |
| Prerequisites / derived bindings | 4,096 / 4,096 |
| Read, write, or conflict entries per invocation | 256 each |
| Planning rounds / pending requests | 8 / 1 |
| Concurrency and wave size | 32 |
| Automatic retries | 0 |
| Revisions / parent events | 100,000 / 100,000 |
| Output or evidence references per result | 64 each |

### Portability And Compatibility

Two independent host implementations supplied the same canonical proposal, contracts, RunAuthority, profiles, logical availability bindings, and child result envelopes must produce byte-identical plans, states, and parent events. When real executor identities differ, their provenance fields should differ; a documented semantic projection excluding those fields must remain identical.

No live provider is required for conformance. Optional IDE, A2A, LangGraph, AutoGen, or other adapters may implement host ports later without changing core contracts.

V9 and V10 APIs, six project artifact kinds, and RunEvent 1.0.0 remain compatible. V11 is additive under the unstable 0.x package surface. Packed-consumer coverage and migration notes are required.

## Deferred

- Distributed coordinators, durable queues, crash recovery, and cross-process claims.
- Recursive agent spawning and dynamic Circuit mutation.
- Automatic retry, merge, memory mutation, worktree creation, credentials, and sandbox enforcement.
- Overlapping writes, even with host-declared isolation.
- Provider, model, API, IDE, price, or reasoning selection.

## Consequences

The design sacrifices some throughput and distributed flexibility for deterministic behavior, understandable ownership, and an excellent one-agent baseline. Complete-wave reduction can wait for the slowest claimed worker, and conservative scopes may serialize work. In exchange, every assignment, result, gate, and decision remains reconstructable and safe to review.

## Source Evidence

- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- `docs/architecture/decisions/0002-bounded-executor-boundary.md`
- RFC 8785: https://www.rfc-editor.org/rfc/rfc8785

## Acceptance Gate

Implementation begins only after one immutable revision-2 commit passes the template and source-chain checks and independent product, public API, lifecycle, and security reviewers all return `PASS`. Any material finding returns the outcome to `redesign`.
