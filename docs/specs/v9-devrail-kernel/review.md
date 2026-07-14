# Review

## Status

Complete.

## Review Outcome

Approved for the owner merge gate. Implementation, private package acceptance, and immutable closeout candidate `0717c91` pass locally, independently, and across all seven branch CI jobs.

## Spec Alignment

The V9 package dogfoods the completed V8.2 baseline. DevRail is rejected, SWECircuit is approved only for the project and GitHub repository, ADR 0001 is accepted, and v1alpha1 is frozen. T007 satisfies AC1; T006 satisfies AC2 and AC3; T008 satisfies AC4 and AC5; T011 satisfies AC6; T009 satisfies AC7; and immutable candidate `0717c91`, run `29314459583`, final review, milestone, and durable memory satisfy AC8.

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

T011 completes the package-consumption and final acceptance boundary. The canonical gate packs the private artifact, derives an exact production-only consumer lock, performs offline `npm ci` from the repository-local cache, resolves the canonical entry from isolated `node_modules`, runs init, validate, and inspect, rejects source/config leakage and public `bin` metadata, and identity-checks cleanup. Four reviewer attempts exceeded manual handoff windows and were centrally closed without edits. A fast focused reviewer first exposed ambiguous read authority, then returned `PASS` after explicit read-only command permission. GitHub Actions run `29312736158` passes Template Check and all six Node 22/24 jobs across Windows, Ubuntu, and macOS for commit `0341345`. Rawls then reviewed the uncommitted closeout diff and returned `REVISE`: the records overclaimed pushed closeout state, and Faraday's package-checkpoint review did not cover the milestone and memory diff. The integration owner froze candidate `0717c91`, whose seven jobs passed in run `29314459583`; Rawls re-reviewed that exact commit and returned `PASS` with no findings.

## Findings

| Severity | Finding | Required Action |
| --- | --- | --- |
| Resolved | SWECircuit was approved and the GitHub repository was renamed; no package or domain acquisition is in scope. | Preserve the repo-only decision and 0.x compatibility boundary in `identity-migration.md`. |
| Resolved | Runtime, serialization, schema, and compatibility choices define an unstable private 0.x API. | Preserve the accepted ADR and require a separate decision before public distribution. |
| Resolved | Three specialist reviews found the first-run, diagnostic, compatibility, trace, security, and adapter contracts underspecified. | The owner accepted the integrated brief; T005 froze schemas and T006 verified validation semantics. |
| Resolved | Product rename can break current links and confuse historical evidence. | T009 enforces current links and the SWECircuit embed while preserving the TraceRail file and dated provenance links. |
| Resolved | Inspection could echo arbitrary event content or secrets. | RunEvent is closed and reference-shaped; summaries are bounded, whole-value suppression covers every rendered string slot, and the inspector never persists or dereferences evidence. |
| Resolved | The first T010 harness left two post-capture setup actions outside cleanup protection. | Move all post-capture work into the guarded block and retain both mid-run and early-setup cleanup regressions. |
| Resolved | AC6 lacked a real consumer of the packed private artifact. | Keep the lockfile-driven offline packed-consumer check in the canonical gate and cross-platform CI. |
| Resolved | The first four T011 reviewers did not return, and the fast retry was initially denied read access by an over-restrictive contract. | Preserve every failed attempt, distinguish read-only inspection from no commands, and require a returned verdict before closure. |
| Resolved | Final closeout records described an uncommitted diff as pushed and treated a package-checkpoint review as coverage of milestone and memory. | Candidate `0717c91` was frozen, pushed, passed exact run `29314459583`, and received independent `PASS` before completion. |
| Medium | A future producer can still create privacy and retention risk when writing traces. | Define persistence, retention, and deletion policy before adding a trace writer or hosted ingestion. |

## Residual Risks

- No license has been selected.
- The package and CLI remain private source-checkout interfaces; publication requires a separate decision.
- Pure Node retains documented filesystem race and opaque Windows metadata boundaries.
- Trace inspection does not prove producer truth, append-only history, or retention policy.
- One local timing observation is not comparative performance or production-readiness evidence.
- External reviewer liveness still needs manual deadline, central closure, and retry handling; V9 represents such state but does not enforce it.
- Node and npm upgrades must rerun the package-consumer matrix.

## Memory And Docs

The complete V9 source package preserves every slice contract, review loop, measured observation, digest-bound caller trace, package-consumer gate, reviewer liveness evidence, authority clarification, local verification, and both cross-platform checkpoints. Final closeout review completed `REVISE -> PASS` against immutable candidate `0717c91`; no merge has occurred.
