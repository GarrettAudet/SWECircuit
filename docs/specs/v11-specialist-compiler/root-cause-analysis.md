# Root Cause Analysis

## Status

Reopened through revision-28 Candidate A fan-in. Product/API and release independently confirmed one stale first-run approval; the current source binding and derived compilation/package expectation are corrected, and the normal example plus 2/2 focused tests pass. Revision 29 must bind the corrected bytes before fresh packages, approvals, independent acceptance, full release verification, integration, or post-integration replay.

## Incident Summary

Four architecture-review rounds rejected the original universal runtime scope. After that scope was split, Specialist Compiler dogfood attempts 1-4 exposed product/API, authority, package-trust, host-containment, consumer, scheduler-coverage, and verification defects. Attempt 5 passed its pre-integration wave but emitted `FIX` when authorized integration changed a live spec still bound as review input. Revision 6 removed that alias, repeated every review lane, preserved host-only release `FIX` attempts 6A/6B, and passed the complete technical gate against one digest pair.

## Impact

The original boundary delayed a usable specialist compiler. Early dogfood packages were deterministic but not sufficient for trusted launch or complete security review, so none was eligible for owner approval. No rejected candidate was merged or presented as accepted.

## Reproduction

Review exact architecture candidate `d486b7f49724651cc12a115ee483e70d67e62bbb` against `../v11-orchestration-planner/architecture-review-round-4.md`.

For attempt 1, compile `evidence/dogfood/runs/attempt-1/goal-contract.json`, inspect the generated package, submit `path:../outside.txt`, and test a coordinated rewrite of compilation, payloads, manifest, and package envelope without externally trusted expected digests. Attempts 2-4 and their narrower reproductions are preserved in `debug-notes.md` and `evidence/dogfood/handoffs/`.

## Evidence

- Round 4 produced 10 high and 9 medium findings; `../v11-orchestration-planner/revision-5-correction-design.md` preserves the correction design.
- Attempt 1 is preserved under `evidence/dogfood/runs/attempt-1/`; every later `REVISE`, `FIX`, and `PASS` handoff remains under `evidence/dogfood/handoffs/`.
- Attempt 5 is historically bound by compilation `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d` and package `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`; `post-integration-replay-fix-attempt-5.md` records its final `FIX` outcome.
- Revision 6 is bound by compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- `evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json` records 34/34 preparation source bindings and the sole immutable `context.spec` locator.
- `verify-release-fix-attempt-6a.md` and `verify-release-fix-attempt-6b.md` preserve host failures without changing source or candidate identity; `verify-release-pass-attempt-6.md` and the three revision-6 reviews record the accepted PASS set.

## Hypotheses Considered

- Continue revising the universal runtime contract.
- Ship the independent Specialist Compiler first and defer the effectful runtime layer.
- Treat prose-only assumptions and decisions as adequate launch context.
- Bind only individual files and the manifest, without a trusted package root.
- Give reviewers only direct feature sources rather than security-sensitive transitive helpers.
- Treat host-side containment and approval handling as implicit rather than executable consumer obligations.

## Confirmed Root Cause

The first cause was an oversized feature boundary that coupled pure task-team construction to scheduler, callback, restart, attestation, merge, and memory protocols not required for the owner-priority capability.

The dogfood failures came from launch-sensitive requirements existing only in prose, prefix-only path validation, integrity values rooted only inside a mutable package, incomplete security-review context, and later incomplete containment of host control/evidence paths. Consumer and scheduler assertions also lacked direct installed and fixed-scheduler regressions until attempts 3-4.

Attempt 5 failed because the same live spec path was both a digest-bound review input and an authorized integration output. Attempts 6A/6B failed because the release host consumed Windows path headroom and then removed a host-owned offline cache while cleaning attempt-owned files.

## Fix

ADR 0004 makes the standalone Specialist Compiler the V11 target and defers runtime effects. The completed correction canonicalizes assumptions and decisions, exposes search and selection evidence, validates repository path segments, closes permission kinds, binds a compilation-bearing package to externally retained compilation and package digests, deterministically reconstructs and verifies the package, closes reviewer context, contains host-side reads/writes, and exercises the installed consumer plus fixed scheduler directly.

Revision 6 also binds every integration-mutable review document through an immutable pre-integration snapshot, reserves the live path as an output, and requires the integration owner to reconstruct both trusted digests after integration. Release retries use `.local/npm-cache` directly as TEMP/TMP, preserve host-owned `_cacache`, and clean only attempt-owned outputs.

## Verification Of Fix

- Revision-6 preparation passed 34/34 source bindings, with `context.spec` resolved only to the immutable pre-integration snapshot.
- Product/API passed 12/12 context items with no findings.
- Algorithm/lifecycle passed 14/14 with no findings.
- Security/trace passed 32/32 with no findings.
- Release verification passed 19/19 release contexts, 9/9 package files, focused 7/7 schema, 35/35 compiler/golden, 6/6 containment, and canonical 323/323 tests.
- Both dogfoods, the offline installed consumer, package verification, template checker, and the complete 744.9-second negative matrix passed.

These checks verify the documented pure-core and host-fixture boundaries. They do not prove provider execution, permission enforcement, isolation, persistence, merge, or automatic memory effects.

## Regression Coverage

Architecture checks must reject provider/runtime supply or claims that V11 core schedules, executes, merges, or mutates memory. Golden and adversarial coverage rejects blocking decisions, traversal, authority surplus, secret leakage, runtime fields, fixed-scheduler drift, mismatched package expectations, coordinated rewrites, host containment failures, and type/schema permission drift.

