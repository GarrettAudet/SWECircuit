# V11 Portable Orchestration Planner

## Status

Historical design package; split on 2026-07-15. Round 4 returned four REVISE verdicts against d486b7f with 10 high and 9 medium findings. ADR 0004 and docs/specs/v11-specialist-compiler/ now own the active V11 product slice. The scheduler, restart, parent-trace, repository-proof, merge-evidence, and memory behavior below is deferred and must not be read as implemented or authorized.
## Problem

SWECircuit has portable project workflow contracts and one bounded WorkPacket execution primitive, but a user still has to manually convert a software goal into concrete work, assign specialists, choose safe parallel work, integrate outputs, route failures, verify acceptance, and preserve one trace. That prevents the repository from delivering its core goal: high-quality software work completed quickly by one or many agents under visible, methodical control.

## Product Outcome

A user supplies a goal, acceptance criteria, workflow policy, and at least one agent profile. SWECircuit:

1. asks for material clarification;
2. validates bounded concrete decomposition against host-authored workflow policy;
3. compares a serial baseline with legal decomposition candidates, then uses the independent pure `compileAgentBlueprints` capability to create narrowed WorkPackets, one address-bound AgentBlueprintIntent and one task-specific AgentBlueprint per invocation, compiler-derived evidence bindings, and exact structural measurements;
4. freezes supply-free task demand, then binds each blueprint to an allowlisted runtime profile by exact capability, capacity, and least authority;
5. reserves and claims conflict-safe work before bounded parallel callbacks;
6. routes results, diagnosis, fixes, and joins deterministically;
7. integrates, verifies, reviews, and obtains required owner approval;
8. carries finalized accepted-work semantics through restartable continuations, turns source-linked memory proposals into reviewable candidates, then derives AcceptedWorkProjection and merge-ready evidence in an acyclic order plus a content-digested, source-preserving execution trace.

For the IDE-facing quick path, the repository-shipped `docs/ide/specialist-agent-kickoff.md` capability maps the user's message to a visible `goal-synthesis.md`, approved catalog modules, a Circuit, GoalContract, bounded PolicyBundle, and semantic specialist proposal. Existing allowlisted modules may be selected under repository policy; a novel module, gate, route, authority grant, public-behavior choice, or destructive/security-sensitive capability requires owner approval before `runGoal(start)`, and the decision record must map to the exact launched GoalContract, PolicyBundle, or RunAuthority field that reflects it. `synthesizeGoal` is the human entrypoint; structured `runGoal` is the deterministic kernel boundary, and the execution planner never invents policy after start.

The same `runGoal` contract defaults requested concurrency to one. More profiles add eligible capacity but do not silently parallelize; an explicit bounded value above one scales the same workflow without creating another product mode.

## Product Boundary

SWECircuit coordinates software work. It does not select or switch IDEs, APIs, models, providers, prompts, prices, or reasoning modes. It does not authenticate hosts, enforce sandboxes, create worktrees, merge changes, or mutate durable memory.

## Actors

- Human owner: supplies intent, host-authored policy, authority, clarification, and merge approval.
- Core: validates contracts, compiles policy-bounded work, matches capabilities, reduces state, and emits trace.
- Semantic synthesizer/planner: implements the repository kickoff contract and proposes lane counts, WorkPacket content, and AgentBlueprintIntents within policy; never grants authority or changes workflow.
- AgentBlueprintIntent: address-bound semantic context-use and specialization claims supplied before deterministic compilation.
- AgentBlueprint: compiler-derived, provider-neutral specification of the exact objective, context, scope, supply-free task authority, evidence, verification, handoff, and stop conditions for one invocation.
- AgentMaterializationReceipt: bounded host attestation of the blueprint context/capabilities/ports/constraints configured before dispatch.
- AgentProfile: allowlisted provider-neutral capability and ceiling declaration.
- Host coordinator: authenticates actors and enforces persistence, reservations, paths, processes, credentials, and effects.
- Worker: receives one exact ExecutionTicket and invokes V10.
- Integration/verifier/reviewer agents: ordinary workers whose ownership and independence come from policy.

