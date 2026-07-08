# Test Plan

## Status

Complete.

## Structural Checks

- Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
- Run unresolved-placeholder scan across docs, README, AGENTS, and PR template. Exclude the checker because it intentionally contains placeholder pattern literals.
- Run non-ASCII scan across docs, README, AGENTS, PR template, and scripts.
- Run `git diff --check`.

## Manual Checks

- Confirm the pack is optional and dependency-free.
- Confirm official status is not presented as recommended status.
- Confirm the pack preserves single-agent default and integration-owner control.
- Confirm the example shows bounded fan-out rather than vague parallel work.
- Confirm memory and retrieval pointers preserve source artifacts.

## Acceptance Mapping

| Acceptance Criterion | Evidence |
| --- | --- |
| Official pack discoverable | `docs/packs/README.md` and `docs/packs/official/README.md` |
| Fan-out contract visible | `docs/packs/official/tracepack-orchestration-readiness/README.md` |
| Checker validates files | `scripts/check-template.ps1` and checker output |
| Not recommended yet | Pack status and recommendation evidence section |
| Copyable pack example | Pack example and source feature package |
