# Feature Spec

## Status

Complete.

## Problem

The V7 README GIFs were more polished than the prior assets, but the user still found them wildly unclear. The first V8 PNG made the concept clearer, but it still looked unprofessional because it was a bespoke diagram rather than a simple public-facing repo concept visual.

## Users Or Actors

- New developers evaluating TraceRail from the README.
- The project owner pitching TraceRail to developers.
- Future agents maintaining TraceRail visual explanations.

## Goals

- Replace the GIF-first README explanation with a primary static concept visual.
- Use a simple memorable visual metaphor, inspired by linked components but unique to TraceRail.
- Explain TraceRail using the expression `goal | spec | rail | gates | evidence | memory`.
- Preserve deterministic, source-controlled visual assets.
- Keep generated GIFs as supporting assets instead of the main README story.
- Record the V7/V8 clarity and professionalism failure as durable learning.

## Non-Goals

- Add a website, runtime demo, package manager, or external design dependency.
- Rename the repository in V8.
- Change TraceRail's underlying workflow contracts.
- Install external visualization tooling.
- Solve all future README positioning or branding questions.

## Requirements

- The README visual section must explain `goal | spec | rail | gates | evidence | memory` before deeper module and rail detail.
- The primary README asset must be static, readable, professional, and concept-first.
- The primary visual must be source-controlled as SVG, not generated through the rejected Pillow concept diagram.
- Generated support assets must remain deterministic and project-local.
- The checker must require the primary README SVG concept asset and supporting visual generator.
- The feature package, milestone, and memory must preserve the clarity failure, visual-quality failure, and V8 fix.

## Acceptance Criteria

- [x] Given a developer has never seen TraceRail, when they scan the README visual section, then they can understand the story as goal -> spec -> rail -> gates -> evidence -> memory.
- [x] Given the user criticized the prior visuals as unclear and unprofessional, when V8 is reviewed, then the source package explains why the generated PNG failed and why the linked-component SVG replaced it.
- [x] Given an agent validates the repository, when the checker runs, then it requires the primary README SVG concept asset and generator for supporting GIFs.
- [x] Given future agents update README visuals, when they read docs assets and memory, then they see the rule to optimize for simple repo-concept comprehension before custom visual complexity.

## Architecture Impact

No architecture, public API, data, security, deployment, or runtime dependency impact. This is a documentation and visual asset clarity change.

## Risks

- The visual may still need real GitHub rendering review after push.
- The repository name may still need evaluation because `TraceRail` is less instantly self-explanatory than names like `LangChain`.
- Visual clarity still requires human judgment beyond automated checks.

## Open Questions

- Whether TraceRail should keep its name or evaluate alternatives that are more instantly literal.
- Whether future docs should remove the supporting GIF assets entirely if the SVG concept visual proves sufficient.

## Assumptions

- A linked-component SVG is a better primary README asset than a GIF sequence or generated PNG diagram for explaining the repo concept.
- Keeping the supporting GIFs in the asset folder is useful for future iteration, even though the README should not depend on them for the first explanation.