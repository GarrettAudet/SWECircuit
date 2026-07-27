import type {
  RuntimeAssignment,
  RuntimeAssignmentCompilation,
  RuntimeAssignmentExpectation,
  RuntimeAssignmentOverride,
  RuntimeAssignmentVector,
  RuntimeObservabilityPolicy,
  RuntimeObservationMode,
  RuntimeRowEvaluation,
} from "./runtime-routing-types.js";
import type {
  SpecialistRunAcceptedEvidence,
  SpecialistRunSession,
} from "./specialist-run-types.js";
import type {
  SpecialistCandidateMetrics,
  SpecialistLaunchWave,
  SpecialistModuleBinding,
  SpecialistPermission,
  SpecialistSelectionReason,
} from "./specialist-types.js";
import type { WorkflowOutcome } from "./types.js";

export const ADAPTIVE_RUN_API_VERSION = "swecircuit/adaptive-run/v1alpha1" as const;

export const ADAPTIVE_RUN_LIMITS = Object.freeze({
  maxHostEvents: 512,
  maxEventBytes: 1_048_576,
  maxHostEvidenceBindings: 512,
  maxSteeringBytes: 16_384,
  maxLineageDepth: 8,
  maxSessionBytes: 268_435_456,
  maxInspectionBytes: 16_777_216,
  maxRunViewBytes: 16_777_216,
} as const);

export type AdaptiveRunApiVersion = typeof ADAPTIVE_RUN_API_VERSION;

export interface AdaptiveRunPredecessor {
  readonly runId: string;
  readonly sessionDigest: string;
  readonly terminalOutcome: Exclude<WorkflowOutcome, "pass">;
  readonly evidenceDigest: string;
}

