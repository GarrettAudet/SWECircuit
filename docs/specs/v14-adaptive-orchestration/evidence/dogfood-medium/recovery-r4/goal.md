# Impact Planner Recovery Revision 4

## Goal

Apply the smallest causal correction for the verified change-set row accessibility mismatch and add focused regression coverage.

## Confirmed Cause

`examples/impact-planner/src/app.js` emits `changed-row`, while `examples/impact-planner/styles.css` defines the intended interactive row, 44px target, label wrapping, and forced-colors behavior under `changed-item`.

## Scope

- Change the generated row class from `changed-row` to `changed-item`.
- Add a focused test that binds the runtime class to the stylesheet selector.
- Run the complete Impact Planner test and syntax suites.

## Non-Goals

- Do not redesign the interface or alter unrelated behavior.
- Do not modify styles, graph, codec, storage, server, workflow, memory, dependency, or Git files.
- Do not access the network, secrets, or external services.

## Acceptance Criteria

1. Runtime changed-component rows use the exact class targeted by the accessible stylesheet rules.
2. A regression assertion fails if the runtime class and stylesheet selector diverge again.
3. All Impact Planner tests and syntax checks pass.
4. The exact correction is returned in a schema-valid specialist handoff.

## Follow-On

The revision-4 package is intentionally fix-only. Because it authorizes source mutation, its package is retired after the fix handoff and revision 5 must bind the corrected bytes for final independent verification and review.
