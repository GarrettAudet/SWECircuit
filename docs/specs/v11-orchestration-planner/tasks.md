# V11 Tasks

## Status

T001 complete. T002 independent architecture review is next; implementation remains architecture-gated.

## Task List

- [x] T001: Bootstrap the V11 source and decision chain.
  Scope: Create the feature package, decomposition and orchestration records, dated primary-source snapshot, proposed ADR 0003, active-context update, and retrieval pointer on the stacked V11 branch.
  Verification: `scripts/check-template.ps1` passes; every artifact names the V10 baseline exception and the IDE/model/provider-neutral target.

- [ ] T002: Complete independent architecture and threat review.
  Scope: Review planner trust, capability identity, matching semantics, scheduling state, clarification/resume, isolation, V10 composition, trace ownership, and compatibility.
  Verification: Architecture, security, and API reviewers return `PASS` on one immutable design commit; findings are resolved in the spec, ADR, plan, and test plan.

- [ ] T003: Freeze portable planning and agent capability contracts.
  Scope: Add closed types and, if approved, schemas for goal input, planner proposal, agent profile, orchestration plan revision, policy, and explanation codes.
  Verification: Positive/negative schema and bounded-snapshot fixtures prove closure, limits, identity, privacy, and provider neutrality.

- [ ] T004: Implement the bounded planner boundary.
  Scope: Snapshot and validate direct inputs, invoke one host-injected planner only after preflight, normalize proposal/clarify/block outcomes, and make malformed output fail without worker invocation.
  Verification: Unit tests cover hostile values, limits, throws, malformed proposals, secret canaries, clarification, and zero worker calls on every rejection.

- [ ] T005: Implement deterministic compilation and capability matching.
  Scope: Compile proposals into linked packets and module nodes; match required capabilities, capacity, authority compatibility, and stable tie-breakers with inspectable explanations.
  Verification: Input-order permutation, no-match, ambiguity, least-authority, capacity, and cross-host equivalence tests pass.

- [ ] T006: Implement readiness, claiming, conflict, and join semantics.
  Scope: Add the pure orchestration reducer, exact plan revisions, dependency state, concurrency ceilings, single-claim attempts, conflict serialization, isolation checks, `all`/`any` joins, and typed failure routing.
  Verification: State-transition matrices, graph fixtures, race-free claim tests, deadlock detection, failure propagation, and quarantine tests pass.

- [ ] T007: Compose V10 child execution evidence into the parent run.
  Scope: Define host-loop assignments and accepted V10 result ingestion without bypassing V10 preflight or rewriting child evidence; add clarification/resume and parent journal records.
  Verification: Deterministic child-result fixtures reconstruct one complete and one interrupted parent run through `inspectTrace` or an approved versioned successor.

- [ ] T008: Harden security, privacy, and resource bounds.
  Scope: Add depth/node/fan-out/concurrency/event limits, provider-identity negative checks, privacy canaries, unconfirmed-work quarantine, and no-network/no-process source guards.
  Verification: Security tests and independent threat review prove every rejection occurs before forbidden effects.

- [ ] T009: Dogfood an end-to-end multi-specialist circuit.
  Scope: Use V11 to plan and advance frontend, backend, test, and review packets through V10 deterministic executors, including clarification, diagnosis, fan-in, integrated verification, and memory candidates.
  Verification: The parallel run and serial control perform equivalent work; measured timing, trace, failures, recovery, and integrated evidence are preserved.

- [ ] T010: Publish the truthful public and package surface.
  Scope: Update installed docs, README status, schema guide, module registry, consumer fixture, and stale TraceRail compatibility naming only where a tested migration exists.
  Verification: Packed TypeScript consumer compiles and runs offline; public-contract checks reject provider-routing, automatic-merge, sandbox, persistence, and memory overclaims.

- [ ] T011: Close V11 acceptance.
  Scope: Run canonical and full template gates, freeze the exact candidate, obtain independent correctness/security/API review, pass hosted CI, publish the milestone, and update durable memory.
  Verification: One immutable commit owns the complete local, hosted, review, dogfood, performance, milestone, and memory evidence; merge remains owner-gated.

## Dependencies

- T001 precedes T002.
- T002 must pass before T003-T008 implementation.
- T003 precedes T004-T007.
- T004 and T005 precede T006.
- T006 and V10 composition precede T007 and T009.
- T008 reviews every executable task.
- T009 precedes T010 recommendation claims and T011.

## Out Of Scope

- Live provider or IDE adapter installation.
- Model selection or API routing.
- Automatic worktree creation, merge, or durable memory mutation.
- Distributed persistence, remote queues, A2A protocol conformance, and recursive agent spawning.
- V11 acceptance or merge before V10 is adopted or the branch is rebased to an approved baseline.
