# Implementation Notes

## Status

The V12 product implementation remains complete; Revision 37 corrects one release-test isolation boundary. Revision 44 still passes the complete V11 trust replay, and exact Revision 35 aggregate/package-bound review evidence remains immutable. Exact Revision 36 gate `ee297d8e11466763acc9b4c630de445eb57b00c3` preserved source, materialization, disposable Git state, and cleanup but stopped at 443/445 core tests because two concurrent Git-batch fixtures inherited the same candidate `GIT_INDEX_FILE`. Revision 37 strips repository-scoping and dynamic Git configuration from every fixture process; focused causal tests pass 3/3 and the complete concurrent gate/review suites pass 49/49. Candidate-addressed external evidence requires a fresh exact aggregate and package-bound review before one different successor gate, fresh R2, hosted CI, milestone closeout, and owner merge.

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
- Candidate 7 was frozen at `f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa` and subsequently retired after its one-shot gate exposed the isolated-test default described below.
## Candidate 7 And Revision 14

- Candidate 7's one-shot exact gate authenticated 2,029 files and unchanged source before and after execution, then completed 404/405 tests. Only the host-supply unit test failed because its empty synthetic environment selected a candidate-relative development default.
- The resolver now accepts an internal third-argument default for deterministic testing; the production call remains two arguments and continues to normalize one explicit external host supply for exact candidates.
- The test default is a temporary external plain file and follows the same path checks as explicit supply. New cases reject relative, symbolic, and candidate-contained injected defaults.
- Main-agent focused verification passes the complete 9-test release-gate file before the added security assertions and the exact corrected test after them; Biome checks both changed files with no fixes. The complete post-correction `npm.cmd run verify` then passes in 238.1 seconds with all 405 tests, every dogfood version, package inspection, and the offline installed consumer.
- Revision 14 compiled the one legal one-agent partition with projected makespan 5 and zero conflicts. Compilation/package are `sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861` / `sha256:4e267e322fda4d51ba2babb25c50c6b9acb800776a7426870eefc4327092510d`.
- The exact 4,930-byte raw handoff verifies `pass` at `sha256:b678fcf1c85ec59304893b428fef0b09210d5b3eac45a51b49e3075a5003b064`; semantic/content digests are `sha256:2a012d248eca4e3bf99093acd6c4398ad15ff01dae77d124e2487f541efe94a1` / `sha256:5417214c8d55afc8a451f1cb66acad1a704933c2dedc8e691a43456ad49f4b47`, and complete fan-in is ready.
- V11 Revision 39 complete evidence replay still passes after integration, so no V11 trust rebuild is required for this correction.
- The complete template-checker mutation matrix passes in 264.6 seconds after Revision 14 integration.

## Candidate 8 And Revision 15

- Candidate 8 `0482bf3783e085c6cef3111d63003daa5197eca8` passed its one-shot exact gate over 2,046 files and 57,258,623 bytes with unchanged before/after source identity. Its receipt is `sha256:aa93e516387afc029ff21ba5d8e4f31cc0787e15ef181c38b1714acdf7c2c76e`.
- Candidate-addressed R2 preparation preserved 261 contexts and read scopes, then compilation failed closed with two `SC4308` limit diagnostics before rendering or launch. Candidate 8 is permanently retired; its request and failure evidence remain immutable.
- Revision 15 compiled the one legal one-agent partition with projected makespan 8 and zero conflicts. Compilation/package are `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f` / `sha256:627414164e9176f4ead047a4a857f23f81efc868643dd8aaaa55377186f162c8`.
- The collector now excludes only correction-root `inputs/`, `request.json`, `phase-metadata.json`, and `compilation-summary.json` navigation duplication. It keeps all authoritative package, approval, handoff, verification, replan, gate, and security evidence.
- The final 5,129-byte specialist handoff verifies `pass` at `sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb`; semantic/content digests are `sha256:421b9cdefb8e1da2413cafbdde01c9731ca4d7a938f9fe3eee7ace85f038b02c` / `sha256:ea0511d1d5f7c3f4a6578456ad2699ee2f5dc9e662a83dba0771f01d9198a579`, and complete fan-in is ready.
- Independent integration-owner verification passes the exact 261-to-167 context reproduction, all 10 release-gate tests, static integrity checks, `npm.cmd run verify` in 305.2 seconds, the checker mutation matrix in 265.6 seconds, and standalone V11 Revision 39 evidence replay.
- Candidate 9 `447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84` passed its one-shot exact canonical gate, then its complete R2 roster returned `pass` / `fix` / `pass`; authenticated fan-in records `releaseReady: false`, so Candidate 9 is permanently retired. Candidate 8 and Candidate 9 must not be regated, and their prepared requests must not be modified or reused. Any later exact gate requires a successor source identity.

