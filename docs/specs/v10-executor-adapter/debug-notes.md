# Debug Notes: V10 Bounded Executor Boundary

## Status

Exact candidate `ae5195c` passed all seven hosted jobs and API/documentation review, but correctness returned `REVISE` for a blank-separated blockquote fence bypass; security produced no verdict within the bounded handoff window. The causal correction passes direct probes, the positive checker, and all 99 scenarios in 440.7 seconds. V10 is not merged.

## Failure Summary

The first external TypeScript host could not consume the packed package because five optional fields in **dist/model.d.ts** violated the inherited **JsonObject** string index signature under consumer compiler defaults.

## Reproduction

    npm.cmd run consumer:check

The isolated host failed with TS2411 for RunEventAttempt.retryOf, deadline, and terminalCode, plus RunEventEvidenceReference.digest and immutable.

## Stable Evidence

- The repository's own typecheck passed.
- The strict external host compiled against the installed tarball and failed in **node_modules/swecircuit/dist/model.d.ts**.
- The error affected only declarations emitted from interfaces that extended JsonObject while declaring optional fields.
- After changing those records to established JsonObject intersection aliases, the external declaration compile passed.
- The subsequent runtime check reached schema validation, proving the declaration blocker was removed.

## Failure Classification

Public type-contract and package-integration defect.

## Context Retrieved

- **src/model.ts**
- Emitted **dist/model.d.ts**
- Root **tsconfig.json**
- **scripts/check-packed-consumer.mjs**
- Existing JsonObject intersection patterns

## Hypotheses

1. The external host lacked a required package declaration.
2. Consumer compiler settings exposed an optional-property/index-signature incompatibility hidden by source compilation.
3. The new execution declarations introduced the incompatibility.

Hypothesis 2 was confirmed. The affected records predated V10, but V10's first independent declaration consumer exposed them.

## Experiments

1. Compiled a strict TypeScript host against the installed tarball: reproduced TS2411.
2. Inspected source and emitted declarations: isolated the failures to two interfaces extending JsonObject.
3. Converted only those declarations to intersection aliases: internal typecheck remained green and the external declaration compile passed.
4. Executed the packed runtime path: it then rejected an empty required context fixture, which was corrected without weakening the schema.
5. Reran the full packed-consumer path: public types, initialization, validation, execution, and trace inspection passed.

## Current Status

The root cause is confirmed and the causal fix is covered by the packed-consumer gate.

## Next Action

Retain independent declaration compilation and installed-runtime execution in the canonical package verification path.

## Postimplementation Review Debug Record

### Failure Summary

The first implementation re-review found four timing and reflection defects plus public-contract and packaging drift. None escaped as raw exceptions, but the timing defects could misclassify cancellation or invoke work after the intended boundary.

### Reproduction

Use the injected monotonic clock and controlled timers in `test/execution.test.mjs` to move time at the final gate, fire a timer early, or cross the acknowledgment bound inside an abort listener. Use dense objects and live proxies to challenge traversal before invocation.

### Stable Evidence

All three reviewer handoffs returned `REVISE`; the initial hardened suite passed 267 tests, and the causal revision passes 274 tests plus the canonical gate. The deterministic dogfood trace digest remains unchanged because the successful event contract did not change.

### Failure Classification

Lifecycle linearization, bounded-reflection, and public integration defects.

### Context Retrieved

- `src/execution.ts`
- `src/snapshot.ts`
- `test/execution.test.mjs`
- ADR 0002 and the executor guide
- Packed consumer fixture and package allowlist
- Diagnostic catalog and module registry

### Hypotheses

1. The remaining failures were documentation-only.
2. Timer completion was being treated as time observation, and acknowledgment was relative to processing rather than abort.
3. Revoked-proxy handling was sufficient to prevent all proxy traps.
4. Untracked candidate files would become visible automatically to a commit-bound reviewer.

Hypotheses 2 and 4 were confirmed; hypothesis 3 was disproved by code inspection. Documentation drift was real but not the only issue.

### Experiments

1. Added a clock crossing between the old final read and invocation: reproduced the no-call gap.
2. Fired the deadline timer at half the timeout: reproduced premature deadline observation before re-arming was added.
3. Advanced time inside internal abort handling: reproduced late settlement being treated as acknowledged.
4. Added live proxy trap counters and dense records: verified trap-free rejection and pre-descriptor bounds after the fix.
5. Ran 274 tests and the canonical verify command: all passed.

### Current Status

Causal fixes are complete. Exact committed-candidate re-review remains the independent acceptance gate.

### Next Action

