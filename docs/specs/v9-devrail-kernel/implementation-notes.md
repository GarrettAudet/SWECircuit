# Implementation Notes

## Status

Complete.

## Summary Of Changes

- Fast-forwarded the approved V8/V8.1 baseline to main and verified main CI.
- Created codex/v9-devrail-kernel from synchronized main at 9f2b68d.
- Created the V9 feature package and draft milestone before executable changes.
- Recorded the initial DevRail direction, the collision evidence, and the owner decision to reopen naming.
- Completed a primary-source architecture scan and proposed ADR for Node/TypeScript, JSON Schema, strict validation, JSONL traces, liveness state, adapters, privacy, CI, and supply-chain controls.
- Found that devrail.dev is an active adjacent product and the unscoped devrail npm package is occupied; no public namespace was frozen.
- Screened 51 package candidates, queried exact GitHub collisions, checked finalist domains and cross-language registries, and recommended SWECircuit.
- Recorded owner approval, renamed the GitHub repository to `GarrettAudet/SWECircuit`, updated `origin`, and constrained the decision to project and repository identity.
- Released the bounded SWECircuit identity change as V8.2 on `main`, then merged that completed baseline back into V9 at `35f96d2`.
- Started a recorded, read-only three-reviewer architecture gate and refreshed volatile architecture sources after TypeScript 7 became stable.
- Received owner approval for the integrated bundle, accepted ADR 0001, and clarified that SWECircuit is only the repository/project name rather than an external namespace claim.
- Added one private root package with exact dependency versions and proved TypeScript 7.0.2, Biome 2.5.3, Ajv 8.20.0, and jsonc-parser 3.3.1 together before schema work.
- Passed GitHub Actions run 29268926620 across Node 22 and 24 on Ubuntu, Windows, and macOS.
- Dogfooded a two-reviewer schema gate, integrated both REVISE handoffs, and froze the six-kind v1alpha1 schemas, permission and composition rules, diagnostic catalog, and adversarial case matrix.
- Implemented strict JSON parsing, package-owned schema dispatch, deterministic diagnostics, bounded project loading, reference and graph semantics, work ownership, and permission-ceiling validation for T006.
- Dogfooded an independent T006 review, integrated its path, portability, privacy, and fixture findings, and narrowed the reparse contract to behavior enforceable through the approved pure Node boundary.
- Implemented T007 deterministic offline initialization with frozen manifest bytes and ID derivation, exclusive collisions, captured identity and pending ownership ledgers, guarded recovery, immediate self-validation, and no adapter/network/process execution.
- Dogfooded an independent T007 review through two `REVISE` rounds and focused `PASS`; the second round corrected overclaimed pure-Node race guarantees, uncaptured successful-create handling, and a process test whose barrier initially sat before preflight.
- Froze T008 through four preimplementation `REVISE` rounds and `PASS`, then implemented exact RunEvent dispatch, bounded JSONL framing, trace-global order and causation, attempt/retry reconstruction, evidence summaries, whole-value secret suppression, and read-only `inspectTrace`.
- Added a thin internal CLI for initialize, validate, and inspect without a package `bin`, public executable, process execution, adapter invocation, or external namespace claim.
- Dogfooded independent T008 implementation review through `REVISE -> REVISE -> PASS`; the gate caught unbounded dense-record retention, zero-event delimiter handling, evidence length drift, missing type exports, overstated matrix coverage, and fixed-ceiling buffer allocation.
- Froze T009 through `REVISE -> PASS`, then replaced the stale public surface with a concise current-versus-target README, a minimal valid project and trace, and exact repository-local quick-start commands.
- Added a SWECircuit overview that shows the external executor, Route fan-out, Verify-before-Integrate ordering, Review, Memory, and a verified change while preserving the historical TraceRail source asset.
- Expanded public-surface enforcement from seventeen to 42 checker scenarios and added three quick-start tests for literal relative commands, whole-example immutability, temporary initialization, collision-safe repeat behavior, and private/no-`bin` metadata.
- Dogfooded independent T009 implementation review through `REVISE -> REVISE -> PASS`; the gate corrected visual semantics and narrow-width copy, absolute-path test drift, partial immutability evidence, image-check escape paths, a provenance false positive, a truthful-negation false positive, and stale run evidence.

