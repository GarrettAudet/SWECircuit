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
| Approval gate | The milestone section that records source branch, target branch, current merge state, required decision, and post-approval merge action. |
| Decomposition plan | A framework artifact that turns a shared goal into work units, dependencies, conflict zones, fan-out, fan-in, and verification. |
| Framework kernel | The file-based core of this workflow: stable contracts, templates, checks, and memory that external tools can plug into. |
| Module | A reusable workflow capability with defined purpose, inputs, outputs, stage hooks, verification, failure modes, and memory updates. |
| Module registry | The framework governance file that records accepted file contracts and optional adapters. |
| Orchestration pattern | A selected coordination shape such as single-agent, skill, router, subagents, handoffs, directed graph, or hierarchical crew. |
| Orchestration run record | A source artifact that preserves agent roster, handoffs, integration, verification, review, and memory updates for fan-out work. |
| Orchestration-readiness pack | The first official SWECircuit pack, used to prepare safe agent fan-out with decomposition, contracts, permissions, verification, integration ownership, and memory updates. |
| Capability adapter | A SWECircuit contract that extracts a useful external-project capability without making the external project a required dependency. |
| Orchestration compiler | A capability that reads repository context and synthesizes project-specific agent roles, work units, handoffs, critic path, synthesis path, permissions, and integration order. |
| Skills-driven development transition | A capability that moves from idea to spec to implementation through triggered skills, readable checkpoints, approval gates, and verification mapping. |
| Artifact | A typed work object that moves through a circuit, such as goal, context, spec, task plan, diff, evidence, review, milestone, or memory entry. |
| Gate | A decision point between modules that checks evidence and routes with a typed outcome. |
| Circuit | An ordered or branched composition of modules, typed artifacts, and gates. |
| Rail | The historical and 0.x compatibility term and path name for a circuit. |
| Circuit Composition | The core SWECircuit abstraction: `input | module | module | output`. |
| Community pack | A third-party SWECircuit extension that declares circuit, module, adapter, permission, verification, and rollback contracts but is not recommended by default. |
| Core SWECircuit | The required file-based baseline that works without optional downloads. |
| Local override | A project-specific circuit, module, adapter, or memory override kept outside core. |
| Official pack | A curated optional extension maintained by the SWECircuit project. |
| Pack | An optional bundle of circuits, modules, adapters, examples, or review gates for a specific use case. |
| Recommended pack | An optional pack that passed conformance checks and has dogfooding evidence, permissions review, rollback, and maintainer ownership. |
| SWECircuit | The current public name for this portable AI SWE workflow system: a contract-first framework kernel for traceable human-agent development. |
| TraceRail | The historical project identity used by V5-V8 artifacts and preserved as source provenance. |
| Version branch | A branch for one workflow version, named `codex/vVERSION-slug`, that merges to `main` after approval. |
| Work-unit contract | A structured handoff for a parallel agent that defines objective, scope, context, conflicts, allowed actions, verification, handoff, and stop conditions. |
| Packed-consumer gate | A verification step that packs the private artifact, installs it into an isolated offline consumer from a pinned dependency closure, resolves the installed entry, executes supported operations, and proves cleanup. |
| Acceptance candidate | An immutable commit containing the complete implementation and closeout state that receives exact CI and independent review before an evidence-only final attestation. |
| Execution grant | A closed runtime object supplied by the embedding host that carries invocation-scoped run, attempt, work-packet, executor, and permission assertions. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay. |
| Work-packet executor | A trusted caller-injected port that receives one frozen work packet, checked grant, and abort signal, then returns one closed settlement. |
| Abort unconfirmed | A non-terminal execution disposition meaning abort was requested but no contract-compliant executor promise settlement was observed before the absolute acknowledgment bound after all invocation-affecting activity stopped, so work may still be live. |
| Executor boundary | The V10 provider-neutral operation that preflights and invokes exactly one host-selected work packet and returns a frozen summary plus V9-compatible journal. |
| Absolute deadline timer | A timer wrapper that treats wake-ups as hints, rechecks monotonic time, and re-arms until the actual deadline is observed. |
| CommonMark blank line | A Markdown line containing no characters or only U+0020 spaces or U+0009 tabs; broader Unicode whitespace is not blank for block-state transitions. |
| Container-relative blank | A line whose content becomes blank after matching surviving outer containers, allowing an inner quote to end while an outer quote or list remains active. |
| Absolute Markdown column | The physical zero-based display column carried through stripped quote and list prefixes so tab stops and nested indentation retain their original meaning. |
| Partial tab consumption | A grammar transition that consumes fewer columns than a tab spans; the remaining tab-expanded columns must stay in the content rather than disappear with the source character. |
| Container-relative fence indentation | The zero through three indentation columns allowed before a fence marker after active quote or list containers; tabs must be expanded from the carried absolute column before matching. |
