# V11 Specialist Compiler Implementation Notes

## Status

Revision 30 technical integration is complete for the exact approved Candidate A and Audit B pairs. The two-phase trust root, all five Candidate A handoffs, attempt-30b release gates, and integration-ready fan-in are `PASS`. Post-integration reconstruction, final host gates and archival, commit/push, and owner merge approval remain open; no such effect is claimed here.

## Summary Of Changes

- Preserved the four failed runtime architecture rounds instead of rewriting their evidence.
- Split the independent Specialist Compiler into the active V11 product slice.
- Added a closed GoalContract and SpecialistCompilationRequest schema, deterministic candidate construction, exact and bounded search modes, a fixed optimization comparator, task-shaped AgentBlueprints, and digest-bound rendering.
- Added a separately named public specialist API without widening the six canonical V9 artifact kinds.
- Added all supplied proposal evaluations to the compilation trace, full-digest team and agent identifiers, exact filesystem-authority narrowing, and manifest bindings for every launch payload.
- Dogfed attempt 1 through compiled product/API, algorithm/lifecycle, security/trace, and release-gate specialists; preserved the rejected package and every raw handoff.
- Corrected canonical assumptions and unresolved decisions, explicit search/selection evidence, permission-kind type closure, semantic parent-path rejection, package-root trust, deterministic package verification, and security-review context closure.
- Preserved attempt 5 as `FIX` after its authorized integration changed a live spec still used as review context; revision 6 binds `context.spec` only to the immutable pre-integration snapshot.
- Closed revision-6 technical acceptance with exact source/package binding, all canonical gates, three no-finding independent reviews, and source-linked acceptance, review, milestone, and memory records.
- Added non-launchable candidate analysis without weakening fail-closed compilation, plus closed raw-handoff verification and transitive dependency fan-in.
- Added a deterministic read-only first-run example and expanded the clean packed-consumer gate to exercise every public V11 operation.

## Deviations From Plan

The original V11 plan attempted to design compiler, scheduler, restart protocol, parent trace, repository proof, merge evidence, and memory proposal flow together. Round 4 returned four `REVISE` verdicts. The workflow emitted `split`: V11 now ships specialist construction and package rendering; the runtime control plane is deferred with its corrections preserved.

## Assumptions Used

- Goal clarification and atomic semantic work decomposition remain visible IDE/human work.
- Core can optimize grouping from stable work-unit contracts without provider supply.
- Planning weights are useful for deterministic comparison but are not elapsed-time promises.
- Exact scope keys plus declared conflict zones are safer and more portable than hidden path-overlap heuristics.

## Follow-Up Work

- Preserve this exact integration handoff, then reconstruct and verify both approved package pairs after the live output edits.
- Run final host repository gates, preserve the results, and archive attempt 30 only after post-integration replay succeeds.
- Commit and push the release-ready branch, then request the owner's explicit merge decision.
- Keep deferred runtime-control-plane work outside V11; evaluate broader search heuristics only after real adoption evidence exists.

## Historical Revision-6 Verification

