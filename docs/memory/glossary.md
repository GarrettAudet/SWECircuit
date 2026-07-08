# Glossary

## Terms

| Term | Definition |
| --- | --- |
| Bootstrap exception | The initial V1-V3 baseline creation flow used before normal version branches can apply. |
| Development milestone | A short version overview under `docs/milestones/` that summarizes shipped progress, evidence, residual risks, and next work. |
| Feature package | A folder under `docs/specs/` containing the spec, plan, tasks, test plan, implementation notes, debug notes, RCA, and review. |
| Guided gate | A checkpoint where the agent may proceed on low-risk assumptions only if those assumptions are recorded. |
| History ledger | An append-only chronological memory file that records meaningful work, versions, decisions, and links to source artifacts. |
| IDE interaction protocol | The chat-facing workflow contract that makes stage, branch, artifact, assumptions, evidence, verification, and next gate visible to the user. |
| Integration owner | The agent or human responsible for combining parallel work, resolving conflicts, running integrated verification, and completing review. |
| Parallelization readiness | The task-plan checkpoint that decides whether work can safely fan out to subagents or parallel agents. |
| Problem-solving mode | A diagnostic branch for unclear, recurring, flaky, or surprising failures. |
| Practice register | The governance record for accepted, optional, watched, deferred, or rejected ecosystem practices. |
| Research snapshot | A dated record of ecosystem research used to update the workflow. |
| Retrieval index | A compact map from topics, features, stages, files, and decisions to source artifacts. |
| Source-preserving memory | A memory approach that keeps primary evidence available and uses summaries or indexes only as retrieval aids. |
| Stable baseline | The approved state of the repository on `main` that future version branches start from. |
| Standalone agent baseline | The single-agent/IDE workflow foundation where one agent can execute a bounded goal end to end with traceability and verification. |
| Standalone agent work package | A contract for one agent owning a bounded goal, including scope, authority, context, verification, stop conditions, handoff, and memory updates. |
| Typed outcome | The explicit result emitted by each workflow stage: `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn`. |
| Version branch | A branch for one workflow version, named `codex/vVERSION-slug`, that merges to `main` after approval. |
| Work-unit contract | A structured handoff for a parallel agent that defines objective, scope, context, conflicts, allowed actions, verification, handoff, and stop conditions. |




