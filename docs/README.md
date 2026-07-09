# Documentation Index

## Start Here

- `../README.md`: public overview and quick start.
- `../AGENTS.md`: agent contract and routing index.
- `ai/handbook.md`: full operating manual.
- `quality/repository-standards.md`: repository quality bar.
- `architecture/file-architecture.md`: file architecture and ownership map.

## Documentation Map

| Area | Path | Purpose |
| --- | --- | --- |
| AI workflow | `ai/` | Human and agent operating manual. |
| Assets | `assets/` | README and documentation visual assets plus source generators. |
| Agents | `agents/` | Standalone agent work package guidance. |
| IDE interaction | `ide/` | Chat-visible workflow protocol. |
| Framework | `framework/` | Rail composition, modules, adapters, orchestration, and templates. |
| Rails | `rails/` | Reusable workflow paths. |
| Modules | `modules/` | Composable module contracts. |
| Packs | `packs/` | Optional extension bundles and conformance rules. |
| Specs | `specs/` | Source packages for meaningful work. |
| Research | `research/` | Dated ecosystem scans and practice decisions. |
| Memory | `memory/` | Durable context, history, decisions, patterns, and retrieval index. |
| Milestones | `milestones/` | Version progress and approval gates. |
| Architecture | `architecture/` | Repository structure and ownership guidance. |
| Quality | `quality/` | Repo standards, validation, and review expectations. |

## Common Paths

- Starting a feature: copy `specs/_template/` into a new feature package.
- Adding a module: define the module contract under `modules/`, update the registry, and add checker coverage.
- Adding a rail: define composition under `rails/`, update docs, and add checker coverage.
- Adding a pack: start from `packs/_pack-template.md` and pass conformance review.
- Evaluating a tool: use `framework/_adapter-evaluation-template.md` and update the practice register.
- Recording durable context: update `memory/history-ledger.md` and `memory/retrieval-index.md`.

## Review Standard

Every meaningful documentation or framework change should preserve source evidence, link the relevant feature package, run validation, update memory when durable, and leave the repository easier for a new human or agent to navigate.
