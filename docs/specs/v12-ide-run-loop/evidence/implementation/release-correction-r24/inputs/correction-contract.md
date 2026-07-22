# Revision 24 Correction Contract

## Trigger

Revision 23 independent review returned `fix`. The cache-supply implementation is causal by source inspection, but its fast test passed an explicit cache source and therefore did not prove the release-gate-resolved default or reproduce Candidate 11's clean-materialization boundary.

## Objective

Make the Candidate 11 cache regression behaviorally causal without changing the production kernel or release entrypoints.

## Scope

- Remove the test-only source override from `copyHostNpmCacheSupply`.
- Run the cache-supply probe in a fresh process after binding `npm_config_cache`.
- Import copied release-gate and lifecycle modules from a minimal candidate-shaped source tree whose checkout-local `.local/npm-cache` is absent.
- Prove the copied bytes and canonical source come from the external cache.
- Exercise missing-source, non-directory-source, pre-existing-destination, and overlapping-root guards.

## Boundaries

- Preserve Candidate 11 evidence exactly and never rerun its gate.
- Do not change production kernel behavior, package metadata, lock data, release-review entrypoints, or trust policy.
- Do not freeze or gate a successor until focused verification, the complete copied-production lifecycle, pre-freeze verification, and independent semantic review pass.

## Acceptance

- A restored candidate-local cache lookup fails the fast regression because the isolated source has no local cache.
- The default copy invocation consumes the release-gate-resolved external cache without a source override.
- All four guard branches fail closed with their owned diagnostics.
- The complete copied-production lifecycle passes after the correction.
