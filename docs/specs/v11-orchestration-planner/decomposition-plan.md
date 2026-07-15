# V11 Decomposition Plan

## Status

Architecture bootstrap complete. Read-only design review is next; implementation fan-out remains blocked until the gate passes.

## Goal

Define the smallest IDE-, model-, and provider-agnostic control plane that turns a human goal and selected circuit into bounded work packets, matches specialized agents by declared capability, exposes dependency-safe parallel waves, reduces child results through fan-in and integration gates, and preserves one reconstructable execution trace.

## Source Artifacts

- Feature package: `docs/specs/v11-orchestration-planner/`
- Architecture or ADR: `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- Research snapshot: `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- Relevant memory: `docs/memory/active-context.md` and `docs/memory/retrieval-index.md`

## Branch And State

- Source branch: `codex/v10-executor-adapter` at closeout commit `8ac3372`
- Target branch: `codex/v11-orchestration-planner`
- Baseline commit or state: technically accepted V10, stacked while owner merge approval remains open
- Dirty state: clean at branch creation; V11 bootstrap documents are the only planned changes
- Approval gate: ADR 0003 must pass independent review; V10 must be approved or V11 rebased before V11 acceptance
- Merge target: `main`, never directly from an unapproved stacked baseline

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Goal clarification | Clarify | Prevent a planner from inventing product intent or unsafe authority |
| Specification | Spec | Bind decomposition to explicit acceptance criteria |
| Architecture | Architecture review | Freeze policy, trust, lifecycle, and compatibility boundaries |
| Decomposition | Task planning | Produce bounded, linked work packets and dependency edges |
| Assignment | Capability matching | Match requirements to declared agent skills without provider logic |
| Parallel progress | Readiness and claim | Expose deterministic safe waves and prevent duplicate ownership |
| Execution | V10 executor boundary | Invoke exactly one host-selected packet with bounded evidence |
| Integration | Fan-in and merge gate | Combine child results without equating worker completion with product completion |
| Verification | Verify and review | Prove local and integrated acceptance criteria |
| Learning | Memory update | Promote evidence-backed learning after final review |

## Decomposition Summary

Architecture work should fan out only as independent read-only reviews of one immutable design candidate. Write-enabled implementation is deferred. After the contract is accepted, implementation can split by schema and public types, compiler and matching, reducer and lifecycle, parent trace and security, then converge under one integration owner.

## Dependency Graph

```txt
goal and current contracts
  -> product and ecosystem review
  -> proposed ADR and contract packet
     -> correctness review
     -> security and privacy review
     -> host and public API review
  -> integrate findings and freeze ADR
  -> implementation work units
  -> integrated verification and dogfood
  -> final review, memory, milestone, owner gate
```

## Work Units

### Work Unit A: Contract And Ecosystem Review

Objective: Check that V11 addresses the real orchestration gap while staying portable and simple.

Scope boundary: Read-only review of the feature package, V9/V10 contracts, current handbook, and primary-source snapshot.

Likely files or docs: V11 spec, research snapshot, ADR 0003, Module, Circuit, WorkPacket, RunEvent, and executor contracts.

Dependencies: T001 bootstrap candidate.

Conflict zones: None; findings only.

Context bundle: Goal, positioning statement, acceptance criteria, V10 non-goals, research decisions, and active constraints.

Agent role or capability: Product and distributed-workflow architecture reviewer.

Allowed actions: Read and return cited findings; no file edits, tests, network calls, or Git mutations.

Verification evidence: A commit-bound verdict with severity, exact source locations, assumptions, and required changes.

Handoff format: `PASS` or `REVISE`, followed by findings and residual risks.

Stop conditions: Ambiguous product intent, policy delegated to a provider, or scope exceeding one vertical slice.

### Work Unit B: Data And Public API Design

Objective: Review the proposed plan, agent profile, assignment, claim, resume, and transition contracts for determinism and compatibility.

Scope boundary: Read-only type and state-machine review.

Likely files or docs: ADR 0003, schema README, `src/types.ts`, `src/index.ts`, existing schemas, V11 test plan.

Dependencies: Same immutable design candidate as Work Unit A.

Conflict zones: Proposed naming and ownership of public types.

Context bundle: Canonical v1alpha1 rules, OperationResult semantics, bounded snapshot rules, and compatibility promises.

Agent role or capability: TypeScript library and protocol API reviewer.

Allowed actions: Read and return a contract proposal or finding; no edits.

Verification evidence: Determinism, closed-union, invalid-state, and compatibility analysis.

Handoff format: Commit-bound verdict and minimal public-surface recommendation.

Stop conditions: Required breaking change to an accepted artifact kind or unresolved ownership ambiguity.

### Work Unit C: Scheduler And Lifecycle Review

