# Revision 28 Aggregate Diagnosis

## Observed Failure

The first canonical `npm.cmd run verify` attempt returned nonzero after 1,146,300 milliseconds. The tool channel truncated its terminal output, so no exact failing assertion survived and no source-level cause can be asserted from that attempt.

## Controlled Reproduction

No source bytes changed. The same clean checkpoint then produced:

- `test:core`: 436/436 pass in 461,531 milliseconds.
- `test:lifecycle`, immediately after core: 1/1 pass in 2,401,037 milliseconds.
- Fully logged `npm.cmd run verify`: pass in 2,459,400 milliseconds, including 436/436 core tests, the sealed lifecycle, all dogfood gates, package inspection, and installed-consumer verification.

## Classification And Route

The initial stop is classified as a non-reproduced execution failure with insufficient retained output, not as a confirmed source defect. The controlled sequence crossed the prior failure window twice and the final canonical command passed from the same immutable commit. Route: `diagnose -> pass`. Any recurrence must be diagnosed from a preserved raw log; no speculative source change is justified.
