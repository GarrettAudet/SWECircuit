# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Run unresolved-placeholder scan across docs, README, AGENTS, and PR template.
- Run non-ASCII scan across docs, README, AGENTS, PR template, and scripts.
- Run `git diff --check`.

## Manual Checks

- Confirm checker has `Get-MarkdownSection`, `Test-SectionContains`, and `Test-PackConformance` helpers.
- Confirm checker validates the current official pack README.
- Confirm conformance docs say checker coverage does not replace review.
- Confirm memory and milestone artifacts point to this source package.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| Missing required field fails | `Test-PackConformance` required-term checks in `scripts/check-template.ps1` |
| Current official pack passes | Checker output |
| Checker coverage documented | `docs/packs/conformance.md` |
| Memory retrieval exists | `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md` |
