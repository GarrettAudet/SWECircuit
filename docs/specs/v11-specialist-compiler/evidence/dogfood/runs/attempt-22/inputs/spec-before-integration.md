# V11 Specialist Compiler Feature Spec

## Status

Reopened during production-hardening dogfood. Revision 21 is retired before integration after algorithm/lifecycle review found that logically equivalent nested object-key order could change rendered package bytes, while release verification exposed an unbounded serial checker harness that did not complete within 900.5 seconds. The canonical reconstruction and bounded four-slot copy-on-write harness now pass focused coverage, 353/353 kernel tests, all source-level gates, and the complete 119-case checker matrix in 213.3 seconds. Fresh revision-22 source bindings, packages, approvals, Audit B, Candidate A review/release, integration replay, and owner approval remain required.

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
- R4: Parse repository locator path segments; reject absolute, empty, `.`, or `..` segments; require the fragment-free locator path to be covered by its declared `readScope`; and expose permission demand through the exact `SpecialistPermissionKind` union only.
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
- R19: Document the IDE kickoff so "use SWECircuit" visibly creates and reviews the GoalContract, compiles and explains the roster, renders and verifies the package, binds approval to both trusted digests, validates any prelaunch semantic audit through the closed `PrelaunchAuditHandoff`, and only then hands contracts to an external runtime.
- R20: Reject malformed Unicode, C0/C1 controls, DEL, and Unicode bidirectional formatting controls before contract text, property keys, diagnostics, paths, compilations, handoffs, or rendered files become launchable evidence.
- R21: Reject high-confidence secrets in semantic handoff metadata, Markdown evidence, and user-controlled evidence paths; reject every C0 control in metadata; permit only normalized LF line endings in Markdown evidence; and reject non-scalar path text before filesystem access.
- R22: Canonically reconstruct every closed nested record before compilation identity or rendering so logically equivalent property insertion order produces identical ordinary JSON bytes, rendered files, manifest bytes, and package digest.
- R23: Keep the complete template-checker regression matrix reproducible and bounded by excluding checker-irrelevant generated evidence, reusing a fixed fixture pool, restoring changed paths between cases, and preserving every case's exact expected result.

## Acceptance Criteria

- [x] AC1: Given a valid small goal, one public compiler call constructs candidate teams, selects one deterministically, and returns complete task-shaped blueprints.
- [x] AC2: Assumptions and unresolved decisions are normalized into the goal and compilation digests; any blocking unresolved decision fails before candidate construction, while a non-blocking one remains visible with its owner and proceed rationale.
- [x] AC3: Repository locators reject traversal and any fragment-free path outside the declared `readScope`, while TypeScript/schema consumers accept only the five `SpecialistPermissionKind` values.
- [x] AC4: Given eight or fewer work units, the result emits `exhaustive_partition_search_fixed_scheduler`, evaluates every allowed canonical partition, and keeps ordinary compilation serialization, every rendered file, and the package digest byte-identical under logical array and object-key reordering.
- [x] AC5: Given a larger goal, the result emits `bounded_evaluated_set_no_global_optimum`, evaluates the documented structural candidates plus valid supplied candidates, and makes no global-optimum claim.
- [x] AC6: The one-agent-optimal, genuinely-parallel, under-split, over-split, conflict-heavy, and generic-role fixtures match their reviewed golden rosters; a serial winner reports `kind: serial_selected` with `decisiveField: serial_baseline`, while a non-serial winner reports the first decisive selected-versus-serial difference.
- [x] AC7: Given malformed, duplicate, cyclic, uncovered, authority-exceeding, context-mismatched, secret-bearing, traversal-bearing, bidi-bearing, blocking-decision, or role-shaped input, compilation fails before returning a launchable roster and emits stable non-leaking diagnostics.
- [x] AC8: Every selected AgentBlueprint contains exact work ownership, Module ports, bounded context, least authority, evidence, dependencies, handoff, and stop conditions, with no runtime/provider field.
- [x] AC9: A rendered package includes the exact `compilation.json`, manifest, integration contract, and agent contracts; coordinated payload or manifest tampering fails `verifySpecialistPackage` when checked against trusted expected compilation and package digests.
- [x] AC10: An IDE can follow the kickoff from one user message through visible clarification, compilation, roster explanation, rendering, two-digest approval, semantic `PrelaunchAuditHandoff` verification when required, external launch, handoff, verification, review, and memory update without an external framework.
- [ ] AC11: Typecheck, format, lint, unit, permutation, schema, package-consumer, template, and canonical verification gates pass with current exports preserved.
- [ ] AC12: A real dogfood run uses the compiler to plan V11 work, compares its selected team with the serial baseline, records friction and outcomes, and preserves source evidence.
- [ ] AC13: Independent product/API, algorithm/lifecycle, and security/trace reviewers approve one immutable, digest-bound candidate before the milestone requests merge approval.

## Acceptance Evidence

Revision 6 remains historical evidence for the earlier implementation, not acceptance of the current tree. Revisions 17-21 are preserved under `evidence/dogfood/runs/`. Revision 21 passed Audit B, preparation, product/API, and security/trace review, then ended with algorithm/lifecycle `REVISE` and release `FIX` before integration; every earlier Candidate A and Audit B pair is retired.

- AC1-AC10 current pre-candidate evidence: revision 21 demonstrated the complete two-package launch gate, approval-bound fan-out, and fail-closed independent review against Candidate A `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266` / `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`. Its findings produced explicit package-byte invariance coverage and a complete 119/119 checker matrix in 213.3 seconds; revision 22 must bind those corrected bytes.
- AC11 remains open until the exact revision-22 release specialist completes authority-contained canonical verification and the full negative checker matrix against immutable source bindings.
- AC12 remains open until revision 22 completes both approvals, the package-verification receipt, Audit B, Candidate A specialist execution, integration, post-integration reconstruction, and preserved raw handoffs.
- AC13 remains open until all independent revision-22 review lanes return `PASS` against one exact digest pair.

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
