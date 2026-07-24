import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { TextEncoder, types as utilTypes } from "node:util";
import { boundedJsonUtf8ByteLength, canonicalJson, digestCanonicalJson } from "./canonical-json.js";
import {
  SPECIALIST_LIMITS,
  SPECIALIST_RUN_API_VERSION,
  SPECIALIST_RUN_LIMITS,
} from "./constants.js";
import { appendJsonPointer, createDiagnostic, operationResult } from "./diagnostics.js";
import { hasParsingErrors, parseJsonBuffer } from "./json.js";
import type { JsonObject, JsonValue } from "./model.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { snapshotJsonValue } from "./snapshot.js";
import { verifySpecialistHandoff } from "./specialist-handoff.js";
import { verifySpecialistPackage } from "./specialist-render.js";
import { validateSpecialistRunSessionSchema } from "./specialist-run-schema.js";
import type { SpecialistRunAcceptedHandoff, SpecialistRunSession } from "./specialist-run-types.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  RenderedSpecialistPackage,
  SpecialistPackageExpectation,
} from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic, OperationResult } from "./types.js";

const SESSION_ARTIFACT = "specialist-run-session.json";
const SESSION_DIGEST_DOMAIN = "swecircuit/specialist-run/session/v1alpha1";
const encoder = new TextEncoder();

interface RawSessionSnapshot {
  readonly bytes: Uint8Array | null;
  readonly limitExceeded: boolean;
}

interface CanonicalBase64Snapshot {
  readonly bytes: Uint8Array | null;
  readonly limitExceeded: boolean;
}

