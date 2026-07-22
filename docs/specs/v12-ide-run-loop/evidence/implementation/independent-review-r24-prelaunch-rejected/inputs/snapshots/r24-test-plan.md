# Revision 24 Test Plan

## Focused Regression

Run only the fresh-process cache-supply test. Require one pass and prove:

- `npm_config_cache` is set before copied modules import.
- The copied gate and lifecycle resolve the same external cache.
- The isolated checkout-local cache is absent before and after the copy.
- The copied sentinel bytes are exact.
- Missing, non-directory, existing-destination, and overlap cases fail with the expected diagnostics.

## Complete Lifecycle

Run the exact copied-production lifecycle test. Require a `pass` outcome, release-gate cache evidence, package reconstruction, raw handoff verification, and cleanup/source-integrity assertions.

## Pre-Freeze

After independent semantic approval, run the repository's canonical pre-freeze verification gates. Freeze a new commit only from a clean, authenticated worktree.

## One-Shot Rule

Candidate 11 is retired. Run the canonical release gate exactly once only against a newly frozen successor commit, preserving its receipt and raw logs regardless of outcome.
