# Debug Notes

## Status

Release findings resolved; V11 Revision 31 source freshness passes, and one hosted-runner anomaly remains unconfirmed infrastructure evidence.

## Failure Summary

No product behavior failure remains. The release process exposed eight bounded issues:

1. V11 post-merge GitHub run `29676655629` left one Windows checker-regression step nonterminal.
2. Revision 3 found conjunctive decomposition ownership and alias/modal capability-check bypasses.
3. The first Revision 3 boundary handoff used invalid evidence status `fail` instead of `fix`.
4. The first Revision 4 visual launch blocked because the host translation prohibited process-backed read tools.
5. Revision 4 canonical verification found that the concise README removed two tested read-only CLI commands.
6. The next canonical replay rejected stale V11 dogfood bindings for the changed README and checker files.
7. The first Revision 31 Audit B binding run stopped because the host named the receipt identity without delivering the receipt as a runtime input.
8. The first complete canonical retry reached the installed-consumer gate but the branch-local offline cache lacked lockfile-pinned `require-from-string@2.0.2`.

## Reproduction

- Hosted anomaly: GitHub Actions run `29676655629`, job `88165181364`, step `Run checker regression tests`.
- Ownership bypass: replace the approved disjunctive sentence with `the developer and IDE close...`.
- Alias/modal bypass: append claims such as `Core dispatches agents.`, `The compiler persists handoffs.`, or `SWECircuit can enforce permissions.`.
- Handoff enum: verify the preserved `attempt-3/handoffs/boundary.invalid.json`.
- Host block: inspect `attempt-4/handoffs/visual.blocked-host-translation.json`.
- Quick-start regression: remove either local CLI command and run `node --test test/quick-start.test.mjs`.
- Source freshness: run `node scripts/run-v11-dogfood.mjs --check-evidence` against the Revision 30 bindings after changing the three bound public files.
- Receipt delivery: inspect `evidence/dogfood/handoffs/audit-bind-block-attempt-31a.json` and its corrected successor.
- Offline consumer: run `npm.cmd run consumer:check` before and after supplying the previously warmed lockfile-pinned cache.

## Stable Evidence

- Exact V11 SHA passed all seven release-branch jobs and fresh local gates.
- Revision 3 exact package and non-ready handoff set are preserved under `evidence/review/attempt-3/`.
- The checker matrix rejected the initial ownership correction because the regex matched the `IDE` tail inside `developer and IDE`.
- The corrected truth table accepts developer-only, IDE-only, and developer-or-IDE wording, while rejecting developer-and-IDE.
- Revision 4 review evidence is preserved, but its candidate is retired by the canonical quick-start failure.
- Revision 5 exact package and accepted handoffs are preserved under `evidence/review/attempt-5/`.
- The targeted quick-start suite, complete checker matrix, and 370-test kernel suite pass on Revision 5.
- Revision 31 Candidate A `sha256:4c3cb3249ff21f51387d05ed5b34810a5797844e137c755cfb8af01bb3fc221a` / `sha256:7f54a2346f0e29fde56d537dc8677136f3723561d9a9b57574871a4484029e63` and Audit B `sha256:5a8c1a13e0daca3411a023283b44e1d3ec9cc09b620733641f851b48892237b3` / `sha256:95c502bc2c71c048268115e1e3fa80860ff66c8f0715c21da8adeb7aa6222ea0` now pass strict evidence replay.
- The exact semantic Audit B handoff is 6,913 bytes at `sha256:a725445b28c8a2dd5fafbbf6467c93ee20dd783657c32ebf0f83a7ba7a3e508e` and independently reproduced the selection, authority, schedule, and package identities.
- After warming only local generated cache state, the standalone consumer gate and complete canonical `npm.cmd run verify` passed; the exact release-record tree also passed the full checker matrix in 256.9 seconds.

## Failure Classification

- Hosted anomaly: environment or tooling; root cause unconfirmed.
- Ownership and alias/modal findings: public-contract regression gaps.
- Invalid handoff enum: evidence-schema error.
- Visual block: external-host instruction error.
- Missing commands: executable documentation compatibility regression.
- Stale V11 tuples: immutable source-binding failure that correctly required a new revision.
- Missing receipt input: external-host delivery error; the candidate remained unchanged and unapproved.

## Context Retrieved

- Normative V11 compiler contract and explicit external-host exclusions.
- Active README, checker, complete checker fixture suite, and `test/quick-start.test.mjs`.
- Direct native and 600-pixel GIF inspection.
- Every prior reviewer package and exact raw handoff.

## Hypotheses

- H1: The hosted Windows child process failed to terminate.
- H2: A disjunctive owner regex alone rejects conjunctive ownership.
- H3: Direct SWECircuit-subject fixtures cover public capability overclaims.
- H4: Process-tool prohibition is necessary to preserve read-only reviewer authority.
- H5: A green public checker covers the complete README compatibility contract.
- H6: A bound public-surface change can reuse Revision 30 approval without recompilation.
- H7: Naming a runtime receipt identity is equivalent to delivering its exact bytes.

## Experiments

| Hypothesis | Experiment | Result | Conclusion |
| --- | --- | --- | --- |
| H1 | Compare prior hosted and fresh local exact-SHA runs. | Functional gates pass; hosted cause remains unavailable. | Preserve as infrastructure evidence; do not alter product code. |
| H2 | Add a conjunctive negative fixture. | Initial pattern matched the `IDE` suffix. | Add a bounded negative lookbehind and retain the fixture. |
| H3 | Add core/compiler aliases and modal forms for every family. | Prior checker accepted them; corrected checker rejects them. | Keep bounded subject/modal grammar and family fixtures. |
| H4 | Launch visual review with process-backed read tools prohibited. | Reviewer could not read declared context. | Permit host-provided read-only inspection without widening effects. |
| H5 | Run the canonical gate after checker and review pass. | `quick-start.test.mjs` found two missing commands. | Restore the commands and bind them into checker fixtures. |
| H6 | Replay Revision 30 against the changed public files. | Exact byte/digest mismatches stopped the gate. | Increment to Revision 31 and repeat the two-package trust root. |
| H7 | Launch the binder with only receipt metadata, then with the exact closed receipt. | First run blocked; exact retry passed and core verified its raw handoff. | Deliver runtime inputs explicitly and preserve both outcomes. |

## Current Status

Revision 5 passed independent visual and capability review. Revision 31 refreshed the three changed V11 source bindings, passed separate Audit B review, and passes strict dogfood replay. The complete canonical gate, 370-test kernel suite, offline installed-consumer gate, and 256.9-second checker matrix pass locally. No release finding remains open.

## Next Action

Publish the exact locally verified branch, require hosted CI, fast-forward to `main`, and record final evidence.