## Goals

- Make one-agent IDE use complete, resumable, and understandable.
- Let users define bounded replication and specialist roles without planner-owned policy.
- Construct narrow task-specific agents from modules and WorkPackets instead of relying on generic role labels.
- Let the host author every acceptance criterion's coverage policy and mechanically derive producer, verifier, reviewer, integration, and evidence bindings.
- Assign and schedule safe work deterministically and explainably.
- Preserve every authority, identity, result, route, gate, and observation through content digests.
- Measure specialization and parallel elapsed-time value against named golden baselines while preserving equivalent or stronger integrated evidence.

## Non-Goals

- Distributed coordinators, remote queues, durable crash recovery, or cross-process claim guarantees.
- Recursive agent spawning or runtime policy mutation.
- Overlapping writes or host-declared isolation exceptions.
- Automatic retries, merge, memory mutation, worktree creation, sandboxing, or credentials.
- Live provider integration or an external orchestration framework dependency.

## Normative Contract

`docs/specs/v11-orchestration-planner/orchestration-contract.md` is the property-level V11 contract. ADR 0003 owns the architectural decision. The contract owns exact roots, fields, identities, digest projections, commands/results, transitions, matching, waves, child variants, requests, joins, events, payload classes, limits, portability, and exports.

## Requirements

- R1: Expose one closed `runGoal` command union for start and status-specific planning/run continuations with explicit legal interactions and identified/unidentified start rejection; require at least one allowlisted profile, default `requestedConcurrency` to one, bind it into session/Plan, and require an explicit bounded value above one.
- R2: Use a closed host-authored PolicyBundle of OrchestrationPolicy, exact Circuit, exact Module closure, and exact WorkPacket-template closure. Missing, extra, duplicate, or drifted members reject; planner proposals may choose only permitted replication lane counts and narrowed packet content.
- R3: Validate replication regions mechanically. Nodes outside regions instantiate once; concrete lanes inherit Circuit routes/transfers and derive join sources without changing Circuit gates or integration owner.
- R4: Put stable criterion IDs and coverage policy in GoalContract; compiler, not planner, derives one complete Plan row per criterion across selected producer groups, verifier/reviewer invocations, and qualified evidence requirements.
- R5: Treat WorkPacket `role.owner` as a Policy logical role, expose pure `compileAgentBlueprints` independently of runtime profiles, require exactly one closed AgentBlueprintIntent and compile exactly one complete supply-free AgentBlueprint plus predecessor-safe EvidenceBindings per invocation, and keep Assignment as the sole binding between that required specialist and an available runtime profile.
- R6: Use the separate closed `swecircuit/orchestration/v1alpha1` family, RFC 8785 plus SHA-256 identity, one exact domain/framing/preimage registry for derived digests, and the exact per-value digest and ID table without widening V9/V10 artifacts.
- R7: Make RunAuthority an independent root, derive one TaskAuthorityProjection that excludes runtime supply and host identity, bind blueprints to that projection, and bind full authority plus every immutable predecessor through Plan, state, Assignment, ticket, result, request, and event.
- R8: Define property-level closed sessions, states, callbacks, operations, `runGoal`, requests, events, child results, exact comparators, and content-bound transition/journal cursors; carry one digestible AcceptedWorkAccumulator through every state/continuation; invalid operations preserve exact prior state.
- R9: Select deterministic bounded conflict-safe waves, then match their exact AgentBlueprint requirements through the normative maximum-cardinality lexicographic assignment objective; never claim globally maximum conflict packing.
- R10: Reserve worst-case legal result reduction, consume child grant-attempt keys, and commit a complete WaveClaim before execution callbacks; allow only read/read or disjoint scoped work in parallel and reduce one complete batch through deterministic two-pass winner/routing semantics.
- R11: Represent child outcomes as `executed`, `v10_rejected`, `not_started`, or `effect_unknown`; require a bound AgentMaterializationReceipt at the one-shot dispatch boundary and bound observations to distinguish no call, settled call, ambiguous effect, and post-dispatch overflow.
- R12: Bind pre-execution risk approval, outcome clarification, owner approval, cancellation, and result settlement to immutable identities with canonical pending requests, decision actions, exact-repeat deferral, conflicting-cancel rejection, and one-use responses.
- R13: Make `all` and `any` joins width-independent, preserve active routed branches and settled loser evidence, and transfer only accepted port-bound outputs.
- R14: Preserve every finite V9 Circuit cycle bound, allow only Policy/authority narrowing, reserve terminal resource closure, and distinguish executed unrecoverable `failed` from unambiguous no-progress `blocked`.
- R15: Emit closed OrchestrationEvent 1.0.0 references and content-bound journal-tail integrity without copying child events; require integration witnesses, convert memory-node proposals to candidates, derive RepositoryStateRequest from the pre-request state, then derive AcceptedWorkProjection and MergeReadyEvidence only after completed state/event closure and in that acyclic order.
- R16: Enforce exact per-call, availability-output, detached-GrantOffer, root, state, receipt, event, batch, and aggregate limits before effects when possible; after dispatch, an over-limit execution report becomes `effect_unknown` rather than a false pre-effect rejection.
- R17: Preserve the exact current `src/index.ts` public surface type-identically and add only separately named orchestration schemas, types, validators, operations, and explicit packed-consumer paths.
- R18: Ship the provider-neutral Specialist Compiler as a repository kickoff capability plus independently callable pure `compileAgentBlueprints` operation rather than an optional download; compare a serial baseline with legal candidates, require task-shaped AgentBlueprintIntent context uses/specialization claims, exact structural measurements, supply-free AgentBlueprint demand, and a bound AgentMaterializationReceipt, and reject any incomplete or role-label-only invocation.
- R19: Make the repository-shipped `synthesizeGoal` IDE quick path start from one user message, create `goal-synthesis.md`, select only owner-approved catalog modules automatically, expose the assembled workflow, serial/candidate comparison, assumptions, and exact specialist roster, and require each novel/high-risk owner decision to map to the launched structured field that binds it.

