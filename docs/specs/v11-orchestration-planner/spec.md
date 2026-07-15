# V11 Portable Orchestration Planner

## Status

Draft. Architecture review is required before implementation. This branch is stacked on the technically accepted but unmerged V10 closeout commit `8ac3372`; V11 cannot be accepted or merged until that baseline is owner-approved or the branch is rebased to an approved replacement.

## Problem

SWECircuit can validate modules, circuits, work packets, fan-out, joins, permissions, and traces, and V10 can execute one host-selected packet. It cannot yet take a human goal, turn it into a bounded executable plan, match specialized agents, compute dependency-safe parallel work, advance fan-in, or preserve one parent orchestration trace. Those decisions remain manual and host-owned, so the repository does not yet deliver its central multi-agent product promise.

## Users Or Actors

- Human owner who supplies the goal, approves material assumptions, and owns merge authority.
- IDE, CLI, desktop, cloud, or automation host embedding SWECircuit.
- Provider-neutral goal planner or policy compiler that proposes decomposition.
- Specialized agent profiles and runtime worker instances.
- V10 work-packet executors that perform assigned effects.
- Integration, verification, review, and memory owners.

## Goals

- Turn one bounded goal plus a selected circuit, module catalog, project context, and available agent capabilities into a portable orchestration plan or an explicit clarification/block outcome.
- Make decomposition proposals inspectable while keeping plan validation, capability matching, dependency readiness, conflict handling, fan-out, fan-in, and gate semantics deterministic in SWECircuit.
- Dispatch only dependency-ready, authority-compatible work through the V10 executor boundary without selecting an IDE, model, or provider in core.
- Preserve a bounded parent trace from goal through planning, assignment, execution evidence, integration gates, review, and memory candidates.
- Prove useful parallel acceleration without weakening integrated verification or owner control.

## Non-Goals

- Selecting models, providers, IDEs, pricing tiers, or reasoning effort.
- Installing LangGraph, AutoGen, CrewAI, Astraeus, Claude workflows, or another orchestration runtime.
- Treating an AI-generated proposal, agent profile, adapter manifest, or permission declaration as runtime authority.
- Implementing a process sandbox, worktree manager, credential broker, durable database, remote queue, automatic branch merge, or automatic memory mutation in V11.
- Proving that an arbitrary planner understood product intent; ambiguous or unsupported proposals must clarify or fail closed.
- Supporting unbounded recursion, speculative retries, self-spawning workers, or open-ended autonomous execution.

## Requirements

- R1: Accept bounded, detached input for a goal, selected circuit and modules, source baseline, project constraints, available agent profiles, orchestration policy, and a host-injected planner port.
- R2: Permit the planner to return either a closed decomposition proposal, bounded clarification questions, or a block reason. Invalid input or output must produce zero worker executions.
- R3: Compile a valid proposal into canonical assigned work packets, module-node bindings, dependency and join relationships, integration ownership, evidence requirements, and a deterministic schedule state.
- R4: Match required capabilities against machine-readable agent capabilities independently of model or provider metadata. Assignment must be stable, explainable, capacity-aware, and bounded by the packet authority ceiling.
- R5: Compute ready work from dependency state, circuit routes, join strategy, conflict zones, isolation declarations, approvals, and maximum concurrency. Within one serialized state history, a packet may be claimed once per attempt; a multi-process host must atomically persist the expected revision.
- R6: Parallel writes with overlapping scopes or conflict zones must be serialized or rejected unless the host declares distinct enforced isolation for every affected worker. Declarations do not prove enforcement.
- R7: Clarification and approval pauses must produce an inspectable `input_required` state, execute no newly blocked work, bind the response to the exact plan revision, and resume without replaying completed work.
- R8: A host must be able to execute ready assignments through V10 and feed normalized results back into a pure orchestration state transition. Failed, cancelled, timed-out, and `abort_unconfirmed` work must route explicitly; unconfirmed work must quarantine dependent integration.
- R9: Fan-in must honor `all` and `any` joins, require the declared integration owner, preserve worker-local evidence, and run integrated verification and review before completion.
- R10: The parent trace must connect goal, plan revision, module, packet, assigned agent, child execution result, gate outcome, clarification, and final disposition without storing full prompts, chats, raw command output, credentials, or hidden reasoning.
- R11: Core behavior must remain offline and IDE/model/provider agnostic. Two different host/executor fixtures given equivalent capabilities and results must produce the same compiled plan, ready sets, transitions, and parent trace.
- R12: Dogfooding must exercise at least four specialized work units, a real fan-out/fan-in path, a clarification gate, a worker failure, diagnosis routing, and serial-versus-parallel timing with equivalent final evidence.
- R13: Existing V9 and V10 validation, trace, initialization, packaging, and one-packet execution behavior must remain compatible.

