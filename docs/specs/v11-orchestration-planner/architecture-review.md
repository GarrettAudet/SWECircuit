# V11 Architecture Review Packet

## Status

Revision-4 review packet under redesign. Round 3 returned four `REVISE` verdicts against exact commit `79f2b4e`, after Round 1 and Round 2 also failed. The subsequent specialist preflight returned four high/four medium findings and the coherence preflight returned six high/six medium findings; both routed to `redesign`. The next reviewers must inspect the same later exact committed tree, including `orchestration-contract.md`, and record its commit hash. Implementation remains blocked until every required verdict is `PASS`.

## Product Question

Does revision 4 define one understandable, IDE/API/model/provider-neutral system that turns bounded modules and WorkPackets into optimized task-specific AgentBlueprints, optimizes for high-value bounded safe parallel work, and still produces one independently verified, repository-bound, owner-controlled, fully traceable result?

```txt
GoalContract | PolicyBundle | specialist compiler | AgentBlueprints
             | conflict-safe waves | integration | verification | review
             | accepted-work accumulator | repository witness | owner
             | accepted-work projection | trace | memory candidates | merge-ready evidence
```

## Required Sources

- `docs/specs/v11-orchestration-planner/orchestration-contract.md`
- `docs/modules/specialist-agent-compiler.md`
- `docs/ide/specialist-agent-kickoff.md`
- `docs/specs/v11-orchestration-planner/goal-synthesis.md`
- `docs/specs/v11-orchestration-planner/specialist-compiler-preflight.md`
- `docs/specs/v11-orchestration-planner/architecture-coherence-preflight.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/plan.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-2.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-3.md`
- `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- V9/V10 schemas, public types, execution lifecycle, and ADRs 0001-0002

## Closed Decisions To Verify

1. One `runGoal` command union covers start and exact input-required/waiting continuation variants; every interaction is explicit, start rejection is identified or unidentified, and every pause returns one self-contained restartable continuation.
2. Planning and run clarification answers become causal planner or successor-module inputs and are consumed exactly once.
3. PolicyBundle is OrchestrationPolicy plus the exact Circuit, Module closure, and WorkPacket-template closure; planner output is never policy or authority.
4. The repository-shipped Specialist Compiler has a semantic `synthesizeGoal` layer that compares a serial baseline with legal candidates and a pure profile-free `compileAgentBlueprints` operation shared by `compilePlan`; it emits one complete task-specific AgentBlueprint per intent.
5. Every intent/blueprint closes objective, ports, field digests, context-use rows, scope, supply-free TaskAuthorityProjection, capabilities, dependencies, criteria, evidence, verification, handoff, independence, and stop conditions; core invents no semantic use/reason and generic role labels are insufficient.
6. Replication regions have exact graph/cardinality/route/join derivation and non-region nodes instantiate once.
7. GoalContract owns criterion coverage; EvidenceBindings bind invocation ID/address plus intent digest and are constructed before AgentBlueprints, while core-owned EvidenceSatisfactions preserve qualified V9 requirement identity, ownership, requiredness, and gate-failure routing.
8. Seven separate orchestration roots and closed SourceReference locators leave V9/V10 artifacts and RunEvent unchanged.
9. RunAuthority is an independent root bound through every downstream digest; every declaration only narrows authority.
10. Every value has exact ID, revision, digest projection, uniqueness ownership, comparator, and required/forbidden fields; one registry closes every derived-digest domain/preimage/framing rule; initial and facade operations have truthful total start-rejection variants.
11. Planning input, pre-execution approval, outcome clarification, response-input transfer, queued-seed pruning, owner approval, and cancellation are one-use and replay-safe.
12. Bounded earliest-feasible wave selection is deterministic but does not claim global conflict-packing optimality; maximum cardinality applies exactly to assignment of the selected wave; no-progress and wait behavior remain callback-free until capacity is required.
13. Portable paths and host observations conservatively prevent alias, scope, conflict, and effect overclaims.
14. Claims reserve worst-case reduction, consume V10 run/attempt identity independent of grant digest, install before effects, and bind every ticket to one AgentBlueprint.
15. Core validates one prompt-free AgentMaterializationReceipt before dispatch and captures the exact one-shot V10 return in an opaque process-local capture; no host-reported result substitute can become accepted execution.
16. Child variants distinguish executed, V10-rejected, core-observed zero-call, and unknown effect with exact observations and limits.
17. Complete-batch reduction, cancellation precedence, loser suppression, input discard, and exhaustive terminal child/branch/join closure are total.
18. Route-first outcome handling, declared-exit success, finite route budgets, diagnosis/fix, failed versus blocked, and no-progress ordering are exact.
19. `all`/`any` accepted semantics are width-independent while raw wave, revision, state, and event topology remains truthful.
20. RepositoryStateRequest binds the pre-request state rather than its containing successor; AcceptedWorkAccumulator survives every run continuation; final completion requires one repository-state witness bound to all write effects, final clean contained tree/change digests, and owner approval against that exact witness.
21. Memory proposals become reviewable candidates; after completed state/event closure, a pre-merge bundle produces AcceptedWorkProjection first and MergeReadyEvidence second without a digest cycle, merge, or durable-memory mutation.
22. Parent event/journal content integrity, SourceReference privacy, canonical comparators, detached GrantOffer references, and exact callback/root/receipt/resource limits are byte-reachable and closed without claiming host authenticity.
23. General portability and accepted-work width equivalence are separate complete-source projections with transitive digest replacement.
24. The exact current root exports remain type-identical; separately named orchestration exports and explicit schema paths are additive and compile in an offline packed consumer.
25. The IDE kickoff maps one user message to approved catalog modules, a serial/candidate comparison, and task-shaped specialists; every novel/high-risk owner decision maps to the exact launched field that reflects it before effects.

## Required Invariants

- No planner/profile/manifest/result/input declaration grants authority or changes policy.
- No IDE kickoff silently invents a module, gate, route, authority grant, public behavior, or destructive/security-sensitive capability.
- No callback occurs before compiled Plan, complete AgentBlueprints, accepted matching, installed claim, and bound ticket.
- No generic agent label substitutes for a complete intent/objective/context/scope/evidence/handoff contract.
- No profile, executor, provider, or host identity changes a fixed AgentBlueprint demand digest.
- No worker dispatch starts without a complete bound AgentMaterializationReceipt; the receipt remains an attestation, not proof of provider obedience.
- No conflicting or unresolved writer scope shares a wave.
- No incomplete/substituted/unknown child result advances integration.
- No fresh-process continuation loses finalized accepted-work or materialization semantics needed for terminal evidence.
- No successor state, blueprint/evidence pair, projection, or merge value has a cyclic digest predecessor.
- No host attestation substitutes for core-observed zero dispatch or an opaque capture of the real V10 return.
- No local worker success satisfies verifier/reviewer/owner gates or final repository-state closure.
- No sensitive/free-form body enters canonical roots/events.
- No provider-specific field affects matching or routing.
- No one-agent user needs to call advanced operations to resume.

## Reviewer A: Product And Architecture

Stress repository-shipped one-message synthesis and `goal-synthesis.md`, decision-to-launched-field mapping, serial and candidate rosters, direct `compileAgentBlueprints`, omitted versus explicit concurrency, one blueprint, ten disjoint blueprints, generic versus task-specific specialists, AgentBlueprintIntent/context-use closure, six golden specialization baselines, exact structural metrics, no replication region, min-zero/max lanes, planner-added security gate, planner-authored acceptance, missing integration/memory witnesses, logical versus runtime owner, local success/integrated failure, and whether the PolicyBundle remains simple and singular.

PASS only if dynamic decomposition is genuinely user/host-authored, mechanically bounded, and the simple path is credible.

## Reviewer B: Public API And Compatibility

Stress every root/nested discriminator, TaskAuthorityProjection, AgentBlueprintIntent, AgentBlueprint, AgentMaterializationReceipt, AcceptedWorkAccumulator, and optimization-record type, operation/callback signature, required/forbidden field, direct compiler supply exclusion, identified/unidentified start, derived-digest registry, all construction cycles, detached-offer byte reachability, ID scope, every comparator, event payload, actual current export inventory, explicit schema subpaths, and graph-wide semantic projection.

PASS only if schema/TypeScript/package implementers need not invent a field or ordering rule and V9/V10 consumers remain unchanged.

## Reviewer C: Lifecycle And Concurrency

Stress planner limits 1-8, causal clarification, status-specific continuation restart with AcceptedWorkAccumulator, intent/evidence/blueprint construction, blueprint materialization receipt, no capacity, capacity loss, pre-execution requests, claim reserve and grant replay, V10 rejection/cancel/timeout, zero-call versus unknown effect, post-dispatch overflow, partial/duplicate/reordered and mixed batches, exact/different cancellation replay, queued input, final approval, `any` loser suppression, route exhaustion, deadlock, memory/merge evidence, and terminal immutability.

PASS only if every scenario has one reconstructable next state independent of concurrency width and no hidden distributed guarantee.

## Reviewer D: Security, Privacy, And Trace

Stress hostile planner/intent/blueprint/profile/manifest/materialization receipt, PolicyBundle closure drift, executor/grant/attempt/availability substitution, stale/forged input and cancellation, malicious path aliases, false zero-call/dispatch status, forged/foreign capture, forged output/VCS/journal/repository observations, root-tail/event substitution, payload canaries, claim-reserve and post-dispatch exhaustion, semantic-projection laundering, and host/core guarantee wording.

PASS only if authority and handoffs fail closed, external attestations are honestly labeled, and canonical data excludes sensitive payload classes.

## Handoff Format

```txt
reviewed commit hash
verdict: PASS or REVISE
findings: severity, exact source, violated invariant, impact, smallest correction
residual risks
unchanged-worktree confirmation
```

Any material `REVISE` returns to redesign. Four `PASS` verdicts authorize implementation planning only and never approve merge.