## Candidate 9 And Revision 16

- Candidate 9's complete three-reviewer package is bound to compilation/package `sha256:be40c9ff219b8f544bb51cb44d2a0151c93334fcda056fb4026dd9f49b4e487b` / `sha256:b9b563936e860bd0f25dd292d362ce1a59c27ca66094389a49011c4d19c0f0bc`; its exact fan-in report records `pass` / `fix` / `pass` and `releaseReady: false`.
- Revision 16 compiled one specialist at `sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044` / `sha256:20437ba56376d4b39f459043bac0940e8ded2e298b48de0cd16d437a95c96db6`. Integration rejected the first package-valid `pass` as incomplete because live routing sections remained stale.
- The same exact specialist completed attempt 2 without authority expansion. Its 6,520-byte handoff verifies `pass` at `sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9`; the accepted report sets `integrationAccepted: true` and `phaseReady: true`.
- Focused release-review tests pass 8 of 8, the template checker passes, format and lint gates pass, and the anti-drift regression now covers status and live routing sections. Exact package reconstruction and accepted attempt-2 handoff verification pass after integration.
- Independent pre-freeze `npm.cmd run verify` passes in 350.4 seconds, including the full test suite, V10/V11/V12 dogfood, package inspection, and a clean installed consumer. The checker mutation matrix passes in 316.7 seconds.

## Candidate 10 And Revisions 17-22

- Candidate 10 `f4f91a373dd7f8028ec5d592e89c75f0027245c3` passed its exact canonical gate, but security review returned `fix`: the R2 parent and verifier imported ignored repository-live `dist/index.js` before candidate authentication. The candidate is retired and its exact gate, three handoffs, and non-ready fan-in remain immutable.
- Revision 17 returned `redesign` because its four-file authority could not create a separately trusted parent, candidate-derived runtime, fresh child boundary, post-run rehash, and staged promotion. Revision 18 completed that design across six files and passed 24 focused tests after a measured timeout diagnosis.
- Revision 19 closed the production identity cycle, but independent review found phase-specific authority was changing stable package identity and the fresh lifecycle proof was incomplete. Revision 20 corrected identity stability; its independent review still returned `fix` because the lifecycle was a synthetic projection rather than actual production execution.
- Revision 21 ran the copied production lifecycle and all ten negative routes, but correctly returned `block`: one declared test input was an unavailable intermediate, and its npm compatibility adapter deleted `npm_config_globalconfig`, restoring host configuration.
- Revision 22 binds immutable pre-edit snapshots, creates two distinct authenticated empty npm config files inside each fresh operation root, validates them before process spawn, removes the compatibility adapter, and runs installed npm 11 directly through the copied production parent. The exact package is `sha256:6df1f8efc8d938b61f12c2fc6ce82bb5ded3ef10d34476a1c87f8fa63fd3dc79` / `sha256:5ea6c1072e7345983dbfbbb08f688b698b6a843921e48aaac5496b135f63378c`; its 21,143-byte handoff verifies `pass` at `sha256:0bfac8263bd0d209baf33f7cbfd29fc68482a52eef187f77fcf7ce66ebf28988` with `phaseReady: true`.
- The complete 34-test release-review and release-gate suite passes in 1,781,304.3289 ms, including the 1,659,467.982 ms real isolated lifecycle and every negative route. Independent package-bound review authenticates 37 contexts and returns `pass` with no trust, provenance, cleanup, reconstruction, path, process, promotion, or test-quality finding.
- V11 Revision 40 independently reproduces the exact 203-candidate search, six-agent selection, authority, evidence coverage, schedule, package rendering, receipt, binder, and semantic audit. Candidate A `sha256:1cb6df1641d258e0403b2d5763ae1432fb998efc8a77ba638e809c5bbd864fcb` / `sha256:cbc9704873dd1a1d6ef986f5f2d0ec34053db1e5e26152f4663c97363cc1ac98`, Audit B `sha256:c0dacfcc63e8d042e7dae3b03d58f23d949d17cf9c283e5208525599e6f2a4ce` / `sha256:261a8696b0d92ab0f4a27f5743f95cc83db861ee4137877f03b13312d31fc63f`, the 12,843-byte semantic handoff at `sha256:254b7c8d4cc867583fe7572ed08f82dfe126d74f565f33ffdd0799e93bb33650`, launch authorization, and complete replay all pass.
- The post-reconciliation checker mutation matrix passes in 335 seconds. The complete pre-freeze `npm.cmd run verify` passes in 1,888.7 seconds, including format, lint, typecheck, build, the full test suite and real lifecycle, V10/V11/V12 dogfood, dry-run package inspection, and clean installed-consumer verification.

