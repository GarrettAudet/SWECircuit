import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import {
  assessSpecialistHandoffs,
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistHandoff,
} from "../dist/index.js";

const encoder = new TextEncoder();

function fixture(name) {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/specialist-compiler/${name}.json`, import.meta.url), "utf8"),
  );
}

function setup(name = "under-split") {
  const compilationResult = compileAgentBlueprints(fixture(name).request);
  assert.equal(compilationResult.ok, true, JSON.stringify(compilationResult.diagnostics));
  assert.notEqual(compilationResult.value, null);
  const renderedResult = renderSpecialistPackage(compilationResult.value);
  assert.equal(renderedResult.ok, true, JSON.stringify(renderedResult.diagnostics));
  assert.notEqual(renderedResult.value, null);
  return {
    compilation: compilationResult.value,
    specialistPackage: renderedResult.value,
    expectation: {
      compilationDigest: compilationResult.value.contentDigest,
      packageDigest: renderedResult.value.packageDigest,
    },
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
    risks: outcome === "pass" ? [] : ["Integration must not treat this handoff as PASS."],
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

test("raw specialist handoffs verify exact package, blueprint, evidence, and artifact bindings", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const producer = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 0);
  assert.notEqual(producer, undefined);
  const handoff = handoffFor(compilation, producer);
  const bytes = raw(handoff);

  const result = verifySpecialistHandoff(specialistPackage, expectation, bytes);

  assert.equal(result.ok, true, JSON.stringify(result.diagnostics));
  assert.notEqual(result.value, null);
  assert.equal(result.value.handoff.outcome, "pass");
  assert.equal(result.value.rawBytes, bytes.byteLength);
  assert.equal(
    result.value.rawDigest,
    `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
  );
  assert.deepEqual(
    result.value.artifactBindings.map((artifact) => artifact.name),
    producer.handoff.artifacts,
  );
  assert.match(result.value.semanticDigest, /^sha256:[0-9a-f]{64}$/);
  assert.match(result.value.contentDigest, /^sha256:[0-9a-f]{64}$/);
  assertDeepFrozen(result.value);
});

test("handoff verification fails closed on stale identity, incomplete evidence, malformed JSON, and secrets", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const producer = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 0);
  assert.notEqual(producer, undefined);
  const baseline = handoffFor(compilation, producer);

  const stale = structuredClone(baseline);
  stale.goal.digest = `sha256:${"f".repeat(64)}`;
  assertRejected(verifySpecialistHandoff(specialistPackage, expectation, raw(stale)), "SC4311");

  const incomplete = structuredClone(baseline);
  incomplete.evidence = [];
  assertRejected(
    verifySpecialistHandoff(specialistPackage, expectation, raw(incomplete)),
    "SC4312",
  );

  const extra = structuredClone(baseline);
  extra.unapproved = true;
  assertRejected(verifySpecialistHandoff(specialistPackage, expectation, raw(extra)), "SC4310");

  const secret = structuredClone(baseline);
  secret.summary = `sk-${"a".repeat(24)}`;
  assertRejected(verifySpecialistHandoff(specialistPackage, expectation, raw(secret)), "SC4309");

  const json = JSON.stringify(baseline);
  const duplicate = encoder.encode(
    json.replace('"outcome":"pass"', '"outcome":"pass","outcome":"fix"'),
  );
  assertRejected(verifySpecialistHandoff(specialistPackage, expectation, duplicate), "SC4310");

  assertRejected(
    verifySpecialistHandoff(
      specialistPackage,
      { ...expectation, packageDigest: `sha256:${"0".repeat(64)}` },
      raw(baseline),
    ),
    "SC4307",
  );
});

