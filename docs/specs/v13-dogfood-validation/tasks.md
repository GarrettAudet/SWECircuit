# Tasks

## Status

Complete.

## Task List

- [x] T001: Close product scope, acceptance criteria, architecture, and module interfaces.
  Scope: Create the feature package and stable application contract.
  Verification: AC1-AC9 and all module boundaries are explicit in `spec.md` and
  `app-contract.md`.
- [x] T002: Compile, render, approve, and verify the V12 specialist package.
  Scope: Produce the exact task roster and initial immutable run session.
  Verification: AC7 has package-verifier evidence bound to both expected digests.
- [x] T003: Run the domain and UI specialists in the first dependency-safe wave.
  Scope: Produce disjoint domain/test and semantic HTML/CSS outputs.
  Verification: AC1-AC6 have exact raw root handoffs accepted by the run session.
- [x] T004: Integrate root outputs and run the dependent application specialist.
  Scope: Add controller, example metadata, and combined verification support.
  Verification: AC1-AC6 work from the integrated application without scope conflicts.
- [x] T005: Run automated and browser verification.
  Scope: Execute Node tests and complete the manual browser matrix.
  Verification: AC1-AC6 have command output and browser evidence.
- [x] T006: Run the independent application reviewer and route its outcome.
  Scope: Review product correctness, accessibility, scope, and orchestration evidence.
  Verification: AC8 has an exact verified independent handoff with no unresolved material finding.
- [x] T007: Verify complete V12 handoff fan-in and integration readiness.
  Scope: Record all exact handoffs and inspect the final immutable session.
  Verification: AC7 has `integrationReady: true` and a `pass` specialist outcome.
- [x] T008: Record dogfood performance, friction, memory, and completion review.
  Scope: Finish implementation notes, review, milestone, and durable memory.
  Verification: AC9 reports observed timing, interventions, conflicts, failures, and next changes.

## Dependencies

T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008.

## Out Of Scope

Native pinned IDE UI, backend services, deployment, and V12 kernel changes.
