# Debug Notes

Use this file when verification or review finds a non-obvious, recurring, or confusing failure.

## Status

Complete.

## Failure Summary

The V7 GIFs were visually cleaner but still unclear to the user. The first V8 PNG improved the concept but still looked unprofessional because it was a bespoke diagram instead of a simple repo concept visual.

## Reproduction

Open the README visual sequence after V7 or the first V8 concept PNG and try to understand TraceRail without already knowing its vocabulary. The visuals either assume too much framework language or look like a custom internal diagram rather than a polished public repo concept.

## Stable Evidence

The user directly reported: "This is wildly unclear to be honest for the gifs." After seeing the first V8 PNG, the user said it did not look professional and later pointed to a simple linked-component reference as the type of visual that works, while asking not to copy it.

## Failure Classification

- Requirement ambiguity.
- Incorrect or incomplete test.
- Visual communication failure.
- Public-surface quality failure.

## Context Retrieved

- `README.md`
- `docs/assets/source/generate-readme-demo-gifs.py`
- `docs/assets/README.md`
- `docs/specs/v7-readme-demo-polish/`
- `docs/memory/active-context.md`
- User-provided linked-component reference image.

## Hypotheses

| Hypothesis | Evidence For | Evidence Against | Experiment |
| --- | --- | --- | --- |
| H1: The visuals are unclear because they start with framework vocabulary. | V7 sequence starts with module, rail, and platform instead of user outcome. | TraceRail does need those terms eventually. | Reorder the story around a simple expression. |
| H2: The first V8 visual still fails because it looks like a custom diagram, not a polished concept visual. | User called it unprofessional and showed a simpler linked-component reference. | The V8 PNG was deterministic and source-controlled. | Replace the PNG with a source-controlled SVG concept mark. |
| H3: The name needs more semantic support. | User compared `LangChain` as self-explanatory and asked whether TraceRail needs a different name. | TraceRail still maps to traceability plus rails. | Keep name for V8 but add explicit tagline and record naming as follow-up. |

## Experiments

| Experiment | Hypothesis | Result | Conclusion |
| --- | --- | --- | --- |
| E1 | H1 | Passed partially. | The first V8 PNG improved the teaching order but not professionalism. |
| E2 | H2 | Passed. | The linked-component SVG is simpler, more memorable, and closer to a public repo concept visual. |
| E3 | H3 | Deferred. | Naming should be evaluated separately instead of changing V8 opportunistically. |

## Current Status

Root cause confirmed and fixed in V8: the public README visual must teach the repo concept through a simple memorable metaphor, not through a bespoke workflow diagram.

## Next Action

Validate the repository, review the branch, and push the V8 fix for user approval before merge.