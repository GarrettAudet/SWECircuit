import type { SPECIALIST_API_VERSION } from "./constants.js";
import type { EvidenceKind } from "./types.js";

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

export interface SpecialistPermission {
  readonly kind: string;
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

export interface SpecialistGoalContract {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "GoalContract";
  readonly id: string;
  readonly revision: number;
  readonly objective: string;
  readonly integrationOwner: string;
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
  readonly workUnitCount: number;
  readonly evaluatedCandidates: number;
  readonly eligibleCandidates: number;
  readonly retainedAlternatives: number;
  readonly evaluationSetDigest: string;
}

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
  readonly authority: TaskAuthorityProjection;
  readonly search: SpecialistSearchSummary;
  readonly serialBaseline: SpecialistCandidateEvaluation;
  readonly selected: SpecialistCandidateEvaluation;
  readonly alternatives: readonly SpecialistCandidateEvaluation[];
  readonly blueprints: readonly AgentBlueprint[];
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly contentDigest: string;
}

export interface SpecialistPackageAgent {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly contractFile: string;
}

export interface SpecialistPackageManifest {
  readonly apiVersion: SpecialistApiVersion;
  readonly kind: "SpecialistPackageManifest";
  readonly goalId: string;
  readonly goalRevision: number;
  readonly compilationDigest: string;
  readonly selectedCandidateId: string;
  readonly launchWaves: readonly SpecialistLaunchWave[];
  readonly agents: readonly SpecialistPackageAgent[];
  readonly integrationFile: "integration.md";
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
  readonly manifest: SpecialistPackageManifest;
  readonly files: readonly RenderedSpecialistFile[];
}
