# V11 Tasks

## Status

T001-T003 complete. T002 outcome was `redesign`: all four independent reviewers returned `REVISE` against exact bootstrap commit `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`. Revision 2 is synchronized and locally verified; T004 commit-bound review is next. Runtime implementation remains blocked.

## Task List

- [x] T001: Bootstrap the V11 source and decision chain.
  Scope: Create the feature package, dated research snapshot, proposed ADR, decomposition record, orchestration record, draft milestone, and memory pointers on the stacked V11 branch.
  Verification: Placeholder, byte-shape, source-reference, whitespace, template, and canonical package gates passed with 275 inherited tests.

- [x] T002: Run independent architecture review Round 1.
  Scope: Four fresh read-only reviewers inspected product/architecture, public API/compatibility, lifecycle/concurrency, and security/trace against one exact commit.
  Verification: Four commit-bound `REVISE` verdicts and all material findings are preserved in `architecture-review-round-1.md`; implementation did not begin.

- [x] T003: Freeze architecture revision 2.
  Scope: Resolve policy-versus-plan authority, child handoff identity, planning state, RunAuthority, assignment timing, claim-before-effect, conflict safety, total lifecycle, join closure, trace ownership, privacy bounds, portability, and the one-agent facade.
  Verification: Spec, ADR, plan, test plan, review packet, decomposition/run records, milestone, research, and memory agree; checker, byte audit, source audit, diff check, and canonical package gate pass.

- [ ] T004: Run independent architecture review Round 2.
  Scope: The same four reviewer roles inspect one clean immutable revision-2 commit with no edits or shared context.
  Verification: Four `PASS` verdicts against the same commit. Any material finding routes back to T003 with outcome `redesign`.

- [ ] T005: Add orchestration contracts and canonical identity.
  Scope: Implement the separate `swecircuit/orchestration/v1alpha1` roots, nested contracts, RFC 8785 plus SHA-256 digests, validators, schemas, limits, diagnostics, and exports.
  Verification: Schema/runtime parity, known digest vectors, hostile snapshots, closed-union negatives, V9/V10 compatibility, and packed consumer pass.

- [ ] T006: Implement PlanningSession and Circuit compilation.
  Scope: Add bounded proposal/clarification/block handling and compile only Circuit-authorized concrete invocations, packets, prerequisites, scopes, and port bindings.
  Verification: Graph authority, round/replay, acceptance coverage, permutation, bounds, and zero-effect rejection fixtures pass.

- [ ] T007: Implement capability matching and wave preparation.
  Scope: Validate allowlisted profiles and availability, compute deterministic maximum-cardinality least-authority assignments, analyze scopes, and commit complete waves before callbacks.
  Verification: Shuffle, capacity, constrained-profile, metadata-neutrality, conflict, stale-state, and claim-before-effect tests pass.

- [ ] T008: Implement child reduction and workflow closure.
  Scope: Validate complete ChildResultEnvelope batches, map every V10 disposition, route Circuit outcomes, close joins, transfer outputs, detect deadlock, cancel safely, and enforce completion.
  Verification: Total state matrix, result-binding negatives, arrival permutations, `all`/`any`, uncertainty quarantine, diagnosis, and completion-predicate tests pass.

- [ ] T009: Implement parent trace, privacy, memory candidates, and `runGoal`.
  Scope: Add OrchestrationEvents, child digest references, bounded journals, source-reference privacy, one-agent defaults, callbacks, and inspection.
  Verification: Complete/interrupted reconstruction, canary exclusion, two-host equivalence, one-agent E2E, and package API tests pass.

- [ ] T010: Dogfood four specialist roles.
  Scope: Use V11 to coordinate a clarification, disjoint parallel work, one failure-to-diagnosis route, fan-in, integrated verification/review, owner approval, and a memory candidate.
  Verification: Parallel and serial controls produce equivalent final evidence; elapsed time and coordination overhead are recorded; no repeated patch loop occurs.

- [ ] T011: Harden, document, and independently review the implementation.
  Scope: Resolve dogfood friction, run security and compatibility matrices, update truthful public docs, freeze the exact implementation candidate, and obtain independent reviews.
  Verification: Local canonical gate, template matrix, packed consumer, cross-platform hosted CI, commit-bound product/API/lifecycle/security `PASS`, and clean source chain pass.

- [ ] T012: Close V11 acceptance.
  Scope: Complete review evidence, milestone, memory, and baseline check; request owner approval without merging automatically.
  Verification: One immutable candidate owns the implementation and evidence; V10 is approved or V11 has been rebased and fully reverified; owner merge decision remains explicit.

## Dependencies

- T001 -> T002 -> T003 -> T004.
- T004 must pass before T005-T009.
- T005 precedes T006-T009.
- T006 and T007 precede T008.
- T008 precedes T009 and T010.
- T010 precedes T011; T011 precedes T012.

## Out Of Scope

- Provider, model, API, IDE, prompt, price, or reasoning selection.
- Distributed coordination, remote queues, cross-process claims, and crash recovery.
- Recursive spawning, overlapping writes, automatic retry, merge, memory mutation, worktree creation, credentials, or sandbox enforcement.
- External orchestration framework installation.
- V11 acceptance or merge from an owner-gated baseline.
