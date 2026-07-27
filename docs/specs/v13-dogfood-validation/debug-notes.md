# Debug Notes

## Status

Resolved. Final closeout replay passes.

## Failure Summary

After product verification, independent review, and closeout-document updates, the final
`node scripts/run-v13-dogfood.mjs inspect` command failed with:

```txt
V13 dogfood failed: Approval does not bind the exact current compilation and package.
```

## Reproduction

1. Compile and approve V13 while `spec.md` is the 4,048-byte launch contract.
2. Complete the run and record all four accepted handoffs.
3. Mark status and acceptance checkboxes complete inside that same `spec.md`.
4. Run `node scripts/run-v13-dogfood.mjs inspect`.

## Stable Evidence

- Approved source: 4,048 bytes, raw SHA-256
  `7874343e2b81af39e7b26777a22152d1fb7a26b4faa8da939f48fa7acdbc9e69`.
- Mutated closeout source: 4,122 bytes, raw SHA-256
  `7e297f3a0791517d3ae97ee06edf197f1ea2049789539d63b732d7c04ab74bb7`.
- Approved compilation: `sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82`.
- Approved package: `sha256:2fe0cfb24e45b47a847b3d4f2213c7f29a8ed4fa94a99feed8294d1789f98bcb`.

## Failure Classification

Trace freshness and lifecycle-boundary defect. Product behavior did not regress.

## Context Retrieved

- `scripts/run-v13-dogfood.mjs` source binding and approval check.
- Approved candidate request, compilation, package, and approval.
- Current `spec.md` bytes and the exact `HEAD` blob used at launch.
- Final run session and inspection.

## Hypotheses

1. Durable-memory edits entered compilation identity: rejected; memory is not a context source.
2. Closeout changed a live context source after approval: confirmed.
3. Product implementation changed after final review: rejected by diff and focused verification.

## Experiments

- Compared current source identity with the candidate source binding: mismatch reproduced.
- Read the exact committed launch blob: it matched the approved 4,048-byte identity.
- Restored only those approved bytes and replayed inspection: pass with the original digest pair,
  session digest, four raw handoffs, and `integrationReady: true`.

## Current Status

Resolved without recompiling, replacing evidence, or changing product output. `spec.md` remains the
immutable launch contract; milestone, review, task, test-plan, and memory records own completion.

## Next Action

V14 should make launch-context snapshots and mutable completion state separate by construction.
