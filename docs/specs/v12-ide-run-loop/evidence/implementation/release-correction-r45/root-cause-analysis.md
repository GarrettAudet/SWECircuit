# Revision 45 Root Cause Analysis

## Reproduction

Run the copied-production lifecycle against exact Revision 44 commit `ce6ac4bd2f967283460cf2e75bdccd908a16822e`.

## Evidence

The expected wrong-canonical-gate-digest route was preempted by `Candidate ancestor contains fallback package supply` for the externally supplied dependency root.

## Confirmed Cause

`parentEnvironment` started from the gate process environment and removed review worker keys, but did not remove the two gate-only host supply keys.

## Fix

Delete both keys case-insensitively before constructing the release-review parent environment. Assert their absence in the existing fresh-process supply test.

## Regression

The complete release-review suite passes 35/35. The unchanged release-gate suite remains 18/18.