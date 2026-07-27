import { boundedJsonUtf8ByteLength, canonicalJson, digestCanonicalJson } from "./canonical-json.js";
import type { JsonValue } from "./model.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import {
  type RuntimeRoutingSchemaIssue,
  validateRuntimeAssignmentCompilationSchema,
  validateRuntimeAssignmentExpectationSchema,
  validateRuntimeAssignmentOverrideSchema,
  validateRuntimeRoutingRequestSchema,
} from "./runtime-routing-schema.js";
import {
  type CompileRuntimeAssignmentsRequest,
  type HostInventoryRow,
  RUNTIME_ROUTING_API_VERSION,
  RUNTIME_ROUTING_LIMITS,
  type RuntimeAssignment,
  type RuntimeAssignmentCompilation,
  type RuntimeAssignmentExpectation,
  type RuntimeAssignmentOverride,
  type RuntimeAssignmentSearch,
  type RuntimeAssignmentVector,
  type RuntimeCalibrationRow,
  type RuntimeDemand,
  type RuntimeDemandPolicy,
  type RuntimeObservationMode,
  type RuntimeObservationRequirement,
  type RuntimeRowComparator,
  type RuntimeRowEvaluation,
  type RuntimeRowRejectionCode,
  type RuntimeVectorComparator,
} from "./runtime-routing-types.js";
import { snapshotJsonValue } from "./snapshot.js";
import { verifyCompilationDigest } from "./specialist-compiler.js";
import type { AgentBlueprint, AgentBlueprintCompilation } from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic, OperationResult } from "./types.js";

const REQUEST_ARTIFACT = "runtime-routing-request.json";
const COMPILATION_ARTIFACT = "runtime-assignment-compilation.json";
const OVERRIDE_ARTIFACT = "runtime-assignment-override.json";
const EXPECTATION_ARTIFACT = "runtime-assignment-expectation.json";
const DIGEST_PLACEHOLDER = `sha256:${"0".repeat(64)}`;

type RoutingDiagnosticCode =
  | "SC4501"
  | "SC4502"
  | "SC4503"
  | "SC4504"
  | "SC4505"
  | "SC4506"
  | "SC4507"
  | "SC4508"
  | "SC4509"
  | "SC4510";

const ROUTING_DIAGNOSTICS = Object.freeze({
  SC4501: ["runtime.schema.invalid", "A runtime-routing value does not satisfy its closed schema."],
  SC4502: ["runtime.limit.exceeded", "A runtime-routing value exceeds a published resource limit."],
  SC4503: [
    "runtime.policy.coverage",
    "Runtime demand policy coverage or tier identity is invalid.",
  ],
  SC4504: ["runtime.supply.binding", "Runtime calibration or inventory binding is invalid."],
  SC4505: ["runtime.specialist.relationship", "A specialist or evidence relationship is invalid."],
  SC4506: ["runtime.assignment.infeasible", "No feasible runtime assignment vector exists."],
  SC4507: [
    "runtime.assignment.bounded-empty",
    "Bounded search found no feasible evaluated vector.",
  ],
  SC4508: ["runtime.override.invalid", "The runtime assignment override is invalid or infeasible."],
  SC4509: ["runtime.expectation.mismatch", "The runtime assignment expectation does not match."],
  SC4510: ["runtime.digest.mismatch", "A runtime digest or canonical identity does not match."],
} as const);

const ROW_REJECTION_ORDER: readonly RuntimeRowRejectionCode[] = Object.freeze([
  "unavailable",
  "quality_tier",
  "reasoning_tier",
  "context_capacity",
  "required_tool",
  "required_skill",
  "isolation_feature",
  "permission_feature",
  "observation_mode",
]);

const OBSERVATION_FIELDS = Object.freeze([
  "model",
  "effort",
  "tools",
  "skills",
  "isolation",
  "permissions",
  "workspace",
  "context",
] as const);

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function diagnostic(code: RoutingDiagnosticCode, artifact: string, pointer = ""): Diagnostic {
  const [rule, message] = ROUTING_DIAGNOSTICS[code];
  return Object.freeze({
    code,
    severity: "error",
    artifact,
    pointer,
    rule,
    message,
    hint: "Correct the value at the indicated JSON Pointer.",
  }) as Diagnostic;
}

function result<T>(diagnostics: readonly Diagnostic[], value: T | null): OperationResult<T> {
  const unique = new Map<string, Diagnostic>();
  for (const entry of diagnostics) {
    unique.set(`${entry.artifact}\u0000${entry.pointer}\u0000${entry.code}`, entry);
  }
  const ordered = Object.freeze(
    [...unique.values()].sort(
      (left, right) =>
        compareText(left.artifact, right.artifact) ||
        compareText(left.pointer, right.pointer) ||
        compareText(left.code, right.code),
    ),
  );
  return Object.freeze({
    ok: ordered.length === 0,
    exitCode: ordered.length === 0 ? 0 : 2,
    diagnostics: ordered,
    value: ordered.length === 0 ? value : null,
  }) as OperationResult<T>;
}

function schemaDiagnostics(
  issues: readonly RuntimeRoutingSchemaIssue[],
  artifact: string,
): readonly Diagnostic[] {
  return issues.map((issue) =>
    diagnostic(issue.limit ? "SC4502" : "SC4501", artifact, issue.pointer),
  );
}

function scanStrings(
  value: JsonValue,
  callback: (value: string, property: string) => void,
  property = "",
): void {
  if (typeof value === "string") {
    callback(value, property);
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      scanStrings(entry, callback, property);
    }
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      callback(key, "");
      scanStrings(entry, callback, key);
    }
  }
}

