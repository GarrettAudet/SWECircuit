# Revision 42 Root Cause Analysis

## Reproduction

Run `npm.cmd run verify` against exact Revision 41 commit `da989f38c85431fa967352417d8222f50a72263d`.

## Evidence

- Candidate tree: `9749361a7033fc400b6b3859639b24a8b7b4c9ce`.
- Failure stage: copied-production lifecycle.
- Stable failure: `ENOENT` while inspecting candidate-local `node_modules/typescript/bin/tsc`.
- Canonical gate invocations for Candidate 18: zero.

## Confirmed Cause

The gate received an explicit external TypeScript supply at process startup, then rebuilt a closed child environment and resolved the supply from that sanitized map. Because the supply key was no longer present, resolution fell back to the copied candidate root.

## Fix

Resolve and validate the host TypeScript entrypoint once from `process.env` at gate startup. Carry only the resulting absolute path into the exact closed child environment and continue binding its bytes, link count, and version before and after execution.

## Regression

The focused release-gate suite passes 18/18. The committed copied-production lifecycle and full verifier remain the acceptance evidence after Revision 42 is frozen.