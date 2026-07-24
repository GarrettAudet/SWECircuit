# Revision 47 Correction Contract

## Trigger

Revision 46 reached R2 compile validation and isolated one exact authority mismatch: `npmScriptShell`.

## Objective

Canonicalize startup file authority identically to receipt-time file binding without weakening exact consumer validation.

## Scope

- Native canonical realpaths in the release-gate producer.
- Non-sensitive failed-field diagnostics in the R2 receipt consumer.
- Exact shell-path regression and production identities.
- Candidate 23 retirement and copied-lifecycle evidence.

Product APIs, schemas, specialist compilation, IDE Run Loop behavior, provider routing, spawning, integration, and merge effects are out of scope.

## Required Behavior

1. Canonicalize startup temp, executable, and dependency paths through native filesystem realpath.
2. Keep receipt validation exact.
3. Report only failed binding field names, never path values or ambient data.
4. Assert effective npm script shell exactly equals its bound shell path.
5. Pass the release suite, copied lifecycle, full verifier, one gate, fresh R2, hosted CI, and merge closeout.

## Route

`verify -> diagnose -> fix -> verify`