Any semantic candidate change requires new source binding, both trusted digests, affected canonical gates, and repeat independent review. Any document integration may mutate must be supplied through an immutable pre-integration snapshot, and the exact approved pair must reconstruct after integration before branch freeze.

## Durable Learning

Split pure planning demand from effectful runtime control when either layer can deliver independently reviewable value. An immutable execution contract must carry assumptions and unresolved decisions. Package digests establish trust only when expectations are retained outside the received package. Reviewer strength depends on exact context closure, and host examples must demonstrate the containment and approval rules they teach. An integration target cannot also be a digest-bound live input; snapshot first, mutate the output, then replay the exact approved package.

## Attempt 15 Prelaunch Digest Failure

- Reproduction: hash the 13,150-byte Audit B binder contract with standard SHA-256. The file is `sha256:4e03ec52a391b5093cbb7c3e795e51195ec5899940d5c4aa8269602ec050dbfc`, while the manifest declares `sha256:5ca2ee516c615ea6062903a5171238661848e35d1ef0150629a419121c03d4dc`.
- Stable evidence: `evidence/dogfood/handoffs/prelaunch-audit-binding-block-attempt-15.json` preserves the raw specialist handoff; Candidate A artifacts were not read.
- Confirmed cause: rendered files used `digestBytes("swecircuit.specialist.rendered-file.v1", bytes)`, a domain-separated frame, but the manifest and generated agent contract did not expose that domain or a portable verification method. The `sha256:` prefix led a conforming external agent to use ordinary SHA-256.
- Fix: revision 16 uses standard SHA-256 for exact rendered-file bytes, declares `fileDigestAlgorithm` and `fileDigestScope` in the manifest, and explains the distinction between file hashes and domain-separated canonical identities in every generated contract.
- Regression requirement: renderer tests must compare every emitted file digest with Node's standard SHA-256, package reconstruction must still reject tampering, and a regenerated Audit B binder must authenticate its own contract and all ten Candidate A artifacts before Wave 2 can launch.

## Memory Update

The split and immutable-input decisions remain in `docs/memory/decisions.md`; attempt 5 and release-host attempts 6A/6B are preserved in `docs/memory/failed-attempts.md`. Residual limits and final evidence are linked from `docs/memory/known-issues.md`, `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md`, and `docs/milestones/v11.md`.

## Attempt 16 C1 Control-Character Failure

- Reproduction: submit a valid GoalContract whose objective contains U+0085. Before correction, compilation and rendering both returned success, and the raw C1 control appeared in the compilation and rendered package. A diagnostic pointer containing U+009B also retained the raw control.
- Stable evidence: `evidence/dogfood/handoffs/security-trace-review-revise-attempt-16.md` preserves the independent finding; `prepare-candidate-pass-attempt-16.md`, `algorithm-lifecycle-review-pass-attempt-16.md`, `product-api-review-block-attempt-16a.md`, `product-api-review-pass-attempt-16b.md`, `verify-release-fix-attempt-16a.md`, and `verify-release-stall-attempt-16b.md` preserve the rest of the wave.
- Classification: high-severity input-validation and human-review rendering containment defect. Package integrity authenticated the accepted bytes but could not correct unsafe content admitted before digesting.
- Confirmed cause: `containsControlCharacters` covered C0 and DEL only. Its missing U+0080-U+009F range propagated through compiler text scanning, diagnostic sanitization, and path validation.
- Fix: extend the shared predicate through U+009F and add direct regression coverage for C1 text values, unknown keys, diagnostic pointers, rejected tampered rendering, and accepted package output.
- Focused verification: deterministic build passed; the specialist compiler suite passed 36/36. Full canonical verification, candidate regeneration, separate Audit B, fresh owner approvals, and repeat independent reviews are still required.
- Release-host learning: use the verified Win32 short-path alias for the existing `.local/npm-cache` authority when the negative checker matrix runs on Windows. The alias changes path spelling, not the authorized write target.

## Attempt 17 Security Boundary Failures

### Incident

Revision 17 completed separate Audit B approval, preparation, product/API review, and algorithm/lifecycle review. Security/trace then returned `REVISE` before integration because three declarative trust boundaries did not fail closed. Release verification was stopped and no Candidate A output was integrated.

### Stable Evidence

- Candidate A pair: `sha256:3677db46ecd2a387239887ecff6d131f1d0616a2dba972ffbe63bdc0ee6b9984` / `sha256:1cc61cead6a953633c8369e29270c92318e9c58381e2389a971bad5e1ecc72b0`.
- Audit B pair: `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff` / `sha256:b5aa9a0db063fd06d1302842e7994d0ed6695182815520d7adbb3d0d612331eb`.
- Security handoff: `evidence/dogfood/handoffs/security-trace-review-revise-attempt-17.json`.
- Raw preparation and review handoffs remain under `evidence/dogfood/handoffs/`; the generated revision is archived under `evidence/dogfood/runs/attempt-17/`.

### Confirmed Causes

1. Repository source validation checked locator syntax, and work-unit validation checked `readScope` authority, but no check required the locator's fragment-free path to be covered by that `readScope`.
2. Cross-package authorization bound Audit B's raw handoff bytes but did not parse them. Its own `outcome: pass` field could therefore authorize unrelated or semantically failing bytes.
3. The shared control predicate covered C0, DEL, and C1 after attempt 16 but omitted Unicode bidirectional formatting controls that can change human-visible ordering without changing authenticated bytes.

### Causal Fixes

