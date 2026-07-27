# V14 Adaptive Orchestration Normative Contract

## Status

Revision 2 architecture candidate.

This document is normative for V14. `runtime-routing-contract.md` and Architecture Review R1 are
preserved as superseded design evidence.

## Product Boundary

V14 adds two pure kernel layers and one reference host adapter:

```txt
approved V11 compilation and package
  | owner-authored demand policy
  | owner-reviewed calibration and host inventory
  -> runtime assignment compilation
  | external assignment expectation
  -> adaptive run session
  | host launch authorization and attested observations
  | exact result capture
  -> V12 verified handoff settlement
  -> inspection and RunView
```

Core validates, derives, compares, binds, restores, and projects. It does not authenticate an
owner or host, establish freshness, discover a complete runtime catalog, benchmark model quality,
reserve capacity, launch an agent, enforce a permission, observe a process, stop work, persist a
file, integrate changes, merge, or update memory.

The Windows Codex Desktop adapter gathers current supply, translates approved launch commands into
native subagent calls, preserves exact result bytes, and reports bounded host attestations. Other
IDEs can implement the same contracts.

## API Versions

```ts
export const RUNTIME_ROUTING_API_VERSION =
  "swecircuit/runtime-routing/v1alpha1" as const;

export const ADAPTIVE_RUN_API_VERSION =
  "swecircuit/adaptive-run/v1alpha1" as const;
```

All roots are closed canonical JSON objects. Unknown properties, duplicate JSON keys at raw
boundaries, non-finite numbers, accessors, detectable proxies, lone surrogates, C0/C1 controls,
DEL, Unicode bidirectional formatting controls, high-confidence secrets, and values beyond the
published limits fail closed.

## Routing Inputs

### RuntimeDemandPolicy

The owner-authored policy is the only source of runtime quality assumptions. Core never infers
model capability from a provider name or free-form objective.

```ts
interface RuntimeDemandPolicy {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeDemandPolicy";
  readonly id: string;
  readonly revision: number;
  readonly qualityTiers: readonly RuntimeTierDefinition[];
  readonly reasoningTiers: readonly RuntimeTierDefinition[];
  readonly capabilityRules: readonly RuntimeCapabilityRule[];
  readonly evidenceRules: readonly RuntimeEvidenceRule[];
  readonly permissionRules: readonly RuntimePermissionRule[];
  readonly observability: RuntimeObservabilityPolicy;
  readonly search: RuntimeSearchPolicy;
}

interface RuntimeTierDefinition {
  readonly id: string;
  readonly rank: number;
}

interface RuntimeCapabilityRule {
  readonly capabilityId: string;
  readonly minimumQualityTier: string;
  readonly minimumReasoningTier: string;
  readonly requiredTools: readonly string[];
  readonly requiredSkills: readonly string[];
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
}

interface RuntimeEvidenceRule {
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly minimumQualityTier: string;
  readonly minimumReasoningTier: string;
}

interface RuntimePermissionRule {
  readonly kind: SpecialistPermissionKind;
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
}

interface RuntimeObservabilityPolicy {
  readonly model: RuntimeObservationRequirement;
  readonly effort: RuntimeObservationRequirement;
  readonly tools: RuntimeObservationRequirement;
  readonly skills: RuntimeObservationRequirement;
  readonly isolation: RuntimeObservationRequirement;
  readonly permissions: RuntimeObservationRequirement;
  readonly workspace: RuntimeObservationRequirement;
  readonly context: RuntimeObservationRequirement;
}

type RuntimeObservationRequirement = "observed" | "host_attestation_allowed";

interface RuntimeSearchPolicy {
  readonly exactVectorLimit: number;
  readonly boundedBeamWidth: number;
}
```

Tier ranks are unique integers from 0 through 15. Every blueprint capability must have exactly one
capability rule. Every evidence `(kind, duty)` pair and every permission kind used by a blueprint
must have exactly one rule. Missing or duplicate coverage rejects the request; there is no default
or prose inference.

### RuntimeCalibrationCatalog

Calibration is immutable owner-reviewed supply evidence. It is still an external claim; core
checks identity and internal consistency, not empirical truth.

