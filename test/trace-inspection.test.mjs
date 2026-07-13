import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { inspectTrace, LIMITS } from "../dist/index.js";
import { readContainedFileBytes, resolveProjectRoot } from "../dist/path.js";
import { containsHighConfidenceSecret } from "../dist/privacy.js";
import { inspectTraceWithHooks } from "../dist/trace.js";
import { event, stateEvent, writeTrace } from "./helpers/trace-fixtures.mjs";

const CASE_MATRIX = JSON.parse(
  readFileSync(new URL("./fixtures/case-matrix.json", import.meta.url), "utf8"),
);

const TERMINAL_CODE_BY_STATE = Object.freeze({
  completed: "success",
  failed: "execution_failed",
  cancelled: "cancelled_by_user",
  timed_out: "deadline_exceeded",
});

function assertMatrixVariants(id, variants) {
  const entry = CASE_MATRIX.mustHave.find((candidate) => candidate.id === id);
  assert.ok(entry, `missing case-matrix entry ${id}`);
  for (const variant of variants) {
    assert.ok(entry.variants.includes(variant), `missing case-matrix variant ${id}:${variant}`);
  }
}

function attemptEventsForStates(states, options = {}) {
  const {
    attemptId = "attempt-1",
    number = 1,
    retryOf,
    runId,
    sequenceOffset = 0,
    workPacket = "packet",
  } = options;

  return states.map((state, index) =>
    stateEvent({
      id: `event-${sequenceOffset + index}`,
      runId,
      sequence: sequenceOffset + index,
      attemptId,
      number,
      workPacket,
      state,
      ...(retryOf === undefined ? {} : { retryOf }),
      ...(TERMINAL_CODE_BY_STATE[state] === undefined
        ? {}
        : { terminalCode: TERMINAL_CODE_BY_STATE[state] }),
    }),
  );
}

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-trace-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

function codes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

function inspectEvents(events, options = {}) {
  return withTempDirectory((root) => {
    const trace = writeTrace(root, events, options);
    return inspectTrace({ project: root, trace });
  });
}

function baseRunEvents() {
  return [
    event({ id: "event-000", runId: "run-a", sequence: 0, type: "run.started" }),
    stateEvent({
      id: "event-001",
      runId: "run-a",
      sequence: 1,
      attemptId: "frontend-1",
      number: 1,
      workPacket: "frontend",
      state: "queued",
    }),
    stateEvent({
      id: "event-002",
      runId: "run-a",
      sequence: 2,
      attemptId: "backend-1",
      number: 1,
      workPacket: "backend",
      state: "queued",
    }),
    stateEvent({
      id: "event-003",
      runId: "run-a",
      sequence: 3,
      attemptId: "frontend-1",
      number: 1,
      workPacket: "frontend",
      state: "running",
    }),
    stateEvent({
      id: "event-004",
      runId: "run-a",
      sequence: 4,
      attemptId: "backend-1",
      number: 1,
      workPacket: "backend",
      state: "running",
    }),
    stateEvent({
      id: "event-005",
      runId: "run-a",
      sequence: 5,
      attemptId: "frontend-1",
      number: 1,
      workPacket: "frontend",
      state: "completed",
      terminalCode: "success",
    }),
    stateEvent({
      id: "event-006",
      runId: "run-a",
      sequence: 6,
      attemptId: "backend-1",
      number: 1,
      workPacket: "backend",
      state: "failed",
      terminalCode: "execution_failed",
    }),
    stateEvent({
      id: "event-007",
      runId: "run-a",
      sequence: 7,
      attemptId: "backend-2",
      number: 2,
      workPacket: "backend",
      state: "queued",
      retryOf: "backend-1",
    }),
    stateEvent({
      id: "event-008",
      runId: "run-a",
      sequence: 8,
      attemptId: "backend-2",
      number: 2,
      workPacket: "backend",
      state: "running",
      retryOf: "backend-1",
    }),
    stateEvent({
      id: "event-009",
      runId: "run-a",
      sequence: 9,
      attemptId: "backend-2",
      number: 2,
      workPacket: "backend",
      state: "completed",
      retryOf: "backend-1",
      terminalCode: "success",
    }),
    event({
      id: "event-010",
      runId: "run-a",
      sequence: 10,
      type: "workflow.outcome",
      stage: "verify",
      outcome: "pass",
      workPacket: "backend",
      attemptId: "backend-2",
    }),
    event({
      id: "event-011",
      runId: "run-a",
      sequence: 11,
      type: "verification.recorded",
      attemptId: "backend-2",
      evidence: [
        {
          id: "backend-tests",
          kind: "test",
          ref: "test:backend-tests",
          immutable: true,
        },
      ],
    }),
    event({ id: "event-012", runId: "run-b", sequence: 12, type: "run.started" }),
    event({ id: "event-013", runId: "run-a", sequence: 13, type: "run.completed" }),
    event({ id: "event-014", runId: "run-b", sequence: 14, type: "run.completed" }),
  ];
}

