# V11 Specialist Compiler Feature Spec

## Status

In progress. This package is the active V11 implementation target after the runtime-control-plane design emitted `split`.

## Problem

SWECircuit can validate workflow artifacts and bound one host-selected execution, but it cannot yet turn a decomposed software goal into an optimized roster of exact specialists. An IDE can currently invent broad roles, over-split work, duplicate context and authority, or show the user one roster while launching another.

## Users Or Actors

- A software owner who gives an IDE one goal and wants visible control over decomposition and quality.
- An IDE agent that clarifies the goal and emits stable atomic work units.
- SWECircuit core, which constructs and selects a legal team shape.
- External single-agent and multi-agent hosts that materialize exact blueprints.
- An integration owner who reviews handoffs and the launch binding.

## Goals

- Ship an independent repository capability that constructs optimized, task-shaped specialist agents.
- Make one-agent execution a first-class evaluated baseline.
- Maximize useful parallelism under correctness, authority, evidence, conflict, and coordination constraints.
- Give humans and agents a concise explanation of why the selected team beat alternatives.
- Emit a provider-neutral, digest-bound file package any IDE can follow.

## Non-Goals

- Choose an IDE, API, model, provider, prompt, price, executor, or credential.
- Execute agents, reserve capacity, manage processes, create worktrees, or enforce a sandbox.
- Implement retries, durable pause/resume, distributed scheduling, merge, or automatic memory mutation.
- Infer unresolved product intent or silently invent acceptance criteria.
- Claim a global optimum when bounded search is used.

## Requirements

- R1: Accept one closed JSON `GoalContract` containing stable acceptance criteria, atomic work units, context-source declarations, owner authority ceilings, and optimization costs.
- R2: Validate references, acyclic dependencies, complete evidence ownership, context integrity, exact authority narrowing, limits, privacy, and closed shapes before compilation.
- R3: Derive one public, supply-free `TaskAuthorityProjection` without runtime profile, model, provider, executor, grant, prompt, or credential fields.
- R4: Always evaluate a serial baseline and construct legal team partitions from the same stable work units.
- R5: Use exhaustive canonical partition search for goals within the exact-search limit and a named deterministic bounded search for larger goals.
- R6: Accept optional proposed partitions, validate them under the same rules, and prevent labels or ordering from changing selection.
- R7: Treat correctness, authority, evidence coverage, and requested producer/checker independence as hard eligibility gates.
- R8: Select eligible candidates by deterministic projected makespan, conflicts, handoffs, duplicated context bytes, duplicated permission scopes, agent count, and canonical partition identity in that order.
- R9: Compile one immutable `AgentBlueprint` per selected group with exact objective, work units, Module actions and ports, dependencies, context uses, scopes, capabilities, permissions, evidence duties, handoff, and stop conditions.
- R10: Reject generic role-only input; no `role`, runtime profile, provider, model, prompt, executor, or credential field belongs in a candidate or blueprint.
- R11: Return an `AgentBlueprintCompilation` containing search mode/counts, serial baseline, selected candidate, retained alternatives, ordered evaluation digest, launch waves, blueprints, and content digest.
- R12: Render deterministic provider-neutral specialist files and a manifest that binds the exact compilation digest and per-file digests.
- R13: Preserve every existing root export type-identically and add only separately named specialist exports.
- R14: Keep all operations pure and offline; rendering returns file values and performs no filesystem or network effects.
- R15: Document the IDE kickoff so “use SWECircuit” visibly creates the GoalContract, runs the compiler, presents the selected roster, and launches only the reviewed digest.

## Acceptance Criteria

- [ ] AC1: Given a valid small goal, one public compiler call constructs candidate teams, selects one deterministically, and returns complete task-shaped blueprints.
- [ ] AC2: Given eight or fewer work units, the result declares exact search and evaluates every allowed canonical partition; a repeated or reordered logical input produces byte-identical compiled semantics.
- [ ] AC3: Given a larger goal, the result declares bounded search, evaluates the documented structural candidates plus valid supplied candidates, and makes no global-optimum claim.
- [ ] AC4: Given one-agent-optimal, genuinely parallel, under-split, over-split, conflict-heavy, and independent-review fixtures, the selected roster matches the reviewed golden outcome and exposes the decisive metrics.
- [ ] AC5: Given malformed, duplicate, cyclic, uncovered, authority-exceeding, context-mismatched, secret-bearing, or role-shaped input, compilation fails before returning a launchable roster and emits stable non-leaking diagnostics.
- [ ] AC6: Every selected AgentBlueprint contains exact work ownership, Module ports, bounded context, least authority, evidence, dependencies, handoff, and stop conditions, with no runtime/provider field.
- [ ] AC7: The serial baseline is always visible, and an additional agent wins only through the fixed objective or a required independence gate.
- [ ] AC8: A rendered package contains one manifest, one exact contract per selected agent, and one integration contract; every file and launch entry binds the same compilation digest.
- [ ] AC9: An IDE can follow the repository kickoff from one user message through visible synthesis, compilation, roster approval, external launch, handoff, verification, review, and memory update without installing an external framework.
- [ ] AC10: Typecheck, format, lint, unit, property-style permutation, package-consumer, template, and canonical verification gates pass with current exports preserved.
- [ ] AC11: A real dogfood run uses the compiler to plan V11 work, compares its selected team with the serial baseline, records friction and outcomes, and preserves source evidence.
- [ ] AC12: Independent product/API, algorithm/lifecycle, and security/trace reviewers approve one immutable candidate before the milestone requests merge approval.

## Architecture Impact

This adds a new pure public compiler family, deterministic canonicalization and digesting, a rendered file contract, specialist diagnostics, ADR 0004, and an IDE kickoff update. It deliberately does not widen the six V9 artifact kinds or the V10 executor boundary.

## Risks

- Effort weights and declared conflict scopes can be wrong even when selection is deterministic.
- Exact partition search grows exponentially and must stop at a small fixed limit.
- Bounded search can miss a better partition and must expose that limitation.
- A semantic IDE can still create poor atomic work units; the compiler can validate structure but not prove product judgment.
- Generated instructions can become unsafe if untrusted text is interpolated into Markdown without containment.
- A host can ignore a blueprint unless it explicitly binds launch to the reviewed compilation digest.

## Open Questions

- None blocking the first implementation. Runtime capacity matching and automatic execution remain separately scoped.

## Assumptions

- Atomic work units and their acceptance duties are reviewed before compilation.
- Work-unit effort, startup, and handoff costs are relative integer planning units, not elapsed-time promises.
- Read/write scopes and conflict zones are normalized owner-reviewed keys; core detects exact key intersections rather than attempting arbitrary glob theorem proving.
- External hosts can read JSON or Markdown specialist contracts and can report evidence through existing work-package conventions.
