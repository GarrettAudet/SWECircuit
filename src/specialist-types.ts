import type { SPECIALIST_API_VERSION } from "./constants.js";
import type { EvidenceKind, WorkflowOutcome } from "./types.js";

export type SpecialistApiVersion = typeof SPECIALIST_API_VERSION;

export type SpecialistContextKind =
  | "repository"
  | "documentation"
  | "conversation"
  | "memory"
  | "evidence";

export type SpecialistEvidenceDuty = "produce" | "verify" | "review";

export type SpecialistSearchMode = "exact" | "bounded";

export type SpecialistCandidateOrigin =
  | "serial_baseline"
  | "exact_search"
  | "bounded_balanced"
  | "bounded_dependency"
  | "bounded_evidence"
  | "bounded_module"
  | "bounded_scope"
  | "proposed";

export type SpecialistCandidateRejectionCode =
  | "agent_limit"
  | "dependency_cycle"
  | "evidence_independence"
  | "missing_work_unit"
  | "duplicate_work_unit"
  | "unknown_work_unit";

export type SpecialistPermissionKind =
  | "filesystem.read"
  | "filesystem.write"
  | "network.connect"
  | "process.spawn"
  | "secrets.read";

export interface SpecialistPermission {
  readonly kind: SpecialistPermissionKind;
  readonly scopes: readonly string[];
}

export interface SpecialistPort {
  readonly name: string;
  readonly artifactType: string;
}

export interface SpecialistModuleBinding {
  readonly id: string;
  readonly action: string;
  readonly inputPorts: readonly SpecialistPort[];
  readonly outputPorts: readonly SpecialistPort[];
}

export interface SpecialistEvidenceRequirement {
  readonly id: string;
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly description: string;
  readonly independentFromProducer: boolean;
}

export interface SpecialistAcceptanceCriterion {
  readonly id: string;
  readonly description: string;
  readonly evidenceRequirements: readonly SpecialistEvidenceRequirement[];
}

interface SpecialistContextSourceBase {
  readonly id: string;
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
  readonly description: string;
  readonly allowedWorkUnits: readonly string[];
}

export interface SpecialistRepositoryContextSource extends SpecialistContextSourceBase {
  readonly kind: "repository";
  readonly readScope: string;
}

export interface SpecialistExternalContextSource extends SpecialistContextSourceBase {
  readonly kind: Exclude<SpecialistContextKind, "repository">;
}

export type SpecialistContextSource =
  | SpecialistRepositoryContextSource
  | SpecialistExternalContextSource;

export interface SpecialistContextUse {
  readonly sourceId: string;
  readonly purpose: string;
}

export interface SpecialistScope {
  readonly read: readonly string[];
  readonly write: readonly string[];
  readonly conflictZones: readonly string[];
}

export interface SpecialistWorkUnit {
  readonly id: string;
  readonly objective: string;
  readonly weight: number;
  readonly module: SpecialistModuleBinding;
  readonly dependencies: readonly string[];
  readonly requiredCapabilities: readonly string[];
  readonly contextUses: readonly SpecialistContextUse[];
  readonly scope: SpecialistScope;
  readonly permissions: readonly SpecialistPermission[];
  readonly evidenceRequirementIds: readonly string[];
  readonly handoffArtifacts: readonly string[];
  readonly stopConditions: readonly string[];
}

export interface SpecialistAuthority {
  readonly allowedModules: readonly string[];
  readonly allowedCapabilities: readonly string[];
  readonly permissionCeiling: readonly SpecialistPermission[];
  readonly forbiddenEffects: readonly string[];
  readonly maxAgents: number;
  readonly maxConcurrency: number;
}

export interface SpecialistOptimizationPolicy {
  readonly agentStartupCost: number;
  readonly handoffCost: number;
}

export interface SpecialistAssumption {
  readonly id: string;
  readonly statement: string;
  readonly rationale: string;
}

export interface SpecialistUnresolvedDecision {
  readonly id: string;
  readonly question: string;
  readonly owner: string;
  readonly blocking: boolean;
  readonly proceedRationale: string;
}

export interface SpecialistGoalContract {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "GoalContract";
  readonly id: string;
  readonly revision: number;
  readonly objective: string;
  readonly integrationOwner: string;
  readonly assumptions: readonly SpecialistAssumption[];
  readonly unresolvedDecisions: readonly SpecialistUnresolvedDecision[];
  readonly acceptanceCriteria: readonly SpecialistAcceptanceCriterion[];
  readonly contextSources: readonly SpecialistContextSource[];
  readonly authority: SpecialistAuthority;
  readonly optimization: SpecialistOptimizationPolicy;
  readonly workUnits: readonly SpecialistWorkUnit[];
}

export interface SpecialistCandidateProposal {
  readonly id: string;
  readonly groups: readonly (readonly string[])[];
}

export interface CompileAgentBlueprintsInput {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistCompilationRequest";
  readonly goal: SpecialistGoalContract;
  readonly proposedCandidates?: readonly SpecialistCandidateProposal[];
}

