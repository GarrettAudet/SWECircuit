# V14 Adaptive Orchestration Review

## Status

Release candidate implementation complete; exact-candidate review remains open.

## Review Outcome

`PASS` for the small Windows alpha. General V14 release remains `PENDING` until one immutable
commit passes canonical verification, hosted Windows CI, and independent exact-commit review.

## Spec Alignment

AC1-AC10 and AC12 have executable local evidence. AC11 remains the release gate. V14 preserves the
portable core/host boundary: the kernel compiles, routes, validates, restores, and verifies; the
host launches agents, enforces permissions, executes tools, persists evidence, and merges only
with owner approval.

## Verification Evidence

- Small Release Board: 15/15 application and evidence tests, native multi-profile launch,
  correction, verified fan-in, browser QA, and independent review.
- Medium Impact Planner: 23/23 application and evidence tests plus a preserved six-revision
  dependency, package, host-evidence, and review recovery chain.
- High risk: unsafe authority rejection, least-sufficient Sol/high routing, invalid override
  rejection, separate feasible owner override, denied-run recovery, real native Codex handoff,
  exact kernel verification, and tamper rejection.
- Release replay: each generated evidence tree remains byte-identical before, between, and after
  two complete runs.
- RunView: closed nested schemas, an independently retained inspection digest, and safe-text
  validation reject forged, widened, bidi, surrogate, stale-digest, and display-markup inputs.

## Prior Independent Findings

| Severity | Finding | Resolution |
| --- | --- | --- |
| P1 | Public files still described an unreleased alpha | Updated README, spec, ADR, contract, milestone, and review state |
| P1 | RunView accepted self-hashed widened JSON and unsafe bidi text | Added closed schemas, recursive safe-text checks, independently retained digest binding, and markup-neutral rendering |
| P1 | High-risk proof used synthetic host fixtures | Captured and kernel-verified a pre-authorized real native Codex handoff |
| P1 | Replay could overwrite stale evidence before comparing it | Added preimage, first replay, and second replay byte/digest equality checks |
| P2 | RunView omitted goal, host, lineage, scopes, context, evidence, steering, and decisions | Added the fields to inspection, JSON, Markdown, schemas, and fixtures |

## Residual Risks

- Runtime calibration and permission enforcement remain externally supplied or host-attested.
- V14 is instruction-driven and has no custom pinned IDE panel.
- Windows Codex Desktop is the only qualified reference host.
- Final release status must bind one commit, its hosted checks, and an independent verdict.

## Merge Gate

Do not merge to `main` until the exact candidate is frozen, every required check is green, the
independent verdict is `PASS`, and the owner explicitly approves the merge.
