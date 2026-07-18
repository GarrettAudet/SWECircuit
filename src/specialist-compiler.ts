import {
  boundedJsonUtf8ByteLength,
  boundedUtf8ByteLength,
  canonicalJson,
  digestCanonicalJson,
} from "./canonical-json.js";
import { SPECIALIST_API_VERSION, SPECIALIST_LIMITS } from "./constants.js";
import { appendJsonPointer, createDiagnostic, operationResult } from "./diagnostics.js";
import type { JsonObject, JsonValue, PermissionRequest } from "./model.js";
import { permissionRequirementCovered, validatePermissionRequests } from "./permissions.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { snapshotJsonValue } from "./snapshot.js";
import {
  validateSpecialistGoalSchema,
  validateSpecialistRequestSchema,
} from "./specialist-schema.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  AgentBlueprintContextUse,
  AgentBlueprintEvidenceDuty,
  CompileAgentBlueprintsInput,
  SpecialistAcceptanceCriterion,
  SpecialistAgentSchedule,
  SpecialistCandidateEvaluation,
  SpecialistCandidateAnalysis,
  SpecialistCandidateMetrics,
  SpecialistCandidateOrigin,
  SpecialistCandidateProposal,
  SpecialistCandidateRejectionCode,
  SpecialistComparatorField,
  SpecialistContextSource,
  SpecialistGoalContract,
  SpecialistLaunchWave,
  SpecialistModuleBinding,
  SpecialistPermission,
  SpecialistPort,
  SpecialistSearchMode,
  SpecialistSearchSummary,
  SpecialistSelectionReason,
  SpecialistWorkUnit,
  TaskAuthorityProjection,
} from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic, OperationResult } from "./types.js";

const GOAL_ARTIFACT = "specialist-goal.json";
const REQUEST_ARTIFACT = "specialist-request.json";
const CONTENT_DIGEST_PLACEHOLDER = `sha256:${"0".repeat(64)}`;
const REPOSITORY_LOCATOR =
  /^path:(?!\/)[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*(?:#[A-Za-z0-9][A-Za-z0-9._~/-]{0,255})?$/;

const ORIGIN_RANK: Readonly<Record<SpecialistCandidateOrigin, number>> = Object.freeze({
  serial_baseline: 0,
  exact_search: 1,
  bounded_balanced: 2,
  bounded_dependency: 3,
  bounded_evidence: 4,
  bounded_module: 5,
  bounded_scope: 6,
  proposed: 7,
});

const REJECTION_RANK: Readonly<Record<SpecialistCandidateRejectionCode, number>> = Object.freeze({
  agent_limit: 0,
  dependency_cycle: 1,
  evidence_independence: 2,
  missing_work_unit: 3,
  duplicate_work_unit: 4,
  unknown_work_unit: 5,
});

const HANDOFF_FIELDS = Object.freeze([
  "apiVersion",
  "kind",
  "outcome",
  "destination",
  "goal",
  "agent",
  "compilationDigest",
  "summary",
  "workUnitsCompleted",
  "artifacts",
  "evidence",
  "assumptions",
  "risks",
  "followUps",
] as const);

interface ParsedGoal {
  readonly goal: SpecialistGoalContract | null;
  readonly diagnostics: readonly Diagnostic[];
}

interface ParsedRequest {
  readonly request: CompileAgentBlueprintsInput | null;
  readonly diagnostics: readonly Diagnostic[];
}

interface CandidateRecord {
  readonly partition: readonly (readonly string[])[];
  readonly origins: Set<SpecialistCandidateOrigin>;
  readonly proposalIds: Set<string>;
}

interface InternalAgent {
  readonly id: string;
  readonly unitIds: readonly string[];
  readonly duration: number;
  readonly dependencies: ReadonlySet<string>;
  readonly successors: ReadonlySet<string>;
  readonly readScopes: ReadonlySet<string>;
  readonly writeScopes: ReadonlySet<string>;
  readonly conflictZones: ReadonlySet<string>;
  readonly contextSourceIds: ReadonlySet<string>;
  readonly permissionTokens: ReadonlySet<string>;
}

interface CandidateAnalysis {
  readonly agents: readonly InternalAgent[];
  readonly metrics: SpecialistCandidateMetrics;
  readonly schedule: readonly SpecialistAgentSchedule[];
}

interface CandidatePlan {
  readonly goalDigest: string;
  readonly serialBaseline: SpecialistCandidateEvaluation;
  readonly proposalEvaluations: readonly SpecialistCandidateEvaluation[];
  readonly selected: SpecialistCandidateEvaluation | null;
  readonly selectionReason: SpecialistSelectionReason | null;
  readonly alternatives: readonly SpecialistCandidateEvaluation[];
  readonly search: SpecialistSearchSummary;
}
function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareNumbers(left: number, right: number): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function repositoryLocatorPath(value: string): string | null {
  if (!REPOSITORY_LOCATOR.test(value)) {
    return null;
  }
  const path = value.slice("path:".length).split("#", 1)[0];
  return path?.split("/").every((segment) => segment !== "." && segment !== "..") ? path : null;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist value is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function withoutDigest<T extends Readonly<{ contentDigest: string }>>(value: T): JsonObject {
  const copy: Record<string, JsonValue> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (key !== "contentDigest") {
      copy[key] = entry as JsonValue;
    }
  }
  return copy;
}

function withDigest<T extends JsonObject>(
  domain: string,
  value: T,
): T & { readonly contentDigest: string } {
  return {
    ...value,
    contentDigest: digestCanonicalJson(domain, value),
  };
}

function scanText(
  value: string,
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
): boolean {
  let rejected = false;
  if (containsHighConfidenceSecret(value)) {
    diagnostics.push(createDiagnostic("SC4309", artifact, pointer));
    rejected = true;
  }
  if (
    containsControlCharacters(value) ||
    containsLoneSurrogate(value) ||
    boundedUtf8ByteLength(value, SPECIALIST_LIMITS.textBytes) === null
  ) {
    diagnostics.push(createDiagnostic("SC4301", artifact, pointer));
    rejected = true;
  }
  return rejected;
}

function scanStrings(
  value: JsonValue,
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
): void {
  if (typeof value === "string") {
    scanText(value, artifact, pointer, diagnostics);
    return;
  }
  if (value === null || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      scanStrings(entry, artifact, appendJsonPointer(pointer, index), diagnostics);
    }
    return;
  }
  const object = value as JsonObject;
  for (const key of Object.keys(object)) {
    const keyRejected = scanText(key, artifact, pointer, diagnostics);
    scanStrings(
      object[key] as JsonValue,
      artifact,
      keyRejected ? pointer : appendJsonPointer(pointer, key),
      diagnostics,
    );
  }
}

function snapshotInput(
  value: unknown,
  artifact: string,
): Readonly<{
  value: JsonValue | null;
  diagnostics: readonly Diagnostic[];
}> {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([
        createDiagnostic(snapshot.failure === "invalid" ? "SC4301" : "SC4308", artifact),
      ]),
    });
  }

  let bytes: number | null;
  try {
    bytes = boundedJsonUtf8ByteLength(snapshot.value, SPECIALIST_LIMITS.inputBytes);
  } catch {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([createDiagnostic("SC4301", artifact)]),
    });
  }
  if (bytes === null) {
    return Object.freeze({
      value: snapshot.value,
      diagnostics: Object.freeze([createDiagnostic("SC4308", artifact)]),
    });
  }

  const diagnostics: Diagnostic[] = [];
  scanStrings(snapshot.value, artifact, "", diagnostics);
  return Object.freeze({ value: snapshot.value, diagnostics: Object.freeze(diagnostics) });
}

function duplicateValues(
  values: readonly string[],
  artifact: string,
  pointer: string,
  code: "SC4302" | "SC4304" | "SC4305",
  diagnostics: Diagnostic[],
): void {
  const seen = new Set<string>();
  for (const [index, value] of values.entries()) {
    if (seen.has(value)) {
      diagnostics.push(createDiagnostic(code, artifact, appendJsonPointer(pointer, index)));
    } else {
      seen.add(value);
    }
  }
}

function permissionKey(permission: SpecialistPermission): string {
  return `${permission.kind}\u0000${[...permission.scopes].sort(compareText).join("\u0000")}`;
}

function portKey(port: SpecialistPort): string {
  return `${port.name}\u0000${port.artifactType}`;
}

function normalizePermissions(
  permissions: readonly SpecialistPermission[],
): readonly SpecialistPermission[] {
  return permissions
    .map((permission) => ({
      kind: permission.kind,
      scopes: [...permission.scopes].sort(compareText),
    }))
    .sort(
      (left, right) =>
        compareText(left.kind, right.kind) ||
        compareText(left.scopes.join("\u0000"), right.scopes.join("\u0000")),
    );
}

