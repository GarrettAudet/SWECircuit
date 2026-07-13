# Identity Migration

## Status

Approved and in progress.

## Owner Decision

The owner approved **SWECircuit** as the public project identity and **Circuit** as the public composition metaphor. The scope is the project and GitHub repository name only.

No npm package, domain, CLI binary, schema namespace, or trademark acquisition is required for this decision. Those surfaces do not exist yet and remain deferred until a real V9 interface needs them.

## Executed Change

On 2026-07-13, the GitHub repository was renamed:

```txt
GarrettAudet/TraceRail -> GarrettAudet/SWECircuit
```

The local `origin` remote now targets:

```txt
https://github.com/GarrettAudet/SWECircuit.git
```

## Current-Surface Rule

Use SWECircuit in current public and canonical documentation, repository metadata, issue templates, workflow labels, and user-facing checker output.

Use Circuit for the public description of a composed workflow. `Module`, `gate`, `outcome`, `work packet`, `evidence`, `trace`, and `memory` remain stable terms.

## Compatibility Boundary

Do not mechanically rewrite historical evidence. TraceRail and DevRail remain valid names inside dated specs, milestones, decisions, research snapshots, changelog entries, and history records that describe work completed under those names.

The following identifiers remain 0.x compatibility artifacts until V9 defines and tests machine-facing migration behavior:

- `docs/rails/` and rail-named templates.
- `tracepack-*` pack identifiers and paths.
- `.tracerail/` project-local override paths.
- `tracerail-*` historical visual asset filenames.
- The historical V9 branch and feature-package path `codex/v9-devrail-kernel` and `docs/specs/v9-devrail-kernel/`.

Keeping these paths temporarily avoids a broad rename that would break source links before the executable kernel has a compatibility model. Current prose should call the composed workflow a circuit and identify rail as the 0.x file-contract term where clarification is needed.

## Remaining Work

- Replace the TraceRail-branded V8 overview image before V9 is merge-ready.
- Decide machine-facing project, CLI, schema, and local-state identifiers only when ADR 0001 and implementation require them.
- Add compatibility tests before renaming any existing path or contract field.

## Evidence

- Owner approval in the active Codex task.
- GitHub API response: repository `GarrettAudet/SWECircuit`, default branch `main`.
- GitHub About description: `SWECircuit gives AI software teams composable workflows for decomposing tasks, routing agents, verifying outputs, and preserving a full execution trace.`
- GitHub Actions run `29263645888`: `SWECircuit Checks` completed successfully for commit `1d5f82e`.
- `git ls-remote --symref origin HEAD`: `refs/heads/main` at `9f2b68d` after the remote update.
- V9 naming scan: `docs/research/snapshots/2026-07-09-v9-public-identity-scan.md`.
