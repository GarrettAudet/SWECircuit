# V11 Specialist Compiler Debug Notes

## Status

Revision 30 technical integration is `PASS`. The exact two-phase trust root, five Candidate A dependency handoffs, attempt-30b release evidence, and integration-ready fan-in are authenticated. No candidate defect remains open. Post-integration replay, final host verification/archive, commit/push, and owner merge approval remain.

## Current Failure

No Revision 30 candidate failure is open. Attempt 30a is a bounded host-authority `FIX`: undeclared preflight executables caused an immediate stop before canonical gates. Exact retry 30b stayed within the compiled process boundary and passed every release gate. The remaining work is the T021 post-integration host replay and publication gate.

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

## Dogfood Review Attempt 16

- Candidate A: GoalContract revision 16, compilation `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb`, package `sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1`.
- Separate Audit B: compilation `sha256:f9a0de491c7b015257a34752d72b41a16bae964f5b5268fb973289be0beb3f7b`, package `sha256:fb3ae5e99c1eb959b23ecbe856e244e0db46ec529a490759225b35f1e1d20926`; both audit waves and the cross-package launch authorization passed.
- Preparation: `PASS`; package verification and both freshness passes matched all 35 candidate sources.
- Algorithm/lifecycle: `PASS`; deterministic search, scheduling, selection, and digest claims matched the bound implementation and fixtures.
- Product/API attempt 16A: `BLOCK`; malformed PowerShell quoting widened an `rg` read beyond the declared paths. The handoff was rejected and preserved. Replacement 16B used literal-path-only reads and returned `PASS`.
- Security/trace: `REVISE`; the shared control-character predicate accepted C1 controls from U+0080 through U+009F into compilation content, diagnostic pointers, and rendered contracts.
- Release attempt 16A: `FIX`; `npm.cmd run verify` passed 339/339 tests and the package, consumer, and main checker gates passed, but the checker regression workspace reached a 264-character Windows path under the long spelling of the authorized temp root. A short alias to the same root was verified; the replacement stalled and was stopped after revision 16 had already been retired by security review.
- Stable reproduction before correction: a goal objective containing U+0085 compiled and rendered successfully, the raw control appeared in compilation and package files, and `createDiagnostic` preserved U+009B in its pointer.
- Confirmed cause: `src/text.ts` rejected only C0 (`<= U+001F`) and DEL (`U+007F`), despite the normative contract rejecting control characters. C1 (`U+0080`-`U+009F`) was omitted from the shared predicate used by compiler scanning, diagnostics, and path validation.
- Causal fix: reject the complete C0, DEL, and C1 ranges. Focused regressions cover U+0085 and U+009B in allowed text, unknown property keys, defensive diagnostic pointers, tampered compilation rendering, and accepted package contents.
- Focused verification: build passed and `test/specialist-compiler.test.mjs` passed 36/36 after correcting one test expectation from input validation to the renderer's earlier digest-integrity rejection.
- Outcome: revision 16 is retired. Regenerate revision 17, both packages, approvals, and every affected review/release handoff before integration.

## Dogfood Review Attempt 17

- Candidate A: GoalContract revision 17, compilation `sha256:3677db46ecd2a387239887ecff6d131f1d0616a2dba972ffbe63bdc0ee6b9984`, package `sha256:1cc61cead6a953633c8369e29270c92318e9c58381e2389a971bad5e1ecc72b0`.
- Audit B: compilation `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff`, package `sha256:b5aa9a0db063fd06d1302842e7994d0ed6695182815520d7adbb3d0d612331eb`.
- Prelaunch: binder `PASS`; the first semantic run self-invalidated after widened reads; a fresh literal-path-only reviewer returned `PASS`; the exact raw handoffs and cross-package authorization are preserved.
- Preparation: `PASS`; initial and freshness checks matched all 35 sources.
- Product/API: `PASS`; no findings.
- Algorithm/lifecycle: `PASS`; no findings.
- Security/trace: `REVISE` with three findings. The compiler accepted a repository locator outside its declared `readScope`; launch authorization trusted an arbitrary bound handoff without semantic parsing; Unicode bidirectional formatting controls survived validation and rendering.
- Release: six standalone gates passed, including canonical verification with 340/340 tests, package inspection, installed consumer, and main checker. The negative checker matrix timed out after 600.7 seconds with 65 passing scenarios and no final summary, so its result remains unknown rather than `PASS`.
- Outcome: revision 17 is retired, its 23 generated/control artifacts are archived under `evidence/dogfood/runs/attempt-17/`, and its approvals cannot be reused.