function normalizePorts(ports: readonly SpecialistPort[]): readonly SpecialistPort[] {
  return ports
    .map((port) => ({ name: port.name, artifactType: port.artifactType }))
    .sort(
      (left, right) =>
        compareText(left.name, right.name) || compareText(left.artifactType, right.artifactType),
    );
}

function normalizeModule(module: SpecialistModuleBinding): SpecialistModuleBinding {
  return {
    id: module.id,
    action: module.action,
    inputPorts: normalizePorts(module.inputPorts),
    outputPorts: normalizePorts(module.outputPorts),
  };
}

function normalizeContextSource(source: SpecialistContextSource): SpecialistContextSource {
  const allowedWorkUnits = [...source.allowedWorkUnits].sort(compareText);
  if (source.kind === "repository") {
    return {
      id: source.id,
      kind: "repository",
      locator: source.locator,
      digest: source.digest,
      bytes: source.bytes,
      description: source.description,
      allowedWorkUnits,
      readScope: source.readScope,
    };
  }
  return {
    id: source.id,
    kind: source.kind,
    locator: source.locator,
    digest: source.digest,
    bytes: source.bytes,
    description: source.description,
    allowedWorkUnits,
  };
}

function normalizeCriterion(
  criterion: SpecialistAcceptanceCriterion,
): SpecialistAcceptanceCriterion {
  return {
    id: criterion.id,
    description: criterion.description,
    evidenceRequirements: criterion.evidenceRequirements
      .map((requirement) => ({
        id: requirement.id,
        kind: requirement.kind,
        duty: requirement.duty,
        description: requirement.description,
        independentFromProducer: requirement.independentFromProducer,
      }))
      .sort((left, right) => compareText(left.id, right.id)),
  };
}

function normalizeWorkUnit(unit: SpecialistWorkUnit): SpecialistWorkUnit {
  return {
    id: unit.id,
    objective: unit.objective,
    weight: unit.weight,
    module: normalizeModule(unit.module),
    dependencies: [...unit.dependencies].sort(compareText),
    requiredCapabilities: [...unit.requiredCapabilities].sort(compareText),
    contextUses: unit.contextUses
      .map((contextUse) => ({
        sourceId: contextUse.sourceId,
        purpose: contextUse.purpose,
      }))
      .sort(
        (left, right) =>
          compareText(left.sourceId, right.sourceId) || compareText(left.purpose, right.purpose),
      ),
    scope: {
      read: [...unit.scope.read].sort(compareText),
      write: [...unit.scope.write].sort(compareText),
      conflictZones: [...unit.scope.conflictZones].sort(compareText),
    },
    permissions: normalizePermissions(unit.permissions),
    evidenceRequirementIds: [...unit.evidenceRequirementIds].sort(compareText),
    handoffArtifacts: [...unit.handoffArtifacts].sort(compareText),
    stopConditions: [...unit.stopConditions].sort(compareText),
  };
}

function normalizeGoal(goal: SpecialistGoalContract): SpecialistGoalContract {
  return freezeJson({
    apiVersion: SPECIALIST_API_VERSION,
    kind: "GoalContract" as const,
    id: goal.id,
    revision: goal.revision,
    objective: goal.objective,
    integrationOwner: goal.integrationOwner,
    assumptions: goal.assumptions
      .map((assumption) => ({
        id: assumption.id,
        statement: assumption.statement,
        rationale: assumption.rationale,
      }))
      .sort((left, right) => compareText(left.id, right.id)),
    unresolvedDecisions: goal.unresolvedDecisions
      .map((decision) => ({
        id: decision.id,
        question: decision.question,
        owner: decision.owner,
        blocking: decision.blocking,
        proceedRationale: decision.proceedRationale,
      }))
      .sort((left, right) => compareText(left.id, right.id)),
    acceptanceCriteria: goal.acceptanceCriteria
      .map(normalizeCriterion)
      .sort((left, right) => compareText(left.id, right.id)),
    contextSources: goal.contextSources
      .map(normalizeContextSource)
      .sort((left, right) => compareText(left.id, right.id)),
    authority: {
      allowedModules: [...goal.authority.allowedModules].sort(compareText),
      allowedCapabilities: [...goal.authority.allowedCapabilities].sort(compareText),
      permissionCeiling: normalizePermissions(goal.authority.permissionCeiling),
      forbiddenEffects: [...goal.authority.forbiddenEffects].sort(compareText),
      maxAgents: goal.authority.maxAgents,
      maxConcurrency: goal.authority.maxConcurrency,
    },
    optimization: {
      agentStartupCost: goal.optimization.agentStartupCost,
      handoffCost: goal.optimization.handoffCost,
    },
    workUnits: goal.workUnits
      .map(normalizeWorkUnit)
      .sort((left, right) => compareText(left.id, right.id)),
  });
}

function moduleSignature(module: SpecialistModuleBinding): string {
  return canonicalJson(asJson(normalizeModule(module)));
}

function topologicalOrder(units: readonly SpecialistWorkUnit[]): readonly string[] | null {
  const byId = new Map(units.map((unit) => [unit.id, unit] as const));
  const indegree = new Map<string, number>();
  const successors = new Map<string, string[]>();
  for (const unit of units) {
    indegree.set(unit.id, unit.dependencies.length);
    for (const dependency of unit.dependencies) {
      const list = successors.get(dependency) ?? [];
      list.push(unit.id);
      successors.set(dependency, list);
    }
  }
  const ready = [
    ...units.filter((unit) => unit.dependencies.length === 0).map((unit) => unit.id),
  ].sort(compareText);
  const result: string[] = [];
  while (ready.length > 0) {
    const id = ready.shift();
    if (id === undefined || !byId.has(id)) {
      return null;
    }
    result.push(id);
    for (const successor of [...(successors.get(id) ?? [])].sort(compareText)) {
      const next = (indegree.get(successor) ?? 0) - 1;
      indegree.set(successor, next);
      if (next === 0) {
        ready.push(successor);
        ready.sort(compareText);
      }
    }
  }
  return result.length === units.length ? Object.freeze(result) : null;
}

