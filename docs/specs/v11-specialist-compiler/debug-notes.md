# V11 Specialist Compiler Debug Notes

## Status

No implementation failure is active.

## Current Failure

None. Architecture-review failures are preserved in `../v11-orchestration-planner/architecture-review-round-4.md` and are not treated as compiler implementation defects.

## Reproduction

Not applicable.

## Stable Evidence

- Exact failed architecture candidate: `d486b7f49724651cc12a115ee483e70d67e62bbb`.
- Evidence closeout and split checkpoint: `6da0376`.
- Correction source: `../v11-orchestration-planner/revision-5-correction-design.md`.

## Classification

The prior failure was architecture over-coupling. It emitted `split`, not repeated patching.

## Hypotheses

- The smaller pure compiler can pass review independently of runtime scheduling and restart semantics.
- Golden optimization fixtures will expose whether the fixed objective over- or under-splits.

## Experiments

Pending implementation.

## Confirmed Cause

The original V11 candidate combined independently useful specialist construction with a much larger effectful control plane, creating cycles and incomplete lifecycle/security contracts that blocked delivery.

## Next Diagnostic Trigger

Enter diagnosis if the same golden case fails twice, exact search violates its declared count, logical input permutations change selection, or a rendered package fails digest verification.
