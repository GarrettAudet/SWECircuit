import {
  closeSync,
  constants,
  fstatSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readSync,
  realpathSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
  type BigIntStats,
} from "node:fs";
import { basename, resolve } from "node:path";
import { API_VERSION } from "./constants.js";
import { createDiagnostic, operationResult, type DiagnosticCode } from "./diagnostics.js";
import type { JsonValue, ProjectArtifact } from "./model.js";
import { inspectCanonicalArtifactPath, resolveProjectRoot } from "./path.js";
import type {
  Diagnostic,
  InitializeProjectOptions,
  OperationResult,
  ProjectInitializationSummary,
} from "./types.js";
import { validateArtifactValue, validateProject } from "./validate.js";

const CREATED_PATHS = Object.freeze([
  "swecircuit.json",
  "swecircuit",
  "swecircuit/modules",
  "swecircuit/circuits",
] as const);

export type InitializationCheckpoint =
  | "beforeCatalogCreate"
  | "afterCatalogCreateBeforeCapture"
  | "afterCatalogCreate"
  | "beforeModulesCreate"
  | "afterModulesCreateBeforeCapture"
  | "afterModulesCreate"
  | "beforeCircuitsCreate"
  | "afterCircuitsCreateBeforeCapture"
  | "afterCircuitsCreate"
  | "beforeManifestOpen"
  | "afterManifestOpenBeforeCapture"
  | "afterManifestOpen"
  | "afterManifestWrite"
  | "afterManifestFsync"
  | "beforeValidation"
  | "afterValidation"
  | "beforeManifestClose";

export interface InitializationHooks {
  readonly checkpoint?: (checkpoint: InitializationCheckpoint) => void;
}

type EntryKind = "directory" | "file";

interface EntryIdentity {
  readonly artifact: string;
  readonly canonical: string;
  readonly kind: EntryKind;
  readonly path: string;
  readonly stats: BigIntStats;
}

class InitializationFailure extends Error {
  readonly artifact: string;
  readonly code: DiagnosticCode;

  constructor(code: DiagnosticCode, artifact: string) {
    super(code);
    this.name = "InitializationFailure";
    this.code = code;
    this.artifact = artifact;
  }
}

class ValidationFailure extends Error {
  readonly diagnostics: readonly Diagnostic[];

  constructor(diagnostics: readonly Diagnostic[]) {
    super("Generated project validation failed.");
    this.name = "ValidationFailure";
    this.diagnostics = diagnostics;
  }
}

function errnoCode(error: unknown): string | null {
  return error instanceof Error && "code" in error && typeof error.code === "string"
    ? error.code
    : null;
}

function sameFile(left: BigIntStats, right: BigIntStats): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function pathKindMatches(stats: BigIntStats, kind: EntryKind): boolean {
  return kind === "directory" ? stats.isDirectory() : stats.isFile();
}

function trimSeparator(value: string): string {
  return value.replace(/^-+|-+$/g, "");
}

export function deriveProjectId(projectRoot: string): string {
  let candidate = trimSeparator(
    basename(projectRoot)
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-"),
  );
  if (candidate.length === 0) {
    return "project";
  }
  if (!/^[a-z]/.test(candidate)) {
    candidate = `project-${candidate}`;
  }
  candidate = trimSeparator(candidate.slice(0, 128));
  return candidate.length === 0 ? "project" : candidate;
}

function minimalProject(projectId: string): ProjectArtifact {
  return {
    apiVersion: API_VERSION,
    kind: "Project",
    metadata: { id: projectId },
    spec: { artifacts: [] },
  };
}

function expectedCanonical(realRoot: string, artifact: string): string {
  return artifact === "." ? realRoot : resolve(realRoot, ...artifact.split("/"));
}

