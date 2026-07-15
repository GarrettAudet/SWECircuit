# V11 Decomposition Plan

## Status

Round 1 decomposition completed with outcome `redesign`. Revision-2 integration is active. Implementation fan-out remains blocked until four fresh reviewers return `PASS` against one exact revision-2 commit.

## Goal

Define the smallest portable system that takes a human software goal through user-selected modules, bounded concrete work, capability-based specialist assignment, safe parallel execution, integrated quality gates, owner approval, source-preserving trace, and memory candidates. Make one-agent IDE use the default form of the same system.

## Source Artifacts

- Feature package: `docs/specs/v11-orchestration-planner/`
- Proposed decision: `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- Round 1 evidence: `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- Research: `docs/research/snapshots/2026-07-15-v11-portable-orchestration-scan.md`
- Baseline decisions: ADR 0001 and ADR 0002
- Memory: `docs/memory/active-context.md` and `docs/memory/retrieval-index.md`

## Branch And State

- Branch: `codex/v11-orchestration-planner`
- Stacked baseline: V10 closeout `8ac3372`, technically accepted but owner-gated
- Round 1 candidate: `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`
- Round 1 result: four `REVISE` verdicts; no implementation
- Current edit boundary: planning, research, ADR, milestone, and memory documents only
- Merge gate: V10 approval or rebase, V11 implementation acceptance, and explicit owner approval

## Module Selection

| Workflow need | Module role | Contract output |
| --- | --- | --- |
| Product ambiguity | Clarify | Bound input request or recorded assumption |
| Product contract | Spec | Goal, scope, acceptance criteria, non-goals |
| System policy | Architecture review | Accepted Circuit/Module/trust/lifecycle decision |
| Work decomposition | Plan | Concrete WorkPackets derived from Circuit-authorized slots |
| Specialist choice | Capability match | Explainable profile assignment bound to availability |
| Parallel progress | Prepare wave | Claimed conflict-safe tickets |
| Bounded effect | V10 execute | Bound child summary, journal, outputs, commits, and evidence |
| Failure handling | Diagnose/fix | Confirmed causal route and regression evidence |
| Convergence | Fan-in/integrate | Port-bound integrated candidate |
| Quality | Verify/review | Acceptance evidence and independent findings |
| Authority | Owner gate | Recorded merge-ready approval or block |
| Learning | Memory candidate | Source-linked proposed durable learning |

## Dependency Graph

```txt
research + baseline contracts
  -> bootstrap candidate f559b4a
     -> product review A ----\
     -> API review B ---------+-> Round 1 synthesis -> redesign
     -> lifecycle review C ---+
     -> security review D ----/
  -> revision-2 candidate
     -> fresh A/B/C/D reviews
  -> four PASS verdicts
  -> contracts -> planner/compiler -> matcher/waves -> reducer/trace
  -> one-agent E2E -> four-role dogfood -> final review -> owner gate
```

## Round 1 Work Units

| Unit | Reviewer | Scope | Verdict | Key result |
| --- | --- | --- | --- | --- |
| A | `019f6538-cf2a-7101-a2be-1fd4441ab674` | Product and architecture | REVISE | Circuit/Plan authority conflict and missing portable handoff were high blockers |
| B | `019f6538-e38e-7aa3-9711-4ebdc10a53ee` | Public API and compatibility | REVISE | Contract family, identity, result unions, matching, events, and bounds were open |
| C | `019f6538-f7b1-74b0-a7ee-06c07c7f6ef9` | Lifecycle and concurrency | REVISE | Child mapping, claims, waves, cancellation, joins, and completion were not total |
| D | `019f6539-0d40-7230-b2b9-f5926abc92ee` | Security and trace | REVISE | Independent authority, profile provenance, result binding, privacy, and parent evidence were incomplete |

Every reviewer used a fresh read-only context, verified exact commit `f559b4a`, made no edits, and returned findings to the main integration owner.

## Revision-2 Work Units

### A: Product And Architecture Review

Objective: prove the same understandable system serves one agent and many while Circuit remains the only workflow-policy authority.

Context: revised spec, ADR, plan, test plan, Round 1 record, current Module/Circuit/WorkPacket contracts.

Evidence: exact-commit `PASS` or cited smallest correction. Stop on ambiguous ownership, generic API routing, or an unusable simple path.

