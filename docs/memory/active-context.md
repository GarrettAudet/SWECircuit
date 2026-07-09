# Active Context

## Current Focus

TraceRail V8 README visual clarity on branch `codex/v8-readme-visual-clarity`.

## Current Stage

V8 replaces the GIF-first README explanation with a static primary concept visual centered on `goal | module | gate | evidence | memory`. Implementation and local validation are complete; commit, push, and user approval are the remaining gates before merge to `main`.

## Important Current Constraints

- Use TraceRail as the public name for the workflow system.
- Use Rail Composition as the core primitive: `input | module | module | output`.
- Keep core usable without downloads.
- Treat official and community packs as optional extensions.
- Recommended pack status requires conformance, dogfooding evidence, explicit permissions, rollback, and a maintainer.
- `tracepack-orchestration-readiness` has read-only multi-agent dogfood evidence but is not recommended until repeated use and implementation fan-out evidence exist.
- Preserve source artifacts before memory summaries.
- Keep `main` as the stable baseline; workflow versions should start from `main` on a new `codex/vVERSION-slug` branch.
- License selection remains owner-controlled; do not add a `LICENSE` file without explicit approval.
- Text-heavy README visuals should preserve deterministic source when practical.
- Public README visuals must teach the first-reader mental model before internal framework vocabulary.

## Recently Learned

- Best-in-class repos fit TraceRail best when normalized into rails, modules, adapters, or packs.
- Superpowers maps to a skills-driven development transition module.
- Astraeus maps to an orchestration compiler module.
- Spec Kit maps to spec, plan, tasks, and adapter automation modules.
- Retrieval and memory tools should remain optional adapter groups until a project proves the need.
- Community growth should target packs before core changes.
- The first official pack should be dependency-free and status-clear: official means maintained, recommended means proven.
- Milestones need explicit approval gates so merge readiness is source-visible instead of reconstructed from chat.
- Pack conformance needs field-level checks for official packs, not only heading checks.
- Read-only subagent review is a useful first orchestration dogfood before write-enabled implementation fan-out.
- README needs to show modules as swappable rail gates; `architecture-review` is the concrete core example.
- A professional public repo surface should be enforced by the checker so polish remains part of the workflow, not one-time cleanup.
- A promised README visual should be tracked assets and checker-enforced embeds, not only a Mermaid block or chat plan.
- V7 showed that checker-enforced asset presence is not enough for visual quality; exact text-heavy visuals need source generation plus manual frame inspection.
- V8 showed that polished animation can still fail if the concept is unclear; the README should lead with a static, scannable mental model.

## Next Likely Work

- Review the V8 concept visual on GitHub after push.
- If approved, merge V8 into `main` and dogfood V8 on the next TraceRail version.
- Dogfood `tracepack-orchestration-readiness` on write-enabled implementation fan-out before marking it recommended.
- Choose a public license before broad external reuse or package distribution.