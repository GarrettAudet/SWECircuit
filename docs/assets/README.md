# Assets

## Purpose

This folder stores visual assets used by the public README and documentation. Assets should clarify TraceRail concepts without becoming a second source of workflow truth.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `tracerail-core-rail.svg` | `README.md` | Primary SVG concept visual for the TraceRail model: goal, spec, rail, gates, evidence, and memory as linked components. |
| `tracerail-module-contract.gif` | Supporting docs | Generated supporting demo of a goal becoming a traceable work package. |
| `tracerail-rail-flow.gif` | Supporting docs | Generated supporting demo of gates routing pass, fix, diagnose, and clarify outcomes. |
| `tracerail-platform-composition.gif` | Supporting docs | Generated supporting demo of bounded work units scaling into integration ownership. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source generator for the supporting GIF sequence. |

## Source

The primary README concept visual is a deterministic SVG asset. The supporting GIFs are generated from `source/generate-readme-demo-gifs.py` with the bundled Codex Python runtime and Pillow. The SVG is the source of truth for the public concept pitch; the GIF generator exists only for supporting examples.

## Visual Standard

- Optimize for comprehension before polish, animation, or framework vocabulary.
- Use a simple memorable metaphor for the repo concept before showing implementation detail.
- Lead with the user-level story before showing internal module, rail, pack, or adapter detail.
- Use large labels that remain readable when GitHub scales the image.
- Keep diagrams focused on one concept per asset.
- Prefer simple source-controlled SVG for the primary README concept visual.
- Use a restrained professional palette with strong contrast in GitHub dark mode.
- Preserve exact text through deterministic rendering when labels matter.

## Update Rule

When an asset changes, update the README or documentation that embeds it, preserve the source reason in the relevant feature package, inspect the public visual output, and run the template checker before committing.
