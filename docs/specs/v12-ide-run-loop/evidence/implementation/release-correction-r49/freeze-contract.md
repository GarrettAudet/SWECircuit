# Revision 49 Freeze Contract

## Frozen Scope

- `scripts/run-v12-release-gate.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- Release-gate, R2, cache, and copied-lifecycle regressions.
- Revision 47 immutable gate evidence.
- Revision 48 retirement and Revision 49 trace.

## Eligibility

Revision 49 may be committed only after the 55-test focused suite, causal dependency probe, template checker, formatting, lint, and diff checks pass.

After commit, source may change only for an evidence-backed failure from the exact lifecycle, full verifier, one-shot gate, fresh R2, or hosted CI. The exact candidate gate may be invoked once and never rerun.

## Deadline

Merged release or one explicit evidence-backed blocker by `2026-07-25 00:03 MDT`.
