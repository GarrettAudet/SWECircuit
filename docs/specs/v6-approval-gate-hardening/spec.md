# Feature Spec

## Status

Ready for approval.

## Problem

V6 is ready for approval, but the milestone did not make the approval and merge decision explicit enough. Older milestones also had stale approval state, which weakens TraceRail's goal-to-merge traceability.

## Users Or Actors

- Human owner deciding whether to merge a version.
- IDE agent preparing a version for approval.
- Future agents auditing release history.
- Reviewers checking whether a branch can merge.

## Goals

- Add a reusable approval-gate section to milestone guidance and template.
- Backfill milestone approval state for existing versions.
- Make V6 merge readiness explicit without merging before user approval.
- Update checker coverage so future milestones keep the approval gate.
- Preserve source evidence in a feature package.

## Non-Goals

- Merge V6 to `main`.
- Create a pull request through GitHub tooling.
- Add release automation.
- Change the branch workflow.

## Requirements

- Milestone guidance explains that milestones record approval gate state.
- Milestone template includes `Approval Gate`.
- Existing version milestones include `Approval Gate`.
- V4 and V5 milestone status reflects that those versions were already merged.
- V6 milestone states source branch, target branch, current readiness, required user decision, and post-approval merge action.
- Checker requires `Approval Gate` for milestone files.

## Acceptance Criteria

- [x] Given a future agent opens the milestone template, when preparing a version, then it sees an approval gate to fill.
- [x] Given a reviewer opens V6 milestone, when deciding whether to merge, then source branch, target branch, readiness, and required decision are explicit.
- [x] Given the checker runs, when a version milestone is missing `Approval Gate`, then validation fails.
- [x] Given a future audit reads V4 or V5, when checking status, then stale ready-for-approval wording is no longer present.

## Architecture Impact

This updates documentation governance and validation only. It does not add runtime behavior, dependencies, external services, or merge automation.

## Risks

- Historical milestones may gain brief retrospective approval notes rather than exact original PR metadata.
- Approval gate wording could become noisy if it grows beyond a concise checklist.

## Open Questions

- Whether a future version should create PRs automatically after the approval gate is ready.

## Assumptions

- V6 should remain on its branch until user approval.
- Historical V4 and V5 merge state can be represented from current repository history and V6 source notes.
