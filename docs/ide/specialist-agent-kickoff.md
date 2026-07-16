# Specialist Agent Kickoff

## Status

V11 reference IDE capability. The portable file contract is proposed in revision 4; executable kernel support and cross-IDE evidence remain pending.

## Purpose

Turn one user message into a visible, reviewable launch package for SWECircuit without requiring the user to hand-author GoalContract, PolicyBundle, or specialist-agent inputs.

```txt
user message + repository context + approved catalog
  | synthesizeGoal
  -> candidate specialist teams + serial baseline
  | compileAgentBlueprints
  -> exact reviewed specialist roster
  | runGoal(start)
  -> assigned workers + evidence trace
```

`synthesizeGoal` is the human-facing IDE entrypoint. `runGoal` remains the structured, deterministic kernel boundary. The user's free-form message and model reasoning stay outside canonical orchestration roots and events.

## Input

- The user's goal in the active IDE conversation.
- README, AGENTS.md, handbook, active feature package, architecture, and durable memory.
- The owner-approved Module and Circuit catalog.
- Repository policy, baseline, authority ceilings, and available host capabilities.

## Action

1. Restate the goal and derive testable acceptance criteria.
2. Select only existing owner-approved Modules and a compatible Circuit shape.
3. Record every low-risk assumption and every unresolved product or architecture decision.
4. Build a serial baseline and, when the goal has more than one independently verifiable deliverable, at least one conflict-safe parallel candidate.
5. Define one address-bound AgentBlueprintIntent per prospective invocation. Each intent must name the exact deliverable, artifact ports, justified context uses, capability demand, least authority, dependencies, proof obligations, handoff, and stop conditions. A generic role label is invalid.
6. Compare candidates after hard correctness, authority, acceptance, and integration constraints pass. Record structural metrics, expected critical-path benefit, context and permission surplus, conflict zones, handoffs, coordination cost, and an independent semantic review.
7. Select the fewest agents that preserve the strongest safe concurrency and independent quality evidence. More agents are never treated as inherently better.
8. Ask one focused owner question before adding a novel module, gate, route, authority grant, public-behavior decision, destructive action, or security-sensitive capability.
9. Record each required owner decision in `goal-synthesis.md` and map it to the exact GoalContract, PolicyBundle, or RunAuthority field that reflects the choice. The decision record is noncanonical; the launched structured values and their digests are the binding contract.
10. Materialize the selected GoalContract, PolicyBundle, RunAuthority request, profile requirements, PlanProposal inputs, and detached WorkPackets. Use the pure `compileAgentBlueprints` operation for deterministic preview/conformance and `runGoal(start)` for execution.

The IDE may use its active model for semantic judgment. It may not silently invent authority, acceptance ownership, gates, routes, completion policy, or a claim of global optimality.
## Output

Create `goal-synthesis.md` in the active feature package with:

- Goal and criterion IDs.
- Selected Modules and Circuit with source references.
- Recorded assumptions plus a decision-to-launched-field map for every required owner decision.
- Requested authority and capability supply.
- WorkPacket roster and dependency/conflict map.
- AgentBlueprintIntent roster with context-use and specialization claims.
- Serial baseline, candidate comparison, exact structural metrics, selected roster, expected benefit, coordination cost, and unavoidable constraints.
- Verification, review, integration, memory, and stop paths.
- Exact handoff status to `runGoal(start)`: `ready`, `clarify`, `redesign`, or `block`.

## Gate

Proceed only when the launch package is complete, every selected contract is approved, every intent is task-shaped rather than role-shaped, every context item has a declared use and target, every agent owns independently checkable evidence or necessary serial work, and no unresolved decision could change public behavior, architecture, authority, security, or verification.

## Evidence

- One-message fixture that reaches a ready launch package without manual artifact assembly.
- Novel/high-risk fixture that stops for exactly one focused owner decision before effects.
- Two IDE-host fixtures that produce equivalent portable launch semantics from the same accepted inputs.
- Golden specialization tasks covering one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role baselines, with the generic-role candidate rejected unless completed into exact task demand.

## Adapter Boundary

This repository file is the provider-neutral reference capability. Codex, Claude Code, Cursor, Copilot, and other IDEs may wrap it in skills or commands, but those adapters cannot change the launch artifact, owner gate, AgentBlueprintIntent, or kernel contracts.
