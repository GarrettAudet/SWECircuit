# Tasks

## Status

Ready for approval.

## Task List

Use this format for each task:

```txt
- [x] T001: Short action statement
  Scope: What changes.
  Verification: Test, check, review, or evidence that proves completion.
```

## Tasks

- [x] T001: Create V6 feature package.
  Scope: Add V6 spec, plan, tasks, test plan, implementation notes, debug notes, RCA, and review.
  Verification: Checker validates the V6 feature package.

- [x] T002: Add rail catalog.
  Scope: Add README plus feature, diagnosis, decomposition, adapter, and release rails.
  Verification: Rails use common rail/module/gate/artifact shape and checker validates headings.

- [x] T003: Add module catalog.
  Scope: Add README plus core modules and best-practice adapter modules.
  Verification: Modules use input, action, output, gate, outcome, artifacts, and adapter sections.

- [x] T004: Add pack governance.
  Scope: Add packs README, pack template, lifecycle, and conformance docs.
  Verification: Packs define core, official, community, local overrides, lifecycle, and recommendation rules.

- [x] T005: Update navigation and operating docs.
  Scope: Update README, AGENTS, handbook, framework overview, registry, and PR template.
  Verification: Users and agents can route from the top-level docs to rails, modules, and packs.

- [x] T006: Update memory and milestone.
  Scope: Update active context, decisions, patterns, glossary, history ledger, retrieval index, and V6 milestone.
  Verification: Future agents can retrieve V6 source artifacts and catalog rationale.

- [x] T007: Validate and review.
  Scope: Run checker, placeholder scans, non-ASCII scan, diff check, and review.
  Verification: Commands pass and review records residual risks.

## Dependencies

- T001 precedes all other tasks.
- T002 and T003 define the catalog before navigation updates.
- T004 defines community extension before README and handbook claims.
- T006 follows implementation.
- T007 is final before commit.

## Out Of Scope

- Runtime package manager.
- Pack installation command.
- External framework installation.
- CI publishing workflow.
