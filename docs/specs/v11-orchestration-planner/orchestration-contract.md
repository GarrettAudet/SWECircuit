# V11 Orchestration Contract

## Status

Proposed revision 4. This document is normative for the V11 implementation candidate and subordinate to accepted ADRs. It is not implemented. Revision 4 incorporates every finding from architecture review Round 3. Any conflict with ADR 0003 blocks implementation until both are reconciled.

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

- `SourceReference`
- `GoalContract`
- `TaskAuthorityProjection`
- `PlanProposal`
- `AgentBlueprintIntent`
- `AgentBlueprint`
- `PendingRequestSeed`
- `InputRequest`
- `InputResponse`
- `CancellationRequest`
- `ResponseInputBinding`
- `ActivationApprovalBinding`
- `AvailabilitySnapshot`
- `GrantOffer`
- `Assignment`
- `WaveClaim`
- `ExecutionTicket`
- `AgentMaterializationReceipt`
- `ChildResultEnvelope`
- `OutputReference`
- `HostObservation`
- `EvidenceBinding`
- `EvidenceSatisfaction`
- `AcceptedWorkAccumulator`
- `MemoryProposal`
- `MemoryCandidate`
- `MergeReadyEvidence`
- `RepositoryStateRequest`
- `RepositoryStateWitness`
- `AcceptedWorkProjection`

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
response binding: response-binding.000001
approval binding: approval-binding.000001
evidence binding: evidence-binding.000001
evidence satisfaction: satisfaction.000001
agent blueprint: blueprint.000001
agent blueprint intent: intent.000001
assignment: asn.000001
wave: wave.000001
claim: claim.000001
ticket: ticket.000001
materialization receipt: materialization.000001
proposal: proposal.000001
packet: packet.000001
request seed: request-seed.000001
request: request.000001
response: response.000001
cancel: cancel.000001
result: result.000001
output: output.000001
observation: observation.000001
repository request: repository-request.000001
repository witness: repository.000001
accepted work: accepted-work.000001
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

### Derived Digest Registry

Every derived digest in this table uses the same framing: `SHA-256(ASCII(domainTag) || 0x00 || uint64be(jcsByteLength) || JCS(preimage))`. The result uses the normal `sha256:` plus 64 lowercase hexadecimal grammar. Preimages are closed JSON values; tuple notation below means a JSON array in the listed order. No implementation may substitute concatenated strings, host object order, or an unregistered domain tag.

| Digest | Domain tag | Exact preimage and order |
| --- | --- | --- |
| WorkPacket field projection | `swecircuit.v11.work-packet-field/<field>` where `<field>` is one of the eight literal field names | The complete validated value of that exact WorkPacket field, preserving its contract order |
| ContextUseBinding row | `swecircuit.v11.context-use-binding` | The complete validated non-digestible ContextUseBinding row |
| readySetDigest | `swecircuit.v11.ready-set` | `{ runId, stateRevision, stateDigest, rows }`; rows are `[invocationId, activationId, agentBlueprintId, agentBlueprintDigest, workPacketId, workPacketSnapshotDigest]` in canonical capacity-ready order |
| availability projection | `swecircuit.v11.availability-projection` | The closed sorted slot, detached-offer, and path-semantics rows defined under Availability, after removing the listed identities |
| semantic candidate key | `swecircuit.v11.semantic-candidate` | The closed tuple listed under OrchestrationState, in that exact field order |
| writeEffectSetDigest | `swecircuit.v11.write-effect-set` | The complete writeEffectBinding rows in normative write-effect order |
| repositoryTreeDigest | `swecircuit.v11.repository-tree` | Complete `[path, entryKind, mode, byteSize, payloadDigest]` rows in Portable Path order |
| changeDigest | `swecircuit.v11.repository-change` | `{ baselineTreeDigest, repositoryTreeDigest, rows }`; rows are complete `[path, changeKind, beforeDigest-or-null, afterDigest-or-null]` values in Portable Path order |

The eight WorkPacket field projections and every ContextUseBinding-row digest are recomputed from the complete detached WorkPacket and intent before blueprint or materialization validation. Any derived digest not registered here must define equivalent domain tag, closed preimage, order, framing, algorithm, and output grammar in its own normative section before use.

### Source References

Every V11 field named `bodyRef`, `sourceRef`, `schemaRef`, `provenanceRef`, `attestationRef`, `requirementRef`, or another documented external reference uses one closed digestible `SourceReference` value rather than a free-form string. Existing detached V9/V10 values remain byte-compatible and keep their existing string fields; V11 refers to those detached values by SnapshotDigest.

`SourceReference` always has `kind: SourceReference`, one `locatorKind`, its variant fields, and `contentDigest`:

- `repository_path`: one literal Portable Paths value plus optional positive `lineStart` and `lineEnd` with start not after end;
- `command`: one existing 1-128 character identifier naming a recorded command;
- `test`: one existing identifier naming a recorded test;
- `git_commit`: algorithm `sha1` with a full 40-lowercase-hex OID or `sha256` with a full 64-lowercase-hex OID;
- `content_digest`: one `sha256:` plus 64 lowercase hexadecimal characters, resolved by the host's external content store.

URLs, URNs, arbitrary labels, user information, query/fragment text, percent encoding, inline data, absolute roots, colon outside the fixed digest prefix, backslash, wildcards, Unicode, controls, dot/parent segments, and Windows reserved devices are forbidden. Before retention, core scans every string leaf with the existing deterministic `containsHighConfidenceSecret` rule. A hit rejects with non-echoing `orchestration.source_reference_invalid`; the canary and rejected value never enter diagnostics, state, events, or trace. A pre-dispatch invalid reference rejects unchanged with zero worker calls. A post-dispatch report containing one makes the parent uncertain because software work may already have occurred.

External content remains separately bound by its required payload/body digest and byte count where applicable. A SourceReference identifies a retrieval key; it does not authenticate the source, grant access, or embed the referenced bytes.

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

The row must resolve to exactly one complete V9 evidence-requirement object. Its canonical key is `sourceKind`, source ID, source digest, collection, then evidence ID in UTF-8 byte order. Two rows with the same key are duplicates; equal bare evidence IDs from different sources remain distinct. Goal criteria use sorted `requiredEvidenceKinds` from the exact V9 evidence-requirement enum `artifact`, `command`, `test`, `review`, `decision`, `handoff`, and `memory`; the broader RunEvent `EvidenceKind` values `commit` and `digest` can remain trace evidence but can never fulfill a V9 evidence requirement. Coverage rows bind the exact EvidenceRequirementRef values that fulfill those kinds.

Goal coverage never leaves evidence ownership implicit. Each `EvidenceCoverageRule` contains one qualified requirement ref, owner kind `producer`, `verifier`, or `reviewer`, one selector valid for that owner group, and criterion use `required` or `optional`. A resolved V9 `required: true` row cannot be downgraded; an optional source row may be promoted. A criterion's `requiredEvidenceKinds` exactly equals the distinct resolved kinds of its required rules.

Compilation creates immutable `EvidenceBinding` rows with binding ID/digest, subject `invocation_gate`, `criterion`, `integration`, or `completion`; qualified requirement and resolved object SnapshotDigest/kind/source-required flag; effective requiredness; owner invocation ID/address, exact AgentBlueprintIntent digest, logical role, and node function; and subject-specific criterion/join/integration identity. An EvidenceBinding never contains an AgentBlueprint, invocation-row, or parent Plan digest. The selected Policy variant supplies one `evidenceFailureOutcome` from its Module gate's existing failureOutcomes, copied into the invocation. Planner and worker payload cannot alter either value.

An accepted proof is never represented by a bare evidence ID. Core-owned `EvidenceSatisfaction` contains satisfaction ID/digest; run/Plan/Policy/authority/claimed-state bindings; EvidenceBinding and qualified requirement; subject/kind/requiredness; optional criterion; owner invocation/activation/logical role/node function and Assignment; ChildResultEnvelope and captured OperationResult digests; child event ID/sequence/SnapshotDigest; one-based evidence ordinal; and the exact V9 evidence reference.

`ExecutionReport.reported` supplies transient `EvidenceBindingDraft` rows. Each names one ticket-bound child event sequence/SnapshotDigest, one one-based evidence ordinal, and a non-empty sorted set of eligible EvidenceBinding IDs. It supplies no satisfaction ID, criterion, owner, or accepted-result metadata. Core resolves the occurrence, requires immutable evidence with payload digest, validates exact kind/ticket/owner eligibility, and derives one satisfaction per named binding.

Cardinality key is `(evidenceBindingId, ownerActivationId)`, with zero or one satisfaction. Occurrences sort by child sequence, event ID, event SnapshotDigest, then ordinal; the first compatible occurrence wins. One occurrence may satisfy several explicitly compiled bindings through separate qualified satisfactions, but never crosses owner invocation or activation. Later compatible duplicates remain child trace evidence and create no duplicate satisfaction. Duplicate drafts, ineligible bindings, or ambiguous occurrence identity reject the complete batch unchanged.

Evidence gating precedes winner selection and output transfer. A would-be `pass` missing any required binding maps to its exact `evidenceFailureOutcome`; if that outcome has no legal route, executed work fails as `workflow_failed`, never blocked. Optional absence has no routing effect. Suppressed-any-loser satisfactions remain trace evidence but cannot credit winner-dependent criteria, integration, completion, or memory. Rejected/skipped work, host observations, output drafts, and unbound child evidence satisfy nothing. Criterion, integration, completion, event, projection, and MergeReadyEvidence records retain EvidenceSatisfaction digests.

## Identity Table

| Value | ID creator and scope | Revision | Required predecessor digests |
| --- | --- | --- | --- |
| OrchestrationPolicy | Host; unique policy ID/version in project | Immutable | Circuit, Module, and WorkPacket-template snapshot digests |
| RunAuthority | Host; unique authority ID/version bound to one orchestration/session/plan/run identity tuple | Immutable | Policy, Circuit, Module, WorkPacket-template, GoalContract, and AgentProfile digests |
| AgentProfile | Host; profile ID/version unique in authority allowlist | Immutable | None; digest is allowlisted by RunAuthority |
| GoalContract | Host; goal ID unique in orchestration | Immutable | Source-body digest and each criterion requirement-body digest |
| TaskAuthorityProjection | Core; exactly one supply-free projection per RunAuthority | Immutable | Goal, PolicyBundle, source baseline, task-relevant authority ceilings, execution policy, and final-approval requirement; never profile, executor, issuer, attestor, responder, cancellation, run-identity, planner, or concurrency supply |
| PlanProposal | Planner-supplied proposal ID unique in session | Immutable | Session, policy, authority, goal, and detached WorkPacket snapshot digests |
| AgentBlueprintIntent | Planner ordinal equal to its concrete-address ordinal | Immutable | Goal, Policy, TaskAuthorityProjection, Circuit, Module, WorkPacket, context-use, and semantic-specialization claims; never session, proposal, profile, executor, or full RunAuthority digest |
| AgentBlueprint | Core ordinal equal to its concrete invocation ordinal | Immutable | Goal, Policy, TaskAuthorityProjection, Circuit, Module, WorkPacket, AgentBlueprintIntent, field-projection, criterion, evidence, context-use, and handoff bindings; never profile, executor, proposal, session, or full RunAuthority digest |
| PlanningSession | Host supplies session ID unique in orchestration | Starts 0 | Policy, authority, goal, profile digests |
| OrchestrationPlan | Host reserves plan ID in RunAuthority/PlanningSession before compile; unique in orchestration | Fixed planRevision 1 | Prior ready PlanningSession, proposal, policy, authority, goal, packet, blueprint, and profile digests |
| OrchestrationState | Host reserves run ID in RunAuthority/PlanningSession; unique in orchestration | Starts 0 | Plan, policy, authority digests |
| AvailabilitySnapshot | Host; availability ID unique per run revision | Immutable | State, profile, slot, manifest, attestation, and detached GrantOffer reference digests |
| GrantOffer | Host offer ordinal never reused in orchestration; detached and named once by one availability snapshot | Immutable | Availability ID, ready state, invocation, WorkPacket, profile, slot, executor, manifest, and V10 grant snapshot digests; never the parent availability digest |
| Assignment | Core ordinal unique in run | Immutable | Plan, AgentBlueprint, packet, profile, availability, slot, reservation, and GrantOffer digests |
| WaveClaim | Core ordinal unique in run | Immutable | Prior state and assignment digests |
| ExecutionTicket | Core ordinal unique in run; generated after claimed state digest | Immutable | Claimed state, wave, assignment, AgentBlueprint, packet, profile, manifest, and grant digests |
| AgentMaterializationReceipt | Allowlisted host adapter ordinal matching one ticket | Immutable | Ticket, AgentBlueprint, Assignment, executor, adapter version, delivered context/capability/tool/constraint sets, grant, and host attestation digests |
| ChildResultEnvelope | Core ordinal matching one assignment | Immutable | Ticket, materialization-receipt, and observation/result digests |
| ResponseInputBinding | Core ordinal unique in run | Immutable | InputResponse, InputRequest, source output, destination invocation/activation/input port, and prior state digests |
| ActivationApprovalBinding | Core ordinal unique in run | Immutable | Policy action, invocation/activation, request/response, input-required state, and prior-event digests |
| EvidenceBinding | Core compiler ordinal unique in Plan | Immutable | Goal, Policy, TaskAuthorityProjection, qualified requirement, resolved requirement object, subject, owner invocation ID/address, and AgentBlueprintIntent digest; never proposal/session identity, AgentBlueprint, invocation-row, or parent Plan digest |
| EvidenceSatisfaction | Core ordinal unique in run | Immutable | Qualified requirement, accepted Assignment/result, child event/evidence, Goal criterion, and Plan digests |
| AcceptedWorkAccumulator | Core; one current value embedded in each OrchestrationState | Immutable | Prior accumulator when changed, Plan, finalized accepted Assignment/result/output/evidence digests, and host-neutral materialization semantics; never the containing state digest |
| OutputReference | Core ordinal unique in run | Immutable | Assignment, packet, output, schema, and HostObservation digests |
| HostObservation | Core or allowlisted host observation ordinal never reused in run | Immutable | Plan and source-value digests; ready state for preflight or claimed state/Assignment/ticket for result-time; host attestation only for host-attested origin |
| MemoryProposal | Core ordinal unique in run and accepted only from a memory invocation | Immutable | Assignment, accepted source-output/evidence, and prior parent-event digests |
| MemoryCandidate | Core ordinal unique in run | Immutable | Goal, criterion, MemoryProposal, evidence, source, and external-body digests |
| RepositoryStateRequest | Core fixed ID `repository-request.000001` per run | Immutable | Pre-request state, accepted-work accumulator, source baseline/tree, Plan, and complete write-effect-set digests; never the successor repository-required state digest |
| RepositoryStateWitness | Core fixed ID `repository.000001`, created only after workflow acceptance and before owner approval/completion | Immutable | Baseline plus every write effect/head observation and final repository tree observation |
| AcceptedWorkProjection | Core fixed ID `accepted-work.000001`, derived only from a complete pre-merge terminal source bundle | Immutable | Completed state/event, AcceptedWorkAccumulator, projected Goal/Policy/Plan, accepted work, criteria, memory, terminal, and repository semantics; never MergeReadyEvidence |
| MergeReadyEvidence | Core fixed ID `merge.000001`, created only after a completed state, terminal event, and AcceptedWorkProjection exist | Immutable | AcceptedWorkProjection plus final state/event, RepositoryStateWitness, integration, criteria, evidence, approval, and memory-candidate digests |
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
| `completionPolicy` | Closed integration, memory, merge-evidence, and final repository-state witness policy |
| `limits` | Policy ceilings for concrete invocations and concurrency |

Every node policy contains `nodeId`, one fixed `nodeFunction`, and a non-empty sorted `variants` array. Each variant contains:

- `variantId`;
- one `workPacketTemplateRef` and SnapshotDigest from the bundle;
- `logicalRoleId`;
- sorted exact `requiredCapabilityIds`;
- a normalized `permissionCeiling`;
- sorted literal `readScopeCeiling`, `writeScopeCeiling`, and `requiredConflictScopes`;
- sorted exact `requiredEvidenceRefs`;
- one `evidenceFailureOutcome` from the bound Module gate's existing failureOutcomes;
- sorted `independentFromNodeIds`;
- one `handoffDestinationRoleId`;
- optional closed `runRequestPolicy`.

`nodeFunction` is one of `clarifier`, `producer`, `diagnoser`, `integrator`, `verifier`, `reviewer`, `approver`, or `memory`. A `runRequestPolicy` is either `before_execution` with purpose `risk_approval`, responder role, external body ref/digest, and decision actions, or `on_outcome` with purpose `clarification`, trigger outcome `clarify`, body output port, responder role, and decision actions. Other purpose/trigger combinations reject Policy. A node outside a replication region has exactly one variant named `default`. A region node has the exact variant IDs declared by its region. Thus a host can define frontend, backend, test, docs, security, or other specializations while the planner can select only those named choices.

