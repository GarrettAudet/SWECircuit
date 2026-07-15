# V11 Orchestration Contract

## Status

Proposed revision 3. This document is normative for the V11 implementation candidate and subordinate to accepted ADRs. It is not implemented. Any conflict with ADR 0003 blocks implementation until both are reconciled.

## Purpose

Define the smallest property-level, IDE/API/model/provider-neutral contract that coordinates one or many software-engineering agents through user-authored workflow policy, bounded concrete work, capability assignment, safe waves, integrated gates, owner decisions, trace, and learning.

Core never selects an IDE, API, model, provider, prompt, price, or reasoning mode. Those are host choices outside matching and routing.

## Policy Bundle

Workflow authority is one immutable PolicyBundle:

```txt
PolicyBundle = OrchestrationPolicy + Circuit + referenced Modules + referenced WorkPacket templates
```

The existing Circuit owns nodes, routes, outcomes, transfers, fan-outs, joins, exits, verification, and stop conditions. The new OrchestrationPolicy binds that exact Circuit/Module/WorkPacket-template closure and supplies bounded replication plus per-node role, capability, scope, evidence, independence, and authority policy. Planner output is never policy.

## Contract Family

Every V11 orchestration object uses `apiVersion: swecircuit/orchestration/v1alpha1`, rejects unknown fields, uses safe integers, and has one closed `kind` discriminator.

Root kinds:

- `OrchestrationPolicy`
- `RunAuthority`
- `AgentProfile`
- `PlanningSession`
- `OrchestrationPlan`
- `OrchestrationState`
- `OrchestrationEvent`

Digestible nested kinds:

- `GoalContract`
- `PlanProposal`
- `PendingRequestSeed`
- `InputRequest`
- `InputResponse`
- `CancellationRequest`
- `AvailabilitySnapshot`
- `GrantOffer`
- `Assignment`
- `WaveClaim`
- `ExecutionTicket`
- `ChildResultEnvelope`
- `OutputReference`
- `HostObservation`
- `MemoryProposal`
- `MemoryCandidate`
- `MergeReadyEvidence`

These kinds are not Project artifacts, are not discovered through `swecircuit.json`, and do not widen the six `swecircuit/v1alpha1` artifact kinds or RunEvent 1.0.0.

## Common Rules

### Identifiers

Identifiers use the existing 1-128 character lowercase grammar. Host-supplied root IDs are explicit inputs and unique in the scope below. Contract-allocated child IDs, whether populated by core, planner, or host, use fixed lowercase prefixes and six-digit decimal ordinals:

```txt
invocation: inv.000001
activation: activation.000001
route: route.000001
branch: branch.000001
join: join.000001
binding: binding.000001
assignment: asn.000001
wave: wave.000001
claim: claim.000001
ticket: ticket.000001
proposal: proposal.000001
packet: packet.000001
request seed: request-seed.000001
request: request.000001
response: response.000001
cancel: cancel.000001
result: result.000001
output: output.000001
observation: observation.000001
memory proposal: memory-proposal.000001
candidate: candidate.000001
merge evidence: merge.000001
offer: offer.000001
event: event.000001
```

Ordinals follow the canonical order defined by this contract and never reuse within one orchestration ID.

### Content Digests

Every root and every digestible nested value has a top-level `contentDigest` field. Its value is `sha256:` followed by 64 lowercase hexadecimal characters.

To compute a value digest:

1. validate the closed value except its own `contentDigest` value;
2. remove only that value's top-level `/contentDigest` property;
3. retain every nested value and nested `contentDigest` property unchanged;
4. serialize with RFC 8785 JCS;
5. hash the UTF-8 bytes with SHA-256.

Existing Circuit, Module, WorkPacket, AdapterManifest, ExecutionGrant, V10 OperationResult, ExecutionSummary, and RunEvent values have no V11 digest field. V11 first validates or normalizes each detached value to its closed JSON shape, then computes a `SnapshotDigest` by JCS plus SHA-256 over the complete value with no property removed.

Strings are not Unicode-normalized. Contract numbers are safe integers. A digest proves exact canonical content, not identity, authenticity, competence, persistence, or enforcement.

### Revisions

Planning and run revisions start at zero. Every `advanced` transition increments exactly once. `deferred` and `rejected` operations leave the prior value byte-identical. Revisions never reuse.

### Transition And Journal Digests

PlanningSession and OrchestrationState carry `eventSequence`, `eventTailId`, `eventTailDigest`, `journalDigest`, and `journalBytes`. These fields bind continuation consistency without a state/event digest cycle; they are content integrity, not host authenticity.

For each advanced transition:

1. construct the complete successor root except `contentDigest`, `eventTailId`, `eventTailDigest`, `journalDigest`, and `journalBytes`;
2. compute `nextRootProjectionDigest` by JCS plus SHA-256 over that closed projection;
3. construct events in canonical order; every event carries the prior full root digest when one exists, the same `nextRootProjectionDigest`, and the journal digest/byte count immediately before that event;
4. the first event of an orchestration has no cause; every later event carries both `causeEventId` and `causeEventDigest` for the immediately preceding event;
5. compute each event's contentDigest and exact JCS UTF-8 bytes, then compute the post-event journal digest as SHA-256 over the byte concatenation `ASCII("swecircuit-orchestration-journal-v1\0") || rawPreviousDigest32 || uint64be(previousJournalBytes) || uint64be(eventBytes.length) || eventBytes`; before the first event the previous digest is 32 zero bytes and previous bytes is zero;
6. compute post-event `journalBytes = previousJournalBytes + eventBytes.length + separator`, where separator is zero for sequence 1 and one otherwise;
7. populate the successor trace fields from the final event and post-event journal values, then compute the successor's normal contentDigest.

An event never contains the successor's final contentDigest or its own post-event journal digest. The successor contains the final event digest and post-event journal cursor; each event binds the complete non-trace successor projection. A continuation supplies the exact tail event. Before callbacks, validation recomputes the tail digest, checks its sequence/ID and successor projection against the current root, and derives the root's post-tail journal digest/bytes from the event's prior cursor. Resolving the tail's cause to earlier source events and verifying the complete chain belongs to `inspectOrchestrationTrace`; a tail-only continuation never claims full-history authentication.

### Qualified Evidence References

Every policy, Plan, criterion, invocation, state, output, and event reference to an evidence requirement uses one closed `EvidenceRequirementRef` row rather than a bare ID. The row contains:

- `sourceKind`: `circuit`, `module`, `work_packet_template`, or `concrete_work_packet`;
- `sourceId` and exact source SnapshotDigest;
- `collection`: `verification`, `evidence`, or `completion_evidence`, valid only for the corresponding V9 source field;
- `evidenceId`.

The row must resolve to exactly one complete V9 evidence-requirement object. Its canonical key is `sourceKind`, source ID, source digest, collection, then evidence ID in UTF-8 byte order. Two rows with the same key are duplicates; equal bare evidence IDs from different sources remain distinct. Goal criteria use sorted `requiredEvidenceKinds` from the existing V9 evidence-kind enum, while coverage rows bind the exact EvidenceRequirementRef values that fulfill those kinds.

## Identity Table

| Value | ID creator and scope | Revision | Required predecessor digests |
| --- | --- | --- | --- |
| OrchestrationPolicy | Host; unique policy ID/version in project | Immutable | Circuit, Module, and WorkPacket-template snapshot digests |
| RunAuthority | Host; unique authority ID/version bound to one orchestration/session/plan/run identity tuple | Immutable | Policy, Circuit, Module, WorkPacket-template, GoalContract, and AgentProfile digests |
| AgentProfile | Host; profile ID/version unique in authority allowlist | Immutable | None; digest is allowlisted by RunAuthority |
| GoalContract | Host; goal ID unique in orchestration | Immutable | Source-body digest and each criterion requirement-body digest |
| PlanProposal | Planner-supplied proposal ID unique in session | Immutable | Session, policy, authority, goal, and detached WorkPacket snapshot digests |
| PlanningSession | Host supplies session ID unique in orchestration | Starts 0 | Policy, authority, goal, profile digests |
| OrchestrationPlan | Host reserves plan ID in RunAuthority/PlanningSession before compile; unique in orchestration | Fixed planRevision 1 | Prior ready PlanningSession, proposal, policy, authority, goal, packet, profile digests |
| OrchestrationState | Host reserves run ID in RunAuthority/PlanningSession; unique in orchestration | Starts 0 | Plan, policy, authority digests |
| AvailabilitySnapshot | Host; availability ID unique per run revision | Immutable | State, profile, slot, manifest, attestation, and GrantOffer digests |
| GrantOffer | Host offer ordinal never reused in orchestration; embedded in one availability snapshot | Immutable | Availability ID, ready state, invocation, WorkPacket, profile, slot, executor, manifest, and V10 grant snapshot digests; never the parent availability digest |
| Assignment | Core ordinal unique in run | Immutable | Plan, packet, profile, availability, slot, reservation, and GrantOffer digests |
| WaveClaim | Core ordinal unique in run | Immutable | Prior state and assignment digests |
| ExecutionTicket | Core ordinal unique in run; generated after claimed state digest | Immutable | Claimed state, wave, assignment, packet, profile, manifest, grant digests |
| ChildResultEnvelope | Core/host ordinal matching one assignment | Immutable | Ticket and observation/result digests |
| OutputReference | Core ordinal unique in run | Immutable | Assignment, packet, output, schema, and HostObservation digests |
| HostObservation | Core or allowlisted host observation ordinal never reused in run | Immutable | Plan and source-value digests; ready state for preflight or claimed state/Assignment/ticket for result-time; host attestation only for host-attested origin |
| MemoryProposal | Core ordinal unique in run and accepted only from a memory invocation | Immutable | Assignment, accepted source-output/evidence, and prior parent-event digests |
| MemoryCandidate | Core ordinal unique in run | Immutable | Goal, criterion, MemoryProposal, evidence, source, and external-body digests |
| MergeReadyEvidence | Core fixed ID `merge.000001`, created only after a completed state and terminal event exist | Immutable | Final state/event, integration, criteria, evidence, approval, and memory-candidate digests |
| PendingRequestSeed | Core ordinal unique in run | Immutable | Source result/invocation, Policy decision action, body, and prior-event digests |
| InputRequest | Core ordinal unique in session or run | Immutable | Prior session/state, optional promoted seed, policy, authority digests |
| InputResponse | Host response ordinal never reused in orchestration and bound to one request | Immutable | Current session/state and request digests |
| CancellationRequest | Host cancellation ordinal never reused in run | Immutable | Current state, authority, actor-attestation, and reason digests |
| OrchestrationEvent | Core sequence unique in orchestration ID | Immutable | Authority, policy, relevant session/plan/state/value digests |

An object never contains its own digest through another path. OrchestrationState contains WaveClaim and Assignment values but not ExecutionTickets. Tickets are derived only after the claimed state digest exists.

## OrchestrationPolicy

PolicyBundle is a closed transient input tuple, not an eighth root:

```txt
PolicyBundle =
  OrchestrationPolicy
  + one exact Circuit
  + the exact Module closure referenced by that Circuit
  + the exact WorkPacket template closure referenced by the Circuit or Policy
```

The bundle rejects a missing, extra, duplicate, unresolved, or digest-drifted component. It is never discovered implicitly from a working directory. OrchestrationPolicy, RunAuthority, and OrchestrationPlan carry the exact component digests; later values bind those roots plus the component digests explicitly named by their closed schemas. There is no separately computed PolicyBundle digest.

Required OrchestrationPolicy fields:

| Field | Rule |
| --- | --- |
| `metadata` | Host-supplied policy ID and semantic version |
| `contentDigest` | Common digest rule |
| `circuitRef` | Circuit ID, version, and SnapshotDigest |
| `moduleRefs` | Sorted exact Module ID/version/SnapshotDigest closure |
| `workPacketTemplateRefs` | Sorted exact WorkPacket ID/SnapshotDigest closure |
| `nodePolicies` | Exactly one policy for every Circuit node |
| `replicationRegions` | Zero or more disjoint bounded regions |
| `routeBudgetCeilings` | Optional narrowing of already bounded cyclic Circuit routes |
| `approvalPolicy` | `ownerRoleId`, `reviewRequired`, and `finalApprovalRequired` |
| `completionPolicy` | Closed integration, memory, merge-evidence, and source-control witness policy |
| `limits` | Policy ceilings for concrete invocations and concurrency |

Every node policy contains `nodeId`, one fixed `nodeFunction`, and a non-empty sorted `variants` array. Each variant contains:

- `variantId`;
- one `workPacketTemplateRef` and SnapshotDigest from the bundle;
- `logicalRoleId`;
- sorted exact `requiredCapabilityIds`;
- a normalized `permissionCeiling`;
- sorted literal `readScopeCeiling`, `writeScopeCeiling`, and `requiredConflictScopes`;
- sorted exact `requiredEvidenceRefs`;
- sorted `independentFromNodeIds`;
- one `handoffDestinationRoleId`;
- optional closed `runRequestPolicy`.

`nodeFunction` is one of `clarifier`, `producer`, `diagnoser`, `integrator`, `verifier`, `reviewer`, `approver`, or `memory`. A `runRequestPolicy` is either `before_execution` with purpose `risk_approval`, responder role, external body ref/digest, and decision actions, or `on_outcome` with purpose `clarification`, trigger outcome `clarify`, body output port, responder role, and decision actions. Other purpose/trigger combinations reject Policy. A node outside a replication region has exactly one variant named `default`. A region node has the exact variant IDs declared by its region. Thus a host can define frontend, backend, test, docs, security, or other specializations while the planner can select only those named choices.

