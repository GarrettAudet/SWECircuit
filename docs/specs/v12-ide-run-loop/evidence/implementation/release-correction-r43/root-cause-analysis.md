# Revision 43 Root Cause Analysis

## Reproduction

Run the copied-production lifecycle against exact Revision 42 commit `a093e475f662868b938c9b33078c7f86ede5d34c`.

## Evidence

Identity authentication reported expected 47,517 bytes and actual 47,552 bytes for `scripts/run-v12-release-gate.mjs`; the digest already matched.

## Confirmed Cause

The Revision 42 pin update changed the SHA-256 value but omitted the corresponding byte-count update.

## Fix

Change the single expected byte count from 47,517 to 47,552.

## Regression

The same exact committed lifecycle must pass identity authentication and execute the corrected gate.