# Revision 69 Correction Contract

## Goal

Preserve the complete closed worker-environment authority contract on macOS by binding the exact
Darwin process value that survives a minimal child environment, without allowing arbitrary ambient
variables or making host-specific values part of stable release identity.

## Scope

- `scripts/run-v12-release-review.mjs`
- `test/v12-release-review.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 68 hosted-failure evidence
- Revision 69 verification, review, and release-routing evidence

## Invariants

- Revision 68 is permanently retired and its one-shot canonical gate is never invoked.
- Darwin may inherit only the explicitly declared `__CF_USER_TEXT_ENCODING` process key beyond the
  cross-platform baseline.
- Every inherited Darwin value remains part of the complete per-invocation worker environment
  digest checked by the harness and verifier.
- The raw user-specific Darwin value is excluded from stable package identity just like Windows
  child-process account values and invocation-specific temporary paths.
- Windows and Linux do not inherit the Darwin-only key.
- Added, removed, aliased, or changed environment authority remains a hard failure.
- Public V12 behavior and IDE-, model-, API-, and provider-neutrality do not change.

## Completion Evidence

- The R68 run, historical seven-job matrix, and two macOS raw-log envelopes are byte-bound in the
  regression suite.
- Simulated Darwin inheritance and stable-policy tests pass on the supported Windows host.
- Fresh local worker probes preserve the closed environment; no macOS release result is required
  or claimed under ADR 0006.
- One committed R69 candidate passes focused, broad, copied-lifecycle, complete local, Template
  Check, Windows Node 22/24, canonical, and fresh three-domain R2 gates.

## Route

`R68 hosted verify -> diagnose -> Revision 69`
