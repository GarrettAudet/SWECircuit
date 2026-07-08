# Tasks

## Status

Complete.

## Task List

Each task includes a verification mapping.

## Tasks

- [x] T001: Add IDE interaction docs.
  Scope: Create `docs/ide/README.md` and `docs/ide/_message-templates.md` for visible IDE-user workflow interaction.
  Verification: Files exist and checker requires their headings.

- [x] T002: Add standalone agent docs.
  Scope: Create `docs/agents/README.md` and `docs/agents/_template.md` for single-agent/IDE execution.
  Verification: Files exist and contain required contract sections.

- [x] T003: Add single-agent-first core guidance.
  Scope: Update handbook and `AGENTS.md` with standalone baseline rules.
  Verification: Checker requires the new handbook section; manual review confirms entrypoint rule.

- [x] T004: Update validation.
  Scope: Update `scripts/check-template.ps1` to require agent docs and headings.
  Verification: Checker passes.

- [x] T005: Update memory.
  Scope: Update active context, decisions, patterns, glossary, and retrieval index.
  Verification: Memory links back to this V4 feature package.

- [x] T006: Review and validate.
  Scope: Complete review, run checker, scans, and git status.
  Verification: Evidence recorded in `test-plan.md` and `review.md`.

## Dependencies

- T001 before T003/T004 because interaction must be visible in core docs.
- T002 before T003/T004.
- T005 after all edits.

## Out Of Scope

- Installing subagent tooling.
- Creating role-specific custom agents.
- Designing multi-agent orchestration beyond future extension notes.
- Merging V4 to `main` before approval.



