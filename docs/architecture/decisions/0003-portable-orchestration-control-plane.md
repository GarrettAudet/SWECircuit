# ADR 0003: Portable Orchestration Control Plane

## Status

Deferred on 2026-07-15 after Round 4 returned four REVISE verdicts with 10 high and 9 medium findings. The source is preserved as runtime-control-plane design evidence, but ADR 0004 replaces it as the V11 implementation target. No scheduler, restart protocol, parent trace, repository attestation, merge-evidence, or automatic-memory behavior in this ADR is implemented or authorized by the V11 Specialist Compiler.
## Context

V9 supplies strict file-based Module, Circuit, WorkPacket, RunEvent, and related project contracts. V10 supplies one bounded host-selected WorkPacket invocation. The missing product layer takes a human software goal through user-defined workflow modules, decomposes it into bounded concrete work, assigns compatible specialists, runs safe work in parallel, integrates and verifies outputs, preserves owner control, and records the full execution trace and learning candidates.

SWECircuit is not an IDE router, API gateway, model selector, provider switch, prompt framework, or agent marketplace. Hosts choose those implementations. Core standardizes software-work policy, handoffs, state, gates, and evidence.

## Decision

### One Surface From One Agent To Many

The primary facade is one closed command:

```txt
runGoal(start | continue_planning | continue_run)
```

A start command supplies at least one host-allowlisted AgentProfile. `requestedConcurrency` defaults to one and is bound into PlanningSession and Plan; merely supplying more profiles or slots never enables parallel work. An explicit authority-bounded value above one uses the same policy, result, trace, and completion semantics.

The facade can return input required, waiting for changed capacity, explicit identified/unidentified start rejection, or a terminal completed, failed, blocked, cancelled, or uncertain result. Every pause returns one status-specific self-contained continuation carrying the exact root, tail event, Plan, packets, profiles, Policy, authority, GoalContract, and state-carried AcceptedWorkAccumulator required by a fresh IDE process. Responses are supplied through an explicit legal interaction and are never half-present or hidden in a returned continuation. Users do not need the advanced reducer or hidden host state for clarification or resume.

### Host-Authored Policy Bundle

Workflow authority is:

```txt
PolicyBundle = OrchestrationPolicy + exact Circuit + exact Modules + exact WorkPacket templates
```

The existing Circuit remains authoritative for graph nodes, routes, outcomes, transfers, fan-outs, joins, exits, verification, and stop conditions. A new host-authored OrchestrationPolicy root binds that exact graph and may only:

- designate closed replication regions over Circuit fan-out branch subgraphs;
- bound minimum and maximum concrete lanes;
- assign logical roles and node functions;
- narrow, but never invent, finite budgets on Circuit cycles that V9 already requires to be bounded;
- narrow authority and repository scope;
- require owner approval.

The repository ships `docs/ide/specialist-agent-kickoff.md` as the provider-neutral `synthesizeGoal` entrypoint. It selects and composes existing modules and Circuit templates from an owner-approved catalog, creates visible `goal-synthesis.md`, compares a serial baseline with legal specialist-team candidates, records low-risk assumptions and exact structural/coordination evidence, and asks before introducing a new module, gate, route, authority grant, public-behavior decision, or destructive/security-sensitive capability. Every required owner decision maps to the exact launched GoalContract, PolicyBundle, or RunAuthority field that reflects it; that structured value is the binding contract. The resulting GoalContract and PolicyBundle are inspectable immutable inputs to structured `runGoal`; free-form IDE conversation remains outside core.

Planner output after start chooses concrete lane counts and WorkPacket content only inside those machine-checkable bounds. It cannot create a region, node, route, gate, join, transfer, role, authority, or completion rule. Nodes outside replication regions instantiate exactly once. A Circuit with no region cannot be dynamically fanned out.

### Traceable Acceptance

A digest-bound GoalContract gives every acceptance criterion a stable ID, external body reference/digest, and host-authored coverage policy. The compiler derives exactly one Plan coverage row per criterion after lane selection, connecting eligible producer groups, verifier/reviewer invocations, and qualified evidence requirements. Planner output cannot author acceptance. Missing, duplicate, ineligible, or unknown coverage rejects compilation before effects.

