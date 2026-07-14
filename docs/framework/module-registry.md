# Module Registry

## Purpose

This registry records which workflow modules are part of the baseline and which ecosystem tools are optional adapters. It keeps the system current without letting random tools become hidden dependencies.

## Status Values

Executable kernel capabilities use **implemented-0.x** until a public compatibility policy is approved.

- `accepted-file-contract`: part of the baseline as Markdown, templates, checks, or review gates.
- `optional-adapter`: approved as a future integration candidate, not installed by default.
- `watch`: promising but not mature or necessary enough.
- `deferred`: useful later, after a clearer friction point.
- `rejected`: intentionally not adopted.

## Baseline Modules

| Module | Status | Source Inspiration | Contract | Rationale |
| --- | --- | --- | --- | --- |
| Circuit composition module | accepted-file-contract | LangChain composition model, PromptChainer research | `docs/framework/rail-composition.md`, `docs/framework/_rail-template.md`, `docs/rails/`, `docs/modules/` | Establishes the simple pipe-like primitive and concrete catalogs that all SWECircuit workflows compose around. |
| Spec module | accepted-file-contract | GitHub Spec Kit | `docs/specs/_template/`, handbook stages | Spec, plan, tasks, clarify, analyze, implement, and converge concepts are central but file-based V5 avoids tool lock-in. |
| Architecture and ADR module | accepted-file-contract | ADR practice, Spec Kit planning | `docs/modules/architecture-review.md`, handbook architecture check, feature plan | Keeps design decisions explicit before implementation. |
| Agent instruction module | accepted-file-contract | Codex `AGENTS.md` | `AGENTS.md` | Gives agents a canonical project entrypoint. |
| Memory module | accepted-file-contract | Basic Memory, Mem0, Zep, Graphiti, A-MEM | `docs/memory/` | Preserves durable context without installing a memory runtime. |
| Retrieval module | accepted-file-contract | Serena, Repomix, Context7, official docs patterns | Handbook retrieval policy, retrieval index | Makes context stage-aware and source-preserving. |
| Verification and review module | accepted-file-contract | CI, code review, root-cause practice | `scripts/check-template.ps1`, PR template, review files | Ensures the workflow has evidence before merge. |
| IDE interaction module | accepted-file-contract | V4 dogfooding | `docs/ide/` | Makes workflow state visible in chat. |
| Standalone agent module | accepted-file-contract | V4 dogfooding | `docs/agents/` | Makes one agent capable before scaling out. |
| Parallel work module | accepted-file-contract | Codex subagents, agent-team practices | Handbook parallel section, work-unit contract | Enables safe fan-out through contracts and integration ownership. |
| Modular orchestration module | accepted-file-contract | LangChain patterns, AutoGen teams, CrewAI crews, BMAD lifecycle | `docs/framework/` | Lets the system choose patterns and adapters without installing a runtime by default. |
| Tool adapter module | accepted-file-contract | Spec Kit extensions and presets, framework plugin patterns | `_adapter-evaluation-template.md` | Evaluates external tools before adoption. |
| Pack system module | accepted-file-contract | Package/plugin ecosystem practice | `docs/packs/` | Keeps optional downloads, recommended packs, community packs, and local overrides separate from core. |
| Capability adapter module | accepted-file-contract | Superpowers and Astraeus | `docs/framework/capability-adapters.md` | Extracts useful external project capabilities as SWECircuit contracts before installation. |

## Kernel Capabilities

| Capability | Status | Source | Contract | Boundary |
| --- | --- | --- | --- | --- |
| Bounded executor boundary | implemented-0.x | Codex subagents, MCP Tasks, A2A, Node cancellation, agent SDK guardrails | [Executor boundary](executor-boundary.md), ADR 0002, public library types | Executes one host-selected packet through trusted injected code; the host retains scheduling, isolation, permission enforcement, persistence, retry, merge, and memory. |
## Optional Adapter Candidates

