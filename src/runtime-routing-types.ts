import { RUNTIME_ROUTING_API_VERSION, RUNTIME_ROUTING_LIMITS } from "./constants.js";
import type {
  AgentBlueprintCompilation,
  SpecialistEvidenceDuty,
  SpecialistPackageExpectation,
  SpecialistPermissionKind,
} from "./specialist-types.js";
import type { EvidenceKind } from "./types.js";

export { RUNTIME_ROUTING_API_VERSION, RUNTIME_ROUTING_LIMITS };

export type RuntimeRoutingApiVersion = typeof RUNTIME_ROUTING_API_VERSION;
export type RuntimeObservationRequirement = "observed" | "host_attestation_allowed";
export type RuntimeObservationMode = "observed" | "host_attested_unobservable" | "unavailable";

export interface RuntimeTierDefinition {
  readonly id: string;
  readonly rank: number;
}

export interface RuntimeCapabilityRule {
  readonly capabilityId: string;
  readonly minimumQualityTier: string;
  readonly minimumReasoningTier: string;
  readonly requiredTools: readonly string[];
  readonly requiredSkills: readonly string[];
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
}

export interface RuntimeEvidenceRule {
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly minimumQualityTier: string;
  readonly minimumReasoningTier: string;
}

export interface RuntimePermissionRule {
  readonly kind: SpecialistPermissionKind;
  readonly requiredIsolationFeatures: readonly string[];
  readonly requiredPermissionFeatures: readonly string[];
}

export interface RuntimeObservabilityPolicy {
  readonly model: RuntimeObservationRequirement;
  readonly effort: RuntimeObservationRequirement;
  readonly tools: RuntimeObservationRequirement;
  readonly skills: RuntimeObservationRequirement;
  readonly isolation: RuntimeObservationRequirement;
  readonly permissions: RuntimeObservationRequirement;
  readonly workspace: RuntimeObservationRequirement;
  readonly context: RuntimeObservationRequirement;
}

export interface RuntimeSearchPolicy {
  readonly exactVectorLimit: number;
  readonly boundedBeamWidth: number;
}

export interface RuntimeDemandPolicy {
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

export interface RuntimeCalibratedCapability {
  readonly capabilityId: string;
  readonly qualityTier: string;
}

export interface RuntimeObservationModes {
  readonly model: RuntimeObservationMode;
  readonly effort: RuntimeObservationMode;
  readonly tools: RuntimeObservationMode;
  readonly skills: RuntimeObservationMode;
  readonly isolation: RuntimeObservationMode;
  readonly permissions: RuntimeObservationMode;
  readonly workspace: RuntimeObservationMode;
  readonly context: RuntimeObservationMode;
}

export interface RuntimeCalibrationEvidence {
  readonly id: string;
  readonly kind: "benchmark" | "host_contract" | "owner_assessment";
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
}

export interface RuntimeCalibrationRow {
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

export interface RuntimeCalibrationCatalog {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeCalibrationCatalog";
  readonly id: string;
  readonly revision: number;
  readonly assessedBy: string;
  readonly adapterId: string;
  readonly adapterRevision: string;
  readonly runtimeRows: readonly RuntimeCalibrationRow[];
}

export interface HostInventoryRow {
  readonly calibrationRowId: string;
  readonly availability: "available" | "unavailable";
  readonly availabilityReason: string;
}

export interface HostCapabilityInventory {
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

export interface CompileRuntimeAssignmentsRequest {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "CompileRuntimeAssignmentsRequest";
  readonly compilation: AgentBlueprintCompilation;
  readonly packageExpectation: SpecialistPackageExpectation;
  readonly policy: RuntimeDemandPolicy;
  readonly calibration: RuntimeCalibrationCatalog;
  readonly inventory: HostCapabilityInventory;
}

export interface RuntimeDemandCapability {
  readonly capabilityId: string;
  readonly minimumQualityTier: string;
}

export interface RuntimeDemand {
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

export type RuntimeRowRejectionCode =
  | "unavailable"
  | "quality_tier"
  | "reasoning_tier"
  | "context_capacity"
  | "required_tool"
  | "required_skill"
  | "isolation_feature"
  | "permission_feature"
  | "observation_mode";

export interface RuntimeRowComparator {
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

export interface RuntimeRowEvaluation {
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

export interface RuntimeVectorComparator {
  readonly totalCostRank: number;
  readonly maximumLatencyRank: number;
  readonly totalLatencyRank: number;
  readonly totalQualityExcess: number;
  readonly totalReasoningExcess: number;
  readonly totalContextExcessBytes: number;
  readonly totalToolExcess: number;
  readonly totalSkillExcess: number;
  readonly totalEffortRank: number;
  readonly canonicalIdentity: string;
}

export interface RuntimeAssignmentSearch {
  readonly mode: "exact" | "bounded";
  readonly claim: "exhaustive_assignment_vector_search" | "bounded_evaluated_set_no_global_optimum";
  readonly potentialVectors: number | "exceeds_safe_integer";
  readonly evaluatedVectors: number;
  readonly feasibleVectors: number;
  readonly contentDigest: string;
}

export interface RuntimeAssignment {
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

export interface RuntimeAssignmentVector {
  readonly rows: readonly RuntimeAssignment[];
  readonly comparator: RuntimeVectorComparator;
  readonly selectionReason:
    | "lowest_exact_vector"
    | "lowest_bounded_evaluated_vector"
    | "owner_override";
  readonly contentDigest: string;
}

export interface RuntimeAssignmentOverride {
  readonly apiVersion: RuntimeRoutingApiVersion;
  readonly kind: "RuntimeAssignmentOverride";
  readonly predecessorAssignmentDigest: string;
  readonly agentId: string;
  readonly replacementCalibrationRowId: string;
  readonly requestedBy: string;
  readonly rationale: string;
}

export interface RuntimeAssignmentCompilation {
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

export interface RuntimeAssignmentExpectation {
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly policyDigest: string;
  readonly calibrationDigest: string;
  readonly inventoryDigest: string;
  readonly assignmentDigest: string;
}
