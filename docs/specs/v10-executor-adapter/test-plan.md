# Test Plan: V10 Bounded Executor Boundary

## Status

Acceptance-candidate verification active.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Valid execution test, installed-package execution, and file-backed `inspectTrace` reconstruction |
| AC2 | Table-driven artifact, manifest, identity, grant, policy, proxy, and signal rejection with zero-call assertions |
| AC3 | Missing, extra, broad, narrow, and ceiling-exceeding permission tests |
| AC4 | Completed, declared-failed, thrown, rejected, malformed, revoked, and secret-bearing settlement tests |
| AC5 | Pre-abort, expired packet, acknowledged caller cancellation, acknowledged timeout, absolute-deadline, and first-observation tests |
| AC6 | Grace-expiry, late-rejection, and settlement-beyond-acknowledgment tests proving non-terminal `abort_unconfirmed` journals |
| AC7 | Full V9 regression suite, offline dogfood, package dry run, and clean installed consumer |
| AC8 | Feature package, research, ADR, review records, dogfood evidence, memory links, and V10 milestone |

## Automated Checks

- Preflight: valid artifacts, exact kinds, manifest capabilities, matching identities, closed grants, all three permission directions, policy bounds, and zero invocation on rejection.
- Snapshots: nulls, cycles, accessors, input mutation detachment, fulfillment resolve-then-mutate detachment, sparse arrays, dense oversized objects, excessive depth, revoked proxies, live proxy traps, forged signals, and revoked signal proxies.
- Lifecycle: completion, declared failure, throw, malformed settlement, pre-start cancellation, pre-start expiry, acknowledged caller cancellation, acknowledged timeout, unconfirmed abort, completion at or after deadline, early timer re-arming, final pre-call deadline crossing, and caller-versus-deadline precedence.
- Privacy: return-bound identity canaries, thrown-value suppression, unknown-field suppression, and secret-bearing evidence rejection.
- Journal: deterministic IDs, contiguous sequence, grant link, causation, immutability, internal V9 inspection for every returned summary, and file-backed inspection for a completed execution.
- Package: offline tarball installation, package-file allowlist, independent declaration compilation, class-based executor implementation, real result narrowing, installed execution, and installed trace inspection.
- Dogfood: one controlled `SC4206` grant failure with zero calls, one corrected invocation, a seven-event caller-owned trace, byte-checked evidence, and identity-checked cleanup.

## Manual Checks

- Confirm the public guide makes host-owned sandboxing, approvals, persistence, scheduling, retry, merge, and memory responsibilities explicit.
- Confirm the API never claims that an abort signal proves work stopped.
- Confirm the six canonical artifact kinds and V9 CLI remain unchanged.
- Confirm package documentation links resolve from the installed artifact.

## Regression Coverage

- The V9 initialization, project-validation, schema, path, privacy, CLI, trace-inspection, quick-start, and dogfood suites remain part of `npm.cmd run verify`.
- Every preflight rejection tested against a counting executor must leave the count at zero.
- A deadline wake-up observed early must re-arm rather than cancel work.
- A deadline reached at the final invocation boundary must produce the no-call queued-to-cancelled journal.
- A settlement observed at or beyond the acknowledgment bound must remain `abort_unconfirmed`.
- A live proxy must be rejected before its reflection traps execute.
- A packed TypeScript consumer must compile and narrow the root-exported contract under independent compiler settings.
- A fulfilled settlement must be normalized and detached before a later microtask can mutate the provider-owned source object.
- Markdown ownership must reject top-level and list-contained fenced contracts, duplicate exact owners, and required headings hidden in inactive content.
- The practice-table fixture must locate the same contiguous table in LF and CRLF source.
- README capability and boundary prose, repository identity, navigation, and semantic guards must be active, while literal command examples remain valid inside fences.
- Split-line README/debug/RCA headings must fail, an unmatched four-space fence literal must not hide later active content, and inactive fenced semantic examples must not trigger overclaim rejection.
- A multi-digit ordered-list continuation opener and closer must keep fenced contract prose inactive and later active prose visible.
- A closer in an unrelated list or quote container must not terminate a top-level fence, while a matching top-level closer must preserve later active prose.
- Ending a list container while its nested fence remains open must end that nested ownership and reprocess the outer line.
- Equivalent rejection and preservation fixtures must exercise the ambiguity-gated simple and rich parser paths.
- Inner quote or list termination must preserve an outer list and expose active prose after a subsequent outer-list fence ends.
- Indented quote/list container prefixes before a fence must route the document to rich parsing.
- A tab may satisfy continuation columns plus up to three relative fence-indent columns; opener, content, closer, and later active prose must remain correctly owned.
- Retired repository URLs inside fenced historical examples must remain inactive while active retired URLs fail.
- An unmarked blank must end a quote-owned fence and expose a subsequent active quote.
- The same transition inside an outer list must retain only that enclosing list state.
- A quote-marked blank must remain inside the original quote-owned fence.

- A line blank relative to an outer quote must preserve its outer list while ending the first unmarked inner quote.
- A fully marked nested blank must preserve the complete fence ownership.
- U+00A0 on its own line must not count as a CommonMark blank and must end list-owned fence continuation.
- U+00A0 with valid list continuation indentation must remain ordinary fenced content.
- A partial tab after a quote prefix must not satisfy more ordered-list continuation columns than it physically spans.
- Sufficient tab-expanded indentation after a quote prefix must remain valid fenced content.
- A tab used as optional padding immediately after `>` must consume one virtual delimiter column and preserve its surplus while parsing a nested opener.
- The same partial-tab rule must preserve rejection and acceptance thresholds while parsing quote-contained continuation lines.
- A space-plus-tab prefix after `>` that expands to at most three fence-indentation columns must preserve a fenced retired URL.
- Required capability prose owned only by that mixed-indentation fence must remain inactive.
- A mixed-indentation closer must end its fence and expose a later active retired URL.
- Mixed tab indentation after nested ordered-list and block-quote prefixes must route to rich parsing.
- A nested tilde fence must keep its retired URL inactive.
- A nested backtick fence must keep fenced-only required prose inactive, and its closer must expose later active prose.
- A one-space-tab list-continuation fence must keep a retired URL inactive.
- A two-space-tab list-continuation fence must keep fenced-only required capability prose inactive.
- A mixed-indentation list-continuation closer must expose a later active retired URL.
- An over-limit mixed-indentation pseudo-fence must remain literal, proving conservative dispatch does not broaden rich-parser acceptance.

