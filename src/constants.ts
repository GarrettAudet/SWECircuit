export const API_VERSION = "swecircuit/v1alpha1" as const;
export const EVENT_TYPE_VERSION = "1.0.0" as const;
export const SPECIALIST_API_VERSION = "swecircuit/specialist/v1alpha1" as const;

export const SPECIALIST_KINDS = [
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
] as const;

export const SPECIALIST_LIMITS = Object.freeze({
  inputBytes: 1_048_576,
  outputBytes: 4_194_304,
  textBytes: 16_384,
  identifierBytes: 128,
  workUnits: 64,
  exactSearchWorkUnits: 8,
  agents: 16,
  concurrency: 16,
  proposedCandidates: 32,
  candidateGroups: 16,
  acceptanceCriteria: 128,
  evidenceRequirements: 512,
  contextSources: 256,
  contextSourceBytes: 67_108_864,
  contextTotalBytes: 268_435_456,
  permissions: 64,
  scopes: 256,
  capabilities: 128,
  dependencies: 256,
  ports: 128,
  retainedAlternatives: 8,
  planningWeight: 1_000_000,
  handoffBytes: 1_048_576,
  handoffArtifacts: 128,
  handoffTextItems: 256,
});

export const ARTIFACT_KINDS = [
  "Project",
  "Module",
  "Circuit",
  "WorkPacket",
  "RunEvent",
  "AdapterManifest",
] as const;

export type ArtifactKind = (typeof ARTIFACT_KINDS)[number];

export const LIMITS = Object.freeze({
  artifactBytes: 1_048_576,
  jsonDepth: 64,
  projectArtifacts: 10_000,
  circuitEdges: 10_000,
  jsonlLineBytes: 262_144,
  traceBytes: 67_108_864,
  traceEvents: 100_000,
  traceSummaryEvidence: 10_000,
  executionSnapshotNodes: 100_000,
  executionGrantPermissions: 64,
  executionAbortAcknowledgementMs: 60_000,
});

export const EXPECTED_KIND_BY_DIRECTORY = Object.freeze({
  adapters: "AdapterManifest",
  circuits: "Circuit",
  modules: "Module",
  "work-packets": "WorkPacket",
} satisfies Readonly<Record<string, ArtifactKind>>);

export function isArtifactKind(value: string): value is ArtifactKind {
  return (ARTIFACT_KINDS as readonly string[]).includes(value);
}
