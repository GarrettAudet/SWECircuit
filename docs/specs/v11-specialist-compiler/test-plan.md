# V11 Specialist Compiler Test Plan

## Status

Passed for the revision-6 digest-bound candidate. The exact evidence pair is compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification | Outcome |
| --- | --- | --- |
| AC1 | Public compiler tests construct candidates, select deterministically, and assert complete selected blueprints. | PASS |
| AC2 | Assumption/decision normalization, digest mutation, blocking-decision rejection, and visible non-blocking rationale tests. | PASS |
| AC3 | Leading/nested traversal rejection plus TypeScript/schema five-kind permission closure and installed-consumer probes. | PASS |
| AC4 | Exact canonical partition counts through eight units, reordering permutations, and byte-identical repeat output. | PASS |
| AC5 | Above-limit bounded structural search, supplied candidates, named claim, and no-global-optimum assertions. | PASS |
| AC6 | Six reviewed goldens plus serial/non-serial machine-readable selection reasons. | PASS |
| AC7 | Table-driven malformed, duplicate, cycle, evidence, authority, context, secret, traversal, decision, and role-shaped negatives with stable diagnostics. | PASS |
| AC8 | Blueprint ownership, Module ports, context, authority, evidence, dependencies, handoff, stops, and forbidden runtime/provider fields. | PASS |
| AC9 | Deterministic rendering, exact compilation/manifest/contract closure, expected-digest verification, and coordinated tamper negatives. | PASS |
| AC10 | IDE kickoff contract, packed consumer, generated dogfood package, exact specialist handoffs, and integration flow. | PASS |
| AC11 | Format, lint, typecheck, build, 323 tests, focused schema/compiler/containment, package consumer, template checker, and negative matrix. | PASS |
| AC12 | Source-linked revision-6 dogfood report, serial comparison, selected metrics, attempts 1-6 including 6A/6B, friction, and outcomes. | PASS |
| AC13 | Independent product/API, algorithm/lifecycle, and security/trace PASS handoffs against the same prepared digest pair. | PASS |

## Automated Checks

- Focused schema: 7/7 passed.
- Focused compiler/golden: 35/35 passed.
- Host containment: 6/6 passed.
- Canonical `npm.cmd run verify`: format checked 72 files, lint checked 60 files, typecheck/build passed, and 323/323 tests passed.
- Both dogfoods, offline installed-consumer compilation and package verification, package inspection, and template checker passed.
- Complete negative checker matrix passed in 744.9 seconds.

## Golden Optimization Cases

1. `one-agent-optimal`: startup/handoff costs make the serial roster strictly best.
2. `genuinely-parallel`: disjoint heavy work shortens projected makespan with two specialists.
3. `under-split`: required producer/checker independence makes the serial partition ineligible.
4. `over-split`: atomic agents lose to a cohesive partition through handoff and startup costs.
5. `conflict-heavy`: equal write/conflict keys serialize apparent parallel work and prevent a false speed win.
6. `generic-role`: an extra `role` or provider-shaped field fails the closed candidate contract; the valid replacement compiles from exact work ownership.

All six passed focused tests and algorithm/lifecycle review.

## Dogfood Evidence

- [Report](evidence/dogfood/report.json): exact search evaluated 203 candidates, found 52 eligible, and selected six agents at projected makespan 23.
- [Serial baseline](evidence/dogfood/report.json): projected makespan 40 and ineligible for `evidence_independence`.
- [Candidate ledger](evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json): 34/34 source bindings passed, and `context.spec` targeted only the immutable pre-integration snapshot.
- [Release verification](evidence/dogfood/handoffs/verify-release-pass-attempt-6.md): 19/19 assigned contexts and 9/9 package files remained stable across execution, and both trusted digests reconstructed.
- [Independent handoffs](evidence/dogfood/handoffs/): product/API 12/12, algorithm/lifecycle 14/14, and security/trace 32/32 passed with no findings.

## Manual Checks

- Product/API review confirmed a first-time host can identify the goal, roster, boundaries, digest pair, integration order, and evidence without provider/runtime fields.
- Algorithm/lifecycle review confirmed the selection explanation follows the documented comparator and the exact/bounded claims remain honest.
- Security/trace review confirmed README and contract claims keep execution, enforcement, isolation, persistence, merge, and memory effects external.

## Skipped Or External Checks

- No real provider execution, model comparison, worktree isolation, runtime cancellation, merge, or automatic memory mutation was attempted; these are outside V11.
- No hosted CI run is claimed for this digest-bound shared-worktree candidate.
- Post-integration reconstruction passed after the authorized documentation outputs changed, as recorded in [the attempt-6 replay handoff](evidence/dogfood/handoffs/post-integration-replay-pass-attempt-6.md).
- Planning weights and projected makespan are deterministic comparison units, not elapsed-time or performance evidence.

## Evidence Ownership

The candidate, package, raw handoffs, failed/fix attempts, and final PASS records are preserved under `evidence/dogfood/`. Attempt 5 remains `FIX` after mutable-live-spec replay; attempts 6A and 6B remain host-side `FIX` retries. The integrated interpretation is in `review.md`; post-integration reconstruction passed, while owner approval and a clean pushed branch remain open in T011.
