# Feature Spec

## Status

Complete.

## Problem

V2 defines version dogfooding, traceability, memory, and parallel-agent contracts, but it does not yet define the edit state each version should end in, how progress should be communicated, or how version work should move through branches and merge back to the stable baseline.

Without this, the repo can accumulate useful workflow changes without a clear sense of progress, approval state, or clean handoff from one version to the next.

## Users Or Actors

- Human project owner approving completed workflow versions.
- Main AI agent implementing workflow versions.
- Future subagents working on version branches.
- Reviewers comparing version changes before merge.

## Goals

- Define development milestones as the human-readable progress artifact for completed versions.
- Require a milestone overview when a version finishes.
- Define a branch and merge workflow for future versions.
- Make `main` the stable baseline target once the bootstrap baseline is committed.
- Keep the system simple, traceable, and file-based.

## Non-Goals

- Perform a remote push or create a pull request.
- Install release tooling.
- Require semantic versioning for every small feature.
- Replace feature packages with milestones.

## Requirements

- The handbook must define the desired edit state: clean committed baseline, one active version branch, traceable feature package, verification, review, milestone, memory update, then merge to `main` after approval.
- The handbook must define development milestones and the required version-completion overview.
- The handbook must define branch naming, merge readiness, and the bootstrap exception for the current no-commit repo state.
- `AGENTS.md` must route agents to milestone and branch workflow rules.
- A milestone directory must exist with a README, template, and initial milestone files for V1, V2, and V3.
- The PR template must require milestone and branch/merge information.
- The checker must require milestone docs and handbook sections.
- Memory and retrieval pointers must be updated.

## Acceptance Criteria

- [x] `docs/milestones/README.md` explains the milestone system.
- [x] `docs/milestones/_template.md` provides a reusable milestone overview format.
- [x] `docs/milestones/v1.md`, `v2.md`, and `v3.md` summarize version progress.
- [x] `docs/ai/handbook.md` includes `Desired Edit State`, `Development Milestones`, and `Branch And Merge Workflow` sections.
- [x] `AGENTS.md` includes milestone and branch workflow rules.
- [x] `.github/pull_request_template.md` includes milestone and branch/merge prompts.
- [x] `scripts/check-template.ps1` requires milestone docs and new handbook sections.
- [x] The template checker passes.

## Architecture Impact

This changes the workflow governance architecture by adding development milestones as a first-class progress artifact and by formalizing branch flow. No application architecture is affected.

## Risks

- Milestones could duplicate feature-package reviews if they become too detailed.
- Branch rules could be awkward before the initial baseline commit exists.
- Agents could confuse milestones with specs unless the relationship is explicit.

## Open Questions

None for V3.

## Assumptions

- The current no-commit state is a bootstrap exception.
- The stable branch should be `main` once the baseline is committed.
- Milestone summaries should be concise progress overviews, not another full spec.