```ts
interface RuntimeCalibrationCatalog {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeCalibrationCatalog";
  readonly id: string;
  readonly revision: number;
  readonly assessedBy: string;
  readonly adapterId: string;
  readonly adapterRevision: string;
  readonly runtimeRows: readonly RuntimeCalibrationRow[];
}

interface RuntimeCalibrationRow {
  readonly id: string;
  readonly profileId: string;
  readonly effortId: string;
  readonly effortRank: number;
  readonly runtimeFamily: string;
  readonly independenceDomain: string;
  readonly reasoningTier: string;
  readonly capabilities: readonly RuntimeCalibratedCapability[];
  readonly contextLimitBytes: number;
  readonly tools: readonly string[];
  readonly skills: readonly string[];
  readonly isolationFeatures: readonly string[];
  readonly permissionFeatures: readonly string[];
  readonly observationModes: RuntimeObservationModes;
  readonly costRank: number;
  readonly latencyRank: number;
  readonly evidence: readonly RuntimeCalibrationEvidence[];
}

interface RuntimeCalibratedCapability {
  readonly capabilityId: string;
  readonly qualityTier: string;
}

interface RuntimeObservationModes {
  readonly model: RuntimeObservationMode;
  readonly effort: RuntimeObservationMode;
  readonly tools: RuntimeObservationMode;
  readonly skills: RuntimeObservationMode;
  readonly isolation: RuntimeObservationMode;
  readonly permissions: RuntimeObservationMode;
  readonly workspace: RuntimeObservationMode;
  readonly context: RuntimeObservationMode;
}

type RuntimeObservationMode = "observed" | "host_attested_unobservable" | "unavailable";

interface RuntimeCalibrationEvidence {
  readonly id: string;
  readonly kind: "benchmark" | "host_contract" | "owner_assessment";
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
}
```

`profileId + effortId` and every row ID are unique. All logical sets are duplicate-free and
canonically sorted. Cost, latency, and effort ranks are integers from 0 through 1,000,000; lower
is preferred. Calibration evidence locators are references, not fetched by core.

### HostCapabilityInventory

Inventory is one bounded host snapshot.

```ts
interface HostCapabilityInventory {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "HostCapabilityInventory";
  readonly id: string;
  readonly revision: number;
  readonly hostId: string;
  readonly adapterId: string;
  readonly adapterRevision: string;
  readonly catalogRevision: string;
  readonly completeness: "complete_host_catalog" | "declared_subset";
  readonly maxConcurrentAgents: number;
  readonly rows: readonly HostInventoryRow[];
}

interface HostInventoryRow {
  readonly calibrationRowId: string;
  readonly availability: "available" | "unavailable";
  readonly availabilityReason: string;
}
```

Every inventory row resolves exactly one calibration row. Adapter identity and revision must match
the calibration catalog. "Least cost" always means least cost within this exact inventory. Core
never upgrades a subset claim into catalog completeness.

### CompileRuntimeAssignmentsRequest

```ts
interface CompileRuntimeAssignmentsRequest {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "CompileRuntimeAssignmentsRequest";
  readonly compilation: AgentBlueprintCompilation;
  readonly packageExpectation: SpecialistPackageExpectation;
  readonly policy: RuntimeDemandPolicy;
  readonly calibration: RuntimeCalibrationCatalog;
  readonly inventory: HostCapabilityInventory;
}
```

The complete V11 compilation is required because demand, producer/checker relationships, the
serial baseline, the selected partition, and launch waves are derivation inputs. The rendered V11
package is not needed for assignment compilation; its externally trusted digest pair is.

## Demand Derivation

Core emits one `RuntimeDemand` per selected blueprint.

```ts
interface RuntimeDemand {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly requiredCapabilities: readonly RuntimeDemandCapability[];
  readonly minimumReasoningTier: string;
  readonly contextBytes: number;
  readonly requiredTools: readonly string[];
  readonly requiredSkills: readonly string[];
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
  readonly observability: RuntimeObservabilityPolicy;
  readonly producerAgentIds: readonly string[];
  readonly checkerAgentIds: readonly string[];
  readonly contentDigest: string;
}

interface RuntimeDemandCapability {
  readonly capabilityId: string;
  readonly minimumQualityTier: string;
}
```

Derivation is exact:

1. Required capability IDs are the blueprint's canonical capability set.
2. Each minimum quality tier is the maximum policy rank required by its capability rule and every
   evidence duty owned by the blueprint.
3. Minimum reasoning tier is the maximum policy rank across all owned capabilities and evidence
   duties.
4. Context bytes are the sum of the blueprint's unique context-source byte bindings.
5. Tools, skills, isolation features, and permission features are canonical unions of all
   applicable capability, evidence, and permission rules.
6. Producer/checker edges are derived per acceptance criterion. A checker is any blueprint owning
   an evidence duty with `independentFromProducer: true`; its producers are all distinct blueprints
   owning `duty: "produce"` evidence for the same criterion.