`completionPolicy` contains one `primaryIntegratorNodeId`, one `memoryNodeId`, non-empty sorted `mergeEvidenceRefs`, and `requireVcsHeadObservation`. Both named nodes are static default variants outside replication regions. Every Circuit fan-out/join pair has exactly one compiler-derived integration binding: its join node is a static `integrator`, its selected logical role equals both the Circuit join owner and fan-out integration owner, and it occurs after all accepted branch outputs and before every dependent verifier. The primary integrator is either that unique integrator or a static downstream integrator that post-dominates every join integrator. The memory node post-dominates the primary integrator, every verifier, and every required reviewer. Policy validation rejects a graph that cannot satisfy these structural facts without changing a Circuit route.

For a static node, the Circuit's optional owner/WorkPacket fields must equal the default variant role/template. For a region node, those Circuit fields remain the valid generic graph baseline; every variant template must narrow that baseline's authority, scope, evidence, handoff, and stop conditions, while its Policy-declared logical role may specialize the generic owner. Every variant template is a valid detached WorkPacket and its own `role.owner` equals the variant logical role.

A node without optional Circuit owner/WorkPacket fields still requires complete Policy variants. Module requirements, the generic template when present, the selected variant template, node Policy, and RunAuthority narrow the candidate in that order; planner data widens none of them. `independentFromNodeIds` is empty for a one-agent/self-review policy and explicit when a distinct profile and executor are required.

`routeBudgetCeilings` rows identify an existing cyclic route by `from`, `outcome`, and `to`. Each value is from 1 through that route's existing `maxTraversals`. V9 already rejects every unbounded cyclic route; V11 can only narrow a valid bound. Policy invocation/concurrency limits are from 1 to 256 and 1 to 32 and are further narrowed by RunAuthority.

Every permitted successful concrete graph has at least one static `memory` node outside replication regions. A graph that can activate more than one producer branch or lane also has a static `integrator` node after the relevant join and before verification. A memory node must post-dominate all producer, required integrator, verifier, and required reviewer success paths before every successful Circuit exit, so a completed run always has a source-linked MemoryCandidate. When `reviewRequired` is true, at least one reviewer invocation is present on every successful path; every criterion always has a verifier. These requirements change no Circuit route: Policy validation rejects a Circuit/Policy pair that cannot express them.

### Replication Regions

Each region contains:

- `regionId`;
- one Circuit `fanOut` identity by `from`, `outcome`, and `join`;
- one `rootNodeId` present in that fan-out's `branches`;
- a non-empty sorted `nodeIds` set containing the root;
- `minInstances` from 0 to 32;
- `maxInstances` from 1 to 32 and not below the minimum;
- a non-empty sorted `variantBounds` array whose rows contain `variantId`, `minInstances`, and `maxInstances`.

Variant minima sum exactly to the region minimum, variant maxima sum exactly to the region maximum, and every region node policy defines exactly those variant IDs. Each concrete lane selects one Policy variant; every node in that lane uses the same variant ID and its node-specific role, capabilities, template, permissions, scopes, evidence, independence, and handoff contract.

Compilation validates:

1. region node sets are disjoint;
2. the root has one incoming activation from the named fan-out source;
3. every non-root region node has incoming routes only from the same region;
4. routes within the region clone lane-locally;
5. routes leaving the region target only the named join; every diagnosis or fix successor used by a lane is included in the same region and cloned lane-locally;
6. no route enters a region except through its root;
7. the region contains no Circuit entry, exit, fan-out source, join node, or integration owner;
8. every node outside all regions instantiates exactly once with `default`;
9. all variant and total cardinality bounds are satisfiable;
10. total concrete invocations stay within the effective limit and hard ceiling 256;
11. every fan-out retains at least one concrete branch at all permitted lane selections.

A proposal chooses a bounded multiset of named variants for each region. Lanes sort by variant ID in UTF-8 byte order, then one-based `variantOrdinal`; `laneOrdinal` is the resulting one-based position across the region. An absent variant instance has no invocation or state. Each lane clones region routes and transfers. A route from any legal lane terminal to the shared join settles one canonical lane branch identity and records the actual terminal invocation, outcome, and transfers. A static Circuit branch has one canonical branch identity. Circuit join strategy and integration owner never change.

A Circuit with no replication region has exactly one invocation per reachable node using `default`. A planner cannot create a lane or specialization where the PolicyBundle defines none.

### Concrete Graph And Work Packets

A concrete address is `nodeId` plus `variantId: default` for a static node. A replicated address adds `regionId`, selected `variantId`, `variantOrdinal`, and `laneOrdinal`. Expansion units are every non-region node and every region. Units sort by the lowest Circuit node declaration index they contain, then region ID. A static unit emits one address. A region emits variants and ordinals in canonical lane order, then its nodes in Circuit declaration order. Core assigns `inv.000001` onward in that exact address order.

PlanProposal required fields are:

- `proposalId` equal to `proposal.` plus the six-digit next planning round, `contentDigest`, and planner provenance `plannerRef`/`plannerDigest`;
- `sessionId`, `sessionRevision`, and `sessionDigest`;
- `policyDigest`, `runAuthorityDigest`, and `goalContractDigest`;
- exactly one sorted `laneSelections` row per Policy region, containing the canonical variant ID/variant-ordinal sequence and satisfying every variant/total bound;
- exactly one sorted `packetBindings` row per resulting concrete address;
- no acceptance-coverage field; coverage is host-authored in GoalContract and compiler-derived after lane selection.

A packet binding contains the concrete address, detached WorkPacket ID/SnapshotDigest, and exact normalized `requiredPermissions`. Two permission sets are coverage-equivalent when every item in either set is covered by at least one item in the other under the existing V10 `permissionRequirementCovered` relation. The binding `requiredPermissions`, eventual AdapterManifest `requestedPermissions`, and ExecutionGrant `permissions` must be coverage-equivalent; each must also fit every upstream ceiling. Compiler derives Plan read/write scopes only from normalized filesystem-read/filesystem-write requiredPermissions; metadata-only WorkPacket includes never enter effect or conflict scopes unless separately named by a required conflict zone. The planner callback returns the proposal plus the detached candidate WorkPacket values. Candidates are transient inputs: roots and events retain only references and digests.

Every WorkPacket template is a complete valid V9 WorkPacket, remains a project artifact rather than a new V11 kind, has empty `dependencies`, and binds the RunAuthority branch/baseline. V11 gives it template semantics only while it is named by the exact PolicyBundle.

For every candidate, compilation requires:

- a valid V9 WorkPacket whose ID is `packet.` plus its six-digit invocation ordinal and whose SnapshotDigest matches the binding;
- source branch and baseline equal RunAuthority;
- `role.owner` equal the selected node-policy variant logical role;
- required permissions include the Module floor, fit every applicable ceiling, and are coverage-equivalent to the eventual AdapterManifest requests and V10 grant under the existing V10 permission relation;
- `scope.include` is non-empty, every include is inside each applicable template and authority ceiling, every normalized filesystem read/write permission prefix is covered by an include, `scope.conflictZones` include every policy-required conflict prefix, and no include overlaps `scope.exclude`; includes may name metadata-only context paths and never grant filesystem authority;
- `dependencies` equal the sorted WorkPacket IDs for all distinct concrete direct predecessor addresses, including bounded cycle predecessors but excluding a self-loop's own packet; runtime readiness still comes only from Circuit activation and join state;
- the handoff destination equal the selected variant destination role.

### WorkPacket Template Narrowing

Applicable parents are the Module, Circuit, selected variant template, generic Circuit template when present, node-policy variant, and RunAuthority. Normalize each set before comparison. A child permission set is no broader than a parent when every child item is covered by one parent item under the existing V10 permission relation.

Compilation applies this exact algebra:

- the candidate `authority.allowedActions` is a subset of every applicable template's allowed actions, while `disallowedActions` is a superset of their union;
- the candidate permission ceiling, Plan required permissions, read scopes, and write scopes are no broader than every applicable permission/scope ceiling;
- candidate includes are inside every applicable template include; candidate excludes are a superset of template excludes; conflict zones are a superset of required template/Policy conflict zones;
- inherited evidence is the union of Circuit verification, Module evidence, template completion/verification, and Policy EvidenceRequirementRef rows; the candidate preserves the complete referenced evidence-requirement object under the corresponding completion or verification collection, and a same-key unequal object rejects;
- candidate non-goals contain the union of template non-goals; stop conditions contain the union of Circuit, Module, and template stop conditions; context contains every complete template context reference;
- candidate handoff required fields contain the union of template required fields, while destination is exactly the selected Policy variant destination;
- a candidate deadline, when present, is no later than the earliest applicable template deadline; it cannot remove an inherited deadline;
- metadata ID, source feature-package reference, goal text, metadata description, and capability prose may specialize; dependencies are always compiler-derived as above.

The candidate may add narrower context, evidence, non-goals, exclusions, conflict zones, and stop conditions inside all hard limits. No candidate field changes graph, variant, logical role, exact capabilities, route, gate, join, authority, acceptance ownership, or completion policy.

Filesystem permissions use existing V10 kinds `filesystem.read` and `filesystem.write`. Conflict normalization removes only a terminal `/**`, validates the remaining literal prefix with the V11 path grammar, and rejects every other wildcard. Read, write, and conflict sets in the Plan derive from required permissions and the candidate WorkPacket; they are not worker assertions. A conforming host enforces the bound V10 grant and later attests observed changed paths.

OrchestrationPlan required fields are:

- `metadata` whose ID equals the reserved PlanningSession/RunAuthority plan ID, `planRevision: 1`, and `contentDigest`;
- orchestration ID, prior ready `planningInputSessionDigest`, proposal, GoalContract, Policy, Circuit, Module, WorkPacket-template, RunAuthority, and AgentProfile digests;
- source branch and baseline;
- sorted concrete `invocations`, `routes`, `joins`, `integrationBindings`, `acceptanceCoverage`, and `routeBudgets`;
- the compiler-derived `primaryIntegratorInvocationId`, `memoryInvocationId`, and exact requested/effective concurrency;
- `effectiveLimits`.

Each invocation records its ID and full variant-bearing address; Circuit node and Module references/digests; generic/variant template and concrete WorkPacket references/digests; variant ID, logical role, node function, exact capability IDs, required permissions, read/write/conflict scopes, potential predecessor invocation IDs, input/output port IDs, criterion IDs, EvidenceRequirementRef values, and independence constraints. Concrete routes and joins retain source Circuit identities and record every derived invocation endpoint and port transfer. Each integration binding contains join ID, Circuit join/fan-out identities, integration-owner role, exact integrator invocation ID, accepted branch/output ports, and sorted completionPolicy EvidenceRequirementRef values. Core assigns route IDs in Circuit route declaration order with static/region/lane expansion, branch IDs in fan-out branch then lane order, join IDs in Circuit join order, and binding IDs in route/transfer order. Concrete join sources are branch IDs, not whichever terminal node happened to run. Plan arrays use these canonical orders, never planner object order.

Compilation first validates the complete bundle, proposal, detached candidates, profiles, and authority without worker effects. It then expands the graph, derives IDs/routes/joins/budgets, validates packet and acceptance bindings, and emits one immutable Plan bound to the prior ready PlanningSession. The successor compiled PlanningSession may contain the Plan digest, but the Plan never contains that successor digest; this removes the digest cycle. A malformed operation rejects unchanged, while a valid nonconforming proposal advances to blocked with zero worker calls.

## Goal, Acceptance, And Logical Ownership

GoalContract required fields:

- `goalId`, `bodyRef`, `bodyDigest`, and `contentDigest`;
- one to 64 `criteria` sorted by `criterionId`;
- each criterion has `criterionId`, `criterionMode` (`delivery` or `verification_only`), `requirementRef`, `requirementDigest`, sorted `requiredEvidenceKinds`, and one closed `coveragePolicy`.

Each coveragePolicy contains sorted producer, verifier, and reviewer node selectors; producer aggregation `all`, `join_winner`, or `none`; an exact Circuit join reference for `join_winner`; and sorted EvidenceRequirementRef values. `none` is legal only for `verification_only`. A node selector contains node ID plus either `all_variants` or a non-empty sorted allowed variant-ID set. Reviewer selectors are empty exactly when Policy `reviewRequired` is false. GoalContract validation resolves every selector against Policy before planner invocation.

Free-form goal and criterion bodies stay outside the orchestration roots. Source references and digests preserve retrieval.

Compiler, not planner, derives exactly one OrchestrationPlan `acceptanceCoverage` row per criterion from its coveragePolicy and the accepted lane selection. A row contains:

- the criterion ID;
- one producer group: `all` with every selected matching invocation, `join_winner` with the exact join ID and eligible concrete branch IDs, or `none` for `verification_only`;
- one or more verifier invocation IDs whose Policy node function is `verifier`;
- reviewer invocation IDs when approvalPolicy requires independent review;
- sorted exact EvidenceRequirementRef values from Circuit, Module, WorkPacket-template, or concrete WorkPacket sources.

Unknown, duplicate, ineligible, or uncovered criteria reject compilation. At runtime an `all` group requires every named producer, while `join_winner` materializes only the accepted winner branch when that join closes; skipped alternatives never block coverage. Worker-local evidence never satisfies a verifier- or reviewer-owned requirement.

Existing WorkPacket `role.owner` is the logical role ID of the selected Policy variant for its Circuit node. It is not an AgentProfile, executor, planner, or human identity. WorkPacket `role.capability` remains human guidance. Exact matching requirements live only in the Plan. Assignment is the sole runtime assignee. Evidence ownership derives from node function, logical role, and accepted Assignment, never from worker-supplied owner text.

