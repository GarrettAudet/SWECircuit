# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Run unresolved-placeholder scan across docs, README, AGENTS, and PR template.
- Run non-ASCII scan across docs, README, AGENTS, PR template, and scripts.
- Run `git diff --check`.

## Manual Checks

- Confirm each subagent had a bounded scope, read-only authority, evidence requirements, and stop conditions.
- Confirm handoffs are recorded in `orchestration-run.md`.
- Confirm integration notes distinguish applied fixes from follow-ups.
- Confirm the run does not mark the pack recommended.
- Confirm V6 approval gate remains unmerged.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| Decomposition plan exists | `decomposition-plan.md` |
| Handoffs captured | `orchestration-run.md` |
| Findings handled | `review.md`, implementation notes, or follow-up records |
| Validation complete | Final review evidence |
| Memory retrievable | History ledger and retrieval index entries |
