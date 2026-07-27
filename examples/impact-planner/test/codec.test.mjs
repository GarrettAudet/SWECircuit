import assert from "node:assert/strict";
import test from "node:test";
import { MAX_COMPONENTS, MAX_IMPORT_BYTES, parseWorkspace, SCHEMA_VERSION, serializeWorkspace } from "../src/codec.js";

const workspace = {
  schemaVersion: 1,
  components: [{ id: "api", name: "Public API", owner: "Platform", criticality: "high", dependsOn: ["database"] }, { id: "database", name: "Database", owner: "Platform", criticality: "high", dependsOn: [] }],
  changedIds: ["api"]
};

test("codec exports the closed schema constants and round-trips canonically", () => {
  assert.equal(SCHEMA_VERSION, 1);
  assert.equal(MAX_IMPORT_BYTES, 65_536);
  assert.equal(MAX_COMPONENTS, 50);
  const serialized = serializeWorkspace({ ...workspace, components: [...workspace.components].reverse() });
  assert.equal(serialized.ok, true);
  assert.equal(serialized.value.endsWith("\n"), true);
  assert.deepEqual(parseWorkspace(serialized.value), { ok: true, value: workspace });
});

test("codec rejects malformed, oversized, unsafe, and duplicate input", () => {
  const invalid = [
    "not-json",
    JSON.stringify({ ...workspace, schemaVersion: 2 }),
    JSON.stringify({ ...workspace, extra: true }),
    JSON.stringify({ ...workspace, components: [workspace.components[0], workspace.components[0]] }),
    '{"schemaVersion":1,"components":[],"changedIds":[],"__proto__":{}}',
    "x".repeat(MAX_IMPORT_BYTES + 1)
  ];
  for (const text of invalid) {
    assert.equal(parseWorkspace(text).ok, false);
  }
});

test("serialization does not mutate caller-owned arrays or objects", () => {
  const input = { ...workspace, components: [...workspace.components], changedIds: ["api", "api"] };
  const before = structuredClone(input);
  assert.equal(serializeWorkspace(input).ok, true);
  assert.deepEqual(input, before);
});
