# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Revision 60's canonical gate failed and is permanently retired. Revision 64 commit `7d30a276d547cd501d93e6a698c84fff111bd8a4` passed exact copied lifecycle in 526.6 seconds, complete verification in 630.6 seconds, and all seven hosted jobs in run `30159538275`, then failed its non-consuming exact-candidate rehearsal at the copied canonical gate's 30-minute bound. Its one-shot gate was never invoked and the source is permanently retired. Revision 65 preserves the exact failure and hosted evidence, shortens only the nested private scratch namespace, reduces the causal locked dependency path from 293 to 239 characters, passes 71/71 focused release tests, passes every broad non-lifecycle gate, and passes independent final-delta review with no findings. Exact-candidate, hosted, canonical, fresh R2, milestone closeout, and owner merge gates remain; `releaseReady: false`.

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
- [x] Freeze commit `f0fec5cf01907f463ea1f129f2c7a1f8b8029ce5` and pass exact lifecycle, full verification, and all seven hosted jobs.
- [x] Retire Revision 61 after its non-consuming exact-candidate rehearsal hit the old 15-minute nested-gate bound; its one-shot gate remains unused.

## Revision 62 Release Correction

- [x] Preserve the exact R61 rehearsal identity, timeout evidence, and unused one-shot disposition.
- [x] Scope a 30-minute timeout to the positive copied canonical gate while retaining every ordinary 15-minute bound.
- [x] Bind the timeout exception through an exact regression assertion and pass 66 focused release tests.
- [x] Pass broad pre-freeze verification and independent review.
- [x] Freeze commit `d02b2bc590e04ec9496d9d04b7500e94adda9c04` and pass its exact copied lifecycle.
- [x] Retire Revision 62 after its full verifier and all seven hosted jobs fail at V11 attribute identity; its one-shot gate remains unused.

## Revision 63 Release Correction

- [x] Preserve the exact R62 failure streams, hosted run, and unused one-shot disposition.
- [x] Restore the V11-approved `.gitattributes` identity without changing the R61 evidence blob.
- [x] Keep V11-approved source bytes unchanged and pass strict V11 dogfood plus 68 focused release tests.
- [x] Pass broad pre-freeze verification and independent review.
- [x] Freeze commit `7f45e75792caff01db638538004077b61643ea37`; pass exact lifecycle and full verification.
- [x] Preserve hosted run `30156840253`: six kernel jobs pass and tracked whitespace fails.
- [x] Retire Revision 63 with its one-shot canonical gate unused.

## Revision 64 Release Correction

- [x] Preserve R63's exact local and hosted outcomes in candidate-addressed evidence.
- [x] Move the exact R61 stream to the established tracked `.log` representation without changing its bytes.
- [x] Require the exact ignore exception, hosted exemption, tracked path, old-path absence, and seven intentional whitespace lines.
- [x] Pass 69 focused release tests.
- [x] Pass strict V11 replay, template checker, checker matrix, equivalent 4,083-file hosted-policy scan, and complete pre-freeze verifier.
- [x] Complete independent final-delta re-review after integrating Attempt 1's release-state finding.
- [x] Freeze and commit exact Revision 64 source `7d30a276d547cd501d93e6a698c84fff111bd8a4`.
- [x] Pass exact lifecycle, complete verifier, and all seven hosted jobs.
- [x] Preserve the failed non-consuming rehearsal and permanently retire Revision 64.
- [x] Confirm the one-shot canonical gate was never invoked.

## Revision 65 Release Correction

- [x] Preserve Revision 64's exact standalone passes, hosted seven-job pass, failed rehearsal, and unused one-shot disposition.
- [x] Reproduce the copied canonical-gate timeout with exact source-preserving streams.
- [x] Confirm the nested Windows path cause with a bounded short-path counterfactual.
- [x] Implement the short private scratch namespace and causal regression.
- [x] Pass 71 focused release tests.
- [x] Pass broad non-lifecycle verification.
- [x] Pass independent final-delta review with no findings.
- [ ] Freeze and commit the exact Revision 65 source.
- [ ] Pass exact lifecycle, complete verifier, non-consuming rehearsal, and all seven hosted jobs.
- [ ] Consume one canonical gate and complete fresh three-domain R2.
- [ ] Close memory and the milestone, then merge to `main`.