### B: Public API And Compatibility Review

Objective: prove contract families, identities, digests, unions, operations, bounds, compatibility, and invalid states are implementable without invention.

Context: revised source chain plus V9/V10 schemas, public exports, OperationResult, packed consumer, and lifecycle contracts.

Evidence: exact-commit `PASS` or cited contract gap. Stop on contradictory result shapes, identity gaps, or silent breaking change.

### C: Lifecycle And Concurrency Review

Objective: prove planning, claim-before-effect, complete waves, result batches, input, cancellation, joins, deadlock, uncertainty, and completion form a total deterministic state machine.

Context: revised source chain, V10 lifecycle matrix, existing Circuit joins and outcomes.

Evidence: adversarial scenario matrix and verdict. Stop at the first state that cannot be reconstructed or reduced uniquely.

### D: Security, Privacy, And Trace Review

Objective: prove declarations never self-authorize, end-to-end handoffs reject substitution, host/core guarantees are honest, and sensitive payload classes remain outside canonical trace.

Context: revised source chain, ADR 0002, snapshot and grant rules, V10 evidence semantics.

Evidence: threat matrix and verdict. Stop on authority escalation, ambiguous effect, forged provenance, or sensitive canonical payload.

### E: Integration Owner

Objective: preserve all handoffs, resolve findings in the source chain, validate the exact tree, and decide `pass` or `redesign`.

Authority: may edit planning artifacts, validate, commit, and push; may not begin implementation before four PASS verdicts and may not merge.

## Fan-Out Rules

- A-D start from the same clean immutable commit.
- Each receives only its bounded source bundle and the common product goal.
- Reviewers do not edit, install, use network, run mutating commands, commit, or push.
- Findings include severity, exact source, violated invariant, and smallest correction.
- The integration owner is not an independent reviewer.

## Fan-In Rules

- Integrate high-severity ownership and safety findings first.
- Preserve stricter authority, evidence, and uncertainty behavior when findings conflict.
- Do not average incompatible reviewer opinions; route unresolved product intent to the owner.
- Any material `REVISE` blocks implementation and creates another committed candidate.
- Four `PASS` verdicts authorize implementation only, not acceptance or merge.

## Implementation Decomposition After Acceptance

1. Contracts and canonical identity.
2. PlanningSession and Circuit-derived compilation.
3. Capability matching and safe wave preparation.
4. Child-result reduction, routes, joins, and completion.
5. Parent trace, privacy, memory candidates, and `runGoal`.
6. One-agent E2E before multi-agent dogfood.
7. Four-role dogfood, hardening, final review, milestone, memory, and owner gate.

Write units may run in parallel only when tasks name disjoint likely files, dependencies, context, verification, handoff, and stop conditions. The main agent remains integration owner.

## Verification Matrix

| Stage | Local proof | Integrated proof |
| --- | --- | --- |
| Revision 2 | Placeholder, bytes, references, diff, checker, canonical gate | Four exact-commit independent verdicts |
| Contracts | Schema/runtime parity, digest vectors, negatives | Packed consumer and inherited compatibility |
| Compiler | Proposal and graph fixtures | One-agent plan reconstruction |
| Matcher/waves | Property and conflict matrices | Claim-before-effect host loop |
| Reducer/trace | Total lifecycle and privacy matrices | Complete/interrupted E2E |
| Dogfood | Worker-local evidence | Integrated acceptance, timing, review, owner gate, memory candidate |

## Stop Or Redesign Triggers

- Core depends on IDE, API, model, provider, prompt, price, or hidden quality metadata.
- Planner or profile data can grant authority or alter Circuit policy.
- A claim is not installed before effect or a child result is not fully bound.
- Conflicting or unknown writes can share a wave.
- An unknown effect can retry or reach integration.
- A join, input, cancel, deadlock, or completion case has more than one legal next state.
- Trace reconstruction requires ephemeral chat.
- The one-agent path requires understanding the advanced reducer.

## Memory Updates

- Active context: record current candidate, gate, and next action.
- Retrieval index: link Round 1 evidence and revision-2 source chain.
- Decisions and practice register: update after ADR acceptance.
- History ledger and milestone: update after a completed architecture or version event.
- Known issues and failed attempts: record durable dogfood friction, not every transient draft correction.
