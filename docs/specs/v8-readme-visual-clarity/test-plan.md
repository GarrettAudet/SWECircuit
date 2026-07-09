# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance criterion | Verification |
| --- | --- |
| Product definition and one coherent visual appear first | GitHub-rendered README DOM and first-section review |
| Workflow is understandable from task through memory | README prose, approved overview, alt text, and core-contract review |
| Checker requires the approved image | Template checker and checker-source review |
| Desktop and narrow layouts remain usable | GitHub render metrics at 1280 x 720 and 390 x 844 |
| V8 handoff is fully validated | Commands and evidence below |

## Automated Checks

Passed:

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`
- `git diff --check`
- Local Markdown link resolution.
- Unresolved placeholder and non-ASCII scans.
- Stale active visual-reference scan.
- Bundled Python compile for `docs/assets/source/generate-readme-demo-gifs.py`.
- SHA-256 comparison of source and repository PNG.

## Manual Checks

Passed:

- Confirmed the GitHub branch renders the expected title, positioning, overview, workflow, contracts, quick start, repository guide, principles, and status.
- Confirmed the overview loads at its natural 1672 x 941 resolution and is linked to the full-resolution asset.
- At 1280 x 720, the article is 862 px wide, the image renders at 862 x 485, tables fit, and the document has no horizontal overflow.
- At 390 x 844, the article and image render at 325 px wide, tables fit, the document has no horizontal overflow, and long code lines scroll inside their own blocks.
- Confirmed the tracked PNG is byte-for-byte identical to the supplied file.

## Regression Coverage

- The checker requires `docs/assets/tracerail-overview.png`.
- The checker requires the concise README section contract.
- Asset docs name the approved PNG as the public source of truth.
- Memory records that an accepted owner asset outranks internally generated substitutes.

## Skipped Checks

The in-app browser screenshot command timed out, so no new screenshot artifact was saved. The live GitHub DOM, image load state, natural dimensions, rendered geometry, overflow behavior, and content structure were verified directly.

## Verification Evidence

- Template checker: pass.
- Diff whitespace: pass.
- README local links: pass.
- Content scans: pass.
- Stale-reference scan: pass.
- Supporting generator compile: pass.
- Image SHA-256: `15932DD187FE90B68FBC706E887E639EC0ABE0B9D4E92F49CA0654F857AAD826` for both source and tracked copy.
- GitHub branch render: pass at desktop and narrow widths.
