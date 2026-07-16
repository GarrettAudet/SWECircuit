# V11 Specialist Compiler Tasks

## Status

Revision-6 technical acceptance, post-integration reconstruction, and branch publication passed. T009-T011 are complete; the explicit owner merge decision remains open.

## Task List

Each task has one integration owner. Read-only exploration, test design, and independent review may fan out under compiled work-unit contracts; overlapping source edits remain serialized unless exact ownership and integration order are proven.

## Tasks

- [x] T001: Preserve failed runtime architecture evidence and emit `split`.
  Scope: Round-4 raw findings, correction designs, immutable evidence commit, and new product boundary.
  Verification: Commit `6da0376` is pushed and source files remain linked.

- [x] T002: Freeze ADR 0004 and the small specialist contract.
  Scope: GoalContract, authority projection, candidate partition, metric, blueprint, compilation, renderer, limits, diagnostics, and deferred boundary.
  Verification: Spec/ADR/contract coherence review and template checker.

- [x] T003: Implement bounded input validation and authority derivation.
  Scope: Closed snapshots, limits, references, DAG, evidence coverage, context integrity, privacy, and exact narrowing.
  Verification: Positive, malformed, mutation, ceiling, context, coverage, cycle, and canary tests.

- [x] T004: Implement deterministic candidate construction and optimization.
  Scope: Serial baseline, exhaustive small search, bounded structural search, supplied candidates, canonical partitions, agent DAG, conflict-aware schedule, metrics, and total comparator.
  Verification: Partition counts, permutation invariance, tie-break, limit, and six golden optimization fixtures.

- [x] T005: Compile exact AgentBlueprints and bind the launch.
  Scope: Task-shaped demand, exact unions, dependencies, evidence independence, launch waves, blueprint digests, evaluation-set digest, and compilation digest.
  Verification: Completeness, least-authority, no-provider-field, independence, and digest-substitution tests.

- [x] T006: Render a provider-neutral specialist package.
  Scope: Manifest, one agent contract per blueprint, integration contract, safe generated paths, file digests, and compilation binding.
  Verification: Stable bytes, hostile Markdown text containment, manifest/file closure, and no-I/O proof.

- [x] T007: Integrate public API and clean installed consumer.
  Scope: Constants, diagnostics, root exports, package contents, TypeScript declarations, and installed-host example.
  Verification: Export inventory, declaration probe, pack dry run, and offline consumer check.

- [x] T008: Update IDE kickoff and public operating surface.
  Scope: One-message synthesis path, roster preview, launch binding, module guide, README status, and deferred runtime language.
  Verification: Manual novice-path review and checker links.

- [x] T009: Dogfood specialist construction on V11.
  Scope: Compile the remaining V11 goal, materialize exact read/review/test specialists, preserve handoffs, compare serial baseline and selected team, and record friction.
  Verification: Revision-6 source-linked run record, compiler output, selected metrics, immutable-input binding, observed outcomes, and memory candidates.

- [x] T010: Close verification and independent review.
  Scope: Format, lint, typecheck, build, unit, package, template, checker matrix, hosted CI if available, and exact digest-bound product/API, algorithm/lifecycle, and security/trace reviews.
  Verification: One revision-6 digest pair owns preparation, all PASS evidence, and the immutable pre-integration spec binding; attempt 5 and release-host attempts 6A/6B remain `FIX` evidence.

- [x] T011: Publish V11 milestone and request owner approval.
  Scope: Review, implementation notes, memory, retrieval, known limits, milestone, post-integration reconstruction, branch/target gate, and concise overview.
  Verification: The integration owner reconstructed both approved revision-6 digests after documentation integration; candidate commit `191d9339da383a2133377dcca564d7202b7ad66d` is pushed with complete acceptance criteria and source chain, and the approval handoff explicitly requests the merge decision.
  Integration status: Review, milestone, acceptance, and memory records are source-linked, [post-integration replay passed](evidence/dogfood/handoffs/post-integration-replay-pass-attempt-6.md), and the candidate is frozen and pushed. Owner approval has not been given, so merge remains blocked.

## Dependencies

- T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007.
- T005 -> T008; T007 and T008 -> T009 -> T010 -> T011.
- Read-only review design may run beside T003-T008; acceptance review waits for one immutable candidate.

## Out Of Scope

- The deferred runtime-control-plane obligations listed in `../v11-orchestration-planner/revision-5-correction-design.md`.
- Provider/model selection, execution, sandboxing, credentials, process scheduling, retry, merge, and automatic memory mutation.
