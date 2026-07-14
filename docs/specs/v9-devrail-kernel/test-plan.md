# Test Plan

## Status

In progress.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Temp-directory initializer integration test, offline assertion, collision test, and immediate validation |
| AC2 | Valid and malformed schema fixtures with stable diagnostic snapshots and exit-code assertions |
| AC3 | Semantic graph fixtures for references, outcomes, cycles, fan-out, fan-in, ownership, and stop conditions |
| AC4 | Bound T008 cases for success, retry, explicit timeout, cancellation, failed handoff, causality, every transition, and all terminal states |
| AC5 | Per-operation dynamic network/process traps with no optional adapter installed |
| AC6 | Format, type, unit, integration, fixture, build, package, and CI platform checks |
| AC7 | README quick-start execution plus manual current-versus-target claim review |
| AC8 | V9 source package, V8.2 dogfood trace, review, milestone, history, retrieval, and memory audit |

## Automated Checks

- Unit: schema utilities, diagnostics, graph rules, event state, redaction, and command behavior.
- Integration: initialize, validate, inspect, package execution, clean install, and cross-platform path behavior.
- E2E: documented quick start in a temporary repository.
- Typecheck: required for all executable source.
- Lint: required for source, tests, and configuration.
- Build: reproducible local package build with artifact inspection.

## Manual Checks

- Confirm the public explanation is understandable without reading the handbook.
- Confirm errors identify the failing file, field, rule, and recovery action.
- Confirm historical TraceRail and DevRail records remain source-valid while current product surfaces consistently use the owner-approved identity.
- Confirm traces do not capture secret values or full conversations by default.
- Confirm docs never imply that V9 launches agents or merges code unless that behavior exists.

## Regression Coverage

- Preserve the V8.1 positive checker and expand the malformed-artifact suite; T009 now exercises 42 checker scenarios, including current identity, visual embeds, shipped operations, capability boundaries, private package metadata, navigation, and truthful exceptions.
- Bind every T008 matrix claim to named table-driven cases for dispatch, framing, limits, transitions, terminal states, retry lineage, missing references, privacy slots, and evidence grammar.
- Cover success, retry, explicit timeout, cancellation, failed handoff, causation, interleaved runs, bounded summaries, and renderer-only CLI behavior directly.
- Portability evidence is GitHub Actions run `29288359476`, which passes Node 22 and 24 on Ubuntu, Windows, and macOS.
- T010 permanently exercises measured semantic replay, expected `SC1001` recovery, `SC1021` collision preservation, source-tree immutability, mid-run and post-capture cleanup, report path suppression, observation digest binding, and exact retry-trace reconstruction.

## Skipped Checks

- External model-provider, worktree merge, hosted telemetry, and marketplace tests are outside V9.
- License validation remains skipped until the owner selects a license.

## Verification Evidence

V9 identity migration passes `scripts/check-template.ps1` and all seventeen `scripts/test-check-template.ps1` cases. GitHub Actions run `29268926620` passes the private toolchain on Node 22 and 24 across Ubuntu, Windows, and macOS. T005 adds eleven passing schema and fixture tests plus package inspection of every v1alpha1 contract artifact. T006 adds deterministic parsing, dispatch, path, reference, graph, permission, limit, and diagnostic coverage: 49 tests pass with zero skips, independent re-review is `PASS`, and GitHub Actions run `29277160551` passes all seven jobs. T007 raises the suite to 82 tests with exact initializer bytes and IDs, collision and recovery safety, four pending-capture faults, a process race synchronized after preflight, dynamic offline/process traps, independent `PASS`, and seven green jobs in run `29281182002`. T008 raises the canonical suite to 202 tests with zero skips; its named matrix cases cover strict JSONL framing, size and allocation bounds, exact event dispatch, causation, every legal and disallowed attempt transition, all terminal states, retries and forks, timeout, cancellation, failed handoff, evidence bounds, all rendered privacy slots, and exact CLI streams. Preimplementation review completed `REVISE -> REVISE -> REVISE -> REVISE -> PASS`, implementation review completed `REVISE -> REVISE -> PASS`, and GitHub Actions run `29288359476` passes all seven jobs.
T009 raises the canonical suite to 205 tests. The source-checkout quick start executes the literal relative README commands twice and proves whole-example immutability; a temporary project covers initialization, validation, trace copying, inspection, and collision-safe repeat behavior. Public-surface contract review completed `REVISE -> PASS`, implementation review completed `REVISE -> REVISE -> PASS`, the positive checker passes, and all 42 checker scenarios accept truthful provenance/negation while rejecting stale identity, image demotion, capability overclaims, public package/CLI forms, broken navigation, and stale kernel status.
T010 raises the canonical suite to 209 tests. Its repository-local harness executes ten bounded steps, records monotonic timing without thresholds, observes exact `SC1001` and `SC1021` failures, performs one explicit caller recovery and retry, proves source and manifest digests, and removes only an identity-rechecked temporary root. Four focused tests cover two-run semantic equivalence, two cleanup failure points, path suppression, observation digest binding, and exact 22-event retry reconstruction. Preimplementation review recovered one timed-out reviewer and returned `PASS`; implementation review recovered one timed-out reviewer, then progressed `REVISE -> PASS`. The template checker and canonical local gate pass; GitHub Actions run `29310133523` passes all seven jobs for commit `6d4e60a`.

GitHub Actions run `29292597506` passes Template Check and all six Node 22/24 kernel jobs across Ubuntu, Windows, and macOS for T009 commit `c9d7e4f`.

GitHub Actions run `29310133523` passes the same seven-job matrix for T010 implementation commit `6d4e60a`.
