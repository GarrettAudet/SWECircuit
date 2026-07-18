import {
  analyzeSpecialistCandidates,
  assessSpecialistHandoffs,
  type AgentBlueprint,
  type AgentBlueprintAuthority,
  type AgentBlueprintCompilation,
  type AgentBlueprintContextUse,
  type AgentBlueprintEvidenceDuty,
  type AgentBlueprintHandoff,
  type AgentBlueprintObjective,
  type CompileAgentBlueprintsInput,
  compileAgentBlueprints,
  deriveTaskAuthorityProjection,
  type ExecuteWorkPacketOptions,
  type ExecutionGrant,
  type ExecutionGrantPermission,
  type ExecutionSummary,
  executeWorkPacket,
  type RenderedSpecialistFile,
  type RenderedSpecialistPackage,
  renderSpecialistPackage,
  SPECIALIST_API_VERSION,
  verifySpecialistPackage,
  verifySpecialistHandoff,
  type SPECIALIST_KINDS,
  SPECIALIST_LIMITS,
  type NoEligibleSpecialistCandidateAnalysis,
  type SelectedSpecialistCandidateAnalysis,
  type SpecialistAgentHandoff,
  type SpecialistCandidateAnalysis,
  type SpecialistHandoffAgentBinding,
  type SpecialistHandoffArtifact,
  type SpecialistHandoffArtifactBinding,
  type SpecialistHandoffAssessmentEntry,
  type SpecialistHandoffEvidence,
  type SpecialistHandoffGoalBinding,
  type SpecialistHandoffSetAssessment,
  type VerifiedSpecialistHandoff,
  type SpecialistAcceptanceCriterion,
  type SpecialistAgentSchedule,
  type SpecialistAssumption,
  type SpecialistApiVersion,
  type SpecialistAuthority,
  type SpecialistCandidateEvaluation,
  type SpecialistCandidateMetrics,
  type SpecialistCandidateOrigin,
  type SpecialistCandidateProposal,
  type SpecialistCandidateRejectionCode,
  type SpecialistComparatorField,
  type SpecialistContextKind,
  type SpecialistContextSource,
  type SpecialistContextUse,
  type SpecialistEvidenceDuty,
  type SpecialistEvidenceRequirement,
  type SpecialistExternalContextSource,
  type SpecialistGoalContract,
  type SpecialistLaunchWave,
  type SpecialistModuleBinding,
  type SpecialistOptimizationPolicy,
  type SpecialistPackageAgent,
  type SpecialistPackageExpectation,
  type SpecialistPackageManifest,
  type SpecialistPermission,
  type SpecialistPermissionKind,
  type SpecialistPort,
  type SpecialistRepositoryContextSource,
  type SpecialistScope,
  type SpecialistSearchMode,
  type SpecialistSearchSummary,
  type SpecialistSelectionReason,
  type SpecialistUnresolvedDecision,
  type SpecialistWorkUnit,
  type TaskAuthorityProjection,
  type WorkPacketExecutor,
  type WorkPacketExecutorRequest,
  type WorkPacketExecutorSettlement,
} from "swecircuit";

const settlement = {
  state: "completed",
} satisfies WorkPacketExecutorSettlement;

const permissions = [
  { kind: "filesystem.read", scopes: ["src/**"] },
] satisfies readonly ExecutionGrantPermission[];

const executionGrant = {
  id: "grant.consumer",
  issuer: "integration.owner",
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  workPacket: "consumer-packet",
  executor: { id: "consumer.executor", version: "1.0.0" },
  permissions,
} satisfies ExecutionGrant;

class ConsumerExecutor implements WorkPacketExecutor {
  readonly id = "consumer.executor";
  readonly version = "1.0.0";

  async execute(_request: WorkPacketExecutorRequest): Promise<WorkPacketExecutorSettlement> {
    return settlement;
  }
}

const options = {
  workPacket: {},
  adapterManifest: {},
  grant: executionGrant,
  executor: new ConsumerExecutor(),
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  correlationId: "consumer-check",
  policy: {
    timeoutMs: 1_000,
    abortAcknowledgementMs: 100,
  },
} satisfies ExecuteWorkPacketOptions;

