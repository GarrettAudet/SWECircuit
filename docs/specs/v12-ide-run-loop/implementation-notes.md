# Implementation Notes

## Status

The V12 product implementation is complete. Candidates 4, 5, and 6 are retired; release-correction revision 13 is integrated and formatted, and V11 Revision 39 passes its complete two-package trust replay. Candidate 7 canonical verification and complete independent R2 review remain before V12 acceptance.

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
- Correction revisions 2 and 3 preserved exact `split` outcomes while tracing cold-operation filesystem reads through V11 handoff and compiler validation. Revision 4 removed those reads with bundled immutable schema data and returned exact `pass`.
- Revision 5 selected two disjoint specialists with projected makespan 8 versus serial 15. Its compilation/package pair is `sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5` / `sha256:c29570501b69f2b791d32890b48bb74d90091e649513d5915c636e1141518717`.
- The exact dogfood and release-evidence handoffs are 12,438 and 7,056 bytes with raw digests `sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af` and `sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6`. Both verify `pass`; the complete package gate is `phaseReady: true`.
- Fresh-source integration passes build, format, lint, typecheck, template check, both V12 dogfood modes, and all 388 kernel tests. The maximum 16-agent aggregate resource proof runs inside the canonical suite.
- V11 revision 33 binds Candidate A `sha256:213982e89622636fdc842f446ef3421f7d1c895dc25b59ca560156a3c47248a8` / `sha256:fd5b6e5182fa482fc14bebb5ef5b32cfb551df0e842bd0864e0aa0f9d500807f` and Audit B `sha256:cfc9d4059e83a01cd02cddd4ab62d9bc0363dde46c23da5007cfbcaf1d5931cf` / `sha256:081ff3cafcb6eb80d3387d356853bda669f64673587e43b0fdc01e5080d81493`.
- Audit B independently reproduced all 203 partitions, all 57 Candidate A contexts, six blueprints, authority and evidence ownership, schedule, compilation identity, and all nine package files. Its exact binder and semantic handoffs are 15,438 and 7,481 bytes with raw digests `sha256:8164cd7d135899c3b90e8abdd1ce2b5cd571f1957316a7ddc32377196f692c64` and `sha256:c9d361744cbec3e3d8c3a8830c5319c58e410e54729238eff19b8ae30b696ae3`.
- Integration removed the R2 harness's hardcoded revision-32 audit path. The current semantic handoff is now resolved from the exact cross-package launch authorization and will be reviewed as candidate source.

## Candidate 1 And Revisions 6-7

