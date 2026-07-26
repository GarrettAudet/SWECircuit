# Debug Notes

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness
alone. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision
53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds
install logs and the private closure. Revision 60's canonical gate failed and is permanently
retired. Revision 68 commit `78f8c99645bb7c505e7e95682c6ab69a13915891` passed exact local
qualification, non-consuming rehearsal, Template Check, and Windows Node 22/24, but is
permanently retired. On 2026-07-24 the owner narrowed v0.1 support to Windows; macOS and Linux are
unsupported and no longer release gates. Revision 69 aligns the support contract and hosted
workflow while retaining the bounded compatibility correction as best effort. Exact Windows
qualification, independent review, copied lifecycle, complete verifier, rehearsal, canonical
gate, fresh R2, milestone, and merge remain; `releaseReady: false`.

## Reproduction

Not applicable at architecture kickoff.

## Evidence

- The first branch creation attempt was denied because Git refs live in the original worktree metadata outside the temporary checkout sandbox.
- The exact `git switch -c codex/v12-ide-run-loop` operation succeeded after bounded escalation.

## Stable Evidence

- The template checker rejected the first feature package with eleven exact missing-heading diagnostics.
- No code, package, or runtime behavior was involved in that failure.
- The first package-approval command stopped with `TypeError` before writing approval or launching an agent.
- The preserved package envelope exposes root `compilationDigest` and `packageDigest` fields and no `compilation` object.

## Failure Classification

Workflow artifact conformance and host integration mismatch: `fix`, then `diagnose`.

## Hypotheses

- Confirmed: the dogfood host copied a nonexistent nested path from an assumed envelope shape.
- Rejected: compilation or package rendering omitted the digest; both exact root digest fields are present.

## Experiments

- Add only the required structural headings and rerun the same checker.
- Read the preserved envelope keys without mutation, correct only the field access, require both digest strings, and rerun approval-bound verification.

## Next Diagnostic Trigger

Enter `diagnose` if compilation, package verification, raw handoff verification, fan-in assessment, or integrated verification fails non-obviously or repeatedly.

## Foundation Attempt 1

### Reproduction

Launch the approval-bound Foundation Revision-1 contract from the temporary `C:\tmp\swecircuit-identity-main` worktree and attempt its first scoped edit with native `apply_patch`.

### Evidence

- All 22 declared sources matched their exact byte and SHA-256 bindings.
- Native `apply_patch` failed before mutation with the recurring Windows sandbox refresh error.
- Wrapper and escalated wrapper invocations were denied.
- All six target files remained unchanged.
- The exact 3,776-byte handoff verified through V11 with outcome `block` and raw digest `sha256:81471e5dd7363a856e0825b35c337aa7bd0ac507b5e9b39d34418eed71aca008`.

### Classification

Host edit-capability mismatch: `block`, then revise the reviewed execution authority without changing product scope.

### Next Action

Compile Foundation Revision 2 with the same source and write ceiling plus explicit permission for a precondition-hash-guarded PowerShell fallback only after native `apply_patch` fails before mutation.

## Foundation Revision 2 Integration

### Reproduction

Run the complete existing kernel test suite after the package-bound Foundation Revision-2 handoff verifies `pass`.

### Evidence

- Format, lint, typecheck, and build passed independently.
- The suite passed 369 of 370 tests.
- `test/json-kernel.test.mjs` rejected the five new runtime diagnostic definitions because `schemas/v1alpha1/diagnostic-catalog.json` still ends at `SC4313`.
- The six-file Foundation authority did not include the normative catalog, and no Foundation file needs correction.

### Classification

Cross-phase ownership omission: `fix` the downstream public-integration contract before compiling it. This is not a recurring product defect and does not justify patching the verified Foundation output.

### Next Action

Add the normative diagnostic catalog to the public-integration source and write scope, retain the failing test as a required downstream gate, and continue only after independent Foundation review finds no in-scope defect.

## Foundation Boundary Classification

### Reproduction

Create a valid empty session from the exact approved Foundation Revision-2 package, add one schema-valid accepted row whose canonical 1,398,104-character base64 value decodes to 1,048,578 bytes, recompute the session digest, and restore it.

### Evidence

- Declared `rawHandoffBytes`: 1,048,576.
- Declared `rawHandoffBase64Chars`: 1,398,104.
- Actual decoded probe size: 1,048,578.
- Actual diagnostic: `SC4401`.
- Required diagnostic for raw resource excess: `SC4402`.

### Classification

Confirmed Foundation resource-boundary classification defect: `fix`.

### Root Cause

`decodeCanonicalBase64` collapses malformed encoding and decoded-byte overflow into one `null` result, so `validateAcceptedHandoffs` cannot preserve the contract's distinct invalid-input and resource-limit routes.

### Smallest Causal Fix

Return a bounded decode result that distinguishes invalid encoding from decoded-byte overflow, map only overflow to `SC4402`, and add a real-package regression proving both classifications without changing the wire contract.

### Verification

- Foundation Revision 3 returned an exact package-verified 3,405-byte `pass` handoff with `phaseReady: true`.
- The focused real-package test proves decoded overflow emits `SC4402` and malformed canonical binding emits `SC4401`.
- Independent format, lint, typecheck, build, and focused test gates passed after deterministic integration formatting.
- The full suite passed 370 of 371 tests; only the separately routed diagnostic catalog parity gate remains red.

## Public Integration Approval Refresh

### Reproduction

Run the complete test suite after the public V12 exports and diagnostic catalog update.

### Evidence

- Runtime/catalog parity passed and all V12 tests passed.
- The suite passed 375 of 376 tests.
- The sole failure was `first-run specialist example is deterministic, approval-bound, and read-only` with `Context source mismatch.`
- `examples/specialist-compiler/approval.json` bound `src/index.ts` at 4,688 bytes and `sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b`; the reviewed additive V12 export surface is 5,447 bytes and `sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f`.

### Classification

Expected approval maintenance after an intentional public-source change: `fix`. This is not a V12 runtime defect or a V11 identity change.

### Confirmed Cause

The example correctly failed closed because its exact source approval predated the additive V12 root exports. The dependent example compilation and package digests therefore also changed.

### Smallest Causal Fix

Use the example's deterministic `--derive-approval` operation, review the exact result, and refresh only the source bytes/digest plus dependent compilation/package expectation in `examples/specialist-compiler/approval.json`.

### Verification

- Focused first-run suite: 7 of 7 passed.
- Complete kernel suite: 376 of 376 passed.
- Dry-run package inspection passed.
- Clean offline installed-consumer verification passed.

### Deferred Evidence Refresh

V11 dogfood evidence binds live repository sources that the remaining V12 verification wave will still change. Refresh and independently verify that evidence only after those edits settle; an earlier refresh would be immediately stale.

## Verification Portability Correction

### Reproduction

Review the new public schema-export assertion for behavior on Linux CI after its specialist handoff verifies on Windows.

### Evidence

- The assertion ended the resolved file path with `schemas\\v1alpha1\\specialist-run.schema.json`.
- The focused 9-test verification suite passed on Windows.
- Linux resolves the same package export with `/`, so the assertion would fail before testing product behavior.

### Classification

Test portability defect: `fix`. Production code, schema resolution, and package exports are unaffected.

### Smallest Causal Fix

Normalize backslashes to slashes in the assertion and compare the portable package-owned suffix.

### Verification

- Focused schema and adversarial suite: 9 of 9 passed.
- Biome check and dogfood script syntax check passed.
- V12 dogfood produced two byte-identical reports.

## V11 Source Freshness

### Reproduction

Run `npm.cmd run verify` after all V12 implementation, tests, public guidance, and dogfood files settle.

### Evidence

- Format, lint, typecheck, all 385 tests, the public example, and V10 dogfood passed.
- V11 dogfood stopped at `context.constants` before compilation because its approval-bound GoalContract expected the pre-V12 2,088-byte source and received the reviewed 2,571-byte V12 source.
- Exact comparison found 10 intentional mismatches among 57 source bindings: constants, packed-consumer check and host, diagnostic catalog and runtime definitions, first-run approval, IDE kickoff, root exports, package metadata, and schema guidance.
- The remaining 47 source bindings match exactly.

### Classification

Expected approval freshness failure after intentional bound-source changes: `fix`. This is evidence that the V11 gate fails closed, not a V12 runtime defect.

### Next Action

Freeze the V12 verification checkpoint, refresh only the 10 exact tuples in a new V11 dogfood revision, reconstruct and separately approve Candidate A and Audit B, require the closed semantic audit handoff, and rebuild launch authorization before rerunning the canonical gate.

## Module Contract Conformance

### Reproduction