## Acceptance Criteria

- [ ] AC1: With `requestedConcurrency` omitted, one supplied AgentProfile and `runGoal(start)` can reach input-required, resume through `continue_planning` or `continue_run`, execute at concurrency one, and complete without advanced operations or provider-specific fields; parallelism occurs only when explicitly requested.
- [ ] AC2: A host-authored replication region can produce zero through its bounded maximum lanes with canonical IDs, cloned routes/transfers, derived join sources, and exactly one instance for every non-region node.
- [ ] AC3: Missing/extra/drifted PolicyBundle templates or a proposal that adds or changes a region, node, route, gate, join, transfer, logical role, owner, authority, acceptance, or completion rule rejects before any worker callback.
- [ ] AC4: Every GoalContract criterion owns one valid coverage policy that compiles exactly once to eligible producer/verifier/reviewer invocations and evidence requirements; unknown, duplicate, missing, planner-authored, or worker-only coverage rejects before effects.
- [ ] AC5: WorkPacket logical ownership remains stable, direct `compileAgentBlueprints` accepts no runtime supply, every invocation has one explicit AgentBlueprintIntent and one complete task-specific AgentBlueprint bound to TaskAuthorityProjection and predecessor-safe EvidenceBindings, identical intent inputs compile byte-identical demand under changed profile supply, and shuffled live profiles/slots produce the exact maximum-cardinality lexicographic assignments for the selected wave without IDE/API/model/provider influence.
- [ ] AC6: Wave selection is deterministic across shuffled inputs, reserves worst-case reduction, consumes each grant-attempt once, installs claimed state before execution, excludes conflicts/unknown path aliases, and returns waiting once when only capacity is unavailable.
- [ ] AC7: `executed`, `v10_rejected`, `not_started`, and `effect_unknown` accept only their required AgentMaterializationReceipt, dispatch, result, and effect-observation fields; cross-run/plan/state/claim/packet/blueprint/materialization/profile/host/grant/attempt/result substitutions leave state unchanged.
- [ ] AC8: Every complete result-batch permutation produces the same next state; uncertainty, exact/different cancellation replay, two-pass routing, live not-started waits, loser suppression, and terminal immutability follow the normative precedence.
- [ ] AC9: `all` and `any` choose identical results at concurrency one and many, including requeued higher-priority branches, diagnosis/fix successors, claimed losers, failures, and uncertainty.
- [ ] AC10: Pre-execution approval, concurrent clarification requests, and final owner approval are exact, canonical, one-use, replay-safe, host-attested, and action-bound; each accepted response applies before the next seed is promoted, while stale, out-of-order, or wrong-role input never advances.
- [ ] AC11: Repeated failures consume finite route budgets and close as failed or blocked before revision/event exhaustion; no run loops indefinitely or retries automatically.
- [ ] AC12: Parent trace and AcceptedWorkAccumulator preserve planning, Plan, finalized assignments/results/materialization semantics, routes, joins, criteria, approval, memory provenance, and terminal semantics across a fresh-process continuation; RepositoryStateRequest, terminal projection, and MergeReadyEvidence construct acyclically while sensitive payload canaries stay external.
- [ ] AC13: Exact resource ceilings, detached-offer references, availability aggregate, and materialization receipt limits pass at minus one and exact and fail closed at plus one; pre-dispatch overflow causes zero forbidden effects, post-dispatch overflow becomes uncertain, and retained bytes stay bounded.
- [ ] AC14: Two independent hosts with identical logical inputs produce byte-identical outputs; hosts with different provenance produce the exact same normative semantic projection.
- [ ] AC15: The V11 dogfood uses one clarification, a serial baseline, at least one legal parallel candidate, at least four explicit AgentBlueprintIntents and directly compiled task-specific AgentBlueprints, materialization receipts, explicit safe parallelism, one failure-to-diagnosis path, fan-in/integration, independent verification/review, owner approval, MemoryProposal-to-MemoryCandidate learning, and MergeReadyEvidence; two Plans differing only in requested concurrency plus one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role baselines receive independent semantic review with exact structural deltas, accepted-work equivalence, environment-qualified elapsed time, quality evidence, and coordination overhead.
- [ ] AC16: V9/V10 tests, schemas, exports, packed consumer, local canonical gates, hosted Windows/Linux CI, and four commit-bound independent reviews pass before implementation acceptance.
- [ ] AC17: One IDE message through the repository-shipped `synthesizeGoal` capability plus an owner-approved catalog creates `goal-synthesis.md`, a serial/candidate comparison, visible GoalContract/PolicyBundle/module rail, task-shaped AgentBlueprintIntents, directly compiled AgentBlueprints, and an executable plan without manual artifact assembly; a novel or high-risk contract stops for one explicit owner decision whose selected value is reflected in the launched structured input before effects.

## Risks

- The detailed internal contract could obscure the human surface unless examples lead with one-agent `runGoal`.
- Calling a worker specialized can create false confidence unless blueprint completeness and dogfood quality evidence remain mandatory.
- Host-authored replication regions add a second policy artifact; references and validation must make the combined PolicyBundle singular and inspectable.
- Host observations and AgentMaterializationReceipts remain attestations; core cannot prove external identity, configuration obedience, bytes, paths, or enforcement.
- Deterministic complete waves and conservative conflicts can wait or serialize more work than a distributed scheduler.
- V11 remains stacked on an unmerged V10 baseline.

## Assumptions

- The host serializes one coordinator and installs claimed state before callback dispatch.
- The host authenticates people, profiles, attestors, and executors and verifies output/VCS/path observations.
- Goal and response bodies can be stored externally with stable source references and content digests.
- Deterministic fixtures can prove conformance without a live model or provider.
