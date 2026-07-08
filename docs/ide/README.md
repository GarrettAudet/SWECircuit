# IDE User Interaction Protocol

This protocol makes the workflow visible while a user chats with an IDE agent.

The user should not have to wonder whether the system is being followed. The agent should periodically surface the current workflow version, branch, stage, active artifact, assumptions, decisions, verification state, and next action.

## When To Use

Use this protocol for meaningful work in an IDE or chat-based coding environment.

For tiny changes, a compact version is enough:

```txt
Workflow: quick path | Stage: implement -> verify | Next: run checker
```

For feature, workflow, bug, or branch work, use the fuller status messages below.

## Start-Of-Work Banner

At the beginning of meaningful work, state:

- Workflow version or active branch.
- Current stage.
- Active feature package or reason one is not needed.
- Intended next action.
- Whether assumptions are being used.

Example:

```txt
Workflow: V4 standalone IDE baseline
Branch: codex/v4-agent-work-packages
Stage: intake -> clarify
Active artifact: docs/specs/v4-agent-work-packages/
Next: update the spec and interaction protocol, then validate
Assumptions: treating this as a V4 scope correction
```

## Stage Updates

When the stage changes, report:

```txt
Stage: task plan -> implement
Outcome: pass
Evidence: V4 spec updated with IDE interaction acceptance criteria
Next: update handbook, AGENTS.md, checker, and memory
```

Keep updates short. The point is orientation, not ceremony.

## Clarification Prompts

Ask only when the answer changes the plan. Use this structure:

```txt
Decision needed:
Why it matters:
Options:
Recommendation:
Default if low-risk:
```

If proceeding on an assumption, say where it is recorded.

## Diagnosis Notices

When entering problem-solving mode, say:

```txt
Diagnosis mode:
Trigger:
Evidence captured:
Hypotheses:
Next experiment:
Stop condition:
```

Do not keep patching silently after recurring failures.

## Verification Reports

After validation, report:

```txt
Verification:
- Command:
- Result:
- Evidence location:
- Skipped checks:
```

If a check fails, route to `fix`, `diagnose`, `clarify`, or `redesign` explicitly.

## Completion Or Handoff

At the end of meaningful work, report:

- Goal and outcome.
- Files changed.
- Verification evidence.
- Review or approval state.
- Memory and milestone updates.
- Branch or merge state.
- Next gate.

For completed versions, use the milestone `User-Facing Overview`.

## Interaction Principles

- Make the workflow visible without narrating every keystroke.
- Prefer stage/outcome/evidence/next-action updates over vague reassurance.
- Surface assumptions before they become hidden decisions.
- Make blockers and user decisions explicit.
- Keep the user oriented to branch, artifact, and approval state.
