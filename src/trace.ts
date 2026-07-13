import { LIMITS } from "./constants.js";
import { createDiagnostic, operationResult, type DiagnosticCode } from "./diagnostics.js";
import { parseJsonBuffer } from "./json.js";
import type {
  JsonValue,
  RunEventArtifact,
  RunEventAttempt,
  RunEventEvidenceReference,
} from "./model.js";
import {
  type ContainedReadHooks,
  readContainedFileBytesWithHooks,
  resolveProjectRoot,
} from "./path.js";
import { createSecretSuppressor } from "./privacy.js";
import { dispatchArtifact, dispatchRunEventVersion, validateArtifactSchema } from "./schema.js";
import type {
  Diagnostic,
  EvidenceKind,
  ExecutionState,
  InspectTraceOptions,
  OperationResult,
  RunEventType,
  TerminalCode,
  TraceAttemptSummary,
  TraceEvidenceSummary,
  TraceInspectionSummary,
  TraceRunSummary,
  TraceWorkflowOutcomeSummary,
  WorkflowOutcome,
  WorkflowStage,
} from "./types.js";

export interface InspectTraceHooks {
  readonly read?: ContainedReadHooks;
}

interface FramedRecord {
  readonly bytes: Uint8Array;
  readonly loneCarriageReturn: boolean;
}

interface ParsedEvent {
  readonly index: number;
  readonly value: RunEventArtifact;
}

interface MutableAttempt {
  readonly id: string;
  readonly number: number;
  readonly workPacket: string;
  readonly retryOf: string | undefined;
  readonly retryOfPresent: boolean;
  readonly deadline: string | undefined;
  readonly deadlinePresent: boolean;
  state: ExecutionState;
  lastSequence: number;
  terminalCode: TerminalCode | undefined;
  retrySuccessor: string | undefined;
}

interface MutableLineage {
  readonly attemptsByNumber: Map<number, MutableAttempt>;
}

interface MutableRun {
  readonly runId: string;
  readonly firstSequence: number;
  lastSequence: number;
  eventCount: number;
  hasStartedEvent: boolean;
  hasCompletedEvent: boolean;
  readonly correlationIds: string[];
  readonly correlationSet: Set<string>;
  readonly attempts: MutableAttempt[];
  readonly attemptsById: Map<string, MutableAttempt>;
  readonly lineages: Map<string, MutableLineage>;
  readonly workflowOutcomes: TraceWorkflowOutcomeSummary[];
  readonly evidence: TraceEvidenceSummary[];
  evidenceOmitted: number;
}

const TERMINAL_STATES = new Set<ExecutionState>(["completed", "failed", "cancelled", "timed_out"]);

const RETRYABLE_STATES = new Set<ExecutionState>(["failed", "cancelled", "timed_out"]);

const ALLOWED_TRANSITIONS: Readonly<Partial<Record<ExecutionState, ReadonlySet<ExecutionState>>>> =
  Object.freeze({
    queued: new Set<ExecutionState>(["running", "cancelled"]),
    running: new Set<ExecutionState>([
      "input_required",
      "completed",
      "failed",
      "cancelled",
      "timed_out",
    ]),
    input_required: new Set<ExecutionState>(["running", "cancelled", "timed_out"]),
  });

function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function indexedPointer(index: number, pointer = ""): string {
  return `/${index}${pointer}`;
}

function rebaseDiagnostics(
  diagnostics: readonly Diagnostic[],
  artifact: string,
  index: number,
): readonly Diagnostic[] {
  return diagnostics.map((diagnostic) =>
    createDiagnostic(
      diagnostic.code as DiagnosticCode,
      artifact,
      indexedPointer(index, diagnostic.pointer),
    ),
  );
}

