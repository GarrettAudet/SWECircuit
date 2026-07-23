# Tasks

## Status

T006 remains open until release evidence closes it. Revision 44 still passes the complete V11 trust replay, and exact Revision 35 aggregate/package-bound review evidence remains immutable. Exact Revision 36 gate `ee297d8e11466763acc9b4c630de445eb57b00c3` remains an immutable 443/445 failure. Exact Revision 37 `148f546cba4c3c9ceecd2bbca07d47fe94878afa` passed its aggregate with 446/446 core tests, copied lifecycle, package inspection, and offline consumer verification, but a separately compiled reviewer authenticated 57/57 sources and returned a kernel-verified `fix`: inherited `GIT_CONFIG_PARAMETERS` and other `GIT_*` authority channels still reached fixture processes. Exact Revision 38 commit `1f2e89e30a46c1584cb7b979fc4c8a63326f7ff0` closes every inherited case-insensitive `GIT_*` channel. Its clean identity-stable aggregate passes 447/447 core tests, copied lifecycle, package inspection, and offline consumer verification. A separately compiled reviewer authenticated 69/69 sources and 4,404,088 bytes twice; its exact 9,592-byte handoff verifies `pass` with `integrationReady: true` and `successorFreezeApproved: true`. Working Revision 39 is an evidence-only successor; its committed one-shot gate, fresh R2, hosted CI, milestone closeout, and owner merge remain.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 now includes Revision 37's verified `fix`, Revision 38's immutable aggregate, and its 69-source verified `pass`. Fresh R2 may fan out across three independent domains only after the evidence-only Revision 39 successor passes its exact one-shot gate.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