function validateGoalSemantics(
  goal: SpecialistGoalContract,
  artifact: string,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const unitIds = goal.workUnits.map((unit) => unit.id);
  const unitSet = new Set(unitIds);
  duplicateValues(unitIds, artifact, "/workUnits", "SC4302", diagnostics);
  duplicateValues(
    goal.assumptions.map((assumption) => assumption.id),
    artifact,
    "/assumptions",
    "SC4302",
    diagnostics,
  );
  duplicateValues(
    goal.unresolvedDecisions.map((decision) => decision.id),
    artifact,
    "/unresolvedDecisions",
    "SC4302",
    diagnostics,
  );
  for (const [decisionIndex, decision] of goal.unresolvedDecisions.entries()) {
    if (decision.blocking) {
      diagnostics.push(
        createDiagnostic("SC4302", artifact, `/unresolvedDecisions/${decisionIndex}/blocking`),
      );
    }
  }
  duplicateValues(
    goal.acceptanceCriteria.map((criterion) => criterion.id),
    artifact,
    "/acceptanceCriteria",
    "SC4302",
    diagnostics,
  );
  duplicateValues(
    goal.contextSources.map((source) => source.id),
    artifact,
    "/contextSources",
    "SC4302",
    diagnostics,
  );

  if (goal.authority.maxConcurrency > goal.authority.maxAgents) {
    diagnostics.push(createDiagnostic("SC4303", artifact, "/authority/maxConcurrency"));
  }

  diagnostics.push(
    ...validatePermissionRequests(
      goal.authority.permissionCeiling as readonly PermissionRequest[],
      artifact,
      "/authority/permissionCeiling",
    ),
  );
  duplicateValues(
    goal.authority.permissionCeiling.map(permissionKey),
    artifact,
    "/authority/permissionCeiling",
    "SC4302",
    diagnostics,
  );

  const requirementById = new Map<
    string,
    Readonly<{ criterionId: string; duty: string; independent: boolean }>
  >();
  for (const [criterionIndex, criterion] of goal.acceptanceCriteria.entries()) {
    let producers = 0;
    duplicateValues(
      criterion.evidenceRequirements.map((requirement) => requirement.id),
      artifact,
      `/acceptanceCriteria/${criterionIndex}/evidenceRequirements`,
      "SC4304",
      diagnostics,
    );
    for (const [requirementIndex, requirement] of criterion.evidenceRequirements.entries()) {
      if (requirementById.has(requirement.id)) {
        diagnostics.push(
          createDiagnostic(
            "SC4304",
            artifact,
            `/acceptanceCriteria/${criterionIndex}/evidenceRequirements/${requirementIndex}/id`,
          ),
        );
      } else {
        requirementById.set(requirement.id, {
          criterionId: criterion.id,
          duty: requirement.duty,
          independent: requirement.independentFromProducer,
        });
      }
      if (requirement.duty === "produce") {
        producers += 1;
        if (requirement.independentFromProducer) {
          diagnostics.push(
            createDiagnostic(
              "SC4304",
              artifact,
              `/acceptanceCriteria/${criterionIndex}/evidenceRequirements/${requirementIndex}/independentFromProducer`,
            ),
          );
        }
      }
    }
    if (producers === 0) {
      diagnostics.push(
        createDiagnostic(
          "SC4304",
          artifact,
          `/acceptanceCriteria/${criterionIndex}/evidenceRequirements`,
        ),
      );
    }
  }

  const sourceById = new Map(goal.contextSources.map((source) => [source.id, source] as const));
  const sourceUseCount = new Map<string, number>(
    goal.contextSources.map((source) => [source.id, 0] as const),
  );
  let totalContextBytes = 0;
  for (const [sourceIndex, source] of goal.contextSources.entries()) {
    totalContextBytes += source.bytes;
    duplicateValues(
      source.allowedWorkUnits,
      artifact,
      `/contextSources/${sourceIndex}/allowedWorkUnits`,
      "SC4302",
      diagnostics,
    );
    for (const [allowedIndex, workUnitId] of source.allowedWorkUnits.entries()) {
      if (!unitSet.has(workUnitId)) {
        diagnostics.push(
          createDiagnostic(
            "SC4302",
            artifact,
            `/contextSources/${sourceIndex}/allowedWorkUnits/${allowedIndex}`,
          ),
        );
      }
    }
    if (source.kind === "repository") {
      const locatorPath = repositoryLocatorPath(source.locator);
      if (locatorPath === null) {
        diagnostics.push(
          createDiagnostic("SC4301", artifact, `/contextSources/${sourceIndex}/locator`),
        );
      } else if (
        !permissionRequirementCovered({ kind: "filesystem.read", scopes: [locatorPath] }, [
          { kind: "filesystem.read", scopes: [source.readScope] },
        ])
      ) {
        diagnostics.push(
          createDiagnostic("SC4303", artifact, `/contextSources/${sourceIndex}/locator`),
        );
      }
    }
  }
  if (totalContextBytes > SPECIALIST_LIMITS.contextTotalBytes) {
    diagnostics.push(createDiagnostic("SC4308", artifact, "/contextSources"));
  }

  const requirementOwners = new Map<string, string[]>();
  const moduleDefinitions = new Map<string, string>();
  for (const [unitIndex, unit] of goal.workUnits.entries()) {
    const unitPointer = `/workUnits/${unitIndex}`;
    if (!goal.authority.allowedModules.includes(unit.module.id)) {
      diagnostics.push(createDiagnostic("SC4303", artifact, `${unitPointer}/module/id`));
    }
    const signature = moduleSignature(unit.module);
    const existingModule = moduleDefinitions.get(unit.module.id);
    if (existingModule !== undefined && existingModule !== signature) {
      diagnostics.push(createDiagnostic("SC4302", artifact, `${unitPointer}/module`));
    } else {
      moduleDefinitions.set(unit.module.id, signature);
    }
    duplicateValues(
      unit.module.inputPorts.map((port) => port.name),
      artifact,
      `${unitPointer}/module/inputPorts`,
      "SC4302",
      diagnostics,
    );
    duplicateValues(
      unit.module.outputPorts.map((port) => port.name),
      artifact,
      `${unitPointer}/module/outputPorts`,
      "SC4302",
      diagnostics,
    );
    duplicateValues(
      [...unit.module.inputPorts, ...unit.module.outputPorts].map(portKey),
      artifact,
      `${unitPointer}/module`,
      "SC4302",
      diagnostics,
    );

    for (const [dependencyIndex, dependency] of unit.dependencies.entries()) {
      if (!unitSet.has(dependency) || dependency === unit.id) {
        diagnostics.push(
          createDiagnostic("SC4302", artifact, `${unitPointer}/dependencies/${dependencyIndex}`),
        );
      }
    }
    for (const [capabilityIndex, capability] of unit.requiredCapabilities.entries()) {
      if (!goal.authority.allowedCapabilities.includes(capability)) {
        diagnostics.push(
          createDiagnostic(
            "SC4303",
            artifact,
            `${unitPointer}/requiredCapabilities/${capabilityIndex}`,
          ),
        );
      }
    }

    diagnostics.push(
      ...validatePermissionRequests(
        unit.permissions as readonly PermissionRequest[],
        artifact,
        `${unitPointer}/permissions`,
      ),
    );
    duplicateValues(
      unit.permissions.map(permissionKey),
      artifact,
      `${unitPointer}/permissions`,
      "SC4302",
      diagnostics,
    );
    const declaredReadScopes = unit.permissions
      .filter((permission) => permission.kind === "filesystem.read")
      .flatMap((permission) => [...permission.scopes])
      .sort(compareText);
    const declaredWriteScopes = unit.permissions
      .filter((permission) => permission.kind === "filesystem.write")
      .flatMap((permission) => [...permission.scopes])
      .sort(compareText);
    if (
      canonicalJson(asJson(declaredReadScopes)) !==
      canonicalJson(asJson([...unit.scope.read].sort(compareText)))
    ) {
      diagnostics.push(createDiagnostic("SC4303", artifact, `${unitPointer}/scope/read`));
    }
    if (
      canonicalJson(asJson(declaredWriteScopes)) !==
      canonicalJson(asJson([...unit.scope.write].sort(compareText)))
    ) {
      diagnostics.push(createDiagnostic("SC4303", artifact, `${unitPointer}/scope/write`));
    }
    for (const [permissionIndex, permission] of unit.permissions.entries()) {
      if (
        !permissionRequirementCovered(
          permission as PermissionRequest,
          goal.authority.permissionCeiling as readonly PermissionRequest[],
        )
      ) {
        diagnostics.push(
          createDiagnostic("SC4303", artifact, `${unitPointer}/permissions/${permissionIndex}`),
        );
      }
    }
    for (const [scopeIndex, scope] of unit.scope.read.entries()) {
      if (
        !permissionRequirementCovered(
          { kind: "filesystem.read", scopes: [scope] },
          unit.permissions as readonly PermissionRequest[],
        )
      ) {
        diagnostics.push(
          createDiagnostic("SC4303", artifact, `${unitPointer}/scope/read/${scopeIndex}`),
        );
      }
    }
    for (const [scopeIndex, scope] of unit.scope.write.entries()) {
      if (
        !permissionRequirementCovered(
          { kind: "filesystem.write", scopes: [scope] },
          unit.permissions as readonly PermissionRequest[],
        )
      ) {
        diagnostics.push(
          createDiagnostic("SC4303", artifact, `${unitPointer}/scope/write/${scopeIndex}`),
        );
      }
    }

    duplicateValues(
      unit.contextUses.map((contextUse) => contextUse.sourceId),
      artifact,
      `${unitPointer}/contextUses`,
      "SC4302",
      diagnostics,
    );
    for (const [contextIndex, contextUse] of unit.contextUses.entries()) {
      const source = sourceById.get(contextUse.sourceId);
      if (source === undefined) {
        diagnostics.push(
          createDiagnostic(
            "SC4302",
            artifact,
            `${unitPointer}/contextUses/${contextIndex}/sourceId`,
          ),
        );
        continue;
      }
      sourceUseCount.set(source.id, (sourceUseCount.get(source.id) ?? 0) + 1);
      if (!source.allowedWorkUnits.includes(unit.id)) {
        diagnostics.push(
          createDiagnostic(
            "SC4303",
            artifact,
            `${unitPointer}/contextUses/${contextIndex}/sourceId`,
          ),
        );
      }
      if (
        source.kind === "repository" &&
        (!unit.scope.read.includes(source.readScope) ||
          !permissionRequirementCovered(
            { kind: "filesystem.read", scopes: [source.readScope] },
            unit.permissions as readonly PermissionRequest[],
          ))
      ) {
        diagnostics.push(
          createDiagnostic(
            "SC4303",
            artifact,
            `${unitPointer}/contextUses/${contextIndex}/sourceId`,
          ),
        );
      }
    }

    for (const [requirementIndex, requirementId] of unit.evidenceRequirementIds.entries()) {
      if (!requirementById.has(requirementId)) {
        diagnostics.push(
          createDiagnostic(
            "SC4304",
            artifact,
            `${unitPointer}/evidenceRequirementIds/${requirementIndex}`,
          ),
        );
      }
      const owners = requirementOwners.get(requirementId) ?? [];
      owners.push(unit.id);
      requirementOwners.set(requirementId, owners);
    }
  }

  for (const [sourceIndex, source] of goal.contextSources.entries()) {
    if ((sourceUseCount.get(source.id) ?? 0) === 0) {
      diagnostics.push(createDiagnostic("SC4303", artifact, `/contextSources/${sourceIndex}`));
    }
  }
  for (const requirementId of requirementById.keys()) {
    const owners = requirementOwners.get(requirementId) ?? [];
    if (owners.length !== 1) {
      diagnostics.push(createDiagnostic("SC4304", artifact, "/workUnits"));
    }
  }
  if (topologicalOrder(goal.workUnits) === null) {
    diagnostics.push(createDiagnostic("SC4302", artifact, "/workUnits"));
  }
  return Object.freeze(diagnostics);
}

