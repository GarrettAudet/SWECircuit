# Test Plan

## Status

In progress.

## Acceptance Criteria Mapping

| Acceptance criterion | Verification |
| --- | --- |
| Product definition and one coherent visual appear first | README source and rendered first-screen review |
| Workflow is understandable from task through memory | README prose, overview asset, and alt text review |
| Checker requires the approved image | Template checker and checker-source review |
| Desktop and narrow layouts remain readable | Browser inspection at representative widths |
| V8 handoff is fully validated | Commands and evidence recorded below |

## Automated Checks

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`
- `git diff --check`
- Search for unresolved placeholders and stale active SVG references.
- Verify local Markdown links resolve.
- Verify the PNG signature, dimensions, and file size.
- Compile the supporting GIF generator to prevent unrelated asset regressions.

## Manual Checks

- Inspect the opening README story without relying on prior TraceRail knowledge.
- Confirm the approved image is unmodified and rendered at full content width.
- Inspect the README at desktop and narrow widths.
- Confirm tables, code blocks, and long link labels do not create incoherent overflow.
- Review status language so capabilities are not overstated.

## Regression Coverage

- The checker requires `docs/assets/tracerail-overview.png`.
- The checker requires the concise README section contract.
- Asset docs name the approved PNG as the public source of truth.
- Memory records that the accepted user-level story outranks internally generated alternatives.

## Skipped Checks

None planned.

## Verification Evidence

Pending final verification.