## RunAuthority

RunAuthority is an independent host-authored root. Required fields are:

| Field | Rule |
| --- | --- |
| `metadata` | Authority ID and semantic version |
| `runIdentities` | Exact `orchestrationId`, `sessionId`, `planId`, and `runId` reserved before planning |
| `contentDigest` | Common digest rule |
| `goalContractDigest` | Exact GoalContract |
| `policyDigest` | Exact OrchestrationPolicy |
| `circuitDigest` | Exact Circuit SnapshotDigest |
| `moduleDigests` | Exact sorted Module closure |
| `workPacketTemplateDigests` | Exact sorted template closure |
| `source` | Repository ID, branch, and baseline commit |
| `agentProfileDigests` | Non-empty sorted allowlist |
| `executorAllowlist` | Executor ID/version and permitted AdapterManifest SnapshotDigests |
| `grantIssuerIds` | Sorted host-allowlisted V10 grant issuers |
| `attestorAllowlist` | Attestor ID and role pairs |
| `responderRoles` | Roles permitted to answer each request purpose |
| `cancellationRoles` | Roles permitted to cancel |
| `permissionCeiling` | Normalized host-enforced maximum |
| `repositoryScopeCeiling` | Literal read, write, and conflict prefixes |
| `routeBudgetCeilings` | Optional per-route narrowing of Policy/Circuit bounds |
| `limits` | Planner calls, invocations, concurrency, revisions, events, bytes, and retained journal ceilings |
| `executionPolicy` | Exact V10 `timeoutMs` and `abortAcknowledgementMs` applied to every child and bounded by V10 hard limits |
| `finalApprovalRequired` | Host requirement that can only add an approval gate |

RunAuthority never comes from a planner, profile, manifest, worker, or prior result. Effective permissions, scopes, and numeric limits are the intersection/minimum of hard limits, Policy, authority, template, candidate packet, profile, manifest request, and V10 grant. A required boolean gate is the logical OR of Policy and RunAuthority. A downstream declaration that widens any predecessor rejects before callbacks.

Availability may present only allowlisted profile digests and executor/manifest pairs. Its V10 grant must name the same executor, run, attempt, and WorkPacket, request only manifest-declared permissions, fit every upstream ceiling, and cover the Plan's exact required permissions. Core validates these bindings; the host authenticates issuers, executors, responders, and attestors and enforces effects.

## Simple Facade

The facade has no hidden repository or chat lookup. Every continuation resupplies immutable values whose digests are already bound by the returned session, Plan, or state.

`runGoal` accepts one closed command:

| Command kind | Required payload |
| --- | --- |
| `start` | GoalContract, PolicyBundle, RunAuthority carrying the reserved orchestration/session/plan/run IDs, one or more allowlisted AgentProfiles, optional `requestedConcurrency`, planner callback, availability callback, execution callback, input/approval callback |
| `continue_planning` | Exact PlanningSession and tail OrchestrationEvent, GoalContract, PolicyBundle, RunAuthority, the same profile set, optional bound InputResponse, planner callback, and callbacks |
| `continue_run` | Exact OrchestrationState, tail OrchestrationEvent, and Plan; GoalContract, PolicyBundle, RunAuthority, Plan-bound profiles and detached WorkPackets; optional bound InputResponse or CancellationRequest; availability, execution, and input callbacks |

Every resupplied value is validated and digest-compared before a planner or worker call. No profile, packet, policy, authority, or resolver is invented. `requestedConcurrency` is an integer from 1 through the effective authority/Policy ceiling and defaults to 1 when omitted. PlanningSession and Plan bind that exact value; continuations cannot change it, and `prepareWave` never selects more assignments. Supplying many profiles or slots does not silently enable parallel work. The one-agent path is therefore the same contract with requested concurrency one; explicit values above one enable bounded parallel waves.

`runGoal` repeatedly uses deterministic operations until it returns exactly one:

- `input_required` with phase, exact session or state, the next canonical InputRequest, and pending-request count;
- `waiting` with exact ready state and reason `capacity_unavailable` or `execution_not_started`;
- `completed`, `failed`, `cancelled`, or `uncertain` with exact terminal OrchestrationState and trace summary;
- `blocked` with phase `planning` plus terminal PlanningSession or phase `run` plus terminal OrchestrationState;
- `rejected_unbound` with sanitized diagnostics when no trustworthy identity exists;
- `rejected_bound` with the exact unchanged session/state digest and sanitized diagnostics.

Result variants are closed. `input_required` contains only kind, phase, exact session-or-state, the next canonical InputRequest, pending-request count, emitted events, and trace summary. `waiting` contains only kind, exact ready state, waitGuard, emitted events, and trace summary. A run-terminal variant contains only kind matching state status, exact terminal state, emitted events, trace summary, complete memory candidates and merge-ready evidence only for `completed`. A planning-blocked variant contains phase, exact terminal PlanningSession, emitted events, and trace summary; a run-blocked variant contains phase and exact terminal OrchestrationState. Rejection variants contain only the fields stated above.

Trace summary contains orchestration ID, event vocabulary version, first/last sequence and event IDs, event count, root digests, child-run count, evidence count, retained-journal digest/bytes, status, and `complete` or `incomplete_sources`. It contains no copied event or free-form body.

A caller resumes by passing the returned exact session/state through the matching continuation command. Capacity or not-started waiting requires a different availability-projection digest before another worker call. The facade never polls semantically unchanged availability and never retries a not-started or ambiguous execution in the same call. A planner or availability callback exception becomes a fixed pre-effect blocked code. The execution callback receives one ExecutionTicket and a core-owned one-shot `dispatchV10` capability. A conforming callback performs no software-work effect outside that capability. Core increments the ticket's dispatch counter at capability entry immediately before invoking V10. A callback exception with counter zero is core-observed `not_started`; after entry, or when the host cannot prove the boundary, it is `effect_unknown`. An advanced host may return host-attested `not_started` only with a bound zero-call observation. Input callback failure simply returns the bound `input_required` value.

## Planning Contracts

PlanningSession common fields are `sessionId`, `orchestrationId`, reserved `planId` and `runId`, `revision`, `round`, `plannerCallLimit`, `requestedConcurrency`, `status`, `policyDigest`, `circuitDigest`, sorted `moduleDigests`, sorted `workPacketTemplateDigests`, `runAuthorityDigest`, `goalContractDigest`, sorted `agentProfileDigests`, `eventSequence`, `eventTailId`, `eventTailDigest`, `journalDigest`, `journalBytes`, and `contentDigest`. `plannerCallLimit` is `L = min(8, RunAuthority.limits.plannerCalls)` and is from 1 through 8.

| Status | Required variant fields | Forbidden variant fields |
| --- | --- | --- |
| `ready` | none | pendingRequest, proposalDigest, planDigest, terminalCode |
| `input_required` | `pendingRequest` | proposalDigest, planDigest, terminalCode |
| `compiled` | `proposalDigest`, `planDigest` | pendingRequest, terminalCode |
| `blocked` | `terminalCode` | pendingRequest, proposalDigest, planDigest |

Planner callback output is one closed transient union:

| Kind | Required fields | Forbidden fields |
| --- | --- | --- |
| `proposal` | PlanProposal and exact detached WorkPacket candidate set | question/block fields |
| `question` | purpose code, responder role, sorted decision codes, external body ref/digest | proposal, packets, block code |
| `block` | fixed block code and optional external body ref/digest | proposal, packets, question fields |

A valid proposal either compiles or advances directly to blocked with a fixed policy/contract code; it never partially compiles. Malformed operation input rejects unchanged. Free-form planner reasoning and bodies are neither accepted nor retained.

Planning operation results are closed:

- `planning_advanced`: `kind`, prior session digest, next PlanningSession, sorted emitted OrchestrationEvent values, and `plan` only when next status is compiled;
- `planning_rejected_unbound`: `kind` and sanitized diagnostics only, used when start input cannot be canonically identified;
- `planning_rejected_bound`: `kind`, unchanged session ID/revision/digest, and sanitized diagnostics.

Operations:

| Prior | Operation | Next |
| --- | --- | --- |
| absent | `startPlanning` | ready revision 0, round 0 |
| ready | valid `applyPlannerResult(proposal)` | compiled or blocked, round plus one |
| ready | `applyPlannerResult(question)` with prior round less than `L - 1` | input_required, round plus one |
| ready | `applyPlannerResult(question)` with prior round equal to `L - 1` | blocked at round `L` |
| ready | `applyPlannerResult(block)` | blocked, round plus one |
| input_required | `resumePlanning(answer)` | ready, same round |
| input_required | `resumePlanning(block or cancel)` | blocked, same round |
| compiled or blocked | any operation | bound rejection unchanged |

`applyPlannerResult` while input is pending or at round `L` rejects unchanged. A second planning request cannot exist. Responses do not increment round. `runGoal` invokes the planner at most `L` times, including proposal, question, and block results.

InputRequest common required fields are `requestId`, `phase`, `purposeCode`, sorted `allowedDecisionCodes`, `responderRole`, source prior revision/digest, target successor revision, Policy and RunAuthority digests, external `bodyRef`/`bodyDigest`, `oneUse: true`, and `contentDigest`. The request never contains the target successor's final digest; its containing root/event binds it, and InputResponse later binds that exact current root. Planning purpose is one of `requirements_clarification`, `scope_choice`, `architecture_choice`, `verification_choice`, `authority_choice`, or `risk_choice`, with decisions exactly `answer`, `block`, and `cancel`. Planning requests additionally bind orchestration/session IDs and GoalContract digest and forbid request-seed fields. Run requests additionally bind run/Plan IDs and digests plus a closed subject: invocation requests require Circuit node/invocation/activation and promoted PendingRequestSeed IDs/digests, while completion requests forbid those fields. They contain one sorted `decisionActions` row for every non-cancel decision. An action is exactly one of `release_invocation`, `route_outcome` with one declared outgoing Circuit outcome, `block` with one fixed code, or `complete`. A pre-execution risk approval maps `approve` to `release_invocation` and `decline` to `route_outcome` or `block`; an outcome clarification maps `answer` to `route_outcome` and `block` to `block`; final owner `approve` maps to `complete` and `decline` maps to `block`. No other purpose/decision/action combination is valid.

InputResponse required fields are `responseId`, phase, current session-or-state revision/digest, request ID/digest, responder ID/role, host identity-attestation ref/digest, decision code, optional external body ref/digest, and `contentDigest`. An `answer` decision requires the external response body; every other decision may include one optional explanatory body reference/digest pair. A run-phase `cancel` response additionally requires one exact nested CancellationRequest bound to the same state, actor, role, attestation, and `user_request` reason; every other response forbids that field. Unknown decisions or wrong phase, role, identity, request, revision, digest, or authority reject unchanged. A successful resume advances revision and records the response digest as consumed, making replay stale.

## AgentProfile, Availability, And Grant Offers

AgentProfile required fields are:

| Field | Rule |
| --- | --- |
| `metadata` | Provider-neutral profile ID and semantic version |
| `contentDigest` | Common digest rule |
| `capabilityIds` | Non-empty sorted exact capability IDs |
| `moduleDigests` | Sorted supported Module SnapshotDigests |
| `inputKinds` / `outputKinds` | Sorted accepted artifact kinds |
| `permissionCeiling` | Normalized maximum |
| `priority` | Required integer 0-65535; lower wins; neutral value 32768 |
| `provenanceRef` / `provenanceDigest` | External source of the capability claim |

Profile version is an ASCII ascending identity tie-break only. IDE, API, model, provider, price, prompt, and hidden quality metadata are forbidden in the profile and ignored if a host keeps them outside core.

AvailabilitySnapshot required fields are `availabilityId`, `runId`, bound ready-state revision/digest, sorted `slots`, sorted complete `grantOffers` values, sorted `pathObservationDigests`, `projectionDigest`, and `contentDigest`. The availability callback returns the snapshot plus detached AdapterManifest, ExecutionGrant, and path-identity HostObservation values whose SnapshotDigests or contentDigests appear in it.

Each slot contains profile ID/version/digest, executor ID/version, AdapterManifest SnapshotDigest, reservation ID, slot ordinal, host attestor ID/role, attestation ref/digest, and availability status `available` or `unavailable`. The tuple of reservation ID and slot ordinal is unique in the snapshot. A slot is not authority and cannot be assigned twice in one wave.

Each GrantOffer contains:

- `offerId` and `contentDigest`;
- `availabilityId` only for its parent snapshot, plus run ID and bound ready-state revision/digest;
- invocation, WorkPacket, profile, reservation/slot, executor, and manifest identities/digests;
- detached V10 ExecutionGrant SnapshotDigest;
- V10 grant ID, issuer, run ID, attempt ID, WorkPacket ID, executor ID/version, and normalized permissions.

A GrantOffer never contains its parent AvailabilitySnapshot contentDigest or projectionDigest. The parent embeds the complete offer and therefore binds it without a digest cycle.

A GrantOffer is eligible only when the detached grant validates, every repeated field equals the grant, the offer is bound to one available slot and one Plan invocation, its permissions exactly cover the Plan requirement without exceeding any ceiling, and its issuer/executor/manifest are allowed by RunAuthority. Unused offers have no effect. Missing or invalid offers remove only their candidate edge; malformed snapshot structure rejects the whole snapshot.

