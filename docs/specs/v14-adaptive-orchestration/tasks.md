# V14 Adaptive Orchestration Tasks

## Status

Active.

## Tasks

- [x] T001: Freeze research, ADR, goal, and closed contract.
  Scope: Primary-source snapshot, ADR 0007, V14 spec, interface semantics, limits, and diagnostics.
  Verification: Independent architecture, security, API, and usability reviews reach pass.
- [x] T002: Implement deterministic runtime routing.
  Scope: Demand derivation, inventory validation, hard gates, ordered scoring, overrides, digests,
  schemas, and exports.
  Verification: AC1-AC5 unit, mutation, determinism, and packed-consumer tests pass.
- [x] T003: Implement the pure adaptive run controller.
  Scope: Approved assignment binding, launch commands, receipts, handoff settlement, typed routing,
  bounded escalation, restore, and inspection.
  Verification: AC6-AC7 lifecycle and adversarial restart tests pass.
- [x] T004: Implement portable RunView projections.
  Scope: Closed JSON view and concise Markdown rendering from exact source state.
  Verification: AC9 snapshot, source-link, redaction, restore, and stale-state tests pass.
- [x] T005: Implement the Windows Codex Desktop reference adapter.
  Scope: Host inventory mapping, native profile/model/effort translation, launch observations,
  status, steering, stopping, and exact-result capture.
  Verification: Adapter contract tests and one real multi-profile Codex run pass.
- [ ] T006: Dogfood small, medium, and high-risk goals.
  Scope: Real application tasks with serial baselines, routing evidence, timing, interventions,
  failures, recovery, integration, independent review, and memory updates.
  Verification: Small AC8 evidence passes; medium and high-risk AC10 evidence remain.
- [ ] T007: Complete exact-candidate release qualification.
  Scope: Canonical verification, packed consumer, Windows CI, independent specialist reviews,
  public docs, milestone, changelog, and release gate.
  Verification: AC11-AC12 pass on one immutable commit and owner approves merge.

## Dependencies

- T002 depends on T001.
- T003 depends on T002 and the unchanged V12 session boundary.
- T004 depends on T002 and T003.
- T005 depends on T002-T004.
- T006 depends on T005.
- T007 depends on T001-T006.

## Out Of Scope

- Provider billing integration.
- Automatic online policy learning.
- A universal distributed scheduler.
- Non-Windows host support.
- A custom IDE panel without a supported extension API.
