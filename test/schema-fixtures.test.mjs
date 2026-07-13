import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { Ajv2020 } from "ajv/dist/2020.js";
import { parseTree } from "jsonc-parser";

const SCHEMA_FILES = {
  Project: "project.schema.json",
  Module: "module.schema.json",
  Circuit: "circuit.schema.json",
  WorkPacket: "work-packet.schema.json",
  RunEvent: "run-event.schema.json",
  AdapterManifest: "adapter-manifest.schema.json",
};

const VALID_FIXTURES = {
  Project: "project.json",
  Module: "module.json",
  Circuit: "circuit.json",
  WorkPacket: "work-packet.json",
  RunEvent: "run-event.json",
  AdapterManifest: "adapter-manifest.json",
};

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

async function createRegistry() {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const root = new URL("../schemas/v1alpha1/", import.meta.url);
  ajv.addSchema(await readJson(new URL("common.schema.json", root)));

  const schemas = {};
  for (const [kind, file] of Object.entries(SCHEMA_FILES)) {
    const schema = await readJson(new URL(file, root));
    schemas[kind] = schema;
    ajv.addSchema(schema);
  }

  return { ajv, schemas };
}

function collectObjectPaths(value, path = [], result = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      collectObjectPaths(entry, [...path, index], result);
    });
    return result;
  }

  if (value !== null && typeof value === "object") {
    result.push(path);
    for (const [key, entry] of Object.entries(value)) {
      collectObjectPaths(entry, [...path, key], result);
    }
  }

  return result;
}

function valueAtPath(value, path) {
  return path.reduce((current, segment) => current[segment], value);
}

function collectRefs(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((entry) => {
      collectRefs(entry, result);
    });
    return result;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key === "$ref") {
        result.push(entry);
      } else {
        collectRefs(entry, result);
      }
    }
  }

  return result;
}

function findDuplicateKeys(node, result = []) {
  if (!node) {
    return result;
  }

  if (node.type === "object") {
    const seen = new Set();
    for (const property of node.children ?? []) {
      const key = property.children?.[0]?.value;
      if (seen.has(key)) {
        result.push(key);
      }
      seen.add(key);
      findDuplicateKeys(property.children?.[1], result);
    }
  } else {
    for (const child of node.children ?? []) {
      findDuplicateKeys(child, result);
    }
  }

  return result;
}

test("the diagnostic catalog and adversarial matrix are closed and internally consistent", async () => {
  const catalog = await readJson(
    new URL("../schemas/v1alpha1/diagnostic-catalog.json", import.meta.url),
  );
  const matrix = await readJson(new URL("./fixtures/case-matrix.json", import.meta.url));

  const codes = catalog.diagnostics.map((entry) => entry.code);
  const rules = catalog.diagnostics.map((entry) => entry.rule);
  assert.equal(new Set(codes).size, codes.length);
  assert.equal(new Set(rules).size, rules.length);
  codes.forEach((code) => {
    assert.match(code, /^SC[0-9]{4}$/);
  });

  const knownRules = new Set(rules);
  for (const fixture of matrix.mustHave) {
    const expectedRules = fixture.rules ?? (fixture.rule ? [fixture.rule] : []);
    expectedRules.forEach((rule) => {
      assert.equal(knownRules.has(rule), true, `${fixture.id} references unknown rule ${rule}`);
    });
  }
  for (const deferred of matrix.deferredNativeBoundary) {
    assert.match(deferred.id, /^X[0-9]{2}$/);
    assert.equal(typeof deferred.boundary, "string");
    assert.equal(typeof deferred.reason, "string");
  }

  assert.deepEqual(matrix.atLimitControls, matrix.limits);
  assert.equal(matrix.limits.circuitEdges, 10000);
  assert.equal(matrix.platformSets.ALL.length, 6);

  const secretWarning = catalog.diagnostics.find(
    (entry) => entry.rule === "privacy.secret-pattern",
  );
  assert.deepEqual(
    {
      severity: secretWarning.severity,
      exitClass: secretWarning.exitClass,
    },
    {
      severity: "warning",
      exitClass: 0,
    },
  );
});

test("every concrete object boundary in all six valid fixtures rejects unknown fields", async () => {
  const { ajv, schemas } = await createRegistry();
  const fixtureRoot = new URL("./fixtures/valid/", import.meta.url);

  for (const [kind, file] of Object.entries(VALID_FIXTURES)) {
    const fixture = await readJson(new URL(file, fixtureRoot));
    const validate = ajv.getSchema(schemas[kind].$id);
    const objectPaths = collectObjectPaths(fixture);

    for (const path of objectPaths) {
      const candidate = structuredClone(fixture);
      valueAtPath(candidate, path).__unexpected = true;
      assert.equal(
        validate(candidate),
        false,
        `${kind} allowed an unknown field at /${path.join("/")}`,
      );
      assert.equal(
        validate.errors.some(
          (error) =>
            error.keyword === "additionalProperties" || error.keyword === "unevaluatedProperties",
        ),
        true,
        `${kind} did not report a closed-property violation at /${path.join("/")}`,
      );
    }
  }
});

