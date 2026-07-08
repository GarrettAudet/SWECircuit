# Implementation Notes

## Status

Complete.

## Summary Of Changes

V2 promoted version dogfooding, simplicity, traceability, source-preserving memory, and parallel-agent development into the core workflow. The change adds a real V2 feature package, updates `AGENTS.md`, expands the handbook, adds a history ledger and retrieval index, records durable memory, adds a dated parallel-agent and memory research snapshot, updates the practice register, and extends checker coverage.

## Deviations From Plan

The initial V2 scope focused on dogfooding and parallel agents. The user clarified that simplicity, traceability, and reliable memory are always core goals for this work, so V2 expanded to include explicit design invariants and source-preserving memory architecture.

The `apply_patch` helper failed with a Windows sandbox helper error during V2 edits, so direct PowerShell writes inside the project root were used and then verified.

## Assumptions Used

- V2 should define portable contracts first and defer tool-specific agent installation.
- V2 should preserve source evidence through feature packages and memory pointers before installing external memory systems.
- The main agent remains integration owner unless the user explicitly assigns another owner.
- Work that shares files or state should not fan out until conflict zones and merge order are clear.

## Follow-Up Work

- V3 can add optional `.codex/agents/` templates after the file-based contracts prove useful.
- A future version can evaluate Basic Memory, Mem0, Zep/Graphiti, or another memory tool against the source-preserving memory criteria.
- A future version can add CI integration for `scripts/check-template.ps1`.
- A future version can add lightweight metrics for parallel-agent cycle time, rework, memory recall, and verification quality.

## Verification Performed

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`: passed.
- `rg -n "[^\x00-\x7F]"`: no matches.

## Durable Learnings

- Finished workflow versions should be used to build the next version.
- Parallel acceleration depends on decomposition quality, conflict control, and integration ownership more than raw agent count.
- Memory should preserve source truth and add compact retrieval layers, not replace source truth with summaries.
- Simplicity and traceability are design constraints for every future workflow change.