function summarize(summary: ExecutionSummary): string {
  switch (summary.disposition) {
    case "completed": {
      const terminalCode: "success" = summary.terminalCode;
      return terminalCode;
    }
    case "failed":
      return `${summary.failureCode}:${summary.terminalCode}`;
    case "cancelled":
      return summary.abortCause === "caller"
        ? (summary.terminalCode satisfies "cancelled_by_user")
        : (summary.terminalCode satisfies "cancelled_by_policy");
    case "timed_out": {
      const terminalCode: "deadline_exceeded" = summary.terminalCode;
      return terminalCode;
    }
    case "abort_unconfirmed": {
      const state: "running" = summary.state;
      return `${state}:${summary.abortCause}`;
    }
    default: {
      const unreachable: never = summary;
      return unreachable;
    }
  }
}

const result = await executeWorkPacket(options);
if (!result.ok || result.value === null) {
  void result.diagnostics;
} else {
  void summarize(result.value);
}

type SpecialistDeclarationSurface = readonly [
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
  TaskAuthorityProjection,
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
];

type DeepKeys<T> = T extends readonly (infer Entry)[]
  ? DeepKeys<Entry>
  : T extends object
    ? keyof T | { [Key in keyof T]-?: DeepKeys<T[Key]> }[keyof T]
    : never;
type ForbiddenSpecialistKey =
  | "role"
  | "provider"
  | "model"
  | "prompt"
  | "executor"
  | "credential"
  | "grant"
  | "runtime"
  | "runtimeProfile"
  | "agentProfile"
  | "assignment";
type SpecialistForbiddenDeclarationKeys = Extract<
  DeepKeys<SpecialistDeclarationSurface[number]>,
  ForbiddenSpecialistKey
>;
type IsNever<T> = [T] extends [never] ? true : false;

const providerNeutralDeclarations: IsNever<SpecialistForbiddenDeclarationKeys> = true;
const specialistApiVersion: SpecialistApiVersion = SPECIALIST_API_VERSION;
const specialistKinds: typeof SPECIALIST_KINDS = [
  "GoalContract",
  "SpecialistCompilationRequest",
  "SpecialistCandidateAnalysis",
  "TaskAuthorityProjection",
  "AgentBlueprint",
  "AgentBlueprintCompilation",
  "SpecialistAgentHandoff",
  "VerifiedSpecialistHandoff",
  "SpecialistHandoffSetAssessment",
  "SpecialistPackageManifest",
];
const specialistLimits: typeof SPECIALIST_LIMITS = SPECIALIST_LIMITS;
const specialistContextKinds = {
  repository: true,
  documentation: true,
  conversation: true,
  memory: true,
  evidence: true,
} satisfies Record<SpecialistContextKind, true>;
const specialistEvidenceDuties = {
  produce: true,
  verify: true,
  review: true,
} satisfies Record<SpecialistEvidenceDuty, true>;
const specialistSearchModes = {
  exact: true,
  bounded: true,
} satisfies Record<SpecialistSearchMode, true>;
type SpecialistPermissionKindIsExact = string extends SpecialistPermissionKind ? false : true;
const specialistPermissionKindIsExact: SpecialistPermissionKindIsExact = true;
const specialistPermissionKinds = {
  "filesystem.read": true,
  "filesystem.write": true,
  "network.connect": true,
  "process.spawn": true,
  "secrets.read": true,
} satisfies Record<SpecialistPermissionKind, true>;
const specialistCandidateOrigins = {
  serial_baseline: true,
  exact_search: true,
  bounded_balanced: true,
  bounded_dependency: true,
  bounded_evidence: true,
  bounded_module: true,
  bounded_scope: true,
  proposed: true,
} satisfies Record<SpecialistCandidateOrigin, true>;
const specialistCandidateRejections = {
  agent_limit: true,
  dependency_cycle: true,
  evidence_independence: true,
  missing_work_unit: true,
  duplicate_work_unit: true,
  unknown_work_unit: true,
} satisfies Record<SpecialistCandidateRejectionCode, true>;
const specialistComparatorFields = {
  projectedMakespan: true,
  conflictPairs: true,
  handoffCount: true,
  duplicatedContextBytes: true,
  duplicatedPermissionScopes: true,
  agentCount: true,
  canonicalPartitionIdentity: true,
} satisfies Record<SpecialistComparatorField, true>;

