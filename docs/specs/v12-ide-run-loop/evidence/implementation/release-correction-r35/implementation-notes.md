# Revision 35 Implementation Notes

## Scope

Correct one executable status-contract regression exposed by the exact Revision 34 aggregate, then correct the release-harness timeout-evidence contradiction exposed by broader pre-commit verification. Product runtime, public APIs, V11 trust evidence, and package behavior are unchanged.

## Correction

- Restore the three immutable historical outcomes required by `test-plan.md#status`.
- Preserve the exact failed candidate, receipt, raw-log bindings, and route.
- Treat both status tests as one final anti-drift gate after all active-status edits:
  - `active release status avoids volatile candidate-state drift and preserves outcomes`.
  - `live release routing delegates volatile state to candidate-addressed evidence`.
- Define top-level timeout acceptance from primary or explicit fallback acceptance while preserving both route results.
- Keep descendant absence as an independent hard assertion.
- Require a fresh complete aggregate and package-bound independent review for the next immutable commit.

## Focused Verification

- Historical-outcome invariant: 1/1 `pass`.
- Candidate-addressed live-routing invariant: 1/1 `pass`.
- Combined final anti-drift gate: 2/2 `pass`.
- Restricted-host timeout regression: 5/5 `pass`.
- Native Windows timeout route: focused test and 5/5 probes `pass`.
- Complete release-review file: 31/31 `pass`.
- Final post-recording release-review rerun: 31/31 `pass`, including both active-status invariants.
