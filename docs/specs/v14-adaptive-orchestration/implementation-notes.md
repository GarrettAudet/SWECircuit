# V14 Adaptive Orchestration Implementation Notes

## Status

Windows release candidate implemented; exact-candidate qualification active.

## Summary Of Changes

V14 now ships deterministic least-sufficient runtime assignment, immutable adaptive host events,
dependency-safe controller inspection, JSON and Markdown RunView projections, public schemas, and a
Windows Codex Desktop adapter contract. RunView validates a closed inspection schema, rejects
unsafe display text, and exposes goal, workspace version, host, lineage, scopes, context delivery,
evidence duties, routing decisions, steering, and accepted evidence.

The small native dogfood compiled two conflict-free specialists, selected Luna/medium for the
interface and Terra/high for domain logic, launched both in parallel, rejected a malformed raw
handoff, routed correction, verified fan-in, integrated Release Board, passed automated and browser
verification, and passed three-attempt independent review.

The medium dogfood preserves a six-revision recovery chain for dependency fan-in and host evidence.
The high-risk dogfood rejects over-broad authority, chooses the least-cost feasible Sol/high
runtime, rejects an infeasible weaker override, preserves a separate feasible owner override,
routes a denied attempt, and replays one real native Codex handoff through the kernel.

## Deviations From Plan

V13 was originally expected to cover runtime profile routing. It instead proved product dogfood
with manually authored assignments. V14 owns deterministic routing and host automation.

V14 is intentionally Windows-only and keeps native launch effects in Codex Desktop. Core never
claims that it launched an agent, enforced a permission, wrote a file, or merged a change.

## Assumptions Used

- Runtime quality is represented by owner-reviewed capability and calibration data.
- The first effectful adapter targets Windows Codex Desktop.
- Native IDE lifecycle surfaces are reused; portable RunView remains a pure projection.

## Follow-Up Work

- Freeze one immutable candidate and run hosted Windows qualification.
- Add non-Windows adapters after the Windows contract is stable.
- Consider a visual IDE extension only after a supported extension hook exists.

## Verification Performed

- Focused V14 routing and adaptive-run tests pass, including closed-schema, forged-digest, unknown
  field, unsafe Unicode, restore, routing, and tamper cases.
- The V14 release gate passes all small, medium, and high-risk evidence checks and proves both
  generated replays are byte-identical to their preimages.
- The high-risk native receipt binds the exact launch authorization, runtime, handoff bytes,
  semantic digest, verified handoff, and host-reported enforcement boundary.
- Release Board app and evidence suite: 15 passed; syntax check passed.
- Browser QA passed at desktop and mobile widths with zero console errors or warnings.
- Source-bound browser and post-fan-in evidence tests reject stale app, screenshot, or RunView bytes.

## Durable Learnings

- Specialist semantics and runtime supply must remain separate compilations.
- Least-sufficient routing needs calibrated hard requirements, not model-name folklore.
- Native host execution can be portable only through explicit commands and observations.
- Correction routing is useful only when failed raw evidence remains preserved and visible.
- Post-fan-in integration evidence must bind exact RunView inputs separately from host status.
