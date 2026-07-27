# Codex Desktop Adaptive Run

Windows reference flow for the V14 Revision 2 Codex Desktop adapter.

## Before Launch

Verify the approved V11 package and runtime assignment against trusted external expectations. Keep
these exact identities:

```txt
goal:        v14.adaptive-orchestration.vertical-slice / revision 1
goalDigest:  sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a
agent:       agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd
blueprint:   sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c
compilation: sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614
destination: codex.main
work unit:   implement.codex-adapter
artifact:    codex-adapter-evidence.md (text/markdown)
```

`HostLaunchAuthorization.command` carries the exact contract path, digest, byte count, context
delivery, selected profile and effort, required tools and skills, isolation features, blueprint
permissions, and observability. No host may add a fallback or widen a permission.

## Event Chain

Every event is exact raw UTF-8 JSON, retained with raw byte count and SHA-256 digest. Serialize one
run-wide sequence starting at `1`; `priorEventDigest` is null only for sequence one. Bind every
event to run, revision, agent, blueprint, assignment, host, adapter, adapter revision, and
attestor.

1. Emit `HostLaunchAuthorization` with `attemptId`, `authorizationId`, workspace baseline digest,
   and the complete `HostLaunchCommand`.
2. Emit `HostMaterializationClaim` with the native Codex handle and exactly one field, in order:
   model, effort, tools, skills, isolation, permissions, workspace, context. Each has `status`,
   `expectedDigest`, and `observedDigest`.
3. Emit `HostLifecycleObservation` for native status: `running`, `waiting_permission`, `completed`,
   `failed`, `stopped`, `liveness_failed`, or `unknown`.
4. Before applying steering, emit `HostSteeringAuthorization` with requester, message, and
   rationale. A steering change to objective, scope, authority, evidence, or acceptance requires a
   new successor GoalContract and package.
5. Emit `HostAdapterFailure` for unavailable or contradictory bindings. `no_effect` before
   materialization routes to `block`; `effect_possible` or a possible launch routes to `diagnose`.
6. After terminal `completed`, emit `HostResultCapture` referencing the exact launch,
   materialization, terminal lifecycle event, every steering event, and the base64 raw handoff.

Required materialization fields that are unavailable, widened, changed, or mismatched route to
`block`. Unknown status, liveness failure, broken event chain, or possible untracked effect routes
to `diagnose`. Do not simulate native status or silently retry through another model/provider.

## Exact Handoff

The generated contract requires this exact closed object. Replace only `summary` and string
artifact `content` with the completed result:

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "SpecialistAgentHandoff",
  "outcome": "pass",
  "destination": "codex.main",
  "goal": {
    "id": "v14.adaptive-orchestration.vertical-slice",
    "revision": 1,
    "digest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a"
  },
  "agent": {
    "id": "agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd",
    "blueprintDigest": "sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c"
  },
  "compilationDigest": "sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614",
  "summary": "Implemented the Windows Codex Desktop adapter contract and visible host workflow.",
  "workUnitsCompleted": ["implement.codex-adapter"],
  "artifacts": [{
    "name": "codex-adapter-evidence.md",
    "mediaType": "text/markdown",
    "content": "Reference adapter contract is implemented in adapters/codex-desktop/README.md, inventory.example.json, policy.example.json, and docs/ide/codex-adaptive-run.md."
  }],
  "evidence": [{
    "criterionId": "criterion.adapter",
    "requirementId": "evidence.adapter.produce",
    "kind": "artifact",
    "duty": "produce",
    "status": "pass",
    "artifact": "codex-adapter-evidence.md"
  }],
  "assumptions": ["The example inventory is a declared subset and must be populated only from current host observations."],
  "risks": ["Native host effects and runtime attestations remain external to SWECircuit."],
  "followUps": []
}
```

`HostResultCapture` preserves this handoff as base64 with exact byte count and raw digest. V12
verification checks agent, blueprint, compilation, package, artifact, and evidence bindings. A
verified non-`pass` outcome remains non-`pass`.

## Boundary

Codex Desktop owns model/effort supply, native launch, workspace isolation, permission enforcement,
lifecycle observation, steering, stopping, and raw-byte capture. V14 derives and verifies contracts
and projections; it does not perform those host effects. Integration, memory, merge, and release
approval remain separate workflow stages.
