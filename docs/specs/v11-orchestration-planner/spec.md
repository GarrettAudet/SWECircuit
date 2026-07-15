# V11 Portable Orchestration Planner

## Status

Revision 2 design candidate. Round 1 returned `REVISE`; implementation is blocked until the revised architecture passes four independent reviews. This branch remains stacked on owner-gated V10 commit `8ac3372` and cannot be accepted or merged until V10 is approved or V11 is rebased to an approved replacement.

## Problem

SWECircuit can describe modules and circuits and V10 can execute one host-selected WorkPacket, but a user still has to manually turn a software goal into bounded work, decide which specialist should own each part, determine what can run together, integrate the outputs, and preserve one end-to-end trace. The product promise requires that coordination layer without coupling the workflow to a particular IDE, model, provider, or API.

## Product Outcome

A user supplies a goal and selects or defines the workflow modules. SWECircuit then:

1. clarifies material ambiguity;
2. validates a proposed decomposition against the selected Circuit;
3. creates traceable WorkPackets;
4. matches packets to allowlisted specialized agents by capability and least authority;
5. runs dependency-safe, conflict-safe waves through host callbacks;
6. routes failures through explicit diagnosis or fix modules;
7. fans results into integration, verification, and review gates;
8. records owner approval and emits merge-ready evidence;
9. produces source-linked memory candidates.

The identical surface works with one IDE agent at concurrency one or many specialized agents at bounded concurrency.

## Users Or Actors

- Human owner: supplies intent, answers clarification, controls authority, approves merge.
- SWECircuit core: validates policy, compiles plans, matches capabilities, reduces state, and emits trace.
- Planner implementation: proposes bounded concrete work; may be the current IDE agent, a rule engine, or another host component.
- Agent profile: allowlisted capability contract for one kind of specialist.
- Worker executor: host-selected implementation that receives one bound ExecutionTicket and invokes V10.
- Integration, verification, and review agents: ordinary specialized workers selected by the Circuit.
- Host: authenticates identities and enforces persistence, credentials, workspaces, processes, and side effects.

## Goals

- Make the one-agent path obvious and reliable before adding scale.
- Preserve user-defined Circuit and Module policy as the workflow authority.
- Decompose a bounded goal into portable, inspectable work instances.
- Assign work by exact capabilities, compatibility, capacity, and least authority.
- Execute disjoint work concurrently under one deterministic coordinator.
- Make every clarification, assignment, result, route, gate, and decision reconstructable.
- Improve useful elapsed time without weakening integrated acceptance or owner control.

## Non-Goals

- Selecting or switching IDEs, APIs, models, providers, prompts, prices, or reasoning modes.
- Installing or depending on an external orchestration framework.
- Distributed coordinators, remote queues, durable crash recovery, or cross-process claiming.
- Recursive agent spawning or runtime mutation of Circuit policy.
- Automatic retries, branch merge, memory mutation, worktree creation, credentials, or sandbox enforcement.
- Parallel execution of overlapping writes.
- Claiming that profile metadata proves competence, identity, or enforcement.

## Requirements

- R1: Expose one `runGoal` facade that defaults to one allowlisted AgentProfile, one slot, serialized in-memory coordination, zero retries, and owner-controlled merge.
- R2: Accept a bounded goal, selected Circuit and Module snapshots, acceptance criteria, source baseline, immutable RunAuthority, allowlisted AgentProfiles, a host-injected planner, and host callbacks.
- R3: Keep the Circuit authoritative for modules, routes, gates, fan-out, joins, port transfers, integration ownership, and completion. Compile proposal data only into permitted concrete invocations, WorkPackets, prerequisites, scopes, and bindings.
- R4: Represent planning before a plan exists with a closed PlanningSession lifecycle of `ready`, `input_required`, `compiled`, or `blocked`; bind every response to the exact request and revision; allow no worker effect before `compiled`.
- R5: Use dedicated closed planning, transition, and `runGoal` result unions. A rejection or temporary no-capacity deferral must preserve the exact state and may not carry successor data or events.
- R6: Use the separate closed `swecircuit/orchestration/v1alpha1` contract family and RFC 8785 plus SHA-256 digests without changing existing project artifacts or V10 RunEvent.
- R7: Root all execution in host-supplied RunAuthority. Every plan, packet, profile, availability binding, assignment, ticket, and V10 grant must narrow that authority.
- R8: Match ready invocations to live profiles through deterministic capacity-constrained capability matching. Core must not inspect provider, model, API, IDE, price, or hidden quality metadata.
- R9: Use one serialized coordinator. `prepareWave` must commit claims in a new state before effects; workers may execute the complete bounded wave concurrently; `applyWaveResults` must accept one complete, bound, canonically ordered batch.
- R10: Allow read/read overlap only. Serialize write/write, write/read, shared writer conflict zones, and unknown writer scopes. Reject non-canonical or out-of-packet paths.
- R11: Bind each child result to the exact run, plan, state, wave, assignment, claim, invocation, WorkPacket, profile, executor, manifest, V10 attempt, output ports, journal, commits, changed paths, and evidence digests.
- R12: Map every V10 disposition to a closed parent transition. Any unknown effect state must make the parent terminal `uncertain` and prohibit retry, transfer, join, verify, review, or merge.
- R13: Preserve existing `all` and `any` joins, deterministic winner semantics, integration-owner evidence, integrated verification, independent review, and owner approval before merge-ready completion.
- R14: Emit bounded OrchestrationEvents that reference immutable child evidence without copying or relabeling it, plus reviewable MemoryCandidates rather than automatic memory writes.
- R15: Enforce the exact privacy and resource ceilings in ADR 0003 before planner or worker effects.
- R16: Preserve V9 and V10 behavior and prove the same contract in two independent host implementations without a live provider.