function isIdentifierProperty(property: string): boolean {
  return (
    property === "id" ||
    property.endsWith("Id") ||
    property.endsWith("Ids") ||
    property.endsWith("Tier") ||
    property === "apiVersion" ||
    property === "kind" ||
    property === "duty" ||
    property === "assessedBy" ||
    property === "adapterRevision" ||
    property === "runtimeFamily" ||
    property === "independenceDomain" ||
    property === "completeness" ||
    property === "availability" ||
    property === "mode" ||
    property === "claim" ||
    property === "selectionReason" ||
    property === "requestedBy" ||
    property.startsWith("required") ||
    property.endsWith("Features")
  );
}

function snapshotInput(
  value: unknown,
  artifact: string,
): Readonly<{
  available: boolean;
  value: JsonValue;
  diagnostics: readonly Diagnostic[];
}> {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null) {
    return Object.freeze({
      available: false,
      value: null,
      diagnostics: Object.freeze([
        diagnostic(snapshot.failure === "invalid" ? "SC4501" : "SC4502", artifact),
      ]),
    });
  }
  const snapshotValue = snapshot.value as JsonValue;
  let bytes: number | null = null;
  try {
    bytes = boundedJsonUtf8ByteLength(snapshotValue, RUNTIME_ROUTING_LIMITS.maxCanonicalBytes);
  } catch {
    return Object.freeze({
      available: false,
      value: null,
      diagnostics: Object.freeze([diagnostic("SC4501", artifact)]),
    });
  }
  if (bytes === null) {
    return Object.freeze({
      available: true,
      value: snapshotValue,
      diagnostics: Object.freeze([diagnostic("SC4502", artifact)]),
    });
  }
  let invalid = false;
  let limit = false;
  scanStrings(snapshotValue, (entry, property) => {
    invalid =
      invalid ||
      containsLoneSurrogate(entry) ||
      containsControlCharacters(entry) ||
      containsHighConfidenceSecret(entry);
    const byteLimit = isIdentifierProperty(property)
      ? RUNTIME_ROUTING_LIMITS.maxIdentifierBytes
      : RUNTIME_ROUTING_LIMITS.maxTextBytes;
    limit = limit || Buffer.byteLength(entry, "utf8") > byteLimit;
  });
  const diagnostics: Diagnostic[] = [];
  if (limit) diagnostics.push(diagnostic("SC4502", artifact));
  if (invalid) diagnostics.push(diagnostic("SC4501", artifact));
  return Object.freeze({
    available: true,
    value: snapshotValue,
    diagnostics: Object.freeze(diagnostics),
  });
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed runtime-routing value is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function contentDigest(domain: string, value: Readonly<{ contentDigest: string }>): string {
  return digestCanonicalJson(domain, asJson({ ...value, contentDigest: DIGEST_PLACEHOLDER }));
}

function withDigest<T extends object>(
  domain: string,
  value: T,
): T & { readonly contentDigest: string } {
  const candidate = { ...value, contentDigest: DIGEST_PLACEHOLDER };
  return freezeJson({
    ...value,
    contentDigest: digestCanonicalJson(domain, asJson(candidate)),
  }) as T & { readonly contentDigest: string };
}

function isSortedUnique(values: readonly string[]): boolean {
  return values.every((value, index) => index === 0 || compareText(values[index - 1]!, value) < 0);
}

function sortedUnion(...sets: readonly (readonly string[])[]): readonly string[] {
  return Object.freeze([...new Set(sets.flat())].sort(compareText));
}

function duplicateKeys(values: readonly string[]): boolean {
  return new Set(values).size !== values.length;
}

function tierMap(tiers: RuntimeDemandPolicy["qualityTiers"]): ReadonlyMap<string, number> | null {
  const ids = tiers.map((tier) => tier.id);
  const ranks = tiers.map((tier) => tier.rank);
  if (duplicateKeys(ids) || new Set(ranks).size !== ranks.length) {
    return null;
  }
  return new Map(tiers.map((tier) => [tier.id, tier.rank]));
}

function validateLogicalSets(
  policy: RuntimeDemandPolicy,
  rows: readonly RuntimeCalibrationRow[],
): boolean {
  for (const rule of policy.capabilityRules) {
    if (
      !isSortedUnique(rule.requiredTools) ||
      !isSortedUnique(rule.requiredSkills) ||
      !isSortedUnique(rule.requiredIsolationFeatures) ||
      !isSortedUnique(rule.requiredPermissionFeatures)
    ) {
      return false;
    }
  }
  for (const rule of policy.permissionRules) {
    if (
      !isSortedUnique(rule.requiredIsolationFeatures) ||
      !isSortedUnique(rule.requiredPermissionFeatures)
    ) {
      return false;
    }
  }
  return rows.every(
    (row) =>
      isSortedUnique(row.capabilities.map((entry) => entry.capabilityId)) &&
      isSortedUnique(row.tools) &&
      isSortedUnique(row.skills) &&
      isSortedUnique(row.isolationFeatures) &&
      isSortedUnique(row.permissionFeatures) &&
      isSortedUnique(row.evidence.map((entry) => entry.id)),
  );
}