### Attempt 17 Reproductions

- Changing a valid context locator from `path:src/context.md` to `path:private/secret.md` while retaining `readScope: src/context.md` returned compilation success.
- Placing U+202E in a valid goal objective returned compilation success.
- Binding arbitrary Markdown bytes containing `PASS` to the expected path, digest, byte count, and authorization outcome satisfied `verifyLaunchAuthorization`.

### Attempt 17 Confirmed Causes And Fixes

- Locator syntax and source-use authority were validated separately, but no transitive check connected the fragment-free locator path to `readScope`. The compiler now requires the path to be covered by the exact scope or its containing `/**` scope; the existing work-unit and owner-ceiling checks complete the authority chain.
- The shared text predicate omitted Unicode `Bidi_Control` code points. It now rejects U+061C, U+200E-U+200F, U+202A-U+202E, and U+2066-U+2069 in values, keys, diagnostics, paths, compilation, and rendering.
- Launch authorization authenticated bytes but treated its own `outcome` field as semantic evidence. The host now parses those exact bytes as strict JSON and validates a closed `PrelaunchAuditHandoff`: exact Audit B goal, reviewer agent and blueprint, both Candidate A and Audit B digest pairs, destination, completed review work unit, artifact, and both independent review duties with `status: pass`.
- Focused verification after correction: deterministic build passed; lint passed; the compiler and dogfood-host suites passed 61/61, including malformed JSON, non-PASS, unrelated-reviewer, stale-digest, missing-evidence, unknown-field, bidi-spoof, scope-escape, and byte-mutation regressions.
- Next gate: run canonical verification, increment to revision 18, rebuild both immutable packages from current bytes, and request fresh digest-bound approvals before any specialist launch.
## Dogfood Prelaunch Attempt 18

- Preserved raw handoff: `evidence/dogfood/handoffs/prelaunch-audit-binding-fix-attempt-18.json`.
- Exact raw evidence: 14,869 bytes; `sha256:38c5ce9466bcc6b987209e2eca176643caebcb728d08f35e105c152e6a9fb3d6`.
- Material result: all 10 authorized Candidate A files passed raw byte and SHA-256 checks, and all 93 structural binding checks passed.
- Failure: the runtime prompt additionally required independent reconstruction of Candidate A and Audit B root package digests. That demand exceeded the binder's exact Candidate A artifact authority and lacked Audit B package bytes, a host receipt, and an authorized digest construction.
- Confirmed boundary: the external host verifies both packages; Audit B binds Candidate A artifacts and performs semantic review. Audit B cannot digest-bind its own final package without changing the package identity it is trying to bind.
- Outcome: the binder returned `fix`; Wave 2 did not run, Candidate A remained unapproved and unlaunched, and no integration occurred.
- Causal correction implemented: after host reconstruction of A and approval-bound verification of B, the reference host creates a closed external `PrelaunchPackageVerificationReceipt`. Binder and reviewer declare it through runtime input ports, while final authorization binds the receipt's exact raw bytes and the exact semantic handoff. The focused reference-host suite passes 24/24, and the complete pre-candidate gate passes format, lint, typecheck, build, 344/344 kernel tests, V10 compatibility dogfood, 105-file package inspection, offline installed-consumer execution, and the template checker. Fresh revision-19 package review and release verification remain pending.

## Dogfood Precompile Attempt 19

- First fail-closed result: the strict control parser emitted `SC1102` before candidate construction; no digest pair or evidence package was produced.
- Confirmed host cause: the mechanical source-refresh command appended literal `\n` bytes after the valid GoalContract JSON. Replacing them with one LF restored strict parsing without changing contract semantics.
- Second fail-closed result: checkout-canonical verification rejected `two-phase-prelaunch-review.md` before hashing its context.
- Confirmed checkout cause: one CRLF remained among 208 LF line endings. Normalizing the file to the repository's explicit `eol=lf` policy restored reproducible checkout bytes.
- Third fail-closed result: Candidate A compiled in memory, but Audit B preflight emitted `SC4301` for both receipt input-port names; the run wrote no revision-19 evidence and exposed no approval pair.
- Confirmed contract cause: `verificationReceipt` violated the closed lowercase identifier grammar. Focused receipt tests asserted artifact types but did not compile the generated Audit B GoalContract.
- Causal correction: use the valid `verification-receipt` identifier and require the focused host test to compile the complete generated Audit B goal successfully.
- Gate status: build and the focused reference-host suite pass 24/24 after correction; the complete pre-candidate gate must repeat before revision-19 package generation.

