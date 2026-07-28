# ADR 0007: Adaptive Host Orchestration

## Status

Accepted for the V14 release candidate on 2026-07-27.

## Context

V11 deterministically constructs task-specific specialists. V12 reconstructs dependency
eligibility and exact handoff fan-in. V13 proved those layers on a real application, but the human
host still selected every runtime, launched every agent, tracked status, moved evidence, and
rendered progress manually. The same run assigned high-effort frontier models without a
deterministic least-sufficient policy.

Current agentic IDEs expose model, effort, tools, skills, permissions, isolation, native subagent
launch, and lifecycle events in different shapes. A portable orchestration product needs to bind
those host capabilities to approved specialist demand without moving provider identities or
effects into the kernel.

## Decision Drivers

- Minimize cost and latency only after correctness and quality gates pass.
- Keep specialist task semantics independent from volatile runtime catalogs.
- Make every assignment, rejection, override, launch, route, and handoff inspectable.
- Reuse V11/V12 source-preserving contracts.
- Give Windows Codex Desktop a usable reference implementation.
- Avoid the failed universal scheduler scope preserved in ADR 0003.
- Preserve a simple serial path for small work.

## Decision

V14 adds a provider-neutral runtime assignment compiler, a pure adaptive run projection, a
portable RunView, and a Windows Codex Desktop reference adapter.

### Demand And Supply

Runtime demand is derived from an immutable V11 blueprint. Host supply is a separately signed-off
inventory of opaque profiles and supported efforts. Specialist contracts never contain provider
model IDs.

### Filter, Then Order

Assignment first filters all profile/effort candidates against capability, quality, context,
tool, skill, isolation, authority, availability, and independence requirements. It then orders
only feasible candidates by an explicit cost-first policy with a canonical tie-break.

This follows the useful scheduler separation between feasibility and scoring while replacing
environment-specific or random tie-breaking with deterministic identity.

### Quality Claims

Core does not infer that one named model is better than another. The host inventory references an
owner-reviewed calibration revision. "Least sufficient" means least costly among candidates whose
declared and calibrated supply satisfies the exact demand. Measured history may propose policy
changes but cannot silently mutate routing.

### Approval And Override

Approval binds the specialist compilation, package, inventory, policy, and assignment digests.
An owner override is a new immutable record, must remain feasible, and requires new approval.
Catalog drift or observed launch mismatch invalidates the launch path.

### Controller Boundary

The adaptive controller is a pure state and command projection over V11/V12 artifacts, assignments,
receipts, and verified handoffs. It does not reserve capacity, execute tools, authenticate hosts,
enforce permissions, create worktrees, merge, or persist durable state.

The host adapter performs native effects and reports bounded observations. Host claims remain host
claims; internal consistency checks do not turn them into independent proof.

### Codex Reference Host

The first adapter targets Windows Codex Desktop. It maps assignments to Codex agent profiles and
native spawn parameters, reuses native subagent visibility and steering, and captures exact result
bytes. The core interface remains usable by Copilot, VS Code, Claude Code, or another host adapter.

### RunView

One deterministic RunView projects modules, specialists, runtime choices, statuses, dependencies,
scopes, files, evidence, routes, decisions, and next actions. JSON is normative and Markdown is the
default chat rendering. A custom pinned graphical panel is not claimed without a supported IDE
extension surface.

## Rejected Alternatives

### Put model and effort in AgentBlueprint

Rejected because catalogs change and portable work semantics should survive host replacement.

### Let a model choose another model opaquely

Rejected because fixed inputs would not reproduce routing or explain cost and quality decisions.

### Always use the strongest model

Rejected because it wastes cost and latency and hides whether the task was scoped correctly.

### Rebuild ADR 0003's universal scheduler

Rejected because V14 needs assignment, native host commands, and visible evidence, not distributed
capacity, crash recovery, or provider process control.

### Build a custom IDE panel first

Rejected because native IDE lifecycle surfaces already exist and a portable source projection is
the prerequisite for any later UI.

## Consequences

- V14 can explain why each specialist received a runtime and whether a cheaper profile failed.
- Host inventories become security- and quality-relevant reviewed inputs.
- A Codex run becomes much less manual while core remains honest about external effects.
- The public API grows, so exact schema, packed-consumer, lifecycle, and adversarial review are
  release gates.
- Other IDEs require adapters, but not new decomposition or routing semantics.

## Source Evidence

- `docs/specs/v13-dogfood-validation/`
- `docs/specs/v14-adaptive-orchestration/`
- `docs/research/snapshots/2026-07-20-codex-subagent-profile-routing-scan.md`
- `docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md`
- ADR 0003, ADR 0004, ADR 0005, and ADR 0006

## Review Triggers

Revisit this decision if host inventories cannot state quality requirements credibly, real runs
route materially worse than a serial baseline, adapter observations cannot bind assignments, V12
cannot support bounded correction without mutation, or another IDE requires a different core
semantic rather than an adapter translation.