function validatePolicyAndSupply(
  request: CompileRuntimeAssignmentsRequest,
): RoutingDiagnosticCode | null {
  const { compilation, policy, calibration, inventory } = request;
  if (
    compilation.blueprints.length > RUNTIME_ROUTING_LIMITS.maxBlueprints ||
    policy.capabilityRules.length + policy.evidenceRules.length + policy.permissionRules.length >
      RUNTIME_ROUTING_LIMITS.maxPolicyRules ||
    calibration.runtimeRows.reduce((sum, row) => sum + row.evidence.length, 0) >
      RUNTIME_ROUTING_LIMITS.maxEvidenceBindings
  ) {
    return "SC4502";
  }
  const quality = tierMap(policy.qualityTiers);
  const reasoning = tierMap(policy.reasoningTiers);
  if (quality === null || reasoning === null) return "SC4503";
  const capabilityKeys = policy.capabilityRules.map((rule) => rule.capabilityId);
  const evidenceKeys = policy.evidenceRules.map((rule) => `${rule.kind}\u001f${rule.duty}`);
  const permissionKeys = policy.permissionRules.map((rule) => rule.kind);
  if (
    duplicateKeys(capabilityKeys) ||
    duplicateKeys(evidenceKeys) ||
    duplicateKeys(permissionKeys)
  ) {
    return "SC4503";
  }
  const tierReferencesValid =
    policy.capabilityRules.every(
      (rule) => quality.has(rule.minimumQualityTier) && reasoning.has(rule.minimumReasoningTier),
    ) &&
    policy.evidenceRules.every(
      (rule) => quality.has(rule.minimumQualityTier) && reasoning.has(rule.minimumReasoningTier),
    ) &&
    calibration.runtimeRows.every(
      (row) =>
        reasoning.has(row.reasoningTier) &&
        row.capabilities.every((capability) => quality.has(capability.qualityTier)),
    );
  if (!tierReferencesValid) return "SC4503";
  const usedCapabilities = new Set(
    compilation.blueprints.flatMap((blueprint) => blueprint.authority.requiredCapabilities),
  );
  const usedEvidence = new Set(
    compilation.blueprints.flatMap((blueprint) =>
      blueprint.evidenceDuties.map((duty) => `${duty.kind}\u001f${duty.duty}`),
    ),
  );
  const usedPermissions = new Set(
    compilation.blueprints.flatMap((blueprint) =>
      blueprint.authority.permissions.map((permission) => permission.kind),
    ),
  );
  if (
    [...usedCapabilities].some((id) => !capabilityKeys.includes(id)) ||
    [...usedEvidence].some((id) => !evidenceKeys.includes(id)) ||
    [...usedPermissions].some((id) => !permissionKeys.includes(id))
  ) {
    return "SC4503";
  }
  const rowIds = calibration.runtimeRows.map((row) => row.id);
  const profileEfforts = calibration.runtimeRows.map(
    (row) => `${row.profileId}\u001f${row.effortId}`,
  );
  const inventoryIds = inventory.rows.map((row) => row.calibrationRowId);
  if (
    duplicateKeys(rowIds) ||
    duplicateKeys(profileEfforts) ||
    duplicateKeys(inventoryIds) ||
    inventoryIds.some((id) => !rowIds.includes(id)) ||
    inventory.adapterId !== calibration.adapterId ||
    inventory.adapterRevision !== calibration.adapterRevision ||
    !isSortedUnique(rowIds) ||
    !isSortedUnique(inventoryIds) ||
    !validateLogicalSets(policy, calibration.runtimeRows)
  ) {
    return "SC4504";
  }
  return null;
}

function rankMaximum(ids: readonly string[], ranks: ReadonlyMap<string, number>): string {
  return [...ids].sort((left, right) => {
    const difference = (ranks.get(right) ?? -1) - (ranks.get(left) ?? -1);
    return difference || compareText(left, right);
  })[0]!;
}

function deriveRelationships(blueprints: readonly AgentBlueprint[]): Readonly<{
  producersByChecker: ReadonlyMap<string, ReadonlySet<string>>;
  checkersByProducer: ReadonlyMap<string, ReadonlySet<string>>;
}> | null {
  const producersByChecker = new Map<string, Set<string>>();
  const checkersByProducer = new Map<string, Set<string>>();
  const criteria = new Set(
    blueprints.flatMap((blueprint) => blueprint.evidenceDuties.map((duty) => duty.criterionId)),
  );
  for (const criterion of criteria) {
    const producers = blueprints
      .filter((blueprint) =>
        blueprint.evidenceDuties.some(
          (duty) => duty.criterionId === criterion && duty.duty === "produce",
        ),
      )
      .map((blueprint) => blueprint.id);
    const checkers = blueprints
      .filter((blueprint) =>
        blueprint.evidenceDuties.some(
          (duty) => duty.criterionId === criterion && duty.independentFromProducer,
        ),
      )
      .map((blueprint) => blueprint.id);
    for (const checker of checkers) {
      if (producers.length === 0 || producers.includes(checker)) return null;
      const producerSet = producersByChecker.get(checker) ?? new Set<string>();
      for (const producer of producers) {
        producerSet.add(producer);
        const checkerSet = checkersByProducer.get(producer) ?? new Set<string>();
        checkerSet.add(checker);
        checkersByProducer.set(producer, checkerSet);
      }
      producersByChecker.set(checker, producerSet);
    }
  }
  return Object.freeze({ producersByChecker, checkersByProducer });
}

