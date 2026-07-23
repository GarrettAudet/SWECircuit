# Review

## Status

V12 is not merge-ready. Revision 44 still passes the complete V11 trust replay, and exact Revision 35 aggregate/package-bound review evidence remains immutable. Exact Revision 36 gate `ee297d8e11466763acc9b4c630de445eb57b00c3` remains an immutable 443/445 failure. Exact Revision 37 `148f546cba4c3c9ceecd2bbca07d47fe94878afa` passed its aggregate with 446/446 core tests, copied lifecycle, package inspection, and offline consumer verification, but a separately compiled reviewer authenticated 57/57 sources and returned a kernel-verified `fix`: inherited `GIT_CONFIG_PARAMETERS` and other `GIT_*` authority channels still reached fixture processes. Revision 38 removes every inherited `GIT_*` key case-insensitively, reapplies only three explicit local controls, and passes 2/2 causal, 4/4 combined contention, 50/50 concurrent release suites, the complete mutable-source `npm.cmd run verify` (447/447 core plus copied lifecycle, dogfood, package, and offline consumer gates), the checker matrix, and strict V11 replay. This is mutable-source evidence only; a committed identity, fresh aggregate/package review, a distinct successor gate, fresh R2, hosted CI, milestone closeout, and owner merge remain.

## Scope

Review the exact V12 goal, architecture, public contract, implementation, tests, IDE workflow, and capability claims against AC1-AC9.

## Required Perspectives

- Product and IDE usability.
- Lifecycle, correctness, and recovery semantics.
- Authority, security, privacy, and host portability.
- Public API and installed-consumer compatibility.

## Attempt 1 Candidate

