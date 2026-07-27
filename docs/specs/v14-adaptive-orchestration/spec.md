# V14 Adaptive Orchestration

## Status

Active.

## Problem

V13 proved that SWECircuit can compile a task-specific specialist team, preserve dependency-safe
parallel work, verify exact handoffs, and produce a high-quality application. The host loop was
still manual: a human selected model and effort, translated contracts into IDE launches, tracked
native agents, copied evidence, and reconstructed progress. That ceremony is too slow and it can
silently over-provision expensive models.

SWECircuit needs a small orchestration product that keeps the kernel portable while allowing an
agentic IDE to choose the least costly runtime that satisfies each specialist's quality,
capability, authority, context, tool, skill, and independence requirements.

## Users Or Actors

- A developer who gives one software goal to an agentic IDE.
- The integration owner who approves or overrides runtime assignments.
- Task-specific specialist agents and independent reviewers.
- A host adapter that inventories and launches native IDE agents.
- The provider-neutral SWECircuit kernel that compiles and verifies decisions.

## Goals

- Compile provider-neutral runtime demand from every approved specialist blueprint.
- Select the least costly feasible runtime profile and effort deterministically from a
  host-supplied inventory.
- Preserve rejected alternatives, reasons, policy, approval identity, overrides, launches, and
  handoffs in one execution trace.
- Expose dependency-safe next actions and a concise live RunView without claiming hidden effects.
- Ship a Windows Codex Desktop reference adapter while keeping core contracts IDE-, model-, API-,
  and provider-neutral.
- Prove the system through small, medium, and high-risk dogfood runs.

## Non-Goals

- A universal distributed scheduler, hosted control plane, or provider marketplace.
- Empirically ranking model quality without owner-reviewed calibration evidence.
- Injecting a custom pinned panel into an IDE that exposes no extension hook.
- Silently changing policy from run history.
- Supporting macOS or Linux in the first release.
- Automatically merging or publishing without owner approval.

## Requirements

- Runtime demand is derived from immutable specialist semantics and contains no provider model ID.
- Host inventories use opaque profile identifiers and declare capabilities, efforts, tools,
  skills, context capacity, isolation, permission support, concurrency, and cost/latency ranks.
- Routing hard-gates correctness, context, authority, tools, skills, isolation, and requested
  producer/checker independence before optimizing cost and latency.
- Fixed inputs produce byte-identical assignments with explicit rejected alternatives and stable
  reason codes.
- No feasible profile returns a typed fail-closed result with actionable unmet requirements.
- An owner override creates a new digest-bound record and cannot bypass a hard gate.
- Launch receipts bind the exact assignment, blueprint, adapter, observed runtime, and native
  handle. Host observations never become kernel-created facts.
- The run controller is a pure projection over approved packages, assignments, receipts, and V12
  run sessions. It emits bounded next commands but performs no host effect.
- The Codex adapter can translate assignments into native subagent launches with explicit model
  and reasoning effort, observe lifecycle state, and preserve exact results.
- Escalation occurs only after typed evidence failure, diagnosis, or liveness failure and creates
  a new trace-bound assignment. Permission or contract failures never escalate model strength.
- RunView shows modules, agents, assignments, status, dependencies, file scopes, evidence, routes,
  blockers, decisions, and next action in JSON and concise Markdown.
- Single-agent work remains a valid baseline and does not require artificial fan-out.

## Acceptance Criteria

- [x] **AC1:** Fixed blueprint, demand policy, inventory, and calibration inputs compile to a
      byte-stable runtime assignment and digest.
- [x] **AC2:** Every selected runtime satisfies all hard requirements; every rejected profile has
      stable machine-readable reasons.
- [x] **AC3:** Among feasible profiles, the selected profile is least costly under the declared
      ordered policy with a canonical deterministic tie-break.
- [x] **AC4:** An empty feasible set fails closed and identifies every unmet hard requirement
      needed for owner or host correction.
- [x] **AC5:** Owner override is visible, digest-bound, auditable, and rejected when it would bypass
      a hard gate or independence constraint.
- [x] **AC6:** A launch receipt proves which exact approved assignment the host attempted and what
      runtime it observed without asserting that core executed the launch.
- [x] **AC7:** The controller exposes only dependency-eligible launches, verified settlements,
      typed routes, bounded escalations, and integration/review actions.
- [x] **AC8:** Codex Desktop launches at least two differently scoped specialists with different
      least-sufficient model or effort assignments in a real dogfood run.
- [x] **AC9:** RunView reconstructs current state and links exact contracts, files, evidence,
      routing decisions, overrides, and blockers after serialization and restore.
- [ ] **AC10:** Small, medium, and high-risk dogfoods demonstrate correct decomposition, maximum
      safe parallelism, recovery, verified fan-in, independent review, and memory update.
- [ ] **AC11:** Canonical verification, packed-consumer checks, security review, API review,
      lifecycle review, and usability review pass on the exact release candidate.
- [ ] **AC12:** Public docs make the one-goal workflow, host boundary, Windows support, and current
      limitations understandable without reading internal protocols.

## Architecture Impact

This adds a public runtime-routing contract, host-command protocol, RunView projection, Codex
reference adapter, schemas, diagnostics, exports, and release evidence. ADR 0007 governs the
boundary. V11 specialist identities and V12 immutable sessions remain authoritative and additive.

## Risks

- Host-declared capability labels could overstate real model quality.
- Runtime catalogs and supported efforts can drift between approval and launch.
- An orchestration layer could accidentally imply effects that only the host performed.
- Over-routing could cost more than a strong serial baseline.
- Weak launch observations could bind the wrong model, effort, tools, or agent.
- A broad scheduler design could repeat the V11 control-plane failure.

## Open Questions

None block contract implementation. A custom pinned Codex UI remains contingent on a documented
extension surface; V14 will use the IDE's native subagent panel plus a portable RunView.

## Assumptions

- Hosts can supply a reviewed capability inventory and stable opaque profile IDs.
- Codex Desktop exposes native subagent launch, status, steering, stopping, model, and effort
  controls through the current host tools.
- Cost and latency are ordinal owner/host rankings, not provider prices embedded in core.
- The integration owner remains the sole authority for final integration, merge, and release.
