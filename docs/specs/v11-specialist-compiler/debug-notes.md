# V11 Specialist Compiler Debug Notes

## Status

Revision 6 passed candidate preparation, product/API, algorithm/lifecycle, security/trace, and release verification against one digest pair. Attempt 5 remains `FIX` after post-integration replay, and release-host attempts 6A/6B remain `FIX`; no implementation correction remains against revision 6.

## Current Failure

None for the revision-6 technical candidate. Attempts 1-4, attempt 5's replay failure, and release-host attempts 6A/6B remain below as source-preserving diagnosis and correction evidence. Post-integration reconstruction, branch preparation, and owner approval are release gates, not completed evidence. The four earlier architecture failures remain separately preserved in `../v11-orchestration-planner/architecture-review-round-4.md`.

## Reproduction

- Compile the attempt-1 GoalContract and inspect the portable package: canonical assumptions and unresolved decisions are absent, and the launch surface does not expose the search claim or first decisive selection reason.
- Compile a context source with locator `path:../outside.txt`: attempt 1 accepts the leading parent segment.
- Rewrite compilation, payloads, manifest, and the package envelope together: attempt 1 has no externally trusted package-root digest or verifier that can reject the coordinated rewrite.
- Inspect the security specialist blueprint: direct compiler and renderer sources are present, but their security-sensitive helper dependencies are not in the exact context bundle.

## Stable Evidence

