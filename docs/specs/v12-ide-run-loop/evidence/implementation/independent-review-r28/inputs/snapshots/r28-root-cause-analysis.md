# Revision 28 Root-Cause Analysis

## Reproduction

The authenticated Revision 27 packed-consumer snapshot resolves one binding at startup, retains only `.path`, performs package and filesystem work, then passes that path directly to a later Node child. The shared launcher reopens the selected pathname between pre- and post-execution checks.

## Classification

- Packed consumer: implementation and coverage gap.
- Swap-and-restore: trust-boundary and claim-precision gap.
- PATH sentinels: test-quality gap.

## Confirmed Cause

Revision 27 unified resolution but did not unify execution. Its contract also treated pre/post path identity as proof against a concurrent same-authority writer even though repository code does not own operating-system isolation or every transitive compiler dependency.

## Causal Fix

Use the existing shared execution path everywhere, retain its complete receipt, test persistent compiler mutation and genuinely selectable conflicts, and make host isolation explicit. Do not replace an honest boundary with a partial in-memory wrapper that still loads unbound transitive code.

## Regression Route

Focused tests, clean installed-consumer execution, copied-production lifecycle, aggregate verification, and a fresh package-bound semantic review must all pass before Candidate 13 exists.
