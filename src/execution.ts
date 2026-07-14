import { performance } from "node:perf_hooks";
import { TextEncoder, types as utilTypes } from "node:util";
import { API_VERSION, EVENT_TYPE_VERSION, LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import type {
  AdapterManifestArtifact,
  JsonObject,
  JsonValue,
  RunEventArtifact,
  RunEventEvidenceReference,
  WorkPacketArtifact,
} from "./model.js";
import { permissionRequirementCovered, validatePermissionRequests } from "./permissions.js";
import { containsHighConfidenceSecret } from "./privacy.js";
import { snapshotJsonValue } from "./snapshot.js";
import { inspectTraceBytes } from "./trace.js";
import type {
  Diagnostic,
  ExecutionState,
  OperationResult,
  TerminalCode,
  WorkflowOutcome,
  WorkflowStage,
} from "./types.js";
import { validateArtifactValue } from "./validate.js";

export type FailedTerminalCode =
  | "execution_failed"
  | "verification_failed"
  | "review_failed"
  | "handoff_failed"
  | "integration_failed";

export interface ExecutionGrantPermission {
  readonly kind: string;
  readonly scopes: readonly string[];
}

export interface ExecutionGrant {
  readonly id: string;
  readonly issuer: string;
  readonly runId: string;
  readonly attemptId: string;
  readonly workPacket: string;
  readonly executor: Readonly<{ id: string; version: string }>;
  readonly permissions: readonly ExecutionGrantPermission[];
}

export interface ExecutionPolicy {
  readonly timeoutMs: number;
  readonly abortAcknowledgementMs: number;
}

export interface ExecutionWorkflow {
  readonly stage: WorkflowStage;
  readonly outcome: WorkflowOutcome;
}

export interface WorkPacketExecutorRequest {
  readonly workPacket: WorkPacketArtifact;
  readonly grant: ExecutionGrant;
  readonly signal: AbortSignal;
}

export type WorkPacketExecutorSettlement =
  | Readonly<{
      state: "completed";
      workflow?: ExecutionWorkflow;
      evidence?: readonly RunEventEvidenceReference[];
    }>
  | Readonly<{
      state: "failed";
      terminalCode: FailedTerminalCode;
      workflow?: ExecutionWorkflow;
      evidence?: readonly RunEventEvidenceReference[];
    }>;

export interface WorkPacketExecutor {
  readonly id: string;
  readonly version: string;
  execute(request: WorkPacketExecutorRequest): Promise<WorkPacketExecutorSettlement>;
}

export interface ExecuteWorkPacketOptions {
  readonly workPacket: unknown;
  readonly adapterManifest: unknown;
  readonly grant: unknown;
  readonly executor: WorkPacketExecutor;
  readonly runId: string;
  readonly attemptId: string;
  readonly correlationId: string;
  readonly policy: ExecutionPolicy;
  readonly signal?: AbortSignal;
}

export type ExecutionDisposition =
  | "completed"
  | "failed"
  | "cancelled"
  | "timed_out"
  | "abort_unconfirmed";

export type ExecutionFailureCode =
  | "executor_declared_failure"
  | "executor_threw"
  | "executor_result_invalid";

interface ExecutionSummaryBase {
  readonly runId: string;
  readonly attemptId: string;
  readonly workPacket: string;
  readonly executor: Readonly<{ id: string; version: string }>;
  readonly grant: ExecutionGrant;
  readonly events: readonly RunEventArtifact[];
}

export type ExecutionSummary =
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "completed";
        state: "completed";
        terminalCode: "success";
        workflow?: ExecutionWorkflow;
      }>)
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "failed";
        state: "failed";
        terminalCode: FailedTerminalCode;
        failureCode: ExecutionFailureCode;
        workflow?: ExecutionWorkflow;
      }>)
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "cancelled";
        state: "cancelled";
        terminalCode: "cancelled_by_user";
        abortCause: "caller";
        cancellationAcknowledged: true;
      }>)
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "cancelled";
        state: "cancelled";
        terminalCode: "cancelled_by_policy";
        abortCause: "deadline";
        cancellationAcknowledged: true;
      }>)
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "timed_out";
        state: "timed_out";
        terminalCode: "deadline_exceeded";
        abortCause: "deadline";
        cancellationAcknowledged: true;
      }>)
  | (ExecutionSummaryBase &
      Readonly<{
        disposition: "abort_unconfirmed";
        state: "running";
        abortCause: "caller" | "deadline";
        cancellationAcknowledged: false;
      }>);

export interface ExecutionTimer {
  readonly promise: Promise<void>;
  cancel(): void;
}

export interface ExecutionHooks {
  readonly monotonicNow?: () => number;
  readonly wallNow?: () => number;
  readonly createTimer?: (milliseconds: number) => ExecutionTimer;
}

interface ExecutorHandle {
  readonly receiver: object;
  readonly id: string;
  readonly version: string;
  readonly execute: (request: WorkPacketExecutorRequest) => unknown;
}

interface PreflightContext {
  readonly packet: WorkPacketArtifact;
  readonly manifest: AdapterManifestArtifact;
  readonly grant: ExecutionGrant;
  readonly executor: ExecutorHandle;
  readonly policy: ExecutionPolicy;
  readonly runId: string;
  readonly attemptId: string;
  readonly correlationId: string;
  readonly signal: AbortSignal | undefined;
}

interface NormalizedSettlement {
  readonly state: "completed" | "failed";
  readonly terminalCode?: FailedTerminalCode;
  readonly workflow?: ExecutionWorkflow;
  readonly evidence?: readonly RunEventEvidenceReference[];
}