function parseGoal(value: unknown, artifact = GOAL_ARTIFACT): ParsedGoal {
  const input = snapshotInput(value, artifact);
  const diagnostics = [...input.diagnostics];
  if (input.value === null || hasErrors(diagnostics)) {
    return Object.freeze({ goal: null, diagnostics: Object.freeze(diagnostics) });
  }
  diagnostics.push(...validateSpecialistGoalSchema(input.value, artifact));
  if (hasErrors(diagnostics)) {
    return Object.freeze({ goal: null, diagnostics: Object.freeze(diagnostics) });
  }
  const goal = normalizeGoal(input.value as unknown as SpecialistGoalContract);
  diagnostics.push(...validateGoalSemantics(goal, artifact));
  return Object.freeze({
    goal: hasErrors(diagnostics) ? null : goal,
    diagnostics: Object.freeze(diagnostics),
  });
}

function normalizePartition(
  groups: readonly (readonly string[])[],
): readonly (readonly string[])[] {
  return groups
    .map((group) => [...group].sort(compareText))
    .sort((left, right) => compareText(left.join("\u0000"), right.join("\u0000")));
}

function normalizeProposals(
  proposals: readonly SpecialistCandidateProposal[],
): readonly SpecialistCandidateProposal[] {
  return proposals
    .map((proposal) => ({ id: proposal.id, groups: normalizePartition(proposal.groups) }))
    .sort((left, right) => compareText(left.id, right.id));
}

function parseRequest(value: unknown): ParsedRequest {
  const input = snapshotInput(value, REQUEST_ARTIFACT);
  const diagnostics = [...input.diagnostics];
  if (input.value === null || hasErrors(diagnostics)) {
    return Object.freeze({ request: null, diagnostics: Object.freeze(diagnostics) });
  }
  diagnostics.push(...validateSpecialistRequestSchema(input.value, REQUEST_ARTIFACT));
  if (hasErrors(diagnostics)) {
    return Object.freeze({ request: null, diagnostics: Object.freeze(diagnostics) });
  }
  const source = input.value as unknown as CompileAgentBlueprintsInput;
  const goal = normalizeGoal(source.goal);
  diagnostics.push(...validateGoalSemantics(goal, REQUEST_ARTIFACT));
  const proposals = normalizeProposals(source.proposedCandidates ?? []);
  duplicateValues(
    proposals.map((proposal) => proposal.id),
    REQUEST_ARTIFACT,
    "/proposedCandidates",
    "SC4305",
    diagnostics,
  );
  return Object.freeze({
    request: hasErrors(diagnostics)
      ? null
      : freezeJson({
          apiVersion: SPECIALIST_API_VERSION,
          kind: "SpecialistCompilationRequest" as const,
          goal,
          ...(proposals.length === 0 ? {} : { proposedCandidates: proposals }),
        }),
    diagnostics: Object.freeze(diagnostics),
  });
}

function buildAuthorityProjection(goal: SpecialistGoalContract): TaskAuthorityProjection {
  return freezeJson(
    withDigest("swecircuit.specialist.authority.v1", {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "TaskAuthorityProjection",
      goalId: goal.id,
      goalRevision: goal.revision,
      allowedModules: goal.authority.allowedModules,
      allowedCapabilities: goal.authority.allowedCapabilities,
      contextSources: goal.contextSources,
      permissionCeiling: goal.authority.permissionCeiling,
      forbiddenEffects: goal.authority.forbiddenEffects,
      maxAgents: goal.authority.maxAgents,
      maxConcurrency: goal.authority.maxConcurrency,
    } as unknown as JsonObject) as unknown as TaskAuthorityProjection,
  );
}

export function deriveTaskAuthorityProjection(
  input: unknown,
): OperationResult<TaskAuthorityProjection> {
  try {
    const parsed = parseGoal(input);
    return operationResult(
      parsed.diagnostics,
      parsed.goal === null ? null : buildAuthorityProjection(parsed.goal),
    );
  } catch {
    return operationResult<TaskAuthorityProjection>(
      [createDiagnostic("SC9001", GOAL_ARTIFACT)],
      null,
    );
  }
}

function partitionSignature(partition: readonly (readonly string[])[]): string {
  return canonicalJson(asJson(partition));
}

function partitionId(partition: readonly (readonly string[])[]): string {
  return `team.${digestCanonicalJson("swecircuit.specialist.partition.v1", asJson(partition)).slice(7)}`;
}

function agentId(group: readonly string[]): string {
  return `agent.${digestCanonicalJson("swecircuit.specialist.agent-group.v1", asJson(group)).slice(7)}`;
}

function addCandidate(
  records: Map<string, CandidateRecord>,
  groups: readonly (readonly string[])[],
  origin: SpecialistCandidateOrigin,
  proposalId?: string,
): void {
  const partition = normalizePartition(groups);
  const signature = partitionSignature(partition);
  const existing = records.get(signature);
  if (existing === undefined) {
    records.set(signature, {
      partition,
      origins: new Set([origin]),
      proposalIds: new Set(proposalId === undefined ? [] : [proposalId]),
    });
    return;
  }
  existing.origins.add(origin);
  if (proposalId !== undefined) {
    existing.proposalIds.add(proposalId);
  }
}

function enumeratePartitions(
  ids: readonly string[],
  maxGroups: number,
  onPartition: (partition: readonly (readonly string[])[]) => void,
): void {
  const groups: string[][] = [];
  const visit = (index: number): void => {
    if (index === ids.length) {
      onPartition(groups.map((group) => [...group]));
      return;
    }
    const id = ids[index];
    if (id === undefined) {
      return;
    }
    for (const group of groups) {
      group.push(id);
      visit(index + 1);
      group.pop();
    }
    if (groups.length < maxGroups) {
      groups.push([id]);
      visit(index + 1);
      groups.pop();
    }
  };
  visit(0);
}

function balancedPartition(
  units: readonly SpecialistWorkUnit[],
  groupCount: number,
): readonly (readonly string[])[] {
  const ordered = [...units].sort(
    (left, right) => compareNumbers(right.weight, left.weight) || compareText(left.id, right.id),
  );
  const groups = Array.from({ length: groupCount }, () => [] as string[]);
  const weights = Array.from({ length: groupCount }, () => 0);
  for (const [index, unit] of ordered.entries()) {
    let target = index < groupCount ? index : 0;
    if (index >= groupCount) {
      for (let candidate = 1; candidate < groupCount; candidate += 1) {
        const targetWeight = weights[target] ?? Number.MAX_SAFE_INTEGER;
        const candidateWeight = weights[candidate] ?? Number.MAX_SAFE_INTEGER;
        if (candidateWeight < targetWeight) {
          target = candidate;
        }
      }
    }
    groups[target]?.push(unit.id);
    weights[target] = (weights[target] ?? 0) + unit.weight;
  }
  return normalizePartition(groups);
}

function groupedPartition(
  units: readonly SpecialistWorkUnit[],
  keyFor: (unit: SpecialistWorkUnit) => string,
): readonly (readonly string[])[] {
  const groups = new Map<string, string[]>();
  for (const unit of units) {
    const key = keyFor(unit);
    const group = groups.get(key) ?? [];
    group.push(unit.id);
    groups.set(key, group);
  }
  return normalizePartition([...groups.values()]);
}

function dependencyLevels(units: readonly SpecialistWorkUnit[]): ReadonlyMap<string, number> {
  const order = topologicalOrder(units) ?? [];
  const byId = new Map(units.map((unit) => [unit.id, unit] as const));
  const levels = new Map<string, number>();
  for (const id of order) {
    const unit = byId.get(id);
    if (unit === undefined) {
      continue;
    }
    const level = unit.dependencies.reduce(
      (maximum, dependency) => Math.max(maximum, (levels.get(dependency) ?? -1) + 1),
      0,
    );
    levels.set(id, level);
  }
  return levels;
}

function evidenceClass(
  unit: SpecialistWorkUnit,
  requirements: ReadonlyMap<string, Readonly<{ duty: string }>>,
): string {
  const duties = new Set(
    unit.evidenceRequirementIds
      .map((id) => requirements.get(id)?.duty)
      .filter((duty): duty is string => duty !== undefined),
  );
  return duties.has("review")
    ? "review"
    : duties.has("verify")
      ? "verify"
      : duties.has("produce")
        ? "produce"
        : "other";
}

