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
| Semantic code retrieval | optional | Serena | Document as future integration | Valuable for larger repos, unnecessary in the v3 template. |
| Repo packing | optional | Repomix | Document as future integration | Useful for external review, not required in core workflow. |
| Live dependency docs | optional | Context7 and official docs MCPs | Document as future integration | Useful for unstable libraries; v2 records the retrieval policy only. |
| Basic Memory | optional | Basic Memory GitHub/docs | Consider after file-based memory is dogfooded | Attractive because it uses local Markdown and MCP, but installation would add a tool dependency. |
| Mem0 | optional | Mem0 GitHub/paper | Consider for future memory integration | Strong ecosystem momentum and hybrid retrieval, but not needed for v2's portable file layer. |
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


