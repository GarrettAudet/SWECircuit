# Implementation Plan

## Status

Complete.

## Summary

Add a lightweight development milestone layer and branch/merge policy. Keep milestones separate from specs: specs explain what to build and prove, while milestones explain what changed in a completed version and what remains next.

## Impacted Areas

- `AGENTS.md`
- `docs/ai/handbook.md`
- `docs/milestones/`
- `.github/pull_request_template.md`
- `scripts/check-template.ps1`
- `docs/memory/`
- `docs/research/practice-register.md`
- `docs/specs/v3-milestones-and-branch-flow/`

## Approach

- Add milestone docs and initial milestone files.
- Add desired edit state, milestone, and branch sections to the handbook.
- Add concise agent-facing rules to `AGENTS.md`.
- Update the PR template so merge review includes milestone and branch state.
- Extend the checker to require milestone docs and headings.
- Update memory and practice governance.
- Validate locally.

## Interfaces And Data

Adds a new workflow artifact path: `docs/milestones/`. No runtime data or API changes.

## Architecture And ADR Impact

No ADR is required. The change is local to workflow governance artifacts and remains reversible.

## Security And Privacy

No new security or privacy impact.

## Rollback Or Recovery

Remove `docs/milestones/`, revert handbook and `AGENTS.md` additions, and remove checker requirements if the milestone layer adds more ceremony than value.

## Risks And Mitigations

- Risk: Milestones duplicate reviews.
- Mitigation: Keep milestone files short and focused on version overview, evidence, risks, and next work.

- Risk: Branch workflow cannot apply cleanly before the first commit.
- Mitigation: Document the current repo as a bootstrap exception and require future versions to branch from the committed baseline.
