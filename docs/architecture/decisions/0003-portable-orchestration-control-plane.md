# ADR 0003: Portable Orchestration Control Plane

## Status

Proposed on 2026-07-15. No V11 implementation is authorized until the exact architecture candidate passes independent product, API, lifecycle, and security review.

## Date

2026-07-15.

## Context

V9 provides a deterministic offline kernel for project initialization, canonical artifact validation, and caller-owned trace inspection. V10 adds one bounded invocation of one host-selected WorkPacket through trusted host-injected executable code. V10 deliberately does not discover goals, decompose work, choose agents, schedule dependencies, coordinate fan-out, perform fan-in, persist state, merge changes, or update memory.

The product goal requires the missing layer: a human supplies a software-engineering goal; user-defined modules and circuits shape the workflow; bounded work is assigned to specialized agents; safe work runs in parallel; child results converge through integration, verification, and review; the complete execution remains traceable and produces durable learning.

That layer must be portable. SWECircuit must not become a router that chooses an IDE, API, model, provider, pricing tier, or reasoning mode. Those choices belong to the embedding host.

## Decision Drivers

- The simple path must remain understandable to a developer using one IDE agent.
- The same contracts must scale from one worker to many workers.
- AI-assisted decomposition must not become unreviewable workflow policy.
- Capability assignment must be stable, explainable, and provider-neutral.
- Parallel speed must not bypass dependencies, conflict controls, integration, or owner approval.
- Failures, clarification, cancellation, uncertainty, and diagnosis must be explicit states.
- Plans and traces must survive beyond ephemeral chat context.
- Every core guarantee must be distinguishable from host-enforced effects.
- V10 must remain the one-packet execution primitive rather than being duplicated.

## Proposed Decision

### Control Plane And Execution Plane

SWECircuit owns the portable control plane:

```txt
goal -> selected circuit -> module invocations -> bounded work packets
     -> capability matching -> dependency-safe ready waves
     -> fan-in -> integrated verification -> review -> memory candidates
```

The host owns the execution plane:

- presenting goals, clarifications, approvals, and evidence to the user;
- implementing the planning port and worker executors;
- choosing IDEs, models, providers, prompts, tools, and reasoning settings;
- enforcing credentials, permissions, sandboxing, workspaces, process isolation, network policy, and cancellation;
- serializing or atomically persisting orchestration state;
- writing artifacts and traces;
- creating branches or worktrees, resolving Git operations, and merging after owner approval;
- reviewing and applying memory candidates.

An IDE or provider may implement the control-plane ports, but it cannot change their semantics.

### Planner Port Produces Proposals

V11 proposes one host-injected `GoalPlanner` port. The kernel does not discover or load planner code from an AdapterManifest, and it does not inspect provider or model identity.

The planner receives a detached, bounded, privacy-screened snapshot containing:

- the structured human goal and acceptance references;
- the explicitly selected circuit and required module contracts;
- relevant project constraints and source references;
- available provider-neutral agent profiles;
- orchestration limits.

The planner returns exactly one closed result:

- a decomposition proposal;
- bounded clarification questions;
- a typed block reason.

Planner output is untrusted data. It cannot grant authority, claim isolation, select executable code, bypass gates, or invoke a worker. The deterministic compiler must validate it before any assignment or worker call.

### Compiled Plan Is Authoritative

A successful compile produces an immutable, fully linked bundle:

- one orchestration plan with goal and source-baseline identity;
- module-node invocations bound to the selected circuit;
- canonical WorkPacket values with acceptance and evidence requirements;
- dependency, join, conflict, integration-owner, and gate relationships;
- packet capability requirements and authority ceilings;
- one initial orchestration state;
- deterministic diagnostics and explanation codes.

The compiler rejects missing acceptance coverage, unknown references, cycles without accepted bounds, invalid joins, absent integration ownership, excessive graph size, permission escalation, ambiguous write conflicts, secret-bearing content, and unsupported module transitions before worker execution.

The exact canonical-artifact split remains an architecture review question. The preferred candidate is a reusable `AgentProfile` artifact and an immutable `OrchestrationPlan` artifact, with bounded serializable runtime state returned by library operations. Goal and WorkPacket source artifacts remain separately referenceable to avoid duplication.

### Capability Matching, Not Model Routing

Each packet declares required capability identifiers, supported input and output contracts, authority needs bounded by its ceiling, and optional isolation requirements. Each reusable agent profile declares:

- stable profile identity and version;
- capability identifiers and supported module roles;
- accepted input and output kinds;
- maximum authority and tool categories;
- supported isolation modes;
- conformance and evidence expectations.

Dynamic availability, current capacity, workspace leases, credentials, executor objects, and provider configuration are invocation-scoped host data, not durable capability claims.

Matching follows a closed deterministic policy:

1. Remove profiles missing a required capability or contract.
2. Remove profiles whose declared ceiling cannot safely cover the packet.
3. Remove profiles without required host-attested isolation support.
4. Prefer the least sufficient authority and smallest exact capability surplus.
5. Apply explicit policy priorities.
6. Break remaining ties by stable profile identity.