- Exact failed architecture candidate: `d486b7f49724651cc12a115ee483e70d67e62bbb`.
- Evidence closeout and split checkpoint: `6da0376`.
- Correction source: `../v11-orchestration-planner/revision-5-correction-design.md`.
- Attempt-1 compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`.
- Product/API review: `evidence/dogfood/handoffs/product-api-review-attempt-1.md`.
- Security/trace review: `evidence/dogfood/handoffs/security-trace-review-attempt-1.md`.
- Algorithm/lifecycle PASS: `evidence/dogfood/handoffs/algorithm-lifecycle-review-pass.md`.
- Release-gate PASS after formatting correction: `evidence/dogfood/handoffs/verify-release-pass.md`.
- Attempt-5 historical pair and ledger: `evidence/dogfood/runs/attempt-5/approval.json` and `evidence/dogfood/handoffs/review-candidate-digests-attempt-5.json`; its final outcome is preserved in `evidence/dogfood/handoffs/post-integration-replay-fix-attempt-5.md`.
- Revision-6 accepted pair and ledger: `evidence/dogfood/approval.json` and `evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json`.
- Revision-6 PASS handoffs: `evidence/dogfood/handoffs/*-pass-attempt-6.md`; host-only `FIX` retries remain in `verify-release-fix-attempt-6a.md` and `verify-release-fix-attempt-6b.md`.

## Failure Classification

- Prior architecture failure: over-coupling; emitted `split`.
- Product/API failure: canonical-contract and portable-launch incompleteness.
- Security failure: repository-path validation, package trust-root, and exact-context closure defects.
- Verification failure: formatting coverage drift; emitted `fix` and passed on rerun.
- Integration replay failure: a mutable live output was also a reviewed input; emitted `FIX` and required revision 6 with an immutable snapshot binding.
- Release-host failures: an overlong Windows TEMP/TMP root and deletion of host-owned offline cache; both emitted `FIX` without candidate or source changes.

## Hypotheses

- The smaller pure compiler can pass review independently of runtime scheduling and restart semantics.
- Golden optimization fixtures will expose whether the fixed objective over- or under-splits.
- A closed assumption/decision contract plus machine-readable search and selection evidence will close the launch-gate ambiguity.
- Segment-aware path validation, a domain-separated package-root digest, a deterministic verifier, and a transitive security context bundle will close the reproduced security failures.

## Experiments

- Added segment-aware repository locator rejection and manually confirmed `path:../outside.txt` returns `SC4301` at `/contextSources/0/locator`.
- Added canonical assumptions and unresolved decisions; blocking unresolved decisions fail compilation.
- Added `search.claim` and `selectionReason` to compilation and integration output.
- Added `compilation.json`, manifest bindings, a package-root digest, and `verifySpecialistPackage` with an externally supplied expected digest pair.
- Correction-package preflight exposed a contract/runtime mismatch: the release verifier and read-only reviewers needed declared process demand, while the release verifier also needed build/cache write scopes. The GoalContract was revised before independent review.
- Attempt 5 regenerated the package, rebound both trusted digests, and passed preparation, all three repeat independent reviews, and the complete pre-integration release gate; post-integration replay then emitted `FIX`.
- Revision 6 bound `context.spec` only to the immutable pre-integration snapshot, regenerated both trusted digests, repeated preparation and every review/release lane, and passed after preserving the two host-only release retries.

## Confirmed Cause

The architecture failure came from coupling pure specialist construction to an effectful runtime control plane. Attempt 1 then exposed three narrower implementation causes: requirements present only in prose rather than canonical input, prefix-only path validation rather than segment validation, and integrity rooted only in mutable package contents rather than an externally retained package digest. The review contract also listed direct sources without closing over security-sensitive helper dependencies.

Attempt 5 exposed a separate integration-design cause: `context.spec` named a live document the integration specialist was authorized to update. Attempts 6A/6B exposed host-fixture causes, not product defects: a nested TEMP/TMP root exhausted Windows path headroom, then cleanup removed host-owned offline cache. Revision 6 fixes the integration alias by making the immutable snapshot the sole input and leaves post-integration reconstruction as an owner gate.

## Dogfood Verification Attempt 1

- Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`.
- Reproduction: the compiled `verify.release-gates` specialist ran `npm.cmd run verify` and stopped at `format:check`.
- Stable evidence: Biome reported unformatted `scripts/run-v10-dogfood.mjs` and `scripts/fixtures/packed-consumer-host.ts`; focused specialist tests had already passed 26/26.
- Failure classification: integration/tooling coverage drift. Adding the V10 and packed-consumer files to `biome.json` surfaced formatting that the prior include set silently skipped.
- Confirmed cause: those files were newly brought under canonical formatting coverage without first normalizing their existing content.
- Fix: formatted only the two reported files. `npm.cmd run format:check` then passed across 71 files.
- Regression: both files remain explicitly included by `biome.json` and the same compiled verification specialist must rerun the complete gate before this attempt is superseded.

## Dogfood Review Attempt 1

- Outcome: algorithm/lifecycle `PASS`; product/API and security/trace `REVISE`.
- Product corrections: assumptions and unresolved decisions are canonical GoalContract fields; launch output exposes the exact search claim and first decisive selection reason; permission kinds use the same closed five-value vocabulary as the schema.
- Security corrections: repository locators reject `.` and `..` path segments; the package includes its canonical compilation and is bound by an externally retained package-root digest; the public verifier deterministically reconstructs and compares the complete package.
- Context correction: the next security blueprint must receive the direct implementation plus every security-sensitive helper needed to audit canonicalization, diagnostics, JSON parsing, paths, permissions, privacy, snapshots, limits, and shared types.
- Supersession gate: do not call the correction complete until a regenerated immutable package passes repeat product/API, algorithm/lifecycle, security/trace, and release-gate specialists.

## Dogfood Review Attempt 2

- Candidate binding: `PASS`; all 25 product, algorithm, and security source byte counts and SHA-256 digests matched.
- Product/API: `PASS`; canonical assumptions/decisions, launch explanation, permission-kind parity, and installed export closure had no actionable finding.
- Algorithm/lifecycle: `PASS`; search claims, scheduler metrics, comparator, selection reason, canonicalization, and limits remained deterministic and honestly bounded.
- Security/trace: `REVISE/FIX`; secret-bearing property keys could leak in diagnostic pointers, the security bundle omitted `common.schema.json`, hostile strings reached allocating byte checks too late, the dogfood runner derived its own approval expectation, and context locators were read before core validation.
- Release verification: `FIX`; `npm.cmd run verify` passed 307/307 tests and the main checker passed, but the checker regression harness exceeded a Windows path boundary while copying full-digest agent contract names.
- Checker root cause: descriptive fixture directory names plus a long temp root and a 155-character evidence-relative path produced a 264-character destination. Compact deterministic fixture IDs and a short temp root restored headroom.
- Checker regression: the complete matrix passed after the fix in 596.4 seconds, including the exact formerly failing ordered-list fence case and all later cases.
- Outcome: remain in `diagnose/fix`; attempt 2 is preserved but cannot satisfy release or security gates.

## Dogfood Review Attempt 3

- Approved candidate: GoalContract revision 3, compilation `sha256:c5ce182ca294a4fe4fbdafba7259763948d605bbe0104c545b9c5358e56ca42d`, package `sha256:a172aa795c1bf6b0dd17898451595718889c194f3c23e7ca5d87f3659ec95e76`.
- Compiler result: exact search evaluated 203 candidates, found 52 eligible, selected six task-shaped specialists at projected makespan 23; the serial baseline projected 40 but was ineligible because it could not satisfy independent evidence ownership.
- Preparation gate: `PASS`; 32/32 authorized sources matched exact byte counts and SHA-256 digests.
- Product/API: `FIX`; the packed consumer self-derived its approval pair, the README lacked a short V11 path and overstated launch, and one exported comparator type lacked consumer coverage.
- Algorithm/lifecycle: `FIX`; six golden outcomes and independent partition counts passed, while AC6 drift and direct fixed-scheduler regression gaps remained.
- Security/trace: `FIX`; prior core findings passed, while the dogfood host could follow an in-root symlink or junction beyond repository authority.
- Release: `FIX`; fail-fast formatting caught one post-lint formatting drift before later gates ran.
- Host routing friction: the integration owner manually copied one opaque contract filename incorrectly; the specialist recovered by work unit. Future launches must resolve contracts from `manifest.agents`, never by hand-copying agent IDs.
- Evidence: `evidence/dogfood/handoffs/*-attempt-3.*`.
- Outcome: apply one bounded correction, increment the goal revision, regenerate both trusted digests, and repeat every immutable-candidate review.
## Dogfood Review Attempt 4

- Approved candidate: GoalContract revision 4, compilation `sha256:899a6f61c5f937e129b3cf9c526976dea4b287374737ce6fee60e93131ae8806`, package `sha256:ff96d42ca388974ead87d11608bb4824a9e75d8671f5e58a3dc42fc2cb944c90`.
- Preparation: `PASS`; the manifest-resolved contract digest and 34/34 bound sources matched.
- Product/API: `PASS`; all four attempt-3 product corrections passed across 12 sources.
- Algorithm/lifecycle: `PASS`; corrected AC6, six goldens, independent partition counts, and direct fixed-scheduler rules passed across 14 sources.
- Security/trace: `FIX`; declared context reads passed containment, but fixed goal/approval/evidence control paths still needed bounded duplicate-aware reads, link-safe writes, and fail-closed non-repository context handling.
- Release: `FIX`; format, lint, 319/319 tests, both dogfoods, and package inspection passed. The installed consumer then exposed TypeScript 7 config discovery when temporary writes were correctly constrained under declared `.local/npm-cache/**` authority.
- Outcome: contain the consumer workspace, add `--ignoreConfig`, close every dogfood control/evidence I/O path, add direct regressions, increment the goal revision, and repeat all reviews against one digest.
- Evidence: `evidence/dogfood/handoffs/*-attempt-4.*`.
## Dogfood Review Attempt 5

- Approved candidate: GoalContract revision 5, compilation `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`, package `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`.
- Preparation: `PASS`; 34/34 repository source tuples and 13/13 package/contract bindings matched.
- Compiler result: exact search evaluated 203 candidates, found 52 eligible, and selected six task-shaped specialists at projected makespan 23. The serial baseline projected 40 and was ineligible for `evidence_independence`.
- Product/API: `PASS`; 12/12 context items matched and no findings remained.
- Algorithm/lifecycle: `PASS`; 14/14 context items matched, deterministic search/scheduling/digest semantics passed review, and no findings remained.
- Security/trace: `PASS`; 32/32 context items matched, authority/context/privacy/rendering/trace claims passed within the documented core boundary, and no findings remained.
- Release: `PASS`; 19/19 source tuples and 9/9 package files remained stable, focused tests passed 7/7, 35/35, and 6/6, canonical verification passed 323/323 tests, both dogfoods and the installed consumer passed, and the negative checker matrix passed in 736.5 seconds.
- Failed harness attempts: preparation corrected one in-memory empty-array verifier mistake; release verification corrected Windows path normalization and read-only PowerShell quoting. None failed a canonical gate or changed source.
- Post-integration replay: `FIX`; `context.spec` still pointed at the mutable live feature spec, so the authorized acceptance update invalidated package reconstruction.
- Outcome: `FIX`. Preserve attempt 5 as a successful pre-integration review wave that cannot establish final acceptance.
- Evidence: `evidence/dogfood/runs/attempt-5/report.json`, `evidence/dogfood/handoffs/*-attempt-5.*`, and `evidence/dogfood/handoffs/post-integration-replay-fix-attempt-5.md`.

## Dogfood Review Attempt 6

- Accepted technical candidate: GoalContract revision 6, compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161`, package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- Preparation: `PASS`; 34/34 bindings matched, and `context.spec` resolved only to the 10,083-byte immutable pre-integration snapshot.
- Product/API: `PASS`; 12/12 contexts matched and no findings remained.
- Algorithm/lifecycle: `PASS`; 14/14 contexts matched, blueprint identity was independently recomputed, and no findings remained.
- Security/trace: `PASS`; 32/32 contexts plus both package roots, all nine rendered files, and manifest resolution reconstructed with no actionable findings.
- Release attempt 6A: `FIX`; a nested TEMP/TMP root produced a 265-character Windows path after all earlier required gates passed.
- Release attempt 6B: `FIX`; reviewer cleanup removed host-owned offline `_cacache`, so the required offline consumer stopped with `ENOTCACHED`; source and the digest pair remained unchanged.
- Final release: `PASS`; 19/19 contexts and 9/9 files matched, focused tests passed 7/7, 35/35, and 6/6, canonical verification passed 323/323, both dogfoods, the 105-file package, offline consumer, template checker, and complete negative matrix passed in 744.9 seconds.
- Outcome: `PASS` for technical acceptance. Post-integration reconstruction remains an integration-owner gate before branch freeze; no commit, push, hosted CI, merge, or V11 runtime enforcement is claimed.
- Evidence: `evidence/dogfood/report.json`, `evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json`, and the revision-6 PASS/FIX handoffs.

## Next Diagnostic Trigger

Enter diagnosis if the same golden case fails twice, exact search violates its declared count, logical input permutations change selection, a rendered package fails digest verification, or post-integration reconstruction cannot reproduce both owner-retained revision-6 digests.