Freeze every new and modified V10 file in one candidate commit, push it, run exact-candidate checks and CI, and request explicit reviewer verdicts before the evidence-only closeout.

## Exact-Candidate Settlement Observation Debug Record

### Failure Summary

Exact review of commit `e3453e0` found that the fulfillment observer recorded a timestamp but retained the executor-owned raw result until the async continuation normalized it. A queued mutation could therefore change accepted content after the recorded observation. The API and documentation review also found that three active guides described proven no-call cancellation as if an executor had settled.

### Reproduction

Resolve an executor promise with a valid completed object, then queue a microtask that mutates the same object to a valid failed settlement. Before the fix, the promise observer retained the object, the mutation ran, and the later continuation normalized the mutated state under the earlier fulfillment timestamp.

### Stable Evidence

- Correctness reviewer `019f618c-b855-7433-9980-8645a82aec9b` returned `REVISE` on `e3453e0` with the observer-to-normalizer mutation interval.
- Security reviewer `019f618c-cd0c-72c0-adcb-650d3e031af8` returned `PASS` on `e3453e0`.
- API/documentation reviewer `019f618c-e412-7183-9ce8-629ae2c192a5` returned `REVISE` on `e3453e0` for no-call acknowledgment wording.
- GitHub Actions run `29355583567` passed all seven jobs for `e3453e0`; independent review still correctly blocked acceptance.

### Failure Classification

Settlement ownership and documentation-semantics defects.

### Confirmed Cause

The adapter token carried a raw unknown value instead of a detached normalized settlement. Documentation compressed two distinct terminal proofs into one sentence: no executor call occurred, or invoked work settled within the acknowledgment bound.

### Causal Fix

Normalize and detach synchronously in the fulfillment observer, timestamp only after that bounded normalization, and carry `NormalizedSettlement | null` in the adapter token. Clarify that `cancellationAcknowledged: true` means terminal certainty: either no call occurred or the invoked executor promise settled inside the window after all activity capable of advancing the invocation or producing invocation effects had stopped; transfer of live work is not acknowledgment.

### Regression

`test/execution.test.mjs` now resolves a completed settlement, queues a valid failed-state mutation, and proves the returned disposition, workflow, and evidence retain the observed completed snapshot.

### Next Action

Run the full canonical and workflow gates. On the exact complete commit, require three exact-commit verdicts and all seven hosted jobs; if either gate fails, diagnose and repeat from the corrected commit.

## Closeout Contract-Surface Audit

### Trigger

After candidate `9d8907a` received three `PASS` verdicts and seven green hosted jobs, the integration owner ran a repository-wide semantic search before checking AC8.

### Evidence

`docs/specs/v10-executor-adapter/spec.md` still said terminal cancellation or timeout always required executor settlement acknowledgment. At that audit point the direct no-call distinction had been corrected in the ADR, handbook, framework guide, schema guide, research snapshot, and memory pattern, but synonymous statements in the plan and practice register had not yet been searched and remained stale; the later `b2d73e7` review separately exposed missing promise-liveness prerequisites.

### Confirmed Cause

The API/documentation prompt named the active guides and review records but did not explicitly include the feature spec. The causal correction list in `review.md` likewise omitted it, and the exact reviewer reasonably returned a verdict within the named surface.

### Fix

Correct the normative requirement, add the feature spec to the resolved finding, preserve the `9d8907a` verdicts without broadening their scope, and freeze a final docs-only candidate for exact review and CI.

### Durable Learning

Before closing a cross-document contract change, search the complete repository for the old semantic claim. An explicit file list is useful for focus but cannot substitute for a whole-contract consistency query.

## Expanded Claim-Family Audit

### Trigger

Exact review of docs-only commit `2c6dff4` returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE` while GitHub Actions run `29358105210` passed all seven jobs.

### Evidence

- `docs/research/practice-register.md` said terminal abort required executor settlement without a no-call exception.
- `docs/specs/v10-executor-adapter/plan.md` said to terminalize only after adapter settlement.
- Nearby capability-adapter, architecture-review, implementation-note, and ADR alternative wording was accurate in context but still broad enough to invite the same misreading.

### Confirmed Cause

The first repository search targeted direct terminal and acknowledgment phrases. It did not search semantic synonyms such as terminalize, termination, in-flight abort, or adapter settlement, and its completion records incorrectly called that narrower query whole-contract.

### Causal Fix

Correct all active normative variants, qualify every settlement rule as post-invocation, explicitly retain the no-call terminal path, and update review, debug, history, milestone, and memory records so the prior search is described as the first closeout search rather than complete coverage.

### Verification Rule

The final consistency query must combine abort, cancellation, timeout, deadline, terminal, terminalize, termination, acknowledgment, settle, settlement, no-call, and before-invocation terms across all tracked docs and schemas.

## Broad Semantic And Authority-Term Review

### Trigger

Exact review of `dbbeeb1` returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS` while GitHub Actions run `29358867851` passed all seven jobs.

