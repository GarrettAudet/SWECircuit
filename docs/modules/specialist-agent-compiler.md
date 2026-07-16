# Specialist Agent Compiler

## Status

V11 candidate. This is a built-in, provider-neutral SWECircuit capability rather than an optional download. The file contract exists now; deterministic kernel compilation and runtime evidence remain pending.

## Purpose

Turn each bounded software-work packet into one task-specific agent blueprint. A blueprint defines the exact specialist needed for that invocation; it is not a generic role label, model preset, or provider configuration.

```txt
goal + module + work packet + context + policy
  | specialist_agent_compiler
  -> AgentBlueprint
```

## Distinction

- `AgentProfile` states what an available host worker can execute.
- `AgentBlueprintIntent` records the semantic context uses and specialization claims proposed for one concrete task.
- `AgentBlueprint` states exactly what this invocation requires.
- `Assignment` binds one blueprint to one compatible profile, slot, executor, and grant.
- `AgentMaterializationReceipt` attests what the host configured before dispatch.

The host may materialize the same blueprint through Codex, Claude Code, Cursor, Copilot, a local process, or another adapter without changing its software-work semantics.

## Built-In Boundary

The repository supplies this portable synthesis contract plus the reference `docs/ide/specialist-agent-kickoff.md` entrypoint, and V11 exposes an independently callable pure `compileAgentBlueprints` compiler and validator. `compilePlan` reuses that exact implementation before adding runtime-supply compatibility. The active IDE or an optional policy-compiler adapter supplies semantic proposal judgment inside the approved PolicyBundle. An execution adapter only materializes an accepted blueprint. No external framework is required, and neither adapter can redefine authority, gates, acceptance, evidence, or completion.

## IDE Kickoff

When a user says "use SWECircuit for this task," the IDE agent first selects applicable modules and a Circuit shape from the repository's owner-approved catalog, records low-risk assumptions, and materializes the candidate PolicyBundle before `runGoal(start)`. Existing allowlisted modules may be composed automatically within repository policy. A new module, gate, route, authority grant, public-behavior decision, or destructive/security-sensitive capability requires explicit owner approval. The IDE records the decision and maps it to the exact GoalContract, PolicyBundle, or RunAuthority field that reflects it; the structured launch input, not the noncanonical note, is the binding contract.

The immutable execution planner never silently invents those contracts after start. This keeps the visible experience one message while preserving a reviewable authority boundary.

## Input

- Goal and acceptance criteria.
- Selected Circuit node and Module.
- Concrete WorkPacket and artifact-port bindings.
- Repository baseline and exact context references.
- Policy, authority, permissions, scopes, independence constraints, and supply-free TaskAuthorityProjection.
- Required evidence, verification, review, handoff, and stop conditions.

## Action

The semantic compiler first creates a serial baseline and, when independent deliverables exist, one or more legal parallel candidates. It compares them after hard constraints using exact structural measurements, expected critical-path benefit, context and permission surplus, conflict exposure, handoffs, coordination cost, and independent review. It then proposes the selected narrowed WorkPackets and one address-bound `AgentBlueprintIntent` per prospective invocation within the host-approved PolicyBundle. Each intent supplies explicit context uses and specialization reasons. Core validates those semantic inputs, derives every remaining field, and compiles exactly one `AgentBlueprint` per concrete Plan invocation. Core never invents semantic intent; the planner cannot invent authority, acceptance policy, gates, routes, or runtime identity.

Every blueprint binds:

- One exact objective, source WorkPacket, AgentBlueprintIntent, and supply-free TaskAuthorityProjection.
- One Module action and concrete input/output ports.
- Required capabilities and node function.
- Included, excluded, read, write, and conflict scopes.
- The smallest source-preserving context set claimed sufficient for the task.
- Exact permissions and prohibited effects.
- Dependencies, activation conditions, and independence requirements.
- Acceptance criteria and qualified evidence bindings it owns.
- Required verification and review evidence.
- Handoff destination and required handoff fields.
- Stop, clarify, diagnose, split, and block conditions.

An agent name such as `frontend`, `backend`, `tester`, or `reviewer` does not satisfy the contract by itself.

## Output

