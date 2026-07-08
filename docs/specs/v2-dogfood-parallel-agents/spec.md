# Feature Spec

## Status

Complete.

## Problem

V1 defines a clear workflow stack, but it does not yet make four important operating rules explicit: completed versions should be used to build future versions, the workflow must stay simple and traceable, memory must preserve source evidence while remaining fast to retrieve, and parallel agent development needs a methodical decomposition contract before work fans out.

Without those rules, this repository could drift into a static template instead of a living system, parallel agent work could create conflicts or shallow handoffs, and important context could be lost in chat history instead of becoming durable project memory.

## Users Or Actors

- Human project owner using the workflow across future projects.
- Main AI agent acting as orchestrator and integration owner.
- Subagents or parallel agents doing focused exploration, implementation, diagnosis, review, or documentation work.
- Future maintainers reading the workflow without prior conversation context.

## Goals

- Make version dogfooding a default rule for this repository.
- Make simplicity and traceability explicit design invariants.
- Add source-preserving memory architecture with a history ledger and retrieval index.
- Add an explicit parallel-agent development model to the handbook and agent entrypoint.
- Define work-unit contracts for safe fan-out.
- Keep V2 file-based and understandable without installing external frameworks.
- Use V1 to create and verify this V2 change.

## Non-Goals

- Install or configure external agent frameworks.
- Install or configure external memory frameworks.
- Automatically capture full chat transcripts.
- Create actual Codex custom agent TOML files in V2.
- Replace the core state machine.
- Add CI automation beyond the existing local checker.

## Requirements

- The latest completed workflow version must become the default process for subsequent workflow-stack changes.
- Each new workflow version must have its own feature package using the current version's rules.
- The handbook and agent entrypoint must state that the workflow should remain simple, traceable, and source-preserving.
- Memory must distinguish source records, durable summaries, and retrieval pointers.
- The repository must include a chronological history ledger and compact retrieval index.
- Task planning must include a parallelization readiness check when work could be split across agents.
- Parallel work must be decomposed into work-unit contracts with objective, scope, context, dependencies, conflict zones, verification, handoff, and stop conditions.
- The main agent must remain the integration owner unless another owner is explicitly assigned.
- Repeated bugs or bug chains must route to problem-solving mode instead of uncontrolled parallel patching.
- Durable rules must be reflected in memory and practice governance.

## Acceptance Criteria

- [x] `AGENTS.md` includes operating invariants, version dogfooding, traceability/memory, and parallel work rules.
- [x] `docs/ai/handbook.md` documents design invariants, traceability and memory architecture, version dogfooding, parallelization readiness, work-unit contracts, integration ownership, and bug-loop handling.
- [x] `docs/specs/v2-dogfood-parallel-agents/` records the V2 work package created under V1.
- [x] `docs/memory/` records durable context, decisions, patterns, terms, known limitations, a history ledger, and a retrieval index from V2.
- [x] `docs/research/practice-register.md` records accepted V2 practices and deferred tool integrations.
- [x] `docs/research/snapshots/2026-07-08-parallel-agent-and-memory-scan.md` records current ecosystem practices consulted for V2.
- [x] `scripts/check-template.ps1` checks for the new handbook sections and memory files.
- [x] The template checker passes after V2 changes.

## Architecture Impact

This changes workflow architecture, not application architecture. No ADR is required because the repository's architecture is the handbook, `AGENTS.md`, feature packages, memory, research governance, and checker.

## Risks

- Parallelization guidance could become too heavy for small tasks.
- Agents could over-parallelize work that should remain sequential.
- Work-unit contracts could be skipped unless the checker and handbook make them visible.
- Manual memory ledger/index updates could be missed without practice.
- Version dogfooding could preserve a flawed process unless exceptions are recorded and fed back into the next version.

## Open Questions

None for V2.

## Assumptions

- V2 should remain lean and file-based.
- Subagent tooling will vary by IDE or agent platform, so V2 should define portable contracts before tool-specific setup.
- Memory tooling should not be installed until the source-preserving file layer has been dogfooded.
- The user wants parallel development acceleration and memory reliability to become first-class design goals, not optional notes.
