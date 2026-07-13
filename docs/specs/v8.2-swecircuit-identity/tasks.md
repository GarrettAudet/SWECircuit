# Tasks

## Status

Complete.

## Task List

- [x] T001: Create the isolated V8.2 identity branch.
  Scope: Branch from verified V8.1 `main` without V9 runtime artifacts.
  Verification: Branch base is `9f2b68d` and source branch is `codex/swecircuit-identity-main`.
- [x] T002: Apply SWECircuit current-surface branding.
  Scope: Public docs, canonical instructions, GitHub templates, workflow labels, support assets, and repository links.
  Verification: Scoped stale-name and retired-URL scans show only intentional compatibility or regression references.
- [x] T003: Adopt Circuit Composition with 0.x compatibility.
  Scope: Framework explanation, circuit template, catalogs, modules, packs, glossary, and current guidance.
  Verification: Paths and historical identifiers remain stable while current prose uses Circuit.
- [x] T004: Add identity validation.
  Scope: README heading, current repository URL, and two negative fixtures.
  Verification: Positive checker and seventeen-case regression suite pass.
- [x] T005: Record review, milestone, and memory.
  Scope: Feature package, V8.2 milestone, active context, decisions, history, retrieval, and known issues.
  Verification: Checker validates all required artifacts and provenance fields.
- [x] T006: Push, verify CI, and merge the approved identity slice.
  Scope: Branch push, GitHub Actions, and approved fast-forward to `main`.
  Verification: Branch CI run `29264529026` and main CI run `29264704320` passed; V9 synchronization is the next version action.

## Tasks

All tasks remain centrally integrated because the change is mostly shared wording and checker coupling; parallel writes would create unnecessary conflicts.

## Dependencies

- T002 and T003 depend on T001.
- T004 depends on T002.
- T005 depends on T002 through T004.
- T006 depends on all prior tasks.

## Out Of Scope

- Executable V9 schemas, validator, initializer, trace inspector, or adapters.
- Primary overview PNG replacement.
- Package, domain, CLI, schema, or local-state namespace acquisition.
