import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { spawnSync } from "node:child_process";
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
    blueprint: compilationResult.value.blueprints.find(
      (candidate) => candidate.dependencies.length === 0,
    ),
    compilation: compilationResult.value,
    expectation,
    rendered: renderedResult.value,
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

function passHandoffBytes(compilation, blueprint) {
  const artifacts = blueprint.handoff.artifacts.map((name) => ({
    name,
    mediaType: name.endsWith(".json")
      ? "application/json"
      : name.endsWith(".md")
        ? "text/markdown"
        : "text/plain",
    content: name.endsWith(".json") ? JSON.stringify({ status: "pass" }) : "# Evidence\n\nPass.\n",
  }));
  assert.notEqual(artifacts[0], undefined);
  return Buffer.from(
    JSON.stringify({
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "SpecialistAgentHandoff",
      outcome: "pass",
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
      summary: "Fresh-process filesystem purity evidence.",
      workUnitsCompleted: [...blueprint.workUnitIds],
      artifacts,
      evidence: blueprint.evidenceDuties.map((duty) => ({
        criterionId: duty.criterionId,
        requirementId: duty.requirementId,
        kind: duty.kind,
        duty: duty.duty,
        status: "pass",
        artifact: artifacts[0].name,
      })),
      assumptions: [],
      risks: [],
      followUps: [],
    }),
    "utf8",
  );
}

const NO_FILESYSTEM_READ_SCRIPT = String.raw`
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import fs, { readFileSync } from "node:fs";
import { syncBuiltinESMExports } from "node:module";

const payload = JSON.parse(readFileSync(0, "utf8"));
const sessionModule = await import(payload.moduleUrls.session);
const inspectionModule = await import(payload.moduleUrls.inspection);
const transitionModule = await import(payload.moduleUrls.transition);
const renderModule = await import(
  new URL("./specialist-render.js", payload.moduleUrls.session).href,
);
const beforePatch = renderModule.verifySpecialistPackage(payload.package, payload.expectation);
assert.equal(beforePatch.ok, true, JSON.stringify(beforePatch.diagnostics));
const filesystemReads = [];
const blockedRead = (name) => (...args) => {
  filesystemReads.push({
    name,
    target: typeof args[0] === "string" ? args[0] : String(args[0]),
  });
  throw new Error("Unexpected filesystem read through " + name);
};
for (const name of [
  "access",
  "accessSync",
  "createReadStream",
  "existsSync",
  "lstat",
  "lstatSync",
  "open",
  "openSync",
  "read",
  "readFile",
  "readFileSync",
  "readSync",
  "readdir",
  "readdirSync",
  "realpath",
  "realpathSync",
  "stat",
  "statSync",
]) {
  if (typeof fs[name] === "function") {
    fs[name] = blockedRead(name);
  }
}
for (const name of ["access", "lstat", "open", "readFile", "readdir", "realpath", "stat"]) {
  if (typeof fs.promises[name] === "function") {
    fs.promises[name] = blockedRead("promises." + name);
  }
}
syncBuiltinESMExports();
const afterPatch = renderModule.verifySpecialistPackage(payload.package, payload.expectation);
assert.equal(afterPatch.ok, true, JSON.stringify(afterPatch.diagnostics));

let result;
if (payload.operation === "create") {
  result = sessionModule.createSpecialistRunSession(payload.package, payload.expectation);
} else if (payload.operation === "restore") {
  result = sessionModule.restoreSpecialistRunSession(
    Buffer.from(payload.rawSessionBase64, "base64"),
    payload.expectation,
  );
} else if (payload.operation === "inspect") {
  result = inspectionModule.inspectSpecialistRunSession(payload.session, payload.expectation);
} else if (payload.operation === "record") {
  result = transitionModule.recordSpecialistRunHandoff(
    payload.session,
    payload.expectation,
    Buffer.from(payload.rawHandoffBase64, "base64"),
  );
} else {
  assert.fail("Unknown operation " + payload.operation);
}
assert.equal(result.ok, true, JSON.stringify({ diagnostics: result.diagnostics, filesystemReads }));
assert.notEqual(result.value, null);
assert.deepEqual(filesystemReads, []);
process.stdout.write(JSON.stringify({ operation: payload.operation, filesystemReads }));
`;

test("bundled specialist run schema has exact source parity", async () => {
  const { SPECIALIST_RUN_SCHEMA_SOURCE } = await import("../dist/specialist-run-schema-data.js");
  const exportedSchemaSource = readFileSync(
    new URL("../schemas/v1alpha1/specialist-run.schema.json", import.meta.url),
    "utf8",
  );
  assert.equal(SPECIALIST_RUN_SCHEMA_SOURCE, exportedSchemaSource);
  assert.deepEqual(JSON.parse(SPECIALIST_RUN_SCHEMA_SOURCE), JSON.parse(exportedSchemaSource));
});

test("create, restore, inspect, and record perform no first-use filesystem reads", () => {
  const { blueprint, compilation, expectation, session } = setup();
  assert.notEqual(blueprint, undefined);
  const rawHandoff = passHandoffBytes(compilation, blueprint);
  const payload = {
    package: session.package,
    expectation,
    session,
    rawSessionBase64: Buffer.from(JSON.stringify(session), "utf8").toString("base64"),
    rawHandoffBase64: rawHandoff.toString("base64"),
    moduleUrls: {
      session: new URL("../dist/specialist-run-session.js", import.meta.url).href,
      inspection: new URL("../dist/specialist-run-inspection.js", import.meta.url).href,
      transition: new URL("../dist/specialist-run-transition.js", import.meta.url).href,
    },
  };

  for (const operation of ["create", "restore", "inspect", "record"]) {
    const child = spawnSync(
      process.execPath,
      ["--input-type=module", "--eval", NO_FILESYSTEM_READ_SCRIPT],
      {
        input: JSON.stringify({ ...payload, operation }),
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 4 * 1024 * 1024,
      },
    );
    assert.equal(child.error, undefined, operation);
    assert.equal(child.status, 0, `${operation}: stdout=${child.stdout} stderr=${child.stderr}`);
    assert.deepEqual(JSON.parse(child.stdout), { operation, filesystemReads: [] });
  }
});
