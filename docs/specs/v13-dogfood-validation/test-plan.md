# Test Plan

## Status

Planned.

## Automated Tests

- Model validation, deterministic creation and update, filtering, grouping, and schema rejection.
- Import/export round trip and malformed/duplicate/unknown-field rejection.
- Storage empty-state, valid-state, malformed-state, and failed-write behavior.
- V12 package verification, initial eligibility, dependency routing, raw handoff verification,
  restart-safe session restore, and final integration readiness.
- Repository template checker and focused formatting/whitespace checks for all new files.

## Browser Scenarios

1. Load seeded app and verify all three status lanes.
2. Create a high-priority issue and confirm count and persistence.
3. Edit and move the issue through statuses.
4. Search and filter, then clear filters.
5. Export, delete, import, and confirm round-trip restoration.
6. Exercise invalid input and cancellation without corrupting state.
7. Check desktop and mobile viewports, keyboard operation, and browser console.

## Review

An independent read-only specialist compares the integrated application and evidence against
AC1-AC8. The integration owner routes any non-`pass` outcome before completion.

## Current Evidence

None. Planned checks must not be reported as completed.
