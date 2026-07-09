# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Inspect GIF metadata with Pillow: size and frame count for all three assets.
- Run unresolved-placeholder scan.
- Run non-ASCII scan.
- Run `git diff --check`.

## Manual Checks

- Confirm README embeds all three GIFs.
- Confirm the asset has a clear home in `docs/assets/README.md`.
- Confirm V6 is still on the version branch and not merged to `main` without approval.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| README GIF sequence visible on V6 branch | `README.md` image embeds |
| Checker requires assets and embeds | `scripts/check-template.ps1` |
| Asset governance exists | `docs/assets/README.md` |
| Traceability complete | V6 milestone, PR body, review, memory |
