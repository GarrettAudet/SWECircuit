# Release Rail

## Purpose

Use the release rail for TraceRail versions and other milestone-driven workflow changes.

## Composition

```txt
version_goal | feature_package | implementation | verification | review | milestone | approval | merge | history | memory
```

## Modules

| Module | Input | Output | Gate |
| --- | --- | --- | --- |
| Version goal | User direction | Version objective | Goal is bounded or route to `clarify`. |
| Feature package | Goal | Spec, plan, tasks, test plan | Acceptance criteria are testable. |
| Implementation | Tasks | Docs, templates, checker changes | Changes map to tasks. |
| Verification | Changes | Command and manual evidence | Evidence passes or route to `fix`. |
| Review | Evidence | Review outcome | Approved for user review. |
| Milestone | Review | Version overview | User-facing summary is ready. |
| Approval | Milestone | Merge decision | User approves or branch remains open. |
| Merge | Approved branch | Updated baseline | Main is clean and pushed. |
| History | Merge | History ledger entry | Source artifacts are linked. |
| Memory | History | Active context and retrieval updates | Future work can retrieve the version. |

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
