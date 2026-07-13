import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { Ajv2020 } from "ajv/dist/2020.js";

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
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
  });
  const schemaRoot = new URL("../schemas/v1alpha1/", import.meta.url);
  ajv.addSchema(await readJson(new URL("common.schema.json", schemaRoot)));

  const schemas = {};
  for (const [kind, file] of Object.entries(SCHEMA_FILES)) {
    const schema = await readJson(new URL(file, schemaRoot));
    schemas[kind] = schema;
    ajv.addSchema(schema);
  }

  return { ajv, schemas };
}

test("all v1alpha1 schemas compile together in strict Ajv 2020 mode", async () => {
  const { ajv, schemas } = await createRegistry();

  for (const [kind, schema] of Object.entries(schemas)) {
    assert.equal(typeof ajv.getSchema(schema.$id), "function", `${kind} schema did not compile`);
  }
});

test("one canonical fixture for every supported kind passes its schema", async () => {
  const { ajv, schemas } = await createRegistry();
  const fixtureRoot = new URL("./fixtures/valid/", import.meta.url);

  for (const [kind, file] of Object.entries(VALID_FIXTURES)) {
    const fixture = await readJson(new URL(file, fixtureRoot));
    const validate = ajv.getSchema(schemas[kind].$id);

    assert.equal(fixture.kind, kind);
    assert.equal(validate(fixture), true, JSON.stringify(validate.errors, null, 2));
  }
});

test("schema and fixture paths are repository-owned local files", () => {
  const schemaPath = fileURLToPath(new URL("../schemas/v1alpha1/", import.meta.url));
  const fixturePath = fileURLToPath(new URL("./fixtures/valid/", import.meta.url));

  assert.equal(schemaPath.endsWith(join("schemas", "v1alpha1") + sep), true);
  assert.equal(fixturePath.endsWith(join("test", "fixtures", "valid") + sep), true);
});