- A serial baseline, reviewed candidate comparison, and selected specialist roster.
- One validated `AgentBlueprintIntent` and one immutable `AgentBlueprint` per concrete Plan invocation.
- One core-derived `AgentOptimizationRecord` for the complete decomposition.
- Exact blueprint-to-invocation, evidence, handoff, context-use, and matching inputs.
- A visible roster that an IDE can present before execution without exposing provider prompts or hidden reasoning.

## Optimization Objective

Optimization occurs at four distinct layers: decompose the goal into independently verifiable work; specialize each blueprint to the smallest sufficient context, authority, and tool capability; place blueprints onto compatible runtime capacity; then compare accepted outcomes and coordination cost so reviewed learning improves later proposals. Hard correctness, authority, acceptance, and integration constraints are satisfied first. The semantic synthesizer uses this ordered, host-reviewed objective:

1. Seek high-value dependency-ready, conflict-safe work and record the expected benefit against a named baseline.
2. Keep independently verifiable deliverables in separate packets when that shortens the critical path.
3. Minimize overlapping write scopes and shared conflict zones.
4. Minimize context and permission surplus for each blueprint.
5. Minimize cross-agent dependencies, handoffs, and duplicated evidence.
6. Prefer fewer agents when another agent adds no safe parallelism or independent quality evidence.

The feature package names a baseline, alternatives considered, expected benefit, and unavoidable constraints. These are host-reviewed semantic objectives, not a core proof of global optimality. Core recomputes exact structural measurements and performs exact maximum-cardinality profile assignment only after a deterministic bounded conflict-safe wave has been selected. Provider, model, price, prompt style, and hidden quality scores never enter core selection.

## Gate

`compileAgentBlueprints` passes only when every reachable invocation has one complete task-shaped blueprint, no blueprint relies on a role label as its contract, every context item has a declared use and target, parallel packets are conflict-safe, acceptance and integration coverage are total, and the resulting handoffs can be reduced deterministically. This pure gate is supply-free and never inspects runtime profiles. `compilePlan` may proceed to execution planning only when every fixed blueprint is compatible with at least one allowed AgentProfile; missing permanent supply routes to `block` without mutating blueprint demand.

Route to:

- `clarify` when product intent or required context is insufficient.
- `split` when a goal has independently verifiable deliverables but the current policy lacks a legal decomposition.
- `redesign` when modules, graph structure, authority, or integration cannot support a sound plan.
- `block` when no allowed profile can execute a required blueprint.

## Outcome

`pass`, `clarify`, `split`, `redesign`, or `block`.

## Runtime Materialization

An execution adapter receives the immutable blueprint, WorkPacket, ticket, and grant. It may render provider-specific instructions or tool configuration transiently, but it cannot widen the blueprint, omit required evidence, or persist prompts and hidden reasoning in the canonical trace. Before dispatch it supplies a bounded host-attested `AgentMaterializationReceipt` binding the blueprint, delivered context/capabilities/ports/constraints, adapter version, grant, and attestor without retaining provider text.

## Evidence

- Blueprint digest linked from Plan, Assignment, ticket, result, and parent trace.
- Intent, TaskAuthorityProjection, and AgentMaterializationReceipt bindings.
- Context, scope, permission, capability, criterion, evidence, and handoff closure checks.
- Assignment and wave-selection proof.
- Integrated verification showing the specialist output satisfies its owned contract.
- Serial-versus-parallel accepted-work comparison plus one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role golden baselines.

## Artifacts

- Preserved GoalContract, PolicyBundle, WorkPacket, and context source references.
- AgentBlueprints and AgentOptimizationRecord inside the immutable Plan.
- Assignment, ticket, result, verification, handoff, and trace bindings to each blueprint digest.
- Dogfood measurements and review findings used to improve later compiler versions.

## Learning Loop

After a completed run, compare the optimization record with accepted outputs, failures, diagnosis paths, elapsed time, and coordination overhead. Emit source-linked MemoryProposals for useful patterns and failed approaches. Only reviewed MemoryCandidates may become retrieval input for a later compilation; the compiler never mutates its own policy, prompts, or authority.

## Adapter

Astraeus or another policy compiler may implement semantic role and packet synthesis. IDE and agent runtimes may implement blueprint materialization. Neither adapter owns SWECircuit policy, authority, gates, evidence semantics, or completion.