Run the repository template checker after integrating `docs/modules/specialist-run-session.md`.

### Evidence

- The guide contained the correct interface fields in one table.
- The checker required non-empty `Purpose`, `Input`, `Action`, `Output`, `Gate`, `Outcome`, `Artifacts`, and `Adapter` sections for every module contract.
- No runtime, schema, test, package, or public API file was implicated.

### Classification

Documentation contract-shape defect: `fix`.

### Smallest Causal Fix

Replace the interface table with the eight required headings while preserving the same semantics and host boundary.

### Verification

The repository template checker passed on rerun.

## V11 Trust-Root Revision 32

### Reproduction

Refresh the V11 dogfood evidence after the 10 intentional V12 source changes, then require the complete Candidate-A and independent Audit-B approval chain before rerunning the canonical gate.

### Evidence

- The reviewed GoalContract is 101,219 bytes with raw digest `sha256:55d7d298be4d565ea07e971d33447531166e5d4b20d380044ac2295aa365db93`.
- Candidate A binds compilation `sha256:f267fec5a479297e8b35f5f56c19014cfc6f840379643b09219d8442e3f2c032` to package `sha256:21ec2ef20b2e246b12b31f371391faa6d1a4a3fefb0cb65bd0e537ca8a8fbc73`.
- Audit B binds compilation `sha256:9a457e8f7e42ae8612d4634a2af6116e73a87be249727e318ac56029e74ada02` to package `sha256:e3442404af6f797de723273a94c97bd5427ae22505468f4ffd5ad410fd2c9e7e`.
- The package-verification receipt is 2,255 bytes with raw digest `sha256:ec3b6097f49dd779add089bdeb6aca817ad0cec99f6c64c7919b8bfed6b522d2` and outcome `pass`.
- The exact binder and semantic-audit handoffs are 9,801 and 11,662 bytes with raw digests `sha256:d9e848309c816cb244e6b21d14d7ec196626729c768cfee582f57a691da2f06b` and `sha256:8491f7964081601fc42a1bc1e3ad095c30fc3adf7999d827008939ef2d5444b2`.
- Launch authorization binds both package pairs, the exact receipt, and the exact semantic `pass` handoff; its raw digest is `sha256:cf50b7bf37035442aa7e20e02f2fcab8ff2e2f10b89779d6e49d4a698e74bffb`.

### Classification

Expected approval maintenance after intentional bound-source changes: `fix`, then independently re-authenticate. No V11 or V12 runtime defect was found.

### Verification

- `node scripts\run-v11-dogfood.mjs --check-evidence`: pass.
- Repository template checker: pass.
- Complete checker regression matrix: pass.
- V12 dogfood, package dry run, and clean offline installed-consumer gate: pass.
- Canonical `npm.cmd run verify`: pass, including all 385 tests and V10/V11/V12 dogfood.

## Release Review Attempt 1

### Reproduction

Compile three read-only release-review work units over exact candidate `d914b273ba619e3cfa42206c8d9f136be73075e3`, approval-bind the rendered package, launch the complete roster, preserve each raw result, and verify all handoffs through V11.

### Stable Evidence

