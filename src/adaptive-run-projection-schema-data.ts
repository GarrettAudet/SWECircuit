const routingSchemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/runtime-routing.schema.json";
const specialistSchemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-compiler.schema.json";
const specialistRunSchemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-run.schema.json";

const digest = { type: "string", pattern: "^sha256:[0-9a-f]{64}$" };
const identifier = { type: "string", minLength: 1, maxLength: 128 };
const text = { type: "string", maxLength: 16384 };
const identifiers = {
  type: "array",
  maxItems: 256,
  uniqueItems: true,
  items: identifier,
};
const truth = {
  enum: [
    "kernel_derived",
    "binding_verified",
    "host_attested",
    "specialist_verified",
    "unresolved",
  ],
};
const outcome = {
  enum: ["pass", "fix", "diagnose", "clarify", "redesign", "split", "block", "learn"],
};

function closed(
  properties: Readonly<Record<string, unknown>>,
  required: readonly string[],
): Readonly<Record<string, unknown>> {
  return {
    type: "object",
    properties,
    required,
    additionalProperties: false,
  };
}

const contextUse = closed(
  {
    sourceId: identifier,
    kind: { enum: ["repository", "documentation", "conversation", "memory", "evidence"] },
    locator: text,
    digest,
    bytes: { type: "integer", minimum: 0, maximum: 134217728 },
    purposes: identifiers,
    workUnitIds: identifiers,
    readScope: text,
  },
  ["sourceId", "kind", "locator", "digest", "bytes", "purposes", "workUnitIds"],
);

const scope = closed(
  {
    read: identifiers,
    write: identifiers,
    conflictZones: identifiers,
  },
  ["read", "write", "conflictZones"],
);

const authority = closed(
  {
    requiredCapabilities: identifiers,
    scope,
    permissions: {
      type: "array",
      maxItems: 64,
      items: { $ref: "#/$defs/permission" },
    },
    forbiddenEffects: {
      type: "array",
      maxItems: 128,
      uniqueItems: true,
      items: text,
    },
  },
  ["requiredCapabilities", "scope", "permissions", "forbiddenEffects"],
);

const evidenceDuty = closed(
  {
    criterionId: identifier,
    criterion: text,
    requirementId: identifier,
    kind: {
      enum: [
        "artifact",
        "command",
        "test",
        "review",
        "decision",
        "commit",
        "digest",
        "handoff",
        "memory",
      ],
    },
    duty: { enum: ["produce", "verify", "review"] },
    description: text,
    independentFromProducer: { type: "boolean" },
  },
  [
    "criterionId",
    "criterion",
    "requirementId",
    "kind",
    "duty",
    "description",
    "independentFromProducer",
  ],
);

const assignmentInspection = closed(
  {
    agentId: { $ref: `${routingSchemaId}#/$defs/identifier` },
    blueprintDigest: { $ref: `${routingSchemaId}#/$defs/digest` },
    calibrationRowId: { $ref: `${routingSchemaId}#/$defs/identifier` },
    profileId: { $ref: `${routingSchemaId}#/$defs/identifier` },
    effortId: { $ref: `${routingSchemaId}#/$defs/identifier` },
    independenceDomain: { $ref: `${routingSchemaId}#/$defs/identifier` },
    requiredTools: { $ref: `${routingSchemaId}#/$defs/logicalSet` },
    requiredSkills: { $ref: `${routingSchemaId}#/$defs/logicalSet` },
    requiredIsolationFeatures: { $ref: `${routingSchemaId}#/$defs/logicalSet` },
    requiredPermissionFeatures: { $ref: `${routingSchemaId}#/$defs/logicalSet` },
    observability: { $ref: `${routingSchemaId}#/$defs/observability` },
    alternatives: {
      type: "array",
      maxItems: 3072,
      items: { $ref: `${routingSchemaId}#/$defs/rowEvaluation` },
    },
    rejectedAlternatives: {
      type: "array",
      maxItems: 3072,
      items: { $ref: `${routingSchemaId}#/$defs/rowEvaluation` },
    },
    selectionReason: {
      enum: ["lowest_exact_vector", "lowest_bounded_evaluated_vector", "owner_override"],
    },
    override: {
      oneOf: [{ $ref: `${routingSchemaId}#/$defs/override` }, { type: "null" }],
    },
    truth: { const: "kernel_derived" },
  },
  [
    "agentId",
    "blueprintDigest",
    "calibrationRowId",
    "profileId",
    "effortId",
    "independenceDomain",
    "requiredTools",
    "requiredSkills",
    "requiredIsolationFeatures",
    "requiredPermissionFeatures",
    "observability",
    "alternatives",
    "rejectedAlternatives",
    "selectionReason",
    "override",
    "truth",
  ],
);

