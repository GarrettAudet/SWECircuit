# Revision 21 Production-Lifecycle Test Contract

## Problem

Revision 20 closes the production package-identity cycle, but its independent review returned `fix`: the claimed fresh compile/approve/verify regression directly exercised compiler helpers and hashed synthetic projection objects instead of executing the production release-review parent, harness phases, verifier, raw outputs, receipts, and promotion.

## Frozen Production Bytes

Do not change:

- `scripts/run-v12-release-review.mjs`
- `scripts/run-v12-release-gate.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-gate.test.mjs`
- `package.json`

The successor may edit only:

- `test/v12-release-review.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`

The helper is optional. Do not create another file.

## Required Correction

1. Remove or rename every synthetic assertion that claims to prove the production lifecycle.
2. Create an isolated temporary repository outside the source repository. Copy the exact production entrypoints and required repository sources while excluding `.git`, `node_modules`, `dist`, `.local`, generated release-run outputs, and the in-progress Revision 21 evidence root.
3. Preserve the exact reviewed parent, harness, verifier, gate, and relevant test bytes in the fixture. A lightweight fixture-only `npm run verify` command may replace the copied candidate's aggregate verification command solely to make canonical-gate setup bounded; record and assert that exception.
4. Initialize and commit the isolated fixture, then invoke the copied production canonical gate for its exact commit.
5. Invoke the copied production release-review parent as separate compile, standalone approve, and verify processes. Feed the exact pair emitted by compile into approve and verify.
6. Capture actual promoted prepare and compile files as raw bytes after compile. Require those exact bytes after approve and verify.
7. Capture the actual standalone approval bytes and require the verify-prefix approval to be byte-identical.
8. Generate complete schema-valid package-bound reviewer handoffs from the actual compiled R2 package and pass their exact raw bytes through the real production verifier. Require complete all-pass fan-in and `releaseReady: true` in the isolated fixture only.
9. Parse the actual parent receipts. Require one common stable reconstruction digest, distinct compile/approve/verify requested-authority digests, correct child-prefix authority, distinct invocation identities, exact output bindings, and completion-receipt-last promotion.
10. Route wrong canonical-gate digest, owner compilation digest, owner package digest, raw handoff digest, package-file substitution, stable-binding substitution, phase-authority substitution, stale output, and conflicting promoted output through production boundaries or exact production validators. Do not label a helper projection as end-to-end evidence.
11. Require the isolated fixture and all transient state to be outside the source repository and remove it after the test. The source repository must retain no test-generated path or tracked-byte change.
12. Keep all existing Revision 20 Unicode, cache, package-closure, promotion, and structural regressions passing.

## Pass Condition

The actual production entrypoints complete the isolated compile-to-verify lifecycle in separate processes with one exact package pair, byte-identical shared outputs, a real package-bound complete handoff fan-in, distinct authority receipts, and the required fail-closed negative routes. All frozen production bytes remain exact.
