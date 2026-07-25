# Revision 63 Correction Contract

## Goal

Restore the V11-authenticated Git normalization policy without changing the preserved R61
rehearsal bytes or the corrected copied-gate timeout.

## Scope

- Retire Revision 62 without invoking its one-shot gate.
- Remove the one R62-specific binary attribute that changed `.gitattributes`.
- Keep the R61 rehearsal stdout blob byte-for-byte unchanged.
- Prove the restored `.gitattributes` identity and LF-only rehearsal evidence in V12 tests.
- Preserve R62's focused failure streams in Base64 envelopes with exact raw bindings.

## Non-Goals

- No kernel, public API, schema, host-runtime, or specialist-compiler behavior change.
- No mutation of V11 approved evidence or authenticated V11 source files.
- No canonical-gate invocation before all repeatable exact and hosted checks pass.

## Acceptance

- `.gitattributes` is 1,283 bytes at
  `sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`.
- R61 rehearsal stdout remains 2,244 LF-only bytes at
  `sha256:2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b`.
- `test/v11-dogfood-runner.test.mjs` retains its approved 43,787-byte identity at
  `sha256:637f1c44d641a2752186aa5837ae11d57f97d394283e52b6801ebaf29dfb9284`.
- Strict V11 dogfood and the complete V12 release-boundary suite pass.
- Independent review confirms the correction is minimal and source-preserving.
