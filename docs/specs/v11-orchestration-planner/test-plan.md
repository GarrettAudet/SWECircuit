# V11 Test Plan

## Status

Draft. Architecture-gate tests are specified before implementation.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Planner contract, valid-plan fixture, immutability checks, and schema/semantic validation |
| AC2 | Hostile input/output, limit, privacy-canary, malformed proposal, and zero-worker-call matrices |
| AC3 | Capability permutation, least-authority, capacity, ambiguity, and explanation-code tests |
| AC4 | Dependency, join, conflict, isolation, concurrency, deterministic-wave, and single-claim tests |
| AC5 | Overlapping-write serialization/block tests plus truthful isolation-declaration negatives |
| AC6 | Clarification, approval, exact-revision resume, stale response, and no-replay transition tests |
| AC7 | V10 result-ingestion matrix for complete, failed, cancelled, timed-out, and `abort_unconfirmed` |
| AC8 | `all`/`any` fan-in, integration-owner, worker evidence, integrated verification, and review gates |
| AC9 | Parent/child provenance, interrupted run, bounded journal, privacy, and trace reconstruction |
| AC10 | Two host fixtures with equivalent capabilities and shuffled metadata produce identical semantics |
| AC11 | Four-specialist dogfood, serial control, timing observation, failure cascade, diagnosis, and equivalent final evidence |
| AC12 | Canonical verification, full checker matrix, package consumer, cross-platform CI, independent review, milestone, and memory |

## Automated Checks

- Unit: planner snapshots, proposal validation, capability matching, reducer transitions, joins, claims, quarantine, trace construction, and diagnostics.
- Integration: goal-to-plan compilation; host loop feeding V10 summaries; clarification/resume; integrated verification and review.
- E2E: deterministic four-specialist fan-out/fan-in dogfood plus equivalent serial control.
- Property and matrix checks: input-order invariance, exactly-once claim, terminal immutability, bounded traversal, and no provider-name influence.
- Security: accessor/proxy/cycle/limit canaries, secret suppression, no-effect rejection, no-network/no-process source guards, and isolation overclaim negatives.
- Compatibility: all V9 and V10 tests, schema fixtures, trace inspection, dogfood, and packed consumer.
- Typecheck: `npm.cmd run typecheck`.
- Lint: `npm.cmd run lint`.
- Build: `npm.cmd run build`.
- Canonical: `npm.cmd run verify`.
- Template contract: `scripts/check-template.ps1` and `scripts/test-check-template.ps1` after checker changes.

## Manual Checks

- A human can read one plan and explain why each packet exists, which module produced it, why an agent matched, what can run now, what is blocked, and what evidence gates integration.
- An IDE host can surface clarification, current wave, active assignments, blocked dependencies, failures, and the next action without exposing provider-specific core fields.
- A write-enabled plan cannot imply isolation from a declaration alone.
- A repeated implementation failure visibly routes to diagnosis instead of launching another speculative patch.
- Public docs clearly separate implemented V11 behavior, host obligations, deferred adapters, and the final product target.

## Regression Coverage

- Preserve every V9 schema, initialization, validation, trace, quick-start, package, and dogfood test.
- Preserve every V10 grant, permission, cancellation, timeout, privacy, immutable-snapshot, and one-packet executor test.
- Add one regression for each architecture or review finding before the finding is closed.
- Keep paired acceptance/rejection fixtures for provider neutrality, isolation claims, capability ambiguity, stale resume input, join readiness, and inherited evidence attribution.

## Skipped Checks

- Live provider calls are intentionally skipped because provider neutrality is an acceptance requirement.
- Real worktree, container, process, or credential enforcement is skipped until a separately evaluated execution/isolation adapter exists.
- Durable database recovery and cross-process claiming are deferred; V11 must not claim those guarantees.
- Automatic merge and memory mutation are deferred and remain owner/host actions.

## Verification Evidence

T001 bootstrap checks passed: placeholder scan, BOM/LF byte-shape audit, `git diff --check`, template checker, and the canonical package gate with 275 inherited V9/V10 tests. No V11 runtime evidence exists. Every later task must bind commands, results, reviewers, and hosted runs to the exact commit that produced them.
