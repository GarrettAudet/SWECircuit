# Assets

## Purpose

This folder stores public README and documentation visuals. Assets should clarify SWECircuit without becoming a second source of workflow truth.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `tracerail-overview.png` | `README.md` | Target operating model for a task moving through standardized modules, agent routing, verified integration, and memory. |
| `tracerail-module-contract.gif` | Supporting docs | Generated example of a goal becoming a traceable work package. |
| `tracerail-rail-flow.gif` | Supporting docs | Generated example of gates routing typed outcomes. |
| `tracerail-platform-composition.gif` | Supporting docs | Generated example of bounded work units returning to an integration owner. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source for the supporting GIF sequence. |

## Source

`tracerail-overview.png` is the exact user-approved public overview supplied for V8. It represents the target operating model, while the README status text defines which parts are currently manual or implemented. Keep the tracked PNG as the presentation source of truth unless a later version explicitly replaces it.

The primary PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready. The supporting GIFs are generated from `source/generate-readme-demo-gifs.py` with the bundled Codex Python runtime and Pillow; their source and current outputs use SWECircuit branding, but they are not part of the primary README story.

## Visual Standard

- Explain the product before introducing framework vocabulary.
- Show one coherent path from user task to verified change and durable memory.
- Keep labels readable when GitHub scales the image.
- Use one primary README visual, not a sequence that readers must decode.
- Preserve the approved output exactly unless a new visual passes public-surface review.
- Treat visual comprehension as a human review gate; file existence alone is not evidence of clarity.

## Update Rule

When the primary visual changes, update the README embed, checker requirement, feature package, milestone, and memory. Inspect the rendered README at desktop and narrow widths before committing.