function captureEntry(
  pathValue: string,
  artifact: string,
  kind: EntryKind,
  realRoot: string,
): EntryIdentity {
  let stats: BigIntStats;
  let canonical: string;
  try {
    stats = lstatSync(pathValue, { bigint: true });
    canonical = realpathSync.native(pathValue);
  } catch {
    throw new InitializationFailure("SC1001", artifact);
  }

  if (stats.isSymbolicLink() || !pathKindMatches(stats, kind)) {
    throw new InitializationFailure("SC1013", artifact);
  }
  const canonicalDiagnostic = inspectCanonicalArtifactPath(
    realRoot,
    expectedCanonical(realRoot, artifact),
    canonical,
  );
  if (canonicalDiagnostic !== null) {
    throw new InitializationFailure(canonicalDiagnostic, artifact);
  }
  return Object.freeze({ artifact, canonical, kind, path: pathValue, stats });
}

function captureManifestEntry(
  descriptor: number,
  pathValue: string,
  realRoot: string,
): EntryIdentity {
  let stats: BigIntStats;
  try {
    stats = fstatSync(descriptor, { bigint: true });
  } catch {
    throw new InitializationFailure("SC1001", "swecircuit.json");
  }
  if (!stats.isFile()) {
    throw new InitializationFailure("SC1013", "swecircuit.json");
  }
  return Object.freeze({
    artifact: "swecircuit.json",
    canonical: expectedCanonical(realRoot, "swecircuit.json"),
    kind: "file",
    path: pathValue,
    stats,
  });
}

function verifyEntry(entry: EntryIdentity, realRoot: string): void {
  const current = captureEntry(entry.path, entry.artifact, entry.kind, realRoot);
  if (!sameFile(current.stats, entry.stats) || current.canonical !== entry.canonical) {
    throw new InitializationFailure("SC1013", entry.artifact);
  }
}

function verifyDescriptor(descriptor: number, entry: EntryIdentity): void {
  let current: BigIntStats;
  try {
    current = fstatSync(descriptor, { bigint: true });
  } catch {
    throw new InitializationFailure("SC1001", entry.artifact);
  }
  if (!current.isFile() || !sameFile(current, entry.stats)) {
    throw new InitializationFailure("SC1013", entry.artifact);
  }
}

function verifyLayout(
  rootIdentity: EntryIdentity,
  journal: readonly EntryIdentity[],
  realRoot: string,
): void {
  verifyEntry(rootIdentity, realRoot);
  for (const entry of journal) {
    verifyEntry(entry, realRoot);
  }
}

function inspectOwnedPath(pathValue: string, artifact: string): Diagnostic | null {
  try {
    lstatSync(pathValue);
    return createDiagnostic("SC1021", artifact);
  } catch (error) {
    return errnoCode(error) === "ENOENT" ? null : createDiagnostic("SC1001", artifact);
  }
}

function invokeCheckpoint(
  hooks: InitializationHooks,
  checkpoint: InitializationCheckpoint,
  artifact: string,
): void {
  try {
    hooks.checkpoint?.(checkpoint);
  } catch {
    throw new InitializationFailure("SC1001", artifact);
  }
}

function entryStillMatches(entry: EntryIdentity, realRoot: string): boolean {
  try {
    const current = lstatSync(entry.path, { bigint: true });
    if (
      current.isSymbolicLink() ||
      !pathKindMatches(current, entry.kind) ||
      !sameFile(current, entry.stats)
    ) {
      return false;
    }
    const canonical = realpathSync.native(entry.path);
    return (
      canonical === entry.canonical &&
      inspectCanonicalArtifactPath(
        realRoot,
        expectedCanonical(realRoot, entry.artifact),
        canonical,
      ) === null
    );
  } catch {
    return false;
  }
}

function removeJournalEntry(
  rootIdentity: EntryIdentity,
  entry: EntryIdentity,
  realRoot: string,
): boolean {
  if (!entryStillMatches(rootIdentity, realRoot) || !entryStillMatches(entry, realRoot)) {
    return false;
  }
  try {
    if (entry.kind === "file") {
      unlinkSync(entry.path);
    } else {
      rmdirSync(entry.path);
    }
    return true;
  } catch {
    return false;
  }
}

function rollbackLayout(
  rootIdentity: EntryIdentity,
  journal: readonly EntryIdentity[],
  realRoot: string,
): boolean {
  let complete = true;
  for (const entry of [...journal].reverse()) {
    if (!removeJournalEntry(rootIdentity, entry, realRoot)) {
      complete = false;
    }
  }
  return complete;
}

