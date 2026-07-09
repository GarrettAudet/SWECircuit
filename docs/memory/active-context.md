# Active Context

## Current Focus

TraceRail V6 module and rail catalog on branch `codex/v6-module-rail-catalog`.

## Current Stage

V6 ready for approval after adding rail, module, pack catalogs, AGENTS hardening, the first official orchestration-readiness pack, explicit milestone approval gates, pack conformance checker coverage, a read-only subagent dogfood run, a repository professionalization pass, and a README module/rail/platform GIF sequence on top of the V5 Rail Composition baseline.

## Important Current Constraints

- Use TraceRail as the public name for the workflow system.
- Use Rail Composition as the core primitive: `input | module | module | output`.
- Keep core usable without downloads.
- Treat official and community packs as optional extensions.
- Recommended pack status requires conformance, dogfooding evidence, explicit permissions, rollback, and a maintainer.
- `tracepack-orchestration-readiness` has read-only multi-agent dogfood evidence but is not recommended until repeated use and implementation fan-out evidence exist.
- Preserve source artifacts before memory summaries.
- Keep `main` as the stable baseline; V6 remains on its version branch until user approval.
- GitHub `main` will not show V6 README changes, including the GIF sequence, until V6 is merged after approval.
- License selection remains owner-controlled; do not add a `LICENSE` file without explicit approval.

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

## Next Likely Work

- Review and approve V6 on `codex/v6-module-rail-catalog`.
- Merge V6 to `main` only after approval.
- Dogfood V6 on the next TraceRail version or a real project feature.
- Dogfood `tracepack-orchestration-readiness` on write-enabled implementation fan-out before marking it recommended.
- Choose a public license before broad external reuse or package distribution.