`completionPolicy` contains one `primaryIntegratorNodeId`, one `memoryNodeId`, non-empty sorted `mergeEvidenceRefs`, and literal `requireRepositoryStateWitness: true`. Both named nodes are static default variants outside replication regions. Every Circuit fan-out/join pair has exactly one compiler-derived integration binding: its join node is a static `integrator`, its selected logical role equals both the Circuit join owner and fan-out integration owner, and it occurs after all accepted branch outputs and before every dependent verifier. The primary integrator is either that unique integrator or a static downstream integrator that post-dominates every join integrator. The memory node post-dominates the primary integrator, every verifier, and every required reviewer. Policy validation rejects a graph that cannot satisfy these structural facts without changing a Circuit route.

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
- `policyDigest`, `runAuthorityDigest`, `taskAuthorityProjectionDigest`, and `goalContractDigest`;
- exactly one sorted `laneSelections` row per Policy region, containing the canonical variant ID/variant-ordinal sequence and satisfying every variant/total bound;
- exactly one sorted `packetBindings` row and one digestible `agentBlueprintIntents` row per resulting concrete address;
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

### Specialist Agent Compiler

V11 ships the provider-neutral Specialist Compiler contract in `docs/modules/specialist-agent-compiler.md` as an independent repository capability. Its IDE-neutral `synthesizeGoal` layer proposes and compares narrowed concrete WorkPackets plus semantic intents. Its public pure `compileAgentBlueprints` operation then validates one candidate and creates exactly one immutable `AgentBlueprint` per concrete invocation, together with its EvidenceBindings and exact AgentOptimizationRecord. `compilePlan` must call the same implementation rather than reimplementing blueprint logic. No optional adapter is required for deterministic derivation or validation. An AgentProfile advertises what a host worker can execute. An AgentBlueprint defines exactly what one invocation requires. Assignment is the only operation that binds those two values.

The semantic planner supplies exactly one digestible `AgentBlueprintIntent` per concrete address inside PlanProposal. Each intent contains:

- `kind: AgentBlueprintIntent`, `intentId` whose ordinal equals the concrete-address ordinal, and `contentDigest`;
- the concrete address and exact GoalContract, Policy, TaskAuthorityProjection, Circuit, Module, selected template, and WorkPacket identities/digests;
- exactly one `ContextUseBinding` for every concrete WorkPacket context reference;
- non-empty sorted specialization reasons from `independent_deliverable`, `critical_path`, `independent_verification`, `specialist_capability`, `context_isolation`, and `serial_required`, where `serial_required` is exclusive;
- no session, proposal, Plan, full RunAuthority, profile, executor, provider, model, prompt, price, or hidden-score field.

`ContextUseBinding` is a closed non-digestible row covered by its containing intent and blueprint digest. It contains the one-based WorkPacket context declaration ordinal; the SnapshotDigest of that complete detached V9 EvidenceRef; non-empty sorted use codes from `input`, `constraint`, `pattern`, `verification`, `history`, and `memory`; and non-empty sorted target rows. A target is exactly one of: Module input-port ID, Goal criterion ID, qualified EvidenceRequirementRef tuple, WorkPacket verification EvidenceRequirementRef tuple, or handoff required-field code. Targets use the corresponding source declaration comparator. Missing, extra, duplicate, unresolved, or cross-invocation context rows reject compilation. Core copies only validated intent semantics; it never invents a context use or specialization reason.

Every AgentBlueprint contains:

- `blueprintId` whose ordinal equals its invocation ordinal and `contentDigest`;
- exact GoalContract, Policy, TaskAuthorityProjection, Circuit, Module, selected template, concrete WorkPacket, and AgentBlueprintIntent identities/digests, but no parent Plan, proposal, session, profile, executor, or full RunAuthority digest;
- invocation ID/address, logical role, node function, exact capability IDs, and complete Module input/output port declarations;
- domain-separated RFC 8785 digests of the concrete WorkPacket `goal`, `completionEvidence`, `scope`, `context`, `authority`, `verification`, `handoff`, and `stopConditions` fields;
- the exact validated ContextUseBindings and specialization reasons from its intent;
- sorted predecessor, handoff-target, and independence-constrained blueprint IDs derived from the concrete graph;
- sorted criterion IDs and compiler-derived `(evidenceBindingId, contentDigest)` pairs owned by the invocation.

Core rejects a missing, extra, duplicate, unowned, or unresolved intent/blueprint/context/criterion/evidence/handoff binding. A role label such as `frontend`, `backend`, `tester`, or `reviewer` is never sufficient by itself. The exact packet objective, artifact ports, context uses, authority, scope, evidence, verification, handoff, and stop conditions are all required before the invocation can become assignable.

Semantic optimization remains host-reviewed judgment: seek independently verifiable work, shorter dependency paths, disjoint writes, smallest source-preserving context, least privilege, fewer handoffs, and fewer agents when another worker adds neither safe concurrency nor independent quality evidence. Core does not claim that those semantic choices are globally optimal. The feature package retains the selected baseline, alternatives considered, expected benefit, unavoidable constraints, and independent review source in `goal-synthesis.md`.

`AgentOptimizationRecord` is a closed non-digestible measurement row covered by the OrchestrationPlan digest. It has `strategyVersion: 1.0.0` and these exact non-negative safe integers:

- `blueprintCount`: AgentBlueprint array length;
- `dependencyEdgeCount`: number of distinct ordered predecessor-to-successor invocation edges after concrete expansion, with a self-loop counted once;
- `conflictPairCount`: number of unordered distinct blueprint pairs that conflict under the normative Plan scope algebra, whether or not they can become ready together;
- `handoffCount`: number of distinct ordered blueprint-to-blueprint handoff edges;
- `contextReferenceCount`: sum of ContextUseBinding rows across blueprints;
- `contextUseTargetCount`: sum of target rows across all ContextUseBindings;
- `permissionScopeCount`: sum, per blueprint, of normalized distinct `(permission kind, scope)` tuples;
- `dependencyCriticalPathComponentCount`: maximum number of strongly connected components on any path in the concrete dependency condensation DAG, counting source and destination components; zero only for an empty graph and at least one otherwise;
- `maximumDeclaredFanOutWidth`: maximum concrete branch count of any expanded Circuit fan-out, or one when the Plan has no fan-out;
- `serialBlueprintCount`: number of blueprints whose sole specialization reason is `serial_required`.

Core recomputes every field using Plan declaration order, Tarjan SCC traversal with successors visited in invocation order, and safe-integer checked addition. No metric is an opaque quality score or proof of optimality. V11 dogfood compares these exact measurements and accepted outcomes against one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role baselines under independent semantic review.

`compileAgentBlueprints` accepts only GoalContract, PolicyBundle, TaskAuthorityProjection, the proposal's exact lane-selection, packet-binding, and AgentBlueprintIntent semantic arrays, and the exact detached candidate WorkPackets. It deliberately accepts no PlanningSession, PlanProposal identity/provenance, full RunAuthority, AgentProfile, slot, executor, grant, provider, model, price, or prompt input. A compiled result contains the TaskAuthorityProjection, concrete EvidenceBindings, AgentBlueprints, and AgentOptimizationRecord; a policy-nonconforming candidate blocks, while malformed input rejects. Recompiling equal semantic intent under different runtime supply produces byte-identical blueprint demand. `compilePlan` first obtains this exact result, then separately checks profile compatibility and constructs the supply-bound Plan.
An execution adapter receives the exact blueprint with the detached WorkPacket and ticket. It may render provider-specific instructions or tool configuration transiently, but cannot widen authority, omit required evidence, change context bindings, or persist provider prompts and hidden reasoning in canonical state or trace.

OrchestrationPlan required fields are:

- `metadata` whose ID equals the reserved PlanningSession/RunAuthority plan ID, `planRevision: 1`, and `contentDigest`;
- orchestration ID, prior ready `planningInputSessionDigest`, proposal, GoalContract, Policy, Circuit, Module, WorkPacket-template, RunAuthority, supply-free TaskAuthorityProjection, and AgentProfile digests;
- source branch and baseline;
- sorted concrete `invocations`, `agentBlueprints`, `routes`, `joins`, `integrationBindings`, `evidenceBindings`, `acceptanceCoverage`, and `routeBudgets`;
- one core-derived `agentOptimizationRecord` containing the exact structural counts defined above;
- the compiler-derived `primaryIntegratorInvocationId`, `memoryInvocationId`, and exact requested/effective concurrency;
- `effectiveLimits`.

Each invocation records its ID and full variant-bearing address; its exact AgentBlueprintIntent and AgentBlueprint IDs/digests; Circuit node and Module references/digests; generic/variant template and concrete WorkPacket references/digests; variant ID, logical role, node function, exact capability IDs, required permissions, read/write/conflict scopes, potential predecessor invocation IDs, input/output port IDs, criterion IDs, EvidenceBinding ID/digest pairs, evidenceFailureOutcome, and independence constraints. Concrete routes and joins retain source Circuit identities and record every derived invocation endpoint and port transfer. Each integration binding contains join ID, Circuit join/fan-out identities, integration-owner role, exact integrator invocation ID, accepted branch/output ports, and sorted completionPolicy EvidenceBinding IDs. Core assigns route IDs in Circuit route declaration order with static/region/lane expansion, branch IDs in fan-out branch then lane order, join IDs in Circuit join order, and binding IDs in route/transfer order. Concrete join sources are branch IDs, not whichever terminal node happened to run. AgentBlueprints use invocation order. Plan arrays use these canonical orders, never planner object order.

Compilation first derives the TaskAuthorityProjection and validates the complete bundle, proposal, AgentBlueprintIntents, detached candidates, profiles, and authority without worker effects. It expands the graph and fixes invocation IDs/addresses, derives EvidenceBindings from those identities plus intent digests, derives AgentBlueprints from the binding ID/digest pairs, and only then creates non-digestible invocation rows and the parent Plan. It next derives routes, joins, budgets, packet/acceptance closure, and emits one immutable Plan bound to the prior ready PlanningSession. The successor compiled PlanningSession may contain the Plan digest, but the Plan never contains that successor digest; this removes the digest cycle. A malformed operation rejects unchanged, while a valid nonconforming proposal advances to blocked with zero worker calls.

## Goal, Acceptance, And Logical Ownership

GoalContract required fields:

- `goalId`, `bodyRef`, `bodyDigest`, and `contentDigest`;
- one to 64 `criteria` sorted by `criterionId`;
- each criterion has `criterionId`, `criterionMode` (`delivery` or `verification_only`), `requirementRef`, `requirementDigest`, sorted `requiredEvidenceKinds`, and one closed `coveragePolicy`.

Each coveragePolicy contains sorted producer, verifier, and reviewer node selectors; producer aggregation `all`, `join_winner`, or `none`; an exact Circuit join reference for `join_winner`; and sorted EvidenceCoverageRule values. `none` is legal only for `verification_only`. A node selector contains node ID plus either `all_variants` or a non-empty sorted allowed variant-ID set. Each evidence rule's owner selector must belong to its matching owner group. Reviewer selectors are empty exactly when Policy `reviewRequired` is false. GoalContract validation resolves every selector and qualified requirement against Policy before planner invocation.

Free-form goal and criterion bodies stay outside the orchestration roots. Source references and digests preserve retrieval.

Compiler, not planner, derives exactly one OrchestrationPlan `acceptanceCoverage` row per criterion from its coveragePolicy and the accepted lane selection. A row contains:

- the criterion ID;
- one producer group: `all` with every selected matching invocation, `join_winner` with the exact join ID and eligible concrete branch IDs, or `none` for `verification_only`;
- one or more verifier invocation IDs whose Policy node function is `verifier`;
- reviewer invocation IDs when approvalPolicy requires independent review;
- sorted compiler-derived EvidenceBinding IDs from the criterion EvidenceCoverageRules and exact Circuit, Module, WorkPacket-template, or concrete WorkPacket sources.

Unknown, duplicate, ineligible, or uncovered criteria reject compilation. At runtime an `all` group requires every named producer, while `join_winner` materializes only the accepted winner branch when that join closes; skipped alternatives never block coverage. Worker-local evidence never satisfies a verifier- or reviewer-owned requirement.

Existing WorkPacket `role.owner` is the logical role ID of the selected Policy variant for its Circuit node. It is not an AgentProfile, executor, planner, or human identity. WorkPacket `role.capability` remains human guidance. Exact specialization and matching requirements live in the compiler-derived AgentBlueprint and Plan. Assignment is the sole runtime assignee. Evidence ownership derives from node function, logical role, and accepted Assignment, never from worker-supplied owner text.

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
| `source` | Repository ID, branch, full baseline commit OID, and host-neutral baselineTreeDigest |
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

`TaskAuthorityProjection` is a core-derived digestible nested value computed before the first planner callback. It contains only:

- `kind: TaskAuthorityProjection` and `contentDigest`;
- exact GoalContract, Policy, Circuit, sorted Module, and sorted WorkPacket-template digests;
- source branch, full baseline commit OID, and baselineTreeDigest, excluding host repository identity;
- the normalized permission ceiling and literal repository read/write/conflict scope ceilings;
- the exact V10 execution policy;
- `finalApprovalRequired`.

It forbids RunAuthority metadata, run identities, AgentProfile digests, executor/manifest allowlists, grant issuers, attestors, responder/cancellation roles, planner/concurrency/resource coordination limits, repository host identity, and provider data. Core computes its digest with the common rule and exposes the complete projection to semantic planning. AgentBlueprintIntent and AgentBlueprint bind this projection rather than full RunAuthority. Plan, state, Assignment, ticket, and result still bind the full authority. Changing only runtime supply or host identity therefore cannot alter task-specific demand.
RunAuthority never comes from a planner, profile, manifest, worker, or prior result. Effective permissions, scopes, and numeric limits are the intersection/minimum of hard limits, Policy, authority, template, candidate packet, AgentBlueprint, profile, manifest request, and V10 grant. A required boolean gate is the logical OR of Policy and RunAuthority. A downstream declaration that widens any predecessor rejects before callbacks.

Availability may present only allowlisted profile digests and executor/manifest pairs. Its V10 grant must name the same executor, run, attempt, and WorkPacket, request only manifest-declared permissions, fit every upstream ceiling, and cover the Plan's exact required permissions. Core validates these bindings; the host authenticates issuers, executors, responders, and attestors and enforces effects.

## IDE Goal Synthesis

The repository-shipped provider-neutral human entrypoint is `docs/ide/specialist-agent-kickoff.md` and its `synthesizeGoal` capability. It consumes the active user message, repository context, approved Module/Circuit catalog, and policy ceilings outside the digestible kernel. It creates a visible `goal-synthesis.md` launch artifact, compares a serial baseline with legal task-shaped candidates when independent deliverables exist, asks only for unresolved novel or high-risk decisions, materializes the GoalContract/PolicyBundle/RunAuthority request, and supplies the semantic PlannerCallback that returns narrowed WorkPackets plus address-bound AgentBlueprintIntents. Every required owner decision is recorded with a map to the exact launched GoalContract, PolicyBundle, or RunAuthority field that reflects it. The note is noncanonical; those structured values and their digests are the binding input.

This reference capability is required V11 product surface and is exercised through at least two IDE-host fixtures. It is not a Node package operation, model router, provider call, or canonical root. The deterministic package boundary still begins at `runGoal(start)` with explicit closed values. Therefore one user message is the human quick path without pretending that core can derive product intent from opaque text.
## Simple Facade

The facade has no hidden repository, process, or chat lookup. Every pause returns one self-contained serializable `RunGoalContinuation` whose complete immutable context is sufficient for a fresh IDE process to issue the next facade command. A continuation is a transport bundle, not a digestible orchestration root, and duplicates only already-bound values:

- `planning` exists only at an `input_required` boundary and contains that exact PlanningSession and tail OrchestrationEvent, GoalContract, PolicyBundle, RunAuthority, and sorted AgentProfiles; it never embeds a response;
- `run` exists only at an `input_required` or `waiting` boundary and contains that exact OrchestrationState, including its AcceptedWorkAccumulator, plus the tail OrchestrationEvent, GoalContract, PolicyBundle, RunAuthority, Plan-bound sorted AgentProfiles, exact OrchestrationPlan, and complete detached concrete WorkPacket set.

Core validates every contained value, closure, tail, ordering rule, and repeated digest before any callback. A missing, extra, duplicate, drifted, or phase-inconsistent member rejects the continuation. The continuation has a 5,242,880-byte aggregate JCS ceiling independent of the one-operation semantic payload limits; no individual member may exceed its own existing limit.

`runGoal` accepts one closed command:

| Command kind | Required payload |
| --- | --- |
| `start` | GoalContract, PolicyBundle, RunAuthority carrying the reserved orchestration/session/plan/run IDs, one or more allowlisted AgentProfiles, optional `requestedConcurrency`, planner callback, availability callback, execution callback, input/approval callback, repository-state callback |
| `continue_planning` | Exact input-required planning continuation, one explicit interaction mode (`callback` or bound `input`), and the full callback set |
| `continue_run` | Exact input-required or waiting run continuation, one interaction legal for that boundary (`callback`, `availability`, bound `input`, or bound `cancel`), and callbacks excluding planner |