function closeDescriptor(descriptor: number): boolean {
  try {
    closeSync(descriptor);
    return true;
  } catch {
    return false;
  }
}

function descriptorMatchesBytes(
  descriptor: number,
  entry: EntryIdentity,
  expected: Buffer,
): boolean {
  try {
    const state = fstatSync(descriptor, { bigint: true });
    if (!sameFile(state, entry.stats) || state.size !== BigInt(expected.byteLength)) {
      return false;
    }
    const actual = Buffer.alloc(expected.byteLength);
    let offset = 0;
    while (offset < actual.byteLength) {
      const count = readSync(descriptor, actual, offset, actual.byteLength - offset, offset);
      if (count === 0) {
        break;
      }
      offset += count;
    }
    return offset === expected.byteLength && actual.equals(expected);
  } catch {
    return false;
  }
}

function diagnosticsForFailure(error: unknown, activeArtifact: string): readonly Diagnostic[] {
  if (error instanceof ValidationFailure) {
    return error.diagnostics;
  }
  if (error instanceof InitializationFailure) {
    return [createDiagnostic(error.code, error.artifact)];
  }
  const code = errnoCode(error);
  if (code === "EEXIST") {
    return [createDiagnostic("SC1021", activeArtifact)];
  }
  return [createDiagnostic(code === null ? "SC9001" : "SC1001", activeArtifact)];
}