const route = closed(
  {
    agentId: { oneOf: [identifier, { type: "null" }] },
    outcome,
    reason: {
      enum: [
        "binding_mismatch",
        "materialization_mismatch",
        "event_chain_invalid",
        "host_effect_uncertain",
        "liveness_failure",
        "unknown_host_status",
        "result_capture_invalid",
        "specialist_non_pass",
        "host_user_stop",
        "all_handoffs_pass",
      ],
    },
    sourceDigests: {
      type: "array",
      maxItems: 512,
      items: digest,
    },
    truth,
  },
  ["agentId", "outcome", "reason", "sourceDigests", "truth"],
);

const nativeInspection = closed(
  {
    status: {
      enum: [
        "running",
        "waiting_permission",
        "completed",
        "failed",
        "stopped",
        "liveness_failed",
        "unknown",
        "unresolved",
        "authorized",
        "materialized",
        "settled",
      ],
    },
    truth,
    authorization: {
      oneOf: [{ $ref: "#/$defs/launchAuthorization" }, { type: "null" }],
    },
    materialization: {
      oneOf: [{ $ref: "#/$defs/materializationClaim" }, { type: "null" }],
    },
  },
  ["status", "truth", "authorization", "materialization"],
);

const agentInspection = closed(
  {
    agentId: identifier,
    blueprintDigest: digest,
    modules: {
      type: "array",
      minItems: 1,
      maxItems: 64,
      items: { $ref: `${specialistSchemaId}#/$defs/moduleBinding` },
    },
    workUnitIds: identifiers,
    dependencies: identifiers,
    contextUses: {
      type: "array",
      maxItems: 256,
      items: contextUse,
    },
    authority,
    evidenceDuties: {
      type: "array",
      maxItems: 512,
      items: evidenceDuty,
    },
    assignment: assignmentInspection,
    profileId: identifier,
    effortId: identifier,
    status: {
      enum: [
        "awaiting_authorization",
        "authorized",
        "materialized",
        "host_active",
        "needs_attention",
        "settled",
      ],
    },
    native: nativeInspection,
    acceptedEvidence: {
      oneOf: [{ $ref: `${specialistRunSchemaId}#/$defs/acceptedEvidence` }, { type: "null" }],
    },
    truth,
    route: { oneOf: [route, { type: "null" }] },
  },
  [
    "agentId",
    "blueprintDigest",
    "modules",
    "workUnitIds",
    "dependencies",
    "contextUses",
    "authority",
    "evidenceDuties",
    "assignment",
    "profileId",
    "effortId",
    "status",
    "native",
    "acceptedEvidence",
    "truth",
    "route",
  ],
);

const metrics = closed(
  {
    agentCount: { type: "integer", minimum: 1, maximum: 16 },
    projectedMakespan: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    peakConcurrency: { type: "integer", minimum: 1, maximum: 16 },
    conflictPairs: { type: "integer", minimum: 0, maximum: 120 },
    handoffCount: { type: "integer", minimum: 0, maximum: 120 },
    duplicatedContextBytes: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    duplicatedPermissionScopes: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    totalWorkWeight: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    totalStartupCost: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    totalHandoffCost: { type: "integer", minimum: 0, maximum: 9007199254740991 },
  },
  [
    "agentCount",
    "projectedMakespan",
    "peakConcurrency",
    "conflictPairs",
    "handoffCount",
    "duplicatedContextBytes",
    "duplicatedPermissionScopes",
    "totalWorkWeight",
    "totalStartupCost",
    "totalHandoffCost",
  ],
);

const selectionReason = closed(
  {
    kind: { enum: ["serial_selected", "serial_ineligible", "lower_metric", "canonical_tiebreak"] },
    decisiveField: {
      enum: [
        "serial_baseline",
        "agent_limit",
        "dependency_cycle",
        "evidence_independence",
        "missing_work_unit",
        "duplicate_work_unit",
        "unknown_work_unit",
        "projectedMakespan",
        "conflictPairs",
        "handoffCount",
        "duplicatedContextBytes",
        "duplicatedPermissionScopes",
        "agentCount",
        "canonicalPartitionIdentity",
      ],
    },
    selectedValue: {
      oneOf: [{ type: "integer", minimum: 0, maximum: 9007199254740991 }, text, { type: "null" }],
    },
    serialValue: {
      oneOf: [{ type: "integer", minimum: 0, maximum: 9007199254740991 }, text, { type: "null" }],
    },
    serialRejectionCodes: {
      type: "array",
      maxItems: 6,
      uniqueItems: true,
      items: {
        enum: [
          "agent_limit",
          "dependency_cycle",
          "evidence_independence",
          "missing_work_unit",
          "duplicate_work_unit",
          "unknown_work_unit",
        ],
      },
    },
  },
  ["kind", "decisiveField", "selectedValue", "serialValue", "serialRejectionCodes"],
);