- Compilation/package: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3` / `sha256:7a809141af324cdea7028fb07ee6ca6cb79daccfbdf319e2fd8b2c1346a007ee`.
- Search: exact, five candidates evaluated, three specialists selected, makespan 9 versus serial 25, zero conflicts.
- Complete raw roster: product 5,819 bytes, lifecycle 5,649 bytes, security 7,259 bytes.
- Every handoff verifies against the approved package and every outcome is `fix`; `releaseReady` is false.

### Compilation Diagnostic

The first two review requests failed closed with `SC4304`. A review artifact is itself `kind: review` with `duty: produce`; `duty: review` denotes review of another producer represented inside the same goal. The frozen candidate producer is external to this audit goal, so its immutable commit and source manifest form the producer boundary.

### Confirmed Findings

- The evidence comparator uses `criterionId` before the V11 requirement identity.
- Lazy JSON Schema loading introduces first-use filesystem I/O into all four public operations.
- Existing tests do not construct the required maximum 16-agent aggregate or prove every published resource constant is reachable.
- The canonical dogfood is an API fixture, not a session over an actual V12 implementation package, and omits the complete AC8 friction record.
- Release review bound a mutable live review file and summary-only verification evidence without a candidate-bound raw canonical-gate receipt.

### Route

`fix`. Preserve attempt 1 unchanged, compile disjoint correction work, dogfood that exact correction package through V12, freeze a new candidate, and repeat all three release reviews.

## Release Correction Revisions 1-5

### Route

Revision 1 returned three exact `pass` handoffs but retired one stale, unlaunched contract. Revisions 2 and 3 returned exact `split` outcomes as cold-operation filesystem reads moved from V12 schema loading into composed V11 validators. Revision 4 bundled immutable schema data for all composed validators and returned `pass`. Revision 5 rebound implementation-package dogfood and immutable R2 release evidence through two disjoint specialists.

### Stable Evidence

- Revision-5 compilation/package: `sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5` / `sha256:c29570501b69f2b791d32890b48bb74d90091e649513d5915c636e1141518717`.
- Exact handoffs: 12,438 bytes at `sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af`; 7,056 bytes at `sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6`.
- Complete package roster: two of two verified `pass`; `phaseReady: true`.
- Integrated verification: build, format, lint, typecheck, template checker, both V12 dogfood modes, and 388 of 388 kernel tests pass.

## V11 Trust-Root Revision 33

### Reproduction

Run V11 evidence replay after revision-5 changes to `src/constants.ts`, composed schema sources, and `package.json`.

### Evidence

- Revision 32 correctly failed closed on stale `context.constants` bytes.
- Revision 33 Candidate A: `sha256:213982e89622636fdc842f446ef3421f7d1c895dc25b59ca560156a3c47248a8` / `sha256:fd5b6e5182fa482fc14bebb5ef5b32cfb551df0e842bd0864e0aa0f9d500807f`.
- Revision 33 Audit B: `sha256:cfc9d4059e83a01cd02cddd4ab62d9bc0363dde46c23da5007cfbcaf1d5931cf` / `sha256:081ff3cafcb6eb80d3387d356853bda669f64673587e43b0fdc01e5080d81493`.
- Receipt: 2,255 bytes at `sha256:097bf81b00ac354f804b55ee0182e058fbe5970c0671cbda8eeef8219a391abb`.
- Binder: 15,438 bytes at `sha256:8164cd7d135899c3b90e8abdd1ce2b5cd571f1957316a7ddc32377196f692c64`.
- Independent semantic audit: 7,481 bytes at `sha256:c9d361744cbec3e3d8c3a8830c5319c58e410e54729238eff19b8ae30b696ae3`.
- `node scripts/run-v11-dogfood.mjs --check-evidence`: `pass`.

### Integration Finding

The R2 harness named revision 32's semantic handoff directly. Integration replaced that attempt-specific source with the exact path bound by the current launch authorization. The candidate-bound R2 reviewers must evaluate this post-specialist correction before acceptance.

## Candidate Canonical Gate Attempt 1

### Reproduction

Run `node scripts/run-v12-release-gate.mjs 989e6ea6da754ecddcf06507567647bd9d84be02` from the clean frozen candidate.

### Stable Evidence

- Receipt: `docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json`, outcome `fail`, exit code 1.
- Raw stdout: 295,768 bytes at `sha256:afb6b266dd504cbf89d2cb55b6f9c5c6872fd5636acef8848e2105257aecef12`.
- Raw stderr: 11,763 bytes at `sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad`.
- `HEAD` remained the exact candidate and tracked state remained clean before and after the gate.

### Competing Hypotheses

- The packed tarball exported a stale V12 constant.
- The reviewed 64 MiB runtime limit was incorrect.
- The clean installed-consumer fixture retained the superseded 128 MiB expectation.

### Confirmed Cause And Route

The built package, `src/constants.ts`, the normative contract, and focused tests all expose 67,108,864 bytes. Only `scripts/check-packed-consumer.mjs` and the live architecture summary retained the superseded raw-input value. The global immutable gate filenames also prevented a corrected candidate from producing a distinct receipt without overwriting attempt 1. Route `redesign`: revision 6 splits consumer/architecture parity from candidate-scoped gate identity, preserves the failure bytes, and requires a new candidate and canonical gate before any reviewer launch.

## Release Correction Revision 6

### Stable Evidence

- Compilation/package: `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998` / `sha256:5acb302e44bb08f8626fb3773ba27acf5af5ae3f3d09d95beea1f2538a46826a`.
- Candidate-gate identity handoff: 5,061 bytes at `sha256:3c95ca87255613bdcb96f0a894a03ce012c4d5662a3379230c07166e56fcf33b`.
- Consumer/architecture parity handoff: 5,291 bytes at `sha256:939099add2852e3dfe14b307fc55e46c89b56a1dd0c735d15bf35e82f99a5a68`.
- Complete package roster: two of two verified `pass`; `phaseReady: true`.
- Candidate 1 receipt and raw logs remain byte-identical at their original paths. Future gate evidence is derived under `canonical-gates/CANDIDATE_COMMIT/`.

### Outcome

`pass`. The 64 MiB raw-input contract is consistent across source, architecture, and the packed consumer, while the independent 128 MiB canonical-session safeguard remains unchanged.

## Candidate Evidence Retention Diagnosis And Revision 7

### Reproduction

Run `git check-ignore -v` for Candidate 1's exact stdout and stderr paths. Both resolved to the global `*.log` rule even though the receipt bound their exact bytes.

### Confirmed Cause

The gate made raw evidence immutable by path and digest but did not make those paths versionable. A local receipt could therefore pass while a fresh clone omitted its source logs.

### Correction And Evidence

- Revision-7 compilation/package: `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920` / `sha256:df3ed49a4d38fdbac275b82036dc4354d6b76bac3b2fa97dfbd385c3fdad85b8`.
- Exact handoff: 5,812 bytes at `sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32`.
- Complete package roster: one of one verified `pass`; `phaseReady: true`.
- Four narrow ignore exceptions expose only legacy and candidate-addressed canonical stdout/stderr logs. Unrelated logs remain ignored.
- Both gate consumers fail closed when any required evidence path is ignored, and their candidate path modes remain byte-equivalent.
- Integration extended the immutable R2 correction lineage through revision 7 and rechecked syntax, path parity, and whitespace.

## V11 Trust-Root Revision 35

### Stable Evidence

- Candidate A compilation/package: `sha256:5af627b5a678bbd268e2170d5b399dc7b898ce9f4b716b1a6ed65d8019b78583` / `sha256:f6d64d94f2834f0fafd2675043114359d4dddac86e8e7add22a8555bdbf598a1`.
- Audit B compilation/package: `sha256:b53beaf3141b90e6cc2631d05327c2b4d57b697c43e974e3bc5ca24325d905eb` / `sha256:9fb651dfda936e332500bf96cb451fda06f1356462723b25402a56d1e11c6b45`.
- Verification receipt: 2,255 bytes at `sha256:892f2097eb39e62371fd3452083cd004d1c5454b040b6242586ee0482f6b8950`.
- Binder: 10,589 bytes at `sha256:a4d8fb4466b38ffa33f141dfa1a5ab87ba5f43b0fb839b682af93426cebcc7be`.
- Independent semantic audit: 7,428 bytes at `sha256:0c11390a4804492f081e0b8e2253e24ae17df3a84785a6ac64e6486b0ae21047`.
- `node scripts/run-v11-dogfood.mjs --check-evidence`: `pass`.

## Approval Portability And Quality-Gate Coverage

### Reproduction

Compare the generated V11 approval bytes with `.gitattributes` and inspect Biome's explicit file list after adding V12 release scripts.

### Confirmed Causes

- The revision-34 approval JSON combined CRLF and LF. Git's required LF normalization would change its raw digest on Linux, invalidating the otherwise passing receipt after checkout.
- Biome directly covered workflow scripts only through V11. A separate stdin workaround for the release gate produced misleading failure behavior once that file became natively included.

### Correction

Approval generation now emits canonical LF UTF-8 bytes. Revision-34 binder output remains preserved as stale attempt evidence; revision 35 rebuilt both approved packages, receipt, binder, semantic audit, and authorization from normalized bytes. Biome now directly includes both V12 scripts, and the redundant stdin quality helper was removed.

### Verification

Revision-35 evidence replay passes exactly. The current full pre-freeze `npm.cmd run verify` passes format, lint, typecheck, all 388 tests, examples, V10/V11/V12 dogfood, package inspection, and the clean installed-consumer gate.

## Candidate Evidence Byte Integrity Revision 8

### Reproduction

After staging Candidate 1's exact raw logs, `git diff --cached --check` treated their process output as text. The staged blobs happened to remain byte-identical locally, but the global `text=auto eol=lf` policy left cross-platform normalization dependent on Git heuristics.

### Correction And Evidence

- Compilation/package: `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef` / `sha256:d655468c5e37171d5ef83af2299bf08291029e9c08751ef056c2d655f24cfb1d`.
- Exact handoff: 8,035 bytes at `sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1`.
- Complete package roster: one of one verified `pass`; `phaseReady: true`.
- Four exact canonical-log patterns are binary; receipts, near misses, sibling paths, deeper paths, and unrelated logs retain normal policy.
- Both gate consumers parse NUL-delimited Git attributes and reject unless raw stdout/stderr have text, diff, and merge unset while the receipt retains normal text policy.
- Worktree, staged blob, would-stage, and checkout-filter bytes match the receipt under normal settings and forced `core.autocrlf=true` with CRLF checkout.
- Integration extends the immutable R2 correction lineage through revision 8.

## Candidate 2 Gate And R2 Preparation

### Canonical Gate

Candidate `4c7695519d274a8e3d939061dfa184b99dc8ac45` passed the exact wrapper. Receipt: 1,335 bytes at `sha256:369ff76efb741a5a21cfd07b715d8f240b0f79fcd57388d6736ee40cf6b76e71`; stdout: 295,955 bytes at `sha256:8d5f11b2034a8d1b3256383c00bbe5598750de50e9bb55702f3897cfa22fee79`; stderr: 25,879 bytes at `sha256:f660f2d1f1e263ab7c3c3880f78d94af974e78671e7c41f303df3589079eafe8`. Pre/post HEAD and tracked state remained exact and clean.

### Preparation Failure

R2 stopped before source snapshots, compilation, approval, or reviewer launch because the revision-35 launch authorization was semantically valid JSON but not the repository's canonical two-space LF serialization. The file was 1,343 bytes at `sha256:8df54c114a4795144df8da2b13111e8571daccee55b8cee05e84b1ec8de5b700`.

### Smallest Causal Fix

Reserialize the same parsed value with the canonical JSON writer. The resulting file is 984 bytes at `sha256:88304c6bcf03b8737af8859ab4096d66bf77f70b88f33c040da0094dc32fe3e5`, and V11 exact evidence replay remains `pass`. Candidate 2 remains immutable and retired; Candidate 3 must repeat the exact gate before R2.

## Candidate 3 Release Review

### Reproduction

Freeze candidate `4ad12367cc0b36ea460ceabc48e5a41ca662e3df`, run its exact canonical gate, and execute the product, lifecycle, and security R2 reviews.

### Stable Evidence

- Canonical gate: `pass`.
- Lifecycle/correctness: `pass`.
- Product/API/IDE: `fix` because verification could consume untracked source.
- Security/trace/authority: `fix` because `.gitattributes`, `.gitignore`, and four specialist schema source files were absent from the approved context.
- Candidate 3 is retired; its preserved identities and available raw handoff are recorded in `evidence/release-review-r2/candidate-3-retirement.md`.

### Route

R9 moved canonical verification into an exact committed-tree materialization and closed the six-source review context. R10 made every later R2 run candidate-addressed, moved snapshot discovery to candidate Git blobs, and replaced the fixed correction ceiling with contiguous lineage discovery.

## R10 Host Runtime Attempts

Two inherited-runtime attempts stalled without handoffs. A fresh attempt failed closed after the host delivered the wrong checkout and then emitted a schema-invalid `block` handoff. The exact rejected 2,592 bytes remain preserved. A fourth attempt retained the same approved specialist contract, received the exact worktree/checkpoint, and used a manually selected `gpt-5.6-sol` plus `high` reasoning profile. Its 5,595-byte `pass` handoff verifies against the R10 package and the focused 5-test lifecycle suite passes.

This is host liveness and runtime-supply evidence, not V12 model-routing behavior. The full attempt trace is `evidence/implementation/release-correction-r10/attempt-history.md`.

## Candidate 4 Exact Gate

### Reproduction

Freeze candidate `eff7d7afd5cb57a655f41803da96d824b9ba3438` and run `node scripts/run-v12-release-gate.mjs eff7d7afd5cb57a655f41803da96d824b9ba3438`.

### Stable Evidence

- Result: `fail`; 392 of 397 tests passed before the canonical command stopped.
- All five failures report that the exact source materialization is not a Git repository.
- Candidate source: tree `b21fb93315684d33dff258e666598f6c28bb20e6`, 1,963 files, 55,546,458 bytes, `sha256:7b5127e589c8b88a005d90c3a6f0b35d4097fdbe85519ed8bab3ff1dd67cca3e`.
- Pre/post source digests match; live HEAD and tracked state remain exact and clean; materialization cleanup passed.
- Receipt and exact raw logs are preserved under `evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/`.

### Classification

Release-environment isolation defect. R9 correctly removed mutable source, but removed the Git object/ref/index context required by R9/R10's own Git-aware regressions. Related-code retrieval also exposed a latent provenance defect: R10 requires post-commit gate outputs to be candidate Git blobs, which no commit can contain under its own hash-addressed path.

### Route

Retire Candidate 4. Revision 11 must provide disposable candidate-bound Git metadata over the exact materialized worktree and must capture gate receipt/log bytes as external immutable R2 evidence rather than self-referential source.

## Candidate 5 Exact Gate

### Reproduction

Freeze candidate `62e51278904b3036971f6fcd40577313f1168e2a` and run `node scripts/run-v12-release-gate.mjs 62e51278904b3036971f6fcd40577313f1168e2a`.

### Stable Evidence

- Result: `fail`; all 399 tests pass before V11 evidence replay stops.
- V11 expected 80,766 CRLF checkout bytes for `scripts/check-template.ps1`, but exact materialization supplied the committed 78,529 LF bytes. The second bound PowerShell checker has the same line-ending-only mismatch.
- Candidate source: tree `925bfd2b9f64d135448b2d2e18adad6e475bf51e`, 1,985 files, 55,943,345 bytes, `sha256:675c00dbfa40be24a43d5a296e8427de4d25add6f8d46b101e9d1f08ab3ab8bc`.
- Post-command source inspection independently rejected an unexpected `.local` directory. Disposable Git context, live HEAD, tracked state, and cleanup remained exact.
- Receipt and raw logs are preserved under `evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/`.

### Classification

Two independent reproducibility defects: checkout-dependent evidence identity and verification-runtime state inside the authenticated source tree.

### Confirmed Causes

- V11 compared retained bindings to raw checkout bytes and explicitly accepted CRLF even though Git clean filtering stores different LF bytes. Exactly two of 57 active context bindings are affected.
- Project npm policy points cache state at `.local/npm-cache`; the canonical child inherited that policy. Release-gate and first-run tests also created temporary descendants without pruning all empty parents.

### Route

Retire Candidate 5. Revision 12 must require byte-stable V11 context sources, bind the attribute policy itself, direct npm runtime cache outside the candidate, and close every test-owned temporary path before Candidate 6 repeats the complete gate.

## Revision 12 Integration And V11 Revision 37

- Revision 12 compiled two disjoint specialists against `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48` / `sha256:26bc2190b4acd7d4fe253228eabad5862d0819717b75b7b7f20e6264dfc4d4ce`; both exact raw handoffs verify `pass` and complete fan-in is ready.
- The source-identity lane removed CRLF evidence acceptance, bound `.gitattributes`, and rebuilt all 58 V11 source bindings. The runtime-purity lane moved npm cache supply outside candidate source, removed only generated `dist`, and closed owned empty scratch parents.
- Focused release-gate tests pass 7/7. V11 and first-run tests pass 38/38. A deliberate empty-cache consumer probe returned `ENOTCACHED`; the intended warm external cache passed package and consumer checks.
- V11 Revision 37 completed its two-phase audit. Candidate A, Audit B, the 2,255-byte external receipt, 7,492-byte dependency handoff, 7,602-byte independent semantic `pass`, 984-byte authorization, and full evidence replay all verify.
- Route: `pass` for correction integration and V11 trust replay. Freeze Candidate 6; do not reuse Candidate 5.

## Candidate 6 Exact Gate

- Command: `node scripts/run-v12-release-gate.mjs 0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7`.
- Result: `fail` after all earlier canonical stages passed.
- Exact source and post-command digests match at `sha256:6bea9eb4e708b506577f3cee47ca36aba9f75abfcb1e660c4569387e3efdacf3`; disposable Git context, live repository state, inspection, and cleanup all pass.
- The installed consumer invoked `ROOT/node_modules/typescript/bin/tsc` inside the intentionally dependency-free candidate materialization.
- Receipt and raw logs are immutable under `evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/`.
- Route: `diagnose`, then `fix`. Candidate 6 is retired and must never be rerun.

## Revision 13 Integration And V11 Revision 38

- Revision 13 selected one specialist because the correction is one atomic three-file responsibility; its exact package and 5,319-byte raw handoff verify `pass`.
- The host validates and supplies one TypeScript entrypoint outside candidate source; the child independently validates and consumes it. Ordinary local runs default to the local installation.
- Syntax, `git diff --check`, the offline installed consumer, and all 9 focused release-gate tests pass.
- V11 Revision 38 rebuilt all 58 source bindings. Candidate A, Audit B, the 2,255-byte external receipt, 10,443-byte binder, 5,827-byte independent semantic `pass`, 984-byte authorization, 31/31 focused tests, and complete evidence replay all verify.
- Route: `pass` for correction integration and V11 trust replay. Freeze Candidate 7; do not reuse Candidate 6.

## Revision 13 Pre-Freeze Formatting Drift

### Reproduction

Run `npm.cmd run verify` after Revision 13 integration. The command stops at `format:check` before lint or tests and names exactly `scripts/check-packed-consumer.mjs`, `scripts/run-v12-release-gate.mjs`, and `test/v12-release-gate.test.mjs`.

### Classification

Integration quality-gate mismatch. The specialist's focused behavior and consumer checks passed, but its emitted source bytes had not received the repository's deterministic formatter. No Candidate 7 identity existed, so no candidate was retired.

### Correction And Evidence

Biome formatted only the three named files and organized two import lists. The 9 focused release-gate tests pass in 188.6 seconds; the offline installed consumer, format, lint, typecheck, all 405 kernel tests, 31 V11 trust tests, and the complete checker mutation matrix pass.

Formatting changed the V11-bound consumer source, so Revision 38 could no longer authenticate the final integrated bytes. Revision 39 rebuilt Candidate A and Audit B, preserved an exact 9,342-byte binder and 8,798-byte independent semantic `pass`, validated the 984-byte cross-package authorization, and passed complete evidence replay.

### Route

`fix` -> `learn` -> `pass`. The aggregate pre-freeze gate passes in 235.7 seconds. Freeze Candidate 7 next; do not reuse Candidate 6 or represent Revision 38 as the current source identity.

## Candidate 7 Exact Gate And Revision 14

### Reproduction

The single permitted gate for `f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa` ran `npm.cmd run verify` from 2,029 exact committed files. Exact source, disposable Git context, live repository state, post-command bytes, and cleanup passed. The suite completed 404/405 tests and failed only `host TypeScript entrypoint supply is singular, plain, absolute, and external` with `ENOENT` for candidate-local `node_modules/typescript/bin/tsc`.

### Classification And Evidence

- Type: environment-sensitive test fixture at the host/candidate boundary.
- Receipt: 2,294 bytes, `sha256:8dfc1033ce467727e8603a11a417b57164f1569a463c2b12c7b1d1efe74de880`.
- Raw stdout/stderr: `sha256:13cc6b063a0d0283f5ece6053a822cf1af5cb9553b5c474e83e1126120ea2830` / `sha256:f1c19d541b010155bd5ed0af4babbe81534106ea1cf3258c758efc36113c95d0`.
- Route: `diagnose` -> `fix`. Candidate 7 is retired and must never be rerun.

### Confirmed Cause

The production gate passed one explicit external TypeScript entrypoint into the isolated command. The unit test ignored that process environment, called the resolver with `{}`, and therefore selected the imported candidate script's repository-local development default. The normal worktree had `node_modules`; the dependency-free exact candidate did not.

### Correction And Verification

Revision 14 makes the internal default injectable for deterministic testing while production retains the same two-argument call and local-development fallback. Injected defaults pass the same absolute, regular-file, symlink, realpath, and outside-candidate validation. Relative, linked, and candidate-contained defaults now have explicit regressions.

The exact one-agent package binds compilation/package `sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861` / `sha256:4e267e322fda4d51ba2babb25c50c6b9acb800776a7426870eefc4327092510d`. Its 4,930-byte raw handoff verifies `pass` at `sha256:b678fcf1c85ec59304893b428fef0b09210d5b3eac45a51b49e3075a5003b064`; complete fan-in is ready. Focused behavior and Biome checks pass, all ten bound sources remain byte-identical, and V11 Revision 39 replay remains `pass`.

### Next Route

`pass` for the correction and complete pre-freeze verification. The aggregate `npm.cmd run verify` passes in 238.1 seconds with all 405 tests and release consumers. Freeze Candidate 8, execute its exact gate once, and launch R2 only after a passing receipt.

## Candidate 8 R2 Context Ceiling And Revision 15

### Reproduction

Candidate 8 `0482bf3783e085c6cef3111d63003daa5197eca8` passed its one-shot exact canonical gate. The receipt is 2,295 bytes at `sha256:aa93e516387afc029ff21ba5d8e4f31cc0787e15ef181c38b1714acdf7c2c76e`; exact stdout/stderr are `sha256:0dc432aeeed8d6f6a3e9352800dbd6a9d5b40d20eeb69a3ed16dcfe9bdb8170c` / `sha256:2e53f9074811c48085665956206c5d73525bdba26d25c07cb805d31df9b0c948`.

Fresh R2 preparation then produced an immutable request with 261 context sources and 261 authority read scopes. Compilation failed closed with two `SC4308` diagnostics because both counts exceeded 256. No package was rendered, approved, or launched.

### Classification

Evidence-selection scaling defect at the review compiler boundary. Candidate execution was valid; the candidate was retired because its exact R2 request was not launchable.

### Confirmed Cause

The collector retained every correction-root `inputs/` artifact plus each root `request.json`, `phase-metadata.json`, and `compilation-summary.json`, even though package envelopes, approvals, raw handoffs, verification reports, and replans already carried the authoritative review chain. These navigation artifacts grew linearly across fourteen corrections. The request remained below the 16 MiB byte ceiling, and the compiler's 256-entry limit was correct.

### Correction And Verification

Revision 15 filters only those correction-root navigation duplicates. It preserves every correction package envelope, approval, raw handoff, handoff-verification report, replan, canonical-gate artifact, and security-causal source. Candidate 8's exact failed request is reproduced in regression coverage: 94 duplicate paths are removed, 163 candidate sources plus four direct candidate/gate sources remain, and the real three-work-unit request compiles to three blueprints at 167 contexts.

The exact Revision 15 package binds compilation/package `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f` / `sha256:627414164e9176f4ead047a4a857f23f81efc868643dd8aaaa55377186f162c8`. Its final 5,129-byte handoff verifies `pass` at `sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb`; the interrupted first attempt remains immutable failed-attempt evidence.

Main-agent verification passes the exact focused reproduction, all 10 release-gate tests, Biome, `git diff --check`, the canonical repository gate, the full checker mutation matrix, and V11 Revision 39 replay.

### Next Route

`split` -> `diagnose` -> `fix` -> `pass` for the correction. Candidate 8 remains retired. Candidate 9 later passed its one-shot canonical gate, returned `pass` / `fix` / `pass` from the complete R2 roster, and is permanently retired with `releaseReady: false`. Freeze only a successor source, run its canonical gate exactly once, and compile a fresh R2 package only after that gate passes.

## Candidate 9 Release Truth And Revision 16

### Reproduction And Cause

Candidate 9 passed its one-shot exact gate and completed the R2 roster, but product/API/IDE returned `fix`: active source documents named conflicting candidate stages and conflated package verification with workflow success. The first Revision 16 handoff corrected status banners but integration review found stale live routing sections elsewhere.

### Correction And Evidence

Attempt 2 retained the exact approved package, corrected every identified live route, and expanded anti-drift tests to active status and routing sections. The exact handoff is 6,520 bytes at `sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9`; its accepted verification report sets `integrationAccepted: true` and `phaseReady: true`.

The first aggregate pre-freeze attempt stopped before tests because the sandbox denied writes to generated `dist` files. The identical command under approved workspace permissions passed in 350.4 seconds without source changes. The checker mutation matrix then passed in 316.7 seconds.

### Route

`fix` -> integration rejection -> `fix` -> `pass`. Independent pre-freeze verification passes; freeze a successor source next and run its canonical gate exactly once.

## Candidate 10 Review Runtime And Revision 22

### Reproduction

Candidate 10 passed its one-shot exact source gate, but R2 security review proved the parent and verifier had already imported ignored repository-live `dist/index.js`. Later corrections closed that runtime boundary, then independent reviews found three additional defects in sequence: invocation authority changed stable package identity, lifecycle coverage projected production behavior without executing it, and a package declared an unavailable intermediate source. The copied-production fixture also hid npm 11's rejection of identical user/global config paths by deleting `npm_config_globalconfig`.

### Evidence And Route

Revisions 17-21 preserve `redesign`, `fix`, `diagnose`, and `block` outcomes without promotion. Revision 22 binds immutable pre-edit snapshots, runs the candidate-derived runtime in fresh child processes, uses two distinct authenticated empty npm configuration files, executes installed npm 11 directly, rehashes protected inputs, and promotes only verified staged output. Its 34 tests and independent review pass, followed by complete V11 Revision 40 replay.

Route: `fix` -> `redesign` -> `fix` -> `diagnose` -> `pass` -> independent `fix` -> `pass` -> independent `fix` -> `block` -> `pass` -> independent `pass` -> `learn`. Freeze only a new successor source; never rerun the retired exact gate or R2 package.

## Candidate 11 Exact Gate And Revision 23

### Reproduction

The sole gate for `e541393bfe9f6656177ea3bba2cf92940cf4b7b9` authenticated 2,915 files and 90,531,850 source bytes. Source, disposable Git, outer repository state, and cleanup remained exact. The suite passed 423 of 424 tests, then `isolated copied production entrypoints complete one exact compile-to-verify lifecycle` failed at `test/helpers/v12-release-review-lifecycle.mjs:1007` with `ENOENT` for candidate-local `.local/npm-cache`.

- Receipt: 2,294 bytes at `sha256:b3a36ea43b5ac73c4568ba6c5542df4f66b29e7b3f1822a120cfdc38978721a6`.
- Stdout: 33,978 bytes at `sha256:ae258c7856783c6e2ade4e44a94057f331b62f7075199b1df1f3aea7b403a5c2`.
- Stderr: 19,354 bytes at `sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24`.
- Route: `diagnose` -> `fix`; Candidate 11 is immutable and retired.

### Correction And Evidence

The helper no longer reads a checkout-relative ignored directory. It consumes `RELEASE_GATE_TEST_HOOKS.hostNpmCache`, copies the resolved supply into a fresh lifecycle-owned root, and rejects a missing source, pre-existing destination, non-directory source, or overlapping roots before copy. A fast regression passes in 14.981 ms.

The exact formerly failing lifecycle passes once in `1,908,536.9107 ms`; the outer test reports one pass, zero failures, and complete owned-root cleanup. No source or documentation mutation occurred during that run.

### Next Route

Compile an exact Revision 23 independent-review package over the failed receipt, pre-edit candidate blobs, final source, regression, and lifecycle evidence. Freeze a successor only after package-bound review, V11 replay or refresh as required, and complete pre-freeze verification.

## Revision 24 Causal Regression And Independent Review

The first Revision 23 review returned `fix`: its fast test passed a caller-supplied source and could not prove the production no-override call consumed the gate-resolved cache. Revision 24 removes that override and binds `npm_config_cache` before a fresh child imports the copied gate and lifecycle modules. The minimal candidate-shaped tree contains no local `.local/npm-cache`; exact sentinel bytes prove the external supply is copied. Missing, non-directory, pre-existing-destination, and overlap routes fail closed.

The first full lifecycle attempt then diagnosed a sealed-fixture sequence defect: Revision 22 was excluded while later revisions remained. The bounded fixture rule now excludes canonical correction roots from Revision 22 onward in both the filesystem copy and committed Git tree while retaining revisions 1-21 and unrelated evidence. The corrected copied-production lifecycle passes in 1,853.7 seconds.

The first R24 package was rejected before launch for stale Revision 23 artifact-type labels. The next package returned a verifier-valid semantic `pass` but integration rejected its stale evidence filename. The final corrected package changes only that filename, reconstructs at compilation/package `sha256:6025d006482b13d40bdfc04f6ab2d7a16628f6040ef929cbe79b18707990ff90` / `sha256:deffe7fcb085e2840f94dba081e653800adf16528f062d7208a3d5072d18c81b`, and preserves a package-valid 18,311-byte `pass` handoff at `sha256:f88c08303de25f66a61dae6f0ca6e508b0357923c9c4bbe0d45e2e82a72c6497`. Integration accepts the exact result; route: `fix` -> `diagnose` -> `pass` -> label rejection -> semantic `pass` with integration rejection -> corrected `pass` -> pre-freeze verification.

## Revision 28 Aggregate Diagnosis And Independent Review

### Aggregate Diagnosis

The first canonical aggregate attempt returned nonzero after 1,146.3 seconds, but its tool output was truncated before the exact failing assertion could be retained. No source changed. A controlled replay then passed 436/436 core tests in 461.5 seconds and the sealed lifecycle immediately afterward in 2,401.0 seconds. A fully logged `npm.cmd run verify` passed from the same clean checkpoint in 2,459.4 seconds. The initial stop is classified as a non-reproduced execution failure; no unsupported source cause is inferred.

### Independent Finding

The immutable Revision 28 review package authenticated 42 sources at checkpoint `d6c3de115bf2c79725033a99df4bb3072397b1e5`. Its exact 9,384-byte handoff verifies `fix` at raw digest `sha256:5d6a6ca39024a50d3c662364417ff11ac48cf20c3f4edf4cd3bfe9ab6a62a460`.

The copied-production helper replaces the fixture `verify` command with five syntax checks. `node --check scripts/run-typescript.mjs` proves only that the launcher parses; it does not resolve, inspect, or execute the supplied compiler. The lifecycle test proves that command appeared in the raw gate log but has no compiler sentinel, complete TypeScript receipt, or persistent compilation-mutation failure route. The claimed complete copied-production binding is therefore unsupported even though the packed consumer and focused production-path tests pass.

### Route

`diagnose -> pass -> independent fix`. Candidate 13 remains unconsumed. Revision 29 must execute a real distinguishable external compiler through the copied production launcher, assert its complete version-bearing receipt and sentinel from the canonical log, and fail closed when that compiler is persistently mutated during compilation. Repeat focused, lifecycle, aggregate, and immutable review gates before any candidate freeze.

## Revision 29 Exact Aggregate And Independent Review

Revision 29's source correction passes focused compiler cases, the complete release-review and release-gate suites, one exact copied-production lifecycle, V11 Revision 43 trust replay, and a complete aggregate. The first immutable reviewer accepted the source but returned verified `fix`: the retained 329,179-byte aggregate log belonged to `f1d4fd0`, while its generated receipt relabeled those bytes as `f1454b6`.

The historical package and 7,643-byte handoff remain unchanged. A complete `npm.cmd run verify` rerun at exact `f1454b6008de1498e72f9cc5a36fd1234b50e028` passed in 2,623,400 ms and produced a distinct 657,576-byte log at `sha256:1635092c047e9a8a2fe6cb42b6a07fecf1b865fd52eab3a50d38c4f72944c399`. Before/after commit and tree identities match and the worktree remained clean.

Attempt 2 authenticates 44 sources and returns an exact 11,258-byte `pass` handoff at `sha256:713a3c52ef0a20ff2ece6f50444698f4f9ca5b2702dd63dd579ce37b93884920`, verified against compilation/package `sha256:d2e25fd584a7319fe89af77ae47ab836cb9b6998c7aa2508ce3f960176a4b271` / `sha256:e2755508c640267eaefb5e9e428a8ee73ff8fbbef142e5b9a5540cf1fecad56e`.

Route: independent `fix` -> exact rerun -> independent `pass`. Candidate 13 remains unconsumed; freeze it only from the committed evidence state and run its canonical gate once.

## Candidate 13 Release-Status Drift And Revision 30

### Reproduction

The one-shot canonical gate for commit `e61932f2d5067559332790b370f1bf510d0064fc` authenticated 3,474 files and 105,131,002 bytes, materialized the same digest before and after execution, retained identical Git state, and ran `npm.cmd run verify`. The core suite returned 437 passes and two failures.

### Stable Evidence

- Receipt: 2,296 bytes at `sha256:2ed3d9989f433f85c98718f3da12e98a0daf414116479aa5364eae0b8d60b114`.
- Stdout: 37,356 bytes at `sha256:b341a9904200e852063fa4fc1856c184cf763242b07da00c049fcd6544822f34`.
- Stderr: 19,548 bytes at `sha256:d7a90861417245e1f48ddfffcb12310b7402e500f726f023b548169c6487888d`.
- Both failures point to `docs/milestones/v12.md`: its live `Status` and `Current Stage` sections named Candidate 13 and described it as pending or unconsumed.

### Confirmed Cause

The exact-checkpoint aggregate ran before the review-evidence commit. That later commit changed live status text to name the next candidate but did not rerun the anti-drift regression before freeze. A frozen source cannot truthfully describe its own numbered candidate as unconsumed after the gate consumes it, so the wording was guaranteed to become stale during the one-shot run.

### Correction And Route

Revision 30 uses candidate-independent language in every live status and routing section, preserves numbered identities only in historical evidence, and requires the focused anti-drift tests plus a complete pre-freeze verification after all release-state edits. The two causal tests pass, and the complete release-review file passes 26/26 in 94.1 seconds. An unprivileged release-gate run passed 13/16 and failed only three owned-scratch `EPERM` operations; the identical command with its declared workspace write boundary passes 16/16 in 420.8 seconds. Route: `diagnose` -> `fix`; Candidate 13 is permanently retired and must never be rerun.

## Retired Successor Lifecycle Attribution And Revision 31

### Reproduction

The one-shot canonical gate for commit `74397e30be5d185a14ecef1a838aa7767ffdf60f` authenticated 3,477 files and 105,198,478 bytes, retained the same materialization digest before and after execution, preserved the candidate Git context and source repository, and ran `npm.cmd run verify`. The core suite passed 439 of 439 tests. The copied-production lifecycle then stopped during the primary verify parent and reported one new global `swr2-*` directory.

### Stable Evidence

- Receipt: 2,296 bytes at `sha256:f9960ddb3cf3b15cbc03fbdb7d016b1eb520b833fb2183dcfdd67b984cc560c2`.
- Source: `sha256:90097d36f74019e8004f3d2245d368bc4050cfa042e8a1ea2b34228586e9d1e4`.
- Stdout: 36,810 bytes at `sha256:dfa57323ce8e81452cf51a5fe862b34e0b9019dd05eb09b90af55425f9393138`.
- Stderr: 19,354 bytes at `sha256:0d0f997717d3a289caa495f1426091e27604f6829fd49be9af82f472e9d60758`.
- The surviving directory held only the two initial empty private npm configuration files. The old global scan could not prove which concurrent process owned it and asserted before the caller could report timeout, signal, or status.

### Diagnosis

The lifecycle helper used a 900,000 ms per-parent timeout, killed only the immediate child, waited for close, and then diffed every global `swr2-*` directory. That ordering definitely masked the primary process classification. Before candidate materialization, the production parent also launched one synchronous `git cat-file` process per tree entry; this candidate had 3,477 files, making file count an avoidable process-count multiplier. The preserved evidence localizes the stop before materialization but cannot prove whether timeout, partial cleanup, or an unrelated process created the observed root.

### Correction And Evidence

Revision 31 retrieves unique blobs through one binary-safe `git cat-file --batch` exchange and strictly validates returned object identity, type, decimal size, byte framing, delimiter, order, duplicates, truncation, non-ASCII headers, and trailing bytes. The lifecycle helper gives each parent invocation a private `TEMP`/`TMP`/`TMPDIR`, terminates the complete process tree on timeout, records termination evidence, removes the test-owned namespace, and reports process outcome before owned-residue assertions. Production operation-root setup is inside the guarded cleanup path, and cleanup failures are no longer discarded.

The focused binary and timeout regressions pass 2 of 2. The complete release-review file passes 28 of 28 in 73.1 seconds. A real-tree probe parsed 2,205 unique blobs and 69,562,019 blob bytes through the new batch protocol in 817 ms.

### Route

`diagnose -> fix -> verify`. The exact source is permanently retired and must never be rerun. Broader release-gate, copied-lifecycle, package-bound review, aggregate, and fresh-source gates remain required.

## Revision 31 Committed-Identity Preflight

### Invalid Attempt

The first full copied-lifecycle invocation after the correction started from an uncommitted working tree. The lifecycle materialized committed `HEAD`, so it exercised the old 96,946-byte release parent while its final attestation expected the new 100,088-byte working-tree parent. After 2,383.9 seconds, the final assertion reported committed digest `sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1` against live expectation `sha256:e76a63d41607f978d5adedb8e69e64b75625e040ec252f5bae97895d4dff7dbb`. This mixed-identity invocation is neither a pass nor a failure of Revision 31 behavior.

### Causal Fix And Evidence

The lifecycle now hashes every production identity directly from `git show HEAD:path` and compares exact bytes and SHA-256 expectations before creating a lifecycle temp root or materializing source. A scheduling regression proves that this preflight precedes materialization. The same invalid state now rejects with the exact path and both identities in 215.1 ms instead of running the expensive lifecycle.

### Route

`fix -> verify`. Commit the exact Revision 31 checkpoint, then run the full copied lifecycle once against that committed identity.

## Revision 31 Committed Lifecycle Git-State Stop

### Reproduction

At committed checkpoint `602ddce2a9056e3f920fcb3e004132bde3f4f549`, run the exact copied-production lifecycle. The committed-identity preflight passes. After 551,039.5 ms, the compile parent exits nonzero with `Disposable Git context changed tracked candidate state.`; the outer test finishes in 551,139.2 ms.

### Stable Evidence

The source worktree remains clean. The lifecycle removes its owned current-run candidate and Git context. Inside the parent, exact candidate-source closure verification passes immediately before the Git assertion, so no content cause is inferred from the generic message. The old assertion treats a changed diff, candidate HEAD mismatch, signal, and Git command failure as the same outcome and preserves no changed path.

### Competing Hypotheses And Next Experiment

1. A child changed tracked worktree bytes after protected-state verification.
2. A child changed only the disposable index.
3. The Git diff command failed and was mislabeled as tracked drift.

Add a failure-only diagnostic that distinguishes candidate HEAD, Git command outcome, combined changed paths, index paths, and worktree paths. Parse NUL-delimited paths through the existing cross-platform path validator, then reproduce only far enough to classify the stop.

The diagnostic parser and complete release-review suite pass 29/29 in 94.4 seconds. The exact production parent identity is rebound before reproduction.

### Route

`verify -> diagnose`. Release remains stopped; the checkpoint is evidence, not approval.

## Revision 31 Disposable Git Long-Path Confirmation

The path-attributing lifecycle at diagnostic checkpoint 101361e reproduced four false combined-diff paths with clean independent index and worktree path sets. A controlled 489-character worktree then reproduced Filename too long warnings and diff status 1 with core.longpaths unset; the same context became entirely clean after core.longpaths=true.

The correction configures and verifies long-path support in both disposable Git constructors. The full-tree causal regression passes in 189.8 seconds and exact production identities are rebound. Route: diagnose -> fix -> verify. Broader release verification remains active.

## Revision 31 Invocation-Scoped Runtime Identity

Checkpoint 8f1c4f1 crossed the prior long-path stop and failed after 1,192.8 seconds when the fresh approval parent reconstructed a different package pair from the compile parent. Cleanup and source identity remained exact.

The lifecycle host assigns each parent a unique TEMP, TMP, and TMPDIR root. The stable environment policy embedded those raw paths, so each parent received a different runtime binding, candidate manifest, request, and package identity. A direct policy comparison confirmed those three paths were the only differing fields.

The correction excludes raw invocation temp paths from stable identity and validates an explicit exclusion marker in the candidate worker. Focused tests pass 3/3, release-review passes 30/30, and release-gate passes 16/16. Exact committed checkpoint 8768c25 passes the isolated copied-production lifecycle 1/1 in 1,752.7 seconds, including closed negative routes, reauthorization, and owned cleanup. Route: diagnose -> fix -> verify -> pass.

## Revision 31 Package-Bound Batch-Coverage Finding

The exact Revision 31 aggregate passed, but the immutable reviewer found that the causal performance fix existed only in `scripts/run-v12-release-review.mjs`. The candidate-derived harness still called `git cat-file blob` inside `loadCandidateTree`, and canonical materialization did the same inside its entry loop. The verifier inherited the harness loader.

Revision 32 applies the same strict sorted and deduplicated batch protocol at both remaining boundaries. A real temporary repository proves constant Git process count across 3-file and 35-file revisions, duplicate-object deduplication, and exact binary reconstruction. Release-review passes 31/31; release-gate passes 17/17. Route: `review -> fix -> verify`; fresh aggregate and independent review remain.

## Revision 32 Aggregate Live-Routing Regression

Exact immutable checkpoint `ec51c7a9dd72ce9094260e089120b089ee25ad2a` remained clean and identity-stable while 444/445 core tests passed. The aggregate stopped at `live release routing delegates volatile state to candidate-addressed evidence`; `review.md#current-outcome` no longer contained that required delegation. No runtime or batching test failed, and lifecycle, dogfood, package, and consumer gates did not run.

