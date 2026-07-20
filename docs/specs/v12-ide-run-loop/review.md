# Review

## Status

Release review attempt 1 and Candidate 3 both produced verified release-blocking `fix` routes. Corrections now pass through revision 10 and the V11 revision-35 trust chain. Candidate 4 and its complete R2 review are not yet frozen, so V12 is not merge-ready.

## Scope

Review the exact V12 goal, architecture, public contract, implementation, tests, IDE workflow, and capability claims against AC1-AC9.

## Required Perspectives

- Product and IDE usability.
- Lifecycle, correctness, and recovery semantics.
- Authority, security, privacy, and host portability.
- Public API and installed-consumer compatibility.

## Attempt 1 Candidate

- Candidate commit: `d914b273ba619e3cfa42206c8d9f136be73075e3`.
- Compilation: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3`.
- Package: `sha256:7a809141af324cdea7028fb07ee6ca6cb79daccfbdf319e2fd8b2c1346a007ee`.
- Exact search selected three disjoint reviewers with projected makespan 9 versus serial 25 and zero conflicts.

## Findings

- Product/API/IDE: the canonical dogfood uses a synthetic package instead of an actual V12 implementation package, omits required AC8 friction measurements, and this review record was stale.
- Lifecycle/correctness: accepted evidence orders `criterionId` before the requirement identity, and the promised 16-agent aggregate resource proof is absent.
- Security/trace/authority: run validation lazily reads the schema from the filesystem, mutable release input was not snapshotted, primary raw verification evidence was omitted from reviewer context, and no candidate-bound canonical-gate receipt exists.

## Evidence

All three exact raw handoffs verify against the approved package. Their raw SHA-256 digests are `sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26`, `sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84`, and `sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7`. The complete-roster verification is preserved under `evidence/release-review/` with `releaseReady: false`.

## Correction Readiness

- Revision 6 binds compilation/package `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998` / `sha256:5acb302e44bb08f8626fb3773ba27acf5af5ae3f3d09d95beea1f2538a46826a`; both exact handoffs verify `pass`.
- Revision 7 binds compilation/package `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920` / `sha256:df3ed49a4d38fdbac275b82036dc4354d6b76bac3b2fa97dfbd385c3fdad85b8`; its exact handoff verifies `pass`.
- Revision 8 binds compilation/package `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef` / `sha256:d655468c5e37171d5ef83af2299bf08291029e9c08751ef056c2d655f24cfb1d`; its exact handoff verifies `pass`.
- The current full pre-freeze gate passes format, lint, typecheck, all 388 tests, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification.
- V11 trust-root revision 35 passes exact package reconstruction, binder verification, independent semantic audit, and cross-package authorization.
- The R2 harness resolves the current semantic audit from launch authorization and binds the complete revision-1 through revision-8 correction lineage.
- Candidate 2 `4c7695519d274a8e3d939061dfa184b99dc8ac45` has an exact passing gate receipt but no R2 package or reviewer outcome. Canonical authorization serialization is fixed; Candidate 3 is not yet frozen.

## Candidate 3 Review

- Candidate: `4ad12367cc0b36ea460ceabc48e5a41ca662e3df`; canonical gate: `pass`.
- Product/API/IDE: `fix` because the gate could consume untracked verification inputs.
- Security/trace/authority: `fix` because six causal source files were absent from the approved context.
- Lifecycle/correctness: `pass`; that scoped result cannot override either blocking route.
- Candidate 3 is permanently retired. Its exact receipt, available raw handoff, package identities, and route are preserved under `evidence/release-review-r2/`.

## Corrections 9-10

- R9 binds the canonical gate to a materialized exact Git tree, excludes uncommitted source, closes all six security sources, and passes four focused regressions. Compilation/package: `sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d` / `sha256:f9e337812c8ee4ef85431894855279c5a113ccfb0c0a9b4402b4e5137d519400`.
- R10 places every new R2 artifact under `runs/{candidate}/`, reads reviewer sources from exact candidate Git blobs, and verifies a contiguous correction lineage without a hardcoded terminal revision. Compilation/package: `sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400` / `sha256:985a85fe77b507088cde4df3d0352c21b142fe09541cf4d5295a5869b28cf075`.
- Main-agent verification passes exact syntax, formatter/linter checks, 5 of 5 R10 lifecycle tests, 4 of 4 release-gate tests, the template checker, and the package-bound R10 handoff gate.

## Outcome

`fix`. The known Candidate 3 causes are corrected, but release and merge remain stopped until Candidate 4 passes the exact canonical gate and a newly compiled, approved, complete three-reviewer R2 package returns `pass`.