function deriveDemands(
  compilation: AgentBlueprintCompilation,
  policy: RuntimeDemandPolicy,
): readonly RuntimeDemand[] | null {
  const relationships = deriveRelationships(compilation.blueprints);
  if (relationships === null) return null;
  const qualityRanks = tierMap(policy.qualityTiers)!;
  const reasoningRanks = tierMap(policy.reasoningTiers)!;
  const capabilityRules = new Map(policy.capabilityRules.map((rule) => [rule.capabilityId, rule]));
  const evidenceRules = new Map(
    policy.evidenceRules.map((rule) => [`${rule.kind}\u001f${rule.duty}`, rule]),
  );
  const permissionRules = new Map(policy.permissionRules.map((rule) => [rule.kind, rule]));
  return Object.freeze(
    [...compilation.blueprints]
      .sort((left, right) => compareText(left.id, right.id))
      .map((blueprint) => {
        const ownedEvidenceRules = blueprint.evidenceDuties.map(
          (duty) => evidenceRules.get(`${duty.kind}\u001f${duty.duty}`)!,
        );
        const evidenceQuality = ownedEvidenceRules.map((rule) => rule.minimumQualityTier);
        const capabilityRuleValues = blueprint.authority.requiredCapabilities.map(
          (id) => capabilityRules.get(id)!,
        );
        const requiredCapabilities = [...blueprint.authority.requiredCapabilities]
          .sort(compareText)
          .map((capabilityId) => {
            const rule = capabilityRules.get(capabilityId)!;
            return Object.freeze({
              capabilityId,
              minimumQualityTier: rankMaximum(
                [rule.minimumQualityTier, ...evidenceQuality],
                qualityRanks,
              ),
            });
          });
        const reasoningCandidates = [
          ...capabilityRuleValues.map((rule) => rule.minimumReasoningTier),
          ...ownedEvidenceRules.map((rule) => rule.minimumReasoningTier),
        ];
        const contextBytes = [
          ...new Map(blueprint.contextUses.map((use) => [use.sourceId, use.bytes])).values(),
        ].reduce((sum, bytes) => {
          const next = sum + bytes;
          if (!Number.isSafeInteger(next)) throw new RangeError("context bytes");
          return next;
        }, 0);
        if (contextBytes > RUNTIME_ROUTING_LIMITS.maxContextBytes) {
          throw new RangeError("context bytes");
        }
        const permissionRuleValues = blueprint.authority.permissions.map(
          (permission) => permissionRules.get(permission.kind)!,
        );
        const base = {
          agentId: blueprint.id,
          blueprintDigest: blueprint.contentDigest,
          requiredCapabilities,
          minimumReasoningTier: rankMaximum(reasoningCandidates, reasoningRanks),
          contextBytes,
          requiredTools: sortedUnion(...capabilityRuleValues.map((rule) => rule.requiredTools)),
          requiredSkills: sortedUnion(...capabilityRuleValues.map((rule) => rule.requiredSkills)),
          requiredIsolationFeatures: sortedUnion(
            ...capabilityRuleValues.map((rule) => rule.requiredIsolationFeatures),
            ...permissionRuleValues.map((rule) => rule.requiredIsolationFeatures),
          ),
          requiredPermissionFeatures: sortedUnion(
            ...capabilityRuleValues.map((rule) => rule.requiredPermissionFeatures),
            ...permissionRuleValues.map((rule) => rule.requiredPermissionFeatures),
          ),
          observability: policy.observability,
          producerAgentIds: Object.freeze(
            [...(relationships.producersByChecker.get(blueprint.id) ?? [])].sort(compareText),
          ),
          checkerAgentIds: Object.freeze(
            [...(relationships.checkersByProducer.get(blueprint.id) ?? [])].sort(compareText),
          ),
        } as const;
        return withDigest("swecircuit/runtime-routing/demand/v1alpha1", base);
      }),
  );
}

function observationSatisfied(
  requirement: RuntimeObservationRequirement,
  mode: RuntimeObservationMode,
): boolean {
  return (
    mode === "observed" ||
    (requirement === "host_attestation_allowed" && mode === "host_attested_unobservable")
  );
}

function evaluateRow(
  demand: RuntimeDemand,
  row: RuntimeCalibrationRow,
  inventory: HostInventoryRow,
  policy: RuntimeDemandPolicy,
): RuntimeRowEvaluation {
  const qualityRanks = tierMap(policy.qualityTiers)!;
  const reasoningRanks = tierMap(policy.reasoningTiers)!;
  const suppliedCapabilities = new Map(
    row.capabilities.map((capability) => [capability.capabilityId, capability.qualityTier]),
  );
  const rejections = new Map<RuntimeRowRejectionCode, Set<string>>();
  const reject = (code: RuntimeRowRejectionCode, id: string): void => {
    const values = rejections.get(code) ?? new Set<string>();
    values.add(id);
    rejections.set(code, values);
  };
  if (inventory.availability === "unavailable") {
    reject("unavailable", `availability:${row.id}`);
  }
  let qualityExcess = 0;
  for (const required of demand.requiredCapabilities) {
    const suppliedTier = suppliedCapabilities.get(required.capabilityId);
    if (
      suppliedTier === undefined ||
      qualityRanks.get(suppliedTier)! < qualityRanks.get(required.minimumQualityTier)!
    ) {
      reject("quality_tier", `capability:${required.capabilityId}`);
    } else {
      qualityExcess +=
        qualityRanks.get(suppliedTier)! - qualityRanks.get(required.minimumQualityTier)!;
    }
  }
  const reasoningExcess =
    reasoningRanks.get(row.reasoningTier)! - reasoningRanks.get(demand.minimumReasoningTier)!;
  if (reasoningExcess < 0) {
    reject("reasoning_tier", `reasoning:${demand.minimumReasoningTier}`);
  }
  if (row.contextLimitBytes < demand.contextBytes) {
    reject("context_capacity", `context:${demand.contextBytes}`);
  }
  for (const tool of demand.requiredTools) {
    if (!row.tools.includes(tool)) reject("required_tool", `tool:${tool}`);
  }
  for (const skill of demand.requiredSkills) {
    if (!row.skills.includes(skill)) reject("required_skill", `skill:${skill}`);
  }
  for (const feature of demand.requiredIsolationFeatures) {
    if (!row.isolationFeatures.includes(feature)) {
      reject("isolation_feature", `isolation:${feature}`);
    }
  }
  for (const feature of demand.requiredPermissionFeatures) {
    if (!row.permissionFeatures.includes(feature)) {
      reject("permission_feature", `permission:${feature}`);
    }
  }
  for (const field of OBSERVATION_FIELDS) {
    if (!observationSatisfied(demand.observability[field], row.observationModes[field])) {
      reject("observation_mode", `observation:${field}`);
    }
  }
  const rejectionCodes = ROW_REJECTION_ORDER.filter((code) => rejections.has(code));
  const unmetRequirementIds = Object.freeze(
    rejectionCodes.flatMap((code) => [...rejections.get(code)!].sort(compareText)),
  );
  const eligible = rejectionCodes.length === 0;
  const comparator: RuntimeRowComparator | null = eligible
    ? Object.freeze({
        costRank: row.costRank,
        latencyRank: row.latencyRank,
        qualityExcess,
        reasoningExcess,
        contextExcessBytes: row.contextLimitBytes - demand.contextBytes,
        toolExcess: row.tools.filter((tool) => !demand.requiredTools.includes(tool)).length,
        skillExcess: row.skills.filter((skill) => !demand.requiredSkills.includes(skill)).length,
        effortRank: row.effortRank,
        canonicalIdentity: canonicalJson(asJson([row.profileId, row.effortId])),
      })
    : null;
  return withDigest("swecircuit/runtime-routing/row-evaluation/v1alpha1", {
    agentId: demand.agentId,
    calibrationRowId: row.id,
    profileId: row.profileId,
    effortId: row.effortId,
    eligible,
    rejectionCodes,
    unmetRequirementIds,
    comparator,
  });
}

