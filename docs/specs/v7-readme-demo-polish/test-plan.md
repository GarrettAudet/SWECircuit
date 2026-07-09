# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| README visuals are polished, high-contrast, and professional | Manual visual inspection of generated GIF final frames emitted through the local runtime |
| Three GIFs explain module contract -> rail composition -> platform expansion | Manual README and asset review |
| Checker still requires all GIF embeds | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1` |
| V7 source reason and memory pointers are findable | Review `docs/specs/v7-readme-demo-polish/`, `docs/milestones/v7.md`, `docs/memory/history-ledger.md`, and `docs/memory/retrieval-index.md` |

## Automated Checks

- Unit: Not applicable; no code runtime is changed.
- Integration: Template checker validates required docs, assets, embeds, source generator presence, and feature packages.
- E2E: Not applicable; README rendering is manually inspected through generated frames.
- Typecheck: Python compile check for `docs/assets/source/generate-readme-demo-gifs.py`.
- Lint: Placeholder and non-ASCII scans.
- Build: GIF generation command.

## Manual Checks

- Inspected generated GIF metadata for dimensions and frame counts.
- Exported representative frames and inspected them for text clarity, layout spacing, and palette.
- Reviewed README image embeds and surrounding copy.

## Regression Coverage

- The checker continues to require the three README demo assets and README embed paths.
- The checker now requires the deterministic README demo GIF source generator.
- The V7 feature package records that README visual assets should prioritize readability over dense diagramming.

## Skipped Checks

- Live GitHub preview is skipped because this branch is local until approval and push; local frame inspection covers the changed assets.

## Verification Evidence

- GIF generation: `python docs\assets\source\generate-readme-demo-gifs.py` passed and regenerated all three assets.
- Metadata: module contract `1440x810`, `5` frames; rail flow `1440x810`, `5` frames; platform composition `1440x810`, `4` frames.
- Visual inspection: representative final frames were emitted in-session and reviewed after one layout fix for rail outcome overlap and platform stack spacing.
- Python compile: `python -m py_compile docs\assets\source\generate-readme-demo-gifs.py` passed.
- Template checker: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1` passed.
- Placeholder scan excluding the checker: no unresolved authoring placeholders found.
- Non-ASCII scan: no matches.
- Git whitespace check: `git diff --check` passed; Git reported expected LF normalization warnings for touched Markdown files.
