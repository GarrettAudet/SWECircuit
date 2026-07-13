# Tasks

## Status

In progress.

## Task List

- [x] T001: Start V9 from the verified V8.1 baseline.
  Scope: Merge approval, main synchronization, branch creation, source package, and milestone shell.
  Verification: main and origin/main matched at 9f2b68d; branch is codex/v9-devrail-kernel; required artifacts exist.
- [x] T002: Research kernel standards and comparable contracts.
  Scope: Runtime portability, JSON Schema, CLI conventions, plugin boundaries, event traces, liveness, and package identity.
  Verification: Dated primary-source snapshot and practice-register entries record accepted, deferred, and rejected choices.
- [x] T003: Select and apply the public project identity.
  Scope: Candidate criteria, collision scan, owner approval, GitHub repository rename, circuit vocabulary boundary, deferred machine identifiers, and historical provenance.
  Verification: Owner approved SWECircuit; `GarrettAudet/SWECircuit`, the updated origin, and `identity-migration.md` record the executed repository rename and compatibility boundary.
- [ ] T004: Decide and document the V9 architecture.
  Scope: Runtime, serialization, schema dialect, package layout, compatibility, trace persistence, privacy, and adapter interfaces.
  Verification: ADR maps every public choice to evidence, alternatives, consequences, and migration behavior.
- [ ] T005: Define versioned schemas and adversarial fixtures.
  Scope: Project, module, workflow composition, work packet, event, adapter metadata, valid examples, and malformed cases.
  Verification: Schema tests prove accepted examples and stable rejection of malformed references and graph semantics.
- [ ] T006: Implement the validation kernel.
  Scope: Schema loading, semantic checks, deterministic diagnostics, and exit codes.
  Verification: Unit and integration tests map to AC2 and AC3 across the supported platform matrix.
- [ ] T007: Implement project initialization.
  Scope: Minimal project generation, collision handling, offline behavior, and immediate validation.
  Verification: Temp-directory integration test maps to AC1 and proves no adapter or network requirement.
- [ ] T008: Implement event-trace validation and inspection.
  Scope: Append-only event model, causality checks, terminal states, redaction boundary, and human-readable inspection.
  Verification: Success, retry, timeout, cancellation, and failed-handoff fixtures map to AC4 and AC5.
- [ ] T009: Complete the selected identity migration and public quick start.
  Scope: Current product surfaces, repository metadata, compatibility note, README, canonical docs, and the branded overview asset.
  Verification: Link, stale-name, visual-brand, and public-claim reviews map to AC7 without rewriting historical evidence.
- [ ] T010: Dogfood the V9 kernel and measure the run.
  Scope: Validate repository examples, record trace evidence, timing, failures, retries, and recovery.
  Verification: Dogfood record and evidence map to AC8.
- [ ] T011: Verify, review, update memory, and prepare V9 approval.
  Scope: CI, package checks, review, milestone, history, retrieval, decisions, patterns, known issues, and residual risks.
  Verification: All criteria are checked, the milestone has an explicit merge gate, and branch CI is green.

## Tasks

Tasks are ordered by identity and architectural dependency. Implementation may fan out only after T004 and T005 define stable, disjoint contracts with an integration owner.

## Dependencies

- T003 depends on T002.
- T004 depends on T003.
- T005 depends on T004.
- T006 through T008 depend on T005 and may be decomposed after conflict analysis.
- T009 depends on the approved project identity from T003 and stable machine contracts from T005.
- T010 depends on executable slices from T006 through T008.
- T011 depends on all prior tasks.

## Out Of Scope

- Agent-provider execution adapters.
- Automatic branch creation, worktree isolation, merging, or pull-request submission.
- Hosted trace ingestion or dashboards.
- Community package registry implementation.
- License selection without owner approval.