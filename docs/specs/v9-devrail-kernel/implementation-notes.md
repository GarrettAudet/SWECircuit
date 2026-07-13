# Implementation Notes

## Status

In progress.

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

## Deviations From Plan

The workspace patch helper failed before file access during intake and recurred during naming, architecture acceptance, and toolchain edits. The integration owner used the repository-authorized PowerShell fallback and retained diff, formatter, typecheck, tests, package inspection, and checker verification as the proof boundary. PowerShell execution policy also blocked npm.ps1, so Windows commands use npm.cmd without changing host policy.

## Assumptions Used

- The accepted private local manifest and API identifiers do not imply public package, CLI, domain, or registry ownership.
- Historical TraceRail artifacts should remain intact as provenance.
- No license change is implied by the merge approval or product rename.

## Follow-Up Work

- Complete current canonical branding and replace the historical TraceRail overview image.
- Define and test the 0.x migration from Rail Composition to Circuit Composition without rewriting historical evidence.
- Implement deterministic parsing, dispatch, diagnostics, reference resolution, and Circuit semantics from the frozen v1alpha1 contract.
- Keep trace reconstruction and CLI rendering behind the project-validation slice.

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

## Durable Learnings

- A version branch should begin with explicit API decision gates when the version creates the first executable public surface.
- The known Windows patch-helper failure remains reproducible; direct-write recovery must remain bounded and independently verified.
- Public naming should be tested against adjacent products, multiple package registries, repository names, domains, semantics, pronunciation, and future extension vocabulary before implementation.
