# V11 Portable Orchestration Ecosystem Scan

## Snapshot Date

2026-07-15.

## Purpose

Identify current primary-source practices that improve goal decomposition, specialized-agent assignment, bounded parallel work, human clarification, integration, and traceability while preserving SWECircuit as an IDE-, model-, and provider-agnostic framework.

This snapshot informs a proposed architecture. It does not install, endorse wholesale, or create runtime dependencies on any surveyed tool.

## Product Boundary

SWECircuit is not a model selector, prompt router, or provider API gateway. It standardizes the software-engineering control plane:

```txt
goal -> modules -> work packets -> capability assignments -> ready waves
     -> host execution -> fan-in -> integrated gates -> trace -> learning
```

An IDE, CLI, CI runner, local agent runtime, or remote protocol may host this loop. The same plan and transition rules should retain their meaning across hosts.

## Primary Sources

| Source | Current Practice Observed | V11 Use |
| --- | --- | --- |
| OpenAI Codex subagents | Delegate bounded independent work with explicit context; keep the main thread responsible for synthesis and decisions; start with read-heavy work and avoid overlapping write scopes | Fresh context bundles, bounded specialist roles, one integration owner, conflict-aware fan-out |
| Anthropic Claude Code subagents and agent teams | Define role-specific agents, shared dependency tasks, claim coordination, plan approval, hooks, and focused team sizes; use worktrees for isolated parallel edits | Structured capability profiles, dependency-aware readiness, lifecycle gates, bounded concurrency, host-enforced workspace isolation |
| Anthropic Claude Code workflows | Keep dynamic orchestration in inspectable, repeatable workflow logic with concurrency bounds, approvals, and independent checking | Host-authored policy bounds replication; deterministic compiler and reducer enforce it; AI output is proposal data |
| GitHub Copilot custom agents and hooks | Describe specialized agents with scoped instructions and tools; use lifecycle hooks for policy checks | Portable role/capability declarations and gate hooks, without coupling to Copilot |
| Agent2Agent Protocol 1.0 | Advertise machine-readable agent capabilities and skills; represent stateful tasks and input-required interaction | Agent-profile inspiration and explicit clarification lifecycle; protocol remains an optional adapter |
| LangGraph interrupts | Persist an interrupt, return an input-required state, and resume against stable state identity | Exact-revision clarification and approval pause/resume |
| Microsoft AutoGen GraphFlow | Represent sequential, parallel, conditional, and loop behavior as an explicit graph | Deterministic dependency graph and bounded ready-wave semantics |
| RFC 8785 JSON Canonicalization Scheme | Canonicalize I-JSON deterministically through ECMAScript primitive serialization and property sorting | Portable orchestration content digests before SHA-256 |

## Source Links

- OpenAI Codex subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents.md
- Anthropic Claude Code agents: https://code.claude.com/docs/en/agents
- Anthropic Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Anthropic Claude Code agent teams: https://code.claude.com/docs/en/agent-teams
- Anthropic Claude Code worktrees: https://code.claude.com/docs/en/worktrees
- Anthropic Claude Code workflows: https://code.claude.com/docs/en/workflows
- GitHub Copilot custom agents: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents
- GitHub Copilot hooks: https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/hooks
- Agent2Agent specification: https://a2a-protocol.org/latest/specification
- LangGraph interrupts: https://docs.langchain.com/oss/python/langgraph/interrupts
- AutoGen GraphFlow: https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/graph-flow.html
- RFC 8785 JSON Canonicalization Scheme: https://www.rfc-editor.org/rfc/rfc8785
- AGENTS.md convention: https://agents.md/

## Practices Accepted For V11 Design

### Inspectable Control Logic

The orchestration plan and transition rules must exist as bounded structured data and deterministic core logic, not only inside a model conversation. A human or tool should be able to inspect why a packet was created, assigned, made ready, gated, or blocked.

### Planner As Proposal Producer

A human, rule engine, IDE agent, or model may propose decomposition. SWECircuit validates references, graph structure, acceptance coverage, permissions, limits, and conflict metadata before any worker call. Planner output never self-authorizes execution.

### Host-Authored Bounded Replication

The workflow author may declare finite replication regions over existing Circuit branch subgraphs. A planner may choose lane counts and packet content only inside those bounds; it cannot invent nodes, routes, gates, joins, roles, or authority. Diagnosis and fix successors remain lane-local until the named join.

### Criterion-To-Evidence Coverage

Every goal criterion must map to named producer, verifier, reviewer, and evidence requirements in the compiled Plan. Worker completion is never accepted as implicit goal completion, and merge-ready status requires integrated coverage for every criterion.

### Provider-Neutral Capability Profiles

