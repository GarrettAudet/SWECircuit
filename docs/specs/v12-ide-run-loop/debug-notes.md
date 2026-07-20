# Debug Notes

## Status

No active product defect. Preserve any dogfood failure before correction.

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
