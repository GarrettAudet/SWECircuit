# V11 Implementation Plan

## Status

Architecture revision 3 is locally validated and ready to freeze for independent review. Round 2 returned four `REVISE` verdicts against immutable commit `5d82394`. No schema or runtime implementation begins until the normative orchestration contract and aligned source chain receive four independent `PASS` verdicts on one exact revision-3 commit.

## Summary

Build one provider-neutral software-work coordinator above V10. A user supplies a GoalContract with coverage policy, host-authored PolicyBundle, RunAuthority, at least one AgentProfile, optional explicit concurrency, planner, and callbacks. Core validates policy-bounded decomposition, acceptance coverage, capability assignment, conflict-safe waves, complete child batches, Circuit routes/joins, integrated gates, owner decisions, and parent trace. The same `runGoal` command works at concurrency one and many.

## Normative Sources

- ADR 0003: architecture and ownership.
- `orchestration-contract.md`: exact data, identity, transition, and package contract.
- `spec.md`: product requirements and acceptance.
- `test-plan.md`: executable proof obligations.
- `architecture-review-round-1.md` and `architecture-review-round-2.md`: preserved failure evidence.

## Delivery Slices

### Slice 1: Contract Family And Canonical Identity

Add orchestration schemas/types for the seven roots and closed nested values, RFC 8785 plus SHA-256 helpers, content-bound transition/journal cursors, SnapshotDigest support for V9/V10 values, exact IDs/revisions/comparators, additionalProperties closure, diagnostics, and explicit package schema subpaths.

Gate: schema/runtime parity, digest vectors, nested projection, unbound/bound rejection, hostile values, exact bounds, old export type identity, and offline packed consumer.

### Slice 2: Policy, Planning, And Compilation

Implement exact PolicyBundle closure, OrchestrationPolicy validation, replication-region graph expansion, GoalContract-owned coverage, PlanningSession with authority-bounded planner limit and requested concurrency, proposal/input rounds, WorkPacket template narrowing, logical roles, Plan identity, compiler-derived acceptance/integration bindings, scopes, and narrowed finite route budgets.

Gate: missing/extra/drifted templates, zero/min/max lanes, graph derivation, planner escalation rejection, coverage and integration witnesses, planner limits 1-8, proposal permutations, and zero worker calls.

### Slice 3: Profiles, Matching, Paths, And Wave Claims

Implement AgentProfile/Availability/GrantOffer validation, authority narrowing, exact candidate graph and assignment objective, host path observations, conflict detection, earliest-feasible wave selection, child-attempt replay prevention, deterministic claim reserve/result budgets, Assignment/WaveClaim, claimed state, and serializable tickets plus transient dispatch capability.

Gate: exhaustive small matching truth, shuffle invariance, constrained profiles, provider-metadata neutrality, path aliases, conflict matrices, waiting, and claim-before-effect.

### Slice 4: Child Results And Reducer

Implement the four ChildResultEnvelope variants, dispatch/HostObservation/OutputReference validation, complete-batch two-pass reduction, exact V10 cancel/timeout mapping, immutable cancellation binding, queued one-use run input/decision actions, Circuit routes/budgets, loser-safe width-independent joins, and terminal closure.

Gate: identity substitution, result permutations, cancellation precedence, stale input, approval direct completion, `all`/`any` across widths, repeated diagnosis/fix, uncertainty, failed/blocked, and terminal reserve.

### Slice 5: Parent Trace, Privacy, And Facade

Implement OrchestrationEvent 1.0.0 with tail/journal consistency and full-chain inspection, incremental byte accounting, bounded journal inspection, payload classification, MemoryProposal-to-MemoryCandidate production, post-terminal MergeReadyEvidence, `runGoal` start/continuation loop, and graph-wide semantic projection.

Gate: one-agent E2E, complete/interrupted reconstruction, privacy canaries, aggregate bytes, two identical hosts, different-provenance projection, and no busy loop.

### Slice 6: Dogfood, Hardening, And Acceptance

Use V11 to coordinate at least four specialized roles inside a bounded replicated region, including clarification, failure-to-diagnosis/fix, fan-in, host-owned acceptance coverage, integration, verification, review, owner approval, MemoryProposal-to-MemoryCandidate learning, and MergeReadyEvidence.

Gate: serial and parallel evidence equivalence, measured elapsed time, canonical local gate, hosted Windows/Linux CI, independent final reviews, milestone, memory, approved baseline, and owner merge decision.

## Public Surface

Simple:

```txt
runGoal(start | continue_planning | continue_run)
```

Advanced:

```txt
startPlanning | applyPlannerResult | resumePlanning
compilePlan | startRun | prepareWave | applyWaveResults
resumeRun | cancelRun | inspectOrchestrationTrace
```

The package root entry and exact names currently exported from `src/index.ts` remain type-identical. New orchestration exports and JSON schema subpaths are separately and explicitly named; internal ArtifactKind/ArtifactEnvelope are not mislabeled as current public exports.

## Security And Host Boundary

- Planner, profile, availability, child, and input values are untrusted bounded data.
- RunAuthority is host-authored and every later contract narrows it.
- Core supplies a one-shot dispatch boundary, reserves result capacity, observes dispatch state, and validates host-attestation binding; host authenticates attestors and verifies external bytes, paths, VCS facts, identities, and effects.
- Unknown effect, abort uncertainty, and post-dispatch result overflow are terminal uncertain; automatic retry is zero.
- Sensitive/free-form bodies stay external; roots/events carry fixed codes, source refs, and digests.
- Core stays offline, process-free, provider-free, and merge-free.

## Verification Strategy

- Add rejection-first tests before each positive path.
- Map every Round 1/2 finding to a negative or equivalence fixture.
- Count planner and worker calls in every preflight/limit failure.
- Keep the canonical gate green at every slice.
- Prove one-agent usability before accepting multi-agent timing.
- Freeze one immutable candidate for each independent gate.

## Rollback Or Recovery

Each slice is additive and separately reviewable. A failed gate retains the last accepted commit, records stable evidence, enters diagnosis/redesign, and forbids speculative patch loops. If V10 is not approved, rebase onto the approved replacement and rerun all baseline-bound evidence.

## Deferred

Distributed coordination, remote queues, crash recovery, overlapping writes, runtime policy mutation, recursive spawning, automatic retries, worktrees, sandboxing, credentials, merge, durable memory mutation, and live provider adapters.