interface AcceptedHandoffValidation {
  readonly rows: readonly SpecialistRunAcceptedHandoff[] | null;
  readonly diagnostics: readonly Diagnostic[];
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function isObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist run session is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function rawSha256Digest(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function snapshotSessionBytes(value: unknown): RawSessionSnapshot {
  try {
    if (
      typeof value !== "object" ||
      value === null ||
      utilTypes.isProxy(value) ||
      !utilTypes.isUint8Array(value)
    ) {
      return Object.freeze({ bytes: null, limitExceeded: false });
    }
    const typed = value as Uint8Array;
    if (typed.byteLength > SPECIALIST_RUN_LIMITS.rawSessionInputBytes) {
      return Object.freeze({ bytes: null, limitExceeded: true });
    }
    return Object.freeze({
      bytes: new Uint8Array(typed),
      limitExceeded: false,
    });
  } catch {
    return Object.freeze({ bytes: null, limitExceeded: false });
  }
}

function scanString(
  value: string,
  pointer: string,
  allowFormattingWhitespace: boolean,
  diagnostics: Diagnostic[],
): void {
  if (containsHighConfidenceSecret(value)) {
    diagnostics.push(createDiagnostic("SC4309", SESSION_ARTIFACT, pointer));
  }
  const controlUnsafe = allowFormattingWhitespace
    ? containsControlCharacters(value.replace(/\n/g, ""))
    : containsControlCharacters(value);
  if (controlUnsafe || containsLoneSurrogate(value)) {
    diagnostics.push(createDiagnostic("SC4401", SESSION_ARTIFACT, pointer));
  }
}

function scanStrings(
  value: JsonValue,
  pointer: string,
  diagnostics: Diagnostic[],
  allowFormattingWhitespace = false,
): void {
  if (typeof value === "string") {
    scanString(value, pointer, allowFormattingWhitespace, diagnostics);
    return;
  }
  if (value === null || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      scanStrings(entry, appendJsonPointer(pointer, index), diagnostics);
    }
    return;
  }

  for (const key of Object.keys(value)) {
    const childPointer = appendJsonPointer(pointer, key);
    scanString(key, childPointer, false, diagnostics);
    if (key !== "rawBase64") {
      scanStrings(value[key] as JsonValue, childPointer, diagnostics, key === "content");
    }
  }
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

function packageRosterMatches(
  specialistPackage: RenderedSpecialistPackage,
  compilation: AgentBlueprintCompilation,
): boolean {
  const manifest = specialistPackage.manifest;
  if (
    specialistPackage.compilationDigest !== compilation.contentDigest ||
    manifest.compilationDigest !== compilation.contentDigest ||
    manifest.goalId !== compilation.goal.id ||
    manifest.goalRevision !== compilation.goal.revision ||
    manifest.selectedCandidateId !== compilation.selected.id ||
    manifest.agents.length !== compilation.blueprints.length
  ) {
    return false;
  }

  const manifestByAgent = new Map(manifest.agents.map((agent) => [agent.agentId, agent] as const));
  if (manifestByAgent.size !== manifest.agents.length) {
    return false;
  }
  return compilation.blueprints.every((blueprint) => {
    const manifestAgent = manifestByAgent.get(blueprint.id);
    return manifestAgent !== undefined && manifestAgent.blueprintDigest === blueprint.contentDigest;
  });
}

function sessionBindingsMatch(
  session: SpecialistRunSession,
  specialistPackage: RenderedSpecialistPackage,
  compilation: AgentBlueprintCompilation,
): boolean {
  return (
    packageRosterMatches(specialistPackage, compilation) &&
    session.goal.id === compilation.goal.id &&
    session.goal.revision === compilation.goal.revision &&
    session.goal.digest === compilation.goalDigest &&
    session.goal.integrationOwner === compilation.goal.integrationOwner &&
    session.compilationDigest === compilation.contentDigest &&
    session.packageDigest === specialistPackage.packageDigest &&
    session.selectedCandidateId === compilation.selected.id
  );
}

function withoutContentDigest(value: JsonObject): JsonObject {
  const result: Record<string, JsonValue> = {};
  for (const key of Object.keys(value)) {
    if (key !== "contentDigest") {
      result[key] = value[key] as JsonValue;
    }
  }
  return result;
}

function buildSession(
  specialistPackage: RenderedSpecialistPackage,
  compilation: AgentBlueprintCompilation,
  acceptedHandoffs: readonly SpecialistRunAcceptedHandoff[],
): SpecialistRunSession | null {
  const base = {
    apiVersion: SPECIALIST_RUN_API_VERSION,
    kind: "SpecialistRunSession",
    goal: {
      id: compilation.goal.id,
      revision: compilation.goal.revision,
      digest: compilation.goalDigest,
      integrationOwner: compilation.goal.integrationOwner,
    },
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    selectedCandidateId: compilation.selected.id,
    package: specialistPackage,
    acceptedHandoffs,
  } as const;
  const session = {
    ...base,
    contentDigest: digestCanonicalJson(SESSION_DIGEST_DOMAIN, asJson(base)),
  } as const;
  if (
    boundedJsonUtf8ByteLength(asJson(session), SPECIALIST_RUN_LIMITS.canonicalSessionBytes) === null
  ) {
    return null;
  }
  return freezeJson(session as SpecialistRunSession);
}

function decodeCanonicalBase64(value: string): CanonicalBase64Snapshot {
  if (value.length > SPECIALIST_RUN_LIMITS.rawHandoffBase64Chars) {
    return Object.freeze({ bytes: null, limitExceeded: true });
  }
  try {
    const decoded = Buffer.from(value, "base64");
    if (decoded.byteLength > SPECIALIST_RUN_LIMITS.rawHandoffBytes) {
      return Object.freeze({ bytes: null, limitExceeded: true });
    }
    if (decoded.toString("base64") !== value) {
      return Object.freeze({ bytes: null, limitExceeded: false });
    }
    return Object.freeze({
      bytes: new Uint8Array(decoded),
      limitExceeded: false,
    });
  } catch {
    return Object.freeze({ bytes: null, limitExceeded: false });
  }
}

function dependencyClosure(
  compilation: AgentBlueprintCompilation,
  target: AgentBlueprint,
): readonly string[] {
  const byId = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.id, blueprint] as const),
  );
  const pending = [...target.dependencies];
  const required = new Set<string>();
  while (pending.length > 0) {
    const agentId = pending.pop();
    if (agentId === undefined || required.has(agentId)) {
      continue;
    }
    const blueprint = byId.get(agentId);
    if (blueprint === undefined) {
      throw new TypeError("Verified blueprint dependency is missing.");
    }
    required.add(agentId);
    pending.push(...blueprint.dependencies);
  }
  return Object.freeze([...required].sort(compareText));
}

function invalidAcceptedHandoffs(
  pointer = "/acceptedHandoffs",
  code: "SC4401" | "SC4402" = "SC4401",
): AcceptedHandoffValidation {
  return Object.freeze({
    rows: null,
    diagnostics: Object.freeze([createDiagnostic(code, SESSION_ARTIFACT, pointer)]),
  });
}

