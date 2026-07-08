# Implementation Plan

## Status

Complete.

## Summary

Use V1 as the operating workflow to build V2. Create a real feature package, update the handbook and `AGENTS.md` with dogfooding, simplicity, traceability, source-preserving memory, and parallel-agent development rules, record durable memory, update practice governance, add a dated research snapshot, and extend the checker so future edits cannot accidentally remove the new sections or memory files.

## Impacted Areas

- `AGENTS.md`
- `docs/ai/handbook.md`
- `docs/specs/v2-dogfood-parallel-agents/`
- `docs/memory/active-context.md`
- `docs/memory/decisions.md`
- `docs/memory/known-issues.md`
- `docs/memory/failed-attempts.md`
- `docs/memory/history-ledger.md`
- `docs/memory/retrieval-index.md`
- `docs/memory/patterns.md`
- `docs/memory/glossary.md`
- `docs/research/practice-register.md`
- `docs/research/snapshots/2026-07-08-parallel-agent-and-memory-scan.md`
- `scripts/check-template.ps1`
- `.github/pull_request_template.md`

## Approach

- Treat V2 as a process feature with a complete feature package.
- Add design invariants to the handbook and `AGENTS.md`.
- Add a traceability and memory architecture section to the handbook.
- Add a version dogfooding section to the handbook.
- Add a parallel-agent development section to the handbook.
- Add concise rules to `AGENTS.md` so agents see them before acting.
- Add `history-ledger.md` and `retrieval-index.md` to memory.
- Record V2 rules in memory and practice governance.
- Add checker coverage for the new required handbook headings and memory files.
- Run the local checker and ASCII scan.

## Interfaces And Data

The public workflow interface changes by adding operating invariants, version dogfooding, traceability/memory rules, and parallel work-unit contracts. No data schemas, APIs, or runtime commands change.

## Architecture And ADR Impact

No ADR is required. This is a workflow-template evolution within the existing repository architecture.

## Security And Privacy

No new secrets, authentication, permissions, or private data handling are introduced. V2 defers automatic transcript or screen capture because memory tooling needs explicit privacy, storage, and deletion decisions.

Parallel-agent guidance explicitly keeps sandbox, permissions, and tool scope as part of the work-unit contract.

## Rollback Or Recovery

Revert the V2 docs, memory files, and checker changes, then return to the V1 handbook. The V2 feature package can remain as a historical record if rollback is partial.

## Risks And Mitigations

- Risk: Parallelization rules add too much ceremony.
- Mitigation: Scope them to work that can or should fan out; tiny changes still use the quick path.

- Risk: Subagents conflict on the same files.
- Mitigation: Require conflict zones, integration ownership, and sequential integration after parallel work.

- Risk: Agents keep patching a bug chain in parallel.
- Mitigation: Route recurring or unclear failures into the root-cause protocol and assign diagnosis work units before implementation work units.

- Risk: Manual memory pointers are forgotten.
- Mitigation: Add required files to the checker and include history/index updates in the done definition.
