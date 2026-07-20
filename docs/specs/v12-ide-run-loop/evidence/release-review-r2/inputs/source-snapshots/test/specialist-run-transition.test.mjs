import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import { compileAgentBlueprints } from "../dist/specialist-compiler.js";
import { renderSpecialistPackage } from "../dist/specialist-render.js";
import {
  createSpecialistRunSession,
  restoreSpecialistRunSession,
} from "../dist/specialist-run-session.js";
import { recordSpecialistRunHandoff } from "../dist/specialist-run-transition.js";

const encoder = new TextEncoder();

function fixture(name) {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/specialist-compiler/${name}.json`, import.meta.url), "utf8"),
  );
}

function setup() {
  const compilationResult = compileAgentBlueprints(fixture("under-split").request);
  assert.equal(compilationResult.ok, true, JSON.stringify(compilationResult.diagnostics));
  assert.notEqual(compilationResult.value, null);
  const renderedResult = renderSpecialistPackage(compilationResult.value);
  assert.equal(renderedResult.ok, true, JSON.stringify(renderedResult.diagnostics));
  assert.notEqual(renderedResult.value, null);
  const expectation = {
    compilationDigest: compilationResult.value.contentDigest,
    packageDigest: renderedResult.value.packageDigest,
  };
  const sessionResult = createSpecialistRunSession(renderedResult.value, expectation);
  assert.equal(sessionResult.ok, true, JSON.stringify(sessionResult.diagnostics));
  assert.notEqual(sessionResult.value, null);

  const dependent = compilationResult.value.blueprints.find(
    (blueprint) => blueprint.dependencies.length > 0,
  );
  assert.notEqual(dependent, undefined);
  const dependency = compilationResult.value.blueprints.find(
    (blueprint) => blueprint.id === dependent.dependencies[0],
  );
  assert.notEqual(dependency, undefined);
  return {
    compilation: compilationResult.value,
    specialistPackage: renderedResult.value,
    expectation,
    session: sessionResult.value,
    dependency,
    dependent,
  };
}

function handoffFor(compilation, blueprint, outcome = "pass") {
  const artifactNames = blueprint.handoff.artifacts;
  assert.ok(artifactNames.length > 0);
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistAgentHandoff",
    outcome,
    destination: blueprint.handoff.destination,
    goal: {
      id: compilation.goal.id,
      revision: compilation.goal.revision,
      digest: compilation.goalDigest,
    },
    agent: {
      id: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
    },
    compilationDigest: compilation.contentDigest,
    summary:
      outcome === "pass"
        ? "Completed the exact specialist contract."
        : "Stopped with bounded evidence for integration.",
    workUnitsCompleted: outcome === "pass" ? [...blueprint.workUnitIds] : [],
    artifacts: artifactNames.map((name) => ({
      name,
      mediaType: "text/plain",
      content: `Evidence for ${name}.\nSecond line preserved.`,
    })),
    evidence: blueprint.evidenceDuties.map((duty, index) => ({
      criterionId: duty.criterionId,
      requirementId: duty.requirementId,
      kind: duty.kind,
      duty: duty.duty,
      status: outcome,
      artifact: artifactNames[index % artifactNames.length],
    })),
    assumptions: [],
    risks: outcome === "pass" ? [] : ["Integration must preserve the routed outcome."],
    followUps: [],
  };
}

function raw(value) {
  return encoder.encode(JSON.stringify(value));
}

function codes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

function assertRejected(result, code) {
  assert.equal(result.ok, false);
  assert.equal(result.value, null);
  assert.ok(codes(result).includes(code), JSON.stringify(result.diagnostics));
}

function assertDeepFrozen(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  assert.equal(Object.isFrozen(value), true);
  for (const entry of Object.values(value)) {
    assertDeepFrozen(entry, seen);
  }
}

test("recording is monotonic, dependency-gated, replay-safe, and source-preserving", () => {
  const { compilation, expectation, session, dependency, dependent } = setup();
  const initialBytes = JSON.stringify(session);
  const prematureRaw = raw(handoffFor(compilation, dependent));

  const premature = recordSpecialistRunHandoff(session, expectation, prematureRaw);
  assertRejected(premature, "SC4404");
  assert.equal(JSON.stringify(session), initialBytes);

  const dependencyRaw = raw(handoffFor(compilation, dependency));
  const first = recordSpecialistRunHandoff(session, expectation, dependencyRaw);
  assert.equal(first.ok, true, JSON.stringify(first.diagnostics));
  assert.notEqual(first.value, null);
  assert.equal(first.value.acceptedHandoffs.length, 1);
  assert.equal(first.value.acceptedHandoffs[0].agentId, dependency.id);
  assert.equal(first.value.acceptedHandoffs[0].outcome, "pass");
  assert.equal(first.value.acceptedHandoffs[0].rawBytes, dependencyRaw.byteLength);
  assert.equal(
    first.value.acceptedHandoffs[0].rawDigest,
    `sha256:${createHash("sha256").update(dependencyRaw).digest("hex")}`,
  );
  assert.equal(
    first.value.acceptedHandoffs[0].rawBase64,
    Buffer.from(dependencyRaw).toString("base64"),
  );
  assert.equal(JSON.stringify(session), initialBytes);
  assertDeepFrozen(first.value);

  const replay = recordSpecialistRunHandoff(first.value, expectation, dependencyRaw);
  assert.equal(replay.ok, true, JSON.stringify(replay.diagnostics));
  assert.deepEqual(replay.value, first.value);

  const conflictingHandoff = handoffFor(compilation, dependency);
  conflictingHandoff.summary = "A different but otherwise valid second handoff.";
  const conflict = recordSpecialistRunHandoff(first.value, expectation, raw(conflictingHandoff));
  assertRejected(conflict, "SC4403");
  assert.equal(codes(conflict).includes("SC4405"), false);

  const firstBytes = JSON.stringify(first.value);
  const second = recordSpecialistRunHandoff(first.value, expectation, prematureRaw);
  assert.equal(second.ok, true, JSON.stringify(second.diagnostics));
  assert.notEqual(second.value, null);
  assert.deepEqual(
    second.value.acceptedHandoffs.map((row) => row.agentId),
    [dependency.id, dependent.id].sort(),
  );
  assert.notEqual(second.value.contentDigest, first.value.contentDigest);
  assert.equal(JSON.stringify(first.value), firstBytes);
  assertDeepFrozen(second.value);

  const restored = restoreSpecialistRunSession(raw(second.value), expectation);
  assert.equal(restored.ok, true, JSON.stringify(restored.diagnostics));
  assert.deepEqual(restored.value, second.value);
});

test("every verified non-pass outcome records once and terminally routes later work", () => {
  const outcomes = ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"];

  for (const outcome of outcomes) {
    const { compilation, expectation, session, dependency, dependent } = setup();
    const routedRaw = raw(handoffFor(compilation, dependency, outcome));
    const routed = recordSpecialistRunHandoff(session, expectation, routedRaw);
    assert.equal(routed.ok, true, `${outcome}: ${JSON.stringify(routed.diagnostics)}`);
    assert.notEqual(routed.value, null);
    assert.equal(routed.value.acceptedHandoffs[0].outcome, outcome);

    const replay = recordSpecialistRunHandoff(routed.value, expectation, routedRaw);
    assert.equal(replay.ok, true, `${outcome}: ${JSON.stringify(replay.diagnostics)}`);
    assert.deepEqual(replay.value, routed.value);

    const conflictingHandoff = handoffFor(compilation, dependency, outcome);
    conflictingHandoff.summary = `Conflicting ${outcome} handoff.`;
    const conflict = recordSpecialistRunHandoff(routed.value, expectation, raw(conflictingHandoff));
    assertRejected(conflict, "SC4403");
    assert.equal(codes(conflict).includes("SC4405"), false);

    const before = JSON.stringify(routed.value);
    const afterRoute = recordSpecialistRunHandoff(
      routed.value,
      expectation,
      raw(handoffFor(compilation, dependent)),
    );
    assertRejected(afterRoute, "SC4405");
    assert.equal(codes(afterRoute).includes("SC4404"), false);
    assert.equal(JSON.stringify(routed.value), before);
  }
});

test("recording applies validation and handoff diagnostic precedence without caller mutation", () => {
  const { compilation, expectation, session, dependency } = setup();
  const invalidSession = structuredClone(session);
  invalidSession.contentDigest = `sha256:${"f".repeat(64)}`;

  let callerReads = 0;
  const proxiedBytes = new Proxy(raw(handoffFor(compilation, dependency)), {
    get() {
      callerReads += 1;
      throw new Error("raw handoff must not be read after session rejection");
    },
  });
  const invalidPrior = recordSpecialistRunHandoff(invalidSession, expectation, proxiedBytes);
  assertRejected(invalidPrior, "SC4401");
  assert.equal(codes(invalidPrior).includes("SC4310"), false);
  assert.equal(callerReads, 0);

  const dependencyRaw = raw(handoffFor(compilation, dependency));
  const settled = recordSpecialistRunHandoff(session, expectation, dependencyRaw);
  assert.equal(settled.ok, true, JSON.stringify(settled.diagnostics));
  assert.notEqual(settled.value, null);
  const settledBytes = JSON.stringify(settled.value);

  const malformed = recordSpecialistRunHandoff(settled.value, expectation, encoder.encode("{"));
  assertRejected(malformed, "SC4310");
  assert.equal(codes(malformed).includes("SC4403"), false);
  assert.equal(JSON.stringify(settled.value), settledBytes);

  const overLimit = recordSpecialistRunHandoff(session, expectation, new Uint8Array(1_048_577));
  assertRejected(overLimit, "SC4308");
  assert.equal(JSON.stringify(session.acceptedHandoffs), "[]");
});
