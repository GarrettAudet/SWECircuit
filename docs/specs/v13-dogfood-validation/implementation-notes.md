# Implementation Notes

## Status

Active.

## Timeline

- Started from released V12 commit `32ee307e079ae3848b160b9d7f15eccf88dcd2b8`.
- Created branch `codex/v13-dogfood-validation`.
- Closed the product scope and four-unit dependency graph before application implementation.
- Compiled all 15 partitions, approved the exact four-specialist package, and created the initial
  immutable V12 run session.

## Dogfood Observations

- Opening a versioned feature package immediately requires an active milestone and exact dormant
  diagnosis/RCA headings.
- The first compiler request failed closed because assumptions were prose strings instead of
  structured `id`/`statement`/`rationale` records.
- The compiler selected only the useful parallel root wave and kept integration and review gated.
- The serial baseline was rejected for evidence independence, not merely outscored on speed.

## Decisions

- Keep the application dependency-free so the run measures orchestration rather than setup.
- Use two parallel implementation roots, one dependent integrator, and one independent reviewer.

## Failed Attempts

- The first template check found the required V13 milestone, task-verification shape, and dormant
  diagnostic headings.
- Native `apply_patch` repeatedly failed before mutation with the known Windows sandbox refresh
  error. Exact hash-preconditioned writes were used only for affected feature files, followed by
  independent checks.
- The first compiler request returned `SC4301` for two incorrectly shaped assumptions.
- The first evidence-generation attempt was denied by the default sandbox before creating the
  evidence directory; the identical authority-scoped retry succeeded.

## Files Changed

- Feature package under `docs/specs/v13-dogfood-validation/`.

## Verification

- `scripts/check-template.ps1`: pass after initial feature-package corrections.
- V12 compiler: 15 partitions evaluated, five eligible, four atomic specialists selected.
- Approval-bound package verification and initial run-session creation: pass.
## Follow-Ups

- Determine whether V13 should add a portable `RunView` projection after observing this run.
