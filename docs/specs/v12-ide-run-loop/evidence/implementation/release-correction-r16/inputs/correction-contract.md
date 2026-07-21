# Revision 16 Release-Truth Correction Contract

## Objective

Retire Candidate 9 and make V12 release state singular, non-self-referential, and machine-auditable without changing runtime behavior or historical evidence.

## Confirmed Cause

Candidate 9's complete R2 fan-in verified `pass / fix / pass`. The product/API/IDE reviewer found that active status banners named different future candidate ordinals and that the test-plan status described all revision package gates as passing even though Revision 1 was incomplete and Revisions 2 and 3 routed `split`.

## Required Correction

- Replace hard-coded future candidate ordinals in active V12 status banners with evidence-state language.
- Make `review.md` the feature-package release-state source and keep other status banners consistent with it.
- Distinguish package identity verification, handoff completeness, workflow outcome, phase readiness, canonical gate result, and release readiness.
- Preserve Candidate 9's exact `pass / fix / pass` review and retirement as history.
- Add a focused regression that rejects candidate ordinals in the active status banners and guards the outcome distinctions.
- Update live trace and milestone text only as needed to describe the current correction route truthfully.

## Scope

The specialist may edit only:

- `docs/specs/v12-ide-run-loop/spec.md`
- `docs/specs/v12-ide-run-loop/implementation-notes.md`
- `docs/specs/v12-ide-run-loop/test-plan.md`
- `docs/specs/v12-ide-run-loop/review.md`
- `docs/specs/v12-ide-run-loop/tasks.md`
- `docs/specs/v12-ide-run-loop/debug-notes.md`
- `docs/specs/v12-ide-run-loop/root-cause-analysis.md`
- `docs/memory/active-context.md`
- `docs/milestones/v12.md`
- `test/v12-release-review.test.mjs`

## Invariants

- Do not modify Candidate 9 evidence, any prior candidate or correction evidence, runtime code, schemas, package metadata, the release harness, Git state, or external-host boundaries.
- Do not claim release readiness, hosted CI, merge, or memory closeout.
- Historical candidate ordinals remain valid in dated evidence sections; the regression applies only to active `## Status` text.
- A verified non-`pass` remains workflow non-success even when package identity and handoff schema verification pass.
- The integration owner retains successor freeze, one-shot gate, fresh R2, hosted CI, and merge authority.

## Completion Evidence

Return one exact closed `SpecialistAgentHandoff` with the changed files, the exact status invariant, focused test output, template-checker output, formatter/linter output, assumptions, risks, and truthful workflow outcome.
