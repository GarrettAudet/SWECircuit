# Revision 69 Test Plan

## Causal Tests

1. Simulate Windows, Linux, and Darwin inheritance from one host environment.
2. Prove only Darwin receives `__CF_USER_TEXT_ENCODING`.
3. Prove stable runtime policy is identical across different raw Darwin values.
4. Prove the complete effective worker binding still includes the exact Darwin value.
5. Launch fresh harness and verifier probes and reject arbitrary, Git, proxy, and Node additions.
6. Byte-bind the exact R68 run, job metadata, and canonical envelopes for both failed macOS logs.

## Qualification Ladder

1. Focused causal tests.
2. Format, lint, typecheck, and full core release-review suite.
3. Exact copied-production lifecycle.
4. Complete local `npm.cmd run verify`.
5. Non-consuming exact-candidate rehearsal from the frozen commit.
6. Three-job hosted matrix on the same commit: Template Check plus Windows Node 22 and 24.
7. One-shot canonical gate.
8. Fresh three-domain R2 review and fan-in.
9. Milestone, memory, and merge review.

## Stop Conditions

- Any unexplained environment key or value mismatch emits `diagnose`.
- Any supported-Windows, closed-authority, or platform-policy regression emits `fix` or
  `redesign`.
- The one-shot gate remains forbidden until the exact committed candidate passes local rehearsal,
  independent review, Template Check, and Windows Node 22/24.
