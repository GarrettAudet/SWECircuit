# Revision 65 Verification

## Current Outcome

`fix`

The root cause is confirmed and the smallest source correction is implemented. Revision 65 is not
yet release-ready.

## Completed Evidence

- R64 exact commit, tree, standalone passes, hosted seven-job pass, failed rehearsal, and unused
  one-shot disposition are preserved.
- Exact diagnostic replay preserves both raw streams and confirms the copied canonical-gate
  timeout. Its source wrapper is LF-normalized to 81,954 bytes with digest
  `sha256:0aff6f98237be490ecdd0b50d92094d7ab84aabbd6c8844be7959b59d117b450`.
- Short-path exact-lock counterfactual: `pass` in 2,442.5591 ms.
- R65 release-gate parse checks: `pass`.
- R65 focused release-gate and release-review pair: `pass` on three runs; final pre-freeze
  run 71 pass, 0 fail in 10,515.8712 ms.
- The corrected nested candidate and causal leaf project to 153 and 239 characters instead of
  207 and 293.
- Format, lint, typecheck, and build: `pass`.
- Complete core suite: 468 pass, 0 fail in 55,659.1078 ms.
- First-run specialist example and strict V10, V11, and V12 dogfood: `pass`.
- Offline package dry-run and installed-consumer compatibility: `pass`.
- Template checker: `pass`.
- Checker mutation matrix: `pass`.
- Tracked diff whitespace: `pass`.
- Independent bounded final-delta review: `pass` with no findings. The external host selected
  `gpt-5.6-luna` at medium effort for the fixed, read-only audit.

The first sandboxed build and core-suite attempts encountered only write-denied fixture paths.
The unchanged commands passed with the bounded workspace write authority their tests require.

## Residual Risks

- Install duration is environment-dependent.
- Windows path behavior still requires exact and hosted confirmation.
- The 30-minute R64 timeout demonstrates the observed failure but does not claim every old-layout
  install would fail.

## Pending

- Exact source freeze, copied lifecycle, full verifier, and non-consuming rehearsal.
- Hosted seven-job matrix.
- One-shot canonical gate and fresh three-domain R2.
- Milestone, memory, merge, and release handoff.