The matcher ignores model name, model family, provider, API endpoint, IDE, price, and hidden quality scores. A host may implement the selected profile with any runtime that satisfies the contract.

### Immutable State And Pure Reduction

The active orchestration state is a closed, bounded, serializable, deeply frozen snapshot with:

- plan identity and revision;
- monotonic logical revision number;
- per-packet attempt and lifecycle state;
- assignments and claims;
- satisfied and failed dependencies;
- clarification and approval requests;
- join and integration state;
- parent event journal;
- terminal disposition when known.

The state advances through pure deterministic transition functions. External effects never occur inside the reducer.

The proposed host loop is:

```txt
planning = await planGoal(goal, circuit, modules, profiles, planner, policy)
state = startOrchestration(planning)

while state is non-terminal:
  readyWave = getReadyAssignments(state, profiles, availability, policy)
  claimedState, execution = claimAssignment(state, readyWave.next, state.revision)
  childSummary = host.executeThroughV10(execution)
  state = applyExecutionResults(claimedState, childSummary, claimedState.revision)
```

Names are illustrative until public API review. The contract, not this loop syntax, is normative.

### Revisions, Claims, And Host Atomicity

Every mutating transition requires the exact expected state revision. Within one serialized orchestrator, a stale claim, duplicate result, replayed clarification, or mismatched plan fails deterministically and creates no worker call.

The pure library does not claim to implement a distributed lock. Two processes can independently compute valid successors from the same prior snapshot. A multi-process host must serialize transitions or atomically compare and swap the expected revision when persisting the next state. V11 conformance must name and test this host responsibility.

### Readiness And Bounded Parallelism

A packet is eligible only when:

- its plan and packet contracts are valid;
- all required dependencies and approvals are satisfied;
- its join policy permits progress;
- no failed or uncertain dependency quarantines it;
- an eligible capability profile and host availability record exist;
- its conflict scopes are compatible with the active wave;
- total and per-profile concurrency limits allow it.

Ready assignments are returned in deterministic order and capped before allocation. The host may execute an eligible wave concurrently, but it feeds child summaries back through one serialized reducer boundary.

Parallelism is an optimization of independent work, not a different correctness path. Serial and parallel execution of equivalent deterministic fixtures must converge to semantically equivalent state and trace.

### Conflict Scopes And Isolation

Work packets declare normalized read and write scopes plus conflict zones. Disjoint read/write sets may run together. Overlapping writes and migration, generated-file, lockfile, schema, or shared-state conflicts serialize by default.

A host may permit otherwise conflicting work only when every assignment has a distinct runtime isolation assertion bound to the run, state revision, assignment, workspace identity, and executor, and the host actually enforces that isolation. The assertion records what the kernel checked; it is not proof of enforcement. The exact assertion contract requires security review before implementation.

### Clarification And Approval

Planning or execution may return `input_required` with:

- stable request identity;
- plan and state revision;
- reason and bounded questions or decision options;
- blocked packet and gate references;
- allowed response shape;
- expiry or invalidation rule when applicable.

Resume requires the exact unconsumed request and expected revision. Accepted input becomes a source-linked event and cannot replay already completed packets. The reducer can reject stale state; durable replay protection across processes depends on host persistence and atomicity.

### Child Execution Through V10

Each claimed assignment yields one host-owned V10 invocation bundle. The host supplies the trusted executor, ExecutionGrant, timing policy, and enforced environment. V11 ingests only the normalized V10 ExecutionSummary and its validated child events.

The reducer verifies run, attempt, packet, executor, grant, and assignment bindings before accepting a child result. Substituted, duplicate, stale, or malformed summaries fail without state advancement.

`abort_unconfirmed` keeps the assignment and all dependents quarantined because work may still be live. A host must resolve or isolate that uncertainty; V11 does not convert it to success or ordinary retry.

### Fan-In, Integration, And Completion

All joins are explicit:

- `all` waits for every required successful branch;
- `any` advances after the configured success threshold and records unused or cancelled branches;
- failed or uncertain branches route according to typed workflow outcomes and cannot disappear.

Fan-in creates integration work owned by a declared integration profile or human owner. Goal completion requires:

1. required packet evidence;
2. join satisfaction;
3. integration-owner evidence;
4. integrated acceptance-criteria verification;
5. review outcome;
6. explicit owner merge decision when a merge is in scope.

Worker-local completion never implies integration, review, or merge completion.

### Parent Trace And Memory Candidates

V11 emits one bounded parent event journal that references rather than copies child journals. Parent events cover:

- goal and source-baseline registration;
- plan proposal, clarification, compilation, and revision;
- module and packet creation;
- capability match and assignment explanation;
- readiness, claim, and child-run linkage;
- workflow outcomes, diagnosis, joins, and integration;
- verification, review, approval, and final disposition;
- evidence and memory-candidate references.

