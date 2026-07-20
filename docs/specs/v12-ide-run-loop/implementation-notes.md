# Implementation Notes

## Status

Architecture, implementation, public integration, adversarial verification, IDE dogfood, V11 trust-root refresh, and canonical release verification passed. Independent final review is next.

## Baseline

- Released V11.1 main: `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`.
- Active branch: `codex/v12-ide-run-loop`.
- Current host: Codex IDE with external subagent capability; SWECircuit core remains the provider-neutral contract and verifier.

## Dogfood Observations

- The visible kickoff made the current stage, artifact, assumption, and host boundary explicit.
- The current IDE exposes actual subagents, so exact compiled contracts can be materialized without adding provider APIs to core.
- Exact search selected four task-shaped agents over the eligible serial baseline because projected makespan fell from 26 to 15 with zero conflict pairs.
- The first host approval attempt exposed a wrong untyped envelope field assumption and stopped before launch. Exact envelope inspection, a root-field assertion, and approval-bound verification corrected it.
- The first launch handle was lost from visible context during host output compaction. The host had no list-agents operation, so the integration owner recovered the exact handle from the caller-owned session ledger instead of launching a duplicate. V12 must make the approved roster and accepted handoffs recoverable from the persisted session value.
- The first specialist returned a 13,011-byte raw handoff. The host preserved the returned string as exact UTF-8 bytes before interpretation; sandbox-specific persistence remained an external host concern.
- A narrow host verifier now authenticates each raw handoff, computes the integration blueprint's exact V11 transitive fan-in, and keeps verification evidence separate from raw source artifacts.
- V11 authenticated 52,161 raw Wave-1 bytes, found all three required `pass` handoffs, and returned `integrationReady: true` for the synthesis blueprint.
- Foundation Revision 1 preserved a verified `block` after the host could not edit the temporary worktree with native `apply_patch` or its wrappers.
- Foundation Revision 2 retained the exact product and six-file write ceiling while adding one explicit, precondition-hash-guarded PowerShell fallback. Its 9,166-byte raw `pass` handoff verified against compilation `sha256:3c76ddb9c2c25b510d7f6d36f701f7271db941f019d3615946afa58d2207b435` and package `sha256:be7fc744d42e29c19ee3a4a5703ca538f3a3c0b3699db41cf79b491b51cf7c04`.
- Independent format, lint, typecheck, and build checks passed. The full suite exposed one cross-phase integration obligation: runtime `SC4401`-`SC4405` definitions must be added to the normative diagnostic catalog.
- The public-integration contract now owns that catalog update. Future implementation contracts carry the same bounded fallback so the known host limitation does not trigger another unproductive revision.
- An independent maximum-length base64 probe exposed an in-scope boundary-classification defect: 1,398,104 canonical base64 characters can decode to 1,048,578 bytes, but Foundation Revision 2 returned `SC4401` instead of `SC4402`. Foundation Revision 3 is a minimal compiled correction with one production file and one persistent regression test.
- Foundation Revision 3 compiled one exact specialist against compilation `sha256:2a7a3f2e6a2c591b89eb5304be6662488e15561df4add9750a189ce426f43707` and package `sha256:7d9c77ab05c9ae8318d567df980285ab2c68adc1cf5e19afb71e5286a0193168`. Its exact 3,405-byte `pass` handoff verified with `phaseReady: true`.
- The host redirected the specialist from an unnecessary in-memory TypeScript loader to the contract-equivalent normal build plus focused test. This reduced execution complexity without changing authority, source, outputs, or evidence duties.
- Independent integration applied deterministic Biome formatting, then passed format, lint, typecheck, build, and the focused real-package boundary test.
- The complete suite passed 370 of 371 tests. Its sole failure remains the routed `SC4401`-`SC4405` normative catalog update owned by public integration.
- The parallel compiler evaluated both legal partitions and selected two disjoint specialists: projected makespan 8 versus serial 15, peak concurrency 2, zero conflict pairs, and 150,388 duplicated context bytes.
- Approval bound compilation `sha256:7384e593d56913a2059673fb2c10e7778aa56627a7e98754cd0913f9c5ecf065` to package `sha256:fa9a6aab056aaa9e7f931dea01d92a3d4f6001e4c44a9f534ebc0dfb4e736d6b` before launch.
- Transition and inspection ran concurrently with exact disjoint source/test write sets. Transition finished first; inspection continued independently. Their 4,114-byte and 4,997-byte raw `pass` handoffs verified as the complete expected roster with `phaseReady: true`.
- Independent integration applied deterministic Biome formatting to the four agent outputs, then passed format, lint, typecheck, build, and all six combined V12 focused tests.
- A separate integration-owner lifecycle probe used a real two-agent package and passed `create -> inspect -> record prerequisite -> inspect -> record dependent -> inspect`, ending at `integration_ready` with two accepted evidence rows.
- Public integration compiled one exact specialist against compilation `sha256:e0f60f3dc69bfbcc8b0d6b37c5fc048b39d5d1ccae123849961ee5f2548646cb` and package `sha256:edea1a4de9906ca13dedd8164e1d84179934e4037bc9f418f7b492d872081617`. Its exact 5,004-byte `pass` handoff verified with raw digest `sha256:575289f727acdcfe27e76a093f1b6cdf15bd7a855632adbf352ce07e403a41e1` and `phaseReady: true`.
- Integration-owner review confirmed additive root exports, exact `SC4401`-`SC4405` catalog parity, the package-owned run schema export, and a clean installed-consumer lifecycle using no source-checkout internals.
- The first full suite after public integration passed 375 of 376 tests. Diagnosis proved that only the first-run example's reviewed `src/index.ts` bytes were stale; the repository-owned deterministic approval derivation refreshed that source binding and its dependent compilation/package expectation. The focused example suite then passed 7 of 7 and the full suite passed 376 of 376.
- Independent build, dry-run package inspection, and offline installed-consumer verification passed. The installed package creates, inspects, records, restores, and reinspects a run session while retaining the approved V11 package identity pair.
- The V12 dogfood command intentionally points to the separately owned verification-phase script and remains temporarily unrunnable until that disjoint work unit lands. V11 dogfood evidence also binds current live repository sources; refresh it once, after the remaining V12 source and guidance edits settle, so it is not invalidated twice.
- The verification compiler evaluated the serial and two-agent partitions, selecting two disjoint specialists with projected makespan 10 versus 16, peak concurrency 2, zero conflicts, and compilation/package digests `sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6` / `sha256:56117917b1f230336e4a08c92283a785d488b9dd77e4fe32c9e0f261f5e5c5fa`.
- Exact verification and dogfood handoffs passed and were preserved at 4,356 and 6,031 bytes with raw digests `sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137` and `sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2`.
- Nine focused adversarial tests pass across representative DAGs, every valid arrival permutation, fresh-process restore, package and caller substitution attacks, replay, every non-pass route, and exact byte limits.
- The deterministic IDE dogfood journey runs twice to byte-identical reports, begins with two eligible roots, rejects premature dependent work with `SC4404`, reaches complete verified fan-in, preserves exact raw handoffs, routes `fix` terminally, and leaves launch, persistence, integration, merge, and memory to the host.
- Integration review corrected one test-only Windows path assumption before Linux CI by normalizing the resolved schema path; the focused suite remained 9 of 9 green.
- The first canonical gate passed format, lint, typecheck, all 385 tests, the public specialist example, and V10 dogfood before V11 dogfood correctly rejected its pre-V12 `src/constants.ts` binding. Ten of 57 V11 source tuples changed intentionally; the other 47 still authenticate exactly.
- The repository template checker then caught that the new run-session guide described the interface in a table but omitted the framework's required module headings. Integration reshaped only that guide into the standard contract; the checker passed on rerun.
- V11 dogfood revision 32 refreshed only the 10 intentionally changed source tuples and retained exact authentication for the other 47. Candidate A now binds compilation `sha256:f267fec5a479297e8b35f5f56c19014cfc6f840379643b09219d8442e3f2c032` to package `sha256:21ec2ef20b2e246b12b31f371391faa6d1a4a3fefb0cb65bd0e537ca8a8fbc73`; independent Audit B binds compilation `sha256:9a457e8f7e42ae8612d4634a2af6116e73a87be249727e318ac56029e74ada02` to package `sha256:e3442404af6f797de723273a94c97bd5427ae22505468f4ffd5ad410fd2c9e7e`.
- Audit B independently authenticated all 59 sources and reconstructed the 203-candidate search, six Candidate-A blueprints, and nine package files. Its exact verification receipt, binder handoff, semantic `pass` handoff, and cross-package launch authorization all pass the V11 evidence checker.
- The checker regression matrix, V12 deterministic dogfood, dry-run package inspection, clean offline installed-consumer gate, and V11 exact evidence replay all pass independently.
- The complete canonical gate passes format, lint, typecheck, all 385 tests, the public specialist example, V10/V11/V12 dogfood, dry-run package inspection, and the clean installed-consumer gate.
- Release review attempt 1 bound candidate `d914b273ba619e3cfa42206c8d9f136be73075e3` to compilation `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3` and package `sha256:7a809141af324cdea7028fb07ee6ca6cb79daccfbdf319e2fd8b2c1346a007ee`.
- Exact search evaluated all five legal partitions and selected three disjoint reviewers in one wave: projected makespan 9 versus serial 25, peak concurrency 3, and zero conflicts.
- The product, lifecycle, and security raw handoffs are 5,819, 5,649, and 7,259 bytes with raw digests `sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26`, `sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84`, and `sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7`.
- V11 handoff verification authenticated the complete expected roster. All three exact outcomes are `fix`, so `releaseReady` is false and no release or merge action is authorized.
- Confirmed correction scope is limited to runtime schema purity, requirement-first evidence ordering, reachable aggregate resource proof, implementation-package dogfood with AC8 friction measurements, and immutable primary release evidence.