No profile, packet, policy, authority, response, resolver, or repository witness is invented. The command never repeats loose immutable inputs beside its continuation, so two conflicting copies cannot exist. `requestedConcurrency` is an integer from 1 through the effective authority/Policy ceiling and defaults to 1 when omitted. PlanningSession and Plan bind that exact value; continuations cannot change it, and `prepareWave` never selects more assignments. Supplying many profiles or slots does not silently enable parallel work. The one-agent path is therefore the same contract with requested concurrency one; explicit values above one enable bounded parallel waves.

`runGoal` repeatedly uses deterministic operations until it returns exactly one:

- `input_required` with phase, exact session or state, the next canonical InputRequest, and pending-request count;
- `waiting` with exact ready state and reason `capacity_unavailable` or `execution_not_started`;
- `completed`, `failed`, `cancelled`, or `uncertain` with exact terminal OrchestrationState and trace summary;
- `blocked` with phase `planning` plus terminal PlanningSession or phase `run` plus terminal OrchestrationState;
- `start_rejected` with phase, explicit `identified` plus StartIdentity or `unidentified` without identity, and sanitized diagnostics;
- `rejected_unbound` with sanitized diagnostics when no trustworthy continuation identity exists;
- `rejected_bound` with the exact unchanged session/state digest and sanitized diagnostics.

Result variants are closed. `input_required` contains only kind, phase, the matching complete RunGoalContinuation, the next canonical InputRequest, pending-request count, emitted events, and trace summary. `waiting` contains only kind, the complete run continuation, waitGuard, emitted events, and trace summary. The `completed` variant contains only its completed state, emitted events, trace summary, complete MemoryCandidates, final RepositoryStateWitness, AcceptedWorkProjection, and MergeReadyEvidence. `failed`, `cancelled`, and `uncertain` contain only the matching terminal state, emitted events, and trace summary. A planning-blocked variant contains phase, exact terminal PlanningSession, emitted events, and trace summary; a run-blocked variant contains phase and exact terminal OrchestrationState. Start-rejection and continuation-rejection variants contain only their explicitly documented identity and diagnostic fields.

Trace summary contains orchestration ID, event vocabulary version, first/last sequence and event IDs, event count, root digests, child-run count, evidence count, retained-journal digest/bytes, status, and `complete` or `incomplete_sources`. It contains no copied event or free-form body.

A caller resumes by passing the returned continuation byte-for-byte through the matching continuation command and choosing one explicit interaction variant; illegal boundary/interaction combinations are unrepresentable in the public union. Capacity or not-started waiting requires a different availability-projection digest before another worker call. The facade never polls semantically unchanged availability and never retries a not-started or ambiguous execution in the same call. A planner or availability callback exception becomes a fixed pre-effect blocked code. The execution callback receives one ExecutionTicket and a core-owned one-shot `dispatchV10` capability. A conforming callback performs no software-work effect outside that capability. Core increments the ticket's dispatch counter at capability entry immediately before invoking V10. A callback exception with counter zero is core-observed `not_started`; after entry, or when the host cannot prove the boundary, it is `effect_unknown`. Returning `ExecutionReport.not_started` is valid only before dispatch while core observes counter zero; no host attestation can override that boundary. Input callback failure simply returns the bound `input_required` value.

## Planning Contracts

PlanningSession common fields are `sessionId`, `orchestrationId`, reserved `planId` and `runId`, `revision`, `round`, `plannerCallLimit`, `requestedConcurrency`, `status`, `policyDigest`, `circuitDigest`, sorted `moduleDigests`, sorted `workPacketTemplateDigests`, `runAuthorityDigest`, `goalContractDigest`, sorted `agentProfileDigests`, sorted `consumedResponseDigests`, `eventSequence`, `eventTailId`, `eventTailDigest`, `journalDigest`, `journalBytes`, and `contentDigest`. `plannerCallLimit` is `L = min(8, RunAuthority.limits.plannerCalls)` and is from 1 through 8.

| Status | Required variant fields | Optional variant fields | Forbidden variant fields |
| --- | --- | --- | --- |
| `ready` | one closed `plannerInput` | none | pendingRequest, proposalDigest, planDigest, terminalCode |
| `input_required` | `pendingRequest` | none | plannerInput, proposalDigest, planDigest, terminalCode |
| `compiled` | `proposalDigest`, `planDigest` | none | plannerInput, pendingRequest, terminalCode |
| `blocked` | `terminalCode` | none | plannerInput, pendingRequest, proposalDigest, planDigest |

`plannerInput` is either `initial`, which carries no other field and is used only by revision-zero start, or `clarification_response`, which carries request ID/digest, response ID/digest, response body SourceReference/digest, and the prior input-required session digest. Within one `continue_planning(input)` call, core advances the input-required session to a ready `clarification_response` session and holds the exact accepted InputResponse only for the immediately following PlannerCallbackInput and `applyPlannerResult`. Returned planning continuations exist only before a response and never embed one. The next PlannerCallbackInput must expose that exact response as `resumeResponse`; an initial call forbids it. `applyPlannerResult` binds the same response and ready-session digest while applying the planner result. Therefore the Plan or next request is causally bound to the answer, yet the answer is neither silently replayed nor lost across process restart.

Planner callback output is one closed transient union; `block` is itself a closed no-body or complete-body variant, never two independently optional fields:

| Kind | Required fields | Forbidden fields |
| --- | --- | --- |
| `proposal` | PlanProposal and exact detached WorkPacket candidate set | question/block fields |
| `question` | purpose code, responder role, sorted decision codes, external body ref/digest | proposal, packets, block code |
| `block` | fixed block code plus either no body fields or one complete external body ref/digest pair | proposal, packets, question fields; half-present body pair |

A valid proposal either compiles or advances directly to blocked with a fixed policy/contract code; it never partially compiles. Malformed operation input rejects unchanged. Free-form planner reasoning and bodies are neither accepted nor retained.

Planning operation results are closed:

- `planning_started`: `kind`, new ready revision-zero PlanningSession, and sorted emitted OrchestrationEvent values; it has no prior-session field;
- `planning_advanced`: `kind`, prior session digest, next PlanningSession, sorted emitted OrchestrationEvent values, and `plan` only when next status is compiled;
- `planning_start_rejected`: `kind`, `identityKind`, optional StartIdentity, and sanitized diagnostics. `identified` requires the sole grammar-valid equal identity tuple found across every parseable start carrier and requires that exact tuple; `unidentified` forbids it when carriers are absent, malformed, or conflicting. It never carries a revision/content digest or claims an existing session;
- `planning_rejected_unbound`: `kind` and sanitized diagnostics only, used by a continuation operation whose supplied prior session cannot be parsed as one identifiable valid root;
- `planning_rejected_bound`: `kind`, unchanged valid session ID/revision/digest, and sanitized diagnostics.

This classification is total: `startPlanning` uses exactly one started/start-rejected variant and never an advanced result; all other planning operations use exactly one advanced/continuation-rejected variant.

Operations:

| Prior | Operation | Next |
| --- | --- | --- |
| absent | `startPlanning` | `planning_started` with ready revision 0, round 0 |
| ready | valid `applyPlannerResult(proposal)` | compiled or blocked, round plus one |
| ready | `applyPlannerResult(question)` with prior round less than `L - 1` | input_required, round plus one |
| ready | `applyPlannerResult(question)` with prior round equal to `L - 1` | blocked at round `L` |
| ready | `applyPlannerResult(block)` | blocked, round plus one |
| input_required | `resumePlanning(answer)` | ready, same round, response digest consumed, and exact response exposed once to the next planner callback |
| input_required | `resumePlanning(block or cancel)` | blocked, same round |
| compiled or blocked | any operation | bound rejection unchanged |

`applyPlannerResult` while input is pending or at round `L` rejects unchanged. It also rejects when `inputKind`, `plannerInput`, and the required-or-forbidden exact `resumeResponse` are inconsistent, missing, extra, or unequal. A second planning request cannot exist. Responses do not increment round. `runGoal` invokes the planner at most `L` times, including proposal, question, and block results.

InputRequest common required fields are `requestId`, `phase`, `purposeCode`, sorted `allowedDecisionCodes`, `responderRole`, source prior revision/digest, target successor revision, Policy and RunAuthority digests, external `bodyRef`/`bodyDigest`, `oneUse: true`, and `contentDigest`. The request never contains the target successor's final digest; its containing root/event binds it, and InputResponse later binds that exact current root. Planning purpose is one of `requirements_clarification`, `scope_choice`, `architecture_choice`, `verification_choice`, `authority_choice`, or `risk_choice`, with decisions exactly `answer`, `block`, and `cancel`. Planning requests additionally bind orchestration/session IDs and GoalContract digest and forbid request-seed fields. Run requests additionally bind run/Plan IDs and digests plus a closed subject: invocation requests require Circuit node/invocation/activation and promoted PendingRequestSeed IDs/digests, while completion requests forbid those fields. They contain one sorted `decisionActions` row for every non-cancel decision. An action is exactly one of `release_invocation`, `route_outcome` with one declared outgoing Circuit outcome, `block` with one fixed code, or `complete`. A pre-execution risk approval maps `approve` to `release_invocation` and `decline` to `route_outcome` or `block`; an outcome clarification maps `answer` to `route_outcome` and `block` to `block`; final owner `approve` maps to `complete` and `decline` maps to `block`. A clarification `route_outcome` action additionally names a non-empty sorted `responseDestinations` set of successor node/input-port selectors; every other action forbids it. Compilation expands the set to exactly one destination for every concrete successor activated by that action, including fan-out branches, proves each port accepts the declared V9 artifactType, and rejects a missing, extra, duplicate, or non-lane-local destination. No other purpose/decision/action combination is valid.

InputResponse required fields are `responseId`, phase, current session-or-state revision/digest, request ID/digest, responder ID/role, host identity-attestation ref/digest, decision code, one closed `bodyBinding`, and `contentDigest`. `bodyBinding` is exactly `{ kind: none }` or `{ kind: bound, bodyRef, bodyDigest }`. An `answer` decision requires `bound`; every other decision permits either variant. Half-present body fields are impossible. A run-phase `cancel` response additionally requires one exact nested CancellationRequest bound to the same state, actor, role, attestation, and `user_request` reason; every other response forbids that field. Unknown decisions or wrong phase, role, identity, request, revision, digest, or authority reject unchanged. A successful resume advances revision and records the response digest as consumed, making replay stale.

## AgentProfile, Availability, And Grant Offers

AgentProfile required fields are:

| Field | Rule |
| --- | --- |
| `metadata` | Provider-neutral profile ID and semantic version |
| `contentDigest` | Common digest rule |
| `capabilityIds` | Non-empty sorted exact capability IDs |
| `moduleDigests` | Sorted supported Module SnapshotDigests |
| `inputArtifactTypes` / `outputArtifactTypes` | Sorted unique values from the exact closed V9 Module-port artifactType enum; the old field names are forbidden |
| `permissionCeiling` | Normalized maximum |
| `priority` | Required integer 0-65535; lower wins; neutral value 32768 |
| `provenanceRef` / `provenanceDigest` | External source of the capability claim |

`inputArtifactTypes` and `outputArtifactTypes` use exactly: `Goal`, `ContextBundle`, `Assumption`, `Spec`, `ArchitectureDecision`, `TaskPlan`, `WorkPacket`, `Change`, `TestResult`, `DebugRecord`, `RootCauseAnalysis`, `Review`, `Milestone`, `MemoryEntry`, `RetrievalPointer`, and `RunTrace`. Plan and ticket port rows retain each exact V9 `{ name, artifactType, required }` value in Module declaration order. These fields are distinct from AdapterManifest `inputKinds`/`outputKinds`, which keep the six V9 root artifact kinds and remain unchanged.

Profile version is an ASCII ascending identity tie-break only. IDE, API, model, provider, price, prompt, and hidden quality metadata are forbidden in the profile and ignored if a host keeps them outside core.

AvailabilitySnapshot required fields are `availabilityId`, `runId`, bound ready-state revision/digest and readySetDigest, sorted `slots`, sorted `grantOfferRefs`, sorted `pathObservationDigests`, `projectionDigest`, and `contentDigest`. Each closed offer reference contains exactly `offerId` and `contentDigest`. The availability callback returns the snapshot plus the exact complete detached GrantOffer, AdapterManifest, ExecutionGrant, and path-identity HostObservation values named by those references and digests; missing, extra, duplicate, or mismatched detached values reject the callback result.

Each slot contains profile ID/version/digest, executor ID/version, AdapterManifest SnapshotDigest, reservation ID, slot ordinal, host attestor ID/role, attestation ref/digest, and availability status `available` or `unavailable`. The tuple of reservation ID and slot ordinal is unique in the snapshot. A slot is not authority and cannot be assigned twice in one wave.

Each GrantOffer contains:

- `offerId` and `contentDigest`;
- `availabilityId` only for its parent snapshot, plus run ID and bound ready-state revision/digest;
- invocation, WorkPacket, profile, reservation/slot, executor, and manifest identities/digests;
- detached V10 ExecutionGrant SnapshotDigest;
- V10 grant ID, issuer, run ID, attempt ID, WorkPacket ID, executor ID/version, and normalized permissions.

A GrantOffer never contains its parent AvailabilitySnapshot contentDigest or projectionDigest. The parent binds only its offer ID/contentDigest reference, so offer and snapshot remain acyclic.

A GrantOffer is eligible only when the detached grant validates, every repeated field equals the grant, the offer is bound to one available slot and one Plan invocation, its permissions exactly cover the Plan requirement without exceeding any ceiling, and its issuer/executor/manifest are allowed by RunAuthority. Unused offers have no effect. Missing or invalid offers remove only their candidate edge; malformed snapshot structure rejects the whole snapshot.

The projection digest uses the registered availability-projection domain over the sorted slot, detached-offer, and path semantics. Projection removes AvailabilitySnapshot and GrantOffer IDs, bound state revision/digest, HostObservation IDs, attestations, and every contentDigest. It retains profile, executor, manifest, reservation/slot, availability status, invocation, WorkPacket, grant issuer/ID/run/attempt/permissions, and normalized lexical/canonical path status. Offers sort by that retained semantic key, not by `offerId`. Thus rebinding identical capacity or renaming an offer does not masquerade as changed availability; a new reservation, executor, manifest, grant, attempt, permission set, or path status is a real projection change.

Availability and offers are immutable observations for one ready-state digest. A continuation after waiting must supply a valid snapshot with a different projection digest. They never expand profile, Policy, packet, or RunAuthority authority.

## Matching

An invocation/slot/GrantOffer edge exists only when all of these hold:

- the slot and offer are available, unique, state-bound, and mutually consistent;
- the profile supports the exact Module digest, every distinct selected Module input/output artifactType in the corresponding profile set, and every exact capability ID;
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

`AcceptedWorkAccumulator` is a digestible nested value carried by every OrchestrationState and therefore every run continuation. Revision-zero state contains `kind: AcceptedWorkAccumulator`, `reductionOrdinal: 0`, an empty `rows` array, and `contentDigest` and forbids `priorAccumulatorDigest`. A result reduction that finalizes newly accepted work increments the reduction ordinal once, requires the exact prior accumulator digest, and appends rows in Plan invocation then activation-ordinal order; every other transition carries the exact accumulator forward unchanged.

Each closed accumulator row contains Plan invocation ID/address and activation ordinal; AgentBlueprint/AgentBlueprintIntent and WorkPacket IDs/digests; logical role and node function; profile ID/version and exact capability IDs; normalized required permissions and read/write/conflict scopes; materialization receipt digest plus host-neutral mode/status, registered ContextUseBinding-row digests, exact capability and Module-port sets, and all eight WorkPacket field-projection digests; accepted Assignment, ChildResultEnvelope, and captured OperationResult digests plus semantic disposition/outcome; and the accepted settlement, route, branch/join, and integration identities that apply. Each row also contains sorted §acceptedOutputs§ with OutputReference digest, logical output port, artifact type/version, payload digest, and closed none-or-schema-digest binding, plus sorted §acceptedEvidence§ with EvidenceSatisfaction/EvidenceBinding digests, qualified requirement key, subject, kind, requiredness, owner semantics, criterion when applicable, and child evidence payload digest. It excludes executor, provider/model, prompt, reservation, slot, offer, grant, attestor, host path, VCS, event, wave, and claim identity.

A row is appended only when its acceptance is final under routing and join semantics. Suppressed, abandoned, not-started, rejected, uncertain, and provisional branch work never enters. Existing rows are immutable. Core derives the next accumulator from the prior accumulator plus complete retained source values before discarding transient callback values. The accumulator is the complete host-neutral source checkpoint for accepted work and is sufficient, together with current state/Plan/witness values, to derive accepted-work and merge semantics after a fresh-process resume. It is not a replacement for full event-chain inspection, which still reports missing detached sources honestly.

OrchestrationState common required fields are:

