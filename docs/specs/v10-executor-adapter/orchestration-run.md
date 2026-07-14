# Orchestration Run: V10 Executor Boundary Review

## Status

Preimplementation review complete; corrected postimplementation candidate is locally verified and awaiting exact-commit re-review.

## Goal

Return three independent preimplementation reviews of ADR 0002 and the V10 feature contract, then reconcile every material finding before executor code is written.

## Source Plan

`docs/specs/v10-executor-adapter/decomposition-plan.md`

## Run Identity

- Branch: `codex/v10-executor-adapter`
- Baseline: `2b7bef37fb2477e3fc8779171c5971a3db42f20b`
- Integration owner: primary IDE agent
- Mode: read-only fan-out, centralized fan-in

## Work Unit State

| Unit | Owner | State | Outcome | Handoff |
| --- | --- | --- | --- | --- |
| A: Architecture and API | `019f614a-8f33-7651-ac07-d43980a8f8f6` | completed | REVISE | Integrated into `architecture-review.md` |
| B: Authorization and cancellation | `019f614a-cf72-7010-9008-b3d36fd0c287` | completed | REVISE | Integrated into `architecture-review.md` |
| C: Developer experience | `019f614b-0dbc-7af0-908a-f2cb87b64189` | completed | REVISE | Integrated into `architecture-review.md` |

## Evidence

All three initial handoffs independently required revision. Two focused checks found six remaining contract defects. After integration-owner revisions, final architecture and security checks returned PASS with no unresolved blocker. The complete reconciliation is preserved in `architecture-review.md`.

## Integration Notes

No subagent edited repository state. The integration owner accepted the material findings, revised the source contract through two focused rounds, and froze the accepted boundary only after both final checks passed.

## Preimplementation Gate

Gate passed on 2026-07-14. ADR 0002 is accepted for implementation; merge to `main` remains separately owner-gated after code, verification, review, memory, and milestone completion.
## Postimplementation Review

| Focus | Reviewer | First Verdict | Material Findings | Resolution State |
| --- | --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Invocation race, early timer wake-up, late acknowledgment | Causal fixes and regressions complete; exact-candidate re-review required |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Sparse and dense expansion, live proxies, direct pre-call deadline | Causal fixes and regressions complete; exact-candidate re-review required |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Public grant type, null narrowing, package guide, delta completeness, catalog docs | Contract fixes complete; candidate must include every staged new file |

The first re-review requests exceeded two bounded waits, so the integration owner sent one explicit immediate-conclusion request. All three then returned complete handoffs. No reviewer edited files or ran tests. The implementation owner preserved the verdicts, added focused tests, ran 274 tests and the canonical gate, and prepared one staged candidate so untracked implementation files cannot disappear from review.

## Postimplementation Gate

The gate remains open. `e3453e0` failed review; `9d8907a` passed but a closeout audit reopened the gate; `2c6dff4` returned `PASS / REVISE / REVISE`; and `dbbeeb1` returned `REVISE / REVISE / PASS` despite green CI. The remaining ADR lifecycle rule and grant terminology are corrected. The next exact docs-only candidate must pass all three reviews and hosted CI before AC8 closes. Merge to `main` remains owner-gated.

## Exact Candidate e3453e0 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Fulfillment timestamp and settlement detachment were separated by an async continuation. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | PASS | Prior lifecycle and hostile-object findings were resolved; residual host risks remained explicit. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Active guides did not distinguish no-call terminal cancellation from post-invocation acknowledgment. |

Hosted run `29355583567` passed all six Node 22/24 operating-system jobs plus the template checker for `e3453e0`. The gate remains open because independent review found material issues that tests and CI did not detect. A new exact candidate must receive three explicit `PASS` verdicts.

## Exact Candidate 9d8907a Verdicts And Closeout Audit

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | Settlement normalization and detachment are synchronous with the observation; abort and deadline precedence remain conservative. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | PASS | Only detached allowlisted data crosses the async boundary; hostile-object, privacy, and false-terminal protections remain intact. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | The explicitly named active guides distinguish no-call certainty from post-invocation acknowledgment and candidate records are truthful. |

GitHub Actions run `29357443883` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `9d8907a70b99c70070e057921a4dc01e5686a446`.

Before AC8 closeout, the integration owner searched the full repository for terminal-acknowledgment claims and found `docs/specs/v10-executor-adapter/spec.md` still contained the pre-correction wording. That file had not been explicitly named in the API/documentation re-review prompt. The gate was reopened, the sentence was corrected, and a final exact-candidate review was required rather than treating the three passes as broader than their inspected contract.

## Exact Candidate 2c6dff4 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | The feature-spec correction matched runtime behavior and no executable or packaged contract files changed. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | The practice register and V10 plan still omitted the pre-invocation no-call terminal path. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | The same two normative files contradicted the corrected spec; completion claims also overstated the first search scope. |

GitHub Actions run `29358105210` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `2c6dff42fbb060394dcd582cca8a0ee2b38f6dcf`. Green CI again remained necessary but insufficient.

## Exact Candidate dbbeeb1 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | ADR 0002 rule 6 incorrectly sent the pre-invocation no-call path through bounded acknowledgment. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | The research decision table called the invocation-scoped grant ephemeral despite explicit freshness and replay disclaimers. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | The cancellation claim family and historical/current status records were otherwise consistent and truthful. |

GitHub Actions run `29358867851` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `dbbeeb1e0ca1d91cc7bc44e3eae8f633caf61ff8`.
