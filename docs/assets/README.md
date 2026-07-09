# Assets

## Purpose

This folder stores visual assets used by the public README and documentation. Assets should clarify TraceRail concepts without becoming a second source of workflow truth.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `tracerail-concept.png` | `README.md` | Primary static concept visual for the TraceRail model: goal, module, gate, evidence, memory, rail extension, and bounded subagent scale. |
| `tracerail-module-contract.gif` | Supporting docs | Generated supporting demo of a goal becoming a traceable work package. |
| `tracerail-rail-flow.gif` | Supporting docs | Generated supporting demo of gates routing pass, fix, diagnose, and clarify outcomes. |
| `tracerail-platform-composition.gif` | Supporting docs | Generated supporting demo of bounded work units scaling into integration ownership. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source generator for the README concept PNG and supporting GIF sequence. |

## Source

The README visual assets are generated from `source/generate-readme-demo-gifs.py` with the bundled Codex Python runtime and Pillow. The tracked PNG and GIFs are public artifacts; the source generator exists so future edits can preserve typography, spacing, palette, and TraceRail's goal -> module -> gate -> evidence -> memory story.

## Visual Standard

- Optimize for comprehension before polish, animation, or framework vocabulary.
- Lead with the user-level story before showing internal module, rail, pack, or adapter detail.
- Use large labels that remain readable when GitHub scales the image.
- Keep diagrams focused on one concept per asset.
- Prefer straight connectors and simple routing over decorative motion.
- Use a restrained professional palette with strong contrast in GitHub dark mode.
- Preserve exact text through deterministic rendering when labels matter.

## Update Rule

When an asset changes, update the README or documentation that embeds it, preserve the source reason in the relevant feature package, regenerate from source when available, inspect the public visual output, and run the template checker before committing.