1. Extract the normalized locator path and require a covering exact or recursive filesystem-read scope before team construction. Existing unit-permission and owner-ceiling checks then establish the complete locator-to-owner authority chain.
2. Parse the exact digest-bound handoff bytes as strict JSON and require the closed `PrelaunchAuditHandoff` envelope. Validate the exact Audit B goal, reviewer agent and blueprint, Candidate A and Audit B digest pairs, destination, completed review unit, review artifact, and both review duties with `status: pass`. Reject malformed JSON, non-PASS, stale identities, missing or duplicate evidence, unknown fields, unsafe controls, and byte changes.
3. Reject all Unicode `Bidi_Control` code points in the shared text predicate and in the handoff host's multiline-safe text scanner.

### Verification

- Direct pre-fix reproductions showed all three defects.
- Build and lint pass after correction.
- Focused compiler and dogfood-host suites pass 61/61.
- New negative coverage includes locator escape and recursive-scope acceptance; all bidi controls in values, keys, diagnostics, and rendering; malformed JSON; non-PASS; unrelated reviewer; stale Candidate A identity; missing evidence; unknown fields; bidi-spoofed summaries; and post-authorization byte mutation.

### Residual Gate

The focused result retires rather than revives revision 18. Revision 19 must bind the current source and documentation bytes, reproduce both packages, obtain fresh owner approvals, repeat Audit B and every Candidate A review lane, complete the canonical and negative verification gates, and pass immutable post-integration replay before milestone acceptance.

## Attempt 18 Audit B Receipt Failure

### Issue And Evidence

Audit B's binder authenticated all 10 authorized Candidate A files and passed 93 structural checks, then returned `fix` before Wave 2. The preserved 14,869-byte handoff is `evidence/dogfood/handoffs/prelaunch-audit-binding-fix-attempt-18.json`, with raw digest `sha256:38c5ce9466bcc6b987209e2eca176643caebcb728d08f35e105c152e6a9fb3d6`. Candidate A was not approved, launched, or integrated.

### Competing Hypotheses

1. Give the binder both complete packages and require it to reconstruct both root digests. Rejected: this widens the binder beyond exact Candidate A binding, duplicates the host verifier, and cannot let Audit B digest-bind its own final package without self-reference.
2. Remove the root-verification language from the runtime prompt. Rejected as incomplete: host package verification would remain invisible to the contract and evidence chain.
3. Preserve host verification in a closed artifact outside both packages and deliver it through typed runtime ports. Confirmed: it respects the normative host boundary, avoids self-reference, and makes the verification auditable.

### Confirmed Cause

The runtime prompt conflated two duties. The binder contract authorized exact Candidate A artifact binding, while normative package reconstruction belongs to the external host. No typed artifact carried the host's reconstruction of Candidate A and approval-bound verification of Audit B into the prelaunch evidence chain, so the over-broad prompt demanded evidence the binder could not produce within authority.

### Causal Fix

The reference host now creates `swecircuit/prelaunch-package-verification-receipt/v1alpha1` only after reconstructing Candidate A and verifying Audit B against B's exact approval. The closed receipt binds both digest pairs, verifier operation and API version, Audit B approval identity, exact binder and reviewer contract bindings, and launch waves, with `candidateLaunchApproved: false`. It is delivered through `PrelaunchPackageVerificationReceipt` input ports, never through `contextSources`, and therefore does not affect Audit B package identity. Final cross-package authorization must bind the receipt's exact path, raw digest, byte count, and outcome as well as the exact semantic handoff. Candidate A approval remains separate and later. These are reference-host and dogfood duties, not V11 core runtime effects.

### Regression Coverage Expectation

Focused coverage must prove receipt construction and exact field closure; approval-bound B verification; Candidate A reconstruction without approval; binder and reviewer receipt ports; exclusion from `contextSources` and package identity; `candidateLaunchApproved: false`; exact manifest contract and wave bindings; and final authorization binding both receipt and handoff bytes. Negative cases must reject missing, malformed, duplicate-key, unknown-field, oversized, relocated, non-`PASS`, stale-pair, stale-approval, stale-agent, stale-wave, bidi-control, byte-mutated, or Candidate-A-approving receipts. A binder `fix` must continue to prevent Wave 2 and Candidate A launch.

## Attempt 19 Precompile Failures

### Evidence And Classification

Three fail-closed controls prevented revision-19 evidence generation: strict JSON rejected a literal `\n` suffix, checkout-canonical verification rejected one mixed CRLF, and Audit B compilation rejected camelCase receipt-port identifiers. The first two are host artifact-preparation defects. The third is an integration-contract defect in the reference host and its focused test coverage. No revision-19 digest pair was accepted, approved, launched, or integrated.

### Confirmed Causes

1. The ad hoc tuple-refresh command encoded a newline escape as payload bytes instead of writing an LF terminator.
2. A manual documentation edit preserved one CRLF despite the repository's explicit LF checkout policy.
3. The new `verificationReceipt` port name did not satisfy the shared identifier grammar, while focused tests inspected only its artifact type and never compiled the generated Audit B GoalContract.

### Causal Fix And Regression

The frozen GoalContract now ends in one LF; the review protocol is LF-normalized; the receipt port is named `verification-receipt`; and the reference-host suite requires `compileAgentBlueprints` to accept the complete generated Audit B goal. Build and the focused suite pass 24/24. The complete pre-candidate gate, source snapshots, and all 40 source tuples must be refreshed after these corrections before any revision-19 package identity is presented for approval.

## Attempt 19 Lone-Surrogate Authorization Failure

### Incident

