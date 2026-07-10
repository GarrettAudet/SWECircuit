# Implementation Notes

## Status

In progress.

## Summary Of Changes

- Fast-forwarded the approved V8/V8.1 baseline to main and verified main CI.
- Created codex/v9-devrail-kernel from synchronized main at 9f2b68d.
- Created the V9 feature package and draft milestone before executable changes.
- Recorded DevRail as the user-directed target identity while keeping architecture choices open for evidence-backed review.
- Completed a primary-source architecture scan and proposed ADR for Node/TypeScript, JSON Schema, strict validation, JSONL traces, liveness state, adapters, privacy, CI, and supply-chain controls.
- Found that devrail.dev is an active adjacent product and the unscoped devrail npm package is occupied; no public namespace was frozen.

## Deviations From Plan

The workspace patch helper failed before file access during intake. The integration owner used the repository-authorized PowerShell fallback and retained diff and checker verification as the proof boundary.

## Assumptions Used

- Research and ADR drafting can proceed before finalizing the public CLI and schema.
- Historical TraceRail artifacts should remain intact as provenance.
- No license change is implied by the merge approval or product rename.

## Follow-Up Work

- Resolve the public identity decision, then accept or revise ADR 0001.
- Implement only after public-contract choices pass the architecture gate.

## Verification Performed

- Confirmed main and origin/main both resolved to 9f2b68d before branching.
- Confirmed the working tree was clean before V9 intake.
- Confirmed GitHub Actions runs for the V8.1 merge and closeout were green.
- The recovered intake passed the positive checker and all fifteen regression cases.
- The npm registry query confirmed that the unscoped devrail package is owned by another project.

## Durable Learnings

- A version branch should begin with explicit API decision gates when the version creates the first executable public surface.
- The known Windows patch-helper failure remains reproducible; direct-write recovery must remain bounded and independently verified.