## Candidate 11 And Revision 23

- Candidate 11 `e541393bfe9f6656177ea3bba2cf92940cf4b7b9` preserved exact source and Git state but failed one of 424 tests because the lifecycle helper read ignored `SOURCE_ROOT/.local/npm-cache` instead of the external cache already resolved by the canonical gate.
- Its receipt and raw logs are immutable under `evidence/release-review-r2/inputs/canonical-gates/e541393bfe9f6656177ea3bba2cf92940cf4b7b9/`; `candidate-11-retirement.md` permanently records outcome `fix`.
- Revision 23 changes only the lifecycle helper and its regression file. The helper consumes `RELEASE_GATE_TEST_HOOKS.hostNpmCache`, copies it into an absent disjoint lifecycle-owned destination, and preserves all production cache, package, private-config, and cleanup rules.
- The fast supply/overlap regression passes. The exact copied-production compile-to-verify lifecycle passes in `1,908,536.9107 ms`, including three fresh parent phases, complete handoff fan-in, all ten negative routes, source reauthentication, and cleanup.

## Revision 24 Final Review

- Revision 23's independent review returned `fix` because its fast regression retained a test-only source override. Revision 24 removes the override, binds the external cache before fresh-process imports, proves the candidate-local cache is absent, validates exact sentinel bytes, and covers missing, non-directory, pre-existing-destination, and overlap failures.
- The first complete Revision 24 lifecycle run diagnosed a sealed-fixture sequence defect. A bounded rule now excludes canonical `release-correction-rN` roots for `N >= 22` from both copied filesystem and committed Git representations; the corrected lifecycle passes in 1,853.7 seconds.
- The final independent package reconstructs at `sha256:6025d006482b13d40bdfc04f6ab2d7a16628f6040ef929cbe79b18707990ff90` / `sha256:deffe7fcb085e2840f94dba081e653800adf16528f062d7208a3d5072d18c81b`. Its exact 18,311-byte handoff verifies `pass` at `sha256:f88c08303de25f66a61dae6f0ca6e508b0357923c9c4bbe0d45e2e82a72c6497`, complete fan-in is ready, and integration accepts the corrected Revision 24 artifact identity.

## Revision 31 Release-Harness Hardening

- Replaced per-tree-entry `git cat-file blob` spawns with one sorted, unique, binary-safe `git cat-file --batch` exchange.
- Added strict parser coverage for identity, type, size, binary content, framing, ordering, duplicate requests, truncation, and trailing output.
- Scoped every copied-parent temp environment to a test-owned invocation root; unrelated global temp state can no longer affect attribution.
- Added complete process-tree termination and timeout evidence. Process outcome is checked before owned cleanup.
- Moved production operation-root ownership into the guarded path and surfaced cleanup errors instead of discarding them.
- Focused regressions pass 2/2; the full release-review file passes 28/28; the real current-tree batch probe completes in 817 ms for 2,205 unique objects and 69,562,019 blob bytes.
- The correction changes release infrastructure only. It does not add provider, model, IDE, scheduler, execution, persistence, or merge effects to SWECircuit core.
- The first full lifecycle attempt was invalid because committed `HEAD` supplied the executed parent while the uncommitted working tree supplied its expected identity; the mismatch surfaced only after 2,383.9 seconds.
- The lifecycle now preflights every committed production identity before temp-root creation or materialization. Its scheduling regression passes, and the same invalid state rejects in 215.1 ms with exact committed/live identities.

