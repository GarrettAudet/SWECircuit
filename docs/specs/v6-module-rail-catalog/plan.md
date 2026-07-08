# Implementation Plan

## Status

Ready for approval.

## Summary

V6 turns Rail Composition into a practical catalog. It adds standard rails, reusable modules, and pack governance so TraceRail can stay small at the core while supporting official and community extensions.

## Impacted Areas

- `README.md`
- `AGENTS.md`
- `.github/pull_request_template.md`
- `docs/ai/handbook.md`
- `docs/framework/`
- `docs/rails/`
- `docs/modules/`
- `docs/packs/`
- `docs/memory/`
- `docs/milestones/v6.md`
- `docs/specs/v6-module-rail-catalog/`
- `scripts/check-template.ps1`

## Approach

- Add rail docs that instantiate the `input | module | module | output` primitive.
- Add module docs using a shared interface: input, action, output, gate, outcome, artifacts, adapter.
- Add pack docs that define core, official packs, community packs, and local project overrides.
- Update navigation surfaces so users find the catalogs from README, handbook, and framework docs.
- Add checker coverage for catalog and pack files.
- Update memory and milestone source records.

## Interfaces And Data

New file-based interfaces:

- `docs/rails/README.md`
- `docs/rails/feature-rail.md`
- `docs/rails/diagnosis-rail.md`
- `docs/rails/decomposition-rail.md`
- `docs/rails/adapter-rail.md`
- `docs/rails/release-rail.md`
- `docs/modules/README.md`
- `docs/modules/*.md`
- `docs/packs/README.md`
- `docs/packs/_pack-template.md`
- `docs/packs/pack-lifecycle.md`
- `docs/packs/conformance.md`

No runtime API, package registry, schema migration, or installation command is introduced.

## Architecture And ADR Impact

No ADR is required. The architecture decision is recorded in memory: TraceRail core remains file-based, while optional extensions use pack governance and conformance rules.

## Security And Privacy

No external code is downloaded or executed. Pack governance explicitly requires permissions, data storage, secrets, rollback, and verification review before recommendation or installation.

## Rollback Or Recovery

Revert the V6 branch or commit before merge. Because V6 is documentation and checker-only, rollback has no runtime cleanup.

## Risks And Mitigations

- Risk: Catalogs feel heavy.
  Mitigation: Keep README and handbook quick paths intact and make catalogs optional until needed.
- Risk: Community packs create quality drift.
  Mitigation: Add lifecycle and conformance requirements.
- Risk: Best-in-class repos are still too abstract.
  Mitigation: Map each to a module contract and optional adapter.
