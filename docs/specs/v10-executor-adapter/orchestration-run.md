# Orchestration Run: V10 Executor Boundary Review

## Status

Preimplementation review is complete and the postimplementation gate remains open. Candidate `c4bfa01` passed all seven hosted jobs but returned three `REVISE` verdicts. Its nested-container and tab correction passes direct probes, the positive checker, and all 96 scenarios in 345.8 seconds. V10 is not merged.

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

The gate remains open. `e3453e0` failed review; `9d8907a` passed but a closeout audit reopened the gate; later exact candidates repeatedly exposed broader public-contract ownership gaps. Candidates `394612d`, `0c42c64`, `7f02b87`, and `c4bfa01` each returned `REVISE / REVISE / REVISE`; the last three passed all seven hosted jobs. The current correction retains surviving outer-list state, normalizes tab-expanded continuation, routes indented nested containers to the rich parser, and completes active README identity ownership. AC8 remains open until the exact complete commit records three `PASS` verdicts and all seven hosted jobs. Merge to `main` remains owner-gated.

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

The correction that became candidate `9209ff1` structurally targeted the intended contract line, rejected known contradictory positive claims, added 13 preserving or relocation fixtures, and used invariant acceptance-state wording. The gate remained open pending exact-commit re-review and hosted CI.

## Exact Candidate 9209ff1 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | All 18 locators, 13 fixtures, 62-scenario arithmetic, documentation links, and runtime non-change were accurate. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Physical-line and narrow lexical checks missed soft wraps or synonyms, could reject truthful negatives, and did not prove exact subsection or first-contiguous-table ownership; fixtures asserted exit status but not causal diagnostics. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Invariant acceptance wording, `ac70efc` provenance, links, counts, and current-versus-historical status were consistent. |

GitHub Actions run `29366578213` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `9209ff16b9c0a77ca174eb88027676a9c91147e3`. No reviewer edited files, ran tests, or used network.

The correction that became candidate `b3ff0d3` modeled logical Markdown ownership, keyed required practices to the first contiguous table, added five preserving or bypass fixtures, and required the intended diagnostic for every parity rejection. Its local 67-scenario harness passed; the gate remained open pending exact-commit re-review and hosted CI.

## Exact Candidate b3ff0d3 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Fenced code could satisfy active contract ownership, and duplicate exact `##` or `###` owners were silently reduced to the first match. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Structural heading, line, and table parsing inspected raw fenced content; diagnostic-bound fenced-owner fixtures were missing. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Prior provenance, 67-scenario arithmetic, links, current gate language, and runtime non-change were accurate. |

GitHub Actions run `29370427573` passed all six Node 22/24 operating-system jobs plus Template Check for exact commit `b3ff0d3bd630ae2063d504f85184e34fd26c7a8a`. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `394612d` gave every structural contract check one fence-stripped active-content view, required unique exact section and subsection owners, and added four diagnostic-bound bypass fixtures. Its positive checker and all 71 isolated scenarios passed, including 28 parity cases. The gate remained open pending exact-commit review and hosted CI.

## Exact Candidate 394612d Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | List-contained fences remained visible, and legacy README, feature, debug, and RCA structural checks still inspected raw Markdown. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Required headings were presence-only rather than unique, and list-contained backtick or tilde fences could still supply active ownership. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Documentation claimed all structural lookup was fence-safe while legacy heading paths remained raw. |

GitHub Actions run `29372879405` passed all six Node 22/24 operating-system jobs but failed Template Check for exact commit `394612d29b432491e7fee07695f5bcfea553af8f`. The regression fixture searched an LF-normalized tracked file with `[Environment]::NewLine` on Windows, so it failed before running the scenario matrix. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `0c42c64` recognized container-contained fences, migrated legacy structural owners to active Markdown, required exact unique README and required H2 owners, preserved raw fenced command examples, and used a CRLF/LF-neutral fixture regex. Its positive checker and all 77 isolated scenarios passed, including 30 parity cases; the gate remained open pending exact-commit review and all seven hosted jobs.

## Exact Candidate 0c42c64 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | README prose and links remained raw; fence indentation was unlimited; `\s+` crossed heading lines; active records still required a candidate that already existed. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Raw README semantic checks allowed fenced-only requirements and false rejections, while split-line pseudo-headings still satisfied named owners. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Active context and the milestone self-staled by requiring an unnamed future candidate after `0c42c64` was frozen. |

GitHub Actions run `29375642610` passed Template Check plus all six Node 22/24 operating-system jobs in 4m16s for exact commit `0c42c64e9cef810efc284812e8024bf25419d87b`. Correctness and security each exceeded two bounded waits and returned their verdicts after one explicit immediate-conclusion request. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `7f02b87` moved README identity, prose, navigation, and semantic guards to active Markdown while preserving raw command examples; limited fence indentation to three spaces around explicit containers; made exact line owners LF/CRLF-safe without newline-crossing whitespace; and described only the invariant acceptance gate. Its positive checker and all 84 isolated scenarios passed before exact review.

## Exact Candidate 7f02b87 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Line-local fence recognition missed valid continuation fences inside multi-digit ordered-list items. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | A valid list closer remained unrecognized and could hide active contradictory content after the fenced block. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | An unrelated container-prefixed closer could close a top-level fence and expose inactive prose as active. |

GitHub Actions run `29377581706` passed Template Check plus all six Node 22/24 operating-system jobs in 5m35s for exact commit `7f02b87f61a767cd88ef6892cb78a7a37288fb4a`. All three findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The current correction tracks a normalized quote/list stack, derives continuation width from the complete list marker, requires a closer to match its opener container, ends nested fences when that container ends, and reprocesses the outer line. An ambiguity-gated fast path retains the simple parser for ordinary top-level fences. All 89 local scenarios pass: 82 expected rejections, seven expected acceptances, and 30 unchanged executor contract-parity cases. The authoritative final-tree run completed in 318.9 seconds after the first correct rich-parser run took 626.5 seconds. The gate remains open until the exact complete commit records three `PASS` verdicts and all seven hosted jobs.

## Exact Candidate c4bfa01 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Surviving outer-container state was cleared; indented nested-container ambiguity and tab-expanded continuation remained; one raw URL guard and a self-staling next action remained. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Indented nested-list fences, tab overshoot, and full-stack clearing enabled false active ownership or hidden active overclaims. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Inner-container termination discarded an outer list despite docs claiming container-aware ownership. |

GitHub Actions run `29380939276` passed Template Check plus all six Node 22/24 operating-system jobs in 6m19s for exact commit `c4bfa016c82c0838b6198f936f5cbb6bbb20f09a`. All findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The current correction preserves the longest surviving list prefix, normalizes indentation columns and rematerializes tab surplus, recognizes indented nested-container fence signatures, moves the retired URL guard to active Markdown, and uses invariant next-action wording. All 96 scenarios pass in 345.8 seconds: 87 expected rejections, nine expected acceptances, and 30 unchanged executor parity cases. Direct probes and the positive checker also pass; the gate remains open.
