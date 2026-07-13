# Practice Register

This file records ecosystem practices considered for the portable AI SWE workflow. Use it to prevent random process drift while still absorbing current best-in-class ideas.

Status values:

- `accepted`: promoted into handbook, templates, AGENTS.md, or checker.
- `optional`: useful integration, not required in the current version.
- `watch`: promising but not stable enough.
- `rejected`: intentionally not adopted.
- `deferred`: useful, but not now.

## Current Practices

| Practice | Status | Source | Decision | Rationale |
| --- | --- | --- | --- | --- |
| `AGENTS.md` as canonical agent entrypoint | accepted | OpenAI Codex AGENTS.md docs | Use in v1+ | Codex reads AGENTS.md before work and supports layered guidance. |
| Spec-driven workflow | accepted | GitHub Spec Kit | Implement as file-based workflow first | Spec Kit's clarify/checklist/analyze/converge flow is a strong backbone, but the template avoids installing tooling by default. |
| Full lifecycle reference | optional | BMAD Method | Mine for workflow ideas | BMAD has strong lifecycle structure, but is too heavy as a default template dependency. |
| Clarification before guessing | accepted | Clarification-seeking coding-agent research | Add clarification policy | Underspecified tasks need explicit ask/assume behavior. |
| Problem-solving/root-cause protocol | accepted | Prior repo experience and debugging best practice | Add first-class diagnostic branch | Prevents repeated patching and captures durable learning. |
| Durable repo memory | accepted | Basic Memory, agentmemory, Cline-style memory patterns | Start with Markdown memory | Local Markdown is transparent, portable, and easy to review. |
| Version dogfooding | accepted | V2 user direction and workflow dogfooding practice | Use each completed workflow version for future workflow-stack work | Keeps the system grounded in real use and exposes friction quickly. |
| Simplicity and traceability invariant | accepted | V2 user direction and process-design best practice | Add to handbook and AGENTS.md | The workflow must stay quick to understand while preserving goal-to-memory traceability. |
| Parallel work-unit contracts | accepted | OpenAI Codex subagent docs, Claude Code teams/worktrees docs, AutoGen teams guidance | Add first-class parallel-agent workflow guidance | Safe acceleration requires decomposition, conflict control, evidence handoffs, and integration ownership. |
| Source-preserving memory layers | accepted | Basic Memory, Mem0, Zep/Graphiti, A-MEM, MemMachine, structured distillation research | Add history ledger and retrieval index before tools | The system should preserve source truth while keeping retrieval fast. |
| Development milestones | accepted | V3 user direction and release/progress tracking practice | Add `docs/milestones/` and require version closeout overview | Gives the human a concise progress view without replacing specs or reviews. |
| Branch-based version workflow | accepted | V3 user direction and standard git review practice | Use `main` as stable baseline and version branches for future workflow changes | Keeps draft version work isolated until approved and merged. |
| Single-agent-first workflow baseline | accepted | V4 user direction and dogfooding evidence | Strengthen one-agent/IDE execution before multi-agent expansion | Multi-agent work should be built on a reliable standalone execution loop, not used to compensate for weak structure. |
| IDE workflow visibility | accepted | V4 user direction and dogfooding evidence | Add explicit IDE-user interaction protocol | The user must be able to see that the workflow is active and methodical during chat-based IDE work. |
| Modular framework kernel | accepted | V5 user direction, GitHub Spec Kit extensions and presets, LangChain pattern docs | Add `docs/framework/` with module registry and templates | Provides a simple way to plug in best-in-class practices without installing tools by default. |
| Circuit Composition with 0.x rail compatibility | accepted | LangChain composition model, PromptChainer research, and owner identity decision | Keep `docs/framework/rail-composition.md` and `_rail-template.md` as compatibility paths until tested machine migration | Gives SWECircuit one simple primitive for composing SWE workflows: input, module, gate, artifact, outcome. |
| SWECircuit public project identity | accepted | V8.2 identity package and owner approval | Use for current project and GitHub repository surfaces; defer unrelated machine namespaces | The repository is `GarrettAudet/SWECircuit`; Circuit is the public composition metaphor and historical names remain provenance. |
| Adapter evaluation before installation | accepted | Spec Kit extension model, BMAD modules, LangChain and AutoGen runtime patterns | Require adapter evaluation for external tools | Prevents tool sprawl while preserving a path to adopt useful frameworks. |
| Orchestration pattern selection | accepted | LangChain multi-agent docs, AutoGen AgentChat, CrewAI crews | Add orchestration pattern guide | Keeps single-agent as default and selects fan-out only when the work shape justifies it. |
| Decomposition plan for scale | accepted | Codex subagents, LangChain context engineering, CrewAI task processes | Add decomposition plan and orchestration run templates | Large agent fan-out needs shared goal, contracts, conflict zones, fan-in, and integrated verification. |
| GitHub Spec Kit adapter | optional | GitHub Spec Kit | Keep as optional adapter | Strong spec-driven automation candidate, but file contracts are sufficient for V5. |
| LangChain or LangGraph adapter | optional | LangChain multi-agent docs | Keep as optional runtime adapter | Useful for product agent runtimes and graph workflows, not needed for this file-based SWE workflow yet. |
| AutoGen AgentChat adapter | optional | Microsoft AutoGen docs | Keep as optional team-pattern adapter | Useful reference for teams, selector group chat, swarm, GraphFlow, state, and human-in-loop. |
| CrewAI adapter | optional | CrewAI crews docs | Keep as optional crew adapter | Useful reference for sequential or hierarchical crews, memory, knowledge, callbacks, and checkpointing. |
| Skills-driven development transition | accepted | Superpowers | Add capability-adapter contract | Strengthens the handoff from idea to spec to approved implementation plan while keeping the simple path visible. |
| Orchestration compiler capability | accepted | Astraeus | Add capability-adapter contract | Provides a contract for repository-aware agent synthesis, critic/synthesizer fan-in, scoped permissions, and continuity. |
| Superpowers adapter | optional | Superpowers | Keep as optional skills/plugin adapter | Strong methodology and plugin candidate, but install only after adapter evaluation and user approval. |
| Astraeus adapter | optional | Astraeus | Keep as optional orchestration compiler adapter | Strong orchestration prompt candidate, but install only after adapter evaluation and user approval. |
| Semantic code retrieval | optional | Serena | Document as future integration | Valuable for larger repos, unnecessary in the V5 baseline. |
| Repo packing | optional | Repomix | Document as future integration | Useful for external review, not required in core workflow. |
| Live dependency docs | optional | Context7 and official docs MCPs | Document as future integration | Useful for unstable libraries; V5 records the retrieval policy and adapter path only. |
| Basic Memory | optional | Basic Memory GitHub/docs | Consider after file-based memory is dogfooded | Attractive because it uses local Markdown and MCP, but installation would add a tool dependency. |
| Mem0 | optional | Mem0 GitHub/paper | Consider for future memory integration | Strong ecosystem momentum and hybrid retrieval, but not needed for the V5 file-based memory layer. |
| Zep/Graphiti temporal knowledge graph | optional | Zep/Graphiti paper and repo | Consider for temporal/cross-session reasoning | Powerful for large memory graphs, but heavier than this template needs now. |
| A-MEM/Zettelkasten memory | watch | A-MEM paper/repo | Watch for workflow-memory inspiration | Useful dynamic memory organization idea, but would add complexity today. |
| Codex Chronicle | watch | OpenAI Codex Chronicle docs | Do not require in v2 | Promising source of automatic local memories, but currently platform/account constrained and has privacy/prompt-injection considerations. |
| CI/spec guardrails | deferred | Spec Kit CI Guard and related extensions | Add local checker first | Deterministic checks are needed, but CI can wait until the template stabilizes. |

## Promotion Criteria

Promote a practice into the handbook or templates only when it:

- Solves a repeated failure mode.
- Is understandable to a new user.
- Can be expressed as a simple rule, artifact, or check.
- Preserves traceability from goal to evidence to memory.
- Does not require a fragile vendor-specific dependency for the current version.
- Has a clear maintenance owner or update cadence.

## Rejection Criteria

Reject or defer a practice when it:

- Adds ceremony without preventing real failures.
- Requires tools that are not yet needed.
- Duplicates an existing simpler rule.
- Makes the system harder to understand.
- Cannot be verified in normal project work.
- Stores sensitive history without clear privacy and deletion behavior.




