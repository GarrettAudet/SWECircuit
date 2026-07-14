# Orchestration Run: V10 Executor Boundary Review

## Status

Preimplementation review is complete and the postimplementation gate remains open. The current acceptance state awaits exact-commit review and hosted CI; V10 is not merged.

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

The gate remains open. `e3453e0` failed review; `9d8907a` passed but a closeout audit reopened the gate; `2c6dff4` returned `PASS / REVISE / REVISE`; `dbbeeb1` returned `REVISE / REVISE / PASS`; `4c6818d` returned `REVISE / PASS / REVISE`; `b2d73e7` returned `REVISE / REVISE / REVISE`; `ac70efc` returned `PASS / REVISE / REVISE`; and `9209ff1` returned `PASS / REVISE / PASS`, each despite green hosted CI. The current correction targets logical-statement parsing, exact subsection and first-table-row ownership, truthful-negative preservation, and diagnostic-bound fixtures. AC8 remains open until the current exact commit passes all three reviews and hosted CI. Merge to `main` remains owner-gated.

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

## Exact Candidate 4c6818d Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Public schema and implementation summaries implied a one-call or one-invocation grant although the stateless kernel does not consume grants or prevent replay. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | PASS | Lifecycle, authority disclaimers, sandbox limits, and historical wording were consistent with the implementation. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | The packaged guide omitted the executor-promise liveness prerequisite, and two accepted practices rendered outside the Current Practices table. |

GitHub Actions run `29359564312` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `4c6818d3fa8faaf02f46fcc32b2e2ed1242a7308`. The correctness reviewer exceeded two bounded waits and returned the actionable verdict after one immediate-conclusion request; no reviewer edited files, ran tests, or used network.

## Exact Candidate b2d73e7 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | The schema guide treated timely promise settlement as sufficient terminal proof without the ADR promise-liveness contract. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Schema, handbook, practice, and pattern summaries omitted the stopped-activity prerequisite and could overstate terminal certainty. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | The same schema gap remained, and the packaged guide lacked a standalone complete grant non-guarantee statement. |

GitHub Actions run `29361203381` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `b2d73e7232271f13c31fa8a188d1631fced3b55e`. All three review findings remain acceptance-blocking despite green CI. No reviewer edited files, ran tests, or used network.

## Exact Candidate ac70efc Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | Runtime code remained unchanged, nine lifecycle and nine grant surfaces matched ADR 0002, register tables were valid, and local evidence counts were accurate. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Presence-only broad-section checks could pass while contradictory claims coexisted with the required canonical sentence. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Current status records still required another candidate or freeze even though `ac70efc` was already the immutable candidate under review. |

GitHub Actions run `29364033724` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `ac70efc6cdfc9d6d07e51db1a4203c6a15b7026c`. No reviewer edited files, ran tests, or used network.

The current correction structurally targets the intended contract line, rejects known contradictory positive claims, adds 13 preserving or relocation fixtures, and uses invariant acceptance-state wording. The gate remains open pending exact-commit re-review and hosted CI.

## Exact Candidate 9209ff1 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | All 18 locators, 13 fixtures, 62-scenario arithmetic, documentation links, and runtime non-change were accurate. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Physical-line and narrow lexical checks missed soft wraps or synonyms, could reject truthful negatives, and did not prove exact subsection or first-contiguous-table ownership; fixtures asserted exit status but not causal diagnostics. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Invariant acceptance wording, `ac70efc` provenance, links, counts, and current-versus-historical status were consistent. |

GitHub Actions run `29366578213` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `9209ff16b9c0a77ca174eb88027676a9c91147e3`. No reviewer edited files, ran tests, or used network.

The current correction models logical Markdown ownership, keys required practices to the first contiguous table, adds five preserving or bypass fixtures, and requires the intended diagnostic for every parity rejection. The local 67-scenario harness passes; the gate remains open pending exact-commit re-review and hosted CI.