### Evidence

- ADR 0002 race rule 6 said every abort winner waits for bounded acknowledgment, while the runtime returns immediately on the terminal pre-invocation no-call path.
- The research decision table called the grant ephemeral, while ADR 0002 and the architecture review explicitly disclaim freshness, single use, replay prevention, authentication, and revocation proof.

### Classification

One remaining lifecycle-scope defect and one security-significant terminology defect.

### Causal Fix

Split ADR rule 6 at the invocation boundary. Rename the research decision to invocation-scoped and state that it does not claim freshness, single use, or replay prevention.

### Verification Expansion

The final search must cover lifecycle verbs and security-significant authority adjectives, including ephemeral, single-use, freshness, replay, authenticated, enforced, sandboxed, isolated, and revoked, then reconcile every active claim with explicit kernel guarantees.

## Exact Candidate Public-Contract Parity Review

### Trigger

Exact review of `4c6818d3fa8faaf02f46fcc32b2e2ed1242a7308` returned correctness `REVISE`, security `PASS`, and API/documentation `REVISE` while GitHub Actions run `29359564312` passed all seven jobs.

### Evidence

- `schemas/v1alpha1/README.md` said a grant bound identities and permissions to one call, and implementation notes said authority was bound to one invocation, despite the accepted stateless no-replay guarantee.
- The installed executor guide described terminal certainty through settlement but omitted the requirement that the executor promise remain pending until all invocation-affecting activity stops; transferring live work is not acknowledgment.
- Two accepted V10 practices were appended below `## Rejection Criteria`, so Markdown rendered them outside the Current Practices table.

### Classification

Public-contract guarantee drift and Markdown structural placement defect.

### Confirmed Cause

The prior audit covered lifecycle claim families and security adjectives but did not compare every consumer-facing summary with all ADR preconditions or inspect the register's heading boundaries. `invocation-bound` compressed identity matching into apparent single use, the packaged summary omitted the executor-promise liveness condition, and append-only maintenance placed rows after the table.

### Causal Fix

Describe grants as invocation-scoped identity and permission assertions, state that the stateless kernel does not consume grants or prevent reuse or replay, carry the full promise-liveness rule into the packaged guide, and move both accepted practices into the Current Practices table.

### Verification Expansion

Search `one call`, `one invocation`, `invocation-bound`, `single-use`, `reuse`, and `replay`; compare packaged terminal semantics with ADR 0002; assert both accepted rows precede Promotion Criteria; then rerun both workflow checkers, exact review, and hosted CI.

## Exact Candidate Cross-Surface Settlement Review

### Trigger

Exact review of `b2d73e7232271f13c31fa8a188d1631fced3b55e` returned `REVISE` from correctness, security, and API/documentation while GitHub Actions run `29361203381` passed all six Node 22/24 operating-system jobs plus Template Check.

### Evidence

- The schema guide described timely settlement as sufficient for terminal `cancelled` and `timed_out` results without carrying ADR 0002 promise-liveness into that public section.
- The handbook, practice register, and durable pattern repeated settlement shorthand without the full stopped-activity prerequisite.
- The packaged executor guide used `invocation-scoped` without a standalone statement that the kernel does not authenticate the issuer, prove freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- The checker passed because it validated file and heading structure but did not map these security- and lifecycle-significant ADR claims to every public summary.

### Classification

Cross-surface prerequisite loss and missing executable contract parity.

### Confirmed Cause

Each prior correction followed the latest named files or search vocabulary. No explicit ADR-to-public-surface matrix defined where the two high-risk guarantees had to appear, and no isolated checker fixture proved that removing a prerequisite from a secondary summary failed the gate.

### Causal Fix

Use contract-compliant acknowledgment in terminal-state summaries; require promise settlement to remain pending until all activity capable of advancing the invocation or producing invocation effects has stopped; state that transfer of live work is not acknowledgment; and carry complete grant non-guarantees into every checked public surface. Promote public contract parity as an accepted practice and durable pattern.

### ADR-To-Surface Matrix

