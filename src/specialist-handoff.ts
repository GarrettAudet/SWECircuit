import { createHash } from "node:crypto";
import { TextEncoder, types as utilTypes } from "node:util";
import {
  boundedJsonUtf8ByteLength,
  boundedUtf8ByteLength,
  digestCanonicalJson,
} from "./canonical-json.js";
import { SPECIALIST_API_VERSION, SPECIALIST_LIMITS } from "./constants.js";
import { appendJsonPointer, createDiagnostic, operationResult } from "./diagnostics.js";
import { hasParsingErrors, parseJsonBuffer } from "./json.js";
import type { JsonObject, JsonValue } from "./model.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { snapshotJsonValue } from "./snapshot.js";
import { validateSpecialistHandoffSchema } from "./specialist-handoff-schema.js";
import {
  expectedSpecialistHandoffMediaType,
  verifySpecialistPackage,
} from "./specialist-render.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  RenderedSpecialistPackage,
  SpecialistAgentHandoff,
  SpecialistHandoffArtifactBinding,
  SpecialistHandoffAssessmentEntry,
  SpecialistHandoffSetAssessment,
  SpecialistPackageExpectation,
  VerifiedSpecialistHandoff,
} from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic, OperationResult } from "./types.js";

const HANDOFF_ARTIFACT = "specialist-handoff.json";
const HANDOFF_SET_ARTIFACT = "specialist-handoff-set.json";
const encoder = new TextEncoder();

interface ParsedHandoff {
  readonly handoff: SpecialistAgentHandoff | null;
  readonly bytes: Uint8Array | null;
  readonly diagnostics: readonly Diagnostic[];
}
function snapshotHandoffBytes(value: unknown): Uint8Array | null {
  if (
    typeof value !== "object" ||
    value === null ||
    utilTypes.isProxy(value) ||
    !utilTypes.isUint8Array(value)
  ) {
    return null;
  }
  return new Uint8Array(value);
}

function snapshotHandoffByteList(value: unknown): readonly Uint8Array[] | null {
  if (
    typeof value !== "object" ||
    value === null ||
    utilTypes.isProxy(value) ||
    !Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Array.prototype
  ) {
    return null;
  }
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
  if (
    lengthDescriptor === undefined ||
    !("value" in lengthDescriptor) ||
    !Number.isSafeInteger(lengthDescriptor.value) ||
    lengthDescriptor.value < 0 ||
    lengthDescriptor.value > SPECIALIST_LIMITS.agents
  ) {
    return null;
  }
  const length = lengthDescriptor.value;
  const keys = Reflect.ownKeys(value);
  if (
    keys.length !== length + 1 ||
    keys.some((key) => typeof key !== "string") ||
    !keys.includes("length")
  ) {
    return null;
  }

  const copy: Uint8Array[] = [];
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      return null;
    }
    const bytes = snapshotHandoffBytes(descriptor.value);
    if (bytes === null) {
      return null;
    }
    copy.push(bytes);
  }
  return Object.freeze(copy);
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist handoff value is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
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

