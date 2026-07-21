# Revision 20 Independent Review Contract

## Purpose

Independently determine whether the exact Revision 20 implementation closes the rejected Revision 19 package-identity cycle and every related trust-boundary defect without introducing a new release-evidence bypass.

Producer tests and the verified producer handoff are authenticated evidence, not this review's semantic verdict.

## Required Review

1. Authenticate every declared source, package, handoff, and verification artifact before using it.
2. Trace stable reconstruction inputs from the external parent through candidate manifest, request, compilation, package, prepare output, and compile output.
3. Trace owner expectations and raw handoffs separately through requested authority, child-phase authority, approval, verification, parent receipt, and promotion.
4. Prove that fresh compile, approve, and verify invocations can reuse one exact package pair while their phase-authority bindings differ.
5. Prove that standalone approve and the approve prefix inside verify produce byte-identical approval output.
6. Confirm wrong owner, gate, handoff, package, stable-binding, and authority substitutions fail closed.
7. Confirm variable path text rejects lone surrogates, forbidden controls and bidi text, non-NFC values, aliases, traversal, reserved names, and trailing dot/space forms while preserving one safe supplementary scalar exactly.
8. Confirm the offline cache is rejected when equal to, inside, above, or realpath-aliased with the repository before any cache-using host tool runs.
9. Confirm approval language records an external-host declaration and does not claim authenticated human identity.
10. Recheck Revision 19's valid source, private-state, dependency, package-closure, immutable-promotion, receipt-last, and external-host boundary controls.
11. Search for new circularity, confused-deputy, replay, substitution, stale-output, path, process, promotion, or test-quality defects.

## Verdict

Return `pass` only if all required review points are satisfied and no release-blocking finding remains. Return `fix`, `diagnose`, `redesign`, or `block` with exact evidence for any defect. Remain read-only and do not claim release readiness, hosted CI, owner approval, or merge authority.
