# Feature Spec

## Status

Ready for approval.

## Problem

The workflow now has specs, milestones, memory, verification, and branch flow, but the standalone single-agent/IDE execution loop and user interaction surface are not yet strong enough as a self-contained baseline.

Before expanding into multi-agent development, one agent should be able to take a bounded goal end to end and make that method visible while chatting with the user: understand the request, retrieve context, clarify only when useful, plan, implement, verify, review, update memory, and hand back a traceable result.

## Users Or Actors

- Human project owner delegating a goal to one IDE agent.
- A single AI coding agent working inside an IDE or Codex-like environment.
- Future reviewers auditing the agent's work.
- Future multi-agent systems that will build on the standalone baseline.

## Goals

- Define a strong standalone agent/IDE baseline before expanding multi-agent workflows.
- Add a reusable standalone agent work package for one agent owning a bounded goal end to end.
- Make autonomy explicit: what the agent owns, what it may change, what it must verify, and when it must stop.
- Keep the contract simple enough for fast work, but robust enough for serious development.
- Make the standalone loop traceable through branch, feature package, task plan, verification, review, memory, and milestone when applicable.
- Make IDE-user interaction explicit so the user can see the workflow stage, evidence, assumptions, and next gate.

## Non-Goals

- Install agent orchestration tooling.
- Design multi-agent coordination beyond noting future extension points.
- Create platform-specific custom agents.
- Replace feature packages or milestones.
- Allow unbounded autonomous edits.

## Requirements

- Add IDE interaction guidance under `docs/ide/`.
- Add standalone agent guidance under `docs/agents/`.
- Add a standalone agent work package template with goal, scope, autonomy, context, stage loop, verification, review, handoff, and memory obligations.
- Add handbook guidance for IDE-user interaction and single-agent/IDE end-to-end execution.
- Add `AGENTS.md` guidance that workflow visibility and standalone excellence come before multi-agent expansion.
- Add checker coverage for the IDE docs, standalone agent docs, and handbook sections.
- Update memory with durable single-agent-first decisions and terminology.

## Acceptance Criteria

- [x] `docs/ide/README.md` explains the IDE-user interaction protocol.
- [x] `docs/ide/_message-templates.md` provides reusable workflow visibility message shapes.
- [x] `docs/agents/README.md` explains the standalone single-agent baseline.
- [x] `docs/agents/_template.md` defines a usable standalone agent work package.
- [x] `docs/ai/handbook.md` includes `IDE User Interaction Protocol` and `Standalone Agent And IDE Workflow` guidance.
- [x] `AGENTS.md` includes IDE interaction and single-agent-first rules.
- [x] `scripts/check-template.ps1` requires the IDE docs, standalone agent docs, and handbook sections.
- [x] Memory files include durable decisions, patterns, and glossary terms for standalone agent work.
- [x] The template checker passes.

## Architecture Impact

This adds two workflow artifact paths: `docs/ide/` for visible IDE-user interaction and `docs/agents/` for standalone agent work packages. They complement feature packages by defining how one agent should execute a bounded goal end to end while keeping the user oriented.

## Risks

- The interaction protocol could become noisy if used mechanically.
- The template could become too heavy for small edits.
- The workflow could overfit single-agent execution and make later multi-agent expansion harder.
- Agents could treat bounded autonomy as permission for broad edits.

## Open Questions

- Should V4 include an example filled standalone work package, or should the first real project create that example through dogfooding?

## Assumptions

- Strong single-agent/IDE execution is the foundation for reliable multi-agent work.
- Multi-agent development should not be expanded until the standalone loop is excellent.
- Small human-led edits do not need a full standalone work package.
- Workflow visibility should be concise and useful, not performative.





