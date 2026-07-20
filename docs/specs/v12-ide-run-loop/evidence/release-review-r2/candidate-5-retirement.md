# Candidate 5 Retirement

## Candidate

- Commit: `62e51278904b3036971f6fcd40577313f1168e2a`.
- Tree: `925bfd2b9f64d135448b2d2e18adad6e475bf51e`.
- Source: 1,985 files, 55,943,345 bytes, `sha256:675c00dbfa40be24a43d5a296e8427de4d25add6f8d46b101e9d1f08ab3ab8bc`.

## Gate Outcome

`fail`. All 399 tests passed, but V11 evidence replay then rejected checkout-specific CRLF bindings when it ran over the candidate's exact LF Git blobs. Post-command inspection independently found uncommitted `.local` runtime state inside the materialization. The disposable Git context, live repository identity, tracked state, and cleanup all remained exact.

The exact receipt and raw logs are preserved under `inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/`.

## Confirmed Causes

- V11 bound raw Windows checkout bytes for two PowerShell sources even though Git stores and authenticates their LF blobs.
- The canonical child inherited repository-local npm cache policy, while two tests also left repository-local parent directories. Verification runtime state was therefore written inside the authenticated candidate tree.

## Route

Candidate 5 is permanently retired and must never be reviewed or merged. Revision 12 must make V11 source bindings checkout-independent, externalize npm cache state from the candidate, close all test-owned temporary paths, and freeze a new candidate for the complete gate and R2 review.
