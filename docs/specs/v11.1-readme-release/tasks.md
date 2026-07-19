# Tasks

## Status

Complete and released on `main`.

## Task List

- [x] T001: Record the V11 merge baseline and V11.1 goal.
  Scope: Branch state, feature package, milestone status, and hosted-runner exception.
  Verification: The package names the exact V11 main SHA and observed CI state.
- [x] T002: Build the primary workflow GIF.
  Scope: Deterministic generator, generated asset, and asset documentation.
  Verification: Dimensions, frames, timing, palette, file size, and representative-frame readability checks pass.
- [x] T003: Rewrite the public README.
  Scope: Product sentence, one visual, how-it-works path, quick start, boundary, docs, and status.
  Verification: README satisfies AC1, AC2, AC4, and AC5 without internal-contract duplication.
- [x] T004: Update public-surface enforcement.
  Scope: Required files, headings, visual path, capability anchors, links, aliases, modals, and negative fixtures.
  Verification: Positive checker and complete checker regression suite pass.
- [x] T005: Perform independent review.
  Scope: Conceptual clarity, visual legibility, capability honesty, and diff risk.
  Verification: Revision 5 preserves two exact verified `pass` handoffs and `integrationReady: true`.
- [x] T006: Close verification and release records.
  Scope: Canonical verification, milestone, active context, history, retrieval, patterns, commit, CI, and merge.
  Verification: Exact branch and final main evidence are preserved.

## Tasks

The main agent owns the tightly coupled README, generator, and checker edits. Read-only visual and public-contract reviewers remain independent and run in parallel after each candidate is frozen.

## Dependencies

- T002 and T003 depend on T001.
- T004 depends on T002 and T003.
- T005 depends on T002 through T004.
- T006 depends on every prior task.

## Out Of Scope

- Provider execution, automatic runtime routing, or workspace isolation.
- Product naming changes.
- Removal of historical assets.
