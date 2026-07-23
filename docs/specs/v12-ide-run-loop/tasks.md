# Tasks

## Status

T006 remains open until release evidence closes it. Exact Revision 39 commit `a9ee60d31cf302c91f6600ac977d0b62cb153f3f` passed its one-shot canonical gate with 447/447 core tests plus copied lifecycle, package inspection, and offline installed-consumer verification. Fresh R2 preparation authenticated the source and gate, then emitted `diagnose` before compilation because diagnostic-only `release-correction-rN` folders were misclassified as package-backed specialist revisions. Revision 39 is retired without rerun. Working Revision 40 requires all three root package markers, rejects partial marker sets, ignores diagnostic-only roots, and passes its focused checks plus the complete 50/50 concurrent release suite. Broad verification, an immutable successor commit, one exact canonical gate, fresh R2, hosted CI, milestone closeout, and owner merge remain; `releaseReady: false`.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 now includes Revision 38's package-bound `pass`, Revision 39's exact gate `pass`, and its fresh-R2 `diagnose`. After Revision 40 passes an exact committed gate, fresh R2 may fan out across the three independent product/API/IDE, lifecycle/correctness, and security/trace domains.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
