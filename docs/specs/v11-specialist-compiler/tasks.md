# V11 Specialist Compiler Tasks

## Status

Revision 30 technical integration is complete against the exact approved Candidate A and Audit B pairs. Historical tasks T001-T019 and exact-candidate freeze/audit task T020 are complete. T021 remains open for post-integration package replay, final host verification, attempt-30 archival, branch commit and push, and the owner merge decision.

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

- [x] T012: Retire revision 23 and close diagnostic-pointer privacy.
  Scope: Archive the exact retired evidence, classify the independent security finding, sanitize cumulative emitted and decoded pointer prefixes, preserve the longest safe pointer, and add delimiter-spanning regressions.
  Verification: Revision 23 remains under `evidence/dogfood/runs/attempt-23/`; focused diagnostic coverage, format, lint, typecheck, build, and the kernel suite passed before revision-24 expansion.

- [x] T013: Add revision-24 planning recovery, execution evidence contracts, and truthful first-run surfaces.
  Scope: Candidate analysis, closed handoff verification, dependency fan-in, strict schema/export integration, packed-consumer compatibility, first-run example, and public operating docs.
  Verification: Focused compiler/schema/handoff/example suites, strict typecheck, lint, build, and a clean offline packed-consumer host pass.

- [x] T014: Freeze and independently audit revision 27.
  Scope: Bind every current source, create immutable pre-integration snapshots, compile and verify Candidate A plus Audit B, preserve the external package-verification receipt and cross-package authorization, then run the exact Audit B and Candidate A specialist contracts.
  Verification: Both trusted pairs, the external receipt, Audit B, launch authorization, preparation, and five Candidate A handoffs verify. Product/API, security/trace, and release returned `FIX`; fan-in is complete but `integrationReady: false`, so integration did not launch.

- [x] T015: Retire revision 27 and correct its independent findings.
  Scope: Archive exact packages, controls, raw handoffs, and fan-in; expose the common schema; bind artifact media and normalized controls; refresh both packed-consumer approvals; and add focused regressions.
  Verification: Attempt 27 is hash-preserved under `evidence/dogfood/runs/attempt-27/`; 54/54 focused tests and the clean offline installed consumer pass on the corrected tree.

- [x] T016: Freeze and independently audit revision 28.
  Scope: Bind every corrected source, refresh immutable pre-integration snapshots, compile and verify Candidate A plus Audit B, recreate the external receipt and cross-package authorization, then run the exact Audit B and Candidate A contracts.
  Verification: Both trusted digest pairs, the external receipt, Audit B, launch authorization, preparation, and all five Candidate A handoffs verify. Algorithm/lifecycle and security/trace passed; product/API and release returned `FIX` for the same stale first-run approval, so fan-in was complete but not integration-ready.

- [x] T017: Retire revision 28 and refresh the first-run approval.
  Scope: Archive exact packages, controls, receipt, authorization, raw handoffs, dependency assessments, and non-ready fan-in; regenerate the source binding and derived digest pair in the checked-in example approval.
  Verification: Attempt 28 is hash-preserved under `evidence/dogfood/runs/attempt-28/`; the normal read-only example approval-verifies and both focused first-run tests pass.

- [x] T018: Freeze and independently audit revision 29.
  Scope: Bind every current source, refresh immutable pre-integration snapshots, compile and verify Candidate A plus Audit B, recreate the external receipt and cross-package authorization, then run the exact Audit B and Candidate A contracts.
  Verification: Both trusted digest pairs, the receipt, binder, semantic audit, launch authorization, preparation, and all five Candidate A raw handoffs verify. Algorithm/lifecycle and release returned `PASS`; product/API and security/trace returned `FIX`, so complete fan-in was correctly non-ready and integration did not launch.

- [x] T019: Retire revision 29 and correct its independent findings.
  Scope: Archive exact packages, controls, receipt, authorization, raw handoffs, dependency assessments, and non-ready fan-in; make the verification receipt explicit in both authorization summaries; harden the first-run approval and repository-source read boundaries; and add adversarial regressions.
  Verification: Attempt 29 is hash-preserved under `evidence/dogfood/runs/attempt-29/`; strict focused first-run coverage passes 7/7 on the corrected tree.

- [x] T020: Freeze and independently audit revision 30.
  Scope: Bind every corrected source, refresh immutable pre-integration snapshots, compile and verify Candidate A plus Audit B, recreate the external receipt and cross-package authorization, then run the exact Audit B and Candidate A contracts.
  Verification: Both trusted digest pairs reconstruct; every raw handoff verifies; product/API, algorithm/lifecycle, security/trace, and release gates all return `PASS`; transitive fan-in is integration-ready.

- [ ] T021: Replay, publish, and request owner merge approval for revision 30.
  Scope: Technical integration, post-integration reconstruction, final local gates, and the accepted attempt-30 archive are complete. The host must commit and push the release-ready branch, observe hosted CI, and request the owner's merge decision.
  Verification: AC11-AC24 remain closed against the exact Revision 30 source chain; the archive preserves this handoff and replay evidence; the published commit passes hosted CI; and the only remaining gate is the owner's explicit merge decision.
  Integration status: `PASS` through immutable archival. No commit, push, hosted CI, or merge is claimed yet.

## Dependencies

- T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007.
- T005 -> T008; T007 and T008 -> T009 -> T010 -> T011.
- T011 -> T012 -> T013 -> T014 -> T015 -> T016 -> T017 -> T018 -> T019 -> T020 -> T021.
- Audit B must pass before Candidate A launch; Candidate A fan-in must pass before T021 integration.
- Read-only review design may run beside T003-T008; acceptance review waits for one immutable candidate.

## Out Of Scope

- The deferred runtime-control-plane obligations listed in `../v11-orchestration-planner/revision-5-correction-design.md`.
- Provider/model selection, execution, sandboxing, credentials, process scheduling, retry, merge, and automatic memory mutation.
