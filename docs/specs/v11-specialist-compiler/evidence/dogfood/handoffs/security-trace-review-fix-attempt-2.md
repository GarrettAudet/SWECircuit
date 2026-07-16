# Security/Trace Review Handoff: Attempt 2

- **verdict:** REVISE/FIX
- **compilationDigest:** `sha256:e2d85d82e975e5a5687174c49bb2b728f65220d2a44e1d42997b8d185cdf509b`
- **blueprintDigest:** `sha256:0158f7977c3308fc6b578a1419a32024bfd550eae433ee4b687b6d728110c725`
- **workUnitsCompleted:** `review.security-trace`
- **artifacts:** This raw handoff; write authority was empty.

## Summary

Blueprint digest independently recomputed correctly. No blueprint authority widening or package modification retaining the approved digests was found. Leading and nested parent traversal are rejected by core. Actionable privacy, context-closure, and hostile-input issues remain.

## Findings

1. **HIGH: Secret-bearing property names leak through diagnostics.** String scanning checks property values but not keys at `src/specialist-compiler.ts:208`. Unknown keys are copied into diagnostic pointers at `src/specialist-schema.ts:50`, while pointer sanitization does not suppress secret patterns at `src/diagnostics.ts:685`. An extra key named like an API token is therefore returned verbatim.
2. **HIGH: Transitive schema context remains incomplete and validation is not filesystem-pure.** The reviewed schema references `common.schema.json` at `schemas/v1alpha1/specialist-compiler.schema.json:16` and runtime validation reads it at `src/specialist-schema.ts:34`. The agent contract binds only the specialist schema. This reproduces missing transitive context and conflicts with the no-filesystem-effects requirement in `spec.md`.
3. **MEDIUM: Unknown-input limits occur after potentially unbounded allocation.** Snapshotting accepts strings without a size bound at `src/snapshot.ts:64`. Compilation serializes and encodes before checking its limit at `src/specialist-compiler.ts:232`; package verification similarly encodes attacker-controlled compilation content at `src/specialist-render.ts:333`.
4. **MEDIUM: Dogfood verification derives its own trust root.** The runner creates expected digests from the package at `scripts/run-v11-dogfood.mjs:122` and immediately verifies against them, rather than consuming owner-supplied expected values.
5. **MEDIUM: Dogfood consumes repository locators before core validation.** `verifyContext(goal)` runs before compilation, and its reduced parser can resolve/read a nested traversal that remains within the repository before core rejects it.

## Evidence

- All 23 assigned context files matched declared byte counts and SHA-256 digests.
- Blueprint canonical digest independently matched the header, embedded digest, and expected digest.
- Core locator checks refute the original traversal escape.
- Package reconstruction and trusted comparisons refute approved-digest-preserving tampering.
- All four declared JavaScript review artifacts passed `node --check`.

## Assumptions

The two user-supplied approved digests are treated as the trusted external approval channel. Full tests were not executed because they load undeclared `dist`, fixture, and common-schema files.

## Risks

Current tests do not cover secret-bearing property names or pre-allocation package limits. The review package does not independently bind the schema that defines identifier safety.

## Follow-Ups

Scan and suppress unsafe property names; add regressions. Bind `common.schema.json` and required fixtures into reviewer context. Add pre-allocation byte accounting. Compile before reading context. Separate candidate generation from owner-supplied approval, then recompile, rerender, reapprove, and repeat independent review.
