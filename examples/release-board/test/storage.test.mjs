import assert from "node:assert/strict";
import test from "node:test";
import { parseChecks, serializeChecks, STORAGE_KEY, STORAGE_VERSION } from "../src/storage.js";

const checks = [
  {
    id: "check-1",
    title: "Run regression suite",
    owner: "Engineering",
    category: "test",
    status: "pending",
    evidence: ""
  }
];

test("storage exposes a fixed key and schema version and round-trips normalized checks", () => {
  assert.equal(STORAGE_KEY, "release-board.checks.v1");
  assert.equal(STORAGE_VERSION, 1);
  assert.deepEqual(parseChecks(serializeChecks(checks)), checks);
  assert.deepEqual(parseChecks(serializeChecks([{ ...checks[0], title: "  Run regression suite  " }])), checks);
});

test("strict serialization rejects invalid checks", () => {
  assert.throws(() => serializeChecks([{ id: "check-1" }]), /missing/);
  assert.throws(() => serializeChecks([{ ...checks[0], status: "done" }]), /status/);
});

test("safe parsing returns null for malformed, wrong-version, and invalid data", () => {
  const invalidTexts = [
    null,
    "",
    "not-json",
    JSON.stringify([]),
    JSON.stringify({ version: 2, checks }),
    JSON.stringify({ version: 1, checks, extra: true }),
    JSON.stringify({ version: 1, checks: [{ ...checks[0], owner: " " }] }),
    JSON.stringify({ version: 1, checks: [checks[0], checks[0]] })
  ];

  for (const text of invalidTexts) {
    assert.equal(parseChecks(text), null);
  }
});
