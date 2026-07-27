import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { types as utilTypes } from "node:util";
import {
  validateAdaptiveHostEventSchema,
  validateAdaptiveRunExpectationSchema,
  validateAdaptiveRunSessionSchema,
  validateHostLaunchCommandSchema,
} from "./adaptive-run-schema.js";
import { replayAdaptiveRunSession } from "./adaptive-run-transition.js";
import {
  ADAPTIVE_RUN_API_VERSION,
  ADAPTIVE_RUN_LIMITS,
  type AdaptiveHostEvent,
  type AdaptiveRunAcceptedEvent,
  type AdaptiveRunExpectation,
  type AdaptiveRunSession,
  type HostContextDelivery,
  type HostLaunchCommand,
} from "./adaptive-run-types.js";
import {
  boundedJsonUtf8ByteLength,
  boundedUtf8ByteLength,
  canonicalJson,
  digestCanonicalJson,
} from "./canonical-json.js";
import { hasParsingErrors, parseJsonBuffer } from "./json.js";
import type { JsonObject, JsonValue } from "./model.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { verifyRuntimeAssignmentCompilation } from "./runtime-routing.js";
import { snapshotJsonValue } from "./snapshot.js";
import {
  createSpecialistRunSession,
  validateSpecialistRunSession,
} from "./specialist-run-session.js";
import type {
  AgentBlueprintCompilation,
  RenderedSpecialistFile,
  SpecialistPackageExpectation,
  SpecialistPermission,
} from "./specialist-types.js";
import { containsControlCharacters, containsLoneSurrogate } from "./text.js";
import type { Diagnostic, OperationResult } from "./types.js";

const SESSION_ARTIFACT = "adaptive-run-session.json";
const EXPECTATION_ARTIFACT = "adaptive-run-expectation.json";
const COMMAND_ARTIFACT = "adaptive-launch-command.json";
const SESSION_DIGEST_DOMAIN = "swecircuit/adaptive-run/session/v1alpha1";
const COMMAND_DIGEST_DOMAIN = "swecircuit/adaptive-run/launch-command/v1alpha1";
const DIGEST_PLACEHOLDER = `sha256:${"0".repeat(64)}`;

type AdaptiveDiagnosticCode =
  | "SC4601"
  | "SC4602"
  | "SC4603"
  | "SC4604"
  | "SC4605"
  | "SC4606"
  | "SC4607"
  | "SC4608"
  | "SC4609"
  | "SC4610";

const DIAGNOSTIC_TEXT = Object.freeze({
  SC4601: ["adaptive.schema.invalid", "An adaptive-run value does not satisfy its closed schema."],
  SC4602: ["adaptive.limit.exceeded", "An adaptive-run value exceeds a published limit."],
  SC4603: ["adaptive.expectation.mismatch", "The adaptive-run expectation does not match."],
  SC4604: ["adaptive.event.transition-invalid", "The host event transition is invalid."],
  SC4605: ["adaptive.event.chain-conflict", "The host event sequence or digest chain conflicts."],
  SC4606: [
    "adaptive.materialization.mismatch",
    "The materialized host authority is unavailable, widened, or mismatched.",
  ],
  SC4607: [
    "adaptive.result-capture.invalid",
    "The result capture or specialist handoff binding is invalid.",
  ],
  SC4608: [
    "adaptive.restore.invalid",
    "The restored adaptive session source or digest is invalid.",
  ],
  SC4609: ["adaptive.session.terminal", "The adaptive run is terminal."],
  SC4610: ["adaptive.lineage.invalid", "The adaptive successor lineage is invalid."],
} as const);

interface SnapshotResult {
  readonly value: JsonValue | null;
  readonly diagnostics: readonly Diagnostic[];
}

interface RawSnapshot {
  readonly bytes: Uint8Array | null;
  readonly limitExceeded: boolean;
}