Objective: Test the readiness, claim, dependency, conflict, clarification, failure, fan-in, and resume model against concurrency races.

Scope boundary: Read-only state-machine and adversarial scenario analysis.

Likely files or docs: V11 spec, ADR 0003, decomposition plan, V10 lifecycle matrix, orchestration patterns.

Dependencies: Same immutable design candidate.

Conflict zones: None; findings only.

Context bundle: AC3 through AC9, bounded concurrency constraints, V10 dispositions, and join semantics.

Agent role or capability: Concurrency and workflow-systems reviewer.

Allowed actions: Read and reason through schedules; no mutation.

Verification evidence: Counterexamples or a PASS verdict across shuffle, duplicate claim, stale resume, overlapping scopes, failure, and fan-in cases.

Handoff format: Scenario matrix with the first invalid transition identified.

Stop conditions: A state cannot be reconstructed from source artifacts and events.

### Work Unit D: Security, Privacy, And Trace Review

Objective: Verify that untrusted planner and worker data cannot grant authority, leak sensitive content, overclaim isolation, or corrupt parent trace state.

Scope boundary: Read-only threat review.

Likely files or docs: ADRs 0002 and 0003, snapshot/privacy contracts, V11 spec and test plan.

Dependencies: Same immutable design candidate.

Conflict zones: Host-versus-core enforcement language.

Context bundle: Trust boundaries, limits, privacy exclusions, grant semantics, input-required resume, and parent-child trace proposal.

Agent role or capability: Application security and auditability reviewer.

Allowed actions: Read and return findings; no secrets, network, edits, or live execution.

Verification evidence: Threat cases for hostile proposals, oversized graphs, capability spoofing, stale or replayed inputs, child-result substitution, trace leakage, and isolation overclaim.

Handoff format: Commit-bound security verdict with required negative tests.

Stop conditions: Any declaration self-authorizes work or any sensitive raw payload enters canonical trace.

### Work Unit E: Integration Owner

Objective: Reconcile independent findings, revise the design, run bootstrap validation, and freeze the smallest accepted contract.

Scope boundary: V11 planning artifacts only until all required design reviews pass.

Likely files or docs: Every V11 planning artifact, ADR 0003, active context, retrieval index, and practice register after acceptance.

Dependencies: Work Units A through D.

Conflict zones: All proposed contract decisions; the integration owner resolves them visibly.

Context bundle: Complete source chain plus all reviewer handoffs.

Agent role or capability: Main IDE agent acting as integration owner.

Allowed actions: Edit planning artifacts, validate them, create immutable candidates, and request owner decisions. No merge.

Verification evidence: Checker output, clean diff, exact candidate commit, and all required independent verdicts.

Handoff format: Updated review record with decision trace and next implementation slice.

Stop conditions: Conflicting high-severity findings, V10 baseline rejection, or product intent requiring owner clarification.

## Fan-Out Plan

- Work Units A through D start only after one immutable bootstrap commit exists.
- Every specialist uses a fresh, bounded, read-only context bundle.
- The main IDE agent remains integration owner and is not counted as an independent reviewer.
- No reviewer may edit the shared branch.
- Implementation fan-out begins only after the architecture outcome is `pass`.

## Fan-In Plan

- Integration owner: main IDE agent
- Merge order: contract corrections, security corrections, lifecycle corrections, public-surface simplification
- Conflict-resolution approach: preserve the strictest accepted invariant and record unresolved tradeoffs in ADR 0003
- Integrated verification: template checker before review; canonical kernel gate after code or schemas exist
- Review owner: repository owner for merge; independent agents for technical design and implementation evidence

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | Product and ecosystem verdict | Acceptance criteria still express the owner goal |
| B | Type and compatibility verdict | One coherent bounded public contract |
| C | Adversarial transition matrix | Deterministic ready waves and fan-in state |
| D | Threat and privacy verdict | Negative fixtures and truthful enforcement claims |
| E | Checker, diff, and source-chain audit | Immutable reviewed architecture candidate |

## Stop Or Redesign Triggers

- Product intent or completion evidence becomes ambiguous.
- Core routing depends on a named IDE, provider, model, or API.
- Planner output can bypass deterministic validation or authority ceilings.
- Conflict zones cannot be isolated or serialized.
- A worker result can advance integration without valid child evidence.
- Parent state cannot be reconstructed without ephemeral chat context.
- Complexity exceeds one understandable vertical slice.

## Memory Updates

- History ledger: update only after a completed architecture gate or version event
- Retrieval index: add the V11 planning source chain during bootstrap
- Decisions: update after ADR 0003 is accepted
- Known issues: record any durable blocker or waste found while dogfooding
- Patterns: promote only repeated, evidenced orchestration practices