## Dogfood Review Attempt 19

- Candidate A: compilation `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807`, package `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed`.
- Algorithm/lifecycle and fresh product/API review returned `PASS`; release returned `FIX` because canonical tests used undeclared system TEMP/TMP and the negative checker matrix hit a 264-character Windows destination path.
- Security/trace returned `REVISE`: the closed prelaunch handoff validator accepted escaped lone UTF-16 surrogates in launchable free text.
- Stable reproduction: a digest-bound `PrelaunchAuditHandoff` with `summary: "\ud800"` passed the real `verifyLaunchAuthorization`; parsing retained code unit `0xD800`.
- Classification: high-severity input-validation defect at the final launch-authorization trust boundary.
- Confirmed cause: `containsUnsafeHandoffCharacters` rejected C0, DEL, C1, and bidi formatting controls but omitted U+D800-U+DFFF. JavaScript iteration exposes an unpaired surrogate in that range, while a valid pair is emitted as one supplementary code point.
- Causal correction: reject code points U+D800-U+DFFF in `safeHandoffText`'s shared scanner. Verifier-level regressions cover lone high and low surrogates in destination, goal ID, reviewer ID, summary, assumptions, risks, follow-ups, and artifact content; a paired supplementary character remains valid.
- Outcome: revision 19 is retired. Wave 3 did not launch. Revision 20 must bind the correction and all preserved findings to fresh Candidate A and Audit B packages and approvals.

## Dogfood Review Attempt 20

- Candidate A: compilation `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406`, package `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025`.
- Audit B: compilation `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608`, package `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`.
- Prelaunch authorization and preparation returned `PASS`; algorithm/lifecycle and product/API independently returned `PASS`.
- Security/trace returned `REVISE`: handoff free text omitted high-confidence secret detection, metadata permitted escaped TAB/LF/CR, and the variable authorization handoff path lacked a Unicode-scalar check.
- Release initially passed focused suites, canonical verification, package/consumer checks, the template checker, and the complete 119/119 negative matrix. After the causal source edit, its replay and final source authentication returned `FIX`, retiring the exact candidate.
- Correction: apply the shared secret detector to handoff metadata, Markdown evidence, and the variable evidence path; reject all C0 in metadata; permit only LF in Markdown evidence; and use one shared lone-surrogate predicate for explicit and relative paths.
- Verification: focused path and host suites pass 65/65; the complete kernel passes 353/353; format, lint, and typecheck pass.
- Evidence: `evidence/dogfood/runs/attempt-20/` preserves both packages, approvals, immutable inputs, launch authorization, raw PASS/REVISE/FIX handoffs, and exact hashes.
- Outcome: revision 20 is retired. Revision 21 must be compiled, separately approved, audited, reviewed, released, integrated, and replayed from fresh bindings.

## Dogfood Review Attempt 21

- Candidate A: compilation `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266`, package `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`.
- Audit B: compilation `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c`, package `sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90`.
- Prelaunch binder and semantic reviewer returned `PASS`; preparation authenticated all 36 source tuples; product/API and security/trace returned `PASS`.
- Algorithm/lifecycle returned `REVISE`: nested closed records were copied with object spread, preserving caller insertion order. Canonical digesting sorted keys, but ordinary `compilation.json`, manifest bytes, and the root package digest changed under logically equivalent key permutations.
- Release returned `FIX`: format, lint, typecheck, build, 353/353 tests, dogfood, package inspection, installed-consumer verification, and the template checker passed, but the serial negative-checker matrix was terminated after 900.5 seconds without a final result.
- Causal compiler fix: explicitly reconstruct requirements, context uses, assumptions, unresolved decisions, and optimization costs in schema order. The permutation regression now compares ordinary compilation serialization, all rendered files, and exact package digests.
- Causal harness fix: omit generated feature evidence from fixtures, reuse four hard-linked fixture slots, atomically copy on write, restore only changed paths, and execute four checker processes concurrently while retaining exact case assertions.
- Verification after correction: focused compiler suite 38/38, full kernel 353/353, format 72 files, lint 60 files, typecheck and build, PowerShell syntax, and the complete 119/119 checker matrix in 213.3 seconds.
- Evidence: `evidence/dogfood/runs/attempt-21/` preserves the exact packages, approvals, receipt, launch authorization, immutable inputs, and all raw handoffs.
- Outcome: revision 21 is retired. Revision 22 must bind the corrected source and documentation bytes and repeat every approval, audit, review, release, integration, and replay gate.

