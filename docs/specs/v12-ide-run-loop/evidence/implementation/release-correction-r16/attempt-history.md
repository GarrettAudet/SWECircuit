# Revision 16 Attempt History

## Attempt 1

The exact 4,491-byte handoff verified `pass` at `sha256:e489069fc8afc46475e6a177bc4a3cce1602acfd81cac4938409917bd9377e3f`. Integration review rejected it as incomplete because active routing sections outside the tested `## Status` blocks still instructed the IDE to freeze or review retired candidate ordinals.

The original raw handoff and its 1,312-byte verification report remain immutable. Package validity and handoff-schema validity did not override the failed integration review.

## Attempt 2

The same approved blueprint stayed within its original ten-file write scope, reconciled every identified live routing section, and expanded regression coverage beyond status banners. Its exact 6,520-byte handoff verifies `pass` at `sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9`.

The 1,497-byte accepted report is `sha256:64e2b86a290900be5364f5ae060d78f9daee898b1e003a64b4a636531621212b`. It binds the unchanged Revision 16 compilation/package pair, records complete one-agent fan-in, and sets `integrationAccepted: true` and `phaseReady: true`.

## Learning

A schema-valid `pass` is not automatically integration-ready. The integration owner must review the actual artifact against the goal and may return the same exact specialist for bounded completion without recompiling or widening authority. Compiler makespan is a deterministic relative scheduling metric, not a wall-clock promise; host execution and verification time must be measured separately.
