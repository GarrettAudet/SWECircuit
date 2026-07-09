# Feature Spec

## Status

Complete.

## Problem

The V7 README GIFs were more polished than the prior assets, but the user still found them wildly unclear. The issue was not only visual style; the sequence taught TraceRail from internal abstractions outward instead of quickly communicating the core mental model.

## Users Or Actors

- New developers evaluating TraceRail from the README.
- The project owner pitching TraceRail to developers.
- Future agents maintaining TraceRail visual explanations.

## Goals

- Replace the GIF-first README explanation with a primary static concept visual.
- Explain TraceRail using a simple pipeline expression before introducing module, rail, and scale details.
- Preserve deterministic generation and traceability for visual assets.
- Keep generated GIFs as supporting assets instead of the main README story.
- Record the V7 clarity failure as durable learning.

## Non-Goals

- Add a website, runtime demo, package manager, or external design dependency.
- Change TraceRail's underlying workflow contracts.
- Install external visualization tooling.
- Solve all future README positioning or branding questions.

## Requirements

- The README visual section must explain the simple expression `goal | module | gate | evidence | memory` before deeper module and rail detail.
- The primary README asset must be static, readable, and concept-first.
- Generated support assets must remain deterministic and project-local.
- The checker must require the primary README concept asset and visual generator.
- The feature package, milestone, and memory must preserve the V7 clarity failure and V8 fix.

## Acceptance Criteria

- [x] Given a developer has never seen TraceRail, when they scan the README visual section, then they can understand the story as goal -> module -> gate -> evidence -> memory with modules, rails, and bounded scale underneath.
- [x] Given the user criticized the GIFs as unclear, when V8 is reviewed, then the source package explains why V7 failed and how V8 changes the teaching order.
- [x] Given an agent validates the repository, when the checker runs, then it requires the primary README concept asset and generator.
- [x] Given future agents update README visuals, when they read docs assets and memory, then they see the rule to optimize for comprehension before polish.

## Architecture Impact

No architecture, public API, data, security, deployment, or runtime dependency impact. This is a documentation and visual asset clarity change.

## Risks

- The visual may still need real GitHub rendering review after push.
- The generator filename still references GIFs even though it now also creates the concept PNG.
- Visual clarity still requires human judgment beyond automated checks.

## Open Questions

- Whether future docs should remove the supporting GIF assets entirely if the static concept visual proves sufficient.

## Assumptions

- A static concept visual is a better primary README asset than a GIF sequence for explaining the TraceRail mental model.
- Keeping the supporting GIFs in the asset folder is useful for future iteration, even though the README should not depend on them for the first explanation.