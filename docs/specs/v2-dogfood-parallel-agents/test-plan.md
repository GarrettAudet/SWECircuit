# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| `AGENTS.md` includes operating invariants, version dogfooding, traceability/memory, and parallel work rules. | Manual review and repository diff. |
| Handbook documents V2 operating concepts. | Manual review and checker heading enforcement. |
| V2 feature package exists. | `scripts/check-template.ps1` required feature package checks. |
| Memory records durable V2 rules and source-preserving scaffolding. | Manual review of `docs/memory/`; checker required files. |
| Practice register records accepted V2 practices. | Manual review of `docs/research/practice-register.md`. |
| Research snapshot records current ecosystem scan. | Manual review of `docs/research/snapshots/2026-07-08-parallel-agent-and-memory-scan.md`. |
| Checker covers new sections and memory files. | Review of `scripts/check-template.ps1`; successful checker run. |
| Template checker passes. | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`. |

## Automated Checks

- Unit: Not applicable; documentation template only.
- Integration: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- E2E: Not applicable in V2.
- Typecheck: Not applicable.
- Lint: ASCII scan with `rg -n "[^\x00-\x7F]"`.
- Build: Not applicable.

## Manual Checks

- Confirm V2 used V1's feature package workflow.
- Confirm simplicity, traceability, and source-preserving memory are visible in the handbook and `AGENTS.md`.
- Confirm parallel-agent guidance is understandable without installing any tool.
- Confirm repeated bug handling routes to diagnosis before more patching.
- Confirm the work-unit contract is specific enough for a subagent handoff.

## Regression Coverage

The checker now requires the handbook to retain `Design Invariants`, `Traceability And Memory Architecture`, `Version Dogfooding`, and `Parallel Agent Development` sections, and requires the history ledger and retrieval index files.

## Skipped Checks

No CI check was added because V2 intentionally stays local and file-based.

## Verification Evidence

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`: passed.
- `rg -n "[^\x00-\x7F]"`: no matches.
