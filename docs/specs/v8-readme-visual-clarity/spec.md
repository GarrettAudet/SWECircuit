# Feature Spec

## Status

In progress.

## Problem

The V7 GIFs and several V8 SVG concepts were technically valid but did not explain TraceRail clearly or look production-ready. The README also buried the product under a long internal-framework explanation.

## Users Or Actors

- Developers evaluating TraceRail from GitHub.
- Teams deciding whether TraceRail fits their AI development workflow.
- Humans and agents maintaining the public repository surface.

## Goals

- Use the user-approved TraceRail overview as the primary README visual.
- Explain the product in one sentence before showing implementation detail.
- Show the full story: task decomposition, modular rails, agent routing, verified integration, execution trace, and memory.
- Make the README clean, concise, and useful as an entry point.
- Preserve the accepted direction in the checker, feature package, milestone, and memory.

## Non-Goals

- Rename TraceRail.
- Change workflow contracts or add an agent runtime.
- Install a design or diagramming dependency.
- Turn the README into the full handbook.
- Remove historical supporting GIF assets.

## Requirements

- The README must embed `docs/assets/tracerail-overview.png` near the top.
- The opening definition must describe decomposition, agent routing, verification, merge, and traceability in plain language.
- The README must explain modules, rails, work packets, gates, execution trace, and memory without duplicating the handbook.
- The quick start must route agents and humans to the canonical operating files.
- The current status must distinguish the file-based framework from an agent runtime.
- The checker must require the approved overview asset and concise README headings.

## Acceptance Criteria

- [x] Given a new developer opens the repository, when they scan the opening section, then they see one product definition and one coherent visual before internal detail.
- [x] Given a reader asks how TraceRail works, when they read the first explanation, then they can follow task -> modules -> routed agents -> merge -> verification -> review -> memory.
- [x] Given an agent validates the repository, when the checker runs, then it requires `docs/assets/tracerail-overview.png` and the README embed.
- [ ] Given the README is rendered at desktop and narrow widths, when it is reviewed, then the image, tables, links, and code blocks remain readable.
- [ ] Given the full repository validation runs, when V8 is handed off, then all checks pass and the milestone records the evidence.

## Architecture Impact

No runtime, API, data, security, deployment, or dependency impact. This is a public documentation, asset, checker, and trace-artifact change.

## Risks

- Raster text can become small on narrow screens.
- The supplied image cannot be edited as deterministically as source-native SVG.
- The current public name remains TraceRail; any DevRail rename is a separate product decision.
- Visual comprehension still requires human judgment.

## Open Questions

- Whether to conduct a dedicated naming review in a future version.
- Whether a future designer-authored source file should accompany the approved raster asset.

## Assumptions

- The user-supplied overview is the accepted V8 visual direction.
- A short README should route readers to deeper docs instead of restating them.
- The 1672 x 941 PNG is suitable for GitHub when embedded at full README width.
