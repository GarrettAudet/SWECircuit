import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";
import { createDeterministicTestExecutor, executeWorkPacket, inspectTrace } from "../dist/index.js";
import { executeWorkPacketWithHooks } from "../dist/execution.js";

const roots = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

function fixture(name) {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/valid/${name}.json`, import.meta.url), "utf8"),
  );
}

function packet() {
  const value = fixture("work-packet");
  delete value.spec.deadline;
  return value;
}

function manifest(
  requestedPermissions = [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
) {
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "AdapterManifest",
    metadata: {
      id: "test.executor",
      version: "1.0.0",
      description: "A trusted in-process test executor declaration.",
    },
    spec: {
      adapterKind: "agent_runtime",
      compatibility: { apiVersions: ["swecircuit/v1alpha1"] },
      capabilities: ["launch_agent"],
      requestedPermissions,
      inputKinds: ["WorkPacket"],
      outputKinds: [],
      behavior: {
        health: { mode: "passive" },
        timeout: { supported: true, maximumSeconds: 60 },
        cancellation: { supported: true, acknowledged: true },
        errors: { structured: true, retryableDeclared: false },
      },
      provenance: {
        source: "https://example.invalid/test-executor",
        maintainer: "SWECircuit tests",
      },
    },
  };
}

function grant(permissions = [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }]) {
  return {
    id: "grant.v10",
    issuer: "integration.owner",
    runId: "run.v10",
    attemptId: "attempt.one",
    workPacket: "frontend",
    executor: { id: "test.executor", version: "1.0.0" },
    permissions,
  };
}

function options(overrides = {}) {
  return {
    workPacket: packet(),
    adapterManifest: manifest(),
    grant: grant(),
    executor: createDeterministicTestExecutor({
      id: "test.executor",
      version: "1.0.0",
      settlement: {
        state: "completed",
        workflow: { stage: "implement", outcome: "pass" },
        evidence: [{ id: "unit.tests", kind: "test", ref: "test:unit" }],
      },
    }),
    runId: "run.v10",
    attemptId: "attempt.one",
    correlationId: "feature.v10",
    policy: { timeoutMs: 30_000, abortAcknowledgementMs: 1_000 },
    ...overrides,
  };
}

function codes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

function eventTypes(result) {
  return result.value.events.map((event) =>
    event.spec.type === "attempt.state"
      ? `${event.spec.type}:${event.spec.attempt.state}`
      : event.spec.type,
  );
}

function controlledTimers(clock) {
  const timers = [];
  return {
    timers,
    hooks: {
      monotonicNow: () => clock.monotonic,
      wallNow: () => clock.wall,
      createTimer(milliseconds) {
        let resolve;
        let cancelled = false;
        const promise = new Promise((done) => {
          resolve = done;
        });
        const timer = {
          milliseconds,
          promise,
          cancel() {
            cancelled = true;
          },
          fire() {
            if (!cancelled) {
              resolve();
            }
          },
          get cancelled() {
            return cancelled;
          },
        };
        timers.push(timer);
        return timer;
      },
    },
  };
}

async function flush() {
  await Promise.resolve();
  await Promise.resolve();
}

test("one valid packet executes once and returns an immutable V9-compatible journal", async () => {
  let calls = 0;
  let received;
  const sourcePacket = packet();
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    async execute(request) {
      calls += 1;
      received = request;
      return {
        state: "completed",
        workflow: { stage: "implement", outcome: "pass" },
        evidence: [{ id: "unit.tests", kind: "test", ref: "test:unit" }],
      };
    },
  };

  const result = await executeWorkPacket(options({ workPacket: sourcePacket, executor }));
  assert.equal(result.ok, true);
  assert.equal(calls, 1);
  assert.equal(result.value.disposition, "completed");
  assert.equal(result.value.state, "completed");
  assert.equal(result.value.terminalCode, "success");
  assert.deepEqual(eventTypes(result), [
    "run.started",
    "attempt.state:queued",
    "attempt.state:running",
    "workflow.outcome",
    "evidence.recorded",
    "attempt.state:completed",
    "run.completed",
  ]);
  assert.deepEqual(
    result.value.events.map((event) => event.spec.sequence),
    [0, 1, 2, 3, 4, 5, 6],
  );
  assert.deepEqual(
    result.value.events.map((event) => event.metadata.id),
    ["event.0", "event.1", "event.2", "event.3", "event.4", "event.5", "event.6"],
  );
  assert.deepEqual(result.value.events[0].spec.links, ["grant.v10"]);
  assert.equal(Object.isFrozen(received), true);
  assert.equal(Object.isFrozen(received.workPacket), true);
  assert.equal(Object.isFrozen(received.grant.permissions[0].scopes), true);
  assert.equal(Object.isFrozen(result.value), true);
  assert.equal(Object.isFrozen(result.value.events), true);
  assert.equal(Object.isFrozen(result.value.events[0].spec), true);
  assert.notEqual(received.workPacket, sourcePacket);

  const root = mkdtempSync(join(tmpdir(), "swecircuit-execution-"));
  roots.push(root);
  writeFileSync(
    join(root, "run.jsonl"),
    `${result.value.events.map((event) => JSON.stringify(event)).join("\n")}\n`,
    "utf8",
  );
  const inspection = inspectTrace({ project: root, trace: "run.jsonl" });
  assert.equal(inspection.ok, true);
  assert.equal(inspection.value.runs[0].attempts[0].state, "completed");
  assert.equal(inspection.value.runs[0].hasCompletedEvent, true);
});

test("normal class executors can implement the public port", async () => {
  class ClassExecutor {
    id = "test.executor";
    version = "1.0.0";
    calls = 0;

    async execute() {
      this.calls += 1;
      return { state: "completed" };
    }
  }

  const executor = new ClassExecutor();
  const result = await executeWorkPacket(options({ executor }));
  assert.equal(result.ok, true);
  assert.equal(result.value.disposition, "completed");
  assert.equal(executor.calls, 1);
});
test("operation success stays separate from declared work failure", async () => {
  const executor = createDeterministicTestExecutor({
    id: "test.executor",
    version: "1.0.0",
    settlement: {
      state: "failed",
      terminalCode: "verification_failed",
      workflow: { stage: "verify", outcome: "fix" },
    },
  });
  const result = await executeWorkPacket(options({ executor }));
  assert.equal(result.ok, true);
  assert.equal(result.value.disposition, "failed");
  assert.equal(result.value.failureCode, "executor_declared_failure");
  assert.equal(result.value.terminalCode, "verification_failed");
  assert.deepEqual(eventTypes(result), [
    "run.started",
    "attempt.state:queued",
    "attempt.state:running",
    "workflow.outcome",
    "attempt.state:failed",
    "run.completed",
  ]);
});

test("every preflight rejection prevents executor invocation", async (t) => {
  const cases = [
    {
      name: "null packet",
      mutate(value) {
        value.workPacket = null;
      },
      code: "SC1201",
    },
    {
      name: "null manifest",
      mutate(value) {
        value.adapterManifest = null;
      },
      code: "SC1201",
    },
    {
      name: "wrong packet kind",
      mutate(value) {
        value.workPacket = fixture("module");
      },
      code: "SC4202",
    },
    {
      name: "incompatible manifest kind",
      mutate(value) {
        value.adapterManifest.spec.adapterKind = "ide";
      },
      code: "SC4203",
    },
    {
      name: "manifest declares kernel-owned output",
      mutate(value) {
        value.adapterManifest.spec.outputKinds = ["RunEvent"];
      },
      code: "SC4203",
    },
    {
      name: "executor identity mismatch",
      mutate(value) {
        value.grant.executor.id = "other.executor";
      },
      code: "SC4204",
    },
    {
      name: "malformed grant",
      mutate(value) {
        value.grant.extra = true;
      },
      code: "SC4205",
    },
    {
      name: "invalid timeout policy",
      mutate(value) {
        value.policy.timeoutMs = 0;
      },
      code: "SC4208",
    },
  ];

  for (const scenario of cases) {
    await t.test(scenario.name, async () => {
      let calls = 0;
      const value = options({
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      });
      scenario.mutate(value);
      const result = await executeWorkPacket(value);
      assert.equal(result.ok, false);
      assert.equal(result.value, null);
      assert.equal(calls, 0);
      assert.ok(codes(result).includes(scenario.code), codes(result).join(","));
    });
  }
});

test("permission grants fail closed in every direction", async (t) => {
  const scenarios = [
    {
      name: "grant misses a manifest request",
      requested: [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
      granted: [],
      ceiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      code: "SC4206",
    },
    {
      name: "grant adds unrequested authority",
      requested: [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
      granted: [
        { kind: "filesystem.read", scopes: ["src/frontend/**"] },
        { kind: "filesystem.write", scopes: ["src/frontend/**"] },
      ],
      ceiling: [
        { kind: "filesystem.read", scopes: ["src/**"] },
        { kind: "filesystem.write", scopes: ["src/**"] },
      ],
      code: "SC4206",
    },
    {
      name: "grant exceeds packet ceiling",
      requested: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      granted: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      ceiling: [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
      code: "SC4207",
    },
    {
      name: "broad request is not covered by narrow grant",
      requested: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      granted: [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
      ceiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      code: "SC4206",
    },
    {
      name: "broad grant is not covered by narrow request",
      requested: [{ kind: "filesystem.read", scopes: ["src/frontend/**"] }],
      granted: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      ceiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      code: "SC4206",
    },
  ];

  for (const scenario of scenarios) {
    await t.test(scenario.name, async () => {
      let calls = 0;
      const workPacket = packet();
      workPacket.spec.authority.permissionCeiling = scenario.ceiling;
      const result = await executeWorkPacket(
        options({
          workPacket,
          adapterManifest: manifest(scenario.requested),
          grant: grant(scenario.granted),
          executor: {
            id: "test.executor",
            version: "1.0.0",
            async execute() {
              calls += 1;
              return { state: "completed" };
            },
          },
        }),
      );
      assert.equal(result.ok, false);
      assert.equal(calls, 0);
      assert.ok(codes(result).includes(scenario.code), codes(result).join(","));
    });
  }
});

test("throws and malformed settlements become fixed failures without raw values", async (t) => {
  const canary = "sk-abcdefghijklmnopqrstuvwx";
  const scenarios = [
    {
      name: "throw",
      executor: {
        id: "test.executor",
        version: "1.0.0",
        async execute() {
          throw new Error(canary);
        },
      },
      failureCode: "executor_threw",
    },
    {
      name: "malformed extra field",
      executor: {
        id: "test.executor",
        version: "1.0.0",
        async execute() {
          return { state: "completed", extra: canary };
        },
      },
      failureCode: "executor_result_invalid",
    },
    {
      name: "secret evidence",
      executor: {
        id: "test.executor",
        version: "1.0.0",
        async execute() {
          return {
            state: "completed",
            evidence: [{ id: "secret.evidence", kind: "artifact", ref: `path:${canary}` }],
          };
        },
      },
      failureCode: "executor_result_invalid",
    },
  ];

  for (const scenario of scenarios) {
    await t.test(scenario.name, async () => {
      const result = await executeWorkPacket(options({ executor: scenario.executor }));
      assert.equal(result.ok, true);
      assert.equal(result.value.disposition, "failed");
      assert.equal(result.value.failureCode, scenario.failureCode);
      assert.equal(JSON.stringify(result).includes(canary), false);
    });
  }
});

test("fulfillment observation detaches settlement before later mutation", async () => {
  let resolveExecutor;
  const settlement = {
    state: "completed",
    workflow: { stage: "implement", outcome: "pass" },
    evidence: [{ id: "unit.tests", kind: "test", ref: "test:unit" }],
  };
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    execute() {
      return new Promise((resolve) => {
        resolveExecutor = resolve;
      });
    },
  };
  const pending = executeWorkPacket(options({ executor }));
  await flush();
  assert.equal(typeof resolveExecutor, "function");

  resolveExecutor(settlement);
  queueMicrotask(() => {
    settlement.state = "failed";
    settlement.terminalCode = "verification_failed";
    settlement.workflow.stage = "review";
    settlement.workflow.outcome = "fix";
    settlement.evidence[0].ref = "test:mutated";
  });

  const result = await pending;
  assert.equal(settlement.state, "failed");
  assert.notEqual(result.value, null);
  assert.equal(result.value.disposition, "completed");
  assert.deepEqual(result.value.workflow, { stage: "implement", outcome: "pass" });
  assert.equal(JSON.stringify(result.value).includes("test:unit"), true);
  assert.equal(JSON.stringify(result.value).includes("test:mutated"), false);
});

test("return-bound input canaries fail preflight without leaking", async (t) => {
  const canary = "sk-abcdefghijklmnopqrstuvwx";
  const scenarios = [
    [
      "run ID",
      (value) => {
        value.runId = canary;
        value.grant.runId = canary;
      },
    ],
    [
      "attempt ID",
      (value) => {
        value.attemptId = canary;
        value.grant.attemptId = canary;
      },
    ],
    [
      "correlation ID",
      (value) => {
        value.correlationId = canary;
      },
    ],
    [
      "packet ID",
      (value) => {
        value.workPacket.metadata.id = canary;
        value.grant.workPacket = canary;
      },
    ],
    [
      "grant ID",
      (value) => {
        value.grant.id = canary;
      },
    ],
    [
      "issuer",
      (value) => {
        value.grant.issuer = canary;
      },
    ],
    [
      "executor ID",
      (value) => {
        value.executor.id = canary;
        value.adapterManifest.metadata.id = canary;
        value.grant.executor.id = canary;
      },
    ],
  ];

  for (const [name, mutate] of scenarios) {
    await t.test(name, async () => {
      let calls = 0;
      const value = options({
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      });
      mutate(value);
      const result = await executeWorkPacket(value);
      assert.equal(result.ok, false);
      assert.equal(calls, 0);
      assert.ok(codes(result).includes("SC4209"), codes(result).join(","));
      assert.equal(JSON.stringify(result).includes(canary), false);
    });
  }
});

test("already-aborted and already-expired work never invokes the executor", async (t) => {
  await t.test("caller abort", async () => {
    let calls = 0;
    const controller = new AbortController();
    controller.abort("sk-abcdefghijklmnopqrstuvwx");
    const result = await executeWorkPacket(
      options({
        signal: controller.signal,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(calls, 0);
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.terminalCode, "cancelled_by_user");
    assert.equal(JSON.stringify(result).includes("sk-"), false);
  });

  await t.test("packet deadline", async () => {
    let calls = 0;
    const workPacket = packet();
    workPacket.spec.deadline = "2026-01-01T00:00:00Z";
    const result = await executeWorkPacketWithHooks(
      options({
        workPacket,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
      { monotonicNow: () => 10, wallNow: () => Date.parse("2026-02-01T00:00:00Z") },
    );
    assert.equal(calls, 0);
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.terminalCode, "cancelled_by_policy");
    assert.deepEqual(eventTypes(result), [
      "run.started",
      "attempt.state:queued",
      "attempt.cancellation_requested",
      "attempt.state:cancelled",
      "run.completed",
    ]);
  });
});

test("acknowledged caller cancellation and timeout produce exact terminal journals", async (t) => {
  await t.test("caller cancellation", async () => {
    const controller = new AbortController();
    const executor = {
      id: "test.executor",
      version: "1.0.0",
      execute({ signal }) {
        return new Promise((_, reject) => {
          signal.addEventListener("abort", () => reject(new Error("ack")), { once: true });
        });
      },
    };
    const pending = executeWorkPacket(options({ executor, signal: controller.signal }));
    await flush();
    controller.abort();
    const result = await pending;
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.cancellationAcknowledged, true);
    assert.equal(result.value.terminalCode, "cancelled_by_user");
  });

  await t.test("deadline", async () => {
    const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
    const controlled = controlledTimers(clock);
    const executor = {
      id: "test.executor",
      version: "1.0.0",
      execute({ signal }) {
        return new Promise((_, reject) => {
          signal.addEventListener("abort", () => reject(new Error("ack")), { once: true });
        });
      },
    };
    const pending = executeWorkPacketWithHooks(
      options({ executor, policy: { timeoutMs: 100, abortAcknowledgementMs: 20 } }),
      controlled.hooks,
    );
    await flush();
    assert.equal(controlled.timers.length, 1);
    clock.monotonic = 100;
    controlled.timers[0].fire();
    const result = await pending;
    assert.equal(result.value.disposition, "timed_out");
    assert.equal(result.value.terminalCode, "deadline_exceeded");
    assert.equal(result.value.cancellationAcknowledged, true);
  });
});

test("an unacknowledged abort remains non-terminal and late rejection is observed", async () => {
  const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
  const controlled = controlledTimers(clock);
  let rejectExecutor;
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    execute() {
      return new Promise((_, reject) => {
        rejectExecutor = reject;
      });
    },
  };
  const unhandled = [];
  const onUnhandled = (reason) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  try {
    const pending = executeWorkPacketWithHooks(
      options({ executor, policy: { timeoutMs: 100, abortAcknowledgementMs: 20 } }),
      controlled.hooks,
    );
    await flush();
    clock.monotonic = 100;
    controlled.timers[0].fire();
    await flush();
    await flush();
    assert.equal(controlled.timers.length, 2);
    clock.monotonic = 120;
    controlled.timers[1].fire();
    const result = await pending;
    assert.equal(result.value.disposition, "abort_unconfirmed");
    assert.equal(result.value.state, "running");
    assert.equal(result.value.cancellationAcknowledged, false);
    assert.equal(
      result.value.events.some((event) => event.spec.type === "run.completed"),
      false,
    );
    assert.equal(
      result.value.events.some(
        (event) => event.spec.type === "attempt.state" && event.spec.attempt.terminalCode,
      ),
      false,
    );
    const frozenJson = JSON.stringify(result);
    rejectExecutor(new Error("late secret sk-abcdefghijklmnopqrstuvwx"));
    await flush();
    assert.equal(JSON.stringify(result), frozenJson);
    assert.deepEqual(unhandled, []);
  } finally {
    process.removeListener("unhandledRejection", onUnhandled);
  }
});

test("completion observed at or after the absolute deadline cannot become success", async () => {
  const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
  const controlled = controlledTimers(clock);
  let resolveExecutor;
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    execute() {
      return new Promise((resolve) => {
        resolveExecutor = resolve;
      });
    },
  };
  const pending = executeWorkPacketWithHooks(
    options({ executor, policy: { timeoutMs: 100, abortAcknowledgementMs: 20 } }),
    controlled.hooks,
  );
  await flush();
  clock.monotonic = 101;
  resolveExecutor({ state: "completed" });
  const result = await pending;
  assert.equal(result.value.disposition, "timed_out");
  assert.equal(result.value.terminalCode, "deadline_exceeded");
});

test("an early deadline wake-up re-arms instead of cancelling work", async () => {
  const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
  const controlled = controlledTimers(clock);
  let resolveExecutor;
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    execute() {
      return new Promise((resolve) => {
        resolveExecutor = resolve;
      });
    },
  };
  const pending = executeWorkPacketWithHooks(
    options({ executor, policy: { timeoutMs: 100, abortAcknowledgementMs: 20 } }),
    controlled.hooks,
  );
  await flush();
  assert.equal(controlled.timers.length, 1);
  clock.monotonic = 50;
  controlled.timers[0].fire();
  await flush();
  assert.equal(controlled.timers.length, 2);
  assert.equal(controlled.timers[1].milliseconds, 50);
  resolveExecutor({ state: "completed" });
  const result = await pending;
  assert.equal(result.value.disposition, "completed");
  assert.equal(controlled.timers[1].cancelled, true);
});

test("settlement outside the abort acknowledgement window stays unconfirmed", async () => {
  const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
  const controlled = controlledTimers(clock);
  const caller = new AbortController();
  const executor = {
    id: "test.executor",
    version: "1.0.0",
    execute({ signal }) {
      return new Promise((resolve) => {
        signal.addEventListener(
          "abort",
          () => {
            clock.monotonic = 22;
            resolve({ state: "completed" });
          },
          { once: true },
        );
      });
    },
  };
  const pending = executeWorkPacketWithHooks(
    options({
      executor,
      signal: caller.signal,
      policy: { timeoutMs: 100, abortAcknowledgementMs: 20 },
    }),
    controlled.hooks,
  );
  clock.monotonic = 1;
  caller.abort();
  const result = await pending;
  assert.equal(result.value.disposition, "abort_unconfirmed");
  assert.equal(result.value.abortCause, "caller");
  assert.equal(result.value.cancellationAcknowledged, false);
  assert.equal(eventTypes(result).includes("run.completed"), false);
});
test("hostile proxies and forged signals fail closed without escaping the API", async (t) => {
  await t.test("revoked work packet", async () => {
    let calls = 0;
    const revocable = Proxy.revocable(packet(), {});
    revocable.revoke();
    const result = await executeWorkPacket(
      options({
        workPacket: revocable.proxy,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.ok(codes(result).includes("SC4201"), codes(result).join(","));
  });

  await t.test("revoked options", async () => {
    let calls = 0;
    const revocable = Proxy.revocable(
      options({
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
      {},
    );
    revocable.revoke();
    const result = await executeWorkPacket(revocable.proxy);
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.ok(codes(result).includes("SC4201"), codes(result).join(","));
  });

  await t.test("live proxy traps are not invoked", async () => {
    let calls = 0;
    let traps = 0;
    const target = packet();
    const workPacket = new Proxy(target, {
      ownKeys(value) {
        traps += 1;
        return Reflect.ownKeys(value);
      },
      getOwnPropertyDescriptor(value, key) {
        traps += 1;
        return Reflect.getOwnPropertyDescriptor(value, key);
      },
    });
    const result = await executeWorkPacket(
      options({
        workPacket,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.equal(traps, 0);
    assert.ok(codes(result).includes("SC4201"), codes(result).join(","));
  });

  await t.test("revoked AbortSignal proxy", async () => {
    let calls = 0;
    const revocable = Proxy.revocable(new AbortController().signal, {});
    revocable.revoke();
    const result = await executeWorkPacket(
      options({
        signal: revocable.proxy,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.ok(codes(result).includes("SC4201"), codes(result).join(","));
  });
  await t.test("forged AbortSignal", async () => {
    let calls = 0;
    const result = await executeWorkPacket(
      options({
        signal: Object.create(AbortSignal.prototype),
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.ok(codes(result).includes("SC4201"), codes(result).join(","));
  });

  await t.test("revoked settlement", async () => {
    const revocable = Proxy.revocable({ state: "completed" }, {});
    revocable.revoke();
    const result = await executeWorkPacket(
      options({
        executor: {
          id: "test.executor",
          version: "1.0.0",
          execute() {
            return revocable.proxy;
          },
        },
      }),
    );
    assert.equal(result.ok, true);
    assert.equal(result.value.disposition, "failed");
    assert.equal(result.value.failureCode, "executor_result_invalid");
  });
});

test("snapshot depth and node ceilings reject work before executor invocation", async (t) => {
  const boundedResult = async (workPacket, expectedCode = "SC4210") => {
    let calls = 0;
    const result = await executeWorkPacket(
      options({
        workPacket,
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
    );
    assert.equal(result.ok, false);
    assert.equal(calls, 0);
    assert.ok(codes(result).includes(expectedCode), codes(result).join(","));
  };

  await t.test("huge sparse array", async () => {
    const workPacket = packet();
    const sparse = [];
    sparse.length = 100_001;
    workPacket.hostile = sparse;
    await boundedResult(workPacket);
  });

  await t.test("small sparse array", async () => {
    const workPacket = packet();
    workPacket.hostile = Array(2);
    await boundedResult(workPacket, "SC4201");
  });

  await t.test("dense oversized object", async () => {
    const workPacket = packet();
    const dense = {};
    for (let index = 0; index < 100_001; index += 1) {
      dense[`key${index}`] = index;
    }
    workPacket.hostile = dense;
    await boundedResult(workPacket);
  });
  await t.test("excessive depth", async () => {
    const workPacket = packet();
    let cursor = workPacket;
    for (let depth = 0; depth < 66; depth += 1) {
      cursor.hostile = {};
      cursor = cursor.hostile;
    }
    await boundedResult(workPacket);
  });
});

test("the final invocation gate catches cancellation and deadline changes", async (t) => {
  const idleTimer = () => ({ promise: new Promise(() => {}), cancel() {} });

  await t.test("caller abort while the deadline timer is armed", async () => {
    let calls = 0;
    const controller = new AbortController();
    const result = await executeWorkPacketWithHooks(
      options({
        signal: controller.signal,
        policy: { timeoutMs: 100, abortAcknowledgementMs: 20 },
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
      {
        monotonicNow: () => 0,
        wallNow: () => Date.parse("2026-07-14T00:00:00Z"),
        createTimer() {
          controller.abort();
          return idleTimer();
        },
      },
    );
    assert.equal(calls, 0);
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.abortCause, "caller");
  });

  await t.test("deadline reached after the final gate read", async () => {
    let calls = 0;
    const clock = { monotonic: 0, crossAfterRead: false };
    const result = await executeWorkPacketWithHooks(
      options({
        policy: { timeoutMs: 100, abortAcknowledgementMs: 20 },
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
      {
        monotonicNow() {
          const observed = clock.monotonic;
          if (clock.crossAfterRead) {
            clock.crossAfterRead = false;
            clock.monotonic = 100;
          }
          return observed;
        },
        wallNow: () => Date.parse("2026-07-14T00:00:00Z"),
        createTimer() {
          clock.monotonic = 99;
          clock.crossAfterRead = true;
          return idleTimer();
        },
      },
    );
    assert.equal(calls, 0);
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.abortCause, "deadline");
    assert.equal(eventTypes(result).includes("attempt.state:running"), false);
  });
  await t.test("deadline reached while the deadline timer is armed", async () => {
    let calls = 0;
    const clock = { monotonic: 0 };
    const result = await executeWorkPacketWithHooks(
      options({
        policy: { timeoutMs: 100, abortAcknowledgementMs: 20 },
        executor: {
          id: "test.executor",
          version: "1.0.0",
          async execute() {
            calls += 1;
            return { state: "completed" };
          },
        },
      }),
      {
        monotonicNow: () => clock.monotonic,
        wallNow: () => Date.parse("2026-07-14T00:00:00Z"),
        createTimer() {
          clock.monotonic = 100;
          return idleTimer();
        },
      },
    );
    assert.equal(calls, 0);
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.abortCause, "deadline");
  });
});

test("abort cause uses the first observed monotonic event", async (t) => {
  const runScenario = async ({ abortAt, advanceTo }) => {
    const clock = { monotonic: 0, wall: Date.parse("2026-07-14T00:00:00Z") };
    const controlled = controlledTimers(clock);
    const caller = new AbortController();
    let calls = 0;
    const executor = {
      id: "test.executor",
      version: "1.0.0",
      execute({ signal }) {
        calls += 1;
        return new Promise((_, reject) => {
          signal.addEventListener("abort", () => reject(new Error("ack")), { once: true });
        });
      },
    };
    const pending = executeWorkPacketWithHooks(
      options({
        executor,
        signal: caller.signal,
        policy: { timeoutMs: 100, abortAcknowledgementMs: 20 },
      }),
      controlled.hooks,
    );
    assert.equal(calls, 1);
    clock.monotonic = abortAt;
    caller.abort();
    clock.monotonic = advanceTo;
    return pending;
  };

  await t.test("caller observed before deadline remains caller", async () => {
    const result = await runScenario({ abortAt: 99, advanceTo: 101 });
    assert.equal(result.value.disposition, "cancelled");
    assert.equal(result.value.abortCause, "caller");
    assert.equal(result.value.terminalCode, "cancelled_by_user");
  });

  await t.test("caller first observed after deadline is deadline", async () => {
    const result = await runScenario({ abortAt: 101, advanceTo: 101 });
    assert.equal(result.value.disposition, "timed_out");
    assert.equal(result.value.abortCause, "deadline");
    assert.equal(result.value.terminalCode, "deadline_exceeded");
  });
});
test("direct inputs are detached, bounded, and accessor-free", async (t) => {
  await t.test("cycle", async () => {
    const workPacket = packet();
    workPacket.loop = workPacket;
    const result = await executeWorkPacket(options({ workPacket }));
    assert.equal(result.ok, false);
    assert.ok(codes(result).includes("SC4201"));
  });

  await t.test("accessor", async () => {
    const workPacket = packet();
    Object.defineProperty(workPacket, "trap", {
      enumerable: true,
      get() {
        throw new Error("must not run");
      },
    });
    const result = await executeWorkPacket(options({ workPacket }));
    assert.equal(result.ok, false);
    assert.ok(codes(result).includes("SC4201"));
  });

  await t.test("source mutation cannot change executor input", async () => {
    const workPacket = packet();
    let observedGoal;
    const executor = {
      id: "test.executor",
      version: "1.0.0",
      async execute(request) {
        observedGoal = request.workPacket.spec.goal;
        assert.throws(() => {
          request.workPacket.spec.goal = "mutated";
        }, TypeError);
        return { state: "completed" };
      },
    };
    const pending = executeWorkPacket(options({ workPacket, executor }));
    workPacket.spec.goal = "changed after call";
    const result = await pending;
    assert.equal(result.ok, true);
    assert.notEqual(observedGoal, "changed after call");
  });
});