const specialistGoal = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "GoalContract",
  id: "consumer.goal",
  revision: 1,
  objective: "Compile one provider-neutral specialist contract.",
  integrationOwner: "integration.owner",
  assumptions: [
    {
      id: "assumption.reviewed-context",
      statement: "The declared package context is current.",
      rationale: "The installed consumer binds the exact source declarations.",
    },
  ],
  unresolvedDecisions: [
    {
      id: "decision.future-adapter",
      question: "Should a later release add another host adapter?",
      owner: "integration.owner",
      blocking: false,
      proceedRationale: "No adapter is required to verify this package.",
    },
  ],
  acceptanceCriteria: [
    {
      id: "criterion.package",
      description: "The specialist package is compiled and rendered.",
      evidenceRequirements: [
        {
          id: "evidence.package",
          kind: "artifact",
          duty: "produce",
          description: "A digest-bound specialist package.",
          independentFromProducer: false,
        },
      ],
    },
  ],
  contextSources: [
    {
      id: "context.source",
      kind: "repository",
      locator: "path:src/specialist-compiler.ts",
      digest: `sha256:${"0".repeat(64)}`,
      bytes: 1024,
      description: "The repository compiler source.",
      allowedWorkUnits: ["compile.package"],
      readScope: "src/**",
    },
    {
      id: "context.contract",
      kind: "documentation",
      locator: "path:docs/specs/v11-specialist-compiler/spec.md",
      digest: `sha256:${"1".repeat(64)}`,
      bytes: 512,
      description: "The reviewed specialist contract.",
      allowedWorkUnits: ["compile.package"],
    },
  ],
  authority: {
    allowedModules: ["module.compile"],
    allowedCapabilities: ["specialist.compile"],
    permissionCeiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
    forbiddenEffects: ["Do not invoke providers or runtime executors."],
    maxAgents: 1,
    maxConcurrency: 1,
  },
  optimization: {
    agentStartupCost: 1,
    handoffCost: 1,
  },
  workUnits: [
    {
      id: "compile.package",
      objective: "Compile and render the specialist package.",
      weight: 3,
      module: {
        id: "module.compile",
        action: "Compile exact task demand into one specialist contract.",
        inputPorts: [{ name: "goal", artifactType: "GoalContract" }],
        outputPorts: [{ name: "package", artifactType: "SpecialistPackage" }],
      },
      dependencies: [],
      requiredCapabilities: ["specialist.compile"],
      contextUses: [
        { sourceId: "context.source", purpose: "Inspect the compiler boundary." },
        { sourceId: "context.contract", purpose: "Follow the reviewed contract." },
      ],
      scope: {
        read: ["src/**"],
        write: [],
        conflictZones: [],
      },
      permissions: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      evidenceRequirementIds: ["evidence.package"],
      handoffArtifacts: ["specialist.package"],
      stopConditions: ["Stop if the declared authority is insufficient."],
    },
  ],
} satisfies SpecialistGoalContract;

const specialistRequest = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistCompilationRequest",
  goal: specialistGoal,
  proposedCandidates: [{ id: "candidate.serial", groups: [["compile.package"]] }],
} satisfies CompileAgentBlueprintsInput;