type AdapterToken =
  | Readonly<{ kind: "settled"; value: unknown; observedAt: number }>
  | Readonly<{ kind: "rejected"; observedAt: number }>;

type AbortCause = "caller" | "deadline";

type AbortToken = Readonly<{ kind: "abort"; cause: AbortCause; observedAt: number }>;

type RaceToken = AdapterToken | AbortToken;

const IDENTIFIER = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const SEMVER = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z.-]+)?$/;
const WORKFLOW_STAGES = new Set<WorkflowStage>([
  "intake",
  "clarify",
  "spec",
  "architecture_check",
  "task_plan",
  "implement",
  "verify",
  "review",
  "memory_update",
  "merge",
]);
const WORKFLOW_OUTCOMES = new Set<WorkflowOutcome>([
  "pass",
  "fix",
  "diagnose",
  "clarify",
  "redesign",
  "split",
  "block",
  "learn",
]);
const FAILED_TERMINAL_CODES = new Set<FailedTerminalCode>([
  "execution_failed",
  "verification_failed",
  "review_failed",
  "handoff_failed",
  "integration_failed",
]);
const KERNEL_ACTOR = "swecircuit.kernel";
const ABORTED_GETTER = Object.getOwnPropertyDescriptor(AbortSignal.prototype, "aborted")?.get;
const ADD_EVENT_LISTENER = EventTarget.prototype.addEventListener;
const REMOVE_EVENT_LISTENER = EventTarget.prototype.removeEventListener;
const PROMISE_THEN = Promise.prototype.then;

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function isIdentifier(value: unknown): value is string {
  return typeof value === "string" && value.length <= 128 && IDENTIFIER.test(value);
}

function isSemver(value: unknown): value is string {
  return typeof value === "string" && value.length <= 128 && SEMVER.test(value);
}

function proxyValue(value: object): boolean {
  return utilTypes.isProxy(value);
}

function arrayValue(value: object): boolean | null {
  try {
    return Array.isArray(value);
  } catch {
    return null;
  }
}

type ClosedRecord<Required extends readonly string[], Optional extends readonly string[]> = {
  [Key in Required[number]]: unknown;
} & {
  [Key in Optional[number]]?: unknown;
};

function closedRecord<
  const Required extends readonly string[],
  const Optional extends readonly string[] = readonly [],
>(
  value: unknown,
  required: Required,
  optional: Optional = [] as unknown as Optional,
): ClosedRecord<Required, Optional> | null {
  if (value === null || typeof value !== "object" || proxyValue(value)) {
    return null;
  }
  const array = arrayValue(value);
  if (array !== false) {
    return null;
  }
  let prototype: object | null;
  let keys: readonly PropertyKey[];
  try {
    prototype = Object.getPrototypeOf(value) as object | null;
    keys = Reflect.ownKeys(value);
  } catch {
    return null;
  }
  if (prototype !== Object.prototype && prototype !== null) {
    return null;
  }
  const allowed = new Set([...required, ...optional]);
  if (
    keys.some((key) => typeof key !== "string" || !allowed.has(key)) ||
    required.some((key) => !keys.includes(key))
  ) {
    return null;
  }
  const result: Record<string, unknown> = {};
  for (const key of keys as readonly string[]) {
    let descriptor: PropertyDescriptor | undefined;
    try {
      descriptor = Object.getOwnPropertyDescriptor(value, key);
    } catch {
      return null;
    }
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      return null;
    }
    result[key] = descriptor.value;
  }
  return result as ClosedRecord<Required, Optional>;
}

function ownDataProperty(value: object, key: string): unknown {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return descriptor !== undefined && "value" in descriptor ? descriptor.value : undefined;
  } catch {
    return undefined;
  }
}

function dataMethod(
  value: object,
  key: string,
): ((request: WorkPacketExecutorRequest) => unknown) | null {
  let current: object | null = value;
  for (let depth = 0; current !== null && depth < 16; depth += 1) {
    if (proxyValue(current)) {
      return null;
    }
    let descriptor: PropertyDescriptor | undefined;
    try {
      descriptor = Object.getOwnPropertyDescriptor(current, key);
    } catch {
      return null;
    }
    if (descriptor !== undefined) {
      return "value" in descriptor && typeof descriptor.value === "function"
        ? (descriptor.value as (request: WorkPacketExecutorRequest) => unknown)
        : null;
    }
    try {
      current = Object.getPrototypeOf(current) as object | null;
    } catch {
      return null;
    }
  }
  return null;
}

function signalAborted(value: unknown): boolean | null {
  if (
    value === null ||
    typeof value !== "object" ||
    proxyValue(value) ||
    ABORTED_GETTER === undefined
  ) {
    return null;
  }
  try {
    return ABORTED_GETTER.call(value);
  } catch {
    return null;
  }
}

function addAbortListener(signal: AbortSignal, listener: () => void): boolean {
  try {
    ADD_EVENT_LISTENER.call(signal, "abort", listener, { once: true });
    return true;
  } catch {
    return false;
  }
}

function removeAbortListener(signal: AbortSignal, listener: () => void): void {
  try {
    REMOVE_EVENT_LISTENER.call(signal, "abort", listener);
  } catch {
    // The intrinsic brand check ran during preflight; removal is best-effort cleanup.
  }
}

function snapshotInput(
  value: unknown,
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
): JsonValue | undefined {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure === null) {
    return snapshot.value;
  }
  diagnostics.push(
    createDiagnostic(snapshot.failure === "invalid" ? "SC4201" : "SC4210", artifact, pointer),
  );
  return undefined;
}

