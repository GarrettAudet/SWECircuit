# Independent Revision 24 Review Contract

## Objective

Independently determine whether Revision 24 behaviorally closes the Candidate 11 checkout-relative cache defect and the Revision 23 non-causal regression finding without weakening source identity, runtime-supply separation, private npm configuration, copied-production lifecycle, history isolation, or cleanup guarantees.

## Required Review Points

1. Authenticate every declared context source before semantic review.
2. Reconstruct the exact Revision 23 reviewed helper and test snapshots, then compare them with Revision 24 and its new child-process fixture.
3. Confirm only the three authorized test paths changed after Revision 23: the lifecycle helper, release-review test, and new cache-supply child fixture.
4. Confirm the fast regression sets `npm_config_cache` before copied module import, invokes `copyHostNpmCacheSupply(destination)` without a source override, and uses a candidate-shaped source tree whose checkout-local cache is absent.
5. Confirm exact sentinel bytes and the canonical source come from the externally bound cache.
6. Confirm missing source, non-directory source, pre-existing destination, and overlapping roots fail through production-owned guards.
7. Confirm the post-R21 correction exclusion is parsed, bounded, tested, and enforced against both copied filesystem state and committed Git-tree state without hiding production inputs needed by the sealed lifecycle.
8. Confirm the complete copied-production lifecycle passed after the correction and retained package reconstruction, raw handoff verification, bounded cleanup, and unchanged-source assertions.
9. Confirm no production kernel, gate, parent, harness, verifier, package, lock, private npm configuration, or Candidate 11 evidence changed.
10. Confirm Candidate 11 remains retired and no retired gate was rerun.
11. Search for new cache, path, link, race, cleanup, import, history, evidence, authority, or test-quality bypasses.

## Verdict Rules

Return `pass` only if every review point is resolved with exact evidence and no release-blocking defect remains. Return `fix`, `diagnose`, `redesign`, or `block` with concrete evidence otherwise. Integration-owner command reports are supporting evidence, never the semantic verdict.

Do not claim release readiness, hosted CI, merge approval, external cache provenance, or host enforcement. Return only the exact generated `SpecialistAgentHandoff` JSON object and do not edit reviewed source or evidence.
