# File Architecture

## Purpose

This document explains how the repository is organized so humans and agents can find the right artifact quickly and avoid scattering process guidance across unrelated files.

## Root Surface

| Path | Owner | Purpose |
| --- | --- | --- |
| `README.md` | Maintainers | Public overview, quick start, and repo map. |
| `AGENTS.md` | Maintainers | Required agent contract and routing index. |
| `CONTRIBUTING.md` | Maintainers | Contribution workflow and review standard. |
| `SECURITY.md` | Maintainers | Security reporting and permission rules. |
| `SUPPORT.md` | Maintainers | Support entrypoints and boundaries. |
| `CODE_OF_CONDUCT.md` | Maintainers | Community behavior expectations. |
| `CHANGELOG.md` | Maintainers | Human-readable version history. |
| `.editorconfig` | Maintainers | Baseline editor behavior. |
| `.gitattributes` | Maintainers | Line-ending and binary-file rules. |
| `.gitignore` | Maintainers | Local noise and generated output exclusions. |

## Script Surface

| Path | Owner | Purpose |
| --- | --- | --- |
| scripts/check-template.ps1 | Maintainers | Positive structural and semantic validation for the current file-based baseline. |
| scripts/test-check-template.ps1 | Maintainers | Permanent malformed-repository fixtures proving claimed checker failures are rejected. |

## Docs Architecture

| Area | Ownership Rule |
| --- | --- |
| `docs/ai/` | Long-form operating manual. |
| `docs/assets/` | README and documentation visual assets plus source generators. |
| `docs/framework/` | Framework primitives, templates, adapter evaluation, and orchestration patterns. |
| `docs/rails/` | Reusable workflow circuits under the 0.x compatibility path. |
| `docs/modules/` | Standard module contracts. |
| `docs/packs/` | Optional extension bundles and conformance rules. |
| `docs/specs/` | Source evidence for meaningful work. |
| `docs/memory/` | Durable lessons and retrieval pointers. |
| `docs/research/` | Dated external practice scans and decisions. |
| `docs/milestones/` | Version closeout and approval gates. |
| `docs/quality/` | Repository standards and quality expectations. |
| `docs/architecture/` | Repository architecture, ownership guidance, and numbered decisions under `docs/architecture/decisions/`. |

## Artifact Ownership

- README explains the system; it should not become the handbook.
- AGENTS routes agents; it should not contain long examples.
- Handbook explains the workflow; it should not replace source packages.
- Specs preserve work evidence; they should not become permanent policy unless promoted.
- Memory summarizes durable lessons; it should link to source artifacts instead of replacing them.
- Circuits and modules define reusable contracts; they should stay concise and composable.
- Assets clarify concepts visually; they should not replace source contracts or workflow docs. Text-heavy assets should keep deterministic source when practical.
- Packs extend the system; they should not become required core behavior without promotion.

## Extension Points

SWECircuit grows in this order:

```txt
local project note -> feature package -> module or circuit -> pack -> recommended pack -> core
```

Promotion requires repeated use, validation, memory updates, and a clear reason why the change belongs in a reusable layer.

## Naming Conventions

- Use lowercase kebab-case for feature folders, circuits, modules, packs, and quality docs.
- Use version prefixes for SWECircuit version packages, such as `v6-module-rail-catalog`.
- Use dated research snapshots in `YYYY-MM-DD-topic.md` form.
- Use zero-padded ADR numbers under `docs/architecture/decisions/`, such as `0001-executable-kernel-foundation.md`.
- Use concise, descriptive root filenames for public governance files.

## Change Rules

When moving or adding files, update `README.md`, `docs/README.md`, `docs/memory/retrieval-index.md`, checker requirements, and any affected feature package or milestone.
