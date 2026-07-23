# Tasks

## Status

T006 remains open until release evidence closes it. Exact checkpoint `4275ce9eb31e04995f4bb49c599d6d930c9685a7` passed the complete aggregate with 443 of 443 core tests and the copied-production lifecycle. Its immutable package-bound Revision 31 review returned verified `fix` because the embedded review harness and canonical gate still used per-entry Git blob processes. Revision 32 batches all three ownership boundaries and passes 31/31 release-review tests plus 17/17 release-gate tests. A fresh exact aggregate, fresh package-bound `pass`, one exact successor gate, fresh R2 review, hosted CI, and the owner merge gate remain before T006 or V12 can close.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 ran adversarial verification and IDE dogfood in parallel, then launched three exact read-only release reviewers in one wave. Historical outcomes remain preserved through the latest retired source and Revision 29. A successor review may fan out across three independent domains only after focused anti-drift checks, complete pre-freeze verification, and its exact source-bound gate pass.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
