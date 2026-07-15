# Implementation Notes: V10 Bounded Executor Boundary

## Status

Runtime revision remains verified on `9d8907a`. Candidate `d0ef8f9` passed all seven hosted jobs in run `29400365173` in 10m47s, the exact local 119-scenario matrix in 653.0 seconds, and security plus API/documentation review. Correctness returned `REVISE` because one milestone sentence changed three source records that omitted the same owner (`7f30107`) into three owners. The current correction preserves that cardinality and changes no executable surface. V10 is not merged.

## Summary Of Changes

- Added a provider-neutral executeWorkPacket operation for exactly one host-selected WorkPacket and one trusted caller-injected WorkPacketExecutor.
- Added a closed invocation-scoped ExecutionGrant, manifest compatibility checks, executor identity binding, and three-direction permission coverage.
- Added bounded plain-JSON snapshots that reject cycles, accessors, symbols, custom prototypes, invalid numbers, array holes, depth overflow, and node overflow.
- Added deterministic lifecycle journals with fixed actor, grant link, contiguous IDs and sequences, linear causation, immutable snapshots, and whole-journal V9 inspection before return.
- Added honest cooperative cancellation semantics for acknowledged cancellation, timeout, and abort_unconfirmed potentially live work.
- Added fixed failure normalization for executor throws, malformed settlements, and secret-bearing return data without copying raw provider values.
- Added the no-I/O createDeterministicTestExecutor and root-exported public types.
- Added SC4201 through SC4210 and advanced the diagnostic catalog to 1.3.0 without changing the six artifact schemas or event vocabulary.
- Extended the packed-consumer gate to compile the emitted declarations under independent compiler settings, execute one installed packet, and inspect its journal offline.
- Added a deterministic V10 dogfood circuit with a controlled permission failure, corrected grant, caller-owned trace, byte-checked observation, and identity-checked temporary cleanup.
- Updated the README, handbook, framework guide, capability adapters, module registry, practice register, schema contract, and workflow checker to state the exact V10 boundary.

## Deviations From Plan

The intake recommendation considered an opt-in local child-process adapter. Primary-source research showed that pure Node cannot guarantee descendant process termination or cross-platform isolation, so V10 narrowed the executable surface to a caller-injected port plus a no-I/O test implementation. This redesign is preserved in the research snapshot, ADR 0002, and architecture review.

V10 also added an independent packed-declaration compile after the first external host exposed a pre-existing declaration portability defect. The root cause and causal fix are preserved in debug-notes.md and root-cause-analysis.md.

The first postimplementation review returned three `REVISE` verdicts despite a green suite. The integration owner removed the remaining invocation gap, anchored acknowledgment to the abort observation, re-armed early timer wake-ups, rejected proxies before reflection, bounded record keys before descriptors, narrowed the public grant type, repaired installed docs and consumer narrowing, and added focused regressions before preparing the acceptance candidate.

Exact review of `e3453e0` then found a remaining settlement-ownership interval and imprecise no-call documentation. The observer now detaches and normalizes fulfillment before timestamping it, a resolve-then-mutate regression protects that boundary, and active guidance distinguishes no-call terminal certainty from post-invocation, contract-compliant promise settlement acknowledgment.

Subsequent exact candidates exposed progressively wider documentation drift: lifecycle synonyms, an unqualified ADR rule, security-significant grant adjectives, secondary public summaries, and finally missing promise-liveness and grant prerequisites across several surfaces in `b2d73e7`. Later parity candidates exposed contradiction, logical-line, first-table, fenced-content, duplicate-owner, list-container, legacy-heading, raw README, indentation, and line-boundary bypasses. Candidate `ac70efc` promoted an ADR-to-surface matrix, public contract parity practice, and checker fixtures so the same defect could not pass as prose-only consistency.

Candidate `394612d` exposed a fixture-portability deviation: `.gitattributes` supplied LF Markdown while the Windows workflow searched with `[Environment]::NewLine`. Candidate `0c42c64` then exposed the inverse line-boundary error: exact heading patterns rejected CRLF unless they used an explicit optional carriage return, while broad `\s+` crossed logical lines. Both paths now use line-safe LF/CRLF grammar.

The first fence-aware parser rescanned Markdown for every section lookup and caused a 69-scenario run to exceed 360 seconds. A process-local cache and no-fence fast path restored the positive checker to 2.27 seconds while preserving isolated fixtures; two complete 71-case runs finished in 211.2 and 208.2 seconds, four complete 77-case runs finished in 259.2, 258.2, 259.1, and 256.7 seconds, and two complete 84-case runs finished in 279.3 and 303.8 seconds.