function frameRecords(
  bytes: Uint8Array,
  artifact: string,
): {
  readonly recordCount: number;
  readonly records: readonly FramedRecord[];
  readonly diagnostics: readonly Diagnostic[];
} {
  if (
    bytes.byteLength === 0 ||
    (bytes.byteLength === 1 && bytes[0] === 0x0a) ||
    (bytes.byteLength === 2 && bytes[0] === 0x0d && bytes[1] === 0x0a)
  ) {
    return Object.freeze({
      recordCount: 0,
      records: Object.freeze([]),
      diagnostics: Object.freeze([]),
    });
  }

  const records: FramedRecord[] = [];
  const diagnostics: Diagnostic[] = [];
  let recordCount = 0;
  let start = 0;

  const addRecord = (end: number, terminatedByLf: boolean): void => {
    let recordEnd = end;
    if (terminatedByLf && recordEnd > start && bytes[recordEnd - 1] === 0x0d) {
      recordEnd -= 1;
    }

    const recordLength = recordEnd - start;
    if (recordLength > LIMITS.jsonlLineBytes) {
      diagnostics.push(createDiagnostic("SC5005", artifact, `/${recordCount}`));
    }
    recordCount += 1;

    if (records.length >= LIMITS.traceEvents + 1) {
      return;
    }

    const record = bytes.subarray(start, recordEnd);
    records.push(
      Object.freeze({
        bytes: record,
        loneCarriageReturn: record.includes(0x0d),
      }),
    );
  };

  for (let index = 0; index < bytes.byteLength; index += 1) {
    if (bytes[index] !== 0x0a) {
      continue;
    }
    addRecord(index, true);
    start = index + 1;
  }
  if (start < bytes.byteLength) {
    addRecord(bytes.byteLength, false);
  }

  return Object.freeze({
    recordCount,
    records: Object.freeze(records),
    diagnostics: Object.freeze(diagnostics),
  });
}

function isWhitespaceOnly(bytes: Uint8Array): boolean {
  return bytes.every((byte) => byte === 0x09 || byte === 0x20);
}

function hasUtf8Bom(bytes: Uint8Array): boolean {
  return bytes.byteLength >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
}

function parseAndValidateRecords(
  bytes: Uint8Array,
  artifact: string,
  diagnostics: Diagnostic[],
): readonly ParsedEvent[] | null {
  const framed = frameRecords(bytes, artifact);
  diagnostics.push(...framed.diagnostics);
  if (hasErrors(framed.diagnostics)) {
    return null;
  }
  if (framed.recordCount > LIMITS.traceEvents) {
    diagnostics.push(createDiagnostic("SC5007", artifact));
    return null;
  }

  const values: Array<JsonValue | null> = [];
  for (const [index, record] of framed.records.entries()) {
    if (
      record.loneCarriageReturn ||
      record.bytes.byteLength === 0 ||
      isWhitespaceOnly(record.bytes) ||
      (index === 0 && hasUtf8Bom(record.bytes))
    ) {
      diagnostics.push(createDiagnostic("SC1102", artifact, `/${index}`));
      values.push(null);
      continue;
    }

    const parsed = parseJsonBuffer(record.bytes, artifact, LIMITS.jsonlLineBytes);
    diagnostics.push(...rebaseDiagnostics(parsed.diagnostics, artifact, index));
    values.push(parsed.value);
  }
  if (hasErrors(diagnostics)) {
    return null;
  }

  const events: ParsedEvent[] = [];
  for (const [index, value] of values.entries()) {
    if (value === null) {
      continue;
    }

    const dispatch = dispatchArtifact(value, artifact);
    diagnostics.push(...rebaseDiagnostics(dispatch.diagnostics, artifact, index));
    if (dispatch.kind === null) {
      continue;
    }
    if (dispatch.kind !== "RunEvent") {
      diagnostics.push(createDiagnostic("SC2002", artifact, indexedPointer(index, "/kind")));
      continue;
    }

    const versionDiagnostics = dispatchRunEventVersion(value, artifact);
    diagnostics.push(...rebaseDiagnostics(versionDiagnostics, artifact, index));
    if (hasErrors(versionDiagnostics)) {
      continue;
    }

    const schemaDiagnostics = validateArtifactSchema(value, "RunEvent", artifact);
    diagnostics.push(...rebaseDiagnostics(schemaDiagnostics, artifact, index));
    if (hasErrors(schemaDiagnostics)) {
      continue;
    }

    events.push(
      Object.freeze({
        index,
        value: value as unknown as RunEventArtifact,
      }),
    );
  }

  return hasErrors(diagnostics) ? null : Object.freeze(events);
}