7. An independent checker with no producer, or a producer/checker collapsed into one blueprint,
   rejects the request as structurally inconsistent.

No objective text, module action text, stop-condition prose, profile identity, or run history is
parsed to derive demand.

## Row Evaluation

Core enumerates every inventory/calibration row for every blueprint. An unavailable row remains in
the evaluation with an `unavailable` rejection.

```ts
type RuntimeRowRejectionCode =
  | "unavailable"
  | "quality_tier"
  | "reasoning_tier"
  | "context_capacity"
  | "required_tool"
  | "required_skill"
  | "isolation_feature"
  | "permission_feature"
  | "observation_mode";

interface RuntimeRowEvaluation {
  readonly agentId: string;
  readonly calibrationRowId: string;
  readonly profileId: string;
  readonly effortId: string;
  readonly eligible: boolean;
  readonly rejectionCodes: readonly RuntimeRowRejectionCode[];
  readonly unmetRequirementIds: readonly string[];
  readonly comparator: RuntimeRowComparator | null;
  readonly contentDigest: string;
}

interface RuntimeRowComparator {
  readonly costRank: number;
  readonly latencyRank: number;
  readonly qualityExcess: number;
  readonly reasoningExcess: number;
  readonly contextExcessBytes: number;
  readonly toolExcess: number;
  readonly skillExcess: number;
  readonly effortRank: number;
  readonly canonicalIdentity: string;
}
```

All applicable row rejection reasons are accumulated, ordered by the closed code order above, then
by canonical unmet requirement identity. Invalid policy, calibration, or inventory structure
fails before row evaluation and is not represented as an empty feasible set.

Excess formulas are exact:

- Quality excess is the sum of supplied tier rank minus required tier rank for every required
  capability.
- Reasoning excess is supplied reasoning rank minus required rank.
- Context excess is `contextLimitBytes - contextBytes`.
- Tool and skill excess count supplied IDs not required by demand.
- Canonical identity is `profileId + U+001F + effortId`; input IDs reject controls, so the
  separator is used only inside comparison and never serialized.

## Assignment Vector Search

Independence is a full-roster hard gate. Producer and checker rows must have different exact
`independenceDomain` values. Host concurrency is not a routing feasibility gate: it constrains
controller launch eligibility and may serialize an otherwise valid reviewed team.

Core orders blueprints by ascending eligible-row count, then agent ID. It orders rows by the row
comparator. The vector comparator is:

1. Lower total cost rank.
2. Lower maximum latency rank.
3. Lower total latency rank.
4. Lower total quality excess.
5. Lower total reasoning excess.
6. Lower total context excess bytes.
7. Lower total tool excess.
8. Lower total skill excess.
9. Lower total effort rank.
10. Canonical ordered `agentId=profileId/effortId` vector identity.

All totals use checked safe integers. Quality is never traded for cost because insufficient rows
are excluded before vector search.

If the product of eligible row counts is at most `exactVectorLimit`, core evaluates every vector
and reports `exhaustive_assignment_vector_search`. Otherwise it performs deterministic beam
search:

1. Expand assignments in canonical blueprint order.
2. Reject partial vectors that already violate an independence edge.
3. Sort partial vectors by the same comparator over assigned rows, followed by canonical partial
   identity.
4. Retain the first `boundedBeamWidth` partial vectors after each expansion.

Bounded search reports `bounded_evaluated_set_no_global_optimum`. It never claims the global
least-cost vector. No feasible vector returns a typed `no_feasible_assignment` result with every
row evaluation and set-level independence rejection.

## RuntimeAssignmentCompilation

```ts
interface RuntimeAssignmentCompilation {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeAssignmentCompilation";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly goalDigest: string;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly policy: RuntimeDemandPolicy;
  readonly policyDigest: string;
  readonly calibration: RuntimeCalibrationCatalog;
  readonly calibrationDigest: string;
  readonly inventory: HostCapabilityInventory;
  readonly inventoryDigest: string;
  readonly demands: readonly RuntimeDemand[];
  readonly evaluations: readonly RuntimeRowEvaluation[];
  readonly search: RuntimeAssignmentSearch;
  readonly selected: RuntimeAssignmentVector;
  readonly predecessorAssignmentDigest: string | null;
  readonly override: RuntimeAssignmentOverride | null;
  readonly contentDigest: string;
}

interface RuntimeAssignmentSearch {
  readonly mode: "exact" | "bounded";
  readonly claim:
    | "exhaustive_assignment_vector_search"
    | "bounded_evaluated_set_no_global_optimum";
  readonly potentialVectors: number | "exceeds_safe_integer";
  readonly evaluatedVectors: number;
  readonly feasibleVectors: number;
  readonly contentDigest: string;
}

interface RuntimeAssignmentVector {
  readonly rows: readonly RuntimeAssignment[];
  readonly comparator: RuntimeVectorComparator;
  readonly selectionReason:
    | "lowest_exact_vector"
    | "lowest_bounded_evaluated_vector"
    | "owner_override";
  readonly contentDigest: string;
}

interface RuntimeAssignment {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly calibrationRowId: string;
  readonly profileId: string;
  readonly effortId: string;
  readonly independenceDomain: string;
  readonly requiredTools: readonly string[];
  readonly requiredSkills: readonly string[];
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
  readonly observability: RuntimeObservabilityPolicy;
}
```

