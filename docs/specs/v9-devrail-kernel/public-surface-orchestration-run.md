# V9 Public Surface Orchestration Run

## Status

Complete; independent review, local gates, and branch CI returned `PASS`.

## Pattern

One integration owner plus one independent read-only public-surface reviewer. The owner keeps copy, example, asset, checker, and memory changes together because they form one externally visible contract.

## Branch And State

- Branch: `codex/v9-devrail-kernel`
- Frozen input baseline: `e86aba9`
- Active task: T009 identity migration and public quick start
- Integration owner: primary IDE agent
- Merge target: none for reviewer handoff

## Roster

| Role | Work Unit | Authority | Stop Condition |
| --- | --- | --- | --- |
| Primary IDE agent | A-C: contract, example, asset, tests, synthesis | Own bounded edits, verification, review integration, and memory. | Stop on public distribution, runtime orchestration, licensing, or unresolved claim conflict. |
| Ramanujan (`019f5d91-9a1c-78d3-bad0-2b019cd469c8`) | D: public-surface contract and implementation review | Read and recommend only. | Stop outside T009. |

## Required Review Questions

1. Can a first-time developer distinguish the target operating model from the operations V9 actually executes?
2. Does any wording imply a public package, executable name, domain, organization, registry identity, or hosted service?
3. Is the module -> circuit -> work packet -> agent -> gate -> trace/memory story coherent without prior handbook knowledge?
4. Can the quick-start commands be reproduced from a clean source checkout under their stated preconditions?
5. Do the example and visual support rather than overstate the README?
6. Will automated checks catch the most damaging forms of public-surface drift?

## Finding Disposition

Every finding must be recorded as fixed, deferred with a bounded reason, or rejected with evidence. T009 cannot pass with an unresolved high-severity accuracy, command, identity, or security finding.

## Review Fan-In

Initial verdict: `REVISE`.

| Severity | Finding | Resolution In Revision 1 |
| --- | --- | --- |
| High | The proposed regressions did not enumerate capability or distribution overclaims. | A closed matrix now names every capability overclaim, public command form, package privacy mutation, navigation requirement, current operation, identity, status, and asset mutation that must fail. |
| High | The quick start lacked exact commands, prerequisites, outputs, path semantics, repeat behavior, cleanup ownership, and E2E mapping. | The contract now freezes the source-root transcript, exact summaries, one-time initializer behavior, caller cleanup ownership, trace relativity, and temporary-project test sequence. |
| Medium | The canonical sequence omitted modules and gates, and the historical-asset rule was ambiguous. | The required chain now names every step and external execution boundary; only the old README embed is rejected while the historical file and dated provenance remain preserved. |

Focused re-review verdict: `PASS`, with no remaining actionable findings.

## Handoff

Preimplementation review completed `REVISE -> PASS` with Ramanujan (`019f5d91-9a1c-78d3-bad0-2b019cd469c8`).

## Implementation Review Fan-In

Initial implementation verdict: `REVISE`.

| Severity | Finding | Resolution In Remediation 1 |
| --- | --- | --- |
| High | The visual retained rail terminology, merge-before-verify ordering, unqualified execution semantics, and unreadable narrow-width captions. | The revised asset names Circuit, labels the target and external executor, shows Route fan-out followed by Verify, Integrate, Review, and Memory, and replaces dense captions with three large callouts. README alt text now states the same target boundary and order. |
| Medium | The E2E used absolute paths and compared only trace bytes. | The test now executes the literal relative README arguments twice and snapshots every directory and file byte in the complete example tree before and after. |
| Medium | Asset checks accepted plain text, rejected provenance links, and falsely rejected a truthful capability negation. | The checker now requires Markdown image syntax, rejects only the historical image embed, uses object-specific positive-claim patterns, and adds demotion, passing provenance-link, and passing truthful-negation fixtures. |
| Low | Implementation evidence remained pending and completed asset work sat under Remaining Work. | This run now records the implementation gate and finding disposition; identity migration separates completed current-surface work from remaining compatibility work. |

Focused implementation re-review 1 verdict: `REVISE` because the run still reported remediation evidence as pending and retained the pre-remediation scenario count. The record was corrected to distinguish the 39-scenario pre-review gate from the 42-scenario remediation gate.

Final focused implementation re-review verdict: `PASS`, with no remaining actionable findings.

Implementation review completed `REVISE -> REVISE -> PASS` with Ramanujan (`019f5d91-9a1c-78d3-bad0-2b019cd469c8`).

## Verification

Before implementation review, `npm.cmd run verify` passed 205 tests with zero skips and package dry run; the positive template checker and all 39 then-current checker scenarios passed. After remediation, all three focused quick-start tests, the positive template checker, and all 42 expanded checker scenarios passed. Final focused re-review returned `PASS`. The canonical implementation-checkpoint rerun then passed 205 tests with zero skips, format, lint, typecheck, build, package dry run, the positive template checker, and all 42 checker scenarios. Commit `c9d7e4f` passed all seven jobs in GitHub Actions run `29292597506`.