function validateOrderAndCausation(
  events: readonly ParsedEvent[],
  artifact: string,
  diagnostics: Diagnostic[],
): boolean {
  const sequences = new Set<number>();
  const eventById = new Map<string, ParsedEvent>();
  const duplicateIds = new Set<string>();
  let previousSequence: number | undefined;

  for (const event of events) {
    const sequence = event.value.spec.sequence;
    if (sequences.has(sequence)) {
      diagnostics.push(
        createDiagnostic("SC3001", artifact, indexedPointer(event.index, "/spec/sequence")),
      );
    } else if (previousSequence !== undefined && sequence < previousSequence) {
      diagnostics.push(
        createDiagnostic("SC3002", artifact, indexedPointer(event.index, "/spec/sequence")),
      );
    }
    sequences.add(sequence);
    previousSequence = sequence;

    const eventId = event.value.metadata.id;
    if (eventById.has(eventId)) {
      duplicateIds.add(eventId);
      diagnostics.push(
        createDiagnostic("SC3003", artifact, indexedPointer(event.index, "/metadata/id")),
      );
    } else {
      eventById.set(eventId, event);
    }
  }

  for (const event of events) {
    const cause = event.value.spec.causationId;
    if (cause === undefined || duplicateIds.has(cause)) {
      continue;
    }
    const target = eventById.get(cause);
    if (target === undefined) {
      diagnostics.push(
        createDiagnostic("SC3011", artifact, indexedPointer(event.index, "/spec/causationId")),
      );
    } else if (target.value.spec.runId !== event.value.spec.runId) {
      diagnostics.push(
        createDiagnostic("SC3013", artifact, indexedPointer(event.index, "/spec/causationId")),
      );
    } else if (target.index >= event.index) {
      diagnostics.push(
        createDiagnostic("SC3012", artifact, indexedPointer(event.index, "/spec/causationId")),
      );
    }
  }

  return !hasErrors(diagnostics);
}

function hasSameOptionalField(
  eventAttempt: RunEventAttempt,
  stored: MutableAttempt,
  field: "retryOf" | "deadline",
): boolean {
  const eventPresent = Object.hasOwn(eventAttempt, field);
  const storedPresent = field === "retryOf" ? stored.retryOfPresent : stored.deadlinePresent;
  const storedValue = field === "retryOf" ? stored.retryOf : stored.deadline;
  return eventPresent === storedPresent && eventAttempt[field] === storedValue;
}

function transitionAllowed(from: ExecutionState, to: ExecutionState): boolean {
  return ALLOWED_TRANSITIONS[from]?.has(to) ?? false;
}

function lineageFor(run: MutableRun, workPacket: string): MutableLineage {
  let lineage = run.lineages.get(workPacket);
  if (lineage === undefined) {
    lineage = { attemptsByNumber: new Map() };
    run.lineages.set(workPacket, lineage);
  }
  return lineage;
}

