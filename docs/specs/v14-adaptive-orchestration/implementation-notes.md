# V14 Adaptive Orchestration Implementation Notes

## Status

Active.

## Summary Of Changes

The contract and research phase is in progress. No kernel implementation claim is made yet.

## Deviations From Plan

V13 was originally expected to cover runtime profile routing. It instead proved product dogfood
with manually authored assignments. V14 now owns deterministic routing and host automation.

## Assumptions Used

- Runtime quality is represented by owner-reviewed capability and calibration data.
- The first effectful adapter targets Windows Codex Desktop.
- Native IDE lifecycle surfaces are reused; portable RunView remains a pure projection.

## Follow-Up Work

- Non-Windows adapters.
- Optional visual IDE extension after a supported extension hook exists.
- Reviewed policy proposals from accumulated run evidence.

## Verification Performed

- V13 exact candidate passed the canonical repository gate before V14 branching.
- Current Codex, GitHub Copilot/VS Code, Claude Code, AutoGen, and Kubernetes primary-source
  practices were reviewed for the architecture contract.

## Durable Learnings

- Specialist semantics and runtime supply must remain separate compilations.
- Least-sufficient routing needs calibrated hard requirements, not model-name folklore.
- Native host execution can be portable only through explicit commands and observations.