The focused release-review suite had passed before the final status edit. Revision 33 restores the invariant and requires its focused guard after all active-status edits. Route: `verify -> diagnose -> fix`; a fresh immutable aggregate is required.

## Revision 33 Aggregate V11 Source-Freshness Stop

Exact immutable checkpoint `ff0b76d3e39bc9e7583e5956fe2c89af015630c6` remained clean and identity-stable while 445/445 core tests and the copied-production lifecycle passed. V11 dogfood then rejected `context.gitattributes`: expected 749 bytes / `sha256:8d0ac86b6407f4e8fd439c964560ad76b62c8506b2d218894a938e5b9c02da3a`, received 1,283 bytes / `sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`. Later dogfood, package, and consumer gates did not run.

The new `.gitattributes` bytes are intentional: narrow binary rules preserve exact Revision 31 handoffs, logs, patches, and receipts. All 58 V11 sources were checked; the other 57 remained exact. Revision 43 was archived before Revision 44 regenerated the package pair.

Revision 44 Candidate A is `sha256:b5cf6ea32968febbb9846ddaa718f4777f3aac3d1654fa3bf999e4f382def0ff` / `sha256:e320eaf9e29aac7c7a31bd651fd09c1cdeb0d6fb8f88f7fe7450d7e9151edd4d`; Audit B is `sha256:ec7a601571d54c5138b380367b974db39663820aa0b6103406374608c3160249` / `sha256:f331b294dd1f79fb3589bc0d5e8ea3f851953296a581de2a0e38783362c4a40f`. The exact receipt, binder, semantic `pass`, authorization, and strict replay all pass.