interface BlueprintShape {
  readonly id: string;
  readonly contentDigest: string;
  readonly contextUses: readonly {
    readonly sourceId: string;
    readonly kind: string;
    readonly locator: string;
    readonly digest: string;
    readonly bytes: number;
    readonly readScope: string;
  }[];
  readonly authority: {
    readonly permissions: readonly SpecialistPermission[];
  };
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function diagnostic(code: AdaptiveDiagnosticCode, artifact: string, pointer = ""): Diagnostic {
  const [rule, message] = DIAGNOSTIC_TEXT[code];
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

function result(diagnostics: readonly Diagnostic[], value: null): OperationResult<never>;
function result<T>(diagnostics: readonly Diagnostic[], value: T): OperationResult<T>;
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

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function isObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed adaptive-run value is not bounded JSON.");
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

function rawDigest(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function scanStrings(
  value: JsonValue,
  diagnostics: Diagnostic[],
  artifact: string,
  property = "",
): void {
  if (typeof value === "string") {
    const inspected = property === "content" ? value.replaceAll("\n", "") : value;
    if (
      containsLoneSurrogate(value) ||
      containsControlCharacters(inspected) ||
      containsHighConfidenceSecret(value)
    ) {
      diagnostics.push(diagnostic("SC4601", artifact));
    }
    const limit =
      property === "content"
        ? ADAPTIVE_RUN_LIMITS.maxSessionBytes
        : property.endsWith("Id") || property === "id" || property === "kind"
          ? 128
          : 16_384;
    if (boundedUtf8ByteLength(value, limit) === null) {
      diagnostics.push(diagnostic("SC4602", artifact));
    }
    return;
  }
  if (value === null || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      scanStrings(entry, diagnostics, artifact, property);
    }
    return;
  }
  for (const [key, entry] of Object.entries(value)) {
    if (key.endsWith("Base64")) {
      continue;
    }
    scanStrings(entry as JsonValue, diagnostics, artifact, key);
  }
}

function snapshotInput(input: unknown, artifact: string, byteLimit: number): SnapshotResult {
  const snapshot = snapshotJsonValue(input);
  if (snapshot.failure !== null || snapshot.value === null) {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([
        diagnostic(
          snapshot.failure === "depth" || snapshot.failure === "nodes" ? "SC4602" : "SC4601",
          artifact,
        ),
      ]),
    });
  }
  const diagnostics: Diagnostic[] = [];
  if (boundedJsonUtf8ByteLength(snapshot.value, byteLimit) === null) {
    diagnostics.push(diagnostic("SC4602", artifact));
  }
  scanStrings(snapshot.value, diagnostics, artifact);
  return Object.freeze({
    value: snapshot.value,
    diagnostics: Object.freeze(diagnostics),
  });
}

function runtimeExpectation(expectation: AdaptiveRunExpectation) {
  return Object.freeze({
    compilationDigest: expectation.compilationDigest,
    packageDigest: expectation.packageDigest,
    policyDigest: expectation.policyDigest,
    calibrationDigest: expectation.calibrationDigest,
    inventoryDigest: expectation.inventoryDigest,
    assignmentDigest: expectation.assignmentDigest,
  });
}

function packageExpectation(expectation: AdaptiveRunExpectation): SpecialistPackageExpectation {
  return Object.freeze({
    compilationDigest: expectation.compilationDigest,
    packageDigest: expectation.packageDigest,
  });
}

function expectationSemantics(expectation: AdaptiveRunExpectation): AdaptiveDiagnosticCode | null {
  if (
    expectation.maxHostEvents > ADAPTIVE_RUN_LIMITS.maxHostEvents ||
    expectation.maxLineageDepth > ADAPTIVE_RUN_LIMITS.maxLineageDepth ||
    expectation.lineageDepth > expectation.maxLineageDepth
  ) {
    return "SC4602";
  }
  if (
    (expectation.predecessorRun === null && expectation.lineageDepth !== 0) ||
    (expectation.predecessorRun !== null &&
      (expectation.lineageDepth === 0 || expectation.predecessorRun.runId === expectation.runId))
  ) {
    return "SC4610";
  }
  return null;
}

