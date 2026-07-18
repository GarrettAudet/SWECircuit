# Root Cause Analysis

## Status

Reopened through revision-23 independent review. Delimiter-spanning diagnostic secret leakage is confirmed and corrected; focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build. Revision 24 must bind the corrected bytes before fresh packages, approvals, independent acceptance, full release verification, integration, or post-integration replay.

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
