# Test Plan

## Status

Ready for approval.

## Verification Matrix

| Acceptance Criterion | Evidence |
| --- | --- |
| Rail catalog exists. | `docs/rails/README.md` and standard rail files. |
| Module catalog exists. | `docs/modules/README.md` and module files. |
| Best-in-class repos map to modules or optional adapters. | `docs/modules/superpowers-transition.md`, `docs/modules/astraeus-orchestration-compiler.md`, `docs/modules/spec-kit-adapter.md`, `docs/modules/retrieval-adapters.md`, `docs/modules/memory-adapters.md`. |
| Community extension model exists. | `docs/packs/README.md`, `_pack-template.md`, `pack-lifecycle.md`, `conformance.md`. |
| Checker validates V6. | `scripts/check-template.ps1` required files and heading checks. |

## Commands

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

- Run unresolved-placeholder scans across docs, README, AGENTS, and PR template.

```powershell
rg -n "[^\x00-\x7F]" docs README.md AGENTS.md .github\pull_request_template.md scripts
```

```powershell
git diff --check
```

## Manual Review

- Confirm core TraceRail remains small.
- Confirm rails and modules share one common interface.
- Confirm external repos are optional packs or adapters, not hidden dependencies.
- Confirm pack lifecycle supports community contribution without weakening core.

## Skipped Checks

No runtime tests are relevant because V6 changes documentation and checker coverage only.
