# V11 Release Verification: Attempt 11

## Outcome

`FIX` because the security lane invalidated the candidate before the full release matrix completed.

## Candidate Binding

- Goal revision: 11.
- Compilation: `sha256:4bb8eae6b779ebf666f8c9f156fb444dd0631a6e4b5c667dec53ee3327d5e89f`.
- Package: `sha256:a33c52c252df33e01224f07ed4bef10b1ed7615760b173793487caae2ee4b377`.
- Release contexts: 19/19 matched.
- Rendered package: reconstructed before command execution.

## Partial Verification

- Focused schema, compiler, and host tests: 59/59.
- Canonical `npm.cmd run verify`: `PASS`.
- Full test suite: 334/334.
- Template checker: `PASS`.

The 95-case negative checker matrix and final post-command replay were intentionally not claimed after the security finding made revision 11 ineligible.

## Follow-Up

Run the complete release contract without inherited acceptance against the corrected, newly approved candidate.

Agent thread: `019f6abb-be9a-7fc0-9270-8547d54b5a0f`.

