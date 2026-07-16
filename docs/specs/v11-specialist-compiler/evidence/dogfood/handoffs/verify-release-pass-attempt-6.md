# Release-Gate Verification PASS - Attempt 6

- Outcome: `PASS`.
- Work unit: `verify.release-gates`.
- Compilation: `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161`.
- Package: `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- Evidence: 19/19 release contexts and 9/9 rendered files matched before and after execution; both trusted digests reconstructed.

## Canonical Gates

- Focused schema 7/7, compiler/golden 35/35, and host containment 6/6 passed.
- `npm.cmd run verify` passed format 72, lint 60, typecheck/build, and 323/323 tests.
- V10 and revision-6 V11 dogfood passed; V11 reproduced exact 203-candidate search, six agents, projected 23 versus serial 40.
- Clean package inspection passed with 105 files, 122.9 kB, SHA-1 `a5b920c84803fdcff88093aabef4c4fe74bf6249`.
- Offline installed consumer and approval-bound verification passed.
- Main template checker passed.
- Complete negative checker matrix passed in 744.9 seconds.
- `git diff --check` returned no errors.
- No attempt-owned temporary directories remained, and branch/head/source status stayed unchanged.

## Host Friction

Attempts 6A and 6B are preserved separately. This successful run used `.local/npm-cache` directly as TEMP/TMP and preserved host-owned `_cacache`. npm appended one content-addressed cache index record during its required offline operation; cache file/entry counts and source status remained stable afterward. Read-only setup helpers had non-canonical quoting/base64/assertion mistakes that did not fail a product gate or mutate source.

## Follow-Up

No candidate correction is required. Integrate this PASS with the revision-6 product/API, algorithm/lifecycle, and security/trace PASS handoffs, then require post-integration reconstruction before branch freeze.
