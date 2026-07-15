# V11 Architecture Review Packet

## Status

Round 2 candidate packet. Round 1 returned `REVISE` from all four reviewers and is preserved in `architecture-review-round-1.md`. Reviewers must inspect the same exact committed revision-2 tree and record its commit hash in their handoff. Implementation remains blocked until every required verdict is `PASS`.

## Product Question

Does this design provide an IDE-, model-, provider-, and API-agnostic software-work coordinator that is excellent with one agent and can safely scale the same workflow to specialized parallel agents?

The intended journey is:

```txt
user goal -> selected modules and Circuit -> bounded concrete work
          -> capability assignments -> safe parallel waves
          -> integration -> verification -> review -> owner gate
          -> source-preserving trace and memory candidates
```

## Review Sources

- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/plan.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- V9 and V10 schemas, public types, lifecycle tests, and ADRs 0001-0002

## Closed Design Decisions

1. One `runGoal` facade serves one profile at concurrency one and many profiles at bounded concurrency.
2. Circuit owns workflow policy; Plan owns validated concrete instances only.
3. PlanningSession exists before a plan and has a closed clarification lifecycle.
4. The separate orchestration contract family leaves current project artifacts and RunEvent unchanged.
5. Dedicated closed result unions forbid contradictory success/rejection payloads and preserve unchanged state on rejection or temporary capacity deferral.
6. RunAuthority is host-supplied and independent of planner/profile data.
7. Plan is immutable; assignment binds live allowlisted profiles and availability in state.
8. One serialized coordinator commits a whole wave before effects and reduces one complete batch.
9. V11 parallelizes only disjoint writes and compatible reads; isolation exceptions are deferred.
10. ExecutionTicket and ChildResultEnvelope bind the complete parent/child identity and evidence chain.
11. Every V10 disposition has a total parent mapping; unknown effects are terminal uncertain.
12. Existing `all` and `any` joins have closed deterministic semantics; no threshold join is added.
13. Integration, diagnosis, verification, review, approval, and memory candidates are ordinary Circuit stages.
14. A separate OrchestrationEvent union references immutable child journals rather than copying them.
15. RFC 8785 plus SHA-256 identity, privacy exclusions, and exact resource bounds are normative.
16. Distributed coordination, retries, merge, memory mutation, overlapping writes, and provider routing are deferred.

## Required Invariants

- No planner, profile, availability declaration, manifest, or result grants authority.
- No proposal can modify Circuit policy or bypass required gates.
- No worker callback occurs before a compiled plan, committed claim, valid ticket, and V10 preflight.
- No conflicting or unknown writer scopes share a wave.
- No incomplete, stale, duplicate, substituted, or uncertain child result advances state.
- No worker-local success implies integrated acceptance or merge readiness.
- No canonical artifact stores full chats, prompts, hidden reasoning, credentials, raw output, or provider payloads.
- No host-specific field influences capability matching or workflow routing.
- No one-agent user must understand the advanced reducer to use the system.

## Reviewer A: Product And Architecture

Return `PASS` only if graph ownership is singular, the simple path is credible, the multi-agent path is the same system with more capacity, and the design directly serves high-quality software delivery rather than generic agent routing.

Stress scenarios: an underspecified goal, a Circuit that permits no fan-out, one agent only, ten disjoint agents, a planner that adds a security gate, and a worker-local success that fails integrated acceptance.

## Reviewer B: Public API And Compatibility

Return `PASS` only if contract families, digests, discriminated unions, identity ownership, operation results, compatibility, package surface, and invalid states are closed enough to implement without inventing policy.

Stress scenarios: wrong validator family, shuffled JSON keys, duplicate identities, stale revisions, a result from another plan/profile, and an old V9/V10 consumer.

## Reviewer C: Lifecycle And Concurrency

Return `PASS` only if planning, claiming, result batches, input, cancellation, joins, failure routes, deadlock, uncertainty, and completion form one total reconstructable state machine.

Stress scenarios: capacity disappears before call, result arrival permutation, partial batch, cancellation during a wave, `any` under concurrency one and many, active loser, unknown scope, repeated failure, and no-progress state.

## Reviewer D: Security, Privacy, And Trace

Return `PASS` only if RunAuthority is an independent root, profile and executor provenance is bound, core claims match host enforcement, result substitution is rejected, sensitive payload classes stay out, and evidence ownership remains source-preserving.

Stress scenarios: hostile planner, spoofed profile, manifest self-authorization, stale owner approval, malicious paths, secret excerpt, abort uncertainty, forged output port, and child journal replacement.

## Handoff Format

Each reviewer returns:

```txt
commit: exact reviewed commit hash
verdict: PASS | REVISE
findings: severity, source location, violated invariant, smallest required correction
residual risks: bounded risks that do not block implementation
verification: confirmation of read-only scope and unchanged worktree
```

A `REVISE` from any reviewer routes the candidate to redesign. Four `PASS` verdicts authorize implementation planning only; they do not approve merge.
