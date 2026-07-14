# Root-Cause Analysis: V10 Packed Declaration Portability

## Status

Closed.

## Trigger

V10 added the first external TypeScript host check to the packed-consumer gate. That host could install the offline tarball but failed to compile its public declarations.

## Reproduction

Run:

    npm.cmd run consumer:check

Before the fix, TypeScript reported TS2411 in the installed **dist/model.d.ts** for optional properties on RunEventAttempt and RunEventEvidenceReference.

## Confirmed Root Cause

Both records were declared as interfaces extending JsonObject, whose string index signature requires every property to be a JsonValue. Under compiler settings that interpret optional properties as including undefined, their optional fields were incompatible with that index signature.

The repository's source compiler uses exactOptionalPropertyTypes, while a consumer is not required to do so. The emitted declarations therefore compiled internally but were not portable across valid consumer settings.

## Why It Was Missed

The prior package check exercised only JavaScript runtime imports. Internal typechecking compiled source under the repository's own settings and never recompiled the emitted public declarations from an independent consumer project.

## Fix

- Expressed RunEventAttempt and RunEventEvidenceReference as JsonObject intersection aliases, matching established model patterns.
- Added a strict external host fixture that imports and exhaustively narrows the public execution types from the installed tarball.
- Extended the installed-runtime check to execute one deterministic packet and inspect its returned event journal.

## Regression Coverage

**scripts/check-packed-consumer.mjs** now:

- Requires **dist/execution.d.ts** in the packed artifact.
- Installs the tarball offline in a clean temporary consumer.
- Compiles **scripts/fixtures/packed-consumer-host.ts** against that installation.
- Executes one validated work packet through createDeterministicTestExecutor.
- Reconstructs the resulting V9-compatible trace through inspectTrace.

The gate passes after the fix.

## Follow-Up Work

Keep public declaration compilation under consumer-owned compiler settings in the canonical verify command. Any future public type addition must pass this installed-artifact gate.

## Memory Update

Promote the independent-declaration-consumer rule to durable patterns during the V10 memory update.
## Postimplementation Timing And Reflection RCA

### Trigger

Three independent postimplementation reviewers returned `REVISE` after the initial 267-test hardening pass. They identified a remaining pre-call deadline interval, an acknowledgment window anchored after abort delivery, early deadline-timer wake-ups treated as expiry, and record/proxy traversal that still performed avoidable reflection before bounds.

### Reproduction And Stable Evidence

- A deterministic hook moved the monotonic clock from 99 to 100 after the prior final gate read; executor invocation was still possible before the fix.
- An internal abort listener advanced the clock beyond `abort.observedAt + abortAcknowledgementMs` before settling; the old path accepted it because the timer started after `controller.abort()` returned.
- A controlled deadline timer fired at monotonic 50 for a deadline of 100; the old callback recorded a permanent deadline abort.
- A live proxy could reach `ownKeys` or descriptor reflection, and a dense object could materialize descriptors before its node budget was checked.
- Reviewer evidence is preserved under agent IDs `019f618c-b855-7433-9980-8645a82aec9b`, `019f618c-cd0c-72c0-adcb-650d3e031af8`, and `019f618c-e412-7183-9ce8-629ae2c192a5` in `orchestration-run.md`.

### Confirmed Root Causes

- The running journal event and request construction sat between the last monotonic check and the actual executor call.
- The acknowledgment duration was treated as a fresh timer duration rather than an absolute bound projected from the abort observation.
- Timer completion was treated as proof of deadline instead of a wake-up requiring a monotonic recheck.
- Revoked-proxy tests exercised exceptions but did not prove live proxy traps stayed dormant; object key count was checked too late to avoid descriptor-map expansion.

### Causal Fix

- Build the request first, sample monotonic time at the direct invocation boundary, recheck an already observed abort, and call the executor in the same synchronous stack. Emit `running` immediately after the call begins, including synchronous-throw paths, so no-call deadline journals remain queued-to-cancelled.
- Compute acknowledgment end as `abort.observedAt + abortAcknowledgementMs` and accept only adapter observations strictly before that point.
- Wrap host timers in an absolute-deadline helper that re-arms after every early wake-up.
- Reject all Node-detectable proxies before reflection, check allowed keys or remaining node budget before descriptor traversal, and read bounded descriptors individually.

### Regression Coverage

`test/execution.test.mjs` now covers:

- Deadline crossing after the prior final gate read but before invocation.
- Early deadline wake-up followed by successful completion.
- Settlement beyond the abort acknowledgment bound returning `abort_unconfirmed`.
- Live proxy traps remaining at zero calls.
- Revoked `AbortSignal` proxy rejection.
- Small sparse arrays, huge sparse arrays, dense oversized objects, and excessive depth.
- Normal class executors, forged signals, revoked values, and first-observation cause precedence.

The hardened suite passes 274 tests and `npm.cmd run verify` passes through dogfood, package inspection, and the clean installed consumer.

### Durable Learning

A green asynchronous suite is not enough for a timing boundary. Express timeout and acknowledgment as absolute monotonic observations, treat timers as fallible wake-ups, put the final gate beside the effectful call, and test live reflective traps rather than only revoked objects.

## Exact-Candidate Settlement Detachment RCA

### Trigger

The correctness and API/documentation reviewers returned `REVISE` during exact review of commit `e3453e0`, despite green local and hosted verification.

### Confirmed Root Causes

