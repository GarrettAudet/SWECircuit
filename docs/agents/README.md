# Standalone Agent And IDE Work Packages

This directory defines the standalone single-agent execution baseline.

The goal is simple: one capable agent in an IDE or Codex-like environment should be able to take a bounded goal end to end without losing traceability, skipping verification, or guessing through ambiguity.

Multi-agent development should build on this later. Do not expand coordination patterns until the standalone loop is dependable.

## When To Use

Use a standalone agent work package when:

- One agent is expected to own a meaningful goal end to end.
- Work spans more than a tiny local edit.
- The agent needs explicit scope, context, authority, verification, and handoff rules.
- The work should be auditable after the session ends.

Use the handbook quick path instead when the change is tiny, clear, low-risk, and easy to verify.

## Relationship To Other Artifacts

| Artifact | Purpose |
| --- | --- |
| Feature package | Defines the change, acceptance criteria, tasks, verification, and review. |
| Standalone agent work package | Defines how one agent executes a bounded goal end to end. |
| Milestone | Summarizes completed version progress for humans. |
| Memory files | Preserve durable context and retrieval pointers. |

## Independence Readiness

A standalone agent can proceed independently only when all are true:

- The goal is clear enough to state in one paragraph.
- Acceptance criteria or completion evidence are known.
- Scope boundaries and out-of-scope areas are explicit.
- Required context can be retrieved locally or from approved sources.
- Verification commands or manual checks are available.
- Stop conditions are documented.
- The current branch and dirty state are understood.

If any item is false, the agent should clarify, narrow scope, or enter diagnosis before implementing.


## User Interaction Visibility

A standalone agent should make its method visible while working in the IDE.

At the start of meaningful work, report:

- Workflow or branch.
- Current stage.
- Active artifact.
- Next action.
- Assumptions.

During work, use short stage/outcome/evidence/next-action updates. At handoff, summarize verification, review state, memory updates, milestone state, branch state, and next gate.

Use `docs/ide/README.md` for the interaction protocol.
## End-To-End Loop

The standalone agent owns this loop for its bounded goal:

```txt
intake -> clarify -> spec/check existing spec -> architecture check -> task plan -> implement -> verify -> review -> memory update -> handoff
```

The agent should leave behind enough evidence for another person or agent to answer:

- What goal was attempted?
- What changed?
- Why was this approach chosen?
- How was it verified?
- What risks remain?
- What memory or follow-up was recorded?

## Handoff Standard

Every completed standalone work package should return:

- Summary of goal and outcome.
- Files changed and inspected.
- Verification evidence.
- Assumptions and decisions.
- Risks, limitations, and follow-ups.
- Memory updates completed or needed.

