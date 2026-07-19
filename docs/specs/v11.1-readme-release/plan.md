# Implementation Plan

## Status

Implemented; publication pending.

## Summary

Replace the current overview with one short generated GIF, reduce the README to the product story, quick start, runtime boundary, and navigation, then update the checker, regression fixtures, release records, and memory as one verified slice.

## Impacted Areas

- `README.md` and `docs/assets/README.md`.
- `docs/assets/swecircuit-flow.gif` and its deterministic generator.
- README rules in `scripts/check-template.ps1` and `scripts/test-check-template.ps1`.
- V11/V11.1 milestones and durable memory.

## Approach

1. Draw a single horizontal rail with a visible specialist fan-out and fan-in.
2. Animate only the causal path: define, decompose, parallel work, verify, integrate, remember.
3. Keep README prose under a small set of headings and link deeper contracts instead of duplicating them.
4. Replace verbose checker-owned phrases with concise positive and negative capability anchors.
5. Run mechanical image checks, public-surface review, all repository gates, branch CI, and an exact fast-forward merge.

## Interfaces And Data

No runtime API or schema changes. The primary README asset path changes from `docs/assets/swecircuit-overview.png` to `docs/assets/swecircuit-flow.gif`; checker expectations change with it.

## Architecture And ADR Impact

No ADR is required. The change is local, reversible, and does not alter runtime ownership boundaries.

## Security And Privacy

No secrets, user data, authentication, permissions, or network behavior change. The README continues to deny host-owned capabilities to core.

## Rollback Or Recovery

Revert the V11.1 commit to restore the prior README, checker rules, and primary image. Historical assets remain untouched.

## Risks And Mitigations

- Risk: The visual is attractive but conceptually ambiguous.
- Mitigation: Require independent review against named visual claims, not file existence.
- Risk: Concision removes important implementation boundaries.
- Mitigation: Keep one explicit host boundary paragraph and checker regressions for both sides.
- Risk: Animated text is inaccessible at narrow widths.
- Mitigation: Use large labels, high contrast, stable geometry, and inspect representative frames at reduced width.
