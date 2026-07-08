# Tasks

## Status

Complete.

## Task List

Each task includes a verification mapping.

## Tasks

- [x] T001: Create the V3 feature package.
  Scope: Add complete V3 spec, plan, tasks, test plan, notes, RCA, and review files.
  Verification: Feature package passes checker requirements.

- [x] T002: Add milestone artifacts.
  Scope: Add milestone README, template, and V1/V2/V3 milestone summaries.
  Verification: Checker requires milestone README/template; manual review confirms summaries exist.

- [x] T003: Add edit-state and branch policy to core docs.
  Scope: Update handbook and `AGENTS.md` with desired edit state, milestone closeout, and branch/merge workflow.
  Verification: Checker requires new handbook headings; manual review of `AGENTS.md`.

- [x] T004: Update review and validation surfaces.
  Scope: Update PR template and checker.
  Verification: Checker verifies required PR phrases and files.

- [x] T005: Update memory and governance.
  Scope: Update active context, decisions, patterns, glossary, history ledger, retrieval index, and practice register.
  Verification: Manual review confirms durable rules and source links are present.

- [x] T006: Validate.
  Scope: Run checker, ASCII scan, and git status.
  Verification: Commands pass or results are recorded.

## Dependencies

- T001 precedes memory/review updates.
- T002 and T003 must agree on milestone meaning.
- T004 runs after T002/T003 define the required surfaces.
- T006 runs last.

## Out Of Scope

- Committing or merging without explicit approval.
- Remote push or PR creation.
- Creating a branch before the initial baseline commit exists.