function parsePolicy(
  value: JsonValue | undefined,
  diagnostics: Diagnostic[],
): ExecutionPolicy | null {
  const record = closedRecord(value, ["timeoutMs", "abortAcknowledgementMs"]);
  const timeoutMs = record?.timeoutMs;
  const abortAcknowledgementMs = record?.abortAcknowledgementMs;
  if (
    !Number.isSafeInteger(timeoutMs) ||
    !Number.isSafeInteger(abortAcknowledgementMs) ||
    (timeoutMs as number) <= 0 ||
    (abortAcknowledgementMs as number) <= 0 ||
    (timeoutMs as number) > 604_800_000 ||
    (abortAcknowledgementMs as number) > LIMITS.executionAbortAcknowledgementMs
  ) {
    diagnostics.push(createDiagnostic("SC4208", "execution-options", "/policy"));
    return null;
  }
  return Object.freeze({
    timeoutMs: timeoutMs as number,
    abortAcknowledgementMs: abortAcknowledgementMs as number,
  });
}

function parseGrant(
  value: JsonValue | undefined,
  diagnostics: Diagnostic[],
): ExecutionGrant | null {
  const record = closedRecord(value, [
    "id",
    "issuer",
    "runId",
    "attemptId",
    "workPacket",
    "executor",
    "permissions",
  ]);
  const executor = closedRecord(record?.executor, ["id", "version"]);
  const permissionsValue = record?.permissions;
  if (
    record === null ||
    executor === null ||
    !isIdentifier(record.id) ||
    !isIdentifier(record.issuer) ||
    !isIdentifier(record.runId) ||
    !isIdentifier(record.attemptId) ||
    !isIdentifier(record.workPacket) ||
    !isIdentifier(executor.id) ||
    !isSemver(executor.version) ||
    !Array.isArray(permissionsValue) ||
    permissionsValue.length > LIMITS.executionGrantPermissions
  ) {
    diagnostics.push(createDiagnostic("SC4205", "execution-grant"));
    return null;
  }

  const permissions: ExecutionGrantPermission[] = [];
  const seenScopes = new Set<string>();
  for (const [index, candidate] of permissionsValue.entries()) {
    const permission = closedRecord(candidate, ["kind", "scopes"]);
    const scopes = permission?.scopes;
    if (
      permission === null ||
      typeof permission.kind !== "string" ||
      !Array.isArray(scopes) ||
      scopes.length === 0 ||
      scopes.length > 128 ||
      scopes.some((scope) => typeof scope !== "string" || scope.length === 0 || scope.length > 512)
    ) {
      diagnostics.push(createDiagnostic("SC4205", "execution-grant", `/permissions/${index}`));
      continue;
    }
    const localScopes = new Set<string>();
    for (const scope of scopes as string[]) {
      const key = `${permission.kind}\u0000${scope}`;
      if (localScopes.has(scope) || seenScopes.has(key)) {
        diagnostics.push(
          createDiagnostic("SC4205", "execution-grant", `/permissions/${index}/scopes`),
        );
      }
      localScopes.add(scope);
      seenScopes.add(key);
    }
    permissions.push(
      Object.freeze({
        kind: permission.kind,
        scopes: Object.freeze([...(scopes as string[])]),
      }),
    );
  }
  diagnostics.push(...validatePermissionRequests(permissions, "execution-grant", "/permissions"));
  if (hasErrors(diagnostics)) {
    return null;
  }
  return Object.freeze({
    id: record.id,
    issuer: record.issuer,
    runId: record.runId,
    attemptId: record.attemptId,
    workPacket: record.workPacket,
    executor: Object.freeze({ id: executor.id, version: executor.version }),
    permissions: Object.freeze(permissions),
  });
}

function parseExecutor(value: unknown, diagnostics: Diagnostic[]): ExecutorHandle | null {
  if (value === null || typeof value !== "object" || proxyValue(value)) {
    diagnostics.push(createDiagnostic("SC4201", "execution-options", "/executor"));
    return null;
  }
  const id = ownDataProperty(value, "id");
  const version = ownDataProperty(value, "version");
  const execute = dataMethod(value, "execute");
  if (!isIdentifier(id) || !isSemver(version) || execute === null) {
    diagnostics.push(createDiagnostic("SC4201", "execution-options", "/executor"));
    return null;
  }
  return Object.freeze({
    receiver: value,
    id,
    version,
    execute,
  });
}

function returnBoundStrings(context: Omit<PreflightContext, "signal">): readonly string[] {
  const values = [
    context.runId,
    context.attemptId,
    context.correlationId,
    context.packet.metadata.id,
    context.executor.id,
    context.executor.version,
    context.grant.id,
    context.grant.issuer,
    context.grant.runId,
    context.grant.attemptId,
    context.grant.workPacket,
    context.grant.executor.id,
    context.grant.executor.version,
  ];
  for (const permission of context.grant.permissions) {
    values.push(permission.kind, ...permission.scopes);
  }
  return values;
}

