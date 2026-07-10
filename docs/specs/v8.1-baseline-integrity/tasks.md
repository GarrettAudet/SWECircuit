# Tasks

## Status

Complete.

## Task List

- [x] T001: Create V8.1 source and orchestration contracts.
  Scope: Feature package, decomposition plan, and run record.
  Verification: Required artifacts existed before worker fan-out.
- [x] T002: Normalize module, rail, and outcome contracts.
  Scope: Framework module template, module catalog, rail catalog entries, and outcome drift.
  Verification: Contract audit, canonical-outcome validation, and checker pass.
- [x] T003: Harden structural and semantic validation.
  Scope: Debug-note logic, dynamic pack discovery, decimal milestones, dynamic module and rail discovery, outcome values, and memory provenance.
  Verification: Positive checker plus fourteen negative fixtures.
- [x] T004: Add memory provenance.
  Scope: Decision sources, pattern source map, and handbook guidance.
  Verification: 28 decision rows and 36 named patterns have source coverage; representative links resolve.
- [x] T005: Align public positioning.
  Scope: README current-state and target-model language.
  Verification: Public claim review against actual capabilities.
- [x] T006: Integrate and verify write-enabled fan-out.
  Scope: Worker handoffs, failures, conflict review, checker, regression suite, scans, and CI.
  Verification: Orchestration run records changed files, two successful handoffs, two failed attempts, central recovery, and integrated evidence.
- [x] T007: Complete review, memory, and milestone.
  Scope: V8.1 review, active context, history, retrieval, known issues, failed attempts, and milestone.
  Verification: Approval gate is explicit and checker passes.

## Tasks

Tasks map directly to the acceptance criteria and worker contracts in decomposition-plan.md.

## Dependencies

T002, T003, and T004 ran in parallel after T001. T005 remained with the integration owner. T006 integrated every result. T007 followed verification.

## Out Of Scope

- V9 executable kernel.
- Runtime provider integrations.
- Automatic merging.
- Implicit license selection.