- Implemented and independently hardened the T010 measured dogfood circuit, expected failures, caller recovery, retry trace, digest binding, and identity-checked cleanup.
- Audited AC1 through AC8 for T011 and found that package dry-run plus source-checkout execution did not prove a clean consumer of the packed artifact.
- Added a private packed-consumer gate that invokes npm through its JavaScript entrypoint, uses an ignored repository-local cache, generates an exact consumer lock from the pinned production closure, performs offline `npm ci`, and exercises init, validate, and inspect from isolated `node_modules`.
- Froze the T011 decomposition and run contracts, preserved four centrally closed package-review attempts, clarified an over-restrictive inspection contract, completed focused package review with `PASS`, then remediated final-closeout `REVISE` into an immutable-candidate `PASS`.
## Deviations From Plan

The workspace patch helper failed before file access during intake and recurred during naming, architecture acceptance, toolchain, T006, and T009 edits. The integration owner used the repository-authorized PowerShell fallback and retained diff, formatter, typecheck, tests, package inspection, and checker verification as the proof boundary. Windows PowerShell initially added a UTF-8 BOM to one strict JSON fixture; the full gate caught it, all fallback-touched files were normalized with explicit BOM-free UTF-8, and the gate then passed. PowerShell execution policy also blocked npm.ps1, so Windows commands use npm.cmd without changing host policy. The T008 implementation reviewer exceeded the first expected wait window but completed through the agent-status gate; the delay was recorded without weakening the review requirement. The image tool could not read the workspace PNG through the Windows sandbox helper, so the approved conversation image was used as the edit target and the generated result was copied into the workspace for explicit review.

## Assumptions Used

- The accepted private local manifest and API identifiers do not imply public package, CLI, domain, or registry ownership.
- Historical TraceRail artifacts should remain intact as provenance.
- No license change is implied by the merge approval or product rename.

## Follow-Up Work

- After owner approval, merge V9, verify main CI, and use the completed kernel as the next version baseline.
- Define and test the 0.x migration from Rail Composition to Circuit Composition without rewriting historical evidence.
- Keep CLI rendering behind the trace operation and preserve initialization/validation as pure library surfaces.

## Verification Performed

- Confirmed main and origin/main both resolved to 9f2b68d before branching.
- Confirmed the working tree was clean before V9 intake.
- Confirmed GitHub Actions runs for the V8.1 merge and closeout were green.
- The recovered intake passed the positive checker and all fifteen regression cases.
- The npm registry query confirmed that the unscoped devrail package is owned by another project.
- SWECircuit had no exact npm, PyPI, crates.io, or GitHub repository collision in the naming scan; the owner later clarified that only the GitHub repository name is in scope.
- The completed naming packet passed the positive checker and all fifteen regression cases after stale DevRail assumptions were removed from the V9 plan and test plan.
- The SWECircuit migration passed the positive checker and all seventeen regression cases, including rejection of a legacy README heading and retired GitHub URL.
- GitHub returned `GarrettAudet/SWECircuit` with default branch `main`; `git ls-remote` resolved the updated origin and the public About description now uses the SWECircuit positioning.
- GitHub Actions run `29263645888` completed successfully under the `SWECircuit Checks` workflow for commit `1d5f82e`.
- V8.2 completed on `main` at `5caaa29`; V9 baseline adoption passed the template checker, all seventeen regression cases, and GitHub Actions run `29265535389` at `35f96d2`.
- The integrated architecture gate passed the template checker and all seventeen regression cases after three read-only reviewer handoffs were preserved and synthesized.
- The accepted toolchain passes format, lint, TypeScript 7 typecheck and declaration build, Node test, Ajv/jsonc-parser ESM import, and dry-run package inspection, and a zero-vulnerability production audit. Ajv required its named Ajv2020 export under strict NodeNext; Node test discovery uses an explicit file glob on Windows; npm pack uses the ignored repository-local cache.
- T005 passes eleven schema and fixture tests, the positive template checker, all seventeen malformed-repository regressions, and package inspection proving that the contract README, six schemas, common definitions, and diagnostic catalog ship in the private tarball.
- T006 passes the canonical local gate with 49 tests and zero skips, including explicit-root preflight, mandatory native link checks, aliased ancestors, canonical `SC1013`/`SC1014` classification, multi-node cycles, structural fan-out, every permission kind, prefix boundaries, and encoded-pointer suppression. The template checker and all seventeen regression cases pass, independent re-review returned `PASS`, and GitHub Actions run `29277160551` passes all seven jobs.
- T007 passes the canonical local gate with 82 tests covering exact output, ID edge cases, collisions, every fault checkpoint, all four pre-capture pending states, non-empty and identity-changed recovery, a process race synchronized after both preflights, dynamic offline/process traps, and immediate validation. Independent review returned `REVISE`, `REVISE`, then `PASS`; the template checker, all seventeen checker regressions, package inspection, encoding scan, and GitHub Actions run `29281182002` pass.
- T008 passes the canonical local gate with 202 tests and zero skips, including bound case-matrix coverage for framing, limit precedence, every legal/disallowed attempt transition, all terminal states, retry forks, missing references, evidence identifier boundaries, privacy slots, descriptor-sized allocation, CLI streams, and package shape. Preimplementation review completed `REVISE -> REVISE -> REVISE -> REVISE -> PASS`; implementation review completed `REVISE -> REVISE -> PASS`. GitHub Actions run `29288359476` passes Template Check and all six Node 22/24 jobs across Ubuntu, Windows, and macOS.
- T009 passes the canonical kernel gate with 205 tests and zero skips, the exact quick-start test, package privacy/no `bin`, the positive template checker, and all 42 checker scenarios. Contract review completed `REVISE -> PASS`; implementation review completed `REVISE -> REVISE -> PASS`; GitHub Actions run `29292597506` passes all seven jobs for commit `c9d7e4f`.
- T010 passes the local implementation checkpoint with 209 tests and zero skips, a measured ten-step dogfood circuit, two controlled failures, one explicit retry, exact collision preservation, source immutability, identity-checked cleanup, a digest-bound caller-owned trace, and independent review ending `REVISE -> PASS`. The trace reconstructs 22 events, one run, a failed inspection attempt, `retryOf` recovery, and `diagnose -> pass`; GitHub Actions run `29310133523` passes all seven jobs for commit `6d4e60a`.

