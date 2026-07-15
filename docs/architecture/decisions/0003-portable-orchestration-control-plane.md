# ADR 0003: Portable Orchestration Control Plane

## Status

Revision 4 redesign active on 2026-07-15. Round 1 returned `REVISE` against `f559b4a`, Round 2 returned four `REVISE` verdicts against `5d82394`, and Round 3 returned four `REVISE` verdicts against `79f2b4e`. No V11 schema or runtime implementation is authorized until a later exact candidate passes independent product, API, lifecycle, and security review.

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

The facade can return input required, waiting for changed capacity, or a terminal completed, failed, blocked, cancelled, or uncertain result. Continuations carry the exact prior PlanningSession or OrchestrationState. Users do not need the advanced reducer for clarification or resume.

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

Planner output chooses concrete lane counts and WorkPacket content only inside those machine-checkable bounds. It cannot create a region, node, route, gate, join, transfer, role, authority, or completion rule. Nodes outside replication regions instantiate exactly once. A Circuit with no region cannot be dynamically fanned out.

### Traceable Acceptance

A digest-bound GoalContract gives every acceptance criterion a stable ID, external body reference/digest, and host-authored coverage policy. The compiler derives exactly one Plan coverage row per criterion after lane selection, connecting eligible producer groups, verifier/reviewer invocations, and qualified evidence requirements. Planner output cannot author acceptance. Missing, duplicate, ineligible, or unknown coverage rejects compilation before effects.

Existing WorkPacket `role.owner` means a Policy logical role derived from the Circuit node. It never identifies a profile or executor. Assignment is the only runtime assignee, and evidence ownership derives from Policy, node function, and Assignment.

### Separate Closed Contract Family

V11 uses `swecircuit/orchestration/v1alpha1` with roots OrchestrationPolicy, RunAuthority, AgentProfile, PlanningSession, OrchestrationPlan, OrchestrationState, and OrchestrationEvent. It does not widen the six existing project artifact kinds or RunEvent 1.0.0.

The normative property-level definition is `docs/specs/v11-orchestration-planner/orchestration-contract.md`. It freezes required and forbidden fields, identities, revisions, digest projections, commands/results, transitions, matching, wave selection, result variants, requests, events, payload classes, limits, portability, and package exports. Implementers do not infer missing semantics from this ADR.

All V11 digestible values use RFC 8785 JCS plus SHA-256. Each value removes only its own top-level `contentDigest` while preserving nested digests. Existing V9/V10 values receive full detached SnapshotDigests without changing their schemas.

### Independent Authority Root

RunAuthority is a host-authored root, not planner/profile/manifest data. It binds the GoalContract, PolicyBundle, source baseline, profile and host-attestor allowlists, repository and permission ceilings, responder roles, traversal and resource ceilings, concurrency, and owner-approval policy.

Authority only narrows:

```txt
RunAuthority -> PolicyBundle -> Plan -> WorkPacket -> AgentProfile
             -> Availability/Assignment -> V10 grant
```

RunAuthority digest and every immutable predecessor digest bind PlanningSession, Plan, state, Assignment, ticket, result, input, and authority-related event. Core validates shape and narrowing. The host authenticates people and executors and enforces credentials, persistence, filesystems, processes, isolation, and side effects.

### Deterministic Planning And Assignment

PlanningSession exists before a Plan and has closed ready, input-required, compiled, and blocked variants. Its planner-call limit is `min(8, RunAuthority.limits.plannerCalls)`. A question at that limit blocks without another planner call. Responses bind the exact session, request, responder role, external body digest, and revision.

Plan is immutable and contains requirements, concrete invocations, WorkPacket references/digests, compiler-derived acceptance and integration bindings, port bindings, scopes, requested/effective concurrency, and finite route budgets. Live assignment is state.

Matching builds exact invocation-to-capacity-slot edges, maximizes assignment cardinality, then chooses one lexicographically smallest assignment vector using normalized permission surplus, capability surplus, profile priority, profile identity/version, reservation, and slot order. IDE, API, model, provider, prompt, price, and hidden quality metadata has no influence.

### One Serialized Coordinator

V11 has one serialized coordinator. `prepareWave` inspects ready invocations in canonical order and keeps each earliest conflict-compatible candidate only when all selected candidates remain matchable. Before execution it allocates per-ticket result limits and reserves the worst-case legal state/event/journal reduction. It atomically consumes every grant/run/attempt key, creates assignments and one WaveClaim, advances to claimed state, computes that state digest, then derives tickets. The claimed state is installed before execution callbacks.

Tickets in one wave may execute concurrently. The coordinator accepts one complete bound result batch, resolves uncertainty/cancellation and join winners in a read-only pass, then applies accepted mappings in Assignment order through one immutable transition. Distributed coordinators, remote queues, cross-process claims, and crash recovery are deferred.

Read/read overlap may parallelize. Write/write, write/read, shared writer conflict zones, and unresolved path aliases serialize. V11 has no overlapping-write isolation exception.

### V10 Composition And Effect Truth

V11 defines four child-result variants:

