# Feature Spec

## Status

Complete.

## Problem

The README demo GIF sequence explains the right module -> rail -> platform story, but the current visuals are not clear enough for a professional public repository. Text is small, the palette feels inconsistent, and the diagrams do not look like a polished framework demo.

## Users Or Actors

- New developers evaluating TraceRail from the GitHub README.
- The project owner pitching TraceRail to other developers.
- Future agents updating README assets.

## Goals

- Replace the README demo GIFs with a more professional, readable visual system.
- Keep the same three-part story: module contract, rail composition, and platform expansion.
- Preserve stable README asset paths so existing embeds continue to work.
- Record visual design rules that future agents can follow.

## Non-Goals

- Add a runtime, web app, or external design dependency.
- Change TraceRail's workflow semantics.
- Install external tools or image generation packages.
- Replace the README with a marketing site.

## Requirements

- The GIFs must use a cohesive, professional theme with strong contrast in GitHub dark mode.
- The GIFs must use larger, simpler text and avoid crowded labels.
- The rail GIF must make module insertion and gate outcomes obvious without awkward diagonal connectors.
- The platform GIF must show modules, rails, packs, adapters, agents, and memory as composable layers without visual clutter.
- The README must continue embedding all three tracked assets from `docs/assets/`.
- The source reason, implementation notes, verification evidence, and memory pointers must be recorded.

## Acceptance Criteria

- [x] Given a user opens the README in GitHub dark mode, when they reach the demo sequence, then the visuals read as polished, high-contrast, and professional.
- [x] Given a user scans the three GIFs, when they move from part 1 to part 3, then they can understand module contract -> rail composition -> platform expansion without reading dense labels.
- [x] Given an agent validates the repo, when the checker runs, then it still requires and verifies all README demo GIF embeds.
- [x] Given future contributors inspect the V7 feature package and memory, when they need to update the assets, then they can find the reason, design constraints, verification evidence, and asset paths.

## Architecture Impact

No architecture, data, API, security boundary, runtime dependency, or cross-module contract changes. This is documentation asset polish within the existing TraceRail asset governance.

## Risks

- Binary GIFs are harder to review than Markdown.
- Text-heavy GIFs can still become blurry after GIF palette compression.
- Asset polish can drift into excessive marketing if not constrained by the README's educational purpose.

## Open Questions

- Whether future iterations should promote the asset generator into a broader visual asset standard if README visuals continue changing frequently.

## Assumptions

- The best implementation is deterministic raster rendering with Pillow rather than model-generated text, because the imagegen skill guidance recommends code-native output for simple diagrams and exact text.
- Replacing assets in place is acceptable because the README filenames are already checker-enforced and should stay stable.