The output embeds the canonical policy, calibration, inventory, demands, and evaluations required
for exact restore and explanation.

## Override

An override asks for exactly one replacement row in the complete selected vector.

```ts
interface RuntimeAssignmentOverride {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeAssignmentOverride";
  readonly predecessorAssignmentDigest: string;
  readonly agentId: string;
  readonly replacementCalibrationRowId: string;
  readonly requestedBy: string;
  readonly rationale: string;
}
```

`applyRuntimeAssignmentOverride` snapshots the predecessor compilation, replaces one row, and
reruns every row and full-vector gate. It returns a new complete compilation with
`selectionReason: "owner_override"` and a new digest. It does not authenticate `requestedBy`.
Overrides cannot change policy, calibration, inventory, package, blueprint, or more than one row.
Those changes require normal recompilation.

## Routing Trust

`RuntimeAssignmentExpectation` is external trusted input:

```ts
interface RuntimeAssignmentExpectation {
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly policyDigest: string;
  readonly calibrationDigest: string;
  readonly inventoryDigest: string;
  readonly assignmentDigest: string;
}
```

Core requires it when verifying an assignment or creating a run. It proves no human approval by
itself; the host authenticates the owner and supplies an expectation only after approval.

## Adaptive Run Inputs

### AdaptiveRunExpectation

```ts
interface AdaptiveRunExpectation extends RuntimeAssignmentExpectation {
  readonly runId: string;
  readonly runRevision: number;
  readonly predecessorRun: AdaptiveRunPredecessor | null;
  readonly workspaceBaselineDigest: string;
  readonly authorizedHostId: string;
  readonly authorizedAdapterId: string;
  readonly authorizedAdapterRevision: string;
  readonly authorizationIssuerId: string;
  readonly maxHostEvents: number;
  readonly lineageDepth: number;
  readonly maxLineageDepth: number;
}

interface AdaptiveRunPredecessor {
  readonly runId: string;
  readonly sessionDigest: string;
  readonly terminalOutcome: Exclude<WorkflowOutcome, "pass">;
  readonly evidenceDigest: string;
}
```

The expectation is external and required for create, restore, inspect, event recording, result
capture, and RunView rendering. Core checks equality and binding but does not authenticate any ID,
workspace, approval, attestor, freshness, or one-use property outside the supplied session.

### Host Protocol

Every host event is supplied as exact raw UTF-8 JSON bytes and retained as canonical base64 plus
raw byte count and SHA-256 digest.

```ts
type AdaptiveHostEvent =
  | HostLaunchAuthorization
  | HostMaterializationClaim
  | HostLifecycleObservation
  | HostSteeringAuthorization
  | HostAdapterFailure
  | HostResultCapture;

interface AdaptiveHostEventBase {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly runId: string;
  readonly runRevision: number;
  readonly sequence: number;
  readonly priorEventDigest: string | null;
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly assignmentDigest: string;
  readonly hostId: string;
  readonly adapterId: string;
  readonly adapterRevision: string;
  readonly attestedBy: string;
}
```

Sequence starts at one and increases by one. `priorEventDigest` is null only for sequence one and
otherwise equals the preceding exact raw event digest. Events for different agents share one
serialized run sequence. The host must serialize updates before effects; core does not prevent two
external writers from racing.

#### HostLaunchAuthorization

