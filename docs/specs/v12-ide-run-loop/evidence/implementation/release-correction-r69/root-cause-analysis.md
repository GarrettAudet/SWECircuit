# Revision 69 Root-Cause Analysis

## Status

High-confidence causal hypothesis implemented and locally verified. ADR 0006 supersedes hosted
macOS confirmation for v0.1 because Windows is the only supported release host.

## Reproduction

Run the exact R68 commit through the seven-job GitHub Actions matrix. On both macOS Node 22 and
Node 24, the fresh harness probe's accepted closed environment exits `1` before hostile-key cases
run. Windows and Ubuntu pass the same test and both Node versions fail identically on macOS.

## Stable Evidence

- Run: `30177481312`, conclusion `failure`, attempt `1`.
- Exact candidate: `78f8c99645bb7c505e7e95682c6ab69a13915891`.
- Five of seven jobs pass.
- Both failed jobs fail only `Verify kernel`.
- Both logs show 473 tests, 472 passes, one failure, and the same effective-environment mismatch.
- Raw run and job metadata plus canonical base64 envelopes for both exact log byte streams are
  preserved under `inputs/r68-hosted-run/`.

## Failure Classification

Cross-platform process-environment boundary mismatch in the release-review authority validator.

## Hypotheses

1. **Darwin process-supplied environment key omitted from the expected binding.** Selected.
   macOS commonly exposes `__CF_USER_TEXT_ENCODING`; the shared platform-only failure is consistent
   with that key surviving the minimal child environment.
2. **Node-version-specific spawn behavior.** Rejected by the identical Node 22 and 24 failures.
3. **General candidate or source-identity corruption.** Rejected by five passing hosted jobs and
   the failure occurring in the same narrow fresh-process assertion.
4. **Arbitrary CI ambient leakage.** Not supported: only macOS fails, and the probe supplies a
   deliberately minimal environment.

## Causal Correction

The parent recognizes `__CF_USER_TEXT_ENCODING` only when the target platform is Darwin, inherits
its exact parent value, and includes it in the complete effective worker-environment digest.
Harness and verifier therefore authenticate the real per-invocation value before candidate work.

The raw value is excluded from stable package identity because it is host/user specific. Windows
and Linux do not inherit the key, and every undeclared or altered key still changes the complete
binding and is rejected.

## Confirmation Criterion

The original cross-platform confirmation criterion is superseded for v0.1 by ADR 0006. If macOS
support is proposed later, both macOS Node 22 and 24 jobs must pass the fresh-process regression
without weakening the closed environment or the supported Windows matrix. No macOS result is
required or claimed for the Windows-only release.
