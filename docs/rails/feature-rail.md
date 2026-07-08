# Feature Rail

## Purpose

Use the feature rail for ordinary product, documentation, refactor, process, and bounded implementation work.

## Composition

```txt
goal | clarify | spec | architecture_check | task_plan | implement | verify | review | memory
```

## Modules

| Module | Input | Output | Gate |
| --- | --- | --- | --- |
| Clarify | User goal and context | Requirements, assumptions, questions | Requirements are clear enough or route to `clarify`. |
| Spec | Requirements | Acceptance criteria and constraints | Criteria are testable or route to `clarify` or `split`. |
| Architecture check | Spec and system context | ADR decision or local-design note | Design is compatible or route to `redesign`. |
| Task plan | Spec and design | Verifiable task list | Tasks map to verification or route to `split`. |
| Implement | Task and context | Diff or artifact change | Implementation is ready for verification or route to `diagnose`. |
| Verify | Diff and acceptance criteria | Test evidence | Evidence passes or route to `fix` or `diagnose`. |
| Review | Spec, diff, evidence | Review outcome | Approved or route to fix, split, redesign, or clarify. |
| Memory | Review and durable lessons | Memory entries and retrieval pointers | Durable knowledge is recorded or explicitly unnecessary. |

## Artifacts

- Feature package.
- Plan.
- Tasks.
- Test plan.
- Implementation notes.
- Review.
- Memory updates.

## Stop Conditions

- Product intent is unclear.
- Architecture impact requires a decision.
- Verification cannot prove acceptance criteria.
- Failure recurs or root cause is unknown.
