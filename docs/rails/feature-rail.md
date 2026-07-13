# Feature Circuit

## Purpose

Use the feature circuit for ordinary product, documentation, refactor, process, and bounded implementation work.

## Composition

```txt
goal | clarify | spec | architecture_review | task_plan | implement | verify | review | memory
```

## Modules

| Module | Input | Action | Output | Gate | Outcomes | Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| Clarify | User goal and context | Ask material questions or record low-risk assumptions. | Requirements, assumptions, questions | Requirements are clear enough to specify. | `pass`, `clarify`, `block` | Clarification record |
| Spec | Requirements | Define goals, constraints, risks, and testable acceptance criteria. | Acceptance criteria and constraints | Criteria are testable and scope is coherent. | `pass`, `clarify`, `split` | `spec.md` |
| Architecture review | Spec and system context | Check boundaries, interfaces, data flow, dependencies, and ADR impact. | ADR decision or local-design note | Design is compatible and verifiable. | `pass`, `clarify`, `redesign`, `split`, `block`, `learn` | Plan or ADR |
| Task plan | Spec and design | Decompose work and map every task to verification. | Verifiable task list | Tasks are bounded, sequenced, and testable. | `pass`, `clarify`, `redesign`, `split` | `plan.md`, `tasks.md` |
| Implement | Task and context | Make the smallest coherent in-scope change. | Diff or artifact change | Implementation is ready for verification. | `pass`, `diagnose`, `clarify`, `redesign` | Diff, implementation notes |
| Verify | Diff and acceptance criteria | Run relevant automated and manual checks. | Test evidence | Evidence supports acceptance criteria. | `pass`, `fix`, `diagnose`, `clarify` | Test output, `test-plan.md` |
| Review | Spec, diff, evidence | Compare implementation to intent, architecture, risk, and scope. | Review outcome | Findings are resolved or explicitly routed. | `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split` | `review.md` |
| Memory | Review and durable lessons | Promote source-linked decisions, issues, patterns, and retrieval pointers. | Memory entries and retrieval pointers | Durable knowledge is recorded or explicitly unnecessary. | `pass`, `learn`, `block` | Memory files, history ledger |

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