## Dogfood Review Attempt 22

- Candidate A: compilation `sha256:642ad0726e8019231d6e357a8602c387a47a637d2ce94fc0701efedaf1ae5869`, package `sha256:8ddb1130c6af875f708fb347d46473d532dec0ff796834869ee644f6ee488bbc`.
- Audit B: compilation `sha256:0b9d61f44a25d5fc13eb5cfea82bd51c1417bc113fe52f0651f719e8293835ac`, package `sha256:c6ec32f791ed698956d9b953596a9afae2636e65edb1cb069113fe4de62294e8`.
- Audit B binder and semantic reviewer returned `PASS`; all 203 partitions, 52 eligible candidates, fixed schedule, authority, evidence, canonical-record correction, and both package roots were independently reproduced.
- Preparation authenticated 36 source tuples. Product/API and algorithm/lifecycle returned `PASS`.
- Release returned `PASS`: format, lint, typecheck, 353/353 tests, both dogfoods, package and installed-consumer checks, the template checker, and all 119 negative checker cases completed inside declared authority.
- Security/trace returned `REVISE`: `safeArtifact` omitted lone-surrogate and high-confidence-secret checks, while `safePointer` omitted lone-surrogate checks. Exported `createDiagnostic` and `parseJsonBuffer` could therefore return unsafe evidence fields.
- Stable reproduction: direct diagnostics preserved `bad\ud800.json`, `bad\udc00.json`, and a complete `sk-proj-...` canary; JSON parsing carried the unsafe artifact through.
- Causal fix: reuse `containsLoneSurrogate` in artifact and pointer sanitization and `containsHighConfidenceSecret` in artifact sanitization. Regress direct diagnostics, JSON parsing, contained missing-file reads, and valid supplementary Unicode.
- Verification after correction: focused diagnostic/project suites 43/43; format, lint, typecheck, build, and the complete kernel 354/354 pass.
- Evidence: `evidence/dogfood/runs/attempt-22/` preserves both packages, approvals, receipt, authorization, immutable inputs, and every raw handoff.
- Outcome: revision 22 is retired. Revision 23 must bind the corrected diagnostics and the new regression source before repeating every gate.

## Dogfood Review Attempt 23

- Candidate A: compilation `sha256:36ebb90c8420a368e4246ce22e7804a0952396c526c36b3b498436d2919f20b6`, package `sha256:232d928ae4e0e92f9cc2e25a611df8c6922eefe343a6ba7dee0f7aabccae99bc`.
- Audit B: compilation `sha256:ced8b145b120e77e349a02c3ebbe55c94d960854ad9fd71988126444b9a0517e`, package `sha256:08fc0af95b9613308d25bbb5e2c40bb369c7753cc7b75e809b716d08b8645343`.
- Audit B binder and semantic reviewer returned `PASS`; the reviewer independently reproduced all 203 partitions, 52 eligible candidates, the unique selected team, authority, evidence, schedules, rendered files, and both Candidate A identities.
- Preparation authenticated 37 source tuples. Product/API and algorithm/lifecycle returned `PASS`.
- Release returned `PASS`: format, lint, typecheck, build, 354/354 tests, both dogfoods, package and installed-consumer checks, the template checker, and all 119 checker cases completed inside declared authority.
- Security/trace returned `REVISE`: `safePointer` applied secret detection to each decoded token but not to the cumulative emitted or decoded pointer. Credential-assignment and Bearer values split across `/` delimiters could survive in the returned public diagnostic.
- Stable reproduction: `/safe/password=/supersecretvalue` and `/safe/Bearer /ABCDEFGHIJKLMNOPQRSTUVWXYZ` were returned unchanged and each matched the shared high-confidence secret policy as a complete string.
- Causal fix: check both cumulative candidate forms before appending each token and retain the longest prior safe prefix. Add exact regressions for both split patterns and verify the secret-bearing suffix is absent.
- Verification after correction: focused diagnostic/project suites 43/43; format, lint, typecheck, build, and the complete kernel 354/354 pass.
- Evidence: `evidence/dogfood/runs/attempt-23/` preserves both packages, approvals, receipt, authorization, immutable inputs, and all raw PASS/REVISE handoffs.
- Outcome: revision 23 is retired. Revision 24 must bind the corrected source and documentation bytes and repeat every approval, audit, review, release, integration, and replay gate.