function addNewAttempt(
  run: MutableRun,
  attempt: RunEventAttempt,
  event: ParsedEvent,
  artifact: string,
  diagnostics: Diagnostic[],
): void {
  const pointer = indexedPointer(event.index, "/spec/attempt");
  const statePointer = `${pointer}/state`;
  const retryPointer = `${pointer}/retryOf`;
  const retryOfPresent = Object.hasOwn(attempt, "retryOf");
  const deadlinePresent = Object.hasOwn(attempt, "deadline");
  const lineage = lineageFor(run, attempt.workPacket);
  let invalid = false;

  if (attempt.state !== "queued") {
    diagnostics.push(
      createDiagnostic(
        retryOfPresent || attempt.number > 1 ? "SC3024" : "SC3029",
        artifact,
        statePointer,
      ),
    );
    invalid = true;
  }
  if (attempt.number > 1 && !retryOfPresent) {
    diagnostics.push(createDiagnostic("SC3023", artifact, retryPointer));
    invalid = true;
  }
  if (attempt.number === 1 && retryOfPresent) {
    diagnostics.push(createDiagnostic("SC3027", artifact, retryPointer));
    invalid = true;
  }
  if (lineage.attemptsByNumber.has(attempt.number)) {
    diagnostics.push(createDiagnostic("SC3026", artifact, pointer));
    invalid = true;
  }

  let predecessor: MutableAttempt | undefined;
  if (retryOfPresent && attempt.retryOf !== undefined) {
    predecessor = run.attemptsById.get(attempt.retryOf);
    const lineagePredecessor = lineage.attemptsByNumber.get(attempt.number - 1);
    if (
      predecessor === undefined ||
      predecessor !== lineagePredecessor ||
      predecessor.workPacket !== attempt.workPacket ||
      predecessor.number + 1 !== attempt.number ||
      !RETRYABLE_STATES.has(predecessor.state) ||
      predecessor.retrySuccessor !== undefined
    ) {
      diagnostics.push(createDiagnostic("SC3027", artifact, retryPointer));
      invalid = true;
    }
  } else if (attempt.number === 1 && lineage.attemptsByNumber.size > 0) {
    diagnostics.push(createDiagnostic("SC3026", artifact, pointer));
    invalid = true;
  }

  if (invalid) {
    return;
  }

  const stored: MutableAttempt = {
    id: attempt.id,
    number: attempt.number,
    workPacket: attempt.workPacket,
    retryOf: attempt.retryOf,
    retryOfPresent,
    deadline: attempt.deadline,
    deadlinePresent,
    state: attempt.state,
    lastSequence: event.value.spec.sequence,
    terminalCode: attempt.terminalCode,
    retrySuccessor: undefined,
  };
  run.attempts.push(stored);
  run.attemptsById.set(stored.id, stored);
  lineage.attemptsByNumber.set(stored.number, stored);
  if (predecessor !== undefined) {
    predecessor.retrySuccessor = stored.id;
  }
}

function applyAttemptState(
  run: MutableRun,
  event: ParsedEvent,
  artifact: string,
  diagnostics: Diagnostic[],
): void {
  const attempt = event.value.spec.attempt;
  if (attempt === undefined) {
    return;
  }
  const stored = run.attemptsById.get(attempt.id);
  if (stored === undefined) {
    addNewAttempt(run, attempt, event, artifact, diagnostics);
    return;
  }

  const attemptPointer = indexedPointer(event.index, "/spec/attempt");
  if (
    stored.number !== attempt.number ||
    stored.workPacket !== attempt.workPacket ||
    !hasSameOptionalField(attempt, stored, "retryOf") ||
    !hasSameOptionalField(attempt, stored, "deadline")
  ) {
    diagnostics.push(createDiagnostic("SC3026", artifact, attemptPointer));
    return;
  }
  if (TERMINAL_STATES.has(stored.state)) {
    diagnostics.push(createDiagnostic("SC3022", artifact, `${attemptPointer}/state`));
    return;
  }
  if (!transitionAllowed(stored.state, attempt.state)) {
    diagnostics.push(createDiagnostic("SC3021", artifact, `${attemptPointer}/state`));
    return;
  }

  stored.state = attempt.state;
  stored.lastSequence = event.value.spec.sequence;
  stored.terminalCode = attempt.terminalCode;
}

function referencedAttempt(
  run: MutableRun,
  event: ParsedEvent,
  artifact: string,
  diagnostics: Diagnostic[],
): MutableAttempt | null {
  const attemptId = event.value.spec.attemptId;
  if (attemptId === undefined) {
    return null;
  }
  const attempt = run.attemptsById.get(attemptId);
  if (attempt === undefined) {
    diagnostics.push(
      createDiagnostic("SC3028", artifact, indexedPointer(event.index, "/spec/attemptId")),
    );
    return null;
  }
  return attempt;
}

function freezeOutcome(
  event: ParsedEvent,
  suppress: (value: string) => string,
): TraceWorkflowOutcomeSummary | null {
  const { spec } = event.value;
  if (spec.stage === undefined || spec.outcome === undefined) {
    return null;
  }
  return Object.freeze({
    sequence: spec.sequence,
    stage: suppress(spec.stage) as WorkflowStage,
    outcome: suppress(spec.outcome) as WorkflowOutcome,
    ...(spec.workPacket === undefined ? {} : { workPacket: suppress(spec.workPacket) }),
    ...(spec.attemptId === undefined ? {} : { attemptId: suppress(spec.attemptId) }),
  });
}

