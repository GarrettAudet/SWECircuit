# Plan

## Status

Complete.

## Approach

Generate a dependency-free three-GIF documentation demo with the bundled Codex Python runtime, store only the final assets in the repository, replace the crowded single GIF with a clearer module -> rail -> platform sequence, and make the checker enforce all assets and README references.

## Work Items

1. Create `docs/assets/tracerail-module-contract.gif`, `docs/assets/tracerail-rail-flow.gif`, and `docs/assets/tracerail-platform-composition.gif`.
2. Add `docs/assets/README.md`.
3. Update `README.md` to embed the GIF sequence and route to assets.
4. Update `scripts/check-template.ps1`.
5. Update V6 milestone, PR handoff, review, and memory.
6. Run validation and commit.

## Validation Plan

- Structural checker.
- GIF metadata inspection.
- Placeholder scan.
- Non-ASCII scan.
- Git whitespace check.

## Rollback Plan

Remove the GIF sequence and asset files, restore the previous README visual if needed, and remove checker references to the assets.