| Claim | Normative Source | Checked Surfaces | Executable Evidence |
| --- | --- | --- | --- |
| Post-invocation terminal certainty requires stopped invocation-affecting activity; live-work transfer is not acknowledgment. | ADR 0002, Timeout, Deadline, And Cancellation | Executor guide, schema guide, handbook, capability adapters, practice register, memory pattern, V10 spec, V10 plan, active context | `executorLivenessSurfaces` plus executor-guide, schema-guide, and handbook removal fixtures |
| Invocation-scoped grant data is not issuer authentication, freshness, single use, enforcement, revocation, consumption, or replay prevention. | ADR 0002, Invocation-Scoped Execution Grant | Executor guide, schema guide, handbook, capability adapters, practice register, memory pattern, V10 spec, V10 plan, active context | `grantGuaranteeSurfaces` plus packaged-guide and schema-guide removal fixtures |
| Accepted V10 practices remain rows in the Current Practices table. | Practice register governance | Current Practices table before Promotion Criteria | Required columns and rows plus an outside-table fixture |

### Regression

Candidate `ac70efc6cdfc9d6d07e51db1a4203c6a15b7026c` passed the positive checker and 49 isolated scenarios: 46 expected rejections and three expected acceptances. Its six parity cases covered three liveness removals, two grant-summary removals, and register placement. Fresh `npm.cmd run verify` also passed format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the clean offline consumer before exact review reopened the gate.

## Exact Candidate Contradiction And Acceptance-State Review

### Trigger

Exact review of `ac70efc6cdfc9d6d07e51db1a4203c6a15b7026c` returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE` while GitHub Actions run `29364033724` passed all six Node 22/24 operating-system jobs plus Template Check.

### Evidence

- Correctness confirmed that the runtime and nine lifecycle plus nine grant surfaces matched ADR 0002.
- Security showed that a required canonical sentence could remain somewhere in a broad section while the intended contract paragraph became incomplete or a contradictory positive claim was added nearby.
- API/documentation found five current status records that still said another candidate had to be created, so those records became stale as soon as `ac70efc` was the immutable candidate under review.

### Classification

Checker false-negative risk and acceptance-state trace drift.

### Confirmed Cause

The parity checker verified required terms anywhere in each broad Markdown section but did not identify the one active paragraph or table row that carried the contract, and it did not reject known opposite positive claims. Status prose described the mechanics of producing a candidate instead of the invariant review and CI gate.

### Causal Fix

- Bind every lifecycle and grant invariant to exactly one intended line with `Test-SectionLineContains`.
- Scan every checked active section for three lifecycle and eight grant contradiction classes with `Test-SectionRejectsPatterns`.
- Add 13 fixtures that preserve required prose while injecting contradictions or relocating it away from the intended line.
- Describe current state as awaiting exact-commit review and hosted CI, without requiring an unnamed future commit.

### Regression

The positive checker passes. The isolated harness passes 62 scenarios: 59 expected rejections and three expected acceptances. Nineteen parity cases cover three liveness removals, two grant removals, one register-placement defect, three lifecycle contradictions, eight grant contradictions, and two within-section relocations. The executable runtime remains unchanged by this correction.

### Durable Learning

Presence is not parity. A high-risk public contract needs a structural locator for the active claim, explicit rejection of known contradictory claims, and status language that remains true before and after an immutable candidate is created.

## Exact Candidate Logical Markdown Ownership Review

### Trigger

Exact review of `9209ff16b9c0a77ca174eb88027676a9c91147e3` returned correctness `PASS`, security `REVISE`, and API/documentation `PASS` while GitHub Actions run `29366578213` passed all six Node 22/24 operating-system jobs plus Template Check.

### Evidence

- Correctness confirmed all 18 contract locators, 13 preserving or relocation fixtures, the 62-scenario arithmetic, and the unchanged V10 runtime.
- API/documentation confirmed the acceptance-gate wording, prior-candidate provenance, links, and evidence counts.
- Security demonstrated that physical-line patterns could miss soft-wrapped claims or synonyms such as `confirms`, while broad lexical forms could reject truthful negatives such as `The kernel never authenticates the issuer`.
- Security also showed that a line anywhere under a broad section did not prove exact subsection ownership, a table-like row after the first table could satisfy presence checks, and exit-only fixtures did not prove which rule caused rejection.

### Classification

Logical-Markdown parsing gap, active-owner ambiguity, and regression-provenance gap.

### Confirmed Cause

The checker modeled Markdown as physical lines and broad heading slices. That representation did not match the logical paragraphs, nested heading ownership, or contiguous table structure that humans and renderers treat as the active contract. The harness observed only process success or failure, so an unrelated rule could make a negative fixture appear effective.

### Causal Fix

- Scope paragraph contracts to exact `##` sections and, where required, exact `###` subsections.
- Parse non-code Markdown into normalized logical statements so soft wrapping does not alter contradiction detection.
- Locate practices by exact key in the first contiguous table under Current Practices.
- Require every parity rejection fixture to include its intended `Contract locator`, `Contract table row`, or `Contract contradiction` diagnostic.
- Preserve a truthful-negative acceptance fixture and treat finite lexical contradiction rules as defense in depth rather than proof of arbitrary semantic consistency.

