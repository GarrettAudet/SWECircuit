import {
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
  type SPECIALIST_KINDS,
  SPECIALIST_LIMITS,
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
  "TaskAuthorityProjection",
  "AgentBlueprint",
  "AgentBlueprintCompilation",
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
      statement: "The installed consumer context is current.",
      rationale: "The exact context declaration is bound into the goal digest.",
    },
  ],
  unresolvedDecisions: [
    {
      id: "decision.future-adapter",
      question: "Should a later release add another host adapter?",
      owner: "integration.owner",
      blocking: false,
      proceedRationale: "The current provider-neutral package is sufficient.",
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
      contextUses: [{ sourceId: "context.source", purpose: "Inspect the compiler boundary." }],
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
const specialistCompilationResult = compileAgentBlueprints(specialistRequest);
if (
  !authorityProjectionResult.ok ||
  authorityProjectionResult.value === null ||
  !specialistCompilationResult.ok ||
  specialistCompilationResult.value === null
) {
  throw new Error("The installed specialist declarations rejected their typed input.");
}
const authorityProjection: TaskAuthorityProjection = authorityProjectionResult.value;
const specialistCompilation: AgentBlueprintCompilation = specialistCompilationResult.value;
const specialistPackageResult = renderSpecialistPackage(specialistCompilation);
if (!specialistPackageResult.ok || specialistPackageResult.value === null) {
  throw new Error("The installed specialist renderer rejected its typed compilation.");
}
const specialistPackage: RenderedSpecialistPackage = specialistPackageResult.value;
// Models approval retained by the host independently of the rendered package.
const retainedSpecialistExpectation = {
  compilationDigest: "sha256:d560d06b54a0229583fa6ac054af8facf669ceda5b8ff7c5c6a8a4080bd4416f",
  packageDigest: "sha256:ba727d6b8fb59ce779f5a128f3e6fe61be3322fb5ab63cc7f5163087435c5c94",
} satisfies SpecialistPackageExpectation;
const specialistVerificationResult = verifySpecialistPackage(
  specialistPackage,
  retainedSpecialistExpectation,
);
if (!specialistVerificationResult.ok || specialistVerificationResult.value === null) {
  throw new Error("The installed specialist verifier rejected its rendered package.");
}
const verifiedSpecialistPackage: RenderedSpecialistPackage = specialistVerificationResult.value;

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
];
