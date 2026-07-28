# V14 Adaptive Orchestration Debug Notes

## Status

Resolved.

## Failure Summary

The high-risk release replay regenerated assignment evidence before validating its original
bytes. One source artifact had changed by one byte, so the generator silently refreshed stale
downstream digests and could make an invalid preimage appear current.

## Reproduction

Hash `scenario.md`, compare it with `routing/base-assignment.json`, then run the old high-risk
generator. The old flow rewrote the assignment and downstream run evidence before any pre/post
identity assertion.

## Stable Evidence

- Current scenario digest: `sha256:d78a75682527ab325182c6c8ffce48a2b719257b5afe2cb69a6d965e9f5eaac1`
- Corrected base assignment:
  `sha256:2638097ed4f6b7c96a8cb63e4890306a9db8c5f305adee15c9f45c92cc7997d8`
- Native handoff raw digest:
  `sha256:5be3f3e236817250e5423ef2ce08ac2e1821dc651ca1003f8b39c2ff00b906d9`

## Failure Classification

Evidence identity and release-gate ordering defect.

## Context Retrieved

The high-risk generator, release gate, source scenario, runtime assignment, adaptive sessions,
native host receipt, RunView renderers, and prior independent audit were inspected together.

## Hypotheses

1. The source artifact changed without downstream regeneration.
2. The generator validated current semantics but not the committed preimage.
3. The release gate's second replay comparison hid mutation performed by the first replay.

## Experiments

All three were confirmed. A fresh assignment derived from current source produced a new digest;
the old gate accepted the regenerated tree because it captured its baseline too late.

## Current Status

Fixed. The release gate snapshots every evidence file before any replay, then requires the first
and second full replays to match that preimage exactly by relative path, byte count, and SHA-256.

## Next Action

Run the same hardened gate inside canonical verification and hosted Windows CI.
