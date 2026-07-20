# Codex Subagent Profile Routing Scan

## Snapshot Date

2026-07-20.

## Purpose

Evaluate `nsEytgXm/subagents_configs` and current Codex subagent configuration practices against SWECircuit's goal: compile task-specific specialists, assign an appropriately capable runtime, and let an IDE spawn them without making the core depend on one provider, model catalog, or host.

This snapshot records a next-version architecture direction. It does not install the linked repository, copy its agent profiles, or widen the active V12 release candidate.

## Conclusion

The projects overlap at the subagent boundary but solve different layers:

| Layer | `subagents_configs` | SWECircuit |
| --- | --- | --- |
| Work decomposition | Routing guidance for a fixed role catalog | Goal-derived atomic work units with dependencies, authority, evidence, and stop conditions |
| Specialist definition | Static Codex TOML profiles | Task-specific, immutable Specialist Agent Blueprints |
| Runtime choice | Model and reasoning effort pinned per profile | Provider-neutral runtime demand matched against host-reported capabilities |
| Execution | Codex-native delegation | Host-owned effect behind a portable assignment and receipt contract |
| Traceability | Instructions and local configuration | Digest-bound compilation, approval, handoff, verification, and integration evidence |

`subagents_configs` is therefore a useful Codex adapter reference, not a replacement for SWECircuit and not a core dependency.

## Primary Sources

| Source | Current Practice Observed | SWECircuit Use |
| --- | --- | --- |
| OpenAI Codex subagents | Project or user agent profiles can set distinct models, reasoning effort, sandbox policy, skills, and MCP access; unpinned profiles can inherit host-selected defaults | Treat the IDE's current catalog as runtime supply and preserve IDE-native spawning |
| `nsEytgXm/subagents_configs` | Installs a fixed catalog of Codex roles, assigns model and effort per role, and adds cost-aware delegation, ownership, validation, and repair-loop guidance | Reference for an optional Codex adapter and a cost-first selection policy |

## Source Links

- OpenAI Codex subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents.md
- Portable Codex subagents repository: https://github.com/nsEytgXm/subagents_configs
- Repository routing rules: https://github.com/nsEytgXm/subagents_configs/blob/main/routing-rules.md
- Repository agent profiles: https://github.com/nsEytgXm/subagents_configs/tree/main/agents

## Accepted Architecture Direction

Keep specialist semantics and runtime selection as two explicit compilations:

```txt
goal
  -> work units
  -> SpecialistAgentBlueprints
  -> RuntimeDemands
  -> host capability inventory
  -> reviewed runtime assignments
  -> IDE-native subagent spawn
  -> verified handoffs
```

### Portable Runtime Demand

Each blueprint should derive a provider-neutral runtime demand. The demand describes minimum capability rather than a model name:

- reasoning tier and ambiguity;
- change risk and required review independence;
- context and tool requirements;
- latency and cost preference;
- required sandbox or permission features.

### Host Capability Inventory

The IDE or execution adapter supplies a bounded inventory of currently available models, effort levels, tools, context limits, isolation features, and optional cost or latency classes. Core must not assume that a model identifier or effort scale exists on every host.

### Deterministic Assignment

A pure assignment function should evaluate eligible runtime profiles, reject profiles that miss hard requirements, and select among the remainder using an owner-visible optimization policy. The result must expose:

- the exact demand and inventory revisions;
- the selected model/profile and effort level;
- rejected alternatives and reason codes;
- the optimization policy and selection reason;
- a content digest for approval and launch binding.

Correctness, authority, context capacity, tool support, and requested producer/checker independence remain hard gates. Cost and latency optimize only among capable choices.

### IDE Adapter And Trace

A Codex or ChatGPT Desktop adapter may translate an approved assignment into project-local `.codex/agents` configuration or an IDE-native subagent spawn call. The host remains responsible for availability checks, process execution, permissions, workspace isolation, and raw result persistence.

The run trace should bind the approved assignment to the observed host, model/profile, effort level, contract digest, launch receipt, and verified handoff. A user override creates a new reviewed assignment; it must not silently mutate the compiled specialist.

## Practices Rejected Or Deferred

| Practice | Status | Reason |
| --- | --- | --- |
| Provider or model identifiers in Specialist Agent Blueprints | Rejected | Makes the portable work contract host-specific and stale when catalogs change |
| Fixed generic roles as the decomposition contract | Rejected | A task-specific specialist must be shaped by its exact objective, scope, evidence, dependencies, and authority |
| Opaque or self-modifying model router | Rejected | Selection must remain inspectable, deterministic for fixed inputs, owner-overridable, and trace-bound |
| Installing `subagents_configs` in core | Rejected | Its Codex-specific profiles are useful adapter examples but are not portable framework semantics |
| Automatic policy learning from run history | Deferred | Evidence may produce reviewable policy proposals only after assignment quality can be measured safely |

## Proposed V13 Acceptance Scenario

Given one meaningful goal, SWECircuit should:

1. Compile optimized, task-specific specialist blueprints.
2. Derive the minimum runtime demand for every blueprint.
3. Read the active IDE's supplied capability inventory.
4. Show the selected model/profile and effort for each specialist, including rejected alternatives and reasons.
5. Bind owner approval to exact specialist and assignment digests.
6. Let the IDE spawn those specialists through its native subagent interface.
7. Preserve launch and handoff evidence so the final integration trace explains who did what, with which runtime, and why.
8. Fail closed or request clarification when no available runtime satisfies a hard requirement.

## Adoption Gate

Promote this direction into a public contract only after:

- a separate version feature package and ADR define the core/adapter boundary;
- primary-source scans cover at least two materially different IDE or agent hosts;
- tests prove deterministic assignment, hard-gate rejection, explicit override, catalog drift, and independent-review constraints;
- one-agent use stays simple when no subagents are requested;
- a ChatGPT Desktop or Codex dogfood run launches at least two differently scoped specialists and reconstructs the complete assignment-to-handoff trace;
- independent API, lifecycle, security, and usability review passes.