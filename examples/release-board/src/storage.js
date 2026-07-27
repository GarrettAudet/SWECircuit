import { validateChecks } from "./model.js";

export const STORAGE_KEY = "release-board.checks.v1";
export const STORAGE_VERSION = 1;

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function serializeChecks(checks) {
  return JSON.stringify({ version: STORAGE_VERSION, checks: validateChecks(checks) });
}

export function parseChecks(text) {
  if (typeof text !== "string") {
    return null;
  }

  try {
    const envelope = JSON.parse(text);
    if (!isPlainObject(envelope) || Object.keys(envelope).length !== 2 ||
      !Object.prototype.hasOwnProperty.call(envelope, "version") ||
      !Object.prototype.hasOwnProperty.call(envelope, "checks") ||
      envelope.version !== STORAGE_VERSION) {
      return null;
    }
    return validateChecks(envelope.checks);
  } catch {
    return null;
  }
}
