import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readSync,
  realpathSync,
  type BigIntStats,
  type PathLike,
} from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { LIMITS } from "./constants.js";
import { createDiagnostic, type DiagnosticCode } from "./diagnostics.js";
import { parseJsonBuffer, type ParsedJson } from "./json.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic } from "./types.js";

export interface ProjectRootResult {
  readonly root: string | null;
  readonly realRoot: string | null;
  readonly diagnostics: readonly Diagnostic[];
}

export interface ContainedBytesResult {
  readonly bytes: Uint8Array | null;
  readonly diagnostics: readonly Diagnostic[];
}

export interface ContainedJsonResult {
  readonly parsed: ParsedJson | null;
  readonly diagnostics: readonly Diagnostic[];
}

export interface ContainedReadHooks {
  readonly afterBytesRead?: (absolutePath: string) => void;
}

type MissingCode = "SC1001" | "SC2001";
type ByteLimitCode = "SC5001" | "SC5006";

function isErrno(error: unknown, code: string): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    typeof error.code === "string" &&
    error.code === code
  );
}

function pathEqual(left: string, right: string): boolean {
  return process.platform === "win32" ? left.toLowerCase() === right.toLowerCase() : left === right;
}

function isContained(root: string, candidate: string): boolean {
  const result = relative(root, candidate);
  return (
    result === "" || (!isAbsolute(result) && result !== ".." && !result.startsWith(`..${sep}`))
  );
}

export function inspectCanonicalArtifactPath(
  realRoot: string,
  expectedPath: string,
  resolvedPath: string,
): "SC1013" | "SC1014" | null {
  if (!isContained(realRoot, resolvedPath)) {
    return "SC1014";
  }
  return pathEqual(expectedPath, resolvedPath) ? null : "SC1013";
}

function lstatOrDiagnostic(
  pathValue: PathLike,
  artifact: string,
  missingCode: MissingCode,
): { readonly stats: BigIntStats | null; readonly diagnostic: Diagnostic | null } {
  try {
    return { stats: lstatSync(pathValue, { bigint: true }), diagnostic: null };
  } catch (error) {
    return {
      stats: null,
      diagnostic: createDiagnostic(isErrno(error, "ENOENT") ? missingCode : "SC1001", artifact),
    };
  }
}

function sameFile(left: BigIntStats, right: BigIntStats): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function sameSnapshot(left: BigIntStats, right: BigIntStats): boolean {
  return (
    sameFile(left, right) &&
    left.size === right.size &&
    left.mtimeNs === right.mtimeNs &&
    left.ctimeNs === right.ctimeNs
  );
}

function inspectExplicitProjectPath(candidate: string): DiagnosticCode | null {
  if (
    candidate.length === 0 ||
    containsControlCharacters(candidate) ||
    containsLoneSurrogate(candidate)
  ) {
    return "SC1012";
  }
  if (candidate.startsWith("//") || candidate.startsWith("\\\\")) {
    return "SC1012";
  }

  const windowsDrive = /^[A-Za-z]:[\\/]/.test(candidate);
  if (windowsDrive) {
    if (process.platform !== "win32" || candidate.slice(2).includes(":")) {
      return "SC1012";
    }
    return null;
  }
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(candidate) || candidate.includes(":")) {
    return "SC1012";
  }
  return null;
}

