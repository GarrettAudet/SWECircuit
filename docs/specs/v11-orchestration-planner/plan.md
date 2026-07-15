# V11 Implementation Plan

## Status

Architecture redesign in progress. T001 bootstrap and T002 Round 1 review are complete; all four reviewers returned `REVISE`. T003 freezes revision 2. No schema or runtime implementation begins until T004 Round 2 returns four `PASS` verdicts on one immutable commit.

## Summary

Add a small provider-neutral orchestration layer above V10. A host or IDE supplies a goal, selected Circuit and Modules, authority, profiles, planner, and execution callbacks. SWECircuit validates decomposition against Circuit policy, assigns ready work by capability, commits a safe wave, accepts one complete result batch, advances integration gates, and emits an end-to-end trace. The same facade uses one agent by default and scales by adding profiles and capacity.

## Design Baseline

- Policy lives in Circuit and Module contracts.
- A planner proposes concrete work but cannot change workflow policy or grant authority.
- A plan is immutable; assignment and capacity live in orchestration state.
- One serialized coordinator owns state; workers in one complete wave may run concurrently.
- V10 remains the only child-effect boundary.
- Disjoint scopes can run together; overlapping or unknown writes serialize.
- Integration, verification, review, approval, and memory candidates remain visible modules and gates.
- Core never selects a model/provider/IDE/API, merges branches, or mutates durable memory.

## Delivery Slices

### Slice 1: Contracts And Canonical Identity

Add the separate `swecircuit/orchestration/v1alpha1` schema family and TypeScript closed unions for PlanningSession, OrchestrationPlan, AgentProfile, OrchestrationState, OrchestrationEvent, RunAuthority, proposals, input, availability, assignments, tickets, results, outputs, and memory candidates.

Implement RFC 8785 plus SHA-256 digest helpers, safe-integer restrictions, exact limits, detached snapshots, stable diagnostics, positive fixtures, and one negative fixture per closed field or invalid state.

Gate: schemas, runtime validators, canonical fixtures, generated types where used, public exports, packed consumer, and inherited V9/V10 behavior pass.

### Slice 2: Planning And Circuit Compilation

Implement `startPlanning`, `applyPlannerResult`, and `resumePlanning`. Validate the host-supplied RunAuthority before planner invocation. Treat planner values as untrusted detached data. Compile only Circuit-authorized concrete invocations, WorkPackets, prerequisites, scopes, and port bindings.

Gate: proposal permutations compile identically; graph-policy escalation, missing acceptance coverage, invalid bindings, stale input, replay, round exhaustion, and oversized input all fail with zero worker calls.

### Slice 3: Capability Matching And Wave Preparation

Implement profile validation, availability binding, deterministic capacity-constrained matching, readiness, canonical scope overlap, and `prepareWave`. Return the claimed state and ExecutionTickets together; the high-level facade installs state before callbacks.

Gate: shuffled candidates and capacities yield identical assignments; maximum cardinality and tie-break rules hold; out-of-authority profiles and provider metadata cannot influence matching; conflicts serialize; unknown writes never parallelize.

### Slice 4: Child Reduction And Workflow Closure

Implement ChildResultEnvelope validation, complete-batch reduction, the total V10 mapping, Circuit outcome routing, port transfer, `all` and `any` joins, loser settlement, diagnosis/fix routes, cancellation, deadlock, uncertainty, and completion predicates.

Gate: every state/disposition pair is accepted or rejected explicitly; arrival order does not change results; duplicate or substituted results do not mutate state; serial and parallel join semantics agree.

### Slice 5: Trace, Privacy, And Simple Facade

Implement OrchestrationEvent emission, parent-to-child digest references, bounded journals, MemoryCandidates, privacy exclusions, source-reference defaults, and `runGoal`. Add a one-agent example first, then a multi-agent example using the identical facade.

Gate: a new user can explain and run the one-agent path; trace reconstruction needs no chat history; privacy canaries stay outside artifacts; two host wrappers produce equivalent canonical outputs.

### Slice 6: Dogfood And Acceptance

Use V11 itself to coordinate four bounded roles over one repository goal: implementation A, implementation B, test/diagnosis, and integration/review. Include one clarification, one child failure routed to diagnosis, an `all` join, integrated verification, owner approval, and a MemoryCandidate.

Run the same logical work with concurrency one and bounded parallelism. Compare outputs and evidence for equivalence and record elapsed time without turning the observation into a universal performance claim.

Gate: canonical local verification, template matrix, package inspection, packed consumer, cross-platform hosted CI, commit-bound independent reviews, milestone, and durable memory are complete.

## Public Surface

Simple facade:

```txt
runGoal(input) -> asynchronous GoalRunResult
```

Advanced deterministic operations:

```txt
startPlanning
applyPlannerResult
resumePlanning
startRun
prepareWave
applyWaveResults
resumeRun
cancelRun
inspectOrchestrationTrace
```

`GoalRunInput` contains goal, Circuit, Modules, RunAuthority, planner, AgentProfiles, availability provider, execution callback, input callback, approval callback, and optional policy bounds. It contains no provider-routing fields.

## Impacted Areas

- `schemas/orchestration/v1alpha1/` and schema documentation.
- `src/` orchestration contracts, canonicalization, planning, compilation, matching, reducer, trace, facade, diagnostics, and exports.
- `tests/` contract, property, lifecycle, security, compatibility, host-equivalence, dogfood, and package-consumer fixtures.
- `docs/` architecture, package/API guide, examples, module registry, feature evidence, milestone, research governance, and memory.
- `package.json` exports only when backed by packed-consumer evidence.

## Verification Strategy

- Every slice lands with rejection-first tests and preserves the canonical gate.
- Each review finding maps to at least one negative fixture.
- Every effect-capable test counts planner and worker calls and proves zero calls on preflight rejection.
- One independent host wrapper uses direct low-level operations; another uses `runGoal`.
- One-agent usability is manually reviewed before multi-agent performance evidence is accepted.
- The complete candidate is immutable during final independent review.

## Rollback Or Recovery

Each slice is additive and separately committed. If a slice fails its gate, retain the last accepted state and record diagnosis before another patch. If V10 is not approved, rebase V11 onto the approved replacement and rerun every baseline-bound check. No V11 merge occurs from an unapproved stacked baseline.

## Deferred Follow-Ups

- Durable coordinator adapter and cross-process compare-and-swap.
- Worktree or sandbox isolation adapter.
- Optional A2A, IDE, LangGraph, AutoGen, or other host adapters.
- Overlapping-write scheduling with enforceable leases.
- Automatic retry policy only after explicit diagnosis semantics are proven.
- Reviewed memory promotion and merge adapters.
