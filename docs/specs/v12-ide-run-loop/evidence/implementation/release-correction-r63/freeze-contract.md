# Revision 63 Freeze Contract

## Frozen Scope

- Preserve Revision 62's exact lifecycle pass, exact aggregate failure, hosted failure, and
  unused one-shot disposition.
- Remove only the R62-specific raw-evidence binary attribute.
- Preserve the exact LF-only R61 rehearsal stdout blob.
- Keep every V11-approved source byte unchanged.
- Authenticate stored and decoded R62 failure evidence from V12 release-boundary tests.
- Preserve the corrected positive copied-gate timeout and every ordinary child bound.

## Frozen Source Identities

- `.gitattributes`: 1,283 bytes, `sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`.
- `scripts/run-v12-release-gate.mjs`: 70,160 bytes, `sha256:dc5b6cdea7f212196c6aa88da586fe44be20758b3619986e586445f71cbb6970`.
- `scripts/run-v12-release-review.mjs`: 104,087 bytes, `sha256:8a051a1cdb0b08dd61271569ffef7f460ef964ef7501c236c7b570e52613688e`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`: 155,952 bytes, `sha256:dc8fa635cb309f6e3b9ee7421a672bec987ee855e016390a0521c7dfa4aa5212`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`: 30,840 bytes, `sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff`.
- `test/helpers/v12-release-review-lifecycle.mjs`: 85,918 bytes, `sha256:29dd0a6b6118df3a8d7163c7d9721c890d7d2d0190f1697c868b42ce9fd2c753`.
- `test/lifecycle/v12-release-review-lifecycle.test.mjs`: 11,679 bytes, `sha256:a2c928a9872c450a59f4df20ece1211b0f421f564f32e0b1eba08a91eb46255d`.
- `test/fixtures/v12-enclosing-candidate-git-probe.mjs`: 3,327 bytes, `sha256:b0faba2306dfc00dec70d33e62f8173364d853a2b1a00beecea144dc6baea40d`.
- `test/v11-dogfood-runner.test.mjs`: 43,787 bytes, `sha256:637f1c44d641a2752186aa5837ae11d57f97d394283e52b6801ebaf29dfb9284`.
- `test/v12-release-gate.test.mjs`: 78,317 bytes, `sha256:bb6a7d3a74b8617bd58a8bdd6f8e1bd7cf6b32041a6e6d37415aab5533571671`.
- `test/v12-release-review.test.mjs`: 85,209 bytes, `sha256:a6de8b564c9cc4f842d1fd1177d526695020796adea2c2b290101561b2e8d6c3`.

## Frozen Evidence Identities

- R61 stdout: 2,244 bytes, `sha256:2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b`.
- R62 stdout envelope: 815 bytes, `sha256:ab1e1bcd6c3950dc268d0898a0c03b7fe0ddece3a048a2fae4f1ae1f964ea2b1`.
- R62 stderr envelope: 1,920 bytes, `sha256:bf82664b99c9a6aa04bf0c4cced70656de660ed1ad95b4384f6901fa3b7756c0`.
- R62 evidence manifest: 1,080 bytes, `sha256:83855254e0c8d58df9585ecf9fab8cd8dd935a140ecabaff385196fb6f818bf1`.

## Eligibility

Strict V11 dogfood, 68 focused release tests, 465 core tests, complete `npm.cmd run verify`,
format, lint, typecheck, build, template checker, complete checker mutation matrix, V10/V11/V12
dogfood, specialist example, package inspection, installed consumer, and independent review pass.

## Post-Commit Gates

- Exact copied lifecycle.
- Exact full `npm.cmd run verify`.
- Non-consuming exact-candidate rehearsal.
- Hosted Linux, Windows, and macOS Node 22/24 matrix plus template check.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Milestone, memory, owner merge, and release closeout.
