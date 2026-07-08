# Test Plan

## Status

Ready for approval.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| IDE interaction README exists. | Checker required file and manual review. |
| IDE message templates exist. | Checker required file and manual review. |
| Agent README exists. | Checker required file and manual review. |
| Agent template exists. | Checker required file and manual review. |
| Handbook includes IDE interaction and standalone agent guidance. | Checker heading enforcement. |
| `AGENTS.md` includes IDE interaction and single-agent-first rules. | Manual review. |
| Checker requires IDE and agent docs. | Review checker and successful run. |
| Memory updated. | Manual review of memory files. |
| Checker passes. | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`. |

## Automated Checks

- Unit: Not applicable.
- Integration: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Lint: ASCII and placeholder scans.

## Manual Checks

- Confirm the IDE protocol makes workflow use visible without noisy narration.
- Confirm the standalone agent template is fast to fill.
- Confirm authority boundaries are explicit.
- Confirm the handoff is auditable.
- Confirm multi-agent expansion is deferred behind the standalone baseline.

## Regression Coverage

The checker requires IDE docs, agent docs, the IDE interaction handbook section, the standalone handbook section, and milestone coverage for versioned feature packages.

## Skipped Checks

No runtime tests apply.

## Verification Evidence

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`: passed.
- `rg -n "[^\x00-\x7F]"`: no matches.
- Placeholder scan: no matches.
- `git status --short --branch`: on `codex/v4-agent-work-packages` with V4 edits pending before commit.
