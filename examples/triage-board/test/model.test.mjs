import assert from "node:assert/strict";
import test from "node:test";
import {
  createIssue,
  createSeedIssues,
  filterIssues,
  groupIssues,
  parseIssueCollection,
  serializeIssueCollection,
  updateIssue,
  validateIssue
} from "../src/model.js";

const CREATED = "2026-07-27T12:00:00.000Z";
const UPDATED = "2026-07-27T13:00:00.000Z";

test("createIssue normalizes values and supports deterministic identifiers and time", () => {
  const issue = createIssue(
    { title: "  Repair export  ", details: "  preserve valid data  ", priority: "high" },
    { id: "issue-1", now: CREATED }
  );

  assert.deepEqual(issue, {
    id: "issue-1",
    title: "Repair export",
    details: "preserve valid data",
    priority: "high",
    status: "backlog",
    createdAt: CREATED,
    updatedAt: CREATED
  });
});

test("schema validation rejects missing, unknown, invalid, and oversized issue fields", () => {
  const issue = createIssue({ title: "Valid" }, { id: "issue-1", now: CREATED });
  assert.throws(() => validateIssue({ ...issue, extra: true }), /unsupported field/);
  assert.throws(() => validateIssue({ ...issue, priority: "urgent" }), /priority/);
  assert.throws(() => validateIssue({ ...issue, createdAt: "yesterday" }), /ISO-8601/);
  assert.throws(() => createIssue({ title: "x".repeat(121) }, { id: "issue-2", now: CREATED }), /title/);
});

test("ISO validation rejects impossible month lengths and invalid leap days", () => {
  const issue = createIssue({ title: "Calendar validation" }, { id: "issue-1", now: CREATED });
  const impossibleDates = [
    "2026-02-31T12:00:00Z",
    "2026-04-31T12:00:00Z",
    "2025-02-29T12:00:00+05:30",
    "1900-02-29T12:00:00-07:00"
  ];

  for (const timestamp of impossibleDates) {
    assert.throws(() => validateIssue({ ...issue, updatedAt: timestamp }), /ISO-8601/);
  }
});

test("ISO validation accepts legitimate leap days and timezone offsets", () => {
  const validTimestamps = [
    "2024-02-29T23:15:00Z",
    "2000-02-29T12:00:00+05:30",
    "2024-02-29T01:45:00-07:00"
  ];

  for (const timestamp of validTimestamps) {
    const issue = createIssue({ title: "Valid leap day" }, { id: timestamp, now: timestamp });
    assert.equal(issue.createdAt, timestamp);
    assert.equal(issue.updatedAt, timestamp);
  }
});

test("updateIssue preserves identity and creation time while updating the timestamp", () => {
  const original = createIssue({ title: "Original", priority: "low" }, { id: "issue-1", now: CREATED });
  const updated = updateIssue(original, { title: "Updated", status: "done" }, { now: UPDATED });

  assert.equal(updated.id, "issue-1");
  assert.equal(updated.createdAt, CREATED);
  assert.equal(updated.updatedAt, UPDATED);
  assert.equal(updated.title, "Updated");
  assert.equal(updated.status, "done");
  assert.deepEqual(original, createIssue({ title: "Original", priority: "low" }, { id: "issue-1", now: CREATED }));
});

test("filterIssues searches titles and details and applies status and priority filters", () => {
  const issues = [
    createIssue({ title: "Export report", details: "JSON file", priority: "high" }, { id: "one", now: CREATED }),
    createIssue({ title: "Review board", details: "Waiting for input", priority: "low", status: "done" }, { id: "two", now: CREATED })
  ];

  assert.deepEqual(filterIssues(issues, { search: "json" }).map((issue) => issue.id), ["one"]);
  assert.deepEqual(filterIssues(issues, { status: "done", priority: "low" }).map((issue) => issue.id), ["two"]);
  assert.deepEqual(filterIssues(issues, {}).map((issue) => issue.id), ["one", "two"]);
});

test("groupIssues retains a stable issue order in all three status lanes", () => {
  const issues = createSeedIssues({ ids: ["one", "two", "three"], now: CREATED });
  const groups = groupIssues(issues);

  assert.deepEqual(Object.keys(groups), ["backlog", "in_progress", "done"]);
  assert.deepEqual(groups.backlog.map((issue) => issue.id), ["one"]);
  assert.deepEqual(groups.in_progress.map((issue) => issue.id), ["two"]);
  assert.deepEqual(groups.done.map((issue) => issue.id), ["three"]);
});

test("collection serialization round-trips and parse rejects unsafe envelopes", () => {
  const issues = [createIssue({ title: "Round trip" }, { id: "one", now: CREATED })];
  const serialized = serializeIssueCollection(issues);

  assert.deepEqual(parseIssueCollection(serialized), issues);
  assert.throws(() => parseIssueCollection('{"version":1,"issues":[],"extra":true}'), /unsupported field/);
  assert.throws(() => parseIssueCollection('{"version":1,"issues":[' + JSON.stringify(issues[0]) + ',' + JSON.stringify(issues[0]) + ']}'), /duplicate id/);
  assert.throws(() => parseIssueCollection("not-json"), /valid JSON/);
});

test("collection import rejects impossible dates and malformed envelopes", () => {
  const issue = createIssue({ title: "Imported" }, { id: "one", now: CREATED });
  const impossibleDates = [
    "2026-02-31T12:00:00Z",
    "2026-04-31T12:00:00-07:00",
    "2025-02-29T12:00:00+05:30"
  ];

  for (const timestamp of impossibleDates) {
    const text = JSON.stringify({ version: 1, issues: [{ ...issue, createdAt: timestamp }] });
    assert.throws(() => parseIssueCollection(text), /ISO-8601/);
  }

  const malformedEnvelopes = [
    null,
    [],
    { version: 1 },
    { version: 2, issues: [] },
    { version: 1, issues: {} }
  ];
  for (const envelope of malformedEnvelopes) {
    assert.throws(() => parseIssueCollection(JSON.stringify(envelope)));
  }
});