test("the parallel circuit fixture declares fan-out, bounded work ownership, and one fan-in policy", async () => {
  const { ajv, schemas } = await createRegistry();
  const circuit = await readJson(new URL("./fixtures/valid/circuit-fanout.json", import.meta.url));
  const validate = ajv.getSchema(schemas.Circuit.$id);

  assert.equal(validate(circuit), true, JSON.stringify(validate.errors, null, 2));
  assert.equal(circuit.spec.fanOuts.length, 1);
  assert.equal(circuit.spec.joins.length, 1);
  assert.deepEqual(circuit.spec.fanOuts[0].branches, ["frontend", "backend"]);
  for (const branch of circuit.spec.fanOuts[0].branches) {
    const node = circuit.spec.nodes.find((candidate) => candidate.id === branch);
    assert.equal(typeof node.owner, "string");
    assert.equal(typeof node.workPacket, "string");
  }
});

test("schema boundaries reject permission, privacy, compatibility, and terminal-state ambiguity", async () => {
  const { ajv, schemas } = await createRegistry();
  const fixtureRoot = new URL("./fixtures/valid/", import.meta.url);

  const moduleFixture = await readJson(new URL("module.json", fixtureRoot));
  const validateModule = ajv.getSchema(schemas.Module.$id);
  const unknownPermission = structuredClone(moduleFixture);
  unknownPermission.spec.requiredPermissions[0].kind = "filesystem.execute";
  assert.equal(validateModule(unknownPermission), false);

  const freeFormCompatibility = structuredClone(moduleFixture);
  freeFormCompatibility.spec.compatibility.core = ">=0.9.0";
  assert.equal(validateModule(freeFormCompatibility), false);

  const eventFixture = await readJson(new URL("run-event.json", fixtureRoot));
  const validateEvent = ajv.getSchema(schemas.RunEvent.$id);
  const forbiddenPrompt = structuredClone(eventFixture);
  forbiddenPrompt.spec.prompt = "not allowed";
  assert.equal(validateEvent(forbiddenPrompt), false);

  const missingTerminalCode = structuredClone(eventFixture);
  missingTerminalCode.spec.attempt.state = "completed";
  assert.equal(validateEvent(missingTerminalCode), false);

  const wrongTerminalCode = structuredClone(eventFixture);
  wrongTerminalCode.spec.attempt.state = "failed";
  wrongTerminalCode.spec.attempt.terminalCode = "success";
  assert.equal(validateEvent(wrongTerminalCode), false);

  const proseEvidence = structuredClone(eventFixture);
  proseEvidence.spec.type = "evidence.recorded";
  delete proseEvidence.spec.stage;
  delete proseEvidence.spec.attempt;
  proseEvidence.spec.evidence = [
    { id: "evidence", kind: "artifact", ref: "captured prose is not a reference" },
  ];
  assert.equal(validateEvent(proseEvidence), false);

  const adapterFixture = await readJson(new URL("adapter-manifest.json", fixtureRoot));
  const validateAdapter = ajv.getSchema(schemas.AdapterManifest.$id);
  const inlineConfig = structuredClone(adapterFixture);
  inlineConfig.spec.config = { token: "not allowed" };
  assert.equal(validateAdapter(inlineConfig), false);
});

test("minimal projects and timestamp-free events remain valid", async () => {
  const { ajv, schemas } = await createRegistry();
  const fixtureRoot = new URL("./fixtures/valid/", import.meta.url);

  const project = await readJson(new URL("project.json", fixtureRoot));
  project.spec = { artifacts: [] };
  assert.equal(ajv.getSchema(schemas.Project.$id)(project), true);

  const event = await readJson(new URL("run-event.json", fixtureRoot));
  delete event.spec.time;
  assert.equal(ajv.getSchema(schemas.RunEvent.$id)(event), true);
});

test("package schemas use only local package-owned references and strict known keywords", async () => {
  const schemaRoot = new URL("../schemas/v1alpha1/", import.meta.url);

  for (const file of ["common.schema.json", ...Object.values(SCHEMA_FILES)]) {
    const schema = await readJson(new URL(file, schemaRoot));
    for (const ref of collectRefs(schema)) {
      assert.match(ref, /^(?:#|common[.]schema[.]json#)/);
    }
  }

  const strictAjv = new Ajv2020({ strict: true });
  assert.throws(
    () =>
      strictAjv.compile({
        type: "object",
        unknownPackageKeyword: true,
      }),
    /strict mode: unknown keyword/,
  );
  assert.throws(
    () =>
      strictAjv.compile({
        type: "object",
        properties: {
          remote: {
            $ref: "https://example.invalid/remote.schema.json",
          },
        },
      }),
    /can't resolve reference/,
  );
});

test("strict parser fixtures expose syntax and duplicate-key failures", async () => {
  const root = new URL("./fixtures/parser/", import.meta.url);

  for (const file of ["comment.json.txt", "trailing-comma.json.txt", "truncated-event.jsonl.txt"]) {
    const errors = [];
    parseTree(await readFile(new URL(file, root), "utf8"), errors, {
      allowTrailingComma: false,
      disallowComments: true,
    });
    assert.equal(errors.length > 0, true, `${file} was accepted`);
  }

  const duplicateTree = parseTree(
    await readFile(new URL("duplicate-key.json.txt", root), "utf8"),
    [],
    {
      allowTrailingComma: false,
      disallowComments: true,
    },
  );
  assert.deepEqual(findDuplicateKeys(duplicateTree), ["requiredPermissions"]);

  assert.throws(() => {
    new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from([0xc3, 0x28]));
  });
});
