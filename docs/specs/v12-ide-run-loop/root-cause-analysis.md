# Root Cause Analysis

## Status

Candidates 1-7 are retired with immutable evidence. Candidate 3's independent review causes and Candidates 4-7's exact-gate causes are closed through contiguous correction revisions 1-14. Candidate 8 pre-freeze verification and release evidence remain pending.

## Reproduction

Run `node docs/specs/v12-ide-run-loop/evidence/architecture/run-specialist-compiler.mjs approve` against the rendered Revision-1 architecture package.

## Stable Evidence

The command stopped before approval with a `TypeError` at `specialistPackage.compilation.contentDigest`. The exact preserved envelope has root keys `compilationDigest`, `packageDigest`, `manifest`, and `files`.

## Competing Hypotheses

- Rendering omitted compilation data.
- JSON serialization removed a nested field.
- The host assumed the wrong public envelope shape.

## Confirmed Root Cause

The dogfood host used an unverified nested field path instead of the public root `RenderedSpecialistPackage.compilationDigest` field.

## Fix

Read the root digest pair, assert both values are strings, then bind approval and package verification to those exact values.

## Regression Coverage

The corrected approval command must write the exact expected pair and pass `verifySpecialistPackage`. Later V12 host examples must test envelope-shape access through public types rather than untyped JSON assumptions.

## Durable Learning

Host scripts must validate deserialized public-envelope roots before constructing approval expectations. Digest integrity cannot repair a caller that reads the wrong field.

## Memory Update

Keep the finding in this feature package until the V12 host protocol and tests demonstrate the durable prevention pattern.

## Foundation Host Edit Failure

### Reproduction

Run the exact Foundation Revision-1 specialist in the temporary Git worktree and attempt an approved scoped edit.

### Stable Evidence

The specialist authenticated every source, attempted four native or wrapper `apply_patch` routes, and changed no target file. The verified non-`pass` handoff is preserved under `evidence/implementation/foundation/handoffs/`.

### Competing Hypotheses

- The generated contract omitted write authority.
- The repository files were read-only.
- The temporary worktree was outside the host's native patch workspace.

### Confirmed Root Cause

The contract correctly declared the six-file write scope, but the host's native patch helper cannot initialize against the temporary worktree. Main-agent dogfood had already required bounded escalated writes in the same location. The failure is host capability supply, not package identity, source authentication, product ambiguity, or implementation logic.

### Fix

Retire the blocked session and compile a new GoalContract revision. Preserve the same product, source, and file authority while explicitly declaring `powershell` process demand and allowing exact precondition-hash-guarded writes only after native `apply_patch` fails before mutation.

### Regression Coverage

Revision 2 must authenticate the same sources, remain within the same six-file ceiling, record every fallback precondition and resulting verification, and return a fresh package-bound handoff. Any write outside scope or unguarded replacement remains a hard stop.

### Durable Learning

Portable agent contracts must distinguish semantic write authority from host editing capability. A host-specific fallback can materialize the same authority, but it must be explicit, bounded, revisioned, and auditable rather than silently improvised.

## Release Review Attempt 1

### Reproduction

Run the exact product/API/IDE, lifecycle/correctness, and security/trace/authority reviewers over candidate `d914b273ba619e3cfa42206c8d9f136be73075e3` after the full 385-test canonical gate passes.

### Stable Evidence

The complete three-agent package-bound roster returned `fix`. Raw source evidence and verifier output are preserved under `evidence/release-review/`; no reviewer edited production or repaired a finding.

### Confirmed Root Causes

- Correlated criterion and requirement fixture IDs hid that inspection sorted by criterion before the unique V11 requirement identity.
- The run validator copied the repository's schema-loading pattern without reconciling V12's stronger no-filesystem-effect contract.
- Boundary coverage proved individual inputs but never constructed the normative maximum aggregate; green tests therefore overstated resource-proof completeness.
- The synthetic dogfood fixture was treated as both API regression coverage and implementation dogfood, even though AC8 requires an actual implementation package and measured friction.
- Release review was added after the candidate freeze without first separating immutable reviewer inputs from mutable closeout outputs or preserving primary raw gate evidence.

### Smallest Causal Corrections

- Sort evidence by `requirementId` first and add counterordered IDs.
- Bundle immutable schema data into the module and prove all four operations survive with filesystem reads disabled.
- Build the real 16-agent aggregate fixture, then either prove every exact limit or revise unreachable limits through the reviewed contract.
- Run V12 over the exact correction package and its exact raw handoffs; preserve sessions, inspections, integration snapshot, and all AC8 metrics.
- Snapshot mutable review input and bind raw V12 handoffs, Audit-B approval bytes, and a candidate-bound canonical-gate log/receipt into the next review package.

