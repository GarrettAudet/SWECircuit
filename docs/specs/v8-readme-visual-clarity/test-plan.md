# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| New developer can understand goal -> spec -> rail -> gates -> evidence -> memory | Browser preview of `docs/assets/tracerail-core-rail.svg` and README section review |
| V8 explains why generated visuals failed and how the SVG changes the teaching pattern | `debug-notes.md`, `root-cause-analysis.md`, `implementation-notes.md`, and `review.md` |
| Checker requires SVG asset and supporting generator | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1` |
| Future agents see simple repo-concept visual rule | `docs/assets/README.md`, `docs/memory/patterns.md`, `docs/memory/retrieval-index.md` |

## Automated Checks

- Unit: Not applicable.
- Integration: Template checker.
- E2E: Not applicable.
- Typecheck: Python compile for the supporting GIF generator.
- Lint: Placeholder and non-ASCII scans for changed docs/source.
- Build: Supporting GIF generation command.

## Manual Checks

- Rendered `docs/assets/tracerail-core-rail.svg` through a browser preview.
- Checked for clipped labels, overlapping text, and concept readability.
- Reviewed README section order so the linked-component expression appears before module and rail detail.
- Checked that the visual is unique to TraceRail and does not copy the reference image.

## Regression Coverage

- Checker now requires `docs/assets/tracerail-core-rail.svg` and the source generator.
- Asset docs and memory record that README visuals need simple repo-concept review, not only deterministic generation or diagram polish.

## Skipped Checks

- Live GitHub rendering is skipped until the branch is pushed; local browser preview covers pre-push review.

## Verification Evidence

Passed locally:

```powershell
& "C:\Users\garre\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m py_compile docs\assets\source\generate-readme-demo-gifs.py
& "C:\Users\garre\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" docs\assets\source\generate-readme-demo-gifs.py
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
rg placeholder markers in changed docs and memory
rg non-ASCII characters in changed docs, source, and checker
git diff --check
```