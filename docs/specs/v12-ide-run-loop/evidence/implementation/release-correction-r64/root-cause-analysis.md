# Revision 64 Root-Cause Analysis

## Reproduction

GitHub Actions run 30156840253 fails only the Template Check job's
`Check tracked whitespace` step. The six kernel jobs pass.

A local application of the same line rule to the new R61 evidence identifies exactly seven
trailing-whitespace lines in:

```txt
docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r62/inputs/r61-exact-candidate-rehearsal/r61-lifecycle-test.stdout.txt
```

## Classification

`hosted verification policy mismatch`

## Hypotheses

1. Kernel behavior differs on one hosted platform.
   Rejected: all six cross-platform kernel jobs pass.
2. The template checker or its mutation suite fails.
   Rejected: both hosted steps pass.
3. Exact raw evidence uses a non-exempt representation despite intentional whitespace.
   Confirmed: the `.txt` stream has seven such lines and `.txt` is not exempt.
4. Removing the whitespace would preserve the evidence.
   Rejected: changing those bytes would invalidate the exact source record.

## Root Cause

Revision 63 preserved the immutable bytes but left the stream under a `.txt` extension. The
repository already treats `.log` as the representation for raw output whose bytes may contain
otherwise forbidden whitespace. The path and policy therefore disagreed about the artifact type.

## Smallest Causal Fix

Rename the exact blob to `.log`, add one exact `.gitignore` exception so it remains tracked in
copied repositories, and update its manifest and regression. Do not change the blob,
`.gitattributes`, or the hosted audit.

## Regression Coverage

- Authenticate exact bytes, digest, LF-only form, and seven intentional whitespace lines.
- Require the exact `.gitignore` exception and the workflow's established `.log` exemption.
- Require the new path to be tracked and the old path to be absent.
- Replay strict V11 dogfood and the complete V12 release-boundary suite.