## Acceptance Criteria

- [ ] AC1: Given one valid goal and one agent profile, `runGoal` can clarify, plan, execute, verify, review, and return a traceable result with concurrency one and no provider-specific configuration.
- [ ] AC2: Given a Circuit with a permitted fan-out slot, a valid proposal compiles into canonical concrete WorkPackets and bindings; any proposal that changes policy, lacks acceptance coverage, or exceeds authority fails before worker execution.
- [ ] AC3: Given planning ambiguity, the session becomes `input_required`; a correctly bound authorized response resumes the same session, while stale, replayed, wrong-request, wrong-role, or ninth-round responses leave state unchanged.
- [ ] AC4: Given shuffled profiles and ready invocations, matching maximizes assignments and then applies least-authority, capability-surplus, explicit-priority, and lexical rules identically without using IDE, model, provider, API, price, or hidden quality fields.
- [ ] AC5: Given disjoint ready work, `prepareWave` returns a claimed state and bound tickets before callbacks; given overlapping or unknown writer scopes, it emits a deterministic serialized wave or stable block reason.
- [ ] AC6: Given a complete result batch, reduction is invariant to result arrival order, advances one revision, accepts each claim once, rejects substitutions and duplicates without mutation, and never opens input while a wave is active.
- [ ] AC7: Given each V10 terminal disposition, the exact mapping in ADR 0003 is applied; `abort_unconfirmed` or unknown effects produce terminal `uncertain` and no dependent execution.
- [ ] AC8: Given `all` and `any` fan-in scenarios under concurrency one and many, the same branch result and transferred outputs are selected; claimed losers settle, evidence is preserved, and no uncertain branch closes a join.
- [ ] AC9: Given an activated Circuit, completion is impossible until exits, bindings, joins, integration evidence, acceptance verification, review, required owner approval, and liveness checks all pass.
- [ ] AC10: Given a complete or interrupted run, its parent journal reconstructs goal, policy digests, plan, assignments, child summaries, routes, inputs, gates, owner decision, final state, and memory candidates while excluding sensitive payload classes.
- [ ] AC11: Given two independent host implementations with the same logical inputs and child results, canonical plans, states, and events are identical; host-specific provenance differences remain explicit and do not change the semantic projection.
- [ ] AC12: Given the V11 dogfood goal, at least four specialist roles execute a real clarify, fan-out, child failure, diagnosis, fan-in, integration, verification, review, owner-gate, and memory-candidate path; parallel and serial runs produce equivalent evidence and measured parallel elapsed time is lower.
- [ ] AC13: Given all inherited and V11 fixtures, local canonical gates, packed-consumer checks, hosted CI, and independent product/API/lifecycle/security reviews pass on one immutable candidate before implementation acceptance.

## Architecture Impact

V11 is an additive cross-kernel control-plane feature. It adds separate orchestration schemas and types, canonical digest support, plan compilation, capability matching, immutable state reduction, parent events, a simple facade, fixtures, examples, and package documentation. It composes V10 for every child effect and does not alter V10 authority or evidence semantics.

## Risks

- The planner could silently become workflow authority unless Circuit derivation is mechanically validated.
- Capability declarations can be spoofed unless profiles and executor bindings are host-allowlisted and digest-bound.
- Parallel work can corrupt shared state unless scopes are canonical and conservative.
- A child summary can be substituted unless every identity and digest is bound end to end.
- Complete waves improve determinism but can wait for a slow child.
- Too many public primitives can obscure the simple one-agent path.

## Assumptions

- The host can serialize one coordinator and install a claimed state before invoking callbacks.
- The host authenticates human and executor identity and enforces all external effects.
- The selected Circuit explicitly permits decomposition fan-out and names integration and acceptance gates.
- V10 is approved before V11 acceptance, or V11 is rebased and fully reverified.
- Deterministic planner and worker fixtures are sufficient for conformance; live providers remain optional adapters.