- Promise fulfillment observation captured `observedAt` but retained the caller-owned raw settlement. Normalization happened only after `Promise.race` resumed, leaving a microtask interval in which the executor could mutate accepted content.
- Active documentation treated terminal cancellation as one acknowledgment case even though ADR 0002 deliberately defines a separate queued-to-cancelled no-call path.

### Causal Fix

- Normalize the settlement synchronously inside the fulfillment callback and carry only `NormalizedSettlement | null` plus the post-normalization monotonic observation.
- Keep rejected-settlement timing unchanged and discard normalized content whenever abort wins.
- Define terminal certainty consistently: before invocation, no call is proof that work did not start; after invocation, only in-window executor promise settlement after all activity capable of advancing the invocation or producing invocation effects has stopped is acknowledgment. Transfer of live work is not acknowledgment.

### Regression Coverage

A resolve-then-mutate test proves that a later microtask cannot change disposition, workflow, or evidence after fulfillment observation. Existing deadline, acknowledgment, hostile-value, and privacy tests remain in the canonical suite.

### Durable Learning

An observation timestamp and the data attributed to it must cross the ownership boundary together. For mutable asynchronous values, detach first and timestamp the completed snapshot; never carry provider-owned data into a later continuation.

## Closeout Contract-Surface Addendum

Candidate `9d8907a` fixed the runtime ownership defect and the named active guides, but one normative feature-spec sentence retained the old acknowledgment claim. The direct cause was incomplete contract-surface enumeration in the correction and review prompt. A repository-wide semantic search found the drift before AC8 closed.

The causal fix is one rule: a pre-invocation abort or deadline can terminate because no executor work started; after invocation, terminal cancellation or timeout requires in-window executor promise settlement after all activity capable of advancing the invocation or producing invocation effects has stopped, and transfer of live work is not acknowledgment. Future closeout reviews must include the feature spec and a whole-repository search for superseded normative language.

## Expanded Claim-Family Addendum

The first closeout search fixed the feature spec but was lexically narrow. `2c6dff4` still contained synonymous normative claims in the practice register and V10 plan, so exact security and API/documentation review correctly returned `REVISE` despite green CI and a correctness `PASS`.

The root cause was treating one query as semantic completeness. The causal fix broadens both the active corrections and the verification vocabulary: pre-invocation no-call termination is explicit; all settlement-dependent terminal claims are scoped to invoked work; and future closeout evidence records the actual query family instead of calling one phrase search whole-contract.

## Broad Semantic And Authority-Term Addendum

`dbbeeb1` reconciled the cancellation phrase family but left one generic ADR race rule and an independent grant adjective outside that family. Correctness and security review found both; API/documentation passed and hosted CI remained green.

The lifecycle root cause was one unqualified universal inside an otherwise scoped section. The authority root cause was using a colloquial lifecycle adjective for a binding that carries no freshness or anti-replay guarantee. The causal fixes split pre- and post-invocation abort handling in the ADR and replace ephemeral with invocation-scoped plus explicit disclaimers.

## Public Contract Parity And Register Structure Addendum

Candidate `4c6818d` corrected the prior ADR and research wording and passed hosted CI, but correctness found single-use implications in the schema guide and implementation notes. API/documentation found that the installed executor guide omitted the promise-liveness prerequisite for terminal certainty and that two accepted practices sat outside their table. Security passed.

The root cause was contract compression across secondary public surfaces: identity matching became `one call`, settlement became sufficient without naming what settlement must cover, and append-only register maintenance ignored the table boundary. The causal fix carries explicit non-reuse guarantees and settlement preconditions into consumer-facing docs and restores both practices to the Current Practices table. Future contract audits must compare summaries to ADR prerequisites and inspect rendered Markdown structure, not only search semantic terms.

## Cross-Surface Contract Parity Addendum

Candidate `b2d73e7` carried the previous named corrections and passed all seven hosted jobs, but all three exact reviewers returned `REVISE`. Public summaries still treated timely promise settlement as sufficient terminal proof without carrying the ADR promise-liveness contract, and one packaged grant summary still omitted the complete stateless-kernel non-guarantees.

The root cause was procedural as well as textual: search families found words, but the workflow had no explicit mapping from each high-risk ADR claim to every public summary and no executable fixture proving that the mapping was enforced. A newly corrected sentence could pass while an adjacent summary retained only half of the contract.

The causal fix establishes an ADR-to-surface matrix, rewrites terminal summaries around contract-compliant acknowledgment, propagates stopped-activity and live-transfer prerequisites, propagates grant non-guarantees, and makes those mappings executable in the checker. That correction became candidate `ac70efc`, whose 49-scenario harness included 46 expected rejections, three expected acceptances, and six removal or placement parity cases.

## Contradiction-Resistant Parity And Acceptance-State Addendum

Candidate `ac70efc` passed all seven hosted jobs and correctness review. Security nevertheless showed that presence-only section checks could accept an incomplete intended paragraph plus a contradictory nearby statement. API/documentation separately showed that current records written as pre-freeze instructions became stale once the candidate existed.

The checker root cause was a mismatch between semantic ownership and validation scope: the contract belonged to one active paragraph or table row, while the rule searched an entire section. The trace root cause was encoding a transient next action instead of the invariant acceptance gate.

The causal fix binds each lifecycle and grant invariant to exactly one intended line, rejects three lifecycle and eight grant contradiction classes across every checked active section, and adds 13 preserving or relocation fixtures. Current records now state that exact-commit review and hosted CI remain until their evidence is recorded. The expanded 62-scenario harness passes 59 expected rejections and three expected acceptances, including 19 public-contract parity cases.
