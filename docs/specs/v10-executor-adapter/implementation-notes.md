# Implementation Notes: V10 Bounded Executor Boundary

## Status

Runtime revision remains verified on `9d8907a`. Candidate `b3ff0d3` passed all seven hosted jobs plus API/documentation review; correctness and security found fenced-content ownership bypasses, and correctness found duplicate exact heading owners. The current correction strips fenced content before all structural lookups, requires unique section and subsection owners, and retains logical statements, first-table rows, and expected diagnostics. All 71 local scenarios pass; exact-commit review and hosted CI remain. V10 is not merged.

## Summary Of Changes

- Added a provider-neutral executeWorkPacket operation for exactly one host-selected WorkPacket and one trusted caller-injected WorkPacketExecutor.
- Added a closed invocation-scoped ExecutionGrant, manifest compatibility checks, executor identity binding, and three-direction permission coverage.
- Added bounded plain-JSON snapshots that reject cycles, accessors, symbols, custom prototypes, invalid numbers, array holes, depth overflow, and node overflow.
- Added deterministic lifecycle journals with fixed actor, grant link, contiguous IDs and sequences, linear causation, immutable snapshots, and whole-journal V9 inspection before return.
- Added honest cooperative cancellation semantics for acknowledged cancellation, timeout, and abort_unconfirmed potentially live work.
- Added fixed failure normalization for executor throws, malformed settlements, and secret-bearing return data without copying raw provider values.
- Added the no-I/O createDeterministicTestExecutor and root-exported public types.
- Added SC4201 through SC4210 and advanced the diagnostic catalog to 1.3.0 without changing the six artifact schemas or event vocabulary.
- Extended the packed-consumer gate to compile the emitted declarations under independent compiler settings, execute one installed packet, and inspect its journal offline.
- Added a deterministic V10 dogfood circuit with a controlled permission failure, corrected grant, caller-owned trace, byte-checked observation, and identity-checked temporary cleanup.
- Updated the README, handbook, framework guide, capability adapters, module registry, practice register, schema contract, and workflow checker to state the exact V10 boundary.

## Deviations From Plan

The intake recommendation considered an opt-in local child-process adapter. Primary-source research showed that pure Node cannot guarantee descendant process termination or cross-platform isolation, so V10 narrowed the executable surface to a caller-injected port plus a no-I/O test implementation. This redesign is preserved in the research snapshot, ADR 0002, and architecture review.

V10 also added an independent packed-declaration compile after the first external host exposed a pre-existing declaration portability defect. The root cause and causal fix are preserved in debug-notes.md and root-cause-analysis.md.

The first postimplementation review returned three `REVISE` verdicts despite a green suite. The integration owner removed the remaining invocation gap, anchored acknowledgment to the abort observation, re-armed early timer wake-ups, rejected proxies before reflection, bounded record keys before descriptors, narrowed the public grant type, repaired installed docs and consumer narrowing, and added focused regressions before preparing the acceptance candidate.

Exact review of `e3453e0` then found a remaining settlement-ownership interval and imprecise no-call documentation. The observer now detaches and normalizes fulfillment before timestamping it, a resolve-then-mutate regression protects that boundary, and active guidance distinguishes no-call terminal certainty from post-invocation, contract-compliant promise settlement acknowledgment.

Subsequent exact candidates exposed progressively wider documentation drift: lifecycle synonyms, an unqualified ADR rule, security-significant grant adjectives, secondary public summaries, and finally missing promise-liveness and grant prerequisites across several surfaces in `b2d73e7`. Later parity candidates exposed contradiction, logical-line, first-table, fenced-content, and duplicate-owner bypasses. The current correction promotes an ADR-to-surface matrix, public contract parity practice, and checker fixtures so the same defect cannot pass as prose-only consistency.

The first fence-aware parser rescanned Markdown for every section lookup and caused a 69-scenario run to exceed 360 seconds. A process-local cache and no-fence fast path restored the positive checker to 2.27 seconds while preserving isolated fixtures; two complete 71-case runs finished in 211.2 and 208.2 seconds.

