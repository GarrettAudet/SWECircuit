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
- Recorded owner approval, renamed the GitHub repository to `GarrettAudet/SWECircuit`, updated `origin`, and constrained the decision to project and repository identity.

## Deviations From Plan

The workspace patch helper failed before file access during intake and recurred during the naming and identity-migration edits. The integration owner used the repository-authorized PowerShell fallback and retained diff and checker verification as the proof boundary.

## Assumptions Used

- Research and ADR drafting can proceed before finalizing the public CLI and schema.
- Historical TraceRail artifacts should remain intact as provenance.
- No license change is implied by the merge approval or product rename.

## Follow-Up Work

- Complete current canonical branding and replace the historical TraceRail overview image.
- Define and test the 0.x migration from Rail Composition to Circuit Composition without rewriting historical evidence.
- Implement only after public-contract choices pass the architecture gate.

## Verification Performed

- Confirmed main and origin/main both resolved to 9f2b68d before branching.
- Confirmed the working tree was clean before V9 intake.
- Confirmed GitHub Actions runs for the V8.1 merge and closeout were green.
- The recovered intake passed the positive checker and all fifteen regression cases.
- The npm registry query confirmed that the unscoped devrail package is owned by another project.
- SWECircuit had no exact npm, PyPI, crates.io, or GitHub repository collision in the naming scan; the owner later clarified that only the GitHub repository name is in scope.
- The completed naming packet passed the positive checker and all fifteen regression cases after stale DevRail assumptions were removed from the V9 plan and test plan.
- The SWECircuit migration passed the positive checker and all seventeen regression cases, including rejection of a legacy README heading and retired GitHub URL.
- GitHub returned `GarrettAudet/SWECircuit` with default branch `main`; `git ls-remote` resolved the updated origin and the public About description now uses the SWECircuit positioning.
- GitHub Actions run `29263645888` completed successfully under the `SWECircuit Checks` workflow for commit `1d5f82e`.

## Durable Learnings

- A version branch should begin with explicit API decision gates when the version creates the first executable public surface.
- The known Windows patch-helper failure remains reproducible; direct-write recovery must remain bounded and independently verified.
- Public naming should be tested against adjacent products, multiple package registries, repository names, domains, semantics, pronunciation, and future extension vocabulary before implementation.