# Test Plan

## Status

In progress.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Temp-directory initializer integration test, offline assertion, collision test, and immediate validation |
| AC2 | Valid and malformed schema fixtures with stable diagnostic snapshots and exit-code assertions |
| AC3 | Semantic graph fixtures for references, outcomes, cycles, fan-out, fan-in, ownership, and stop conditions |
| AC4 | Event-stream fixtures for success, retry, timeout, cancellation, failed handoff, causality, and terminal state |
| AC5 | Clean-install core test with no optional adapters and no network access |
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

- Preserve the V8.1 positive checker and expand the malformed-artifact suite; the identity migration now has seventeen regression cases.
- Add one negative fixture for every distinct parser, resolver, graph rule, event transition, and CLI error path.
- Add explicit regressions for worker timeout, cancellation, retry exhaustion, failed handoff, and ambiguous fan-in.
- Add cross-platform path and newline fixtures before declaring portability.

## Skipped Checks

- External model-provider, worktree merge, hosted telemetry, and marketplace tests are outside V9.
- License validation remains skipped until the owner selects a license.

## Verification Evidence

V9 identity migration passes `scripts/check-template.ps1` and all seventeen `scripts/test-check-template.ps1` cases. GitHub Actions run `29268926620` passes the private toolchain on Node 22 and 24 across Ubuntu, Windows, and macOS. T005 adds eleven passing schema and fixture tests plus package inspection of every v1alpha1 contract artifact. T006 adds deterministic parsing, dispatch, path, reference, graph, permission, limit, and diagnostic coverage: 49 tests pass with zero skips, independent re-review is `PASS`, and GitHub Actions run `29277160551` passes all seven jobs. T007 raises the suite to 82 tests with exact initializer bytes and IDs, collision and recovery safety, four pending-capture faults, a process race synchronized after preflight, dynamic offline/process traps, independent `PASS`, and seven green jobs in run `29281182002`. CLI and trace cases remain mapped to T008.
