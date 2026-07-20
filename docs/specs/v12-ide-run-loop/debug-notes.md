# Debug Notes

## Status

No active product defect. Release-correction revisions 6 through 8 and V11 trust-root revision 35 pass. Candidate 2 is retired after a passing canonical gate and a fail-closed R2 preparation check. Candidate 3 freeze, canonical verification, and R2 review remain.

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
