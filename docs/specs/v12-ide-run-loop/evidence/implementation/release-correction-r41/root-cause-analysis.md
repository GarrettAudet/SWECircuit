# Revision 41 Root Cause Analysis

## Reproduction

Revision 40 passed its exact gate. Fresh R2 authenticated all three handoffs and returned a security `fix` because the gate receipt did not identify the full execution authority and the security reviewer lacked six transitive source files.

## Evidence

- Candidate: `129b299d0626e370aab8819703f2a9bcc96ab6cc`.
- Gate receipt: `sha256:e3d4aa0cda0621438d90192efe0e44d60fa907278e8d5d97d8ce0ca91b3dec9b`.
- Security handoff: 7,952 bytes, `sha256:3ed04c792fbaec88821a0d1bd5bc9ee058685fc3f4fa720f48d45fac058620ae`.
- Parent verification: `sha256:53b36fd46fa157511ebb3725bfdf6cead0f61696a4ec6bd7ab01de2524822c66`.

## Confirmed Causes

The gate copied broad host environment state and recorded source/output identity without binding every executable supply. The review catalog was assembled around direct production files rather than the complete security-causal helper/fixture cone.

## Fix

Construct a closed environment, bind private npm configuration, exact tool files, and the complete host dependency closure before and after execution, and require independent receipt validation. Add all six source files with explicit ownership and exact-once regressions.

## Regression

The hostile-environment test proves injected Node, npm, Git, and secret channels do not survive. Source-coverage and consumer guards prove complete R2 authority. Historical context behavior remains separate. Complete release-specific result: 53/53 `pass`.
