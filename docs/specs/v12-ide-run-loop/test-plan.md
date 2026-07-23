# Test Plan

## Status

Package identity verification and handoff schema verification authenticate preserved artifacts; neither alone establishes workflow success, phase readiness, or release readiness. Revision 1 has incomplete fan-in. Revisions 2 and 3 retain `split` workflow outcomes. Later correction phases retain their recorded `pass` routes where preserved evidence reports `pass`. The latest canonical gate evidence preserved in this source records 439 of 439 passing core tests, a copied-production lifecycle stop at the parent timeout/cleanup boundary, and source retirement, so `releaseReady: false` remains the source-visible result. Revision 31 corrects process scaling and attribution; candidate-addressed external evidence must establish every later verification and release outcome.

## Contract Tests

- Exact package expectation is required for create, restore, inspect, and record.
- Session normalization, source retention, serialization, and independent handoff arrival order are deterministic.
- Unknown, stale, duplicate, malformed, or substituted handoffs fail closed.
- Verified non-`pass` outcomes remain explicit and block dependency readiness.
- Dependency-eligible work is complete, manifest-resolved, dependency-safe, and deterministic.
- Prior immutable session values never change after an operation.

## Lifecycle Tests

- Initial independent wave.
- Partial wave completion.
- Complete verified fan-in.
- Missing dependency.
- Valid `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, and `learn` routing.
- Reinspection after JSON round trip.
- Complete-roster integration readiness through the virtual all-sinks closure.

## Boundary Tests

- No provider, model, prompt, executor, credential, grant, scheduler, workspace, process, or merge field enters the session contract.
- Core performs no filesystem, network, process, Git, agent-launch, persistence, merge, or memory effect.
- Host responsibilities remain explicit in public documentation and examples.

## Integration Tests

- A real V11 package is created as a session, serialized, restored, inspected, advanced with exact raw handoffs, and reaches complete-roster integration readiness.
- The installed package exposes the V12 types and operations to a clean TypeScript consumer.
- The IDE kickoff can be followed from one natural-language goal without hidden state.

## Adversarial And Limit Tests

- `npm.cmd run verify`
- Template checker and checker regression matrix.
- V11 and V12 dogfood replay.
- Independent product/API, correctness/lifecycle, and security/trace review.

## Current Evidence

- R6 complete-package handoff gate: two of two exact `pass`; `phaseReady: true`.
- R7 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- R8 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- Canonical evidence retention: legacy and candidate-addressed gate logs are versionable and explicitly binary; unrelated logs remain ignored; receipts retain normal text policy; wrapper/R2 paths are byte-equivalent.
- Current post-R10 pre-freeze gate: format, lint, typecheck, the full test suite, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification pass in 158.8 seconds.
- V11 revision-35 primary package, Audit B, receipt, binder, semantic handoff, and cross-package authorization: `pass`.
- Commit `4c7695519d274a8e3d939061dfa184b99dc8ac45` canonical receipt: `pass`; downstream R2 canonical-source preparation: fail closed before compilation.
- Commit `4ad12367cc0b36ea460ceabc48e5a41ca662e3df` canonical receipt: `pass`; lifecycle review: `pass`; product and security review: `fix`; source retired.
- R9 focused committed-source gate tests: 4 of 4 `pass`; exact specialist handoff: 4,584 bytes at `sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956`; `phaseReady: true`.
- R10 lifecycle tests: 5 of 5 `pass`; independent full release-gate tests: 4 of 4 `pass`; exact accepted handoff: 5,595 bytes at `sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543`; `phaseReady: true`.
- The Git-context source's exact canonical receipt: `fail`; 392 of 397 tests pass, five Git-context tests fail, source and repository integrity checks pass, and the source is retired.
- The next three exact receipts: `fail`; each source is retired with immutable source-addressed receipts and raw logs after exposing a distinct exact-source boundary defect.
- Commit `0482bf3783e085c6cef3111d63003daa5197eca8` exact canonical receipt: `pass`; 2,046 files and 57,258,623 bytes retain identical before/after source identity, disposable Git and cleanup checks pass, and receipt/stdout/stderr remain source-addressed.
- That source's fresh R2 compilation: `fail` closed before rendering or launch; 261 context sources and 261 read scopes exceed the unchanged 256-entry ceiling.
- Revision 15 exact package gate: one of one final handoff `pass`; `phaseReady: true`; compilation/package `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f` / `sha256:627414164e9176f4ead047a4a857f23f81efc868643dd8aaaa55377186f162c8`.
- Revision 15 integration verification: exact 261-to-167 regression `pass`; all 10 release-gate tests `pass`; canonical repository gate, checker mutation matrix, and standalone V11 evidence replay `pass`.
- Commit `447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84` exact canonical receipt: `pass`; complete R2 roster: `pass` / `fix` / `pass`; authenticated `releaseReady: false`; source permanently retired.
- Revision 16 exact package gate: one of one accepted attempt-2 handoff `pass`; `integrationAccepted: true`; `phaseReady: true`; focused release-review tests 8 of 8 `pass`; template, format, lint, and diff gates `pass`.
- Post-Revision-16 independent pre-freeze verification: canonical `npm.cmd run verify` `pass` in 350.4 seconds; checker mutation matrix `pass` in 316.7 seconds.
- The next committed source passed its exact gate but is retired after package-bound security review found the R2 runtime imported ignored repository-live build output before candidate authentication.
- Revision 22 exact package gate: one of one 21,143-byte handoff `pass`; `phaseReady: true`; complete 34-test copied-production lifecycle and negative matrix `pass`; independent 37-context package-bound review `pass`.
- V11 Revision 40 Candidate A, Audit B, external receipt, exact binder, 12,843-byte semantic audit, cross-package authorization, and complete evidence replay: `pass`.
- Post-Revision-22 checker mutation matrix: `pass` in 335 seconds; full pre-freeze `npm.cmd run verify`: `pass` in 1,888.7 seconds.
- Latest retired exact gate: 423 of 424 tests pass; immutable source and Git checks pass; checkout-relative lifecycle cache lookup fails; candidate retired.
- Revision 24 focused cache and fixture-boundary regressions: `pass`; corrected copied-production lifecycle: `pass` in 1,853.7 seconds.
- Revision 24 final independent review compilation/package: `sha256:6025d006482b13d40bdfc04f6ab2d7a16628f6040ef929cbe79b18707990ff90` / `sha256:deffe7fcb085e2840f94dba081e653800adf16528f062d7208a3d5072d18c81b`; exact 18,311-byte handoff: `pass`; `phaseReady: true`; integration accepted.
- Post-Revision-24 complete `npm.cmd run verify`: `pass` in 2,025.2 seconds.
- Revision 29 exact-checkpoint `npm.cmd run verify`: `pass` in 2,623.4 seconds with 439/439 core tests and the copied-production lifecycle; final package-bound review: `pass`.
- Commit `e61932f2d5067559332790b370f1bf510d0064fc` exact canonical receipt: `fail`; source/Git/materialization remain exact, 437/439 core tests pass, and two release-state anti-drift assertions reject live numbered-candidate text.
- Revision 30 causal anti-drift tests: 2/2 `pass`; complete release-review file: 26/26 `pass` in 94.1 seconds; release-gate file with declared workspace write permission: 16/16 `pass` in 420.8 seconds. The preceding restricted-host attempt passed 13/16 and failed only three owned-scratch `EPERM` operations.
- Commit `74397e30be5d185a14ecef1a838aa7767ffdf60f` exact canonical receipt: `fail`; source/Git/materialization and outer cleanup remain exact, 439/439 core tests pass, and the copied lifecycle stops at an attribution-defective parent timeout/cleanup assertion.
- Revision 31 causal regressions: 2/2 `pass`; complete release-review file: 28/28 `pass` in 73.1 seconds; real-tree binary batch: 2,205 unique objects and 69,562,019 blob bytes in 817 ms.
- The first full lifecycle invocation used committed source with uncommitted expected identities and is invalid evidence; it reported the mismatch after 2,383.9 seconds and is not a Revision 31 behavior result.
- Committed-identity preflight ordering regression: `pass`; the exact invalid state rejects before materialization in 215.1 ms with both identities.
- Commit `602ddce2a9056e3f920fcb3e004132bde3f4f549` valid copied lifecycle: `fail` after 551.0 seconds at a generic disposable-Git tracked-state assertion; source worktree remains clean and diagnosis is active.
- Failure-only changed-path parser plus complete release-review suite: 29/29 `pass` in 94.4 seconds; committed path-attributing reproduction: pending.
- Broader release-gate, valid committed-source copied lifecycle, package-bound review, aggregate, fresh successor gate, R2, hosted CI, and owner merge decision: pending.

## Revision 31 Long-Path Correction Gate

- Confirmed reproduction: exact production diff fails with Filename too long and false combined paths when a disposable candidate worktree reaches 489 characters.
- Counterfactual: the same worktree, index, and candidate become clean after core.longpaths=true.
- Causal regression: full candidate materialization crosses 260 characters, the constructor records core.longpaths=true, and the exact production diff returns clean.
- Focused result: pass in 189.8 seconds.
- Production-identity binding: pass.
- Complete source suites: release-review 29/29 pass in 79.3 seconds; release-gate 16/16 pass in 445.1 seconds; no new scratch context remains.
- Pending: committed copied lifecycle, aggregate, package-bound independent review, exact successor gate, fresh R2, and hosted CI.

## Revision 31 Stable Runtime Identity Gate

- Reproduction: committed checkpoint 8f1c4f1 crosses the old Git stop, then fails standalone approval after 1,192.8 seconds because fresh-parent package identities differ.
- Causal proof: changing only TEMP, TMP, and TMPDIR changes the old stable policy; those are the only differing fields.
- Counterfactual: two distinct invocation temp roots now produce one stable policy, raw paths are absent, and changing LANG still changes stable identity.
- Focused result: 3/3 pass.
- Complete source suites: release-review 30/30 pass in 80.3 seconds; release-gate 16/16 pass in 454.5 seconds; cleanup remains exact.
- Pending: newly committed copied lifecycle, aggregate, package-bound independent review, exact successor gate, fresh R2, and hosted CI.
