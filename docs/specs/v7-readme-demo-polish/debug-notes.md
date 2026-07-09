# Debug Notes

Use this file when verification or review finds a non-obvious, recurring, or confusing failure.

## Status

Complete.

## Failure Summary

The current README GIFs communicated the intended story but did not meet the desired professional visual bar. User-provided evidence showed small text, weak theme consistency, and visuals that felt unclear in the README.

## Reproduction

Open the README on the current branch and inspect the GIF sequence under `How Modules Plug Into Rails`, especially the rail and platform examples in GitHub dark mode.

## Stable Evidence

The user-provided screenshot showed the rail and platform GIFs embedded in the README with small labels, heavy mixed colors, and a visual style that did not look polished enough for a framework pitch.

## Failure Classification

- Incorrect or incomplete test.
- Requirement ambiguity.

## Context Retrieved

- `README.md`
- `docs/assets/README.md`
- `docs/specs/v6-readme-module-flow-gif/`
- `docs/memory/retrieval-index.md`
- Imagegen skill guidance for choosing deterministic rendering over generated text-heavy diagrams.

## Hypotheses

| Hypothesis | Evidence For | Evidence Against | Experiment |
| --- | --- | --- | --- |
| H1: The issue is visual design quality, not the concept. | User says the GIFs are not clear and text/theme/coloring is not professional, while the requested story still matches module -> rail -> platform. | None. | Keep the three-part concept and replace only visual execution. |
| H2: Text density and color noise are the main clarity problems. | Screenshot shows many small labels and several saturated colors competing for attention. | Some labels are necessary for explanation. | Increase type size, reduce labels, and use a restrained palette. |
| H3: Structural checks are insufficient for visual assets. | The checker passed V6 assets, but the user still flagged visual quality. | Checker should not judge taste directly. | Add deterministic source generation and manual frame inspection evidence. |

## Experiments

| Experiment | Hypothesis | Result | Conclusion |
| --- | --- | --- | --- |
| E1 | H1 | Preserved the module -> rail -> platform story while replacing the visual style. | The concept can remain while execution improves. |
| E2 | H2 | Larger typography, fewer labels, dark framing, and restrained accents produced clearer frames. | The primary issue was visual density and theme execution. |
| E3 | H3 | Added a source generator and recorded visual inspection evidence. | Future visual updates should preserve deterministic source plus manual review. |

## Current Status

Fixed for V7. Representative frames were regenerated and visually inspected.

## Next Action

Review the pushed branch or PR, then merge only after user approval.