function evaluateRows(
  demands: readonly RuntimeDemand[],
  request: Pick<CompileRuntimeAssignmentsRequest, "policy" | "calibration" | "inventory">,
): readonly RuntimeRowEvaluation[] {
  const rows = new Map(request.calibration.runtimeRows.map((row) => [row.id, row]));
  return Object.freeze(
    demands.flatMap((demand) =>
      request.inventory.rows.map((inventory) =>
        evaluateRow(demand, rows.get(inventory.calibrationRowId)!, inventory, request.policy),
      ),
    ),
  );
}

function compareRow(left: RuntimeRowEvaluation, right: RuntimeRowEvaluation): number {
  const a = left.comparator!;
  const b = right.comparator!;
  return (
    a.costRank - b.costRank ||
    a.latencyRank - b.latencyRank ||
    a.qualityExcess - b.qualityExcess ||
    a.reasoningExcess - b.reasoningExcess ||
    a.contextExcessBytes - b.contextExcessBytes ||
    a.toolExcess - b.toolExcess ||
    a.skillExcess - b.skillExcess ||
    a.effortRank - b.effortRank ||
    compareText(
      `${left.profileId}\u001f${left.effortId}`,
      `${right.profileId}\u001f${right.effortId}`,
    )
  );
}

function checkedSum(values: readonly number[]): number {
  let total = 0;
  for (const value of values) {
    total += value;
    if (!Number.isSafeInteger(total)) throw new RangeError("unsafe comparator total");
  }
  return total;
}

function vectorComparator(rows: readonly RuntimeRowEvaluation[]): RuntimeVectorComparator {
  const ordered = [...rows].sort((left, right) => compareText(left.agentId, right.agentId));
  const comparators = ordered.map((row) => row.comparator!);
  return Object.freeze({
    totalCostRank: checkedSum(comparators.map((entry) => entry.costRank)),
    maximumLatencyRank: Math.max(...comparators.map((entry) => entry.latencyRank)),
    totalLatencyRank: checkedSum(comparators.map((entry) => entry.latencyRank)),
    totalQualityExcess: checkedSum(comparators.map((entry) => entry.qualityExcess)),
    totalReasoningExcess: checkedSum(comparators.map((entry) => entry.reasoningExcess)),
    totalContextExcessBytes: checkedSum(comparators.map((entry) => entry.contextExcessBytes)),
    totalToolExcess: checkedSum(comparators.map((entry) => entry.toolExcess)),
    totalSkillExcess: checkedSum(comparators.map((entry) => entry.skillExcess)),
    totalEffortRank: checkedSum(comparators.map((entry) => entry.effortRank)),
    canonicalIdentity: canonicalJson(
      asJson(ordered.map((entry) => `${entry.agentId}=${entry.profileId}/${entry.effortId}`)),
    ),
  });
}

function compareVectorComparator(
  left: RuntimeVectorComparator,
  right: RuntimeVectorComparator,
): number {
  return (
    left.totalCostRank - right.totalCostRank ||
    left.maximumLatencyRank - right.maximumLatencyRank ||
    left.totalLatencyRank - right.totalLatencyRank ||
    left.totalQualityExcess - right.totalQualityExcess ||
    left.totalReasoningExcess - right.totalReasoningExcess ||
    left.totalContextExcessBytes - right.totalContextExcessBytes ||
    left.totalToolExcess - right.totalToolExcess ||
    left.totalSkillExcess - right.totalSkillExcess ||
    left.totalEffortRank - right.totalEffortRank ||
    compareText(left.canonicalIdentity, right.canonicalIdentity)
  );
}

function independenceSatisfied(
  rows: readonly RuntimeRowEvaluation[],
  demands: readonly RuntimeDemand[],
  calibration: readonly RuntimeCalibrationRow[],
): boolean {
  const domains = new Map(
    rows.map((row) => [
      row.agentId,
      calibration.find((candidate) => candidate.id === row.calibrationRowId)!.independenceDomain,
    ]),
  );
  for (const demand of demands) {
    const domain = domains.get(demand.agentId);
    if (domain === undefined) continue;
    for (const checker of demand.checkerAgentIds) {
      const checkerDomain = domains.get(checker);
      if (checkerDomain !== undefined && checkerDomain === domain) return false;
    }
  }
  return true;
}

interface SearchResult {
  readonly search: RuntimeAssignmentSearch;
  readonly rows: readonly RuntimeRowEvaluation[];
}

