# Development Milestones

Development milestones are the progress layer for this workflow system. A feature package proves what changed; a milestone explains what the version means.

Use milestones when a workflow version is completed, approved, or ready for approval.

## Relationship To Other Artifacts

| Artifact | Purpose |
| --- | --- |
| Feature package | Defines the work, plan, tasks, evidence, and review for a version or feature. |
| Milestone | Summarizes shipped progress, validation, risks, and next work for humans. |
| History ledger | Chronological pointer to source artifacts and memory updates. |
| Retrieval index | Fast lookup map for future agents. |

## Milestone Closeout

When a version finishes:

1. Fill a milestone file from `_template.md`.
2. Link the feature package and review.
3. Summarize shipped changes in plain language.
4. Record verification evidence.
5. Record residual risks and next recommended work.
6. Update memory, history ledger, and retrieval index.
7. Notify the user with the milestone overview.

## Naming

Use:

```txt
docs/milestones/vVERSION.md
```

For smaller non-version releases, use:

```txt
docs/milestones/YYYY-MM-DD-slug.md
```