### Regression

The positive checker passes. The isolated harness passes 67 scenarios: 63 expected rejections and four expected acceptances. Twenty-four parity cases now cover missing terms, relocations, logical soft wraps, synonyms, grant adjectives, first-table ownership, truthful negatives, and expected diagnostic provenance. The executable runtime remains unchanged.

### Durable Learning

Validate the rendered ownership model, not merely nearby bytes. Structural locators establish where a claim belongs; logical-statement checks catch bounded contradiction families; diagnostic-bound fixtures prove the intended rule fired; independent semantic review remains the acceptance backstop.

## Exact Candidate Active Markdown Ownership Review

### Trigger

Exact review of `b3ff0d3bd630ae2063d504f85184e34fd26c7a8a` returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS` while GitHub Actions run `29370427573` passed all six Node 22/24 operating-system jobs plus Template Check.

### Evidence

- Correctness and security independently showed that canonical lines or a complete table inside fenced code could satisfy raw structural locators even though the content was not active prose or a rendered table.
- Correctness additionally showed that duplicate exact `##` or `###` owners were silently reduced to the first match, allowing a contradictory later owner to escape inspection.
- API/documentation confirmed the prior provenance, 67-scenario arithmetic, links, current gate wording, and unchanged 275-test runtime.
- The executable runtime, schemas, package metadata, and runtime tests remained unchanged from `9d8907a`.

### Classification

Inactive-Markdown ownership bypass and duplicate-owner ambiguity.

### Confirmed Cause

`Get-MarkdownStatements` excluded backtick fences, but section, subsection, line, and table ownership still operated on raw Markdown. The heading parser also used first-match semantics instead of requiring one unambiguous owner.

### Causal Fix

- Strip both backtick and tilde fenced blocks before section or subsection discovery so every downstream locator receives the same active-content view.
- Require each exact `##` section and exact `###` subsection owner to resolve exactly once.
- Add diagnostic-bound fixtures for a fenced grant paragraph, a fenced Current Practices table, a duplicate contract section, and a duplicate handbook subsection.
- Cache fence-stripped text within each checker process and bypass scanning when no fence opener exists.

### Regression

PowerShell syntax and the positive checker pass. The final isolated harness passes 71 scenarios: 67 expected rejections and four expected acceptances. Twenty-eight parity cases now include fenced paragraph and table rejection plus duplicate section and subsection ownership. Two complete runs finished in 211.2 and 208.2 seconds; the executable runtime remains unchanged.

### Durable Learning

A Markdown contract owner must be active, unique, and structurally exact. Ignoring code only during semantic scanning is insufficient when ownership locators still inspect raw source.

## Checker Harness Performance Observation

### Evidence

The prior 67-scenario run completed in 186.8 seconds. The first fence-aware implementation rescanned the same Markdown on every section lookup; its 69-scenario run reached 63 passing cases before the 360.4-second wrapper limit terminated it. A process-local cache plus a no-fence fast path reduced the positive checker to 2.27 seconds. The unchanged 69-case matrix completed in 199.6 seconds, two complete 71-case runs finished in 211.2 and 208.2 seconds, four complete 77-case runs finished in 259.2, 258.2, 259.1, and 256.7 seconds, and two complete 84-case runs finished in 279.3 and 303.8 seconds.

### Classification

Resolved checker-rescan regression plus residual fixture-copy performance friction.

### Decision

Keep the fence cache and one fresh repository copy plus one checker process per scenario for V10 acceptance. Evaluate shared-baseline fixture materialization only in a later bounded work item with equivalence and contamination tests.

## Exact Candidate Container And Heading Ownership Review

### Trigger

Exact review of `394612d29b432491e7fee07695f5bcfea553af8f` returned `REVISE` from correctness, security, and API/documentation. GitHub Actions run `29372879405` passed all six Node 22/24 operating-system jobs but failed Template Check before the scenario matrix because its fenced-practice fixture could not locate the Current Practices table.

### Evidence

- Correctness showed that list-contained fences such as unordered backtick and ordered tilde fences were not recognized, and that legacy README, feature, debug, and RCA heading checks still inspected raw Markdown.
- Security independently found the list-contained-fence gap and showed that required headings were presence-only rather than uniquely owned.
- API/documentation found that the active docs overstated the correction as covering every structural lookup while legacy heading paths still used raw content.
- The hosted failure was platform-specific: the fixture searched an LF-normalized tracked Markdown file using `[Environment]::NewLine` on Windows.