- `runId`, `orchestrationId`, `revision`, `status`, and `contentDigest`;
- GoalContract, Plan, Policy, Circuit, Module, WorkPacket-template, RunAuthority, and concrete WorkPacket digests;
- source repository, branch, and baseline;
- `eventSequence`, `eventTailId`, `eventTailDigest`, `journalDigest`, `journalBytes`, and every next core-ID ordinal;
- sorted remaining `routeBudgets`;
- sorted `invocationStates`, `branchStates`, `joinStates`, `portBindings`, `responseInputBindings`, `activationApprovalBindings`, `evidenceSatisfactions`, and `criterionStates`;
- sorted consumed InputResponse and CancellationRequest digests and, only while input is pending, one `pendingRequest` plus zero or more sorted complete `queuedRequestSeeds`;
- sorted consumed child-attempt keys, each exactly the tuple of V10 run ID and attempt ID; the bound ExecutionGrant SnapshotDigest is retained separately in Assignment history but cannot make the same attempt reusable;
- one complete `acceptedWorkAccumulator`;
- sorted `writeEffectBindings` for every settled executed filesystem-write result, whether accepted, suppressed, abandoned, or uncertain;
- sorted complete MemoryCandidate values and the complete RepositoryStateWitness only after it has been accepted.

| Status | Required variant fields | Optional variant fields | Forbidden variant fields |
| --- | --- | --- | --- |
| `ready` | none | `waitGuard` | activeWave, pendingRequest, queuedRequestSeeds, repositoryStateRequest, repositoryStateWitness, terminalCode |
| `claimed` | `activeWave` | cancellationRequestDigest | pendingRequest, queuedRequestSeeds, waitGuard, repositoryStateRequest, repositoryStateWitness, terminalCode |
| `input_required` | one `pendingRequest` | sorted `queuedRequestSeeds`, accepted `repositoryStateWitness` only for owner approval | activeWave, waitGuard, repositoryStateRequest, terminalCode |
| `repository_required` | one closed `repositoryStateRequest` | none | activeWave, pendingRequest, queuedRequestSeeds, waitGuard, repositoryStateWitness, terminalCode |
| `completed` | `terminalCode`, accepted `repositoryStateWitness` | none | activeWave, pendingRequest, queuedRequestSeeds, waitGuard, repositoryStateRequest |
| `failed`, `blocked`, `cancelled`, `uncertain` | `terminalCode` | the exact accepted `repositoryStateWitness` only when it existed before the terminal cause | activeWave, pendingRequest, queuedRequestSeeds, waitGuard, repositoryStateRequest |

A waitGuard contains reason `capacity_unavailable` or `execution_not_started`, the rejected AvailabilitySnapshot and projection digests, sorted rejected invocation/semantic-candidate keys when applicable, and the `eventId` that created it. `capacity_unavailable` forbids rejected-candidate rows; `execution_not_started` requires a non-empty sorted set. A semantic candidate key uses the registered domain and exact closed tuple of invocation, AgentBlueprint, WorkPacket, profile, executor, manifest, reservation/slot, grant issuer/ID/run/attempt, and normalized grant permissions; it excludes availability, offer, attestation, and content-digest identities. A later wave requires a different projection digest; after `execution_not_started`, each released invocation also requires a semantic candidate key not rejected for that invocation. Clearing the guard and claiming work is one advanced transition.

Each invocation state contains invocation ID, status, activation count, execution count, current or last global activation ID, last activation source, accepted Assignment/result digests, OutputReference digests, satisfied EvidenceSatisfaction digests, and retained terminal/history digests or event IDs as specified by the status variant. Core allocates one never-reused `activation.` ID whenever a route, fan-out, join, or entry transition activates an invocation.

| Invocation status | Required variant fields |
| --- | --- |
| `pending` | none |
| `ready` | activation source and next execution ordinal |
| `claimed` | active Assignment ID/digest |
| `input_required` | active InputRequest ID/digest or queued PendingRequestSeed ID/digest |
| `succeeded` | accepted result and output/evidence digests plus settlementKind `routed` or `declared_exit`; routed requires route/traversal identity, while declared_exit requires exit node, accepted `pass`, and forbids route fields |
| `failed`, `blocked`, `uncertain` | terminal code, source value digest when one exists, and terminal event ID |
| `skipped` | winning join/branch or unreachable-route reason |
| `abandoned` | parent terminal status, fixed abandonment reason, causing request/result/event digest, and terminal event ID |

A bounded cycle reactivates the same invocation ID, increments activation count, and retains prior assignment/result/evidence digests. It never invents a second logical invocation. Execution count increments only for `executed`; `not_started` does not increment it.

Branch state identifies the fixed branch or replication lane, canonical priority, current invocation, status `inactive`, `active`, `succeeded`, `terminal_non_success`, `skipped`, or `abandoned`, and retained result/evidence digests. Join state identifies the concrete source set, strategy, status `open`, `closed_success`, `closed_non_success`, or `abandoned`, settled sources, optional winner, transferred bindings, and close/terminal event ID. Port bindings identify source invocation/output/Assignment and destination invocation/input; ResponseInputBindings separately identify user-answer inputs. Criterion state identifies required producer/verifier/reviewer/EvidenceBinding IDs and accepted EvidenceSatisfaction digests.

Runtime readiness comes from entry activation, accepted Circuit routes, fan-out activation, and closed joins. WorkPacket dependency text is trace metadata and cannot independently activate work.

Run operation results are closed:

- `transition_started`: `kind`, new ready revision-zero OrchestrationState, and sorted emitted OrchestrationEvent values; it has no prior-state field;
- `transition_advanced`: `kind`, prior state digest, next OrchestrationState, sorted emitted OrchestrationEvent values, ExecutionTickets only when next status is claimed, and MergeReadyEvidence only when next status is completed;
- `transition_start_rejected`: `kind`, `identityKind`, optional StartIdentity, and sanitized diagnostics. `identified` requires the sole grammar-valid equal tuple across the valid compiled PlanningSession, Plan, RunAuthority, and other parseable carriers; `unidentified` forbids identity when no sole tuple exists. It never carries a prior-state digest or claims an unchanged state;
- `transition_needs_availability`: `kind`, unchanged ready state ID/revision/digest, exact canonical capacity-ready invocation IDs, and their readySetDigest; returned only when `prepareWave` has completed every no-capacity preflight and needs a callback value;
- `transition_deferred`: `kind`, unchanged claimed state ID/revision/digest, and reason `cancellation_already_requested`;
- `transition_rejected_unbound`: `kind` and sanitized diagnostics for a continuation whose supplied state cannot be parsed as one identifiable valid root;
- `transition_rejected_bound`: `kind`, unchanged valid state ID/revision/digest, and sanitized diagnostics.

This classification is total: `startRun` uses exactly one started/start-rejected variant and never an advanced result; all other run operations use exactly one advanced/deferred/continuation-rejected variant. A start rejection may identify the attempted tuple but never calls it an unchanged or prior state; ordinary bound rejection begins only after a valid OrchestrationState exists.

Operations:

| Prior | Operation | Next |
| --- | --- | --- |
| absent | `startRun(compiled session, Plan, prior tail event)` | `transition_started` with ready revision 0 |
| ready | `prepareWave` | transition_needs_availability unchanged, claimed, ready with waitGuard, input_required, repository_required, completed, failed, or blocked |
| ready | `cancelRun(request)` | cancelled |
| claimed | `applyWaveResults` | ready, input_required, completed, failed, blocked, cancelled, or uncertain |
| claimed | first `cancelRun(request)` | claimed with cancellation request; immutable claim revision retained |
| claimed | repeated exact `cancelRun` request | deferred unchanged |
| claimed | different `cancelRun` request while one is active | bound rejection unchanged |
| input_required | `resumeRun(response)` | input_required, ready, completed, blocked, or cancelled |
| input_required | `cancelRun(request)` | cancelled |
| repository_required | `recordRepositoryState(result)` | input_required for owner approval, completed, or blocked |
| repository_required | `cancelRun(request)` | cancelled |
| terminal | any operation | bound rejection unchanged |

Every bound operation validates the exact prior tail OrchestrationEvent against the session/state eventSequence, eventTailId, eventTailDigest, successor projection, derived post-tail journalDigest, and derived journalBytes before advancing. Every advanced transition increments revision once, emits at least one parent event, and sets the successor tail to its final emitted event ID. A successor root stores the final emitted event digest only after every event binds the successor's non-trace projection; it may also retain strictly earlier source-event digests through source-linked values such as MemoryCandidate. The transition projection rule makes this acyclic. Every rejected or deferred result leaves the bound prior value byte-identical.

## Portable Paths And Conflict Safety

V11 repository prefixes are literal paths, not globs. They are slash-separated ASCII segments using letters, digits, dot, underscore, and hyphen. They reject roots, drive letters, colon, backslash, wildcards, empty/dot/parent segments, controls, trailing dot/space, Windows reserved device names, and alternate streams. A V10 filesystem permission may end in one `/**`; only that marker is removed before V11 prefix validation.

AvailabilitySnapshot carries sorted path-identity HostObservation digests and the callback supplies the detached observations. Every Plan read/write/conflict prefix has one state/baseline-bound observation. An observation records lexical prefix, canonical repository-relative prefix, existing target or observed-parent mode, baseline identity, link/reparse status, containment result, case-sensitivity mode, canonical host identity, attestor binding, and contentDigest.

Existing targets require an observed canonical target. Planned new paths require an observed contained existing parent plus the literal child. Outside-repository containment rejects. Link/reparse ambiguity, Unicode aliasing, unknown case behavior, or unresolved identity yields scope status `unknown`; it never becomes a claimed canonical path.

Overlap uses path-segment prefix comparison on exact ASCII, ASCII-lowercase, and equal canonical host identities. Read/read overlap is allowed. Write/write, write/read, shared required conflict scope, and unknown scope against any writer conflict. A write with unresolved identity may execute only alone.

Post-execution `changed_paths` observations use the same grammar and baseline binding. A changed path outside the ticket's write scopes or inside an excluded scope makes the parent uncertain; it can never be relabeled as successful evidence. Core validates observations and scheduling implications. The host authenticates attestors, resolves filesystem identity, and enforces the exact V10 grant.

## Wave Selection

Core freezes every validated AgentBlueprint from Goal, Policy, TaskAuthorityProjection, WorkPacket, and AgentBlueprintIntent before consulting AgentProfile values. Changing profile supply can change Plan feasibility and later Assignment, never the content of a fixed blueprint. Compilation then builds the static AgentBlueprint/profile compatibility relation without live slots or grants. Every blueprint requires at least one compatible allowlisted profile; missing supply blocks with `missing_permanent_capability` rather than mutating demand. For each `independentFromNodeIds` edge, at least one compatible predecessor/constrained profile pair must have different profile ID/version; otherwise planning blocks with `missing_permanent_capability`. Executor independence remains a live slot constraint because executors are not AgentProfile fields.

From structurally ready invocations in canonical ready order:

1. begin with an empty selected set;
2. inspect each invocation once;
3. skip it if its Plan scopes conflict with the selected set;
4. tentatively add it and build the exact slot/GrantOffer candidate graph;
5. retain it only if a matching assigns every selected invocation;
6. retain it only if the exact resource allocation below is feasible for the tentative set;
7. stop after the effective concurrency ceiling or 32 selections;
8. apply the normative matching objective to the final selected set.

This deterministic earliest-feasible algorithm favors stable trace and simple implementation over globally optimal conflict packing.

`prepareWave` follows one exhaustive no-progress order before capacity can be observed:

1. validate the exact ready state, tail, immutable closure, retained bindings, and remaining resource counters;
2. reduce accepted outcomes to a fixed point using policy interception, exact declared routes, route-budget checks, and only then declared-exit fallback;
3. evaluate workflow, acceptance, integration, memory, and repository predicates; if every predicate except the final repository witness and optional owner approval holds, advance to `repository_required`; if a witness already exists and only owner approval is missing, emit that request; if all predicates hold, complete;
4. settle parent cancellation or uncertainty, then deterministic unrecoverable branch/join failure, route-budget failure, and deterministic block using the terminal-closure table;
5. derive, without callbacks, triggerable pre-execution approvals and approved capacity-ready activations;
6. when unfinished work has neither set and no claim, input, live seed, reducible route/fan-out/join, or future activation, block as `no_legal_initial_work` before any execution has occurred or `deadlock` otherwise;
7. for every capacity-ready activation, evaluate permanent static profile/capability/artifact-type/independence compatibility; zero compatible activations blocks as `missing_permanent_capability`;
8. reserve exact closure for the next request or claim; inability to fit either blocks as `resource_limit_imminent`;
9. if triggerable approvals exist, create seeds and promote the first in ready-invocation order, advancing to `input_required` without availability;
10. otherwise derive the exact canonical capacity-ready set; when availability is absent, compute its readySetDigest and return `transition_needs_availability` unchanged; only then may `runGoal` invoke the callback;
11. when availability is present, require the same set and readySetDigest in the snapshot, perform matching/resource-feasible selection, and either claim work or create one capacity wait.

Deadlock specifically requires unfinished work plus no active claim/input, live seed, approval-triggerable activation, approved capacity-ready activation, or route/join/fan-out reduction still possible. Static incompatibility is never called deadlock.

Supplying availability before the pure preflight returns `transition_needs_availability`, or supplying it when a request/terminal transition is derivable, is a bound rejection. Thus availability is never required to discover completion, failure, deadlock, resource exhaustion, or pre-execution input. Before declaring a capacity wait, static eligibility is recomputed against accepted predecessor assignments: if no allowlisted profile can satisfy capability, authority, artifact-type, and profile-independence constraints for any ready invocation, transition to blocked with `missing_permanent_capability`. If work remains statically eligible but the supplied snapshot has no complete live slot/offer edge, including a distinct executor where required, advance to ready with a `capacity_unavailable` waitGuard. The facade returns waiting once and cannot poll that snapshot again.

After matching, `prepareWave` computes the deterministic per-ticket `resultLimits` allocation and the wave's worst-case legal `claimReserve` from remaining state, event, journal, revision, callback-output, repository-witness, and completion capacity. If the full reserve cannot fit, it advances to blocked with `resource_limit_imminent` before any execution callback. It then creates Assignment values and one WaveClaim, advances to a claimed state, computes that state digest, and derives ExecutionTickets. An advanced caller must install the claimed state as its serialized coordinator's current in-memory state before separately invoking any ticket callback; `runGoal` performs that local install before dispatch. This is process-local ordering, not durable persistence, a lease, or a distributed claim. Tickets in the wave may then execute concurrently. One serialized coordinator is conformant; crash recovery and distributed claim guarantees are deferred.

## Assignment, Claim, And Ticket

Assignment required fields are:

- `assignmentId` and `contentDigest`;
- run/orchestration IDs and GoalContract, Plan, Policy, Circuit, RunAuthority, and prior ready-state digests;
- invocation ID/address, AgentBlueprint ID/contentDigest, WorkPacket ID/SnapshotDigest, logical role, node function, exact capabilities, permissions, and scope digests;
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
- one closed `claimReserve` with required fields `resultBatchJcsBytes`, `detachedJcsBytes`, `successorStateJcsBytes`, `parentEventCount`, `parentEventJcsBytes`, `journalStreamAppendBytes`, `revisionCount`, `repositoryCallbackJcsBytes`, `transitionResultJcsBytes`, `facadeResultJcsBytes`, and `continuationJcsBytes`; completion-only fields are zero when unreachable;
- sorted `ticketResultLimitAllocations` with exactly one Assignment-ID row per Assignment;
- `cancellationStatus: not_requested`.

Creating the claim atomically appends every selected `(V10 runId, attemptId)` tuple to OrchestrationState before dispatch. That tuple is consumed even when execution is later not started, rejected, cancelled, uncertain, or presented under a different grant; no cycle or continuation may reuse it. Matching is injective over that tuple within a wave and rejects any offer whose tuple was consumed earlier or appears on another selected edge.

WaveClaim is immutable. A later cancellation request is stored on the current claimed OrchestrationState and never rewrites the claim, assignments, tickets, or claimed-state binding.

ExecutionTicket required fields are:

- `ticketId` and `contentDigest`;
- run/orchestration IDs;
- GoalContract, RunAuthority, Policy, Circuit, Plan, and claimed-state digests;
- wave/claim and Assignment IDs/digests;
- Circuit node, concrete address, invocation ID, and AgentBlueprint ID/contentDigest;
- WorkPacket ID/reference/SnapshotDigest and source repository/branch/baseline;
- logical role, node function, exact capability/permission/scope, criterion, input/output port, accepted input OutputReference, evidence, and independence bindings; for a memory node, exact eligible source OutputReference, evidence, and prior parent-event digests;
- AgentProfile, AvailabilitySnapshot/projection, reservation/slot, executor, AdapterManifest, GrantOffer, ExecutionGrant, and path-observation identities/digests;
- exact V10 run ID equal to the parent run ID, grant-supplied attempt ID, correlation ID equal to the ticket ID, grant ID, and RunAuthority execution policy;
- one closed `resultLimits` exactly equal to its WaveClaim allocation row, with required non-negative fields `maxOutputs`, `maxHostObservations`, `maxEvidenceSatisfactions`, `maxMemoryProposals`, `maxChildEvents`, `maxMaterializationReceiptJcsBytes`, `maxResultJcsBytes`, `maxDetachedJcsBytes`, `maxRetainedStateDeltaBytes`, `maxParentEvents`, and `maxParentEventJcsBytes`.