export interface TaskAuthorityProjection {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "TaskAuthorityProjection";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly allowedModules: readonly string[];
  readonly allowedCapabilities: readonly string[];
  readonly contextSources: readonly SpecialistContextSource[];
  readonly permissionCeiling: readonly SpecialistPermission[];
  readonly forbiddenEffects: readonly string[];
  readonly maxAgents: number;
  readonly maxConcurrency: number;
  readonly contentDigest: string;
}

export interface SpecialistCandidateMetrics {
  readonly agentCount: number;
  readonly projectedMakespan: number;
  readonly peakConcurrency: number;
  readonly conflictPairs: number;
  readonly handoffCount: number;
  readonly duplicatedContextBytes: number;
  readonly duplicatedPermissionScopes: number;
  readonly totalWorkWeight: number;
  readonly totalStartupCost: number;
  readonly totalHandoffCost: number;
}

export interface SpecialistAgentSchedule {
  readonly agentId: string;
  readonly start: number;
  readonly finish: number;
}

export interface SpecialistLaunchWave {
  readonly start: number;
  readonly agentIds: readonly string[];
}

export interface SpecialistCandidateEvaluation {
  readonly id: string;
  readonly partition: readonly (readonly string[])[];
  readonly origins: readonly SpecialistCandidateOrigin[];
  readonly proposalIds: readonly string[];
  readonly eligible: boolean;
  readonly rejectionCodes: readonly SpecialistCandidateRejectionCode[];
  readonly metrics: SpecialistCandidateMetrics | null;
  readonly schedule: readonly SpecialistAgentSchedule[];
  readonly contentDigest: string;
}

export interface SpecialistSearchSummary {
  readonly mode: SpecialistSearchMode;
  readonly claim:
    | "exhaustive_partition_search_fixed_scheduler"
    | "bounded_evaluated_set_no_global_optimum";
  readonly workUnitCount: number;
  readonly evaluatedCandidates: number;
  readonly eligibleCandidates: number;
  readonly retainedAlternatives: number;
  readonly evaluationSetDigest: string;
}

export type SpecialistComparatorField =
  | "projectedMakespan"
  | "conflictPairs"
  | "handoffCount"
  | "duplicatedContextBytes"
  | "duplicatedPermissionScopes"
  | "agentCount"
  | "canonicalPartitionIdentity";

export interface SpecialistSelectionReason {
  readonly kind: "serial_selected" | "serial_ineligible" | "lower_metric" | "canonical_tiebreak";
  readonly decisiveField:
    | "serial_baseline"
    | SpecialistCandidateRejectionCode
    | SpecialistComparatorField;
  readonly selectedValue: number | string | null;
  readonly serialValue: number | string | null;
  readonly serialRejectionCodes: readonly SpecialistCandidateRejectionCode[];
}

interface SpecialistCandidateAnalysisBase {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistCandidateAnalysis";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly goalDigest: string;
  readonly proposalEvaluations: readonly SpecialistCandidateEvaluation[];
  readonly search: SpecialistSearchSummary;
  readonly serialBaseline: SpecialistCandidateEvaluation;
  readonly alternatives: readonly SpecialistCandidateEvaluation[];
  readonly contentDigest: string;
}

export interface SelectedSpecialistCandidateAnalysis extends SpecialistCandidateAnalysisBase {
  readonly selectionStatus: "selected";
  readonly selected: SpecialistCandidateEvaluation;
  readonly selectionReason: SpecialistSelectionReason;
}

export interface NoEligibleSpecialistCandidateAnalysis extends SpecialistCandidateAnalysisBase {
  readonly selectionStatus: "no_eligible_candidate";
  readonly selected: null;
  readonly selectionReason: null;
}

export type SpecialistCandidateAnalysis =
  | SelectedSpecialistCandidateAnalysis
  | NoEligibleSpecialistCandidateAnalysis;
export interface AgentBlueprintObjective {
  readonly workUnitId: string;
  readonly objective: string;
}

export interface AgentBlueprintContextUse {
  readonly sourceId: string;
  readonly kind: SpecialistContextKind;
  readonly locator: string;
  readonly digest: string;
  readonly bytes: number;
  readonly purposes: readonly string[];
  readonly workUnitIds: readonly string[];
  readonly readScope?: string;
}

export interface AgentBlueprintEvidenceDuty {
  readonly criterionId: string;
  readonly criterion: string;
  readonly requirementId: string;
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly description: string;
  readonly independentFromProducer: boolean;
}

export interface AgentBlueprintAuthority {
  readonly requiredCapabilities: readonly string[];
  readonly scope: SpecialistScope;
  readonly permissions: readonly SpecialistPermission[];
  readonly forbiddenEffects: readonly string[];
}

export interface AgentBlueprintHandoff {
  readonly destination: string;
  readonly artifacts: readonly string[];
  readonly requiredFields: readonly [
    "apiVersion",
    "kind",
    "outcome",
    "destination",
    "goal",
    "agent",
    "compilationDigest",
    "summary",
    "workUnitsCompleted",
    "artifacts",
    "evidence",
    "assumptions",
    "risks",
    "followUps",
  ];
}

