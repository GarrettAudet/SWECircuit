# Revision 20 Test Plan

## Required Behavioral Checks

### Stable package across fresh phases

- Produce the stable reconstruction-input binding for compile, approve, and verify from the same candidate, parent, cache, and canonical-gate bytes; require byte-identical values and digests.
- Produce distinct phase-authority bindings for compile, approve, and verify; require their digests to differ without changing candidate manifest, request, compilation, or package identity.
- Compile a representative exact review request, then reconstruct and package-verify the same compilation/package pair under approve authority and verify authority.
- Assert prepare and compile output bytes are identical across the three fresh phase contexts.
- Assert approve output bytes are identical between standalone approve and the approve prefix inside verify.

### Negative identity and evidence cases

- Wrong owner compilation digest fails.
- Wrong owner package digest fails.
- Wrong canonical-gate receipt digest fails.
- Wrong raw handoff digest fails.
- Missing, extra, linked, hardlinked, or substituted package file fails.
- Conflicting promoted output fails before any new output; an interrupted promotion has no completion receipt and a retry succeeds only with exact bytes.
- Phase authority present in candidate manifest or request context fails a closed-key or stable-identity assertion.

### Unicode and alias cases

- Reject lone high and low surrogates in every variable handoff path/file boundary.
- Reject C0, C1, DEL, ALM, LRM/RLM, bidi embedding/override, and isolate controls.
- Reject non-NFC, case-alias duplicates, backslashes, parent traversal, nested handoff paths, reserved names, and trailing dot/space forms.
- Accept a safe paired supplementary character where the filesystem and normalized path policy allow it.
- Assert the exact validated string is the string later resolved and supplied to the child.

### Cache confinement

- Reject cache equal to the repository root.
- Reject cache inside the repository.
- Reject cache that is an ancestor of the repository.
- Reject realpath aliases that create one of those overlaps.
- Accept one plain, external, realpath-disjoint cache.
- Perform the rejection before npm or any cache-using host tool invocation.

### Preserved Revision 19 guarantees

- Source and private inventory mutation tests pass.
- Ancestor `node_modules` and dependency-resolution escape tests pass.
- Explicit parent digest and tool-byte checks pass.
- Full-set promotion, link/hardlink rejection, interruption, retry, and receipt-last tests pass.
- Live prior-run outputs remain absent from semantic input declarations.
- Approval actor field is explicitly an external host declaration.

## Commands

Run at minimum:

```powershell
node --check scripts/run-v12-release-review.mjs
node --check docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs
node --check docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs
node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git -c core.longpaths=true diff --check
```

Use a measured bound above the known combined focused-suite floor. Do not run the candidate release gate, R2, V11 approval refresh, hosted CI, or merge from this implementation package.

## Pass Condition

All checks pass on one unchanged six-file state, the true cross-invocation package pair remains stable, the raw handoff verifies against the owner-approved Revision 20 package, and a separately compiled independent reviewer returns `pass` before release progression.