Revision 19 passed its separate prelaunch audit, preparation, algorithm/lifecycle review, and fresh product/API review. Security/trace returned `REVISE` before integration because the final launch-authorization validator accepted malformed Unicode in a closed semantic handoff. Release independently returned `FIX`; no Wave 3 integration agent launched.

### Stable Evidence

- Candidate A pair: `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807` / `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed`.
- Security handoff: `evidence/dogfood/handoffs/security-trace-review-revise-attempt-19.json`.
- Independent sibling handoffs: `algorithm-lifecycle-review-pass-attempt-19.json`, `product-api-review-pass-attempt-19b.json`, and `verify-release-fix-attempt-19.json`.
- Direct reproduction used the exported `verifyLaunchAuthorization` with a fully bound synthetic receipt, handoff, and authorization. A handoff containing escaped `\ud800` in `summary` returned success, and `JSON.parse` retained the lone `0xD800` code unit.

### Confirmed Cause

`safeHandoffText` delegates to `containsUnsafeHandoffCharacters`. That scanner rejected C0, DEL, C1, and Unicode bidi formatting controls, but not U+D800-U+DFFF. `JSON.parse` permits escaped lone surrogates, and UTF-8 byte measurement replaces them rather than proving scalar validity. JavaScript `for...of` yields an unpaired surrogate as a code point in U+D800-U+DFFF; a valid high/low pair is yielded as one code point above U+FFFF.

### Causal Fix And Regression

Reject U+D800-U+DFFF in the shared handoff scanner. Exercise the real authorization verifier with lone high and low surrogates in all fields routed through the scanner: destination, goal ID, reviewer agent ID, summary, assumptions, risks, follow-ups, and artifact content. Keep a positive case proving a valid supplementary-plane pair remains accepted. These tests bind the failure to final launch authorization rather than only to a helper predicate.

### Residual Gate

Any bound source correction retires revision 19. Archive its immutable package and control evidence, increment the GoalContract to revision 20, refresh source tuples and snapshots, rebuild Candidate A and separate Audit B, obtain fresh digest-bound approvals, repeat the two-phase prelaunch audit and all Candidate A specialist lanes, then complete release and immutable post-integration replay before acceptance.

## Attempt 20 Handoff Privacy And Path Failure

### Incident

Revision 20 completed separate Audit B approval and semantic review, Candidate A approval, preparation, algorithm/lifecycle review, and product/API review. Security/trace returned `REVISE` before integration. Release verification had already passed its initial matrix, then returned source-freshness `FIX` after the causal correction changed bound source bytes.

### Stable Evidence

- Candidate A pair: `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406` / `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025`.
- Security handoff: `evidence/dogfood/runs/attempt-20/handoffs/security-trace-review-revise-attempt-20.json`.
- Release handoff: `evidence/dogfood/runs/attempt-20/handoffs/verify-release-fix-attempt-20.json`.
- The full retired control set is preserved under `evidence/dogfood/runs/attempt-20/`.

### Confirmed Causes

1. `safeHandoffText` checked length and selected controls but did not call the shared high-confidence secret detector.
2. One multiline-safe predicate served both metadata and Markdown, explicitly allowing TAB, LF, and CR in every handoff field.
3. `inspectRelativeArtifactPath` rejected controls and traversal but did not reject lone UTF-16 surrogates before host path resolution.

### Causal Fix And Regression

The host now has explicit metadata and Markdown policies. Metadata rejects every C0 control; Markdown permits LF but rejects TAB and CR; both reject high-confidence secrets. The variable handoff path passes the metadata/privacy policy and the generic path validator. A shared `containsLoneSurrogate` predicate now protects explicit and relative paths and is reused by compiler text scanning.

Focused tests cover secret canaries and TAB/LF/CR in every metadata field, secret/TAB/CR Markdown, high and low surrogate authorization paths, high and low surrogate project paths, raw invalid UTF-8, and valid supplementary Unicode. Focused suites pass 65/65; the full kernel passes 353/353; format, lint, and typecheck pass.

### Residual Gate

The correction retires rather than repairs revision 20. Revision 21 must refresh the immutable spec and active-context snapshots, add the path regression source to the candidate ledger, bind all 41 repository sources, rebuild both packages, obtain fresh approvals, repeat Audit B and every Candidate A lane, complete integration, and reconstruct the approved pair before acceptance.

## Attempt 21 Package Reproducibility And Verification-Harness Failure

### Incident

Revision 21 passed the separate prelaunch audit, preparation, product/API review, and security/trace review. Algorithm/lifecycle returned `REVISE` for package-byte nondeterminism, and release returned `FIX` because the complete checker matrix did not terminate within 900.5 seconds. Integration did not launch.

### Stable Evidence

- Candidate A pair: `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266` / `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`.
- Algorithm handoff: `evidence/dogfood/runs/attempt-21/handoffs/algorithm-lifecycle-review-revise-attempt-21.json`.
- Release handoff: `evidence/dogfood/runs/attempt-21/handoffs/verify-release-fix-attempt-21.json`.
- The complete retired control set is preserved under `evidence/dogfood/runs/attempt-21/`.

### Confirmed Causes

1. Canonical digest construction sorted object keys, but normalization used object spread for nested requirements, context uses, assumptions, unresolved decisions, and optimization costs. JavaScript retained caller insertion order in the normalized compilation, so deep equality and canonical digest tests passed while ordinary JSON and rendered package bytes varied.
2. The checker regression harness copied a 20,934,318-byte repository fixture for each of 119 serial cases. Feature evidence alone contributed 14,963,316 bytes even though the checker never inspects those trees. Repeated full materialization plus serial process execution made the gate operationally unbounded on the Windows/OneDrive host.

