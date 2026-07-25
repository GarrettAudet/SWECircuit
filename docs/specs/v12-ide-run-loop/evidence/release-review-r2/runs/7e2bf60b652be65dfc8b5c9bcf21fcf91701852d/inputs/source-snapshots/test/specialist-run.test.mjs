import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { TextEncoder } from "node:util";

import {
  assessSpecialistHandoffs,
  createSpecialistRunSession,
  inspectSpecialistRunSession,
  recordSpecialistRunHandoff,
  restoreSpecialistRunSession,
  SPECIALIST_RUN_LIMITS,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "swecircuit";

import {
  assertDeepFrozen,
  assertOk,
  assertRejected,
  diagnosticCodes,
  handoffFor,
  makeFixture,
  rawHandoff,
} from "./helpers/specialist-run-fixture.mjs";

const encoder = new TextEncoder();

function dependencyClosure(definitions, targetId) {
  const byId = new Map(definitions.map((definition) => [definition.id, definition]));
  const pending = [...byId.get(targetId).dependencies];
  const result = new Set();
  while (pending.length > 0) {
    const dependencyId = pending.pop();
    if (result.has(dependencyId)) {
      continue;
    }
    result.add(dependencyId);
    pending.push(...byId.get(dependencyId).dependencies);
  }
  return [...result].sort();
}

function unitForAgent(fixture, agentId) {
  for (const [unitId, blueprint] of fixture.blueprintByUnit) {
    if (blueprint.id === agentId) {
      return unitId;
    }
  }
  throw new Error(`Unknown agent ${agentId}`);
}

function topologicalOrders(definitions) {
  const orders = [];
  const visit = (settled, order) => {
    if (order.length === definitions.length) {
      orders.push(order);
      return;
    }
    const eligible = definitions
      .filter(
        (definition) =>
          !settled.has(definition.id) &&
          definition.dependencies.every((dependencyId) => settled.has(dependencyId)),
      )
      .map((definition) => definition.id)
      .sort();
    for (const unitId of eligible) {
      visit(new Set([...settled, unitId]), [...order, unitId]);
    }
  };
  visit(new Set(), []);
  return orders;
}

test("root, chain, diamond, fan-out, fan-in, disconnected, and complete DAGs agree with V11", () => {
  const graphs = [
    ["root", [{ id: "unit.a", dependencies: [] }]],
    [
      "chain",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: ["unit.a"] },
        { id: "unit.c", dependencies: ["unit.b"] },
        { id: "unit.d", dependencies: ["unit.c"] },
      ],
    ],
    [
      "diamond",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: ["unit.a"] },
        { id: "unit.c", dependencies: ["unit.a"] },
        { id: "unit.d", dependencies: ["unit.b", "unit.c"] },
      ],
    ],
    [
      "fanout",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: ["unit.a"] },
        { id: "unit.c", dependencies: ["unit.a"] },
        { id: "unit.d", dependencies: ["unit.a"] },
      ],
    ],
    [
      "fanin",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: [] },
        { id: "unit.c", dependencies: [] },
        { id: "unit.d", dependencies: ["unit.a", "unit.b", "unit.c"] },
      ],
    ],
    [
      "disconnected",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: ["unit.a"] },
        { id: "unit.c", dependencies: [] },
        { id: "unit.d", dependencies: ["unit.c"] },
      ],
    ],
    [
      "complete",
      [
        { id: "unit.a", dependencies: [] },
        { id: "unit.b", dependencies: ["unit.a"] },
        { id: "unit.c", dependencies: ["unit.a", "unit.b"] },
        { id: "unit.d", dependencies: ["unit.a", "unit.b", "unit.c"] },
      ],
    ],
  ];

  for (const [name, definitions] of graphs) {
    const fixture = makeFixture(definitions, `shape-${name}`);
    const rawByUnit = new Map(
      definitions.map((definition) => [definition.id, rawHandoff(fixture, definition.id)]),
    );
    const accepted = new Set();
    let session = fixture.initialSession;

    while (accepted.size < definitions.length) {
      const inspection = assertOk(
        inspectSpecialistRunSession(session, fixture.expectation),
        `${name} collecting inspection`,
      );
      const expectedEligible = definitions
        .filter(
          (definition) =>
            !accepted.has(definition.id) &&
            dependencyClosure(definitions, definition.id).every((unitId) => accepted.has(unitId)),
        )
        .map((definition) => definition.id)
        .sort();
      const actualEligible = inspection.dependencyEligibleContracts
        .map((contract) => unitForAgent(fixture, contract.agentId))
        .sort();
      assert.deepEqual(actualEligible, expectedEligible, `${name} eligibility diverged`);

      for (const definition of definitions.filter((entry) => !accepted.has(entry.id))) {
        const closure = dependencyClosure(definitions, definition.id);
        const acceptedDependencyBytes = closure
          .filter((unitId) => accepted.has(unitId))
          .map((unitId) => rawByUnit.get(unitId));
        const assessment = assertOk(
          assessSpecialistHandoffs(
            fixture.specialistPackage,
            fixture.expectation,
            fixture.blueprintByUnit.get(definition.id).id,
            acceptedDependencyBytes,
          ),
          `${name} V11 assessment for ${definition.id}`,
        );
        const expectedReady = closure.every((unitId) => accepted.has(unitId));
        assert.equal(
          assessment.integrationReady,
          expectedReady,
          `${name} differential readiness for ${definition.id}`,
        );
        const status = inspection.agents.find(
          (entry) => entry.agentId === fixture.blueprintByUnit.get(definition.id).id,
        );
        assert.equal(
          status.status === "dependency_eligible",
          expectedReady,
          `${name} differential status for ${definition.id}`,
        );
      }

      const next = expectedEligible[0];
      const recorded = assertOk(
        recordSpecialistRunHandoff(session, fixture.expectation, rawByUnit.get(next)),
        `${name} record ${next}`,
      );
      session = recorded;
      accepted.add(next);
    }

    const finalInspection = assertOk(
      inspectSpecialistRunSession(session, fixture.expectation),
      `${name} final inspection`,
    );
    assert.equal(finalInspection.stage, "integration_ready");
    assert.equal(finalInspection.specialistOutcome, "pass");
    assert.equal(finalInspection.integrationReady, true);
    assert.deepEqual(finalInspection.dependencyEligibleContracts, []);
    assert.equal(finalInspection.acceptedEvidence.length, definitions.length);
    assertDeepFrozen(session, `${name}.session`);
    assertDeepFrozen(finalInspection, `${name}.inspection`);

    assertOk(
      verifySpecialistPackage(fixture.specialistPackage, fixture.expectation),
      `${name} V11 package compatibility`,
    );
    assertOk(
      verifySpecialistHandoff(
        fixture.specialistPackage,
        fixture.expectation,
        rawByUnit.get(definitions[0].id),
      ),
      `${name} V11 handoff compatibility`,
    );
  }
});

