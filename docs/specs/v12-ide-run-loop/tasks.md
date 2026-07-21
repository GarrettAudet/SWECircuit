# Tasks

## Status

T006 in progress: accepted Revision 16 attempt 2 aligns the source-of-truth release state after the most recent reviewed source routed `pass` / `fix` / `pass` and `releaseReady: false`; independent pre-freeze verification passes. V12 remains not merge-ready pending a successor exact gate, fresh R2 review, hosted CI, and the owner merge gate.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 ran adversarial verification and IDE dogfood in parallel, then launched three exact read-only release reviewers in one wave. Historical review and correction outcomes remain preserved through Revision 15. The most recent reviewed source passed its exact gate, returned `pass` / `fix` / `pass` from the complete R2 roster, and is retired. A successor review may fan out across three independent domains only after its exact source-bound gate passes.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
