# 2026-07-08 Parallel Agent And Memory Scan

## Purpose

Capture current ecosystem guidance relevant to V2: methodical parallel agent development, source-preserving memory, efficient retrieval, and simple traceability.

## Sources Reviewed

| Source | Type | Relevant Takeaway | V2 Decision |
| --- | --- | --- | --- |
| OpenAI Codex Subagents docs | Official docs | Codex can spawn specialized agents in parallel, collect results, and supports custom agents plus thread limits. Subagents cost more tokens and are explicitly requested. | Accept subagent workflows as a target pattern, but keep V2 tool-agnostic and contract-first. |
| OpenAI Codex Chronicle docs | Official docs | Chronicle creates local Markdown memories from screen context, with privacy and prompt-injection considerations. | Watch. Do not require in V2. Use source-preserving file memory now. |
| Claude Code subagents docs | Official docs | Subagents preserve main context by doing focused work in separate contexts with scoped tools and permissions. | Accept the principle of isolated focused workers and explicit tool scope. |
| Claude Code agent teams docs | Official docs | Teams are strongest for parallel research/review, independent feature slices, competing debugging hypotheses, and cross-layer coordination; they add overhead and need careful task sizing. | Accept parallelization readiness and work-unit contracts. |
| Claude Code worktrees docs | Official docs | Worktree isolation helps parallel agents avoid edit conflicts. | Add conflict zones and future worktree/tool-isolation consideration. |
| AutoGen teams docs | Official docs | Multi-agent teams are useful for complex tasks but require more scaffolding than a single agent. Start single-agent unless teams are justified. | Accept the rule that parallelism must earn its overhead. |
| Basic Memory | Repository/docs | Local Markdown memory with MCP tools, search, recent activity, and knowledge graph/context helpers. | Optional future integration; compatible with transparent memory goals. |
| Mem0 | Repository/paper | Popular long-term memory layer with ADD-only extraction, entity linking, hybrid retrieval, and temporal reasoning claims. | Optional future integration; extract the source-preserving and multi-signal retrieval principles. |
| Zep/Graphiti | Repository/paper | Temporal knowledge graph memory for dynamic conversations and business data. | Optional future integration for larger projects needing temporal/cross-session reasoning. |
| A-MEM | Paper/repo | Agentic memory organized with Zettelkasten-like indexing, tags, links, and memory evolution. | Watch for memory organization ideas without adding runtime complexity. |
| MemMachine and structured distillation research | Research | Strong pattern: preserve complete episodic/source records while adding compact retrieval or distilled indexes for efficiency. | Accept source first, summary second; add history ledger and retrieval index. |

## Accepted V2 Practices

- Use the latest completed workflow version to build future workflow-stack changes.
- Keep the visible workflow simple, with deeper protocols triggered by risk or complexity.
- Preserve traceability through goal, spec, plan, tasks, implementation notes, verification, review, and memory.
- Use source-preserving memory layers: source artifacts first, durable summaries second, retrieval pointers third.
- Require parallelization readiness before fan-out.
- Use work-unit contracts for parallel agents.
- Keep one integration owner for parallel work.
- Route repeated bugs to diagnosis; parallelize hypotheses before parallelizing fixes.

## Deferred Practices

- Installing Basic Memory, Mem0, Zep/Graphiti, A-MEM, or another memory runtime.
- Creating project `.codex/agents/` custom agents.
- Requiring worktree isolation by default.
- Auto-capturing full chat transcripts.
- Adding CI guardrails.

## V2 Rationale

The best pattern for this repository is not to install a memory or agent framework immediately. V2 should define the durable contracts first: simple stages, traceable artifacts, source-preserving memory, work-unit contracts, and integration ownership. Tooling can be adopted later when these contracts prove useful and the failure mode is clear.
