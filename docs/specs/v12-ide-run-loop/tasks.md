# Tasks

## Status

T003 in progress.

## Task List

- [x] T001: Create the V12 branch and feature package from released V11.1.
  Verification: branch parent and active artifacts identify `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`.
- [x] T002: Compile the architecture work through V11.1.
  Verification: reviewed GoalContract, serial baseline, selected partition, compilation digest, package digest, and verified package are preserved.
- [ ] T003: Execute and verify architecture specialists.
  Verification: exact raw handoffs verify; architecture integration has complete transitive `pass` fan-in.
- [ ] T004: Freeze the V12 ADR and implementation contract.
  Verification: product, lifecycle, authority, API, and test obligations map to AC1-AC9 with no blocking decision.
- [ ] T005: Compile and implement disjoint V12 work units.
  Verification: every code or documentation change maps to an exact task-shaped contract and handoff.
- [ ] T006: Run integrated verification and independent review.
  Verification: focused tests, canonical gate, package consumer, checker matrix, dogfood, and reviewer evidence pass.
- [ ] T007: Close memory, milestone, publication, and owner merge gate.
  Verification: exact candidate, CI, residual risks, and user-facing overview are preserved.

## Parallelization

T003 runs three read-only architecture analyses in parallel and one dependent synthesis. T005 will be decomposed only after T004 freezes boundaries and conflict zones.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.
