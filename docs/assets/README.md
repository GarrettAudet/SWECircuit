# Assets

## Purpose

This folder stores visual assets used by the public README and documentation. Assets should clarify TraceRail concepts without becoming a second source of workflow truth.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `tracerail-module-contract.gif` | `README.md` | Animated pitch-style demo of the five-part module contract: input, action, output, gate, and outcome. |
| `tracerail-rail-flow.gif` | `README.md` | Animated demo of modules composing into a rail with typed outcomes and clean routing. |
| `tracerail-platform-composition.gif` | `README.md` | Animated demo of modules, rails, packs, adapters, memory, and agents composing into a modular platform. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source generator for the README GIF sequence. |

## Source

The README demo GIFs are generated from `source/generate-readme-demo-gifs.py` with the bundled Codex Python runtime and Pillow. The tracked GIFs are the public artifacts; the source generator exists so future edits can preserve typography, spacing, palette, and TraceRail's module -> rail -> platform story.

## Visual Standard

- Use large labels that remain readable when GitHub scales the image.
- Keep diagrams focused on one concept per asset.
- Prefer straight connectors and simple routing over decorative motion.
- Use a restrained professional palette with strong contrast in GitHub dark mode.
- Preserve exact text through deterministic rendering when labels matter.

## Update Rule

When an asset changes, update the README or documentation that embeds it, preserve the source reason in the relevant feature package, regenerate from source when available, inspect representative frames, and run the template checker before committing.