Candidate `7f02b87` proved that delimiter-only fence state was still insufficient: valid continuation indentation depends on list-marker width, and a closer must belong to the opener's block-container context. The first causal state parser passed all 88 scenarios but took 626.5 seconds and about 7.2 seconds for the positive checker. An ambiguity gate now routes ordinary top-level fences through the simple path and container-sensitive Markdown through the rich parser; the same 88 scenarios complete in 305.4 seconds and the positive checker in 2.76 seconds.

Candidate `c4bfa01` exposed a second container-state boundary: a failed full-stack continuation can leave an outer list alive, tab expansion can satisfy continuation and relative fence indentation in one character, and a continuation line can place a nested quote or list before the fence. The correction uses normalized indentation columns, surplus rematerialization, longest-prefix preservation, and an expanded ambiguity signature. Direct verification also caught PowerShell array unrolling and a lost regex escape in the first working-tree correction before they reached a candidate.

Candidate `ae5195c` exposed the next container boundary: a whitespace-only line was accepted as fence content before the parser asked whether an owning quote marker remained. CommonMark consecutiveness makes an unmarked blank terminate that quote, while a marked blank remains inside it. The correction preserves only list containers enclosing the first quote and reprocesses the blank through ordinary list logic.

Candidate `f990abc` exposed two remaining blank-state assumptions. A line containing only a surviving outer quote marker can be blank relative to that quote while preserving its list, and U+00A0 is Unicode whitespace but not a CommonMark blank. The correction uses an exact space-or-tab predicate and walks the container stack to retain the prefix before the first unmarked quote. A separate wording correction keeps rejected-candidate evidence distinct from current working-tree evidence.

Candidate `0f952d9` exposed a coordinate-state boundary: quote removal preserved content but reset the physical column, so a partial tab could falsely satisfy a multi-digit ordered-list continuation. The correction that became `f779cab` carried column state through quote and list prefixes, rematerialized list-continuation surplus indentation, and passed the resulting column into nested-container parsing. Timing records label the 103-case runs as historical.

Candidate `f779cab` exposed the remaining delimiter-consumption boundary: a tab immediately after `>` spans several virtual columns, but only one belongs to optional quote padding. The correction centralizes that transformation, consumes one delimiter column, rematerializes the tab surplus, and returns the post-delimiter coordinate to both opener and continuation parsing.

Candidate `82c3bb1` exposed a final matching-boundary split: parser state measured a space-plus-tab prefix as valid zero-through-three fence indentation from its absolute column, but the fence regex still accepted literal spaces only. Candidate `dd575d5` corrected opener and closer matching at that coordinate.

Candidate `dd575d5` then exposed parser-dispatch asymmetry: the rich parser understood the mixed tab indentation, but the fast-path ambiguity signatures missed it after nested list and quote prefixes. Candidate `49b22ba` corrected that explicit-container path and passed hosted CI, but continuation-only mixed space-tab prefixes still bypassed the indented-fence signature. Candidate `7f30107` corrected the dispatch and invariant-gate prose, passed hosted CI plus correctness and security review, then exposed stale event-date provenance in two memory rows. Candidate `57bab44` corrected those dates and passed hosted CI plus security review, then exposed ambiguous ownership of the inherited `7f30107` matrix. Candidate `e5f870e` corrected current-state ownership and passed hosted CI plus correctness review, then exposed three historical source gaps and ambiguous policy-compiler versus execution-adapter terminology. Candidate `d0ef8f9` corrected both and passed exact local plus hosted checks and two semantic reviews, then exposed one milestone sentence that confused three source records with three owners. The current correction preserves one owner and three attribution gaps without changing parser behavior.

## Assumptions Used

- Provider-neutral execution and explicit host authority are the smallest useful V10 increment.
- A trusted embedding host supplies executable code and enforces the actual sandbox, tools, credentials, and workspace.
- The canonical artifact vocabulary remains unchanged because a runtime grant must not become a self-authorizing file.
- A valid API call is not equivalent to successful work; callers branch on ExecutionSummary.disposition.
- After invocation, an unacknowledged abort leaves potentially live work and must not produce false terminal evidence; before invocation, the no-call path may terminate.

## Follow-Up Work

