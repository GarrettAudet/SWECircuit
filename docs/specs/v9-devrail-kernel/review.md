# Review

## Status

In progress.

## Review Outcome

Identity, architecture, schema, deterministic project validation, offline initialization, and read-only trace inspection passed; public identity migration remains.

## Spec Alignment

The V9 package dogfoods the completed V8.2 baseline. DevRail is rejected, SWECircuit is approved only for the project and GitHub repository, ADR 0001 is accepted, v1alpha1 is frozen, T006 satisfies AC2 and AC3, T007 satisfies AC1, and T008 satisfies AC4 and the offline core portion of AC5.

## Architecture Alignment

The implementation preserves the file-based core, provider-neutral adapters, source-first memory, canonical outcomes, branch workflow, and current-versus-target honesty. The private pure-Node boundary is explicit, including the one deferred opaque Windows metadata check.

## Verification Evidence

V8.1 merged and passed main CI before V9 branch creation. The bounded V8.2 SWECircuit identity release then merged to `main`, was adopted by V9 at `35f96d2`, and passed the positive checker, all seventeen regression cases, and GitHub Actions run `29265535389`.

The V9 architecture gate used three bounded read-only specialist reviewers. All returned `REVISE`; their integrated review and decision brief passed the positive checker and all seventeen regression cases without shared-file edits.

T006 used one independent read-only reviewer, integrated two `REVISE` rounds, and finished with focused `PASS`. The canonical local gate passes 49 tests with zero skips, package inspection, the template checker, and all seventeen checker regressions. GitHub Actions run `29277160551` passes all seven jobs.

T007 used one independent read-only reviewer, integrated initial and focused `REVISE` rounds, and finished with focused `PASS`. The canonical local gate passes 82 tests, package inspection, the template checker, all seventeen checker regressions, and encoding inspection. GitHub Actions run `29281182002` passes all seven jobs.

T008 froze its contract through `REVISE -> REVISE -> REVISE -> REVISE -> PASS`, then integrated implementation review `REVISE -> REVISE -> PASS`. The canonical local gate passes 202 tests with zero skips, package inspection, strict framing and state reconstruction, matrix-bound evidence, a renderer-only internal CLI, and no public executable namespace. Branch CI remains pending.

## Findings

| Severity | Finding | Required Action |
| --- | --- | --- |
| Resolved | SWECircuit was approved and the GitHub repository was renamed; no package or domain acquisition is in scope. | Preserve the repo-only decision and 0.x compatibility boundary in `identity-migration.md`. |
| Resolved | Runtime, serialization, schema, and compatibility choices define an unstable private 0.x API. | Preserve the accepted ADR and require a separate decision before public distribution. |
| Resolved | Three specialist reviews found the first-run, diagnostic, compatibility, trace, security, and adapter contracts underspecified. | The owner accepted the integrated brief; T005 froze schemas and T006 verified validation semantics. |
| Medium | Product rename can break current links and confuse historical evidence. | Define a current-surface migration rule and preserve historical provenance. |
| Resolved | Inspection could echo arbitrary event content or secrets. | RunEvent is closed and reference-shaped; summaries are bounded, whole-value suppression covers every rendered string slot, and the inspector never persists or dereferences evidence. |
| Medium | A future producer can still create privacy and retention risk when writing traces. | Define persistence, retention, and deletion policy before adding a trace writer or hosted ingestion. |

## Residual Risks

- The historical TraceRail overview image is not yet rebranded for SWECircuit.
- No license has been selected.
- The target architecture may need to be split if V9 exceeds a small, testable kernel.

## Memory And Docs

The T008 source package preserves the frozen contract, both reviewer loops, six resolved implementation findings, canonical local evidence, and the pending remote gate. Durable memory advances only after branch CI closes T008; T009 is the next implementation stage.