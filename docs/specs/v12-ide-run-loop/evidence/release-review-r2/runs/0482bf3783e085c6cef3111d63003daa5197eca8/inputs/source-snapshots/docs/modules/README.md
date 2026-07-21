# Module Catalog

## Purpose

Modules are the composable units inside circuits. Each module uses the same interface so SWECircuit work can be assembled like a pipe while preserving artifacts, gates, and outcomes.

## Module Interface

Every module records:

- Input.
- Action.
- Output.
- Gate.
- Outcome.
- Artifacts.
- Adapter.

Catalog modules have dedicated files in this directory. A circuit may also define a circuit-local module inline when the behavior is specific to that circuit, but its table must expose the same input, action, output, gate, outcome, and artifact fields. Promote a circuit-local module to this catalog when it is reused across circuits or projects.

Workflow outcomes are limited to `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, and `learn`. Governance states such as `watch`, `deferred`, and `rejected` belong in output artifacts or registers, not in the workflow outcome channel.

## Catalog

| Module | Type | Use For |
| --- | --- | --- |
| Clarify | Core | Turning vague goals into clear requirements or recorded assumptions. |
| Spec | Core | Producing testable acceptance criteria. |
| Architecture review | Core | Checking architecture fit, coding best practices, boundaries, and ADR impact before implementation. |
| Plan | Core | Turning a spec into approach, tasks, and verification mapping. |
| Implement | Core | Making the smallest coherent change. |
| Verify | Core | Producing deterministic evidence. |
| Review | Core | Comparing implementation to intent and risk. |
| Memory | Core | Preserving durable lessons and retrieval pointers. |
| Specialist agent compiler | Core | Comparing legal specialist teams, compiling exact supply-free AgentBlueprint demand through an independent pure operation, and rendering a digest-bound provider-neutral launch package. |
| Specialist run session | Core | Reducing one externally approved specialist package and exact raw handoffs into deterministic dependency eligibility, routing, replay, and specialist fan-in closure. |
| Superpowers transition | Capability adapter | Moving from idea to design to approved implementation plan. |
| Astraeus orchestration compiler | Capability adapter | Synthesizing project-specific agent roles and fan-in path. |
| Spec Kit adapter | Optional adapter | Automating spec-driven phases. |
| Retrieval adapters | Optional adapter group | Connecting semantic repo and docs retrieval tools. |
| Memory adapters | Optional adapter group | Connecting source-preserving memory systems. |

## Promotion Rule

New modules begin as circuit-local, project-local, or pack-provided modules. Promote into core only when repeated use proves the module solves a stable failure mode and keeps the quick path simple.