### Classification

Container-aware Markdown parsing gap, incomplete structural-owner migration, and host-native newline assumption in a regression fixture.

### Confirmed Cause

The fence parser recognized only top-level fences. Several older heading paths bypassed the shared active-content helpers, and required headings proved only presence. Separately, the practice-table fixture treated the host newline convention as the source-file convention even though `.gitattributes` normalizes Markdown to LF.

### Causal Fix

- Recognize backtick and tilde fences after repeated blockquote, unordered-list, or ordered-list container prefixes.
- Route required headings, feature acceptance criteria, task verification mappings, debug/RCA headings, README structural ownership, and PR-template contract text through active Markdown.
- Require one exact README H1 and one exact required H2 owner while preserving raw fenced command examples as intentional examples.
- Add six diagnostic-bound fixtures for hidden or duplicate README headings, fenced debug and acceptance-criteria headings, an ordered-list fenced practice table, and a nested blockquote/list fenced grant paragraph.
- Replace the host-native table-boundary search with a CRLF/LF-neutral contiguous-table regex and prove it directly against both newline forms.

### Regression

PowerShell syntax and the positive checker pass. The final strengthened harness passes all 77 scenarios: 73 expected rejections, four expected acceptances, and 30 public-contract parity cases in 256.7 seconds. Three prior complete runs finished in 259.2, 258.2, and 259.1 seconds. A direct portability probe locates the practice table in both LF and CRLF source, and the executable runtime remains unchanged from `9d8907a`.

### Durable Learning

Active Markdown is a document-wide ownership model, not a helper used by selected checks. Container syntax and source newline conventions are part of that model; every structural owner and every regression fixture must use the same portable representation.

## Exact Candidate Active README And Line-Boundary Review

### Trigger

Exact review of `0c42c64e9cef810efc284812e8024bf25419d87b` returned `REVISE` from correctness, security, and API/documentation. GitHub Actions run `29375642610` passed Template Check plus all six Node 22/24 operating-system jobs in 4m16s.

### Evidence

- Correctness and security showed that README capability and boundary prose, local navigation, and semantic overclaim guards still inspected raw Markdown. Required claims or links could therefore exist only inside a fence, while an inactive fenced example could trigger a false overclaim rejection.
- Correctness showed that unlimited leading indentation let a four-space-indented literal fence erase later active Markdown.
- Correctness and security showed that `\s+` in named-heading checks consumed newlines, so `##` and a title on the next line could impersonate one heading.
- API/documentation and correctness found that active context and the milestone still required a new candidate after `0c42c64` was already the immutable commit under review.
- A direct reproduction returned `split-heading-accepted=True` and `four-space-literal-treated-as-fence=True` before the causal fix.

### Classification

Raw-versus-active README scope gap, permissive indentation, newline-crossing heading ownership, and candidate-dependent status drift.

### Confirmed Cause

The README correction separated active images and headings from raw command examples but left prose, links, and semantic guards in the raw view. Fence recognition used unlimited surrounding indentation, heading patterns used whitespace classes that included line breaks, and status prose described the mechanics of creating a candidate instead of the invariant acceptance gate.

### Causal Fix

- Validate README repository identity, capability and boundary prose, navigation links, and semantic capability guards against active Markdown; keep literal command examples and command-claim guards on raw source.
- Limit structural fence indentation to zero through three spaces while retaining explicit blockquote and list container prefixes.
- Use horizontal whitespace plus an explicit optional carriage return for exact H1/H2, debug, RCA, and image-line ownership.
- Replace candidate-creation instructions with the invariant requirement for exact-commit review, all seven hosted jobs, evidence-only closeout, and owner approval.
- Add seven diagnostic-bound fixtures for fenced-only prose and navigation, split README/debug/RCA headings, a four-space unmatched fence literal, and an inactive fenced overclaim example.

### Regression

PowerShell syntax and the positive checker pass. The expanded harness passes all 84 scenarios: 78 expected rejections, six expected acceptances, and the same 30 executor contract-parity cases. Two complete runs finished in 279.3 and 303.8 seconds; the latter is the final pre-candidate run. The executable runtime remains unchanged from `9d8907a`.

### Durable Learning

Active Markdown ownership includes prose, links, headings, and semantic guards, but not literal command examples. Line-oriented grammar must use horizontal whitespace and explicit CRLF handling; status records must encode the gate rather than the act of freezing a commit.

