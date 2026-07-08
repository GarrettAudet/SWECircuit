# Implementation Plan

## Status

Ready for approval.

## Summary

Reframe V4 around standalone single-agent and IDE execution. Add a portable IDE interaction protocol, standalone agent work package, core handbook guidance, `AGENTS.md` rules, checker coverage, and durable memory.

## Impacted Areas

- `AGENTS.md`
- `docs/ai/handbook.md`
- `docs/ide/README.md`
- `docs/ide/_message-templates.md`
- `docs/agents/README.md`
- `docs/agents/_template.md`
- `scripts/check-template.ps1`
- `docs/memory/`
- `docs/specs/v4-agent-work-packages/`

## Approach

- Define the IDE-user interaction protocol first so the workflow is visible in chat.
- Define the standalone agent baseline first.
- Treat multi-agent as a future extension point.
- Keep agent work packages lightweight and bounded.
- Add readiness and stop conditions for autonomous execution.
- Add checker coverage and memory updates.
- Validate locally before review.

## Interfaces And Data

Adds `docs/ide/` for IDE-user interaction guidance and `docs/agents/` for standalone agent work packages.

## Architecture And ADR Impact

No ADR is required because this is a workflow-layer addition and remains reversible.

## Security And Privacy

Standalone work packages must list allowed actions, permission boundaries, and stop conditions. Security-sensitive or destructive work cannot be independently executed without explicit human approval.

## Rollback Or Recovery

Remove `docs/ide/`, `docs/agents/`, handbook/AGENTS additions, checker requirements, and memory additions.

## Risks And Mitigations

- Risk: Visible workflow updates become noisy.
- Mitigation: Keep updates stage/outcome/evidence/next-action oriented and concise.

- Risk: More ceremony.
- Mitigation: Require the full package only for delegated end-to-end goals, not tiny edits.

- Risk: Over-broad autonomy.
- Mitigation: Require scope boundary, authority, allowed actions, stop conditions, and verification evidence.

- Risk: Multi-agent concerns creep into the baseline.
- Mitigation: Keep V4 single-agent-first and defer multi-agent expansion to a later version.