Independent review caught Candidate A approval before semantic authorization. The approval was revoked before any Candidate A launch, the non-launching receipt remained exact, and approval was reissued only after the semantic `pass` and authorization existed. Route: `verify -> diagnose -> fix -> review -> pass`; a fresh immutable aggregate remains required.

## Revision 34 Aggregate Historical-Outcome Regression

Exact immutable checkpoint `a40d0d6b636d30b3280c37fa9f5fceb2ab64baa8` remained clean and identity-stable while 444/445 core tests passed. `active release status avoids volatile candidate-state drift and preserves outcomes` rejected `test-plan.md#status` because its Revision 34 compression omitted the explicit Revision 1 incomplete-fan-in result, Revisions 2 and 3 `split` outcomes, and later correction `pass` routes. Later aggregate gates did not run.

Revision 35 restores all three facts. The final focused anti-drift gate now always runs both the historical-outcome and candidate-addressed live-routing tests after the last active-status edit. The causal pair passes 2/2. Route: `verify -> diagnose -> fix -> verify`; a fresh immutable aggregate remains required.

## Revision 35 Scoped Timeout Acceptance

The complete release-review file initially passed 30/31 after the status correction. The timeout regression reproduced top-level `accepted: false` while the preserved direct fallback reported `accepted: true` and the descendant was gone. Five restricted-host probes reproduced primary status 1, accepted fallback, and no descendant; a direct probe reported `ERROR: Access denied`. Five native probes returned primary status 0 with no fallback and no descendant.