export interface AdaptiveRunExpectation extends RuntimeAssignmentExpectation {
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

export interface HostContextDelivery {
  readonly sourceId: string;
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
  readonly delivery: "host_context" | "authorized_filesystem_read";
}

export interface HostLaunchCommand {
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

export interface AdaptiveHostEventBase {
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

export interface HostLaunchAuthorization extends AdaptiveHostEventBase {
  readonly kind: "HostLaunchAuthorization";
  readonly attemptId: string;
  readonly authorizationId: string;
  readonly workspaceBaselineDigest: string;
  readonly command: HostLaunchCommand;
}

export type HostMaterializationFieldName =
  | "model"
  | "effort"
  | "tools"
  | "skills"
  | "isolation"
  | "permissions"
  | "workspace"
  | "context";

export interface HostMaterializationField {
  readonly field: HostMaterializationFieldName;
  readonly status: RuntimeObservationMode;
  readonly expectedDigest: string;
  readonly observedDigest: string | null;
}

export interface HostMaterializationClaim extends AdaptiveHostEventBase {
  readonly kind: "HostMaterializationClaim";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly nativeHandle: string;
  readonly fields: readonly HostMaterializationField[];
}

export interface HostEvidenceBinding {
  readonly id: string;
  readonly kind: "log" | "status" | "configuration" | "error";
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
}

export type HostLifecycleStatus =
  | "running"
  | "waiting_permission"
  | "completed"
  | "failed"
  | "stopped"
  | "liveness_failed"
  | "unknown";

export interface HostLifecycleObservation extends AdaptiveHostEventBase {
  readonly kind: "HostLifecycleObservation";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly materializationEventDigest: string;
  readonly nativeHandle: string;
  readonly status: HostLifecycleStatus;
  readonly evidence: readonly HostEvidenceBinding[];
}

export interface HostSteeringAuthorization extends AdaptiveHostEventBase {
  readonly kind: "HostSteeringAuthorization";
  readonly attemptId: string;
  readonly authorizationEventDigest: string;
  readonly requestedBy: string;
  readonly message: string;
  readonly rationale: string;
}

export interface HostAdapterFailure extends AdaptiveHostEventBase {
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

export interface HostResultCapture extends AdaptiveHostEventBase {
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

export type AdaptiveHostEvent =
  | HostLaunchAuthorization
  | HostMaterializationClaim
  | HostLifecycleObservation
  | HostSteeringAuthorization
  | HostAdapterFailure
  | HostResultCapture;

export interface AdaptiveRunAcceptedEvent {
  readonly sequence: number;
  readonly kind: AdaptiveHostEvent["kind"];
  readonly agentId: string;
  readonly attemptId: string | null;
  readonly rawEncoding: "base64";
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly rawBase64: string;
}

export interface AdaptiveRunSession {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly kind: "AdaptiveRunSession";
  readonly expectation: AdaptiveRunExpectation;
  readonly assignment: RuntimeAssignmentCompilation;
  readonly specialistRun: SpecialistRunSession;
  readonly hostEvents: readonly AdaptiveRunAcceptedEvent[];
  readonly contentDigest: string;
}

export type AdaptiveTruthClass =
  | "kernel_derived"
  | "binding_verified"
  | "host_attested"
  | "specialist_verified"
  | "unresolved";

export type AdaptiveRouteReason =
  | "binding_mismatch"
  | "materialization_mismatch"
  | "event_chain_invalid"
  | "host_effect_uncertain"
  | "liveness_failure"
  | "unknown_host_status"
  | "result_capture_invalid"
  | "specialist_non_pass"
  | "host_user_stop"
  | "all_handoffs_pass";

export interface AdaptiveRoute {
  readonly agentId: string | null;
  readonly outcome: WorkflowOutcome;
  readonly reason: AdaptiveRouteReason;
  readonly sourceDigests: readonly string[];
  readonly truth: AdaptiveTruthClass;
}

export interface AdaptiveAssignmentInspection extends RuntimeAssignment {
  readonly alternatives: readonly RuntimeRowEvaluation[];
  readonly rejectedAlternatives: readonly RuntimeRowEvaluation[];
  readonly selectionReason: RuntimeAssignmentVector["selectionReason"];
  readonly override: RuntimeAssignmentOverride | null;
  readonly truth: "kernel_derived";
}

export interface AdaptiveNativeInspection {
  readonly status: HostLifecycleStatus | "unresolved" | "authorized" | "materialized" | "settled";
  readonly truth: AdaptiveTruthClass;
  readonly authorization: HostLaunchAuthorization | null;
  readonly materialization: HostMaterializationClaim | null;
}

export interface AdaptiveAgentInspection {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly modules: readonly SpecialistModuleBinding[];
  readonly workUnitIds: readonly string[];
  readonly dependencies: readonly string[];
  readonly assignment: AdaptiveAssignmentInspection;
  readonly profileId: string;
  readonly effortId: string;
  readonly status:
    | "awaiting_authorization"
    | "authorized"
    | "materialized"
    | "host_active"
    | "needs_attention"
    | "settled";
  readonly native: AdaptiveNativeInspection;
  readonly acceptedEvidence: SpecialistRunAcceptedEvidence | null;
  readonly truth: AdaptiveTruthClass;
  readonly route: AdaptiveRoute | null;
}

export interface AdaptiveExecutionMode {
  readonly selectedCandidateId: string;
  readonly selectedAgentCount: number;
  readonly serialBaselineMetrics: SpecialistCandidateMetrics;
  readonly selectedMetrics: SpecialistCandidateMetrics;
  readonly selectionReason: SpecialistSelectionReason;
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly truth: "kernel_derived";
}

export interface AdaptiveNextAction {
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

export interface AdaptiveRunInspection {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly kind: "AdaptiveRunInspection";
  readonly runId: string;
  readonly runRevision: number;
  readonly sessionDigest: string;
  readonly assignmentDigest: string;
  readonly compilationDigest: string;
  readonly packageDigest: string;
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

export type RunViewStatus =
  | "Planning"
  | "Ready"
  | "Running (host-reported)"
  | "Needs attention"
  | "Ready to integrate"
  | "Complete";

export interface RunView {
  readonly apiVersion: AdaptiveRunApiVersion;
  readonly kind: "RunView";
  readonly runId: string;
  readonly runRevision: number;
  readonly stage: AdaptiveRunInspection["stage"];
  readonly status: RunViewStatus;
  readonly sessionDigest: string;
  readonly assignmentDigest: string;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly executionMode: AdaptiveExecutionMode;
  readonly agents: readonly AdaptiveAgentInspection[];
  readonly routes: readonly AdaptiveRoute[];
  readonly blockers: readonly AdaptiveRoute[];
  readonly nextAction: AdaptiveNextAction | null;
  readonly nextActions: readonly AdaptiveNextAction[];
  readonly integrationReady: boolean;
  readonly sourceInspectionDigest: string;
  readonly contentDigest: string;
}
