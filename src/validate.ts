import { EXPECTED_KIND_BY_DIRECTORY, LIMITS, type ArtifactKind } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import type {
  ArtifactEnvelope,
  ArtifactRecord,
  CircuitArtifact,
  JsonObject,
  JsonValue,
  ProjectArtifact,
  ProjectMemberArtifact,
} from "./model.js";
import { inspectRelativeArtifactPath, readContainedJsonFile, resolveProjectRoot } from "./path.js";
import { dispatchArtifact, validateArtifactSchema } from "./schema.js";
import { validateProjectSemantics } from "./semantics.js";
import type {
  Diagnostic,
  OperationResult,
  ProjectValidationSummary,
  ValidateProjectOptions,
  ValidatedArtifactSummary,
} from "./types.js";

function isObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function property(object: JsonObject, key: string): JsonValue | undefined {
  return object[key];
}

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function projectPathPreflight(value: JsonValue, diagnostics: Diagnostic[]): void {
  if (!isObject(value)) {
    return;
  }
  const spec = property(value, "spec");
  if (!isObject(spec)) {
    return;
  }
  const artifacts = property(spec, "artifacts");
  if (!Array.isArray(artifacts)) {
    return;
  }

  for (const [index, candidate] of artifacts.entries()) {
    if (typeof candidate !== "string") {
      continue;
    }
    const code = inspectRelativeArtifactPath(candidate);
    if (code !== null) {
      diagnostics.push(createDiagnostic(code, ".", `/spec/artifacts/${index}`));
    }
  }
}

function collectionLimitPreflight(
  value: JsonValue,
  artifact: string,
  diagnostics: Diagnostic[],
): void {
  if (!isObject(value)) {
    return;
  }
  const spec = property(value, "spec");
  if (!isObject(spec)) {
    return;
  }
  if (property(value, "kind") === "Project") {
    const artifacts = property(spec, "artifacts");
    if (Array.isArray(artifacts) && artifacts.length > LIMITS.projectArtifacts) {
      diagnostics.push(createDiagnostic("SC5003", artifact, "/spec/artifacts"));
    }
  }
  if (property(value, "kind") === "Circuit") {
    const routes = property(spec, "routes");
    if (Array.isArray(routes) && routes.length > LIMITS.circuitEdges) {
      diagnostics.push(createDiagnostic("SC5004", artifact, "/spec/routes"));
    }
  }
}

function expectedKindForArtifact(candidate: string): ArtifactKind | null {
  const directory = candidate.split("/")[1];
  return directory === undefined
    ? null
    : (EXPECTED_KIND_BY_DIRECTORY[directory as keyof typeof EXPECTED_KIND_BY_DIRECTORY] ?? null);
}

function summaryForRecord(record: ArtifactRecord<ProjectMemberArtifact>): ValidatedArtifactSummary {
  const { id, version } = record.value.metadata;
  return version === undefined
    ? Object.freeze({ artifact: record.artifact, kind: record.value.kind, id })
    : Object.freeze({ artifact: record.artifact, kind: record.value.kind, id, version });
}

function validateMemberArtifact(
  root: string,
  realRoot: string,
  candidate: string,
  diagnostics: Diagnostic[],
): ArtifactRecord<ProjectMemberArtifact> | null {
  const diagnosticStart = diagnostics.length;
  const expectedKind = expectedKindForArtifact(candidate);
  if (expectedKind === null) {
    diagnostics.push(createDiagnostic("SC2002", candidate, "/kind"));
    return null;
  }

  const file = readContainedJsonFile(root, realRoot, candidate, "SC2001");
  diagnostics.push(...file.diagnostics);
  const value = file.parsed?.value ?? null;
  if (value === null || hasErrors(file.diagnostics)) {
    return null;
  }

  const dispatch = dispatchArtifact(value, candidate);
  diagnostics.push(...dispatch.diagnostics);
  if (dispatch.kind === null) {
    return null;
  }
  if (dispatch.kind !== expectedKind) {
    diagnostics.push(createDiagnostic("SC2002", candidate, "/kind"));
  }

  collectionLimitPreflight(value, candidate, diagnostics);
  if (hasErrors(diagnostics.slice(diagnosticStart))) {
    return null;
  }
  const schemaDiagnostics = validateArtifactSchema(value, dispatch.kind, candidate);
  diagnostics.push(...schemaDiagnostics);
  if (dispatch.kind !== expectedKind || hasErrors(schemaDiagnostics)) {
    return null;
  }

  return Object.freeze({
    artifact: candidate,
    value: value as unknown as ProjectMemberArtifact,
  });
}

