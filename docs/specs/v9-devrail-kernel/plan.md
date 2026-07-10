# Implementation Plan

## Status

In progress.

## Summary

Use the V8.1 release rail to turn the file-based protocol into a small executable kernel under a distinctive public identity. Naming research and architecture decisions come first; implementation then proceeds in vertical slices for schemas, validation, initialization, trace inspection, documentation, and dogfood evidence.

## Impacted Areas

- Product identity across public and canonical current-state documentation.
- New executable source, package metadata, schemas, fixtures, and tests.
- Module, rail, work-packet, event, and adapter contracts.
- CI platform matrix and package verification.
- README quick start and migration guidance.
- Feature, milestone, research, review, and durable memory artifacts.

## Approach

1. Research current primary standards and comparable framework contracts.
2. Write an architecture decision covering runtime, manifest, schema, versioning, persistence, package, and adapter choices.
3. Define the smallest versioned data model and adversarial fixture set before CLI behavior.
4. Implement a deterministic validator and project initializer as separate core capabilities.
5. Add append-only event validation and trace inspection without launching agents.
6. Migrate current product surfaces to the approved identity and composition vocabulary while preserving historical sources.
7. Dogfood the kernel against repository-owned examples and record timings, failures, and recovery.
8. Verify on the declared platform matrix, review public claims, update memory, and prepare the approval milestone.

## Interfaces And Data

Planned public surfaces are a project manifest, versioned module and workflow manifests, work-packet and execution-event schemas, a local CLI, and provider-neutral adapter interfaces. Exact names and canonical serialization remain gated on owner approval of the public identity and architecture decision.

## Architecture And ADR Impact

An ADR is required because this version creates the first executable runtime boundary and public compatibility contract. No implementation API is frozen until the research snapshot and ADR are reviewed.

## Security And Privacy

Core commands must not require network access, execute untrusted module content, or persist secrets. Trace design must define redaction, retention, path handling, and the difference between evidence references and captured content. Optional adapters must declare permissions explicitly.

## Rollback Or Recovery

All work remains isolated on codex/v9-devrail-kernel. Schema versions are additive during V9 development. The branch can be reverted without changing the V8.1 main baseline; product rename and package publication occur only after validation and review.

## Risks And Mitigations

- Risk: public API choices are made from taste rather than evidence.
- Mitigation: require primary-source research and an ADR before implementation.
- Risk: the first kernel becomes a hidden orchestration framework.
- Mitigation: keep V9 limited to initialize, validate, inspect, and conformance boundaries.
- Risk: schema work becomes abstract and untestable.
- Mitigation: design from valid and malformed fixtures plus V8.1 dogfood failures.
- Risk: rename churn obscures functional changes.
- Mitigation: separate identity migration from historical provenance and review the rename mechanically.
- Risk: optional adapters leak into core.
- Mitigation: test core in a clean install with no adapters.