function searchAssignments(
  demands: readonly RuntimeDemand[],
  evaluations: readonly RuntimeRowEvaluation[],
  calibration: readonly RuntimeCalibrationRow[],
  policy: RuntimeDemandPolicy,
): SearchResult | RoutingDiagnosticCode {
  const eligible = new Map(
    demands.map((demand) => [
      demand.agentId,
      evaluations
        .filter((evaluation) => evaluation.agentId === demand.agentId && evaluation.eligible)
        .sort(compareRow),
    ]),
  );
  if ([...eligible.values()].some((rows) => rows.length === 0)) return "SC4506";
  let potential: number | "exceeds_safe_integer" = 1;
  for (const rows of eligible.values()) {
    if (potential === "exceeds_safe_integer" || potential > Number.MAX_SAFE_INTEGER / rows.length) {
      potential = "exceeds_safe_integer";
    } else {
      potential *= rows.length;
    }
  }
  const searchOrder = [...demands].sort(
    (left, right) =>
      eligible.get(left.agentId)!.length - eligible.get(right.agentId)!.length ||
      compareText(left.agentId, right.agentId),
  );
  const exact = potential !== "exceeds_safe_integer" && potential <= policy.search.exactVectorLimit;
  let vectors: RuntimeRowEvaluation[][] = [[]];
  let evaluatedVectors = 0;
  if (exact) {
    for (const demand of searchOrder) {
      vectors = vectors.flatMap((vector) =>
        eligible
          .get(demand.agentId)!
          .map((row) => [...vector, row])
          .filter((candidate) => independenceSatisfied(candidate, demands, calibration)),
      );
    }
    evaluatedVectors = potential as number;
  } else {
    for (const demand of searchOrder) {
      vectors = vectors
        .flatMap((vector) =>
          eligible
            .get(demand.agentId)!
            .map((row) => [...vector, row])
            .filter((candidate) => independenceSatisfied(candidate, demands, calibration)),
        )
        .sort((left, right) =>
          compareVectorComparator(vectorComparator(left), vectorComparator(right)),
        )
        .slice(0, policy.search.boundedBeamWidth);
      if (vectors.length === 0) return "SC4507";
    }
    evaluatedVectors = vectors.length;
  }
  const feasible = vectors
    .filter((vector) => independenceSatisfied(vector, demands, calibration))
    .sort((left, right) =>
      compareVectorComparator(vectorComparator(left), vectorComparator(right)),
    );
  if (feasible.length === 0) return exact ? "SC4506" : "SC4507";
  const search: RuntimeAssignmentSearch = withDigest("swecircuit/runtime-routing/search/v1alpha1", {
    mode: exact ? "exact" : "bounded",
    claim: exact
      ? "exhaustive_assignment_vector_search"
      : "bounded_evaluated_set_no_global_optimum",
    potentialVectors: potential,
    evaluatedVectors,
    feasibleVectors: feasible.length,
  } as const);
  return Object.freeze({ search, rows: Object.freeze(feasible[0]!) });
}

function assignmentRows(
  evaluations: readonly RuntimeRowEvaluation[],
  demands: readonly RuntimeDemand[],
  calibration: readonly RuntimeCalibrationRow[],
): readonly RuntimeAssignment[] {
  return Object.freeze(
    [...evaluations]
      .sort((left, right) => compareText(left.agentId, right.agentId))
      .map((evaluation) => {
        const demand = demands.find((entry) => entry.agentId === evaluation.agentId)!;
        const row = calibration.find((entry) => entry.id === evaluation.calibrationRowId)!;
        return Object.freeze({
          agentId: demand.agentId,
          blueprintDigest: demand.blueprintDigest,
          calibrationRowId: row.id,
          profileId: row.profileId,
          effortId: row.effortId,
          independenceDomain: row.independenceDomain,
          requiredTools: demand.requiredTools,
          requiredSkills: demand.requiredSkills,
          requiredIsolationFeatures: demand.requiredIsolationFeatures,
          requiredPermissionFeatures: demand.requiredPermissionFeatures,
          observability: demand.observability,
        });
      }),
  );
}

function buildVector(
  evaluations: readonly RuntimeRowEvaluation[],
  demands: readonly RuntimeDemand[],
  calibration: readonly RuntimeCalibrationRow[],
  selectionReason: RuntimeAssignmentVector["selectionReason"],
): RuntimeAssignmentVector {
  return withDigest("swecircuit/runtime-routing/vector/v1alpha1", {
    rows: assignmentRows(evaluations, demands, calibration),
    comparator: vectorComparator(evaluations),
    selectionReason,
  });
}

function digestSource(domain: string, value: unknown): string {
  return digestCanonicalJson(domain, asJson(value));
}

function buildCompilation(
  request: CompileRuntimeAssignmentsRequest,
  demands: readonly RuntimeDemand[],
  evaluations: readonly RuntimeRowEvaluation[],
  search: RuntimeAssignmentSearch,
  selected: RuntimeAssignmentVector,
  predecessorAssignmentDigest: string | null,
  override: RuntimeAssignmentOverride | null,
): RuntimeAssignmentCompilation {
  return withDigest("swecircuit/runtime-routing/compilation/v1alpha1", {
    apiVersion: RUNTIME_ROUTING_API_VERSION,
    kind: "RuntimeAssignmentCompilation",
    goalId: request.compilation.goal.id,
    goalRevision: request.compilation.goal.revision,
    goalDigest: request.compilation.goalDigest,
    compilationDigest: request.compilation.contentDigest,
    packageDigest: request.packageExpectation.packageDigest,
    policy: request.policy,
    policyDigest: digestSource("swecircuit/runtime-routing/policy/v1alpha1", request.policy),
    calibration: request.calibration,
    calibrationDigest: digestSource(
      "swecircuit/runtime-routing/calibration/v1alpha1",
      request.calibration,
    ),
    inventory: request.inventory,
    inventoryDigest: digestSource(
      "swecircuit/runtime-routing/inventory/v1alpha1",
      request.inventory,
    ),
    demands,
    evaluations,
    search,
    selected,
    predecessorAssignmentDigest,
    override,
  });
}