export function validateProject(
  options: ValidateProjectOptions = {},
): OperationResult<ProjectValidationSummary> {
  const diagnostics: Diagnostic[] = [];
  const rootResult = resolveProjectRoot(options.project);
  diagnostics.push(...rootResult.diagnostics);
  if (rootResult.root === null || rootResult.realRoot === null) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }

  const projectFile = readContainedJsonFile(
    rootResult.root,
    rootResult.realRoot,
    "swecircuit.json",
    "SC1001",
  );
  diagnostics.push(...projectFile.diagnostics);
  const projectValue = projectFile.parsed?.value ?? null;
  if (projectValue === null || hasErrors(projectFile.diagnostics)) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }

  const dispatch = dispatchArtifact(projectValue, "swecircuit.json");
  diagnostics.push(...dispatch.diagnostics);
  if (dispatch.kind === null) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }
  if (dispatch.kind !== "Project") {
    diagnostics.push(createDiagnostic("SC2002", "swecircuit.json", "/kind"));
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }

  projectPathPreflight(projectValue, diagnostics);
  collectionLimitPreflight(projectValue, "swecircuit.json", diagnostics);
  if (hasErrors(diagnostics)) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }
  const projectSchemaDiagnostics = validateArtifactSchema(
    projectValue,
    "Project",
    "swecircuit.json",
  );
  diagnostics.push(...projectSchemaDiagnostics);
  if (hasErrors(projectSchemaDiagnostics)) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }

  const project = projectValue as unknown as ProjectArtifact;
  const records: ArtifactRecord<ProjectMemberArtifact>[] = [];
  for (const candidate of project.spec.artifacts) {
    const record = validateMemberArtifact(
      rootResult.root,
      rootResult.realRoot,
      candidate,
      diagnostics,
    );
    if (record !== null) {
      records.push(record);
    }
  }
  if (hasErrors(diagnostics)) {
    return operationResult<ProjectValidationSummary>(diagnostics, null);
  }

  diagnostics.push(...validateProjectSemantics(project, records));
  const artifacts = Object.freeze(
    records
      .map(summaryForRecord)
      .sort((left, right) =>
        left.artifact < right.artifact ? -1 : left.artifact > right.artifact ? 1 : 0,
      ),
  );
  return operationResult(
    diagnostics,
    Object.freeze({
      projectId: project.metadata.id,
      projectArtifact: "swecircuit.json" as const,
      artifacts,
    }),
  );
}

export function validateArtifactValue(
  value: JsonValue,
  artifact = "artifact.json",
): OperationResult<ArtifactEnvelope> {
  const diagnostics: Diagnostic[] = [];
  const dispatch = dispatchArtifact(value, artifact);
  diagnostics.push(...dispatch.diagnostics);
  if (dispatch.kind === null) {
    return operationResult<ArtifactEnvelope>(diagnostics, null);
  }
  collectionLimitPreflight(value, artifact, diagnostics);
  if (hasErrors(diagnostics)) {
    return operationResult<ArtifactEnvelope>(diagnostics, null);
  }
  diagnostics.push(...validateArtifactSchema(value, dispatch.kind, artifact));
  return operationResult(
    diagnostics,
    hasErrors(diagnostics) ? null : (value as unknown as ArtifactEnvelope),
  );
}

export type ValidatedCircuit = CircuitArtifact;
