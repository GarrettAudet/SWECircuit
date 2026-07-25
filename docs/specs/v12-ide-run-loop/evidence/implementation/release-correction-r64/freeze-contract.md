# Revision 64 Freeze Contract

## Frozen Scope

- Preserve Revision 63's exact local pass, hosted six-kernel pass, tracked-whitespace failure, and
  unused one-shot disposition.
- Preserve the exact R61 stdout bytes while representing the artifact as tracked `.log`.
- Keep the hosted tracked-whitespace implementation and its existing exemption set unchanged.
- Keep `.gitattributes` and every V11-approved source byte unchanged.
- Bind the hosted run record, representation policy, tracking state, and old-path absence in V12
  release-boundary tests.
- Preserve every runtime, public API, schema, compiler, and host behavior file.

## Frozen Source Identities

- `.gitignore`: 875 bytes,
  `sha256:12591164671f8176d7aaf1e5ef679212cbddff15f8794a90cde55ba3d1c557cb`.
- `.gitattributes`: 1,283 bytes,
  `sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`.
- `.github/workflows/template-check.yml`: 3,143 bytes,
  `sha256:9509732b0eb21bbec0e4a4f013c213b6b5083345e01573c4e22b5a1bb04a28cc`.
- `scripts/run-v12-release-gate.mjs`: 70,160 bytes,
  `sha256:dc5b6cdea7f212196c6aa88da586fe44be20758b3619986e586445f71cbb6970`.
- `scripts/run-v12-release-review.mjs`: 104,087 bytes,
  `sha256:8a051a1cdb0b08dd61271569ffef7f460ef964ef7501c236c7b570e52613688e`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`: 155,952
  bytes, `sha256:dc8fa635cb309f6e3b9ee7421a672bec987ee855e016390a0521c7dfa4aa5212`.
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`:
  30,840 bytes, `sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff`.
- `test/helpers/v12-release-review-lifecycle.mjs`: 85,918 bytes,
  `sha256:29dd0a6b6118df3a8d7163c7d9721c890d7d2d0190f1697c868b42ce9fd2c753`.
- `test/lifecycle/v12-release-review-lifecycle.test.mjs`: 11,679 bytes,
  `sha256:a2c928a9872c450a59f4df20ece1211b0f421f564f32e0b1eba08a91eb46255d`.
- `test/v11-dogfood-runner.test.mjs`: 43,787 bytes,
  `sha256:637f1c44d641a2752186aa5837ae11d57f97d394283e52b6801ebaf29dfb9284`.
- `test/v12-release-gate.test.mjs`: 78,317 bytes,
  `sha256:bb6a7d3a74b8617bd58a8bdd6f8e1bd7cf6b32041a6e6d37415aab5533571671`.
- `test/v12-release-review.test.mjs`: 87,801 bytes,
  `sha256:0a1fc6fbe0d5cdb78235e7baf68355df08523553a3b633156743a41eb5c3e479`.

## Frozen Evidence Identities

- R61 stdout log: 2,244 bytes,
  `sha256:2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b`.
- R61 rehearsal manifest: 1,483 bytes,
  `sha256:7d7b33208681f9dae03a60914fb294b578f1d19759bd8e54172d93b68fa848c8`.
- R63 hosted run record: 1,172 bytes,
  `sha256:46e9d03e11fb309bd04d524353fc335daed8818effc6aa45073ba3d5f4b17643`.
- R63 hosted run manifest: 564 bytes,
  `sha256:4d424fb73b79e983041e5337cc8eeed516f4d7d8d08a686b4d9b9b389a60ae62`.

## Eligibility

Strict V11 dogfood, 69 focused release tests, the template checker, the complete checker mutation
matrix, the equivalent 4,083-file integration-owner tracked-whitespace scan, the complete
612.2-second verifier, and independent final-delta review pass. The reviewer independently replayed
69 focused tests and the 4,084-file post-integration whitespace set with no blocking or material
finding.

## Hardening Review

Independent freeze hardening reports `pass`: all 16 declared identities match staged-index bytes
and SHA-256, focused tests pass 69/69, and the 4,085-file frozen tracked set has zero whitespace
failures. No blocking or material finding remains.
## Post-Commit Gates

- Exact copied lifecycle.
- Exact full `npm.cmd run verify`.
- Non-consuming exact-candidate rehearsal.
- Hosted Linux, Windows, and macOS Node 22/24 matrix plus Template Check.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Milestone, memory, owner merge, and release closeout.