## Exact Candidate Container Context Review

### Trigger

Exact review of `7f02b87f61a767cd88ef6892cb78a7a37288fb4a` returned `REVISE` from correctness, security, and API/documentation even though GitHub Actions run `29377581706` passed Template Check plus all six Node 22/24 operating-system jobs.

### Reproduction

Three isolated fixtures passed the checker before the fix when each should have failed: a mismatched list closer exposed fenced required-capability prose, a valid multi-digit ordered-list continuation closer hid a later active overclaim, and a list-continuation opener exposed fenced required-capability prose.

### Stable Evidence

- Correctness found that line-local fence recognition missed valid four-space continuation fences inside multi-digit ordered-list items.
- Security found that the checker accepted a `10. ```text` opener but not its valid four-space-indented closer, hiding the remainder of the document.
- API/documentation found that storing only marker character and length allowed a top-level fence to be closed by a different container such as `- ````, exposing inactive prose.
- CommonMark 0.31.2 defines fences relative to block-container context and derives list continuation indentation from the marker width plus following indentation.

### Failure Classification

Parser state and public-contract ownership defect, with an initial performance regression in the causal correction.

### Hypotheses

1. Fence ownership must include a normalized block-container stack, not only marker character and length.
2. Ordered-list continuation width must be derived from the complete marker rather than a fixed indentation allowance.
3. A rich container parser can remain bounded to ambiguous documents while ordinary top-level fences use the existing fast path.

### Experiments

The first container-state parser corrected all three reproductions but increased the 88-scenario harness to 626.5 seconds and the positive checker to about 7.2 seconds. Profiling identified repeated rich parsing of ordinary top-level fences. An ambiguity gate restored those documents to the simple parser while retaining the rich path for explicit containers and list-continuation-sensitive input.

### Confirmed Cause

The fence parser tracked delimiters but not the container that owned them. It therefore could not distinguish a valid continuation closer from an unrelated list marker, and it treated container termination as unrelated prose instead of a fence boundary.

### Causal Fix

The checker now tracks a normalized quote/list stack, computes list continuation width from marker syntax, requires closing fences to match the opener container, ends nested fences when their container ends, and reprocesses the terminating line in the outer context. An ambiguity-gated fast path preserves performance for ordinary top-level fences.

### Regression

All 89 scenarios pass: 82 expected rejections, seven expected acceptances, and 30 unchanged executor contract-parity cases. The authoritative final-tree run completed in 318.9 seconds and the positive checker in 2.76 seconds. Direct probes report mismatched-container prose hidden, post-list active overclaim visible, list-continuation fenced prose hidden, implicit list-end prose visible, and later active prose visible.

### Next Action

AC8 remains open until the exact complete commit records three `PASS` verdicts and all seven hosted jobs; merge remains owner-gated.

## Container State Performance Observation

The semantically correct rich parser was retained only where container syntax can change ownership. Equivalent reject and preserve fixtures cover both parser paths so the optimization cannot silently weaken public-contract enforcement.

## Exact Candidate Nested Container And Tab Review

### Trigger

Exact review of `c4bfa016c82c0838b6198f936f5cbb6bbb20f09a` returned `REVISE` from correctness, security, and API/documentation even though GitHub Actions run `29380939276` passed Template Check plus all six Node 22/24 operating-system jobs in 6m19s.

### Reproduction

Direct pre-fix probes produced the wrong ownership results:

- Fenced required prose under a four-space list continuation plus nested quote was visible.
- Fenced required prose under a four-space list continuation plus nested list was visible.
- Fenced required prose under a tab-expanded list continuation was visible.
- Active overclaims after an inner quote or list fence, a surviving outer list, and a second outer-list fence were hidden.
- A retired repository URL inside a fence was raw-visible but active-hidden, while its guard still inspected raw source.

### Stable Evidence

- Correctness and security independently identified loss of the surviving outer-list prefix at implicit inner-container termination.
- Both identified tab expansion beyond the exact continuation width as valid continuation plus relative fence indentation.
- Both identified ambiguity routing that recognized direct indented fences but missed an indented quote or list container before the fence.
- Correctness found the retired URL guard outside active-Markdown ownership and the candidate-specific next action.
- API/documentation supplied the first surviving-prefix reproduction and required source records to stop overstating complete container handling.

### Failure Classification

Parser state, ambiguity routing, tab-column normalization, active/raw ownership, and acceptance-state defects.

### Hypotheses