function buildCandidates(
  goal: SpecialistGoalContract,
  proposals: readonly SpecialistCandidateProposal[],
): Readonly<{ records: readonly CandidateRecord[]; mode: SpecialistSearchMode }> {
  const records = new Map<string, CandidateRecord>();
  const ids = goal.workUnits.map((unit) => unit.id);
  addCandidate(records, [ids], "serial_baseline");
  const mode: SpecialistSearchMode =
    ids.length <= SPECIALIST_LIMITS.exactSearchWorkUnits ? "exact" : "bounded";

  if (mode === "exact") {
    enumeratePartitions(ids, Math.min(goal.authority.maxAgents, ids.length), (partition) => {
      addCandidate(records, partition, "exact_search");
    });
  } else {
    const maximumGroups = Math.min(goal.authority.maxAgents, ids.length);
    for (let groupCount = 2; groupCount <= maximumGroups; groupCount += 1) {
      addCandidate(records, balancedPartition(goal.workUnits, groupCount), "bounded_balanced");
    }

    const modulePartition = groupedPartition(goal.workUnits, (unit) => unit.module.id);
    if (modulePartition.length <= goal.authority.maxAgents) {
      addCandidate(records, modulePartition, "bounded_module");
    }

    const levels = dependencyLevels(goal.workUnits);
    const dependencyPartition = groupedPartition(
      goal.workUnits,
      (unit) => `level.${levels.get(unit.id) ?? 0}`,
    );
    if (dependencyPartition.length <= goal.authority.maxAgents) {
      addCandidate(records, dependencyPartition, "bounded_dependency");
    }

    const requirementMap = new Map<string, Readonly<{ duty: string }>>();
    for (const criterion of goal.acceptanceCriteria) {
      for (const requirement of criterion.evidenceRequirements) {
        requirementMap.set(requirement.id, requirement);
      }
    }
    const evidencePartition = groupedPartition(goal.workUnits, (unit) =>
      evidenceClass(unit, requirementMap),
    );
    if (evidencePartition.length <= goal.authority.maxAgents) {
      addCandidate(records, evidencePartition, "bounded_evidence");
    }

    const scopePartition = groupedPartition(
      goal.workUnits,
      (unit) => unit.scope.write[0] ?? unit.scope.conflictZones[0] ?? `read.${unit.module.id}`,
    );
    if (scopePartition.length <= goal.authority.maxAgents) {
      addCandidate(records, scopePartition, "bounded_scope");
    }
  }

  for (const proposal of proposals) {
    addCandidate(records, proposal.groups, "proposed", proposal.id);
  }
  return Object.freeze({
    mode,
    records: Object.freeze(
      [...records.values()].sort((left, right) =>
        compareText(partitionSignature(left.partition), partitionSignature(right.partition)),
      ),
    ),
  });
}

function intersects(left: ReadonlySet<string>, right: ReadonlySet<string>): boolean {
  for (const value of left) {
    if (right.has(value)) {
      return true;
    }
  }
  return false;
}

function agentsConflict(left: InternalAgent, right: InternalAgent): boolean {
  return (
    intersects(left.writeScopes, right.writeScopes) ||
    intersects(left.writeScopes, right.readScopes) ||
    intersects(right.writeScopes, left.readScopes) ||
    intersects(left.conflictZones, right.conflictZones)
  );
}

function agentTopologicalOrder(agents: readonly InternalAgent[]): readonly string[] | null {
  const indegree = new Map(agents.map((agent) => [agent.id, agent.dependencies.size] as const));
  const byId = new Map(agents.map((agent) => [agent.id, agent] as const));
  const ready = agents
    .filter((agent) => agent.dependencies.size === 0)
    .map((agent) => agent.id)
    .sort(compareText);
  const result: string[] = [];
  while (ready.length > 0) {
    const id = ready.shift();
    if (id === undefined) {
      return null;
    }
    result.push(id);
    const agent = byId.get(id);
    for (const successor of [...(agent?.successors ?? [])].sort(compareText)) {
      const next = (indegree.get(successor) ?? 0) - 1;
      indegree.set(successor, next);
      if (next === 0) {
        ready.push(successor);
        ready.sort(compareText);
      }
    }
  }
  return result.length === agents.length ? Object.freeze(result) : null;
}

function mergedPermissions(units: readonly SpecialistWorkUnit[]): readonly SpecialistPermission[] {
  const scopesByKind = new Map<SpecialistPermission["kind"], Set<string>>();
  for (const unit of units) {
    for (const permission of unit.permissions) {
      const scopes = scopesByKind.get(permission.kind) ?? new Set<string>();
      for (const scope of permission.scopes) {
        scopes.add(scope);
      }
      scopesByKind.set(permission.kind, scopes);
    }
  }
  return [...scopesByKind.entries()]
    .map(([kind, scopes]) => ({ kind, scopes: [...scopes].sort(compareText) }))
    .sort((left, right) => compareText(left.kind, right.kind));
}

function buildInternalAgents(
  goal: SpecialistGoalContract,
  partition: readonly (readonly string[])[],
): readonly InternalAgent[] | null {
  const unitById = new Map(goal.workUnits.map((unit) => [unit.id, unit] as const));
  const ownerByUnit = new Map<string, string>();
  const groups = partition.map((group) => ({ id: agentId(group), unitIds: group }));
  for (const group of groups) {
    for (const unitId of group.unitIds) {
      ownerByUnit.set(unitId, group.id);
    }
  }

  const dependencySets = new Map<string, Set<string>>();
  const successorSets = new Map<string, Set<string>>();
  for (const group of groups) {
    dependencySets.set(group.id, new Set());
    successorSets.set(group.id, new Set());
  }
  for (const unit of goal.workUnits) {
    const owner = ownerByUnit.get(unit.id);
    if (owner === undefined) {
      return null;
    }
    for (const dependency of unit.dependencies) {
      const dependencyOwner = ownerByUnit.get(dependency);
      if (dependencyOwner === undefined) {
        return null;
      }
      if (dependencyOwner !== owner) {
        dependencySets.get(owner)?.add(dependencyOwner);
        successorSets.get(dependencyOwner)?.add(owner);
      }
    }
  }

  return Object.freeze(
    groups
      .map((group): InternalAgent | null => {
        const units = group.unitIds
          .map((id) => unitById.get(id))
          .filter((unit): unit is SpecialistWorkUnit => unit !== undefined);
        if (units.length !== group.unitIds.length) {
          return null;
        }
        const permissions = mergedPermissions(units);
        return {
          id: group.id,
          unitIds: group.unitIds,
          duration:
            units.reduce((total, unit) => total + unit.weight, 0) +
            goal.optimization.agentStartupCost,
          dependencies: dependencySets.get(group.id) ?? new Set(),
          successors: successorSets.get(group.id) ?? new Set(),
          readScopes: new Set(units.flatMap((unit) => [...unit.scope.read])),
          writeScopes: new Set(units.flatMap((unit) => [...unit.scope.write])),
          conflictZones: new Set(units.flatMap((unit) => [...unit.scope.conflictZones])),
          contextSourceIds: new Set(
            units.flatMap((unit) => unit.contextUses.map((contextUse) => contextUse.sourceId)),
          ),
          permissionTokens: new Set(
            permissions.flatMap((permission) =>
              permission.scopes.map((scope) => `${permission.kind}\u0000${scope}`),
            ),
          ),
        };
      })
      .filter((agent): agent is InternalAgent => agent !== null)
      .sort((left, right) => compareText(left.id, right.id)),
  );
}

function criticalPathLengths(
  agents: readonly InternalAgent[],
  order: readonly string[],
  handoffCost: number,
): ReadonlyMap<string, number> {
  const byId = new Map(agents.map((agent) => [agent.id, agent] as const));
  const lengths = new Map<string, number>();
  for (const id of [...order].reverse()) {
    const agent = byId.get(id);
    if (agent === undefined) {
      continue;
    }
    let successorLength = 0;
    for (const successor of agent.successors) {
      successorLength = Math.max(successorLength, handoffCost + (lengths.get(successor) ?? 0));
    }
    lengths.set(id, agent.duration + successorLength);
  }
  return lengths;
}

