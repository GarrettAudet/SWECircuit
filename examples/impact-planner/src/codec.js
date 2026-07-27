export const SCHEMA_VERSION = 1;
export const MAX_IMPORT_BYTES = 65_536;
export const MAX_COMPONENTS = 50;

const UNSAFE_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const COMPONENT_KEYS = ["id", "name", "owner", "criticality", "dependsOn"];
const WORKSPACE_KEYS = ["schemaVersion", "components", "changedIds"];
const IDENTIFIER = /^[a-z0-9-]{1,32}$/;
const CRITICALITIES = new Set(["low", "medium", "high"]);

function failure(code, message) {
  return { ok: false, errors: [{ code, message }] };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype;
}

function hasExactKeys(value, keys) {
  const actual = Object.keys(value).sort();
  return actual.length === keys.length && actual.every((key, index) => key === [...keys].sort()[index]);
}

function containsUnsafeKey(value) {
  if (Array.isArray(value)) {
    return value.some(containsUnsafeKey);
  }
  if (!isPlainObject(value)) {
    return false;
  }
  return Object.keys(value).some((key) => UNSAFE_KEYS.has(key) || containsUnsafeKey(value[key]));
}

function validateIdentifier(value) {
  return typeof value === "string" && IDENTIFIER.test(value);
}

function validateWorkspace(workspace) {
  if (!isPlainObject(workspace) || containsUnsafeKey(workspace) || !hasExactKeys(workspace, WORKSPACE_KEYS)) {
    return failure("workspace", "Workspace must contain only schemaVersion, components, and changedIds.");
  }
  if (workspace.schemaVersion !== SCHEMA_VERSION) {
    return failure("version", `Workspace schemaVersion must be ${SCHEMA_VERSION}.`);
  }
  if (!Array.isArray(workspace.components) || !Array.isArray(workspace.changedIds)) {
    return failure("workspace", "Workspace components and changedIds must be arrays.");
  }
  if (workspace.components.length > MAX_COMPONENTS) {
    return failure("components", `Workspace cannot contain more than ${MAX_COMPONENTS} components.`);
  }

  const componentIds = new Set();
  const components = [];
  for (const component of workspace.components) {
    if (!isPlainObject(component) || !hasExactKeys(component, COMPONENT_KEYS)) {
      return failure("component", "Each component must contain only id, name, owner, criticality, and dependsOn.");
    }
    if (!validateIdentifier(component.id)) {
      return failure("identifier", "Component identifiers must be lowercase ASCII letters, digits, or hyphens (1-32 characters).");
    }
    if (componentIds.has(component.id)) {
      return failure("duplicate", `Duplicate component identifier: ${component.id}.`);
    }
    if (typeof component.name !== "string" || component.name.trim() === "" ||
        typeof component.owner !== "string" || component.owner.trim() === "" ||
        !CRITICALITIES.has(component.criticality) || !Array.isArray(component.dependsOn) ||
        !component.dependsOn.every(validateIdentifier)) {
      return failure("component", `Component ${component.id} has malformed values.`);
    }
    componentIds.add(component.id);
    components.push({
      id: component.id,
      name: component.name,
      owner: component.owner,
      criticality: component.criticality,
      dependsOn: [...new Set(component.dependsOn)].sort()
    });
  }

  if (!workspace.changedIds.every(validateIdentifier)) {
    return failure("changedIds", "changedIds must contain valid component identifiers.");
  }

  return {
    ok: true,
    value: {
      schemaVersion: SCHEMA_VERSION,
      components: components.sort((left, right) => left.id.localeCompare(right.id)),
      changedIds: [...new Set(workspace.changedIds)].sort()
    }
  };
}

export function parseWorkspace(text) {
  if (typeof text !== "string") {
    return failure("input", "Workspace import must be text.");
  }
  if (new TextEncoder().encode(text).byteLength > MAX_IMPORT_BYTES) {
    return failure("size", `Workspace import cannot exceed ${MAX_IMPORT_BYTES} UTF-8 bytes.`);
  }

  try {
    const workspace = JSON.parse(text);
    if (containsUnsafeKey(workspace)) {
      return failure("unsafe-key", "Workspace contains an unsafe key.");
    }
    return validateWorkspace(workspace);
  } catch {
    return failure("json", "Workspace import must be valid JSON.");
  }
}

export function serializeWorkspace(workspace) {
  const result = validateWorkspace(workspace);
  if (!result.ok) {
    return result;
  }
  return { ok: true, value: `${JSON.stringify(result.value, null, 2)}\n` };
}
