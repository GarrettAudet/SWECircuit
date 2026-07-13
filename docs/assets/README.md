# Assets

## Purpose

This folder stores public README and documentation visuals. Assets should clarify SWECircuit without becoming a second source of workflow truth.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `swecircuit-overview.png` | `README.md` | Current SWECircuit target operating model for a task moving through standardized modules, agent routing, verified integration, and memory. |
| `tracerail-overview.png` | V8 source record | Historical user-approved TraceRail overview preserved as provenance. |
| `tracerail-module-contract.gif` | Supporting docs | Generated example of a goal becoming a traceable work package. |
| `tracerail-rail-flow.gif` | Supporting docs | Generated example of gates routing typed outcomes. |
| `tracerail-platform-composition.gif` | Supporting docs | Generated example of bounded work units returning to an integration owner. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source for the supporting GIF sequence. |

## Source

`swecircuit-overview.png` is the V9 public overview. It preserves the accepted V8 information hierarchy while updating the project identity and composition language. It represents the target operating model; the adjacent README text is authoritative about which operations the V9 kernel implements today.

`tracerail-overview.png` remains the exact user-approved V8 source artifact and is not a current README embed. The supporting GIFs are generated from `source/generate-readme-demo-gifs.py` with the bundled Codex Python runtime and Pillow; they remain historical supporting material rather than the primary README story.

## Visual Standard

- Explain the product before introducing framework vocabulary.
- Show one coherent path from user task to verified change and durable memory.
- Keep labels readable when GitHub scales the image.
- Use one primary README visual, not a sequence that readers must decode.
- Preserve the approved output exactly unless a new visual passes public-surface review.
- Treat visual comprehension as a human review gate; file existence alone is not evidence of clarity.

## Update Rule

When the primary visual changes, update the README embed, checker requirement, feature package, milestone, and memory. Inspect the rendered README at desktop and narrow widths before committing.