test("handoff verification binds artifact media types and permits only normalized LF controls", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const producer = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 0);
  assert.notEqual(producer, undefined);
  const baseline = handoffFor(compilation, producer);

  baseline.artifacts[0].content = "First line.\nSecond line.";
  const normalized = verifySpecialistHandoff(specialistPackage, expectation, raw(baseline));
  assert.equal(normalized.ok, true, JSON.stringify(normalized.diagnostics));

  for (const control of ["\r", "\r\n", "\t"]) {
    const unsafe = structuredClone(baseline);
    unsafe.artifacts[0].content = `First${control}Second`;
    assertRejected(verifySpecialistHandoff(specialistPackage, expectation, raw(unsafe)), "SC4310");
  }

  const substitutedMediaType = structuredClone(baseline);
  substitutedMediaType.artifacts[0].mediaType = "text/markdown";
  assertRejected(
    verifySpecialistHandoff(specialistPackage, expectation, raw(substitutedMediaType)),
    "SC4312",
  );
});

test("fan-in is ready only for one PASS handoff from every exact transitive dependency", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const target = compilation.blueprints.find((blueprint) => blueprint.dependencies.length > 0);
  assert.notEqual(target, undefined);
  const dependency = compilation.blueprints.find(
    (blueprint) => blueprint.id === target.dependencies[0],
  );
  assert.notEqual(dependency, undefined);

  const missing = assessSpecialistHandoffs(specialistPackage, expectation, target.id, []);
  assert.equal(missing.ok, true);
  assert.notEqual(missing.value, null);
  assert.equal(missing.value.integrationReady, false);
  assert.deepEqual(missing.value.requiredAgentIds, [dependency.id]);
  assert.deepEqual(missing.value.missingAgentIds, [dependency.id]);

  const passRaw = raw(handoffFor(compilation, dependency, "pass"));
  const ready = assessSpecialistHandoffs(specialistPackage, expectation, target.id, [passRaw]);
  assert.equal(ready.ok, true, JSON.stringify(ready.diagnostics));
  assert.notEqual(ready.value, null);
  assert.equal(ready.value.integrationReady, true);
  assert.deepEqual(ready.value.missingAgentIds, []);
  assert.deepEqual(
    ready.value.handoffs.map((handoff) => handoff.outcome),
    ["pass"],
  );

  const fixRaw = raw(handoffFor(compilation, dependency, "fix"));
  const revise = assessSpecialistHandoffs(specialistPackage, expectation, target.id, [fixRaw]);
  assert.equal(revise.ok, true, JSON.stringify(revise.diagnostics));
  assert.notEqual(revise.value, null);
  assert.equal(revise.value.integrationReady, false);
  assert.deepEqual(
    revise.value.handoffs.map((handoff) => handoff.outcome),
    ["fix"],
  );

  assertRejected(
    assessSpecialistHandoffs(specialistPackage, expectation, target.id, [passRaw, passRaw]),
    "SC4313",
  );
});

test("fan-in rejects valid handoffs from agents outside the target dependency closure", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const root = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 0);
  const dependent = compilation.blueprints.find((blueprint) => blueprint.dependencies.length > 0);
  assert.notEqual(root, undefined);
  assert.notEqual(dependent, undefined);

  const unrelatedRaw = raw(handoffFor(compilation, dependent, "pass"));
  assertRejected(
    assessSpecialistHandoffs(specialistPackage, expectation, root.id, [unrelatedRaw]),
    "SC4313",
  );
});
test("handoff byte boundaries reject proxies and accessors without invoking caller code", () => {
  const { compilation, specialistPackage, expectation } = setup();
  const target = compilation.blueprints.find((blueprint) => blueprint.dependencies.length > 0);
  assert.notEqual(target, undefined);
  const dependency = compilation.blueprints.find(
    (blueprint) => blueprint.id === target.dependencies[0],
  );
  assert.notEqual(dependency, undefined);
  const bytes = raw(handoffFor(compilation, dependency));

  let callerReads = 0;
  const proxiedBytes = new Proxy(bytes, {
    get() {
      callerReads += 1;
      throw new Error("caller code must not execute");
    },
  });
  assertRejected(verifySpecialistHandoff(specialistPackage, expectation, proxiedBytes), "SC4310");
  assert.equal(callerReads, 0);

  const accessorList = [];
  Object.defineProperty(accessorList, "0", {
    enumerable: true,
    get() {
      callerReads += 1;
      return bytes;
    },
  });
  assertRejected(
    assessSpecialistHandoffs(specialistPackage, expectation, target.id, accessorList),
    "SC4313",
  );
  assert.equal(callerReads, 0);
});
