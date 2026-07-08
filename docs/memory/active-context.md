# Active Context

## Current Focus

TraceRail V6 module and rail catalog on branch `codex/v6-module-rail-catalog`.

## Current Stage

V6 ready for approval after adding rail, module, pack catalogs, AGENTS hardening, and the first official orchestration-readiness pack on top of the V5 Rail Composition baseline.

## Important Current Constraints

- Use TraceRail as the public name for the workflow system.
- Use Rail Composition as the core primitive: `input | module | module | output`.
- Keep core usable without downloads.
- Treat official and community packs as optional extensions.
- Recommended pack status requires conformance, dogfooding evidence, explicit permissions, rollback, and a maintainer.
- `tracepack-orchestration-readiness` is official but not recommended until it is dogfooded on real multi-agent work.
- Preserve source artifacts before memory summaries.
- Keep `main` as the stable baseline; V6 remains on its version branch until user approval.

## Recently Learned

- Best-in-class repos fit TraceRail best when normalized into rails, modules, adapters, or packs.
- Superpowers maps to a skills-driven development transition module.
- Astraeus maps to an orchestration compiler module.
- Spec Kit maps to spec, plan, tasks, and adapter automation modules.
- Retrieval and memory tools should remain optional adapter groups until a project proves the need.
- Community growth should target packs before core changes.
- The first official pack should be dependency-free and status-clear: official means maintained, recommended means proven.

## Next Likely Work

- Review and approve V6 on `codex/v6-module-rail-catalog`.
- Merge V6 to `main` only after approval.
- Dogfood V6 on the next TraceRail version or a real project feature.
- Dogfood `tracepack-orchestration-readiness` on real multi-agent work before marking it recommended.
