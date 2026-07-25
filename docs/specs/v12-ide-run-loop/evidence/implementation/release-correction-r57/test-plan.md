# Revision 57 Test Plan

## Causal

- Run the long-path candidate-context test under a nested private `TEMP`.
- Run all four candidate-materialization and Git-context causal tests.
- Run the complete 24-test release-gate file.

## Contract

- Run the complete 61-test release contract.
- Run active status and live-routing invariants.
- Run the template checker, format, lint, typecheck, and 458-test core suite.
- Require independent read-only review of the failure classification and corrected path geometry.

## Freeze

- Bind exact gate, gate-test, lifecycle-helper, and release-review-test bytes.
- Verify staged blobs match the recorded identities.
- Commit once, then run exact copied lifecycle and full verification.

## Release

- Invoke one canonical gate exactly once for the exact Revision 57 commit.
- On `pass`, run fresh three-domain R2, hosted CI, milestone closeout, and merge.
- On `fail`, preserve immutable evidence and retire Revision 57 without rerunning.
