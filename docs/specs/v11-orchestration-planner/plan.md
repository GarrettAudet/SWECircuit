# V11 Implementation Plan

## Status

Draft. T001 architecture bootstrap is complete and validated. T002 independent review requires an immutable candidate; no kernel implementation begins before ADR 0003 passes.

## Summary

Build the first provider-neutral orchestration control plane above V10. A host-injected planner proposes bounded work; SWECircuit validates and compiles the proposal, matches structured agent capabilities, computes deterministic ready waves, accepts V10 execution results through a pure state transition, enforces joins and integration gates, and emits a parent trace. The host remains responsible for every external effect.

## Impacted Areas

- `docs/research/`, ADRs, feature records, memory, and public architecture documentation.
- Canonical schemas or closed runtime contracts for agent profiles, planning proposals, and orchestration state.
- `src/model.ts`, new planning/scheduling modules, diagnostics, public exports, and trace semantics.
- Schema, semantic, lifecycle, privacy, package-consumer, and dogfood fixtures.
- V11 host-loop example and measured dogfood evidence.
- README status and module registry only after implementation truth exists.

## Approach

1. Freeze the product boundary through the dated research snapshot, ADR 0003, and independent architecture/security review.
2. Define one bounded planner port. Treat its output as untrusted proposal data and snapshot it before validation.
3. Define machine-readable agent capabilities separately from executor identity, provider metadata, and runtime authority.
4. Compile proposals into existing Module, Circuit, and WorkPacket concepts where possible. Add a new artifact kind only if identity, portability, or traceability cannot be expressed truthfully with the existing contract.
5. Implement deterministic capability matching and explanation codes using exact required capability sets, capacity, authority compatibility, and a stable tie-breaker.
6. Implement orchestration as a pure reducer: start, clarify/resume, claim, apply child result, route outcome, join, quarantine, and complete.
7. Keep side effects in a host loop. The host asks for ready assignments, executes each through V10, and returns the frozen summary; the orchestration reducer never loads a provider or launches a process.
8. Add a parent journal that preserves plan and assignment provenance while referencing, not rewriting, immutable child execution evidence.
9. Dogfood with one four-specialist circuit, an equivalent serial control, a clarification path, a failed worker, diagnosis routing, and integrated verification/review.
10. Freeze a complete candidate, run canonical and cross-platform gates, obtain independent correctness/security/API reviews, publish the milestone, and wait for owner merge approval.

## Interfaces And Data

The architecture review will refine names, but the intended surface is:

```txt
planGoal(goal, circuit, modules, profiles, planner, policy) -> async OperationResult[PlanningSummary]
startOrchestration(plan, expectedPlanRevision) -> OperationResult[OrchestrationState]
getReadyAssignments(state, profiles, availability, policy) -> OperationResult[ReadyWave]
claimAssignment(state, assignment, expectedRevision) -> OperationResult[ClaimTransition]
applyExecutionResults(state, results, expectedRevision) -> OperationResult[OrchestrationTransition]
resumeOrchestration(state, response, expectedRevision) -> OperationResult[OrchestrationTransition]
```

The planner receives goal, selected circuit/modules, source context, available capabilities, and policy. It returns only a proposal, clarification request, or block result. The compiler owns normalized packets, assignments, schedule state, explanation codes, and parent trace records.

The architecture gate must decide:

- Canonical artifact versus closed runtime status for agent profiles and orchestration plans.
- Parent/child run identity and event-version strategy.
- Plan revision and resume-token semantics.
- Isolation assertion and evidence model.
- Stable matching tie-breaker and capacity model.
- Compatibility path for existing v1alpha1 projects.

## Architecture And ADR Impact

ADR 0003 is required because V11 changes system ownership, trust boundaries, runtime state, public APIs, trace composition, and possibly canonical artifact kinds. ADR 0002 remains authoritative for one-packet execution; V11 must compose it rather than bypass or duplicate its preflight.

## Security And Privacy

- Planner and host values are untrusted, bounded, detached, accessor-free inputs.
- Agent capability and isolation declarations are metadata, not authority or enforcement proof.
- Runtime grants remain invocation-scoped V10 inputs.
- No prompt, transcript, chain of thought, environment dump, raw exception, command output, credential, or secret value enters canonical planning or trace artifacts.
- Clarification and approval responses bind to one exact plan revision and actor.
- `abort_unconfirmed` work blocks dependent integration until the host resolves or quarantines it.
- No network, process, provider, or workspace operation exists in the core planner or reducer.

## Rollback Or Recovery

The V11 branch is stacked on V10 and is not merge-authorized. If architecture review rejects the design, keep the research snapshot and findings, archive the proposal, and reset the V11 implementation scope through a new commit without changing V10. If V10 is not adopted, rebase V11 onto the approved replacement and rerun every baseline-bound check. Runtime state must be immutable so a caller can retain the last accepted transition after a rejected input.

## Risks And Mitigations

- Risk: V11 becomes an untyped prompt router.
- Mitigation: Planner output is a closed proposal; deterministic compiler and reducer own authoritative policy.

- Risk: Provider-neutrality becomes a slogan while core ranks model names.
- Mitigation: Core matching sees only structured capabilities, capacity, isolation class, and authority compatibility.

- Risk: Parallel execution corrupts shared work.
- Mitigation: Conflict analysis, isolation preconditions, deterministic serialization, and integrated verification are acceptance requirements.

- Risk: Parent trace rewrites child evidence.
- Mitigation: Preserve child identity and digest; reference rather than relabel source evidence.

- Risk: Scope expands into a distributed workflow platform.
- Mitigation: Keep persistence, remote transport, worktree creation, provider calls, merge, and memory mutation outside V11 core.
