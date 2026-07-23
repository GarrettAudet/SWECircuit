# Test Plan

## Status

Package identity verification and handoff schema verification authenticate preserved artifacts; neither alone establishes workflow success, phase readiness, or release readiness. Revision 1 has incomplete fan-in. Revisions 2 and 3 retain `split` workflow outcomes. Later correction phases retain their recorded `pass` routes where preserved evidence reports `pass`. Revision 39 passed its exact gate and then routed `diagnose` during fresh R2 preparation. Working Revision 40 corrects package-lineage classification and passes 2/2 focused plus 50/50 concurrent release checks. `releaseReady: false` remains until broad verification, an immutable successor, one exact canonical gate, fresh R2, hosted CI, milestone closeout, and owner merge pass.

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
- Commit `602ddce2a9056e3f920fcb3e004132bde3f4f549` valid copied lifecycle: `fail` after 551.0 seconds at a generic disposable-Git tracked-state assertion; source worktree remained clean and the later RCA confirms the Windows long-path cause.
- Failure-only changed-path parser plus complete release-review suite: 29/29 `pass` in 94.4 seconds; diagnostic checkpoint 101361e attributes the committed stop to Windows long paths.
- Exact corrected checkpoint 8768c25 copied lifecycle: 1/1 `pass` in 1,752.7 seconds; compile, approve, verify, closed negative routes, source reauthorization, source integrity, and owned cleanup complete.
- Revision 39 exact gate: commit `a9ee60d31cf302c91f6600ac977d0b62cb153f3f`, 447/447 core, copied lifecycle, package, and offline consumer `pass`; fresh R2 preparation routes `diagnose` before compilation. Revision 40 focused lineage/identity checks pass 2/2 and concurrent release suites pass 50/50.

## Revision 31 Long-Path Correction Gate

- Confirmed reproduction: exact production diff fails with Filename too long and false combined paths when a disposable candidate worktree reaches 489 characters.
- Counterfactual: the same worktree, index, and candidate become clean after core.longpaths=true.
- Causal regression: full candidate materialization crosses 260 characters, the constructor records core.longpaths=true, and the exact production diff returns clean.
- Focused result: pass in 189.8 seconds.
- Production-identity binding: pass.
- Complete source suites: release-review 29/29 pass in 79.3 seconds; release-gate 16/16 pass in 445.1 seconds; no new scratch context remains.
- Exact corrected committed lifecycle: checkpoint 8768c25 passes 1/1 in 1,752.7 seconds after crossing both prior production stops.
- Exact Revision 35 aggregate: `bcb12fbee15e8a96b5088accb5a397bc0464c7cd`; clean identity before and after; 445/445 core tests, copied lifecycle, package inspection, and offline installed consumer `pass` in 703,092 ms.
- Aggregate receipt: 1,227 bytes at `sha256:e99689f67208109c1470a02f742d324aa288b0fa05978337cdfe60d65f8f3917`; stdout/stderr retain exact decoded byte counts and digests in `independent-review-r35/raw-artifact-bindings.json`.
- Revision 35 package-bound review: compilation/package `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619` / `sha256:3b6b043b065a8acd42bf17652f8772b83035868376aaeb754272f6893b051047`; 51/51 sources authenticated; exact 11,143-byte handoff `sha256:3b90e319eeb14527da11cbf82c569fab7a9267f9934ad4506f478fb891535841`; verified outcome `pass`.

## Revision 31 Stable Runtime Identity Gate

- Reproduction: committed checkpoint 8f1c4f1 crosses the old Git stop, then fails standalone approval after 1,192.8 seconds because fresh-parent package identities differ.
- Causal proof: changing only TEMP, TMP, and TMPDIR changes the old stable policy; those are the only differing fields.
- Counterfactual: two distinct invocation temp roots now produce one stable policy, raw paths are absent, and changing LANG still changes stable identity.
- Focused result: 3/3 pass.
- Complete source suites: release-review 30/30 pass in 80.3 seconds; release-gate 16/16 pass in 454.5 seconds; cleanup remains exact. Aggregate verification, package-bound independent review, an exact successor gate, fresh R2, hosted CI, and owner merge remain pending.
- Exact corrected committed lifecycle: checkpoint 8768c25 passes 1/1 in 1,752.7 seconds with negative routes, reauthorization, and cleanup.

## Revision 32 Batch Coverage Gate

- Exact Revision 31 aggregate: `pass` at `4275ce9eb31e04995f4bb49c599d6d930c9685a7`; immutable package-bound review: verified `fix`.
- Actual parent and verifier-harness loaders: 3-file and 35-file binary/duplicate fixtures `pass`; four Git calls, one batch, zero per-blob calls at each size.
- Actual canonical materializer: the same two fixture sizes and process-count constraints `pass`.
- Batch parser security cases execute at parent, harness, and gate boundaries.
- Complete release-review suite: 31/31 `pass`.
- Complete release-gate suite: 17/17 `pass`.
- Format, lint, and typecheck: `pass`.
- Exact Revision 32 aggregate: 444/445 core tests `pass`; one active review-status routing invariant `fail`; lifecycle and later gates did not run.
- Revision 33 focused requirement: run `live release routing delegates volatile state to candidate-addressed evidence` after the final active-status edit.
- Pending: fresh exact committed aggregate and fresh package-bound independent review.

## Revision 34 V11 Trust Refresh Gate

