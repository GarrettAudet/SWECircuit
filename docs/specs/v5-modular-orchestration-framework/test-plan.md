# Test Plan

## Status

Ready for approval.

## Verification Matrix

| Acceptance Criterion | Evidence |
| --- | --- |
| Root README names and explains the system. | `README.md` includes TraceRail purpose, quick start, repository map, scale model, adapter policy, and status. |
| Superpowers and Astraeus capabilities are factored into framework contracts. | `docs/framework/capability-adapters.md`, `docs/framework/module-registry.md`, `docs/research/snapshots/2026-07-08-capability-adapter-scan.md`, and `docs/research/practice-register.md`. |
| Adapter path exists before installation. | `docs/framework/_adapter-evaluation-template.md`, `docs/framework/module-registry.md`, `AGENTS.md`, handbook updates. |
| Goal decomposition has a work-unit template. | `docs/framework/_decomposition-plan-template.md` and `docs/framework/_orchestration-run-template.md`. |
| Agents see file-based contracts before tools. | `AGENTS.md` Modular Framework Rule and Tool Policy. |
| Checker validates framework docs. | `scripts/check-template.ps1` framework required-file and heading checks. |
| Research is auditable. | `docs/research/snapshots/2026-07-08-modular-orchestration-scan.md` and practice-register updates. |

## Commands

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

- Run the unresolved-placeholder scan across docs, `AGENTS.md`, and the PR template.

```powershell
rg -n "[^\x00-\x7F]" docs AGENTS.md .github\pull_request_template.md scripts
```

```powershell
git diff --check
```

## Manual Review

- Confirm the root README gives a clear first-read experience.
- Confirm the V5 framework keeps single-agent workflow as the default.
- Confirm optional external tools are represented as adapters rather than dependencies.
- Confirm Superpowers maps to skills-driven development transition and Astraeus maps to orchestration compiler.
- Confirm the decomposition template supports large-scale agent fan-out and fan-in.
- Confirm milestone and memory point future agents to V5 source artifacts.

## Skipped Checks

No runtime tests are relevant because V5 changes documentation and the template checker only.
