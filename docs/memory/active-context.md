# Active Context

## Current Focus

TraceRail V8 README production readiness on branch `codex/v8-readme-visual-clarity`.

## Current Stage

V8 is in verification after replacing the rejected generated visual direction with the exact user-approved `docs/assets/tracerail-overview.png` and a concise, product-first README.

## Important Current Constraints

- Use TraceRail as the public name for this V8 revision because the approved asset is TraceRail-branded.
- Use Rail Composition as the core primitive: `input | module | module | output`.
- Keep core usable without downloads or runtime dependencies.
- Keep the README concise; detailed protocols belong in `AGENTS.md`, the handbook, feature packages, rails, modules, packs, and memory.
- Treat the approved overview PNG as the public visual source of truth for V8.
- Keep `main` stable; V8 remains on its version branch until user approval.
- Preserve source artifacts before memory summaries.
- License selection remains owner-controlled.
- Public-surface clarity requires rendered human review, not only structural checks.

## Recently Learned

- TraceRail is clearest when described as modular rails that decompose tasks, route bounded work to specialized agents, verify integrated outputs, and preserve a full execution trace.
- A strong README needs one product definition, one coherent visual, a short workflow explanation, and links to deeper sources.
- Repeated generated visual attempts can satisfy technical checks and still fail owner acceptance.
- Once the owner supplies the accepted visual, preserve it directly instead of producing another interpretation.
- Alt text and concise workflow prose are required because raster labels shrink on narrow screens.
- Best-practice repositories still fit TraceRail as rails, modules, adapters, or optional packs.
- Multi-agent fan-out remains safe only after bounded work-unit contracts and integration ownership are explicit.

## Next Likely Work

- Complete V8 structural, link, image, and rendered-layout verification.
- Update V8 review and milestone with evidence.
- Commit and push the V8 revision for user approval.
- After approval, merge V8 to `main` and dogfood it on the next version.
- Treat any DevRail rename as a dedicated product decision, not a partial V8 edit.
- Choose a public license before broad external reuse.