- T011 keeps the suite at 209 tests with zero skips and adds an explicit package-consumer gate: the private tarball installs through lockfile-driven offline `npm ci`, resolves from isolated `node_modules`, runs init, validate, and inspect, and cleans its identity-rechecked temporary root. `npm.cmd run verify`, the positive checker, and all 42 checker scenarios pass. Package review returned `PASS`; run `29312736158` passes all seven jobs for commit `0341345`. Final closeout review completed `REVISE -> PASS`; immutable candidate `0717c91` passes all seven jobs in run `29314459583`.

## Durable Learnings

- A version branch should begin with explicit API decision gates when the version creates the first executable public surface.
- The known Windows patch-helper failure remains reproducible; direct-write recovery must remain bounded and independently verified.
- Public naming should be tested against adjacent products, multiple package registries, repository names, domains, semantics, pronunciation, and future extension vocabulary before implementation.
- A successful path creation is not cleanup-owned until identity capture succeeds; pending ownership must fail conservatively.
- A coordinated race test must block participants after preflight and immediately before the contended mutation.
- A resource limit must constrain retained structures before rejection; checking only after materialization does not prevent amplification.
- A byte ceiling should not become a default allocation. Allocate from verified input size and reserve only the minimum growth-detection margin.
- Case-matrix claims should bind directly to named table-driven variants so prose coverage cannot exceed executable evidence.
- A public overview must encode its target/runtime boundary and verification order; adjacent prose cannot repair a contradictory visual.
- A documented quick start should execute its literal relative arguments and prove the whole example tree is unchanged, not only its primary input.
- Negative public-claim checks need passing provenance and truthful-negation fixtures so accuracy enforcement does not erase history or reject honest limits.
- A measured dogfood run should test stable semantics while treating elapsed time as an environment-qualified observation, never a benchmark or threshold.
- Cleanup protection begins immediately after ownership capture; setup callbacks and directory creation belong inside the guarded block.
- When review changes the measured implementation, recapture the observation and rebind every digest before accepting the evidence.
- Reviewer liveness failures are workflow evidence: preserve the failed attempt, recover through one integration owner, and never imply the kernel enforced the deadline.
- A clean-consumer check needs a lock-backed production closure: cached tarballs alone do not give a loose offline resolver the registry metadata it would otherwise request.
- Final acceptance must freeze implementation and closeout records into one immutable candidate before binding CI and independent review claims.