## Skipped Checks

No live provider, network, shell, process tree, container, remote protocol, destructive workspace, scheduler, retry, merge, or automatic memory mutation is exercised because V10 implements none of those capabilities.

## Verification Evidence

- Baseline `2b7bef37fb2477e3fc8779171c5971a3db42f20b`: `npm.cmd run verify` passed with 209 tests; both workflow checkers passed with 42 negative scenarios.
- Current ambiguity-gate correction: `npm.cmd run verify` passed in 16.8 seconds with 275 tests, deterministic V10 dogfood, dry-run package inspection, and the clean offline installed consumer.
- Pre-parity working-tree evidence passed the positive checker and its 43-scenario harness: 40 expected rejections and three expected acceptances. Later parity fixtures supersede that count.
- Independent postimplementation review first returned three `REVISE` verdicts. Candidate `e3453e0` then returned `REVISE / PASS / REVISE` despite green CI. Candidate `9d8907a` returned three `PASS` verdicts and passed all seven jobs in run `29357443883`.
- The first pre-closeout phrase search found one stale no-call requirement in the feature spec. `2c6dff4` then returned `PASS / REVISE / REVISE`; `dbbeeb1` returned `REVISE / REVISE / PASS` for one ADR race rule and stale ephemeral terminology.
- Candidate `4c6818d` passed run `29359564312` but returned `REVISE / PASS / REVISE` for per-call grant wording, a missing packaged executor-promise precondition, and two practice rows outside the register table. Its corrected working tree passed `npm.cmd run verify` with 275 tests and all 43 pre-parity checker scenarios.
- Candidate `b2d73e7` passed all seven jobs in run `29361203381`, but exact review returned `REVISE / REVISE / REVISE` for cross-surface promise-liveness drift and incomplete packaged grant non-guarantees.
- Candidate `ac70efc` passed all seven jobs in run `29364033724`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE` for presence-only parity checks and candidate-dependent status prose.
- Candidate `9209ff1` passed all seven jobs in run `29366578213`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `PASS` for logical-line, scope-ownership, contiguous-table, and diagnostic-provenance gaps.
- Candidate `b3ff0d3` passed all seven jobs in run `29370427573`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS` for fenced-content and duplicate-owner gaps.
- Candidate `394612d` returned `REVISE / REVISE / REVISE` for list-contained fences, legacy raw structural checks, presence-only required headings, and overstated docs. Run `29372879405` passed all six kernel-toolchain jobs but failed Template Check because its fixture assumed host-native newlines.
- Candidate `0c42c64` passed all seven jobs in run `29375642610` but returned `REVISE / REVISE / REVISE` for raw README semantics, permissive indentation, newline-crossing heading patterns, and self-staling status prose.
- Candidate `7f02b87` passed all seven jobs in run `29377581706` but returned `REVISE / REVISE / REVISE` for container-insensitive fence closure and multi-digit ordered-list continuation.
- Candidate `c4bfa01` passed all seven jobs in run `29380939276` but returned `REVISE / REVISE / REVISE` for surviving outer-container loss, indented nested-container ambiguity, tab continuation, one raw README guard, and self-staling next-action prose.
- Candidate `ae5195c` passed all seven jobs in run `29383056180`; exact review returned correctness `REVISE`, API/documentation `PASS`, and no security verdict within the bounded handoff window.
- Candidate `f990abc` passed all seven jobs in run `29384351025` in 6m25s; exact review returned `REVISE / REVISE / REVISE` for container-relative blank state, Unicode whitespace, and evidence attribution.
- Candidate `0f952d9` passed all seven jobs in run `29386833535` in 9m19s; exact review returned `PASS / REVISE / REVISE` for correctness, absolute-column security, and timing provenance.
- Candidate `f779cab` passed all seven jobs in run `29388623286` in 9m20s; exact review returned `REVISE / REVISE / PASS` for correctness, security, and API/documentation because quote-padding tabs lost unconsumed virtual columns.
- Candidate `82c3bb1` passed all seven jobs in run `29390051639` in 10m21s; exact review returned `PASS / REVISE / PASS` for correctness, security, and API/documentation because mixed space-plus-tab fence indentation remained raw at the matcher.
- Candidate `dd575d5` passed all seven jobs in run `29391822367` in 9m39s; exact review returned `PASS / REVISE / PASS` because the fast-path ambiguity gate missed the same syntax inside nested list and quote containers.
- Candidate `49b22ba` passed all seven jobs in run `29393468684` in 11m56s; exact review returned `REVISE / REVISE / REVISE` for continuation-only mixed-indentation dispatch and self-staling next-action prose.
- Rejected `82c3bb1` used 109 scenarios in 527.5 seconds, rejected `dd575d5` used 112 scenarios in 554.2 seconds, and rejected `49b22ba` used 115 scenarios in 705.2 seconds. The current 119-scenario matrix passed in 576.2 seconds: 100 expected rejections and 19 expected acceptances. Thirty executor parity cases remain unchanged. Exact-commit review and all seven hosted jobs remain.
