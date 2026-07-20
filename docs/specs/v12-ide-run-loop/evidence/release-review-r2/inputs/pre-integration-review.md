# Review

## Status

Release review attempt 1 completed with a verified `fix` route. Corrections now pass through revision 8 and the V11 revision-35 trust chain; Candidate 2 passed its canonical gate but is retired after fail-closed R2 preparation; Candidate 3 and its review are not yet frozen, so V12 is not merge-ready.

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

## Outcome

`fix`. Release and merge remain stopped. Correct the causal defects, dogfood the correction package through V12, rerun the canonical candidate-bound gate, and repeat all three independent reviews against a newly compiled and approved package.
