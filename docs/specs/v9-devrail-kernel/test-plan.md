# Test Plan

## Status

Draft.

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
| AC8 | V9 source package, dogfood trace, review, milestone, history, retrieval, and memory audit |

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

- Preserve the V8.1 positive checker and fifteen-case malformed-artifact suite.
- Add one negative fixture for every distinct parser, resolver, graph rule, event transition, and CLI error path.
- Add explicit regressions for worker timeout, cancellation, retry exhaustion, failed handoff, and ambiguous fan-in.
- Add cross-platform path and newline fixtures before declaring portability.

## Skipped Checks

- External model-provider, worktree merge, hosted telemetry, and marketplace tests are outside V9.
- License validation remains skipped until the owner selects a license.

## Verification Evidence

V9 intake passed scripts/check-template.ps1 and all fifteen scripts/test-check-template.ps1 cases after bounded recovery from the known patch-helper failure. Executable kernel checks remain pending implementation.