### Regression Gate

The replacement candidate must pass focused causal tests, the complete canonical gate, deterministic implementation-package dogfood, exact source and handoff verification, and a fresh three-domain release review. Attempt-1 identities cannot authorize the replacement.

## Correction Confirmation

The correction chain preserved each non-success route instead of repeatedly patching: revision 1 exposed stale scope, revisions 2 and 3 returned `split` with progressively narrower cold-read evidence, revision 4 closed the composed filesystem-read chain, and revision 5 rebound real dogfood and primary release evidence. Both revision-5 handoffs verify `pass`, the integrated suite passes 388 of 388 tests, and V11 revision 33 independently re-authenticates the final bound sources. The remaining uncertainty is deliberately externalized to the candidate-bound canonical receipt and three independent R2 reviewers.
## Candidate Canonical Gate Attempt 1

### Reproduction

Run the candidate-bound wrapper over clean commit `989e6ea6da754ecddcf06507567647bd9d84be02`. `npm.cmd run verify` reaches the clean packed-consumer check and exits 1.

### Stable Evidence

The closed receipt records unchanged pre/post `HEAD`, clean tracked state, exact raw output bindings, and failure. The installed consumer received `rawSessionInputBytes: 67108864` but its fixture expected `134217728`.

### Confirmed Root Cause

Revision 1 intentionally reduced only the raw preparse input ceiling to 64 MiB after the 128 MiB at-limit fixture exhausted the runtime heap. The source constant, normative contract, and focused boundaries were updated, but the independent packed-consumer expectation and live architecture summary were omitted from that write scope. Candidate-global immutable output names were a separate evidence-harness design defect revealed by the first failed run.

### Causal Correction

Revision 6 gives disjoint specialists exact authority over consumer/architecture parity and candidate-addressed gate evidence. Attempt-1 bytes remain immutable. A new candidate must pass a newly addressed canonical gate; a passing focused rerun alone cannot authorize release review.

## Candidate Evidence Retention

### Reproduction

Candidate 1's receipt binds exact stdout and stderr paths and digests, but `git check-ignore -v` classified both source files under the repository-wide `*.log` rule.

### Confirmed Root Cause

The candidate-addressed gate design solved identity and overwrite safety but inherited a general ignore policy that made its primary raw evidence invisible to normal Git staging. Receipt validity and repository durability were therefore separate conditions, while the gate enforced only the first.

### Causal Correction

Revision 7 adds four path-specific negations without weakening unrelated log ignores. The release wrapper checks all required output paths before repository inspection or mutation, and R2 checks the same paths before consuming a receipt. Integration binds the revision-7 package and exact handoff into the R2 correction lineage.

### Regression Coverage

Legacy and synthetic candidate canonical logs must return not-ignored, unrelated logs must remain ignored, wrapper and R2 path output must be byte-equivalent, malformed candidates must fail, and Candidate 1's receipt/stdout/stderr byte bindings must remain unchanged.

## Approval And Quality-Gate Portability

### Confirmed Root Causes

Raw approval identity was generated with mixed line endings even though repository checkout policy normalizes text to LF, and V12 release scripts were omitted from Biome's explicit source list. Both defects were local-green/CI-different risks.

### Causal Correction

Generate canonical LF approval bytes, rebuild the V11 trust chain as revision 35, include both V12 scripts directly in Biome, and remove the now-redundant stdin workaround. Preserve the stale revision-34 binder as failed-attempt evidence rather than treating it as launch authority.

### Regression Coverage

The exact revision-35 evidence replay and the current full `npm.cmd run verify` both pass. Approval byte counts and digests are bound in the receipt, and format/lint now inspect the V12 scripts through the canonical package scripts.

## Git Attribute Byte Integrity

### Confirmed Root Cause

Making raw logs visible to Git did not explicitly exempt them from the repository-wide `text=auto eol=lf` policy. Local staged bytes matched only because Git's content heuristic did not transform this specific output; that was not a portable evidence contract.

### Causal Correction

Revision 8 declares only the four canonical stdout/stderr path shapes binary and makes both the gate wrapper and R2 validate exact text, diff, and merge attributes before reporting paths, writing evidence, or consuming a receipt.

### Regression Coverage

The proof compares worktree, staged, would-stage, and checkout-filter bytes to receipt digests, repeats under forced autocrlf and CRLF checkout, verifies normal policy for receipts and near misses, exercises negative attribute mutations, and keeps wrapper/R2 path output byte-equivalent.

## Candidate 2 R2 Preparation

### Confirmed Root Cause

A manual hash-guarded integration fallback serialized `launch-authorization.json` with PowerShell's aligned JSON formatting. V11 correctly validated its semantics, but R2 correctly requires canonical raw serialization for source authentication. The mismatch was process-output formatting, not candidate product behavior, package identity, or audit outcome.

