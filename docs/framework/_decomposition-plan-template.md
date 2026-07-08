# Decomposition Plan Template

## Status

Draft, active, complete, or archived.

## Goal

State the shared outcome in one paragraph.

## Source Artifacts

- Feature package:
- Architecture or ADR:
- Research snapshot:
- Relevant memory:

## Branch And State

- Source branch:
- Target branch:
- Baseline commit or state:
- Dirty state:
- Approval gate:
- Merge target:

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Specification | Spec module | Define acceptance criteria before work. |
| Retrieval | Retrieval module | Ground work in project evidence. |
| Verification | Verification and review module | Prove acceptance criteria. |

## Decomposition Summary

Explain why the work should or should not fan out.

## Dependency Graph

```txt
shared intake -> spec and architecture -> work unit A
shared intake -> spec and architecture -> work unit B
work unit A + work unit B -> integration -> verification -> review
```

## Work Units

### Work Unit A

Objective:

Scope boundary:

Likely files or docs:

Dependencies:

Conflict zones:

Context bundle:

Agent role or capability:

Allowed actions:

Verification evidence:

Handoff format:

Stop conditions:

### Work Unit B

Objective:

Scope boundary:

Likely files or docs:

Dependencies:

Conflict zones:

Context bundle:

Agent role or capability:

Allowed actions:

Verification evidence:

Handoff format:

Stop conditions:

## Fan-Out Plan

- Which units can start immediately.
- Which units wait for dependencies.
- Which units are read-only.
- Which units may edit files.

## Fan-In Plan

- Integration owner:
- Merge order:
- Conflict-resolution approach:
- Integrated verification:
- Review owner:

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A |  |  |
| B |  |  |

## Stop Or Redesign Triggers

- Requirements become unclear.
- Conflict zones expand.
- A worker finds architecture mismatch.
- A failure recurs or root cause is unclear.
- Verification cannot be run.

## Memory Updates

- History ledger:
- Retrieval index:
- Decisions:
- Known issues:
- Patterns:
