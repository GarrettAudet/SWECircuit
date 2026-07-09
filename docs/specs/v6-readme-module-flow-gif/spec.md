# Feature Spec

## Status

Ready for approval.

## Problem

The README first received a single GIF, but the visual was too crowded and the optional-module connector rendered poorly. The README needs a clearer pitch-style demo sequence that explains module, rail, and platform composition in simple steps.

## Users Or Actors

- Human visitor evaluating TraceRail quickly.
- IDE or agent trying to understand rail/module composition.
- Maintainer reviewing whether V6 includes the promised visual explanation.

## Goals

- Add a tracked animated GIF sequence for module, rail, and platform composition.
- Embed the GIF sequence in `README.md` near the module composition explanation.
- Add an asset index so README visuals have an intentional home.
- Update checker and V6 traceability artifacts.

## Non-Goals

- Merge V6 to `main` without explicit approval.
- Add a runtime dependency or image-generation tool to the repo.
- Replace the written module contract.

## Requirements

- Store the GIFs under `docs/assets/`.
- Embed the GIFs with useful alt text in `README.md`.
- Add checker coverage for the asset and README embed.
- Record verification and residual branch/merge state.

## Acceptance Criteria

- [x] Given a user opens README on the V6 branch, when they reach module composition, then they see a three-part GIF demo sequence.
- [x] Given an agent validates the repo, when the checker runs, then it requires the GIF asset and embed path.
- [x] Given future contributors inspect docs assets, when they open `docs/assets/README.md`, then they see the asset purpose and update rule.
- [x] Given V6 is reviewed, when the milestone and memory are inspected, then the GIF addition is traceable.

## Architecture Impact

Adds a documentation asset and asset index. No runtime architecture, package, adapter, security, or network behavior changes.

## Risks

- Binary assets are less reviewable than Markdown.
- The GIF sequence only appears on GitHub `main` after V6 is merged.

## Open Questions

- Whether the GIF sequence should later be regenerated from a committed source script if visual iteration becomes frequent.

## Assumptions

- Generated GIFs are acceptable as tracked documentation assets.
- The current V6 branch should receive the fix before merge approval.