function validateCompilationSemantics(
  compilation: RuntimeAssignmentCompilation,
): RoutingDiagnosticCode | null {
  if (
    compilation.policyDigest !==
      digestSource("swecircuit/runtime-routing/policy/v1alpha1", compilation.policy) ||
    compilation.calibrationDigest !==
      digestSource("swecircuit/runtime-routing/calibration/v1alpha1", compilation.calibration) ||
    compilation.inventoryDigest !==
      digestSource("swecircuit/runtime-routing/inventory/v1alpha1", compilation.inventory) ||
    compilation.demands.some(
      (demand) =>
        demand.contentDigest !==
        contentDigest("swecircuit/runtime-routing/demand/v1alpha1", demand),
    ) ||
    compilation.evaluations.some(
      (evaluation) =>
        evaluation.contentDigest !==
        contentDigest("swecircuit/runtime-routing/row-evaluation/v1alpha1", evaluation),
    ) ||
    compilation.search.contentDigest !==
      contentDigest("swecircuit/runtime-routing/search/v1alpha1", compilation.search) ||
    compilation.selected.contentDigest !==
      contentDigest("swecircuit/runtime-routing/vector/v1alpha1", compilation.selected) ||
    compilation.contentDigest !==
      contentDigest("swecircuit/runtime-routing/compilation/v1alpha1", compilation)
  ) {
    return "SC4510";
  }
  if (
    !isSortedUnique(compilation.demands.map((demand) => demand.agentId)) ||
    !isSortedUnique(compilation.selected.rows.map((row) => row.agentId))
  ) {
    return "SC4510";
  }
  const recalculated = evaluateRows(compilation.demands, compilation);
  if (canonicalJson(asJson(recalculated)) !== canonicalJson(asJson(compilation.evaluations))) {
    return "SC4510";
  }
  const selectedEvaluations = compilation.selected.rows.map((assignment) =>
    compilation.evaluations.find(
      (evaluation) =>
        evaluation.agentId === assignment.agentId &&
        evaluation.calibrationRowId === assignment.calibrationRowId &&
        evaluation.eligible,
    ),
  );
  if (
    selectedEvaluations.some((evaluation) => evaluation === undefined) ||
    !independenceSatisfied(
      selectedEvaluations as readonly RuntimeRowEvaluation[],
      compilation.demands,
      compilation.calibration.runtimeRows,
    ) ||
    canonicalJson(
      asJson(vectorComparator(selectedEvaluations as readonly RuntimeRowEvaluation[])),
    ) !== canonicalJson(asJson(compilation.selected.comparator))
  ) {
    return "SC4510";
  }
  if (compilation.selected.selectionReason !== "owner_override") {
    const searched = searchAssignments(
      compilation.demands,
      compilation.evaluations,
      compilation.calibration.runtimeRows,
      compilation.policy,
    );
    if (
      typeof searched === "string" ||
      canonicalJson(asJson(searched.search)) !== canonicalJson(asJson(compilation.search)) ||
      canonicalJson(
        asJson(
          buildVector(
            searched.rows,
            compilation.demands,
            compilation.calibration.runtimeRows,
            compilation.selected.selectionReason,
          ),
        ),
      ) !== canonicalJson(asJson(compilation.selected))
    ) {
      return "SC4510";
    }
  } else if (
    compilation.override === null ||
    compilation.predecessorAssignmentDigest === null ||
    compilation.override.predecessorAssignmentDigest !== compilation.predecessorAssignmentDigest
  ) {
    return "SC4510";
  }
  return null;
}

export function compileRuntimeAssignments(
  input: unknown,
): OperationResult<RuntimeAssignmentCompilation> {
  try {
    const snap = snapshotInput(input, REQUEST_ARTIFACT);
    const diagnostics = [...snap.diagnostics];
    if (!snap.available || diagnostics.length > 0) {
      return result<RuntimeAssignmentCompilation>(diagnostics, null);
    }
    diagnostics.push(
      ...schemaDiagnostics(validateRuntimeRoutingRequestSchema(snap.value), REQUEST_ARTIFACT),
    );
    if (diagnostics.length > 0) return result<RuntimeAssignmentCompilation>(diagnostics, null);
    const request = snap.value as unknown as CompileRuntimeAssignmentsRequest;
    if (
      !verifyCompilationDigest(request.compilation) ||
      request.packageExpectation.compilationDigest !== request.compilation.contentDigest
    ) {
      return result<RuntimeAssignmentCompilation>(
        [diagnostic("SC4510", REQUEST_ARTIFACT, "/compilation")],
        null,
      );
    }
    const invalid = validatePolicyAndSupply(request);
    if (invalid !== null)
      return result<RuntimeAssignmentCompilation>([diagnostic(invalid, REQUEST_ARTIFACT)], null);
    const demands = deriveDemands(request.compilation, request.policy);
    if (demands === null) {
      return result<RuntimeAssignmentCompilation>([diagnostic("SC4505", REQUEST_ARTIFACT)], null);
    }
    const evaluations = evaluateRows(demands, request);
    const searched = searchAssignments(
      demands,
      evaluations,
      request.calibration.runtimeRows,
      request.policy,
    );
    if (typeof searched === "string") {
      return result<RuntimeAssignmentCompilation>([diagnostic(searched, REQUEST_ARTIFACT)], null);
    }
    const selected = buildVector(
      searched.rows,
      demands,
      request.calibration.runtimeRows,
      searched.search.mode === "exact" ? "lowest_exact_vector" : "lowest_bounded_evaluated_vector",
    );
    return result<RuntimeAssignmentCompilation>(
      [],
      buildCompilation(request, demands, evaluations, searched.search, selected, null, null),
    );
  } catch (error) {
    return result<RuntimeAssignmentCompilation>(
      [diagnostic(error instanceof RangeError ? "SC4502" : "SC4501", REQUEST_ARTIFACT)],
      null,
    );
  }
}