The projection digest is SHA-256 over RFC 8785 JCS of the sorted slot, offer, and path semantics. Projection removes AvailabilitySnapshot and GrantOffer IDs, bound state revision/digest, HostObservation IDs, attestations, and every contentDigest. It retains profile, executor, manifest, reservation/slot, availability status, invocation, WorkPacket, grant issuer/ID/run/attempt/permissions, and normalized lexical/canonical path status. Offers sort by that retained semantic key, not by `offerId`. Thus rebinding identical capacity or renaming an offer does not masquerade as changed availability; a new reservation, executor, manifest, grant, attempt, permission set, or path status is a real projection change.

Availability and offers are immutable observations for one ready-state digest. A continuation after waiting must supply a valid snapshot with a different projection digest. They never expand profile, Policy, packet, or RunAuthority authority.

## Matching

An invocation/slot/GrantOffer edge exists only when all of these hold:

- the slot and offer are available, unique, state-bound, and mutually consistent;
- the profile supports the exact Module digest, input/output kinds, and every exact capability ID;
- the candidate WorkPacket, Plan required permissions, profile ceiling, Policy, RunAuthority, manifest request, and V10 grant narrow monotonically;
- the reservation, executor, manifest, grant, WorkPacket, run, attempt, and invocation identities all match;
- every completed invocation named by `independentFromNodeIds` used a different profile ID/version and executor ID/version.

Policy validation condenses the concrete route graph into strongly connected components. Every independence target must be in a strictly earlier component and must dominate every activation path to the constrained node; a target in the same component or any cycle is invalid. A target in the same replication region expands to the same lane only when that expanded target still satisfies the earlier-component and dominance rules; every other target expands to all activated concrete predecessors for that node ID. Independence is therefore settled before the constrained node becomes ready and never creates a same-wave or later-cycle ambiguity.

Normalize permission items as sorted `(kind, scope)` pairs. A profile permission surplus is the sorted set difference between its ceiling and the invocation's exact requirement. Capability surplus is the sorted set difference between profile capabilities and invocation requirements.

Candidate slot rank is the lexicographic tuple:

```txt
permission surplus count
permission surplus vector by UTF-8 byte order
capability surplus count
capability surplus vector by UTF-8 byte order
profile priority ascending
profile ID by UTF-8 byte order
profile version by UTF-8 byte order
reservation ID by UTF-8 byte order
slot ordinal ascending
GrantOffer ID by UTF-8 byte order
```

The Plan computes a structural rank by condensing the concrete route graph into strongly connected components. Components and edges are discovered in canonical invocation/route order. Kahn removal chooses the zero-indegree component with the lowest contained invocation ordinal; its removal ordinal is the rank. Ready invocations sort by structural rank, then invocation ordinal.

A legal matching is injective over invocations and reservation/slot tuples: one invocation receives at most one edge, one slot serves at most one invocation in the wave, and one GrantOffer is consumed at most once. An offer whose child-attempt key already appears in OrchestrationState is ineligible. Among all eligible matchings with maximum assigned-invocation cardinality, choose the lexicographically smallest assignment vector over that ready order. Each vector element is its candidate slot rank; unassigned sorts after every candidate. This is the sole matching result. Provider, model, API, IDE, prompt, price, and hidden quality metadata cannot enter the candidate graph or tie-breaks.

## OrchestrationState

OrchestrationState common required fields are:

- `runId`, `orchestrationId`, `revision`, `status`, and `contentDigest`;
- GoalContract, Plan, Policy, Circuit, Module, WorkPacket-template, RunAuthority, and concrete WorkPacket digests;
- source repository, branch, and baseline;
- `eventSequence`, `eventTailId`, `eventTailDigest`, `journalDigest`, `journalBytes`, and every next core-ID ordinal;
- sorted remaining `routeBudgets`;
- sorted `invocationStates`, `branchStates`, `joinStates`, `portBindings`, and `criterionStates`;
- sorted consumed InputResponse and CancellationRequest digests and, only while input is pending, one `pendingRequest` plus zero or more sorted complete `queuedRequestSeeds`;
- sorted consumed child-attempt keys, each the tuple of ExecutionGrant SnapshotDigest, V10 run ID, and attempt ID;
- sorted complete MemoryCandidate values.

| Status | Required variant fields | Optional variant fields | Forbidden variant fields |
| --- | --- | --- | --- |
| `ready` | none | `waitGuard` | activeWave, pendingRequest, queuedRequestSeeds, terminalCode |
| `claimed` | `activeWave` | cancellationRequestDigest | pendingRequest, queuedRequestSeeds, waitGuard, terminalCode |
| `input_required` | one `pendingRequest` | sorted `queuedRequestSeeds` | activeWave, waitGuard, terminalCode |
| `completed`, `failed`, `blocked`, `cancelled`, `uncertain` | `terminalCode` | none | activeWave, pendingRequest, queuedRequestSeeds, waitGuard |

A waitGuard contains reason `capacity_unavailable` or `execution_not_started`, the rejected AvailabilitySnapshot and projection digests, sorted rejected invocation/semantic-candidate keys when applicable, and the `eventId` that created it. A semantic candidate key is the JCS digest of invocation, WorkPacket, profile, executor, manifest, reservation/slot, grant issuer/ID/run/attempt, and normalized grant permissions; it excludes availability, offer, attestation, and content-digest identities. A later wave requires a different projection digest; after `execution_not_started`, each released invocation also requires a semantic candidate key not rejected for that invocation. Clearing the guard and claiming work is one advanced transition.

Each invocation state contains invocation ID, status, activation count, execution count, current or last global activation ID, last activation source, accepted Assignment/result digests, OutputReference digests, satisfied evidence IDs, and retained terminal/history digests or event IDs as specified by the status variant. Core allocates one never-reused `activation.` ID whenever a route, fan-out, join, or entry transition activates an invocation.

| Invocation status | Required variant fields |
| --- | --- |
| `pending` | none |
| `ready` | activation source and next execution ordinal |
| `claimed` | active Assignment ID/digest |
| `input_required` | active InputRequest ID/digest or queued PendingRequestSeed ID/digest |
| `succeeded` | accepted result and output/evidence digests |
| `failed`, `blocked`, `uncertain` | terminal code, source value digest when one exists, and terminal event ID |
| `skipped` | winning join/branch or unreachable-route reason |

A bounded cycle reactivates the same invocation ID, increments activation count, and retains prior assignment/result/evidence digests. It never invents a second logical invocation. Execution count increments only for `executed`; `not_started` does not increment it.

Branch state identifies the fixed branch or replication lane, canonical priority, current invocation, status `inactive`, `active`, `succeeded`, `terminal_non_success`, or `skipped`, and retained result/evidence digests. Join state identifies the concrete source set, strategy, open/closed status, settled sources, optional winner, transferred bindings, and close event ID. Port bindings identify source invocation/output/assignment and destination invocation/input. Criterion state identifies required producer/verifier/reviewer/evidence IDs and the accepted bindings that currently satisfy each one.

Runtime readiness comes from entry activation, accepted Circuit routes, fan-out activation, and closed joins. WorkPacket dependency text is trace metadata and cannot independently activate work.

Run operation results are closed:

- `transition_advanced`: `kind`, prior state digest, next OrchestrationState, sorted emitted OrchestrationEvent values, ExecutionTickets only when next status is claimed, and MergeReadyEvidence only when next status is completed;
- `transition_deferred`: `kind`, unchanged claimed state ID/revision/digest, and reason `cancellation_already_requested`;
- `transition_rejected_unbound`: `kind` and sanitized diagnostics only for an unidentifiable start input;
- `transition_rejected_bound`: `kind`, unchanged state ID/revision/digest, and sanitized diagnostics.

Operations:

| Prior | Operation | Next |
| --- | --- | --- |
| absent | `startRun(compiled session, Plan, prior tail event)` | ready revision 0 |
| ready | `prepareWave` | claimed, ready with waitGuard, completed, or blocked |
| ready | `cancelRun(request)` | cancelled |
| claimed | `applyWaveResults` | ready, input_required, completed, failed, blocked, cancelled, or uncertain |
| claimed | first `cancelRun(request)` | claimed with cancellation request; immutable claim revision retained |
| claimed | repeated exact `cancelRun` request | deferred unchanged |
| claimed | different `cancelRun` request while one is active | bound rejection unchanged |
| input_required | `resumeRun(response)` | input_required, ready, completed, blocked, or cancelled |
| input_required | `cancelRun(request)` | cancelled |
| terminal | any operation | bound rejection unchanged |

Every bound operation validates the exact prior tail OrchestrationEvent against the session/state eventSequence, eventTailId, eventTailDigest, successor projection, derived post-tail journalDigest, and derived journalBytes before advancing. Every advanced transition increments revision once, emits at least one parent event, and sets the successor tail to its final emitted event ID. A successor root stores the final emitted event digest only after every event binds the successor's non-trace projection; it may also retain strictly earlier source-event digests through source-linked values such as MemoryCandidate. The transition projection rule makes this acyclic. Every rejected or deferred result leaves the bound prior value byte-identical.

## Portable Paths And Conflict Safety

V11 repository prefixes are literal paths, not globs. They are slash-separated ASCII segments using letters, digits, dot, underscore, and hyphen. They reject roots, drive letters, colon, backslash, wildcards, empty/dot/parent segments, controls, trailing dot/space, Windows reserved device names, and alternate streams. A V10 filesystem permission may end in one `/**`; only that marker is removed before V11 prefix validation.

AvailabilitySnapshot carries sorted path-identity HostObservation digests and the callback supplies the detached observations. Every Plan read/write/conflict prefix has one state/baseline-bound observation. An observation records lexical prefix, canonical repository-relative prefix, existing target or observed-parent mode, baseline identity, link/reparse status, containment result, case-sensitivity mode, canonical host identity, attestor binding, and contentDigest.

Existing targets require an observed canonical target. Planned new paths require an observed contained existing parent plus the literal child. Outside-repository containment rejects. Link/reparse ambiguity, Unicode aliasing, unknown case behavior, or unresolved identity yields scope status `unknown`; it never becomes a claimed canonical path.

Overlap uses path-segment prefix comparison on exact ASCII, ASCII-lowercase, and equal canonical host identities. Read/read overlap is allowed. Write/write, write/read, shared required conflict scope, and unknown scope against any writer conflict. A write with unresolved identity may execute only alone.

Post-execution `changed_paths` observations use the same grammar and baseline binding. A changed path outside the ticket's write scopes or inside an excluded scope makes the parent uncertain; it can never be relabeled as successful evidence. Core validates observations and scheduling implications. The host authenticates attestors, resolves filesystem identity, and enforces the exact V10 grant.

## Wave Selection

Compilation first builds the static invocation/profile compatibility relation without live slots or grants. Every invocation requires at least one compatible allowlisted profile. For each `independentFromNodeIds` edge, at least one compatible predecessor/constrained profile pair must have different profile ID/version; otherwise planning blocks with `missing_permanent_capability`. Executor independence remains a live slot constraint because executors are not AgentProfile fields.

From structurally ready invocations in canonical ready order:

1. begin with an empty selected set;
2. inspect each invocation once;
3. skip it if its Plan scopes conflict with the selected set;
4. tentatively add it and build the exact slot/GrantOffer candidate graph;
5. retain it only if a matching assigns every selected invocation;
6. stop after the effective concurrency ceiling or 32 selections;
7. apply the normative matching objective to the final selected set.

This deterministic earliest-feasible algorithm favors stable trace and simple implementation over globally optimal conflict packing.

If selected is empty and the completion predicate holds, transition to completed. If graph policy makes progress unreachable, transition to blocked. Before declaring a capacity wait, recompute static eligibility against accepted predecessor assignments: if no allowlisted profile can satisfy capability, authority, and profile-independence constraints for any ready invocation, transition to blocked with `missing_permanent_capability`. If work remains statically eligible but the supplied snapshot has no complete live slot/offer edge, including a distinct executor where required, advance to ready with a `capacity_unavailable` waitGuard. The facade returns waiting once and cannot poll that snapshot again.

`prepareWave` first computes a deterministic per-ticket `resultLimits` allocation and the wave's worst-case legal `claimReserve` from remaining state, event, journal, revision, and callback-output capacity. If the full reserve cannot fit, it advances to blocked with `resource_limit_imminent` before any execution callback; the availability observation may already have returned. It then creates Assignment values and one WaveClaim, advances to a claimed state, computes that state digest, and derives ExecutionTickets. An advanced caller must install the claimed state as its serialized coordinator's current in-memory state before separately invoking any ticket callback; `runGoal` performs that local install before dispatch. This is process-local ordering, not durable persistence, a lease, or a distributed claim. Tickets in the wave may then execute concurrently. One serialized coordinator is conformant; crash recovery and distributed claim guarantees are deferred.

## Assignment, Claim, And Ticket

Assignment required fields are:

- `assignmentId` and `contentDigest`;
- run/orchestration IDs and GoalContract, Plan, Policy, Circuit, RunAuthority, and prior ready-state digests;
- invocation ID/address, WorkPacket ID/SnapshotDigest, logical role, node function, exact capabilities, permissions, and scope digests;
- AgentProfile ID/version/contentDigest;
- AvailabilitySnapshot ID/contentDigest and availability-projection digest;
- reservation ID, slot ordinal, executor ID/version, and AdapterManifest SnapshotDigest;
- GrantOffer ID/contentDigest and ExecutionGrant SnapshotDigest;
- every path-identity HostObservation digest used for conflict evaluation.

WaveClaim required fields are:

- `waveId`, `claimId`, `contentDigest`, and monotonically increasing wave ordinal;
- prior ready-state revision/digest;
- sorted Assignment IDs/contentDigests;
- claim revision equal to the successor claimed-state revision;
- one closed `claimReserve` with exact worst-case accepted successor-state bytes, event count/bytes, journal bytes, revision count, and conditional completed-result bytes for this wave;
- `cancellationStatus: not_requested`.

