import { Ajv2020 } from "ajv/dist/2020.js";
import { parseTree } from "jsonc-parser";

export {
  ADAPTIVE_RUN_API_VERSION,
  ADAPTIVE_RUN_LIMITS,
  API_VERSION,
  ARTIFACT_KINDS,
  EVENT_TYPE_VERSION,
  LIMITS,
  RUNTIME_ROUTING_API_VERSION,
  RUNTIME_ROUTING_LIMITS,
  SPECIALIST_API_VERSION,
  SPECIALIST_KINDS,
  SPECIALIST_LIMITS,
  SPECIALIST_RUN_API_VERSION,
  SPECIALIST_RUN_KINDS,
  SPECIALIST_RUN_LIMITS,
} from "./constants.js";
export {
  createDiagnostic,
  DIAGNOSTIC_DEFINITIONS,
  exitCodeForDiagnostics,
  sortAndDeduplicateDiagnostics,
} from "./diagnostics.js";
export type {
  ExecuteWorkPacketOptions,
  ExecutionDisposition,
  ExecutionFailureCode,
  ExecutionGrant,
  ExecutionGrantPermission,
  ExecutionPolicy,
  ExecutionSummary,
  ExecutionWorkflow,
  FailedTerminalCode,
  WorkPacketExecutor,
  WorkPacketExecutorRequest,
  WorkPacketExecutorSettlement,
} from "./execution.js";
export {
  createDeterministicTestExecutor,
  executeWorkPacket,
} from "./execution.js";
export { initializeProject } from "./initialize.js";
export { parseJsonBuffer } from "./json.js";
export type {
  AdapterManifestArtifact,
  PermissionRequest,
  RunEventArtifact,
  RunEventEvidenceReference,
  WorkPacketArtifact,
} from "./model.js";
export {
  applyRuntimeAssignmentOverride,
  compileRuntimeAssignments,
  verifyRuntimeAssignmentCompilation,
} from "./runtime-routing.js";
export { RUNTIME_ROUTING_SCHEMA_SOURCE } from "./runtime-routing-schema-data.js";
export type {
  CompileRuntimeAssignmentsRequest,
  HostCapabilityInventory,
  HostInventoryRow,
  RuntimeAssignment,
  RuntimeAssignmentCompilation,
  RuntimeAssignmentExpectation,
  RuntimeAssignmentOverride,
  RuntimeAssignmentSearch,
  RuntimeAssignmentVector,
  RuntimeCalibratedCapability,
  RuntimeCalibrationCatalog,
  RuntimeCalibrationEvidence,
  RuntimeCalibrationRow,
  RuntimeCapabilityRule,
  RuntimeDemand,
  RuntimeDemandCapability,
  RuntimeDemandPolicy,
  RuntimeEvidenceRule,
  RuntimeObservabilityPolicy,
  RuntimeObservationMode,
  RuntimeObservationModes,
  RuntimeObservationRequirement,
  RuntimePermissionRule,
  RuntimeRoutingApiVersion,
  RuntimeRowComparator,
  RuntimeRowEvaluation,
  RuntimeRowRejectionCode,
  RuntimeSearchPolicy,
  RuntimeTierDefinition,
  RuntimeVectorComparator,
} from "./runtime-routing-types.js";
export {
  analyzeSpecialistCandidates,
  compileAgentBlueprints,
  deriveTaskAuthorityProjection,
} from "./specialist-compiler.js";
export { assessSpecialistHandoffs, verifySpecialistHandoff } from "./specialist-handoff.js";
export { renderSpecialistPackage, verifySpecialistPackage } from "./specialist-render.js";
export { inspectSpecialistRunSession } from "./specialist-run-inspection.js";
export {
  createSpecialistRunSession,
  restoreSpecialistRunSession,
} from "./specialist-run-session.js";
export { recordSpecialistRunHandoff } from "./specialist-run-transition.js";
export type {
  SpecialistRunAcceptedEvidence,
  SpecialistRunAcceptedHandoff,
  SpecialistRunAgentStatus,
  SpecialistRunAgentStatusKind,
  SpecialistRunApiVersion,
  SpecialistRunEligibleContract,
  SpecialistRunEvidenceBinding,
  SpecialistRunGoalBinding,
  SpecialistRunInspection,
  SpecialistRunNextAction,
  SpecialistRunRoute,
  SpecialistRunSession,
  SpecialistRunStage,
} from "./specialist-run-types.js";
export type {
  AgentBlueprint,
  AgentBlueprintAuthority,
  AgentBlueprintCompilation,
  AgentBlueprintContextUse,
  AgentBlueprintEvidenceDuty,
  AgentBlueprintHandoff,
  AgentBlueprintObjective,
  CompileAgentBlueprintsInput,
  NoEligibleSpecialistCandidateAnalysis,
  RenderedSpecialistFile,
  RenderedSpecialistPackage,
  SelectedSpecialistCandidateAnalysis,
  SpecialistAcceptanceCriterion,
  SpecialistAgentHandoff,
  SpecialistAgentSchedule,
  SpecialistApiVersion,
  SpecialistAssumption,
  SpecialistAuthority,
  SpecialistCandidateAnalysis,
  SpecialistCandidateEvaluation,
  SpecialistCandidateMetrics,
  SpecialistCandidateOrigin,
  SpecialistCandidateProposal,
  SpecialistCandidateRejectionCode,
  SpecialistComparatorField,
  SpecialistContextKind,
  SpecialistContextSource,
  SpecialistContextUse,
  SpecialistEvidenceDuty,
  SpecialistEvidenceRequirement,
  SpecialistExternalContextSource,
  SpecialistGoalContract,
  SpecialistHandoffAgentBinding,
  SpecialistHandoffArtifact,
  SpecialistHandoffArtifactBinding,
  SpecialistHandoffAssessmentEntry,
  SpecialistHandoffEvidence,
  SpecialistHandoffGoalBinding,
  SpecialistHandoffSetAssessment,
  SpecialistLaunchWave,
  SpecialistModuleBinding,
  SpecialistOptimizationPolicy,
  SpecialistPackageAgent,
  SpecialistPackageExpectation,
  SpecialistPackageManifest,
  SpecialistPermission,
  SpecialistPermissionKind,
  SpecialistPort,
  SpecialistRepositoryContextSource,
  SpecialistScope,
  SpecialistSearchMode,
  SpecialistSearchSummary,
  SpecialistSelectionReason,
  SpecialistUnresolvedDecision,
  SpecialistWorkUnit,
  TaskAuthorityProjection,
  VerifiedSpecialistHandoff,
} from "./specialist-types.js";
export { inspectTrace } from "./trace.js";
export type {
  CancellationReasonCode,
  Diagnostic,
  DiagnosticSeverity,
  EvidenceKind,
  ExecutionState,
  ExitCode,
  InitializeProjectOptions,
  InspectTraceOptions,
  OperationResult,
  ProjectInitializationSummary,
  ProjectValidationSummary,
  RunEventType,
  TerminalCode,
  TraceAttemptSummary,
  TraceEvidenceSummary,
  TraceInspectionSummary,
  TraceRunSummary,
  TraceWorkflowOutcomeSummary,
  ValidatedArtifactSummary,
  ValidateProjectOptions,
  WorkflowOutcome,
  WorkflowStage,
} from "./types.js";
export { validateArtifactValue, validateProject } from "./validate.js";

export const TOOLCHAIN = Object.freeze({
  apiVersion: "swecircuit/v1alpha1",
  parser: "jsonc-parser",
  runtime: "node",
  schemaDialect: "https://json-schema.org/draft/2020-12/schema",
  validator: "ajv",
});

export function createToolchainProbe(): Readonly<{
  duplicateKeysVisible: boolean;
  parsed: boolean;
  schemaValid: boolean;
}> {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validate = ajv.compile({
    type: "object",
    properties: { ready: { const: true } },
    required: ["ready"],
    additionalProperties: false,
  });

  const duplicateTree = parseTree('{"ready":true,"ready":false}');
  const duplicateKeys =
    duplicateTree?.children?.filter(
      (property) => property.type === "property" && property.children?.[0]?.value === "ready",
    ).length ?? 0;

  return Object.freeze({
    duplicateKeysVisible: duplicateKeys === 2,
    parsed: parseTree('{"ready":true}') !== undefined,
    schemaValid: validate({ ready: true }),
  });
}