- Candidate 1 `989e6ea6da754ecddcf06507567647bd9d84be02` failed its exact canonical gate only at the packed-consumer raw-limit assertion; pre/post HEAD remained identical and tracked state stayed clean.
- Revision 6 restored 64 MiB consumer/architecture parity and made future gate evidence candidate-addressed. Its two exact handoffs verify `pass` against compilation/package `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998` / `sha256:5acb302e44bb08f8626fb3773ba27acf5af5ae3f3d09d95beea1f2538a46826a`.
- Pre-freeze integration found that global `*.log` ignore policy hid the receipt-bound raw stdout and stderr. Revision 7 preserved the general policy, exposed only canonical gate logs, and made both gate consumers reject ignored evidence paths.
- Revision 7's exact 5,812-byte `pass` handoff verifies at `sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32` against compilation/package `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920` / `sha256:df3ed49a4d38fdbac275b82036dc4354d6b76bac3b2fa97dfbd385c3fdad85b8`.
- Revision 8 makes only canonical raw logs explicitly binary and makes both gate consumers reject ambiguous Git attributes. Its exact 8,035-byte `pass` handoff verifies at `sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1` against compilation/package `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef` / `sha256:d655468c5e37171d5ef83af2299bf08291029e9c08751ef056c2d655f24cfb1d`.
- Integration added revisions 7 and 8 to the immutable R2 correction lineage and reverified script syntax, candidate-path parity, and `git diff --check`.
- V11 revision 35 binds Candidate A `sha256:5af627b5a678bbd268e2170d5b399dc7b898ce9f4b716b1a6ed65d8019b78583` / `sha256:f6d64d94f2834f0fafd2675043114359d4dddac86e8e7add22a8555bdbf598a1` and Audit B `sha256:b53beaf3141b90e6cc2631d05327c2b4d57b697c43e974e3bc5ca24325d905eb` / `sha256:9fb651dfda936e332500bf96cb451fda06f1356462723b25402a56d1e11c6b45`.
- The revision-35 binder and independent semantic audit both pass, and the exact cross-package launch authorization passes `node scripts/run-v11-dogfood.mjs --check-evidence`.
- Approval bytes are canonical LF so Git checkout cannot invalidate their raw digest; the stale revision-34 binder remains preserved as failed-attempt evidence.
- Biome directly covers both V12 scripts, with the redundant stdin quality workaround removed.
- The current full pre-freeze `npm.cmd run verify` passes format, lint, typecheck, all 388 tests, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification.
- Candidate 2 `4c7695519d274a8e3d939061dfa184b99dc8ac45` passed its exact canonical receipt, but R2 preparation rejected the 1,343-byte PowerShell-formatted launch authorization before compilation.
- Canonical reserialization preserves the authorization value at 984 bytes and `sha256:88304c6bcf03b8737af8859ab4096d66bf77f70b88f33c040da0094dc32fe3e5`; V11 evidence replay remains `pass`. Candidate 2 is retired and Candidate 3 must be regated.

## Candidate 3 And Corrections 9-10

- Candidate 3 `4ad12367cc0b36ea460ceabc48e5a41ca662e3df` passed its exact canonical command. Lifecycle review returned `pass`; product and security returned `fix`, so the candidate is retired.
- R9 materializes the candidate's committed Git tree before running `npm verify`, records a framed source digest, rejects uncommitted verification inputs, and includes the six exact security-causal sources in R2. Its third exact handoff verifies `pass` with `phaseReady: true`.
- R10 gives every candidate a disjoint closed R2 run root, authenticates source discovery and snapshot bytes from candidate Git blobs, and discovers a contiguous correction lineage through revision 10 without encoding a terminal count. Its exact 5,595-byte handoff verifies `pass` with `phaseReady: true`.
- R10 host attempts exposed two external liveness stalls and one wrong-worktree delivery. The same specialist contract completed only after the host supplied the exact worktree/checkpoint and manually selected `gpt-5.6-sol` with `high` reasoning. V12 does not automate this selection; the complete trace is preserved in `evidence/implementation/release-correction-r10/attempt-history.md`.
- Independent integration passes 5 of 5 R10 lifecycle tests, 4 of 4 release-gate tests, syntax, exact formatter/linter checks, `git diff --check`, and the template checker.
- The complete post-R10 pre-freeze `npm.cmd run verify` passes format, lint, typecheck, the full test suite, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification in 158.8 seconds.
- The accepted post-V12 direction is portable runtime demand plus host capability inventory plus an owner-visible runtime assignment. Concrete model, effort, skills, tools, and IDE-native spawning remain adapter-owned effects.

## IDECircuit Public Identity Pass

