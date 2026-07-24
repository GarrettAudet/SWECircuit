# Feature Spec: V12 IDE Run Loop

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revisions 48-49 introduced candidate-private dependency authority and real-project lifecycle proof. Dogfooding and independent review retired Revisions 50-52. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Revisions 53-54 were retired before canonical gating after isolated verification exposed narrow host-contract defects. Revision 55 passed the exact lifecycle and full verifier, then its sole canonical gate at `7c0135c9604893f6baa933d123cd026323ee2912` returned `fail`: exact source, materialization, execution authority, dependency closure, and cleanup passed; 454/458 core tests passed, while four release self-tests assumed filesystem-discoverable Git metadata inside an exact blob materialization. Revision 55 is permanently retired. Revision 56 isolates those tests in private conventional Git repositories without relaxing production Git closure; its four causal tests, complete 24-test gate file, 61-test release contract, 458-test core suite, template and quality gates, and independent review pass. Freeze and commit, exact successor lifecycle, full verification, one successor gate, fresh R2, hosted CI, milestone closeout, and merge remain; `releaseReady: false`. Scope is frozen to release blockers through `2026-07-25 00:03 MDT`.

## Problem

V11 can compile exact specialist contracts and verify packages and handoffs, but an IDE still has to reconstruct the run loop from prose. There is no small portable state value that says which approved contracts are dependency-eligible, which evidence has been accepted, why progress stopped, or whether integration may begin.

## Users Or Actors

- A developer giving one software goal to an IDE.
- An IDE agent acting as the external host and integration owner.
- Task-shaped specialist agents materialized by that host.
- SWECircuit core, which remains deterministic and effect-free.

## Goals

- Make V11 specialist packages operational through one inspectable, restartable run session.
- Let an IDE maximize dependency-safe parallelism without provider-specific policy in core.
- Preserve exact package, contract, raw handoff, routing, and closeout evidence.
- Make every stop, clarification, failure, and next action visible to the user.

## Non-Goals

- Selecting providers, models, prompts, credentials, or tools.
- Launching agents, creating worktrees, enforcing permissions, or scheduling host capacity.
- Implementing the deferred universal scheduler, cancellation, retry, or crash-recovery control plane.
- Automatically merging code or mutating durable memory.

## Requirements

- R1: A run session must bind one externally approved compilation and package digest pair.
- R2: Session creation must reconstruct and verify the specialist package before exposing work.
- R3: Core must derive dependency-eligible contracts from the fixed dependency graph and accepted handoffs without claiming launch or runtime state.
- R4: The host must preserve raw handoff bytes; the source-preserving session must retain canonical base64 so core can reverify identity, closure, outcome, and dependency readiness after restart.
- R5: Non-`pass` outcomes must remain visible routing results and must never be treated as successful completion.
- R6: Session values must be immutable, deterministic, closed, JSON-serializable, and restorable from raw bytes plus the external trusted package expectation.
- R7: The IDE protocol must show stage, outcome, evidence, blockers, dependency-eligible work, integration readiness, and next action.
- R8: Core and host responsibilities must remain explicit in APIs, docs, examples, and tests.

## Acceptance Criteria

- [x] AC1: Given an approved V11 package and expected digest pair, creating a run session returns one immutable source-preserving value bound to that exact package and complete selected blueprint set.
- [x] AC2: Given a valid session, inspection returns every dependency-eligible manifest-resolved specialist contract and one closed reason for every other contract.
- [x] AC3: Given exact raw specialist handoff bytes, recording the handoff either returns a new verified session state or a stable fail-closed diagnostic without mutating the prior state.
- [x] AC4: A verified non-`pass` handoff routes visibly and cannot satisfy a dependent agent or integration gate.
- [x] AC5: Integration readiness becomes true only after every blueprint in the complete selected roster has one verified `pass` handoff.
- [x] AC6: Raw serialized session bytes can be restored in a fresh process using the external expectation and re-inspected with the same canonical semantics, with no provider, model, executor, time, randomness, callback, or host-state data.
- [x] AC7: One IDE kickoff guide demonstrates natural-language intake, clarification, GoalContract review, specialist compilation, host fan-out, verified fan-in, integration, review, and memory handoff.
- [x] AC8: V12 is dogfooded on its own implementation using task-shaped specialists, preserved raw handoffs, integrated verification, and measured friction.
- [ ] AC9: The canonical repository gate and independent product, lifecycle, security, and API reviews pass for the exact release candidate.

## Architecture Impact

V12 adds four pure public operations above the V11 compiler/package/handoff layer: create, restore, inspect, and record. The session embeds the verified package and canonical base64 for exact accepted handoffs while approval remains external. It requires ADR 0005, a closed schema and type surface, deterministic transitions, tests, a packed-consumer example, IDE guidance, and explicit compatibility with the V10/V11 host boundary. It does not add a provider runtime.

## Risks

- A run-session API could accidentally become a scheduler in disguise.
- Persisted state could imply guarantees that only an external host can enforce.
- Handoff acceptance and dependency readiness could diverge from V11 verification semantics.
- A broad first version could repeat the failed universal-runtime design.
- More trace artifacts could worsen repository and checker performance.

## Open Questions

None. The verified architecture pass froze the four-operation surface, source-preserving session, complete-roster readiness, terminal non-`pass` route, exact replay, limits, diagnostics, and external host boundary.

## Assumptions

- The first V12 increment coordinates only one immutable V11 specialist package.
- The external IDE remains the runtime host and integration owner.
- Caller-owned persistence is sufficient for V12; automatic durable storage is deferred.
- A bounded monotonic session can deliver immediate usability without the universal scheduler.
