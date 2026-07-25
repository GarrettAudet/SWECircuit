# Revision 62 Root-Cause Analysis

## Status

Root cause confirmed. The bounded correction is implemented and focused regression suites
pass. Exact committed verification remains pending.

## Reproduction

Run the non-consuming exact-candidate verifier rehearsal against Revision 61 commit
`f0fec5cf01907f463ea1f129f2c7a1f8b8029ce5`.

## Stable Evidence

- Exact candidate tree: `53f7fbcd28515cf3defd353ca1a341db51deb5e9`.
- Materialized source: 4,052 files and 127,881,924 bytes.
- Materialized source digest:
  `sha256:4986ab9e81f82f69a3bd1ba906e31074678d2b63a687bb2e29125ba69bddea42`.
- Build: `pass`.
- Lifecycle: 1 pass, 1 fail.
- Failing assertion: `copied production canonical gate timed out`.
- Observed enclosing lifecycle-test duration: 950,166.1132 ms.
- Captured lifecycle stdout: 2,244 bytes,
  `sha256:2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b`.
- Captured lifecycle stderr: 0 bytes,
  `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- The exact runner, raw result, logs, digest manifest, and evidence limitation are preserved under
  `inputs/r61-exact-candidate-rehearsal/`.

## Confirmed Cause

The copied-production lifecycle applies one 900,000 ms default to child operations. In an
ordinary checkout, the positive nested canonical gate completed within that bound. In the
deeper blob-only exact-candidate topology, the operation did not complete before the same
bound and the helper reported `timedOut: true`. Revision 61 asserted immediately and did not
preserve the nested result object, so the exact active subcommand and termination details are
unknown. The timeout itself, not a product assertion, is the confirmed failure route.

The failure was not exposed by ordinary local or hosted verification because those runs begin
from a normal checkout and therefore do not execute the same outer exact-candidate topology.
Whether the larger bound is sufficient remains a required Revision 62 rehearsal result.

## Causal Correction

Keep the 900,000 ms default for every ordinary child operation and apply a named 1,800,000 ms
bound only to the positive copied-production canonical gate. Expose the bound through
test-only hooks and assert it exactly. The enclosing lifecycle's existing 3,600,000 ms child
timeout remains the outer ceiling.

## Regression Strategy

1. Assert the exact scoped timeout value.
2. Run the focused release-gate and release-review suites.
3. Freeze Revision 62 and rerun the complete copied lifecycle from the committed checkout.
4. Run a non-consuming exact-candidate rehearsal from the frozen commit.
5. Invoke the one-shot gate only after all repeatable local and hosted checks pass.
