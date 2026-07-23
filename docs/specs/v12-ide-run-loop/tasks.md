# Tasks

## Status

T006 remains open until release evidence closes it. Revision 44 passes the correctly ordered V11 trust replay. Exact Revision 35 aggregate `bcb12fbee15e8a96b5088accb5a397bc0464c7cd` passes 445/445 core tests and every later aggregate gate. Its separately compiled package-bound reviewer authenticates 51/51 sources and returns a verified `pass`. Revision 36 preserves both immutable results. Candidate-addressed external evidence authorizes one exact successor gate; fresh R2 review, hosted CI, milestone closeout, and the owner merge gate remain before T006 or V12 can close.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 ran adversarial verification and IDE dogfood in parallel, then launched exact read-only reviewers from source-bound packages. Revision 35 aggregate and package-bound review evidence pass. Fresh R2 review may fan out across three independent domains only after Revision 36 passes focused anti-drift checks, committed-source verification, and its exact source-bound gate.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