test("inspection reconstructs interleaved runs, parallel attempts, retries, outcomes, and evidence", () => {
  const result = inspectEvents(baseRunEvents(), { newline: "\r\n", finalNewline: false });
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  assert.equal(result.value.eventCount, 15);
  assert.equal(result.value.runs.length, 2);

  const [runA, runB] = result.value.runs;
  assert.deepEqual(
    {
      id: runA.runId,
      first: runA.firstSequence,
      last: runA.lastSequence,
      count: runA.eventCount,
      started: runA.hasStartedEvent,
      completed: runA.hasCompletedEvent,
    },
    {
      id: "run-a",
      first: 0,
      last: 13,
      count: 13,
      started: true,
      completed: true,
    },
  );
  assert.deepEqual(
    runA.attempts.map(({ id, number, state, retryOf, terminalCode }) => ({
      id,
      number,
      state,
      retryOf,
      terminalCode,
    })),
    [
      {
        id: "frontend-1",
        number: 1,
        state: "completed",
        retryOf: undefined,
        terminalCode: "success",
      },
      {
        id: "backend-1",
        number: 1,
        state: "failed",
        retryOf: undefined,
        terminalCode: "execution_failed",
      },
      {
        id: "backend-2",
        number: 2,
        state: "completed",
        retryOf: "backend-1",
        terminalCode: "success",
      },
    ],
  );
  assert.deepEqual(runA.workflowOutcomes, [
    {
      sequence: 10,
      stage: "verify",
      outcome: "pass",
      workPacket: "backend",
      attemptId: "backend-2",
    },
  ]);
  assert.equal(runA.evidence[0].ref, "test:backend-tests");
  assert.equal(runA.evidenceOmitted, 0);
  assert.equal(runB.hasStartedEvent, true);
  assert.equal(runB.hasCompletedEvent, true);
});

test("[T12] zero-event terminators are accepted once and rejected when repeated", async (t) => {
  const cases = [
    { variant: "empty-file", bytes: Buffer.alloc(0), valid: true },
    { variant: "single-final-lf", bytes: Buffer.from("\n"), valid: true },
    { variant: "single-final-crlf", bytes: Buffer.from("\r\n"), valid: true },
    { variant: "repeated-final-lf", bytes: Buffer.from("\n\n"), valid: false },
    { variant: "repeated-final-crlf", bytes: Buffer.from("\r\n\r\n"), valid: false },
  ];
  assertMatrixVariants(
    "T12",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      withTempDirectory((root) => {
        mkdirSync(join(root, "traces"));
        writeFileSync(join(root, "traces", "empty.jsonl"), fixture.bytes);
        const result = inspectTrace({ project: root, trace: "traces/empty.jsonl" });
        if (fixture.valid) {
          assert.deepEqual(result, {
            ok: true,
            exitCode: 0,
            diagnostics: [],
            value: {
              traceArtifact: "traces/empty.jsonl",
              eventCount: 0,
              runs: [],
            },
          });
        } else {
          assert.ok(codes(result).includes("SC1102"), JSON.stringify(result.diagnostics, null, 2));
        }
      });
    });
  }
});

test("logical order accepts valid same-run backward causation and ignores timestamps", () => {
  const events = [
    event({
      id: "cause",
      sequence: 10,
      type: "run.started",
      time: "2026-07-13T20:00:00Z",
    }),
    event({
      id: "effect",
      sequence: 20,
      type: "run.completed",
      causationId: "cause",
      time: "2020-01-01T00:00:00Z",
    }),
  ];
  const result = inspectEvents(events);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  assert.equal(result.value.runs[0].lastSequence, 20);
});

test("sequence, event identity, and causation diagnostics are deterministic", async (t) => {
  const cases = [
    {
      name: "duplicate sequence",
      events: [
        event({ id: "event-a", sequence: 0, type: "run.started" }),
        event({ id: "event-b", sequence: 0, type: "run.completed" }),
      ],
      code: "SC3001",
      pointer: "/1/spec/sequence",
    },
    {
      name: "regressing sequence",
      events: [
        event({ id: "event-a", sequence: 2, type: "run.started" }),
        event({ id: "event-b", sequence: 1, type: "run.completed" }),
      ],
      code: "SC3002",
      pointer: "/1/spec/sequence",
    },
    {
      name: "duplicate event id",
      events: [
        event({ id: "same-event", sequence: 0, type: "run.started" }),
        event({ id: "same-event", sequence: 1, type: "run.completed" }),
      ],
      code: "SC3003",
      pointer: "/1/metadata/id",
    },
    {
      name: "missing cause",
      events: [
        event({
          id: "event-a",
          sequence: 0,
          type: "run.started",
          causationId: "missing-event",
        }),
      ],
      code: "SC3011",
      pointer: "/0/spec/causationId",
    },
    {
      name: "forward cause",
      events: [
        event({
          id: "event-a",
          sequence: 0,
          type: "run.started",
          causationId: "event-b",
        }),
        event({ id: "event-b", sequence: 1, type: "run.completed" }),
      ],
      code: "SC3012",
      pointer: "/0/spec/causationId",
    },
    {
      name: "cross-run cause",
      events: [
        event({ id: "event-a", runId: "run-a", sequence: 0, type: "run.started" }),
        event({
          id: "event-b",
          runId: "run-b",
          sequence: 1,
          type: "run.started",
          causationId: "event-a",
        }),
      ],
      code: "SC3013",
      pointer: "/1/spec/causationId",
    },
  ];

  for (const fixture of cases) {
    await t.test(fixture.name, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes(fixture.code), JSON.stringify(result.diagnostics, null, 2));
      const diagnostic = result.diagnostics.find(({ code }) => code === fixture.code);
      assert.equal(diagnostic.pointer, fixture.pointer);
    });
  }
});