test("all valid independent arrival permutations converge to one session and inspection", () => {
  const definitions = [
    { id: "unit.a", dependencies: [] },
    { id: "unit.b", dependencies: [] },
    { id: "unit.c", dependencies: ["unit.a"] },
    { id: "unit.d", dependencies: ["unit.a"] },
    { id: "unit.e", dependencies: ["unit.b", "unit.c", "unit.d"] },
  ];
  const fixture = makeFixture(definitions, "permutation");
  const rawByUnit = new Map(
    definitions.map((definition) => [definition.id, rawHandoff(fixture, definition.id)]),
  );
  const orders = topologicalOrders(definitions);
  assert.ok(orders.length > 1);
  assert.ok(orders.length <= 32);

  let expectedSession;
  let expectedInspection;
  for (const order of orders) {
    let session = fixture.initialSession;
    for (const unitId of order) {
      session = assertOk(
        recordSpecialistRunHandoff(session, fixture.expectation, rawByUnit.get(unitId)),
        `permutation ${order.join(",")} record ${unitId}`,
      );
    }
    const inspection = assertOk(
      inspectSpecialistRunSession(session, fixture.expectation),
      `permutation ${order.join(",")} inspection`,
    );
    if (expectedSession === undefined) {
      expectedSession = session;
      expectedInspection = inspection;
    } else {
      assert.deepEqual(session, expectedSession, `session diverged for ${order.join(",")}`);
      assert.deepEqual(
        inspection,
        expectedInspection,
        `inspection diverged for ${order.join(",")}`,
      );
    }
  }
});

