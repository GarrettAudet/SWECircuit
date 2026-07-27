import assert from "node:assert/strict";
import test from "node:test";
import {
  addCheck,
  filterChecks,
  removeCheck,
  summarizeChecks,
  updateCheck,
  validateCheck,
  validateChecks
} from "../src/model.js";

function check(overrides = {}) {
  return {
    id: "check-1",
    title: "Run regression suite",
    owner: "Engineering",
    category: "test",
    status: "pending",
    evidence: "",
    ...overrides
  };
}

test("validateCheck normalizes all string fields without mutating the caller", () => {
  const source = check({ id: "  check-1  ", title: "  Run tests  ", owner: "  Engineering  ", evidence: "  run-42  " });
  const normalized = validateCheck(source);

  assert.deepEqual(normalized, check({ evidence: "run-42", title: "Run tests" }));
  assert.equal(normalized.id, "check-1");
  assert.equal(normalized.owner, "Engineering");
  assert.equal(source.title, "  Run tests  ");
  assert.notEqual(normalized, source);
});

test("validation rejects incomplete, unknown, duplicate, and closed-value checks", () => {
  assert.throws(() => validateCheck({ id: "check-1" }), /missing/);
  assert.throws(() => validateCheck({ ...check(), extra: true }), /unsupported/);
  assert.throws(() => validateCheck(check({ category: "release" })), /category/);
  assert.throws(() => validateCheck(check({ status: "done" })), /status/);
  assert.throws(() => validateChecks([check(), check()]), /duplicate/);
});

test("add, update, and remove return new collections and preserve existing inputs", () => {
  const original = [check()];
  const added = addCheck(original, check({ id: "check-2", title: "Review notes", category: "review" }));
  const updated = updateCheck(added, "check-1", { status: "passed", evidence: "green" });
  const removed = removeCheck(updated, "check-2");

  assert.deepEqual(original, [check()]);
  assert.equal(added.length, 2);
  assert.deepEqual(updated[0], check({ status: "passed", evidence: "green" }));
  assert.deepEqual(removed, [check({ status: "passed", evidence: "green" })]);
  assert.notEqual(added, original);
  assert.notEqual(updated, added);
  assert.notEqual(removed, updated);
  assert.throws(() => updateCheck(original, "missing", { status: "passed" }), /not found/);
  assert.throws(() => removeCheck(original, "missing"), /not found/);
});

test("filters retain order and only allow the closed filter values", () => {
  const checks = [
    check({ id: "pending" }),
    check({ id: "blocked", status: "blocked", category: "build" }),
    check({ id: "passed", status: "passed", category: "docs" })
  ];

  assert.deepEqual(filterChecks(checks, "all").map((item) => item.id), ["pending", "blocked", "passed"]);
  assert.deepEqual(filterChecks(checks, "blocked").map((item) => item.id), ["blocked"]);
  assert.deepEqual(filterChecks(checks, "pending").map((item) => item.id), ["pending"]);
  assert.deepEqual(filterChecks(checks, "passed").map((item) => item.id), ["passed"]);
  assert.throws(() => filterChecks(checks, "review"), /filter/);
});

test("summary reports closed counts and readiness only for a non-empty all-passed board", () => {
  assert.deepEqual(summarizeChecks([]), { total: 0, pending: 0, passed: 0, blocked: 0, ready: false });
  assert.deepEqual(summarizeChecks([check({ status: "passed" })]), { total: 1, pending: 0, passed: 1, blocked: 0, ready: true });
  assert.deepEqual(
    summarizeChecks([check({ status: "passed" }), check({ id: "check-2", status: "blocked" })]),
    { total: 2, pending: 0, passed: 1, blocked: 1, ready: false }
  );
});