function scheduleAgents(
  agents: readonly InternalAgent[],
  order: readonly string[],
  maxConcurrency: number,
  handoffCost: number,
): readonly SpecialistAgentSchedule[] | null {
  const byId = new Map(agents.map((agent) => [agent.id, agent] as const));
  const critical = criticalPathLengths(agents, order, handoffCost);
  const pending = new Set(agents.map((agent) => agent.id));
  const completed = new Map<string, number>();
  const running = new Map<string, SpecialistAgentSchedule>();
  const schedule: SpecialistAgentSchedule[] = [];
  let time = 0;

  while (completed.size < agents.length) {
    for (const [id, item] of [...running.entries()]) {
      if (item.finish === time) {
        running.delete(id);
        completed.set(id, item.finish);
      }
    }

    const ready = [...pending]
      .map((id) => byId.get(id))
      .filter((agent): agent is InternalAgent => agent !== undefined)
      .filter((agent) => [...agent.dependencies].every((dependency) => completed.has(dependency)))
      .map((agent) => ({
        agent,
        release: [...agent.dependencies].reduce(
          (maximum, dependency) =>
            Math.max(maximum, (completed.get(dependency) ?? 0) + handoffCost),
          0,
        ),
      }))
      .filter((candidate) => candidate.release <= time)
      .sort(
        (left, right) =>
          compareNumbers(critical.get(right.agent.id) ?? 0, critical.get(left.agent.id) ?? 0) ||
          compareNumbers(right.agent.duration, left.agent.duration) ||
          compareText(left.agent.id, right.agent.id),
      );

    for (const candidate of ready) {
      if (running.size >= maxConcurrency) {
        break;
      }
      if (
        [...running.keys()].some((runningId) => {
          const runningAgent = byId.get(runningId);
          return runningAgent !== undefined && agentsConflict(candidate.agent, runningAgent);
        })
      ) {
        continue;
      }
      const item = Object.freeze({
        agentId: candidate.agent.id,
        start: time,
        finish: time + candidate.agent.duration,
      });
      schedule.push(item);
      running.set(candidate.agent.id, item);
      pending.delete(candidate.agent.id);
    }

    if (completed.size === agents.length) {
      break;
    }
    const nextFinishes = [...running.values()]
      .map((item) => item.finish)
      .filter((next) => next > time);
    const nextReleases = [...pending]
      .map((id) => byId.get(id))
      .filter((agent): agent is InternalAgent => agent !== undefined)
      .filter((agent) => [...agent.dependencies].every((dependency) => completed.has(dependency)))
      .map((agent) =>
        [...agent.dependencies].reduce(
          (maximum, dependency) =>
            Math.max(maximum, (completed.get(dependency) ?? 0) + handoffCost),
          0,
        ),
      )
      .filter((release) => release > time);
    const next = [...nextFinishes, ...nextReleases].sort(compareNumbers)[0];
    if (next === undefined) {
      return null;
    }
    time = next;
  }
  return Object.freeze(
    schedule.sort(
      (left, right) =>
        compareNumbers(left.start, right.start) || compareText(left.agentId, right.agentId),
    ),
  );
}

function analyzeCandidate(
  goal: SpecialistGoalContract,
  partition: readonly (readonly string[])[],
): CandidateAnalysis | null {
  const agents = buildInternalAgents(goal, partition);
  if (agents === null || agents.length !== partition.length) {
    return null;
  }
  const order = agentTopologicalOrder(agents);
  if (order === null) {
    return null;
  }
  const schedule = scheduleAgents(
    agents,
    order,
    goal.authority.maxConcurrency,
    goal.optimization.handoffCost,
  );
  if (schedule === null) {
    return null;
  }

  let conflictPairs = 0;
  for (let left = 0; left < agents.length; left += 1) {
    for (let right = left + 1; right < agents.length; right += 1) {
      const leftAgent = agents[left];
      const rightAgent = agents[right];
      if (
        leftAgent !== undefined &&
        rightAgent !== undefined &&
        agentsConflict(leftAgent, rightAgent)
      ) {
        conflictPairs += 1;
      }
    }
  }
  const handoffCount = agents.reduce((total, agent) => total + agent.dependencies.size, 0);
  const contextById = new Map(goal.contextSources.map((source) => [source.id, source] as const));
  const allContext = new Set<string>();
  let assignedContextBytes = 0;
  for (const agent of agents) {
    for (const contextId of agent.contextSourceIds) {
      allContext.add(contextId);
      assignedContextBytes += contextById.get(contextId)?.bytes ?? 0;
    }
  }
  const uniqueContextBytes = [...allContext].reduce(
    (total, contextId) => total + (contextById.get(contextId)?.bytes ?? 0),
    0,
  );
  const allPermissionTokens = new Set<string>();
  let assignedPermissionTokens = 0;
  for (const agent of agents) {
    assignedPermissionTokens += agent.permissionTokens.size;
    for (const token of agent.permissionTokens) {
      allPermissionTokens.add(token);
    }
  }
  const times = new Set(schedule.flatMap((item) => [item.start, item.finish]));
  let peakConcurrency = 0;
  for (const time of times) {
    peakConcurrency = Math.max(
      peakConcurrency,
      schedule.filter((item) => item.start <= time && time < item.finish).length,
    );
  }
  const metrics: SpecialistCandidateMetrics = Object.freeze({
    agentCount: agents.length,
    projectedMakespan: schedule.reduce((maximum, item) => Math.max(maximum, item.finish), 0),
    peakConcurrency,
    conflictPairs,
    handoffCount,
    duplicatedContextBytes: assignedContextBytes - uniqueContextBytes,
    duplicatedPermissionScopes: assignedPermissionTokens - allPermissionTokens.size,
    totalWorkWeight: goal.workUnits.reduce((total, unit) => total + unit.weight, 0),
    totalStartupCost: agents.length * goal.optimization.agentStartupCost,
    totalHandoffCost: handoffCount * goal.optimization.handoffCost,
  });
  return Object.freeze({ agents, metrics, schedule });
}

function evidenceIndependenceSatisfied(
  goal: SpecialistGoalContract,
  partition: readonly (readonly string[])[],
): boolean {
  const ownerByUnit = new Map<string, string>();
  for (const group of partition) {
    const owner = agentId(group);
    for (const unitId of group) {
      ownerByUnit.set(unitId, owner);
    }
  }
  const requirementOwner = new Map<string, string>();
  for (const unit of goal.workUnits) {
    for (const requirementId of unit.evidenceRequirementIds) {
      requirementOwner.set(requirementId, ownerByUnit.get(unit.id) ?? "");
    }
  }
  for (const criterion of goal.acceptanceCriteria) {
    const producerOwners = new Set(
      criterion.evidenceRequirements
        .filter((requirement) => requirement.duty === "produce")
        .map((requirement) => requirementOwner.get(requirement.id) ?? ""),
    );
    for (const requirement of criterion.evidenceRequirements) {
      if (
        requirement.independentFromProducer &&
        producerOwners.has(requirementOwner.get(requirement.id) ?? "")
      ) {
        return false;
      }
    }
  }
  return true;
}

function sortedRejections(
  rejections: ReadonlySet<SpecialistCandidateRejectionCode>,
): readonly SpecialistCandidateRejectionCode[] {
  return [...rejections].sort((left, right) => REJECTION_RANK[left] - REJECTION_RANK[right]);
}

function evaluateCandidate(
  goal: SpecialistGoalContract,
  record: CandidateRecord,
): SpecialistCandidateEvaluation {
  const rejections = new Set<SpecialistCandidateRejectionCode>();
  const known = new Set(goal.workUnits.map((unit) => unit.id));
  const seen = new Set<string>();
  if (record.partition.length > goal.authority.maxAgents) {
    rejections.add("agent_limit");
  }
  for (const group of record.partition) {
    for (const unitId of group) {
      if (!known.has(unitId)) {
        rejections.add("unknown_work_unit");
      }
      if (seen.has(unitId)) {
        rejections.add("duplicate_work_unit");
      }
      seen.add(unitId);
    }
  }
  if ([...known].some((unitId) => !seen.has(unitId))) {
    rejections.add("missing_work_unit");
  }

  let analysis: CandidateAnalysis | null = null;
  if (
    !rejections.has("unknown_work_unit") &&
    !rejections.has("duplicate_work_unit") &&
    !rejections.has("missing_work_unit") &&
    !rejections.has("agent_limit")
  ) {
    analysis = analyzeCandidate(goal, record.partition);
    if (analysis === null) {
      rejections.add("dependency_cycle");
    }
    if (!evidenceIndependenceSatisfied(goal, record.partition)) {
      rejections.add("evidence_independence");
    }
  }

  const base = {
    id: partitionId(record.partition),
    partition: record.partition,
    origins: [...record.origins].sort((left, right) => ORIGIN_RANK[left] - ORIGIN_RANK[right]),
    proposalIds: [...record.proposalIds].sort(compareText),
    eligible: rejections.size === 0,
    rejectionCodes: sortedRejections(rejections),
    metrics: analysis?.metrics ?? null,
    schedule: analysis?.schedule ?? [],
  } as const;
  return freezeJson(
    withDigest(
      "swecircuit.specialist.candidate-evaluation.v1",
      base as unknown as JsonObject,
    ) as unknown as SpecialistCandidateEvaluation,
  );
}

