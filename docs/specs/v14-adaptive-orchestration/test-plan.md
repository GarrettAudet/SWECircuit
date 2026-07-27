# V14 Adaptive Orchestration Test Plan

## Status

Active.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Canonical determinism, permutation, serialization, and digest tests |
| AC2 | Hard-gate matrix and stable rejection-code tests |
| AC3 | Comparator, cost, latency, surplus, and tie-break tests |
| AC4 | No-feasible-profile diagnostics and owner-action tests |
| AC5 | Override validity, hard-gate, independence, and audit tests |
| AC6 | Launch receipt identity, catalog drift, mismatch, replay, and restore tests |
| AC7 | Dependency eligibility, route, escalation budget, and no-effect controller tests |
| AC8 | Real Codex Desktop multi-profile dogfood evidence |
| AC9 | RunView JSON/Markdown reconstruction, links, redaction, and stale-input tests |
| AC10 | Small, medium, and high-risk dogfood replay and quality review |
| AC11 | Full repository verify, consumer, Windows CI, and independent reviews |
| AC12 | Fresh-user walkthrough and public documentation review |

## Automated Checks

- Unit: validation, demand derivation, hard gates, comparator, overrides, and RunView.
- Integration: V11 compilation to routing to V12 session to verified fan-in.
- E2E: Codex adapter fixtures plus exact dogfood replay.
- Typecheck: strict public and packed-consumer TypeScript.
- Lint: Biome.
- Build: compiled ESM and schema export parity.
- Security: hostile objects, proxy rejection, unsafe text, path, authority, replay, and drift cases.
- Determinism: key/order permutations, equivalent inventory order, and repeated byte comparison.

## Manual Checks

- Give one plain-language product goal in Codex Desktop and observe visible stage updates.
- Confirm assignments explain selected model/effort and rejected cheaper profiles.
- Override one eligible assignment and confirm a new approval identity is required.
- Steer or stop a native subagent and confirm RunView reports host state without inventing success.
- Inspect small-task ceremony and verify the serial path remains understandable.

## Regression Coverage

- V11 specialist compiler and V12 immutable session suites remain unchanged and passing.
- V13 dogfood remains reproducible.
- Catalog drift cannot reuse an old approval.
- A stronger model cannot repair missing permissions, tools, context, or reviewer independence.
- A verified non-pass handoff routes rather than becoming completion.

## Skipped Checks

None are planned. macOS and Linux are outside the accepted v0.1 support boundary.

## Verification Evidence

The small native dogfood is recorded under
`docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/`. It binds exact team and runtime
compilations, native handoffs, immutable session and RunView, integration verification, 15 app and evidence
tests, source-bound desktop/mobile browser evidence, and independent review. Medium, high-risk,
hosted-CI, and immutable-candidate evidence remain before general release.
