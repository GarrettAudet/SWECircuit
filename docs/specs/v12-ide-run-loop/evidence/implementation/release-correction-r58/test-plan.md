# Revision 58 Test Plan

## Causal

- Verify the exact hosted workflow contains two pre-checkout Windows long-path steps.
- Verify both checkouts fetch complete history.
- Verify least-privilege permissions and the tracked npm-cache contract.
- Confirm a depth-one Revision 57 clone cannot resolve the approved historical checkpoint.

## Contract

- Run the focused hosted-CI supply regression.
- Run the complete release-gate file and release contract.
- Run active status and live-routing invariants.
- Run the template checker, checker regressions, format, lint, typecheck, and complete core suite.
- Require independent read-only review of the cause and correction.

## Freeze

- Bind exact gate, gate-test, lifecycle-helper, and release-review-test bytes.
- Verify staged blobs match the recorded identities.
- Commit once, then run exact copied lifecycle and full verification.

## Release

- Push the frozen commit and require every hosted matrix job to pass.
- Invoke one canonical gate exactly once only after local and hosted prerequisites pass.
- Run fresh three-domain R2, close the milestone and memory, then merge to `main`.
- On any failure, preserve immutable evidence and retire Revision 58 without rerunning a consumed gate.