function compareEligibleCandidates(
  left: SpecialistCandidateEvaluation,
  right: SpecialistCandidateEvaluation,
): number {
  const leftMetrics = left.metrics;
  const rightMetrics = right.metrics;
  if (leftMetrics === null || rightMetrics === null) {
    return leftMetrics === null ? (rightMetrics === null ? compareText(left.id, right.id) : 1) : -1;
  }
  return (
    compareNumbers(leftMetrics.projectedMakespan, rightMetrics.projectedMakespan) ||
    compareNumbers(leftMetrics.conflictPairs, rightMetrics.conflictPairs) ||
    compareNumbers(leftMetrics.handoffCount, rightMetrics.handoffCount) ||
    compareNumbers(leftMetrics.duplicatedContextBytes, rightMetrics.duplicatedContextBytes) ||
    compareNumbers(
      leftMetrics.duplicatedPermissionScopes,
      rightMetrics.duplicatedPermissionScopes,
    ) ||
    compareNumbers(leftMetrics.agentCount, rightMetrics.agentCount) ||
    compareText(partitionSignature(left.partition), partitionSignature(right.partition))
  );
}

function compareAllCandidates(
  left: SpecialistCandidateEvaluation,
  right: SpecialistCandidateEvaluation,
): number {
  if (left.eligible !== right.eligible) {
    return left.eligible ? -1 : 1;
  }
  if (left.eligible) {
    return compareEligibleCandidates(left, right);
  }
  return (
    compareNumbers(left.rejectionCodes.length, right.rejectionCodes.length) ||
    compareText(partitionSignature(left.partition), partitionSignature(right.partition))
  );
}

const METRIC_COMPARATOR_FIELDS = Object.freeze([
  "projectedMakespan",
  "conflictPairs",
  "handoffCount",
  "duplicatedContextBytes",
  "duplicatedPermissionScopes",
  "agentCount",
] as const satisfies readonly SpecialistComparatorField[]);

function selectionReason(
  selected: SpecialistCandidateEvaluation,
  serialBaseline: SpecialistCandidateEvaluation,
): SpecialistSelectionReason {
  if (selected.id === serialBaseline.id) {
    return freezeJson({
      kind: "serial_selected",
      decisiveField: "serial_baseline",
      selectedValue: selected.id,
      serialValue: serialBaseline.id,
      serialRejectionCodes: serialBaseline.rejectionCodes,
    });
  }
  if (!serialBaseline.eligible) {
    return freezeJson({
      kind: "serial_ineligible",
      decisiveField: serialBaseline.rejectionCodes[0] ?? "serial_baseline",
      selectedValue: "eligible",
      serialValue: "ineligible",
      serialRejectionCodes: serialBaseline.rejectionCodes,
    });
  }
  if (selected.metrics === null || serialBaseline.metrics === null) {
    throw new TypeError("Eligible candidate selection is missing metrics.");
  }
  for (const field of METRIC_COMPARATOR_FIELDS) {
    const selectedValue = selected.metrics[field];
    const serialValue = serialBaseline.metrics[field];
    if (selectedValue !== serialValue) {
      if (selectedValue > serialValue) {
        throw new TypeError("Selected candidate does not outrank the serial baseline.");
      }
      return freezeJson({
        kind: "lower_metric",
        decisiveField: field,
        selectedValue,
        serialValue,
        serialRejectionCodes: serialBaseline.rejectionCodes,
      });
    }
  }
  return freezeJson({
    kind: "canonical_tiebreak",
    decisiveField: "canonicalPartitionIdentity",
    selectedValue: partitionSignature(selected.partition),
    serialValue: partitionSignature(serialBaseline.partition),
    serialRejectionCodes: serialBaseline.rejectionCodes,
  });
}
function requirementIndex(goal: SpecialistGoalContract): ReadonlyMap<
  string,
  Readonly<{
    criterion: SpecialistAcceptanceCriterion;
    requirement: SpecialistAcceptanceCriterion["evidenceRequirements"][number];
  }>
> {
  const result = new Map<
    string,
    Readonly<{
      criterion: SpecialistAcceptanceCriterion;
      requirement: SpecialistAcceptanceCriterion["evidenceRequirements"][number];
    }>
  >();
  for (const criterion of goal.acceptanceCriteria) {
    for (const requirement of criterion.evidenceRequirements) {
      result.set(requirement.id, { criterion, requirement });
    }
  }
  return result;
}

function aggregateContextUses(
  units: readonly SpecialistWorkUnit[],
  sources: ReadonlyMap<string, SpecialistContextSource>,
): readonly AgentBlueprintContextUse[] {
  const uses = new Map<string, { purposes: Set<string>; workUnitIds: Set<string> }>();
  for (const unit of units) {
    for (const contextUse of unit.contextUses) {
      const entry = uses.get(contextUse.sourceId) ?? {
        purposes: new Set<string>(),
        workUnitIds: new Set<string>(),
      };
      entry.purposes.add(contextUse.purpose);
      entry.workUnitIds.add(unit.id);
      uses.set(contextUse.sourceId, entry);
    }
  }
  return [...uses.entries()]
    .map(([sourceId, use]) => {
      const source = sources.get(sourceId);
      if (source === undefined) {
        throw new TypeError("Validated context source is missing.");
      }
      const common = {
        sourceId,
        kind: source.kind,
        locator: source.locator,
        digest: source.digest,
        bytes: source.bytes,
        purposes: [...use.purposes].sort(compareText),
        workUnitIds: [...use.workUnitIds].sort(compareText),
      } as const;
      return source.kind === "repository" ? { ...common, readScope: source.readScope } : common;
    })
    .sort((left, right) => compareText(left.sourceId, right.sourceId));
}

function compileBlueprints(
  goal: SpecialistGoalContract,
  goalDigest: string,
  selected: SpecialistCandidateEvaluation,
): readonly AgentBlueprint[] {
  const unitById = new Map(goal.workUnits.map((unit) => [unit.id, unit] as const));
  const sourceById = new Map(goal.contextSources.map((source) => [source.id, source] as const));
  const requirements = requirementIndex(goal);
  const ownerByUnit = new Map<string, string>();
  for (const group of selected.partition) {
    const id = agentId(group);
    for (const unitId of group) {
      ownerByUnit.set(unitId, id);
    }
  }

  return Object.freeze(
    selected.partition
      .map((group): AgentBlueprint => {
        const id = agentId(group);
        const units = group.map((unitId) => {
          const unit = unitById.get(unitId);
          if (unit === undefined) {
            throw new TypeError("Selected candidate references an unknown work unit.");
          }
          return unit;
        });
        const modules = new Map<string, SpecialistModuleBinding>();
        for (const unit of units) {
          modules.set(unit.module.id, unit.module);
        }
        const dependencies = new Set<string>();
        for (const unit of units) {
          for (const dependency of unit.dependencies) {
            const owner = ownerByUnit.get(dependency);
            if (owner !== undefined && owner !== id) {
              dependencies.add(owner);
            }
          }
        }
        const evidenceDuties: AgentBlueprintEvidenceDuty[] = [];
        for (const unit of units) {
          for (const requirementId of unit.evidenceRequirementIds) {
            const entry = requirements.get(requirementId);
            if (entry === undefined) {
              throw new TypeError("Validated evidence requirement is missing.");
            }
            evidenceDuties.push({
              criterionId: entry.criterion.id,
              criterion: entry.criterion.description,
              requirementId,
              kind: entry.requirement.kind,
              duty: entry.requirement.duty,
              description: entry.requirement.description,
              independentFromProducer: entry.requirement.independentFromProducer,
            });
          }
        }
        const permissions = mergedPermissions(units);
        const base = {
          apiVersion: SPECIALIST_API_VERSION,
          kind: "AgentBlueprint",
          id,
          goalId: goal.id,
          goalRevision: goal.revision,
          goalDigest,
          candidateId: selected.id,
          workUnitIds: group,
          objectives: units
            .map((unit) => ({ workUnitId: unit.id, objective: unit.objective }))
            .sort((left, right) => compareText(left.workUnitId, right.workUnitId)),
          modules: [...modules.values()].sort((left, right) => compareText(left.id, right.id)),
          dependencies: [...dependencies].sort(compareText),
          contextUses: aggregateContextUses(units, sourceById),
          authority: {
            requiredCapabilities: [
              ...new Set(units.flatMap((unit) => [...unit.requiredCapabilities])),
            ].sort(compareText),
            scope: {
              read: [...new Set(units.flatMap((unit) => [...unit.scope.read]))].sort(compareText),
              write: [...new Set(units.flatMap((unit) => [...unit.scope.write]))].sort(compareText),
              conflictZones: [
                ...new Set(units.flatMap((unit) => [...unit.scope.conflictZones])),
              ].sort(compareText),
            },
            permissions,
            forbiddenEffects: goal.authority.forbiddenEffects,
          },
          evidenceDuties: evidenceDuties.sort(
            (left, right) =>
              compareText(left.criterionId, right.criterionId) ||
              compareText(left.requirementId, right.requirementId),
          ),
          handoff: {
            destination: goal.integrationOwner,
            artifacts: [...new Set(units.flatMap((unit) => [...unit.handoffArtifacts]))].sort(
              compareText,
            ),
            requiredFields: HANDOFF_FIELDS,
          },
          stopConditions: [...new Set(units.flatMap((unit) => [...unit.stopConditions]))].sort(
            compareText,
          ),
        } as const;
        return freezeJson(
          withDigest(
            "swecircuit.specialist.blueprint.v1",
            base as unknown as JsonObject,
          ) as unknown as AgentBlueprint,
        );
      })
      .sort((left, right) => compareText(left.id, right.id)),
  );
}