function validateExpectation(input: unknown): OperationResult<AdaptiveRunExpectation> {
  const snapshot = snapshotInput(
    input,
    EXPECTATION_ARTIFACT,
    ADAPTIVE_RUN_LIMITS.maxInspectionBytes,
  );
  const diagnostics = [...snapshot.diagnostics];
  if (snapshot.value === null || diagnostics.length > 0) {
    return result(diagnostics, null);
  }
  for (const issue of validateAdaptiveRunExpectationSchema(snapshot.value)) {
    diagnostics.push(
      diagnostic(
        issue.pointer === "/lineageDepth" || issue.pointer === "/maxLineageDepth"
          ? "SC4610"
          : issue.limit
            ? "SC4602"
            : "SC4601",
        EXPECTATION_ARTIFACT,
        issue.pointer,
      ),
    );
  }
  if (diagnostics.length > 0) {
    return result(diagnostics, null);
  }
  const expectation = snapshot.value as unknown as AdaptiveRunExpectation;
  const semantic = expectationSemantics(expectation);
  return semantic === null
    ? result([], freezeJson(expectation))
    : result([diagnostic(semantic, EXPECTATION_ARTIFACT)], null);
}

function parseCompilation(session: AdaptiveRunSession): AgentBlueprintCompilation {
  const file = session.specialistRun.package.files.find(
    (candidate) => candidate.path === "compilation.json",
  );
  if (file === undefined) {
    throw new TypeError("Verified package is missing compilation.json.");
  }
  return JSON.parse(file.content) as AgentBlueprintCompilation;
}

function bindingsMatch(session: AdaptiveRunSession): boolean {
  const { assignment, expectation, specialistRun } = session;
  return (
    canonicalJson(asJson(expectation)) === canonicalJson(asJson(session.expectation)) &&
    assignment.contentDigest === expectation.assignmentDigest &&
    assignment.compilationDigest === expectation.compilationDigest &&
    assignment.packageDigest === expectation.packageDigest &&
    assignment.policyDigest === expectation.policyDigest &&
    assignment.calibrationDigest === expectation.calibrationDigest &&
    assignment.inventoryDigest === expectation.inventoryDigest &&
    assignment.goalId === specialistRun.goal.id &&
    assignment.goalRevision === specialistRun.goal.revision &&
    assignment.goalDigest === specialistRun.goal.digest &&
    assignment.compilationDigest === specialistRun.compilationDigest &&
    assignment.packageDigest === specialistRun.packageDigest &&
    assignment.inventory.hostId === expectation.authorizedHostId &&
    assignment.inventory.adapterId === expectation.authorizedAdapterId &&
    assignment.inventory.adapterRevision === expectation.authorizedAdapterRevision
  );
}

function decodeCanonicalBase64(value: string, limit: number): Uint8Array | null {
  if (value.length > Math.ceil(limit / 3) * 4) {
    return null;
  }
  try {
    const decoded = Buffer.from(value, "base64");
    if (decoded.byteLength > limit || decoded.toString("base64") !== value) {
      return null;
    }
    return new Uint8Array(decoded);
  } catch {
    return null;
  }
}

function acceptedEventsValid(session: AdaptiveRunSession): boolean {
  let priorDigest: string | null = null;
  for (const [index, row] of session.hostEvents.entries()) {
    if (row.sequence !== index + 1 || row.rawEncoding !== "base64") {
      return false;
    }
    const raw = decodeCanonicalBase64(row.rawBase64, ADAPTIVE_RUN_LIMITS.maxEventBytes);
    if (raw === null || raw.byteLength !== row.rawBytes || rawDigest(raw) !== row.rawDigest) {
      return false;
    }
    const parsed = parseJsonBuffer(
      raw,
      "adaptive-host-event.json",
      ADAPTIVE_RUN_LIMITS.maxEventBytes,
    );
    if (hasParsingErrors(parsed) || parsed.value === null || !isObject(parsed.value)) {
      return false;
    }
    if (validateAdaptiveHostEventSchema(parsed.value).length > 0) {
      return false;
    }
    const event = parsed.value as unknown as AdaptiveHostEvent;
    if (
      event.sequence !== row.sequence ||
      event.kind !== row.kind ||
      event.agentId !== row.agentId ||
      ("attemptId" in event ? event.attemptId : null) !== row.attemptId ||
      event.priorEventDigest !== priorDigest ||
      event.runId !== session.expectation.runId ||
      event.runRevision !== session.expectation.runRevision ||
      event.assignmentDigest !== session.assignment.contentDigest
    ) {
      return false;
    }
    priorDigest = row.rawDigest;
  }
  return true;
}

