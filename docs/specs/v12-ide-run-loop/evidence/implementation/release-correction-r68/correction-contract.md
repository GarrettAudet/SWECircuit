# Revision 68 Correction Contract

## Goal

Bind and validate the complete effective environment of every R2 candidate worker before
authority-relevant candidate reads or imports, and include the authority-bearing release-review
parent in the independent security review context.

## Scope

- `scripts/run-v12-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-review.test.mjs`
- `test/fixtures/v12-worker-environment-boundary-child.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 68 evidence and live release-routing status

## Invariants

- Revision 67 is permanently retired and its consumed one-shot canonical gate is never rerun.
- The complete worker environment is identified by case-insensitive ASCII keys, raw UTF-8 value
  byte counts and SHA-256 digests, and one domain-separated content digest.
- Parent and candidate validators reject duplicate aliases, invalid keys, NUL values, lone
  surrogates, added keys, removed keys, and changed values.
- The verifier validates the exact environment immediately after worker-context identity and
  before stable reconstruction, materialization reads, runtime-binding reads, tooling reads, or
  dynamic import.
- Windows account variables observed as host-supplied child-process inputs are allowlisted
  only on Windows and value-bound by the complete environment digest; their raw values are excluded
  from stable policy evidence, and arbitrary ambient authority is not accepted.
- The runtime remains IDE-, model-, API-, and provider-neutral. External-host responsibilities
  and public V12 product behavior do not change.

## Completion Evidence

- Parent, harness, and verifier compute equivalent environment bindings.
- Fresh harness and verifier processes accept the exact closed environment and reject arbitrary,
  Git-object, Git-config, and proxy injections.
- The authority-bearing parent and the causal child fixture appear exactly once in the security
  reviewer context.
- One committed R68 candidate passes focused, broad, copied-lifecycle, hosted, canonical, and
  fresh three-domain R2 gates.

## Route

`fresh R2 -> fix -> diagnose -> Revision 68`
