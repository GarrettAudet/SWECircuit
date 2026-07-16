# Release-Gate Verification PASS - Attempt 5

- Outcome: `PASS`.
- Work unit: `verify.release-gates`.
- Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`.
- Package: `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`.
- Evidence: 19/19 assigned source tuples and 9/9 rendered package files matched before and after execution.

## Canonical Gates

- Focused schema tests: 7/7 passed.
- Focused compiler/golden tests: 35/35 passed.
- Host-containment tests: 6/6 passed.
- `npm.cmd run verify`: format checked 72 files, lint checked 60 files, typecheck and build passed, and all 323 tests passed.
- V10 and V11 dogfood checks passed.
- V11 exact search evaluated 203 candidates, selected six agents, and projected makespan 23 versus serial 40.
- Package dry run contained 105 files, measured 122.9 kB, and reported SHA-1 `a5b920c84803fdcff88093aabef4c4fe74bf6249`.
- Offline installed-consumer compilation and approval-bound package verification passed.
- Template checker passed.
- Complete negative checker matrix passed in 736.5 seconds.
- Final tracked worktree status matched the initial shared-worktree snapshot.

## Assumptions And Risks

- The preparation PASS satisfied the declared dependency.
- The approved compilation and package digests were treated as the trusted external approval record.
- The branch remains intentionally dirty with the pre-existing V11 candidate; verification wrote only authorized `dist/**` and `.local/npm-cache/**` outputs.

## Failed Attempts

Two harness-only mistakes were corrected: Windows path-separator normalization and PowerShell quoting in a read-only search. Neither mistake executed nor failed a canonical gate.

## Follow-Up

No release-gate fix is required. The integration owner may consume this PASS with the product/API, algorithm/lifecycle, and security/trace PASS handoffs. No source file was modified by the reviewer.
