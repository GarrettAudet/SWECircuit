# V14 Adaptive Orchestration Implementation Notes

## Status

Windows alpha implemented; release qualification active.

## Summary Of Changes

V14 now ships deterministic least-sufficient runtime assignment, immutable adaptive host events,
dependency-safe controller inspection, JSON and Markdown RunView projections, public schemas, and a
Windows Codex Desktop adapter contract.

The small native dogfood compiled two conflict-free specialists, selected Luna/medium for the
interface and Terra/high for domain logic, launched both in parallel, rejected a malformed raw
handoff, routed correction, verified fan-in, integrated Release Board, passed automated and browser
verification, and passed three-attempt independent review.

## Deviations From Plan

V13 was originally expected to cover runtime profile routing. It instead proved product dogfood
with manually authored assignments. V14 owns deterministic routing and host automation.

The first alpha is intentionally Windows-only and keeps native launch effects in Codex Desktop.
Medium and high-risk dogfoods remain release gates rather than blocking the usable small-goal
alpha.

## Assumptions Used

- Runtime quality is represented by owner-reviewed capability and calibration data.
- The first effectful adapter targets Windows Codex Desktop.
- Native IDE lifecycle surfaces are reused; portable RunView remains a pure projection.

## Follow-Up Work

- Run medium and high-risk dogfoods.
- Freeze one immutable candidate and run hosted Windows qualification.
- Add non-Windows adapters after the Windows contract is stable.
- Consider a visual IDE extension only after a supported extension hook exists.

## Verification Performed

- Focused V14 routing and adaptive-run tests: 26 passed.
- Previously committed V14 core suite: 513 passed.
- Isolated lifecycle suite: 2 passed.
- Release Board app and evidence suite: 15 passed; syntax check passed.
- Browser QA passed at desktop and mobile widths with zero console errors or warnings.
- Source-bound browser and post-fan-in evidence tests reject stale app, screenshot, or RunView bytes.

## Durable Learnings

- Specialist semantics and runtime supply must remain separate compilations.
- Least-sufficient routing needs calibrated hard requirements, not model-name folklore.
- Native host execution can be portable only through explicit commands and observations.
- Correction routing is useful only when failed raw evidence remains preserved and visible.
- Post-fan-in integration evidence must bind exact RunView inputs separately from host status.
