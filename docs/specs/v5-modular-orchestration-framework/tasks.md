# Tasks

## Status

Ready for approval.

## Task List

Use this format for each task:

```txt
- [x] T001: Short action statement
  Scope: What changes.
  Verification: Test, check, review, or evidence that proves completion.
```

## Tasks

- [x] T001: Create the V5 feature package.
  Scope: Add spec, plan, tasks, test plan, implementation notes, debug notes, RCA, and review files under `docs/specs/v5-modular-orchestration-framework/`.
  Verification: Feature package has required files and acceptance criteria.

- [x] T002: Add the framework layer.
  Scope: Add framework README, registry, orchestration patterns, module template, decomposition template, adapter evaluation template, and orchestration run template.
  Verification: Checker validates framework files and headings.

- [x] T003: Promote framework rules into the operating surface.
  Scope: Update `AGENTS.md`, `docs/ai/handbook.md`, and `.github/pull_request_template.md`.
  Verification: Handbook and PR template contain framework and adapter guidance.

- [x] T004: Preserve V5 research and governance.
  Scope: Add dated research snapshot and update the practice register.
  Verification: Snapshot includes sources and decisions; practice register records accepted and optional adapters.

- [x] T005: Update durable memory and milestone.
  Scope: Update active context, decisions, patterns, glossary, history ledger, retrieval index, known issues, and `docs/milestones/v5.md`.
  Verification: Future agent can retrieve the V5 source artifacts and current branch state.

- [x] T006: Validate and review V5.
  Scope: Run checker, scan for unresolved placeholders and non-ASCII text, inspect diff, and complete review.
  Verification: Commands pass or findings are recorded.

## Dependencies

- T001 precedes all other tasks.
- T002 precedes T003 because operating-surface guidance should point to real framework artifacts.
- T004 should precede final review so sources are preserved before summaries.
- T005 follows implementation so memory points to finished artifacts.
- T006 is final before commit.

## Out Of Scope

- Installing or configuring external agent frameworks.
- Creating runtime agent teams or custom Codex agents.
- Automating conversation capture.
- Adding CI beyond the local checker.
