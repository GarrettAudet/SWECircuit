# Revision 44 Root Cause Analysis

## Reproduction

Run the copied-production lifecycle against exact Revision 43 commit `c3cd70bddf9279bfd5ca87b1da5e909a486b3fac`.

## Evidence

- Candidate tree: `2b7b984538e4d3b350530d9402333ff89ad59e75`.
- Identity and external TypeScript supply: passed.
- Stable failure: missing copied candidate-local `node_modules`.
- Candidate-addressed canonical gate invocations: zero.

## Confirmed Cause

The execution-authority correction made dependency bytes explicit in the receipt but selected their root from the gate script's checkout. That assumption is invalid when the exact gate is copied into a dependency-free candidate.

## Fix

Resolve the host dependency root once from startup authority, validate it as a canonical plain directory, require it outside the materialization, propagate its exact path into the closed child environment, construct PATH from it, and require the R2 consumer to match that path to the bound closure.

## Regression

Release-gate tests pass 18/18 and release-review tests pass 35/35, including fresh-process isolated supply and exact identity checks.