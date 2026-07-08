# Glossary

## Terms

| Term | Definition |
| --- | --- |
| Bootstrap exception | The initial V1-V3 baseline creation flow used before normal version branches can apply. |
| Development milestone | A short version overview under `docs/milestones/` that summarizes shipped progress, evidence, residual risks, and next work. |
| Feature package | A folder under `docs/specs/` containing the spec, plan, tasks, test plan, implementation notes, debug notes, RCA, and review. |
| Guided gate | A checkpoint where the agent may proceed on low-risk assumptions only if those assumptions are recorded. |
| History ledger | An append-only chronological memory file that records meaningful work, versions, decisions, and links to source artifacts. |
| IDE interaction protocol | The chat-facing workflow contract that makes stage, branch, artifact, assumptions, evidence, verification, and next gate visible to the user. |
| Integration owner | The agent or human responsible for combining parallel work, resolving conflicts, running integrated verification, and completing review. |
| Parallelization readiness | The task-plan checkpoint that decides whether work can safely fan out to subagents or parallel agents. |
| Problem-solving mode | A diagnostic branch for unclear, recurring, flaky, or surprising failures. |
| Practice register | The governance record for accepted, optional, watched, deferred, or rejected ecosystem practices. |
| Research snapshot | A dated record of ecosystem research used to update the workflow. |
| Retrieval index | A compact map from topics, features, stages, files, and decisions to source artifacts. |
| Source-preserving memory | A memory approach that keeps primary evidence available and uses summaries or indexes only as retrieval aids. |
| Stable baseline | The approved state of the repository on `main` that future version branches start from. |
| Standalone agent baseline | The single-agent/IDE workflow foundation where one agent can execute a bounded goal end to end with traceability and verification. |
| Standalone agent work package | A contract for one agent owning a bounded goal, including scope, authority, context, verification, stop conditions, handoff, and memory updates. |
| Typed outcome | The explicit result emitted by each workflow stage: `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn`. |
| Adapter | An optional external tool, framework, skill, plugin, MCP server, service, or runtime connected to the file-based workflow after evaluation and approval. |
| Adapter evaluation | The V5 process for deciding whether an external tool should be accepted, optional, watched, deferred, or rejected before installation. |
| Decomposition plan | A framework artifact that turns a shared goal into work units, dependencies, conflict zones, fan-out, fan-in, and verification. |
| Framework kernel | The file-based core of this workflow: stable contracts, templates, checks, and memory that external tools can plug into. |
| Module | A reusable workflow capability with defined purpose, inputs, outputs, stage hooks, verification, failure modes, and memory updates. |
| Module registry | The framework governance file that records accepted file contracts and optional adapters. |
| Orchestration pattern | A selected coordination shape such as single-agent, skill, router, subagents, handoffs, directed graph, or hierarchical crew. |
| Orchestration run record | A source artifact that preserves agent roster, handoffs, integration, verification, review, and memory updates for fan-out work. |
| Capability adapter | A TraceRail contract that extracts a useful external-project capability without making the external project a required dependency. |
| Orchestration compiler | A capability that reads repository context and synthesizes project-specific agent roles, work units, handoffs, critic path, synthesis path, permissions, and integration order. |
| Skills-driven development transition | A capability that moves from idea to spec to implementation through triggered skills, readable checkpoints, approval gates, and verification mapping. |
| Artifact | A typed work object that moves through a rail, such as goal, context, spec, task plan, diff, evidence, review, milestone, or memory entry. |
| Gate | A decision point between modules that checks evidence and routes with a typed outcome. |
| Rail | An ordered composition of modules, typed artifacts, and gates. |
| Rail Composition | The core TraceRail abstraction: `input | module | module | output`. |
| TraceRail | The public name for this portable AI SWE workflow system: a contract-first framework kernel for traceable human-agent development. |
| Version branch | A branch for one workflow version, named `codex/vVERSION-slug`, that merges to `main` after approval. |
| Work-unit contract | A structured handoff for a parallel agent that defines objective, scope, context, conflicts, allowed actions, verification, handoff, and stop conditions. |




