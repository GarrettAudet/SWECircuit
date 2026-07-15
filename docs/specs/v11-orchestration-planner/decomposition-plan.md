# V11 Decomposition Plan

## Status

Round 2 fan-out completed with outcome `redesign`. Revision-3 integration emitted `pass` to the independent-review gate after local validation. Implementation fan-out remains blocked until four fresh reviewers return `PASS` against one exact commit.

## Goal

Define one simple but rigorous software-work coordinator that takes a human goal through host-authored workflow policy, bounded decomposition, capability assignment, safe parallel execution, integration, verification, review, owner approval, trace, and learning. One agent is the default because requested concurrency defaults to one; more profiles only add eligible capacity, and parallel waves require an explicit bounded concurrency above one.

## Source Artifacts

- Feature package: `docs/specs/v11-orchestration-planner/`
- Normative contract: `docs/specs/v11-orchestration-planner/orchestration-contract.md`
- Architecture: `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- Review evidence: `architecture-review-round-1.md` and `architecture-review-round-2.md`
- Research: `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- Memory: `docs/memory/active-context.md` and `docs/memory/retrieval-index.md`

## Branch And State

- Branch: `codex/v11-orchestration-planner`
- Stacked baseline: V10 closeout `8ac3372`, technically accepted and owner-gated
- Round 1 candidate/result: `f559b4a`, four REVISE
- Round 2 candidate/result: `5d82394`, four REVISE
- Current edit boundary: architecture, feature, research, milestone, and memory documents only
- Merge gate: approved baseline, V11 implementation acceptance, explicit owner approval

## Module Selection

| Need | Workflow module/output |
| --- | --- |
| Ambiguity | Clarify -> bound request/response |
| Product truth | GoalContract/spec -> criterion IDs |
| Workflow authority | Architecture -> PolicyBundle |
| Decomposition | Plan -> lanes, narrowed WorkPackets, compiler-derived coverage/integration |
| Assignment | Match -> profile/capacity Assignment |
| Parallel safety | Prepare wave -> reserved claims, consumed attempts, installed state/tickets |
| Effects | V10 -> bound child variant |
| Failure | Diagnose/fix -> finite routed recovery |
| Convergence | Join/integrate -> port-bound candidate |
| Quality | Verify/review -> independent criterion evidence |
| Authority | Owner gate -> exact approval or block |
| Learning | Memory -> proposals -> source-linked candidates -> merge-ready evidence |

## Review History

| Round | Commit | Product | API | Lifecycle | Security | Outcome |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `f559b4a` | REVISE | REVISE | REVISE | REVISE | redesign |
| 2 | `5d82394` | REVISE | REVISE | REVISE | REVISE | redesign |

Round 2 produced 17 high and 8 medium raw findings. Convergence required exact PolicyBundle/template closure, host-owned criterion coverage, logical owner split, property-level operations, content-bound transition/journal chains, total comparators, four result variants, dispatch observations, claim reserves, total lifecycle, integration/memory witnesses, privacy classes, byte limits, and an accurate additive export inventory.

## Dependency Graph

```txt
Round 1 findings -> revision 2 -> Round 2 findings
  -> revision-3 normative contract + aligned source chain
     -> product review A ----\
     -> API review B ---------+-> one exact verdict fan-in
     -> lifecycle review C ---+
     -> security review D ----/
  -> four PASS -> contract implementation slices
  -> one-agent E2E -> four-role dogfood -> final acceptance
```

## Round-3 Work Units

### A: Product And Architecture

Objective: prove PolicyBundle-owned replication is understandable, host-authored acceptance/integration is traceable, and the same facade genuinely scales from explicit concurrency one to many.

Context: spec, ADR, normative contract, both prior review records, Circuit/Module/WorkPacket schemas.

Stop: planner-owned policy, unusable continuation, ambiguous lane derivation, or worker-local acceptance.

### B: Public API And Compatibility

Objective: prove every field, union, digest, identity, algorithm, event, export, and invalid state is implementable without invention or V9/V10 breakage.

Context: normative contract, tests, schemas, TypeScript exports, execution result, package metadata.

Stop: circular identity, contradictory union, nondeterministic order, or inaccessible package contract.

### C: Lifecycle And Concurrency

Objective: prove planning limits, claims/reserves, capacity, dispatch truth, mixed results, cancellation/input queues, joins, cycles, memory production, resource closure, and terminals have one next state.

Context: contract transitions, V10 lifecycle, Circuit routes/joins, test matrices.

Stop: width-dependent result, active-work loss, ambiguous effect, replay, or nonterminal no-progress.

### D: Security, Privacy, And Trace

Objective: prove authority/handoff bindings, paths, observations, payload classes, events, and bytes fail closed while host guarantees remain honest.

Context: RunAuthority chain, V10 ADR/execution, snapshot/privacy/trace code, normative contract.

Stop: self-authorizing declaration, forged evidence advance, sensitive canonical body, or unbounded allocation/effect.

### E: Integration Owner

Objective: preserve handoffs, resolve findings, validate exact tree, and route pass/redesign. May edit planning artifacts, commit, and push; may not implement or merge before the gate.

## Fan-Out Rules

- A-D use the same clean immutable commit and fresh read-only contexts.
- No reviewer edits, tests, installs, network, staging, branch changes, commits, or pushes.
- Handoffs include exact commit, severity/source/invariant/impact/smallest correction, residual risk, and unchanged status.
- The main agent is integration owner and not an independent reviewer.

## Fan-In Rules

- Any material REVISE returns to redesign.
- Integrate authority and safety findings before convenience/performance.
- Do not average conflicting semantics; choose one closed rule or ask the owner for product intent.
- Four PASS verdicts authorize implementation only.

## Implementation Decomposition After PASS

1. Contract family, canonical identity, comparators, and content-bound transition/journal integrity.
2. PolicyBundle closure, planning, host-owned coverage, and compilation.
3. Profiles, matching, paths, attempt replay, reserves, and waves.
4. Dispatch/result reducer, routes, joins, queued input, and terminals.
5. Events, memory/merge evidence, privacy, facade, and portability.
6. One-agent E2E, then four-role dogfood and acceptance.

## Verification Matrix

| Stage | Local evidence | Integrated evidence |
| --- | --- | --- |
| Revision 3 | Placeholder, bytes, refs, diff, checker, canonical gate | Four exact-commit PASS verdicts |
| Contracts | Schema/runtime/digest/negative corpus | Old/new packed consumer |
| Compiler | Replication/coverage/planning matrices | Explainable one-agent Plan |
| Scheduler | Matching/path/wave truth | Claim-before-effect host loop |
| Reducer | Result/lifecycle/join/input matrices | Complete/interrupted E2E |
| Dogfood | Worker evidence | Integrated criteria, trace, timing, owner gate |

## Stop Or Redesign Triggers

- Core depends on IDE/API/model/provider metadata.
- Planner can alter PolicyBundle or authority.
- Criterion coverage or logical/runtime ownership is implicit.
- A digest/identity chain has a substitution gap or cycle.
- A conflict, result, cancellation, join, input, budget, or terminal scenario has multiple legal outcomes.
- Canonical data captures sensitive bodies or retained bytes are unbounded.
- One-agent continuation requires advanced reducer use.

## Memory Updates

Active context and retrieval index update during revision 3. Decisions, practice register, patterns, and history update only after a completed accepted architecture event.
