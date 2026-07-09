# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| New developer can understand goal -> module -> gate -> evidence -> memory | Manual preview of `docs/assets/tracerail-concept.png` and README section review |
| V8 explains why V7 failed and how teaching order changed | `debug-notes.md`, `root-cause-analysis.md`, `implementation-notes.md`, and `review.md` |
| Checker requires concept asset and generator | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1` |
| Future agents see comprehension-first visual rule | `docs/assets/README.md`, `docs/memory/patterns.md`, `docs/memory/retrieval-index.md` |

## Automated Checks

- Unit: Not applicable.
- Integration: Template checker.
- E2E: Not applicable.
- Typecheck: Python compile for the generator.
- Lint: Placeholder and non-ASCII scans.
- Build: README asset generation command.

## Manual Checks

- Previewed `docs/assets/tracerail-concept.png` after generation.
- Checked for clipped labels, overlapping text, and concept readability.
- Reviewed README section order so the pipeline expression appears before module and rail detail.

## Regression Coverage

- Checker now requires `docs/assets/tracerail-concept.png` and the source generator.
- Asset docs and memory record that README visuals need comprehension-first review, not only polish review.

## Skipped Checks

- Live GitHub rendering is skipped until the branch is pushed; local image emission covers pre-push review.

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