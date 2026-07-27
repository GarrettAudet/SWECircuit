export const ISSUE_PRIORITIES = Object.freeze(["low", "medium", "high"]);
export const ISSUE_STATUSES = Object.freeze(["backlog", "in_progress", "done"]);

const ISSUE_FIELDS = [
  "id",
  "title",
  "details",
  "priority",
  "status",
  "createdAt",
  "updatedAt"
];
const CREATE_FIELDS = ["title", "details", "priority", "status"];
const PATCH_FIELDS = ["title", "details", "priority", "status"];
const ISO_8601_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(?:Z|[+-](\d{2}):(\d{2}))$/;

function assertPlainObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
}

function assertExactFields(value, allowedFields, name) {
  for (const key of Object.keys(value)) {
    if (!allowedFields.includes(key)) {
      throw new TypeError(`${name} contains unsupported field: ${key}`);
    }
  }
}

function assertString(value, name, minimum, maximum) {
  if (typeof value !== "string") {
    throw new TypeError(`${name} must be a string`);
  }

  const trimmed = value.trim();
  if (trimmed.length < minimum || trimmed.length > maximum) {
    throw new RangeError(`${name} must contain ${minimum}-${maximum} characters`);
  }
  return trimmed;
}

function assertEnum(value, allowed, name) {
  if (!allowed.includes(value)) {
    throw new RangeError(`${name} must be one of: ${allowed.join(", ")}`);
  }
  return value;
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year, month) {
  const monthLengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths[month - 1];
}

function assertIsoDate(value, name) {
  const match = typeof value === "string" ? ISO_8601_PATTERN.exec(value) : null;
  if (!match) {
    throw new TypeError(`${name} must be an ISO-8601 date string`);
  }

  const [, yearText, monthText, dayText, hourText, minuteText, secondText, offsetHourText, offsetMinuteText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const offsetHour = offsetHourText === undefined ? 0 : Number(offsetHourText);
  const offsetMinute = offsetMinuteText === undefined ? 0 : Number(offsetMinuteText);
  const hasValidCalendarDate = month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
  const hasValidClock = hour <= 23 && minute <= 59 && second <= 59;
  const hasValidOffset = offsetHour <= 23 && offsetMinute <= 59;

  if (!hasValidCalendarDate || !hasValidClock || !hasValidOffset || Number.isNaN(Date.parse(value))) {
    throw new TypeError(`${name} must be an ISO-8601 date string`);
  }
  return value;
}

function resolveNow(value) {
  const candidate = typeof value === "function" ? value() : value;
  if (candidate === undefined) {
    return new Date().toISOString();
  }
  if (candidate instanceof Date) {
    if (Number.isNaN(candidate.getTime())) {
      throw new TypeError("now must be a valid date");
    }
    return candidate.toISOString();
  }
  return assertIsoDate(candidate, "now");
}

function createId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `issue-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function validateCollection(issues) {
  if (!Array.isArray(issues)) {
    throw new TypeError("issues must be an array");
  }

  const identifiers = new Set();
  return issues.map((issue) => {
    const validIssue = validateIssue(issue);
    if (identifiers.has(validIssue.id)) {
      throw new RangeError(`issues contains duplicate id: ${validIssue.id}`);
    }
    identifiers.add(validIssue.id);
    return validIssue;
  });
}

export function validateIssue(issue) {
  assertPlainObject(issue, "issue");
  assertExactFields(issue, ISSUE_FIELDS, "issue");
  if (Object.keys(issue).length !== ISSUE_FIELDS.length) {
    throw new TypeError("issue is missing required fields");
  }

  return {
    id: assertString(issue.id, "id", 1, Number.MAX_SAFE_INTEGER),
    title: assertString(issue.title, "title", 1, 120),
    details: assertString(issue.details, "details", 0, 1000),
    priority: assertEnum(issue.priority, ISSUE_PRIORITIES, "priority"),
    status: assertEnum(issue.status, ISSUE_STATUSES, "status"),
    createdAt: assertIsoDate(issue.createdAt, "createdAt"),
    updatedAt: assertIsoDate(issue.updatedAt, "updatedAt")
  };
}

export function createIssue(input, options = {}) {
  assertPlainObject(input, "input");
  assertExactFields(input, CREATE_FIELDS, "input");
  assertPlainObject(options, "options");
  assertExactFields(options, ["id", "now"], "options");

  const now = resolveNow(options.now);
  return validateIssue({
    id: options.id === undefined ? createId() : options.id,
    title: input.title,
    details: input.details === undefined ? "" : input.details,
    priority: input.priority === undefined ? "medium" : input.priority,
    status: input.status === undefined ? "backlog" : input.status,
    createdAt: now,
    updatedAt: now
  });
}

export function updateIssue(issue, patch, options = {}) {
  const existing = validateIssue(issue);
  assertPlainObject(patch, "patch");
  assertExactFields(patch, PATCH_FIELDS, "patch");
  assertPlainObject(options, "options");
  assertExactFields(options, ["now"], "options");

  return validateIssue({
    ...existing,
    ...patch,
    createdAt: existing.createdAt,
    updatedAt: resolveNow(options.now)
  });
}

export function filterIssues(issues, filters = {}) {
  const validIssues = validateCollection(issues);
  assertPlainObject(filters, "filters");
  assertExactFields(filters, ["search", "status", "priority"], "filters");

  const search = filters.search === undefined ? "" : assertString(filters.search, "search", 0, 1000).toLocaleLowerCase();
  const status = filters.status === undefined || filters.status === "" ? undefined : assertEnum(filters.status, ISSUE_STATUSES, "status");
  const priority = filters.priority === undefined || filters.priority === "" ? undefined : assertEnum(filters.priority, ISSUE_PRIORITIES, "priority");

  return validIssues.filter((issue) => {
    const matchesSearch = !search || `${issue.title} ${issue.details}`.toLocaleLowerCase().includes(search);
    return matchesSearch && (!status || issue.status === status) && (!priority || issue.priority === priority);
  });
}

export function groupIssues(issues) {
  const groups = { backlog: [], in_progress: [], done: [] };
  for (const issue of validateCollection(issues)) {
    groups[issue.status].push(issue);
  }
  return groups;
}

export function serializeIssueCollection(issues) {
  return JSON.stringify({ version: 1, issues: validateCollection(issues) });
}

export function parseIssueCollection(text) {
  if (typeof text !== "string") {
    throw new TypeError("collection text must be a string");
  }

  let envelope;
  try {
    envelope = JSON.parse(text);
  } catch {
    throw new SyntaxError("collection text is not valid JSON");
  }

  assertPlainObject(envelope, "collection envelope");
  assertExactFields(envelope, ["version", "issues"], "collection envelope");
  if (envelope.version !== 1 || Object.keys(envelope).length !== 2) {
    throw new RangeError("collection envelope must have version 1 and issues");
  }
  return validateCollection(envelope.issues);
}

export function createSeedIssues(options = {}) {
  assertPlainObject(options, "options");
  assertExactFields(options, ["ids", "now"], "options");
  const ids = options.ids === undefined ? [createId(), createId(), createId()] : options.ids;
  if (!Array.isArray(ids) || ids.length !== 3) {
    throw new TypeError("ids must contain exactly three identifiers");
  }

  const now = resolveNow(options.now);
  return [
    createIssue({ title: "Review incoming issues", priority: "high" }, { id: ids[0], now }),
    createIssue({ title: "Plan the next triage", priority: "medium", status: "in_progress" }, { id: ids[1], now }),
    createIssue({ title: "Welcome to the board", priority: "low", status: "done" }, { id: ids[2], now })
  ];
}
