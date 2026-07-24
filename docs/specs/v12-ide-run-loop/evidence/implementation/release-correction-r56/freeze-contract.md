# Revision 56 Freeze Contract

## Frozen Scope

- One narrow source-runner injection seam with unchanged production defaults.
- Four repository-sensitive self-tests moved to private Git fixtures.
- Revision 55 retirement, Revision 56 evidence, and synchronized live status.

## Frozen Source Identities

- Gate: 70,160 bytes, `sha256:dc5b6cdea7f212196c6aa88da586fe44be20758b3619986e586445f71cbb6970`.
- Gate test: 61,011 bytes, `sha256:84d169210f955ebc4f7691cbd5169ba15b6cb14180c3c4752610d5f210c98160`.
- Lifecycle helper: 85,317 bytes, `sha256:4aa61708eb0b693042802ccd3e9739b3c0d77f2e5d6814bed4168d8a3cc6d07e`.
- Release-review test: 80,426 bytes, `sha256:115925294f26bbba97d4547bbdc93ac0b9c4a8e4c944893aed7ca619550a9a81`.

## Eligibility

Revision 56 may be committed only after the four causal tests, complete 24-test gate file, 61-test release contract, 458-test core suite, status invariants, template checker, format, lint, typecheck, syntax, diff, source identities, and independent review pass.

After commit, source may change only for an evidence-backed failure from the exact copied lifecycle, full verifier, one-shot canonical gate, fresh R2, or hosted CI. Any change creates a new revision and source identity.

## Post-Commit Gates

- Exact copied lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Hosted CI and owner merge gate.

## Deadline

Merged release or one explicit evidence-backed blocker by `2026-07-25 00:03 MDT`.
