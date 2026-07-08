# Module Catalog

## Purpose

Modules are the composable units inside rails. Each module uses the same interface so TraceRail work can be assembled like a pipe while preserving artifacts, gates, and outcomes.

## Module Interface

Every module records:

- Input.
- Action.
- Output.
- Gate.
- Outcome.
- Artifacts.
- Adapter.

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
| Superpowers transition | Capability adapter | Moving from idea to design to approved implementation plan. |
| Astraeus orchestration compiler | Capability adapter | Synthesizing project-specific agent roles and fan-in path. |
| Spec Kit adapter | Optional adapter | Automating spec-driven phases. |
| Retrieval adapters | Optional adapter group | Connecting semantic repo and docs retrieval tools. |
| Memory adapters | Optional adapter group | Connecting source-preserving memory systems. |

## Promotion Rule

New modules begin as project-local or pack-provided modules. Promote into core only when repeated use proves the module solves a stable failure mode and keeps the quick path simple.