ExecutionTicket is closed serializable JSON. It contains only references, digests, IDs, codes, and bounded values; it never contains a detached artifact, function, executor handle, Promise, or AbortSignal. Tickets are never embedded in OrchestrationState or parent events.

`AgentMaterializationReceipt` is a host-authored digestible nested value validated at the one-shot dispatch boundary. It contains:

- `kind: AgentMaterializationReceipt`, `receiptId` whose ordinal equals the ticket Assignment ordinal, and `contentDigest`;
- run, Plan, claimed-state, Assignment, ticket, AgentBlueprint, WorkPacket, AgentProfile, executor, AdapterManifest, and ExecutionGrant identities/digests;
- adapter ID/version and `materializationMode` equal to `direct_blueprint` or `rendered_adapter`;
- `status: applied`;
- delivered ContextUseBinding-row digests in blueprint order, each recomputed with the registered `swecircuit.v11.context-use-binding` domain, exact sorted capability IDs, exact Module input/output port IDs, and the eight WorkPacket field-projection digests from the blueprint;
- an allowlisted host attestor ID/role plus attestation SourceReference/digest.

The receipt forbids prompt text/digest, transcript, reasoning, provider/model identity, secrets, environment values, commands, logs, and arbitrary metadata. Core proves only that it supplied the exact blueprint and validated a bound host attestation before V10 dispatch; it does not independently prove that an external provider obeyed the materialization. A missing, substituted, widened, incomplete, malformed, or over-ticket-byte-limit receipt prevents dispatch before the dispatch counter increments. The same receipt digest is retained in the opaque capture and every settled ChildResultEnvelope.
`ExecutionDispatchRequest` is a transient host-language callback object, not a digestible kind or schema value. It contains the exact ExecutionTicket, AgentBlueprint, detached WorkPacket, AdapterManifest, ExecutionGrant, host AbortSignal, and one core-owned `dispatchV10(executor, materializationReceipt)` function. Core digest-checks all detached serializable values before exposing the request. The one-shot function verifies executor identity and the complete AgentMaterializationReceipt, checks the `(V10 runId, attemptId)` tuple already reserved by the claim, retains the receipt digest, increments the dispatch counter, calls V10 once, validates and deep-detaches the exact settled OperationResult, computes its SnapshotDigest, freezes that detached value, privately retains it, and only then resolves an `ExecutionDispatchReceipt` containing that same frozen value, result digest, and materialization-receipt digest.

A normal `reported` ExecutionReport repeats only `operationResultSnapshotDigest` from the receipt plus output, observation, evidence-binding, and memory drafts. It cannot submit or mutate the result. Core compares the reported digest to the private capture before deriving ChildResultEnvelope; mismatch, malformed capture, mutation, second entry, callback exception after entry, or post-entry limit failure becomes `effect_unknown` with `dispatch_result_mismatch` or the more specific fixed code. No output, route, retry, evidence satisfaction, or workflow outcome survives.

`dispatchExecutionTicket` is the only public lower-level dispatch operation. It accepts one exact ticket and AgentBlueprint plus detached packet/manifest/grant, signal, and ExecutionCallback; constructs the request; runs the same one-shot boundary; and returns an opaque process-local `ExecutionCapture`. The capture is not JSON, cannot be constructed by callers, and is valid only for the exact claimed state and package instance. `applyWaveResults` accepts exactly one such capture per Assignment and no caller-supplied ChildResultEnvelope, OperationResult, ExecutionSummary, or child event arrays. The facade uses the same operation. Serializable ChildResultEnvelope values are core-derived retained output only.

This deliberately defers cross-process recovery of active claims: after process loss, a host cannot forge captures and must treat the claim under the uncertainty policy. The one-shot capability cannot prevent injected code from using ambient process authority; hosts that need enforcement must isolate callbacks. Functions, captures, executor handles, and AbortSignal never enter JCS, state, events, continuation, or trace.

## ChildResultEnvelope

Every ChildResultEnvelope has an explicit `resultKind` discriminator (`executed`, `v10_rejected`, `not_started`, or `effect_unknown`) and fixed `captureOrigin: core_captured`. It repeats run/orchestration, GoalContract, Policy, Plan, claimed-state, wave, claim, Assignment, ticket, invocation, AgentBlueprint, packet, profile, availability/projection, reservation/slot, executor, manifest, AgentMaterializationReceipt when captured, GrantOffer, grant, and authority identities/digests plus `resultId` and `contentDigest`. One mismatch rejects the complete batch without mutation.

| Variant | Required fields | Forbidden fields |
| --- | --- | --- |
| `executed` | successful V10 OperationResult SnapshotDigest, AgentMaterializationReceipt, detached ExecutionSummary plus SnapshotDigest, sorted child RunEvent SnapshotDigests, exactly one `dispatch_effect` HostObservation with status `settled`, other HostObservation values, OutputReference values, and non-empty MemoryProposal values exactly when a `memory` invocation maps an accepted completed outcome | rejection codes, zero-call observation, unknown-effect code; MemoryProposal values for every other case |
| `v10_rejected` | rejected V10 OperationResult SnapshotDigest, AgentMaterializationReceipt, exactly one `dispatch_effect` HostObservation with status `settled`, and sorted sanitized diagnostic codes | ExecutionSummary, child journal, outputs, MemoryProposal values, zero-call observation |
| `not_started` | exactly one zero-call HostObservation, exactly one `dispatch_effect` HostObservation with status `not_dispatched`, and fixed reason code | AgentMaterializationReceipt, V10 OperationResult, ExecutionSummary, child journal, outputs, MemoryProposal values |
| `effect_unknown` | fixed uncertainty code, exactly one `dispatch_effect` HostObservation with status `effect_unknown`, and the AgentMaterializationReceipt exactly when core validated it before dispatch entry | success outputs, MemoryProposal values, workflow outcome |

`executed` requires captured `OperationResult.ok: true`, a non-null ExecutionSummary, exact summary/result agreement, and exact child event snapshots. It means V10 returned a value, not that work succeeded: failed, acknowledged-cancelled, and confirmed-timeout summaries remain `executed`. `v10_rejected` requires captured `OperationResult.ok: false` and null value. The result SnapshotDigest always equals core's private capture; callback data cannot choose it. Raw diagnostics remain detached; only fixed catalog codes enter the envelope.

`not_started` is valid only when core's dispatch counter remains zero. Once callback initiation is ambiguous, only `effect_unknown` is valid. Any callback value beyond its ticket limits after entry is also unknown because software work may have occurred. No host-attested substitute for a capture is accepted.

HostObservation common required fields are `observationId`, `observationKind`, `origin`, run ID, Plan digest, source-value digest, fixed result code, bounded source refs, and `contentDigest`.

Origin is one closed union:

- `core_observed` requires `actorRole: core` and forbids attestor and attestation fields;
- `host_attested` requires an allowlisted attestor ID/role plus attestation ref/digest and forbids `actorRole`.

Binding is one closed union:

- preflight `path_identity` binds the ready-state revision/digest, source baseline, and lexical scope; it forbids claimed-state, Assignment, and ticket fields because those values do not exist yet;
- result-time observations bind the original claimed-state, Assignment, and ticket identities/digests;
- completion-time `repository_state` binds the exact repository-required state, Plan, baseline, every accepted write-result/per-result-head/changed-path digest, and forbids Assignment/ticket fields.

| Observation kind | Required variant fields | Permitted origin |
| --- | --- | --- |
| `zero_call` | callback count zero | core_observed |
| `dispatch_effect` | dispatch count zero or one; status `not_dispatched`, `dispatched`, `settled`, or `effect_unknown`; fixed boundary/failure code | core_observed |
| `journal_bytes` | observed aggregate child-journal byte count and digest | core_observed |
| `output_bytes` | observed output byte count and payload digest | host_attested |
| `vcs_baseline` / `vcs_head` | repository identity and commit digest | host_attested |
| `changed_paths` | sorted lexical/canonical path pairs and baseline/head observation digests | host_attested |
| `path_identity` | lexical/canonical prefix, target mode, containment, link/reparse, case, identity, and scope status | host_attested |
| `repository_state` | repository/baseline/final-head identity, sorted accepted-write bindings, clean/containment/ancestry assertions, tree-manifest SourceReference/digest, and host-neutral repository-tree digest | host_attested |

RunAuthority allowlists only host attestors; core observations derive their actor internally. Core validates shape, binding, scope implications, and consistency but does not authenticate the host or independently observe its filesystem. Every executed result includes core-counted `journal_bytes` for its detached child events. Every OutputDraft has one matching host-attested `output_bytes` observation; core compares its size and payload digest with the draft but does not read the external output bytes. A ticket with any filesystem-write requiredPermission additionally requires exactly one result-time `vcs_baseline` matching RunAuthority source, one `vcs_head`, and one `changed_paths` observation that binds both; the changed-path array may be empty. Missing or internally inconsistent required effect observations after dispatch make the parent uncertain as `effect_unknown`, while a proven outside-scope change uses `out_of_scope_effect`.

ExecutionReport contains sorted OutputDraft and EvidenceBindingDraft values, never an OperationResult, OutputReference, or EvidenceSatisfaction. An output draft contains output port, artifactType/artifactVersion, SourceReference, byte size, payload digest, optional schema SourceReference/digest pair, and validating HostObservation digest; it contains no output ID, producer, Assignment, invocation, role, criterion, or evidence owner. Evidence drafts use the one-to-one qualified mapping defined above and contain no derived ownership. Output drafts sort by output port, artifactType, artifactVersion, source-reference comparator, then payload digest.

Core validates each draft against the ticket and accepted observations, then creates OutputReference values in draft order. OutputReference required fields are `outputId`, producer Assignment/invocation/logical-role IDs and digests, output port, artifactType/artifactVersion, source ref, byte size, `payloadDigest`, optional `schemaRef`/`schemaDigest`, validating HostObservation digest, and `contentDigest`. Worker payload cannot choose producer or evidence ownership.

## Complete Batch Reduction

`applyWaveResults` requires exactly one opaque ExecutionCapture per claimed Assignment. Core derives one ChildResultEnvelope per capture, validates the whole batch before mutation, sorts by Assignment ID, and advances one revision. Missing, extra, duplicate, stale, replayed, substituted, foreign-process, or malformed captures reject the whole batch unchanged. Callers cannot supply retained result values directly.

Result precedence and reduction are one deterministic two-pass operation:

1. validate every capture-derived envelope, detached source, dispatch-receipt digest, result limit, and whole-batch binding before deriving ordinary routes;
2. any `effect_unknown`, V10 `abort_unconfirmed`, out-of-scope observed change, or post-dispatch result-limit overflow makes the parent terminal `uncertain`; retain raw settled reports/observations/evidence history but create no new OutputReference, EvidenceSatisfaction, route, criterion credit, or memory candidate;
3. if cancellation was requested, require every capture to prove settled or not started, then terminalize cancelled with the same no-new-acceptance rule;
4. for the ordinary batch only, derive OutputReferences and candidate EvidenceSatisfactions, apply each invocation's required-evidence gate and evidenceFailureOutcome, then simulate every resulting mapping without mutation;
5. resolve all branch terminality and canonical `any` winners from the complete simulated batch;
6. for a claimed lower-priority loser after an `any` winner, retain its result, observations, and satisfaction history and mark it skipped, but give it no criterion/integration credit, transfer no output, consume no route budget, and activate no successor;
7. apply mappings for every accepted executed/rejected result in Assignment order, close joins, create outcome request seeds, and derive memory candidates;
8. release a `not_started` invocation to ready only when its branch/mainline remains live; a newly skipped loser produces no wait;
9. emit one `wave.closed` event, then result/evidence, routing/transfer/join, criterion, input, memory, wait/repository, abandonment, and terminal events in their documented canonical families.

If one or more live `not_started` invocations remain, install one `execution_not_started` waitGuard containing exactly those invocations and rejected semantic-candidate keys. The next continuation must supply a changed availability projection and a different candidate binding for each released invocation. Other legal terminal results in the same batch remain applied.

A cancellation request advances parent revision but does not alter WaveClaim ID/digest, claim revision, Assignment, ticket, or immutable claimed-state binding. Results bind that original claimed-state digest and are accepted only while the current claimed state references the exact active claim. When cancellation is already active, an exact repeat of the stored request ID/digest is detected before current-state freshness checks and returns deferred unchanged; a different request returns bound rejection `cancellation_conflict`.

## V10 Mapping

| Child case | Parent action without parent cancellation |
| --- | --- |
| `not_started` | release invocation to ready and install waitGuard; no route or output |
| `v10_rejected` | route `diagnose` when Circuit declares it, otherwise blocked |
| executed completed with workflow outcome | apply Policy/evidence interception, then an exact declared route; if its budget is exhausted fail; only with no route, `pass` at a declared exit settles success, `block` blocks as workflow_blocked, and every other outcome fails as workflow_failed |
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

Outcome reduction order is normative: apply Policy/evidence interception; select the exact declared Circuit route for the resulting outcome; fail if that selected route's budget is exhausted; otherwise decrement and activate it; only when no route exists may accepted `pass` at a declared Circuit exit settle successfully. A route therefore wins even from an exit, and exhausted routing can never fall back to exit success. With no route, `block` becomes blocked as `workflow_blocked`; every non-exit pass and other outcome fails as `workflow_failed`.

A succeeded invocation records `settlementKind`. `routed` requires route/traversal fields and forbids exitNodeId. `declared_exit` requires exitNodeId, acceptedOutcome `pass`, accepted result digest, and forbids route/traversal fields. `blocked` means no ambiguous effect occurred and progress cannot continue because of policy/preflight rejection, missing permanent capability, declined approval without a route, deadlock, invalid contract result, or no legal initial work.

The exact ClaimReserve always covers exhaustive terminal closure; completion-capable work additionally reserves repository recording and optional owner approval as defined under Resource Limits. A nonterminal transition that would consume those reserves instead advances to blocked with `resource_limit_imminent`. Terminal states are immutable.

### Exhaustive Terminal Closure

A parent terminal transition is legal only after every child callback in an active claim has settled or the parent is already classifying the exact claim as uncertain. The transition deterministically closes every retained row:

| Parent status | Causing work | Other nonterminal invocations | Active branches and joins | Requests and waits |
| --- | --- | --- | --- | --- |
| `completed` | every accepted required invocation is `succeeded`; never-activated unreachable invocations are `skipped` | none may remain | required branches/joins are closed success; unreachable alternatives are skipped | none |
| `failed` | causal invocation/branch is `failed` | `abandoned` with `parent_failed` after all claims settle | open branches become terminal non-success; open joins become `abandoned` | discarded; wait cleared |
| `blocked` | causal invocation is `blocked` when one exists | `abandoned` with `parent_blocked` | open branches/joins become `abandoned` | discarded; wait cleared |
| `cancelled` | no causal child success is accepted after cancellation precedence | `abandoned` with `parent_cancelled` after all claims settle | open branches/joins become `abandoned` | discarded; wait cleared |
| `uncertain` | each ambiguous-effect invocation is `uncertain` | `abandoned` with `parent_uncertain`; settled sibling evidence is retained but no output/route is accepted | open branches/joins become `abandoned` | discarded; wait cleared |

An abandoned invocation retains its activation and any settled Assignment/result/evidence history but creates no output transfer, route, satisfaction, or memory candidate after the parent cause. Core emits `invocation.abandoned`, `branch.abandoned`, `join.abandoned`, and `run.input_discarded` in Plan order before the sole `run.terminal` event. Branch status therefore includes `abandoned`, and join status includes `abandoned` in addition to open and closed-success/non-success. Terminal OrchestrationState forbids active claims, pending/queued requests, wait guards, and repository requests. These rules are exhaustive; an implementation cannot leave a row in `ready`, `claimed`, `input_required`, `active`, or `open` under a terminal parent.

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

`PendingRequestSeed` is one closed union:

- `pre_execution` contains the seed ID/digest, source ready-state revision/digest, node/invocation/activation IDs, exact Policy action, purpose `risk_approval`, responder role, body reference/digest, decisions/actions, and prior source-event digests. It forbids Assignment, ticket, result, output, and claimed-state fields because none exists yet.
- `outcome` contains the seed ID/digest, source claimed-state, Assignment, ticket, ChildResultEnvelope, invocation/activation, accepted declared body OutputReference, exact Policy action, purpose `clarification`, responder role, decisions/actions, and prior source-event digests.

A seed contains no InputRequest ID, current/future successor-state digest, response, or callback value. A run request has one closed subject: `invocation` binds one node/invocation/activation and its promoted seed, while `completion` binds the accepted RepositoryStateWitness and final merge gate and forbids node/invocation/seed fields.

