# V14 Runtime Routing Contract

## Status

Implemented for the V14 release candidate.

## Composition

```txt
AgentBlueprintCompilation
  | derive runtime demand
  -> RuntimeDemandSet
  | filter HostCapabilityInventory by hard requirements
  | order feasible profiles under RuntimeRoutingPolicy
  -> RuntimeAssignmentCompilation
  | owner approval or bounded override
  -> approved assignment
  | host adapter launch
  -> HostLaunchReceipt
  | V12 exact handoff verification
  -> AdaptiveRunInspection + RunView
```

## Trust Boundary

Core can prove deterministic derivation, validation, selection, identity, and consistency. It
cannot prove that a host profile has the quality it declares, that a launch happened, that a
permission was enforced, or that an observed native handle belongs to a real process. The host
owns those effects and records bounded observations. Approval remains external.

## Runtime Demand

Each demand is bound to one immutable blueprint and declares minimum portable requirements:

- capability IDs;
- reasoning tier and ambiguity tier;
- change and evidence risk;
- minimum context capacity;
- required tools and skills;
- required isolation and permission features;
- producer/checker independence constraints;
- latency preference and cost ceiling when supplied.

Demand derivation may use only approved goal, work-unit, blueprint, and owner-policy fields. It may
not inspect profile IDs or change requirements to make a candidate feasible.

## Host Capability Inventory

An inventory has a host ID, adapter ID and revision, catalog revision, calibration revision,
concurrency limit, and a bounded set of opaque profiles. Every profile declares:

- profile ID and runtime family;
- supported reasoning efforts;
- calibrated capability tiers;
- available tools and skills;
- context capacity;
- isolation and permission features;
- ordinal cost and latency ranks;
- reviewer-independence domain;
- availability status.

The inventory is immutable input and content-digest bound. Unknown fields, duplicate identities,
unsafe text, unsupported scales, and excessive input fail closed.

## Selection

Selection has two phases.

### Filter

A profile/effort candidate is rejected when it misses any hard requirement. Rejections are
complete and machine-readable. Required initial categories are capability, effort, context, tool,
skill, isolation, permission, independence, availability, cost ceiling, and host concurrency.

### Order

Feasible candidates are ordered by:

1. lower ordinal cost rank;
2. lower ordinal latency rank;
3. lower excess capability;
4. lower excess context;
5. fewer excess tools and skills;
6. lower reasoning effort;
7. canonical profile and effort identity.

The policy and every comparator value are included in the compilation. Runtime quality is a hard
gate, never a soft trade for price.

## Override

An override references the original assignment digest, selected blueprint and demand, replacement
profile/effort, owner identity, and rationale. Core reruns every hard gate. A valid override emits a
new assignment compilation and digest; it never mutates the original. An invalid override returns
the same rejection vocabulary as normal routing.

## Launch And Observation

An approved host launch command contains exact blueprint, package, assignment, adapter, workspace,
and bounded authority references. A launch receipt contains the exact command digest, observed
profile/effort/tools/skills, native handle, host outcome, and bounded host evidence.

A receipt mismatch routes to `block` or `diagnose`; it never silently substitutes a profile.
Receipt verification proves internal consistency only.

## Adaptive Controller

The controller wraps, rather than replaces, V12:

- V12 remains the source of dependency eligibility and accepted handoffs.
- Assignment approval and a valid launch receipt are required before a handoff may settle.
- One serialized integration owner applies immutable transitions.
- Typed non-pass handoffs retain workflow semantics.
- Escalation requires an explicit route, bounded attempts, and a newly approved assignment.
- Missing capability, authority, context, tool, skill, or independence routes to correction, not a
  stronger model.
- No controller output claims running, launch, merge, review, or memory effects without a matching
  host observation or verified artifact.

## RunView

RunView is a deterministic projection with:

- goal, workspace version, host, predecessor, stage, outcome, and next action;
- module/work-unit ownership and dependencies;
- specialist, selected profile/effort, selection reason, override, and native status;
- read/write scopes and files reported in exact handoffs;
- evidence duties, accepted evidence, routes, blockers, and remaining gates;
- source artifact references and digests.

JSON is normative. Markdown is a concise human rendering. Both are derived only from a closed,
digest-valid `AdaptiveRunInspection`, must survive restore, reject unsafe display text, and must
not include secrets, hidden prompts, or full transcripts by default.

## Host Adapter

An adapter implements inventory collection, command materialization, launch observation,
lifecycle observation, steering, stopping, result capture, and evidence persistence. Adapter
failure cannot mutate kernel state. The Codex adapter maps project-local agent definitions and
native spawn controls; future adapters may map materially different host primitives.