- Revision 33 aggregate identity: `ff0b76d3e39bc9e7583e5956fe2c89af015630c6`; core 445/445 `pass`; copied lifecycle 1/1 `pass`; V11 source freshness `fail`.
- Context inventory: 57/58 unchanged; only `.gitattributes` refreshed.
- Revision 44 package verification: Candidate A `pass`; Audit B `pass`; non-launching receipt `pass`.
- Binder: exact raw handoff verifies; dependent assessment reports `integrationReady: true`.
- Semantic Audit B: exact closed `PrelaunchAuditHandoff`, outcome `pass`; cross-package authorization binds its raw bytes.
- Approval order: Candidate A is revoked before semantic review and reissued only after authorization.
- Strict `node scripts/run-v11-dogfood.mjs --check-evidence`: `pass`.
- Dedicated `test/v11-dogfood-runner.test.mjs`: 31/31 `pass`.
- Pending: post-edit anti-drift, fresh immutable aggregate, and fresh package-bound independent review.

## Revision 35 Status-Preservation Gate

- Revision 34 aggregate identity: `a40d0d6b636d30b3280c37fa9f5fceb2ab64baa8`; core 444/445 `pass`; one historical-outcome status invariant `fail`; later gates did not run.
- Restored outcomes: Revision 1 incomplete fan-in; Revisions 2 and 3 `split`; later correction phases retain recorded `pass` routes.
- Historical-outcome status invariant: 1/1 `pass`.
- Candidate-addressed live-routing invariant: 1/1 `pass`.
- Combined final post-edit gate: 2/2 `pass`.
- Restricted timeout fallback regression: 5/5 `pass`; direct fallback accepted and descendant absent.
- Native Windows timeout route: focused test `pass`; five probes accept primary `taskkill` with no fallback and no descendant.
- Complete release-review file after the causal correction: 31/31 `pass`.
- Follow-up: the exact aggregate and package-bound independent review pass below.

## Revision 35 Immutable Aggregate And Package-Bound Review Gate

- Exact source: `bcb12fbee15e8a96b5088accb5a397bc0464c7cd`.
- Aggregate: source clean and identity-stable before/after; 445/445 core tests; copied lifecycle 1/1; package inspection and offline installed consumer `pass`; duration 703,092 ms.
- Aggregate receipt: 1,227 bytes, `sha256:e99689f67208109c1470a02f742d324aa288b0fa05978337cdfe60d65f8f3917`.
- Independent package: compilation/package `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619` / `sha256:3b6b043b065a8acd42bf17652f8772b83035868376aaeb754272f6893b051047`; package verification passes before launch approval.
- Source authentication: 51/51 exact context sources verified twice.
- Exact handoff: 11,143 bytes, raw `sha256:3b90e319eeb14527da11cbf82c569fab7a9267f9934ad4506f478fb891535841`; kernel handoff verification passes; outcome `pass`.
- Archive: `evidence/implementation/independent-review-r35/`; Base64 artifacts decode to the exact bound raw bytes.
- Release result: `releaseReady: false`; successor gate, fresh R2, hosted CI, milestone closeout, and owner merge remain.

## Revision 36 Exact Gate And Revision 37 Causal Gate

- Revision 36 exact source/tree and cleanup remain valid; core stopped at 443/445 on two inherited-index fixture failures.
- Revision 37 causal tests passed 3/3, concurrent suites passed 49/49, and exact aggregate passed 446/446 plus lifecycle, package, and consumer gates.
- Revision 37 independent package: 57/57 sources authenticated; exact 10,105-byte handoff verified `fix`; successor freeze and release approval false.

## Revision 38 Git-Environment Closure Gate

- Pure closed-policy and fresh hostile-process checks: 2/2 `pass`.
- Closure plus both formerly contended constant-process tests: 4/4 `pass`.
- Complete authorized concurrent release-gate/release-review files: 50/50 `pass`.
- Restricted attempt: 46/50 with four `.local` temp-root `EPERM` setup failures; not acceptance evidence.
- Complete mutable-source `npm.cmd run verify`: 447/447 core tests, copied lifecycle, V10/V11/V12 dogfood, 148-file package inspection, and offline installed consumer `pass` in 679.3 seconds.
- Checker mutation matrix and strict V11 two-package replay: `pass`.
- Raw verifier stdout/stderr are preserved as canonical Base64 and bound by `evidence/implementation/release-correction-r38/attempts/npm-verify-pass-receipt.json`.
- Exact Revision 38 aggregate: commit `1f2e89e30a46c1584cb7b979fc4c8a63326f7ff0`, tree `572a5dc3406ffff6453f7c11df3592d5bb971a45`, clean stable identity, 447/447 core, copied lifecycle 1/1, package and offline consumer `pass` in 700,991 ms.
- Exact package review: 69/69 sources and 4,404,088 bytes authenticated twice; 9,592-byte handoff `sha256:db522b50d6c0e58b00ac7b4c923d8af28378c4985967960058eb2659acf70661`; verified `pass`, `integrationReady: true`.
- Pending: commit the evidence-only Revision 39 successor and run its canonical gate exactly once.

## Revision 39 Gate And Revision 40 Lineage Gate

- Preserve Revision 39 receipt/stdout/stderr at its candidate-addressed canonical-gate path; never rerun that source.
- Require complete package-envelope, approval, and handoff-verification markers before a correction root enters lineage.
- Reject any partial marker set and ignore diagnostic-only numbered roots.
- Require the exact prior tree to resolve to 22 contiguous package-backed revisions.
- Require focused checks, 50/50 concurrent release tests, broad repository verification, a distinct committed source, one exact gate, fresh R2, hosted CI, closeout, and merge.
