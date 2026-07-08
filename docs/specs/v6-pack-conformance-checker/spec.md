# Feature Spec

## Status

Ready for approval.

## Problem

V6 added pack governance and a first official pack, but the checker mostly verified headings. That leaves official packs vulnerable to shallow conformance: a pack could have the right section names while missing required permission, contract, verification, maintenance, or recommendation fields.

## Users Or Actors

- Human owner deciding whether a pack is safe to use.
- IDE agent validating TraceRail workflow artifacts.
- Future pack authors creating optional extensions.
- Reviewers checking official or recommended pack readiness.

## Goals

- Add field-level checker coverage for official pack conformance.
- Validate the current official pack's status, provides, requirements, permissions, contracts, verification, maintenance, and recommendation evidence.
- Update pack conformance docs to distinguish checker coverage from human review.
- Record the change in memory and V6 milestone artifacts.

## Non-Goals

- Build a pack installer.
- Add a machine-readable manifest format.
- Validate every possible community pack automatically.
- Mark any pack recommended.
- Replace human review.

## Requirements

- Add checker helpers for reading Markdown sections and validating required terms.
- Add a pack conformance check for `docs/packs/official/tracepack-orchestration-readiness/README.md`.
- Validate status, provides, requires, permissions, contracts, verification, maintenance, and recommendation evidence fields.
- Update `docs/packs/conformance.md` with checker coverage guidance.
- Update V6 milestone and durable memory artifacts.

## Acceptance Criteria

- [x] Given the official pack README is missing a required contract field, when the checker runs, then it fails with a specific conformance message.
- [x] Given the official pack README includes required fields, when the checker runs, then it passes.
- [x] Given a reviewer reads pack conformance docs, when they compare checker coverage to review, then the docs say checker coverage is not a substitute for quality review.
- [x] Given a future agent searches memory, when looking for pack validation, then retrieval index and history ledger point to this source package.

## Architecture Impact

This changes local validation only. It does not add runtime behavior, dependencies, network behavior, pack installation, or external services.

## Risks

- Term-based validation can still miss poor-quality content.
- A future pack manifest may supersede Markdown field checks.
- The current checker only validates the first official pack, not arbitrary community packs.

## Open Questions

- Whether future packs should use manifests to make conformance less text-dependent.
- Whether community pack validation should discover packs dynamically.

## Assumptions

- Official packs deserve stronger validation than community examples.
- Field-level Markdown checks are useful until pack manifests exist.
- Human review remains necessary for quality and safety.
