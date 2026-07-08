# Decisions

## Decision Log

| Date | Decision | Rationale | Revisit Trigger |
| --- | --- | --- | --- |
| 2026-07-08 | Use `AGENTS.md` as the canonical AI entrypoint. | Codex-first template with portable project guidance. | If another agent surface becomes primary. |
| 2026-07-08 | Use one handbook for the operating manual. | Keep the human surface simple and discoverable. | If the handbook becomes too large to navigate. |
| 2026-07-08 | Use feature specs as the unit of work. | Works for features, bugs, refactors, and process changes without requiring full epics. | If projects need ticket-system integration. |
| 2026-07-08 | Treat problem-solving as a core workflow branch. | Prevent repeated patching and capture root causes. | If real usage shows the protocol is too heavy. |
| 2026-07-08 | Dogfood each completed workflow version on future workflow-stack changes. | The system should improve from real use instead of remaining theoretical. | If version dogfooding creates ceremony without learning. |
| 2026-07-08 | Treat parallel-agent development as a first-class workflow capability. | The user wants methodical decomposition that can accelerate development safely. | If real projects show the coordination overhead outweighs speedup. |
| 2026-07-08 | Use source-preserving memory layers before adopting external memory tools. | Traceability requires primary evidence plus compact retrieval pointers. | If manual ledger/index maintenance becomes too slow or unreliable. |
| 2026-07-08 | Use development milestones as the version progress layer. | The user needs clear start-to-finish progress and a concise overview whenever a version finishes. | If milestones duplicate reviews or become too verbose. |
| 2026-07-08 | Use `main` as the stable baseline and version branches for future workflow versions. | Branches separate draft version work from approved baselines and make merges explicit. | If a project has a different default branch convention. |
| 2026-07-08 | Treat V1-V3 as the bootstrap exception. | The first baseline had to be created before normal version branches could apply. | If another project starts from an existing baseline. |

