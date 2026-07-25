# Revision 59 Correction Contract

## Trigger

Revision 58 commit `da74ef518638ad6b32ff4a767b057f44c82e6bd6` passed its exact copied lifecycle, then failed its exact full verifier and all seven jobs in hosted run `30139492037`.

## Objective

Close the two hosted release failures without changing preserved evidence or regenerating the approved V11 specialist package.

## Required Behavior

1. Preserve Revision 58 evidence and leave its one-shot gate unconsumed.
2. Restore `README.md` and `CONTRIBUTING.md` to the exact identities approved by the V11 dogfood package.
3. Keep the Windows checkout prerequisite in a dedicated root setup document.
4. Exempt the closed raw-evidence extension set, including `.log` and `.patch`, from tracked whitespace normalization.
5. Lock the entire hosted workflow identity, complete blocking job mappings, whitespace step, and fail-closed tracked-file enumeration into negative mutation regressions.
6. Re-run V11 dogfood, the release contract, broad verification, exact committed validation, hosted CI, and independent review.

## Scope

- `.github/workflows/template-check.yml`
- `README.md`
- `CONTRIBUTING.md`
- `WINDOWS.md`
- `test/v12-release-gate.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 58 retirement and Revision 59 trace evidence

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
