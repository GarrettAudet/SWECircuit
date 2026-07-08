# Tasks

## Status

Complete.

## Task List

```txt
- [x] T001: Create orchestration source package.
  Scope: Feature package, decomposition plan, orchestration run record.
  Verification: Required feature package files exist and checker accepts the package.
- [x] T002: Spawn bounded read-only reviewers.
  Scope: Pack/rail, module/template, verification/memory review units.
  Verification: Run record lists agent roster, authority, context, and stop conditions.
- [x] T003: Capture handoffs and synthesize findings.
  Scope: Orchestration run handoffs, integration notes, review.
  Verification: Each handoff is summarized with evidence, risks, and follow-ups.
- [x] T004: Apply narrow in-scope fixes or record follow-ups.
  Scope: Only changes directly supported by findings.
  Verification: Diff maps to finding or follow-up decision.
- [x] T005: Run validation and update memory.
  Scope: Checker, scans, review evidence, memory files.
  Verification: Validation passes and memory points to source artifacts.
```

## Tasks

- [x] T001: Create orchestration source package.
  Scope: Feature package, decomposition plan, orchestration run record.
  Verification: Required feature package files exist and checker accepts the package.
- [x] T002: Spawn bounded read-only reviewers.
  Scope: Pack/rail, module/template, verification/memory review units.
  Verification: Run record lists agent roster, authority, context, and stop conditions.
- [x] T003: Capture handoffs and synthesize findings.
  Scope: Orchestration run handoffs, integration notes, review.
  Verification: Each handoff is summarized with evidence, risks, and follow-ups.
- [x] T004: Apply narrow in-scope fixes or record follow-ups.
  Scope: Only changes directly supported by findings.
  Verification: Diff maps to finding or follow-up decision.
- [x] T005: Run validation and update memory.
  Scope: Checker, scans, review evidence, memory files.
  Verification: Validation passes and memory points to source artifacts.

## Dependencies

- V6 orchestration-readiness pack exists.
- Subagent tooling is available in the Codex app.
- V6 branch remains unmerged until approval.

## Out Of Scope

- Runtime orchestration adapter installation.
- Write-enabled implementation subagents.
- Recommended pack promotion.
- Merge to `main`.
