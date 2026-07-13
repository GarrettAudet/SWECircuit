# Release Circuit

## Purpose

Use the release circuit for SWECircuit versions and other milestone-driven workflow changes.

## Composition

```txt
version_goal | feature_package | implementation | verification | review | milestone | approval | merge | history | memory
```

## Modules

| Module | Input | Action | Output | Gate | Outcomes | Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| Version goal | User direction | Bound the release objective, target branch, and approval path. | Version objective | Goal is coherent and authorized. | `pass`, `clarify`, `split`, `block` | Goal record |
| Feature package | Goal | Define spec, plan, tasks, risks, and test mapping. | Complete work package | Acceptance criteria are testable. | `pass`, `clarify`, `redesign`, `split` | Feature package |
| Implementation | Tasks | Execute bounded changes and record deviations. | Docs, code, templates, or checker changes | Changes map to tasks and scope. | `pass`, `diagnose`, `clarify`, `redesign` | Diff, implementation notes |
| Verification | Changes | Run project and workflow checks and preserve evidence. | Command and manual evidence | Evidence supports acceptance criteria. | `pass`, `fix`, `diagnose`, `clarify` | Test plan, logs or summaries |
| Review | Spec and evidence | Review intent, architecture, risk, traceability, and memory. | Review outcome | Findings are resolved or routed. | `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split` | Review |
| Milestone | Review | Summarize shipped work, evidence, risks, and next work. | Version overview | User-facing summary and source links are complete. | `pass`, `fix`, `block` | Milestone |
| Approval | Milestone | Request the owner decision with branch and merge consequences. | Merge decision | Explicit approval exists. | `pass`, `clarify`, `block` | Approval gate |
| Merge | Approved branch | Merge through repository controls and verify resulting baseline. | Updated baseline | Target is clean, current, and verified. | `pass`, `fix`, `diagnose`, `block` | Merge commit or PR |
| History | Merge | Record chronological source pointers and release status. | History ledger entry | Source artifacts and merge state are linked. | `pass`, `learn`, `block` | History ledger |
| Memory | History and review | Update active context, decisions, issues, patterns, and retrieval pointers. | Durable memory | Future work can retrieve the release. | `pass`, `learn`, `block` | Memory entries |

## Artifacts

- Feature package.
- Checker output.
- Review.
- Milestone.
- Branch and commit history.
- Memory entries.

## Stop Conditions

- The branch is dirty with unrelated changes.
- Verification fails.
- User approval is missing.
- Merge target is unclear.