- Candidate commit: `d914b273ba619e3cfa42206c8d9f136be73075e3`.
- Compilation: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3`.
- Package: `sha256:7a809141af324cdea7028fb07ee6ca6cb79daccfbdf319e2fd8b2c1346a007ee`.
- Exact search selected three disjoint reviewers with projected makespan 9 versus serial 25 and zero conflicts.

## Findings

- Product/API/IDE: the canonical dogfood uses a synthetic package instead of an actual V12 implementation package, omits required AC8 friction measurements, and this review record was stale.
- Lifecycle/correctness: accepted evidence orders `criterionId` before the requirement identity, and the promised 16-agent aggregate resource proof is absent.
- Security/trace/authority: run validation lazily reads the schema from the filesystem, mutable release input was not snapshotted, primary raw verification evidence was omitted from reviewer context, and no candidate-bound canonical-gate receipt exists.

## Evidence

All three exact raw handoffs verify against the approved package. Their raw SHA-256 digests are `sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26`, `sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84`, and `sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7`. The complete-roster verification is preserved under `evidence/release-review/` with `releaseReady: false`.

## Correction Readiness

- Revision 6 binds compilation/package `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998` / `sha256:5acb302e44bb08f8626fb3773ba27acf5af5ae3f3d09d95beea1f2538a46826a`; both exact handoffs verify `pass`.
- Revision 7 binds compilation/package `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920` / `sha256:df3ed49a4d38fdbac275b82036dc4354d6b76bac3b2fa97dfbd385c3fdad85b8`; its exact handoff verifies `pass`.
- Revision 8 binds compilation/package `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef` / `sha256:d655468c5e37171d5ef83af2299bf08291029e9c08751ef056c2d655f24cfb1d`; its exact handoff verifies `pass`.
- The current full pre-freeze gate passes format, lint, typecheck, all 388 tests, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification.
- V11 trust-root revision 35 passes exact package reconstruction, binder verification, independent semantic audit, and cross-package authorization.
- The R2 harness resolves the current semantic audit from launch authorization and binds the complete revision-1 through revision-8 correction lineage.
- Candidate 2 `4c7695519d274a8e3d939061dfa184b99dc8ac45` has an exact passing gate receipt but no R2 package or reviewer outcome. Canonical authorization serialization is fixed; Candidate 3 is not yet frozen.

## Candidate 3 Review

- Candidate: `4ad12367cc0b36ea460ceabc48e5a41ca662e3df`; canonical gate: `pass`.
- Product/API/IDE: `fix` because the gate could consume untracked verification inputs.
- Security/trace/authority: `fix` because six causal source files were absent from the approved context.
- Lifecycle/correctness: `pass`; that scoped result cannot override either blocking route.
- Candidate 3 is permanently retired. Its exact receipt, available raw handoff, package identities, and route are preserved under `evidence/release-review-r2/`.

## Corrections 9-10

- R9 binds the canonical gate to a materialized exact Git tree, excludes uncommitted source, closes all six security sources, and passes four focused regressions. Compilation/package: `sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d` / `sha256:f9e337812c8ee4ef85431894855279c5a113ccfb0c0a9b4402b4e5137d519400`.
- R10 places every new R2 artifact under `runs/{candidate}/`, reads reviewer sources from exact candidate Git blobs, and verifies a contiguous correction lineage without a hardcoded terminal revision. Compilation/package: `sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400` / `sha256:985a85fe77b507088cde4df3d0352c21b142fe09541cf4d5295a5869b28cf075`.
- Main-agent verification passes exact syntax, formatter/linter checks, 5 of 5 R10 lifecycle tests, 4 of 4 release-gate tests, the template checker, and the package-bound R10 handoff gate.

## Candidate 5 And Correction 12

- Candidate 5 `62e51278904b3036971f6fcd40577313f1168e2a` is permanently retired. Its exact gate passed all 399 tests, then exposed checkout-dependent V11 evidence bytes and candidate-local runtime state.
- Revision 12's two specialist handoffs verify `pass` against compilation/package `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48` / `sha256:26bc2190b4acd7d4fe253228eabad5862d0819717b75b7b7f20e6264dfc4d4ce`.
- V11 Revision 37 independently reconstructs and verifies Candidate A and Audit B, including the external receipt, dependency handoff, semantic audit, and cross-package authorization. Full V11 evidence replay passes.

## Candidate 6 And Correction 13

- Candidate 6 `0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7` is permanently retired. Its exact gate reached the final installed-consumer compile after all earlier stages passed, then exposed a missing external TypeScript toolchain supply.
- Revision 13's exact handoff verifies `pass` against compilation/package `sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555` / `sha256:b12698368ee2c73c6d012c1881275ec3bc225107067d05f9614a313d4358da80`.
- Focused verification passes 9/9 release-gate regressions and the offline installed-consumer gate. Candidate source remains dependency-free and exact.
- Integration applied deterministic Biome formatting to all three Revision 13 source files. All 9 focused regressions, the installed consumer, format, lint, typecheck, all 405 kernel tests, 31 V11 trust tests, and the complete checker mutation matrix pass.
- The aggregate pre-freeze `npm.cmd run verify` passes in 235.7 seconds, including the public example, V10/V11/V12 dogfood, package inspection, and offline installed consumer.
- V11 Revision 39 independently reconstructs Candidate A and Audit B, verifies the external receipt and binder, accepts a distinct semantic `pass`, binds the cross-package authorization, and passes complete evidence replay.

## Candidate 7 And Correction 14

- Candidate 7 `f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa` is permanently retired. Exact source, Git context, live state, and cleanup passed; the canonical suite completed 404/405 tests before the host-supply unit test requested a candidate-local development default.
- The receipt is 2,294 bytes at `sha256:8dfc1033ce467727e8603a11a417b57164f1569a463c2b12c7b1d1efe74de880`; raw stdout/stderr are preserved at `sha256:13cc6b063a0d0283f5ece6053a822cf1af5cb9553b5c474e83e1126120ea2830` / `sha256:f1c19d541b010155bd5ed0af4babbe81534106ea1cf3258c758efc36113c95d0`.
- Revision 14's exact search selected the one-agent serial baseline for one atomic read-only verification unit. Compilation/package are `sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861` / `sha256:4e267e322fda4d51ba2babb25c50c6b9acb800776a7426870eefc4327092510d`.
- Its 4,930-byte raw handoff verifies `pass` at `sha256:b678fcf1c85ec59304893b428fef0b09210d5b3eac45a51b49e3075a5003b064`; the complete package gate is `phaseReady: true`.
- Production still resolves the host toolchain with the original two-argument call. The injected test default follows the same absolute, regular-file, symlink, realpath, and outside-candidate checks; focused behavior and Biome checks pass.
- V11 Revision 39 complete evidence replay remains `pass`; the corrected files do not invalidate its bound source package.

## Candidate 8 And Correction 15

- Candidate 8 `0482bf3783e085c6cef3111d63003daa5197eca8` passed its one-shot gate. Receipt/stdout/stderr are `sha256:aa93e516387afc029ff21ba5d8e4f31cc0787e15ef181c38b1714acdf7c2c76e` / `sha256:0dc432aeeed8d6f6a3e9352800dbd6a9d5b40d20eeb69a3ed16dcfe9bdb8170c` / `sha256:2e53f9074811c48085665956206c5d73525bdba26d25c07cb805d31df9b0c948`.
- Fresh R2 preparation preserved 261 sources, but compilation returned two `SC4308` diagnostics at the unchanged 256-entry context/read ceiling. No roster was rendered, approved, or launched.
- Revision 15 excludes only correction navigation duplication and preserves the authoritative primary chain. Its regression reduces the exact failed set by 94 paths to a 167-context request and compiles all three review work units.
- Compilation/package are `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f` / `sha256:627414164e9176f4ead047a4a857f23f81efc868643dd8aaaa55377186f162c8`; the verified final handoff is `sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb` and complete fan-in is ready.
- Candidate 8 is permanently retired. Candidate 9 `447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84` subsequently passed its one-shot exact gate, returned `pass` / `fix` / `pass` from its complete R2 roster, and is also permanently retired with `releaseReady: false`.

## Candidate 8 Outcome

`fix` for Candidate 8's R2 compilation route, satisfied by Revision 15. Candidate 9 later passed its single exact canonical gate, but its complete three-reviewer R2 package returned `pass` / `fix` / `pass`, so it is retired and release remains stopped. A successor source must pass one exact canonical gate and a newly compiled, approved, complete R2 roster before hosted CI or owner merge review.

## Candidate 9 Review And Revision 16

- Candidate 9's exact gate passed 406 of 406 tests against unchanged source identity. The complete owner-approved R2 roster verified `pass` / `fix` / `pass`; `releaseReady: false` retired the source.
- The sole blocking finding was contradictory mutable release-stage prose and ambiguous package-gate language. Product/API/IDE returned `fix`; lifecycle and security returned `pass`.
- Revision 16's first package-valid `pass` was rejected by integration review because live routing sections outside `## Status` remained stale. Attempt 2 corrected those sections and expanded the regression without recompilation or authority expansion.
- Accepted attempt 2 is bound to compilation/package `sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044` / `sha256:20437ba56376d4b39f459043bac0940e8ded2e298b48de0cd16d437a95c96db6`; raw handoff `sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9`; `integrationAccepted: true`; `phaseReady: true`.

