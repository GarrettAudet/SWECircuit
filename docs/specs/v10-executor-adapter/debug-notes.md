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

Normalize and detach synchronously in the fulfillment observer, timestamp only after that bounded normalization, and carry `NormalizedSettlement | null` in the adapter token. Clarify that `cancellationAcknowledged: true` means terminal certainty: either no call occurred or post-invocation settlement was acknowledged.

### Regression

`test/execution.test.mjs` now resolves a completed settlement, queues a valid failed-state mutation, and proves the returned disposition, workflow, and evidence retain the observed completed snapshot.

### Next Action

Run the full canonical and workflow gates, freeze a new immutable candidate, obtain three exact-commit verdicts, and record its hosted CI result.

## Closeout Contract-Surface Audit

### Trigger

After candidate `9d8907a` received three `PASS` verdicts and seven green hosted jobs, the integration owner ran a repository-wide semantic search before checking AC8.

### Evidence

`docs/specs/v10-executor-adapter/spec.md` still said terminal cancellation or timeout always required executor settlement acknowledgment. At that audit point the direct claim had been corrected in the ADR, handbook, framework guide, schema guide, research snapshot, and memory pattern, but synonymous statements in the plan and practice register had not yet been searched and remained stale.

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
