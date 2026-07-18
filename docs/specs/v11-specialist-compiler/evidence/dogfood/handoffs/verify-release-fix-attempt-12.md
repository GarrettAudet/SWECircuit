# V11 Release Verification: Attempt 12

## Outcome

`FIX`. The product/API gate made revision 12 ineligible before the complete release matrix finished.

## Candidate Binding

- Goal revision: 12.
- Compilation: `sha256:9e5d2f7304b9100b40c1d96ad59a23c8dce73161386d478b2dda249ec921b1e5`.
- Package: `sha256:ed08d9b5d5e4c4f6195b1d0b86a01358b63e8fa0b6ca4d882982da96c589004a`.
- Context: 19/19 byte-and-digest verified.

## Partial Verification

- Canonical `npm.cmd run verify`: `PASS`; format 72/72, lint 60/60, tests 335/335, V10/V11 dogfood, package inspection, and offline consumer all passed.
- Focused schema: 7/7.
- Focused compiler/golden suite: 35/35.
- Package dry run: `PASS`, 105 files.
- Template checker: `PASS`.

The 95-case checker regression started but was terminated when the candidate became ineligible. No result or release acceptance is claimed. One invalid working-directory launch and one command-wrapper path failure were corrected before the reported partial commands.

## Follow-Up

Correct and execute the typed installed-consumer path, mint a new immutable pair, and rerun the entire release contract from the beginning.

Agent thread: `019f6ae6-ac96-7961-a3f7-94aa4fd3d555`.