Creating the claim atomically appends every selected child-attempt key to OrchestrationState. A grant/attempt pair is consumed even when execution is later not started, rejected, cancelled, or uncertain; no cycle or continuation may reuse it.

WaveClaim is immutable. A later cancellation request is stored on the current claimed OrchestrationState and never rewrites the claim, assignments, tickets, or claimed-state binding.

ExecutionTicket required fields are:

- `ticketId` and `contentDigest`;
- run/orchestration IDs;
- GoalContract, RunAuthority, Policy, Circuit, Plan, and claimed-state digests;
- wave/claim and Assignment IDs/digests;
- Circuit node, concrete address, and invocation ID;
- WorkPacket ID/reference/SnapshotDigest and source repository/branch/baseline;
- logical role, node function, exact capability/permission/scope, criterion, input/output port, accepted input OutputReference, evidence, and independence bindings; for a memory node, exact eligible source OutputReference, evidence, and prior parent-event digests;
- AgentProfile, AvailabilitySnapshot/projection, reservation/slot, executor, AdapterManifest, GrantOffer, ExecutionGrant, and path-observation identities/digests;
- exact V10 run ID equal to the parent run ID, grant-supplied attempt ID, correlation ID equal to the ticket ID, grant ID, and RunAuthority execution policy;
- one closed `resultLimits` budget for OutputReferences, HostObservations, MemoryProposals, child-event snapshots, aggregate detached bytes, retained-state bytes, and parent-event bytes.

ExecutionTicket is closed serializable JSON. It contains only references, digests, IDs, codes, and bounded values; it never contains a detached artifact, function, executor handle, Promise, or AbortSignal. Tickets are never embedded in OrchestrationState or parent events.

`ExecutionDispatchRequest` is a transient host-language callback object, not a digestible kind or schema value. It contains the exact ExecutionTicket, detached WorkPacket, AdapterManifest, ExecutionGrant, host AbortSignal, and one core-owned `dispatchV10(executor)` function. Core digest-checks all detached serializable values before exposing the request. The one-shot function verifies the executor identity, increments the dispatch counter, and calls V10 with the ticket-bound run, attempt, correlation, policy, and signal. A second entry rejects before a second V10 call; if the first entry may have taken effect, later callback failure still maps to unknown effect. In a normal `reported` ExecutionReport, host observations forbid `dispatch_effect` and `zero_call` because core creates the sole dispatch observation from its counter. Advanced direct result submission may instead use the explicitly host-attested variants. The one-shot capability makes the conforming path observable but cannot prevent injected code from using ambient process authority; hosts that need enforcement must isolate the callback, which remains deferred. Functions, executor handles, and AbortSignal never enter JCS, state, events, or trace.

## ChildResultEnvelope

Every ChildResultEnvelope variant repeats run/orchestration, GoalContract, Policy, Plan, claimed-state, wave, claim, Assignment, ticket, invocation, packet, profile, availability/projection, reservation/slot, executor, manifest, GrantOffer, grant, and authority identities/digests plus `resultId` and `contentDigest`. One mismatch rejects the complete batch without mutation.

| Variant | Required fields | Forbidden fields |
| --- | --- | --- |
| `executed` | successful V10 OperationResult SnapshotDigest, detached ExecutionSummary plus SnapshotDigest, sorted child RunEvent SnapshotDigests, exactly one `dispatch_effect` HostObservation with status `settled`, other HostObservation values, OutputReference values, and non-empty MemoryProposal values exactly when a `memory` invocation maps an accepted completed outcome | rejection codes, zero-call observation, unknown-effect code; MemoryProposal values for every other case |
| `v10_rejected` | rejected V10 OperationResult SnapshotDigest, exactly one `dispatch_effect` HostObservation with status `settled`, and sorted sanitized diagnostic codes | ExecutionSummary, child journal, outputs, MemoryProposal values, zero-call observation |
| `not_started` | exactly one zero-call HostObservation, exactly one `dispatch_effect` HostObservation with status `not_dispatched`, and fixed reason code | V10 OperationResult, ExecutionSummary, child journal, outputs, MemoryProposal values |
| `effect_unknown` | fixed uncertainty code and exactly one `dispatch_effect` HostObservation with status `effect_unknown` | success outputs, MemoryProposal values, workflow outcome |

`executed` requires `OperationResult.ok: true`, a non-null ExecutionSummary, exact summary/result agreement, and exact child event snapshots. `v10_rejected` requires `OperationResult.ok: false` and null value. Raw diagnostics remain detached; only fixed catalog codes enter the envelope.

`not_started` is valid only before the V10 callback begins. `runGoal` can mark `core_observed`; an advanced host can mark `host_attested`, which core records as a claim rather than proof. Once callback initiation is ambiguous, only `effect_unknown` is valid. Any callback value beyond its ticket `resultLimits` after the dispatch counter reaches one is also `effect_unknown` because the software-work effect may already have occurred.

HostObservation common required fields are `observationId`, `observationKind`, `origin`, run ID, Plan digest, source-value digest, fixed result code, bounded source refs, and `contentDigest`.

Origin is one closed union:

- `core_observed` requires `actorRole: core` and forbids attestor and attestation fields;
- `host_attested` requires an allowlisted attestor ID/role plus attestation ref/digest and forbids `actorRole`.

Binding is one closed union:

- preflight `path_identity` binds the ready-state revision/digest, source baseline, and lexical scope; it forbids claimed-state, Assignment, and ticket fields because those values do not exist yet;
- result-time observations bind the original claimed-state, Assignment, and ticket identities/digests.

| Observation kind | Required variant fields | Permitted origin |
| --- | --- | --- |
| `zero_call` | callback count zero | core_observed or host_attested |
| `dispatch_effect` | dispatch count zero or one; status `not_dispatched`, `dispatched`, `settled`, or `effect_unknown`; fixed boundary/failure code | core_observed, or host_attested only when core cannot observe the boundary |
| `journal_bytes` | observed aggregate child-journal byte count and digest | core_observed |
| `output_bytes` | observed output byte count and payload digest | host_attested |
| `vcs_baseline` / `vcs_head` | repository identity and commit digest | host_attested |
| `changed_paths` | sorted lexical/canonical path pairs and baseline/head observation digests | host_attested |
| `path_identity` | lexical/canonical prefix, target mode, containment, link/reparse, case, identity, and scope status | host_attested |

RunAuthority allowlists only host attestors; core observations derive their actor internally. Core validates shape, binding, scope implications, and consistency but does not authenticate the host or independently observe its filesystem. Every executed result includes core-counted `journal_bytes` for its detached child events. Every OutputDraft has one matching host-attested `output_bytes` observation; core compares its size and payload digest with the draft but does not read the external output bytes. A ticket with any filesystem-write requiredPermission additionally requires exactly one result-time `vcs_baseline` matching RunAuthority source, one `vcs_head`, and one `changed_paths` observation that binds both; the changed-path array may be empty. Missing or internally inconsistent required effect observations after dispatch make the parent uncertain as `effect_unknown`, while a proven outside-scope change uses `out_of_scope_effect`.

ExecutionReport contains sorted OutputDraft values, never OutputReference values. A draft contains output port, kind/version, source ref, byte size, payload digest, optional schema ref/digest pair, and validating HostObservation digest; it contains no output ID, producer, Assignment, invocation, role, criterion, or evidence owner. Drafts sort by output port, kind, version, source ref, then payload digest.

Core validates each draft against the ticket and accepted observations, then creates OutputReference values in draft order. OutputReference required fields are `outputId`, producer Assignment/invocation/logical-role IDs and digests, output port, kind/version, source ref, byte size, `payloadDigest`, optional `schemaRef`/`schemaDigest`, validating HostObservation digest, and `contentDigest`. Worker payload cannot choose producer or evidence ownership.

## Complete Batch Reduction

`applyWaveResults` requires exactly one bound result per claimed Assignment. It validates the whole batch before mutation, sorts by Assignment ID, and advances one revision. Missing, extra, duplicate, stale, replayed, substituted, or malformed results reject the whole batch unchanged.

Result precedence and reduction are one deterministic two-pass operation:

1. validate every envelope, detached source, result limit, and whole-batch binding before deriving ordinary routes;
2. any `effect_unknown`, V10 `abort_unconfirmed`, out-of-scope observed change, or post-dispatch result-limit overflow makes the parent terminal `uncertain`; retain evidence digests but transfer no outputs and advance no workflow route;
3. if cancellation was requested, require every result to prove settled or not started, then make the parent `cancelled` with no output transfer or workflow route;
4. otherwise simulate every ordinary result mapping without mutation, resolve all branch terminality and canonical `any` winners from the complete batch, and only then apply accepted mappings in Assignment order;
5. for a claimed lower-priority loser after an `any` winner, retain its result/evidence and mark it skipped, but transfer no output, consume no route budget, and activate no successor;
6. apply mappings for every remaining executed/rejected result, close joins, create all outcome-triggered InputRequests, and derive memory candidates;
7. release a `not_started` invocation to ready only when its branch/mainline remains live after the simulated reduction; a newly skipped loser produces no wait;
8. emit one `wave.closed` event, then evidence, routing, join, input, memory, wait, and terminal events in canonical order.

If one or more live `not_started` invocations remain, install one `execution_not_started` waitGuard containing exactly those invocations and rejected semantic-candidate keys. The next continuation must supply a changed availability projection and a different candidate binding for each released invocation. Other legal terminal results in the same batch remain applied.

A cancellation request advances parent revision but does not alter WaveClaim ID/digest, claim revision, Assignment, ticket, or immutable claimed-state binding. Results bind that original claimed-state digest and are accepted only while the current claimed state references the exact active claim. When cancellation is already active, an exact repeat of the stored request ID/digest is detected before current-state freshness checks and returns deferred unchanged; a different request returns bound rejection `cancellation_conflict`.

## V10 Mapping

| Child case | Parent action without parent cancellation |
| --- | --- |
| `not_started` | release invocation to ready and install waitGuard; no route or output |
| `v10_rejected` | route `diagnose` when Circuit declares it, otherwise blocked |
| executed completed with workflow outcome | route exact outcome |
| executed completed without workflow outcome | contract failure; diagnose or blocked |
| executed failed with workflow outcome | route exact outcome |
| executed failed without workflow outcome | diagnose or failed when no recovery route |
| executed acknowledged cancellation | route `diagnose` when declared, otherwise fail with `child_cancelled` |
| executed confirmed timeout | route `diagnose` when declared, otherwise fail with `child_timed_out` |
| executed `abort_unconfirmed` | uncertain |
| `effect_unknown` | uncertain |

Automatic retry count is zero. Diagnosis and fix are explicit Circuit routes, use lane-local successors inside replication regions, and consume traversal budgets.

## Routes, Budgets, And Terminal States

Every validated V9 Circuit cyclic route already has `maxTraversals`. Plan snapshots the minimum of that value and any Policy or RunAuthority narrowing for the exact concrete route clone. Noncyclic routes have one legal activation per upstream activation and no invented loop budget. Compilation rejects a missing, drifted, widened, zero, or ambiguous budget.

Each accepted route traversal decrements its concrete remaining budget before activating its target. An exhausted recovery route or executed outcome with no legal successor becomes `failed`. `blocked` means no ambiguous effect occurred and progress cannot continue because of policy/preflight rejection, missing permanent capability, declined approval without a route, deadlock, invalid contract result, or no legal initial work.

One revision and one event are always reserved for terminal closure. A nonterminal transition that would consume either reserve instead advances to blocked with `resource_limit_imminent`. Terminal states are immutable.

## Join Semantics

Policy validation requires every fan-out to have at least one guaranteed concrete branch at its region minima. A derived join may therefore have one or many concrete sources but never zero.

A concrete branch is a fixed Circuit branch or one replication lane. Canonical priority follows the Circuit fan-out `branches` array; a replicated branch expands by variant ID, variant ordinal, then lane ordinal at that array position. The branch remains active through every lane-local diagnosis/fix successor until it reaches the join with valid outputs or reaches terminal non-success. Not-started, ready, claimed, input-required, or routed recovery is nonterminal.

`all` closes successfully only when every concrete branch succeeds and all claimed work has settled. `any` accepts the first canonical branch whose success is known after every higher-priority branch is terminal non-success. A requeued or routed higher-priority branch keeps the join open.

After an `any` winner is known, unclaimed lower-priority branches become skipped. Claimed lower-priority branches must settle and retain result/evidence digests, but their outputs never transfer. The join closes only after those claims settle. This produces the same winner at concurrency one and many.

If an `all` branch reaches unrecoverable non-success, or every `any` branch does, the join closes non-success and the run becomes failed when any branch executed or blocked when none did. Uncertainty always propagates instead. Only port-bound winner or all-branch outputs transfer. Circuit strategy, transfer rules, join node, and integration owner remain unchanged.

## Run Input, Approval, And Cancellation

Run InputRequest uses the common request contract and phase `run`. Purpose and allowed decisions are closed:

| Purpose | Decisions |
| --- | --- |
| `clarification` | `answer`, `block`, `cancel` |
| `risk_approval` | `approve`, `decline`, `cancel` |
| `owner_merge_approval` | `approve`, `decline`, `cancel` |

A PendingRequestSeed contains `requestSeedId`, source claimed-state/result/Assignment/invocation/activation IDs and digests, purpose, responder role, body ref/digest, sorted allowed decisions and decision actions, prior source-event digests, and `contentDigest`. It contains no InputRequest ID, current/future state digest, response, or callback value.