## Dogfood Prelaunch Attempt 24

- Candidate A compiled as `sha256:05fd18cc50e06f872cb9f1a4229970206c2a27383ad8d7f64024f7f7f9d5c9c8` / `sha256:6748f967eb5f091fbc2f25b00ab9dc8a5fe255dd49d26492fcbea00fe9981573`.
- Audit B compiled as `sha256:fe6e200e0d5d5af4f3f077353320b240569699ef83a882204c077ed3dbb5350e` / `sha256:268cbeab032a8b78e56fcb29f8526ad6ff75d4745524617ba04cca75dd83ccd1`.
- Both packages approval-verified and the external package-verification receipt returned `pass`; no Audit B agent launched.
- Prelaunch inspection found a contract contradiction: the selected reviewer blueprint required standard `agent` and `compilationDigest` fields, while the closed `PrelaunchAuditHandoff` validator rejected those fields and instead required `reviewer` plus `prelaunchAudit`.
- Either output omitted compiled required fields or failed closed-shape validation, so no valid semantic handoff could satisfy both contracts.
- Causal correction: require the custom envelope to contain both standard and audit-specific bindings, then equality-check duplicate reviewer and Audit B compilation identities.
- Focused prelaunch coverage now rejects absent, unknown, malformed, unsafe, stale, and disagreeing bindings and passes 29/29.
- Outcome: `fix`. Revision 24 is retired before launch; revision 25 must regenerate every source binding, package, approval, receipt, handoff, authorization, review, and replay artifact.
## Dogfood Prelaunch Attempt 25

- Candidate A compiled as `sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404` / `sha256:1c7e875c0aad3c1b4a0987b14ec9be57b73c533c03779236889ce547db3e5af8`.
- Audit B compiled as `sha256:3cdf00aaa53b2d4b0a3a72789a6d654b49e4cbfbbd58e9b6a45c085ee05483a6` / `sha256:bc806f5007a87f2c5363c3cd0f3c35371e0c8ed6dda7ad46003ac88dd4fc7dac`.
- Both packages approval-verified, the external package-verification receipt returned `pass`, the corrected prelaunch envelope tests passed 29/29, and the complete kernel passed 364/364.
- One Audit B binder started. Before any binder handoff was accepted, `scripts/check-template.ps1` rejected the shortened README for removing stable `How It Works`/`Start Here` anchors, the existing-kernel init command, active minimal-project/executor-boundary links, and explicit external-host/non-effect language.
- The binder was interrupted before handoff. No semantic result was accepted, no launch authorization was created, Candidate A did not launch, and no integration occurred.
- Classification: public-interface compatibility regression caught by the repository workflow checker before release admission.
- Causal correction: restore the stable headings, runnable source-checkout path, active links, and exact host-boundary statements; add R29/AC18 so the surface is explicit release acceptance rather than an implicit checker-only requirement.
- Verification: the immediate template-checker rerun passes.
- Outcome: `fix`. Revision 25 is archived under `evidence/dogfood/runs/attempt-25/`; revision 26 must regenerate every source binding, package, approval, receipt, handoff, authorization, review, and replay artifact.
## Dogfood Precompile Attempt 26