### Causal Fixes

1. Reconstruct each closed nested record explicitly in schema order before compilation identity or rendering. Compare `JSON.stringify` output, the complete rendered file map, and `packageDigest` under logical object-key and array permutations.
2. Build a thin baseline that excludes generated evidence, maintain four hard-linked fixture slots, use atomic copy-on-write for mutations, restore only changed paths, remove newly created empty directories, and run four checker processes concurrently. Preserve every case's exact exit and diagnostic assertion.

### Verification And Residual Gate

The compiler permutation suite passes 38/38, the complete kernel passes 353/353, and format, lint, typecheck, build, and PowerShell parsing pass. The complete checker matrix passes 119/119 in 213.3 seconds. These results validate the live corrected tree but cannot revive revision 21. Revision 22 must bind the corrected bytes into new Candidate A and Audit B packages and repeat every independent gate before integration.

## Attempt 22 Public Diagnostic Scalar And Privacy Failure

### Incident

Revision 22 passed Audit B, preparation, product/API, algorithm/lifecycle, and complete release verification. Security/trace returned `REVISE` before integration because exported diagnostic fields could preserve malformed Unicode and secret-shaped artifact text.

### Stable Evidence

- Candidate A pair: `sha256:642ad0726e8019231d6e357a8602c387a47a637d2ce94fc0701efedaf1ae5869` / `sha256:8ddb1130c6af875f708fb347d46473d532dec0ff796834869ee644f6ee488bbc`.
- Security handoff: `evidence/dogfood/runs/attempt-22/handoffs/security-trace-review-revise-attempt-22.json`.
- Release handoff: `evidence/dogfood/runs/attempt-22/handoffs/verify-release-pass-attempt-22.json`.
- The complete retired control set is preserved under `evidence/dogfood/runs/attempt-22/`.

### Confirmed Cause

`safeArtifact` in `src/diagnostics.ts` rejected path-shape and control hazards but did not call `containsLoneSurrogate` or `containsHighConfidenceSecret`. `safePointer` rejected controls and secrets token by token but did not call `containsLoneSurrogate`. Because `createDiagnostic` and `parseJsonBuffer` are exported and contained-read failures forward candidate names into diagnostics, downstream semantic-handoff validation could not close this earlier public evidence boundary.

### Causal Fix And Regression

Apply the shared lone-surrogate predicate to artifacts and decoded pointer tokens, and the shared high-confidence secret detector to artifacts. Keep valid supplementary pairs accepted. Add regressions for direct high/low surrogate and secret artifacts, parser-mediated artifacts, pointer truncation, a secret-bearing contained missing-file path, and valid supplementary Unicode.

The pre-fix public reproduction emitted the unsafe values verbatim. After correction, artifact output is `.`, unsafe pointer output is empty, the secret canary is absent, and valid supplementary text remains unchanged. Focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build.

### Residual Gate

The source correction retires revision 22. Revision 23 must add the diagnostic regression source to the immutable context ledger, refresh snapshots and every tuple, rebuild and separately approve Candidate A and Audit B, repeat both audit waves and every Candidate A lane, then complete integration and post-integration reconstruction.

## Attempt 23 Delimiter-Spanning Diagnostic Privacy Failure

### Incident

Revision 23 passed separate Audit B binding and semantic reconstruction, Candidate A preparation, product/API review, algorithm/lifecycle review, and complete release verification. Security/trace returned `REVISE` before integration because exported pointer sanitization could preserve a high-confidence secret assembled across JSON Pointer token boundaries.

### Stable Evidence

- Candidate A pair: `sha256:36ebb90c8420a368e4246ce22e7804a0952396c526c36b3b498436d2919f20b6` / `sha256:232d928ae4e0e92f9cc2e25a611df8c6922eefe343a6ba7dee0f7aabccae99bc`.
- Security handoff: `evidence/dogfood/runs/attempt-23/handoffs/security-trace-review-revise-attempt-23.json`.
- Release handoff: `evidence/dogfood/runs/attempt-23/handoffs/verify-release-pass-attempt-23.json`.
- The complete retired control set is preserved under `evidence/dogfood/runs/attempt-23/`.

### Confirmed Cause

`safePointer` decoded and validated one token at a time, including a high-confidence secret check on each token. It then appended the original token without checking the cumulative pointer that `createDiagnostic` would actually return. A first token such as `password=` or `Bearer ` was not itself a complete secret, and a following value token was not secret-shaped alone, but the slash-delimited combination matched the shared detector.

### Causal Fix And Regression

Before appending a token, construct both the cumulative emitted pointer and the cumulative decoded semantic pointer. If either matches the shared detector, stop and return the longest prior safe prefix. Dedicated regressions cover generic credential assignment and Bearer canaries split across tokens and assert that the safe prefix remains while the value suffix is absent.

The pre-fix public reproduction returned both complete canaries unchanged. After correction, it returns `/safe/password=` and `/safe/Bearer `, and neither result matches the detector. Focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build.

### Residual Gate

The source correction retires revision 23. Revision 24 must refresh immutable snapshots and source tuples, rebuild and separately approve Candidate A and Audit B, repeat both audit waves and every Candidate A lane, then complete integration and post-integration reconstruction.

## Attempt 24 Prelaunch Handoff Contract Contradiction

### Incident

Revision 24 compiled and approval-verified Candidate A and Audit B and preserved a `pass` package-verification receipt. Before launching Audit B, host inspection found that no closed semantic handoff could satisfy both the selected reviewer blueprint and launch-authorization validator.