### Causal Correction

Parse and reserialize the unchanged value with `JSON.stringify(value, null, 2)` plus one LF, then rerun V11 exact evidence verification. Retire Candidate 2 because its committed source bytes differ from the corrected authorization, despite its passing canonical gate.

### Regression Coverage

R2 canonical parsing is the regression gate. Candidate 3 must include the canonical authorization, pass the exact candidate wrapper, and complete R2 preparation and revalidation before any reviewer launches.

## Candidate 3 Committed-Source And Review-Lifecycle RCA

### Reproduction

Candidate 3 passed `npm verify`, but the product reviewer proved the wrapper only checked tracked cleanliness and could consume untracked verification inputs. The security reviewer separately found six causal source files missing from its approved R2 context.

### Confirmed Root Causes

- The canonical command executed in the live worktree rather than a materialization of the exact candidate Git tree.
- R2 enumerated reviewer sources from mutable filesystem state and used one global immutable output root.
- Correction lineage encoded revisions 1 through 8 as executable policy, so every new correction required another harness edit.

### Causal Fix

R9 authenticates and materializes exact committed blobs, pins `npm verify` to that tree, binds the materialization digest and cleanup result, and supplies all six security sources. R10 gives each candidate a closed `runs/{candidate}/` root, discovers and snapshots source from candidate Git blobs, authenticates both review tools, and verifies one contiguous correction sequence beginning at revision 1 with no terminal ceiling.

### Regression Coverage

Four release-gate tests and five release-review lifecycle tests cover uncommitted source exclusion, exact command isolation, all six security sources, malformed candidates, disjoint run roots, Candidate 3 preservation, missing or malformed revisions, revision-11 extensibility, unsafe handoff paths, Git-blob snapshots, tool substitution, and R9 package/handoff substitution.

### Durable Learning

A clean live worktree is not the same proof as executing committed source. Release evidence must bind the exact Git tree, and repeated immutable attempts need candidate-addressed roots plus data-driven lineage rather than a globally fixed output path or revision count.
## Candidate 4 Git Context And Evidence-Class RCA

### Reproduction

Candidate 4's exact committed-tree gate passed source materialization and then failed five of 397 tests because the child command had no Git repository context.

### Confirmed Root Causes

- Direct blob materialization supplied exact worktree files but no candidate-bound Git directory, ref, object lookup, or index for Git-aware tests.
- R10 applied the candidate-blob rule to the gate receipt and logs even though those artifacts are necessarily created after the candidate commit. This produces an impossible self-reference rather than stronger provenance.

### Causal Correction

Revision 11 supplies a disposable Git metadata/ref/index view whose worktree is the exact materialization and whose object lookup is candidate-addressed, while keeping the live repository metadata outside the child command. It separately classifies gate outputs as external execution evidence, accepts only the three exact candidate-addressed paths, snapshots their raw bytes once into the R2 run root, and binds those snapshots into the reviewed package and approval.

### Regression Coverage

Focused tests must prove nested materialization retains Git object access, the temporary HEAD is the exact candidate, real repository state and source bytes remain unchanged, temporary metadata is removed, arbitrary working-tree inputs remain rejected, gate evidence cannot masquerade as candidate source, exact external bytes are snapshotted and substitution-detected, and the full committed-tree gate passes before Candidate 5 review.

### Durable Learning

Exact source isolation and execution context isolation are separate guarantees. Post-commit evidence cannot be part of the commit it proves; it needs an explicit external-evidence provenance class and immutable package binding.

## Candidate 5 Checkout Identity And Runtime-State RCA

### Reproduction

Candidate 5 executes all 399 tests from exact committed blobs, then fails V11 replay on `scripts/check-template.ps1`. Independent post-command inspection rejects an unexpected `.local` directory.

### Confirmed Root Causes

- V11 retained raw Windows checkout bytes for two `*.ps1` sources while the candidate gate correctly authenticated and materialized their LF Git blobs. The canonicality guard accepted a clean-filter transformation instead of requiring evidence bytes to be Git-stable.
- The canonical command inherited repository-local npm cache configuration, and two tests left temporary parent paths. Runtime supply and source identity therefore occupied the same tree.

### Causal Correction

Revision 12 separates the causes into disjoint specialist modules. The first makes every active V11 source binding clean-filter stable, binds `.gitattributes`, and rebuilds the V11 trust chain. The second supplies npm cache state outside the candidate materialization and makes test-owned path cleanup complete without weakening exact post-command inspection.

### Regression Coverage

