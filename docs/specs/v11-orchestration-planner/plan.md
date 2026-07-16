# V11 Implementation Plan

## Status

Architecture revision 4 redesign is active. Round 3 returned four `REVISE` verdicts against immutable commit `79f2b4e`, with 15 high and 10 medium raw findings preserved in `architecture-review-round-3.md`. Specialist and coherence preflights then returned four high/four medium and six high/six medium findings; both routed to `redesign`. No schema or runtime implementation begins until the normative orchestration contract and aligned source chain receive four independent `PASS` verdicts on one later exact commit.

## Summary

Build one provider-neutral software-work coordinator above V10. The repository-shipped `synthesizeGoal` IDE capability turns one user message into visible `goal-synthesis.md` and the structured GoalContract, PolicyBundle, RunAuthority request, semantic planner, and callbacks. Core derives TaskAuthorityProjection, exposes pure profile-free `compileAgentBlueprints`, validates one AgentBlueprintIntent, and compiles predecessor-safe EvidenceBindings plus one task-specific AgentBlueprint per invocation. AcceptedWorkAccumulator preserves finalized semantics through fresh-process continuations, and core validates policy-bounded decomposition, acceptance coverage, blueprint-to-profile assignment, conflict-safe waves, complete child batches, Circuit routes/joins, integrated gates, owner decisions, and parent trace. The same `runGoal` command works at concurrency one and many.

## Normative Sources

- ADR 0003: architecture and ownership.
- `orchestration-contract.md`: exact data, identity, transition, and package contract.
- `../../modules/specialist-agent-compiler.md`: provider-neutral agent-construction and optimization contract.
- `../../ide/specialist-agent-kickoff.md` and `goal-synthesis.md`: one-message reference synthesis surface and V11 dogfood launch record.
- `specialist-compiler-preflight.md`: preserved optimization-gap evidence and redesign obligations.
- `architecture-coherence-preflight.md`: preserved construction-order, continuation, API-union, and byte-reachability obligations.
- `spec.md`: product requirements and acceptance.
- `test-plan.md`: executable proof obligations.
- `architecture-review-round-1.md`, `architecture-review-round-2.md`, and `architecture-review-round-3.md`: preserved failure evidence.

## Delivery Slices

### Slice 1: Contract Family And Canonical Identity

Add orchestration schemas/types for the seven roots and closed nested values, RFC 8785 plus SHA-256 helpers, the complete derived-digest registry, content-bound transition/journal cursors, SnapshotDigest support for V9/V10 values, exact IDs/revisions/comparators, status/presence unions, identified/unidentified facade start rejection, additionalProperties closure, diagnostics, and explicit package schema subpaths.

Gate: schema/runtime parity, digest vectors, nested projection, unbound/bound rejection, hostile values, exact bounds, old export type identity, and offline packed consumer.

### Slice 2: Policy, Planning, And Compilation

Implement exact PolicyBundle closure, OrchestrationPolicy validation, replication-region graph expansion, GoalContract-owned coverage, PlanningSession with authority-bounded planner limit and requested concurrency, proposal/input rounds, supply-free TaskAuthorityProjection, WorkPacket template narrowing, logical roles, address-bound AgentBlueprintIntents, independent profile-free `compileAgentBlueprints` shared by `compilePlan`, predecessor-safe EvidenceBinding construction, exact context-use/field digests and structural measurement records, Plan identity, compiler-derived acceptance/integration/evidence bindings, scopes, and narrowed finite route budgets.

Gate: missing/extra/drifted templates, zero/min/max lanes, graph derivation, planner escalation rejection, intent/blueprint/field/context-use closure, supply-independent demand, exact metric formulas, golden semantic baselines, coverage and integration witnesses, planner limits 1-8, proposal permutations, and zero worker calls.

### Slice 3: Profiles, Matching, Paths, And Wave Claims

Implement AgentProfile/Availability validation with byte-reachable detached GrantOffer references, AgentBlueprint demand versus profile supply, authority narrowing, exact candidate graph and assignment objective, host path observations, conflict detection, deterministic bounded earliest-feasible wave selection without a global-packing claim, child-attempt replay prevention, deterministic claim reserve/result budgets, Assignment/WaveClaim, claimed state, and serializable tickets plus transient dispatch capability.

Gate: exhaustive small matching truth, shuffle invariance, constrained profiles, provider-metadata neutrality, path aliases, conflict matrices, waiting, and claim-before-effect.

### Slice 4: Child Results And Reducer

Implement the four ChildResultEnvelope variants, prompt-free host-attested AgentMaterializationReceipt with registered context-use digests and a pre-dispatch ticket byte limit, opaque core-captured dispatch, AgentBlueprint/HostObservation/OutputReference/EvidenceSatisfaction validation, complete-batch two-pass reduction, exact V10 cancel/timeout mapping, immutable cancellation binding, queued one-use run input/decision actions, Circuit routes/budgets, loser-safe width-independent joins, and terminal closure.

