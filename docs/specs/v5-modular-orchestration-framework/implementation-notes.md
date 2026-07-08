# Implementation Notes

## Status

Ready for approval.

## Work Log

- Started V5 from clean `main` after V4 was merged.
- Created branch `codex/v5-modular-orchestration-framework`.
- Reviewed current handbook, agent instructions, memory, practice register, and research snapshots before editing.
- Scanned current ecosystem sources for modular specification, orchestration, team, and lifecycle patterns.
- Selected TraceRail as the public name after light exact-name search found no obvious top-level collision.
- Added root `README.md` as the public first-read surface.
- Reviewed Astraeus and Superpowers and factored their useful patterns into `docs/framework/capability-adapters.md` without installing either tool.
- Added Rail Composition as the core primitive: `input | module | module | output`, with modules emitting artifacts, evidence, gates, and typed outcomes.
- Added file-based framework contracts and optional adapter governance instead of installing tools.
- Updated the checker so framework artifacts are required.

## Assumptions Used

- V4 approval allowed V5 to start from `main`.
- The best near-term move is a file-based framework layer that can later adopt external tools module by module.
- A future external tool must prove it reduces friction or risk before installation.

## Friction Observed

- Git branch creation required elevated permission because `.git` lock creation was denied by the sandbox.
- Updating existing files with `apply_patch` hit a Windows sandbox helper error after new-file creation succeeded, so tight PowerShell edits were used inside the workspace and then validated.
- V4 memory still described V4 as active after merge, so V5 updates active context.
- The checker remains section-oriented and cannot judge whether guidance is actually high quality.

## Design Notes

- V5 treats this repository as a framework kernel, not a framework runtime.
- Framework modules are contracts with inputs, outputs, stage hooks, verification, and failure modes.
- External tools are adapters that can be evaluated, accepted, deferred, watched, or rejected.
- Multi-agent decomposition starts from work-unit contracts, conflict zones, dependency graph, verification matrix, and integration ownership.

## Files Changed

- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `docs/ai/handbook.md`
- `docs/framework/`
- `docs/memory/`
- `docs/milestones/v5.md`
- `docs/research/practice-register.md`
- `docs/research/snapshots/2026-07-08-modular-orchestration-scan.md`
- `docs/specs/v5-modular-orchestration-framework/`
- `scripts/check-template.ps1`