test("[T14] every legal attempt transition is accepted", async (t) => {
  const cases = [
    ["queued-to-running", ["queued", "running"]],
    ["queued-to-cancelled", ["queued", "cancelled"]],
    ["running-to-input_required", ["queued", "running", "input_required"]],
    ["running-to-completed", ["queued", "running", "completed"]],
    ["running-to-failed", ["queued", "running", "failed"]],
    ["running-to-cancelled", ["queued", "running", "cancelled"]],
    ["running-to-timed_out", ["queued", "running", "timed_out"]],
    ["input_required-to-running", ["queued", "running", "input_required", "running"]],
    ["input_required-to-cancelled", ["queued", "running", "input_required", "cancelled"]],
    ["input_required-to-timed_out", ["queued", "running", "input_required", "timed_out"]],
  ];
  assertMatrixVariants(
    "T14",
    cases.map(([variant]) => variant),
  );

  for (const [variant, states] of cases) {
    await t.test(variant, () => {
      const result = inspectEvents(attemptEventsForStates(states));
      assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T04] every disallowed non-terminal transition is rejected", async (t) => {
  const sourcePaths = {
    queued: ["queued"],
    running: ["queued", "running"],
    input_required: ["queued", "running", "input_required"],
  };
  const allStates = [
    "queued",
    "running",
    "input_required",
    "completed",
    "failed",
    "cancelled",
    "timed_out",
  ];
  const allowed = new Set([
    "queued-to-running",
    "queued-to-cancelled",
    "running-to-input_required",
    "running-to-completed",
    "running-to-failed",
    "running-to-cancelled",
    "running-to-timed_out",
    "input_required-to-running",
    "input_required-to-cancelled",
    "input_required-to-timed_out",
  ]);
  const cases = Object.entries(sourcePaths).flatMap(([source, prefix]) =>
    allStates
      .map((target) => ({
        variant: `${source}-to-${target}`,
        states: [...prefix, target],
      }))
      .filter(({ variant }) => !allowed.has(variant)),
  );
  assertMatrixVariants(
    "T04",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents(attemptEventsForStates(fixture.states));
      assert.ok(codes(result).includes("SC3021"), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T05] every terminal attempt state is immutable", async (t) => {
  const cases = [
    { variant: "completed", states: ["queued", "running", "completed", "running"] },
    { variant: "failed", states: ["queued", "running", "failed", "running"] },
    { variant: "cancelled", states: ["queued", "cancelled", "running"] },
    { variant: "timed_out", states: ["queued", "running", "timed_out", "running"] },
  ];
  assertMatrixVariants(
    "T05",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents(attemptEventsForStates(fixture.states));
      assert.ok(codes(result).includes("SC3022"), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("heartbeat, cancellation request, and explicit timeout events are accepted in valid states", () => {
  const events = [
    stateEvent({
      id: "event-0",
      sequence: 0,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "queued",
    }),
    stateEvent({
      id: "event-1",
      sequence: 1,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "running",
    }),
    event({
      id: "event-2",
      sequence: 2,
      type: "attempt.heartbeat",
      attemptId: "attempt-1",
      heartbeat: {
        observedAt: "2026-07-13T20:00:00Z",
        expectedEverySeconds: 30,
      },
    }),
    stateEvent({
      id: "event-3",
      sequence: 3,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "input_required",
    }),
    event({
      id: "event-4",
      sequence: 4,
      type: "attempt.cancellation_requested",
      attemptId: "attempt-1",
      cancellation: {
        requestedBy: "integration-owner",
        reasonCode: "user_request",
      },
    }),
    stateEvent({
      id: "event-5",
      sequence: 5,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "running",
    }),
    stateEvent({
      id: "event-6",
      sequence: 6,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "timed_out",
      terminalCode: "heartbeat_expired",
    }),
  ];

  const result = inspectEvents(events);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  assert.equal(result.value.runs[0].attempts[0].state, "timed_out");
  assert.equal(result.value.runs[0].attempts[0].terminalCode, "heartbeat_expired");
});

test("attempt transition and terminal-state violations use their dedicated diagnostics", async (t) => {
  const queued = stateEvent({
    id: "event-0",
    sequence: 0,
    attemptId: "attempt-1",
    number: 1,
    workPacket: "packet",
    state: "queued",
  });
  const cases = [
    {
      name: "new non-retry must start queued",
      events: [
        stateEvent({
          id: "event-0",
          sequence: 0,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "running",
        }),
      ],
      code: "SC3029",
    },
    {
      name: "queued cannot complete directly",
      events: [
        queued,
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "completed",
          terminalCode: "success",
        }),
      ],
      code: "SC3021",
    },
    {
      name: "terminal state is immutable",
      events: [
        queued,
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "cancelled",
          terminalCode: "cancelled_by_user",
        }),
        stateEvent({
          id: "event-2",
          sequence: 2,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "running",
        }),
      ],
      code: "SC3022",
    },
    {
      name: "heartbeat is state-gated",
      events: [
        queued,
        event({
          id: "event-1",
          sequence: 1,
          type: "attempt.heartbeat",
          attemptId: "attempt-1",
          heartbeat: {
            observedAt: "2026-07-13T20:00:00Z",
            expectedEverySeconds: 30,
          },
        }),
      ],
      code: "SC3025",
    },
  ];

  for (const fixture of cases) {
    await t.test(fixture.name, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes(fixture.code), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T07] heartbeat and cancellation requests are state-gated", async (t) => {
  const queued = attemptEventsForStates(["queued"]);
  const completed = attemptEventsForStates(["queued", "running", "completed"]);
  const cases = [
    {
      variant: "heartbeat",
      events: [
        ...queued,
        event({
          id: "event-1",
          sequence: 1,
          type: "attempt.heartbeat",
          attemptId: "attempt-1",
          heartbeat: {
            observedAt: "2026-07-13T20:00:00Z",
            expectedEverySeconds: 30,
          },
        }),
      ],
    },
    {
      variant: "cancellation-request",
      events: [
        ...completed,
        event({
          id: "event-3",
          sequence: 3,
          type: "attempt.cancellation_requested",
          attemptId: "attempt-1",
          cancellation: {
            requestedBy: "integration-owner",
            reasonCode: "user_request",
          },
        }),
      ],
    },
  ];
  assertMatrixVariants(
    "T07",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes("SC3025"), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T10] every attempt-bearing non-state event requires an earlier attempt", async (t) => {
  const cases = [
    {
      variant: "heartbeat",
      event: event({
        id: "event-0",
        sequence: 0,
        type: "attempt.heartbeat",
        attemptId: "missing-attempt",
        heartbeat: {
          observedAt: "2026-07-13T20:00:00Z",
          expectedEverySeconds: 30,
        },
      }),
    },
    {
      variant: "outcome",
      event: event({
        id: "event-0",
        sequence: 0,
        type: "workflow.outcome",
        stage: "verify",
        outcome: "pass",
        attemptId: "missing-attempt",
      }),
    },
    {
      variant: "evidence",
      event: event({
        id: "event-0",
        sequence: 0,
        type: "evidence.recorded",
        attemptId: "missing-attempt",
        evidence: [{ id: "proof", kind: "test", ref: "test:unit" }],
      }),
    },
  ];
  assertMatrixVariants(
    "T10",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents([fixture.event]);
      assert.ok(codes(result).includes("SC3028"), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T09] retry lineage rejects wrong, completed, and forked predecessors", async (t) => {
  const failed = attemptEventsForStates(["queued", "running", "failed"]);
  const completed = attemptEventsForStates(["queued", "running", "completed"]);
  const cases = [
    {
      variant: "wrong-predecessor",
      events: [
        ...failed,
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-2",
          number: 2,
          retryOf: "missing-attempt",
          sequenceOffset: 3,
        }),
      ],
    },
    {
      variant: "completed-parent",
      events: [
        ...completed,
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-2",
          number: 2,
          retryOf: "attempt-1",
          sequenceOffset: 3,
        }),
      ],
    },
    {
      variant: "forked-successor",
      events: [
        ...failed,
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-2",
          number: 2,
          retryOf: "attempt-1",
          sequenceOffset: 3,
        }),
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-3",
          number: 2,
          retryOf: "attempt-1",
          sequenceOffset: 4,
        }),
      ],
    },
  ];
  assertMatrixVariants(
    "T09",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes("SC3027"), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("[T06/T08/T11] retry declarations and attempt identity use dedicated diagnostics", async (t) => {
  const failed = attemptEventsForStates(["queued", "running", "failed"]);
  const cases = [
    {
      variant: "missing-link",
      matrix: "T06",
      code: "SC3023",
      events: [
        ...failed,
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-2",
          number: 2,
          sequenceOffset: 3,
        }),
      ],
    },
    {
      variant: "not-queued",
      matrix: "T06",
      code: "SC3024",
      events: [
        ...failed,
        ...attemptEventsForStates(["running"], {
          attemptId: "attempt-2",
          number: 2,
          retryOf: "attempt-1",
          sequenceOffset: 3,
        }),
      ],
    },
    {
      variant: "metadata-change",
      matrix: "T08",
      code: "SC3026",
      events: [
        stateEvent({
          id: "event-0",
          sequence: 0,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "queued",
          deadline: "2026-07-13T20:00:00Z",
        }),
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "running",
          deadline: "2026-07-13T21:00:00Z",
        }),
      ],
    },
    {
      variant: "duplicate-work-packet-number",
      matrix: "T08",
      code: "SC3026",
      events: [
        ...attemptEventsForStates(["queued"]),
        ...attemptEventsForStates(["queued"], {
          attemptId: "attempt-2",
          sequenceOffset: 1,
        }),
      ],
    },
    {
      variant: "non-retry",
      matrix: "T11",
      code: "SC3029",
      events: attemptEventsForStates(["running"]),
    },
  ];
  for (const matrix of ["T06", "T08", "T11"]) {
    assertMatrixVariants(
      matrix,
      cases.filter((fixture) => fixture.matrix === matrix).map(({ variant }) => variant),
    );
  }

  for (const fixture of cases) {
    await t.test(`${fixture.matrix}:${fixture.variant}`, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes(fixture.code), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("attempt identity and retry lineage failures are distinguishable", async (t) => {
  const failedAttempt = [
    stateEvent({
      id: "event-0",
      sequence: 0,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "queued",
    }),
    stateEvent({
      id: "event-1",
      sequence: 1,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "running",
    }),
    stateEvent({
      id: "event-2",
      sequence: 2,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "failed",
      terminalCode: "execution_failed",
    }),
  ];
  const cases = [
    {
      name: "retry link is required",
      events: [
        ...failedAttempt,
        stateEvent({
          id: "event-3",
          sequence: 3,
          attemptId: "attempt-2",
          number: 2,
          workPacket: "packet",
          state: "queued",
        }),
      ],
      code: "SC3023",
    },
    {
      name: "retry must start queued",
      events: [
        ...failedAttempt,
        stateEvent({
          id: "event-3",
          sequence: 3,
          attemptId: "attempt-2",
          number: 2,
          workPacket: "packet",
          state: "running",
          retryOf: "attempt-1",
        }),
      ],
      code: "SC3024",
    },
    {
      name: "retry lineage must use an eligible predecessor",
      events: [
        stateEvent({
          id: "event-0",
          sequence: 0,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "queued",
        }),
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "running",
        }),
        stateEvent({
          id: "event-2",
          sequence: 2,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "completed",
          terminalCode: "success",
        }),
        stateEvent({
          id: "event-3",
          sequence: 3,
          attemptId: "attempt-2",
          number: 2,
          workPacket: "packet",
          state: "queued",
          retryOf: "attempt-1",
        }),
      ],
      code: "SC3027",
    },
    {
      name: "attempt declaration is immutable",
      events: [
        stateEvent({
          id: "event-0",
          sequence: 0,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "queued",
          deadline: "2026-07-13T20:00:00Z",
        }),
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "running",
          deadline: "2026-07-13T21:00:00Z",
        }),
      ],
      code: "SC3026",
    },
    {
      name: "non-state attempt reference must already exist",
      events: [
        event({
          id: "event-0",
          sequence: 0,
          type: "workflow.outcome",
          stage: "verify",
          outcome: "pass",
          attemptId: "missing-attempt",
        }),
      ],
      code: "SC3028",
    },
  ];

  for (const fixture of cases) {
    await t.test(fixture.name, () => {
      const result = inspectEvents(fixture.events);
      assert.ok(codes(result).includes(fixture.code), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("outcome and evidence records may reference a terminal attempt", () => {
  const events = [
    stateEvent({
      id: "event-0",
      sequence: 0,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "queued",
    }),
    stateEvent({
      id: "event-1",
      sequence: 1,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "cancelled",
      terminalCode: "cancelled_by_user",
    }),
    event({
      id: "event-2",
      sequence: 2,
      type: "workflow.outcome",
      stage: "review",
      outcome: "learn",
      attemptId: "attempt-1",
    }),
    event({
      id: "event-3",
      sequence: 3,
      type: "review.recorded",
      attemptId: "attempt-1",
      evidence: [{ id: "review", kind: "review", ref: "path:docs/review.md" }],
    }),
  ];
  const result = inspectEvents(events);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
});

test("[T15] a failed handoff remains explicit in state and evidence summaries", () => {
  assertMatrixVariants("T15", ["failed-handoff"]);
  const events = [
    ...attemptEventsForStates(["queued", "running"]),
    stateEvent({
      id: "event-2",
      sequence: 2,
      attemptId: "attempt-1",
      number: 1,
      workPacket: "packet",
      state: "failed",
      terminalCode: "handoff_failed",
    }),
    event({
      id: "event-3",
      sequence: 3,
      type: "handoff.recorded",
      attemptId: "attempt-1",
      evidence: [
        {
          id: "handoff-review",
          kind: "handoff",
          ref: "path:docs/handoff.md",
        },
      ],
    }),
  ];

  const result = inspectEvents(events);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  assert.equal(result.value.runs[0].attempts[0].terminalCode, "handoff_failed");
  assert.equal(result.value.runs[0].evidence[0].eventType, "handoff.recorded");
});

test("strict JSONL framing rejects BOMs, blanks, lone CR, truncation, duplicate keys, and invalid UTF-8", async (t) => {
  const valid = JSON.stringify(event({ id: "event-0", sequence: 0, type: "run.started" }));
  const cases = [
    ["BOM", Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(valid)]), "SC1102"],
    ["blank record", Buffer.from(`${valid}\n\n`), "SC1102"],
    ["lone CR", Buffer.from(`${valid}\r${valid}`), "SC1102"],
    ["internal CR before CRLF", Buffer.from(`${valid}\r \n`), "SC1102"],
    ["truncated", Buffer.from(valid.slice(0, -1)), "SC1102"],
    [
      "duplicate key",
      Buffer.from('{"apiVersion":"swecircuit/v1alpha1","apiVersion":"swecircuit/v1alpha1"}'),
      "SC1103",
    ],
    ["invalid UTF-8", Buffer.from([0xff]), "SC1101"],
  ];

  for (const [name, bytes, code] of cases) {
    await t.test(name, () => {
      withTempDirectory((root) => {
        mkdirSync(join(root, "traces"));
        writeFileSync(join(root, "traces", "invalid.jsonl"), bytes);
        const result = inspectTrace({ project: root, trace: "traces/invalid.jsonl" });
        assert.ok(codes(result).includes(code), JSON.stringify(result.diagnostics, null, 2));
      });
    });
  }
});

test("RunEvent dispatch and exact payload ownership fail closed", async (t) => {
  const base = event({ id: "event-0", sequence: 0, type: "run.started" });
  const cases = [
    [
      "missing event version",
      (value) => {
        delete value.spec.eventTypeVersion;
      },
      "SC1221",
    ],
    [
      "non-string event version",
      (value) => {
        value.spec.eventTypeVersion = 1;
      },
      "SC1223",
    ],
    [
      "unsupported event version",
      (value) => {
        value.spec.eventTypeVersion = "2.0.0";
      },
      "SC1222",
    ],
    [
      "wrong artifact kind",
      (value) => {
        value.kind = "Project";
      },
      "SC2002",
    ],
    [
      "payload smuggling",
      (value) => {
        value.spec.attempt = {
          id: "attempt-1",
          number: 1,
          workPacket: "packet",
          state: "queued",
        };
      },
      "SC1305",
    ],
    [
      "event metadata description",
      (value) => {
        value.metadata.description = "not event metadata";
      },
      "SC1303",
    ],
  ];

  assertMatrixVariants("D03", ["missing", "non-string", "unsupported"]);

  for (const [name, mutate, code] of cases) {
    await t.test(name, () => {
      const candidate = structuredClone(base);
      mutate(candidate);
      const result = inspectEvents([candidate]);
      assert.ok(codes(result).includes(code), JSON.stringify(result.diagnostics, null, 2));
    });
  }
});

test("evidence references are grammar-checked but never dereferenced", () => {
  const valid = inspectEvents([
    event({
      id: "event-0",
      sequence: 0,
      type: "evidence.recorded",
      evidence: [
        {
          id: "missing-artifact",
          kind: "artifact",
          ref: "path:definitely/not/present.json",
        },
      ],
    }),
  ]);
  assert.equal(valid.ok, true, JSON.stringify(valid.diagnostics, null, 2));

  const invalid = inspectEvents([
    event({
      id: "event-0",
      sequence: 0,
      type: "evidence.recorded",
      evidence: [
        {
          id: "captured-content",
          kind: "artifact",
          ref: "this is prose, not a reference",
        },
      ],
    }),
  ]);
  assert.ok(codes(invalid).includes("SC1305"));
});

test("[T13] command and test evidence identifiers enforce the 128-character boundary", async (t) => {
  const cases = [
    { variant: "command-at-limit", kind: "command", identifierLength: 128, valid: true },
    { variant: "command-over-limit", kind: "command", identifierLength: 129, valid: false },
    { variant: "test-at-limit", kind: "test", identifierLength: 128, valid: true },
    { variant: "test-over-limit", kind: "test", identifierLength: 129, valid: false },
  ];
  assertMatrixVariants(
    "T13",
    cases.map(({ variant }) => variant),
  );

  for (const fixture of cases) {
    await t.test(fixture.variant, () => {
      const result = inspectEvents([
        event({
          id: "event-0",
          sequence: 0,
          type: "evidence.recorded",
          evidence: [
            {
              id: "proof",
              kind: fixture.kind,
              ref: `${fixture.kind}:${"a".repeat(fixture.identifierLength)}`,
            },
          ],
        }),
      ]);
      if (fixture.valid) {
        assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
      } else {
        assert.ok(codes(result).includes("SC1305"), JSON.stringify(result.diagnostics, null, 2));
      }
    });
  }
});

test("[L02] bounded reads allocate from the verified descriptor size", () => {
  assertMatrixVariants("L02", ["descriptor-size-plus-growth-byte"]);
  const source = readFileSync(new URL("../src/path.ts", import.meta.url), "utf8");
  assert.match(source, /Buffer\.allocUnsafe\(Number\(openedStats\.size\) \+ 1\)/);
  assert.doesNotMatch(source, /Buffer\.allocUnsafe\(byteLimit \+ 1\)/);
});

test("trace paths reject unsafe forms, links, non-files, and detectable mutation", () => {
  withTempDirectory((root) => {
    const result = inspectTrace({ project: root, trace: "../outside.jsonl" });
    assert.deepEqual(codes(result), ["SC1011"]);
  });

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces", "directory.jsonl"), { recursive: true });
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/directory.jsonl" })), [
      "SC1015",
    ]);
  });

  withTempDirectory((root) => {
    const trace = writeTrace(root, [event({ id: "event-0", sequence: 0, type: "run.started" })]);
    const result = inspectTraceWithHooks(
      { project: root, trace },
      {
        read: {
          afterBytesRead(absolutePath) {
            writeFileSync(absolutePath, "changed during inspection\n", "utf8");
          },
        },
      },
    );
    assert.deepEqual(codes(result), ["SC1001"]);
    assert.equal(result.exitCode, 4);
  });

  withTempDirectory((root) => {
    const external = join(root, "external-traces");
    mkdirSync(external);
    writeFileSync(join(external, "linked.jsonl"), "{}\n", "utf8");
    symlinkSync(external, join(root, "traces"), process.platform === "win32" ? "junction" : "dir");
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/linked.jsonl" })), [
      "SC1013",
    ]);
  });
});

