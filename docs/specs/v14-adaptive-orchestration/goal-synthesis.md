# V14 Goal Synthesis

## Owner Goal

From one software request, make an agentic IDE methodically produce an architecture, decompose work
into exact modules, construct optimized specialists, choose the least costly sufficient
model/effort/skills/tools for each, maximize safe parallelism, verify and integrate all outputs,
update durable learning, and expose the complete live execution trace.

## Clarified Product Contract

The core product is an IDE-neutral orchestration kernel plus host adapters. The kernel decides
portable semantics and verifies evidence. The host inventories current runtimes, enforces
permissions, launches native agents, observes lifecycle state, persists bytes, and performs
repository effects.

The first supported host is Windows Codex Desktop. Portability means another host can implement the
same inventory, command, observation, and receipt contracts without changing task semantics.

## Release Meaning

V14 is release-ready only when a user can invoke the workflow from an ordinary Codex Desktop task,
see the compiled team and runtime choices, allow native specialists to run concurrently, inspect
progress and evidence, recover from a typed failure, and receive an independently reviewed result
whose source, assignments, files, tests, decisions, and memory updates are reconstructable.

## Closed Decisions

- Runtime model IDs belong to host supply, not specialist blueprints.
- Least sufficient means least cost among profiles that pass owner-reviewed hard requirements.
- A serial baseline is always evaluated.
- Core emits commands and projections; adapters perform effects.
- Codex native subagent UI is reused; portable RunView is JSON plus Markdown.
- Final integration, merge, and release remain owner-gated.

## Unresolved Decisions

None block V14. A custom pinned graphical panel is deferred until a host exposes a supported
extension API.
