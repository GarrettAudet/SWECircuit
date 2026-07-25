# Revision 58 Freeze Contract

## Frozen Scope

- Hosted workflow bootstrap for Windows long paths and complete Git history.
- Least-privilege workflow permissions and Windows clone documentation.
- Positive and negative workflow-contract regressions.
- Authenticated lifecycle identity refresh.
- Revision 57 retirement, Revision 58 evidence, and synchronized live status.
- No production kernel or release-gate behavior change.

## Frozen Source Identities

- Workflow: 2,396 bytes, `sha256:05b3114cf238cc0200a8c9d452f670db4a40086c9f8c552417eb258ea05dc53e`.
- Gate: 70,160 bytes, `sha256:dc5b6cdea7f212196c6aa88da586fe44be20758b3619986e586445f71cbb6970`.
- Gate test: 64,255 bytes, `sha256:17175d68e56e0dd8af4b6afb36eceb91366575682178341e33259fd268b76931`.
- Lifecycle helper: 85,317 bytes, `sha256:6d4625851c5cebd7a34ae38ef44db391e257257aba5298084439addaed09819d`.
- Release-review test: 80,426 bytes, `sha256:115925294f26bbba97d4547bbdc93ac0b9c4a8e4c944893aed7ca619550a9a81`.

## Eligibility

Revision 58 may be committed only after the positive and negative CI regressions, 63-test release contract, 460-test core suite, checker matrix, template checker, format, lint, typecheck, diff check, source identities, and independent Attempt 3 review pass.

After commit, source may change only for an evidence-backed failure from the exact copied lifecycle, full verifier, hosted CI, one-shot canonical gate, or fresh R2. Any source change creates a new revision and identity.

## Post-Commit Gates

- Exact copied lifecycle.
- Full `npm.cmd run verify`.
- Hosted six-platform kernel matrix plus Windows template-check job.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Milestone, memory, and owner merge closeout.

## Deadline

Merged release or one explicit evidence-backed blocker by `2026-07-25 00:03 MDT`.