test("line, trace, event-count, and depth ceilings emit dedicated diagnostics", () => {
  assertMatrixVariants("L01", [
    "line-bytes",
    "trace-bytes",
    "event-count",
    "dense-short-records",
    "line-before-event-count",
    "depth",
  ]);
  const validEvent = Buffer.from(
    JSON.stringify(event({ id: "event-0", sequence: 0, type: "run.started" })),
    "utf8",
  );

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    const exact = Buffer.concat([
      validEvent,
      Buffer.alloc(LIMITS.jsonlLineBytes - validEvent.byteLength, 0x20),
    ]);
    writeFileSync(join(root, "traces", "line.jsonl"), exact);
    const result = inspectTrace({ project: root, trace: "traces/line.jsonl" });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));

    writeFileSync(join(root, "traces", "line.jsonl"), Buffer.concat([exact, Buffer.from(" ")]));
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/line.jsonl" })), [
      "SC5005",
    ]);
  });

  withTempDirectory((root) => {
    const path = join(root, "trace.bin");
    writeFileSync(path, Buffer.alloc(LIMITS.traceBytes, 0x20));
    const resolved = resolveProjectRoot(root);
    const exact = readContainedFileBytes(
      resolved.root,
      resolved.realRoot,
      "trace.bin",
      "SC1001",
      LIMITS.traceBytes,
      "SC5006",
    );
    assert.equal(exact.bytes.byteLength, LIMITS.traceBytes);

    writeFileSync(path, Buffer.alloc(LIMITS.traceBytes + 1, 0x20));
    const over = readContainedFileBytes(
      resolved.root,
      resolved.realRoot,
      "trace.bin",
      "SC1001",
      LIMITS.traceBytes,
      "SC5006",
    );
    assert.deepEqual(
      over.diagnostics.map(({ code }) => code),
      ["SC5006"],
    );
  });

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    writeFileSync(
      join(root, "traces", "events.jsonl"),
      `${"{}\n".repeat(LIMITS.traceEvents + 1)}`,
      "utf8",
    );
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/events.jsonl" })), [
      "SC5007",
    ]);
  });

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    writeFileSync(
      join(root, "traces", "dense-events.jsonl"),
      Buffer.alloc(LIMITS.traceEvents + 1, 0x0a),
    );
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/dense-events.jsonl" })), [
      "SC5007",
    ]);
  });

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    writeFileSync(
      join(root, "traces", "limit-precedence.jsonl"),
      Buffer.concat([
        Buffer.alloc(LIMITS.traceEvents + 1, 0x0a),
        Buffer.alloc(LIMITS.jsonlLineBytes + 1, 0x20),
      ]),
    );
    assert.deepEqual(
      codes(inspectTrace({ project: root, trace: "traces/limit-precedence.jsonl" })),
      ["SC5005"],
    );
  });

  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    const nested = `${"[".repeat(LIMITS.jsonDepth + 1)}0${"]".repeat(LIMITS.jsonDepth + 1)}`;
    writeFileSync(join(root, "traces", "deep.jsonl"), nested, "utf8");
    assert.deepEqual(codes(inspectTrace({ project: root, trace: "traces/deep.jsonl" })), [
      "SC5002",
    ]);
  });
});