A run request has one closed subject: `invocation` binds one node/invocation/activation and its promoted seed, while `completion` binds the final merge gate and forbids node/invocation/seed fields. Before an invocation with `before_execution` risk policy can enter matching, `prepareWave` creates its request and advances to `input_required` without calling availability or execution. An `on_outcome` policy creates a clarification request only when the bound executed result emits `clarify`, and its body ref/digest comes from the declared accepted output port. After every other completion predicate holds, core creates the sole `owner_merge_approval` completion request when effective approval is required.

A wave may discover several invocation requests. Core creates one PendingRequestSeed per trigger in Assignment order, promotes the first seed into the sole InputRequest bound to that successor revision, and stores the remaining complete seeds in `queuedRequestSeeds`. `runGoal` exposes only the active request, and `resumeRun` accepts only that request. One response is consumed per transition and its exact decision action is applied in that same transition. If the action is nonterminal and seeds remain, core promotes the first seed into a new InputRequest bound to the new successor revision, remains `input_required`, and performs no availability or execution callback. If no seed remains, reduction continues from the action-updated state. A block or cancellation closes the run and discards the still-unpromoted seeds without treating them as answered. A queued seed never contains or predicts a future state digest, so sequential answers remain replay-safe without a digest cycle.

InputResponse binds the exact current input-required state and request. Core verifies every digest and that RunAuthority permits the responder role; the host authenticates the responder. An accepted response is recorded as consumed by the advanced revision and cannot replay.

`resumeRun` applies the request's exact decision action for clarification, risk approval, block, or decline. A missing, duplicate, or illegal action rejects the request contract before it is emitted. An owner approval that satisfies the final missing completion predicate transitions directly to completed. A run-phase `cancel` decision applies its bound nested CancellationRequest; planning-phase `cancel` closes the PlanningSession as blocked without creating run state.

CancellationRequest required fields are `cancelId`, run/orchestration/Plan/Policy/RunAuthority IDs and digests, current state revision/digest, actor ID/role, host identity-attestation ref/digest, one fixed reason code, optional external body ref/digest, and `contentDigest`. Reason is `user_request`, `policy`, `superseded`, `dependency_failed`, `parent_cancelled`, or `shutdown`. Wrong role, stale state, replay, or mismatched attestation rejects unchanged.

Cancellation of ready or input-required state is terminal immediately. Reason `user_request` maps to `cancelled_by_user`; `parent_cancelled` or `dependency_failed` maps to `cancelled_by_parent`; `policy`, `superseded`, or `shutdown` maps to `cancelled_by_policy`. Cancellation of claimed state records the request digest on a new parent revision while preserving the original claim/tickets; complete-batch precedence then settles uncertainty first and cancellation second.

## Completion

A run completes only when:

- every activated invocation is terminal (`succeeded`, `failed`, `blocked`, or `skipped`), with none ready, claimed, or input-required, and every activated branch is terminal with every required join closed successfully;
- every required port transfer is bound to an accepted OutputReference;
- every GoalContract criterion has every accepted producer, verifier, reviewer, and evidence binding required by its Plan coverage row and Policy;
- every Plan integration binding has accepted integrator outputs/evidence and the primary integrator has produced the completionPolicy merge-evidence references;
- verifier and reviewer invocations pass and satisfy every Policy independence constraint;
- effective owner merge approval required by Policy or RunAuthority is consumed;
- the Plan memory invocation has emitted at least one accepted source-linked MemoryProposal and every proposal has become exactly one MemoryCandidate;
- no active claim, waitGuard, pending input, uncertainty, route-budget failure, deadlock, or unresolved required evidence remains.

A MemoryProposal is permitted only in an accepted executed envelope for the Plan memory invocation. It contains `memoryProposalId`, `typeCode`, core-derived `destinationCode`, external body ref/digest, source Assignment/invocation, sorted accepted OutputReference/evidence/prior-event digests, and `contentDigest`; at least one source digest is present across those sets, every source is named by the ticket's exact eligible memory-source bindings, and every source was retained before the wave transition. Core derives exactly one MemoryCandidate per proposal in memory-proposal-ID order, adds Goal/criterion/run/Plan and proposal bindings, assigns the next candidate ID, and stores the complete candidate in state. The destination is fixed by type: `decision -> decisions`, `pattern -> patterns`, `known_issue -> known_issues`, `failed_attempt -> failed_attempts`, and `glossary -> glossary`. Neither value can mutate durable memory.

After the completed OrchestrationState and its `run.terminal` event exist, core creates one MergeReadyEvidence value outside the state/event digest graph and returns it from the completed advanced transition and facade result. It contains `mergeEvidenceId: merge.000001` and `contentDigest`, Goal/Policy/RunAuthority/Plan digests, final state revision/digest, terminal event ID/digest, primary and per-join integration bindings with accepted Assignment/result/output/evidence digests, every satisfied criterion binding, verifier/reviewer results, consumed owner-approval response when required, sorted complete MemoryCandidate digests, and the required accepted `vcs_head` HostObservation digest when configured. The completed facade result returns the complete sorted MemoryCandidate values and this MergeReadyEvidence. It never performs a Git merge or mutates durable project memory.

## OrchestrationEvent

OrchestrationEvent common required fields are `eventTypeVersion: 1.0.0`, orchestration ID, `eventId`, `sequence`, actor role, RunAuthority/Policy digests, `priorRootDigest` required on every event after the initial start transition and forbidden on that first transition, required `nextRootProjectionDigest`, `priorJournalDigest`, `priorJournalBytes`, `eventType`, one closed `payload`, and `contentDigest`. The initial event uses `priorJournalDigest` equal to `sha256:` plus 64 zeroes and `priorJournalBytes: 0`; each later event uses the exact post-event cursor of its predecessor. The first orchestration event forbids cause fields; every later event requires `causeEventId` and `causeEventDigest` for the immediately preceding parent event.

Sequence starts at 1 and increments by one across planning and run events for one orchestration ID. The first event has no cause. Every later event names exactly one earlier event in the same orchestration. Multiple events from one transition form a canonical chain in the order listed by this contract. Parent event IDs use the sequence ordinal and cannot collide with child RunEvent IDs.

| Event type | Exact closed payload properties |
| --- | --- |
| `planning.started` | `sessionId` |
| `planning.input_requested` | `requestId`, `inputRequestDigest` |
| `planning.input_consumed` | `requestId`, `inputRequestDigest`, `responseId`, `inputResponseDigest`, `responderRole` |
| `planning.blocked` | optional `proposalDigest`, required `terminalCode` |
| `plan.compiled` | `proposalId`, `proposalDigest`, `planId`, `planDigest` |
| `run.started` | `planningSessionDigest`, `planId`, `planDigest`, `runId` |
| `run.waiting` | `reason`, `availabilityDigest`, `projectionDigest`, sorted `rejectedCandidateKeys` |
| `wave.claimed` | `waveId`, `waveClaimDigest`, sorted `assignmentDigests`, sorted `grantOfferDigests` |
| `wave.cancellation_requested` | `waveClaimDigest`, `cancellationRequestDigest` |
| `wave.closed` | `waveClaimDigest`, sorted `childResultDigests` |
| `run.input_requested` | `requestId`, `inputRequestDigest`, `subjectKind`, optional `invocationId` and `requestSeedDigest` |
| `run.input_consumed` | `requestId`, `inputRequestDigest`, `responseId`, `inputResponseDigest`, `responderRole` |
| `invocation.activated` | `activationId`, `invocationId`, `sourceKind`, `sourceId`, `invocationActivationOrdinal` |
| `invocation.routed` | `invocationId`, `routeId`, `circuitRouteIdentity`, `outcome`, `remainingTraversals` |
| `port.transferred` | `sourceInvocationId`, `sourcePortId`, `destinationInvocationId`, `destinationPortId`, `outputReferenceDigest` |
| `join.closed` | `joinId`, `strategy`, sorted `branchIds`, sorted `acceptedResultDigests`, sorted `acceptedEvidenceDigests`, `status`, optional `winnerBranchId` |
| `evidence.recorded` | `invocationId`, sorted `criterionIds`, sorted `outputReferenceDigests`, sorted `hostObservationDigests` |
| `criterion.satisfied` | `criterionId`, sorted `producerBindings`, `verifierBindings`, `reviewerBindings`, and `evidenceBindings` |
| `memory.candidate_created` | `memoryProposalDigest`, `memoryCandidateDigest`, sorted `sourceRefs` |
| `run.terminal` | `status`, `terminalCode` |

Each event variant forbids every payload field not listed for it. Derived actor role comes from core/Policy; planner, responder, assignee, cancellation actor, and attestor roles come only from their accepted bound values. Worker payload never chooses a parent actor or owner.

Events reference child run/attempt IDs plus OperationResult, ExecutionSummary, child RunEvent, output, observation, and result digests. They never copy, renumber, or re-own child RunEvents. Trace inspection requires the retained root/event values and resolves detached source artifacts by digest; a completed state additionally requires the fixed `merge.000001` value supplied as a detached source. A missing source is reported as incomplete evidence, never reconstructed from prose.

## Payload Classification

| Data class | Canonical root/event | Transient or external only |
| --- | --- | --- |
| IDs, versions, enums, revisions, counts | Exact value | No |
| Digests, criterion/evidence/capability IDs | Exact value | No |
| Repository-relative source references and scope prefixes | Bounded value | No |
| Goal, criterion, prompt, question, answer, review, block, or memory prose | Reference and digest only | Body |
| Inline source excerpts | Reference, digest, byte count only | Excerpt body |
| Rejected values and raw exceptions | Fixed diagnostic code/pointer only | Raw value |
| Prompts, chats, hidden reasoning, credentials, environment, provider payloads | No | Entire payload |
| Command output, logs, evidence bytes, output bytes, VCS data | HostObservation and digest | Raw bytes |
| Planner WorkPacket candidates | SnapshotDigest in roots/events | Detached callback value |
| WorkPacket execution input, manifest, grant, AbortSignal | Digests in roots/events | Detached transient ticket values |

Sanitized diagnostics never interpolate rejected values. MemoryCandidate required fields are `candidateId`, type code `decision`, `pattern`, `known_issue`, `failed_attempt`, or `glossary`; GoalContract/criterion/run/Plan and MemoryProposal source bindings; sorted source refs and evidence/prior-event digests; proposed memory destination code; external body ref/digest; `status: proposed`; and `contentDigest`. Every source event must already exist before the transition that creates the proposal/candidate; neither value references its own `memory.candidate_created` event. They cannot contain a memory file body, mutation command, or accepted status.

## Resource Limits

| Boundary | Limit |
| --- | ---: |
| One public operation input or callback output aggregate JCS UTF-8 bytes | 1,048,576 |
| One canonical root JCS UTF-8 bytes | 1,048,576 |
| One state JCS UTF-8 bytes | 1,048,576 |
| One complete result batch aggregate JCS UTF-8 bytes | 1,048,576 |
| One OrchestrationEvent JCS UTF-8 bytes | 16,384 |
| Aggregate retained parent journal JCS UTF-8 bytes | 16,777,216 |
| One string UTF-8 bytes | 16,384 |
| Identifier characters | 128 |
| Snapshot depth / visited nodes | 64 / 100,000 |
| Concrete invocations / replication lanes per region | 256 / 32 |
| Modules / WorkPacket templates | 256 / 256 |
| Profiles / capabilities per profile or invocation | 64 / 64 |
| Slots / GrantOffers / matching edges | 64 / 16,384 / 16,384 |
| Concurrency / wave assignments | 32 / 32 |
| Path observations / source refs / inline excerpts | 768 / 256 / 128 |
| One excerpt / aggregate excerpt bytes | 8,192 / 262,144 |
| Prerequisites / derived bindings | 4,096 / 4,096 |
| Scope entries per invocation | 256 read, 256 write, 256 conflict |
| Outputs / evidence / HostObservations per result | 64 each |
| Planner callbacks / pending planning requests / active-plus-queued run requests | 8 / 1 / 32 |
| Run revisions / parent events | 10,000 / 10,000 |
| Automatic retries | 0 |

An aggregate is represented for counting as one JCS array in the contract's canonical item order. Incremental accounting must produce the same byte count as final RFC 8785 serialization without first materializing an over-limit value. Input limits are checked before planner/worker callbacks. Pre-dispatch callback-output limits are checked immediately after return and before compilation, state allocation, downstream callbacks, or event append. An execution callback that exceeds its ticket limit after dispatch is reduced to `effect_unknown` rather than rejected as if no effect occurred. State/event/journal ceilings are checked before successor construction. Tests cover minus one, exact, and plus one.

Every nonterminal successor reserves one revision, one event count, 16,384 state bytes, and 16,385 aggregate-journal bytes for terminal closure. A claim whose accepted results could satisfy completion also reserves the worst-case contract-valid MergeReadyEvidence, returned MemoryCandidate values, and facade/transition wrapper bytes under each ticket resultLimits. Before owner approval or any other non-worker completion transition, core computes that completion-output bound from retained fixed-size identities/digests and blocks with `resource_limit_imminent` if it cannot fit. The journal reserve covers one maximum-size event plus its array separator. Only a terminal transition may consume those reserves; if the exact terminal state or event still cannot fit, the preceding transition must close as `resource_limit_imminent` instead of creating the nonterminal successor.

## Portability Projection

Byte conformance is strict: with the same host-supplied IDs, GoalContract, PolicyBundle, RunAuthority, profiles, proposal, availability values, detached inputs, and child results, two implementations emit byte-identical Plans, states, and events.

Semantic host portability permits different authority IDs, executor, reservation, manifest, grant, attestor, canonical-path, V10 run/attempt/event, VCS, and parent-event provenance while retaining the same logical profiles, permissions, repository-relative effects, and software outcomes. It operates on one complete retained trace bundle:

