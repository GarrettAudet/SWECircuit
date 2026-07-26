# Revision 72 Independent Review

## Attempt 1

### Outcome

`block`.

### Findings

1. PowerShell method errors can be non-terminating and loop variables persist. Because adjacent
   exact-roster sources can share bytes and digests, a failed second hash could reuse the first
   hash while the process still exits zero.
2. Active status surfaces still described Revision 70 or pre-hosted Revision 71 even though
   candidate-addressed evidence had retired Revision 71 into Revision 72.

### Independent Evidence

- Exact R71 baseline commit:
  `841b38a1430ec9b7845dcb11e1104ecbf7f1d75d`.
- Focused positive tests before the finding: 3/3 pass.
- An in-memory forced second-row `ComputeHash` failure reproduced exit zero with stale-hash success
  and non-empty `stderr`.
- `.gitattributes` and `.gitignore` are byte-identical to R71.
- Both Base64 envelopes reconstruct the exact externally preserved hosted logs and match every
  documented raw byte count and SHA-256 digest.
- Hosted run, job, commit, Windows label, conclusion, and sole failed-step bindings match.
- No R71 canonical-gate or run slot exists in source or the R71 tree.
- No product or runtime source changed.

### Required Correction

- Make every PowerShell error terminating.
- Reset per-row hash state.
- Require empty `stderr` and exact stdout on success.
- Add the identical-row forced-failure regression.
- Reconcile active spec, review, test-plan, and memory status.
- Repeat focused and complete mutable gates, then run a fresh independent review before freeze.

### Route

`review -> block -> fix -> verify -> follow-up review`.

## Attempt 2

### Outcome

`block`.

### Cleared Finding

The PowerShell proof is now fail-closed. Errors terminate, per-row state resets, success requires
exact stdout with empty stderr, and the two-identical-row forced second-hash failure exits nonzero.
The focused eight-test set, syntax, and diff checks pass.

### Remaining Finding

The top-level `review.md` and `test-plan.md` status sections still described pre-hosted Revision 71
while their later sections correctly retired it into Revision 72. The active-status regression also
enforced the superseded Revision 70 narrative, so it could not detect that contradiction. The R72
correction contract omitted the explicit candidate-addressed external-evidence authority rule.

### Required Correction

- Use one durable R70/R71/R72 narrative across spec, review, test plan, and active memory.

## Attempt 3

### Outcome

`pass`.

### Scope

A fresh independent reviewer inspected the exact mutable R72 correction delta, the authenticated
R71 hosted evidence envelopes, the fail-closed Windows byte probe, the active status surfaces, and
the protected one-shot gate boundary.

### Evidence

- Focused R72 proof and active-status set: 8/8 pass.
- `node --check test/v12-release-review.test.mjs`: pass.
- `git diff --check`: pass.
- `.gitattributes` and `.gitignore`: byte-identical to R71.
- Both hosted log envelopes reconstruct to their declared raw byte counts and SHA-256 digests.
- No R71 canonical-gate receipt or run slot exists.
- No product, runtime, public API, or provider-specific behavior changed.

### Findings

None.

### Release Meaning

The R72 mutable review gate is approved. This is not release approval. R72 must still freeze to one
exact commit and pass immutable local qualification, hosted Windows qualification, the protected
one-shot canonical gate, a fresh all-pass three-agent R2 review, milestone and memory closeout, and
merge verification.

### Route

`follow-up review -> pass -> freeze`.
- Delegate volatile gate state to candidate-addressed external evidence.
- Make the active-status regression enforce exact R71 hosted retirement and R72 correction facts.
- Add the authority rule to the R72 correction contract.
- Repeat the bounded independent review before freeze.

### Route

`follow-up review -> block -> trace correction -> verify -> fresh follow-up review`.