- `executed` with a successful V10 operation result and ExecutionSummary;
- `v10_rejected` with sanitized diagnostics and no fabricated summary;
- `not_started` with coordinator-observed or explicitly host-attested zero-call evidence;
- `effect_unknown` when callback or effect state is ambiguous.

Tickets and results bind authority, Policy, Plan, claimed state, wave/claim, Assignment, WorkPacket, profile, availability/reservation, executor, manifest, V10 grant, V10 attempt, outputs, host observations, and evidence digests.

Every execution callback receives a serializable ticket plus a transient core-owned one-shot `dispatchV10` capability. Core records whether dispatch was never entered, settled, or became ambiguous. Any unknown effect or post-dispatch result-limit overflow makes the parent terminal uncertain and prohibits retry, output transfer, join, verification, review, and merge. Automatic retry is zero. Diagnosis and fix are explicit Circuit routes.

### Requests, Cancellation, Joins, And Closure

Run clarification, pre-execution risk approval, and owner approval use one-use request/response values bound to run, Plan, Policy, authority, prior/current state, gate purpose, responder role, decision action, and digests. Concurrent outcome questions are retained in canonical order but exposed one at a time. Final approval can transition directly to completed; decline follows its host-authored block action.

Cancellation retains the immutable claim/ticket revision. An exact repeat of the active request is deferred before freshness checks; a different concurrent request rejects. In a complete batch, uncertainty wins first, requested cancellation wins second, and a two-pass normal reduction resolves `any` winners before losing results can route or transfer.

`all` waits for every branch success. `any` uses canonical branch priority independent of wave width: a success wins only after all higher-priority branches are terminal non-success. Requeued and diagnosis/fix branches stay active. Claimed lower-priority branches settle; only the winner transfers outputs.

Every reachable cycle is already finitely bounded by its valid V9 Circuit; Policy and RunAuthority may only narrow the snapshotted budget. `failed` follows executed work with unrecoverable failure or exhausted recovery budget. `blocked` is unambiguous no-progress closure. One revision/event is reserved for resource-limit closure. Terminal states are immutable.

A run completes only after every activated invocation settles, joins and transfers close, host-authored acceptance coverage passes, every join has an integration witness, independent verification/review passes, required owner approval is consumed, and a static memory node emits source-linked MemoryProposals. Core converts them to reviewable MemoryCandidates, then emits MergeReadyEvidence bound to the completed state and terminal event. It never merges or mutates durable memory.

### Source-Preserving Trace And Privacy

OrchestrationEvent 1.0.0 is a separate closed parent vocabulary with global parent sequence, exact cause digest, prior-root digest, successor-projection digest, and cumulative journal digest/bytes. Events reference child run/attempt, summary, journal, output, observation, criterion, and source-value digests; they never copy or renumber child RunEvents.

Canonical roots/events contain fixed codes, IDs, revisions, counts, digests, bounded metadata, and source references. Goal, prompt, question, answer, review, block, memory, excerpt, command, log, output, evidence, environment, credential, hidden-reasoning, and provider bodies remain external or transient. Diagnostics never echo rejected values.

Per-call, root, state, event, result-batch, and aggregate-journal limits are incrementally enforced. Pre-effect overflow fails closed; an execution report that exceeds its reserved limit after dispatch becomes uncertain rather than a false pre-effect rejection.

### Compatibility And Portability

The package's existing root export-map entry and every name currently exported from `src/index.ts` remain type-identical. `ArtifactKind` and `ArtifactEnvelope` are internal today and are not misrepresented as preserved public exports; `ARTIFACT_KINDS` remains the same six values. V11 adds only separately named orchestration constants, types, validators, operations, and explicit JSON schema subpaths, with offline packed-consumer coverage.

Identical logical inputs and host identities produce byte-identical Plans, states, and events. Different host provenance remains visible; a precisely defined semantic projection removes only host identity/digest fields and must preserve assignments, routes, outcomes, joins, criteria, evidence ownership, and terminal semantics.

## Deferred

- Distributed coordinators, durable queues, leases, and crash recovery.
- Recursive spawning and runtime mutation of policy.
- Overlapping writes, automatic retries, worktree creation, sandboxing, credentials, merge, and memory mutation.
- IDE, API, model, provider, prompt, price, or reasoning selection.
- External orchestration framework dependencies.

## Consequences

Revision 3 is larger at the internal contract layer because portability and traceability require precise identity and state semantics. The human surface remains one facade and one visible workflow. Complete-wave reduction and conservative conflicts sacrifice some throughput to make the first implementation deterministic, reviewable, and safe to dogfood.

## Source Evidence

- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-2.md`
- `docs/specs/v11-orchestration-planner/orchestration-contract.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- ADR 0001 and ADR 0002
- RFC 8785: https://www.rfc-editor.org/rfc/rfc8785

## Acceptance Gate

Revision 3 must pass local source and canonical package gates, then receive independent product, public API, lifecycle, and security `PASS` verdicts against one exact commit. Any material finding returns to redesign. Four PASS verdicts authorize implementation planning only, not merge.
