# Feature Spec

## Status

Ready for approval.

## Problem

TraceRail now has Rail Composition as the core primitive, but the concrete rails, modules, and external best-practice integrations are still mostly documented in framework narrative files. To feel like a LangChain-style framework, TraceRail needs a catalog of small composable parts with one common interface.

## Users Or Actors

- Human owner selecting rails, modules, and packs.
- IDE or Codex-style agent running a rail end to end.
- Future subagents executing work-unit modules.
- Pack authors contributing optional extensions.
- Reviewers validating that community or official packs preserve TraceRail contracts.

## Goals

- Add a rail catalog with standard reusable rails.
- Add a module catalog with core modules and best-practice-inspired modules.
- Add pack governance for optional downloads, recommended packs, and community extensions.
- Make best-in-class repos fit the same TraceRail interface: input, action, output, gate, outcome, artifacts, adapter.
- Keep core small while making extension paths clear.
- Update validation, memory, and milestone artifacts for V6.

## Non-Goals

- Install external packs or tools.
- Build a package manager.
- Build a runtime pipe operator.
- Accept community contributions automatically.
- Move every existing doc into the catalog.

## Requirements

- Add `docs/rails/` with standard rails for feature, diagnosis, decomposition, adapter evaluation, and release/version work.
- Add `docs/modules/` with module contracts for clarify, spec, plan, implement, verify, review, memory, Superpowers transition, Astraeus orchestration compiler, Spec Kit adapter, retrieval adapters, and memory adapters.
- Add `docs/packs/` with pack overview, pack template, lifecycle, and conformance guidance.
- Update README, handbook, framework overview, module registry, and PR template to point to the catalogs and pack system.
- Update checker to require catalog files and headings.
- Update V6 memory, milestone, and source artifacts.
- Preserve the distinction between core, official packs, community packs, and local project overrides.

## Acceptance Criteria

- [x] Given a user wants a standard rail, when they open `docs/rails/`, then feature, diagnosis, decomposition, adapter, and release rails are available.
- [x] Given a user wants a composable module, when they open `docs/modules/`, then core and best-practice-inspired modules use the same interface.
- [x] Given a user wants to use a best-in-class repo, when they inspect the module catalog, then that repo maps to a module or optional adapter rather than a vague recommendation.
- [x] Given a community member wants to extend TraceRail, when they open `docs/packs/`, then they can see lifecycle, template, conformance, and recommendation rules.
- [x] Given a reviewer checks V6, when the checker runs, then catalogs, packs, and V6 milestone are validated.

## Architecture Impact

This changes TraceRail's documentation architecture. It adds catalogs under `docs/rails/`, `docs/modules/`, and `docs/packs/`. It does not add runtime code, external dependencies, package download behavior, data storage, or network behavior.

## Risks

- Catalogs could make the project feel larger if the quick path is not preserved.
- Pack governance could look like a package manager before one exists.
- Community extension rules could become too strict or too loose.
- Modules could duplicate handbook guidance if they are not kept contract-focused.

## Open Questions

- Which pack should be piloted first after V6 is dogfooded.
- Whether future versions should add machine-readable manifests.
- Whether examples should become their own gallery.

## Assumptions

- V5 was approved and merged to `main` before V6 began.
- The next best move is catalog normalization, not runtime installation.
- Best-in-class repos should enter through module contracts and optional packs.
