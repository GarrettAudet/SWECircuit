# Feature Spec

## Status

Ready for approval.

## Problem

V6 added `tracepack-orchestration-readiness`, but the pack is still marked not recommended because it has not been dogfooded on real multi-agent work. Without a recorded orchestration run, TraceRail cannot yet prove that its decomposition, bounded contracts, fan-out, handoff, synthesis, verification, and memory rules work in practice.

## Users Or Actors

- Human owner evaluating whether TraceRail can support reliable agent parallelism.
- Main IDE agent acting as integration owner.
- Read-only subagents reviewing bounded artifact slices.
- Future agents retrieving orchestration evidence.
- Reviewers deciding whether the pack should remain official, improve, or eventually become recommended.

## Goals

- Dogfood `tracepack-orchestration-readiness` on a real V6 read-heavy review run.
- Create a decomposition plan with bounded work-unit contracts.
- Create an orchestration run record with roster, fan-out log, handoffs, integration notes, verification, review, and memory updates.
- Use subagents only for read-only review with no write authority.
- Synthesize findings into source artifacts and update durable memory.
- Keep V6 unmerged until explicit user approval.

## Non-Goals

- Mark `tracepack-orchestration-readiness` recommended.
- Install Astraeus, LangChain, AutoGen, CrewAI, or any orchestration runtime.
- Allow subagents to edit files.
- Replace the main agent as integration owner.
- Merge V6 to `main`.

## Requirements

- Add `decomposition-plan.md` for this dogfood run.
- Add `orchestration-run.md` for this dogfood run.
- Spawn bounded read-only review agents with disjoint scopes.
- Capture handoffs in the orchestration run record.
- Record integrated findings, decisions, verification, residual risks, and memory updates.
- Update V6 milestone and memory if the dogfood run changes readiness or reveals durable lessons.

## Acceptance Criteria

- [x] Given the orchestration-readiness pack requires a decomposition plan, when this dogfood run starts, then `decomposition-plan.md` defines shared goal, work units, conflict zones, evidence, handoff format, and stop conditions.
- [x] Given subagents complete review, when fan-in happens, then `orchestration-run.md` records handoffs, evidence, risks, and integration notes.
- [x] Given integrated review finds gaps, when they are in scope, then the main agent applies or records follow-up actions with traceability.
- [x] Given validation runs, when checks complete, then review evidence records checker, placeholder scan, non-ASCII scan, and diff whitespace results.
- [x] Given the dogfood run finishes, when future agents retrieve memory, then history ledger and retrieval index point to this source package.

## Architecture Impact

This adds a recorded orchestration run and may update documentation or validation artifacts if the review finds gaps. It does not add runtime dependencies, external services, network behavior, secrets, package installation, or merge automation.

## Risks

- Subagent reviews may produce low-value or overlapping findings.
- Read-only fan-out may not fully prove implementation fan-out.
- The main agent may still need to synthesize and verify all results, which limits speedup.
- The run could reveal that the pack needs more explicit handoff or review fields.

## Open Questions

- Whether a future run should include implementation workers with disjoint write scopes.
- Whether repeated successful dogfood runs should promote the pack from official to recommended.

## Assumptions

- The user's standing goal and prior direction authorize bounded subagent dogfooding for multi-agent workflow design.
- Read-only review is the safest first real orchestration run before implementation fan-out.
- V6 remains on `codex/v6-module-rail-catalog` until explicit user approval.