## Revision 32 Batch-Coverage Closure

- Preserved the exact Revision 31 review package and its verified non-`pass` handoff under `evidence/implementation/independent-review-r31/`.
- Added strict batch loading to the embedded candidate-derived harness and canonical release gate; the verifier inherits the corrected harness entry point.
- Added `test/helpers/git-blob-loader-fixture.mjs` and causal 3-file/35-file process-count tests over all actual loaders.
- Rebound copied-lifecycle production identities only after formatting stabilized.
- Release-review passes 31/31, release-gate passes 17/17, and format, lint, and typecheck pass.
- Exact Revision 32 aggregate preserved 444/445 core passes and stopped at one live-routing documentation invariant before lifecycle or later gates.
- Revision 33 restores explicit candidate-addressed external-evidence ownership in the active review outcome; product runtime and batching code are unchanged.
- A fresh full aggregate and immutable package-bound independent review remain before successor freeze.

## Revision 34 V11 Trust Refresh

- Preserved the exact Revision 33 aggregate receipt under `evidence/implementation/release-correction-r34/`.
- Proved `.gitattributes` was the sole stale V11 source and retained its required binary byte-integrity rules.
- Archived Revision 43 before generating Revision 44.
- Bound Candidate A and Audit B to exact package pairs, a 2,255-byte non-launching receipt, a verified 6,366-byte binder, `integrationReady: true`, and a 10,233-byte independent semantic `pass`.
- Corrected a premature Candidate A approval before launch and enforced the three-event order: Audit B approval, semantic authorization, Candidate A approval.
- Strict V11 `--check-evidence` replay and all 31 dedicated dogfood regressions pass.
- Product code and public APIs are unchanged; post-edit V12 anti-drift and a fresh immutable aggregate remain.

## Revision 35 Historical-Outcome And Timeout-Evidence Correction

- Preserved the exact Revision 34 aggregate receipt under `evidence/implementation/release-correction-r35/`.
- Restored Revision 1 incomplete fan-in, Revisions 2 and 3 `split`, and later correction `pass` routes in active test-plan status.
- Expanded the mandatory final post-edit gate from one live-routing test to both adjacent status invariants; the causal pair passes 2/2.
- Full-file verification exposed contradictory timeout evidence when the primary tree kill was denied but the direct fallback was accepted.
- Top-level termination acceptance now includes explicit fallback acceptance while preserving primary and fallback evidence separately; descendant absence remains a hard assertion.
- Restricted focused verification passes 5/5, native Windows verification passes, and the complete release-review file passes 31/31.
- Product code, public APIs, and Revision 44 trust evidence are unchanged; the later aggregate and review evidence are preserved below.

## Revision 36 Evidence Freeze

- Archived the exact Revision 35 aggregate receipt, stdout, and stderr with decoded byte/digest bindings.
- Archived the complete approved compilation/package, runtime selection, launch receipt, raw reviewer handoff, kernel verification, and integration assessment.
- Preserved candidate snapshots by exact Git object identity rather than duplicating transformed text.
- Recorded the independently verified `pass` while keeping `releaseApproved: false`.
- Product code, public APIs, release-harness code, and Revision 44 trust evidence are unchanged.
- Revision 36 is the source for one exact successor gate; fresh R2, hosted CI, milestone closeout, and owner merge evidence remain.

## Revision 37 Git-Fixture Isolation

- Preserved the exact Revision 36 receipt and raw logs under its candidate-addressed gate root.
- Retired exact source `ee297d8e11466763acc9b4c630de445eb57b00c3` without rerunning it.
- Added case-insensitive removal of repository-scoping Git variables and dynamic command-line configuration bindings in the Git-batch fixture.
- Added a direct hostile-environment regression covering the shared index, repository, object, optional-lock, and dynamic-config inputs.
- Focused causal verification passes 3/3; complete concurrent release-gate/release-review suites pass 49/49.
- Product code and public APIs are unchanged; fresh aggregate and package-bound review evidence remain required.
