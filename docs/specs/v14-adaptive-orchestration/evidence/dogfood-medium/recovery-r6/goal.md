# Impact Planner Recovery Revision 6

## Goal

Bind the corrected full-row pointer target, verify the exact current Impact Planner
candidate, and obtain fresh independent approval without further application changes.

## Scope

- Treat the revision-5 independent review as the authoritative failure evidence.
- Bind every current application and test file by exact digest and byte count.
- Verify the complete suite, syntax checks, and the changed-component pointer target
  on desktop and mobile.
- Independently review context identity, recovery lineage, product correctness,
  security, accessibility, responsive behavior, and evidence.
- Do not modify application, test, workflow, evidence, memory, or Git files.

## Acceptance Criteria

1. Every declared repository context, predecessor handoff, compilation, package,
   runtime receipt, and dependency handoff verifies against its exact identity.
2. The Impact Planner test suite and syntax checks pass.
3. The full changed-component label is an interactive target at least 44px high.
4. Clicking label padding outside the 20px checkbox toggles the associated control.
5. Desktop and mobile layouts have no horizontal overflow or console warnings/errors.
6. An independent reviewer returns a strict `pass` handoff with no material finding.

## Authorized Repair

The integration owner changed only:

- `examples/impact-planner/styles.css`
- `examples/impact-planner/test/integration.test.mjs`

The row padding moved onto its enclosing label so the complete 44px visual row owns
checkbox activation. The focused regression assertion binds that label contract.
