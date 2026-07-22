# Revision 24 Fixture-Sequence Diagnosis

## Failure

The first complete copied-production lifecycle failed during release-review preparation:

```txt
Correction revision sequence is not contiguous from revision 1: missing revision 22.
```

## Evidence

- The lifecycle intentionally excluded Revision 22, the correction that created the sealed copied-production fixture.
- New Revision 23 and 24 evidence directories matched the release-correction discovery convention and were copied into the fixture.
- The copied history therefore contained revisions 1-21, 23, and 24, which correctly failed the contiguous-history gate.
- The cache-supply regression had already passed and was not the cause.

## Root Cause

The fixture used a single static exclusion for Revision 22. Later release evidence could enter the sealed fixture and change the scenario it was designed to reproduce.

## Causal Fix

The lifecycle now excludes every release-correction revision at or above 22 through one parsed revision rule. It also checks both the copied filesystem and committed Git tree for post-R21 correction evidence. A focused boundary test covers revisions 21, 22, 24, and the non-matching `release-correction-r19-independent-review` directory.

## Route

The failure was classified as a test-fixture isolation defect and routed to `fix`. No production kernel, package, lock, or release entrypoint behavior changed.
