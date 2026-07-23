# Revision 29 Root-Cause Analysis

## Reproduction

Revision 28's copied lifecycle passes while `FIXTURE_VERIFY_COMMAND` runs only five `node --check` commands. The TypeScript leg parses `scripts/run-typescript.mjs` but never invokes its main path, resolves a binding, observes a version, or compiles input.

## Stable Evidence

- Revision 28 review checkpoint: `d6c3de115bf2c79725033a99df4bb3072397b1e5`.
- Review compilation/package: `sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2` / `sha256:9db67c3732934b6dfce1ed4dc0fd89086e326b942377cea08a114e3a0f859203`.
- Verified raw `fix` handoff: 9,384 bytes, `sha256:5d6a6ca39024a50d3c662364417ff11ac48cf20c3f4edf4cd3bfe9ab6a62a460`.
- Current lifecycle assertion proves only that the syntax command text appears in the gate log.

## Classification

Verification-evidence substitution at the copied-production process boundary.

## Competing Hypotheses

1. The outer canonical gate drops the supplied TypeScript path.
2. The copied fixture receives the path but never consumes it.
3. Focused resolver tests are being mistaken for copied-process execution evidence.
4. The canonical log contains a real execution receipt that the lifecycle merely fails to parse.

## Confirmed Cause

Hypotheses 2 and 3 are confirmed. The helper forwards an external path to the outer gate, but the overridden `verify` script only syntax-checks the launcher. The log therefore has no production-launcher binding receipt or compiler sentinel. Hypotheses 1 and 4 are rejected by source inspection.

## Smallest Causal Fix

Change only the copied fixture and its evidence assertions: execute a bounded smoke compile through the production launcher, bind a distinguishable external wrapper that delegates to the real host compiler, parse the complete receipt, and add a persistent self-mutation negative copied-candidate route.

## Durable Learning

A copied-production lifecycle must assert observable behavior at the exact process boundary. Parsing a launcher or resolving a path in a focused test cannot substitute for executing and receipting that launcher inside the materialized candidate.