function preflight(options: unknown): {
  readonly context: PreflightContext | null;
  readonly diagnostics: readonly Diagnostic[];
} {
  const diagnostics: Diagnostic[] = [];
  const fields = closedRecord(
    options,
    [
      "workPacket",
      "adapterManifest",
      "grant",
      "executor",
      "runId",
      "attemptId",
      "correlationId",
      "policy",
    ],
    ["signal"],
  );
  if (fields === null) {
    diagnostics.push(createDiagnostic("SC4201", "execution-options"));
    return Object.freeze({ context: null, diagnostics: Object.freeze(diagnostics) });
  }

  const packetValue = snapshotInput(fields.workPacket, "work-packet.json", "", diagnostics);
  const manifestValue = snapshotInput(
    fields.adapterManifest,
    "adapter-manifest.json",
    "",
    diagnostics,
  );
  const grantValue = snapshotInput(fields.grant, "execution-grant", "", diagnostics);
  const policyValue = snapshotInput(fields.policy, "execution-options", "/policy", diagnostics);

  const packetResult =
    packetValue === undefined ? null : validateArtifactValue(packetValue, "work-packet.json");
  const manifestResult =
    manifestValue === undefined
      ? null
      : validateArtifactValue(manifestValue, "adapter-manifest.json");
  if (packetResult !== null) {
    diagnostics.push(...packetResult.diagnostics);
  }
  if (manifestResult !== null) {
    diagnostics.push(...manifestResult.diagnostics);
  }
  if (packetResult?.value !== null && packetResult?.value.kind !== "WorkPacket") {
    diagnostics.push(createDiagnostic("SC4202", "work-packet.json", "/kind"));
  }
  if (manifestResult?.value !== null && manifestResult?.value.kind !== "AdapterManifest") {
    diagnostics.push(createDiagnostic("SC4202", "adapter-manifest.json", "/kind"));
  }

  const grant = parseGrant(grantValue, diagnostics);
  const policy = parsePolicy(policyValue, diagnostics);
  const executor = parseExecutor(fields.executor, diagnostics);
  const signal = fields.signal;
  if (signal !== undefined && signalAborted(signal) === null) {
    diagnostics.push(createDiagnostic("SC4201", "execution-options", "/signal"));
  }
  if (
    !isIdentifier(fields.runId) ||
    !isIdentifier(fields.attemptId) ||
    !isIdentifier(fields.correlationId)
  ) {
    diagnostics.push(createDiagnostic("SC4201", "execution-options"));
  }
  if (
    hasErrors(diagnostics) ||
    packetResult?.value?.kind !== "WorkPacket" ||
    manifestResult?.value?.kind !== "AdapterManifest" ||
    grant === null ||
    policy === null ||
    executor === null
  ) {
    return Object.freeze({ context: null, diagnostics: Object.freeze(diagnostics) });
  }

  const packet = packetResult.value as WorkPacketArtifact;
  const manifest = manifestResult.value as AdapterManifestArtifact;
  diagnostics.push(
    ...validatePermissionRequests(
      packet.spec.authority.permissionCeiling,
      "work-packet.json",
      "/spec/authority/permissionCeiling",
    ),
    ...validatePermissionRequests(
      manifest.spec.requestedPermissions,
      "adapter-manifest.json",
      "/spec/requestedPermissions",
    ),
  );

  const maximumSeconds = manifest.spec.behavior.timeout.maximumSeconds;
  if (
    manifest.spec.adapterKind !== "agent_runtime" ||
    !manifest.spec.compatibility.apiVersions.includes(API_VERSION) ||
    !manifest.spec.capabilities.includes("launch_agent") ||
    !manifest.spec.inputKinds.includes("WorkPacket") ||
    manifest.spec.outputKinds.length !== 0 ||
    !manifest.spec.behavior.timeout.supported ||
    !Number.isSafeInteger(maximumSeconds) ||
    (maximumSeconds ?? 0) <= 0 ||
    !manifest.spec.behavior.cancellation.supported ||
    !manifest.spec.behavior.cancellation.acknowledged ||
    !manifest.spec.behavior.errors.structured
  ) {
    diagnostics.push(createDiagnostic("SC4203", "adapter-manifest.json"));
  }
  if (maximumSeconds !== undefined && policy.timeoutMs > maximumSeconds * 1_000) {
    diagnostics.push(createDiagnostic("SC4208", "execution-options", "/policy/timeoutMs"));
  }

  const manifestVersion = manifest.metadata.version;
  if (
    typeof manifestVersion !== "string" ||
    fields.runId !== grant.runId ||
    fields.attemptId !== grant.attemptId ||
    packet.metadata.id !== grant.workPacket ||
    executor.id !== manifest.metadata.id ||
    executor.id !== grant.executor.id ||
    executor.version !== manifestVersion ||
    executor.version !== grant.executor.version
  ) {
    diagnostics.push(createDiagnostic("SC4204", "execution-options"));
  }

  if (
    manifest.spec.requestedPermissions.some(
      (request) => !permissionRequirementCovered(request, grant.permissions),
    ) ||
    grant.permissions.some(
      (permission) => !permissionRequirementCovered(permission, manifest.spec.requestedPermissions),
    )
  ) {
    diagnostics.push(createDiagnostic("SC4206", "execution-grant", "/permissions"));
  }
  if (
    grant.permissions.some(
      (permission) =>
        !permissionRequirementCovered(permission, packet.spec.authority.permissionCeiling),
    )
  ) {
    diagnostics.push(createDiagnostic("SC4207", "execution-grant", "/permissions"));
  }

  const contextWithoutSignal = Object.freeze({
    packet,
    manifest,
    grant,
    executor,
    policy,
    runId: fields.runId as string,
    attemptId: fields.attemptId as string,
    correlationId: fields.correlationId as string,
  });
  if (returnBoundStrings(contextWithoutSignal).some(containsHighConfidenceSecret)) {
    diagnostics.push(createDiagnostic("SC4209", "execution-options"));
  }
  if (hasErrors(diagnostics)) {
    return Object.freeze({ context: null, diagnostics: Object.freeze(diagnostics) });
  }

  return Object.freeze({
    context: Object.freeze({
      ...contextWithoutSignal,
      signal: signal as AbortSignal | undefined,
    }),
    diagnostics: Object.freeze(diagnostics),
  });
}