Gate: materialization and identity substitution, result permutations, cancellation precedence, stale input, approval direct completion, `all`/`any` across widths, repeated diagnosis/fix, uncertainty, failed/blocked, and terminal reserve.

### Slice 5: Parent Trace, Privacy, And Facade

Implement OrchestrationEvent 1.0.0 with tail/journal consistency and full-chain inspection, incremental byte accounting, closed SourceReference handling, payload classification, MemoryProposal-to-MemoryCandidate production, state-carried AcceptedWorkAccumulator, pre-request-bound RepositoryStateRequest, final RepositoryStateWitness, acyclic pre-merge AcceptedWorkProjection then MergeReadyEvidence, status-specific self-contained `runGoal` continuations, and graph-wide semantic projection.

Gate: one-agent E2E, complete/interrupted reconstruction, privacy canaries, aggregate bytes, two identical hosts, different-provenance projection, and no busy loop.

### Slice 6: Dogfood, Hardening, And Acceptance

Use the repository kickoff to create `goal-synthesis.md` with a serial baseline and legal candidate comparison, then use direct `compileAgentBlueprints` and V11 to validate at least four AgentBlueprintIntents and compile/materialize their task-specific AgentBlueprints inside a bounded replicated region, including clarification, failure-to-diagnosis/fix, fan-in, host-owned acceptance coverage, integration, verification, review, owner approval, MemoryProposal-to-MemoryCandidate learning, and MergeReadyEvidence.

Gate: intent/blueprint/materialization specificity, one-agent-optimal/under-split/over-split/conflict-heavy/genuinely-parallel/generic-role golden baselines with independent semantic review, exact structural deltas, serial and parallel accepted-work equivalence, measured elapsed time/quality/coordination evidence, canonical local gate, hosted Windows/Linux CI, independent final reviews, milestone, memory, approved baseline, and owner merge decision.

## Public Surface

Human IDE surface:

```txt
synthesizeGoal(user message) -> candidate teams -> compileAgentBlueprints -> goal-synthesis.md -> runGoal(start)
```

Simple kernel surface:

```txt
runGoal(start | continue_planning | continue_run)
```

Advanced:

```txt
startPlanning | applyPlannerResult | resumePlanning
compileAgentBlueprints | compilePlan | startRun | prepareWave | dispatchExecutionTicket | applyWaveResults
resumeRun | cancelRun | recordRepositoryState
projectOrchestrationSemantics | projectAcceptedWorkSemantics | inspectOrchestrationTrace
```

The package root entry and exact names currently exported from `src/index.ts` remain type-identical. New orchestration exports and JSON schema subpaths are separately and explicitly named; internal ArtifactKind/ArtifactEnvelope are not mislabeled as current public exports.

## Security And Host Boundary

- Planner, profile, availability, child, and input values are untrusted bounded data.
- RunAuthority is host-authored; TaskAuthorityProjection removes runtime supply before blueprint demand; every later authority declaration narrows.
- Core supplies a one-shot dispatch boundary, reserves result capacity, observes dispatch state, and validates a prompt-free AgentMaterializationReceipt plus other host-attestation bindings; host authenticates attestors and verifies provider configuration obedience, external bytes, paths, VCS facts, identities, and effects.
- Unknown effect, abort uncertainty, and post-dispatch result overflow are terminal uncertain; automatic retry is zero.
- Sensitive/free-form bodies stay external; roots/events carry fixed codes, closed SourceReference locators, and digests.
- Core stays offline, process-free, provider-free, and merge-free.

## Verification Strategy

- Add rejection-first tests before each positive path.
- Map every Round 1-3 finding plus `specialist-compiler-preflight.md` and `architecture-coherence-preflight.md` obligation to a negative, closure, baseline, byte-bound, restart, or equivalence fixture.
- Count planner and worker calls in every preflight/limit failure.
- Keep the canonical gate green at every slice.
- Prove one-agent usability before accepting multi-agent timing.
- Freeze one immutable candidate for each independent gate.

## Rollback Or Recovery

Each slice is additive and separately reviewable. A failed gate retains the last accepted commit, records stable evidence, enters diagnosis/redesign, and forbids speculative patch loops. If V10 is not approved, rebase onto the approved replacement and rerun all baseline-bound evidence.

## Deferred

Distributed coordination, remote queues, crash recovery, overlapping writes, runtime policy mutation, recursive spawning, automatic retries, worktrees, sandboxing, credentials, merge, durable memory mutation, and live provider adapters.
