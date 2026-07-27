import assert from "node:assert/strict";
import test from "node:test";
import { STORAGE_KEY, loadWorkspace, saveWorkspace } from "../src/storage.js";

const workspace = { schemaVersion: 1, components: [], changedIds: [] };

test("storage loads an absent workspace and persists a valid workspace", () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  assert.equal(STORAGE_KEY, "impact-planner.workspace.v1");
  assert.deepEqual(loadWorkspace(storage), { ok: true, value: null });
  assert.equal(saveWorkspace(storage, workspace).ok, true);
  assert.deepEqual(loadWorkspace(storage), { ok: true, value: workspace });
});

test("storage fails safely for unavailable or malformed storage", () => {
  const unavailable = { getItem() { throw new Error("no read"); }, setItem() { throw new Error("no write"); } };
  assert.equal(loadWorkspace(unavailable).ok, false);
  assert.equal(saveWorkspace(unavailable, workspace).ok, false);
  assert.equal(loadWorkspace({ getItem: () => "not-json" }).ok, false);
});