Sequence and causation remain authoritative. Raw prompts, full chats, hidden reasoning, environment dumps, command output, provider payloads, credentials, and evidence bodies remain excluded.

V11 proposes reviewable memory candidates with source references. It does not automatically mutate durable memory.

### Bounds And Failure Closure

V11 defines explicit maxima for goal text, planner input and output, profiles, capabilities, packets, edges, joins, conflict scopes, ready assignments, concurrent calls, attempts, clarifications, revisions, events, evidence references, and retained bytes.

Every planner, compiler, matcher, query, and reducer path must close over known results. Invalid input fails with stable diagnostics. Failure, cancellation, timeout, block, clarification, diagnosis, redesign, split, and uncertainty remain distinct from success.

### Portability Proof

The canonical test suite uses at least two host fixtures with different planner and executor wrappers but equivalent capabilities and results. They must produce semantically identical plans, assignments, ready waves, transitions, joins, and parent traces.

No live provider is required for conformance. Optional IDE, A2A, LangGraph, AutoGen, or other adapters may be tested later against the same contracts.

### Compatibility

V9 initialization, validation, trace inspection, artifact semantics, diagnostics, and CLI behavior remain compatible. V10 one-packet execution remains compatible and is reused unchanged unless review proves a narrowly scoped additive requirement.

The preferred V11 contract is additive under the unstable 0.x package surface. Any new artifact kind, event type, or machine API version requires explicit schema and consumer review, migration notes, fixtures, and packed-consumer coverage.

## Consequences

### Positive

- One understandable workflow contract can run in an IDE, CLI, CI process, local agent framework, or remote host.
- Specialized agents are assigned by auditable capability requirements rather than opaque provider choices.
- Parallelism becomes dependency-aware, bounded, and integration-owned.
- Clarification, failure, and uncertainty remain visible instead of being hidden in model behavior.
- Parent trace and memory candidates preserve learning without storing full conversations.
- V10 remains reusable as the only child-effect boundary.

### Negative

- Hosts still need substantial adapter work for planners, executors, persistence, workspaces, and user interaction.
- Pure revision checks do not provide distributed claim exclusivity without atomic host persistence.
- Safe overlapping writes require a reviewed host isolation assertion and real enforcement.
- New plan and profile contracts may expand the public schema surface.
- Deterministic least-authority matching cannot measure subjective agent quality.
- The first vertical slice will be intentionally bounded rather than a complete autonomous development platform.

## Alternatives Considered

- **Put orchestration in prompts or AGENTS.md only:** rejected because plans, assignments, and transitions would not be deterministically inspectable or portable.
- **Let each IDE or provider own decomposition and scheduling:** rejected because workflow meaning and traceability would fragment across hosts.
- **Add provider and model routing to core:** rejected because it is not the product goal and would couple policy to volatile vendor metadata.
- **Adopt LangGraph, AutoGen, CrewAI, or another runtime as core:** rejected for V11 because the contracts should outlive any one runtime; keep adapters optional.
- **Use V10 directly from the host with no parent state:** rejected because dependencies, fan-in, clarification, and full execution trace would remain manual.
- **Automatically execute every planner-created packet:** rejected because proposal data must not self-authorize effects.
- **Claim distributed scheduling from a stateless library:** rejected because true cross-process exclusivity needs durable atomic coordination.
- **Capture full chats for memory:** rejected because source-preserving structured evidence is safer and more retrievable.
- **Automate merge and durable memory writes in V11:** deferred until planning, execution reduction, and integration gates are proven.

## Open Questions

- Which proposed values become canonical artifact kinds and which remain bounded serializable runtime values?
- Does parent orchestration extend RunEvent or require an additive event vocabulary and version?
- What exact least-authority scoring is simple enough to explain and strong enough to test?
- What runtime isolation assertion is useful without overstating host enforcement?
- Which state persistence conformance contract is required for pause and resume?
- Should the first implementation expose several explicit functions or one small orchestrator facade over the pure primitives?
- Which concurrency and graph ceilings are practical for a one-IDE dogfood run and a ten-agent scale scenario?

## Source Evidence

- `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/architecture-review.md`
- `docs/specs/v11-orchestration-planner/decomposition-plan.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- `docs/architecture/decisions/0002-bounded-executor-boundary.md`

## Acceptance Conditions

This ADR may be accepted for implementation only after:

- the design is bound to an immutable commit;
- independent product, public API, lifecycle, and security reviews return PASS against that commit;
- all material findings are resolved in the committed design;
- artifact, event, matching, claim, isolation, and public API questions are closed;
- the checker and source-chain audit pass;
- the accepted contract remains visibly IDE/model/provider agnostic.

## Review Triggers

Revisit this decision when:

- a real IDE, planner, provider, or remote-agent adapter is proposed;
- multi-process or remote scheduling requires durable atomic coordination;
- overlapping writes require worktree or workspace lease automation;
- automatic retries, merge, or durable memory mutation is proposed;
- the agent-profile or plan schema needs a breaking change;
- measured dogfooding shows the simple path is too complex or parallel work does not improve useful throughput.