- Evaluate one real provider adapter only after an adapter evaluation and explicit owner approval.
- Design native, container, or hosted isolation before adding a command executor.
- Add scheduling, retries, durable event sinks, resumed input, merge, and memory automation only as separate reviewed versions.
- Decide whether the unstable 0.x library surface is ready for a public package in a later milestone.
- Evaluate a proven Markdown parser or a narrower semantic-check contract in a separate version only if active-Markdown ownership keeps expanding.

## Verification Performed

- V9 baseline on 2b7bef37fb2477e3fc8779171c5971a3db42f20b: canonical verification passed with 209 tests.
- V10 corrected implementation suite: 275 tests passed, including settlement detachment, cancellation races, proxy safety, snapshot bounds, execution lifecycle, and dogfood cleanup coverage.
- V10 dogfood: under-authorized grant rejected with SC4206 and zero calls; corrected grant invoked once; seven-event journal reconstructed as completed.
- Packed consumer: offline install, independent public-declaration compile, initialization, validation, one packet execution, and trace inspection passed.
- The pre-parity workflow checker passed its 43 scenarios: 40 expected rejections and three expected acceptances.
- Fresh `npm.cmd run verify` passes format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the clean offline installed consumer.
- Exact candidate `9d8907a` passed correctness, security, and API/documentation review plus all seven jobs in GitHub Actions run `29357443883`. The first direct-phrase search then found one stale feature-spec sentence. Candidate `2c6dff4` corrected it and passed run `29358105210`, but expanded review found synonymous claims in the plan and practice register. The complete claim-family correction must pass the final exact gate.
- Candidate `dbbeeb1` reconciled that claim family and passed run `29358867851`, but correctness found one unqualified ADR race rule and security found stale ephemeral grant terminology. Both source statements were corrected for the next exact gate.
- Candidate `4c6818d` passed all seven jobs in run `29359564312`; exact review returned correctness `REVISE`, security `PASS`, and API/documentation `REVISE` for per-call grant wording, a missing packaged settlement precondition, and two misplaced practice rows.
- Candidate `b2d73e7` passed all seven jobs in run `29361203381`; all three reviewers returned `REVISE` for cross-surface promise-liveness drift and incomplete packaged grant non-guarantees.
- Candidate `ac70efc` passed all seven jobs in GitHub Actions run `29364033724`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `9209ff1` passed all seven jobs in GitHub Actions run `29366578213`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `PASS`.
- Candidate `b3ff0d3` passed all seven jobs in GitHub Actions run `29370427573`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS`.
- Candidate `394612d` returned correctness `REVISE`, security `REVISE`, and API/documentation `REVISE`. GitHub Actions run `29372879405` passed all six kernel-toolchain jobs but failed Template Check on the host-newline-dependent practice-table fixture.
- Candidate `0c42c64` passed all seven jobs in GitHub Actions run `29375642610`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `7f02b87` passed all seven jobs in GitHub Actions run `29377581706`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `REVISE` for ordered-list continuation and mismatched-container fence ownership.
- Candidate `c4bfa01` passed all seven jobs in GitHub Actions run `29380939276`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `ae5195c` passed all seven jobs in GitHub Actions run `29383056180`; exact review returned correctness `REVISE`, API/documentation `PASS`, and no security verdict within the bounded handoff window.
- Candidate `f990abc` passed all seven jobs in GitHub Actions run `29384351025` in 6m25s; correctness, security, and API/documentation each returned `REVISE`.
- Candidate `0f952d9` passed all seven jobs in GitHub Actions run `29386833535` in 9m19s; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `f779cab` passed all seven jobs in GitHub Actions run `29388623286` in 9m20s; exact review returned API/documentation `PASS` and correctness plus security `REVISE`.
- Candidate `82c3bb1` passed all seven jobs in GitHub Actions run `29390051639` in 10m21s; exact review returned correctness and API/documentation `PASS` plus security `REVISE`.
- Candidate `dd575d5` passed all seven jobs in GitHub Actions run `29391822367` in 9m39s; exact review returned correctness and API/documentation `PASS` plus security `REVISE`.
- Candidate `49b22ba` passed all seven jobs in GitHub Actions run `29393468684` in 11m56s; exact review returned correctness, security, and API/documentation `REVISE`.
- Candidate `7f30107` passed all seven jobs in GitHub Actions run `29395470172` in 11m39s; exact review returned correctness and security `PASS` plus API/documentation `REVISE`. Template Check took 11m34s.
- Candidate `57bab44` passed all seven jobs in GitHub Actions run `29396782369` in 11m35s; exact review returned security `PASS` plus correctness and API/documentation `REVISE`. Template Check took 11m30s.
- Candidate `e5f870e` passed all seven jobs in GitHub Actions run `29398170073` in 12m29s; exact review returned correctness `PASS` plus security and API/documentation `REVISE`. Template Check took 12m25s.
- Candidate `d0ef8f9` passed all seven jobs in GitHub Actions run `29400365173` in 10m47s; exact review returned correctness `REVISE` plus security and API/documentation `PASS`. Template Check took 10m44s.
- Candidate `7f30107` owns its local Windows 119-scenario matrix in 576.2 seconds. Candidate `d0ef8f9` owns a separate exact local 119-scenario matrix in 653.0 seconds and its exact hosted Template Check in 10m44s, but semantic review rejected it. Exact-commit review and all seven hosted jobs remain for a successor.

## Durable Learnings

- A process API is not a sandbox, and a sent termination signal is not proof that a process tree stopped.
- Runtime authority must be supplied by the host and checked through invocation-scoped identity binding; an artifact can only request or limit authority. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Permission safety needs all three predicates: requested authority is granted, granted authority was requested, and granted authority fits the packet ceiling.
- Public declarations need an independent installed consumer because source typechecking under repository settings is not sufficient.
- Cancellation evidence must describe what the host observed, including uncertainty, rather than what it hoped happened.
- Timeout and acknowledgment bounds must be anchored to monotonic observations, defend against early timer wake-ups, and be checked at the actual invocation boundary.
- Reject proxies before reflection and bound key counts before descriptor traversal; revoked-proxy tests alone do not prove live traps stay dormant.
- Active Markdown must be the shared structural representation, including list-contained fences and exact unique heading owners; raw source is appropriate only for intentional code-example checks.
- Regression fixtures must model tracked source newlines rather than the host newline convention and should prove both LF and CRLF when portability is part of the contract.
- Active Markdown owns public prose, navigation, headings, and semantic guards; raw source is reserved for intentional literal command examples and command-claim checks.
- Line-oriented Markdown grammar must use horizontal whitespace, explicit carriage-return handling, and bounded indentation rather than broad whitespace classes.
- Fence ownership must preserve normalized block-container state; ordered-list continuation indentation derives from the complete marker, and only a matching container may close the fence.
- Performance fast paths need equivalent rejection and preservation fixtures so optimization cannot weaken the richer parser's ownership guarantees.
- Container termination is partial state loss: preserve the longest matching outer list prefix before reprocessing the line.
- Normalize indentation into columns and rematerialize tab surplus so one tab can supply continuation plus permitted relative fence indentation.
- PowerShell array expressions can unroll one-element state; assign branch arrays directly and verify `.Count`-sensitive state with causal probes.
- Blank lines are container transitions, not universally literal fence content: an unmarked blank ends quote ownership, while a quote-marked blank preserves it.
- CommonMark blank syntax is exact: empty, spaces, or tabs. Broad Unicode whitespace predicates are not interchangeable with grammar-specific blank rules.
- Container-relative blanks require prefix state, not just raw-line classification; preserve the matched quote/list prefix and end ownership at the first unmarked quote.
- Coordinate-sensitive grammars need both remaining text and its physical column; stripping a prefix must not reset tab stops.
- A multi-column source character can be consumed partially by a delimiter; preserve and rematerialize its unconsumed virtual columns rather than deleting the whole character.
- Normalize permitted fence indentation at the final matcher using the carried absolute column; raw-character regexes cannot recover tab-expanded grammar state.
- An ambiguity gate must conservatively route every syntax class the rich parser owns; it should detect possibility while the parser retains exact acceptance rules.
- Dispatch probes must include continuation-only mixed horizontal whitespace, not only explicit nested-container prefixes.
- Acceptance-state records should name invariant gates rather than candidate-creation actions that become false when committed.
- Review-event dates must come from the event-owning Git or hosted timestamp, not a session-start date that may survive a midnight boundary.
- Verification evidence must name the exact candidate it exercised; inherited results remain useful only when labeled and separated from current-tree checks.
- Evidence summaries must preserve both entity type and cardinality: three source records missing one owner are not three owners.
- The product target is portable orchestration policy with execution-adapter effects: SWECircuit decomposes, matches capabilities, coordinates parallel work, joins, verifies, and traces; optional policy compilers emit those contracts; IDE, model, and provider execution adapters perform assigned packets and side effects.
- Keep the checker bounded and dependency-free for V10; full parser conformance or replacement is a separate architecture decision.
