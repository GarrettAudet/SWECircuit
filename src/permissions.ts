import { createDiagnostic } from "./diagnostics.js";
import type { PermissionRequest } from "./model.js";
import { inspectRelativeArtifactPath } from "./path.js";
import type { Diagnostic } from "./types.js";

const PERMISSION_KINDS = new Set([
  "filesystem.read",
  "filesystem.write",
  "network.connect",
  "process.spawn",
  "secrets.read",
]);

function isFilesystemScope(scope: string): boolean {
  const prefix = scope.endsWith("/**");
  const candidate = prefix ? scope.slice(0, -3) : scope;
  return (
    candidate.length > 0 &&
    !candidate.includes("*") &&
    !candidate.includes("?") &&
    inspectRelativeArtifactPath(candidate) === null
  );
}

function isNetworkScope(scope: string): boolean {
  const match = /^([a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)(?::([0-9]{1,5}))?$/.exec(scope);
  if (match === null) {
    return false;
  }
  const labels = match[1]?.split(".") ?? [];
  if (
    labels.length === 0 ||
    labels.some(
      (label) =>
        label.length === 0 || label.length > 63 || label.startsWith("-") || label.endsWith("-"),
    )
  ) {
    return false;
  }
  const port = match[2];
  return port === undefined || (Number(port) >= 1 && Number(port) <= 65_535);
}

function isScopeValid(kind: string, scope: string): boolean {
  switch (kind) {
    case "filesystem.read":
    case "filesystem.write":
      return isFilesystemScope(scope);
    case "network.connect":
      return isNetworkScope(scope);
    case "process.spawn":
      return /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(scope);
    case "secrets.read":
      return /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/.test(scope);
    default:
      return false;
  }
}

export function validatePermissionRequests(
  requests: readonly PermissionRequest[],
  artifact: string,
  pointer: string,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (const [requestIndex, request] of requests.entries()) {
    const requestPointer = `${pointer}/${requestIndex}`;
    if (!PERMISSION_KINDS.has(request.kind)) {
      diagnostics.push(createDiagnostic("SC4002", artifact, `${requestPointer}/kind`));
      continue;
    }
    for (const [scopeIndex, scope] of request.scopes.entries()) {
      if (!isScopeValid(request.kind, scope)) {
        diagnostics.push(
          createDiagnostic("SC4002", artifact, `${requestPointer}/scopes/${scopeIndex}`),
        );
      }
    }
  }
  return Object.freeze(diagnostics);
}

function filesystemScopeCovers(ceiling: string, requirement: string): boolean {
  if (ceiling === requirement) {
    return true;
  }
  if (!ceiling.endsWith("/**")) {
    return false;
  }
  const base = ceiling.slice(0, -3);
  const requiredBase = requirement.endsWith("/**") ? requirement.slice(0, -3) : requirement;
  return requiredBase === base || requiredBase.startsWith(`${base}/`);
}

function scopeCovered(kind: string, ceiling: string, requirement: string): boolean {
  return kind === "filesystem.read" || kind === "filesystem.write"
    ? filesystemScopeCovers(ceiling, requirement)
    : ceiling === requirement;
}

export function permissionRequirementCovered(
  requirement: PermissionRequest,
  ceiling: readonly PermissionRequest[],
): boolean {
  const candidates = ceiling.filter((entry) => entry.kind === requirement.kind);
  return requirement.scopes.every((requiredScope) =>
    candidates.some((entry) =>
      entry.scopes.some((ceilingScope) =>
        scopeCovered(requirement.kind, ceilingScope, requiredScope),
      ),
    ),
  );
}