The helper now defines top-level acceptance as primary or explicit fallback acceptance on both platform paths while preserving each raw result. The regression derives that equation and still requires descendant absence. Restricted focused verification passes 5/5, the native focused test passes 1/1, the native probe passes 5/5, and the complete release-review file passes 31/31. Route: `verify -> diagnose -> fix -> verify`.

## Revision 35 Immutable Aggregate And Independent Review

External supervisor evidence binds exact source `bcb12fbee15e8a96b5088accb5a397bc0464c7cd` to clean before/after identity and a 703,092 ms aggregate pass. Core tests pass 445/445, the copied-production lifecycle passes 1/1, package inspection passes, and the clean offline installed-consumer gate passes. The 1,227-byte receipt is `sha256:e99689f67208109c1470a02f742d324aa288b0fa05978337cdfe60d65f8f3917`.

A separately approved package-bound reviewer authenticated all 51 declared sources twice. Compilation/package digests are `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619` / `sha256:3b6b043b065a8acd42bf17652f8772b83035868376aaeb754272f6893b051047`. Its exact 11,143-byte handoff is `sha256:3b90e319eeb14527da11cbf82c569fab7a9267f9934ad4506f478fb891535841`, verifies against both approved digests, reports no high or medium blocker, and returns `pass`.

Raw logs and the handoff are preserved as canonical Base64 with decoded byte counts and SHA-256 bindings under `evidence/implementation/independent-review-r35/`. Route: `verify -> review -> pass`; `releaseApproved: false` remains until the successor/R2/CI/merge chain closes.