```ts
interface HostLaunchAuthorization extends AdaptiveHostEventBase {
  readonly kind: "HostLaunchAuthorization";
  readonly attemptId: string;
  readonly authorizationId: string;
  readonly workspaceBaselineDigest: string;
  readonly command: HostLaunchCommand;
}

interface HostLaunchCommand {
  readonly agentContractPath: string;
  readonly agentContractDigest: string;
  readonly agentContractBytes: number;
  readonly contextSources: readonly HostContextDelivery[];
  readonly profileId: string;
  readonly effortId: string;
  readonly tools: readonly string[];
  readonly skills: readonly string[];
  readonly isolationFeatures: readonly string[];
  readonly permissions: readonly SpecialistPermission[];
  readonly observability: RuntimeObservabilityPolicy;
  readonly contentDigest: string;
}

interface HostContextDelivery {
  readonly sourceId: string;
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
  readonly delivery: "host_context" | "authorized_filesystem_read";
}
```

The command uses exactly the required tools, skills, isolation features, and blueprint permissions;
it never grants the complete calibrated supply set. Context delivered by the host does not require
specialist `process.spawn` authority. `authorized_filesystem_read` is permitted only when the
blueprint already declares the corresponding filesystem read scope.

An attempt and authorization ID may appear once in a session. A second authorization for the same
agent is rejected because V12 accepts one handoff per blueprint.

#### HostMaterializationClaim

```ts
interface HostMaterializationClaim extends AdaptiveHostEventBase {
  readonly kind: "HostMaterializationClaim";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly nativeHandle: string;
  readonly fields: readonly HostMaterializationField[];
}

interface HostMaterializationField {
  readonly field:
    | "model"
    | "effort"
    | "tools"
    | "skills"
    | "isolation"
    | "permissions"
    | "workspace"
    | "context";
  readonly status: RuntimeObservationMode;
  readonly expectedDigest: string;
  readonly observedDigest: string | null;
}
```

Every field appears exactly once in the closed order above. `observed` requires matching exact
digests. `host_attested_unobservable` is accepted only when policy allows host attestation for that
field. `unavailable`, an extra or missing field, widened authority, changed context, wrong
workspace, or adapter drift routes `block` before result settlement.

#### HostLifecycleObservation

```ts
interface HostLifecycleObservation extends AdaptiveHostEventBase {
  readonly kind: "HostLifecycleObservation";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly materializationEventDigest: string;
  readonly nativeHandle: string;
  readonly status:
    | "running"
    | "waiting_permission"
    | "completed"
    | "failed"
    | "stopped"
    | "liveness_failed"
    | "unknown";
  readonly evidence: readonly HostEvidenceBinding[];
}
```

Core never creates a timeout. `liveness_failed` and `unknown` are host attestations. Lifecycle
observations cannot move backward from a terminal host status. Duplicate exact raw events are
idempotent only when sequence and prior digest are identical; a different event at an occupied
sequence fails closed.

#### HostSteeringAuthorization

```ts
interface HostSteeringAuthorization extends AdaptiveHostEventBase {
  readonly kind: "HostSteeringAuthorization";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly requestedBy: string;
  readonly message: string;
  readonly rationale: string;
}
```

The event makes user steering visible and binds its exact bytes to later result capture. Core
cannot prove that a message preserves semantics. The integration owner must create a successor
GoalContract and package when steering changes objective, scope, authority, evidence duties, or
acceptance criteria. A host that applies unrecorded steering produces no conformant result capture.

#### HostAdapterFailure

```ts
interface HostAdapterFailure extends AdaptiveHostEventBase {
  readonly kind: "HostAdapterFailure";
  readonly attemptId: string | null;
  readonly phase:
    | "inventory"
    | "authorization"
    | "materialization"
    | "lifecycle"
    | "result_capture";
  readonly certainty: "no_effect" | "effect_possible" | "effect_observed";
  readonly code: string;
  readonly evidence: readonly HostEvidenceBinding[];
}
```

`no_effect` before materialization routes `block`. `effect_possible`, liveness failure,
contradictory observations, or failure after a possible launch routes `diagnose`.

#### HostResultCapture

```ts
interface HostResultCapture extends AdaptiveHostEventBase {
  readonly kind: "HostResultCapture";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly materializationEventDigest: string;
  readonly terminalLifecycleEventDigest: string;
  readonly steeringEventDigests: readonly string[];
  readonly rawHandoffEncoding: "base64";
  readonly rawHandoffBytes: number;
  readonly rawHandoffDigest: string;
  readonly rawHandoffBase64: string;
}
```

The capture must reference the exact launch, materialization, terminal `completed` observation, and
every steering event for the attempt. Core verifies raw bytes, digest, V11 handoff semantics,
agent, blueprint, compilation, and package, then records the same raw handoff through V12. A
historical handoff paired with a different run, attempt, authorization, materialization,
assignment, or capture cannot satisfy these session bindings. This remains an authorized host
attestation that these bytes came from the launch; it is not independent execution proof.

