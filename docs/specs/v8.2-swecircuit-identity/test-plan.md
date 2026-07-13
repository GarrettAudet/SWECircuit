# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | GitHub API response, `git remote -v`, and `git ls-remote --symref origin HEAD` |
| AC2 | Scoped current-surface searches, README review, and checker assertions |
| AC3 | Historical-scope diff review and explicit compatibility documentation |
| AC4 | `scripts/check-template.ps1` plus `scripts/test-check-template.ps1` |
| AC5 | Branch base, file-scope review, and absence of V9 runtime source |
| AC6 | Completed feature package, review, milestone, memory, and approval gate |

## Automated Checks

- Unit: Checker helper behavior exercised through repository fixtures.
- Integration: Positive repository validation.
- E2E: Seventeen isolated repository fixtures, including legacy heading and retired URL rejection.
- Typecheck: Not applicable; no typed runtime source exists.
- Lint: `git diff --check` and checker structure validation.
- Build: Supporting GIF generator completed with bundled Python and Pillow.

## Manual Checks

- Confirm the GitHub repository slug, origin, About description, and workflow name use SWECircuit.
- Confirm README and canonical docs use Circuit while explaining the 0.x rail compatibility path.
- Confirm historical specs, milestones, snapshots, changelog entries, and ledger records retain source-valid names.
- Confirm V9 runtime and ADR work is not included in this branch.

## Regression Coverage

- Legacy README project heading is rejected.
- Retired `GarrettAudet/TraceRail` README URL is rejected.
- Existing module, circuit-path, pack, milestone, outcome, and memory-provenance regressions remain green.

## Skipped Checks

- Primary overview PNG pixel branding is not changed in V8.2 and remains a declared V9 risk.
- Runtime, package, schema, CLI, and adapter tests are outside this documentation-only version.

## Verification Evidence

- Local positive checker passed.
- All seventeen regression cases passed.
- `git diff --check` passed.
- GitHub branch CI run `29264529026` and final main CI run `29264704320` passed on release commit `7a08c37`.
