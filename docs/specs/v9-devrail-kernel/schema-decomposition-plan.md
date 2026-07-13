# V9 Schema Decomposition Plan

## Status

Active.

## Goal

Define the smallest coherent swecircuit/v1alpha1 contract and adversarial fixture set for the six accepted artifact kinds while preserving the existing human workflow model, strict security boundary, and future orchestration path.

## Source Artifacts

- Feature package: docs/specs/v9-devrail-kernel/
- Accepted architecture: docs/architecture/decisions/0001-executable-kernel-foundation.md
- Existing contracts: docs/framework/, docs/modules/, docs/agents/, and docs/rails/
- Security review: docs/specs/v9-devrail-kernel/architecture-review.md
- Memory: docs/memory/active-context.md and docs/memory/known-issues.md

## Branch And State

- Source branch: codex/v9-devrail-kernel
- Target branch: codex/v9-devrail-kernel
- Baseline commit: 5e44035
- Dirty state before fan-out: clean
- Approval gate: integrated schema and fixture review before schema freeze
- Merge target: no direct merge; the integration owner owns all edits

## Decomposition Summary

Schema authoring is tightly coupled and remains with the integration owner. Two read-only reviews can run independently: one maps existing human contracts to machine fields, and one builds the required adversarial fixture matrix. This gains independent coverage without creating competing schema files or write conflicts.

## Dependency Graph

Accepted ADR and existing contracts -> integration-owner schema draft
Accepted ADR and existing contracts -> contract-fidelity review
Accepted ADR and security findings -> adversarial-fixture review
All three outputs -> integrated schema tests -> schema freeze decision

## Work Units

### Work Unit A: Contract Fidelity

Objective: map Project, Module, Circuit, WorkPacket, RunEvent, and AdapterManifest fields to existing repository contracts and identify missing, duplicated, or over-modeled concepts.

Scope boundary: read-only analysis of field semantics; no schema, source, fixture, package, or documentation edits.

Context bundle: ADR 0001, V9 spec, Circuit Composition, module/circuit templates, standalone agent package, decomposition template, orchestration run template, and adapter evaluation template.

Agent role: workflow-contract and API reviewer.

Allowed actions: read repository files and return a structured field matrix and prioritized gaps.

Verification evidence: each recommendation cites an existing contract or an accepted ADR requirement.

Handoff format: per-kind required fields, fields to defer, cross-kind invariants, over-modeling risks, and verdict.

Stop conditions: product behavior not decided by ADR 0001, recommendation expands V9 execution scope, or evidence is absent.

### Work Unit B: Adversarial Fixture Coverage

Objective: define the smallest negative-fixture matrix that proves strict parsing, fail-closed dispatch, graph safety, trace state, path containment, resource ceilings, diagnostics, permissions, and privacy defaults.

Scope boundary: read-only test design; no implementation, schema, fixture, or workflow edits.

Context bundle: ADR 0001, architecture security review, V9 spec and test plan, V8.1 RCA, and known issues.

Agent role: application-security and test-design reviewer.

Allowed actions: read and return fixture cases with expected rejection rules and priority.

Verification evidence: every fixture maps to an ADR invariant or acceptance criterion.

Handoff format: fixture id, layer, malformed condition, expected stable rule, security impact, and minimum platform coverage.

Stop conditions: a fixture requires executing adapters, secrets, network access, destructive paths, or future hosted behavior.

## Fan-Out Plan

- Start both read-only units from clean baseline 5e44035.
- The integration owner authors schemas and valid fixtures locally.
- No subagent may edit files, install dependencies, or make external changes.

## Fan-In Plan

- Integration owner: primary IDE agent.
- Merge order: contract fidelity, adversarial coverage, then local schema-test evidence.
- Conflict resolution: accepted ADR 0001 wins; prefer the smaller model when both choices satisfy it.
- Integrated verification: all schemas compile in strict Ajv 2020 mode, every valid fixture passes, and every malformed fixture has one expected rejection layer.
- Review owner: primary IDE agent.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| Integration owner | Schemas, fixtures, compilation tests | T005 verification suite |
| A | Source-linked field matrix | Required/optional field review |
| B | ADR-linked negative matrix | Fixture manifest and expected rules |

## Stop Or Redesign Triggers

- A schema needs arbitrary payload bags.
- Historical Markdown must become a kernel input.
- A required invariant cannot produce a stable diagnostic location.
- Two artifact kinds duplicate the same ownership or state authority.
- Trace state cannot be derived from sequence and causation.
- A schema choice implies launching agents or writing traces.

## Memory Updates

- History ledger: record the schema gate after integration.
- Retrieval index: add schema and fixture locations.
- Decisions: update only if a new durable choice is required.
- Known issues: preserve unresolved implementation limitations.
- Patterns: evaluate schema-first adversarial fixtures after dogfood.
