# Revision 61 Freeze Contract

## Frozen Scope

- Preserve the enclosing exact candidate Git authority when the copied lifecycle creates a nested candidate.
- Use the gate-resolved Git executable and one frozen environment snapshot.
- Keep the canonical gate's sanitized default runner unchanged and fail closed without automatic fallback.
- Prove the blob-only default failure, explicit success, exact identities, and cleanup in a fresh process.
- Bind the executable probe into lifecycle identities and both lifecycle and security R2 review scopes.
- Preserve Revision 60's consumed one-shot failure evidence and permanent retirement.

## Frozen Source Identities

- `scripts/run-v12-release-gate.mjs`: 70,160 bytes, `sha256:dc5b6cdea7f212196c6aa88da586fe44be20758b3619986e586445f71cbb6970`.
- `scripts/run-v12-release-review.mjs`: 104,087 bytes, `sha256:8a051a1cdb0b08dd61271569ffef7f460ef964ef7501c236c7b570e52613688e`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`: 155,719 bytes, `sha256:0d7236c2741e49b3894921556c556eb0d3c05ee509ecf0f38aa90c5e96c53425`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`: 30,840 bytes, `sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff`.
- `test/helpers/v12-release-review-lifecycle.mjs`: 85,734 bytes, `sha256:cf053d0deb85b03518cccf0a3bb0055e8e69bf3404bc4ff3c5da508f4897d478`.
- `test/lifecycle/v12-release-review-lifecycle.test.mjs`: 11,505 bytes, `sha256:a3e49fc21f4b8c512d2a7bf10caaeb054fbc1de605d89ef6dd4876e8ebdca458`.
- `test/fixtures/v12-enclosing-candidate-git-probe.mjs`: 3,327 bytes, `sha256:b0faba2306dfc00dec70d33e62f8173364d853a2b1a00beecea144dc6baea40d`.
- `test/v12-release-gate.test.mjs`: 78,317 bytes, `sha256:bb6a7d3a74b8617bd58a8bdd6f8e1bd7cf6b32041a6e6d37415aab5533571671`.
- `test/v12-release-review.test.mjs`: 81,229 bytes, `sha256:5dc5eacf6ce48e398250bf26ded73be3ccd17a75d8fb32c24fdad99dc5ee5859`.

## Eligibility

The runtime regression, live identity guards, 65-test release pair, 462-test core suite, format, lint, typecheck, build, template checker, complete checker mutation matrix, V10/V11/V12 dogfood, package inspection, installed consumer, and independent final-delta review pass. The pre-commit lifecycle correctly rejected the mixed committed/live identity before materialization.

## Post-Commit Gates

- Exact copied lifecycle.
- Exact full `npm.cmd run verify`.
- Disposable exact-candidate topology preflight.
- Hosted Linux, Windows, and macOS Node 22/24 matrix plus template check.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Milestone, memory, owner merge, and release closeout.