### Stable Evidence

- Candidate A pair: `sha256:05fd18cc50e06f872cb9f1a4229970206c2a27383ad8d7f64024f7f7f9d5c9c8` / `sha256:6748f967eb5f091fbc2f25b00ab9dc8a5fe255dd49d26492fcbea00fe9981573`.
- Audit B pair: `sha256:fe6e200e0d5d5af4f3f077353320b240569699ef83a882204c077ed3dbb5350e` / `sha256:268cbeab032a8b78e56fcb29f8526ad6ff75d4745524617ba04cca75dd83ccd1`.
- Receipt digest: `sha256:d2ccec5d441d57a1d3544a7a665773ec97b8db6082c87653ed4e8db636312473`.
- No external audit or Candidate A agent was launched and no specialist result was integrated.

### Confirmed Cause

`compileAgentBlueprints` correctly advertised the standard specialist handoff fields, including `agent` and `compilationDigest`. The older custom `PrelaunchAuditHandoff` validator used a closed top-level key set with `reviewer`, `candidate`, and `prelaunchAudit`, but omitted and rejected the two standard fields. The package contract and host admission contract had evolved independently.

### Causal Fix And Regression

Make the custom envelope a closed superset. Require `agent` and `compilationDigest` alongside the audit-specific bindings. Validate standard field shape and safety, require `agent` to equal the selected Audit B reviewer, require `compilationDigest` to equal Audit B's approved compilation, and independently require the audit-specific duplicates to equal the same values. Update the two-phase example and stop condition.

Focused prelaunch coverage passes 29/29 and includes malformed, non-PASS, unsafe metadata, unknown field, unrelated reviewer, stale candidate, mismatched standard agent, mismatched blueprint, stale standard compilation, and duplicate-evidence cases.

### Residual Gate
Revision 24 cannot be revived because the correction changes the launch contract and bound source bytes. Revision 25 must regenerate and independently approve both packages, recreate the external receipt, execute a fresh Audit B, and authorize Candidate A only from the exact closed superset handoff.

## Attempt 25 README Public-Contract Regression

### Incident

Revision 25 corrected the prelaunch envelope, compiled and approval-verified Candidate A and Audit B, produced a `pass` external package-verification receipt, and passed the complete 364-test kernel. Before any Audit B result was accepted, the repository workflow checker rejected the shortened README. One binder was interrupted before handoff; Candidate A was never authorized or launched and no integration occurred.

### Stable Evidence

- Candidate A pair: `sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404` / `sha256:1c7e875c0aad3c1b4a0987b14ec9be57b73c533c03779236889ce547db3e5af8`.
- Audit B pair: `sha256:3cdf00aaa53b2d4b0a3a72789a6d654b49e4cbfbbd58e9b6a45c085ee05483a6` / `sha256:bc806f5007a87f2c5363c3cd0f3c35371e0c8ed6dda7ad46003ac88dd4fc7dac`.
- Receipt digest: `sha256:50ffa198a0cf1f7cb44211318a3f476bcb2da1773d26654a8b7dfd9eadb69267`.
- Retirement record: `evidence/dogfood/runs/attempt-25/retirement.json`.
- Accepted specialist results: zero.

### Confirmed Cause

The concise README rewrite optimized the visible V11 story but treated older public documentation as disposable prose. It removed stable headings, the source-checkout `init` path, active links to the minimal project and bounded executor contract, and exact statements separating V10 capability from external-host effects. Those anchors were already enforced by `scripts/check-template.ps1`, so the source candidate and repository contract disagreed.

### Causal Fix And Regression

Restore the stable workflow headings while keeping the six-step explanation and first-run flow concise. Restore the existing-kernel init, validate, and inspect commands, active minimal-project and executor-boundary links, and exact external-host/non-effect statements. Add R29 and AC18 to make the compatibility obligation visible in the feature package. The immediate template-checker rerun passes.

### Residual Gate

Revision 25 remains retired because README, spec, test plan, task package, active memory, and source digests changed. Revision 26 must freeze those exact bytes, rebuild and separately approve Candidate A and Audit B, repeat the independent semantic audit and all Candidate A lanes, verify transitive fan-in, integrate only exact `PASS` handoffs, reconstruct both identities, and run the full release matrix before publication.

## Attempt 26 Generated Handoff Contract Gap

### Incident

Revision 26 compiled and approval-verified Candidate A and Audit B and preserved a passing external package-verification receipt. One authenticated Audit B binder then returned JSON that matched the advertised top-level fields but copied the different nested shapes from the blueprint. The strict public handoff verifier rejected the exact raw result with `SC4310`. The checker matrix separately matched 118/119 cases and identified one stale expected diagnostic. No semantic reviewer or Candidate A specialist launched, zero results were accepted, and no integration occurred.

### Stable Evidence

- Candidate A pair: `sha256:f3658ec182621f9a3485915cd260046d70e7fb1dcd84770f5b03ed3c9d05bb8e` / `sha256:f888a1a784d203d51bcb5d780b71167e0012662d30cec3dbab0d6e34afcab13a`.
- Audit B pair: `sha256:9823e1919504fd757584f8eb24f2720c8ff34df4834e52a3d3a096a34304115f` / `sha256:3661bf2fcdfeaa88f43bf5fdf22b9f6c54f7ac908d70e96540b03f56714be1d1`.
- Receipt digest: `sha256:61884e10b8bf190b102ead9d6fab0c5e9ea24326155142fbaa2f6975d2db6716`.
- Invalid raw binder digest: `sha256:72e5af3d45abe6b4de0b48bde25fc63bc91307a1320df5f742b64f379b261ae4`.
- Retirement record: `evidence/dogfood/runs/attempt-26/retirement.json`.

