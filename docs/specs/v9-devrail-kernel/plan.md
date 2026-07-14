# Implementation Plan

## Status

In progress; final closeout candidate gate remains open.

## Summary

Use the stable V8.2 circuit and its V8.1 integrity controls to turn the file-based protocol into a small executable kernel under the approved SWECircuit repository identity. Architecture decisions come first; implementation then proceeds in vertical slices for schemas, validation, initialization, trace inspection, documentation, and dogfood evidence.

## Impacted Areas

- Product identity across public and canonical current-state documentation.
- New executable source, package metadata, schemas, fixtures, and tests.
- Module, circuit, work-packet, event, and adapter contracts.
- CI platform matrix and package verification.
- README quick start and migration guidance.
- Feature, milestone, research, review, and durable memory artifacts.

## Approach

1. Research current primary standards and comparable framework contracts.
2. Apply accepted ADR 0001 and prove its pinned toolchain before freezing schemas.
3. Define the smallest versioned data model and adversarial fixture set before CLI behavior.
4. Implement a deterministic validator and project initializer as separate core capabilities.
5. Add caller-supplied event validation and read-only trace inspection without launching agents or writing traces.
6. Migrate current product surfaces to the approved identity and composition vocabulary while preserving historical sources.
7. Dogfood the kernel against repository-owned examples and record timings, failures, and recovery.
8. Verify on the declared platform matrix, review public claims, update memory, and prepare the approval milestone.

## Interfaces And Data

Approved executable surfaces are a swecircuit.json project manifest, versioned Module and Circuit manifests, WorkPacket and RunEvent schemas, pure library operations, an internal CLI, and structural AdapterManifest validation. These private local conventions do not reserve external namespaces. Canonical serialization is strict UTF-8 JSON under swecircuit/v1alpha1.

## Architecture And ADR Impact

ADR 0001 was accepted on 2026-07-13 after independent architecture, security, and developer-experience review. Schema work may begin because the private toolchain spike passed; public package distribution remains a separate decision.

## Security And Privacy

Core commands must not require network access, execute untrusted module content, or persist secrets. Trace design must define redaction, retention, path handling, and the difference between evidence references and captured content. Optional adapters must declare permissions explicitly.

## Rollback Or Recovery

All work remains isolated on `codex/v9-devrail-kernel`. Schema versions are additive during V9 development. The branch can be reverted without changing the V8.2 main baseline; public package publication remains out of scope without a separate owner decision.

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