function buildSession(
  expectation: AdaptiveRunExpectation,
  assignment: AdaptiveRunSession["assignment"],
  specialistRun: AdaptiveRunSession["specialistRun"],
  hostEvents: readonly AdaptiveRunAcceptedEvent[],
): AdaptiveRunSession | null {
  const session = withDigest(SESSION_DIGEST_DOMAIN, {
    apiVersion: ADAPTIVE_RUN_API_VERSION,
    kind: "AdaptiveRunSession" as const,
    expectation,
    assignment,
    specialistRun,
    hostEvents,
  });
  return boundedJsonUtf8ByteLength(asJson(session), ADAPTIVE_RUN_LIMITS.maxSessionBytes) === null
    ? null
    : (session as AdaptiveRunSession);
}

export function validateAdaptiveRunSession(
  input: unknown,
  expectationInput: unknown,
): OperationResult<AdaptiveRunSession> {
  try {
    const expected = validateExpectation(expectationInput);
    if (!expected.ok || expected.value === null) {
      return result(expected.diagnostics, null);
    }
    const snapshot = snapshotInput(input, SESSION_ARTIFACT, ADAPTIVE_RUN_LIMITS.maxSessionBytes);
    const diagnostics = [...expected.diagnostics, ...snapshot.diagnostics];
    if (snapshot.value === null || diagnostics.length > 0) {
      return result(diagnostics, null);
    }
    for (const issue of validateAdaptiveRunSessionSchema(snapshot.value)) {
      diagnostics.push(
        diagnostic(issue.limit ? "SC4602" : "SC4601", SESSION_ARTIFACT, issue.pointer),
      );
    }
    if (diagnostics.length > 0) {
      return result(diagnostics, null);
    }
    const session = snapshot.value as unknown as AdaptiveRunSession;
    if (
      canonicalJson(asJson(session.expectation)) !== canonicalJson(asJson(expected.value)) ||
      session.contentDigest !== contentDigest(SESSION_DIGEST_DOMAIN, session)
    ) {
      return result([diagnostic("SC4608", SESSION_ARTIFACT)], null);
    }
    const assignment = verifyRuntimeAssignmentCompilation(
      session.assignment,
      runtimeExpectation(expected.value),
    );
    diagnostics.push(...assignment.diagnostics);
    const specialistRun = validateSpecialistRunSession(
      session.specialistRun,
      packageExpectation(expected.value),
    );
    diagnostics.push(...specialistRun.diagnostics);
    if (
      !assignment.ok ||
      assignment.value === null ||
      !specialistRun.ok ||
      specialistRun.value === null
    ) {
      return result(diagnostics, null);
    }
    if (!bindingsMatch(session) || !acceptedEventsValid(session)) {
      return result([...diagnostics, diagnostic("SC4608", SESSION_ARTIFACT)], null);
    }
    const rebuilt = buildSession(
      expected.value,
      assignment.value,
      specialistRun.value,
      session.hostEvents,
    );
    if (rebuilt === null || canonicalJson(asJson(rebuilt)) !== canonicalJson(snapshot.value)) {
      return result([...diagnostics, diagnostic("SC4608", SESSION_ARTIFACT)], null);
    }
    return result(diagnostics, rebuilt);
  } catch {
    return result([diagnostic("SC4608", SESSION_ARTIFACT)], null);
  }
}