## Acceptance Criteria

- [ ] AC1: Given a valid goal, selected circuit, module catalog, agent profiles, policy, and planner, when planning completes, then SWECircuit emits one immutable, schema-valid, fully linked orchestration plan or a typed clarification/block result.
- [ ] AC2: Given malformed, excessive, secret-bearing, incompatible, or ambiguous planning input or planner output, when planning is attempted, then it fails with stable diagnostics and invokes no worker executor.
- [ ] AC3: Given multiple eligible agents in shuffled input order, when capabilities are matched, then the same least-authority assignments and explanation codes are produced without inspecting provider or model identity.
- [ ] AC4: Given dependencies, fan-out, joins, conflict zones, isolation declarations, a concurrency ceiling, and serialized or atomic host state persistence, when readiness and claims are computed, then only safe packets appear in deterministic waves, stale revisions fail, and no committed state history claims one packet twice per attempt.
- [ ] AC5: Given overlapping write scopes without distinct enforced-isolation declarations, when a plan requests parallel execution, then SWECircuit serializes or blocks the work before invocation and records the reason.
- [ ] AC6: Given unresolved product intent or an approval gate, when planning or execution reaches that point, then the run becomes `input_required`, no newly blocked packet runs, and an exact-revision response resumes without replaying completed packets.
- [ ] AC7: Given V10 execution summaries for a ready wave, when the host applies them, then one pure transition advances dependencies, routes typed failures, quarantines `abort_unconfirmed`, and exposes the next ready wave or terminal disposition.
- [ ] AC8: Given `all` and `any` joins, when branch results arrive, then fan-in follows the declared strategy, preserves provenance, and cannot complete without integration-owner evidence plus integrated verification and review.
- [ ] AC9: Given a complete or interrupted run, when its parent journal is inspected, then goal, plan revision, module, packet, assignment, child execution, gate, clarification, and final state are reconstructable with bounded privacy-safe references.
- [ ] AC10: Given two host fixtures representing different IDE or agent runtimes but equivalent capabilities and outcomes, when the same plan is run, then canonical plans, schedules, state transitions, and traces are semantically identical.
- [ ] AC11: Given the V11 dogfood scenario, when safe independent work runs in parallel, then measured elapsed time improves over the serial control while integrated evidence and final outcome remain equivalent; a cascading failure switches to diagnosis rather than repeated patching.
- [ ] AC12: Given the complete V11 candidate, when canonical, schema, security, package-consumer, dogfood, and cross-platform gates run, then all prior behavior remains green and research, ADR, implementation, review, milestone, and memory form one traceable chain.

## Architecture Impact

This is a cross-kernel architecture change. It may add a portable agent-profile contract, planning and orchestration runtime types, deterministic scheduling semantics, parent-run trace events, diagnostics, public exports, fixtures, and package documentation. ADR 0003 must freeze the control-plane/execution-plane boundary, planning trust model, state machine, trace composition, compatibility strategy, and write-isolation rule before implementation.

## Risks

- A planner port can quietly become provider routing or move policy back into prompts.
- Free-form capability text can create nondeterministic or misleading assignments.
- Parallel writes can corrupt work when isolation is declared but not enforced.
- Combining child execution evidence into a parent trace can lose attribution or imply guarantees the host did not enforce.
- A scheduler can replay work, double-claim packets, deadlock joins, or let failed dependencies leak into integration.
- Too many artifact kinds or public operations can make the simple path harder to understand.
- Performance claims can become misleading if serial and parallel controls do not perform equivalent work.

## Open Questions

- Should agent profiles and orchestration plans become canonical artifact kinds, or should V11 emit existing Circuit and WorkPacket artifacts plus closed runtime summaries?
- How should a parent orchestration journal reference immutable V10 child journals without rewriting their evidence ownership?
- Which planner fields are advisory, and which deterministic compiler fields are authoritative?
- What exact tie-breaker best expresses stable least-authority matching without pretending capability quality is objectively ranked?
- How should enforced workspace isolation be asserted and later attested without making a declaration self-authorizing?
- Does the new event vocabulary require a new event type version, a machine API version change, or both?
- Which state must be persistable in V11, and which durable-resume behavior belongs in a later version?

## Assumptions

- V10 will be owner-approved before V11 acceptance, or this branch will be rebased and reverified against an approved replacement.
- The host continues to enforce credentials, sandboxing, workspaces, permissions, and external side effects.
- V11 uses deterministic planner and worker fixtures for canonical tests; no live provider is required.
- The selected circuit and module catalog are explicit inputs; automatic circuit discovery is deferred.
- The first write-enabled dogfood path may proceed only with disjoint scopes or a separately reviewed isolation adapter.
