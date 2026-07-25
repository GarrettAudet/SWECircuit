# Test Plan

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision 60 commit `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3` passed local and hosted verification, then its one-shot canonical gate failed after 461 core tests because the copied lifecycle discarded the enclosing candidate Git authority; the consumed source is permanently retired. Revision 61 closes that cause, binds a fresh-process regression into lifecycle and security review, and passes focused, broad pre-freeze, checker, dogfood, package, consumer, and independent final-delta gates. No release approval exists until one immutable successor passes exact lifecycle, full verification, hosted CI, one canonical gate, fresh R2, milestone closeout, and owner merge; `releaseReady: false`.

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

- Revision 60 commit `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3`: exact local verification and all seven hosted jobs `pass`; one-shot canonical receipt `fail` after 461 core tests; source retired and never rerun.
- Revision 61 causal runtime regression: 1/1 `pass`; release pair: 65/65 `pass`; complete pre-closure core: 462/462 `pass`.
- Revision 61 format, lint, typecheck, build, template checker, complete checker mutation matrix, V10/V11/V12 dogfood, package inspection, and installed consumer: `pass`.
- Post-closure live identities and lifecycle scheduling: 2/2 `pass`; independent final-delta review: `pass`.
- Exact committed lifecycle, full verifier, exact-candidate topology, hosted matrix, canonical gate, fresh R2, and merge remain independent gates; `releaseReady: false`.

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

## Revision 41 Authority And Review-Coverage Gate

- Hostile Node, npm, Git, shell, and secret environment inputs are excluded.
- The effective environment is exact, sorted, and receipt-bound.
- Private npm user/global configuration is empty, unlinked, and operation-owned.
- Node, npm launcher/CLI, Git, shell, and TypeScript identities are stable before and after execution.
- The complete host `node_modules` closure is stable before and after execution.
- R2 requires receipt v1alpha2 and rejects missing or altered execution authority.
- All six transitive security-causal sources appear exactly once with explicit reviewer ownership.
- Historical R2 context deduplication remains valid independently of current-source expansion.
- Complete release-specific suites: 53/53 `pass`.
- Pending: frozen-commit `npm.cmd run verify`, one-shot canonical gate, fresh three-domain R2, hosted CI, milestone closeout, and merge.

## Revision 58 Hosted Repository-Bootstrap Gate

- Revision 57 exact copied lifecycle and full local verifier: `pass`; hosted run `30136535813`: seven of seven jobs `fail`; source retired without gate consumption.
- A depth-one clone contains one commit and cannot resolve approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be`.
- Both hosted checkouts enable Windows long paths before checkout and fetch complete history.
- The CI contract requires every checkout to carry that bootstrap, exactly two checkout steps, one top-level `contents: read` permission block, no write scope, and the tracked npm-cache declaration.
- Focused and negative mutation regressions, 63/63 release-specific tests, 460/460 core tests, checker matrix, template checker, format, lint, and typecheck pass.
- Independent Attempt 3 rereview: `pass` with no findings; freeze and commit, exact copied lifecycle, full verifier, hosted matrix, one-shot gate, fresh R2, closeout, and merge remain.

## Revision 59 Context-And-Evidence Gate

- Revision 58 exact copied lifecycle: 2/2 `pass`; exact full verifier: `fail` at V11 context authentication; hosted run `30139492037`: seven of seven jobs `fail`; source retired without gate consumption.
- `README.md` and `CONTRIBUTING.md` must remain byte-identical to the approved V11 goal-contract identities; `WINDOWS.md` owns the checkout prerequisite.
- The hosted workflow must contain exactly one complete authenticated tracked-whitespace step with the closed `.png`, `.jpg`, `.jpeg`, `.gif`, `.pdf`, `.patch`, and `.log` exemption set.
- Removing or substituting an exemption, widening the set, or adding a normal-source control-flow bypass must fail the focused regression.
- Focused regression, 63/63 release tests, 460/460 core tests, V10/V11/V12 dogfood, checker matrix, template checker, format, lint, typecheck, package inspection, and consumer verification: `pass`.
- Independent Attempt 1: `fix`; all findings corrected.
- Independent Attempt 2: `fix`; job and enumeration bypasses corrected.
- Independent Attempt 3: `fix`; step-level nonblocking bypass corrected.
- Independent Attempt 4: `fix`; kernel-job bypass corrected through whole-workflow identity.
- Independent Attempt 5: `pass` with no blocking findings.
- Pending: exact freeze and commit, copied lifecycle, full verifier, hosted matrix, one-shot gate, fresh three-domain R2, closeout, and merge.