1. validate the complete acyclic root, nested-value, event, and detached-source reference graph; a missing, duplicate, or digest-mismatched source makes projection incomplete;
2. remove each value's own `contentDigest`, then project referenced values before referrers;
3. from RunAuthority remove metadata identity plus executor, grant-issuer, and attestor allowlists, while retaining goal/policy/source, profile allowlist, responder/cancellation roles, ceilings, limits, and approval requirements;
4. from AvailabilitySnapshot, GrantOffer, Assignment, ExecutionTicket, ChildResultEnvelope, HostObservation, and MergeReadyEvidence remove availability/projection/offer/observation/merge identities, reservation/slot, executor, AdapterManifest, ExecutionGrant, V10 run/attempt/correlation/grant, attestor/attestation, canonical-host-identity, and host VCS identity fields;
5. project detached AdapterManifest and ExecutionGrant values to normalized required permissions; project V10 OperationResult, ExecutionSummary, and child RunEvent values by removing executor/grant/run/attempt/correlation/event/time provenance while retaining disposition, state, terminal/failure/workflow outcomes, evidence kinds, and semantic evidence/output digests;
6. replace each removed execution binding with profile ID/version, sorted capability IDs, exact required permissions, normalized lexical repository scopes, observation kind/status, and semantic output digest;
7. project parent events in sequence: remove event IDs, replace cause identity with prior sequence, replace prior-root and next-root-projection digests with the corresponding projected non-trace root digests, and recompute each projected prior-journal cursor plus the semantic journal chain from projected event JCS bytes;
8. in projected PlanningSession and OrchestrationState values, replace raw event-tail and journal fields with last sequence, projected tail-event digest, semantic journal digest, and semantic journal bytes; the projected non-trace root digest used by events is computed before those cursor fields, preserving the raw acyclic construction;
9. in every projected referrer, not only events, replace each raw reference digest with the projected digest of its referenced value; then sort arrays by their documented logical key, serialize with RFC 8785 JCS, and hash whenever a projected digest is referenced.

Invocation-to-profile mapping, logical roles, capabilities, required permissions, routes, outcomes, activation counts, joins/winners, integration bindings, port transfers, criteria, evidence ownership, terminal state, MemoryProposal-to-MemoryCandidate provenance, and merge-readiness predicates remain and must match. A removed host field that changes one of those retained semantics is not portable equality.

Different planners are not required to create the same proposal. The same validated proposal, detached candidate packets, and compiler inputs must create the same Plan.

## Fixed Code Catalog

Only these non-V10 orchestration control codes can enter roots, events, or result unions:

| Class | Closed values |
| --- | --- |
| Wait reason | `capacity_unavailable`, `execution_not_started` |
| Completed terminal | `success` |
| Failed terminal | `workflow_failed`, `child_cancelled`, `child_timed_out`, `route_budget_exhausted`, `join_failed` |
| Blocked terminal | `planner_blocked`, `planner_limit_exhausted`, `planner_callback_failed`, `availability_callback_failed`, `policy_nonconforming`, `missing_permanent_capability`, `resource_limit_imminent`, `risk_declined`, `input_blocked`, `owner_declined`, `deadlock`, `contract_result_invalid`, `no_legal_initial_work` |
| Cancelled terminal | `cancelled_by_user`, `cancelled_by_policy`, `cancelled_by_parent` |
| Uncertain terminal | `effect_unknown`, `abort_unconfirmed`, `out_of_scope_effect`, `post_dispatch_limit_exceeded` |
| Not-started reason | `execution_callback_failed_pre_dispatch`, `host_attested_not_started` |
| Unknown-effect reason | `execution_callback_failed_post_dispatch`, `dispatch_boundary_unknown`, `post_dispatch_limit_exceeded` |
| Deferred reason | `cancellation_already_requested` |

Bound/unbound rejection diagnostics use only: `orchestration.invalid_shape`, `orchestration.unknown_field`, `orchestration.digest_mismatch`, `orchestration.stale_revision`, `orchestration.tail_mismatch`, `orchestration.duplicate_id`, `orchestration.limit_exceeded`, `orchestration.policy_bundle_closure`, `orchestration.authority_widening`, `orchestration.proposal_binding`, `orchestration.packet_narrowing`, `orchestration.coverage_invalid`, `orchestration.integration_invalid`, `orchestration.matching_invalid`, `orchestration.availability_invalid`, `orchestration.grant_replay`, `orchestration.result_batch_invalid`, `orchestration.input_invalid`, `orchestration.cancellation_conflict`, `orchestration.terminal_immutable`, and `orchestration.source_missing`. JSON pointers and fixed hints may accompany a code; rejected values, callback exceptions, and provider text may not.

## Canonical Ordering

Every array is either declaration-ordered by a retained V9 source or sorted by one comparator below. A schema array with no comparator here is a contract defect and blocks implementation. Comparisons are lexicographic over the listed tuple; strings use unsigned UTF-8 bytes, integers use ascending numeric order, and an absent optional value sorts before a present value.

| Array/value family | Total comparator |
| --- | --- |
| Circuit nodes/routes/fan-outs/joins/transfers and Module requirements | Retained source declaration index; derived copies add region ID, variant ID, variant ordinal, lane ordinal |
| Policy node rows | Circuit node declaration index, node ID |
| Policy variants and variant bounds | Variant ID |
| Replication regions | Lowest contained Circuit-node declaration index, region ID |
| Module/template/profile refs or digests | Source ID, optional version, digest |
| Permission items | Kind, then each normalized scope; scope arrays sort by scope |
| Path scopes/observations | Lexical prefix, canonical prefix, observation ID |
| EvidenceRequirementRef | Source kind, source ID, source digest, collection, evidence ID |
| Goal criteria and coverage rows | Criterion ID |
| Coverage selectors | Circuit node declaration index, node ID, selector mode, variant IDs |
| Lane selections | Region order, variant ID, variant ordinal |
| Concrete addresses/invocations | Expansion/invocation ordinal |
| Packet bindings | Concrete-address comparator |
| Routes, branches, joins, integration bindings, port bindings | Allocated six-digit ID ordinal |
| Route budgets | Concrete route ID |
| Agent profiles | Profile ID, version, content digest |
| Availability slots | Profile ID, profile version, reservation ID, slot ordinal, executor ID, executor version |
| GrantOffers | Retained semantic-candidate tuple, then offer ID |
| Matching edges/Assignments/tickets/results | Invocation ready order, candidate slot rank, then allocated ID |
| Child RunEvents | V10 sequence, event ID, SnapshotDigest |
| OutputDrafts | Output port, kind, version, source ref, payload digest |
| OutputReferences, HostObservations, MemoryProposals, MemoryCandidates | Allocated ID ordinal |
| PendingRequestSeeds/InputRequests/InputResponses/CancellationRequests | Allocated ID ordinal |
| Invocation/branch/join/criterion state rows | Plan order for that value family |
| Source refs and external refs | Ref string, digest |
| Accepted producer/verifier/reviewer/evidence bindings | Plan binding ID, accepted Assignment ID, source digest |
| Parent OrchestrationEvents | Sequence, event ID |
| Diagnostic values | Existing `sortAndDeduplicateDiagnostics` order |
| Scalar ID/digest sets not otherwise listed | String value |

## Public Operation Signatures

This TypeScript-shaped declaration is normative for call boundaries; each named object is a closed readonly value using the property contracts above. Pure operations do no callback, filesystem, network, Git, or durable-memory work.

