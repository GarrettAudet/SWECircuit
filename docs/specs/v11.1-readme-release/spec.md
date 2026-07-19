# Feature Spec: V11.1 README Release

## Status

Release candidate accepted; publication pending.

## Problem

The public README explained SWECircuit accurately but made a first-time reader parse too much internal detail, and its large static overview was visually dense. The public surface needed to communicate the product in seconds without overstating host-owned execution.

## Users Or Actors

- Developers evaluating SWECircuit on GitHub.
- IDE and agent hosts integrating the portable contracts.
- Maintainers protecting the public capability boundary.

## Goals

- Explain SWECircuit in one sentence and one compact animated flow.
- Show modular workflow stages, specialist fan-out, verified fan-in, integration, and memory.
- Keep the source-checkout quick start short and runnable.
- Preserve explicit separation between SWECircuit core and external host execution.
- Record V11 as the merged baseline before publishing this release slice.

## Non-Goals

- Add an agent runtime, provider adapter, scheduler, sandbox, or merge engine.
- Redesign the documentation tree or technical contracts.
- Publish an npm package or claim hosted execution.
- Remove historical visual assets or provenance.

## Requirements

- `README.md` must use one primary GIF and no competing overview image.
- The GIF must remain legible at GitHub desktop and narrow content widths.
- The flow must visibly cover goal, modules, decomposition, parallel specialists, verification, integration, and memory.
- The README must state that core compiles and verifies contracts while an external host executes them.
- The checker must require the new asset and concise public-boundary text.
- The generated asset must have deterministic source in the repository.

## Acceptance Criteria

- [x] AC1: A first-time reader can identify what SWECircuit does from the opening sentence and visual without reading internal schema details.
- [x] AC2: The README embeds exactly one primary visual, `docs/assets/swecircuit-flow.gif`.
- [x] AC3: The GIF shows a modular rail, specialist fan-out and fan-in, verification, integration, memory, and a continuous trace.
- [x] AC4: The README truthfully states that external hosts launch agents, enforce runtime controls, integrate changes, and update memory.
- [x] AC5: The quick start builds and runs the read-only specialist example from a source checkout.
- [ ] AC6: The template checker, checker regression suite, canonical kernel gate, and whitespace checks pass on the final release tree.
- [x] AC7: Independent visual and capability-boundary specialists approve the Revision 5 candidate.
- [x] AC8: The V11 milestone and durable memory record the merge and V11.1 release evidence.

## Architecture Impact

No runtime architecture or public TypeScript interface changes. This changes the public documentation contract, its deterministic asset source, and checker assertions.

## Risks

- Animation can become another dense slide instead of a quick explanation.
- Simplified prose can accidentally imply that core launches or manages agents.
- Lexical capability checks cannot prove arbitrary paraphrase equivalence.
- GIF text can become unreadable after GitHub scaling.

## Open Questions

None. The owner approved the V11 merge and requested a concise README with one simple illustrative GIF.

## Assumptions

- The public project name remains SWECircuit.
- A 0.x source-checkout quick start is the truthful current installation path.
- Historical PNG and GIF assets remain as provenance but are not embedded in the README.
