# TraceRail Framework

## Purpose

TraceRail's framework layer lets the workflow absorb best-in-class practices without making every project install a heavy agent stack. The handbook remains the simple operating manual. The framework layer defines modular contracts underneath it.

Use this layer when work needs one of these:

- A new workflow module.
- A new external tool or agent-framework adapter.
- A goal decomposition that may fan out across agents.
- A repeatable orchestration pattern.
- A durable way to compare best practices before promoting them.

## Quick Path

1. Start with the normal handbook workflow.
2. If the work is still single-agent and clear, stay single-agent.
3. If the work needs a module, check `module-registry.md`.
4. If a module exists, use its contract and templates.
5. If an external tool is proposed, complete `_adapter-evaluation-template.md` before installing anything.
6. If the goal may fan out, complete `_decomposition-plan-template.md`.
7. If agents actually fan out, record the run with `_orchestration-run-template.md`.
8. Verify, review, and update memory as usual.

## Framework Layers

| Layer | Purpose | Core Artifact |
| --- | --- | --- |
| Operating surface | Human and agent quick path. | `AGENTS.md`, `docs/ai/handbook.md` |
| Module contracts | Reusable capability definitions. | `docs/framework/_module-template.md` |
| Module registry | Governance for accepted modules and optional adapters. | `docs/framework/module-registry.md` |
| Pattern selection | Choose single-agent, skill, router, subagent, handoff, graph, or crew-style coordination. | `docs/framework/orchestration-patterns.md` |
| Decomposition | Break a goal into work units with dependencies, conflicts, and evidence. | `docs/framework/_decomposition-plan-template.md` |
| Run record | Preserve fan-out, handoffs, integration, and verification. | `docs/framework/_orchestration-run-template.md` |
| Adapter adoption | Evaluate external tools before installation. | `docs/framework/_adapter-evaluation-template.md` |
| Capability adapters | Extract reusable external project capabilities as contracts before installing tools. | `docs/framework/capability-adapters.md` |

## Module Definition

A module is a reusable workflow capability with a stable contract. A module can be fully file-based or backed by an optional tool adapter.

Every module defines:

- Purpose.
- When to use it.
- Inputs.
- Outputs.
- Stage hooks.
- Context bundle.
- Verification.
- Failure modes.
- Memory updates.
- Adapter options.
- Adoption status.

## Adapter Definition

An adapter connects the portable file-based workflow to an external tool, framework, skill, plugin, MCP server, or service. Adapters are optional unless the user explicitly approves installation.

Adapter decisions must preserve:

- Simplicity.
- Traceability.
- Source evidence.
- Human inspectability.
- Rollback path.
- Security and privacy boundaries.
- Verification evidence.

## Default Modules

The V5 baseline defines these modules:

- Spec module.
- Architecture and ADR module.
- Agent instruction module.
- Memory module.
- Retrieval module.
- Verification and review module.
- IDE interaction module.
- Standalone agent module.
- Parallel work module.
- Modular orchestration module.
- Tool adapter module.
- Capability adapter module.

## Adoption Rule

Use concepts immediately when they can be expressed as simple files, templates, checks, or review gates. Install external tools only after a specific repeated friction point proves the need and the adapter evaluation is complete.

## Done Definition

Framework work is done when:

- The module or adapter has a source artifact.
- The registry records status and rationale.
- The handbook or `AGENTS.md` points to the module when needed.
- Verification and review evidence exists.
- Memory and retrieval pointers are updated.