function launchWaves(
  schedule: readonly SpecialistAgentSchedule[],
): readonly SpecialistLaunchWave[] {
  const waves = new Map<number, string[]>();
  for (const item of schedule) {
    const agents = waves.get(item.start) ?? [];
    agents.push(item.agentId);
    waves.set(item.start, agents);
  }
  return Object.freeze(
    [...waves.entries()]
      .sort((left, right) => compareNumbers(left[0], right[0]))
      .map(([start, agentIds]) =>
        Object.freeze({ start, agentIds: Object.freeze(agentIds.sort(compareText)) }),
      ),
  );
}

function buildCandidatePlan(
  goal: SpecialistGoalContract,
  proposals: readonly SpecialistCandidateProposal[],
): CandidatePlan {
  const goalDigest = digestCanonicalJson("swecircuit.specialist.goal.v1", asJson(goal));
  const candidates = buildCandidates(goal, proposals);
  const evaluations = candidates.records.map((record) => evaluateCandidate(goal, record));
  const ranked = [...evaluations].sort(compareAllCandidates);
  const selected = ranked.find((evaluation) => evaluation.eligible) ?? null;
  const serialSignature = partitionSignature([goal.workUnits.map((unit) => unit.id)]);
  const serialBaseline = evaluations.find(
    (evaluation) => partitionSignature(evaluation.partition) === serialSignature,
  );
  if (serialBaseline === undefined) {
    throw new TypeError("Candidate search omitted the serial baseline.");
  }
  const proposalEvaluations = evaluations
    .filter((evaluation) => evaluation.proposalIds.length > 0)
    .sort((left, right) => compareText(left.id, right.id));
  const alternatives = ranked
    .filter((evaluation) => selected === null || evaluation.id !== selected.id)
    .slice(0, SPECIALIST_LIMITS.retainedAlternatives);
  const evaluationSetDigest = digestCanonicalJson(
    "swecircuit.specialist.evaluation-set.v1",
    asJson(
      [...evaluations]
        .sort((left, right) => compareText(left.id, right.id))
        .map((evaluation) => ({ id: evaluation.id, contentDigest: evaluation.contentDigest })),
    ),
  );
  const search: SpecialistSearchSummary = freezeJson({
    mode: candidates.mode,
    claim:
      candidates.mode === "exact"
        ? "exhaustive_partition_search_fixed_scheduler"
        : "bounded_evaluated_set_no_global_optimum",
    workUnitCount: goal.workUnits.length,
    evaluatedCandidates: evaluations.length,
    eligibleCandidates: evaluations.filter((evaluation) => evaluation.eligible).length,
    retainedAlternatives: alternatives.length,
    evaluationSetDigest,
  });
  return Object.freeze({
    goalDigest,
    serialBaseline,
    proposalEvaluations: Object.freeze(proposalEvaluations),
    selected,
    selectionReason: selected === null ? null : selectionReason(selected, serialBaseline),
    alternatives: Object.freeze(alternatives),
    search,
  });
}

function analyzeRequest(
  request: CompileAgentBlueprintsInput,
): OperationResult<SpecialistCandidateAnalysis> {
  const goal = request.goal;
  const plan = buildCandidatePlan(goal, request.proposedCandidates ?? []);
  const base = {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCandidateAnalysis",
    goalId: goal.id,
    goalRevision: goal.revision,
    goalDigest: plan.goalDigest,
    selectionStatus: plan.selected === null ? "no_eligible_candidate" : "selected",
    proposalEvaluations: plan.proposalEvaluations,
    search: plan.search,
    serialBaseline: plan.serialBaseline,
    selected: plan.selected,
    selectionReason: plan.selectionReason,
    alternatives: plan.alternatives,
  } as const;
  if (
    boundedJsonUtf8ByteLength(
      asJson({ ...base, contentDigest: CONTENT_DIGEST_PLACEHOLDER }),
      SPECIALIST_LIMITS.outputBytes,
    ) === null
  ) {
    return operationResult<SpecialistCandidateAnalysis>(
      [createDiagnostic("SC4308", REQUEST_ARTIFACT, "/goal/workUnits")],
      null,
    );
  }
  return operationResult(
    [],
    freezeJson(
      withDigest(
        "swecircuit.specialist.candidate-analysis.v1",
        base as unknown as JsonObject,
      ) as unknown as SpecialistCandidateAnalysis,
    ),
  );
}
function compileRequest(
  request: CompileAgentBlueprintsInput,
): OperationResult<AgentBlueprintCompilation> {
  const goal = request.goal;
  const proposals = request.proposedCandidates ?? [];
  const authority = buildAuthorityProjection(goal);
  const plan = buildCandidatePlan(goal, proposals);
  if (plan.selected === null || plan.selectionReason === null) {
    return operationResult<AgentBlueprintCompilation>(
      [createDiagnostic("SC4306", REQUEST_ARTIFACT, "/goal/workUnits")],
      null,
    );
  }
  const selected = plan.selected;
  const goalDigest = plan.goalDigest;
  const blueprints = compileBlueprints(goal, goalDigest, selected);
  const waves = launchWaves(selected.schedule);
  const reason = plan.selectionReason;
  const base = {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "AgentBlueprintCompilation",
    goal,
    goalDigest,
    proposedCandidates: proposals,
    proposalEvaluations: plan.proposalEvaluations,
    authority,
    search: plan.search,
    serialBaseline: plan.serialBaseline,
    selected,
    selectionReason: reason,
    alternatives: plan.alternatives,
    blueprints,
    launchWaves: waves,
  } as const;
  if (
    boundedJsonUtf8ByteLength(
      asJson({ ...base, contentDigest: CONTENT_DIGEST_PLACEHOLDER }),
      SPECIALIST_LIMITS.outputBytes,
    ) === null
  ) {
    return operationResult<AgentBlueprintCompilation>(
      [createDiagnostic("SC4308", REQUEST_ARTIFACT, "/goal/workUnits")],
      null,
    );
  }
  const compilation = freezeJson(
    withDigest(
      "swecircuit.specialist.compilation.v1",
      base as unknown as JsonObject,
    ) as unknown as AgentBlueprintCompilation,
  );
  return operationResult([], compilation);
}

export function analyzeSpecialistCandidates(
  input: unknown,
): OperationResult<SpecialistCandidateAnalysis> {
  try {
    const parsed = parseRequest(input);
    if (parsed.request === null) {
      return operationResult<SpecialistCandidateAnalysis>(parsed.diagnostics, null);
    }
    return analyzeRequest(parsed.request);
  } catch {
    return operationResult<SpecialistCandidateAnalysis>(
      [createDiagnostic("SC9001", REQUEST_ARTIFACT)],
      null,
    );
  }
}

export function compileAgentBlueprints(input: unknown): OperationResult<AgentBlueprintCompilation> {
  try {
    const parsed = parseRequest(input);
    if (parsed.request === null) {
      return operationResult<AgentBlueprintCompilation>(parsed.diagnostics, null);
    }
    return compileRequest(parsed.request);
  } catch {
    return operationResult<AgentBlueprintCompilation>(
      [createDiagnostic("SC9001", REQUEST_ARTIFACT)],
      null,
    );
  }
}

export function verifyCompilationDigest(compilation: AgentBlueprintCompilation): boolean {
  try {
    if (boundedJsonUtf8ByteLength(asJson(compilation), SPECIALIST_LIMITS.outputBytes) === null) {
      return false;
    }
    return (
      compilation.contentDigest ===
      digestCanonicalJson(
        "swecircuit.specialist.compilation.v1",
        asJson(withoutDigest(compilation)),
      )
    );
  } catch {
    return false;
  }
}
