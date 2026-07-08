# Plan

## Status

Complete.

## Approach

Generate a dependency-free documentation GIF with the bundled Codex Python runtime, store only the final asset in the repository, replace the README Mermaid block with the GIF embed, and make the checker enforce both the asset and README reference.

## Work Items

1. Create `docs/assets/tracerail-module-flow.gif`.
2. Add `docs/assets/README.md`.
3. Update `README.md` to embed the GIF and route to assets.
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

Remove the GIF embed and asset files, restore the Mermaid block if needed, and remove checker references to the asset.
