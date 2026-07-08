# Active Context

## Current Focus

TraceRail V5 modular orchestration framework on branch `codex/v5-modular-orchestration-framework`.

## Current Stage

V5 ready for approval after naming the system TraceRail and adding Rail Composition plus the framework layer for modules, adapters, capability adapters, decomposition plans, orchestration patterns, and run records.

## Important Current Constraints

- Use TraceRail as the public name for the workflow system.
- Use Rail Composition as the core primitive: `input | module | module | output`.
- Keep the workflow simple on the surface and modular underneath.
- Keep single-agent and IDE-visible execution as the default baseline.
- Use framework modules only when they clarify real work.
- Evaluate external tools as adapters before installation.
- Preserve source artifacts before summaries.
- Keep `main` as the stable baseline; V5 remains on its version branch until user approval.
- Do not install external frameworks or memory tools without explicit approval after adapter evaluation.

## Recently Learned

- Best-in-class ecosystem practice points toward modular contracts and adapter governance, not one mandatory mega-framework.
- Superpowers is useful as a skills-driven development transition pattern from idea to spec to approved implementation plan.
- Astraeus is useful as an orchestration compiler pattern for repository-aware agent synthesis, critic/synthesizer fan-in, and scoped permissions.
- The LangChain-like composition principle should be adapted to SWE artifacts: modules receive artifacts, act, emit evidence, pass gates, and route typed outcomes.
- Spec Kit contributes the strongest spec-driven spine, while LangChain, AutoGen, CrewAI, BMAD, and Codex subagents contribute pattern and orchestration ideas.
- At scale, decomposition is the core artifact: shared goal, work-unit contracts, dependency graph, conflict zones, fan-in, verification, and integration ownership.
- When a ticket reveals bug after bug, parallelize diagnosis before implementation fixes.

## Next Likely Work

- Review and approve V5 on `codex/v5-modular-orchestration-framework`.
- Merge V5 to `main` only after approval.
- Dogfood V5 on the next workflow version or a real project feature.
- Evaluate the first runtime adapter only after a repeated friction point appears.