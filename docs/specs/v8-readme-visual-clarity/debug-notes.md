# Debug Notes

Use this file when verification or review finds a non-obvious, recurring, or confusing failure.

## Status

Complete.

## Failure Summary

The V7 GIFs were visually cleaner but still unclear to the user. The failure was that the README visual story optimized presentation polish before onboarding comprehension.

## Reproduction

Open the README visual sequence after V7 and try to understand TraceRail without already knowing the terms module, rail, gate, pack, adapter, and platform.

## Stable Evidence

The user directly reported: "This is wildly unclear to be honest for the gifs." The user later clarified that GIFs were not required; the broader need was a cool, clear visualization of the concept, closer to the simplicity of LangChain's composable mental model.

## Failure Classification

- Requirement ambiguity.
- Incorrect or incomplete test.
- Visual communication failure.

## Context Retrieved

- `README.md`
- `docs/assets/source/generate-readme-demo-gifs.py`
- `docs/assets/README.md`
- `docs/specs/v7-readme-demo-polish/`
- `docs/memory/active-context.md`

## Hypotheses

| Hypothesis | Evidence For | Evidence Against | Experiment |
| --- | --- | --- | --- |
| H1: The visuals are unclear because they start with framework vocabulary. | V7 sequence starts with module, rail, and platform instead of user outcome. | TraceRail does need those terms eventually. | Reorder the story around the simple expression `goal | module | gate | evidence | memory`. |
| H2: There are too many labels per frame. | V7 frames show many terms at once. | Some labels are needed. | Use one primary static visual with fewer words and clearer hierarchy. |
| H3: Animation is the wrong primary medium. | GIFs can distract from the mental model and hide the final concept. | Supporting animation may still be useful later. | Make a static primary PNG and keep GIFs only as generated support assets. |

## Experiments

| Experiment | Hypothesis | Result | Conclusion |
| --- | --- | --- | --- |
| E1 | H1 | Passed. | README now starts with `goal | module | gate | evidence | memory`. |
| E2 | H2 | Passed after one fix loop. | Removed chip sublabels from the core row and reduced clutter. |
| E3 | H3 | Passed. | Static concept PNG is clearer as the primary README asset; GIFs are no longer the first explanation. |

## Current Status

Root cause confirmed and fixed in V8: the public README visual must teach the mental model before showing the framework vocabulary.

## Next Action

Validate the repository, review the branch, and push V8 for user approval before merge.