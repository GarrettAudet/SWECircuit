# V11 Goal Synthesis

## Status

Revision-4 candidate preparation. The corrected launch contract is locally verified and ready to freeze for Round-4 architecture review. It is not ready for `runGoal(start)` because the V11 runtime does not exist; four exact-commit `PASS` verdicts must precede implementation.

## Goal And Criteria

Build an IDE-, API-, model-, and provider-neutral coordinator that turns one user goal into approved workflow modules, exact task-specific agent blueprints, high-value bounded safe parallel work, deterministic integration, independent verification/review, repository proof, owner control, trace, and reviewed learning.

Acceptance criteria are AC1-AC17 in `spec.md`. The owner refinement requires a built-in capability that constructs narrow specialists rather than selecting generic role labels.

## Modules And Circuit

Selected owner-approved modules:

```txt
clarify | spec | architecture_review | plan | specialist_agent_compiler
        | implement | verify | review | memory
```

The current architecture circuit routes every material preflight finding to `redesign`, preserves the source finding, integrates corrections under one owner, reruns local gates, freezes one commit, then fans out four independent acceptance reviews.

## Assumptions And Decisions

- The human quick path is one IDE message through the repository-shipped `synthesizeGoal` capability; the deterministic kernel starts at structured `runGoal(start)`.
- Semantic decomposition uses the active IDE's judgment inside approved policy; core validates AgentBlueprintIntent and compiles AgentBlueprint without inventing semantics.
- Optimization is an empirical, reviewable objective rather than an unsupported global-optimum claim.
- Runtime AgentProfile supply cannot change the content of a fixed task-specific blueprint.
- Provider prompts and hidden reasoning remain transient.
- Novel modules, authority, public behavior, destructive effects, and security-sensitive capabilities require an owner decision mapped to the launched structured field that reflects it.

No unresolved owner decision currently blocks architecture editing. V10 approval still blocks V11 merge.

Decision-to-input map:

| Owner decision | Structured reflection |
| --- | --- |
| Built-in hyper-specialist capability, not vague role routing | Spec R5/R18, ADR Compiled Task-Specific Agents, Policy Module selection, and `compileAgentBlueprints` public operation |
| IDE/API/model/provider neutrality | GoalContract product boundary, TaskAuthorityProjection exclusions, and AgentBlueprint forbidden fields |
| Runtime implementation remains gated | RunAuthority/documentation-only scope plus T006A/T006B ordering |

## Authority And Capabilities

- Branch: `codex/v11-orchestration-planner`.
- Current authority: repository documentation and design artifacts only.
- Runtime, schema, package, merge, durable-memory mutation, provider selection, and external framework installation are excluded.
- Read-only specialist preflights may run in parallel; one integration owner performs source edits.

## Work And Agent Intents

| Work packet | Specialist intent | Conflict boundary | Evidence |
| --- | --- | --- | --- |
| Product optimization preflight | Test whether specialists are task-derived and optimization claims are honest | Read-only current V11 source chain | Ranked findings with exact source lines |
| Contract coherence preflight | Find digest cycles, incomplete unions, stale claims, and arithmetic contradictions | Read-only current V11 source chain | Ranked findings with exact source lines |
| Integration | Reconcile accepted findings across contract, ADR, spec, tests, review, milestone, and memory | One owner writes the V11 source chain | Clean diff and source-coherence gates |
| Verification | Recompute declarations, exports, references, templates, and canonical package gates | Commands only after integration | Exact command outcomes |
| Round-4 review | Product, API, lifecycle, and security review of one immutable commit | Four read-only agents, disjoint lenses | Four commit-bound verdicts |

## Optimization Assessment

Baseline: one integration owner performs every read and edit sequentially.

Candidate A, serial baseline: one integration owner performs both preflights, reconciliation, verification, and review preparation sequentially.

Candidate B, selected: run two disjoint read-only preflights concurrently while the integration owner performs non-overlapping source and checker audits. This shortens review latency without creating write conflicts. Product and coherence findings remain separate until owner integration.

Candidate C, rejected over-split: assign multiple writers to the same contract source chain. It adds overlapping edits, reconciliation handoffs, and digest-order risk without independent deliverables.

Unavoidable serial work: contract reconciliation, digest-cycle decisions, final source edits, immutable commit creation, and review fan-in. Adding more writing agents would increase conflict and handoff cost without safe parallel benefit.

Golden benchmark evidence for one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role cases remains required before V11 implementation acceptance.

Exact AgentOptimizationRecord values remain pending because the V11 compiler is not implemented. The launch record therefore makes no fabricated metric or speedup claim; Revision 4 must later compile this same roster and compare measured values.

## Compiler Preview

`compileAgentBlueprints`: not runnable yet. Revision 4 defines the profile-free operation and its conformance fixtures; T008 implements it only after Round 4 returns four PASS verdicts.

## Verification And Integration

- Strict TypeScript declaration probe.
- Exact current/additive export inventory.
- Markdown link and source-reference audit.
- Template checker and checker fixture matrix.
- `npm.cmd run verify` inherited canonical gate.
- Four exact-commit Round-4 reviews after local gates.

## Handoff

`ready`: freeze this exact source chain, commit and push it, then run fresh product, API, lifecycle, and security reviews against the same hash. Any material finding routes back to `redesign`; four `PASS` verdicts unlock the first runtime contract slice.
