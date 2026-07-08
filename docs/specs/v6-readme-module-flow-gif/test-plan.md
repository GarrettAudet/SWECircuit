# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Inspect GIF metadata with Pillow: size and frame count.
- Run unresolved-placeholder scan.
- Run non-ASCII scan.
- Run `git diff --check`.

## Manual Checks

- Confirm README embeds `docs/assets/tracerail-module-flow.gif`.
- Confirm the asset has a clear home in `docs/assets/README.md`.
- Confirm V6 is still on the version branch and not merged to `main` without approval.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| README GIF visible on V6 branch | `README.md` image embed |
| Checker requires asset and embed | `scripts/check-template.ps1` |
| Asset governance exists | `docs/assets/README.md` |
| Traceability complete | V6 milestone, PR body, review, memory |
