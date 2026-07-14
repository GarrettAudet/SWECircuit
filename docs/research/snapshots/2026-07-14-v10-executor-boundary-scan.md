# V10 Executor Boundary Ecosystem Scan

## Snapshot

- Date: 2026-07-14
- Scope: provider-neutral agent execution, task lifecycle, cancellation, guardrails, tracing, and CI isolation
- Decision target: the smallest honest execution boundary that can extend the V9 kernel
- Evidence policy: primary and official sources only

## Question

How should SWECircuit execute one bounded work packet while preserving explicit authority, traceability, provider neutrality, and honest cancellation semantics?

## Sources And Findings

### OpenAI Codex subagents and app server

Official Codex documentation describes the parent agent as the orchestration owner for spawning, routing, waiting, and closing subagents. Subagents inherit the parent sandbox and approval mode; a non-interactive subagent cannot independently obtain a new approval. The app server exposes explicit thread and turn lifecycles, streamed events, and interruption through a versioned JSON-RPC boundary.

Implication: SWECircuit should define bounded work, authority, lifecycle, and evidence while leaving actual sandbox and approval enforcement to the embedding host.

Source: `https://developers.openai.com/codex/subagents/` and the official Codex app-server documentation retrieved through the Codex manual on 2026-07-14.

### Model Context Protocol Tasks

The MCP Tasks extension uses capability negotiation and durable task handles with working, input-required, completed, failed, and cancelled states. Cancellation is cooperative and a task may still complete. Task identity must exist durably before a task response is returned.

Implication: V10 should preserve explicit lifecycle states and avoid claiming terminal cancellation before acknowledgment. MCP compatibility is useful later but should not become a core dependency while Tasks remains an optional protocol extension.

Source: `https://modelcontextprotocol.io/extensions/tasks/overview`

### Agent2Agent Protocol 1.0

A2A separates messages, task state, and artifacts and standardizes lifecycle, streaming, cancellation, capabilities, signatures, and versioning for agent-to-agent coordination.

Implication: SWECircuit's packet, event, and evidence boundaries can map to A2A later. V10 should not duplicate the remote protocol or require it for local embedding.

Source: `https://a2a-protocol.org/latest/whats-new-v1/`

### Node child-process semantics

Official Node documentation states that `spawn` defaults to no shell and supports signals, timeouts, and hidden Windows windows. It also warns that `subprocess.kill()` reports that a signal was sent, not that the process terminated, and that killing a parent does not reliably terminate descendant processes across platforms.

Implication: a pure Node child-process adapter cannot be presented as an isolation boundary or reliable process-tree canceller. V10 should defer arbitrary process execution until a native, container, hosted, or platform-specific containment design is evaluated.

Source: `https://nodejs.org/download/release/latest-v24.x/docs/api/all.html`

### OpenAI Agents SDK guardrails and tracing

Official SDK guidance distinguishes agent-level input and output guardrails from tool guardrails that wrap every tool call. Tracing records runs, tool calls, handoffs, and guardrail outcomes, with explicit sensitive-data controls.

Implication: execution authority and output normalization must be applied per invocation. Trace records should contain bounded references and state, not raw provider payloads.

Sources: `https://openai.github.io/openai-agents-js/guides/guardrails/` and `https://openai.github.io/openai-agents-python/tracing/`

### Claude Agent SDK hooks

Official Anthropic documentation provides pre-tool and post-tool hooks for permissions, approval, audit, and policy. Subagents do not automatically inherit parent permission hooks, and recursive hook behavior requires care.

Implication: permission declarations cannot substitute for host enforcement, and every adapter invocation needs an explicit authority bundle.

Source: `https://code.claude.com/docs/en/agent-sdk/hooks`

### GitHub Actions security

GitHub's official security guidance warns that untrusted repository content combined with privileged tokens or secrets can compromise a runner. It recommends least privilege and separating untrusted build work from privileged actions.

Implication: future CI executors must separate work execution from merge or release authority. V10 must not combine execution with merge, credentials, or privileged persistence.

Sources: `https://docs.github.com/en/actions/reference/security/secure-use` and `https://docs.github.com/en/actions/concepts/security/script-injections`

## Evaluated Practices

| Practice | Disposition | Rationale |
| --- | --- | --- |
| Host-injected executor port | Accept for V10 | Keeps provider and sandbox policy outside the kernel while standardizing one invocation. |
| Ephemeral invocation-bound authority grant | Accept for V10 | Separates actual authority from packet ceilings and adapter requests. |
| Caller-owned schema-valid lifecycle journal | Accept for V10 | Adds trace evidence without making durability or tamper-resistance claims. |
| Cooperative cancellation with explicit unconfirmed state | Accept for V10 | Matches real executor semantics and prevents false terminal evidence. |
| In-process deterministic test executor | Accept for V10 | Proves the port offline with no external authority or dependency. |
| Generic Node subprocess executor | Defer | Cannot guarantee process-tree containment or termination across supported platforms. |
| Dynamic adapter loading from manifest | Reject from core | Turns declarative artifacts into an execution and supply-chain boundary. |
| MCP Tasks mapping | Watch | Useful interoperability target after the local lifecycle contract is proven. |
| A2A mapping | Optional future adapter | Useful for remote agents but unnecessary for the core local boundary. |
| Automatic retries, merge, or memory mutation | Defer | Requires separate policy, idempotency, privilege, and governance decisions. |

## V10 Recommendation

Implement one operation shaped as:

```txt
validated packet | compatible manifest | host grant | injected executor -> lifecycle journal + bounded result
```

The host supplies and sandboxes executable code. SWECircuit validates identity and authority relationships, provides an abort signal, normalizes the result, and returns inspectable events. It must never load executable manifest content, interpret a shell string, persist provider output, or report terminal cancellation without executor acknowledgment.

## Promotion Targets

- ADR 0002 for the runtime and security boundary.
- V10 feature package for acceptance criteria and tests.
- `docs/framework/capability-adapters.md` for adapter-author guidance.
- `docs/research/practice-register.md` for accepted and deferred ecosystem practices.
- Memory after implementation proves the pattern.