function rawSha256Digest(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function scanString(
  value: string,
  artifact: string,
  pointer: string,
  allowFormattingWhitespace: boolean,
  diagnostics: Diagnostic[],
): void {
  if (containsHighConfidenceSecret(value)) {
    diagnostics.push(createDiagnostic("SC4309", artifact, pointer));
  }
  const controlUnsafe = allowFormattingWhitespace
    ? containsControlCharacters(value.replace(/\n/g, ""))
    : containsControlCharacters(value);
  if (controlUnsafe || containsLoneSurrogate(value)) {
    diagnostics.push(createDiagnostic("SC4310", artifact, pointer));
  }
}

function scanStrings(
  value: JsonValue,
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
  allowFormattingWhitespace = false,
): void {
  if (typeof value === "string") {
    scanString(value, artifact, pointer, allowFormattingWhitespace, diagnostics);
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
    scanString(key, artifact, pointer, false, diagnostics);
    scanStrings(
      object[key] as JsonValue,
      artifact,
      appendJsonPointer(pointer, key),
      diagnostics,
      key === "content",
    );
  }
}

function parseHandoff(rawHandoffBytes: unknown): ParsedHandoff {
  const bytes = snapshotHandoffBytes(rawHandoffBytes);
  if (bytes === null) {
    return Object.freeze({
      handoff: null,
      bytes: null,
      diagnostics: Object.freeze([createDiagnostic("SC4310", HANDOFF_ARTIFACT)]),
    });
  }
  if (bytes.byteLength > SPECIALIST_LIMITS.handoffBytes) {
    return Object.freeze({
      handoff: null,
      bytes,
      diagnostics: Object.freeze([createDiagnostic("SC4308", HANDOFF_ARTIFACT)]),
    });
  }
  const parsed = parseJsonBuffer(bytes, HANDOFF_ARTIFACT, SPECIALIST_LIMITS.handoffBytes);
  if (hasParsingErrors(parsed) || parsed.value === null) {
    const limitExceeded = parsed.diagnostics.some(
      (diagnostic) => diagnostic.code === "SC5001" || diagnostic.code === "SC5002",
    );
    return Object.freeze({
      handoff: null,
      bytes,
      diagnostics: Object.freeze([
        createDiagnostic(limitExceeded ? "SC4308" : "SC4310", HANDOFF_ARTIFACT),
      ]),
    });
  }
  const diagnostics: Diagnostic[] = [];
  scanStrings(parsed.value, HANDOFF_ARTIFACT, "", diagnostics);
  diagnostics.push(...validateSpecialistHandoffSchema(parsed.value, HANDOFF_ARTIFACT));
  if (hasErrors(diagnostics)) {
    return Object.freeze({
      handoff: null,
      bytes,
      diagnostics: Object.freeze(diagnostics),
    });
  }
  return Object.freeze({
    handoff: freezeJson(parsed.value as unknown as SpecialistAgentHandoff),
    bytes,
    diagnostics: Object.freeze(diagnostics),
  });
}

function compilationFromPackage(
  specialistPackage: RenderedSpecialistPackage,
): AgentBlueprintCompilation {
  const file = specialistPackage.files.find((candidate) => candidate.path === "compilation.json");
  if (file === undefined) {
    throw new TypeError("Verified specialist package is missing compilation.json.");
  }
  const parsed = parseJsonBuffer(
    encoder.encode(file.content),
    "compilation.json",
    SPECIALIST_LIMITS.outputBytes,
  );
  if (hasParsingErrors(parsed) || parsed.value === null) {
    throw new TypeError("Verified specialist package has an invalid compilation.json.");
  }
  return parsed.value as unknown as AgentBlueprintCompilation;
}

function sameStrings(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }
  const sortedLeft = [...left].sort(compareText);
  const sortedRight = [...right].sort(compareText);
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function hasDuplicateStrings(values: readonly string[]): boolean {
  return new Set(values).size !== values.length;
}

function bindingMatches(
  handoff: SpecialistAgentHandoff,
  compilation: AgentBlueprintCompilation,
  blueprint: AgentBlueprint,
): boolean {
  return (
    handoff.goal.id === compilation.goal.id &&
    handoff.goal.revision === compilation.goal.revision &&
    handoff.goal.digest === compilation.goalDigest &&
    handoff.agent.id === blueprint.id &&
    handoff.agent.blueprintDigest === blueprint.contentDigest &&
    handoff.compilationDigest === compilation.contentDigest &&
    handoff.destination === blueprint.handoff.destination
  );
}

function evidenceMatches(handoff: SpecialistAgentHandoff, blueprint: AgentBlueprint): boolean {
  const completed = handoff.workUnitsCompleted;
  if (
    hasDuplicateStrings(completed) ||
    completed.some((workUnitId) => !blueprint.workUnitIds.includes(workUnitId)) ||
    (handoff.outcome === "pass" && !sameStrings(completed, blueprint.workUnitIds))
  ) {
    return false;
  }

  const artifactNames = handoff.artifacts.map((artifact) => artifact.name);
  if (
    hasDuplicateStrings(artifactNames) ||
    !sameStrings(artifactNames, blueprint.handoff.artifacts) ||
    handoff.artifacts.some(
      (artifact) => artifact.mediaType !== expectedSpecialistHandoffMediaType(artifact.name),
    )
  ) {
    return false;
  }
  const artifactNameSet = new Set(artifactNames);
  const evidenceIds = handoff.evidence.map((evidence) => evidence.requirementId);
  if (hasDuplicateStrings(evidenceIds) || evidenceIds.length !== blueprint.evidenceDuties.length) {
    return false;
  }
  const duties = new Map(blueprint.evidenceDuties.map((duty) => [duty.requirementId, duty]));
  for (const evidence of handoff.evidence) {
    const duty = duties.get(evidence.requirementId);
    if (
      duty === undefined ||
      evidence.criterionId !== duty.criterionId ||
      evidence.kind !== duty.kind ||
      evidence.duty !== duty.duty ||
      !artifactNameSet.has(evidence.artifact) ||
      (handoff.outcome === "pass" && evidence.status !== "pass")
    ) {
      return false;
    }
  }
  return true;
}

function artifactBindings(
  handoff: SpecialistAgentHandoff,
): readonly SpecialistHandoffArtifactBinding[] {
  return Object.freeze(
    handoff.artifacts
      .map((artifact) => {
        const bytes = boundedUtf8ByteLength(artifact.content, SPECIALIST_LIMITS.handoffBytes);
        if (bytes === null) {
          throw new TypeError("Bounded handoff artifact exceeded the handoff limit.");
        }
        return Object.freeze({
          name: artifact.name,
          mediaType: artifact.mediaType,
          bytes,
          digest: rawSha256Digest(encoder.encode(artifact.content)),
        });
      })
      .sort((left, right) => compareText(left.name, right.name)),
  );
}

function verifyAgainstPackage(
  specialistPackage: RenderedSpecialistPackage,
  compilation: AgentBlueprintCompilation,
  rawHandoffBytes: unknown,
): OperationResult<VerifiedSpecialistHandoff> {
  const parsed = parseHandoff(rawHandoffBytes);
  if (parsed.handoff === null || parsed.bytes === null) {
    return operationResult<VerifiedSpecialistHandoff>(parsed.diagnostics, null);
  }
  const blueprint = compilation.blueprints.find(
    (candidate) => candidate.id === parsed.handoff?.agent.id,
  );
  if (
    blueprint === undefined ||
    specialistPackage.compilationDigest !== compilation.contentDigest ||
    !bindingMatches(parsed.handoff, compilation, blueprint)
  ) {
    return operationResult<VerifiedSpecialistHandoff>(
      [createDiagnostic("SC4311", HANDOFF_ARTIFACT)],
      null,
    );
  }
  if (!evidenceMatches(parsed.handoff, blueprint)) {
    return operationResult<VerifiedSpecialistHandoff>(
      [createDiagnostic("SC4312", HANDOFF_ARTIFACT)],
      null,
    );
  }

  const semanticDigest = digestCanonicalJson(
    "swecircuit.specialist.agent-handoff.v1",
    asJson(parsed.handoff),
  );
  const base = {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "VerifiedSpecialistHandoff",
    handoff: parsed.handoff,
    rawBytes: parsed.bytes.byteLength,
    rawDigest: rawSha256Digest(parsed.bytes),
    semanticDigest,
    artifactBindings: artifactBindings(parsed.handoff),
  } as const;
  if (
    boundedJsonUtf8ByteLength(
      asJson({ ...base, contentDigest: `sha256:${"0".repeat(64)}` }),
      SPECIALIST_LIMITS.outputBytes,
    ) === null
  ) {
    return operationResult<VerifiedSpecialistHandoff>(
      [createDiagnostic("SC4308", HANDOFF_ARTIFACT)],
      null,
    );
  }
  return operationResult(
    parsed.diagnostics,
    freezeJson(
      withDigest(
        "swecircuit.specialist.verified-handoff.v1",
        base as unknown as JsonObject,
      ) as unknown as VerifiedSpecialistHandoff,
    ),
  );
}

export function verifySpecialistHandoff(
  specialistPackage: unknown,
  expectation: SpecialistPackageExpectation | unknown,
  rawHandoffBytes: unknown,
): OperationResult<VerifiedSpecialistHandoff> {
  try {
    const verifiedPackage = verifySpecialistPackage(specialistPackage, expectation);
    if (!verifiedPackage.ok || verifiedPackage.value === null) {
      return operationResult<VerifiedSpecialistHandoff>(verifiedPackage.diagnostics, null);
    }
    const compilation = compilationFromPackage(verifiedPackage.value);
    return verifyAgainstPackage(verifiedPackage.value, compilation, rawHandoffBytes);
  } catch {
    return operationResult<VerifiedSpecialistHandoff>(
      [createDiagnostic("SC9001", HANDOFF_ARTIFACT)],
      null,
    );
  }
}

function dependencyClosure(
  compilation: AgentBlueprintCompilation,
  target: AgentBlueprint,
): readonly string[] {
  const byId = new Map(compilation.blueprints.map((blueprint) => [blueprint.id, blueprint]));
  const pending = [...target.dependencies];
  const required = new Set<string>();
  while (pending.length > 0) {
    const agentId = pending.pop();
    if (agentId === undefined || required.has(agentId)) {
      continue;
    }
    const blueprint = byId.get(agentId);
    if (blueprint === undefined) {
      throw new TypeError("Validated blueprint dependency is missing.");
    }
    required.add(agentId);
    pending.push(...blueprint.dependencies);
  }
  return Object.freeze([...required].sort(compareText));
}

export function assessSpecialistHandoffs(
  specialistPackage: unknown,
  expectation: SpecialistPackageExpectation | unknown,
  targetAgentId: unknown,
  rawHandoffBytes: unknown,
): OperationResult<SpecialistHandoffSetAssessment> {
  try {
    const verifiedPackage = verifySpecialistPackage(specialistPackage, expectation);
    if (!verifiedPackage.ok || verifiedPackage.value === null) {
      return operationResult<SpecialistHandoffSetAssessment>(verifiedPackage.diagnostics, null);
    }
    const compilation = compilationFromPackage(verifiedPackage.value);
    const target =
      typeof targetAgentId === "string"
        ? compilation.blueprints.find((blueprint) => blueprint.id === targetAgentId)
        : undefined;
    const handoffBytes = snapshotHandoffByteList(rawHandoffBytes);
    if (target === undefined || handoffBytes === null) {
      return operationResult<SpecialistHandoffSetAssessment>(
        [createDiagnostic("SC4313", HANDOFF_SET_ARTIFACT)],
        null,
      );
    }

    const requiredAgentIds = dependencyClosure(compilation, target);
    const required = new Set(requiredAgentIds);
    const verifiedByAgent = new Map<string, VerifiedSpecialistHandoff>();
    for (const raw of handoffBytes) {
      const verified = verifyAgainstPackage(verifiedPackage.value, compilation, raw);
      if (!verified.ok || verified.value === null) {
        return operationResult<SpecialistHandoffSetAssessment>(verified.diagnostics, null);
      }
      const agentId = verified.value.handoff.agent.id;
      if (!required.has(agentId) || verifiedByAgent.has(agentId)) {
        return operationResult<SpecialistHandoffSetAssessment>(
          [createDiagnostic("SC4313", HANDOFF_SET_ARTIFACT)],
          null,
        );
      }
      verifiedByAgent.set(agentId, verified.value);
    }

    const receivedAgentIds = [...verifiedByAgent.keys()].sort(compareText);
    const missingAgentIds = requiredAgentIds.filter((agentId) => !verifiedByAgent.has(agentId));
    const handoffs: readonly SpecialistHandoffAssessmentEntry[] = Object.freeze(
      [...verifiedByAgent.values()]
        .map((verified) =>
          Object.freeze({
            agentId: verified.handoff.agent.id,
            outcome: verified.handoff.outcome,
            rawBytes: verified.rawBytes,
            rawDigest: verified.rawDigest,
            semanticDigest: verified.semanticDigest,
          }),
        )
        .sort((left, right) => compareText(left.agentId, right.agentId)),
    );
    const base = {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "SpecialistHandoffSetAssessment",
      goalId: compilation.goal.id,
      goalRevision: compilation.goal.revision,
      goalDigest: compilation.goalDigest,
      compilationDigest: compilation.contentDigest,
      packageDigest: verifiedPackage.value.packageDigest,
      targetAgentId: target.id,
      requiredAgentIds,
      receivedAgentIds,
      missingAgentIds,
      handoffs,
      integrationReady:
        missingAgentIds.length === 0 && handoffs.every((handoff) => handoff.outcome === "pass"),
    } as const;
    return operationResult(
      [],
      freezeJson(
        withDigest(
          "swecircuit.specialist.handoff-set-assessment.v1",
          base as unknown as JsonObject,
        ) as unknown as SpecialistHandoffSetAssessment,
      ),
    );
  } catch {
    return operationResult<SpecialistHandoffSetAssessment>(
      [createDiagnostic("SC9001", HANDOFF_SET_ARTIFACT)],
      null,
    );
  }
}
