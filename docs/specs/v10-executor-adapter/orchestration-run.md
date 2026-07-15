# Orchestration Run: V10 Executor Boundary Review

## Status

Preimplementation review is complete and the postimplementation gate remains open. Candidate `dd575d5` passed all seven hosted jobs plus correctness and API/documentation review, but security returned `REVISE`. The current ambiguity-gate correction passes the positive checker, `npm.cmd run verify`, and all 115 scenarios in 705.2 seconds. V10 is not merged.

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

The gate remains open. `e3453e0` failed review; `9d8907a` passed but a closeout audit reopened the gate; later exact candidates repeatedly exposed broader public-contract ownership gaps. Candidates through `82c3bb1` remained review-blocked. Candidate `dd575d5` passed all seven hosted jobs plus correctness and API/documentation review, but security returned `REVISE` because the fast-path ambiguity gate missed a nested list-and-quote fence. The current correction conservatively routes horizontal-whitespace container fences to the rich parser. AC8 remains open until one exact complete commit records three `PASS` verdicts and all seven hosted jobs. Merge to `main` remains owner-gated.

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

The correction that became candidate `c4bfa01` tracked a normalized quote/list stack, derived continuation width from the complete list marker, required a closer to match its opener container, ended nested fences when that container ended, and reprocessed the outer line. An ambiguity-gated fast path retained the simple parser for ordinary top-level fences. All 89 local scenarios passed: 82 expected rejections, seven expected acceptances, and 30 unchanged executor contract-parity cases. The authoritative final-tree run completed in 318.9 seconds after the first correct rich-parser run took 626.5 seconds. The gate remained open until exact-candidate review and all seven hosted jobs completed.

## Exact Candidate c4bfa01 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | Surviving outer-container state was cleared; indented nested-container ambiguity and tab-expanded continuation remained; one raw URL guard and a self-staling next action remained. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Indented nested-list fences, tab overshoot, and full-stack clearing enabled false active ownership or hidden active overclaims. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Inner-container termination discarded an outer list despite docs claiming container-aware ownership. |

GitHub Actions run `29380939276` passed Template Check plus all six Node 22/24 operating-system jobs in 6m19s for exact commit `c4bfa016c82c0838b6198f936f5cbb6bbb20f09a`. All findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `ae5195c` preserved the longest surviving list prefix, normalized indentation columns and tab surplus, recognized indented nested-container fence signatures, moved the retired URL guard to active Markdown, and used invariant next-action wording. Its 96-scenario matrix passed in 345.8 seconds: 87 expected rejections, nine expected acceptances, and 30 unchanged executor parity cases. Direct probes and the positive checker also passed; the gate remained open.

## Exact Candidate ae5195c Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | An unmarked blank retained a quote-owned fence and hid a later active overclaim; requested container-sensitive blank termination plus a causal fixture. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | no verdict | Remained running through two bounded waits and an immediate-conclusion request, then was closed without a handoff. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Confirmed parser/document contract alignment, evidence arithmetic, links, headings, invariant status, and unchanged runtime scope. |

GitHub Actions run `29383056180` passed Template Check plus all six Node 22/24 operating-system jobs in 7m05s for exact commit `ae5195c3c3d1fb611e0b7e3c1d94f6e53791b1af`. Correctness remains acceptance-blocking, and no security verdict is not a pass. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `f990abc` ended a quote-owned fence when a whitespace-only line lacked the quote marker, preserved only any list prefix enclosing that quote, and reprocessed the blank through ordinary list state. Its 99-scenario matrix passed in 440.7 seconds: 89 expected rejections, ten expected acceptances, and 30 unchanged executor parity cases. Direct probes and the positive checker also passed; the gate remained open.

## Exact Candidate f990abc Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | A quote-only blank in a quote, list, quote stack ended the inner quote but discarded the surviving outer quote and list, hiding a later active overclaim. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | .NET `IsNullOrWhiteSpace` treated U+00A0 as blank even though CommonMark permits only spaces and tabs, extending list-owned fence visibility. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | The pronoun `Its` attributed current 99-case correction evidence to rejected candidate `ae5195c`. |

GitHub Actions run `29384351025` passed Template Check plus all six Node 22/24 operating-system jobs in 6m25s for exact commit `f990abc59ce5e5f4767893fecf03d1791fe1c8da`. All three findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `0f952d9` implemented exact CommonMark blank syntax, walked container-relative blank state, preserved the exact prefix before the first unmarked quote, and used unambiguous current-state wording. Four paired fixtures expanded the harness to 103 scenarios. The first run reached every intended semantic outcome in 501.6 seconds but exposed an incorrect expected diagnostic; the corrected run passed in 493.8 seconds, and the final exact-tree rerun passed in 487.6 seconds, with 91 expected rejections, 12 expected acceptances, and 30 unchanged executor parity cases. Direct probes and the positive checker also passed; the gate remained open.

