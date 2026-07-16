# V11 Specialist Compiler Implementation Notes

## Status

In progress.

## Summary Of Changes

- Preserved the four failed runtime architecture rounds instead of rewriting their evidence.
- Split the independent Specialist Compiler into the active V11 product slice.
- Began the closed contract and additive implementation defined by ADR 0004.

## Deviations From Plan

The original V11 plan attempted to design compiler, scheduler, restart protocol, parent trace, repository proof, merge evidence, and memory proposal flow together. Round 4 returned four `REVISE` verdicts. The workflow emitted `split`: V11 now ships specialist construction and package rendering; the runtime control plane is deferred with its corrections preserved.

## Assumptions Used

- Goal clarification and atomic semantic work decomposition remain visible IDE/human work.
- Core can optimize grouping from stable work-unit contracts without provider supply.
- Planning weights are useful for deterministic comparison but are not elapsed-time promises.
- Exact scope keys plus declared conflict zones are safer and more portable than hidden path-overlap heuristics.

## Follow-Up Work

- Implement the deferred runtime obligations in a later version only after V11 is dogfed and adopted.
- Evaluate learned candidate-generation heuristics from real runs before widening bounded search.

## Verification Performed

- Round-4 evidence and correction design committed and pushed at `6da0376`.
- Compiler implementation verification is pending.

## Durable Learnings

- A useful compiler and a universal runtime are separate ownership boundaries.
- Hyper-specialization begins with exact task demand and candidate-team comparison, not generic role labels.
- Search mode and objective evidence must be visible so “optimized” remains an auditable claim.
