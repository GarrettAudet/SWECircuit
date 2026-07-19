import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { digestCanonicalJson } from "../dist/canonical-json.js";
import { SPECIALIST_RUN_LIMITS } from "../dist/constants.js";
import {
  createSpecialistRunSession,
  validateSpecialistRunSession,
} from "../dist/specialist-run-session.js";
import { compileAgentBlueprints, renderSpecialistPackage } from "../dist/index.js";

const SESSION_DIGEST_DOMAIN = "swecircuit/specialist-run/session/v1alpha1";

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

  return {
    blueprint: compilationResult.value.blueprints[0],
    expectation,
    session: sessionResult.value,
  };
}

function sessionWithRawBase64(session, blueprint, rawBase64, rawBytes) {
  const candidate = structuredClone(session);
  candidate.acceptedHandoffs = [
    {
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      outcome: "pass",
      rawEncoding: "base64",
      rawBytes,
      rawDigest: `sha256:${"0".repeat(64)}`,
      rawBase64,
    },
  ];
  const { contentDigest: _contentDigest, ...base } = candidate;
  candidate.contentDigest = digestCanonicalJson(SESSION_DIGEST_DOMAIN, base);
  return candidate;
}

function codes(result) {
  return result.diagnostics.map((diagnostic) => diagnostic.code);
}

test("decoded handoff overflow is SC4402 while malformed base64 remains SC4401", () => {
  const { blueprint, expectation, session } = setup();
  assert.notEqual(blueprint, undefined);

  const oversizedRawBase64 = Buffer.alloc(SPECIALIST_RUN_LIMITS.rawHandoffBytes + 1).toString(
    "base64",
  );
  assert.equal(oversizedRawBase64.length, SPECIALIST_RUN_LIMITS.rawHandoffBase64Chars);

  const oversized = validateSpecialistRunSession(
    sessionWithRawBase64(
      session,
      blueprint,
      oversizedRawBase64,
      SPECIALIST_RUN_LIMITS.rawHandoffBytes,
    ),
    expectation,
  );
  assert.equal(oversized.ok, false);
  assert.equal(oversized.value, null);
  assert.deepEqual(codes(oversized), ["SC4402"]);

  const malformed = validateSpecialistRunSession(
    sessionWithRawBase64(session, blueprint, "AB==", 1),
    expectation,
  );
  assert.equal(malformed.ok, false);
  assert.equal(malformed.value, null);
  assert.deepEqual(codes(malformed), ["SC4401"]);
});