const launchWave = closed(
  {
    start: { type: "integer", minimum: 0, maximum: 9007199254740991 },
    agentIds: {
      type: "array",
      minItems: 1,
      maxItems: 16,
      uniqueItems: true,
      items: identifier,
    },
  },
  ["start", "agentIds"],
);

const executionMode = closed(
  {
    selectedCandidateId: identifier,
    selectedAgentCount: { type: "integer", minimum: 1, maximum: 16 },
    serialBaselineMetrics: metrics,
    selectedMetrics: metrics,
    selectionReason,
    launchWaves: {
      type: "array",
      minItems: 1,
      maxItems: 16,
      items: launchWave,
    },
    truth: { const: "kernel_derived" },
  },
  [
    "selectedCandidateId",
    "selectedAgentCount",
    "serialBaselineMetrics",
    "selectedMetrics",
    "selectionReason",
    "launchWaves",
    "truth",
  ],
);

const nextAction = closed(
  {
    id: identifier,
    actor: { enum: ["external_host", "integration_owner", "user"] },
    kind: {
      enum: [
        "review_assignment",
        "authorize_launch",
        "launch_native_agent",
        "observe_native_agent",
        "respond_to_permission",
        "stop_native_agent",
        "record_steering",
        "capture_result",
        "create_successor_run",
        "integrate_and_verify",
      ],
    },
    availability: { enum: ["enabled", "blocked", "unavailable"] },
    reasonCode: identifier,
    sourceDigests: {
      type: "array",
      maxItems: 512,
      items: digest,
    },
  },
  ["id", "actor", "kind", "availability", "reasonCode", "sourceDigests"],
);

const hostIdentity = closed(
  {
    hostId: identifier,
    adapterId: identifier,
    adapterRevision: identifier,
    authorizationIssuerId: identifier,
  },
  ["hostId", "adapterId", "adapterRevision", "authorizationIssuerId"],
);

const commonProjectionProperties = {
  runId: identifier,
  runRevision: { type: "integer", minimum: 1, maximum: 1000000 },
  goal: { $ref: `${specialistRunSchemaId}#/$defs/goalBinding` },
  workspaceBaselineDigest: digest,
  host: hostIdentity,
  predecessorRun: { oneOf: [{ $ref: "#/$defs/predecessor" }, { type: "null" }] },
  sessionDigest: digest,
  assignmentDigest: digest,
  compilationDigest: digest,
  packageDigest: digest,
  stage: {
    enum: ["awaiting_authorization", "host_active", "needs_attention", "integration_ready"],
  },
  executionMode,
  agents: {
    type: "array",
    minItems: 1,
    maxItems: 16,
    items: agentInspection,
  },
  steering: {
    type: "array",
    maxItems: 512,
    items: { $ref: "#/$defs/steeringAuthorization" },
  },
  routes: {
    type: "array",
    maxItems: 16,
    items: route,
  },
  nextActions: {
    type: "array",
    maxItems: 32,
    items: nextAction,
  },
  integrationReady: { type: "boolean" },
};

const commonProjectionRequired = [
  "apiVersion",
  "kind",
  "runId",
  "runRevision",
  "goal",
  "workspaceBaselineDigest",
  "host",
  "predecessorRun",
  "sessionDigest",
  "assignmentDigest",
  "compilationDigest",
  "packageDigest",
  "stage",
  "executionMode",
  "agents",
  "steering",
  "routes",
  "nextActions",
  "integrationReady",
];

const inspection = closed(
  {
    apiVersion: { const: "swecircuit/adaptive-run/v1alpha1" },
    kind: { const: "AdaptiveRunInspection" },
    ...commonProjectionProperties,
    contentDigest: digest,
  },
  [...commonProjectionRequired, "contentDigest"],
);

const runView = closed(
  {
    apiVersion: { const: "swecircuit/adaptive-run/v1alpha1" },
    kind: { const: "RunView" },
    ...commonProjectionProperties,
    status: {
      enum: [
        "Planning",
        "Ready",
        "Running (host-reported)",
        "Needs attention",
        "Ready to integrate",
        "Complete",
      ],
    },
    blockers: {
      type: "array",
      maxItems: 16,
      items: route,
    },
    nextAction: { oneOf: [nextAction, { type: "null" }] },
    sourceInspectionDigest: digest,
    contentDigest: digest,
  },
  [
    ...commonProjectionRequired,
    "status",
    "blockers",
    "nextAction",
    "sourceInspectionDigest",
    "contentDigest",
  ],
);

export const ADAPTIVE_RUN_PROJECTION_DEFS = Object.freeze({
  contextUse,
  scope,
  authority,
  evidenceDuty,
  assignmentInspection,
  route,
  nativeInspection,
  agentInspection,
  metrics,
  selectionReason,
  launchWave,
  executionMode,
  nextAction,
  hostIdentity,
  inspection,
  runView,
});
