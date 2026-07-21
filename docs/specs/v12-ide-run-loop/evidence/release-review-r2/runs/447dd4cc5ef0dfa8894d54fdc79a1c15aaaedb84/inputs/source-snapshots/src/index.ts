import { Ajv2020 } from "ajv/dist/2020.js";
import { parseTree } from "jsonc-parser";

export {
  API_VERSION,
  ARTIFACT_KINDS,
  EVENT_TYPE_VERSION,
  LIMITS,
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
  analyzeSpecialistCandidates,
  compileAgentBlueprints,
  deriveTaskAuthorityProjection,
} from "./specialist-compiler.js";
export { renderSpecialistPackage, verifySpecialistPackage } from "./specialist-render.js";
export { assessSpecialistHandoffs, verifySpecialistHandoff } from "./specialist-handoff.js";
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
  RenderedSpecialistFile,
  RenderedSpecialistPackage,
  SpecialistAcceptanceCriterion,
  SpecialistAgentSchedule,
  SpecialistApiVersion,
  SpecialistAssumption,
  SpecialistAuthority,
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
  NoEligibleSpecialistCandidateAnalysis,
  SelectedSpecialistCandidateAnalysis,
  SpecialistAgentHandoff,
  SpecialistCandidateAnalysis,
  SpecialistHandoffAgentBinding,
  SpecialistHandoffArtifact,
  SpecialistHandoffArtifactBinding,
  SpecialistHandoffAssessmentEntry,
  SpecialistHandoffEvidence,
  SpecialistHandoffGoalBinding,
  SpecialistHandoffSetAssessment,
  VerifiedSpecialistHandoff,
  TaskAuthorityProjection,
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
