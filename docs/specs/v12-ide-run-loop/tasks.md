# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision 60 commit `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3` passed local and hosted verification, then its one-shot canonical gate failed after 461 core tests because the copied lifecycle discarded the enclosing candidate Git authority; the consumed source is permanently retired. Revision 61 closes that cause, binds a fresh-process regression into lifecycle and security review, and passes focused, broad pre-freeze, checker, dogfood, package, consumer, and independent final-delta gates. No release approval exists until one immutable successor passes exact lifecycle, full verification, hosted CI, one canonical gate, fresh R2, milestone closeout, and owner merge; `releaseReady: false`.

## Task List

- [x] T001: Create the V12 branch and feature package from released V11.1.
  Verification: branch parent and active artifacts identify `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`.
- [x] T002: Compile the architecture work through V11.1.
  Verification: reviewed GoalContract, serial baseline, selected partition, compilation digest, package digest, and verified package are preserved.
- [x] T003: Execute and verify architecture specialists.
  Verification: exact raw handoffs verify; architecture integration has complete transitive `pass` fan-in.
- [x] T004: Freeze the V12 ADR and implementation contract.
  Verification: product, lifecycle, authority, API, and test obligations map to AC1-AC9 with no blocking decision.
- [x] T005: Compile and implement disjoint V12 work units.
  Verification: every code or documentation change maps to an exact task-shaped contract and handoff.
- [ ] T006: Run integrated verification and independent review.
  Verification: focused tests, canonical gate, package consumer, checker matrix, dogfood, and reviewer evidence pass.
- [ ] T007: Close memory, milestone, publication, and owner merge gate.
  Verification: exact candidate, CI, residual risks, and user-facing overview are preserved.

## Parallelization

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. Release corrections preserve one integration owner while read-only diagnosis, portability review, and final-delta review run as bounded specialists. After the immutable source passes its canonical gate, fresh R2 fans out concurrently across product/API/IDE, lifecycle/correctness, and security/trace authority before one verified fan-in.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.

## Revision 41 Release Hardening

- [x] Preserve the exact authority and review-coverage findings.
- [x] Close environment, toolchain, npm configuration, dependency identity, and receipt validation.
- [x] Bind the omitted security sources and causal regressions.
- [x] Route all later exact and R2 outcomes into candidate-addressed evidence; the historical source is retired.

## Revision 58 Hosted Release Correction

- [x] Preserve Revision 57's exact local pass and hosted-CI failure.
- [x] Confirm Windows checkout and shallow-history root causes.
- [x] Add pre-checkout long-path setup, complete history, documentation, and focused regression.
- [x] Pass the complete pre-freeze contract and independent review.
- [x] Freeze and commit exact Revision 58 source.
- [x] Run exact lifecycle (`pass`), full verifier (`fail`), and hosted matrix (`fail`); retire without gate consumption.

## Revision 59 Release Correction

- [x] Preserve Revision 58's exact local and hosted retirement evidence.
- [x] Restore V11-approved documentation identities and authenticate the hosted workflow.
- [x] Pass focused, broad pre-freeze, and independent review.
- [x] Freeze commit `e253a2ab4df7d5cebf9ed7cee6af0fea268ee3c2`; retire it after all six hosted kernel jobs fail without invoking its gate.

## Revision 60 Release Correction

- [x] Close Linux libc applicability, Windows/macOS path identity, cleanup, cache overlap, and maximum-session allocation defects.
- [x] Pass exact local verification and all seven hosted jobs at `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3`.
- [x] Invoke the canonical gate exactly once; preserve its nested-lifecycle `fail` receipt and permanently retire the source.

## Revision 61 Release Correction

- [x] Preserve Revision 60's consumed gate receipt and raw logs.
- [x] Carry one authenticated enclosing Git runner through nested materialization and Git-context creation.
- [x] Prove blob-only default failure, explicit success, stable identities, and cleanup in a fresh process.
- [x] Bind the executable probe into lifecycle identities and both lifecycle and security R2 scope.
- [x] Pass focused, broad pre-freeze, checker, dogfood, package, consumer, and independent final-delta gates.
- [ ] Freeze and commit the exact Revision 61 source.
- [ ] Pass exact lifecycle, full verifier, exact-candidate topology preflight, and hosted matrix.
- [ ] Consume one canonical gate and complete fresh three-domain R2.
- [ ] Close memory and the milestone, then merge to `main`.
