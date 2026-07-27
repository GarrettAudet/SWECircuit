# Feature Spec: V12 IDE Run Loop

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness
alone. Candidate-addressed external evidence is authoritative for exact-candidate state. Revision 70
is permanently retired after its consumed canonical gate and fresh R2 `pass` / `pass` / `block`
roster exposed 48 ordinary-Windows-path failures. Revision 71 commit
`841b38a1430ec9b7845dcb11e1104ecbf7f1d75d` preserved the exact identities under bounded
full-SHA-256 aliases and passed immutable local qualification. Hosted run `30203059470` then had
both kernels pass 479/480 core tests and fail only because the probe depended on unavailable
`Get-FileHash` supply. Its canonical gate remained unused, and Revision 71 is permanently retired.

Revision 72 commit `5bc547eab6b22b862e798ad72df0d35aaa64771f` then passed mutable,
immutable, disposable-rehearsal, and hosted Windows qualification; hosted run `30207051835` had
exactly three passing jobs and both kernels passed 482/482 core tests. Its protected gate was
invoked exactly once. The external IDE host terminated it with `0x40010004`
`DBG_TERMINATE_PROCESS` after 482/482 core pass and before lifecycle completion, so no receipt was
published. Revision 72 is permanently retired.

Revision 73 is active and preserves those exact bytes. The accidental exact-R72 replay is
preserved with `releaseQualificationValid: false`; it is not transport or release qualification.
A dedicated candidate-neutral fixture proves the launch-and-poll transport by cross-binding one
nonce, PID, process start time, launcher exit, timestamped polls, post-exit heartbeat, and one pass
receipt. Independent review attempt 1 returned `block` on the replay, evidence authentication, and
stale routing. Attempt 2 returned `block` on stream preservation, semantic continuity,
invalid-proof wording, and ignored proof files. Attempt 3 returned `block` on one stale sentence
describing the corrected stream capture. All findings are corrected, and Attempt 4 returned `pass`
with no unresolved finding. Candidate-addressed external evidence determines the live gate.
R73 has not frozen and its protected gate has not been invoked. Release still requires exact freeze,
immutable qualification, hosted Windows, canonical, fresh R2, milestone, and merge evidence. ADR
0006 keeps v0.1 Windows-only;
`releaseReady: false`.

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