Before a ready activation with `before_execution` risk policy can enter matching, `prepareWave` checks `activationApprovalBindings`. If that exact activation has no consumed approval, core creates a pre-execution seed and advances to `input_required` without calling availability or execution. Accepting `approve -> release_invocation` records one immutable ActivationApprovalBinding with approval-binding ID/contentDigest; run/Plan/Policy/authority and node/invocation/activation bindings; seed/request/response IDs and digests; source input-required state revision/digest; literal decision `approve` and action `release_invocation`; and prior event ID/digest. It forbids availability, Assignment, ticket, grant, result, output, successor-state, and newly emitted event digests. Exactly one may exist per `(invocationId, activationId)`. It releases only that activation; a not-started retry reuses the activation and approval, while a later route/cycle activation gets a new ID and requires a new decision. An `on_outcome` policy creates an outcome seed only when the accepted executed result emits `clarify`, and its body reference/digest comes from the declared accepted output port. After every other completion predicate including RepositoryStateWitness holds, core creates the sole `owner_merge_approval` completion request when effective approval is required.

A wave may discover several outcome requests, and preflight may discover several pre-execution requests. Core creates seeds in Assignment order for outcome requests or ready-invocation order for pre-execution requests, promotes the first live seed into the sole InputRequest bound to that successor revision, and stores the remaining complete seeds in canonical order. `runGoal` exposes only the active request, and `resumeRun` accepts only that request.

One response is consumed per transition and its exact decision action is applied in that same transition. A clarification answer creates one `ResponseInputBinding` from the accepted InputResponse body SourceReference/digest and source request/result to each exact route-selected successor invocation, new activation ID, declared destination input port, and V9 artifactType; that complete binding is retained in state and supplied in the successor ExecutionTicket. The answer therefore becomes module input rather than trace-only prose.

After applying the active action, core recomputes routes, branch/join winners, activation identity, and seed liveness before promoting another seed. A pre-execution seed is live only while its exact invocation activation remains ready and unapproved. An outcome seed is live only while its exact accepted result still owns the unsettled clarification route and its branch has not become skipped or abandoned. Core emits one `run.input_discarded` event for every stale queued seed in seed-ID order with reason `branch_unreachable`, `activation_superseded`, `approval_already_consumed`, `outcome_already_resolved`, or `parent_terminal`, removes it, and then promotes the first remaining live seed. If none remains, reduction continues. A block, cancellation, failure, or uncertainty discards the active and queued seeds under the terminal-closure table without treating them as answered. A queued seed never predicts a future state digest, so sequential answers remain replay-safe without a digest cycle.

InputResponse binds the exact current input-required state and request. Core verifies every digest and that RunAuthority permits the responder role; the host authenticates the responder. An accepted response is recorded as consumed by the advanced revision and cannot replay.

`resumeRun` applies the request's exact decision action for clarification, risk approval, block, or decline, derives any activation approval or ResponseInputBinding, prunes stale seeds, and only then promotes a successor request. A missing, duplicate, or illegal action rejects the request contract before it is emitted. An owner approval binds the already accepted RepositoryStateWitness and, when it satisfies the final predicate, transitions directly to completed. A run-phase `cancel` decision applies its bound nested CancellationRequest; planning-phase `cancel` closes the PlanningSession as blocked without creating run state.

CancellationRequest required fields are `cancelId`, run/orchestration/Plan/Policy/RunAuthority IDs and digests, current state revision/digest, actor ID/role, host identity-attestation ref/digest, one fixed reason code, one closed `bodyBinding` using the same `none` or complete `bound` variants, and `contentDigest`. Reason is `user_request`, `policy`, `superseded`, `dependency_failed`, `parent_cancelled`, or `shutdown`. Wrong role, stale state, replay, or mismatched attestation rejects unchanged.

Cancellation of ready or input-required state is terminal immediately. Reason `user_request` maps to `cancelled_by_user`; `parent_cancelled` or `dependency_failed` maps to `cancelled_by_parent`; `policy`, `superseded`, or `shutdown` maps to `cancelled_by_policy`. Cancellation of claimed state records the request digest on a new parent revision while preserving the original claim/tickets; complete-batch precedence then settles uncertainty first and cancellation second.

## Final Repository State

Software-work success is not merge readiness until one final host-attested repository state is bound after all child effects, accepted work, integration, verification, review, and memory proposals have settled. Every settled executed filesystem-write result creates one `writeEffectBinding` containing wave ordinal; Assignment and ChildResultEnvelope IDs/digests; exact `vcs_baseline`, `vcs_head`, and `changed_paths` observation digests; and disposition `accepted`, `suppressed`, `abandoned`, or `uncertain`. Rows sort by wave ordinal, Assignment ordinal, then result ordinal. A write effect without exactly one row makes the parent uncertain.

`prepareWave` derives the request from the current pre-request state, then advances to `repository_required`. Its closed `repositoryStateRequest` contains the pre-request state revision/digest, expected successor revision, AcceptedWorkAccumulator digest, source repository/branch/baseline full commit and baselineTreeDigest, Plan digest, the complete sorted write-effect rows, and their registered `writeEffectSetDigest`. It never contains the successor state digest. The successor repository-required state embeds the complete request, so the state binds the request without a cycle. Read-only runs use an empty row set but still require the final witness.

The repository-state callback receives that exact state/request and returns one closed `RepositoryStateCallbackResult`:

- `observed` supplies exactly one host-attested `repository_state` HostObservation;
- `callback_failed` supplies no host text or exception and deterministically blocks with `repository_state_callback_failed`.

The observation includes repository identity, branch, baseline and final full Git commit OIDs, baselineTreeDigest, final `repositoryTreeDigest`, `changeDigest`, final changed paths, head relation `same` or `descendant`, `workingTreeClean: true`, containment `contained`, `allAcceptedWritesPresent: true`, `suppressedWritesAbsent: true`, `noUnattributedWrites: true`, the exact write-effect rows/set digest, and host attestation. Git OIDs are full lowercase SHA-1 (40 hex) or SHA-256 (64 hex); abbreviations reject.

`repositoryTreeDigest` and `changeDigest` use the registered domain tags, closed array/object preimages, explicit null placeholders, framing, and Portable Path ordering. No optional property omission or tuple-to-object substitution is permitted. A tree-manifest SourceReference/payload digest binds the host's external complete manifest. Core validates shape, exact row closure, scope consistency, source bindings, digest grammar, and attestor allowlisting; the host attests Git ancestry, cleanliness, containment, manifest completeness, and bytes. V11 does not claim independent repository observation.

For `observed`, `recordRepositoryState` derives the sole `RepositoryStateWitness` with ID `repository.000001`, binding the request, its pre-request state, the containing repository-required state, observation, write effects, baseline/final head and tree digests, change digest, manifest, attestor, and content digest. Dirty state blocks with `repository_state_invalid`; outside/unknown containment or divergent/unknown head makes the parent uncertain as `repository_state_uncertain`. The successor either creates owner approval bound to that witness or completes. Owner approval can never authorize a different later tree: any repository change requires a new orchestration run.

The final RepositoryStateWitness and `repositoryTreeDigest` are required in the completed state, terminal facade result, MergeReadyEvidence, complete trace inspection, semantic projection, accepted-work projection, and minimum reproducible evidence bundle.

## Completion

A run completes only when:

- every activated invocation is `succeeded` or is `skipped` only by an accepted unreachable-route or canonical-winner rule; no invocation is ready, claimed, input-required, failed, blocked, uncertain, or abandoned; every required branch/join is closed successfully; and at least one accepted invocation has `settlementKind: declared_exit`;
- every required port transfer is bound to an accepted OutputReference;
- every GoalContract criterion has every accepted producer, verifier, reviewer, and evidence binding required by its Plan coverage row and Policy;
- every Plan integration binding has accepted integrator outputs/evidence and the primary integrator has produced the completionPolicy merge-evidence references;
- verifier and reviewer invocations pass and satisfy every Policy independence constraint;
- the final RepositoryStateWitness is accepted, and effective owner merge approval required by Policy or RunAuthority is consumed against that exact witness;
- the Plan memory invocation has emitted at least one accepted source-linked MemoryProposal and every proposal has become exactly one MemoryCandidate;
- no active claim, waitGuard, pending input, uncertainty, route-budget failure, deadlock, or unresolved required evidence remains.

A MemoryProposal is permitted only in an accepted executed envelope for the Plan memory invocation. It contains `memoryProposalId`, `typeCode`, core-derived `destinationCode`, external body ref/digest, source Assignment/invocation, sorted accepted OutputReference/evidence/prior-event digests, and `contentDigest`; at least one source digest is present across those sets, every source is named by the ticket's exact eligible memory-source bindings, and every source was retained before the wave transition. Core derives exactly one MemoryCandidate per proposal in memory-proposal-ID order, adds Goal/criterion/run/Plan and proposal bindings, assigns the next candidate ID, and stores the complete candidate in state. The destination is fixed by type: `decision -> decisions`, `pattern -> patterns`, `known_issue -> known_issues`, `failed_attempt -> failed_attempts`, and `glossary -> glossary`. Neither value can mutate durable memory.

After the completed OrchestrationState and its `run.terminal` event exist, core forms one closed pre-merge terminal source bundle from the completed state/event, its AcceptedWorkAccumulator, Goal/Policy/RunAuthority/Plan and packet closure, RepositoryStateWitness, accepted evidence/integration/criterion values, owner response when required, and MemoryCandidates. The bundle explicitly excludes AcceptedWorkProjection and MergeReadyEvidence. Core first derives `accepted-work.000001` from that bundle, then derives `merge.000001` from the same bundle plus the projection digest. Both values remain outside the state/event digest graph and are returned from the completed advanced transition and facade result. MergeReadyEvidence contains `mergeEvidenceId: merge.000001` and `contentDigest`, Goal/Policy/RunAuthority/Plan digests, sorted accepted AgentBlueprint and AgentMaterializationReceipt digests, final state revision/digest, terminal event ID/digest, RepositoryStateWitness, acceptedWorkProjectionDigest, full final head, baselineTreeDigest, repositoryTreeDigest, changeDigest, writeEffectSetDigest, clean/contained assertions, primary and per-join integration bindings with accepted Assignment/result/output/EvidenceSatisfaction digests, every satisfied criterion binding, verifier/reviewer results, consumed owner-approval response when required, and sorted complete MemoryCandidate digests. The completed facade result returns the complete RepositoryStateWitness, sorted MemoryCandidate values, and this MergeReadyEvidence. It never performs a Git merge or mutates durable project memory.

## OrchestrationEvent

OrchestrationEvent common required fields are `eventTypeVersion: 1.0.0`, orchestration ID, `eventId`, `sequence`, actor role, RunAuthority/Policy digests, `priorRootDigest` required on every event after the initial start transition and forbidden on that first transition, required `nextRootProjectionDigest`, `priorJournalDigest`, `priorJournalBytes`, `eventType`, one closed `payload`, and `contentDigest`. The initial event uses `priorJournalDigest` equal to `sha256:` plus 64 zeroes and `priorJournalBytes: 0`; each later event uses the exact post-event cursor of its predecessor. The first orchestration event forbids cause fields; every later event requires `causeEventId` and `causeEventDigest` for the immediately preceding parent event.

Sequence starts at 1 and increments by one across planning and run events for one orchestration ID. The first event has no cause. Every later event names exactly one earlier event in the same orchestration. Multiple events from one transition form a canonical chain in the order listed by this contract. Parent event IDs use the sequence ordinal and cannot collide with child RunEvent IDs.

| Event type | Exact closed payload properties |
| --- | --- |
| `planning.started` | `sessionId` |
| `planning.input_requested` | `requestId`, `inputRequestDigest` |
| `planning.input_consumed` | `requestId`, `inputRequestDigest`, `responseId`, `inputResponseDigest`, `responderRole`, `decisionCode` |
| `planning.blocked` | optional `proposalDigest`, required `terminalCode` |
| `plan.compiled` | `proposalId`, `proposalDigest`, `planId`, `planDigest`, sorted `agentBlueprintDigests` |
| `run.started` | `planningSessionDigest`, `planId`, `planDigest`, `runId` |
| `run.waiting` | `reason`, `availabilityDigest`, `projectionDigest`, sorted `rejectedCandidateKeys` |
| `wave.claimed` | `waveId`, `waveClaimDigest`, sorted `assignmentDigests`, sorted `grantOfferDigests` |
| `wave.cancellation_requested` | `waveClaimDigest`, `cancellationRequestDigest` |
| `wave.closed` | `waveClaimDigest`, sorted `childResultDigests` |
| `run.input_requested` | `requestId`, `inputRequestDigest`, `subjectKind`, optional `invocationId` and `requestSeedDigest` |
| `run.input_consumed` | `requestId`, `inputRequestDigest`, `responseId`, `inputResponseDigest`, `responderRole`, `decisionCode`, sorted `responseInputBindingDigests`, optional `activationApprovalBindingDigest` |
| `run.input_discarded` | `requestSeedId`, `requestSeedDigest`, `invocationId`, `activationId`, `reason` |
| `invocation.activated` | `activationId`, `invocationId`, `sourceKind`, `sourceId`, `invocationActivationOrdinal` |
| `invocation.routed` | `invocationId`, `routeId`, `circuitRouteIdentity`, `outcome`, `remainingTraversals` |
| `invocation.abandoned` | `invocationId`, `activationId`, `reason`, `causeDigest` |
| `branch.abandoned` | `branchId`, `reason`, `causeDigest` |
| `join.abandoned` | `joinId`, `reason`, `causeDigest` |
| `port.transferred` | `sourceInvocationId`, `sourcePortId`, `destinationInvocationId`, `destinationPortId`, `outputReferenceDigest` |
| `join.closed` | `joinId`, `strategy`, sorted `branchIds`, sorted `acceptedResultDigests`, sorted `acceptedEvidenceDigests`, `status`, optional `winnerBranchId` |
| `evidence.recorded` | `invocationId`, sorted `evidenceSatisfactionDigests`, sorted `outputReferenceDigests`, sorted `hostObservationDigests` |
| `criterion.satisfied` | `criterionId`, sorted `producerBindings`, `verifierBindings`, `reviewerBindings`, and `evidenceBindings` |
| `memory.candidate_created` | `memoryProposalDigest`, `memoryCandidateDigest`, sorted `sourceReferences` |
| `repository.requested` | `repositoryStateRequestDigest`, `writeEffectSetDigest` |
| `repository.recorded` | `repositoryStateWitnessDigest`, `baselineTreeDigest`, `repositoryTreeDigest`, `changeDigest` |
| `run.terminal` | `status`, `terminalCode`, and `repositoryStateWitnessDigest` exactly when completed |

Each event variant forbids every payload field not listed for it. Derived actor role comes from core/Policy; planner, responder, assignee, cancellation actor, and attestor roles come only from their accepted bound values. Worker payload never chooses a parent actor or owner.

Events reference child run/attempt IDs plus OperationResult, ExecutionSummary, child RunEvent, output, observation, and result digests. They never copy, renumber, or re-own child RunEvents. Event-chain inspection requires retained root/event values and resolves detached source artifacts by digest. A completed terminal graph requires `repository.000001` because the completed state binds it, but never requires AcceptedWorkProjection or MergeReadyEvidence. Post-terminal merge-readiness inspection then validates the pre-merge bundle, `accepted-work.000001`, and `merge.000001` in that order. A missing source is reported as incomplete evidence, never reconstructed from prose.

## Payload Classification

| Data class | Canonical root/event | Transient or external only |
| --- | --- | --- |
| IDs, versions, enums, revisions, counts | Exact value | No |
| Digests, criterion/evidence/capability IDs | Exact value | No |
| Closed SourceReference locators and repository scope prefixes | Bounded value | No |
| Goal, criterion, prompt, question, answer, review, block, agent-instruction, or memory prose | Reference and digest only | Body |
| Inline source excerpts | Reference, digest, byte count only | Excerpt body |
| Rejected values and raw exceptions | Fixed diagnostic code/pointer only | Raw value |
| Prompts, chats, hidden reasoning, credentials, environment, provider payloads | No | Entire payload |
| Command output, logs, evidence bytes, output bytes, VCS data | HostObservation and digest | Raw bytes |
| Planner WorkPacket candidates | SnapshotDigest in roots/events | Detached callback value |
| WorkPacket execution input, detached GrantOffer, manifest, grant, AbortSignal | Digests or bounded references in roots/events | Detached transient ticket values |
| Materialization semantics | Bounded receipt identity, mode/status, registered context-use/field-projection digests, capabilities, ports, and attestation reference | Provider prompt/configuration body and hidden reasoning |

Sanitized diagnostics never interpolate rejected values. MemoryCandidate required fields are `candidateId`, type code `decision`, `pattern`, `known_issue`, `failed_attempt`, or `glossary`; GoalContract/criterion/run/Plan and MemoryProposal source bindings; sorted source refs and evidence/prior-event digests; proposed memory destination code; external body ref/digest; `status: proposed`; and `contentDigest`. Every source event must already exist before the transition that creates the proposal/candidate; neither value references its own `memory.candidate_created` event. They cannot contain a memory file body, mutation command, or accepted status.

## Resource Limits

