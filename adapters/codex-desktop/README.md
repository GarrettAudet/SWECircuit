# Codex Desktop Adapter

Reference Windows host adapter for V14 Revision 2. This project-local translation layer gathers
host supply, maps an approved runtime assignment to a native Codex subagent call, preserves exact
result bytes, and reports bounded host attestations. SWECircuit does not launch agents, enforce
permissions, observe processes, stop work, or persist host files.

## Approved Assignment

- agent: `agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd`
- goal: `v14.adaptive-orchestration.vertical-slice`, revision `1`
- goal digest: `sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a`
- blueprint digest: `sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c`
- compilation digest: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`
- work unit: `implement.codex-adapter`

Resolve the contract through the verified package manifest. Preserve its exact objective, context
sources, profile, effort, tools, skills, isolation, permissions, evidence duty, artifact, and stop
conditions. Do not construct a contract path from the agent ID.

## Native Lifecycle

Each host action becomes an exact raw UTF-8 V14 event in one serialized sequence:

1. `HostLaunchAuthorization` records the approved command, contract digest/bytes, context
   delivery, profile, effort, tools, skills, isolation, permissions, and observability.
2. `HostMaterializationClaim` records the native handle and exactly these fields: model, effort,
   tools, skills, isolation, permissions, workspace, and context.
3. `HostLifecycleObservation` records native status: `running`, `waiting_permission`, `completed`,
   `failed`, `stopped`, `liveness_failed`, or `unknown`.
4. `HostSteeringAuthorization` records any steering message and rationale before it is applied.
5. `HostAdapterFailure` records inventory, authorization, materialization, lifecycle, or result
   capture failures with certainty: `no_effect`, `effect_possible`, or `effect_observed`.
6. `HostResultCapture` records the exact base64-encoded UTF-8 `SpecialistAgentHandoff` bytes,
   byte count, digest, and every event digest that led to the result.

Unavailable required materialization bindings route to `block` before result settlement. Unknown
status, liveness failure, contradictory events, or an untracked possible effect routes to
`diagnose`. There is no hidden model, tool, permission, or provider fallback. Codex native
subagent visibility supplies host status, steering, stopping, and the native handle; V14 does not
claim a custom pinned graphical panel.
