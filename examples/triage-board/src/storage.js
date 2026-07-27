import { parseIssueCollection, serializeIssueCollection } from "./model.js";

export const STORAGE_KEY = "triage-board.issues.v1";

function canRead(storage) {
  return storage && typeof storage.getItem === "function";
}

export function loadIssues(storage) {
  if (!canRead(storage)) {
    return [];
  }

  try {
    const stored = storage.getItem(STORAGE_KEY);
    return stored === null || stored === "" ? [] : parseIssueCollection(stored);
  } catch {
    return [];
  }
}

export function saveIssues(storage, issues) {
  const serialized = serializeIssueCollection(issues);
  if (!storage || typeof storage.setItem !== "function") {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}