## Retired Successor And Revision 31

The one-shot gate for `74397e30be5d185a14ecef1a838aa7767ffdf60f` preserved 3,477 files, 105,198,478 bytes, source digest `sha256:90097d36f74019e8004f3d2245d368bc4050cfa042e8a1ea2b34228586e9d1e4`, exact materialization, candidate Git state, and outer cleanup. The core suite passed 439 of 439. The copied-production lifecycle then stopped during the primary verify parent, but its shared-global-temp assertion masked the process timeout/signal classification.

Revision 31 replaces per-file Git object processes with a strictly parsed binary batch, scopes each copied parent to one test-owned temp namespace, terminates the complete process tree at timeout, orders process classification before cleanup assertions, and surfaces production cleanup failures. The new causal regressions and all 28 release-review tests pass.

## Revision 31 Pre-Aggregate Outcome

Revision 31's focused evidence is `pass`, but it is not release approval. The latest gate evidence preserved in source remains a retired failure with exact core success and an attribution-defective lifecycle stop. Candidate-addressed external evidence must establish the correction's broader release-gate and copied-lifecycle results, an exact successor gate, fresh all-pass R2 fan-in, hosted CI, and owner merge review.

The first post-correction full-lifecycle invocation is classified as invalid mixed-identity evidence: committed `HEAD` supplied the old executed parent while the working tree supplied the new expected identity. A new committed-identity preflight rejects that state before materialization; the full Revision 31 lifecycle still requires a committed checkpoint.