Existing WorkPacket `role.owner` means a Policy logical role derived from the Circuit node. It never identifies a profile or executor. Assignment is the only runtime assignee, and evidence ownership derives from Policy, node function, and Assignment.

### Compiled Task-Specific Agents

V11 ships a provider-neutral Specialist Compiler as a repository kickoff capability plus independently callable pure `compileAgentBlueprints` operation, not an optional agent pack. Its semantic layer compares a serial baseline with legal candidate decompositions, then proposes narrowed concrete WorkPackets and one address-bound AgentBlueprintIntent containing explicit context uses and specialization claims. `compileAgentBlueprints` accepts no profile or other runtime supply, validates those intents, derives predecessor-safe EvidenceBindings, and compiles exactly one immutable AgentBlueprint plus exact structural measurements per concrete invocation; `compilePlan` must reuse that implementation before supply checks, and core never invents semantic intent. A blueprint binds the exact objective, Module ports, field projections, context-use map, scope, permissions, capabilities, dependencies, criteria, qualified evidence, verification, handoff, independence, and stop conditions. A generic role label is insufficient.

Core derives a supply-free TaskAuthorityProjection before semantic planning. AgentProfile describes runtime capability supply. AgentBlueprint describes task-specific demand and binds the projection rather than full profile-bearing RunAuthority. Assignment is the only binding between demand and supply. The execution adapter receives the exact blueprint and may render provider-specific instructions transiently, but cannot widen it or persist prompts and hidden reasoning in canonical trace. Before V10 dispatch, it supplies a bounded host-attested AgentMaterializationReceipt for delivered context, capabilities, ports, and constraints.

After hard correctness, authority, acceptance, and integration constraints, semantic synthesis seeks high-value bounded conflict-safe work, shorter dependency paths, disjoint writes, small source-preserving context, least privilege, fewer handoffs, and fewer agents when another worker adds no speed or independent evidence. Those judgments require a named baseline, alternatives, unavoidable constraints, and independent review. Core retains exact structural measurements and deterministic maximum-cardinality matching only for the already selected wave; it does not rank models or claim globally optimal decomposition or conflict packing.

### Separate Closed Contract Family

V11 uses `swecircuit/orchestration/v1alpha1` with roots OrchestrationPolicy, RunAuthority, AgentProfile, PlanningSession, OrchestrationPlan, OrchestrationState, and OrchestrationEvent. It does not widen the six existing project artifact kinds or RunEvent 1.0.0.

The normative property-level definition is `docs/specs/v11-orchestration-planner/orchestration-contract.md`. It freezes required and forbidden fields, identities, revisions, digest projections, commands/results, transitions, matching, wave selection, result variants, requests, events, payload classes, limits, portability, and package exports. Implementers do not infer missing semantics from this ADR.

All V11 digestible values use RFC 8785 JCS plus SHA-256. Each value removes only its own top-level `contentDigest` while preserving nested digests. A normative derived-digest registry fixes every domain tag, preimage, order, framing, algorithm, and output grammar. Existing V9/V10 values receive full detached SnapshotDigests without changing their schemas.

### Independent Authority Root

RunAuthority is a host-authored root, not planner/profile/manifest data. It binds the GoalContract, PolicyBundle, source baseline, profile and host-attestor allowlists, repository and permission ceilings, responder roles, traversal and resource ceilings, concurrency, and owner-approval policy.

Authority only narrows:

```txt
RunAuthority -> PolicyBundle -> Plan -> WorkPacket
RunAuthority -> TaskAuthorityProjection -> AgentBlueprintIntent -> AgentBlueprint
Plan + AgentBlueprint -> Assignment -> AgentProfile/Availability -> V10 grant
```

RunAuthority digest and every immutable predecessor digest bind PlanningSession, Plan, state, Assignment, ticket, result, input, and authority-related event. Core validates shape and narrowing. The host authenticates people and executors and enforces credentials, persistence, filesystems, processes, isolation, and side effects.

### Deterministic Planning And Assignment

