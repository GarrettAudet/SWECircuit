# Feature Spec: V8.2 SWECircuit Identity

## Status

Ready for merge.

## Problem

The GitHub repository has been renamed to SWECircuit, but the stable `main` branch still presents the historical TraceRail identity. Merging unfinished V9 work would violate the version gate, while leaving `main` stale makes the public repository contradictory.

## Users Or Actors

- Developers opening the public GitHub repository.
- IDE and CI agents reading current instructions and metadata.
- Maintainers continuing V9 on an isolated branch.

## Goals

- Make the stable public surface consistently use SWECircuit.
- Adopt Circuit Composition in current prose while preserving 0.x rail paths as compatibility aliases.
- Keep historical artifacts source-valid.
- Enforce the new README heading and repository URL with regression coverage.
- Merge only this approved identity slice to `main`.

## Non-Goals

- Merging unfinished V9 architecture or executable-kernel work.
- Reserving an npm package, domain, CLI binary, or schema namespace.
- Renaming historical specs, milestones, snapshots, pack IDs, local-state paths, or visual filenames.
- Replacing the primary V8 overview image in this slice.

## Requirements

- README, AGENTS, handbook, repository metadata, support docs, templates, checker output, and current framework guidance use SWECircuit.
- Circuit is the public composition term.
- `docs/rails/`, rail-named templates, `tracepack-*`, `.tracerail/`, and `tracerail-*` assets remain explicit 0.x compatibility artifacts.
- The GitHub repository and origin target `GarrettAudet/SWECircuit`.
- Historical TraceRail and DevRail evidence remains unchanged.
- The checker rejects a legacy README heading and retired GitHub URL.

## Acceptance Criteria

- [x] AC1: The GitHub repository and local origin use `GarrettAudet/SWECircuit`.
- [x] AC2: Current public and canonical text uses SWECircuit and Circuit Composition.
- [x] AC3: Historical records and 0.x compatibility identifiers remain source-valid.
- [x] AC4: The positive checker and all seventeen regression cases pass locally.
- [x] AC5: The branch is isolated from unfinished V9 implementation work.
- [x] AC6: A development milestone records verification, residual risk, approval, and merge action.

## Architecture Impact

No runtime architecture changes. This is a current-surface and compatibility-vocabulary migration only.

## Open Questions

None. The owner approved SWECircuit and clarified that only the repository identity is in scope.

## Assumptions

- The owner approval authorizes merge of this bounded identity slice.
- The historical primary overview PNG can remain a documented residual risk for V9 replacement.