function defaultTimer(milliseconds: number): ExecutionTimer {
  let handle: NodeJS.Timeout | undefined;
  let settled = false;
  const promise = new Promise<void>((resolve) => {
    handle = setTimeout(() => {
      settled = true;
      resolve();
    }, milliseconds);
  });
  return Object.freeze({
    promise,
    cancel(): void {
      if (!settled && handle !== undefined) {
        clearTimeout(handle);
      }
    },
  });
}

function createDeadlineTimer(
  deadline: number,
  monotonicNow: () => number,
  createTimer: (milliseconds: number) => ExecutionTimer,
): ExecutionTimer {
  let active: ExecutionTimer | undefined;
  let cancelled = false;
  let settled = false;
  let resolveDeadline!: () => void;
  const promise = new Promise<void>((resolve) => {
    resolveDeadline = resolve;
  });
  const arm = (): void => {
    if (cancelled || settled) {
      return;
    }
    const remaining = deadline - monotonicNow();
    if (remaining <= 0) {
      settled = true;
      resolveDeadline();
      return;
    }
    active = createTimer(remaining);
    void active.promise.then(arm, arm);
  };
  arm();
  return Object.freeze({
    promise,
    cancel(): void {
      cancelled = true;
      active?.cancel();
    },
  });
}
class Journal {
  readonly #context: PreflightContext;
  readonly #events: RunEventArtifact[] = [];

  constructor(context: PreflightContext) {
    this.#context = context;
  }