```ts
interface PolicyBundle {
  readonly policy: OrchestrationPolicy;
  readonly circuit: CircuitArtifact;
  readonly modules: readonly ModuleArtifact[];
  readonly workPacketTemplates: readonly WorkPacketArtifact[];
}

interface WaitGuard {
  readonly reason: OrchestrationWaitReason;
  readonly availabilityDigest: string;
  readonly projectionDigest: string;
  readonly rejectedInvocationCandidateKeys: readonly {
    readonly invocationId: string;
    readonly semanticCandidateKey: string;
  }[];
  readonly eventId: string;
}

interface OrchestrationTraceSummary {
  readonly orchestrationId: string;
  readonly eventTypeVersion: "1.0.0";
  readonly firstSequence: number;
  readonly lastSequence: number;
  readonly firstEventId: string;
  readonly lastEventId: string;
  readonly eventCount: number;
  readonly rootDigests: readonly string[];
  readonly childRunCount: number;
  readonly evidenceCount: number;
  readonly journalDigest: string;
  readonly journalBytes: number;
  readonly status:
    | "planning"
    | "running"
    | "input_required"
    | "waiting"
    | "completed"
    | "failed"
    | "blocked"
    | "cancelled"
    | "uncertain";
  readonly sourceStatus: "complete" | "incomplete_sources";
}

type PlannerCallbackResult =
  | {
      readonly kind: "proposal";
      readonly proposal: PlanProposal;
      readonly candidateWorkPackets: readonly WorkPacketArtifact[];
    }
  | {
      readonly kind: "question";
      readonly purposeCode:
        | "requirements_clarification"
        | "scope_choice"
        | "architecture_choice"
        | "verification_choice"
        | "authority_choice"
        | "risk_choice";
      readonly responderRole: string;
      readonly allowedDecisionCodes: readonly ["answer", "block", "cancel"];
      readonly bodyRef: string;
      readonly bodyDigest: string;
    }
  | {
      readonly kind: "block";
      readonly terminalCode: "planner_blocked";
      readonly bodyRef?: string;
      readonly bodyDigest?: string;
    };

interface ExecutionDispatchRequest {
  readonly ticket: ExecutionTicket;
  readonly workPacket: WorkPacketArtifact;
  readonly adapterManifest: AdapterManifestArtifact;
  readonly executionGrant: ExecutionGrant;
  readonly signal: AbortSignal;
  readonly dispatchV10: (
    executor: WorkPacketExecutor,
  ) => Promise<OperationResult<ExecutionSummary>>;
}

type PlanningOperationResult =
  | {
      readonly kind: "planning_advanced";
      readonly priorSessionDigest: string;
      readonly session: Extract<PlanningSession, { status: "compiled" }>;
      readonly events: readonly OrchestrationEvent[];
      readonly plan: OrchestrationPlan;
    }
  | {
      readonly kind: "planning_advanced";
      readonly priorSessionDigest: string;
      readonly session: Exclude<PlanningSession, { status: "compiled" }>;
      readonly events: readonly OrchestrationEvent[];
    }
  | {
      readonly kind: "planning_rejected_unbound";
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "planning_rejected_bound";
      readonly sessionId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly diagnostics: readonly Diagnostic[];
    };

type TransitionResult =
  | {
      readonly kind: "transition_advanced";
      readonly priorStateDigest: string;
      readonly state: Extract<OrchestrationState, { status: "claimed" }>;
      readonly events: readonly OrchestrationEvent[];
      readonly tickets: readonly ExecutionTicket[];
    }
  | {
      readonly kind: "transition_advanced";
      readonly priorStateDigest: string;
      readonly state: Extract<OrchestrationState, { status: "completed" }>;
      readonly events: readonly OrchestrationEvent[];
      readonly mergeReadyEvidence: MergeReadyEvidence;
    }
  | {
      readonly kind: "transition_advanced";
      readonly priorStateDigest: string;
      readonly state: Exclude<
        OrchestrationState,
        { status: "claimed" | "completed" }
      >;
      readonly events: readonly OrchestrationEvent[];
    }
  | {
      readonly kind: "transition_deferred";
      readonly runId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly reason: "cancellation_already_requested";
    }
  | {
      readonly kind: "transition_rejected_unbound";
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "transition_rejected_bound";
      readonly runId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly diagnostics: readonly Diagnostic[];
    };

type PlannerCallback = (
  input: PlannerCallbackInput,
) => Promise<PlannerCallbackResult>;

interface PlannerCallbackInput {
  readonly session: PlanningSession;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
}

type AvailabilityCallback = (
  input: AvailabilityCallbackInput,
) => Promise<AvailabilityCallbackResult>;

interface AvailabilityCallbackInput {
  readonly state: OrchestrationState;
  readonly tailEvent: OrchestrationEvent;
  readonly plan: OrchestrationPlan;
  readonly readyInvocationIds: readonly string[];
}

interface AvailabilityCallbackResult {
  readonly snapshot: AvailabilitySnapshot;
  readonly adapterManifests: readonly AdapterManifestArtifact[];
  readonly executionGrants: readonly ExecutionGrant[];
  readonly pathObservations: readonly HostObservation[];
}

type ExecutionCallback = (
  input: ExecutionDispatchRequest,
) => Promise<ExecutionReport>;

type ExecutionReport =
  | {
      readonly kind: "reported";
      readonly operationResult: OperationResult<ExecutionSummary>;
      readonly outputDrafts: readonly OutputDraft[];
      readonly hostObservations: readonly HostObservation[];
      readonly memoryProposalDrafts: readonly MemoryProposalDraft[];
    }
  | {
      readonly kind: "not_started_attested";
      readonly zeroCallObservation: HostObservation;
      readonly dispatchObservation: HostObservation;
    }
  | {
      readonly kind: "effect_unknown_attested";
      readonly dispatchObservation: HostObservation;
    };

type InputCallback = (
  input: InputCallbackInput,
) => Promise<InputResponse | null>;

type InputCallbackInput =
  | {
      readonly phase: "planning";
      readonly request: InputRequest;
      readonly session: PlanningSession;
    }
  | {
      readonly phase: "run";
      readonly request: InputRequest;
      readonly state: OrchestrationState;
    };

type MemoryTypeCode =
  | "decision"
  | "pattern"
  | "known_issue"
  | "failed_attempt"
  | "glossary";

type MemoryDestinationCode =
  | "decisions"
  | "patterns"
  | "known_issues"
  | "failed_attempts"
  | "glossary";

interface OutputDraft {
  readonly outputPortId: string;
  readonly kind: string;
  readonly version: string;
  readonly sourceRef: string;
  readonly byteSize: number;
  readonly payloadDigest: string;
  readonly schemaRef?: string;
  readonly schemaDigest?: string;
  readonly validatingObservationDigest: string;
}

interface MemoryProposalDraft {
  readonly typeCode: MemoryTypeCode;
  readonly bodyRef: string;
  readonly bodyDigest: string;
  readonly sourceOutputReferenceDigests: readonly string[];
  readonly sourceEvidenceDigests: readonly string[];
  readonly sourcePriorEventDigests: readonly string[];
}

interface RunGoalCallbackSet {
  readonly planner: PlannerCallback;
  readonly availability: AvailabilityCallback;
  readonly execution: ExecutionCallback;
  readonly input: InputCallback;
}

type RunGoalCommand =
  | {
      readonly kind: "start";
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly requestedConcurrency?: number;
      readonly callbacks: RunGoalCallbackSet;
    }
  | {
      readonly kind: "continue_planning";
      readonly session: PlanningSession;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly response?: InputResponse;
      readonly callbacks: RunGoalCallbackSet;
    }
  | {
      readonly kind: "continue_run";
      readonly state: OrchestrationState;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plan: OrchestrationPlan;
      readonly workPackets: readonly WorkPacketArtifact[];
      readonly interaction?:
        | Readonly<{ kind: "input"; response: InputResponse }>
        | Readonly<{ kind: "cancel"; request: CancellationRequest }>;
      readonly callbacks: Omit<RunGoalCallbackSet, "planner">;
    };

type RunGoalResult =
  | {
      readonly kind: "input_required";
      readonly phase: "planning";
      readonly session: PlanningSession;
      readonly request: InputRequest;
      readonly pendingRequestCount: 1;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "input_required";
      readonly phase: "run";
      readonly state: OrchestrationState;
      readonly request: InputRequest;
      readonly pendingRequestCount: number;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "waiting";
      readonly state: OrchestrationState;
      readonly waitGuard: WaitGuard;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "completed";
      readonly state: OrchestrationState;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
      readonly memoryCandidates: readonly MemoryCandidate[];
      readonly mergeReadyEvidence: MergeReadyEvidence;
    }
  | {
      readonly kind: "failed" | "cancelled" | "uncertain";
      readonly state: OrchestrationState;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "blocked";
      readonly phase: "planning";
      readonly session: PlanningSession;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "blocked";
      readonly phase: "run";
      readonly state: OrchestrationState;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "rejected_unbound";
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "rejected_bound";
      readonly phase: "planning";
      readonly sessionId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "rejected_bound";
      readonly phase: "run";
      readonly runId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly diagnostics: readonly Diagnostic[];
    };

declare function validateOrchestrationValue(
  value: unknown,
  source?: string,
): OperationResult<OrchestrationEnvelope>;

declare function snapshotDigest(value: unknown): OperationResult<string>;
declare function contentDigest(value: unknown): OperationResult<string>;

declare function projectOrchestrationSemantics(
  input: InspectOrchestrationTraceInput,
): OperationResult<
  | {
      readonly sourceStatus: "complete";
      readonly projectionDigest: string;
      readonly projectedValue: unknown;
    }
  | {
      readonly sourceStatus: "incomplete_sources";
      readonly missingSourceRefs: readonly string[];
    }
>;

declare function startPlanning(input: StartPlanningInput): PlanningOperationResult;
interface StartPlanningInput {
  readonly orchestrationId: string;
  readonly sessionId: string;
  readonly planId: string;
  readonly runId: string;
  readonly requestedConcurrency?: number;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
}

declare function applyPlannerResult(
  input: ApplyPlannerResultInput,
): PlanningOperationResult;
interface ApplyPlannerResultInput {
  readonly session: PlanningSession;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
  readonly plannerResult: PlannerCallbackResult;
}

declare function resumePlanning(input: ResumePlanningInput): PlanningOperationResult;
interface ResumePlanningInput {
  readonly session: PlanningSession;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
  readonly response: InputResponse;
}

declare function compilePlan(input: CompilePlanInput): CompilePlanResult;
interface CompilePlanInput {
  readonly readySession: PlanningSession;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
  readonly proposal: PlanProposal;
  readonly candidateWorkPackets: readonly WorkPacketArtifact[];
}
type CompilePlanResult =
  | Readonly<{ kind: "compiled"; plan: OrchestrationPlan }>
  | Readonly<{ kind: "blocked"; terminalCode: OrchestrationBlockedCode }>
  | Readonly<{ kind: "rejected"; diagnostics: readonly Diagnostic[] }>;

declare function startRun(input: StartRunInput): TransitionResult;
interface StartRunInput {
  readonly compiledSession: PlanningSession;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
  readonly plan: OrchestrationPlan;
  readonly workPackets: readonly WorkPacketArtifact[];
}

declare function prepareWave(input: PrepareWaveInput): TransitionResult;
interface PrepareWaveInput {
  readonly state: OrchestrationState;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly profiles: readonly AgentProfile[];
  readonly plan: OrchestrationPlan;
  readonly workPackets: readonly WorkPacketArtifact[];
  readonly availability?: AvailabilityCallbackResult;
}

declare function applyWaveResults(input: ApplyWaveResultsInput): TransitionResult;
interface ApplyWaveResultsInput {
  readonly state: OrchestrationState;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly plan: OrchestrationPlan;
  readonly workPackets: readonly WorkPacketArtifact[];
  readonly results: readonly ChildResultEnvelope[];
  readonly operationResults: readonly OperationResult<ExecutionSummary>[];
  readonly executionSummaries: readonly ExecutionSummary[];
  readonly childEvents: readonly RunEventArtifact[];
}

declare function resumeRun(input: ResumeRunInput): TransitionResult;
interface ResumeRunInput {
  readonly state: OrchestrationState;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly plan: OrchestrationPlan;
  readonly response: InputResponse;
}

declare function cancelRun(input: CancelRunInput): TransitionResult;
interface CancelRunInput {
  readonly state: OrchestrationState;
  readonly tailEvent: OrchestrationEvent;
  readonly authority: RunAuthority;
  readonly plan: OrchestrationPlan;
  readonly request: CancellationRequest;
}

declare function inspectOrchestrationTrace(
  input: InspectOrchestrationTraceInput,
): OperationResult<OrchestrationTraceSummary>;

interface InspectOrchestrationTraceInput {
  readonly roots: readonly (
    | PlanningSession
    | OrchestrationPlan
    | OrchestrationState
  )[];
  readonly events: readonly OrchestrationEvent[];
  readonly detachedSources: readonly unknown[];
}

declare function runGoal(command: RunGoalCommand): Promise<RunGoalResult>;
```

`validateOrchestrationValue` accepts only the seven root kinds and validates every nested discriminator recursively. `snapshotDigest` accepts only a complete validated or normalized Circuit, Module, WorkPacket, AdapterManifest, ExecutionGrant, V10 OperationResult, ExecutionSummary, or RunEvent value. `contentDigest` accepts only a recognized V11 root or digestible nested kind and recomputes its expected own-field digest. Unknown kinds, unresolved schema variants, non-JSON values, unsafe numbers, and malformed closed shapes reject; neither helper hashes arbitrary unchecked JSON.

`prepareWave.availability` is forbidden when a pre-execution request or completion decision can be derived without capacity data and required otherwise. In every optional-field pair above, exactly one of the documented session/state variants is present; JSON schemas express these as closed unions rather than independently optional properties. `PlannerCallbackResult` is the proposal/question/block union above. `PlanningOperationResult`, `TransitionResult`, and `RunGoalResult` are exhaustive closed unions. Conditional `plan`, `tickets`, and `mergeReadyEvidence` fields are required exactly for compiled, claimed, and completed successors respectively and forbidden otherwise. `runGoal` accepts the three command variants in Simple Facade, invokes planner at most `L` times and each ticket callback at most once, and offers each active request to the input callback once. A valid returned response continues reduction; null, exception, or invalid unbound response leaves the canonical request unresolved and returns `input_required`. The facade returns on the first unresolved input, wait, terminal, or rejection boundary. Callbacks never enter a digestible value.
## Package And Compatibility

The existing package has one public export-map key, `.`. Its `types` target remains `./dist/index.d.ts` and its `import` target remains `./dist/index.js`. The exact current root names below remain type- and value-identical:

```txt
API_VERSION ARTIFACT_KINDS EVENT_TYPE_VERSION LIMITS TOOLCHAIN
createDiagnostic DIAGNOSTIC_DEFINITIONS exitCodeForDiagnostics sortAndDeduplicateDiagnostics
createDeterministicTestExecutor executeWorkPacket initializeProject parseJsonBuffer inspectTrace
validateArtifactValue validateProject createToolchainProbe
ExecuteWorkPacketOptions ExecutionDisposition ExecutionFailureCode ExecutionGrant
ExecutionGrantPermission ExecutionPolicy ExecutionSummary ExecutionWorkflow FailedTerminalCode
WorkPacketExecutor WorkPacketExecutorRequest WorkPacketExecutorSettlement
AdapterManifestArtifact PermissionRequest RunEventArtifact RunEventEvidenceReference WorkPacketArtifact
CancellationReasonCode Diagnostic DiagnosticSeverity EvidenceKind ExecutionState ExitCode
InitializeProjectOptions InspectTraceOptions OperationResult ProjectInitializationSummary
ProjectValidationSummary RunEventType TerminalCode TraceAttemptSummary TraceEvidenceSummary
TraceInspectionSummary TraceRunSummary TraceWorkflowOutcomeSummary ValidateProjectOptions
ValidatedArtifactSummary WorkflowOutcome WorkflowStage
```

`ArtifactKind` and `ArtifactEnvelope` exist internally today but are not root exports; V11 does not falsely classify them as preserved public names. `ARTIFACT_KINDS` remains the same six values and no V11 kind enters it.

V11 adds exactly these root names:

```txt
ORCHESTRATION_API_VERSION ORCHESTRATION_EVENT_TYPE_VERSION ORCHESTRATION_LIMITS
ORCHESTRATION_KINDS OrchestrationKind OrchestrationEnvelope
CircuitArtifact ModuleArtifact
OrchestrationPolicy RunAuthority AgentProfile PlanningSession OrchestrationPlan
OrchestrationState OrchestrationEvent GoalContract PlanProposal PendingRequestSeed
InputRequest InputResponse CancellationRequest AvailabilitySnapshot GrantOffer Assignment
WaveClaim ExecutionTicket ChildResultEnvelope OutputReference HostObservation MemoryProposal
MemoryCandidate MergeReadyEvidence MemoryTypeCode MemoryDestinationCode
PolicyBundle EvidenceRequirementRef WaitGuard
ExecutionDispatchRequest OutputDraft MemoryProposalDraft OrchestrationTraceSummary
OrchestrationWaitReason OrchestrationCompletedCode OrchestrationFailedCode
OrchestrationBlockedCode OrchestrationCancelledCode OrchestrationUncertainCode
OrchestrationDiagnosticCode OrchestrationNotStartedReasonCode
OrchestrationUnknownEffectReasonCode OrchestrationDeferredReasonCode
PlannerCallback PlannerCallbackInput PlannerCallbackResult AvailabilityCallback
AvailabilityCallbackInput AvailabilityCallbackResult ExecutionCallback ExecutionReport
InputCallback InputCallbackInput RunGoalCallbackSet PlanningOperationResult TransitionResult
CompilePlanResult RunGoalCommand RunGoalResult StartPlanningInput ApplyPlannerResultInput
ResumePlanningInput CompilePlanInput StartRunInput PrepareWaveInput ApplyWaveResultsInput
ResumeRunInput CancelRunInput InspectOrchestrationTraceInput
validateOrchestrationValue snapshotDigest contentDigest projectOrchestrationSemantics
startPlanning applyPlannerResult resumePlanning compilePlan startRun prepareWave
applyWaveResults resumeRun cancelRun inspectOrchestrationTrace runGoal
```

`CircuitArtifact` and `ModuleArtifact` already exist internally and become additive root type exports because PolicyBundle requires callers to supply those exact values. No other current internal model type is newly exported.

The export map adds exactly these JSON schema subpaths:

```txt
./schemas/orchestration/v1alpha1
./schemas/orchestration/v1alpha1/common
./schemas/orchestration/v1alpha1/orchestration-policy
./schemas/orchestration/v1alpha1/run-authority
./schemas/orchestration/v1alpha1/agent-profile
./schemas/orchestration/v1alpha1/planning-session
./schemas/orchestration/v1alpha1/orchestration-plan
./schemas/orchestration/v1alpha1/orchestration-state
./schemas/orchestration/v1alpha1/orchestration-event
```

Each maps directly to the same-named `schemas/orchestration/v1alpha1/*.schema.json` file; the family root maps to `index.schema.json`. No wildcard, runtime filesystem discovery, or dynamic adapter loading is introduced. Packed-consumer tests snapshot the old declaration surface, import every new exhaustive union/schema path, validate both families independently, run one-agent start/input/wait/continue/terminal flow offline, and prove existing consumer source compiles without modification.

## Conformance Gate

Implementation may begin only after this contract, ADR 0003, spec, plan, test plan, review packet, milestone, and memory agree on the same exact commit and independent product, API, lifecycle, and security reviewers all return `PASS`.