test("fresh-process restore and inspection preserve canonical semantics without host state", () => {
  const fixture = makeFixture(
    [
      { id: "unit.a", dependencies: [] },
      { id: "unit.b", dependencies: ["unit.a"] },
    ],
    "fresh-process",
  );
  const session = assertOk(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      fixture.expectation,
      rawHandoff(fixture, "unit.a"),
    ),
    "record pre-restart handoff",
  );
  const reordered = Object.fromEntries(Object.entries(session).reverse());
  const rawSession = encoder.encode(` \n${JSON.stringify(reordered)}\n `);
  const restored = assertOk(
    restoreSpecialistRunSession(rawSession, fixture.expectation),
    "parent restore with harmless whitespace and property order",
  );
  assert.deepEqual(restored, session);
  const parentInspection = assertOk(
    inspectSpecialistRunSession(restored, fixture.expectation),
    "parent inspection",
  );

  const childScript = `
    import { readFileSync } from "node:fs";
    import {
      inspectSpecialistRunSession,
      restoreSpecialistRunSession,
    } from "swecircuit";
    const payload = JSON.parse(readFileSync(0, "utf8"));
    const raw = new Uint8Array(Buffer.from(payload.rawBase64, "base64"));
    const restored = restoreSpecialistRunSession(raw, payload.expectation);
    const inspection = restored.ok
      ? inspectSpecialistRunSession(restored.value, payload.expectation)
      : { ok: false, diagnostics: restored.diagnostics, value: null };
    process.stdout.write(JSON.stringify({ restored, inspection }));
  `;
  const child = spawnSync(process.execPath, ["--input-type=module", "--eval", childScript], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    input: JSON.stringify({
      rawBase64: Buffer.from(rawSession).toString("base64"),
      expectation: fixture.expectation,
    }),
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  assert.equal(child.status, 0, child.stderr);
  const childResult = JSON.parse(child.stdout);
  assert.equal(childResult.restored.ok, true, JSON.stringify(childResult.restored.diagnostics));
  assert.equal(childResult.inspection.ok, true, JSON.stringify(childResult.inspection.diagnostics));
  assert.deepEqual(childResult.restored.value, restored);
  assert.deepEqual(childResult.inspection.value, parentInspection);

  assert.deepEqual(Object.keys(session), [
    "apiVersion",
    "kind",
    "goal",
    "compilationDigest",
    "packageDigest",
    "selectedCandidateId",
    "package",
    "acceptedHandoffs",
    "contentDigest",
  ]);
  assert.deepEqual(Object.keys(session.goal), ["id", "revision", "digest", "integrationOwner"]);
  assert.deepEqual(Object.keys(session.acceptedHandoffs[0]), [
    "agentId",
    "blueprintDigest",
    "outcome",
    "rawEncoding",
    "rawBytes",
    "rawDigest",
    "rawBase64",
  ]);
  for (const forbidden of [
    "provider",
    "model",
    "prompt",
    "executor",
    "credential",
    "grant",
    "callback",
    "timestamp",
    "randomId",
    "workspace",
    "process",
    "attempt",
    "capacity",
    "launchWave",
    "stage",
    "blocker",
    "readiness",
    "nextAction",
  ]) {
    assert.equal(forbidden in session, false);
    assert.equal(forbidden in session.goal, false);
    assert.equal(forbidden in session.acceptedHandoffs[0], false);
  }
});