### HostEvidenceBinding

```ts
interface HostEvidenceBinding {
  readonly id: string;
  readonly kind: "log" | "status" | "configuration" | "error";
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
}
```

Evidence bytes remain externally preserved. If a later operation requires their content rather
than identity, they must be supplied as a new bounded source input; core never fetches locators.

## AdaptiveRunSession

```ts
interface AdaptiveRunSession {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly kind: "AdaptiveRunSession";
  readonly expectation: AdaptiveRunExpectation;
  readonly assignment: RuntimeAssignmentCompilation;
  readonly specialistRun: SpecialistRunSession;
  readonly hostEvents: readonly AdaptiveRunAcceptedEvent[];
  readonly contentDigest: string;
}

interface AdaptiveRunAcceptedEvent {
  readonly sequence: number;
  readonly kind: AdaptiveHostEvent["kind"];
  readonly agentId: string;
  readonly attemptId: string | null;
  readonly rawEncoding: "base64";
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly rawBase64: string;
}
```

The complete assignment embeds policy, calibration, inventory, demand, evaluations, and selected
rows. The nested V12 session embeds the exact V11 package and accepted handoffs. Accepted event rows
retain every exact host event. This is the self-contained source boundary for one run.

Restore accepts raw UTF-8 session bytes plus the external expectation. It rejects duplicate keys,
malformed UTF-8, unknown fields, unsafe text, noncanonical base64, missing embedded sources,
reordered or broken event chains, stale self-digests, package/assignment substitution, and limit
excess. It re-verifies the assignment, V12 session, every raw event, every result capture, and the
complete digest chain.

## Adaptive Inspection

```ts
type AdaptiveTruthClass =
  | "kernel_derived"
  | "binding_verified"
  | "host_attested"
  | "specialist_verified"
  | "unresolved";

interface AdaptiveRunInspection {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly kind: "AdaptiveRunInspection";
  readonly runId: string;
  readonly runRevision: number;
  readonly stage:
    | "awaiting_authorization"
    | "host_active"
    | "needs_attention"
    | "integration_ready";
  readonly executionMode: AdaptiveExecutionMode;
  readonly agents: readonly AdaptiveAgentInspection[];
  readonly routes: readonly AdaptiveRoute[];
  readonly nextActions: readonly AdaptiveNextAction[];
  readonly integrationReady: boolean;
  readonly contentDigest: string;
}

interface AdaptiveExecutionMode {
  readonly selectedCandidateId: string;
  readonly selectedAgentCount: number;
  readonly serialBaselineMetrics: SpecialistCandidateMetrics;
  readonly selectedMetrics: SpecialistCandidateMetrics;
  readonly selectionReason: SpecialistSelectionReason;
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly truth: "kernel_derived";
}

interface AdaptiveNextAction {
  readonly id: string;
  readonly actor: "external_host" | "integration_owner" | "user";
  readonly kind:
    | "review_assignment"
    | "authorize_launch"
    | "launch_native_agent"
    | "observe_native_agent"
    | "respond_to_permission"
    | "stop_native_agent"
    | "record_steering"
    | "capture_result"
    | "create_successor_run"
    | "integrate_and_verify";
  readonly availability: "enabled" | "blocked" | "unavailable";
  readonly reasonCode: string;
  readonly sourceDigests: readonly string[];
}
```

Launch eligibility is the intersection of V12 dependency-eligible contracts, agents without an
authorization or terminal route, and the inventory's `maxConcurrentAgents` minus host-attested
active attempts. When active state is unknown, no new launch slot is inferred.

All host statuses are labeled `host_attested`; V12 accepted evidence is
`specialist_verified`; schema/digest/expectation checks are `binding_verified`; assignment,
dependency, and comparator projections are `kernel_derived`; absent or contradictory host facts
are `unresolved`.

## Deterministic Route Matrix

Conditions are evaluated in this order:

1. Expectation, source, digest, adapter, assignment, inventory, workspace, or authorization
   mismatch before a claimed effect: `block`.
2. Required materialization field unavailable, widened, missing, or mismatched: `block`.
3. Broken event chain, stale sequence, contradictory lifecycle, possible untracked effect,
   liveness failure, unknown status, or invalid result capture: `diagnose`.
4. A verified V12 non-pass handoff: preserve that exact workflow outcome.
5. A host-attested user stop: `block`.
6. All exact pass handoffs accepted: `pass` and `integration_ready`.

The first condition in this order wins. A routed run accepts no new launch authorization or result
settlement, matching V12 terminal behavior.