test("evidence summaries cap deterministically and report exact omissions", () => {
  const events = [];
  let sequence = 0;
  for (let group = 0; group < 157; group += 1) {
    events.push(
      event({
        id: `event-${group}`,
        sequence,
        type: "evidence.recorded",
        evidence: Array.from({ length: 64 }, (_, index) => ({
          id: `evidence-${group}-${index}`,
          kind: "test",
          ref: `test:test-${group}-${index}`,
        })),
      }),
    );
    sequence += 1;
  }

  const result = inspectEvents(events);
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  assert.equal(result.value.runs[0].evidence.length, LIMITS.traceSummaryEvidence);
  assert.equal(result.value.runs[0].evidenceOmitted, 48);
  assert.equal(result.value.runs[0].evidence.at(-1).id, "evidence-156-15");
});

test("the normative secret detector has positive and near-miss coverage", () => {
  assertMatrixVariants("PR03", ["positive-negative-patterns"]);
  const positives = [
    `sk-${"a".repeat(20)}`,
    `ghp_${"A".repeat(36)}`,
    `AKIA${"A".repeat(16)}`,
    "-----BEGIN OPENSSH PRIVATE KEY-----",
    `Bearer ${"a".repeat(20)}`,
    "password=abcdefgh",
  ];
  const negatives = [
    `sk-${"a".repeat(19)}`,
    `ghp_${"A".repeat(35)}`,
    `AKIA${"A".repeat(15)}`,
    "-----BEGIN PUBLIC KEY-----",
    `Bearer ${"a".repeat(19)}`,
    "password=short",
  ];

  positives.forEach((value) => {
    assert.equal(containsHighConfidenceSecret(value), true, value);
  });
  negatives.forEach((value) => {
    assert.equal(containsHighConfidenceSecret(value), false, value);
  });
});

