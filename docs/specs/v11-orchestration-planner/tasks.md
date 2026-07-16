# V11 Tasks

## Status

T001-T006B complete as architecture evidence. Round 4 returned four REVISE verdicts, so the workflow emitted split. No runtime implementation was authorized. T007-T013 are preserved deferred backlog; active V11 implementation moved to docs/specs/v11-specialist-compiler/tasks.md under ADR 0004.
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

- [x] T006A: Integrate architecture revision 4.
  Scope: Close the 14 converged Round-3 obligations plus `specialist-compiler-preflight.md` and `architecture-coherence-preflight.md` across candidate comparison, independent `compileAgentBlueprints`, AgentBlueprintIntent, TaskAuthorityProjection, predecessor-safe EvidenceBinding/AgentBlueprint order, exact digests/metrics, AgentMaterializationReceipt, AcceptedWorkAccumulator, status-specific continuations, acyclic repository/projection/merge construction, detached offers, resources, ADR, tests, milestone, and memory.
  Verification: Every raw finding maps to one explicit contract rule and negative test; strict declarations, 56 preserved plus 130 collision-free proposed exports, 153 local links, the template checker, all 119 checker scenarios, and the canonical 275-test package gate pass.

- [x] T006B: Run architecture review Round 4.
  Scope: Four fresh product/API/lifecycle/security reviewers inspected immutable revision-4 commit d486b7f.
  Verification: Four REVISE verdicts, with 10 high and 9 medium findings preserved in architecture-review-round-4.md; implementation stopped and emitted split.
- [ ] T007: Implement contract family and canonical identity.
  Scope: Seven roots, closed nested/status/presence unions, schemas/types, JCS/SHA-256 and derived-digest registry, SnapshotDigest, content-bound tails, identified/unidentified start rejection, IDs/revisions/comparators, diagnostics, explicit package paths.
  Verification: Schema/runtime parity, digest vectors, hostile values, exact bounds, old export identity, packed consumer.

- [ ] T008: Implement PolicyBundle planning and compilation.
  Scope: Repository-shipped `synthesizeGoal` candidate-comparison contract/fixtures, PolicyBundle/template closure, replication regions, GoalContract coverage, PlanningSession, TaskAuthorityProjection, WorkPacket narrowing, AgentBlueprintIntent validation, independent profile-free `compileAgentBlueprints` shared by `compilePlan`, task-specific AgentBlueprint/context-use compilation, exact structural records, roles, predecessor-safe acceptance/integration/evidence bindings, scopes, and route budgets.
  Verification: Graph derivation, planner escalation, criterion coverage, round lifecycle, permutation, zero-effect rejection.

- [ ] T009: Implement matching, paths, and claimed waves.
  Scope: Supply-free AgentBlueprint demand versus AgentProfile supply, availability with byte-reachable detached GrantOffer references, exact selected-wave matching, path observations, conflicts, deterministic bounded wave selection without global-packing claims, attempt replay, claim reserve/result limits, Assignment/WaveClaim/tickets.
  Verification: Exhaustive matching truth, shuffle, aliases, conflicts, waiting, claim-before-effect.

- [ ] T010: Implement result reduction and workflow closure.
  Scope: AgentMaterializationReceipt with registered context-use digests and pre-dispatch receipt byte limit, one-shot dispatch boundary, four child variants, observations, mixed batches, V10 mapping, cancellation, queued run input, routes, joins, memory candidates, and terminals.
  Verification: Substitution, permutations, precedence, replay, width equivalence, cycle/resource closure.

- [ ] T011: Implement events, privacy, facade, and portability.
  Scope: OrchestrationEvent, content-bound journal, byte accounting, closed SourceReferences, payload classes, MemoryProposal/Candidate, AcceptedWorkAccumulator, pre-request RepositoryStateRequest, RepositoryStateWitness, acyclic AcceptedWorkProjection then MergeReadyEvidence, status-specific self-contained runGoal, semantic projection.
  Verification: One-agent E2E, trace reconstruction, canaries, aggregate bounds, two-host equivalence.

- [ ] T012: Dogfood and harden task-specific synthesis and materialization.
  Scope: One-message goal synthesis, serial baseline and legal candidate comparison, explicit task-shaped AgentBlueprintIntents, direct task-specific AgentBlueprint compilation and materialization, policy-bounded fan-out, clarification, failure/diagnosis/fix, fan-in, host-owned acceptance, integration, verification, review, approval, memory proposal/candidate, and merge-ready evidence.
  Verification: Intent/blueprint/receipt completeness, exact structural metrics, six golden specialization baselines with independent semantic review, serial/parallel accepted-work equivalence, measured timing/quality/coordination, no repeated patch loop, and complete trace.

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