## Exact Candidate 0f952d9 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | Confirmed container-relative blank behavior, exact blank syntax, paired fixtures, evidence arithmetic, and unchanged runtime payload. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | Quote stripping rebased a partial tab to column zero, falsely continued a `10. ` list-owned fence, and hid an active retired URL. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | REVISE | Current records inconsistently called the 493.8-second run authoritative after the later 487.6-second exact-tree run. |

GitHub Actions run `29386833535` passed Template Check plus all six Node 22/24 operating-system jobs in 9m19s for exact commit `0f952d9bfb26a8ff702a57ec8c40ba5a92d8a986`; Template Check took 9m16s. Both `REVISE` findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `f779cab` preserved absolute columns through quote and list prefix stripping, rematerialized list-continuation tab surplus at the post-requirement column, and passed that column into nested explicit-container parsing. One partial-tab fixture rejected with the causal retired-URL diagnostic, while the sufficient-tab fixture preserved valid fenced content. All 105 scenarios passed in 483.7 seconds: 92 expected rejections, 13 expected acceptances, and 30 unchanged executor parity cases. Direct probes and the positive checker also passed; the gate remained open.

## Exact Candidate f779cab Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | REVISE | A tab immediately after `>` lost its unconsumed virtual columns, so valid four-column continuation could be exposed and falsely rejected. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | The same whole-tab deletion shortened an opener list marker and could hide an active retired URL behind a fence that should have ended. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Confirmed current and historical timing provenance, 105-case arithmetic, rejected-candidate status, links, bounded claims, and unchanged runtime scope. |

GitHub Actions run `29388623286` passed Template Check plus all six Node 22/24 operating-system jobs in 9m20s for exact commit `f779cabc47a52ad086da9a695610198ebd4771ce`; Template Check took 9m16s. Both `REVISE` findings remain acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `82c3bb1` consumed exactly one virtual quote-padding column, rematerialized the remaining tab-expanded columns, and shared that transformation between explicit-container and continuation parsing. Four direct probes and all 109 scenarios passed in 527.5 seconds: 94 expected rejections, 15 expected acceptances, and 30 unchanged executor parity cases.

## Exact Candidate 82c3bb1 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | Confirmed shared partial-tab handling, opener and continuation parity, four fixtures, 109-case arithmetic, and unchanged runtime payload. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | A space plus tab after `>` supplied valid fence-indentation columns but remained a raw tab for a literal-space matcher, enabling exposed fenced content or hidden post-closer content. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Confirmed rejected-candidate provenance, current-versus-historical timing, links, bounded claims, and unchanged runtime scope. |

GitHub Actions run `29390051639` passed Template Check plus all six Node 22/24 operating-system jobs in 10m21s for exact commit `82c3bb1f681fdf0d7edbbc533376c60510d8c55d`; Template Check took 10m18s. The security `REVISE` remains acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The correction that became candidate `dd575d5` gave fence matching the carried absolute content column and normalized only its final zero-through-three indentation columns. Three direct probes, the positive checker, and all 112 scenarios passed in 554.2 seconds: 96 expected rejections, 16 expected acceptances, and 30 unchanged executor parity cases.

## Exact Candidate dd575d5 Verdicts

| Focus | Reviewer | Verdict | Evidence |
| --- | --- | --- | --- |
| Correctness | `019f618c-b855-7433-9980-8645a82aec9b` | PASS | Confirmed coordinate-aware fence matching, opener and closer parity, three fixtures, 112-case arithmetic, and unchanged runtime payload. |
| Security | `019f618c-cd0c-72c0-adcb-650d3e031af8` | REVISE | A mixed-tab fence inside an ordered-list continuation and block quote bypassed both ambiguity signatures and took the simple parser path. |
| API and docs | `019f618c-e412-7183-9ce8-629ae2c192a5` | PASS | Confirmed exact `82c3bb1` provenance, current evidence, links, bounded claims, open gates, and unchanged runtime scope. |

GitHub Actions run `29391822367` passed Template Check plus all six Node 22/24 operating-system jobs in 9m39s for exact commit `dd575d590be412c3f2e5d20ee6e2161c76142ea3`; Template Check took 9m36s. The security `REVISE` remains acceptance-blocking. No reviewer edited files, ran tests, installed dependencies, or used network.

The current correction recognizes spaces or tabs after every repeated container prefix in the two ambiguity signatures while retaining exact column validation in the rich parser. The positive checker and `npm.cmd run verify` pass. All 115 scenarios pass in 705.2 seconds: 98 expected rejections, 17 expected acceptances, and 30 unchanged executor parity cases. The gate remains open.
