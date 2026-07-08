# Implementation Plan

## Status

Ready for approval.

## Summary

V5 adds a portable modular orchestration framework. It keeps the handbook and `AGENTS.md` as the visible operating surface, then adds a framework layer for modules, optional tool adapters, decomposition plans, and orchestration run records. The implementation is documentation and validation only; no external tools are installed.

## Impacted Areas

- `AGENTS.md`
- `docs/ai/handbook.md`
- `docs/framework/`
- `docs/research/practice-register.md`
- `docs/research/snapshots/2026-07-08-modular-orchestration-scan.md`
- `docs/memory/`
- `docs/milestones/v5.md`
- `.github/pull_request_template.md`
- `scripts/check-template.ps1`
- `docs/specs/v5-modular-orchestration-framework/`

## Approach

- Add framework docs that act like a small internal standard library for workflow modules.
- Register external ecosystem practices as adapters with explicit adoption status.
- Add templates for module definition, adapter evaluation, decomposition planning, and orchestration run tracking.
- Update the handbook and agent instructions so the framework is discoverable from the normal quick path.
- Update validation so the new layer cannot disappear or silently lose required sections.
- Update memory and milestone artifacts so future work can retrieve why V5 exists.

## Interfaces And Data

The new interface is file-based:

- `docs/framework/README.md` explains when and how to use the modular framework.
- `docs/framework/module-registry.md` records module and adapter status.
- `docs/framework/_module-template.md` defines the contract for each module.
- `docs/framework/orchestration-patterns.md` maps work shape to agent orchestration pattern.
- `docs/framework/_decomposition-plan-template.md` defines how goals become work units.
- `docs/framework/_adapter-evaluation-template.md` governs external tool adoption.
- `docs/framework/_orchestration-run-template.md` records fan-out, handoffs, fan-in, and evidence.

No public API, schema, migration, or command interface changes are introduced.

## Architecture And ADR Impact

No ADR is required because V5 changes workflow documentation architecture, not runtime architecture. The durable decision is recorded in `docs/memory/decisions.md` and the source evidence is preserved in this feature package, the framework docs, and the V5 research snapshot.

## Security And Privacy

No new tool, network, credential, memory store, or data retention behavior is installed. The adapter evaluation template requires security, privacy, storage, permission, and rollback review before any future tool adoption.

## Rollback Or Recovery

Revert the V5 branch or the V5 commit before merge. Because V5 is documentation and validation only, rollback does not require data migration or runtime cleanup.

## Risks And Mitigations

- Risk: The framework layer becomes too abstract.
  Mitigation: Tie every module to inputs, outputs, stage hooks, verification, and failure modes.
- Risk: External tools are adopted because they are popular rather than needed.
  Mitigation: Require adapter evaluation and practice-register decisions before installation.
- Risk: Multi-agent orchestration adds coordination overhead.
  Mitigation: Keep single-agent as the default and require decomposition readiness before fan-out.
- Risk: The checker enforces headings but not quality.
  Mitigation: Keep review and dogfooding as quality gates and record friction in feature notes.