export function createAdaptiveRunSession(
  assignmentInput: unknown,
  specialistPackage: unknown,
  expectationInput: unknown,
): OperationResult<AdaptiveRunSession> {
  try {
    const expectation = validateExpectation(expectationInput);
    if (!expectation.ok || expectation.value === null) {
      return result(expectation.diagnostics, null);
    }
    const verifiedAssignment = verifyRuntimeAssignmentCompilation(
      assignmentInput,
      runtimeExpectation(expectation.value),
    );
    const diagnostics = [...expectation.diagnostics, ...verifiedAssignment.diagnostics];
    if (!verifiedAssignment.ok || verifiedAssignment.value === null) {
      return result([...diagnostics, diagnostic("SC4603", EXPECTATION_ARTIFACT)], null);
    }
    const assignment = verifiedAssignment.value;
    if (
      assignment.inventory.hostId !== expectation.value.authorizedHostId ||
      assignment.inventory.adapterId !== expectation.value.authorizedAdapterId ||
      assignment.inventory.adapterRevision !== expectation.value.authorizedAdapterRevision
    ) {
      return result([...diagnostics, diagnostic("SC4603", EXPECTATION_ARTIFACT)], null);
    }
    const specialist = createSpecialistRunSession(
      specialistPackage,
      packageExpectation(expectation.value),
    );
    diagnostics.push(...specialist.diagnostics);
    if (!specialist.ok || specialist.value === null) {
      return result(diagnostics, null);
    }
    if (
      assignment.goalId !== specialist.value.goal.id ||
      assignment.goalRevision !== specialist.value.goal.revision ||
      assignment.goalDigest !== specialist.value.goal.digest ||
      assignment.compilationDigest !== specialist.value.compilationDigest ||
      assignment.packageDigest !== specialist.value.packageDigest
    ) {
      return result([...diagnostics, diagnostic("SC4603", SESSION_ARTIFACT)], null);
    }
    const assignmentAgents = assignment.selected.rows.map((row) => row.agentId).sort(compareText);
    const packageAgents = specialist.value.package.manifest.agents
      .map((row) => row.agentId)
      .sort(compareText);
    if (canonicalJson(asJson(assignmentAgents)) !== canonicalJson(asJson(packageAgents))) {
      return result([...diagnostics, diagnostic("SC4603", SESSION_ARTIFACT)], null);
    }
    const session = buildSession(
      expectation.value,
      assignment,
      specialist.value,
      Object.freeze([]),
    );
    if (session === null) {
      return result([...diagnostics, diagnostic("SC4602", SESSION_ARTIFACT)], null);
    }
    if (validateAdaptiveRunSessionSchema(asJson(session)).length > 0) {
      return result([...diagnostics, diagnostic("SC4601", SESSION_ARTIFACT)], null);
    }
    return result(diagnostics, session);
  } catch {
    return result([diagnostic("SC4601", SESSION_ARTIFACT)], null);
  }
}

function scopeCovers(scope: string, path: string): boolean {
  return scope === path || (scope.endsWith("/") && path.startsWith(scope));
}

function contextDelivery(blueprint: BlueprintShape): readonly HostContextDelivery[] {
  const readScopes = blueprint.authority.permissions
    .filter((permission) => permission.kind === "filesystem.read")
    .flatMap((permission) => permission.scopes);
  return Object.freeze(
    blueprint.contextUses.map((source) => {
      const path = source.locator.startsWith("path:")
        ? (source.locator.slice("path:".length).split("#", 1)[0] ?? "")
        : "";
      const filesystemDelivery =
        source.kind === "repository" &&
        path.length > 0 &&
        readScopes.some((scope) => scopeCovers(scope, path) && scopeCovers(source.readScope, path));
      return Object.freeze({
        sourceId: source.sourceId,
        locator: source.locator,
        digest: source.digest,
        bytes: source.bytes,
        delivery: filesystemDelivery ? "authorized_filesystem_read" : "host_context",
      } as const);
    }),
  );
}

function agentContractFile(
  session: AdaptiveRunSession,
  agentId: string,
): RenderedSpecialistFile | undefined {
  return session.specialistRun.package.files.find(
    (file) => file.path === `agents/${agentId}.md` || file.path.endsWith(`/agents/${agentId}.md`),
  );
}