- First fail-closed result: the mechanical source-refresh script added `expectedBytes` and `expectedDigest` instead of updating the closed `bytes` and `digest` fields. Schema validation emitted `SC4301` for every context source and returned no candidate.
- Confirmed host cause: the temporary refresh script used verifier terminology rather than the GoalContract field names. It now updates `bytes`/`digest` and deletes the accidental unknown fields.
- Second fail-closed result: checkout-canonical verification rejected the newly copied active-context snapshot because PowerShell preserved CRLF while Git declares LF. No candidate was emitted.
- Causal correction: normalize only that immutable Markdown snapshot to LF, verify that the remaining CR-bearing context files are the two CRLF-governed PowerShell scripts, then rehash all 57 sources.
- Evidence rotation then hit sandbox `EPERM` while removing the retired package from the temporary recovery worktree. The exact deterministic writer was rerun with the already authorized workspace write capability; no source or contract changed.
- Candidate A compiled as `sha256:f3658ec182621f9a3485915cd260046d70e7fb1dcd84770f5b03ed3c9d05bb8e` / `sha256:f888a1a784d203d51bcb5d780b71167e0012662d30cec3dbab0d6e34afcab13a`; Audit B compiled as `sha256:9823e1919504fd757584f8eb24f2720c8ff34df4834e52a3d3a096a34304115f` / `sha256:3661bf2fcdfeaa88f43bf5fdf22b9f6c54f7ac908d70e96540b03f56714be1d1`.
- Both digest pairs and the external receipt `sha256:61884e10b8bf190b102ead9d6fab0c5e9ea24326155142fbaa2f6975d2db6716` verified.
- One authenticated binder returned raw bytes `sha256:72e5af3d45abe6b4de0b48bde25fc63bc91307a1320df5f742b64f379b261ae4`. Artifact `content` was an object, artifact `mediaType` was absent, and evidence copied blueprint-duty fields without required `status` or artifact references. Public verification emitted `SC4310`; no result was accepted.
- The complete checker matrix matched 118/119 cases. The remaining fixture hid the handbook link but expected the AGENTS-link diagnostic; the checker correctly named the handbook link.
- Confirmed causes: generated contracts listed top-level required fields but did not show the closed nested handoff envelope, and the fixture expectation did not match its mutation.
- Causal corrections: render a concrete verifier-valid handoff block in every agent contract and test it through the public API; align the checker fixture with the link it hides.
- Outcome: `fix`. Revision 26 is archived under `evidence/dogfood/runs/attempt-26/`; zero results were accepted, Candidate A never launched, and revision 27 must regenerate the complete trust chain.

## Attempt 27 Complete Fan-In Rejection

- Candidate A: `sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7` / `sha256:fde922b7e3c2f4747e04c92dacea8af3c7083fa87cd3bcf029f92b2b1ce632b3`.
- Audit B: `sha256:183c968974eab7b6d7bd4451ceec2d35d16784265deb6b333836a7726b216d6c` / `sha256:c163c1c5eefc6900234fd781877677c0a41cbd6ffc7cd104b749bcf952f18841`.
- Separate receipt, binder, semantic audit, launch authorization, preparation, and algorithm/lifecycle review passed.
- Product/API `FIX`: advertised specialist schemas referenced `common.schema.json` without a supported package export or strict clean-consumer registry test.
- Security/trace `FIX`: artifact scanning stripped CR before control detection and verification bound artifact names but not the generated media types.
- Release `FIX`: 364/364 tests, both dogfoods, template checks, 119/119 checker cases, and package inspection passed before the typed packed host rejected its stale retained package digest.
- Public verification accepted all five Candidate A raw envelopes. Machine fan-in received all five but recorded three `fix` outcomes and `integrationReady: false`; integration did not launch.
- The exact archive and retirement record are under `evidence/dogfood/runs/attempt-27/`.
- Correction evidence: deterministic common-schema export and strict registry, exact artifact-media derivation, LF-only artifact controls, synchronized installed-host approvals, 54/54 focused tests, and a passing clean offline installed consumer.

## Attempt 28 Stale First-Run Approval

- Candidate A: `sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c` / `sha256:7dd562d20096778abcd15601edc4226064865cf418c33f07f8e8ad25878faba0`.
- Audit B: `sha256:044b44b21d22e5692a5edfb51de76813c689e8b244c58464d8ab55613a30dc3d` / `sha256:86d47a8b1ead37e6a920472fe153bc0d97b9c0340c59246ab5768c762a8f9c42`.
- Receipt, Audit B, launch authorization, preparation, algorithm/lifecycle, and security/trace passed.
- Product/API and release independently found that the first-run approval expected a 36,089-byte contract at `sha256:c6462aae192a4df6d4de44e086c5e465b93c2354df3e153dfa8e9771e530a71b`, while the authenticated candidate contained 36,449 bytes at `sha256:813d53058e1c3bde7b1c434d1868375560f4802a3bb484b1a460685954759ef9`.
- Release passed the template checker, 119/119 checker cases, and 48/48 strict specialist tests; canonical verification stopped at 364/365 on the stale approval before package and installed-consumer stages.
- All five raw Candidate A handoffs publicly verified. Complete fan-in recorded three `pass`, two `fix`, and `integrationReady: false`; integration did not launch.
- The approval was regenerated from current source bytes and the derived pair. The normal example and 2/2 focused first-run tests now pass.