PlanningSession exists before a Plan and has closed ready, input-required, compiled, and blocked variants. Its planner-call limit is `min(8, RunAuthority.limits.plannerCalls)`. A question at that limit blocks without another planner call. Responses bind the exact session, request, responder role, external body digest, and revision.

Plan is immutable and contains requirements, concrete invocations, one validated AgentBlueprintIntent and one AgentBlueprint per invocation, TaskAuthorityProjection, WorkPacket references/digests, compiler-derived acceptance and integration bindings, port bindings, scopes, exact structural measurements, requested/effective concurrency, and finite route budgets. Live assignment is state.

After a deterministic bounded conflict-safe wave is selected, matching builds exact AgentBlueprint-to-capacity-slot edges, maximizes assignment cardinality for that selected wave, then chooses one lexicographically smallest assignment vector using normalized permission surplus, capability surplus, profile priority, profile identity/version, reservation, and slot order. IDE, API, model, provider, prompt, price, and hidden quality metadata has no influence.

### One Serialized Coordinator

V11 has one serialized coordinator. `prepareWave` inspects ready invocations in canonical order and keeps each earliest conflict-compatible candidate only when all selected candidates remain matchable. This deterministic bounded heuristic is not globally maximum conflict packing. Before execution it allocates per-ticket result limits and reserves the worst-case legal state/event/journal reduction. It atomically consumes every grant/run/attempt key, creates assignments and one WaveClaim, advances to claimed state, computes that state digest, then derives tickets. Result reduction appends only finalized accepted work to a digestible AcceptedWorkAccumulator retained in every later state/continuation. The claimed state is installed before execution callbacks.

Tickets in one wave may execute concurrently. The coordinator accepts one complete bound result batch, resolves uncertainty/cancellation and join winners in a read-only pass, then applies accepted mappings in Assignment order through one immutable transition. Distributed coordinators, remote queues, cross-process claims, and crash recovery are deferred.

Read/read overlap may parallelize. Write/write, write/read, shared writer conflict zones, and unresolved path aliases serialize. V11 has no overlapping-write isolation exception.

### V10 Composition And Effect Truth

V11 defines four child-result variants:

- `executed` with a successful V10 operation result and ExecutionSummary;
- `v10_rejected` with sanitized diagnostics and no fabricated summary;
- `not_started` only when core observes that the one-shot dispatch counter remained zero;
- `effect_unknown` when callback or effect state is ambiguous.

Tickets and results bind authority, Policy, Plan, claimed state, wave/claim, Assignment, AgentBlueprint, WorkPacket, profile, availability/reservation, executor, manifest, AgentMaterializationReceipt when dispatch starts, V10 grant, V10 attempt, outputs, host observations, and evidence digests.

Every execution callback receives a serializable ticket plus a transient core-owned one-shot `dispatchV10(executor, materializationReceipt)` capability. Core validates the prompt-free host attestation before entering V10; this proves binding and transport, not external-provider obedience. Core records whether dispatch was never entered, settled, or became ambiguous. Any unknown effect or post-dispatch result-limit overflow makes the parent terminal uncertain and prohibits retry, output transfer, join, verification, review, and merge. Automatic retry is zero. Diagnosis and fix are explicit Circuit routes.

### Requests, Cancellation, Joins, And Closure

Run clarification, pre-execution risk approval, and owner approval use one-use request/response values bound to run, Plan, Policy, authority, prior/current state, gate purpose, responder role, decision action, and digests. Concurrent outcome questions are retained in canonical order but exposed one at a time. Final approval can transition directly to completed; decline follows its host-authored block action.

Cancellation retains the immutable claim/ticket revision. An exact repeat of the active request is deferred before freshness checks; a different concurrent request rejects. In a complete batch, uncertainty wins first, requested cancellation wins second, and a two-pass normal reduction resolves `any` winners before losing results can route or transfer.

`all` waits for every branch success. `any` uses canonical branch priority independent of wave width: a success wins only after all higher-priority branches are terminal non-success. Requeued and diagnosis/fix branches stay active. Claimed lower-priority branches settle; only the winner transfers outputs.

