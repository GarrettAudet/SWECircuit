# Revision 46 Root Cause Analysis

## Reproduction

Run the copied-production lifecycle against exact Revision 45 commit `13723ce555413aaf2af3039290867880cf94fe13`.

## Evidence

Both gate-only supply keys were absent from the review parent, yet the guard found `C:\tmp\swecircuit-identity-main\node_modules` as an ancestor entry.

## Confirmed Cause

`MATERIALIZATION_PARENT` was repository-local. The gate's private runtime set `TEMP` beneath that parent, and the nested lifecycle honored it, preserving repository ancestry without relying on environment fallback.

## Fix

Derive an owned two-level scratch root from the canonical host temp directory, reject source-contained resolution, and continue using unique candidate and Git directories beneath it. Cleanup removes only the two owned levels.

## Regression

The release-gate suite asserts external ancestry and passes 18/18. The release-review suite passes 35/35 with refreshed exact identities.