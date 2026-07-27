export const CHECK_CATEGORIES = Object.freeze(["build", "test", "review", "docs"]);
export const CHECK_STATUSES = Object.freeze(["pending", "passed", "blocked"]);
export const CHECK_FILTERS = Object.freeze(["all", "blocked", "pending", "passed"]);

const CHECK_FIELDS = ["id", "title", "owner", "category", "status", "evidence"];
const PATCH_FIELDS = ["title", "owner", "category", "status", "evidence"];
const MAX_ID_LENGTH = 200;
const MAX_TITLE_LENGTH = 120;
const MAX_OWNER_LENGTH = 80;
const MAX_EVIDENCE_LENGTH = 1000;

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

export function validateCheck(check) {
  assertPlainObject(check, "check");
  assertExactFields(check, CHECK_FIELDS, "check");
  if (Object.keys(check).length !== CHECK_FIELDS.length) {
    throw new TypeError("check is missing required fields");
  }

  return {
    id: assertString(check.id, "id", 1, MAX_ID_LENGTH),
    title: assertString(check.title, "title", 1, MAX_TITLE_LENGTH),
    owner: assertString(check.owner, "owner", 1, MAX_OWNER_LENGTH),
    category: assertEnum(check.category, CHECK_CATEGORIES, "category"),
    status: assertEnum(check.status, CHECK_STATUSES, "status"),
    evidence: assertString(check.evidence, "evidence", 0, MAX_EVIDENCE_LENGTH)
  };
}

export function validateChecks(checks) {
  if (!Array.isArray(checks)) {
    throw new TypeError("checks must be an array");
  }

  const identifiers = new Set();
  return checks.map((check) => {
    const normalized = validateCheck(check);
    if (identifiers.has(normalized.id)) {
      throw new RangeError(`checks contains duplicate id: ${normalized.id}`);
    }
    identifiers.add(normalized.id);
    return normalized;
  });
}

export function addCheck(checks, check) {
  const normalizedChecks = validateChecks(checks);
  const normalizedCheck = validateCheck(check);
  if (normalizedChecks.some((existing) => existing.id === normalizedCheck.id)) {
    throw new RangeError(`checks contains duplicate id: ${normalizedCheck.id}`);
  }
  return [...normalizedChecks, normalizedCheck];
}

export function updateCheck(checks, id, patch) {
  const normalizedChecks = validateChecks(checks);
  const normalizedId = assertString(id, "id", 1, MAX_ID_LENGTH);
  assertPlainObject(patch, "patch");
  assertExactFields(patch, PATCH_FIELDS, "patch");

  const index = normalizedChecks.findIndex((check) => check.id === normalizedId);
  if (index === -1) {
    throw new RangeError(`check was not found: ${normalizedId}`);
  }

  const updated = validateCheck({ ...normalizedChecks[index], ...patch });
  return normalizedChecks.map((check, currentIndex) => currentIndex === index ? updated : check);
}

export function removeCheck(checks, id) {
  const normalizedChecks = validateChecks(checks);
  const normalizedId = assertString(id, "id", 1, MAX_ID_LENGTH);
  const filtered = normalizedChecks.filter((check) => check.id !== normalizedId);
  if (filtered.length === normalizedChecks.length) {
    throw new RangeError(`check was not found: ${normalizedId}`);
  }
  return filtered;
}

export function filterChecks(checks, filter = "all") {
  const normalizedChecks = validateChecks(checks);
  const normalizedFilter = assertEnum(filter, CHECK_FILTERS, "filter");
  return normalizedFilter === "all"
    ? normalizedChecks
    : normalizedChecks.filter((check) => check.status === normalizedFilter);
}

export function summarizeChecks(checks) {
  const normalizedChecks = validateChecks(checks);
  const summary = { total: normalizedChecks.length, pending: 0, passed: 0, blocked: 0, ready: false };

  for (const check of normalizedChecks) {
    summary[check.status] += 1;
  }
  summary.ready = summary.total > 0 && summary.passed === summary.total && summary.blocked === 0;
  return summary;
}