## Revision 36 Exact Gate And Revision 37 Git-Fixture Isolation

Exact Revision 36 remained clean and byte-identical through its one-shot gate, which stopped at 443/445 because parallel fixtures inherited one candidate index. Revision 37 removed the observed repository and count/key/value bindings; its 3/3 causal checks, 49/49 concurrent suites, and 446/446 aggregate passed.

The Revision 37 package-bound reviewer authenticated all 57 sources and reproduced a retained `GIT_CONFIG_PARAMETERS` channel plus quarantine, namespace, ref, and unknown future `GIT_*` bindings. Its exact handoff verifies `fix`, so the aggregate cannot authorize a successor freeze. Route: `verify -> review -> fix`.

## Revision 38 Closed-Policy Diagnosis And Verification

The confirmed cause was common-mode omission: production and the direct regression encoded the same partial denylist. Revision 38 removes all inherited `GIT_*` keys case-insensitively and then reapplies only the three local controls. A fresh hostile process observes the delivered environment through the shared spawn path and completes actual init, add, commit, and revision reads.

The first probe result was rejected for one extra JSON brace after a successfully completed child; the hash-guarded harness correction changed no boundary logic. A restricted complete run then passed 46/50 with four temp-root `EPERM` setup failures; the identical authorized run passed 50/50. Causal 2/2 and combined 4/4 checks also pass. The complete mutable-source verifier passed 447/447 in 679.3 seconds. Exact commit `1f2e89e30a46c1584cb7b979fc4c8a63326f7ff0` then passed the identity-stable aggregate and a 69-source package review with no high/medium blocker. Route: `fix -> verify -> review -> pass`; freeze Revision 39 without executable changes.

