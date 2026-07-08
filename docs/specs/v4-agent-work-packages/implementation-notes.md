# Implementation Notes

## Status

Ready for approval.

## Summary Of Changes

V4 adds the standalone single-agent/IDE execution baseline and explicit IDE-user interaction protocol. It adds `docs/ide/README.md`, `docs/ide/_message-templates.md`, `docs/agents/README.md`, `docs/agents/_template.md`, core handbook guidance, `AGENTS.md` interaction and standalone-agent rules, checker coverage, memory updates, and a V4 milestone.

## Deviations From Plan

The first V4 draft leaned toward general agent work packages with multi-agent implications. The user clarified that the foundation must be excellent for one agent or IDE first, then multi-agent expansion can follow. V4 was reframed accordingly.

The user then clarified that the IDE chat itself must make the system visible. V4 added the IDE User Interaction Protocol so the agent reports workflow, branch, stage, active artifact, assumptions, evidence, verification, and next gates while working.

## Assumptions Used

- Single-agent excellence is a prerequisite for reliable multi-agent orchestration.
- Agent autonomy should be bounded by a written contract.
- The user should see the workflow operating in chat, not only in repository artifacts.
- Work packages should complement feature specs, not replace them.

## Follow-Up Work

- V5 can dogfood the IDE interaction protocol on a real coding task.
- V6 or later can add role-specific examples or begin multi-agent expansion after this standalone baseline is tested.

## Verification Performed

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`: passed.
- `rg -n "[^\x00-\x7F]"`: no matches.
- Placeholder scan: no matches.

## Durable Learnings

- Build the standalone IDE/agent baseline before expanding multi-agent workflows.
- A useful autonomous agent contract needs goal, completion evidence, scope, authority, context, independence readiness, user interaction plan, verification, stop conditions, handoff, and memory obligations.
- The IDE conversation should visibly expose stage, outcome, evidence, assumptions, and next action.