export function projectAdaptiveLaunchCommand(
  sessionInput: unknown,
  expectationInput: unknown,
  agentId: unknown,
): OperationResult<HostLaunchCommand> {
  try {
    const validated = validateAdaptiveRunSession(sessionInput, expectationInput);
    if (!validated.ok || validated.value === null) {
      return result(validated.diagnostics, null);
    }
    if (typeof agentId !== "string") {
      return result([...validated.diagnostics, diagnostic("SC4601", COMMAND_ARTIFACT)], null);
    }
    const session = validated.value;
    const compilation = parseCompilation(session);
    const blueprint = compilation.blueprints.find(
      (candidate) => candidate.id === agentId,
    ) as unknown as BlueprintShape | undefined;
    const assignment = session.assignment.selected.rows.find((row) => row.agentId === agentId);
    const file = agentContractFile(session, agentId);
    if (
      blueprint === undefined ||
      assignment === undefined ||
      file === undefined ||
      assignment.blueprintDigest !== blueprint.contentDigest
    ) {
      return result([...validated.diagnostics, diagnostic("SC4603", COMMAND_ARTIFACT)], null);
    }
    const command = withDigest(COMMAND_DIGEST_DOMAIN, {
      agentContractPath: file.path,
      agentContractDigest: file.digest,
      agentContractBytes: file.bytes,
      contextSources: contextDelivery(blueprint),
      profileId: assignment.profileId,
      effortId: assignment.effortId,
      tools: assignment.requiredTools,
      skills: assignment.requiredSkills,
      isolationFeatures: assignment.requiredIsolationFeatures,
      permissions: blueprint.authority.permissions,
      observability: assignment.observability,
    });
    const schemaIssues = validateHostLaunchCommandSchema(asJson(command));
    if (schemaIssues.length > 0) {
      return result([...validated.diagnostics, diagnostic("SC4601", COMMAND_ARTIFACT)], null);
    }
    return result(validated.diagnostics, command);
  } catch {
    return result([diagnostic("SC4601", COMMAND_ARTIFACT)], null);
  }
}

function snapshotRawSession(input: unknown): RawSnapshot {
  try {
    if (
      typeof input !== "object" ||
      input === null ||
      utilTypes.isProxy(input) ||
      !utilTypes.isUint8Array(input)
    ) {
      return Object.freeze({ bytes: null, limitExceeded: false });
    }
    const value = input as Uint8Array;
    if (value.byteLength > ADAPTIVE_RUN_LIMITS.maxSessionBytes) {
      return Object.freeze({ bytes: null, limitExceeded: true });
    }
    return Object.freeze({ bytes: new Uint8Array(value), limitExceeded: false });
  } catch {
    return Object.freeze({ bytes: null, limitExceeded: false });
  }
}

export function restoreAdaptiveRunSession(
  rawSession: unknown,
  expectationInput: unknown,
): OperationResult<AdaptiveRunSession> {
  try {
    const raw = snapshotRawSession(rawSession);
    if (raw.bytes === null) {
      return result([diagnostic(raw.limitExceeded ? "SC4602" : "SC4608", SESSION_ARTIFACT)], null);
    }
    const parsed = parseJsonBuffer(
      raw.bytes,
      SESSION_ARTIFACT,
      ADAPTIVE_RUN_LIMITS.maxSessionBytes,
    );
    if (hasParsingErrors(parsed) || parsed.value === null) {
      return result([diagnostic("SC4608", SESSION_ARTIFACT)], null);
    }
    const validated = validateAdaptiveRunSession(parsed.value, expectationInput);
    if (!validated.ok || validated.value === null) {
      return result(validated.diagnostics, null);
    }
    return replayAdaptiveRunSession(validated.value, expectationInput);
  } catch {
    return result([diagnostic("SC4608", SESSION_ARTIFACT)], null);
  }
}

export const adaptiveRunSessionInternals = Object.freeze({
  buildSession,
  contentDigest,
  diagnostic,
  packageExpectation,
  parseCompilation,
  rawDigest,
  result,
  runtimeExpectation,
});
