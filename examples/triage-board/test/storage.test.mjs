import assert from "node:assert/strict";
import test from "node:test";
import { createIssue, serializeIssueCollection } from "../src/model.js";
import { loadIssues, saveIssues, STORAGE_KEY } from "../src/storage.js";

const NOW = "2026-07-27T12:00:00.000Z";

function createMemoryStorage(initial = null) {
  const values = new Map(initial === null ? [] : [[STORAGE_KEY, initial]]);
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    }
  };
}

test("loadIssues returns an empty collection for empty or malformed storage", () => {
  assert.deepEqual(loadIssues(createMemoryStorage()), []);
  assert.deepEqual(loadIssues(createMemoryStorage("not-json")), []);
  assert.deepEqual(loadIssues(null), []);
});

test("loadIssues returns a validated persisted collection", () => {
  const issues = [createIssue({ title: "Persisted" }, { id: "one", now: NOW })];
  assert.deepEqual(loadIssues(createMemoryStorage(serializeIssueCollection(issues))), issues);
});

test("saveIssues writes only valid serialized collections", () => {
  const storage = createMemoryStorage();
  const issues = [createIssue({ title: "Saved" }, { id: "one", now: NOW })];

  assert.equal(saveIssues(storage, issues), true);
  assert.deepEqual(loadIssues(storage), issues);
  assert.throws(() => saveIssues(storage, [{ id: "bad" }]), /missing|required/);
});

test("saveIssues reports a failed storage write without throwing", () => {
  const failingStorage = {
    setItem() {
      throw new Error("quota exceeded");
    }
  };
  const issues = [createIssue({ title: "Unsaved" }, { id: "one", now: NOW })];

  assert.equal(saveIssues(failingStorage, issues), false);
  assert.equal(saveIssues(null, issues), false);
});