| Boundary | Limit |
| --- | ---: |
| One pure public operation input or non-availability callback semantic output aggregate JCS UTF-8 bytes | 1,048,576 |
| One AvailabilityCallbackResult aggregate JCS UTF-8 bytes | 8,388,608 |
| One RunGoalContinuation aggregate JCS UTF-8 bytes | 5,242,880 |
| One serialized runGoal command or result aggregate JCS UTF-8 bytes | 8,388,608 |
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
| AgentBlueprintIntents / AgentBlueprints / aggregate context-use rows | 256 / 256 / 4,096 |
| Profiles / capabilities per profile or invocation | 64 / 64 |
| Slots / detached GrantOffers / live matching edges | 64 / 2,048 / 2,048 |
| Concurrency / wave assignments | 32 / 32 |
| Path observations / source refs / inline excerpts | 768 / 256 / 128 |
| One excerpt / aggregate excerpt bytes | 8,192 / 262,144 |
| Prerequisites / derived bindings | 4,096 / 4,096 |
| Scope entries per invocation | 256 read, 256 write, 256 conflict |
| Outputs / EvidenceSatisfactions / HostObservations per result | 64 / 64 / 69 |
| Child RunEvents per result | 7 |
| Planner callbacks / pending planning requests / active-plus-queued run requests | 8 / 1 / 32 |
| Run revisions / parent events | 10,000 / 10,000 |
| Automatic retries | 0 |

An aggregate array has exact bytes `2 + max(0, count - 1) + sum(item JCS bytes)`. Input limits are checked before callbacks. Pre-dispatch callback-output limits are checked immediately after return and before state allocation. An execution callback that exceeds its ticket limit after dispatch becomes `effect_unknown`. State/event/journal ceilings are checked before successor construction. Tests cover minus one, exact, and plus one.

`journalBytes` and event `priorJournalBytes` are delimiter-stream cursors: `sum(event JCS bytes) + max(0, eventCount - 1)`, excluding array brackets. `journalArrayBytes = journalBytes + 2`, and the 16,777,216-byte ceiling is checked against that value, so the maximum stored cursor is 16,777,214. A non-first maximum event appends 16,385 stream bytes. The child `journal_bytes` HostObservation instead counts and digests complete `JCS(childEvents[])`, including brackets; it is neither the parent cursor nor V10 JSONL bytes.

Assignments sort by allocated Assignment ordinal. For every shared count or byte pool, let `P = effective ceiling - already consumed - fixed shared costs - required closure costs`, let `minimum[i]` be the largest exact minimum across the four legal result variants applicable to ticket `i`, and let `R = P - sum(minimum[i])`. Ticket `i` receives `minimum[i] + floor(R/N) + 1` for the first `R mod N` ordinals and `minimum[i] + floor(R/N)` otherwise. Negative `R` makes the tentative selected set resource-infeasible. Minimums include required ports, observations, EvidenceSatisfactions, the complete AgentMaterializationReceipt for every dispatch-entered variant, its AcceptedWorkAccumulator semantic row when acceptance is reachable, and one proposal for a memory success. Count ceilings are derived first:

- `maxOutputs = min(64, declared output-port count)`;
- `maxEvidenceSatisfactions = min(64, eligible compiled evidence bindings)`, and compilation rejects an activation requiring more;
- `maxMemoryProposals` is 64 only for the memory invocation and zero otherwise;
- `maxChildEvents` is 7;
- `maxMaterializationReceiptJcsBytes` is the exact maximum JCS size of the one legal receipt shape for the ticket after applying all string, SourceReference, context, capability, and port ceilings; it is charged before dispatch and included once in every dispatch-entered result variant;
- `maxHostObservations = 2 + maxOutputs + (hasFilesystemWrite ? 3 : 0)`, yielding 66 without and 69 with writes.

Each OutputDraft requires a distinct output-bytes observation. The run-level repository-state observation is forbidden inside ChildResultEnvelope. Missing, extra, or duplicate allocation rows reject, and every ticket budget equals its claim row.

Reserve aggregation is exact: every `maxResultJcsBytes` already includes its complete bounded materialization receipt when dispatch entry is legal, every `maxDetachedJcsBytes` includes the detached callback/capture sources needed for reduction, and `resultBatchJcsBytes = 2 + (N - 1) + sum(maxResultJcsBytes)`; successor state is claimed-state bytes plus fixed shared growth plus retained deltas; parent-event count/bytes are fixed shared values plus ticket allocations; and `journalStreamAppendBytes = parentEventJcsBytes + parentEventCount` because claims append to a non-empty journal. Budget skeleton sizing charges every resource integer as a 16-decimal-digit safe integer, avoiding a size fixed point.

A completion-capable claim reserves result reduction plus `recordRepositoryState`, and one further revision when owner approval is required. It reserves repository callback/report/witness, every reachable EvidenceSatisfaction and MemoryCandidate, MergeReadyEvidence, operation/facade wrappers, and every reachable continuation. Resource feasibility is the last tentative-add predicate during selection: an infeasible candidate is skipped while later ready work is considered; if no single ready invocation fits, core blocks `resource_limit_imminent` before dispatch. Only a terminal transition may consume terminal closure reserve.

## Portability Projection

Byte conformance is strict: with the same host-supplied IDs, GoalContract, PolicyBundle, RunAuthority, profiles, proposal, availability values, detached inputs, and child results, two implementations emit byte-identical Plans, states, and events.

Semantic host portability permits different authority IDs, executor, reservation, manifest, grant, attestor, canonical-path, V10 run/attempt/event, VCS, and parent-event provenance while retaining the same logical profiles, permissions, repository-relative effects, and software outcomes. It operates on one complete retained trace bundle:

1. validate the complete acyclic root, nested-value, event, and detached-source reference graph; a missing, duplicate, or digest-mismatched source makes projection incomplete;
2. remove each value's own `contentDigest`, then project referenced values before referrers;
3. from RunAuthority remove metadata identity plus executor, grant-issuer, and attestor allowlists, while retaining goal/policy/source, profile allowlist, responder/cancellation roles, ceilings, limits, and approval requirements;
4. from AvailabilitySnapshot, GrantOffer, Assignment, ExecutionTicket, AgentMaterializationReceipt, ChildResultEnvelope, HostObservation, RepositoryStateWitness, and MergeReadyEvidence remove availability/projection/offer/materialization/observation/repository-witness/merge identities, reservation/slot, executor, adapter identity, AdapterManifest, ExecutionGrant, V10 run/attempt/correlation/grant, attestor/attestation, canonical-host-identity, and repository/branch/commit provenance while retaining materialization mode/status, delivered context/capability/port/constraint semantics, baselineTreeDigest, repositoryTreeDigest, changeDigest, final changed paths, cleanliness, containment, and projected write-effect bindings; project RunAuthority.source the same way;
5. from InputResponse remove responder ID and identity-attestation reference/digest while retaining responder role, decision, body digest, request semantics, and selected action; from CancellationRequest remove actor ID and identity-attestation reference/digest while retaining actor role, reason, body digest, and affected logical run;
6. project detached AdapterManifest and ExecutionGrant values to normalized required permissions; project V10 OperationResult, ExecutionSummary, and child RunEvent values by removing executor/grant/run/attempt/correlation/event/time provenance while retaining disposition, state, terminal/failure/workflow outcomes, evidence kinds, and semantic evidence/output digests;
7. replace each removed execution binding with profile ID/version, sorted capability IDs, exact required permissions, normalized lexical repository scopes, observation kind/status, and semantic output digest;
8. project parent events in sequence: remove event IDs, replace cause identity with prior sequence, replace prior-root and next-root-projection digests with the corresponding projected non-trace root digests, and recompute each projected prior-journal cursor plus the semantic journal chain from projected event JCS bytes;
9. in projected PlanningSession and OrchestrationState values, replace raw event-tail and journal fields with last sequence, projected tail-event digest, semantic journal digest, and semantic journal bytes; the projected non-trace root digest used by events is computed before those cursor fields, preserving the raw acyclic construction;
10. in every projected referrer, not only events, replace each raw reference digest with the projected digest of its referenced value; then sort arrays by their documented logical key, serialize with RFC 8785 JCS, and hash whenever a projected digest is referenced.

AgentBlueprint-to-profile mapping, blueprint field/context-use bindings, logical roles, capabilities, required permissions, routes, outcomes, activation counts, joins/winners, integration bindings, port and response-input transfers, criteria, EvidenceSatisfaction ownership, terminal state, MemoryProposal-to-MemoryCandidate provenance, repositoryTreeDigest, and merge-readiness predicates remain and must match. A removed host field that changes one of those retained semantics is not portable equality. This projection still retains coordination topology: revisions, waves, claims, waits, event order, and suppression history may differ between concurrency widths and are not required to compare equal.

### Accepted-Work Width Equivalence

`projectAcceptedWorkSemantics` provides the separate invariant for two Plans compiled from identical semantic inputs except requested concurrency. It first validates a complete pre-merge terminal source bundle that excludes AcceptedWorkProjection and MergeReadyEvidence, then emits one closed digestible `AcceptedWorkProjection` with ID `accepted-work.000001`, version `1.0.0`, and contentDigest, ordered only by Plan logical order. A nonterminal or source-incomplete bundle returns a closed incomplete result with sorted missing source digests and no projection. It retains:

- GoalContract, Policy, Plan graph/coverage, AgentBlueprint specialization/context-use semantics, host-neutral AgentMaterializationReceipt mode/status and delivered context/capability/port/constraint semantics, source baseline, logical profile/role/capability, and required-permission semantics, with requested/effective concurrency removed;
- each accepted invocation activation/result and exact routed outcome, excluding not-started attempts and work abandoned solely because a canonical `any` winner was already selected;
- canonical branch winners, accepted joins/transfers, OutputReference payload/schema digests, ResponseInputBindings, EvidenceSatisfactions, criteria, integration, verifier, reviewer, and owner-decision semantics;
- MemoryCandidate type/destination/body/source semantics;
- terminal status/code, final RepositoryStateWitness semantics, and repositoryTreeDigest.

It excludes revisions, waves, claims, assignments as scheduling identities, reservation/slot/grant/attempt data, availability/wait topology, parent and child event/journal topology, dispatch observations, host provenance, suppressed-loser results/evidence, abandoned unaccepted work, and ID ordinals whose only cause is execution width. Accepted rows are re-keyed by Plan invocation/address, activation ordinal, logical route/port, qualified requirement, and payload digest, then serialized with RFC 8785 JCS. Equality means equal projection digests.

A width-conformance test compiles two Plans from the same GoalContract, PolicyBundle, authority semantics, profiles, semantic proposal/lane/packet/intent content, concrete packets, logical availability capabilities, and deterministic child outcomes, differing only in requested concurrency and identities/digests transitively caused by that field, at widths one and N. Raw states/events are expected to differ; the test fails only when accepted-work projection, terminal status, or repositoryTreeDigest differs. A result that affects a winner, accepted output, evidence satisfaction, criterion, integration, memory, or final tree is never suppressed from this projection.

Different planners are not required to create the same proposal. The same validated proposal, detached candidate packets, and compiler inputs must create the same Plan.

## Fixed Code Catalog

Only these non-V10 orchestration control codes can enter roots, events, or result unions:

| Class | Closed values |
| --- | --- |
| Wait reason | `capacity_unavailable`, `execution_not_started` |
| Completed terminal | `success` |
| Failed terminal | `workflow_failed`, `child_cancelled`, `child_timed_out`, `route_budget_exhausted`, `join_failed` |
| Blocked terminal | `planner_blocked`, `planner_limit_exhausted`, `planner_callback_failed`, `availability_callback_failed`, `policy_nonconforming`, `missing_permanent_capability`, `resource_limit_imminent`, `risk_declined`, `input_blocked`, `owner_declined`, `deadlock`, `contract_result_invalid`, `no_legal_initial_work`, `workflow_blocked`, `repository_state_callback_failed`, `repository_state_invalid` |
| Cancelled terminal | `cancelled_by_user`, `cancelled_by_policy`, `cancelled_by_parent` |
| Uncertain terminal | `effect_unknown`, `abort_unconfirmed`, `out_of_scope_effect`, `post_dispatch_limit_exceeded`, `dispatch_result_mismatch`, `repository_state_uncertain` |
| Not-started reason | `execution_callback_failed_pre_dispatch`, `execution_callback_returned_pre_dispatch` |
| Unknown-effect reason | `execution_callback_failed_post_dispatch`, `dispatch_boundary_unknown`, `post_dispatch_limit_exceeded`, `dispatch_result_mismatch`, `post_dispatch_reference_invalid` |
| Abandonment reason | `parent_failed`, `parent_blocked`, `parent_cancelled`, `parent_uncertain` |
| Input-discard reason | `branch_unreachable`, `activation_superseded`, `approval_already_consumed`, `outcome_already_resolved`, `parent_terminal` |
| Deferred reason | `cancellation_already_requested` |

Bound/unbound rejection diagnostics use only: `orchestration.invalid_shape`, `orchestration.unknown_field`, `orchestration.digest_mismatch`, `orchestration.stale_revision`, `orchestration.tail_mismatch`, `orchestration.duplicate_id`, `orchestration.limit_exceeded`, `orchestration.policy_bundle_closure`, `orchestration.authority_widening`, `orchestration.proposal_binding`, `orchestration.packet_narrowing`, `orchestration.coverage_invalid`, `orchestration.integration_invalid`, `orchestration.matching_invalid`, `orchestration.availability_invalid`, `orchestration.materialization_invalid`, `orchestration.grant_replay`, `orchestration.result_batch_invalid`, `orchestration.input_invalid`, `orchestration.cancellation_conflict`, `orchestration.terminal_immutable`, `orchestration.source_missing`, and `orchestration.source_reference_invalid`. JSON pointers and fixed hints may accompany a code; rejected values, callback exceptions, and provider text may not.

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
| EvidenceCoverageRules | EvidenceRequirementRef tuple, owner-kind rank, node declaration index, selector, required before optional |
| EvidenceBindings | Subject rank, criterion/integration identity, owner invocation ordinal, EvidenceRequirementRef tuple, binding ordinal |
| Goal criteria and coverage rows | Criterion ID |
| Coverage selectors | Circuit node declaration index, node ID, selector mode, variant IDs |
| Lane selections | Region order, variant ID, variant ordinal |
| Concrete addresses/invocations | Expansion/invocation ordinal |
| AgentBlueprintIntents | Concrete-address ordinal, intent ordinal |
| AgentBlueprints | Invocation ordinal, blueprint ordinal |
| AgentBlueprint intent/blueprint context-use rows | Concrete WorkPacket context declaration ordinal, EvidenceRef SnapshotDigest, use-code vector, target-kind rank, target source declaration order/key |
| Packet bindings | Concrete-address comparator |
| Routes, branches, joins, integration bindings, port bindings | Allocated six-digit ID ordinal |
| ResponseInputBindings | Destination invocation ordinal, activation ordinal, input-port declaration index, binding ordinal |
| ActivationApprovalBindings | Invocation ordinal, activation ordinal, approval-binding ordinal |
| Route budgets | Concrete route ID |
| Agent profiles | Profile ID, version, content digest |
| Availability slots | Profile ID, profile version, reservation ID, slot ordinal, executor ID, executor version |
| GrantOffers | Retained semantic-candidate tuple, then offer ID |
| Matching edges/Assignments/tickets/materialization receipts/captures/results | Invocation ready order, candidate slot rank, then allocated ID |
| Consumed child attempts | V10 run ID, attempt ID |
| Rejected invocation candidates | Invocation ID, semanticCandidateKey |
| Ticket result-limit allocations | Assignment ID |
| Child RunEvents | V10 sequence, event ID, SnapshotDigest |
| EvidenceBindingDrafts | Child-event sequence, evidence ordinal, then EvidenceBinding IDs |
| EvidenceSatisfactions | EvidenceBinding ordinal, activation ordinal, Assignment ordinal, occurrence tuple, satisfaction ordinal |
| OutputDrafts | Output port, artifactType, artifactVersion, SourceReference tuple, payload digest |
| OutputReferences, HostObservations, MemoryProposals, MemoryCandidates | Allocated ID ordinal |
| PendingRequestSeeds/InputRequests/InputResponses/CancellationRequests | Allocated ID ordinal |
| Invocation/branch/join/criterion state rows | Plan order for that value family |
| SourceReference values | locatorKind rank, variant canonical fields, contentDigest |
| External digest pairs | SourceReference comparator, payload digest |
| Write-effect and repository rows | Wave ordinal, Assignment ordinal, ChildResultEnvelope ordinal, vcs-head observation digest |
| Projected InputResponses | Phase, projected request digest, responder role, decision, optional body digest, optional projected cancellation digest |
| Projected CancellationRequests | Projected state digest, actor role, reason, optional body digest |
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

interface StartIdentity {
  readonly orchestrationId: string;
  readonly sessionId: string;
  readonly planId: string;
  readonly runId: string;
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
    | "repository_required"
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
      readonly bodyRef: SourceReference;
      readonly bodyDigest: string;
    }
  | {
      readonly kind: "block";
      readonly terminalCode: "planner_blocked";
    }
  | {
      readonly kind: "block";
      readonly terminalCode: "planner_blocked";
      readonly bodyRef: SourceReference;
      readonly bodyDigest: string;
    };

