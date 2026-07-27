import { parseWorkspace, serializeWorkspace } from "./codec.js";

export const STORAGE_KEY = "impact-planner.workspace.v1";

function storageFailure(operation) {
  return { ok: false, errors: [{ code: "storage", message: `Unable to ${operation} workspace storage.` }] };
}

export function loadWorkspace(storage) {
  try {
    const text = storage.getItem(STORAGE_KEY);
    return text === null ? { ok: true, value: null } : parseWorkspace(text);
  } catch {
    return storageFailure("read");
  }
}

export function saveWorkspace(storage, workspace) {
  const serialized = serializeWorkspace(workspace);
  if (!serialized.ok) {
    return serialized;
  }
  try {
    storage.setItem(STORAGE_KEY, serialized.value);
    return { ok: true, value: undefined };
  } catch {
    return storageFailure("write");
  }
}