### Confirmed Cause

The generated agent contract embedded the full blueprint and listed the handoff's required top-level field names, but it did not define the closed nested artifact and evidence records. The binder reasonably reused nearby blueprint structures: JSON artifact content became an object, `mediaType` was absent, and evidence omitted `status` and artifact references. A schema that exists only elsewhere in the repository is not a self-sufficient execution contract. Separately, the checker fixture replaced the line containing both required links but hard-coded only the AGENTS diagnostic even though link order made the missing handbook link the deterministic result.

### Causal Fix And Regression

Render one concrete closed `SpecialistAgentHandoff` JSON block in every agent contract. Bind exact goal, compilation, agent, destination, work units, artifact names, and evidence duties; keep artifact content string-valued; and include every required nested field. Extract every rendered example in the compiler suite, assert exact nested keys, and pass it through `verifySpecialistHandoff` against the rendered package. Update the checker fixture to expect the handbook-link diagnostic that its mutation actually produces.

### Residual Gate

Revision 26 remains retired because the rendered contract, tests, feature package, and source bindings changed. Revision 27 must rebuild and separately approve Candidate A and Audit B, repeat the binder and independent semantic audit, launch Candidate A only after exact cross-package authorization, verify every raw specialist handoff and fan-in, integrate accepted outputs, reconstruct both package identities, and pass the canonical release matrix.

## Attempt 27 Public Package And Handoff Boundary Failures

### Incident

Revision 27 passed the separate two-package prelaunch audit and launched the exact Candidate A fan-out. Preparation and algorithm/lifecycle passed. Product/API, security/trace, and release verification independently returned `FIX`, so complete machine fan-in remained non-integration-ready and the integration agent did not launch.

### Confirmed Causes

1. `package.json` advertised both specialist leaf schemas but omitted the package-owned `common.schema.json` each leaf references. Source tests registered common directly, while the packed consumer checked only leaf resolution and therefore did not exercise the supported public dependency closure.
2. Artifact scanning removed TAB, LF, and CR before calling the control predicate. This made CR and CRLF acceptable in evidence even though the contract permits normalized LF only. Package-bound verification compared artifact names but did not compare each supplied media type with the deterministic type rendered for that name.
3. The JavaScript packed-host approval was refreshed after the rendered contract changed, but the separate TypeScript fixture retained the previous package digest. Canonical verification reached the installed host and correctly rejected the stale approval.

### Causal Fix And Regression

Expose `swecircuit/schemas/common.schema.json`; resolve all three schema resources from a clean installed package; and compile both advertised schemas and every definition in one strict Ajv 2020 registry. Share deterministic artifact-media derivation between renderer and verifier, reject every artifact-content control except LF, and add exact CR, CRLF, TAB, media-substitution, and LF-positive regressions. Keep both packed hosts on one externally retained digest pair and make each host derive the artifact media from its declared name.

Focused compiler, schema, and handoff coverage passes 54/54. Lint, typecheck, build, and the clean offline packed-consumer gate pass. The fixes cannot revive revision 27 because they change package exports, verifier semantics, tests, host fixtures, and bound source bytes.

### Residual Gate

Revision 28 must refresh immutable snapshots and every source tuple, rebuild and separately approve Candidate A and Audit B, repeat both audit waves and every Candidate A lane, require machine fan-in `integrationReady: true`, integrate only exact `PASS` results, reconstruct both package identities, and pass the canonical release matrix before publication.

## Attempt 28 Stale First-Run Approval

### Incident

Revision 28 passed the complete two-package prelaunch audit and launched Candidate A. Preparation, algorithm/lifecycle, and security/trace passed. Product/API and release verification independently returned `FIX`, so complete machine fan-in remained non-ready and integration did not launch.

### Stable Evidence

- Candidate A pair: `sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c` / `sha256:7dd562d20096778abcd15601edc4226064865cf418c33f07f8e8ad25878faba0`.
- Audit B pair: `sha256:044b44b21d22e5692a5edfb51de76813c689e8b244c58464d8ab55613a30dc3d` / `sha256:86d47a8b1ead37e6a920472fe153bc0d97b9c0340c59246ab5768c762a8f9c42`.
- Product/API raw handoff: `sha256:e0330955fc96b354ab9146d5e9909f858d7975924763c5ad830e5fd353ac7527`.
- Release raw handoff: `sha256:3444d6506cb7e4842bb2bb53347580876af9cfd249622bb5cad9011c94f4a1fb`.
- Retirement record: `evidence/dogfood/runs/attempt-28/retirement.json`.

### Confirmed Cause

The example approval is an independently retained decision that binds both source identity and the derived package identity. Revision-28 documentation changed `specialist-compiler-contract.md`, but its checked-in approval still named the prior 36,089-byte source and prior digest. The example correctly failed before compilation, and the canonical test correctly stopped release. The freeze process refreshed broad dogfood source tuples but did not regenerate this separate retained approval.

### Causal Fix And Regression

Regenerate the complete approval through the read-only `--derive-approval` path, updating the current 36,449-byte source binding and the resulting compilation/package expectation pair together. Add R34 and AC23 so candidate freeze explicitly treats checked-in approvals as retained owner decisions. The normal example now approval-verifies and both focused first-run tests pass, including stale-source rejection.

### Residual Gate