function readBoundedRegularFile(
  pathValue: string,
  expectedStats: BigIntStats,
  artifact: string,
  byteLimit: number,
  limitCode: ByteLimitCode,
  hooks: ContainedReadHooks,
): { readonly bytes: Uint8Array | null; readonly diagnostic: Diagnostic | null } {
  if (expectedStats.size > BigInt(byteLimit)) {
    return { bytes: null, diagnostic: createDiagnostic(limitCode, artifact) };
  }

  let descriptor: number | null = null;
  let result: { readonly bytes: Uint8Array | null; readonly diagnostic: Diagnostic | null } = {
    bytes: null,
    diagnostic: null,
  };

  try {
    const noFollow = process.platform === "win32" ? 0 : constants.O_NOFOLLOW;
    descriptor = openSync(pathValue, constants.O_RDONLY | noFollow);
    const openedStats = fstatSync(descriptor, { bigint: true });
    if (!openedStats.isFile()) {
      result = { bytes: null, diagnostic: createDiagnostic("SC1015", artifact) };
    } else if (!sameFile(expectedStats, openedStats)) {
      result = { bytes: null, diagnostic: createDiagnostic("SC1013", artifact) };
    } else if (!sameSnapshot(expectedStats, openedStats)) {
      result = { bytes: null, diagnostic: createDiagnostic("SC1001", artifact) };
    } else {
      const buffer = Buffer.allocUnsafe(Number(openedStats.size) + 1);
      let offset = 0;
      while (offset < buffer.byteLength) {
        const count = readSync(descriptor, buffer, offset, buffer.byteLength - offset, null);
        if (count === 0) {
          break;
        }
        offset += count;
      }

      if (offset > byteLimit) {
        result = { bytes: null, diagnostic: createDiagnostic(limitCode, artifact) };
      } else {
        hooks.afterBytesRead?.(pathValue);
        const finalDescriptorStats = fstatSync(descriptor, { bigint: true });
        const finalPathStats = lstatSync(pathValue, { bigint: true });
        if (
          finalPathStats.isSymbolicLink() ||
          !finalPathStats.isFile() ||
          !sameFile(finalDescriptorStats, finalPathStats)
        ) {
          result = { bytes: null, diagnostic: createDiagnostic("SC1013", artifact) };
        } else if (
          !sameSnapshot(openedStats, finalDescriptorStats) ||
          !sameSnapshot(finalDescriptorStats, finalPathStats) ||
          BigInt(offset) !== openedStats.size
        ) {
          result = { bytes: null, diagnostic: createDiagnostic("SC1001", artifact) };
        } else {
          result = { bytes: buffer.subarray(0, offset), diagnostic: null };
        }
      }
    }
  } catch (error) {
    result = {
      bytes: null,
      diagnostic: createDiagnostic(isErrno(error, "ELOOP") ? "SC1013" : "SC1001", artifact),
    };
  } finally {
    if (descriptor !== null) {
      try {
        closeSync(descriptor);
      } catch {
        if (result.diagnostic === null) {
          result = { bytes: null, diagnostic: createDiagnostic("SC1001", artifact) };
        }
      }
    }
  }

  return result;
}

export function inspectRelativeArtifactPath(candidate: string): DiagnosticCode | null {
  if (
    candidate.length === 0 ||
    containsControlCharacters(candidate) ||
    containsLoneSurrogate(candidate)
  ) {
    return "SC1012";
  }
  if (
    candidate.startsWith("/") ||
    candidate.startsWith("\\") ||
    candidate.includes("\\") ||
    candidate.includes(":") ||
    candidate.includes("?") ||
    candidate.includes("*") ||
    /^[A-Za-z][A-Za-z0-9+.-]*:/.test(candidate)
  ) {
    return "SC1012";
  }

  const segments = candidate.split("/");
  if (segments.includes("..")) {
    return "SC1011";
  }
  if (segments.some((segment) => segment.length === 0 || segment === ".")) {
    return "SC1012";
  }
  return null;
}

export function resolveProjectRoot(project?: string): ProjectRootResult {
  if (project !== undefined && (typeof project !== "string" || project.length === 0)) {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([createDiagnostic("SC0001", ".")]),
    });
  }

  const requestedRoot = project ?? process.cwd();
  if (inspectExplicitProjectPath(requestedRoot) !== null) {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([createDiagnostic("SC1012", ".")]),
    });
  }

  const root = resolve(requestedRoot);
  const rootState = lstatOrDiagnostic(root, ".", "SC1001");
  if (rootState.diagnostic !== null || rootState.stats === null) {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([rootState.diagnostic ?? createDiagnostic("SC1001", ".")]),
    });
  }
  if (rootState.stats.isSymbolicLink()) {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([createDiagnostic("SC1013", ".")]),
    });
  }
  if (!rootState.stats.isDirectory()) {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([createDiagnostic("SC1001", ".")]),
    });
  }

  try {
    return Object.freeze({
      root,
      realRoot: realpathSync.native(root),
      diagnostics: Object.freeze([]),
    });
  } catch {
    return Object.freeze({
      root: null,
      realRoot: null,
      diagnostics: Object.freeze([createDiagnostic("SC1001", ".")]),
    });
  }
}