test("[PR03] every rendered summary string slot suppresses secrets with one warning", () => {
  const secrets = {
    traceArtifact: `sk-${"a".repeat(24)}`,
    runId: `sk-${"b".repeat(24)}`,
    correlationId: `sk-${"c".repeat(24)}`,
    firstAttemptId: `sk-${"d".repeat(24)}`,
    secondAttemptId: `sk-${"e".repeat(24)}`,
    workPacket: `sk-${"f".repeat(24)}`,
    evidenceId: `sk-${"g".repeat(24)}`,
    evidencePath: `sk-${"h".repeat(24)}`,
  };

  withTempDirectory((root) => {
    const common = {
      runId: secrets.runId,
      correlationId: secrets.correlationId,
      workPacket: secrets.workPacket,
    };
    const trace = writeTrace(
      root,
      [
        stateEvent({
          id: "event-0",
          sequence: 0,
          attemptId: secrets.firstAttemptId,
          number: 1,
          state: "queued",
          ...common,
        }),
        stateEvent({
          id: "event-1",
          sequence: 1,
          attemptId: secrets.firstAttemptId,
          number: 1,
          state: "running",
          ...common,
        }),
        stateEvent({
          id: "event-2",
          sequence: 2,
          attemptId: secrets.firstAttemptId,
          number: 1,
          state: "failed",
          terminalCode: "execution_failed",
          ...common,
        }),
        stateEvent({
          id: "event-3",
          sequence: 3,
          attemptId: secrets.secondAttemptId,
          number: 2,
          state: "queued",
          retryOf: secrets.firstAttemptId,
          ...common,
        }),
        event({
          id: "event-4",
          runId: secrets.runId,
          sequence: 4,
          correlationId: secrets.correlationId,
          type: "workflow.outcome",
          stage: "verify",
          outcome: "pass",
          workPacket: secrets.workPacket,
          attemptId: secrets.secondAttemptId,
        }),
        event({
          id: "event-5",
          runId: secrets.runId,
          sequence: 5,
          correlationId: secrets.correlationId,
          type: "evidence.recorded",
          workPacket: secrets.workPacket,
          attemptId: secrets.secondAttemptId,
          evidence: [
            {
              id: secrets.evidenceId,
              kind: "artifact",
              ref: `path:docs/${secrets.evidencePath}.json`,
            },
          ],
        }),
      ],
      { relativePath: `traces/${secrets.traceArtifact}.jsonl` },
    );
    const result = inspectTrace({ project: root, trace });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    assert.deepEqual(codes(result), ["SC4101"]);
    assert.equal(result.diagnostics[0].pointer, "");

    const run = result.value.runs[0];
    const renderedSlots = [
      ["trace-artifact", result.value.traceArtifact],
      ["run-id", run.runId],
      ["correlation-id", run.correlationIds[0]],
      ["attempt-id", run.attempts[0].id],
      ["attempt-work-packet", run.attempts[0].workPacket],
      ["attempt-retry-of", run.attempts[1].retryOf],
      ["outcome-work-packet", run.workflowOutcomes[0].workPacket],
      ["outcome-attempt-id", run.workflowOutcomes[0].attemptId],
      ["evidence-id", run.evidence[0].id],
      ["evidence-ref", run.evidence[0].ref],
    ];
    assertMatrixVariants("PR03", [
      ...renderedSlots.map(([variant]) => variant),
      "aggregate-warning",
    ]);

    for (const [variant, value] of renderedSlots) {
      assert.equal(value, "[suppressed]", variant);
    }
    for (const secret of Object.values(secrets)) {
      assert.equal(JSON.stringify(result).includes(secret), false, secret);
    }
  });
});

test("secret-bearing trace names are suppressed on invalid-input diagnostics too", () => {
  assertMatrixVariants("PR03", ["diagnostic-artifact"]);
  const secret = `sk-${"b".repeat(24)}`;
  withTempDirectory((root) => {
    mkdirSync(join(root, "traces"));
    const trace = `traces/${secret}.jsonl`;
    writeFileSync(join(root, ...trace.split("/")), "{", "utf8");
    const result = inspectTrace({ project: root, trace });
    assert.ok(codes(result).includes("SC1102"));
    assert.ok(codes(result).includes("SC4101"));
    assert.equal(JSON.stringify(result).includes(secret), false);
  });
});

test("trace inspection remains offline, process-free, and adapter-free", () => {
  withTempDirectory((root) => {
    const trace = writeTrace(root, [event({ id: "event-0", sequence: 0, type: "run.started" })]);
    const originalFetch = globalThis.fetch;
    globalThis.fetch = () => {
      throw new Error("network access attempted");
    };
    try {
      const result = inspectTrace({ project: root, trace });
      assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  const source = readFileSync(new URL("../src/trace.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /node:(?:child_process|http|https|net|tls)/);
  assert.doesNotMatch(source, /adapter/i);
});