- The owner selected IDECircuit as the public product identity and the positioning `The orchestration layer for agentic IDEs.`
- The concise README now explains one goal, reviewed atomic work, exact task-specific specialist contracts, host-owned dependency-safe execution, verified fan-in, integration, trace preservation, and memory.
- The current repository URL, private npm workspace, schemas, and generated asset paths retain SWECircuit identifiers as an explicit 0.x compatibility boundary.
- The primary deterministic GIF retains its compatibility filename and now presents IDECircuit in-frame.
- README guards now recognize both IDECircuit and SWECircuit core aliases when rejecting host-owned capability overclaims.
- A bounded 240.5-second checker run was preserved as incomplete after its wrapper timeout; every emitted case had passed.
- The first complete run found five stale no-op prose mutations. The fixtures were retargeted and given explicit source guards.
- The final checker regression matrix passed in 322.8 seconds; the template checker and `git diff --check` also pass.
- The first exact-tree canonical attempt passed format, lint, and typecheck, then stopped before tests when the managed Windows sandbox denied TypeScript writes to the ignored `dist/` directory; no product assertion failed.
- The approved workspace-write rerun passed the kernel suite and then correctly rejected stale V11 source evidence after the README and checker changes.
- A separate sequence audit caught that Candidate A's revision-36 digest approval had been written before semantic prelaunch review. The approval was withdrawn, Audit B remained approved, and Candidate A was reapproved only after the exact binder, semantic `pass` handoff, and cross-package authorization were preserved.
- V11 revision 36 now binds Candidate A `sha256:62e044c0d24a996c650c3fa884eefca216f5801e8a8b1ac677d1579b1c3ea681` / `sha256:66ffa021c2def7b9487ae42fddb27570c1de8b895485ee0c9ab26f6c707cf1e2` and Audit B `sha256:5ad47788b7d6bd0d0ad149fbbde109ee15e92a5aba82d8ce902548edf2d06765` / `sha256:2c7c9acf44bcd82cb0320850f66497fc3ebff5fb1f4682cc135cff1dc6015a4b`.
- The revision-36 binder is 12,986 bytes at `sha256:ab17516c3e132c86ed9b94e445b9abbae22948827776b8bd80e47c736bef17f2`; the independent semantic handoff is 8,654 bytes at `sha256:52ce1327efa5f3a9e206b9fa66b5bba40debd6de98bda9f3122361555f6ace6a`. Standard handoff verification, dependency assessment, prelaunch reconstruction, and full V11 evidence replay all pass.
- The final canonical `npm.cmd run verify` passed in 240 seconds: format, lint, typecheck, build, the full test suite, the public specialist example, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification.

## Candidate 5 And Revision 12

- Candidate 5 `62e51278904b3036971f6fcd40577313f1168e2a` passed all 399 tests, then failed closed on two checkout-dependent V11 PowerShell bindings and an unexpected candidate-local `.local` runtime path. Its exact receipt and raw logs remain immutable under `evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/`.
- Revision 12 compiled two disjoint specialists with projected makespan 11 versus serial 19 and zero conflicts. Compilation/package are `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48` / `sha256:26bc2190b4acd7d4fe253228eabad5862d0819717b75b7b7f20e6264dfc4d4ce`; both exact raw handoffs verify `pass` and complete fan-in is ready.
- Integration requires LF clean-filter-stable V11 source bytes, binds `.gitattributes`, supplies npm cache state outside the candidate materialization, removes only authenticated generated `dist`, and prunes test-owned empty parents without weakening exact post-command inspection.
- Focused release-gate coverage passes 7/7; V11 and first-run coverage passes 38/38. An empty-cache probe correctly reproduced npm `ENOTCACHED`, while the intended warm host-cache path passed dry-run package and installed-consumer verification.
- V11 Revision 37 now binds Candidate A `sha256:a1d7909b154a8a15567deefc8ea8c7f6942eb046d24cf3db41922cb26739274c` / `sha256:42ec6c54edefb0fda5287b3ba4145bd0d7e59e8f2ff3ba55c92f1610d09c78d6` and Audit B `sha256:58704463065c13dbf84aca3eccd3cc7ae75533111e26e615c3fa2827e77da568` / `sha256:04d67198f0dd761f8a11d1b8ab85594e65594de2b1f0f323f498c32874246987`.
- The 2,255-byte external receipt, 7,492-byte binder, 7,602-byte independent semantic `pass`, and 984-byte cross-package authorization all verify. Complete `--check-evidence` replay returns `pass`; Candidate 6 can now be frozen.

## Candidate 6 And Revision 13

