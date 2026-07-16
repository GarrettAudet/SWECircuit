# V11 Specialist Compiler Feature Spec

## Status

Technical acceptance and post-integration reconstruction passed for the revision-6 digest-bound candidate. AC1-AC13 and T009-T011 are closed by the source-linked dogfood, canonical verification, independent review, and pushed candidate `191d9339da383a2133377dcca564d7202b7ad66d`. V11 remains unmerged pending the explicit owner decision.

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

- R1: Accept one closed JSON `GoalContract` containing stable acceptance criteria, digest-bound assumptions and unresolved decisions, atomic work units, context-source declarations, owner authority ceilings, and optimization costs.
- R2: Reject a GoalContract with any `unresolvedDecision.blocking: true`; a non-blocking decision requires a stable ID, question, owner, and explicit proceed rationale.
- R3: Validate references, acyclic dependencies, complete evidence ownership, context bindings, exact authority narrowing, limits, privacy, and closed shapes before compilation.
- R4: Parse repository locator path segments and reject absolute, empty, `.`, or `..` segments; expose permission demand through the exact `SpecialistPermissionKind` union only.
- R5: Derive one public, supply-free `TaskAuthorityProjection` without runtime profile, model, provider, executor, grant, prompt, or credential fields.
- R6: Always evaluate a serial baseline and construct legal team partitions from the same stable work units.
- R7: Use exhaustive canonical partition search for goals within the exact-search limit and emit `search.claim: exhaustive_partition_search_fixed_scheduler`; emit `bounded_evaluated_set_no_global_optimum` for the named deterministic bounded search used above that limit.
- R8: Accept optional proposed partitions, validate them under the same rules, and prevent labels or ordering from changing selection.
- R9: Treat correctness, authority, evidence coverage, and requested producer/checker independence as hard eligibility gates.
- R10: Select eligible candidates by deterministic projected makespan, conflicts, handoffs, duplicated context bytes, duplicated permission scopes, agent count, and canonical partition identity in that order.
- R11: Return a machine-readable `selectionReason` with outcome kind, decisive field, selected value, serial value, and serial rejection codes.
- R12: Compile one immutable `AgentBlueprint` per selected group with exact objective, work units, Module actions and ports, dependencies, context uses, scopes, capabilities, permissions, evidence duties, handoff, and stop conditions.
- R13: Reject generic role-only input; no `role`, runtime profile, provider, model, prompt, executor, or credential field belongs in a candidate or blueprint.
- R14: Return an `AgentBlueprintCompilation` containing the normalized goal, search mode and claim, serial baseline, selected candidate, selection reason, every supplied proposal evaluation, retained alternatives, ordered evaluation digest, launch waves, blueprints, and compilation digest.
- R15: Render deterministic provider-neutral specialist files containing `compilation.json`, `manifest.json`, `integration.md`, and one contract per selected agent. Bind every payload plus the compilation file, and return a root `packageDigest`.
- R16: Expose `verifySpecialistPackage` so a host can reproduce the package and require trusted expected `compilationDigest` and `packageDigest` values before launch.
- R17: Preserve every existing root export type-identically and add only separately named specialist exports.
- R18: Keep compilation, rendering, and verification offline and free of caller-directed effects: they return values; never read caller locators or materialized packages; and perform no caller writes, network, process, launch, merge, or memory effects. Schema validation may lazily read only immutable schema resources shipped inside the SWECircuit package.
- R19: Document the IDE kickoff so "use SWECircuit" visibly creates and reviews the GoalContract, compiles and explains the roster, renders and verifies the package, binds approval to both trusted digests, and only then hands contracts to an external runtime.

## Acceptance Criteria