## Attempt 29 Authorization Summary And First-Run Host Boundary

- Candidate A: `sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da` / `sha256:1e3afc96dc43950e21b3db94752a6f6fe9c33931ab36b0ce4a2adc2229a59994`.
- Audit B: `sha256:17d7985ed3c4d0f817550b29d9b95308d11a5acaf13dabdee288e3b1d692742d` / `sha256:807d04eb877751acbe4802ccf147bf0853ac4df3390a953ed4669fc572bbbfb7`.
- The external receipt, authenticated binder, independent semantic Audit B, launch authorization, preparation, and all five Candidate A raw handoffs passed structural verification. Audit B independently reproduced 203 partitions, 52 eligible candidates, the six-specialist roster, schedule, authority, evidence, and both Candidate A identities.
- Algorithm/lifecycle and release returned `PASS`. Release passed the template checker, 119/119 checker cases, 48/48 focused specialist tests, 365/365 kernel tests, package inspection, and the clean installed consumer.
- Product/API returned `FIX` because `specialist-compiler-contract.md` and `docs/ai/handbook.md` summarized final cross-package authorization without explicitly binding the mandatory external verification receipt's exact path, raw digest, byte count, and outcome.
- Security/trace returned `FIX` because `examples/specialist-compiler/run.mjs` used plain `JSON.parse` and lexical path checks before filesystem access. Duplicate approval keys could be interpreted ambiguously, unsafe path text could reach I/O and diagnostics, and a repository link or junction could escape the intended root.
- Complete machine fan-in preserved three `pass` and two `fix` outcomes and returned `integrationReady: false` at `sha256:95168d0fd74ac4e6a21526ddf81d60a5e09a53dd3d4138f4a32678b8b416431f`. Integration did not launch.
- The exact retired run is preserved under `evidence/dogfood/runs/attempt-29/`.
- Revision 30 makes the receipt binding explicit in both summaries and moves the example host onto bounded duplicate-aware approval parsing plus canonical contained source reads. Focused first-run coverage now passes 7/7, including malformed, duplicate, unknown, oversized, unsafe-path, directory, junction-escape, privacy, stale-binding, and normal read-only cases.

## Attempt 30 Technical Acceptance And Host Retry

- Candidate A: `sha256:ced8186898ebb27bac53e50e6b803c353766ae015464a2bae2b758cb6cf6cc36` / `sha256:ddb642a474815b4ded464b40f5bd8225a404f610d3bd4a91d0ab2d43dc695f43`.
- Audit B: `sha256:79c5a7103225b12398e27c0e959b993597f38dcc5ddca6d9750a4d2b62f2d065` / `sha256:367d9b3d57b918aabc6543dae16b9b3cf5fee81338fd241226ef9bef2209510f`.
- The 2,255-byte external receipt and 9,251-byte semantic Audit B handoff are exact `PASS` artifacts. Launch authorization binds both pairs and both raw artifacts; Candidate A approval binds its exact pair.
- Preparation, algorithm/lifecycle, product/API, security/trace, and release retry 30b are exact public-verified `PASS` handoffs. The 3,464-byte final fan-in has content digest `sha256:4c89b0c7bd64735c371726155bd74d424d18af1248499cb77f05e93154c40a8a` and reports `integrationReady: true`.
- Release attempt 30a returned `FIX` before canonical execution because preflight spawned `rg.exe` and `whoami.exe` outside that specialist's declared process authority. It changed no source or evidence and supplied no accepted release result.
- Exact retry 30b passed 119/119 checker cases, 133/133 focused regressions, 370/370 canonical tests, package dry run, installed consumer, and committed V11 evidence replay. The host-authority failure is superseded for acceptance, not erased.
- Technical integration completed, the exact integration handoff was preserved, post-integration reconstruction passed, and the accepted run is archived under `evidence/dogfood/runs/attempt-30/`.

## Attempt 30 Post-Integration Milestone Check

- The first post-integration template check rejected `docs/milestones/v11.md` because the concise rewrite omitted required `Why It Matters` and `Next Recommended Work` headings.
- The failure was confined to a mutable integration output; no Candidate A or Audit B source binding changed.
- The host restored both required sections, reran the template checker, then passed the full 119-case matrix and canonical 370-test verification.
- Post-integration package reconstruction remained exact, and the 44-file archive manifest verified every copied byte.