export function applyRuntimeAssignmentOverride(
  compilationInput: unknown,
  overrideInput: unknown,
): OperationResult<RuntimeAssignmentCompilation> {
  try {
    const compilationSnap = snapshotInput(compilationInput, COMPILATION_ARTIFACT);
    const overrideSnap = snapshotInput(overrideInput, OVERRIDE_ARTIFACT);
    const diagnostics = [...compilationSnap.diagnostics, ...overrideSnap.diagnostics];
    if (!compilationSnap.available || !overrideSnap.available) {
      return result<RuntimeAssignmentCompilation>(diagnostics, null);
    }
    diagnostics.push(
      ...schemaDiagnostics(
        validateRuntimeAssignmentCompilationSchema(compilationSnap.value),
        COMPILATION_ARTIFACT,
      ),
      ...schemaDiagnostics(
        validateRuntimeAssignmentOverrideSchema(overrideSnap.value),
        OVERRIDE_ARTIFACT,
      ),
    );
    if (diagnostics.length > 0) return result<RuntimeAssignmentCompilation>(diagnostics, null);
    const compilation = compilationSnap.value as unknown as RuntimeAssignmentCompilation;
    const override = overrideSnap.value as unknown as RuntimeAssignmentOverride;
    const invalidCompilation = validateCompilationSemantics(compilation);
    if (invalidCompilation !== null) {
      return result<RuntimeAssignmentCompilation>(
        [diagnostic(invalidCompilation, COMPILATION_ARTIFACT)],
        null,
      );
    }
    const replacement = compilation.evaluations.find(
      (evaluation) =>
        evaluation.agentId === override.agentId &&
        evaluation.calibrationRowId === override.replacementCalibrationRowId &&
        evaluation.eligible,
    );
    if (
      override.predecessorAssignmentDigest !== compilation.contentDigest ||
      replacement === undefined ||
      !compilation.selected.rows.some((row) => row.agentId === override.agentId)
    ) {
      return result<RuntimeAssignmentCompilation>([diagnostic("SC4508", OVERRIDE_ARTIFACT)], null);
    }
    const selectedEvaluations = compilation.selected.rows.map((assignment) =>
      assignment.agentId === override.agentId
        ? replacement
        : compilation.evaluations.find(
            (evaluation) =>
              evaluation.agentId === assignment.agentId &&
              evaluation.calibrationRowId === assignment.calibrationRowId,
          )!,
    );
    if (
      !independenceSatisfied(
        selectedEvaluations,
        compilation.demands,
        compilation.calibration.runtimeRows,
      )
    ) {
      return result<RuntimeAssignmentCompilation>([diagnostic("SC4508", OVERRIDE_ARTIFACT)], null);
    }
    const selected = buildVector(
      selectedEvaluations,
      compilation.demands,
      compilation.calibration.runtimeRows,
      "owner_override",
    );
    const request = {
      compilation: {
        goal: {
          id: compilation.goalId,
          revision: compilation.goalRevision,
        },
        goalDigest: compilation.goalDigest,
        contentDigest: compilation.compilationDigest,
      },
      packageExpectation: {
        compilationDigest: compilation.compilationDigest,
        packageDigest: compilation.packageDigest,
      },
      policy: compilation.policy,
      calibration: compilation.calibration,
      inventory: compilation.inventory,
    } as unknown as CompileRuntimeAssignmentsRequest;
    return result<RuntimeAssignmentCompilation>(
      [],
      buildCompilation(
        request,
        compilation.demands,
        compilation.evaluations,
        compilation.search,
        selected,
        compilation.contentDigest,
        override,
      ),
    );
  } catch (error) {
    return result<RuntimeAssignmentCompilation>(
      [diagnostic(error instanceof RangeError ? "SC4502" : "SC4508", OVERRIDE_ARTIFACT)],
      null,
    );
  }
}

export function verifyRuntimeAssignmentCompilation(
  compilationInput: unknown,
  expectationInput: unknown,
): OperationResult<RuntimeAssignmentCompilation> {
  try {
    const compilationSnap = snapshotInput(compilationInput, COMPILATION_ARTIFACT);
    const expectationSnap = snapshotInput(expectationInput, EXPECTATION_ARTIFACT);
    const diagnostics = [...compilationSnap.diagnostics, ...expectationSnap.diagnostics];
    if (!compilationSnap.available || !expectationSnap.available) {
      return result<RuntimeAssignmentCompilation>(diagnostics, null);
    }
    diagnostics.push(
      ...schemaDiagnostics(
        validateRuntimeAssignmentCompilationSchema(compilationSnap.value),
        COMPILATION_ARTIFACT,
      ),
      ...schemaDiagnostics(
        validateRuntimeAssignmentExpectationSchema(expectationSnap.value),
        EXPECTATION_ARTIFACT,
      ),
    );
    if (diagnostics.length > 0) return result<RuntimeAssignmentCompilation>(diagnostics, null);
    const compilation = compilationSnap.value as unknown as RuntimeAssignmentCompilation;
    const expectation = expectationSnap.value as unknown as RuntimeAssignmentExpectation;
    if (
      expectation.compilationDigest !== compilation.compilationDigest ||
      expectation.packageDigest !== compilation.packageDigest ||
      expectation.policyDigest !== compilation.policyDigest ||
      expectation.calibrationDigest !== compilation.calibrationDigest ||
      expectation.inventoryDigest !== compilation.inventoryDigest ||
      expectation.assignmentDigest !== compilation.contentDigest
    ) {
      return result<RuntimeAssignmentCompilation>(
        [diagnostic("SC4509", EXPECTATION_ARTIFACT)],
        null,
      );
    }
    const invalid = validateCompilationSemantics(compilation);
    return invalid === null
      ? result<RuntimeAssignmentCompilation>([], compilation)
      : result<RuntimeAssignmentCompilation>([diagnostic(invalid, COMPILATION_ARTIFACT)], null);
  } catch (error) {
    return result<RuntimeAssignmentCompilation>(
      [diagnostic(error instanceof RangeError ? "SC4502" : "SC4510", COMPILATION_ARTIFACT)],
      null,
    );
  }
}