- [x] AC1: Given a valid small goal, one public compiler call constructs candidate teams, selects one deterministically, and returns complete task-shaped blueprints.
- [x] AC2: Assumptions and unresolved decisions are normalized into the goal and compilation digests; any blocking unresolved decision fails before candidate construction, while a non-blocking one remains visible with its owner and proceed rationale.
- [x] AC3: Repository locators reject leading and nested parent traversal through parsed segment validation, and TypeScript/schema consumers accept only the five `SpecialistPermissionKind` values.
- [x] AC4: Given eight or fewer work units, the result emits `exhaustive_partition_search_fixed_scheduler`, evaluates every allowed canonical partition, and remains byte-identical under logical input reordering.
- [x] AC5: Given a larger goal, the result emits `bounded_evaluated_set_no_global_optimum`, evaluates the documented structural candidates plus valid supplied candidates, and makes no global-optimum claim.
- [x] AC6: The one-agent-optimal, genuinely-parallel, under-split, over-split, conflict-heavy, and generic-role fixtures match their reviewed golden rosters; a serial winner reports `kind: serial_selected` with `decisiveField: serial_baseline`, while a non-serial winner reports the first decisive selected-versus-serial difference.
- [x] AC7: Given malformed, duplicate, cyclic, uncovered, authority-exceeding, context-mismatched, secret-bearing, traversal-bearing, blocking-decision, or role-shaped input, compilation fails before returning a launchable roster and emits stable non-leaking diagnostics.
- [x] AC8: Every selected AgentBlueprint contains exact work ownership, Module ports, bounded context, least authority, evidence, dependencies, handoff, and stop conditions, with no runtime/provider field.
- [x] AC9: A rendered package includes the exact `compilation.json`, manifest, integration contract, and agent contracts; coordinated payload or manifest tampering fails `verifySpecialistPackage` when checked against trusted expected compilation and package digests.
- [x] AC10: An IDE can follow the kickoff from one user message through visible clarification, compilation, roster explanation, rendering, two-digest approval, package verification, external launch, handoff, verification, review, and memory update without an external framework.
- [x] AC11: Typecheck, format, lint, unit, permutation, schema, package-consumer, template, and canonical verification gates pass with current exports preserved.
- [x] AC12: A real dogfood run uses the compiler to plan V11 work, compares its selected team with the serial baseline, records friction and outcomes, and preserves source evidence.
- [x] AC13: Independent product/API, algorithm/lifecycle, and security/trace reviewers approve one immutable, digest-bound candidate before the milestone requests merge approval.

## Acceptance Evidence

The accepted review identity is compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` plus package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.

- AC1-AC10: [product/API PASS](evidence/dogfood/handoffs/product-api-review-pass-attempt-6.md), [algorithm/lifecycle PASS](evidence/dogfood/handoffs/algorithm-lifecycle-review-pass-attempt-6.md), and [security/trace PASS](evidence/dogfood/handoffs/security-trace-review-pass-attempt-6.md).
- AC11: [release-gate PASS](evidence/dogfood/handoffs/verify-release-pass-attempt-6.md), including focused schema 7/7, compiler/golden 35/35, host containment 6/6, canonical verification 323/323, installed consumer, template checker, and the complete negative matrix.
- AC12: [revision-6 dogfood report](evidence/dogfood/report.json), [approval record](evidence/dogfood/approval.json), and the preserved [attempt handoffs](evidence/dogfood/handoffs/). Exact search evaluated 203 candidates and selected six agents at projected makespan 23; the serial baseline projected 40 and was ineligible for evidence independence. These are planning units, not elapsed-time results.
- AC13: [candidate source ledger](evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json) plus the three independent PASS handoffs above bind every verdict to the same digest pair and to the immutable pre-integration spec.

Any release document that integration may mutate is an output, not a live review input. Review and integration contracts must bind its immutable pre-integration snapshot; after integration, the integration owner must reconstruct and verify the exact approved compilation/package pair before branch freeze. A mismatch reopens acceptance and requires a new revision rather than rebinding evidence to changed live bytes.

## Architecture Impact

This adds a new deterministic public compiler family, canonicalization and digesting, a rendered file contract, specialist diagnostics, ADR 0004, and an IDE kickoff update. It deliberately does not widen the six V9 artifact kinds or the V10 executor boundary.

## Risks

- Effort weights and declared conflict scopes can be wrong even when selection is deterministic.
- Exact partition search grows exponentially and must stop at a small fixed limit.
- Bounded search can miss a better partition and must expose that limitation.
- A semantic IDE can still create poor atomic work units; the compiler can validate structure but not prove product judgment.
- Generated instructions can become unsafe if untrusted text is interpolated into Markdown without containment.
- A host can ignore a blueprint or accept coordinated package tampering unless approval and verification bind both the compilation digest and a trusted package digest.

## Open Questions

- None blocking the first implementation. Runtime capacity matching and automatic execution remain separately scoped.

## Assumptions

- Atomic work units and their acceptance duties are reviewed before compilation.
- Work-unit effort, startup, and handoff costs are relative integer planning units, not elapsed-time promises.
- Read/write scopes and conflict zones are normalized owner-reviewed keys; core detects exact key intersections rather than attempting arbitrary glob theorem proving.
- External hosts can read JSON or Markdown specialist contracts and can report evidence through existing work-package conventions.
