# 2026-07-08 Modular Orchestration Scan

## Purpose

Capture current ecosystem guidance relevant to V5: modular workflow layers, tool adapters, orchestration pattern selection, agent-team coordination, and scalable decomposition.

## Sources Reviewed

| Source | Type | Relevant Takeaway | V5 Decision |
| --- | --- | --- | --- |
| GitHub Spec Kit | Official repository | Spec Kit centers development on product scenarios and predictable outcomes, with constitution, specify, plan, tasks, implement, converge, clarify, analyze, checklist, extensions, presets, and bundles. | Accept spec-driven phases and modular extension idea as file contracts; keep installation optional. |
| LangChain multi-agent docs | Official docs | Multi-agent is useful for context management, distributed development, and parallelization, but a single agent with the right tools may be enough. Patterns include subagents, handoffs, skills, router, and custom workflows. | Accept pattern-selection vocabulary and context-engineering emphasis; do not install a runtime. |
| OpenAI Codex subagents docs | Official docs | Codex subagents support isolated delegation for bounded work when explicitly requested and coordinated by the main thread. | Prefer subagents for future Codex-native fan-out after work-unit contracts are ready. |
| Microsoft AutoGen AgentChat docs | Official docs | AgentChat provides agents, teams, selector group chat, swarm, GraphFlow, memory, logging, state, and human-in-loop concepts. | Use as an optional adapter reference for team patterns and run records. |
| CrewAI crews docs | Official docs | Crews coordinate agents and tasks through sequential or hierarchical processes, with memory, knowledge sources, callbacks, async execution, and checkpointing. | Use crew and checkpointing concepts as optional adapter references. |
| BMAD Method | Official repository | BMAD provides a full AI-driven development lifecycle with agents, workflows, modules, IDE integration, and rapid evolution. | Keep BMAD as an optional lifecycle adapter and practice source, not a default dependency. |

## Accepted V5 Practices

- Treat this repository as a lightweight framework kernel with modules and adapters.
- Keep the handbook and `AGENTS.md` as the simple operating surface.
- Use module contracts for reusable capabilities.
- Use a module registry to record accepted file contracts and optional adapters.
- Use adapter evaluations before installing tools.
- Keep single-agent as the default pattern.
- Select orchestration pattern by work shape, not excitement.
- For large fan-out, use one shared goal, one decomposition plan, one integration owner, and bounded work-unit contracts.
- When failures cascade, parallelize diagnosis before implementation fixes.

## Deferred Practices

- Installing Spec Kit, BMAD, LangChain, LangGraph, AutoGen, CrewAI, Serena, Repomix, Context7, Basic Memory, Mem0, Zep, Graphiti, A-MEM, or another runtime.
- Creating project-local custom subagent definitions.
- Adding CI for framework checks.
- Adding automatic conversation capture.

## V5 Rationale

The strongest common pattern is modularity with context discipline. Spec Kit contributes the spec-driven spine and extension model. LangChain contributes pattern selection and context engineering. Codex subagents contribute a practical fan-out target inside the current IDE ecosystem. AutoGen, CrewAI, and BMAD show mature team, lifecycle, and checkpointing concepts. V5 captures these as file-based contracts first so future tools can plug in without becoming the workflow.

## Next Review

Revisit after V5 is used to plan or execute a real multi-agent decomposition, or before installing the first runtime adapter.
