# Debug Notes: V10 Bounded Executor Boundary

## Status

Causal fixes complete for all diagnosed V10 review rounds; corrected-candidate freeze, exact review, and hosted CI remain.

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

Run the full canonical and workflow gates, freeze a new immutable candidate, obtain three exact-commit verdicts, and record its hosted CI result.

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

The positive checker passes. The isolated harness passes 49 scenarios: 46 expected rejections and three expected acceptances. Six parity scenarios now cover three liveness surfaces, two grant-summary surfaces, and register placement. Fresh `npm.cmd run verify` also passes format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the clean offline consumer. A new immutable exact-candidate review remains required.