## Revision 39 R2 Preparation Diagnosis

- The one-shot gate passes with exact source and cleanup identity.
- R2 host preflight required an explicit parent digest, external offline cache, unlinked Git entrypoint with its complete Windows runtime, local checkout normalization, and long-path support.
- Once host bindings were complete, the candidate child failed on the false missing-Revision-30 lineage result before any R2 output promotion.
- Package markers, not directory names, are the causal evidence boundary. Revision 40 focused checks and concurrent suites pass.

## Revision 40 Security Review And Revision 41 Authority Closure

### Reproduction

Exact Revision 40 passed its one-shot canonical gate. Fresh R2 prepared 218 contexts, selected an exact three-agent partition with projected makespan 9 against serial 25, compiled and approved the package, and verified all three raw handoffs. Product/API/IDE and lifecycle/correctness returned `pass`; security/trace/authority returned `fix`.

### Stable Evidence

- Gate receipt: `sha256:e3d4aa0cda0621438d90192efe0e44d60fa907278e8d5d97d8ce0ca91b3dec9b`.
- R2 compilation/package: `sha256:2180101082e8c7e967eba9b21b2e4434ff6753c2d7d61df09430cd53bc0e9c78` / `sha256:8f76e09e89345951dff4ed6c48f926e50bcfba3da240409cd278a0003e4ca805`.
- Security handoff: 7,952 bytes at `sha256:3ed04c792fbaec88821a0d1bd5bc9ee058685fc3f4fa720f48d45fac058620ae`.
- Closed parent verification routed the candidate and kept `releaseReady: false`.

### Confirmed Cause

The gate inherited broad host environment authority and did not receipt-bind the exact Node, npm, Git, shell, TypeScript, and `node_modules` closure it executed. Separately, the R2 source catalog omitted six transitive helpers and adversarial fixtures that could affect the security conclusion.

### Correction

Revision 41 constructs a closed effective environment, uses private empty npm configuration, binds exact tool files and the complete host dependency closure before and after execution, emits receipt v1alpha2, and makes R2 reject any authority mismatch. The source catalog now includes all six omitted files with explicit security ownership. Hostile-environment, source-coverage, consumer-validation, historical-context, and identity regressions pass; the complete release-specific suite passes 53/53.

## Revision 62 V11 Attribute Identity Failure

Exact commit `d02b2bc590e04ec9496d9d04b7500e94adda9c04` passes the copied lifecycle 2/2,
then strict V11 dogfood rejects `.gitattributes` at 1,418 bytes instead of the approved 1,283
bytes. Hosted run 30154983964 fails all seven jobs and the one-shot gate remains unused. Focused
reproduction streams are preserved under `evidence/implementation/release-correction-r63/`.
Route: `verify -> diagnose -> fix`; Revision 62 is retired.

## Revision 63 Hosted Failure And Revision 64

### Reproduction

Hosted run `30156840253` passes six kernel jobs and fails Template Check at
`Check tracked whitespace`. The exact new `.txt` evidence has seven intentional matches.

### Classification

`hosted verification policy mismatch`

### Confirmed Cause

The artifact was raw process output but used a scanned text extension rather than the established
`.log` representation. Removing its whitespace would corrupt the authenticated evidence; changing
the scanner would weaken a repository-wide gate.

### Route

`diagnose -> fix`: preserve the exact bytes, rename the artifact to `.log`, keep it explicitly
tracked, bind the policy in regression coverage, and rerun every release gate. Revision 63 remains
permanently retired and its one-shot gate remains unused.

## Revision 64 Exact Rehearsal Failure And Revision 65

The exact R64 replay ran `node npm-cli.js run verify` over 4,085 materialized files. Core passed 466/466, then the copied lifecycle failed after 1,836,726.2587 ms with `copied production canonical gate timed out`. The full replay exited 1 after 1,898,645 ms. During the timeout window, the nested `npm ci` remained CPU-bound at a 207-character candidate root with no `node_modules`.

The same package and lock completed offline with scripts disabled at a short path in 2,442.5591 ms. The causal dependency leaf projects to 293 characters under R64 and 239 under the R65 namespace. Route: `verify -> diagnose -> fix -> verify`.

## Revision 65 Exact Rehearsal Failure And Revision 66

Revision 65 passed exact copied lifecycle and complete verification, then its non-consuming
exact-candidate rehearsal failed after 65,164 ms. Core reached 467/468 before the path-budget
regression rejected a 283-character dependency leaf containing four `swc-v12-g` namespaces.

The rehearsal did not reach the copied lifecycle, so no R65 nested install timeout is claimed.
The failure instead exposed a regression-model omission: the enclosing candidate adds one complete
scratch level. Route: `verify -> diagnose -> redesign -> Revision 66`.

## Revision 66 Hosted Failure And Revision 67

Revision 66 passed exact copied lifecycle, complete verification, the fourth-level exact-candidate
rehearsal, and independent follow-up. Hosted run `30166591953` passed Template Check plus both
Windows and both macOS jobs. Ubuntu Node 22 and 24 each failed the same existing Git-context test
because its single 96-character synthetic directory no longer crossed the 260-character boundary
from the shorter R66 root.

The one-shot gate remained unused. Route:
`hosted verify -> diagnose -> fix -> Revision 67`.

## Revision 67 Fresh-R2 Authority Finding

### Reproduction And Evidence

Revision 67 passed local, hosted, rehearsal, and one-shot canonical gates. Fresh R2 still emitted
a verified security `fix`: worker authority did not bind the complete effective environment, and
the parent that constructs that authority was absent from semantic reviewer context. Product and
lifecycle reviewers passed; the parent fan-in remained complete but not release-ready.

### Confirmed Cause And Route

Selected negative checks are not equivalent to a complete authority identity. The initial R68
correction also reached the shared verifier validator only after candidate reads/import, which
an independent pre-freeze review caught. R68 now validates a complete domain-separated
environment binding before those operations and exercises both production worker validators in
fresh hostile processes. The fixture imports each production module and invokes its exported
validator directly; the committed copied lifecycle remains the end-to-end CLI-entrypoint proof.

`canonical pass -> fresh review -> fix -> diagnose -> Revision 68`.

## Revision 68 Hosted Failure And Revision 69

Revision 68 passed exact copied lifecycle, complete verification, non-consuming rehearsal, and
five hosted jobs. macOS Node 22 and 24 each ran 473 tests, passed 472, and failed only
`fresh worker processes reject every undeclared environment authority` with
`Candidate worker effective environment mismatch.` The gate remained unused.

The platform/version matrix selects a Darwin process-supplied key as the bounded causal hypothesis.
Revision 69 binds `__CF_USER_TEXT_ENCODING` only on Darwin, keeps its exact value in invocation
authority, excludes the user-specific raw value from stable identity, and preserves hostile-key
rejection. ADR 0006 supersedes macOS confirmation for v0.1; it is deferred compatibility work
unless a later decision expands supported release hosts.

`hosted verify -> diagnose -> fix -> Revision 69`.