function freezeEvidence(
  event: ParsedEvent,
  reference: RunEventEvidenceReference,
  suppress: (value: string) => string,
): TraceEvidenceSummary {
  return Object.freeze({
    sequence: event.value.spec.sequence,
    eventType: suppress(event.value.spec.type) as RunEventType,
    id: suppress(reference.id),
    kind: suppress(reference.kind) as EvidenceKind,
    ref: suppress(reference.ref),
    ...(reference.digest === undefined ? {} : { digest: suppress(reference.digest) }),
    ...(reference.immutable === undefined ? {} : { immutable: reference.immutable }),
  });
}

function newRun(event: ParsedEvent): MutableRun {
  const { spec } = event.value;
  return {
    runId: spec.runId,
    firstSequence: spec.sequence,
    lastSequence: spec.sequence,
    eventCount: 0,
    hasStartedEvent: false,
    hasCompletedEvent: false,
    correlationIds: [],
    correlationSet: new Set(),
    attempts: [],
    attemptsById: new Map(),
    lineages: new Map(),
    workflowOutcomes: [],
    evidence: [],
    evidenceOmitted: 0,
  };
}

function reconstructTrace(
  events: readonly ParsedEvent[],
  diagnosticArtifact: string,
  summaryArtifact: string,
  diagnostics: Diagnostic[],
): TraceInspectionSummary | null {
  const runs: MutableRun[] = [];
  const runsById = new Map<string, MutableRun>();
  let evidenceReturned = 0;

  for (const event of events) {
    const { spec } = event.value;
    let run = runsById.get(spec.runId);
    if (run === undefined) {
      run = newRun(event);
      runs.push(run);
      runsById.set(spec.runId, run);
    }

    run.lastSequence = spec.sequence;
    run.eventCount += 1;
    if (!run.correlationSet.has(spec.correlationId)) {
      run.correlationSet.add(spec.correlationId);
      run.correlationIds.push(spec.correlationId);
    }

    switch (spec.type) {
      case "run.started":
        run.hasStartedEvent = true;
        break;
      case "run.completed":
        run.hasCompletedEvent = true;
        break;
      case "attempt.state":
        applyAttemptState(run, event, diagnosticArtifact, diagnostics);
        break;
      case "attempt.heartbeat": {
        const attempt = referencedAttempt(run, event, diagnosticArtifact, diagnostics);
        if (attempt !== null && attempt.state !== "running") {
          diagnostics.push(
            createDiagnostic(
              "SC3025",
              diagnosticArtifact,
              indexedPointer(event.index, "/spec/attemptId"),
            ),
          );
        }
        break;
      }
      case "attempt.cancellation_requested": {
        const attempt = referencedAttempt(run, event, diagnosticArtifact, diagnostics);
        if (
          attempt !== null &&
          attempt.state !== "queued" &&
          attempt.state !== "running" &&
          attempt.state !== "input_required"
        ) {
          diagnostics.push(
            createDiagnostic(
              "SC3025",
              diagnosticArtifact,
              indexedPointer(event.index, "/spec/attemptId"),
            ),
          );
        }
        break;
      }
      case "workflow.outcome":
        referencedAttempt(run, event, diagnosticArtifact, diagnostics);
        break;
      case "evidence.recorded":
      case "handoff.recorded":
      case "verification.recorded":
      case "review.recorded":
      case "memory.updated":
      case "merge.recorded":
        referencedAttempt(run, event, diagnosticArtifact, diagnostics);
        {
          const evidenceCount = spec.evidence?.length ?? 0;
          const available = Math.max(0, LIMITS.traceSummaryEvidence - evidenceReturned);
          const included = Math.min(available, evidenceCount);
          evidenceReturned += included;
          run.evidenceOmitted += evidenceCount - included;
        }
        break;
      default:
        break;
    }
  }

  if (hasErrors(diagnostics)) {
    return null;
  }

  const suppressor = createSecretSuppressor();
  const suppress = (value: string): string => suppressor.suppress(value);
  evidenceReturned = 0;

  for (const event of events) {
    const run = runsById.get(event.value.spec.runId);
    if (run === undefined) {
      continue;
    }
    if (event.value.spec.type === "workflow.outcome") {
      const outcome = freezeOutcome(event, suppress);
      if (outcome !== null) {
        run.workflowOutcomes.push(outcome);
      }
    }
    if (event.value.spec.evidence !== undefined) {
      for (const reference of event.value.spec.evidence) {
        if (evidenceReturned >= LIMITS.traceSummaryEvidence) {
          continue;
        }
        evidenceReturned += 1;
        run.evidence.push(freezeEvidence(event, reference, suppress));
      }
    }
  }

  const traceArtifact = suppress(summaryArtifact);
  const summaries: TraceRunSummary[] = runs.map((run) =>
    Object.freeze({
      runId: suppress(run.runId),
      firstSequence: run.firstSequence,
      lastSequence: run.lastSequence,
      eventCount: run.eventCount,
      hasStartedEvent: run.hasStartedEvent,
      hasCompletedEvent: run.hasCompletedEvent,
      correlationIds: Object.freeze(run.correlationIds.map(suppress)),
      attempts: Object.freeze(
        run.attempts.map(
          (attempt): TraceAttemptSummary =>
            Object.freeze({
              id: suppress(attempt.id),
              number: attempt.number,
              workPacket: suppress(attempt.workPacket),
              state: suppress(attempt.state) as ExecutionState,
              ...(attempt.retryOf === undefined ? {} : { retryOf: suppress(attempt.retryOf) }),
              lastSequence: attempt.lastSequence,
              ...(attempt.terminalCode === undefined
                ? {}
                : { terminalCode: suppress(attempt.terminalCode) as TerminalCode }),
            }),
        ),
      ),
      workflowOutcomes: Object.freeze(run.workflowOutcomes),
      evidence: Object.freeze(run.evidence),
      evidenceOmitted: run.evidenceOmitted,
    }),
  );

  if (suppressor.matched) {
    diagnostics.push(createDiagnostic("SC4101", traceArtifact));
  }

  return Object.freeze({
    traceArtifact,
    eventCount: events.length,
    runs: Object.freeze(summaries),
  });
}

