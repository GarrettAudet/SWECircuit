# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Run unresolved-placeholder scan across docs, README, AGENTS, GitHub templates, and governance files.
- Run non-ASCII scan across docs, README, AGENTS, scripts, GitHub templates, and governance files.
- Run `git diff --check`.

## Manual Checks

- Confirm root files are concise and public-facing.
- Confirm README and docs index route users clearly.
- Confirm checker requires the new professional surface.
- Confirm no license was selected without owner approval.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| Root governance files present | Root files and checker required list |
| Docs navigation present | `docs/README.md` |
| Checker enforces artifacts | `scripts/check-template.ps1` |
| GitHub review surfaces present | `.github/ISSUE_TEMPLATE/`, `.github/workflows/template-check.yml` |
| Traceability complete | V6 milestone, PR body, memory, retrieval index |