Candidate 6 must prove live checkout bytes, clean-filtered bytes, and committed materialization bytes share one V11 identity; all active V11 sources pass the same rule; external cache supply remains outside the candidate; test cleanup works in either order and preserves unrelated sentinels; and the complete candidate materialization has the same exact digest before and after `npm verify`.

### Durable Learning

An exact-source gate must define both canonical source bytes and external runtime supply. Checkout transforms cannot participate in durable evidence identity, and ignored runtime paths are still source-tree mutations when verification runs inside an authenticated materialization.

## Candidate 5 Correction Closure

### Implemented Fix

Revision 12 made source identity and runtime supply separate invariants. V11 now binds only LF clean-filter-stable bytes and the governing `.gitattributes` file. The release gate supplies one host-owned npm cache outside the candidate, permits removal only of authenticated generated `dist`, retains strict rejection of every other undeclared path, and prunes only empty owned parents.

### Verification

Both exact Revision 12 specialist handoffs pass and their complete fan-in is ready. Focused release-gate coverage passes 7/7; V11 and first-run coverage passes 38/38. V11 Revision 37 rebuilt Candidate A and Audit B, completed the external receipt, binder, dependent semantic audit, cross-package authorization, and full `--check-evidence` replay with `pass`.

### Residual Gate

Candidate 5 remains retired. Candidate 6 must commit the corrected bytes, pass the exact candidate gate from its own materialized tree, and complete a fresh three-reviewer R2 package before release.

## Candidate 6 Host Toolchain Supply RCA

### Reproduction

Candidate 6 preserved an exact 2,008-file source materialization before and after the canonical command and passed every earlier verification stage. The installed-consumer gate then failed because it resolved TypeScript under the candidate root, which intentionally contains committed source and no `node_modules`.

### Confirmed Root Cause

The release host already supplied external npm cache and executable search paths, but `scripts/check-packed-consumer.mjs` bypassed that host boundary for TypeScript and constructed a candidate-local compiler path. Source identity and runtime toolchain supply were still conflated for one final executable.

### Causal Correction

Revision 13 adds a closed `SWECIRCUIT_TYPESCRIPT_ENTRYPOINT` host input. The release gate normalizes it to one case-insensitive key and requires an absolute plain regular non-symlink file resolving outside the candidate. The consumer repeats those checks when supplied, uses the verified file for compilation, and retains its repository-local default for ordinary development.

### Regression Coverage

All 9 release-gate tests pass, covering local default, canonical normalized supply, duplicate case variants, empty, relative, missing, directory, symbolic-link, and candidate-contained paths plus exact materialization and Git-context invariants. Offline installed-package verification also passes.

### Closure And Durable Learning

The exact Revision 13 handoff verifies `pass`, and V11 Revision 39 independently rebuilds and approves the final formatted consumer source through its complete two-package trust chain. Candidate 6 remains retired. Candidate 7 must prove the corrected runtime supply from its own committed materialization before R2 review.

Runtime dependencies required to verify exact source must be explicit host inputs. A dependency-free candidate should never be made impure merely to satisfy the verifier that authenticates it.
## Candidate 7 Isolation-Test Default RCA

### Symptom

Candidate 7's exact committed-tree gate passed source authentication, Git isolation, live-state checks, cleanup, and 404 of 405 tests. One unit test failed while resolving candidate-local `node_modules/typescript/bin/tsc`.

### Competing Hypotheses

1. The production canonical child did not receive the explicit host toolchain supply.
2. Environment normalization removed or duplicated the supply before tests.
3. The unit test bypassed the production environment and selected a candidate-relative development default.
4. The resolver's containment validation redirected an external supply into candidate source.

The receipt, command environment implementation, stack trace, and focused reproduction reject hypotheses 1, 2, and 4. Hypothesis 3 alone explains why the normal pre-freeze worktree passed and the dependency-free exact candidate failed.

### Confirmed Root Cause

The test intentionally called `resolveHostTypeScriptEntrypoint` with an empty synthetic environment. Because the imported script's `ROOT` was the exact materialization, the resolver selected a development default that cannot exist there. Test setup accidentally depended on repository dependencies even though the production path already supplied an external compiler.

### Causal Fix

Add an internal injectable default parameter whose production default remains `DEFAULT_HOST_TYPESCRIPT_ENTRYPOINT`. The test passes a temporary external plain file as that default. Both explicit and injected paths continue through the same validation. Add direct negative cases for relative, symbolic, and candidate-contained injected defaults.

### Regression And Release Gate

Revision 14's exact specialist authenticates all ten sources, reproduces the evidence chain, confirms the two-argument production call is unchanged, and passes both focused commands. Its exact handoff and complete package gate return `pass`. Candidate 7 remains retired; only a new Candidate 8 commit may run the canonical gate, and R2 remains blocked until that receipt passes.