export function inspectTraceWithHooks(
  options: InspectTraceOptions | undefined,
  hooks: InspectTraceHooks = {},
): OperationResult<TraceInspectionSummary> {
  const diagnostics: Diagnostic[] = [];
  if (
    options === undefined ||
    options === null ||
    typeof options !== "object" ||
    typeof options.trace !== "string" ||
    options.trace.length === 0
  ) {
    diagnostics.push(createDiagnostic("SC0001", "."));
    return operationResult<TraceInspectionSummary>(diagnostics, null);
  }

  const artifactSuppressor = createSecretSuppressor();
  const diagnosticArtifact = artifactSuppressor.suppress(options.trace);
  if (artifactSuppressor.matched) {
    diagnostics.push(createDiagnostic("SC4101", diagnosticArtifact));
  }

  const rootResult = resolveProjectRoot(options.project);
  diagnostics.push(...rootResult.diagnostics);
  if (rootResult.root === null || rootResult.realRoot === null) {
    return operationResult<TraceInspectionSummary>(diagnostics, null);
  }

  const file = readContainedFileBytesWithHooks(
    rootResult.root,
    rootResult.realRoot,
    options.trace,
    "SC1001",
    LIMITS.traceBytes,
    "SC5006",
    hooks.read,
  );
  diagnostics.push(
    ...file.diagnostics.map((diagnostic) =>
      diagnostic.artifact === options.trace
        ? createDiagnostic(
            diagnostic.code as DiagnosticCode,
            diagnosticArtifact,
            diagnostic.pointer,
          )
        : diagnostic,
    ),
  );
  if (file.bytes === null) {
    return operationResult<TraceInspectionSummary>(diagnostics, null);
  }

  const events = parseAndValidateRecords(file.bytes, diagnosticArtifact, diagnostics);
  if (events === null || !validateOrderAndCausation(events, diagnosticArtifact, diagnostics)) {
    return operationResult<TraceInspectionSummary>(diagnostics, null);
  }

  const summary = reconstructTrace(events, diagnosticArtifact, options.trace, diagnostics);
  return operationResult(diagnostics, summary);
}

export function inspectTrace(
  options: InspectTraceOptions,
): OperationResult<TraceInspectionSummary> {
  return inspectTraceWithHooks(options);
}