function validateAcceptedHandoffs(
  session: SpecialistRunSession,
  specialistPackage: RenderedSpecialistPackage,
  expectation: SpecialistPackageExpectation | unknown,
  compilation: AgentBlueprintCompilation,
): AcceptedHandoffValidation {
  for (let index = 1; index < session.acceptedHandoffs.length; index += 1) {
    const previous = session.acceptedHandoffs[index - 1];
    const current = session.acceptedHandoffs[index];
    if (
      previous === undefined ||
      current === undefined ||
      compareText(previous.agentId, current.agentId) >= 0
    ) {
      return invalidAcceptedHandoffs("/acceptedHandoffs");
    }
  }

  const diagnostics: Diagnostic[] = [];
  const rows: SpecialistRunAcceptedHandoff[] = [];
  for (const [index, row] of session.acceptedHandoffs.entries()) {
    const pointer = appendJsonPointer("/acceptedHandoffs", index);
    const decoded = decodeCanonicalBase64(row.rawBase64);
    if (decoded.bytes === null) {
      return invalidAcceptedHandoffs(pointer, decoded.limitExceeded ? "SC4402" : "SC4401");
    }
    const raw = decoded.bytes;
    if (raw.byteLength !== row.rawBytes || rawSha256Digest(raw) !== row.rawDigest) {
      return invalidAcceptedHandoffs(pointer);
    }

    const verified = verifySpecialistHandoff(specialistPackage, expectation, raw);
    diagnostics.push(...verified.diagnostics);
    if (!verified.ok || verified.value === null) {
      return Object.freeze({
        rows: null,
        diagnostics: Object.freeze(diagnostics),
      });
    }
    const handoff = verified.value;
    const canonicalRow = Object.freeze({
      agentId: handoff.handoff.agent.id,
      blueprintDigest: handoff.handoff.agent.blueprintDigest,
      outcome: handoff.handoff.outcome,
      rawEncoding: "base64",
      rawBytes: handoff.rawBytes,
      rawDigest: handoff.rawDigest,
      rawBase64: Buffer.from(raw).toString("base64"),
    } as const);
    if (
      row.rawEncoding !== "base64" ||
      canonicalJson(asJson(canonicalRow)) !== canonicalJson(asJson(row))
    ) {
      return invalidAcceptedHandoffs(pointer);
    }
    rows.push(canonicalRow);
  }

  const byAgent = new Map(rows.map((row) => [row.agentId, row] as const));
  if (byAgent.size !== rows.length || rows.filter((row) => row.outcome !== "pass").length > 1) {
    return invalidAcceptedHandoffs();
  }
  const blueprintById = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.id, blueprint] as const),
  );
  for (const row of rows) {
    const blueprint = blueprintById.get(row.agentId);
    if (blueprint === undefined) {
      return invalidAcceptedHandoffs();
    }
    for (const dependencyId of dependencyClosure(compilation, blueprint)) {
      if (byAgent.get(dependencyId)?.outcome !== "pass") {
        return invalidAcceptedHandoffs();
      }
    }
  }

  return Object.freeze({
    rows: Object.freeze(rows),
    diagnostics: Object.freeze(diagnostics),
  });
}

