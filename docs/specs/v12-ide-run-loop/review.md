# Review

## Status

Release review attempt 1 completed with a verified `fix` route. Its causal corrections and V11 trust-root refresh now pass integrated verification; the replacement candidate and R2 review are not yet frozen, so V12 is not merge-ready.

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

- Revision 5 binds compilation `sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5` and package `sha256:c29570501b69f2b791d32890b48bb74d90091e649513d5915c636e1141518717`.
- Both exact revision-5 handoffs verify `pass`; the complete package gate is `phaseReady: true`.
- Fresh integration passes build, format, lint, typecheck, template validation, both dogfood modes, and all 388 kernel tests.
- V11 trust-root revision 33 passes exact package reconstruction, binder verification, independent semantic audit, and cross-package authorization.
- The R2 harness snapshots the current semantic audit handoff from the exact launch authorization instead of a hardcoded attempt number.
- No replacement candidate commit, candidate-bound gate receipt, R2 package, or R2 reviewer outcome is claimed yet.

## Outcome

`fix`. Release and merge remain stopped. Correct the causal defects, dogfood the correction package through V12, rerun the canonical candidate-bound gate, and repeat all three independent reviews against a newly compiled and approved package.
