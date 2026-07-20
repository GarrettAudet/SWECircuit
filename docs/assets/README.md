# Assets

## Purpose

This folder stores public README and documentation visuals. Assets explain IDECircuit; the adjacent prose remains authoritative about implemented behavior.

## Assets

| File | Used By | Purpose |
| --- | --- | --- |
| `swecircuit-flow.gif` | `README.md` | Current one-goal-to-verified-change workflow animation. |
| `source/generate-swecircuit-flow-gif.py` | Maintainers | Deterministic layout, animation, and mechanical validation source for the primary GIF. |
| `swecircuit-overview.png` | V9 source record | Historical static SWECircuit overview preserved as provenance. |
| `tracerail-overview.png` | V8 source record | Historical user-approved TraceRail overview preserved as provenance. |
| `tracerail-module-contract.gif` | Supporting docs | Historical generated module example. |
| `tracerail-rail-flow.gif` | Supporting docs | Historical generated gate-routing example. |
| `tracerail-platform-composition.gif` | Supporting docs | Historical generated orchestration example. |
| `source/generate-readme-demo-gifs.py` | Maintainers | Deterministic source for the historical supporting GIF sequence. |

## Source

`swecircuit-flow.gif` is a self-contained 920 x 560 animation generated with Pillow. It shows the current IDECircuit boundary: a developer or IDE defines atomic work, core compiles and verifies contracts, the host may run approved specialists in parallel, and one owner integrates, persists the trace, and updates memory. Its filename remains a 0.x compatibility path.

Run the generator with the bundled Codex Python runtime or any Python environment with Pillow:

```powershell
python docs/assets/source/generate-swecircuit-flow-gif.py --qa-dir <temporary-qa-directory>
```

The generator validates dimensions, optimized frame count, loop duration, and a 3 MB size ceiling. `--qa-dir` writes representative start, module, parallel, and complete frames for review.

## Visual Standard

- Explain the product before framework vocabulary.
- Show one coherent path from goal to verified change and durable memory.
- Keep labels readable when GitHub scales the image.
- Use one primary README visual.
- Treat conceptual comprehension as a human review gate; file existence is not clarity evidence.
- Keep host-owned execution visibly separate from core compilation and verification.

## Update Rule

When the primary visual changes, update the README embed, checker requirement, feature package, milestone, and memory. Regenerate from source, run mechanical checks, and inspect representative frames at desktop and narrow widths before committing.