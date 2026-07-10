# Test Plan

## Status

Complete.

## Acceptance Criteria Mapping

| Area | Evidence |
| --- | --- |
| Honest positioning | README current-versus-target text and status |
| Module/rail consistency | Dynamic contract validation across all module and rail files |
| Canonical outcomes | Dedicated module and rail outcome value fixtures |
| Debug enforcement | Complete-debug negative fixture |
| Dynamic packs | Invalid second-pack fixture |
| Decimal milestones | Missing V8.1 milestone fixture |
| Memory provenance | Decision and pattern source validation |
| Write-enabled dogfood | Decomposition plan, run record, worker handoffs, failures, and recovery |

## Automated Checks

Passed:

- scripts/check-template.ps1
- scripts/test-check-template.ps1
- PowerShell parser checks for both scripts.
- Git diff whitespace check.
- Placeholder and unexpected non-ASCII scans.
- Local Markdown-link resolution for changed documentation.
- Canonical outcome scan.
- Decision and pattern provenance coverage checks.

## Manual Checks

Passed:

- Public positioning distinguishes current protocol from target runtime behavior.
- All five rail tables remain readable with the full inline module interface.
- Worker scopes remained disjoint and produced no file conflicts.
- Failed worker attempts and integration-owner recovery are source-visible.
- Memory sources use existing artifacts instead of invented provenance.
- Checker implementation was reviewed independently of its passing test output.

## Regression Coverage

The permanent regression suite accepts the valid repository and rejects:

1. A Complete debug record missing reproduction.
2. A Complete feature with an unchecked acceptance criterion.
3. A dynamically discovered invalid official pack.
4. A decimal feature version missing its milestone.
5. A module missing its Action contract.
6. A module with an empty Action section.
7. A dynamically discovered invalid module.
8. A module emitting a non-canonical workflow outcome.
9. A rail table missing Action.
10. A rail module row with an empty Action value.
11. A dynamically discovered invalid rail.
12. A rail emitting a non-canonical workflow outcome.
13. Decisions missing the Source field.
14. Patterns missing the Source Map.
## Skipped Checks

- Runtime, router, worktree-isolation, and external-repository tests remain V9 and later work.
- License validation remains blocked on the owner choice.

## Verification Evidence

The positive checker passed. Fifteen total regression cases passed: one valid baseline plus fourteen expected rejections. GitHub Actions run 29068919530 passed every workflow step with no annotations; the latest branch commit must retain green CI before merge.
