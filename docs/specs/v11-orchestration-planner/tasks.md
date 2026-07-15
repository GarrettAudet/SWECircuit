# V11 Tasks

## Status

T001-T006 complete. Round 3 returned four `REVISE` verdicts against exact commit `79f2b4e`; T006A revision-4 integration is active. Runtime implementation remains blocked.

## Task List

- [x] T001: Bootstrap the V11 source and decision chain.
  Scope: Create the feature package, research snapshot, ADR, decomposition/run records, draft milestone, and memory pointers.
  Verification: Source and canonical gates passed with 275 inherited tests.

- [x] T002: Run architecture review Round 1.
  Scope: Four independent product/API/lifecycle/security reviews against `f559b4a`.
  Verification: Four `REVISE` verdicts preserved in `architecture-review-round-1.md`; implementation stopped.

- [x] T003: Integrate architecture revision 2.
  Scope: Resolve Round 1 graph, handoff, authority, lifecycle, conflict, join, simple-path, privacy, and bounds findings.
  Verification: Exact revision-2 tree passed byte/source/diff/template/canonical gates and was committed as `5d82394`.

- [x] T004: Run architecture review Round 2.
  Scope: Four fresh independent reviews of revision 2.
  Verification: Four `REVISE` verdicts, 17 high and 8 medium raw findings, preserved in `architecture-review-round-2.md`; worktree unchanged.

- [x] T005: Integrate architecture revision 3.
  Scope: Add the normative property-level orchestration contract and align exact bundle/template closure, host-owned coverage, integration/memory witnesses, logical ownership, identities/tails, operations/comparators, explicit concurrency, matching/reserves/replay, dispatch/results, requests/cancellation, two-pass joins, paths/limits, portability, and package compatibility.
  Verification: ADR/spec/plan/tests/review/decomposition/run/milestone/memory agree; placeholder, BOM-free LF, source-reference, diff, template, readonly declaration, and exact export-inventory checks pass; `npm.cmd run verify` passes in 22.1 seconds with 275 inherited tests plus V10 dogfood, package inspection, and offline consumer.

- [x] T006: Run architecture review Round 3.
  Scope: Four fresh product/API/lifecycle/security reviewers inspect one immutable revision-3 commit.
  Verification: Four `REVISE` verdicts against exact commit `79f2b4e`, with 15 high and 10 medium raw findings preserved in `architecture-review-round-3.md`; implementation stopped.

- [ ] T006A: Integrate architecture revision 4.
  Scope: Close the 14 converged Round-3 obligations across continuation, clarification, evidence, lifecycle, dispatch authority, repository state, references, portability, resources, comparators, ADR, tests, milestone, and memory.
  Verification: Every raw finding maps to one explicit contract rule and negative test; synchronized source and canonical gates pass.

- [ ] T006B: Run architecture review Round 4.
  Scope: Four fresh product/API/lifecycle/security reviewers inspect one immutable revision-4 commit.
  Verification: Four `PASS` verdicts on the same commit. Any material finding returns to T006A as `redesign`.

- [ ] T007: Implement contract family and canonical identity.
  Scope: Seven roots, nested unions, schemas/types, JCS/SHA-256, SnapshotDigest, content-bound tails, IDs/revisions/comparators, diagnostics, explicit package paths.
  Verification: Schema/runtime parity, digest vectors, hostile values, exact bounds, old export identity, packed consumer.

- [ ] T008: Implement PolicyBundle planning and compilation.
  Scope: PolicyBundle/template closure, replication regions, GoalContract coverage, PlanningSession, WorkPacket narrowing, roles, acceptance/integration bindings, scopes, route budgets.
  Verification: Graph derivation, planner escalation, criterion coverage, round lifecycle, permutation, zero-effect rejection.

- [ ] T009: Implement matching, paths, and claimed waves.
  Scope: Profiles, availability/offers, exact matching, path observations, conflicts, wave selection, attempt replay, claim reserve/result limits, Assignment/WaveClaim/tickets.
  Verification: Exhaustive matching truth, shuffle, aliases, conflicts, waiting, claim-before-effect.

- [ ] T010: Implement result reduction and workflow closure.
  Scope: Dispatch boundary, four child variants, observations, mixed batches, V10 mapping, cancellation, queued run input, routes, joins, memory candidates, terminals.
  Verification: Substitution, permutations, precedence, replay, width equivalence, cycle/resource closure.

- [ ] T011: Implement events, privacy, facade, and portability.
  Scope: OrchestrationEvent, content-bound journal, byte accounting, payload classes, MemoryProposal/Candidate, MergeReadyEvidence, runGoal, semantic projection.
  Verification: One-agent E2E, trace reconstruction, canaries, aggregate bounds, two-host equivalence.

- [ ] T012: Dogfood and harden four specialist roles.
  Scope: Policy-bounded explicit fan-out, clarification, failure/diagnosis/fix, fan-in, host-owned acceptance, integration, verification, review, approval, memory proposal/candidate, merge-ready evidence.
  Verification: Serial/parallel evidence equivalence, measured timing, no repeated patch loop, complete trace.

- [ ] T013: Close V11 acceptance.
  Scope: Canonical and template gates, packed consumer, hosted CI, independent final reviews, milestone, memory, baseline, owner decision.
  Verification: One immutable implementation candidate owns all evidence; merge remains explicitly owner-gated.

## Dependencies

- T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T006A -> T006B.
- T006B must pass before T007-T011.
- T007 precedes T008-T011; T008 precedes T009; T009 precedes T010; T010 precedes T011-T012.
- T012 precedes T013.

## Out Of Scope

IDE/API/model/provider selection, distributed coordination, remote queues, crash recovery, overlapping writes, recursive spawning, automatic retry, worktree/sandbox/credential enforcement, merge, durable memory mutation, and external orchestration dependencies.