## Current Outcome

Revision 37 is immutable and retired from release use after its exact package-bound reviewer returned `fix`. Revision 38 is `pass` at causal and concurrent release-harness verification and `pending` at broad repository verification.

Candidate-addressed external evidence remains the only authority for volatile release state. `releaseReady: false` remains in force; Revision 38 must pass broad gates, an immutable aggregate, and a newly compiled package-bound review before a distinct successor can receive one exact gate, fresh R2, hosted CI, milestone closeout, and owner merge.

## Revision 34 Trust-Refresh Outcome

The exact Revision 33 aggregate receipt and diagnosis are preserved under `evidence/implementation/release-correction-r34/`. Revision 44's 31-test source-freshness and authorization suite passes, and its complete evidence replay returns `pass`. No V12 runtime or public-contract code changed. Candidate-addressed external evidence must now establish a fresh immutable aggregate and package-bound independent review before any successor can be frozen.

## Revision 35 Status-Preservation Outcome

The exact Revision 34 aggregate receipt, historical-outcome correction, and scoped-timeout diagnosis are preserved under `evidence/implementation/release-correction-r35/`. Both active-status invariants pass after restoring the immutable historical outcomes. Restricted and native timeout paths plus the complete 31/31 release-review file pass after deriving top-level acceptance from primary or explicit fallback acceptance. The subsequent aggregate and package-bound independent review establish the required follow-up evidence below.

## Revision 35 Aggregate And Independent Review Outcome

Exact source `bcb12fbee15e8a96b5088accb5a397bc0464c7cd` passes the complete aggregate with stable identity and clean state. A separately compiled read-only reviewer authenticates all 51 declared sources twice, confirms the timeout correction and three constant-process Git blob boundaries, finds no product API change, and reports no high or medium blocker.

The exact 11,143-byte `pass` handoff verifies against compilation/package `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619` / `sha256:3b6b043b065a8acd42bf17652f8772b83035868376aaeb754272f6893b051047`. Integration accepts the evidence freeze only; `releaseApproved: false` remains. The exact successor gate, fresh R2, hosted CI, milestone closeout, and owner merge remain independent requirements.

## Revision 36 Gate Failure And Revision 37 Correction Outcome

The Revision 36 one-shot gate is a valid immutable `fail`: exact source, materialization, disposable Git state, and cleanup all verify. Both failed tests used the same fixture helper from parallel files and were redirected by inherited candidate Git variables.

Revision 37 removed the variables that caused the shared-index failure without serializing tests or retrying locks. Its causal tests passed 3/3, concurrent suites passed 49/49, and exact aggregate passed 446/446 plus lifecycle, package, and consumer gates. The package-bound reviewer then proved the denylist remained bypassable through `GIT_CONFIG_PARAMETERS`, quarantine, namespace, ref, and future `GIT_*` channels. Its exact 10,105-byte handoff verifies `fix`; successor freeze and release approval remain false.

## Revision 38 Closed Git-Environment Outcome

Revision 38 replaces the partial denylist with a closed case-insensitive policy, reapplies only `GIT_CONFIG_GLOBAL`, `GIT_CONFIG_NOSYSTEM`, and `GIT_TERMINAL_PROMPT`, and preserves unrelated runtime supply. Git operations and an observable child share the same spawn path. A fresh hostile process observes only those keys and completes two real fixture commits.

Causal closure passes 2/2, the closure plus formerly contended batch tests pass 4/4, and the complete concurrent release-gate/release-review files pass 50/50. The first broad attempt's four `EPERM` setup failures are preserved separately; the authorized identical-source rerun passed. This is correction verification, not release approval.