Profiles describe stable work capabilities, accepted module contracts, input/output kinds, authority ceilings, capacity, and host-supported isolation. Matching ignores provider, model, API, and IDE identity. A host remains free to implement one profile with any suitable runtime.

### Dependency-Aware Ready Waves

A packet becomes ready only when prerequisites and relevant gates pass. Bounded fan-out, explicit joins, stable ordering, one integration owner, and a safe conflict policy replace unconstrained agent spawning.

### One Coordinator, Same Surface

The one-agent and multi-agent paths should be one contract. One agent is an allowlisted profile with one slot; scale adds profiles and capacity. One serialized coordinator commits complete waves before effects and reduces complete result batches, keeping the first implementation deterministic and inspectable.

### Fresh Bounded Context

Each worker receives the smallest source-preserving context bundle needed for its packet. Full repository dumps and full chat transcripts are neither required nor default.

### Explicit Clarification And Approval

Ambiguity produces `input_required` rather than silent invention. Resume data binds to the exact request and state revision. Host persistence and atomicity are named separately from core validation.

### Conservative Conflict Safety

Core can reason about canonical read, write, and conflict scopes but cannot create or police worktrees, sandboxes, credentials, or processes. V11 serializes every overlapping or unknown writer scope and accepts no isolation exception. Enforceable workspace leases and overlapping-write adapters remain future work.

### Independent Fan-In And Integrated Gates

Worker-local success is evidence, not final acceptance. The system still requires dependency joins, integration, complete acceptance-criteria verification, review, and owner-controlled merge.

### Source-Preserving Parent Trace

Parent events link goals, plan revisions, modules, work packets, assignments, claims, child run summaries, gates, clarifications, evidence references, and final outcomes. Raw prompts, chats, logs, provider payloads, secrets, and environment dumps remain outside canonical trace.

## Practices Deferred Or Rejected

| Practice | Status | Reason |
| --- | --- | --- |
| Provider or model selection in core | Rejected | It would make workflow semantics host-specific and contradict the product boundary |
| Automatic agent spawning from manifests | Rejected | Declarative configuration must not become executable authority |
| Unbounded fan-out | Rejected | It increases conflicts, cost, liveness risk, and integration failure |
| Worker success equals merge readiness | Rejected | Local completion does not prove integrated correctness |
| Core-owned worktree, sandbox, credential, or process enforcement | Deferred | These are host effects and require platform-specific adapters |
| Distributed claim lock in a stateless library | Rejected as a core claim | Cross-process exclusivity requires serialized or atomic durable host persistence |
| Full chat-history capture in canonical trace | Rejected | It creates privacy, security, retention, and retrieval costs |
| Automatic durable memory mutation | Deferred | V11 should first emit reviewable memory candidates and provenance |
| A2A, LangGraph, AutoGen, or IDE dependency in core | Rejected for V11 core | Their useful patterns can be represented through portable contracts and optional adapters |

## Architecture Implications

1. Keep the immutable PolicyBundle authoritative: exact Circuit, Module, and WorkPacket-template closure plus host-authored bounded replication, logical roles, node functions, and authority ceilings.
2. Put acceptance policy in GoalContract and treat planner output as bounded lane-count and narrowed concrete-work proposals, never authority or acceptance.
3. Use one simple facade for one agent and many agents; default concurrency to one and require explicit bounded parallelism.
4. Keep plans immutable, compiler-derived coverage/integration visible, and live assignment in orchestration state.
5. Root permissions in host-supplied RunAuthority and narrow them at every layer.
6. Reserve worst-case result reduction, consume attempt identities, and commit one complete conflict-safe wave before execution effects.
7. Reduce one complete child-result batch through a serialized two-pass boundary so join losers cannot route or transfer.
8. Reuse V10 through a one-shot dispatch capability and bind every handoff identity, effect observation, and digest.
9. Preserve parent-child links, content-bound journal tails, and evidence references rather than payload copies.
10. Make clarification, uncertainty, failure, lane-local diagnosis, fan-in/integration, verification, review, owner approval, memory proposals/candidates, and merge-ready evidence explicit.
11. Use RFC 8785 plus SHA-256 for portable content identity and enforce exact privacy/resource ceilings, including truthful post-dispatch overflow.
12. Prove one-agent usability and two-host semantics before claiming portable multi-agent orchestration.

## Adoption Gate

Promote these practices into accepted ADRs, schemas, APIs, handbook rules, or the practice register only after:

- independent architecture, API, lifecycle, and security review;
- deterministic and adversarial tests;
- one real SWECircuit dogfood run;
- measured serial-versus-parallel evidence with equivalent outputs;
- a failure cascade that routes to diagnosis rather than repeated patching;
- source-preserving trace reconstruction;
- owner review of complexity and usability.