export interface AgentBlueprint {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "AgentBlueprint";
  readonly id: string;
  readonly goalId: string;
  readonly goalRevision: number;
  readonly goalDigest: string;
  readonly candidateId: string;
  readonly workUnitIds: readonly string[];
  readonly objectives: readonly AgentBlueprintObjective[];
  readonly modules: readonly SpecialistModuleBinding[];
  readonly dependencies: readonly string[];
  readonly contextUses: readonly AgentBlueprintContextUse[];
  readonly authority: AgentBlueprintAuthority;
  readonly evidenceDuties: readonly AgentBlueprintEvidenceDuty[];
  readonly handoff: AgentBlueprintHandoff;
  readonly stopConditions: readonly string[];
  readonly contentDigest: string;
}

export interface AgentBlueprintCompilation {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "AgentBlueprintCompilation";
  readonly goal: SpecialistGoalContract;
  readonly goalDigest: string;
  readonly proposedCandidates: readonly SpecialistCandidateProposal[];
  readonly proposalEvaluations: readonly SpecialistCandidateEvaluation[];
  readonly authority: TaskAuthorityProjection;
  readonly search: SpecialistSearchSummary;
  readonly serialBaseline: SpecialistCandidateEvaluation;
  readonly selected: SpecialistCandidateEvaluation;
  readonly selectionReason: SpecialistSelectionReason;
  readonly alternatives: readonly SpecialistCandidateEvaluation[];
  readonly blueprints: readonly AgentBlueprint[];
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly contentDigest: string;
}

export interface SpecialistPackageAgent {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly contractFile: string;
  readonly contractDigest: string;
  readonly contractBytes: number;
}

export interface SpecialistPackageManifest {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistPackageManifest";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly fileDigestAlgorithm: "sha256";
  readonly fileDigestScope: "raw-file-bytes";
  readonly compilationDigest: string;
  readonly selectedCandidateId: string;
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly compilationFile: "compilation.json";
  readonly compilationFileDigest: string;
  readonly compilationFileBytes: number;
  readonly agents: readonly SpecialistPackageAgent[];
  readonly integrationFile: "integration.md";
  readonly integrationDigest: string;
  readonly integrationBytes: number;
  readonly contentDigest: string;
}

export interface RenderedSpecialistFile {
  readonly path: string;
  readonly mediaType: "application/json" | "text/markdown";
  readonly bytes: number;
  readonly digest: string;
  readonly content: string;
}

export interface RenderedSpecialistPackage {
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly manifest: SpecialistPackageManifest;
  readonly files: readonly RenderedSpecialistFile[];
}

export interface SpecialistPackageExpectation {
  readonly compilationDigest: string;
  readonly packageDigest: string;
}

export interface SpecialistHandoffGoalBinding {
  readonly id: string;
  readonly revision: number;
  readonly digest: string;
}

export interface SpecialistHandoffAgentBinding {
  readonly id: string;
  readonly blueprintDigest: string;
}

export interface SpecialistHandoffArtifact {
  readonly name: string;
  readonly mediaType: string;
  readonly content: string;
}

export interface SpecialistHandoffEvidence {
  readonly criterionId: string;
  readonly requirementId: string;
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly status: WorkflowOutcome;
  readonly artifact: string;
}

export interface SpecialistAgentHandoff {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistAgentHandoff";
  readonly outcome: WorkflowOutcome;
  readonly destination: string;
  readonly goal: SpecialistHandoffGoalBinding;
  readonly agent: SpecialistHandoffAgentBinding;
  readonly compilationDigest: string;
  readonly summary: string;
  readonly workUnitsCompleted: readonly string[];
  readonly artifacts: readonly SpecialistHandoffArtifact[];
  readonly evidence: readonly SpecialistHandoffEvidence[];
  readonly assumptions: readonly string[];
  readonly risks: readonly string[];
  readonly followUps: readonly string[];
}

export interface SpecialistHandoffArtifactBinding {
  readonly name: string;
  readonly mediaType: string;
  readonly bytes: number;
  readonly digest: string;
}

export interface VerifiedSpecialistHandoff {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "VerifiedSpecialistHandoff";
  readonly handoff: SpecialistAgentHandoff;
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly semanticDigest: string;
  readonly artifactBindings: readonly SpecialistHandoffArtifactBinding[];
  readonly contentDigest: string;
}

export interface SpecialistHandoffAssessmentEntry {
  readonly agentId: string;
  readonly outcome: WorkflowOutcome;
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly semanticDigest: string;
}

export interface SpecialistHandoffSetAssessment {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistHandoffSetAssessment";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly goalDigest: string;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly targetAgentId: string;
  readonly requiredAgentIds: readonly string[];
  readonly receivedAgentIds: readonly string[];
  readonly missingAgentIds: readonly string[];
  readonly handoffs: readonly SpecialistHandoffAssessmentEntry[];
  readonly integrationReady: boolean;
  readonly contentDigest: string;
}