test("restore, expectation, caller-code, and coordinated-substitution attacks fail closed", () => {
  const fixture = makeFixture(
    [
      { id: "unit.a", dependencies: [] },
      { id: "unit.b", dependencies: ["unit.a"] },
    ],
    "adversarial-session",
  );
  const rawSession = encoder.encode(JSON.stringify(fixture.initialSession));
  const wrongExpectation = {
    compilationDigest: fixture.expectation.compilationDigest,
    packageDigest: `sha256:${"0".repeat(64)}`,
  };
  assertRejected(
    createSpecialistRunSession(fixture.specialistPackage, wrongExpectation),
    "SC4307",
    "create with wrong expectation",
  );
  assertRejected(
    restoreSpecialistRunSession(rawSession, wrongExpectation),
    "SC4307",
    "restore with wrong expectation",
  );
  assertRejected(
    inspectSpecialistRunSession(fixture.initialSession, wrongExpectation),
    "SC4307",
    "inspect with wrong expectation",
  );
  assertRejected(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      wrongExpectation,
      rawHandoff(fixture, "unit.a"),
    ),
    "SC4307",
    "record with wrong expectation",
  );

  const replacement = makeFixture(
    [
      { id: "unit.a", dependencies: [] },
      { id: "unit.b", dependencies: ["unit.a"] },
    ],
    "coordinated-replacement",
  );
  assertRejected(
    createSpecialistRunSession(replacement.specialistPackage, fixture.expectation),
    "SC4307",
    "coordinated package and contract replacement",
  );

  const malformedInputs = [
    [encoder.encode("{"), "malformed JSON"],
    [new Uint8Array([0xc3, 0x28]), "malformed UTF-8"],
    [
      encoder.encode(
        JSON.stringify(fixture.initialSession).replace(
          '"kind":"SpecialistRunSession"',
          '"kind":"SpecialistRunSession","kind":"SpecialistRunSession"',
        ),
      ),
      "duplicate key",
    ],
  ];
  for (const [bytes, name] of malformedInputs) {
    assertRejected(restoreSpecialistRunSession(bytes, fixture.expectation), "SC4401", name);
  }

  const unknown = structuredClone(fixture.initialSession);
  unknown.provider = "core-provider";
  assertRejected(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(unknown)), fixture.expectation),
    "SC4401",
    "unknown session field",
  );

  const unsafe = structuredClone(fixture.initialSession);
  unsafe.goal.integrationOwner = "codex\tmain";
  assertRejected(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(unsafe)), fixture.expectation),
    "SC4401",
    "unsafe control",
  );

  const surrogate = structuredClone(fixture.initialSession);
  surrogate.goal.integrationOwner = "codex\ud800main";
  assertRejected(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(surrogate)), fixture.expectation),
    "SC4401",
    "lone surrogate",
  );

  const secretValue = `sk-${"a".repeat(24)}`;
  const secret = structuredClone(fixture.initialSession);
  secret.goal.integrationOwner = secretValue;
  const secretResult = restoreSpecialistRunSession(
    encoder.encode(JSON.stringify(secret)),
    fixture.expectation,
  );
  assertRejected(secretResult, "SC4309", "secret-bearing session");
  assert.equal(JSON.stringify(secretResult).includes(secretValue), false);

  let callerReads = 0;
  const proxiedBytes = new Proxy(rawSession, {
    get() {
      callerReads += 1;
      throw new Error("caller code must not execute");
    },
  });
  assertRejected(
    restoreSpecialistRunSession(proxiedBytes, fixture.expectation),
    "SC4401",
    "proxied session bytes",
  );
  assert.equal(callerReads, 0);

  const accessorSession = structuredClone(fixture.initialSession);
  Object.defineProperty(accessorSession, "goal", {
    enumerable: true,
    get() {
      callerReads += 1;
      throw new Error("caller code must not execute");
    },
  });
  assertRejected(
    inspectSpecialistRunSession(accessorSession, fixture.expectation),
    "SC4401",
    "accessor session",
  );
  assert.equal(callerReads, 0);

  const deliveredPackage = structuredClone(fixture.specialistPackage);
  const detached = assertOk(
    createSpecialistRunSession(deliveredPackage, fixture.expectation),
    "detached session creation",
  );
  const detachedBytes = JSON.stringify(detached);
  deliveredPackage.files[0].content = "attacker mutation";
  assert.equal(JSON.stringify(detached), detachedBytes);
  assertDeepFrozen(detached);
});

