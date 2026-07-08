# Patterns

## Workflow Patterns

### Simple Surface, Deep Protocols

Keep the first thing a user sees simple, but make deeper protocols available when complexity appears.

### Typed Stage Outcomes

Every workflow stage emits one of:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

This prevents vague handoffs and makes loops explicit.

### Diagnosis Before Broad Fixes

When a failure is unclear or recurring, reproduce it, gather evidence, test hypotheses, and confirm root cause before broad implementation changes.

### Version Dogfooding

When a workflow version is complete, use that version for the next workflow-stack change. Record friction in the feature package and promote durable fixes into the next version.

### Development Milestone

When a version finishes, create a short milestone overview that summarizes goal, shipped changes, evidence, residual risks, and next work. Use it to notify the user.

### Branch Baseline Loop

Use a clean baseline branch, create a version branch, complete feature package and review, write the milestone, get approval, then merge back to the stable baseline.

### IDE Workflow Visibility

For meaningful IDE work, show workflow or branch, stage, active artifact, assumptions, evidence, next action, verification state, and approval gate in concise chat updates.

### Standalone Agent Work Package

For one agent owning a meaningful goal end to end, define goal, completion evidence, scope, authority, context bundle, independence readiness, verification plan, stop conditions, handoff, and memory updates.

### Parallel Work-Unit Contract

Do not fan out work until each unit has objective, scope boundary, likely files, dependencies, conflict zones, context bundle, agent role, verification evidence, handoff format, and stop conditions.

### Integration Owner

Parallel agents can explore and implement slices, but one owner must integrate, verify, review, and record lessons across the full change.

## Memory Patterns

### Source First, Summary Second

Preserve feature packages, evidence, snapshots, debug notes, RCA, and review notes before writing compact memory summaries.

### Ledger Plus Index

Use `history-ledger.md` for chronological traceability and `retrieval-index.md` for fast lookup by topic, feature, stage, file, or decision.

## Documentation Patterns

### One Handbook

Keep process guidance in `docs/ai/handbook.md` unless a separate artifact is required for work execution.

### File-Based First

Start with Markdown and a local checker. Add tools only when they remove real friction.