export function validateSpecialistRunSession(
  input: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunSession> {
  try {
    const snapshot = snapshotJsonValue(input);
    if (snapshot.failure !== null || snapshot.value === null || !isObject(snapshot.value)) {
      const code =
        snapshot.failure === "depth" || snapshot.failure === "nodes" ? "SC4402" : "SC4401";
      return operationResult<SpecialistRunSession>(
        [createDiagnostic(code, SESSION_ARTIFACT)],
        null,
      );
    }
    if (
      boundedJsonUtf8ByteLength(snapshot.value, SPECIALIST_RUN_LIMITS.canonicalSessionBytes) ===
      null
    ) {
      return operationResult<SpecialistRunSession>(
        [createDiagnostic("SC4402", SESSION_ARTIFACT)],
        null,
      );
    }

    const diagnostics: Diagnostic[] = [];
    scanStrings(snapshot.value, "", diagnostics);
    diagnostics.push(...validateSpecialistRunSessionSchema(snapshot.value, SESSION_ARTIFACT));
    if (hasErrors(diagnostics)) {
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }

    const session = snapshot.value as unknown as SpecialistRunSession;
    const expectedDigest = digestCanonicalJson(
      SESSION_DIGEST_DOMAIN,
      withoutContentDigest(snapshot.value),
    );
    if (session.contentDigest !== expectedDigest) {
      diagnostics.push(createDiagnostic("SC4401", SESSION_ARTIFACT, "/contentDigest"));
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }

    const verifiedPackage = verifySpecialistPackage(session.package, expectation);
    diagnostics.push(...verifiedPackage.diagnostics);
    if (!verifiedPackage.ok || verifiedPackage.value === null) {
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }
    const compilation = compilationFromPackage(verifiedPackage.value);
    if (!sessionBindingsMatch(session, verifiedPackage.value, compilation)) {
      diagnostics.push(createDiagnostic("SC4401", SESSION_ARTIFACT));
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }

    const accepted = validateAcceptedHandoffs(
      session,
      verifiedPackage.value,
      expectation,
      compilation,
    );
    diagnostics.push(...accepted.diagnostics);
    if (accepted.rows === null || hasErrors(diagnostics)) {
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }

    const reconstructed = buildSession(verifiedPackage.value, compilation, accepted.rows);
    if (reconstructed === null) {
      diagnostics.push(createDiagnostic("SC4402", SESSION_ARTIFACT));
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }
    if (canonicalJson(asJson(reconstructed)) !== canonicalJson(snapshot.value)) {
      diagnostics.push(createDiagnostic("SC4401", SESSION_ARTIFACT));
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }
    return operationResult(diagnostics, reconstructed);
  } catch {
    return operationResult<SpecialistRunSession>(
      [createDiagnostic("SC9001", SESSION_ARTIFACT)],
      null,
    );
  }
}

export function createSpecialistRunSession(
  specialistPackage: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunSession> {
  try {
    const verifiedPackage = verifySpecialistPackage(specialistPackage, expectation);
    if (!verifiedPackage.ok || verifiedPackage.value === null) {
      return operationResult<SpecialistRunSession>(verifiedPackage.diagnostics, null);
    }
    const compilation = compilationFromPackage(verifiedPackage.value);
    if (!packageRosterMatches(verifiedPackage.value, compilation)) {
      return operationResult<SpecialistRunSession>(
        [createDiagnostic("SC4401", SESSION_ARTIFACT)],
        null,
      );
    }

    const session = buildSession(verifiedPackage.value, compilation, Object.freeze([]));
    if (session === null) {
      return operationResult<SpecialistRunSession>(
        [createDiagnostic("SC4402", SESSION_ARTIFACT)],
        null,
      );
    }
    const schemaDiagnostics = validateSpecialistRunSessionSchema(asJson(session), SESSION_ARTIFACT);
    if (hasErrors(schemaDiagnostics)) {
      return operationResult<SpecialistRunSession>(
        [createDiagnostic("SC9001", SESSION_ARTIFACT)],
        null,
      );
    }
    return operationResult(verifiedPackage.diagnostics, session);
  } catch {
    return operationResult<SpecialistRunSession>(
      [createDiagnostic("SC9001", SESSION_ARTIFACT)],
      null,
    );
  }
}

export function restoreSpecialistRunSession(
  rawSessionBytes: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunSession> {
  try {
    const raw = snapshotSessionBytes(rawSessionBytes);
    if (raw.bytes === null) {
      return operationResult<SpecialistRunSession>(
        [createDiagnostic(raw.limitExceeded ? "SC4402" : "SC4401", SESSION_ARTIFACT)],
        null,
      );
    }
    const parsed = parseJsonBuffer(
      raw.bytes,
      SESSION_ARTIFACT,
      SPECIALIST_RUN_LIMITS.rawSessionInputBytes,
    );
    if (hasParsingErrors(parsed) || parsed.value === null) {
      const limitExceeded = parsed.diagnostics.some(
        (diagnostic) => diagnostic.code === "SC5001" || diagnostic.code === "SC5002",
      );
      return operationResult<SpecialistRunSession>(
        [createDiagnostic(limitExceeded ? "SC4402" : "SC4401", SESSION_ARTIFACT)],
        null,
      );
    }
    return validateSpecialistRunSession(parsed.value, expectation);
  } catch {
    return operationResult<SpecialistRunSession>(
      [createDiagnostic("SC9001", SESSION_ARTIFACT)],
      null,
    );
  }
}
