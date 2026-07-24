# Revision 50 Root Cause Analysis

## Reproduction

The complete copied lifecycle reached candidate-private install and real-project verification, then failed three harness assertions despite successful underlying operations.

## Confirmed Causes

- Nullish fallback rewrote the valid `setupError: null` success field.
- The parser accepted pretty JSON but rejected the runner's canonical compact JSON.
- Sentinel counting included the command echo as well as the executed runtime output.

## Causal Fix

Use presence-aware receipt handling, parse exact canonical inline JSON, and count only process output records.

## Regression Boundary

The complete copied lifecycle must pass all positive and twelve negative routes before independent pre-freeze review.
