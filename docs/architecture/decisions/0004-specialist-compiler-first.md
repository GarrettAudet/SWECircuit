# ADR 0004: Specialist Compiler First

## Status

Proposed on 2026-07-15. This decision replaces the V11 implementation target in ADR 0003; ADR 0003 remains preserved as deferred runtime-control-plane design evidence.

## Context

V9 validates portable workflow artifacts and traces. V10 bounds one host-selected work-packet execution. The owner-priority gap is earlier: given one software goal, SWECircuit must construct the smallest useful roster of exact task-shaped agents, expose why that roster was selected, and give any IDE a provider-neutral package it can materialize.

Four independent review rounds found that the original V11 design coupled this capability to a universal scheduler, callback protocol, restart state machine, repository attestation, and merge-evidence API. That coupling produced a roughly 200,000-byte contract, repeated architecture failure, and no usable specialist construction.

## Decision Drivers

- Produce immediate IDE-agnostic value from the repository itself.
- Optimize concrete task ownership rather than route work to vague roles.
- Make the reviewed roster identical to the roster an IDE may launch.
- Preserve a strong one-agent baseline while selecting parallel teams only when they improve the declared objective or satisfy independent evidence requirements.
- Keep runtime profiles, models, providers, prompts, credentials, sandboxes, and process control outside the portable compiler.
- Retain deterministic, inspectable, source-preserving decisions.

## Decision

V11 ships a standalone, built-in Specialist Compiler before the runtime control plane.

The visible path is:

```txt
user goal
  | IDE/human goal synthesis
  -> GoalContract with atomic work units and owner ceilings
  | construct and evaluate team partitions
  -> AgentBlueprintCompilation
  | render provider-neutral specialist package
  -> exact agent contracts + launch manifest + integration contract
  | external IDE or agent host
  -> execution evidence and handoffs
```

### Semantic Boundary

An IDE or human performs product clarification and decomposes the goal into stable atomic work units. Each work unit declares its objective, Module binding, effort weight, dependencies, context uses, scope, capability demand, permission demand, evidence duties, handoff artifacts, and stop conditions.

Core does not invent product requirements or hidden semantic tasks. It does independently construct legal ways to group those work units into specialists, validates optional owner- or IDE-proposed alternatives, and selects one team under a fixed deterministic objective.

### Exact And Bounded Search

For goals at or below the declared exact-search work-unit limit, core evaluates every canonical set partition allowed by the owner agent ceiling. For larger goals, core evaluates a deterministic bounded structural candidate set plus any valid supplied candidates. The compilation states which mode ran, the search counts, and a digest of the ordered evaluation set. It never claims a global optimum for bounded search.

### Hard Gates

A candidate is eligible only when:

- every work unit appears exactly once;
- the resulting agent dependency graph is acyclic;
- owner Module, context, scope, capability, permission, agent, and concurrency ceilings are respected;
- every acceptance evidence requirement has exactly one owning work unit;
- every required independent verification or review duty is assigned outside its producer agent;
- context references bind an approved locator, expected SHA-256 digest, byte count, read scope when applicable, and declared use;
- no blueprint depends on runtime profile, provider, model, prompt, executor, or credential fields.

### Optimization Order

Eligible candidates are ordered by:

1. Lower deterministic projected makespan, including declared agent-start and cross-agent handoff costs.
2. Fewer conflict pairs.
3. Fewer cross-agent dependency handoffs.
4. Fewer duplicated context bytes.
5. Fewer duplicated permission scopes.
6. Fewer agents.
7. Canonical partition identity.

Correctness, authority, evidence coverage, and requested independence are hard gates rather than soft scores. The serial baseline is always evaluated. More agents do not win unless the ordered objective justifies them.

### Compiled Specialists

The selected partition compiles into one immutable `AgentBlueprint` per specialist. Each blueprint contains exact work-unit ownership, objective, Module actions and ports, dependencies, context uses, scopes, capabilities, permissions, evidence duties, handoff, and stop conditions. Generic role labels are not an input or output contract.

`AgentBlueprintCompilation` binds the GoalContract, derived `TaskAuthorityProjection`, search evidence, selected candidate, retained alternatives, exact blueprints, launch waves, and compilation digest. `renderSpecialistPackage` emits deterministic files whose manifest binds that digest. A host must launch that reviewed compilation or compile again and obtain a new review.

### Host Boundary

The IDE or host chooses model, provider, runtime, credentials, workspace isolation, process scheduling, retries, persistence, and merge mechanics. It may translate one blueprint into provider-specific transient instructions but may not widen its authority or alter its evidence and handoff contract.

## Deferred

- Universal `runGoal` facade and parent orchestration event vocabulary.
- Runtime profile matching, capacity reservation, wave claims, and dispatch captures.
- Durable pause/resume, provisional joins, cancellation, retries, and crash recovery.
- Repository-state attestation, merge-ready evidence, and durable memory mutation.
- Provider, model, price, prompt, or executor selection.

The Round-4 correction record remains mandatory input before any deferred runtime layer is implemented.

## Alternatives Considered

### Keep the universal runtime in V11

Rejected for this version. Four review rounds showed that the coupled surface delayed the independent capability the owner needs first.

### Emit generic roles and let the IDE fill details

Rejected. It produces non-auditable routing, inconsistent context and authority, and no stable basis for optimization or handoff.

### Require an external orchestration framework

Rejected. The compiler is a core portable contract. Optional adapters may propose work units or materialize blueprints later.

### Always use one agent per work unit

Rejected. It over-splits small goals, duplicates context and authority, and increases handoffs without guaranteed speed or quality benefit.

## Consequences

- V11 becomes smaller, independently useful, and testable through any IDE.
- Product decomposition remains a semantic IDE/human responsibility, but team construction and selection become deterministic core behavior.
- Small goals receive exact partition search; larger goals receive honest bounded optimization.
- The later runtime layer starts from reviewed compiled demand instead of vague roles.
- V11 does not yet execute, schedule, sandbox, merge, or update memory automatically.

## Source Evidence

- `docs/specs/v11-orchestration-planner/architecture-review-round-4.md`
- `docs/specs/v11-orchestration-planner/revision-5-correction-design.md`
- `docs/specs/v11-specialist-compiler/`
- `docs/modules/specialist-agent-compiler.md`
- ADR 0001, ADR 0002, and preserved ADR 0003

## Review Triggers

Revisit this decision if real dogfood shows that atomic work units cannot be expressed without provider data, the deterministic objective repeatedly selects worse teams than the serial baseline, bounded search hides material alternatives, or a runtime layer requires widening compiled task demand.
