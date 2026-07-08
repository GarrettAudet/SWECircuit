# Implementation Plan

## Status

Complete.

## Summary

Add approval-gate visibility to the milestone layer so the human merge decision is explicit and auditable.

## Impacted Areas

- `docs/milestones/README.md`
- `docs/milestones/_template.md`
- `docs/milestones/v1.md` through `docs/milestones/v6.md`
- `scripts/check-template.ps1`
- `docs/specs/v6-approval-gate-hardening/`

## Approach

Use the existing milestone format and add one short `Approval Gate` section. Keep the section concise so milestones remain summaries, not release logs.

## Interfaces And Data

No public API, schema, data migration, or command interface changes. The checker now requires `Approval Gate` in milestone files.

## Architecture And ADR Impact

No ADR is required. This is a documentation governance change inside the existing release rail and milestone layer.

## Security And Privacy

No security, privacy, secret, authentication, or data retention impact.

## Rollback Or Recovery

Remove approval-gate sections and the checker heading requirement if the milestone layer becomes too heavy.

## Risks And Mitigations

- Risk: Approval gates become too verbose.
- Mitigation: Keep them to branch, state, decision, and merge action.