| Adapter | Status | Best Use | Adoption Trigger | Current Decision |
| --- | --- | --- | --- | --- |
| GitHub Spec Kit | optional-adapter | Automating spec, plan, tasks, clarify, analyze, checklist, implement, and converge phases. | File-based specs become too manual or teams want slash-command automation. | Use concepts now; evaluate installation later. |
| BMAD Method | optional-adapter | Full lifecycle, role-based agents, planning depth, and process packs. | A project needs a broader product-to-delivery lifecycle than this baseline. | Mine practices; do not install by default. |
| LangChain or LangGraph | optional-adapter | Runtime pattern implementation, graph workflows, routers, subagents, handoffs, context engineering, and pipe-like composition. | A product needs an actual agent runtime, not just SWE workflow. | Adopt Circuit Composition principle and pattern vocabulary; defer runtime dependency. |
| AutoGen AgentChat | optional-adapter | Teams, selector group chat, swarm, GraphFlow, memory, logging, and stateful multi-agent experiments. | A project needs programmable multi-agent teams with explicit team patterns. | Use as reference for team/run concepts. |
| CrewAI | optional-adapter | Crews, tasks, sequential or hierarchical processes, memory, knowledge, callbacks, and checkpointing. | A project needs role/task crews and resumable long-running workflows. | Use as reference for crew and checkpoint concepts. |
| Codex subagents | optional-adapter | Read-heavy exploration, review, testing, diagnosis, and isolated bounded implementation slices. | Current environment provides subagent tooling and work-unit contracts are ready. | Dogfooded for V10 architecture and security review; a production provider adapter remains optional. |
| Superpowers | optional-adapter | Skills-driven development transition from idea to spec to approved implementation plan and subagent execution. | The team wants plugin-backed skills and has evaluated privacy, telemetry, and cross-agent fit. | Extract methodology now; install only after adapter evaluation. |
| Astraeus | optional-adapter | Repository-aware orchestration compiler for synthesizing project-specific subagents, critic path, synthesis path, and scoped permissions. | A project needs repeatable agent-team synthesis beyond static decomposition templates. | Extract orchestration contract now; install only after adapter evaluation. |
| Serena | optional-adapter | Semantic code retrieval in larger repositories. | Text search becomes insufficient for code navigation. | Defer until a large repo needs it. |
| Repomix | optional-adapter | Packaging repository context for external review or model handoff. | A reviewer or external model needs a compact repo bundle. | Defer until needed. |
| Context7 or official docs MCPs | optional-adapter | Current dependency docs for unstable libraries. | Dependency behavior is uncertain and official docs lookup is repeatedly needed. | Use official docs or browsing case by case. |
| Basic Memory | optional-adapter | Local Markdown memory with MCP search and graph helpers. | Manual memory updates become too slow or unreliable. | Strong candidate because it preserves local Markdown. |
| Mem0 | optional-adapter | Long-term memory extraction and hybrid retrieval. | Project needs cross-session personalization or memory search beyond files. | Evaluate privacy and source preservation first. |
| Zep or Graphiti | optional-adapter | Temporal knowledge graph memory. | Project needs temporal reasoning across long histories and structured business entities. | Defer as heavier memory option. |
| A-MEM | watch | Evolving Zettelkasten-like memory organization. | Research and implementation mature enough for practical use. | Watch for concepts, not dependency. |
| MCP Tasks | watch | Map durable remote task state and cooperative cancellation to SWECircuit lifecycle. | The local executor lifecycle is stable and a host needs MCP interoperability. | Watch the evolving extension; do not claim protocol compatibility in V10. |
| Agent2Agent Protocol | optional-adapter | Route work packets to remote agents with versioned capabilities, task state, and artifacts. | A project needs cross-host remote-agent interoperability. | Keep as a future protocol adapter; core remains local and provider-neutral. |
## Promotion Path

```txt
research snapshot -> adapter evaluation -> practice register -> module registry -> handbook or template -> checker or review gate -> dogfood
```

## Removal Path

If a module or adapter creates waste:

1. Record the friction in the feature package.
2. Mark the registry entry `deferred`, `watch`, or `rejected`.
3. Remove handbook or checker requirements if they no longer pay for themselves.
4. Update memory and the practice register.
