# Tasks

## Status

Complete.

## Task List

Each task includes a verification mapping.

## Tasks

- [x] T001: Create the V2 feature package.
  Scope: Add complete spec, plan, tasks, test plan, implementation notes, debug notes, RCA, and review files for V2.
  Verification: `docs/specs/v2-dogfood-parallel-agents/` contains all required files and passes `scripts/check-template.ps1`.

- [x] T002: Add dogfooding, traceability, memory, and parallel work rules to the agent entrypoint.
  Scope: Update `AGENTS.md` with operating invariants, the version dogfooding rule, traceability/memory rule, and parallel work rule.
  Verification: Manual review confirms future agents see these rules before implementation guidance.

- [x] T003: Add V2 operating guidance to the handbook.
  Scope: Document design invariants, traceability and memory architecture, version dogfooding, parallelization readiness, work-unit contracts, integration ownership, and bug-loop handling.
  Verification: `scripts/check-template.ps1` checks the new handbook headings.

- [x] T004: Add source-preserving memory scaffolding.
  Scope: Add `history-ledger.md` and `retrieval-index.md`, and update active context, decisions, known issues, failed attempts, patterns, and glossary.
  Verification: Checker requires the new files; manual review confirms source pointers exist.

- [x] T005: Update practice governance and research snapshot.
  Scope: Update practice register and add dated parallel-agent/memory research snapshot.
  Verification: Manual review confirms accepted, optional, watch, and deferred practices are recorded.

- [x] T006: Validate the workflow template.
  Scope: Run the template checker and ASCII scan.
  Verification: Commands pass or failures are recorded with follow-up.

## Dependencies

- T001 precedes the other tasks because V1 uses feature packages as the unit of work.
- T002 and T003 should be consistent with each other.
- T004 should reflect the durable outcome of T002 and T003.
- T005 should justify promoted V2 practices.
- T006 runs after all docs and checker changes.

## Out Of Scope

- Installing agent frameworks.
- Installing memory frameworks.
- Creating project-specific `.codex/agents/` files.
- Adding CI integration.
- Benchmarking subagent performance on a production codebase.