## Successor Runs

V14 does not retry or escalate inside a terminal V12 session.

A correction, diagnosis, changed requirement, or stronger runtime creates a new reviewed
GoalContract/package/assignment and a new adaptive run. Its external expectation must bind the
predecessor run ID, terminal session digest, exact route outcome, and evidence digest. Lineage depth
must increase by one and remain within `maxLineageDepth`.

The new goal may use predecessor pass outputs and failed evidence as explicit context sources.
Core does not silently import old handoffs, join sessions, or claim cross-run integration
readiness. The integration owner links successor evidence during final review. This preserves the
failed attempt and keeps every V12 session immutable.

## RunView

`RunView` is a closed deterministic JSON projection of `AdaptiveRunInspection`; Markdown is a pure
renderer over that JSON.

The default view shows:

- goal, branch/version, stage, workflow outcome, and next enabled action;
- selected serial or parallel mode, serial baseline, selected team metrics, and why fan-out won;
- each module/work unit, specialist, dependencies, profile, effort, status, and truth class;
- selected assignment, feasible alternatives, rejected rows, stable reasons, and any override;
- read/write scopes, context-delivery bindings, and host-observed file evidence when present;
- evidence duties, accepted artifacts, routes, blockers, steering, and successor links.

The concise Markdown view may collapse alternatives but must state their count and expose their
stable IDs and reason codes in an immediately following detail section. It must never render
host-attested state as kernel proof.

Stable user statuses are:

```txt
Planning | Ready | Running (host-reported) | Needs attention |
Ready to integrate | Complete
```

RunView does not parse arbitrary handoff prose to infer files or status. File activity is shown
only from a closed host evidence binding or a future structured handoff field.

## User Quick Path

The Windows Codex Desktop reference flow is:

1. Submit one goal.
2. Review clarification, architecture, selected team, and runtime assignments.
3. Approve the exact assignment expectation.
4. Let the adapter authorize and launch dependency-eligible native subagents.
5. Observe RunView and native status; record any steering or stop.
6. Capture and verify exact handoffs automatically.
7. Route failure to a trace-bound successor run or integrate all pass outputs.
8. Independently verify, review, update memory, and request merge approval.

The small-task happy path permits at most two user decisions after the initial goal: assignment
approval and integration/merge approval. It requires zero manual copying of paths, digests,
handoffs, or status. Dogfood must record automated host operations and demonstrate at least a 60%
reduction from V13's more than 12 manual lifecycle operations. Elapsed time is reported but is not
a cross-environment release gate.

## Limits

```ts
export const RUNTIME_ROUTING_LIMITS = {
  maxBlueprints: 16,
  maxPolicyRules: 256,
  maxCalibrationRows: 192,
  maxInventoryRows: 192,
  maxLogicalSetItems: 256,
  maxEvidenceBindings: 512,
  maxExactVectors: 200_000,
  maxBeamWidth: 512,
  maxIdentifierBytes: 128,
  maxTextBytes: 16_384,
  maxContextBytes: 134_217_728,
  maxCanonicalBytes: 16_777_216,
} as const;

export const ADAPTIVE_RUN_LIMITS = {
  maxHostEvents: 512,
  maxEventBytes: 1_048_576,
  maxHostEvidenceBindings: 512,
  maxSteeringBytes: 16_384,
  maxLineageDepth: 8,
  maxSessionBytes: 268_435_456,
  maxInspectionBytes: 16_777_216,
  maxRunViewBytes: 16_777_216,
} as const;
```

Caller-provided expectation limits may narrow but never exceed published limits.

## Diagnostics

Routing diagnostics:

```txt
SC4501 runtime schema invalid
SC4502 runtime resource limit exceeded
SC4503 demand policy coverage invalid
SC4504 calibration or inventory binding invalid
SC4505 specialist or evidence relationship invalid
SC4506 no feasible assignment vector
SC4507 bounded search found no feasible evaluated vector
SC4508 override invalid or infeasible
SC4509 runtime expectation mismatch
SC4510 runtime digest or canonical identity mismatch
```

Adaptive diagnostics:

```txt
SC4601 adaptive schema invalid
SC4602 adaptive resource limit exceeded
SC4603 adaptive expectation mismatch
SC4604 host event transition invalid
SC4605 host event stale, duplicate, or chain-conflicting
SC4606 materialization unavailable, widened, or mismatched
SC4607 result capture or handoff binding invalid
SC4608 adaptive restore source or digest invalid
SC4609 run is terminal
SC4610 successor lineage invalid
```

Validation precedence is:

1. bounded snapshot, proxy/accessor, unsafe-text, and secret checks;
2. raw byte and collection limits;
3. closed schema;
4. canonical identity and trusted expectation;
5. cross-reference and source bindings;
6. demand, row, and vector semantics;
7. host event transition and route semantics.

Existing V11/V12 diagnostics are preserved when their operations reject embedded values.

## Digest Domains

Every `contentDigest` is SHA-256 over canonical JSON with its own digest replaced by
`sha256:` plus 64 zeroes.

```txt
swecircuit/runtime-routing/policy/v1alpha1
swecircuit/runtime-routing/calibration/v1alpha1
swecircuit/runtime-routing/inventory/v1alpha1
swecircuit/runtime-routing/demand/v1alpha1
swecircuit/runtime-routing/row-evaluation/v1alpha1
swecircuit/runtime-routing/search/v1alpha1
swecircuit/runtime-routing/vector/v1alpha1
swecircuit/runtime-routing/compilation/v1alpha1
swecircuit/adaptive-run/launch-command/v1alpha1
swecircuit/adaptive-run/session/v1alpha1
swecircuit/adaptive-run/inspection/v1alpha1
swecircuit/adaptive-run/run-view/v1alpha1
```

Exact raw host-event identity is always its raw SHA-256 digest, not a reconstructed semantic
digest.

## Public Operations

```ts
export function compileRuntimeAssignments(
  request: unknown,
): OperationResult<RuntimeAssignmentCompilation>;

export function applyRuntimeAssignmentOverride(
  compilation: unknown,
  override: unknown,
): OperationResult<RuntimeAssignmentCompilation>;

export function verifyRuntimeAssignmentCompilation(
  compilation: unknown,
  expectation: unknown,
): OperationResult<RuntimeAssignmentCompilation>;

export function createAdaptiveRunSession(
  assignment: unknown,
  specialistPackage: unknown,
  expectation: unknown,
): OperationResult<AdaptiveRunSession>;

export function restoreAdaptiveRunSession(
  rawSession: Uint8Array,
  expectation: unknown,
): OperationResult<AdaptiveRunSession>;

export function inspectAdaptiveRunSession(
  session: unknown,
  expectation: unknown,
): OperationResult<AdaptiveRunInspection>;

export function recordAdaptiveHostEvent(
  session: unknown,
  expectation: unknown,
  rawEvent: Uint8Array,
): OperationResult<AdaptiveRunSession>;

export function renderAdaptiveRunView(
  inspection: unknown,
): OperationResult<RunView>;

export function renderAdaptiveRunViewMarkdown(
  runView: unknown,
): OperationResult<string>;
```

`recordAdaptiveHostEvent` recognizes all six event kinds. `HostResultCapture` is the only event
that may change the nested V12 session.

## Schemas And Exports

The package adds:

```txt
schemas/v1alpha1/runtime-routing.schema.json
schemas/v1alpha1/adaptive-run.schema.json
```

Both are package exports. `src/index.ts` exports the two API constants, two limit objects, every
public root and nested type named in this contract, every public operation, and the two schema
source constants. Packed-consumer verification imports, calls, and typechecks every operation and
root.

## Codex Desktop Adapter

The reference adapter is a project-local instruction and translation layer, not a core provider
dependency. It must:

- inventory only model/effort combinations the current host actually exposes;
- record its calibration and inventory revisions;
- map approved profile and effort to the native spawn call;
- deliver exact contract and context through host context or declared filesystem reads;
- report whether tools, skills, isolation, permissions, workspace, and context were observed,
  host-attested but unobservable, or unavailable;
- preserve native agent ID, lifecycle status, steering, stopping, and exact final result bytes;
- never label host status as kernel proof;
- fail closed when a required binding is unavailable;
- write no hidden model fallback.

The adapter may use native Codex subagent visibility. V14 does not claim a custom pinned graphical
panel.

## Release Gate

Implementation starts only after independent routing/API, lifecycle/portability,
security/evidence, and product/RunView reviews accept this exact Revision 2 candidate.

Release then requires:

- deterministic and adversarial coverage for every rule, route, limit, and diagnostic;
- exact restore across fresh processes;
- V11/V12 regression and packed-consumer pass;
- Windows Node 22 and 24 CI;
- real Codex small, medium, and high-risk dogfoods;
- at least two differently scoped runtime assignments in a native run;
- zero manual evidence copying on the small happy path;
- successful successor-run recovery from one injected non-pass result;
- independent exact-candidate API, lifecycle, security, and usability review;
- owner approval before merge.
