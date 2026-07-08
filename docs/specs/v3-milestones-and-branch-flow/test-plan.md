# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| Milestone README exists. | Checker required file. |
| Milestone template exists. | Checker required file. |
| V1/V2/V3 summaries exist. | Manual review and file listing. |
| Handbook includes edit state, milestones, and branch workflow. | Checker heading enforcement. |
| `AGENTS.md` includes milestone and branch rules. | Manual review. |
| PR template includes milestone and branch/merge prompts. | Checker required phrases. |
| Checker requires milestone docs and headings. | Review `scripts/check-template.ps1`; successful checker run. |
| Template checker passes. | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`. |

## Automated Checks

- Unit: Not applicable.
- Integration: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- E2E: Not applicable.
- Typecheck: Not applicable.
- Lint: ASCII scan with `rg -n "[^\x00-\x7F]"`.
- Build: Not applicable.

## Manual Checks

- Confirm milestone summaries are short and progress-focused.
- Confirm branch workflow handles the bootstrap no-commit state.
- Confirm final version overview can be derived directly from the milestone file.

## Regression Coverage

The checker now requires milestone README/template and the new handbook sections.

## Skipped Checks

No git merge or branch creation was performed because the repo has no initial committed baseline yet.

## Verification Evidence

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`: passed.
- `rg -n "[^\x00-\x7F]"`: no matches.
- `git status --short --branch`: shows no commits yet on `master` with workflow files untracked.
