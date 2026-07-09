# Tasks

## Status

In progress.

## Task List

- [x] T001: Install the approved overview asset.
  Scope: Add `docs/assets/tracerail-overview.png` without altering the supplied image.
  Verification: Confirm PNG format, dimensions, file size, and repository path.
- [x] T002: Rewrite the public README.
  Scope: Replace the long framework-first copy with positioning, one visual, five workflow steps, core contracts, quick start, repository guide, principles, and status.
  Verification: Review heading structure, line count, links, terminology, and first-screen story.
- [x] T003: Align structural validation.
  Scope: Require the new overview asset and concise README headings in `scripts/check-template.ps1`.
  Verification: The checker passes with the new asset and fails when its requirement is absent.
- [x] T004: Align trace artifacts and remove rejected drafts.
  Scope: V8 feature package, asset docs, milestone, changelog, memory, and superseded SVG files.
  Verification: Search finds no active claim that the rejected SVG is the V8 source of truth.
- [ ] T005: Validate and review the final V8 revision.
  Scope: Template checker, image inspection, links, placeholders, ASCII, whitespace, rendered desktop and narrow views, and diff review.
  Verification: Evidence is recorded in `test-plan.md` and `review.md`.
- [ ] T006: Commit and push for approval.
  Scope: Stage only V8 production-readiness changes, commit, and push the version branch.
  Verification: Clean branch status and remote branch commit.

## Dependencies

T001 and T002 establish the public surface. T003 and T004 make it durable. T005 gates T006.

## Out Of Scope

- Merge to `main` without a new approval.
- Repository rename.
- Runtime orchestration implementation.
- License selection.
