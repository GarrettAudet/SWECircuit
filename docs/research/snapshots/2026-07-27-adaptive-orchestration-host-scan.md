# Adaptive Orchestration Host Scan

## Snapshot Date

2026-07-27.

## Question

Can SWECircuit implement deterministic least-sufficient specialist routing and native IDE
orchestration without coupling core contracts to one provider or inventing a universal scheduler?

## Conclusion

Yes, with a strict split. Current agentic IDEs expose enough host-side primitives to materialize
task-specific agents, select model/effort, narrow tools or skills, run work concurrently, and
observe lifecycle state. Their configuration formats and trust behavior differ. SWECircuit should
standardize portable demand, inventory, assignment, command, receipt, and RunView contracts while
leaving effects to adapters.

No reviewed source provides the complete SWECircuit product: goal-derived exact work units,
deterministic team construction, least-sufficient runtime binding, digest-bound approval, exact
handoff verification, dependency-safe fan-in, and durable execution trace across IDEs.

## Primary Sources

| Source | Current Capability | Architecture Consequence |
| --- | --- | --- |
| OpenAI Codex subagents manual, current local official snapshot | Project agents can define model, reasoning effort, sandbox, skills, and MCP tools; native subagents expose status, inspection, steering, and stopping | Codex can implement the first adapter; core should use opaque inventory/profile inputs |
| GitHub Copilot SDK custom agents | Agents can specify tools, prompt, MCP, skills, model, and reasoning effort; lifecycle events identify agents and support activity UI | A second host can map the same portable command and observation contracts |
| VS Code custom agents | Workspace agents support tools, agent allowlists, model preferences, handoffs, hooks, and invocation controls | Adapter validation must fail closed when required host tools are unavailable |
| Claude Code subagents | Agent definitions support model, effort, tools, skills, permissions, background execution, worktree isolation, memory, and native task status | Host-specific permission inheritance and isolation belong in supply and launch observations |
| Kubernetes scheduler | Scheduling separates feasibility filtering from scoring and binding | Adopt filter-then-order; use a deterministic canonical tie-break rather than random choice |
| AutoGen AgentChat teams | Team patterns add scaffolding and are recommended only when a single agent is insufficient | Preserve the serial baseline and justify every extra specialist |

## Source Links

- OpenAI Codex manual: local official manual snapshot generated from the Codex documentation on
  2026-07-27; public product guidance is linked from https://developers.openai.com/codex/
- GitHub Copilot SDK custom agents:
  https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/custom-agents
- GitHub custom agent configuration:
  https://docs.github.com/en/copilot/reference/custom-agents-configuration
- VS Code custom agents:
  https://code.visualstudio.com/docs/agent-customization/custom-agents
- Claude Code subagents:
  https://code.claude.com/docs/en/sub-agents
- Kubernetes scheduler:
  https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/
- AutoGen teams:
  https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/teams.html

## Cross-Host Findings

### Common Supply

Across the reviewed hosts, an adapter can usually observe or configure some subset of:

- model or runtime profile;
- reasoning effort;
- tools and MCP servers;
- skills or prompt modules;
- permission mode;
- workspace or worktree isolation;
- concurrent/background execution;
- lifecycle status and native agent identity.

The portable inventory must declare only what that host can actually bind and observe.

### Material Differences

- Codex has project TOML agents and native subagent controls with parent permission inheritance.
- Copilot SDK exposes explicit lifecycle event envelopes suitable for an activity UI.
- VS Code may ignore unavailable tools and supports preferred model lists, so the adapter must add
  stronger fail-closed validation.
- Claude Code has detailed background, permission inheritance, worktree, skill, and persistent
  memory semantics that cannot be assumed on other hosts.

These differences validate an adapter boundary rather than a common provider API.

### Routing

Kubernetes' filter then score structure is a useful general scheduler pattern. SWECircuit differs
in three important ways:

- quality and authority are hard gates rather than scores;
- cost is optimized only among sufficient candidates;
- fixed inputs use a canonical tie-break so approval and replay remain deterministic.

### Team Size

AutoGen's guidance to begin with a single agent for simpler tasks aligns with the V11 serial
baseline. Parallelism is an optimization under dependency, conflict, evidence, and startup costs,
not a goal by itself.

## Accepted Practices

- Separate task-shaped specialist compilation from runtime assignment compilation.
- Treat model/profile catalogs as host-supplied, digest-bound inventory.
- Require owner-reviewed calibration for capability and quality tiers.
- Filter hard requirements before any cost or latency optimization.
- Preserve selected and rejected alternatives with stable reasons.
- Bind overrides and launch observations to immutable source digests.
- Render one source-derived RunView and reuse native IDE agent controls.
- Keep a strong serial baseline.

## Rejected Or Deferred Practices

| Practice | Decision | Reason |
| --- | --- | --- |
| Hard-coded provider model catalog in core | Rejected | Volatile, non-portable, and impossible for core to calibrate universally |
| Opaque model-based router | Rejected | Not reproducible or approval-bound |
| Automatic fallback when a required tool is absent | Rejected | Can silently violate task evidence and authority |
| Strongest-model default for every specialist | Rejected | Costly and hides inadequate demand modeling |
| Custom pinned IDE panel in V14 | Deferred | Requires a supported host extension surface; RunView comes first |
| Universal scheduling and crash recovery | Deferred | Not required for the first useful native IDE loop |

## Adoption Gate

- Closed contract and ADR pass independent review.
- Routing tests cover determinism, all hard gates, tie-breaks, overrides, and catalog drift.
- At least two host shapes are represented by fixtures.
- Real Codex dogfood uses at least two different least-sufficient assignments.
- Controller and RunView reconstruct exactly after restore.
- Small, medium, and high-risk dogfood runs pass quality and trace review.