test("handoff attacks, transition precedence, replay, and every non-pass route are closed", () => {
  const fixture = makeFixture(
    [
      { id: "unit.a", dependencies: [] },
      { id: "unit.b", dependencies: ["unit.a"] },
    ],
    "adversarial-handoff",
  );
  const initialBytes = JSON.stringify(fixture.initialSession);

  assertRejected(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      fixture.expectation,
      rawHandoff(fixture, "unit.b"),
    ),
    "SC4404",
    "premature dependent handoff",
  );
  assert.equal(JSON.stringify(fixture.initialSession), initialBytes);

  const stale = handoffFor(fixture, "unit.a");
  stale.goal.digest = `sha256:${"f".repeat(64)}`;
  assertRejected(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      fixture.expectation,
      encoder.encode(JSON.stringify(stale)),
    ),
    "SC4311",
    "stale handoff",
  );

  const unknown = handoffFor(fixture, "unit.a");
  unknown.executor = "core";
  assertRejected(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      fixture.expectation,
      encoder.encode(JSON.stringify(unknown)),
    ),
    "SC4310",
    "unknown handoff field",
  );

  const handoffSecretValue = `sk-${"b".repeat(24)}`;
  const secret = handoffFor(fixture, "unit.a");
  secret.summary = handoffSecretValue;
  const secretResult = recordSpecialistRunHandoff(
    fixture.initialSession,
    fixture.expectation,
    encoder.encode(JSON.stringify(secret)),
  );
  assertRejected(secretResult, "SC4309", "secret-bearing handoff");
  assert.equal(JSON.stringify(secretResult).includes(handoffSecretValue), false);

  const surrogate = handoffFor(fixture, "unit.a");
  surrogate.summary = "bad\ud800summary";
  assertRejected(
    recordSpecialistRunHandoff(
      fixture.initialSession,
      fixture.expectation,
      encoder.encode(JSON.stringify(surrogate)),
    ),
    "SC4310",
    "lone-surrogate handoff",
  );

  const validRaw = rawHandoff(fixture, "unit.a");
  const duplicate = encoder.encode(
    Buffer.from(validRaw)
      .toString("utf8")
      .replace('"outcome":"pass"', '"outcome":"pass","outcome":"fix"'),
  );
  assertRejected(
    recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, duplicate),
    "SC4310",
    "duplicate handoff key",
  );
  assertRejected(
    recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, encoder.encode("{")),
    "SC4310",
    "malformed handoff",
  );

  const mutableRaw = rawHandoff(fixture, "unit.a");
  const first = assertOk(
    recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, mutableRaw),
    "first pass handoff",
  );
  const storedBase64 = first.acceptedHandoffs[0].rawBase64;
  mutableRaw.fill(0);
  assert.equal(first.acceptedHandoffs[0].rawBase64, storedBase64);
  const restoredFirst = assertOk(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(first)), fixture.expectation),
    "restore after caller byte mutation",
  );
  assert.deepEqual(restoredFirst, first);

  const replay = assertOk(
    recordSpecialistRunHandoff(first, fixture.expectation, rawHandoff(fixture, "unit.a")),
    "exact replay",
  );
  assert.deepEqual(replay, first);

  const conflicting = handoffFor(fixture, "unit.a");
  conflicting.summary = "A different but otherwise valid settlement.";
  const conflict = recordSpecialistRunHandoff(
    first,
    fixture.expectation,
    encoder.encode(JSON.stringify(conflicting)),
  );
  assertRejected(conflict, "SC4403", "conflicting settlement");
  assert.equal(diagnosticCodes(conflict).includes("SC4405"), false);

  const complete = assertOk(
    recordSpecialistRunHandoff(first, fixture.expectation, rawHandoff(fixture, "unit.b")),
    "dependent pass handoff",
  );
  const completeInspection = assertOk(
    inspectSpecialistRunSession(complete, fixture.expectation),
    "complete inspection",
  );
  assert.equal(completeInspection.stage, "integration_ready");
  assert.equal(completeInspection.integrationReady, true);
  assert.equal(completeInspection.specialistOutcome, "pass");

  for (const outcome of ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"]) {
    const routedRaw = rawHandoff(fixture, "unit.a", outcome);
    const routed = assertOk(
      recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, routedRaw),
      `${outcome} handoff`,
    );
    const inspection = assertOk(
      inspectSpecialistRunSession(routed, fixture.expectation),
      `${outcome} inspection`,
    );
    assert.equal(inspection.stage, "routed");
    assert.equal(inspection.specialistOutcome, outcome);
    assert.equal(inspection.integrationReady, false);
    assert.deepEqual(inspection.dependencyEligibleContracts, []);
    assert.equal(
      inspection.agents
        .filter((agent) => agent.outcome === null)
        .every((agent) => agent.status === "session_routed"),
      true,
    );

    const routedReplay = assertOk(
      recordSpecialistRunHandoff(routed, fixture.expectation, routedRaw),
      `${outcome} replay`,
    );
    assert.deepEqual(routedReplay, routed);

    const late = recordSpecialistRunHandoff(
      routed,
      fixture.expectation,
      rawHandoff(fixture, "unit.b"),
    );
    assertRejected(late, "SC4405", `${outcome} late settlement`);
    assert.equal(diagnosticCodes(late).includes("SC4404"), false);
  }
});
