# Review

## Status

In progress.

## Review Outcome

Identity, architecture, schema, deterministic project validation, offline initialization, read-only trace inspection, and the public quick start passed locally and remotely. T010 dogfooding passes locally, independently, and across all seven branch CI jobs; T011 final closure remains.

## Spec Alignment

The V9 package dogfoods the completed V8.2 baseline. DevRail is rejected, SWECircuit is approved only for the project and GitHub repository, ADR 0001 is accepted, v1alpha1 is frozen, T006 satisfies AC2 and AC3, T007 satisfies AC1, T008 satisfies AC4 and AC5, and T009 satisfies AC7. T010 supplies measured dogfood and retry evidence toward AC8; T011 still owns final package, milestone, CI, and memory closure.

## Architecture Alignment

The implementation preserves the file-based core, provider-neutral adapters, source-first memory, canonical outcomes, branch workflow, and current-versus-target honesty. The private pure-Node boundary is explicit, including the one deferred opaque Windows metadata check.

## Verification Evidence

V8.1 merged and passed main CI before V9 branch creation. The bounded V8.2 SWECircuit identity release then merged to `main`, was adopted by V9 at `35f96d2`, and passed the positive checker, all seventeen regression cases, and GitHub Actions run `29265535389`.

The V9 architecture gate used three bounded read-only specialist reviewers. All returned `REVISE`; their integrated review and decision brief passed the positive checker and all seventeen regression cases without shared-file edits.

T006 used one independent read-only reviewer, integrated two `REVISE` rounds, and finished with focused `PASS`. The canonical local gate passes 49 tests with zero skips, package inspection, the template checker, and all seventeen checker regressions. GitHub Actions run `29277160551` passes all seven jobs.

T007 used one independent read-only reviewer, integrated initial and focused `REVISE` rounds, and finished with focused `PASS`. The canonical local gate passes 82 tests, package inspection, the template checker, all seventeen checker regressions, and encoding inspection. GitHub Actions run `29281182002` passes all seven jobs.

T008 froze its contract through `REVISE -> REVISE -> REVISE -> REVISE -> PASS`, then integrated implementation review `REVISE -> REVISE -> PASS`. The canonical local gate passes 202 tests with zero skips, package inspection, strict framing and state reconstruction, matrix-bound evidence, a renderer-only internal CLI, and no public executable namespace. GitHub Actions run `29288359476` passes Template Check and all six Node 22/24 platform jobs.

T009 froze its public contract through `REVISE -> PASS`, then integrated implementation review `REVISE -> REVISE -> PASS`. The canonical local gate passes 205 tests with zero skips. The source-checkout example executes literal relative commands and remains byte-for-byte unchanged; all 42 checker scenarios bind identity, visual, capability, navigation, and private distribution boundaries while preserving truthful provenance and negation. GitHub Actions run `29292597506` passes all seven jobs for commit `c9d7e4f`.

T010 freezes one measured circuit over the three shipped operations. The final local observation records ten steps, eight kernel calls, two controlled failures, one explicit retry, 2,457.835 ms on Node v24.14.1/Windows x64, unchanged source and manifest digests, and identity-checked cleanup. Its caller-authored 22-event trace binds the observation digest and reconstructs `inspect-trace-1` failed -> `inspect-trace-2` completed with `retryOf`, plus `diagnose -> pass`. Four focused regressions cover semantic repeatability, mid-run and early-setup cleanup, path suppression, digest binding, and trace reconstruction. The canonical gate passes 209 tests with zero skips. Review progressed through two centrally recovered liveness failures, then preimplementation `PASS` and implementation `REVISE -> PASS`. GitHub Actions run `29310133523` passes all seven jobs for commit `6d4e60a`.

## Findings

| Severity | Finding | Required Action |
| --- | --- | --- |
| Resolved | SWECircuit was approved and the GitHub repository was renamed; no package or domain acquisition is in scope. | Preserve the repo-only decision and 0.x compatibility boundary in `identity-migration.md`. |
| Resolved | Runtime, serialization, schema, and compatibility choices define an unstable private 0.x API. | Preserve the accepted ADR and require a separate decision before public distribution. |
| Resolved | Three specialist reviews found the first-run, diagnostic, compatibility, trace, security, and adapter contracts underspecified. | The owner accepted the integrated brief; T005 froze schemas and T006 verified validation semantics. |
| Resolved | Product rename can break current links and confuse historical evidence. | T009 enforces current links and the SWECircuit embed while preserving the TraceRail file and dated provenance links. |
| Resolved | Inspection could echo arbitrary event content or secrets. | RunEvent is closed and reference-shaped; summaries are bounded, whole-value suppression covers every rendered string slot, and the inspector never persists or dereferences evidence. |
| Resolved | The first T010 harness left two post-capture setup actions outside cleanup protection. | Move all post-capture work into the guarded block and retain both mid-run and early-setup cleanup regressions. |
| Medium | A future producer can still create privacy and retention risk when writing traces. | Define persistence, retention, and deletion policy before adding a trace writer or hosted ingestion. |

## Residual Risks


- No license has been selected.
- The target architecture may need to be split if V9 exceeds a small, testable kernel.
- One local timing observation is not comparative performance or production-readiness evidence.
- The external reviewer runtime still needs manual deadline, cancellation, and retry handling; V9 represents such state but does not enforce it.

## Memory And Docs

The T010 source package preserves the frozen dogfood contract, measured observation, content digest, caller-owned retry trace, both reviewer liveness failures, remediation evidence, four focused regressions, and the 209-test local gate. Branch CI passed; T010 memory and completion state now advance to the T011 final audit.