export function initializeProjectWithHooks(
  options: InitializeProjectOptions = {},
  hooks: InitializationHooks = {},
): OperationResult<ProjectInitializationSummary> {
  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    return operationResult<ProjectInitializationSummary>([createDiagnostic("SC0001", ".")], null);
  }

  const rootResult = resolveProjectRoot(options.project);
  if (rootResult.root === null || rootResult.realRoot === null) {
    return operationResult<ProjectInitializationSummary>(rootResult.diagnostics, null);
  }
  if (options.projectId !== undefined && typeof options.projectId !== "string") {
    return operationResult<ProjectInitializationSummary>([createDiagnostic("SC0001", ".")], null);
  }

  const projectId = options.projectId ?? deriveProjectId(rootResult.root);
  const project = minimalProject(projectId);
  const artifactValidation = validateArtifactValue(
    project as unknown as JsonValue,
    "swecircuit.json",
  );
  if (!artifactValidation.ok) {
    return operationResult<ProjectInitializationSummary>(artifactValidation.diagnostics, null);
  }

  const projectRoot = rootResult.root;
  const realRoot = rootResult.realRoot;
  const manifestPath = resolve(projectRoot, "swecircuit.json");
  const catalogPath = resolve(projectRoot, "swecircuit");
  const modulesPath = resolve(catalogPath, "modules");
  const circuitsPath = resolve(catalogPath, "circuits");
  const manifestBytes = Buffer.from(`${JSON.stringify(project, null, 2)}\n`, "utf8");
  const journal: EntryIdentity[] = [];
  const pendingCreations = new Set<string>();
  let descriptor: number | null = null;
  let rootIdentity: EntryIdentity | null = null;
  let activeArtifact = ".";

  try {
    rootIdentity = captureEntry(projectRoot, ".", "directory", realRoot);
    activeArtifact = "swecircuit";
    verifyLayout(rootIdentity, journal, realRoot);
    const catalogCollision = inspectOwnedPath(catalogPath, "swecircuit");
    activeArtifact = "swecircuit.json";
    verifyLayout(rootIdentity, journal, realRoot);
    const manifestCollision = inspectOwnedPath(manifestPath, "swecircuit.json");
    verifyLayout(rootIdentity, journal, realRoot);
    const collisions = [catalogCollision, manifestCollision].filter(
      (diagnostic): diagnostic is Diagnostic => diagnostic !== null,
    );
    if (collisions.length > 0) {
      return operationResult<ProjectInitializationSummary>(collisions, null);
    }

    activeArtifact = "swecircuit";
    invokeCheckpoint(hooks, "beforeCatalogCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    mkdirSync(catalogPath);
    pendingCreations.add(activeArtifact);
    invokeCheckpoint(hooks, "afterCatalogCreateBeforeCapture", activeArtifact);
    journal.push(captureEntry(catalogPath, activeArtifact, "directory", realRoot));
    pendingCreations.delete(activeArtifact);
    invokeCheckpoint(hooks, "afterCatalogCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);

    activeArtifact = "swecircuit/modules";
    invokeCheckpoint(hooks, "beforeModulesCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    mkdirSync(modulesPath);
    pendingCreations.add(activeArtifact);
    invokeCheckpoint(hooks, "afterModulesCreateBeforeCapture", activeArtifact);
    journal.push(captureEntry(modulesPath, activeArtifact, "directory", realRoot));
    pendingCreations.delete(activeArtifact);
    invokeCheckpoint(hooks, "afterModulesCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);

    activeArtifact = "swecircuit/circuits";
    invokeCheckpoint(hooks, "beforeCircuitsCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    mkdirSync(circuitsPath);
    pendingCreations.add(activeArtifact);
    invokeCheckpoint(hooks, "afterCircuitsCreateBeforeCapture", activeArtifact);
    journal.push(captureEntry(circuitsPath, activeArtifact, "directory", realRoot));
    pendingCreations.delete(activeArtifact);
    invokeCheckpoint(hooks, "afterCircuitsCreate", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);

    activeArtifact = "swecircuit.json";
    invokeCheckpoint(hooks, "beforeManifestOpen", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    descriptor = openSync(
      manifestPath,
      constants.O_RDWR | constants.O_CREAT | constants.O_EXCL,
      0o666,
    );
    pendingCreations.add(activeArtifact);
    invokeCheckpoint(hooks, "afterManifestOpenBeforeCapture", activeArtifact);
    const manifestIdentity = captureManifestEntry(descriptor, manifestPath, realRoot);
    journal.push(manifestIdentity);
    pendingCreations.delete(activeArtifact);
    verifyEntry(manifestIdentity, realRoot);
    invokeCheckpoint(hooks, "afterManifestOpen", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);

    writeFileSync(descriptor, manifestBytes);
    invokeCheckpoint(hooks, "afterManifestWrite", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);
    fsyncSync(descriptor);
    invokeCheckpoint(hooks, "afterManifestFsync", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);

    invokeCheckpoint(hooks, "beforeValidation", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);
    const validation = validateProject({ project: projectRoot });
    invokeCheckpoint(hooks, "afterValidation", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);
    if (!descriptorMatchesBytes(descriptor, manifestIdentity, manifestBytes)) {
      throw new InitializationFailure("SC1013", activeArtifact);
    }
    if (!validation.ok || validation.value === null) {
      throw new ValidationFailure(validation.diagnostics);
    }
    if (validation.value.projectId !== projectId) {
      throw new InitializationFailure("SC1013", activeArtifact);
    }

    invokeCheckpoint(hooks, "beforeManifestClose", activeArtifact);
    verifyLayout(rootIdentity, journal, realRoot);
    verifyDescriptor(descriptor, manifestIdentity);
    const descriptorToClose = descriptor;
    descriptor = null;
    if (!closeDescriptor(descriptorToClose)) {
      throw new InitializationFailure("SC1001", activeArtifact);
    }
    verifyLayout(rootIdentity, journal, realRoot);

    return operationResult(
      validation.diagnostics,
      Object.freeze({
        projectId,
        projectArtifact: "swecircuit.json" as const,
        created: CREATED_PATHS,
        validation: validation.value,
      }),
    );
  } catch (error) {
    const diagnostics = [...diagnosticsForFailure(error, activeArtifact)];
    if (descriptor !== null) {
      const descriptorToClose = descriptor;
      descriptor = null;
      if (!closeDescriptor(descriptorToClose)) {
        diagnostics.push(createDiagnostic("SC1001", activeArtifact));
      }
    }
    const cleanupComplete =
      rootIdentity === null || rollbackLayout(rootIdentity, journal, realRoot);
    if (!cleanupComplete || pendingCreations.size > 0) {
      diagnostics.push(createDiagnostic("SC1022", "."));
    }
    return operationResult<ProjectInitializationSummary>(diagnostics, null);
  }
}

export function initializeProject(
  options: InitializeProjectOptions = {},
): OperationResult<ProjectInitializationSummary> {
  return initializeProjectWithHooks(options);
}