1. Implicit termination must retain the longest list-containing opener-stack prefix matched by the current line.
2. Continuation indentation must consume tab-expanded columns and rematerialize surplus columns as relative fence indentation.
3. The simple parser is safe only when no indented continuation line places a quote or list container before a fence.
4. All README identity guards except intentional literal command checks belong to active Markdown.
5. Review records must state invariant gates rather than candidate-creation actions.

### Experiments

The nested-stack correction initially assigned an array through an `if` expression; PowerShell unrolled its one-element result to a scalar, so `.Count` no longer preserved the list state. The Windows fallback edit also dropped the backslash in the regex `\d` escape. Separate branch assignment and exact readback corrected both mechanics. A normalized indentation helper then proved the three tabbed lines as fenced while retaining later active prose.

### Confirmed Cause

The parser preserved fence delimiter and full opener stack but treated a failed full-stack continuation as complete container loss. Its exact-width reader could not split a tab into required continuation columns plus permitted relative indentation, and its fast-path ambiguity signature recognized only a directly indented fence. One legacy README guard and one next-action sentence remained outside the active/invariant policy.

### Causal Fix

The parser now normalizes all leading indentation, removes required continuation columns, rematerializes surplus columns, retains the longest surviving list prefix before reprocessing an implicit container end, and routes indented nested-container fence signatures to the rich parser. The retired URL guard reads active Markdown, and the next action states only the invariant acceptance gate.

### Regression

Seven focused fixtures cover nested quote and list ambiguity, surviving outer-list prefixes after quote and list fences, hidden tabbed contract prose, tabbed closer preservation, and a fenced retired URL. Direct causal and preserving probes pass; the positive checker passes. The complete 96-scenario matrix passes in 345.8 seconds: 87 expected rejections, nine expected acceptances, and 30 unchanged executor parity cases.

### Next Action

AC8 remains open until the exact complete commit records three `PASS` verdicts and all seven hosted jobs; merge remains owner-gated.

## Exact Candidate Blank-Separated Blockquote Review

### Trigger

Exact review of `ae5195c3c3d1fb611e0b7e3c1d94f6e53791b1af` returned correctness `REVISE` and API/documentation `PASS`. Security remained running through two bounded waits and an immediate-conclusion request, then was closed without a verdict. GitHub Actions run `29383056180` passed Template Check plus all six Node 22/24 operating-system jobs in 7m05s.

### Reproduction

Before correction, this active overclaim remained hidden:

```markdown
> ```text
> inactive

> SWECircuit launches agents.
```

The direct probe reported `post-blank-overclaim-visible=false`. The same defect reproduced when both quotes were nested inside an outer list.

### Stable Evidence

- CommonMark 0.31.2 states that an unclosed fence ends at its containing block and that a blank line separates consecutive block quotes.
- Correctness identified the exact blank-line branch that retained the old quote stack.
- API/documentation confirmed the 96-case evidence, links, headings, timing, status wording, and unchanged runtime payload before returning `PASS`.
- Security produced no handoff within the bounded liveness protocol; absence of a verdict is not a pass.
- Hosted CI stayed green, demonstrating why independent semantic review remains acceptance-critical.

### Failure Classification

Container termination and blank-line state-transition defect.

### Hypotheses

1. An unmarked blank must end a quote-owned fence because blank lines are not lazy blockquote continuations.
2. A quote-marked blank must remain inside the quote and fence.
3. When a quote nested inside a list ends on an unmarked blank, only list containers preceding the first quote survive.
4. The blank must then be reprocessed through normal list logic so it does not incorrectly terminate that list item.

### Experiments

A direct pre-fix probe reproduced the false hidden result. After adding quote detection and enclosing-list-prefix extraction, top-level and list-nested blank-separated quotes expose the overclaim, while a quote-marked blank keeps the same prose fenced. All prior container, tab, URL, and later-active-prose probes remain unchanged.

### Confirmed Cause

The in-fence blank branch treated every whitespace-only line as literal fence content before considering whether the opener's quote container still existed. That is valid for top-level and list-owned fences, but not for a quote-owned fence whose marker is absent.

### Causal Fix

On an unmarked blank, the parser now detects quote ownership, retains only list containers enclosing the first quote, resets the fence, and reprocesses the blank through the ordinary active-list path. Marked blank quote lines still match the opener context and remain fenced.

### Regression

Three focused fixtures cover a blank-separated top-level quote, the same transition inside an outer list, and a marked-blank preservation case. The complete 99-scenario harness passes in 440.7 seconds: 89 expected rejections, ten expected acceptances, and 30 unchanged executor parity cases. Direct causal and preserving probes plus the positive checker also pass.

### Next Action

AC8 remains open until the exact complete commit records three `PASS` verdicts and all seven hosted jobs; merge remains owner-gated.
