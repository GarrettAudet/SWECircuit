# Implementation Notes

## Status

In progress.

## Summary Of Changes

- Fast-forwarded the approved V8/V8.1 baseline to main and verified main CI.
- Created codex/v9-devrail-kernel from synchronized main at 9f2b68d.
- Created the V9 feature package and draft milestone before executable changes.
- Recorded the initial DevRail direction, the collision evidence, and the owner decision to reopen naming.
- Completed a primary-source architecture scan and proposed ADR for Node/TypeScript, JSON Schema, strict validation, JSONL traces, liveness state, adapters, privacy, CI, and supply-chain controls.
- Found that devrail.dev is an active adjacent product and the unscoped devrail npm package is occupied; no public namespace was frozen.
- Screened 51 package candidates, queried exact GitHub collisions, checked finalist domains and cross-language registries, and recommended SWECircuit.

## Deviations From Plan

The workspace patch helper failed before file access during intake and failed twice with the same sandbox refresh error during the naming consistency edit. The integration owner used the repository-authorized PowerShell fallback and retained diff and checker verification as the proof boundary.

## Assumptions Used

- Research and ADR drafting can proceed before finalizing the public CLI and schema.
- Historical TraceRail artifacts should remain intact as provenance.
- No license change is implied by the merge approval or product rename.

## Follow-Up Work

- Obtain owner approval or rejection of SWECircuit, then acquire or revise the namespace plan.
- If approved, define the 0.x migration from Rail Composition to Circuit Composition without rewriting historical evidence.
- Implement only after public-contract choices pass the architecture gate.

## Verification Performed

- Confirmed main and origin/main both resolved to 9f2b68d before branching.
- Confirmed the working tree was clean before V9 intake.
- Confirmed GitHub Actions runs for the V8.1 merge and closeout were green.
- The recovered intake passed the positive checker and all fifteen regression cases.
- The npm registry query confirmed that the unscoped devrail package is owned by another project.
- SWECircuit had no exact npm, PyPI, crates.io, or GitHub repository collision; swecircuit.com, .dev, .ai, and .io returned not found in point-in-time registry checks.
- The completed naming packet passed the positive checker and all fifteen regression cases after stale DevRail assumptions were removed from the V9 plan and test plan.

## Durable Learnings

- A version branch should begin with explicit API decision gates when the version creates the first executable public surface.
- The known Windows patch-helper failure remains reproducible; direct-write recovery must remain bounded and independently verified.
- Public naming should be tested against adjacent products, multiple package registries, repository names, domains, semantics, pronunciation, and future extension vocabulary before implementation.