export function readContainedFileBytesWithHooks(
  root: string,
  realRoot: string,
  candidate: string,
  missingCode: MissingCode,
  byteLimit: number,
  limitCode: ByteLimitCode,
  hooks: ContainedReadHooks = {},
): ContainedBytesResult {
  const pathDiagnostic = inspectRelativeArtifactPath(candidate);
  if (pathDiagnostic !== null) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic(pathDiagnostic, ".")]),
    });
  }

  const absolutePath = resolve(root, ...candidate.split("/"));
  if (!isContained(root, absolutePath)) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic("SC1011", ".")]),
    });
  }

  let current = root;
  let finalStats: BigIntStats | null = null;
  for (const segment of candidate.split("/")) {
    current = join(current, segment);
    const state = lstatOrDiagnostic(current, candidate, missingCode);
    if (state.diagnostic !== null || state.stats === null) {
      return Object.freeze({
        bytes: null,
        diagnostics: Object.freeze([state.diagnostic ?? createDiagnostic("SC1001", candidate)]),
      });
    }
    if (state.stats.isSymbolicLink()) {
      return Object.freeze({
        bytes: null,
        diagnostics: Object.freeze([createDiagnostic("SC1013", candidate)]),
      });
    }
    finalStats = state.stats;
  }

  if (finalStats === null || !finalStats.isFile()) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic("SC1015", candidate)]),
    });
  }

  let resolvedFile: string;
  try {
    resolvedFile = realpathSync.native(absolutePath);
  } catch {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic("SC1001", candidate)]),
    });
  }
  const canonicalExpectedPath = resolve(realRoot, ...candidate.split("/"));
  const canonicalDiagnostic = inspectCanonicalArtifactPath(
    realRoot,
    canonicalExpectedPath,
    resolvedFile,
  );
  if (canonicalDiagnostic !== null) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic(canonicalDiagnostic, candidate)]),
    });
  }

  const boundedRead = readBoundedRegularFile(
    absolutePath,
    finalStats,
    candidate,
    byteLimit,
    limitCode,
    hooks,
  );
  if (boundedRead.diagnostic !== null || boundedRead.bytes === null) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([boundedRead.diagnostic ?? createDiagnostic("SC1001", candidate)]),
    });
  }

  let finalResolvedFile: string;
  try {
    finalResolvedFile = realpathSync.native(absolutePath);
  } catch {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic("SC1001", candidate)]),
    });
  }
  const finalCanonicalDiagnostic = inspectCanonicalArtifactPath(
    realRoot,
    canonicalExpectedPath,
    finalResolvedFile,
  );
  if (finalCanonicalDiagnostic !== null) {
    return Object.freeze({
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic(finalCanonicalDiagnostic, candidate)]),
    });
  }

  return Object.freeze({
    bytes: boundedRead.bytes,
    diagnostics: Object.freeze([]),
  });
}

export function readContainedFileBytes(
  root: string,
  realRoot: string,
  candidate: string,
  missingCode: MissingCode,
  byteLimit: number,
  limitCode: ByteLimitCode,
): ContainedBytesResult {
  return readContainedFileBytesWithHooks(
    root,
    realRoot,
    candidate,
    missingCode,
    byteLimit,
    limitCode,
  );
}

export function readContainedJsonFile(
  root: string,
  realRoot: string,
  candidate: string,
  missingCode: MissingCode,
): ContainedJsonResult {
  const file = readContainedFileBytes(
    root,
    realRoot,
    candidate,
    missingCode,
    LIMITS.artifactBytes,
    "SC5001",
  );
  if (file.bytes === null) {
    return Object.freeze({
      parsed: null,
      diagnostics: file.diagnostics,
    });
  }

  const parsed = parseJsonBuffer(file.bytes, candidate);
  return Object.freeze({
    parsed,
    diagnostics: parsed.diagnostics,
  });
}
