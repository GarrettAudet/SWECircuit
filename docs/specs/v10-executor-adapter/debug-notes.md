# Debug Notes: V10 Bounded Executor Boundary

## Status

Causal fixes complete for the packed declaration and postimplementation timing/reflection defects; exact-candidate re-review remains.

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