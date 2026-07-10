# Implementation Notes

## Status

Complete.

## Summary Of Changes

- Repositioned TraceRail as a checked, file-based operating protocol and labeled the visual as the target model.
- Normalized the module authoring template and all five rail tables.
- Separated canonical workflow outcomes from governance decisions.
- Added dynamic module, rail, and official-pack discovery.
- Fixed completed-debug validation and added decimal milestone support.
- Added source provenance to 28 decisions and 36 named patterns.
- Added permanent negative checker tests and CI execution.
- Made expected child-checker failures portable across Windows PowerShell and PowerShell Core, with CI-visible assertion annotations.
- Updated actions/checkout from deprecated v4 to the current official v7 release.
- Updated agent, contributor, quality, feature, orchestration, memory, and milestone guidance.

## Deviations From Plan

Work Unit A failed when apply_patch hit the known Windows sandbox helper defect. A replacement worker was authorized to use the documented fallback but exceeded the handoff deadline without a shared diff and was terminated. The integration owner completed that disjoint scope. Work Units B and C delivered valid write-enabled handoffs.

The permanent regression suite was added by the integration owner because temporary worker-local tests would not provide durable coverage.

## Assumptions Used

- Two successful worker scopes plus two transparently recorded failures provide useful first write-enabled dogfood evidence without proving production orchestration.
- Inline rail modules are valid when their full contract is present in the rail table.
- Governance states belong in artifacts; the outcome channel stays closed.

## Follow-Up Work

- Build V9 project initialization, schemas, and validation kernel.
- Add external-runtime status heartbeats, deadlines, cancellation, and isolated workspaces.
- Pilot write-enabled fan-out on executable code in TraceRail and external repositories.
- Select a public license.

## Verification Performed

- Positive template checker.
- Fifteen-case checker regression suite.
- PowerShell parsing.
- Contract, outcome, provenance, placeholder, ASCII, link, and whitespace checks.
- GitHub Actions after push.

## Durable Learnings

Disjoint file ownership prevented merge conflicts, but contract quality alone did not guarantee timely handoffs. Production orchestration needs runtime-level heartbeats, deadlines, cancellation, retry state, raw handoffs, and centralized recovery. Negative fixtures are required whenever a structural checker claims to enforce semantics.
