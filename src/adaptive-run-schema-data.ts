const schemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/adaptive-run.schema.json";
const routingSchemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/runtime-routing.schema.json";
const specialistRunSchemaId =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-run.schema.json";

const digest = { type: "string", pattern: "^sha256:[0-9a-f]{64}$" };
const identifier = { type: "string", minLength: 1, maxLength: 128 };
const text = { type: "string", maxLength: 16384 };
const stringSet = {
  type: "array",
  maxItems: 256,
  uniqueItems: true,
  items: identifier,
};
const observability = {
  type: "object",
  properties: {
    model: { enum: ["observed", "host_attestation_allowed"] },
    effort: { enum: ["observed", "host_attestation_allowed"] },
    tools: { enum: ["observed", "host_attestation_allowed"] },
    skills: { enum: ["observed", "host_attestation_allowed"] },
    isolation: { enum: ["observed", "host_attestation_allowed"] },
    permissions: { enum: ["observed", "host_attestation_allowed"] },
    workspace: { enum: ["observed", "host_attestation_allowed"] },
    context: { enum: ["observed", "host_attestation_allowed"] },
  },
  required: [
    "model",
    "effort",
    "tools",
    "skills",
    "isolation",
    "permissions",
    "workspace",
    "context",
  ],
  additionalProperties: false,
};
const permission = {
  type: "object",
  properties: {
    kind: {
      enum: [
        "filesystem.read",
        "filesystem.write",
        "network.connect",
        "process.spawn",
        "secrets.read",
      ],
    },
    scopes: stringSet,
  },
  required: ["kind", "scopes"],
  additionalProperties: false,
};
const contextDelivery = {
  type: "object",
  properties: {
    sourceId: identifier,
    locator: text,
    digest,
    bytes: { type: "integer", minimum: 0, maximum: 134217728 },
    delivery: { enum: ["host_context", "authorized_filesystem_read"] },
  },
  required: ["sourceId", "locator", "digest", "bytes", "delivery"],
  additionalProperties: false,
};
const launchCommand = {
  type: "object",
  properties: {
    agentContractPath: text,
    agentContractDigest: digest,
    agentContractBytes: { type: "integer", minimum: 0, maximum: 4194304 },
    contextSources: {
      type: "array",
      maxItems: 256,
      items: contextDelivery,
    },
    profileId: identifier,
    effortId: identifier,
    tools: stringSet,
    skills: stringSet,
    isolationFeatures: stringSet,
    permissions: {
      type: "array",
      maxItems: 64,
      items: permission,
    },
    observability,
    contentDigest: digest,
  },
  required: [
    "agentContractPath",
    "agentContractDigest",
    "agentContractBytes",
    "contextSources",
    "profileId",
    "effortId",
    "tools",
    "skills",
    "isolationFeatures",
    "permissions",
    "observability",
    "contentDigest",
  ],
  additionalProperties: false,
};
const predecessor = {
  type: "object",
  properties: {
    runId: identifier,
    sessionDigest: digest,
    terminalOutcome: {
      enum: ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"],
    },
    evidenceDigest: digest,
  },
  required: ["runId", "sessionDigest", "terminalOutcome", "evidenceDigest"],
  additionalProperties: false,
};
const expectation = {
  type: "object",
  properties: {
    compilationDigest: digest,
    packageDigest: digest,
    policyDigest: digest,
    calibrationDigest: digest,
    inventoryDigest: digest,
    assignmentDigest: digest,
    runId: identifier,
    runRevision: { type: "integer", minimum: 1, maximum: 1000000 },
    predecessorRun: { anyOf: [predecessor, { type: "null" }] },
    workspaceBaselineDigest: digest,
    authorizedHostId: identifier,
    authorizedAdapterId: identifier,
    authorizedAdapterRevision: identifier,
    authorizationIssuerId: identifier,
    maxHostEvents: { type: "integer", minimum: 1, maximum: 512 },
    lineageDepth: { type: "integer", minimum: 0, maximum: 8 },
    maxLineageDepth: { type: "integer", minimum: 0, maximum: 8 },
  },
  required: [
    "compilationDigest",
    "packageDigest",
    "policyDigest",
    "calibrationDigest",
    "inventoryDigest",
    "assignmentDigest",
    "runId",
    "runRevision",
    "predecessorRun",
    "workspaceBaselineDigest",
    "authorizedHostId",
    "authorizedAdapterId",
    "authorizedAdapterRevision",
    "authorizationIssuerId",
    "maxHostEvents",
    "lineageDepth",
    "maxLineageDepth",
  ],
  additionalProperties: false,
};
const evidenceBinding = {
  type: "object",
  properties: {
    id: identifier,
    kind: { enum: ["log", "status", "configuration", "error"] },
    locator: text,
    digest,
    bytes: { type: "integer", minimum: 0, maximum: 134217728 },
  },
  required: ["id", "kind", "locator", "digest", "bytes"],
  additionalProperties: false,
};
const materializationField = {
  type: "object",
  properties: {
    field: {
      enum: [
        "model",
        "effort",
        "tools",
        "skills",
        "isolation",
        "permissions",
        "workspace",
        "context",
      ],
    },
    status: { enum: ["observed", "host_attested_unobservable", "unavailable"] },
    expectedDigest: digest,
    observedDigest: { anyOf: [digest, { type: "null" }] },
  },
  required: ["field", "status", "expectedDigest", "observedDigest"],
  additionalProperties: false,
};
const commonEventProperties = {
  apiVersion: { const: "swecircuit/adaptive-run/v1alpha1" },
  runId: identifier,
  runRevision: { type: "integer", minimum: 1, maximum: 1000000 },
  sequence: { type: "integer", minimum: 1, maximum: 512 },
  priorEventDigest: { anyOf: [digest, { type: "null" }] },
  agentId: identifier,
  blueprintDigest: digest,
  assignmentDigest: digest,
  hostId: identifier,
  adapterId: identifier,
  adapterRevision: identifier,
  attestedBy: identifier,
};
const commonEventRequired = [
  "apiVersion",
  "kind",
  "runId",
  "runRevision",
  "sequence",
  "priorEventDigest",
  "agentId",
  "blueprintDigest",
  "assignmentDigest",
  "hostId",
  "adapterId",
  "adapterRevision",
  "attestedBy",
];
function eventSchema(
  kind: string,
  properties: Readonly<Record<string, unknown>>,
  required: readonly string[],
) {
  return {
    type: "object",
    properties: {
      ...commonEventProperties,
      kind: { const: kind },
      ...properties,
    },
    required: [...commonEventRequired, ...required],
    additionalProperties: false,
  };
}
const launchAuthorization = eventSchema(
  "HostLaunchAuthorization",
  {
    attemptId: identifier,
    authorizationId: identifier,
    workspaceBaselineDigest: digest,
    command: launchCommand,
  },
  ["attemptId", "authorizationId", "workspaceBaselineDigest", "command"],
);
const materializationClaim = eventSchema(
  "HostMaterializationClaim",
  {
    attemptId: identifier,
    authorizationEventDigest: digest,
    nativeHandle: identifier,
    fields: {
      type: "array",
      minItems: 8,
      maxItems: 8,
      items: materializationField,
    },
  },
  ["attemptId", "authorizationEventDigest", "nativeHandle", "fields"],
);
const lifecycleObservation = eventSchema(
  "HostLifecycleObservation",
  {
    attemptId: identifier,
    authorizationEventDigest: digest,
    materializationEventDigest: digest,
    nativeHandle: identifier,
    status: {
      enum: [
        "running",
        "waiting_permission",
        "completed",
        "failed",
        "stopped",
        "liveness_failed",
        "unknown",
      ],
    },
    evidence: {
      type: "array",
      maxItems: 512,
      items: evidenceBinding,
    },
  },
  [
    "attemptId",
    "authorizationEventDigest",
    "materializationEventDigest",
    "nativeHandle",
    "status",
    "evidence",
  ],
);
const steeringAuthorization = eventSchema(
  "HostSteeringAuthorization",
  {
    attemptId: identifier,
    authorizationEventDigest: digest,
    requestedBy: identifier,
    message: text,
    rationale: text,
  },
  ["attemptId", "authorizationEventDigest", "requestedBy", "message", "rationale"],
);
const adapterFailure = eventSchema(
  "HostAdapterFailure",
  {
    attemptId: { anyOf: [identifier, { type: "null" }] },
    phase: {
      enum: ["inventory", "authorization", "materialization", "lifecycle", "result_capture"],
    },
    certainty: { enum: ["no_effect", "effect_possible", "effect_observed"] },
    code: identifier,
    evidence: {
      type: "array",
      maxItems: 512,
      items: evidenceBinding,
    },
  },
  ["attemptId", "phase", "certainty", "code", "evidence"],
);
const resultCapture = eventSchema(
  "HostResultCapture",
  {
    attemptId: identifier,
    authorizationEventDigest: digest,
    materializationEventDigest: digest,
    terminalLifecycleEventDigest: digest,
    steeringEventDigests: {
      type: "array",
      maxItems: 512,
      uniqueItems: true,
      items: digest,
    },
    rawHandoffEncoding: { const: "base64" },
    rawHandoffBytes: { type: "integer", minimum: 0, maximum: 1048576 },
    rawHandoffDigest: digest,
    rawHandoffBase64: { type: "string", maxLength: 1398104 },
  },
  [
    "attemptId",
    "authorizationEventDigest",
    "materializationEventDigest",
    "terminalLifecycleEventDigest",
    "steeringEventDigests",
    "rawHandoffEncoding",
    "rawHandoffBytes",
    "rawHandoffDigest",
    "rawHandoffBase64",
  ],
);
const event = {
  oneOf: [
    launchAuthorization,
    materializationClaim,
    lifecycleObservation,
    steeringAuthorization,
    adapterFailure,
    resultCapture,
  ],
};
const acceptedEvent = {
  type: "object",
  properties: {
    sequence: { type: "integer", minimum: 1, maximum: 512 },
    kind: {
      enum: [
        "HostLaunchAuthorization",
        "HostMaterializationClaim",
        "HostLifecycleObservation",
        "HostSteeringAuthorization",
        "HostAdapterFailure",
        "HostResultCapture",
      ],
    },
    agentId: identifier,
    attemptId: { anyOf: [identifier, { type: "null" }] },
    rawEncoding: { const: "base64" },
    rawBytes: { type: "integer", minimum: 1, maximum: 1048576 },
    rawDigest: digest,
    rawBase64: { type: "string", minLength: 4, maxLength: 1398104 },
  },
  required: [
    "sequence",
    "kind",
    "agentId",
    "attemptId",
    "rawEncoding",
    "rawBytes",
    "rawDigest",
    "rawBase64",
  ],
  additionalProperties: false,
};
const session = {
  type: "object",
  properties: {
    apiVersion: { const: "swecircuit/adaptive-run/v1alpha1" },
    kind: { const: "AdaptiveRunSession" },
    expectation,
    assignment: { $ref: `${routingSchemaId}#/$defs/compilation` },
    specialistRun: { $ref: `${specialistRunSchemaId}#/$defs/session` },
    hostEvents: {
      type: "array",
      maxItems: 512,
      items: acceptedEvent,
    },
    contentDigest: digest,
  },
  required: [
    "apiVersion",
    "kind",
    "expectation",
    "assignment",
    "specialistRun",
    "hostEvents",
    "contentDigest",
  ],
  additionalProperties: false,
};

const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: schemaId,
  oneOf: [
    { $ref: "#/$defs/expectation" },
    { $ref: "#/$defs/launchCommand" },
    { $ref: "#/$defs/event" },
    { $ref: "#/$defs/session" },
  ],
  $defs: {
    expectation,
    launchCommand,
    event,
    acceptedEvent,
    session,
  },
};

export const ADAPTIVE_RUN_SCHEMA_SOURCE = JSON.stringify(schema, null, 2);