interface ExecutionDispatchReceipt {
  readonly operationResult: OperationResult<ExecutionSummary>;
  readonly operationResultSnapshotDigest: string;
  readonly materializationReceiptDigest: string;
}

interface ExecutionDispatchRequest {
  readonly ticket: ExecutionTicket;
  readonly agentBlueprint: AgentBlueprint;
  readonly workPacket: WorkPacketArtifact;
  readonly adapterManifest: AdapterManifestArtifact;
  readonly executionGrant: ExecutionGrant;
  readonly signal: AbortSignal;
  readonly dispatchV10: (
    executor: WorkPacketExecutor,
    materializationReceipt: AgentMaterializationReceipt,
  ) => Promise<ExecutionDispatchReceipt>;
}

interface ExecutionCapture {
  readonly opaqueProcessLocalCapture: true;
}

type PlanningOperationResult =
  | {
      readonly kind: "planning_started";
      readonly session: Extract<PlanningSession, { status: "ready" }>;
      readonly events: readonly OrchestrationEvent[];
    }
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
      readonly kind: "planning_start_rejected";
      readonly identityKind: "identified";
      readonly identity: StartIdentity;
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "planning_start_rejected";
      readonly identityKind: "unidentified";
      readonly diagnostics: readonly Diagnostic[];
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
      readonly kind: "transition_started";
      readonly priorPlanningSessionDigest: string;
      readonly state: Extract<OrchestrationState, { status: "ready" }>;
      readonly events: readonly OrchestrationEvent[];
    }
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
      readonly repositoryStateWitness: RepositoryStateWitness;
      readonly acceptedWorkProjection: AcceptedWorkProjection;
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
      readonly kind: "transition_needs_availability";
      readonly runId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly capacityReadyInvocationIds: readonly string[];
      readonly readySetDigest: string;
    }
  | {
      readonly kind: "transition_deferred";
      readonly runId: string;
      readonly revision: number;
      readonly contentDigest: string;
      readonly reason: "cancellation_already_requested";
    }
  | {
      readonly kind: "transition_start_rejected";
      readonly identityKind: "identified";
      readonly identity: StartIdentity;
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "transition_start_rejected";
      readonly identityKind: "unidentified";
      readonly diagnostics: readonly Diagnostic[];
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

type PlannerCallbackInput =
  | {
      readonly inputKind: "initial";
      readonly session: Extract<PlanningSession, { status: "ready" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly taskAuthority: TaskAuthorityProjection;
    }
  | {
      readonly inputKind: "clarification_response";
      readonly session: Extract<PlanningSession, { status: "ready" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly taskAuthority: TaskAuthorityProjection;
      readonly resumeResponse: InputResponse;
    };

type AvailabilityCallback = (
  input: AvailabilityCallbackInput,
) => Promise<AvailabilityCallbackResult>;

interface AvailabilityCallbackInput {
  readonly state: Extract<OrchestrationState, { status: "ready" }>;
  readonly tailEvent: OrchestrationEvent;
  readonly plan: OrchestrationPlan;
  readonly capacityReadyInvocationIds: readonly string[];
  readonly readySetDigest: string;
}

interface AvailabilityCallbackResult {
  readonly snapshot: AvailabilitySnapshot;
  readonly grantOffers: readonly GrantOffer[];
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
      readonly operationResultSnapshotDigest: string;
      readonly outputDrafts: readonly OutputDraft[];
      readonly hostObservations: readonly HostObservation[];
      readonly evidenceBindingDrafts: readonly EvidenceBindingDraft[];
      readonly memoryProposalDrafts: readonly MemoryProposalDraft[];
    }
  | {
      readonly kind: "not_started";
      readonly reason: "execution_callback_returned_pre_dispatch";
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

type RepositoryStateCallback = (
  input: RepositoryStateCallbackInput,
) => Promise<RepositoryStateCallbackResult>;

interface RepositoryStateCallbackInput {
  readonly state: Extract<OrchestrationState, { status: "repository_required" }>;
  readonly tailEvent: OrchestrationEvent;
  readonly plan: OrchestrationPlan;
  readonly request: RepositoryStateRequest;
}

type RepositoryStateCallbackResult =
  | {
      readonly kind: "observed";
      readonly observation: HostObservation;
    }
  | {
      readonly kind: "callback_failed";
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
  readonly artifactType: string;
  readonly artifactVersion: string;
  readonly sourceRef: SourceReference;
  readonly byteSize: number;
  readonly payloadDigest: string;
  readonly schemaBinding:
    | Readonly<{ kind: "none" }>
    | Readonly<{
        kind: "bound";
        schemaRef: SourceReference;
        schemaDigest: string;
      }>;
  readonly validatingObservationDigest: string;
}

interface EvidenceBindingDraft {
  readonly childEventSequence: number;
  readonly childEventSnapshotDigest: string;
  readonly evidenceOrdinal: number;
  readonly evidenceBindingIds: readonly string[];
}

interface MemoryProposalDraft {
  readonly typeCode: MemoryTypeCode;
  readonly bodyRef: SourceReference;
  readonly bodyDigest: string;
  readonly sourceOutputReferenceDigests: readonly string[];
  readonly sourceEvidenceSatisfactionDigests: readonly string[];
  readonly sourcePriorEventDigests: readonly string[];
}

interface RunGoalCallbackSet {
  readonly planner: PlannerCallback;
  readonly availability: AvailabilityCallback;
  readonly execution: ExecutionCallback;
  readonly input: InputCallback;
  readonly repositoryState: RepositoryStateCallback;
}

type RunGoalContinuation =
  | {
      readonly kind: "planning";
      readonly continuationKind: "input_required";
      readonly session: Extract<PlanningSession, { status: "input_required" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
    }
  | {
      readonly kind: "run";
      readonly continuationKind: "input_required";
      readonly state: Extract<OrchestrationState, { status: "input_required" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plan: OrchestrationPlan;
      readonly workPackets: readonly WorkPacketArtifact[];
    }
  | {
      readonly kind: "run";
      readonly continuationKind: "waiting";
      readonly state: Extract<
        OrchestrationState,
        { status: "ready"; waitGuard: WaitGuard }
      >;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plan: OrchestrationPlan;
      readonly workPackets: readonly WorkPacketArtifact[];
    };

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
      readonly continuation: Extract<RunGoalContinuation, { kind: "planning" }>;
      readonly interaction:
        | Readonly<{ kind: "callback" }>
        | Readonly<{ kind: "input"; response: InputResponse }>;
      readonly callbacks: RunGoalCallbackSet;
    }
  | {
      readonly kind: "continue_run";
      readonly continuation: Extract<
        RunGoalContinuation,
        { kind: "run"; continuationKind: "input_required" }
      >;
      readonly interaction:
        | Readonly<{ kind: "callback" }>
        | Readonly<{ kind: "input"; response: InputResponse }>
        | Readonly<{ kind: "cancel"; request: CancellationRequest }>;
      readonly callbacks: Omit<RunGoalCallbackSet, "planner">;
    }
  | {
      readonly kind: "continue_run";
      readonly continuation: Extract<
        RunGoalContinuation,
        { kind: "run"; continuationKind: "waiting" }
      >;
      readonly interaction:
        | Readonly<{ kind: "availability" }>
        | Readonly<{ kind: "cancel"; request: CancellationRequest }>;
      readonly callbacks: Omit<RunGoalCallbackSet, "planner">;
    };

type RunGoalResult =
  | {
      readonly kind: "input_required";
      readonly phase: "planning";
      readonly continuation: Extract<RunGoalContinuation, { kind: "planning" }>;
      readonly request: InputRequest;
      readonly pendingRequestCount: 1;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "input_required";
      readonly phase: "run";
      readonly continuation: Extract<
        RunGoalContinuation,
        { kind: "run"; continuationKind: "input_required" }
      >;
      readonly request: InputRequest;
      readonly pendingRequestCount: number;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "waiting";
      readonly continuation: Extract<
        RunGoalContinuation,
        { kind: "run"; continuationKind: "waiting" }
      >;
      readonly waitGuard: WaitGuard;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "completed";
      readonly state: Extract<OrchestrationState, { status: "completed" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
      readonly memoryCandidates: readonly MemoryCandidate[];
      readonly repositoryStateWitness: RepositoryStateWitness;
      readonly acceptedWorkProjection: AcceptedWorkProjection;
      readonly mergeReadyEvidence: MergeReadyEvidence;
    }
  | {
      readonly kind: "failed";
      readonly state: Extract<OrchestrationState, { status: "failed" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "cancelled";
      readonly state: Extract<OrchestrationState, { status: "cancelled" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "uncertain";
      readonly state: Extract<OrchestrationState, { status: "uncertain" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "blocked";
      readonly phase: "planning";
      readonly session: Extract<PlanningSession, { status: "blocked" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "blocked";
      readonly phase: "run";
      readonly state: Extract<OrchestrationState, { status: "blocked" }>;
      readonly emittedEvents: readonly OrchestrationEvent[];
      readonly traceSummary: OrchestrationTraceSummary;
    }
  | {
      readonly kind: "start_rejected";
      readonly phase: "planning" | "run";
      readonly identityKind: "identified";
      readonly identity: StartIdentity;
      readonly diagnostics: readonly Diagnostic[];
    }
  | {
      readonly kind: "start_rejected";
      readonly phase: "planning" | "run";
      readonly identityKind: "unidentified";
      readonly diagnostics: readonly Diagnostic[];
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
      readonly missingSourceDigests: readonly string[];
    }
>;

declare function projectAcceptedWorkSemantics(
  input: InspectOrchestrationTraceInput,
): OperationResult<
  | {
      readonly sourceStatus: "complete";
      readonly projection: AcceptedWorkProjection;
    }
  | {
      readonly sourceStatus: "incomplete_sources";
      readonly missingSourceDigests: readonly string[];
    }
  | {
      readonly sourceStatus: "nonterminal";
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
type ApplyPlannerResultInput =
  | {
      readonly inputKind: "initial";
      readonly session: Extract<PlanningSession, { status: "ready" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plannerResult: PlannerCallbackResult;
    }
  | {
      readonly inputKind: "clarification_response";
      readonly session: Extract<PlanningSession, { status: "ready" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly resumeResponse: InputResponse;
      readonly plannerResult: PlannerCallbackResult;
    };

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

declare function compileAgentBlueprints(
  input: CompileAgentBlueprintsInput,
): CompileAgentBlueprintsResult;
interface CompileAgentBlueprintsInput {
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly taskAuthority: TaskAuthorityProjection;
  readonly laneSelections: PlanProposal["laneSelections"];
  readonly packetBindings: PlanProposal["packetBindings"];
  readonly agentBlueprintIntents: PlanProposal["agentBlueprintIntents"];
  readonly candidateWorkPackets: readonly WorkPacketArtifact[];
}
type CompileAgentBlueprintsResult =
  | {
      readonly kind: "compiled";
      readonly taskAuthority: TaskAuthorityProjection;
      readonly evidenceBindings: readonly EvidenceBinding[];
      readonly agentBlueprints: readonly AgentBlueprint[];
      readonly agentOptimizationRecord: AgentOptimizationRecord;
    }
  | Readonly<{
      kind: "blocked";
      terminalCode: "policy_nonconforming";
    }>
  | Readonly<{ kind: "rejected"; diagnostics: readonly Diagnostic[] }>;

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
type PrepareWaveInput =
  | {
      readonly availabilityKind: "request";
      readonly state: OrchestrationState;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plan: OrchestrationPlan;
      readonly workPackets: readonly WorkPacketArtifact[];
    }
  | {
      readonly availabilityKind: "apply";
      readonly state: Extract<OrchestrationState, { status: "ready" }>;
      readonly tailEvent: OrchestrationEvent;
      readonly goal: GoalContract;
      readonly policyBundle: PolicyBundle;
      readonly authority: RunAuthority;
      readonly profiles: readonly AgentProfile[];
      readonly plan: OrchestrationPlan;
      readonly workPackets: readonly WorkPacketArtifact[];
      readonly availability: AvailabilityCallbackResult;
    };

declare function dispatchExecutionTicket(
  input: DispatchExecutionTicketInput,
): Promise<ExecutionCapture>;
interface DispatchExecutionTicketInput {
  readonly ticket: ExecutionTicket;
  readonly agentBlueprint: AgentBlueprint;
  readonly workPacket: WorkPacketArtifact;
  readonly adapterManifest: AdapterManifestArtifact;
  readonly executionGrant: ExecutionGrant;
  readonly signal: AbortSignal;
  readonly callback: ExecutionCallback;
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
  readonly captures: readonly ExecutionCapture[];
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

declare function recordRepositoryState(
  input: RecordRepositoryStateInput,
): TransitionResult;
interface RecordRepositoryStateInput {
  readonly state: Extract<OrchestrationState, { status: "repository_required" }>;
  readonly tailEvent: OrchestrationEvent;
  readonly goal: GoalContract;
  readonly policyBundle: PolicyBundle;
  readonly authority: RunAuthority;
  readonly plan: OrchestrationPlan;
  readonly result: RepositoryStateCallbackResult;
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

`prepareWave` with `availabilityKind: request` performs the complete callback-free preflight and returns either an advanced transition or `transition_needs_availability`; `availabilityKind: apply` is accepted only on the latter's unchanged state and exact readySetDigest and requires the complete AvailabilityCallbackResult. Every conditional property group above is represented by a closed union rather than independently optional fields. PlanningOperationResult, TransitionResult, and RunGoalResult are exhaustive. Conditional Plan, tickets, RepositoryStateWitness, AcceptedWorkProjection, and MergeReadyEvidence are required exactly for their documented successors and forbidden otherwise.

`dispatchExecutionTicket` creates the only valid opaque capture, and `applyWaveResults` cannot accept a serialized substitute. `runGoal` accepts the three facade commands, invokes planner at most `L` times, dispatches each ticket at most once, offers each active request once, and invokes repositoryState exactly once only from repository_required. A valid response continues reduction; null, exception, or invalid unbound input leaves the canonical request unresolved. The facade returns on the first unresolved input, wait, terminal, or rejection boundary; it internally traverses repository_required when the callback succeeds. Callback functions and opaque captures never enter digestible values.
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
OrchestrationState OrchestrationEvent SourceReference GoalContract TaskAuthorityProjection PlanProposal AgentBlueprintIntent AgentBlueprint AgentOptimizationRecord ContextUseBinding
PendingRequestSeed InputRequest InputResponse CancellationRequest ResponseInputBinding
ActivationApprovalBinding AvailabilitySnapshot GrantOffer Assignment WaveClaim
ExecutionTicket AgentMaterializationReceipt ChildResultEnvelope EvidenceBinding EvidenceSatisfaction AcceptedWorkAccumulator OutputReference
HostObservation RepositoryStateRequest RepositoryStateWitness MemoryProposal MemoryCandidate
AcceptedWorkProjection MergeReadyEvidence MemoryTypeCode MemoryDestinationCode
PolicyBundle StartIdentity EvidenceRequirementKind EvidenceRequirementRef EvidenceCoverageRule
WaitGuard ResultLimits TicketResultLimitAllocation ClaimReserve ConsumedChildAttempt
RejectedInvocationCandidate ExecutionDispatchReceipt ExecutionDispatchRequest ExecutionCapture
DispatchExecutionTicketInput OutputDraft EvidenceBindingDraft MemoryProposalDraft
OrchestrationTraceSummary OrchestrationWaitReason OrchestrationCompletedCode
OrchestrationFailedCode OrchestrationBlockedCode OrchestrationCancelledCode
OrchestrationUncertainCode OrchestrationDiagnosticCode OrchestrationNotStartedReasonCode
OrchestrationUnknownEffectReasonCode OrchestrationDeferredReasonCode
PlannerCallback PlannerCallbackInput PlannerCallbackResult AvailabilityCallback
AvailabilityCallbackInput AvailabilityCallbackResult ExecutionCallback ExecutionReport
InputCallback InputCallbackInput RepositoryStateCallback RepositoryStateCallbackInput
RepositoryStateCallbackResult RunGoalCallbackSet RunGoalContinuation PlanningOperationResult
TransitionResult CompileAgentBlueprintsResult CompilePlanResult RunGoalCommand RunGoalResult StartPlanningInput
ApplyPlannerResultInput ResumePlanningInput CompileAgentBlueprintsInput CompilePlanInput StartRunInput PrepareWaveInput
ApplyWaveResultsInput ResumeRunInput CancelRunInput RecordRepositoryStateInput
InspectOrchestrationTraceInput validateOrchestrationValue snapshotDigest contentDigest
projectOrchestrationSemantics projectAcceptedWorkSemantics startPlanning applyPlannerResult
resumePlanning compileAgentBlueprints compilePlan startRun prepareWave dispatchExecutionTicket applyWaveResults
resumeRun cancelRun recordRepositoryState inspectOrchestrationTrace runGoal
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

Implementation may begin only after this contract, the specialist-agent compiler module, reference IDE kickoff, goal-synthesis/preflight evidence, ADR 0003, spec, plan, test plan, review packet, milestone, and memory agree on the same exact commit and independent product, API, lifecycle, and security reviewers all return `PASS`.