  emit(type: RunEventArtifact["spec"]["type"], payload: JsonObject = {}): void {
    const sequence = this.#events.length;
    const previous = this.#events.at(-1)?.metadata.id;
    const event = {
      apiVersion: API_VERSION,
      kind: "RunEvent",
      metadata: { id: `event.${sequence}` },
      spec: {
        type,
        eventTypeVersion: EVENT_TYPE_VERSION,
        runId: this.#context.runId,
        sequence,
        correlationId: this.#context.correlationId,
        actor: KERNEL_ACTOR,
        ...(sequence === 0 ? { links: [this.#context.grant.id] } : {}),
        ...(previous === undefined ? {} : { causationId: previous }),
        ...payload,
      },
    };
    const snapshot = snapshotJsonValue(event);
    if (snapshot.failure !== null || snapshot.value === null) {
      throw new Error("SWECircuit generated an invalid execution event snapshot.");
    }
    this.#events.push(snapshot.value as unknown as RunEventArtifact);
  }

  state(state: ExecutionState, terminalCode?: TerminalCode): void {
    const deadline = this.#context.packet.spec.deadline;
    this.emit("attempt.state", {
      attempt: {
        id: this.#context.attemptId,
        number: 1,
        workPacket: this.#context.packet.metadata.id,
        state,
        ...(deadline === undefined ? {} : { deadline }),
        ...(terminalCode === undefined ? {} : { terminalCode }),
      },
    });
  }

  cancellation(cause: AbortCause): void {
    this.emit("attempt.cancellation_requested", {
      attemptId: this.#context.attemptId,
      cancellation: {
        requestedBy: cause === "caller" ? this.#context.grant.issuer : KERNEL_ACTOR,
        reasonCode: cause === "caller" ? "user_request" : "policy",
      },
    });
  }

  workflow(workflow: ExecutionWorkflow): void {
    this.emit("workflow.outcome", {
      stage: workflow.stage,
      outcome: workflow.outcome,
      workPacket: this.#context.packet.metadata.id,
      attemptId: this.#context.attemptId,
    });
  }

  evidence(evidence: readonly RunEventEvidenceReference[], stage?: WorkflowStage): void {
    this.emit("evidence.recorded", {
      ...(stage === undefined ? {} : { stage }),
      workPacket: this.#context.packet.metadata.id,
      attemptId: this.#context.attemptId,
      evidence: evidence as unknown as JsonValue,
    });
  }

  finish(): readonly RunEventArtifact[] {
    const events = Object.freeze([...this.#events]);
    const body = `${events.map((event) => JSON.stringify(event)).join("\n")}\n`;
    const inspection = inspectTraceBytes(new TextEncoder().encode(body));
    if (!inspection.ok || inspection.diagnostics.length > 0) {
      throw new Error("SWECircuit generated an invalid execution journal.");
    }
    return events;
  }
}

interface RawCompletionRecord {
  readonly state?: unknown;
  readonly terminalCode?: unknown;
  readonly workflow?: unknown;
  readonly evidence?: unknown;
}

function completionRecord(value: unknown): RawCompletionRecord | null {
  if (value === null || typeof value !== "object" || proxyValue(value)) {
    return null;
  }
  const array = arrayValue(value);
  if (array !== false) {
    return null;
  }
  let keys: readonly PropertyKey[];
  try {
    keys = Reflect.ownKeys(value);
  } catch {
    return null;
  }
  if (keys.some((key) => typeof key !== "string")) {
    return null;
  }
  const allowed = new Set(["state", "terminalCode", "workflow", "evidence"]);
  if (keys.some((key) => !allowed.has(key as string))) {
    return null;
  }
  const result: Record<string, unknown> = {};
  for (const key of keys as readonly string[]) {
    let descriptor: PropertyDescriptor | undefined;
    try {
      descriptor = Object.getOwnPropertyDescriptor(value, key);
    } catch {
      return null;
    }
    if (
      descriptor === undefined ||
      !descriptor.enumerable ||
      !("value" in descriptor) ||
      descriptor.value === undefined
    ) {
      return null;
    }
    result[key] = descriptor.value;
  }
  return result as RawCompletionRecord;
}

function normalizeWorkflow(value: unknown): ExecutionWorkflow | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  const snapshot = snapshotJsonValue(value);
  const record =
    snapshot.failure === null ? closedRecord(snapshot.value, ["stage", "outcome"]) : null;
  if (
    record === null ||
    typeof record.stage !== "string" ||
    typeof record.outcome !== "string" ||
    !WORKFLOW_STAGES.has(record.stage as WorkflowStage) ||
    !WORKFLOW_OUTCOMES.has(record.outcome as WorkflowOutcome) ||
    containsHighConfidenceSecret(record.stage) ||
    containsHighConfidenceSecret(record.outcome)
  ) {
    return null;
  }
  return Object.freeze({
    stage: record.stage as WorkflowStage,
    outcome: record.outcome as WorkflowOutcome,
  });
}

function evidenceStrings(reference: RunEventEvidenceReference): readonly string[] {
  return [
    reference.id,
    reference.kind,
    reference.ref,
    ...(reference.digest === undefined ? [] : [reference.digest]),
  ];
}

function normalizeEvidence(
  value: unknown,
): readonly RunEventEvidenceReference[] | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  const snapshot = snapshotJsonValue(value);
  if (
    snapshot.failure !== null ||
    !Array.isArray(snapshot.value) ||
    snapshot.value.length === 0 ||
    snapshot.value.length > 64
  ) {
    return null;
  }
  const probe = {
    apiVersion: API_VERSION,
    kind: "RunEvent",
    metadata: { id: "event.0" },
    spec: {
      type: "evidence.recorded",
      eventTypeVersion: EVENT_TYPE_VERSION,
      runId: "run.probe",
      sequence: 0,
      correlationId: "probe",
      actor: KERNEL_ACTOR,
      evidence: snapshot.value as unknown as readonly RunEventEvidenceReference[],
    },
  } as unknown as JsonValue;
  const validation = validateArtifactValue(probe, "executor-result.json");
  if (!validation.ok) {
    return null;
  }
  const evidence = snapshot.value as unknown as readonly RunEventEvidenceReference[];
  if (evidence.some((reference) => evidenceStrings(reference).some(containsHighConfidenceSecret))) {
    return null;
  }
  return Object.freeze([...evidence]);
}

function normalizeSettlement(value: unknown): NormalizedSettlement | null {
  const record = completionRecord(value);
  if (record === null || (record.state !== "completed" && record.state !== "failed")) {
    return null;
  }
  const workflow = normalizeWorkflow(record.workflow);
  const evidence = normalizeEvidence(record.evidence);
  if (workflow === null || evidence === null) {
    return null;
  }
  if (record.state === "completed") {
    if (record.terminalCode !== undefined) {
      return null;
    }
    return Object.freeze({
      state: "completed",
      ...(workflow === undefined ? {} : { workflow }),
      ...(evidence === undefined ? {} : { evidence }),
    });
  }
  if (
    typeof record.terminalCode !== "string" ||
    !FAILED_TERMINAL_CODES.has(record.terminalCode as FailedTerminalCode)
  ) {
    return null;
  }
  return Object.freeze({
    state: "failed",
    terminalCode: record.terminalCode as FailedTerminalCode,
    ...(workflow === undefined ? {} : { workflow }),
    ...(evidence === undefined ? {} : { evidence }),
  });
}

function baseSummary(
  context: PreflightContext,
  events: readonly RunEventArtifact[],
): ExecutionSummaryBase {
  return Object.freeze({
    runId: context.runId,
    attemptId: context.attemptId,
    workPacket: context.packet.metadata.id,
    executor: Object.freeze({ id: context.executor.id, version: context.executor.version }),
    grant: context.grant,
    events,
  });
}

function emitSettlement(journal: Journal, settlement: NormalizedSettlement): void {
  if (settlement.workflow !== undefined) {
    journal.workflow(settlement.workflow);
  }
  if (settlement.evidence !== undefined) {
    journal.evidence(settlement.evidence, settlement.workflow?.stage);
  }
}

function terminalAbort(
  context: PreflightContext,
  journal: Journal,
  cause: AbortCause,
  started: boolean,
): ExecutionSummary {
  journal.cancellation(cause);
  if (cause === "caller") {
    journal.state("cancelled", "cancelled_by_user");
    journal.emit("run.completed");
    return Object.freeze({
      ...baseSummary(context, journal.finish()),
      disposition: "cancelled",
      state: "cancelled",
      terminalCode: "cancelled_by_user",
      abortCause: "caller",
      cancellationAcknowledged: true,
    });
  }
  if (!started) {
    journal.state("cancelled", "cancelled_by_policy");
    journal.emit("run.completed");
    return Object.freeze({
      ...baseSummary(context, journal.finish()),
      disposition: "cancelled",
      state: "cancelled",
      terminalCode: "cancelled_by_policy",
      abortCause: "deadline",
      cancellationAcknowledged: true,
    });
  }
  journal.state("timed_out", "deadline_exceeded");
  journal.emit("run.completed");
  return Object.freeze({
    ...baseSummary(context, journal.finish()),
    disposition: "timed_out",
    state: "timed_out",
    terminalCode: "deadline_exceeded",
    abortCause: "deadline",
    cancellationAcknowledged: true,
  });
}

function unconfirmedAbort(
  context: PreflightContext,
  journal: Journal,
  cause: AbortCause,
): ExecutionSummary {
  return Object.freeze({
    ...baseSummary(context, journal.finish()),
    disposition: "abort_unconfirmed",
    state: "running",
    abortCause: cause,
    cancellationAcknowledged: false,
  });
}

function executionFailure(
  context: PreflightContext,
  journal: Journal,
  failureCode: ExecutionFailureCode,
  terminalCode: FailedTerminalCode = "execution_failed",
  settlement?: NormalizedSettlement,
): ExecutionSummary {
  if (settlement !== undefined) {
    emitSettlement(journal, settlement);
  }
  journal.state("failed", terminalCode);
  journal.emit("run.completed");
  return Object.freeze({
    ...baseSummary(context, journal.finish()),
    disposition: "failed",
    state: "failed",
    terminalCode,
    failureCode,
    ...(settlement?.workflow === undefined ? {} : { workflow: settlement.workflow }),
  });
}

function executionSuccess(
  context: PreflightContext,
  journal: Journal,
  settlement: NormalizedSettlement,
): ExecutionSummary {
  emitSettlement(journal, settlement);
  journal.state("completed", "success");
  journal.emit("run.completed");
  return Object.freeze({
    ...baseSummary(context, journal.finish()),
    disposition: "completed",
    state: "completed",
    terminalCode: "success",
    ...(settlement.workflow === undefined ? {} : { workflow: settlement.workflow }),
  });
}

function observeAdapterResult(value: unknown, monotonicNow: () => number): Promise<AdapterToken> {
  const settled = (result: unknown): AdapterToken =>
    Object.freeze({ kind: "settled", value: result, observedAt: monotonicNow() });
  const rejected = (): AdapterToken =>
    Object.freeze({ kind: "rejected", observedAt: monotonicNow() });
  try {
    return Reflect.apply(PROMISE_THEN, value, [settled, rejected]) as Promise<AdapterToken>;
  } catch {
    return Promise.resolve(settled(value));
  }
}

export async function executeWorkPacketWithHooks(
  options: ExecuteWorkPacketOptions,
  hooks: ExecutionHooks = {},
): Promise<OperationResult<ExecutionSummary>> {
  const prepared = preflight(options);
  if (prepared.context === null) {
    return operationResult<ExecutionSummary>(prepared.diagnostics, null);
  }
  const context = prepared.context;
  const monotonicNow = hooks.monotonicNow ?? (() => performance.now());
  const wallNow = hooks.wallNow ?? (() => Date.now());
  const createTimer = hooks.createTimer ?? defaultTimer;
  const startMonotonic = monotonicNow();
  const startWall = wallNow();
  const packetDeadline = context.packet.spec.deadline;
  const packetRemaining =
    packetDeadline === undefined
      ? Number.POSITIVE_INFINITY
      : Date.parse(packetDeadline) - startWall;
  const effectiveDeadline = Math.min(
    startMonotonic + context.policy.timeoutMs,
    startMonotonic + Math.max(0, packetRemaining),
  );

  const journal = new Journal(context);
  journal.emit("run.started");
  journal.state("queued");

  if (!Number.isFinite(packetRemaining) && packetDeadline !== undefined) {
    return operationResult<ExecutionSummary>(
      [createDiagnostic("SC4208", "work-packet.json", "/spec/deadline")],
      null,
    );
  }

  const initialNow = monotonicNow();
  const initialSignalState = context.signal === undefined ? false : signalAborted(context.signal);
  if (initialSignalState === null) {
    return operationResult<ExecutionSummary>(
      [createDiagnostic("SC4201", "execution-options", "/signal")],
      null,
    );
  }
  if (initialSignalState) {
    const cause = initialNow >= effectiveDeadline ? "deadline" : "caller";
    return operationResult([], terminalAbort(context, journal, cause, false));
  }
  if (initialNow >= effectiveDeadline) {
    return operationResult([], terminalAbort(context, journal, "deadline", false));
  }

  let observedAbort: AbortToken | undefined;
  let resolveAbort!: (token: AbortToken) => void;
  const abortToken = new Promise<AbortToken>((resolve) => {
    resolveAbort = resolve;
  });
  const observeAbort = (source: AbortCause, observedAt: number): AbortToken => {
    if (observedAbort !== undefined) {
      return observedAbort;
    }
    const cause = source === "deadline" || observedAt >= effectiveDeadline ? "deadline" : "caller";
    observedAbort = Object.freeze({ kind: "abort", cause, observedAt });
    resolveAbort(observedAbort);
    return observedAbort;
  };
  const currentAbort = (): AbortToken | undefined => observedAbort;
  const onAbort = (): void => {
    observeAbort("caller", monotonicNow());
  };

  let listenerRegistered = false;
  let deadlineTimer: ExecutionTimer | undefined;
  try {
    if (context.signal !== undefined) {
      listenerRegistered = addAbortListener(context.signal, onAbort);
      if (!listenerRegistered) {
        return operationResult<ExecutionSummary>(
          [createDiagnostic("SC4201", "execution-options", "/signal")],
          null,
        );
      }
      const registeredSignalState = signalAborted(context.signal);
      if (registeredSignalState === null) {
        return operationResult<ExecutionSummary>(
          [createDiagnostic("SC4201", "execution-options", "/signal")],
          null,
        );
      }
      if (registeredSignalState) {
        observeAbort("caller", monotonicNow());
      }
    }

    const registeredAbort = currentAbort();
    if (registeredAbort !== undefined) {
      return operationResult([], terminalAbort(context, journal, registeredAbort.cause, false));
    }

    const controller = new AbortController();
    deadlineTimer = createDeadlineTimer(effectiveDeadline, monotonicNow, createTimer);
    void deadlineTimer.promise.then(
      () => observeAbort("deadline", monotonicNow()),
      () => observeAbort("deadline", monotonicNow()),
    );

    if (context.signal !== undefined) {
      const finalSignalState = signalAborted(context.signal);
      if (finalSignalState === null) {
        return operationResult<ExecutionSummary>(
          [createDiagnostic("SC4201", "execution-options", "/signal")],
          null,
        );
      }
      if (finalSignalState) {
        observeAbort("caller", monotonicNow());
      }
    }
    const finalNow = monotonicNow();
    if (finalNow >= effectiveDeadline) {
      observeAbort("deadline", finalNow);
    }
    const beforeInvocationAbort = currentAbort();
    if (beforeInvocationAbort !== undefined) {
      return operationResult(
        [],
        terminalAbort(context, journal, beforeInvocationAbort.cause, false),
      );
    }

    const request = Object.freeze({
      workPacket: context.packet,
      grant: context.grant,
      signal: controller.signal,
    });
    const invocationNow = monotonicNow();
    const atInvocationAbort = currentAbort();
    if (atInvocationAbort !== undefined) {
      return operationResult([], terminalAbort(context, journal, atInvocationAbort.cause, false));
    }
    if (invocationNow >= effectiveDeadline) {
      const deadlineAbort = observeAbort("deadline", invocationNow);
      return operationResult([], terminalAbort(context, journal, deadlineAbort.cause, false));
    }

    let adapterToken: Promise<AdapterToken>;
    try {
      const returned = Reflect.apply(context.executor.execute, context.executor.receiver, [
        request,
      ]);
      adapterToken = observeAdapterResult(returned, monotonicNow);
    } catch {
      adapterToken = Promise.resolve(
        Object.freeze({ kind: "rejected", observedAt: monotonicNow() }),
      );
    }
    journal.state("running");

    const first = await Promise.race<RaceToken>([abortToken, adapterToken]);
    if (first.kind !== "abort") {
      const observedBeforeSettlement = currentAbort();
      const priorAbort =
        observedBeforeSettlement !== undefined &&
        observedBeforeSettlement.observedAt <= first.observedAt
          ? observedBeforeSettlement
          : undefined;
      const effectiveAbort =
        priorAbort ??
        (first.observedAt >= effectiveDeadline
          ? observeAbort("deadline", first.observedAt)
          : undefined);
      if (effectiveAbort === undefined) {
        deadlineTimer.cancel();
        if (first.kind === "rejected") {
          return operationResult([], executionFailure(context, journal, "executor_threw"));
        }
        const settlement = normalizeSettlement(first.value);
        if (settlement === null) {
          return operationResult([], executionFailure(context, journal, "executor_result_invalid"));
        }
        return operationResult(
          [],
          settlement.state === "completed"
            ? executionSuccess(context, journal, settlement)
            : executionFailure(
                context,
                journal,
                "executor_declared_failure",
                settlement.terminalCode,
                settlement,
              ),
        );
      }
    }

    const abort = first.kind === "abort" ? first : currentAbort();
    if (abort === undefined) {
      throw new Error("SWECircuit lost an observed abort token.");
    }
    deadlineTimer.cancel();
    const acknowledgementDeadline = abort.observedAt + context.policy.abortAcknowledgementMs;
    controller.abort();
    journal.cancellation(abort.cause);
    const acknowledgementTimer = createDeadlineTimer(
      acknowledgementDeadline,
      monotonicNow,
      createTimer,
    );
    let acknowledged: boolean;
    try {
      const acknowledgement = await Promise.race([
        adapterToken.then((token) =>
          Object.freeze({ kind: "adapter" as const, observedAt: token.observedAt }),
        ),
        acknowledgementTimer.promise.then(() => Object.freeze({ kind: "bound" as const })),
      ]);
      acknowledged =
        acknowledgement.kind === "adapter" && acknowledgement.observedAt < acknowledgementDeadline;
    } finally {
      acknowledgementTimer.cancel();
    }
    return operationResult(
      [],
      acknowledged
        ? terminalAbortAfterRequest(context, journal, abort.cause)
        : unconfirmedAbort(context, journal, abort.cause),
    );
  } finally {
    deadlineTimer?.cancel();
    if (listenerRegistered && context.signal !== undefined) {
      removeAbortListener(context.signal, onAbort);
    }
  }
}
function terminalAbortAfterRequest(
  context: PreflightContext,
  journal: Journal,
  cause: AbortCause,
): ExecutionSummary {
  if (cause === "caller") {
    journal.state("cancelled", "cancelled_by_user");
    journal.emit("run.completed");
    return Object.freeze({
      ...baseSummary(context, journal.finish()),
      disposition: "cancelled",
      state: "cancelled",
      terminalCode: "cancelled_by_user",
      abortCause: "caller",
      cancellationAcknowledged: true,
    });
  }
  journal.state("timed_out", "deadline_exceeded");
  journal.emit("run.completed");
  return Object.freeze({
    ...baseSummary(context, journal.finish()),
    disposition: "timed_out",
    state: "timed_out",
    terminalCode: "deadline_exceeded",
    abortCause: "deadline",
    cancellationAcknowledged: true,
  });
}

export function executeWorkPacket(
  options: ExecuteWorkPacketOptions,
): Promise<OperationResult<ExecutionSummary>> {
  return executeWorkPacketWithHooks(options);
}

export function createDeterministicTestExecutor(
  options: Readonly<{
    id: string;
    version: string;
    settlement: WorkPacketExecutorSettlement;
  }>,
): WorkPacketExecutor {
  return Object.freeze({
    id: options.id,
    version: options.version,
    async execute(request: WorkPacketExecutorRequest): Promise<WorkPacketExecutorSettlement> {
      if (request.signal.aborted) {
        throw new Error("Execution was aborted before deterministic settlement.");
      }
      await Promise.resolve();
      if (request.signal.aborted) {
        throw new Error("Execution was aborted before deterministic settlement.");
      }
      return options.settlement;
    },
  });
}
