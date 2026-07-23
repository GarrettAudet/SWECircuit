# Tasks

## Status

T006 remains open until release evidence closes it. Revision 44 still passes the complete V11 trust replay, and exact Revision 35 aggregate/package-bound review evidence remains immutable. Exact Revision 36 gate `ee297d8e11466763acc9b4c630de445eb57b00c3` preserved source, materialization, disposable Git state, and cleanup but stopped at 443/445 core tests because two concurrent Git-batch fixtures inherited the same candidate `GIT_INDEX_FILE`. Revision 37 strips repository-scoping and dynamic Git configuration from every fixture process; focused causal tests pass 3/3 and the complete concurrent gate/review suites pass 49/49. Candidate-addressed external evidence requires a fresh exact aggregate and package-bound review before one different successor gate, fresh R2, hosted CI, milestone closeout, and owner merge.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 runs exact read-only reviews from source-bound packages. Revision 37 specifically proves that nested Git fixtures remain isolated when release-gate and release-review test files execute concurrently. Fresh R2 may fan out across three independent domains only after fresh aggregate/package review evidence and a different exact source-bound gate pass.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