- Revision-6 preparation passed 34/34 authorized source bindings for compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`; `context.spec` targeted only the immutable pre-integration snapshot.
- Dogfood exact search evaluated 203 candidates, found 52 eligible, and selected six specialists at projected makespan 23. The serial baseline projected 40 and was ineligible for requested evidence independence.
- Focused schema 7/7, compiler/golden 35/35, and host-containment 6/6 passed.
- `npm.cmd run verify` checked format across 72 files, lint across 60 files, passed typecheck/build, and passed 323/323 tests. Both dogfoods, the offline installed consumer, package verification, package inspection, and the template checker passed.
- The complete negative checker matrix passed in 744.9 seconds.
- Product/API (12/12 context), algorithm/lifecycle (14/14), and security/trace (32/32) each returned PASS with no findings against the same digest pair.
- Post-integration evidence reconstruction returned `PASS` for both owner-retained revision-6 digests after the authorized output updates.
- The exact accepted evidence is preserved in `evidence/dogfood/report.json` and the revision-6 PASS handoffs. Attempts 1-4, the attempt-5 post-integration replay `FIX`, and release-host attempts 6A/6B remain failure and correction provenance.
- Candidate `191d9339da383a2133377dcca564d7202b7ad66d` is committed and pushed. No hosted CI, merge, provider execution, or runtime enforcement is claimed by this integration record.

## Revision 24 Pre-Freeze Verification

- Candidate-analysis tests cover selected equivalence, valid no-eligible evidence, non-launchable output, and unchanged compile failure.
- Strict schema and handoff tests cover object closure, package-owned references, raw identity bindings, secrets and controls, stale and duplicate evidence, transitive dependencies, and fan-in.
- Caller-provided handoff arrays reject proxies and accessors without invoking traps or getters.
- The first-run example verifies real repository bytes, deterministically explains the serial and selected teams, approval-verifies a package, leaves the tree unchanged, and reports zero agents executed.
- Typecheck, lint, build, focused suites, and the clean offline packed-consumer host pass. Final counts and canonical-gate evidence will be recorded only from the frozen revision-24 candidate.

## Release Integration Friction

- During attempt-5 integration, the workspace patch helper failed twice during sandbox refresh before changing any file. Integration used bounded exact-match PowerShell replacements under the declared write scopes, followed by diff, link, checker, and immutable-byte verification.
- One initial tuple-verification command had a PowerShell pipeline parse error, and the first exact replacement guard used the wrong `String.Split` overload. Both failed before writes and were corrected without changing candidate evidence.
- The first attempt-5 post-integration template check rejected milestone headings `Shipped Candidate` and the missing `Why It Matters`; the milestone adopted the exact required headings and the immediate rerun passed.
- Attempt 5 then emitted post-integration replay `FIX` because its `context.spec` locator still named the mutable live spec. Revision 6 removes that alias and treats the live document only as an integration output.
- Release-host attempt 6A emitted `FIX` after a nested TEMP/TMP root produced a 265-character Windows path. Attempt 6B emitted `FIX` after the reviewer removed host-owned offline `_cacache`; neither changed source or the approved pair.
- The successful revision-6 release preserved `_cacache`, used `.local/npm-cache` directly as TEMP/TMP, and completed the exact 744.9-second matrix.

- During revision-24 editing, the native patch helper repeatedly failed during Windows sandbox refresh before changing project files. Reviewed unified patches were generated outside the worktree and applied with `git apply`; Windows line-ending-only mismatches required `--ignore-space-change --ignore-whitespace`.
- During revision-28 correction, the same helper failed before project writes. Bounded replacement helpers asserted each old snippet exactly once, preserved line endings, and were followed by formatted diff review, typecheck, lint, focused tests, and the clean packed-consumer gate. One helper stopped after partial intended edits when a non-unique target was detected; the diff was inspected before a second bounded helper completed only the remaining targets.
- The first clean offline packed-consumer run exposed missing transitive packages in the temporary npm cache. Warming only the lockfile-pinned production dependencies resolved the host setup issue without changing source or package contracts.
## Durable Learnings

- A useful compiler and a universal runtime are separate ownership boundaries.
- Hyper-specialization begins with exact task demand and candidate-team comparison, not generic role labels.
- Search mode and objective evidence must be visible so "optimized" remains an auditable claim.
- Package integrity requires an expected digest retained outside the package being verified.
- Review-agent construction must close over security-sensitive helper context, not only top-level feature files.
- Any artifact integration may mutate must be reviewed through an immutable pre-integration snapshot, with the live path reserved as an output.
- Post-integration reconstruction against both owner-retained digests is mandatory before branch freeze; a mismatch retires the candidate instead of being explained away.

## Revision 20 Hardening
- Candidate analysis is useful only when it shares the compiler's exact normalized evaluation and remains visibly non-launchable.
- Runtime evidence needs a closed, digest-bound raw handoff envelope and dependency fan-in; prose filenames and inferred PASS states are not sufficient.

- Revision 20 proved the two-package approval and fan-out path, then stopped correctly when security review found three semantic-handoff and path-validation gaps.
- The correction reuses the core secret detector, splits metadata from LF-only Markdown policy, and centralizes lone-surrogate path rejection.
- Focused verification passes 65/65 and the full kernel passes 353/353 with format, lint, and typecheck.
- Release freshness rejected the mutated approved candidate, demonstrating that successful earlier gates cannot authorize later source bytes.
- The complete retired candidate, approvals, packages, immutable inputs, and raw handoffs are archived under `evidence/dogfood/runs/attempt-20/`.
- Revision 21 must repeat every approval and review gate; no revision-20 approval or PASS is reusable.

## Revision 21 Hardening

- Revision 21 proved the complete prelaunch trust chain and passed preparation, product/API, and security/trace review before two independent gates stopped integration.
- The compiler now reconstructs nested closed records in schema order, closing the gap between canonical semantic digesting and byte-stable rendered package identity.
- The logical-permutation regression now compares ordinary compilation JSON, the full rendered package, and the root package digest rather than relying on deep equality and sorted digest projection alone.
- The 119-case checker harness now uses a thin baseline and four reusable copy-on-write fixture slots. It preserves exact case semantics while completing in 213.3 seconds instead of remaining nonterminal at 900.5 seconds.
- Focused compiler coverage, 353/353 kernel tests, format, lint, typecheck, build, PowerShell parsing, and all 119 checker cases pass on the corrected live tree.
- The complete revision-21 run is archived under `evidence/dogfood/runs/attempt-21/`; its approvals and PASS results cannot authorize revision 22.

## Revision 22 Hardening

- Revision 22 passed the complete two-package trust chain, preparation, product/API, algorithm/lifecycle, and release verification before security review stopped integration.
- Public diagnostics now apply the shared malformed-Unicode and secret policy at construction time rather than relying on downstream handoff validation.
- Direct `createDiagnostic`, `parseJsonBuffer`, contained-read, and supplementary-Unicode regressions bind the correction to every exposed path identified by review.
- Focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build.
- The complete revision-22 run is archived under `evidence/dogfood/runs/attempt-22/`; its approvals and PASS results cannot authorize revision 23.

## Revision 23 Hardening

- Revision 23 passed the complete two-package trust chain, preparation, product/API, algorithm/lifecycle, and release verification before security review stopped integration.
- Security review found that token-local pointer checks still allowed credential-assignment and Bearer-style values split across pointer delimiters to survive in diagnostics.
- Revision 24 evaluates cumulative emitted and decoded prefixes before extending the safe pointer and adds exact regressions that preserve only the longest safe prefix.
- The correction passed focused diagnostic coverage and the pre-expansion kernel gates; revision 23 remained retired before integration.
- The complete revision-23 run is archived under `evidence/dogfood/runs/attempt-23/`; its approvals and PASS results cannot authorize revision 24.

## Revision 24 Hardening

- Added `analyzeSpecialistCandidates` so an IDE can inspect the exact normalized candidate evaluation, including a valid no-eligible result, while compilation remains fail-closed.
- Added a strict public handoff schema, raw-byte verification, semantic and artifact digests, and transitive dependency fan-in.
- Hardened handoff-array capture against proxies and accessors so caller code cannot execute during verification.
- Added a truthful read-only first-run example and extended the packed-consumer gate across candidate analysis, package rendering and verification, handoff verification, and fan-in.
- Revision 24 compiled and approval-verified both packages but was retired before any agent launched because its custom prelaunch semantic envelope and compiled required handoff fields were mutually unsatisfiable.

## Revision 25 Hardening

- `PrelaunchAuditHandoff` now carries the standard `agent` and `compilationDigest` fields alongside its audit-specific reviewer and two-package bindings.
- Launch authorization requires both reviewer identities to match the selected Audit B reviewer and both Audit B compilation identities to match the approved compilation.
- Missing, unknown, malformed, stale, non-scalar, secret-bearing, and disagreeing duplicate bindings fail closed in focused regression coverage.
- The two-phase protocol example and reviewer stop condition now describe the same closed envelope the validator accepts.
- Focused prelaunch tests passed 29/29 before the revision-25 candidate freeze.
- Updated the concise public operating surface and normative contracts without claiming runtime, persistence, permission enforcement, or merge effects.
- Revision 25 compiled and approval-verified Candidate A `sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404` / `sha256:1c7e875c0aad3c1b4a0987b14ec9be57b73c533c03779236889ce547db3e5af8` and Audit B `sha256:3cdf00aaa53b2d4b0a3a72789a6d654b49e4cbfbbd58e9b6a45c085ee05483a6` / `sha256:bc806f5007a87f2c5363c3cd0f3c35371e0c8ed6dda7ad46003ac88dd4fc7dac`; the external receipt passed and the complete kernel passed 364/364.
- The workflow checker then stopped the run because the concise README had removed stable workflow headings, the source-checkout init command, active minimal/executor links, and explicit external-host boundaries. One binder was interrupted before handoff; zero results were accepted, no launch authorization was created, and Candidate A never launched.
- The exact retired control set is archived under `evidence/dogfood/runs/attempt-25/`.

## Revision 26 Hardening

- Restored the stable `How It Works`, `Start Here`, `Core Contracts`, `Repository Guide`, `Principles`, and `Status` interface while keeping the README concise.
- Restored the V10 source-checkout init, validate, and inspect path, active minimal-project and executor-boundary links, and exact external-host/non-effect language.
- Added R29 and AC18 so future README simplification must preserve these public anchors through the template checker and complete regression matrix.
- The current template checker passes. Fresh source freeze, packages, approvals, Audit B, Candidate A lanes, fan-in, integration replay, canonical release gates, and branch publication remain required.


## Revision 27 Hardening

- Revision 26 compiled and approval-verified Candidate A `sha256:f3658ec182621f9a3485915cd260046d70e7fb1dcd84770f5b03ed3c9d05bb8e` / `sha256:f888a1a784d203d51bcb5d780b71167e0012662d30cec3dbab0d6e34afcab13a` and Audit B `sha256:9823e1919504fd757584f8eb24f2720c8ff34df4834e52a3d3a096a34304115f` / `sha256:3661bf2fcdfeaa88f43bf5fdf22b9f6c54f7ac908d70e96540b03f56714be1d1`; the external receipt passed.
- Its authenticated binder returned blueprint-shaped artifacts and evidence instead of the strict public handoff shape. Public verification rejected the raw result with `SC4310`; zero results were accepted and Candidate A never launched.
- Every generated agent contract now includes one concrete closed `SpecialistAgentHandoff` example with exact identities, work units, artifact names, evidence duties, string content, media types, status, and artifact references.
- Renderer regression coverage extracts every generated example, asserts exact nested keys, and passes it through `verifySpecialistHandoff` against the rendered package.
- The checker-matrix fixture now expects the missing handbook-link diagnostic for the navigation line it actually hides.
- Pre-freeze format, lint, typecheck, build, 364/364 kernel tests, the template checker, and all 119 checker cases pass.
- Revision 27 compiled Candidate A `sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7` / `sha256:fde922b7e3c2f4747e04c92dacea8af3c7083fa87cd3bcf029f92b2b1ce632b3` and Audit B `sha256:183c968974eab7b6d7bd4451ceec2d35d16784265deb6b333836a7726b216d6c` / `sha256:c163c1c5eefc6900234fd781877677c0a41cbd6ffc7cd104b749bcf952f18841`; Audit B and launch authorization passed.
- Preparation and algorithm/lifecycle passed. Product/API, security/trace, and release returned public `FIX` handoffs; the exact fan-in contained all five dependencies but reported `integrationReady: false`. No integration launched, and the complete run is archived under `evidence/dogfood/runs/attempt-27/`.

## Revision 28 Hardening

- Exported `common.schema.json` beside both advertised specialist schemas and made the clean installed consumer resolve and compile the complete strict Ajv registry through supported package subpaths.
- Centralized deterministic `.json` / `.md` / fallback artifact media derivation and require exact media preservation during package-bound handoff verification.
- Artifact content now permits normalized LF only and rejects TAB, CR, CRLF, and every other unsafe control before verified evidence is returned.
- Both packed-consumer hosts retain the same reviewed digest pair and construct handoffs with the generated artifact-media contract.
- Focused compiler, schema, and handoff tests pass 54/54; lint, typecheck, build, and the clean offline packed-consumer gate pass. Fresh immutable revision-28 review evidence remains required.

## Revision 29 Hardening

- Revision 28 compiled Candidate A `sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c` / `sha256:7dd562d20096778abcd15601edc4226064865cf418c33f07f8e8ad25878faba0` and Audit B `sha256:044b44b21d22e5692a5edfb51de76813c689e8b244c58464d8ab55613a30dc3d` / `sha256:86d47a8b1ead37e6a920472fe153bc0d97b9c0340c59246ab5768c762a8f9c42`; receipt, Audit B, launch authorization, and preparation passed.
- Algorithm/lifecycle and security/trace passed. Product/API and release independently found that `examples/specialist-compiler/approval.json` retained the prior contract byte count and digest; complete fan-in was non-ready and integration did not launch.
- The release lane passed the template checker, all 119 checker cases, and 48/48 strict specialist tests before canonical verification stopped at 364/365 tests on the stale approval.
- The approval now binds the current 36,449-byte contract, its raw digest, and the newly derived compilation/package pair. The normal example approval-verifies and 2/2 focused first-run tests pass.
- The complete revision-28 run is hash-preserved under `evidence/dogfood/runs/attempt-28/`; no revision-28 identity or result can authorize revision 29.

## Revision 30 Hardening

- Revision 29 compiled Candidate A `sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da` / `sha256:1e3afc96dc43950e21b3db94752a6f6fe9c33931ab36b0ce4a2adc2229a59994` and Audit B `sha256:17d7985ed3c4d0f817550b29d9b95308d11a5acaf13dabdee288e3b1d692742d` / `sha256:807d04eb877751acbe4802ccf147bf0853ac4df3390a953ed4669fc572bbbfb7`; receipt, Audit B, launch authorization, preparation, and all five Candidate A handoffs verified.
- Algorithm/lifecycle and release passed. Product/API found two authorization summaries that omitted the mandatory external receipt binding; security/trace found plain approval parsing and lexical-only repository path checks in the first-run host. Complete fan-in was non-ready and integration did not launch.
- Both summaries now require the exact receipt path, raw digest, byte count, and outcome alongside the exact semantic handoff binding before Candidate A approval.
- The first-run host now uses bounded duplicate-aware strict JSON, recursive exact-key checks, pre-I/O text and privacy validation, and the existing canonical contained-file boundary for repository sources. Errors do not echo untrusted path text.
- Focused first-run coverage expanded from 2 to 7 cases and passes 7/7, including duplicate and unknown fields, malformed and oversized approval bytes, unsafe or secret-bearing paths, directories, and external junction targets.
- The checked-in approval was regenerated after the normative contract changed and now binds a 36,886-byte contract at `sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9`, compilation `sha256:e8c097acd2a3fe970b96ce17b80dbe560ca739a682b5df9aa693bff32bbdcc04`, and package `sha256:96013b9710e1803433d44abb34982cb21013d506c3435b72dfad0c67d477e490`.
- The complete revision-29 run is hash-preserved under `evidence/dogfood/runs/attempt-29/`; no revision-29 identity or result can authorize revision 30.

### Revision 30 Integration Evidence

- Candidate A is `sha256:ced8186898ebb27bac53e50e6b803c353766ae015464a2bae2b758cb6cf6cc36` / `sha256:ddb642a474815b4ded464b40f5bd8225a404f610d3bd4a91d0ab2d43dc695f43`; Audit B is `sha256:79c5a7103225b12398e27c0e959b993597f38dcc5ddca6d9750a4d2b62f2d065` / `sha256:367d9b3d57b918aabc6543dae16b9b3cf5fee81338fd241226ef9bef2209510f`.
- The exact receipt and semantic Audit B handoff are `PASS`; launch authorization binds both pairs and both raw artifacts; Candidate A approval binds its exact pair.
- Preparation, algorithm/lifecycle, product/API, release retry 30b, and security/trace are exact public-verified `PASS` handoffs. Final machine fan-in is `integrationReady: true` with no missing dependency.
- Release attempt 30a remains a bounded host-authority `FIX` that stopped before canonical gates. Exact retry 30b passed 119/119 checker cases, 133/133 focused regressions, 370/370 canonical tests, package and consumer checks, and committed evidence replay.
- Technical documentation and memory integration are persisted. Attempt 30 remains live until the host preserves this handoff and completes post-integration replay; no archive, commit, push, hosted CI, or merge is claimed.
