# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Run unresolved-placeholder scan across docs, README, AGENTS, and PR template.
- Run non-ASCII scan across docs, README, AGENTS, PR template, and scripts.
- Run `git diff --check`.

## Manual Checks

- Confirm V6 milestone names source branch, target branch, readiness, required decision, and merge action.
- Confirm V4 and V5 milestones no longer present stale ready-for-approval status.
- Confirm historical V1-V3 notes are concise and do not pretend modern branch gates existed.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| Template shows approval gate | `docs/milestones/_template.md` |
| V6 merge decision explicit | `docs/milestones/v6.md` |
| Checker requires approval gate | `scripts/check-template.ps1` and checker output |
| V4/V5 stale status fixed | `docs/milestones/v4.md`, `docs/milestones/v5.md` |
