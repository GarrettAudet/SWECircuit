# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness
alone. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision
53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds
install logs and the private closure. Revision 60's canonical gate failed and is permanently
retired. Revision 68 commit `78f8c99645bb7c505e7e95682c6ab69a13915891` passed exact local
qualification, non-consuming rehearsal, Template Check, and Windows Node 22/24, but is
permanently retired. On 2026-07-24 the owner narrowed v0.1 support to Windows; macOS and Linux are
unsupported and no longer release gates. Revision 69 aligns the support contract and hosted
workflow while retaining the bounded compatibility correction as best effort. Exact Windows
qualification, independent review, copied lifecycle, complete verifier, rehearsal, canonical
gate, fresh R2, milestone, and merge remain; `releaseReady: false`.

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
- [x] Freeze and commit the exact Revision 65 source.
- [x] Pass exact lifecycle and the complete verifier.
- [x] Preserve the failed non-consuming rehearsal and permanently retire Revision 65.
- [x] Confirm the Revision 65 one-shot canonical gate was never invoked.

## Revision 66 Release Correction

- [x] Preserve Revision 65's exact source, standalone passes, failed rehearsal, and unused one-shot disposition.
- [x] Correct the regression from three to four modeled namespace occurrences.
- [x] Compact the full private scratch layout and retain 24 characters of fixed-budget headroom.
- [x] Pass the targeted regression and 29/29 release-gate suite.
- [x] Pass the complete focused pair and broad pre-freeze verification.
- [x] Complete independent final-delta source review with no additional source defect.
- [x] Clear the review's immutable exact-candidate rehearsal condition.
- [x] Freeze and commit the exact Revision 66 source.
- [x] Pass exact lifecycle, complete verifier, and non-consuming rehearsal.
- [x] Preserve the five-pass/two-fail hosted run and permanently retire Revision 66.
- [x] Confirm the Revision 66 one-shot canonical gate was never invoked.

## Revision 67 Release Correction

- [x] Preserve the exact R66 local passes, hosted matrix, failed Ubuntu logs, and unused one-shot.
- [x] Confirm both Ubuntu versions fail the same causal fixture assertion.
- [x] Compose bounded fixture segments and add a deterministic short Linux projection.
- [x] Pass the targeted fixture, complete focused pair, and broad pre-freeze verification.
- [x] Freeze exact commit `7e2bf60b652be65dfc8b5c9bcf21fcf91701852d`.
- [x] Pass exact lifecycle, complete verifier, rehearsal, and all seven hosted jobs.
- [x] Consume one canonical gate and complete fresh three-domain R2.
- [x] Preserve the verified security `fix` and permanently retire Revision 67.

## Revision 68 Release Correction

- [x] Preserve R67's exact local, hosted, canonical, and fresh R2 outcomes.
- [x] Confirm complete-environment and omitted-parent root causes.
- [x] Bind and validate every worker environment key/value identity.
- [x] Close verifier validation before candidate reads and imports.
- [x] Add hostile fresh-process harness and verifier regressions.
- [x] Add parent and causal fixture to security reviewer context.
- [x] Clear independent final-delta review and freeze exact Revision 68.
- [x] Pass focused, broad, copied-lifecycle, complete local, and non-consuming rehearsal gates.
- [x] Preserve the five-pass/two-macOS-fail hosted run and permanently retire Revision 68.
- [x] Confirm the Revision 68 one-shot canonical gate was never invoked.

## Revision 69 Release Correction

- [x] Preserve R68's exact local passes, final hosted matrix, failed macOS logs, and unused gate.
- [x] Bound the shared macOS failure to the fresh worker-environment boundary.
- [x] Bind Darwin's declared process value per invocation without adding it to stable identity.
- [x] Prove Darwin inclusion, Windows/Linux exclusion, stable identity, and invocation identity.
- [x] Byte-bind the R68 hosted evidence and preserve the independent correction-review history.
- [x] Pass focused, template, format, lint, typecheck, build, release-review, and core gates.
- [x] Clear the Windows-first independent rereview after correcting all trace-policy findings.
- [x] Freeze Revision 69 at `c6b35f057049382cb68cfbd71a96604b6fbfd325`.
- [x] Pass its 2/2 copied lifecycle, preserve the complete-verifier failure, and retire the source.
- [x] Keep the Revision 69 canonical gate uninvoked.

## Revision 70 Release Correction

- [x] Preserve the exact R69 verifier stream and unused-gate disposition.
- [x] Restore the approved 3,843-byte README binding while retaining linked Windows support.
- [x] Refresh the public-support regression and copied-lifecycle gate-test identity.
- [x] Pass V11 and V12 dogfood against the restored context.
- [x] Pass focused and complete mutable-source qualification plus independent review.
- [ ] Freeze one exact Revision 70 source.
- [ ] Pass copied lifecycle, complete verifier, non-consuming rehearsal, and hosted Windows.
- [ ] Consume one Revision 70 canonical gate and complete fresh three-domain R2.
- [ ] Close memory and the milestone, then merge to `main`.