## Assumptions Used

- Provider-neutral execution and explicit host authority are the smallest useful V10 increment.
- A trusted embedding host supplies executable code and enforces the actual sandbox, tools, credentials, and workspace.
- The canonical artifact vocabulary remains unchanged because a runtime grant must not become a self-authorizing file.
- A valid API call is not equivalent to successful work; callers branch on ExecutionSummary.disposition.
- After invocation, an unacknowledged abort leaves potentially live work and must not produce false terminal evidence; before invocation, the no-call path may terminate.

## Follow-Up Work

- Evaluate one real provider adapter only after an adapter evaluation and explicit owner approval.
- Design native, container, or hosted isolation before adding a command executor.
- Add scheduling, retries, durable event sinks, resumed input, merge, and memory automation only as separate reviewed versions.
- Decide whether the unstable 0.x library surface is ready for a public package in a later milestone.

## Verification Performed

- V9 baseline on 2b7bef37fb2477e3fc8779171c5971a3db42f20b: canonical verification passed with 209 tests.
- V10 corrected implementation suite: 275 tests passed, including settlement detachment, cancellation races, proxy safety, snapshot bounds, execution lifecycle, and dogfood cleanup coverage.
- V10 dogfood: under-authorized grant rejected with SC4206 and zero calls; corrected grant invoked once; seven-event journal reconstructed as completed.
- Packed consumer: offline install, independent public-declaration compile, initialization, validation, one packet execution, and trace inspection passed.
- The pre-parity workflow checker passed its 43 scenarios: 40 expected rejections and three expected acceptances.
- Fresh `npm.cmd run verify` passes format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the clean offline installed consumer.
- Exact candidate `9d8907a` passed correctness, security, and API/documentation review plus all seven jobs in GitHub Actions run `29357443883`. The first direct-phrase search then found one stale feature-spec sentence. Candidate `2c6dff4` corrected it and passed run `29358105210`, but expanded review found synonymous claims in the plan and practice register. The complete claim-family correction must pass the final exact gate.
- Candidate `dbbeeb1` reconciled that claim family and passed run `29358867851`, but correctness found one unqualified ADR race rule and security found stale ephemeral grant terminology. Both source statements were corrected for the next exact gate.
- Candidate `4c6818d` passed all seven jobs in run `29359564312`; exact review returned correctness `REVISE`, security `PASS`, and API/documentation `REVISE` for per-call grant wording, a missing packaged settlement precondition, and two misplaced practice rows.
- Candidate `b2d73e7` passed all seven jobs in run `29361203381`; all three reviewers returned `REVISE` for cross-surface promise-liveness drift and incomplete packaged grant non-guarantees.
- Candidate `ac70efc` passed all seven jobs in GitHub Actions run `29364033724`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `9209ff1` passed all seven jobs in GitHub Actions run `29366578213`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `PASS`.
- Candidate `b3ff0d3` passed all seven jobs in GitHub Actions run `29370427573`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS`.
- The current documentation-and-checker correction passes the positive checker and all 71 scenarios, comprising 67 expected rejections and four expected acceptances. Twenty-eight parity cases cover missing terms, relocation, contradictions, logical statements, exact first-table ownership, truthful negatives, causal diagnostics, fenced content, and unique heading owners. Exact-commit review and hosted CI remain.

## Durable Learnings

- A process API is not a sandbox, and a sent termination signal is not proof that a process tree stopped.
- Runtime authority must be supplied by the host and checked through invocation-scoped identity binding; an artifact can only request or limit authority. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Permission safety needs all three predicates: requested authority is granted, granted authority was requested, and granted authority fits the packet ceiling.
- Public declarations need an independent installed consumer because source typechecking under repository settings is not sufficient.
- Cancellation evidence must describe what the host observed, including uncertainty, rather than what it hoped happened.
- Timeout and acknowledgment bounds must be anchored to monotonic observations, defend against early timer wake-ups, and be checked at the actual invocation boundary.
- Reject proxies before reflection and bound key counts before descriptor traversal; revoked-proxy tests alone do not prove live traps stay dormant.