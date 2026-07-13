export const API_VERSION = "swecircuit/v1alpha1" as const;
export const EVENT_TYPE_VERSION = "1.0.0" as const;

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
