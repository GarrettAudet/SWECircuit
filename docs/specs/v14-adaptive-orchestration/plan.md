# V14 Adaptive Orchestration Implementation Plan

## Status

Active.

## Summary

Extend the proven V11 compiler and V12 immutable session with two small layers: a pure runtime
assignment compiler and a pure host-control projection. Add a Windows Codex Desktop adapter that
materializes approved commands through native subagents, then prove the complete loop through
three increasingly demanding dogfoods.

## Impacted Areas

- `src/`: routing, assignment verification, controller, RunView, public exports, diagnostics.
- `schemas/v1alpha1/`: closed runtime-routing and host-control schemas.
- `test/`: unit, property-style determinism, lifecycle, security, and consumer coverage.
- `adapters/codex/`: Codex inventory, profile materialization, launch/observation translation.
- `docs/`: ADR, contracts, handbook, IDE guide, research, memory, and milestone.
- `scripts/`: V14 dogfood and release-review automation.

## Approach

1. Freeze ADR 0007 and the closed V14 contract before public API implementation.
2. Compile `RuntimeDemand` from approved V11 blueprints without adding runtime fields to them.
3. Filter host profiles by hard requirements, then score feasible profiles by one explicit ordered
   policy: cost, latency, permission/tool surplus, and canonical profile identity.
4. Bind selections, rejections, policy, source digests, calibration revision, and overrides into
   immutable assignments.
5. Project host commands from V12 package/session state plus assignment and launch evidence.
6. Render a portable JSON/Markdown RunView from the same source state.
7. Implement a Codex reference adapter around current native subagent primitives.
8. Dogfood the adapter; only then update public guidance and release evidence.

## Interfaces And Data

Planned public contracts:

- `RuntimeDemand`
- `HostCapabilityInventory`
- `RuntimeRoutingPolicy`
- `RuntimeAssignmentCompilation`
- `RuntimeAssignmentOverride`
- `HostLaunchCommand`
- `HostLaunchReceipt`
- `AdaptiveRunState`
- `AdaptiveRunInspection`
- `RunView`

Planned pure operations:

- `deriveRuntimeDemands`
- `compileRuntimeAssignments`
- `applyRuntimeAssignmentOverride`
- `verifyHostLaunchReceipt`
- `createAdaptiveRun`
- `restoreAdaptiveRun`
- `inspectAdaptiveRun`
- `recordHostLaunchReceipt`
- `recordAdaptiveHandoff`
- `renderRunView`

Names may be narrowed during exact contract review, but semantics and trust boundaries may not be
weakened without updating the spec and ADR.

## Architecture And ADR Impact

ADR 0007 is required because V14 adds a new public supply/demand boundary and the first host
adapter. ADR 0003 remains deferred evidence; V14 does not implement its universal scheduler.

## Security And Privacy

- Core accepts declarative inventory and observations but never grants permissions.
- Profile eligibility cannot widen blueprint authority or permission ceilings.
- Launch receipts are evidence records, not authentication or execution proof.
- Raw handoffs retain V11/V12 size, text-safety, secret, and source-preservation rules.
- RunView exposes references and bounded summaries, not secrets or full hidden transcripts.

## Rollback Or Recovery

V14 is additive on `codex/v14-adaptive-orchestration`. Existing V11/V12 APIs remain unchanged. A
failed host adapter can be removed while preserving the routing compiler and all dogfood evidence.
No V14 branch merges to `main` without exact-candidate verification, independent review, and owner
approval.

## Risks And Mitigations

- Risk: capability inventories become untrusted model marketing.
- Mitigation: require owner-reviewed calibration revision and avoid empirical superiority claims.
- Risk: catalog drift invalidates approval.
- Mitigation: bind inventory digest and require observed launch compatibility.
- Risk: host effects leak into core terminology.
- Mitigation: use command, observation, receipt, and projection vocabulary; test no-effect behavior.
- Risk: controller scope balloons.
- Mitigation: reuse V12 state, prohibit capacity reservation and universal crash recovery in V14.
- Risk: small tasks are slowed by ceremony.
- Mitigation: serial baseline and concise default RunView remain first-class acceptance cases.