- Candidate 6 `0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7` preserved exact source, Git context, live repository state, and cleanup, then failed only when the installed consumer resolved TypeScript under the dependency-free candidate materialization.
- Revision 13 compiled one atomic specialist against `sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555` / `sha256:b12698368ee2c73c6d012c1881275ec3bc225107067d05f9614a313d4358da80`.
- Its 5,319-byte raw handoff verifies `pass` at `sha256:539b591f70c9b5808e79f15d73bda7625b67555b10a36ff0cb9bfb75b4491943`; complete package verification and zero-dependency assessment are ready.
- The canonical host now passes one validated absolute regular-file TypeScript entrypoint outside candidate source. Local consumer runs retain the repository-local default. Duplicate, empty, relative, absent, directory, symlink, and candidate-contained supplies fail closed.
- Main-agent verification passes syntax, `git diff --check`, the offline installed-consumer gate, and all 9 focused release-gate regressions in 201.1 seconds.
- V11 Revision 38 binds Candidate A `sha256:30489eed5494663eb47344da10ac9feb30c23b882631d666e1a415b4700aacd3` / `sha256:44a7875f6940a59479b8b9e4d9abbfbeb978bad26ce039f3dda116d19741a63a` and Audit B `sha256:8fe3965dc75b6894bfc4701be32351ddd72f13b17450e8426ba9593a55f4f15a` / `sha256:0f13bcc14c2d2a8c794d0a1075c17ec128d8de5e64cdfd0ecde135d04e29d7d7`.
- The 2,255-byte receipt, 10,443-byte binder, 5,827-byte semantic `pass`, 984-byte authorization, 31/31 focused trust tests, and complete `--check-evidence` replay all pass. Candidate 7 can proceed to pre-freeze verification.
## Revision 13 Final Formatting And V11 Revision 39

- The first aggregate pre-freeze run stopped at `format:check` before lint or tests because the three Revision 13 files had not been passed through the repository formatter.
- Deterministic Biome formatting changed layout and import order only. Final source identities are `scripts/check-packed-consumer.mjs` 45,720 bytes at `sha256:911e617037a4b9aab715a4bbe6b7f8afb6a48ac240b42c6d76e550165835b19b`, `scripts/run-v12-release-gate.mjs` 31,743 bytes at `sha256:8162fb0b85698c50fa4efc0db91b6f9acc622aa67444c137e03a780dcf7e7f7b`, and `test/v12-release-gate.test.mjs` 16,016 bytes at `sha256:1a33280a311449a87c1f5ceca7a2494065610345c07433c38d97c65c80753405`.
- Focused verification passes all 9 release-gate regressions in 188.6 seconds, the offline installed-consumer gate, format, lint, typecheck, all 405 kernel tests in 201.1 seconds, all 31 V11 trust-runner tests, and the complete checker mutation matrix in 268.4 seconds.
- Because formatting changed one V11-bound source identity, Revision 38 remains historical and Revision 39 rebuilt the complete trust chain. Candidate A is `sha256:d96c354b605cdd183f66ddfd955be4c744ce62cac53c0cf5477e6ca749c73509` / `sha256:9ea35d987ed1880698069bd143fd4b1455e33e81f0e6c2953ae3a6ffe0dcf8c0`; Audit B is `sha256:39244b4af9521a5b581594185ff0505c1527950a83798f0bab7a5f2711fe87e7` / `sha256:ebc7f8889659b8c209f0034458f4b7a96ae1bbdbcd3cc3523007a97004b72477`.
- The exact 2,255-byte receipt, 9,342-byte binder, 8,798-byte independent semantic `pass`, and 984-byte authorization all validate. Complete `--check-evidence` replay returns `pass`.
- The aggregate pre-freeze `npm.cmd run verify` passes against these final bytes in 235.7 seconds, including all 405 tests, all three dogfood versions, package inspection, and offline installed-consumer verification.
- Candidate 7 is not yet frozen. Commit these exact final bytes before running its one-shot candidate gate.