const authorityProjectionResult = deriveTaskAuthorityProjection(specialistGoal);
const specialistAnalysisResult = analyzeSpecialistCandidates(specialistRequest);
const specialistCompilationResult = compileAgentBlueprints(specialistRequest);
if (
  !authorityProjectionResult.ok ||
  authorityProjectionResult.value === null ||
  !specialistAnalysisResult.ok ||
  specialistAnalysisResult.value === null ||
  specialistAnalysisResult.value.selectionStatus !== "selected" ||
  !specialistCompilationResult.ok ||
  specialistCompilationResult.value === null
) {
  throw new Error("The installed specialist declarations rejected their typed input.");
}
const authorityProjection: TaskAuthorityProjection = authorityProjectionResult.value;
const specialistAnalysis: SelectedSpecialistCandidateAnalysis = specialistAnalysisResult.value;
if (specialistAnalysis.selected.id !== specialistCompilationResult.value.selected.id) {
  throw new Error("Candidate analysis and compilation selected different teams.");
}
const specialistCompilation: AgentBlueprintCompilation = specialistCompilationResult.value;
const specialistPackageResult = renderSpecialistPackage(specialistCompilation);
if (!specialistPackageResult.ok || specialistPackageResult.value === null) {
  throw new Error("The installed specialist renderer rejected its typed compilation.");
}
const specialistPackage: RenderedSpecialistPackage = specialistPackageResult.value;
// Models approval retained by the host independently of the rendered package.
const retainedSpecialistExpectation = {
  compilationDigest: "sha256:92881440b8d0b58de756bd706631ed4481565b20fd3cadad669637006b157659",
  packageDigest: "sha256:913c04c71beaef362e81a1859f740587e2cf0017a83585d5c6468cbda2e84a43",
} satisfies SpecialistPackageExpectation;
const specialistVerificationResult = verifySpecialistPackage(
  specialistPackage,
  retainedSpecialistExpectation,
);
if (!specialistVerificationResult.ok || specialistVerificationResult.value === null) {
  throw new Error(
    `The retained installed-package approval is stale: ${JSON.stringify({
      compilationDigest: specialistPackage.compilationDigest,
      packageDigest: specialistPackage.packageDigest,
    })}`,
  );
}
const verifiedSpecialistPackage: RenderedSpecialistPackage = specialistVerificationResult.value;
const specialistBlueprint = specialistCompilation.blueprints[0];
const primaryHandoffArtifact = specialistBlueprint?.handoff.artifacts[0];
if (specialistBlueprint === undefined || primaryHandoffArtifact === undefined) {
  throw new Error("The installed specialist package did not declare a handoff artifact.");
}
function expectedHandoffMediaType(name: string): string {
  if (name.endsWith(".json")) return "application/json";
  if (name.endsWith(".md")) return "text/markdown";
  return "text/plain";
}
const specialistHandoff: SpecialistAgentHandoff = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistAgentHandoff",
  outcome: "pass",
  destination: specialistBlueprint.handoff.destination,
  goal: {
    id: specialistCompilation.goal.id,
    revision: specialistCompilation.goal.revision,
    digest: specialistCompilation.goalDigest,
  },
  agent: {
    id: specialistBlueprint.id,
    blueprintDigest: specialistBlueprint.contentDigest,
  },
  compilationDigest: specialistCompilation.contentDigest,
  summary: "The installed-package specialist contract completed.",
  workUnitsCompleted: [...specialistBlueprint.workUnitIds],
  artifacts: specialistBlueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: expectedHandoffMediaType(name),
    content: "{}",
  })),
  evidence: specialistBlueprint.evidenceDuties.map((duty) => ({
    criterionId: duty.criterionId,
    requirementId: duty.requirementId,
    kind: duty.kind,
    duty: duty.duty,
    status: "pass",
    artifact: primaryHandoffArtifact,
  })),
  assumptions: [],
  risks: [],
  followUps: [],
};
const rawSpecialistHandoff = new TextEncoder().encode(JSON.stringify(specialistHandoff));
const specialistHandoffVerificationResult = verifySpecialistHandoff(
  specialistPackage,
  retainedSpecialistExpectation,
  rawSpecialistHandoff,
);
if (!specialistHandoffVerificationResult.ok || specialistHandoffVerificationResult.value === null) {
  throw new Error("The installed specialist handoff verifier rejected its typed handoff.");
}
const verifiedSpecialistHandoff: VerifiedSpecialistHandoff =
  specialistHandoffVerificationResult.value;
const specialistHandoffAssessmentResult = assessSpecialistHandoffs(
  specialistPackage,
  retainedSpecialistExpectation,
  specialistBlueprint.id,
  [],
);
if (
  !specialistHandoffAssessmentResult.ok ||
  specialistHandoffAssessmentResult.value === null ||
  !specialistHandoffAssessmentResult.value.integrationReady
) {
  throw new Error("The installed specialist fan-in assessor did not approve integration.");
}
const specialistHandoffAssessment: SpecialistHandoffSetAssessment =
  specialistHandoffAssessmentResult.value;

console.log(
  JSON.stringify({
    approvalBoundVerification: true,
    artifactSource: "installed-package-typescript",
    candidateAnalysis: specialistAnalysis.selectionStatus === "selected",
    fanInReady: specialistHandoffAssessment.integrationReady,
    handoffVerified: verifiedSpecialistHandoff.kind === "VerifiedSpecialistHandoff",
    specialistAgents: specialistCompilation.blueprints.length,
    specialistFiles: specialistPackage.files.length,
  }),
);

void [
  providerNeutralDeclarations,
  specialistApiVersion,
  specialistKinds,
  specialistLimits,
  specialistContextKinds,
  specialistEvidenceDuties,
  specialistSearchModes,
  specialistPermissionKindIsExact,
  specialistPermissionKinds,
  specialistCandidateOrigins,
  specialistCandidateRejections,
  specialistComparatorFields,
  authorityProjection,
  specialistCompilation,
  specialistPackage,
  retainedSpecialistExpectation,
  verifiedSpecialistPackage,
  specialistAnalysis,
  specialistHandoff,
  specialistHandoffAssessment,
  verifiedSpecialistHandoff,
];
