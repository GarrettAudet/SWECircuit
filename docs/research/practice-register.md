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
| Primary-source architecture gate before public API freeze | accepted | V9 kernel architecture scan | Require a dated scan and ADR before executable contracts | Prevents runtime, schema, package, and trace choices from becoming accidental public APIs. |
| Node LTS plus compiled TypeScript kernel | accepted | Node release, TypeScript, packages, util, and test docs | Use Node 22.14+ with Node 24 primary and compiled ESM output | Strong IDE reach, supported portability, explicit exports, stable built-in CLI parsing, and stable testing. |
| TypeScript 7 native compiler for V9 | accepted | TypeScript 7 announcement, V9 architecture refresh, and passing private spike | Use TypeScript 7.0.2 plus Biome 2.5.3; do not use the compiler API in V9 | The accepted spike proves strict ESM compilation, declarations, lint, tests, and package inspection with the two approved production dependencies. |
| Canonical JSON plus JSON Schema 2020-12 | accepted | JSON Schema specification and Ajv strict guidance | Make JSON canonical and validate with Ajv 2020 strict mode | Language-neutral, deterministic, directly consumable by IDEs and adapters, and structurally enforceable. |
| YAML manifest input | deferred | V9 kernel architecture scan | Consider only as a canonical-JSON conversion adapter | Avoid parser, typing, anchor, duplicate-key, and normalization choices before demand exists. |
| Source-preserving run events | accepted | CloudEvents, W3C Trace Context, OpenTelemetry, and V8.1 evidence | Use caller-owned JSONL with sequence, causality, links, evidence references, and terminal state; do not claim immutable storage | Makes run reconstruction local and auditable without requiring hosted telemetry or overstating append guarantees. |
| Separate workflow outcomes and execution states | accepted | V8.1 contracts, MCP Tasks, Temporal protocol patterns | Keep routing outcomes, worker status, and governance status as distinct types | Prevents ambiguous state transitions and makes liveness failures explicit. |
| Capability-declared adapter metadata | accepted | MCP lifecycle and capability negotiation | Define compatibility, capabilities, permissions, configuration schema, and failure behavior | Keeps extensions provider-neutral and inspectable without executing arbitrary code in core. |
| Dynamic third-party adapter execution | deferred | V9 kernel architecture scan | Define metadata first; design isolation and trust later | Execution requires stronger permission, sandbox, cancellation, and provenance controls. |
| MCP Tasks compatibility | watch | MCP 2025-11-25 Tasks and 2026 release candidate | Borrow task-lifecycle concepts without claiming protocol compatibility | Tasks remains experimental and the newer MCP revision is not final on the scan date. |
| Trace minimization and redaction | accepted | OWASP logging guidance and W3C Trace Context privacy | Store references and bounded structured evidence by default; exclude secrets and PII | Full transcript or environment capture creates privacy, security, and retention risk. |
| OIDC package publishing with provenance | accepted | npm trusted publishing and provenance docs | Require before public npm publishing | Removes long-lived write tokens and links packages to source and build evidence. |
| Public identity collision check | accepted | V9 scan and npm registry evidence | Resolve adjacent product, domain, repository, and package conflicts before freezing names | DevRail and TraceRail are both already active in adjacent product categories. |
| Unscoped devrail npm package | rejected | npm registry query on 2026-07-09 | Do not publish under the occupied name | The package is owned by another security and quality guardrails project. |
| DevRail public identity | rejected | devrail.dev, npm registry evidence, and V9 public identity scan | Reopen naming and do not use DevRail for current product surfaces | An active adjacent project already uses DevRail, devrail init, .devrail.yml, agent instructions, and CI gates. |
| SWECircuit public project identity | accepted | V9 public identity scan and owner approval | Use for current project and GitHub repository surfaces; defer unrelated machine namespaces | The repository is now `GarrettAudet/SWECircuit`; Circuit is the public composition metaphor and 0.x rail paths remain compatibility artifacts. |
| Host-injected executor port | accepted | V10 executor scan, Codex subagents, MCP Tasks, A2A | Standardize one trusted host invocation without loading a provider in core | Preserves provider neutrality while giving IDEs and runtimes one checkable handoff and result boundary. |
| Invocation-scoped authority grant | accepted | Agent SDK guardrails and hooks, GitHub Actions least privilege, V10 architecture review | Check the invocation's packet, run, attempt, executor, issuer, and bounded permission identities | Separates declared needs and ceilings from actual authority. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay. |
| Three-direction permission coverage | accepted | V10 threat model and capability negotiation practice | Require requests to be granted, grants to be requested, and grants to fit the packet ceiling | Prevents missing authority, authority injection, and ceiling escalation before executor code runs. |
| Cooperative cancellation with abort_unconfirmed | accepted | MCP Tasks and Node process semantics | Before invocation, terminate safely when no executor work started; after invocation, require in-window executor promise settlement after all activity capable of advancing the invocation or producing invocation effects has stopped | Transfer of live work is not acknowledgment; otherwise preserve potentially live work and keep the no-call path explicit. |
| Generic Node subprocess executor | deferred | Official Node child-process semantics | Do not ship as a portable isolation boundary | Sending a signal does not prove process or descendant termination across supported platforms. |
| Dynamic executable loading from AdapterManifest | rejected | V10 executor scan and supply-chain boundary review | Keep manifests declarative and require trusted host injection | Prevents configuration from silently becoming code-loading authority. |
| Independent packed declaration consumer | accepted | V10 packed declaration RCA | Compile emitted public types under consumer-owned settings during canonical verification | Internal source typechecking can miss declaration portability defects. |
| Absolute monotonic lifecycle bounds | accepted | V10 postimplementation review and Node timer semantics | Treat timers as wake-up hints, re-arm early wakes, and compare host observations to absolute deadline and acknowledgment points | Prevents premature timeout and late acknowledgment when timer delivery or abort handling is delayed. |
| Proxy rejection before reflection | accepted | V10 postimplementation security review and Node util types | Reject detectable proxies before array, prototype, key, descriptor, signal, or method reflection | Keeps caller traps out of preflight and makes reflection cost subject to explicit key and node bounds. |
| Public contract parity checks | accepted | V10 exact-candidate reviews and public-contract parity RCA | Bind security- and lifecycle-significant ADR claims to their intended paragraph or table row, require that owner to be active and unique, and use one container-aware active Markdown view for structural owners, capability and boundary prose, navigation, and semantic guards. Preserve raw source only for literal command examples and command or install claims; recognize explicit containers, limit ordinary fence indentation to zero through three spaces, use horizontal whitespace with explicit LF or CRLF handling, require keyed rows in the first contiguous table, normalize logical statements, and reject missing terms, contradictory positive claims, duplicate owners, or misplaced Markdown with diagnostic-bound fixtures. | Repeated green candidates drifted when nearby canonical prose, raw top-level or container-contained fenced content, four-space literal fences, newline-crossing whitespace, legacy heading paths, first-match headings, physical-line checks, host-newline assumptions, or exit-only fixtures did not prove the active contract owner or causal rejection. |
| Agent2Agent protocol mapping | optional | A2A 1.0 specification | Keep as a future remote executor adapter | Useful for cross-host task and artifact exchange, but unnecessary for the local core boundary. |

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