Every reachable cycle is already finitely bounded by its valid V9 Circuit; Policy and RunAuthority may only narrow the snapshotted budget. `failed` follows executed work with unrecoverable failure or exhausted recovery budget. `blocked` is unambiguous no-progress closure. One revision/event is reserved for resource-limit closure. Terminal states are immutable.

A run completes only after every activated invocation settles successfully or is canonically skipped, joins and transfers close, host-authored acceptance coverage passes through qualified EvidenceSatisfactions, every join has an integration witness, independent verification/review passes, a final clean contained RepositoryStateWitness binds every accepted write and final tree, required owner approval is consumed against that witness, and a static memory node emits source-linked MemoryProposals. Core converts them to reviewable MemoryCandidates, derives RepositoryStateRequest from the pre-request state, closes completed state and terminal event, derives AcceptedWorkProjection from a pre-merge source bundle, then emits MergeReadyEvidence from that projection plus the same terminal evidence. This order is acyclic. It never merges or mutates durable memory.

### Source-Preserving Trace And Privacy

OrchestrationEvent 1.0.0 is a separate closed parent vocabulary with global parent sequence, exact cause digest, prior-root digest, successor-projection digest, and cumulative journal digest/bytes. Events reference child run/attempt, summary, journal, output, observation, criterion, and source-value digests; they never copy or renumber child RunEvents.

Canonical roots/events contain fixed codes, IDs, revisions, counts, digests, bounded metadata, and closed SourceReference locators. Goal, prompt, question, answer, review, block, memory, excerpt, command, log, output, evidence, environment, credential, hidden-reasoning, and provider bodies remain external or transient. Diagnostics never echo rejected values.

Per-call, availability-result, detached-offer, root, state, materialization-receipt, event, result-batch, and aggregate-journal limits are incrementally enforced. Pre-effect overflow fails closed; an execution report that exceeds its reserved limit after dispatch becomes uncertain rather than a false pre-effect rejection.

### Compatibility And Portability

The package's existing root export-map entry and every name currently exported from `src/index.ts` remain type-identical. `ArtifactKind` and `ArtifactEnvelope` are internal today and are not misrepresented as preserved public exports; `ARTIFACT_KINDS` remains the same six values. V11 adds only separately named orchestration constants, types, validators, operations, and explicit JSON schema subpaths, with offline packed-consumer coverage.

Identical logical inputs and host identities produce byte-identical Plans, states, and events. Different host provenance remains visible; a precisely defined semantic projection removes only host identity/digest fields and must preserve blueprint specialization, assignments, routes, outcomes, joins, criteria, evidence ownership, repository-tree semantics, and terminal semantics. A separate accepted-work projection removes width-specific waves, claims, waits, loser work, and event topology so two Plans compiled from identical semantic inputs except requested concurrency can be compared without pretending their Plan, state, or raw trace digests are identical.

## Deferred

- Distributed coordinators, durable queues, leases, and crash recovery.
- Recursive spawning and runtime mutation of policy.
- Overlapping writes, automatic retries, worktree creation, sandboxing, credentials, merge, and memory mutation.
- IDE, API, model, provider, prompt, price, or reasoning selection.
- External orchestration framework dependencies.

## Consequences

Revision 4 is larger at the internal contract layer because portability and traceability require precise identity and state semantics. The human surface remains one facade and one visible workflow. Complete-wave reduction and conservative conflicts sacrifice some throughput to make the first implementation deterministic, reviewable, and safe to dogfood.

## Source Evidence

- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-2.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-3.md`
- `docs/modules/specialist-agent-compiler.md`
- `docs/specs/v11-orchestration-planner/specialist-compiler-preflight.md`
- `docs/specs/v11-orchestration-planner/architecture-coherence-preflight.md`
- `docs/specs/v11-orchestration-planner/orchestration-contract.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- ADR 0001 and ADR 0002
- RFC 8785: https://www.rfc-editor.org/rfc/rfc8785

## Acceptance Gate

Revision 4 must pass local source and canonical package gates, then receive independent product, public API, lifecycle, and security `PASS` verdicts against one exact commit. Any material finding returns to redesign. Four PASS verdicts authorize implementation planning only, not merge.