Revision 28 remains retired because the approval, feature package, active memory, and source bindings changed. Revision 29 must rebuild and separately approve Candidate A and Audit B, repeat Audit B and every Candidate A lane, require machine fan-in `integrationReady: true`, integrate only exact `PASS` results, reconstruct both package identities, and pass the complete canonical release matrix before publication.

## Attempt 29 Authorization Summary And Reference-Host Boundary Failures

### Incident

Revision 29 passed the complete two-package prelaunch audit, candidate preparation, algorithm/lifecycle review, and canonical release verification. Product/API and security/trace returned independent `FIX` outcomes. Complete fan-in was non-ready, so integration did not launch.

### Stable Evidence

- Candidate A pair: `sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da` / `sha256:1e3afc96dc43950e21b3db94752a6f6fe9c33931ab36b0ce4a2adc2229a59994`.
- Audit B pair: `sha256:17d7985ed3c4d0f817550b29d9b95308d11a5acaf13dabdee288e3b1d692742d` / `sha256:807d04eb877751acbe4802ccf147bf0853ac4df3390a953ed4669fc572bbbfb7`.
- Product/API raw handoff: `sha256:04b3471e18061a942b67ee375938c4f8df6cbbae2835f839cf09913f532de1dc`.
- Security/trace raw handoff: `sha256:800805171e23a8eef38d13861f345dc630ab4cd76a7856aa1d72b1c310b2dd5d`.
- Final fan-in: `sha256:95168d0fd74ac4e6a21526ddf81d60a5e09a53dd3d4138f4a32678b8b416431f`, `integrationReady: false`.
- Retirement record: `evidence/dogfood/runs/attempt-29/retirement.json`.

### Confirmed Causes

1. The normative two-phase protocol had evolved to require a host-created `PrelaunchPackageVerificationReceipt`, but two shorter authorization summaries retained the older two-artifact description. The detailed protocol and implementation agreed; duplicated summary prose drifted and could guide an external host to create an incomplete final authorization record.
2. The read-only example treated approval and source paths as trusted setup. It used plain `JSON.parse`, checked paths lexically, and then used ordinary filesystem reads. Existing kernel helpers already enforced strict duplicate-aware JSON and canonical contained-file identity, but the reference host had not adopted them. Its tests covered only normal and stale approval paths, leaving parser ambiguity, privacy, non-file input, and link or junction escape unexercised.

### Causal Fix And Regression

Make both summaries state the same closed receipt and semantic-handoff bindings as the normative protocol. In the example host, read retained approval bytes through a bounded regular-file boundary; parse strict UTF-8 with duplicate detection; enforce exact keys recursively; reject unsafe, non-scalar, secret-bearing, absolute, wildcard, stream, dot-segment, or separator-confused source paths before I/O; and read repository sources through the existing canonical contained-file helper. Sanitize failure text so untrusted path content is not echoed.

The first-run suite now has seven cases covering deterministic success, stale approval, malformed/duplicate/oversized JSON, unknown nested fields, unsafe and privacy-sensitive path forms, directory and external-junction targets, and secret-bearing approval paths. All 7/7 focused tests pass on the corrected tree.

### Residual Gate

Revision 29 remains retired because the protocol summaries, example host, tests, feature package, active memory, and retained approval bytes changed. Revision 30 must rebuild and separately approve Candidate A and Audit B, repeat Audit B and every Candidate A lane, require machine fan-in `integrationReady: true`, integrate only exact `PASS` results, reconstruct both package identities, and pass the complete canonical release matrix before publication.

## Attempt 30 Release-Host Authority Fix

### Incident

Revision 30 release attempt 30a returned `FIX` before canonical gates because preflight spawned `rg.exe` and `whoami.exe` outside that specialist's declared process authority. The exact Candidate A and Audit B trust chain remained valid, no candidate source or evidence bytes changed, and no release result was accepted from 30a.

### Confirmed Cause

The failure was host-invocation scope drift, not a compiler or candidate defect. The preflight selected convenient inspection executables that were absent from the release blueprint's closed `process.spawn` demand.

### Bounded Correction And Verification

Restart the exact release work unit without changing candidate inputs, use only its declared executables, retain temporary and cache writes inside its authorized roots, and rerun every release gate. Exact retry 30b authenticated all declared sources before and after execution and passed 119/119 checker cases, 133/133 focused regressions, 370/370 canonical tests, package dry run, installed-consumer compatibility, and committed V11 evidence replay. Its 9,948-byte `PASS` handoff is `sha256:2d5c1e2dc5e5685933fc6c2b228b3bbb60d77a030f655db93cb0d4f862c3bbd2`.

### Residual Gate

Attempt 30a remains preserved as bounded `FIX` evidence and is superseded only for release acceptance by exact retry 30b. The host preserved the integration handoff, reconstructed both package identities after output edits, passed the final local gates, and archived attempt 30. Commit, push, hosted CI observation, and owner merge review remain.

## Attempt 30 Integration-Output Heading Regression

### Confirmed Cause

The integration specialist shortened the milestone while preserving substantive evidence but omitted two headings required by the repository's milestone contract. Package verification cannot detect that repository-local document rule; the template checker correctly rejected the mutable output.

### Causal Fix And Regression

Restore `Why It Matters` and `Next Recommended Work` without changing any immutable Candidate A or Audit B input. The template checker then passed, the complete checker matrix passed 119/119, canonical verification passed 370/370, and post-integration reconstruction retained both approved package pairs.

### Durable Rule

Integration handoff verification proves the compiled envelope, not every repository-local document convention. Final host validation remains mandatory after integration and before archival or publication.
