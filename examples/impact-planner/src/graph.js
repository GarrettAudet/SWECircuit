export const CRITICALITIES = Object.freeze(["low", "medium", "high"]);

const COMPONENT_FIELDS = Object.freeze(["id", "name", "owner", "criticality", "dependsOn"]);
const WORKSPACE_FIELDS = Object.freeze(["components", "changedIds"]);
const IDENTIFIER = /^[a-z0-9-]{1,32}$/;
const WEIGHTS = Object.freeze({ low: 1, medium: 2, high: 3 });

function failure(errors) {
  return { ok: false, errors };
}

function problem(code, message, details = {}) {
  return { code, message, ...details };
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : null;
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function comparePath(left, right) {
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    const comparison = compareText(left[index], right[index]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  return left.length - right.length;
}

function exactKeys(value, allowed, label, errors, details) {
  if (!isPlainObject(value)) {
    errors.push(problem("invalid-object", `${label} must be an object`, details));
    return false;
  }

  for (const key of Object.keys(value).sort(compareText)) {
    if (!allowed.includes(key)) {
      errors.push(problem("unknown-key", `${label} contains unsupported key: ${key}`, details));
    }
  }
  for (const key of allowed) {
    if (!Object.hasOwn(value, key)) {
      errors.push(problem("missing-key", `${label} is missing required key: ${key}`, details));
    }
  }
  return true;
}

function normalizeIdentifier(value, label, errors, details, code = "invalid-id") {
  const normalized = normalizeText(value);
  if (normalized === null || !IDENTIFIER.test(normalized)) {
    errors.push(problem(code, `${label} must be 1-32 lowercase ASCII letters, digits, or hyphens`, details));
    return null;
  }
  return normalized;
}

function normalizeComponent(value, index, errors) {
  const details = {};
  if (isPlainObject(value) && typeof value.id === "string") {
    details.componentId = value.id.trim();
  }
  if (!exactKeys(value, COMPONENT_FIELDS, `components[${index}]`, errors, details)) {
    return null;
  }

  const id = normalizeIdentifier(value.id, "component id", errors, details);
  const name = normalizeText(value.name);
  const owner = normalizeText(value.owner);
  if (name === null || name.length === 0) {
    errors.push(problem("invalid-name", "component name must be a non-empty string", details));
  }
  if (owner === null || owner.length === 0) {
    errors.push(problem("invalid-owner", "component owner must be a non-empty string", details));
  }
  const criticality = normalizeText(value.criticality);
  if (criticality === null || !CRITICALITIES.includes(criticality)) {
    errors.push(problem("invalid-criticality", "component criticality must be low, medium, or high", details));
  }

  const dependsOn = [];
  if (!Array.isArray(value.dependsOn)) {
    errors.push(problem("invalid-depends-on", "component dependsOn must be an array", details));
  } else {
    const dependencyIds = new Set();
    for (const dependency of value.dependsOn) {
      const dependencyId = normalizeIdentifier(
        dependency,
        "dependency id",
        errors,
        details,
        "invalid-dependency-id"
      );
      if (dependencyId === null) {
        continue;
      }
      if (dependencyIds.has(dependencyId)) {
        errors.push(problem("duplicate-dependency", `component has duplicate dependency: ${dependencyId}`, {
          ...details,
          dependencyId
        }));
        continue;
      }
      dependencyIds.add(dependencyId);
      dependsOn.push(dependencyId);
    }
  }

  if (id === null || name === null || name.length === 0 || owner === null || owner.length === 0 ||
      criticality === null || !CRITICALITIES.includes(criticality) || !Array.isArray(value.dependsOn)) {
    return null;
  }
  return { id, name, owner, criticality, dependsOn: dependsOn.sort(compareText) };
}

function normalizeComponents(components) {
  const errors = [];
  if (!Array.isArray(components)) {
    return failure([problem("invalid-components", "components must be an array")]);
  }

  const normalized = components.map((component, index) => normalizeComponent(component, index, errors)).filter(Boolean);
  const identifiers = new Set();
  for (const component of normalized) {
    if (identifiers.has(component.id)) {
      errors.push(problem("duplicate-component", `components contains duplicate id: ${component.id}`, { componentId: component.id }));
    }
    identifiers.add(component.id);
  }

  const knownIds = new Set(normalized.map((component) => component.id));
  for (const component of normalized) {
    for (const dependencyId of component.dependsOn) {
      if (dependencyId === component.id) {
        errors.push(problem("self-dependency", `component cannot depend on itself: ${component.id}`, {
          componentId: component.id,
          dependencyId
        }));
      } else if (!knownIds.has(dependencyId)) {
        errors.push(problem("unknown-dependency", `component dependency was not found: ${dependencyId}`, {
          componentId: component.id,
          dependencyId
        }));
      }
    }
  }

  if (errors.length > 0) {
    return failure(errors);
  }
  return { ok: true, value: normalized.sort((left, right) => compareText(left.id, right.id)) };
}

function findCycle(components) {
  const byId = new Map(components.map((component) => [component.id, component]));
  const visiting = new Set();
  const visited = new Set();
  const trail = [];

  function visit(id) {
    visiting.add(id);
    trail.push(id);
    for (const dependencyId of byId.get(id).dependsOn) {
      if (visiting.has(dependencyId)) {
        return [...trail.slice(trail.indexOf(dependencyId)), dependencyId];
      }
      if (!visited.has(dependencyId)) {
        const cycle = visit(dependencyId);
        if (cycle) {
          return cycle;
        }
      }
    }
    trail.pop();
    visiting.delete(id);
    visited.add(id);
    return null;
  }

  for (const component of components) {
    if (!visited.has(component.id)) {
      const cycle = visit(component.id);
      if (cycle) {
        return cycle;
      }
    }
  }
  return null;
}

function normalizeChangedIds(changedIds, knownIds) {
  const errors = [];
  if (!Array.isArray(changedIds)) {
    return failure([problem("invalid-changed-ids", "changedIds must be an array")]);
  }
  const normalized = [];
  const seen = new Set();
  for (const value of changedIds) {
    const id = normalizeIdentifier(value, "changed component id", errors, {}, "invalid-changed-id");
    if (id === null) {
      continue;
    }
    if (seen.has(id)) {
      errors.push(problem("duplicate-changed-id", `changedIds contains duplicate id: ${id}`, { componentId: id }));
      continue;
    }
    seen.add(id);
    if (!knownIds.has(id)) {
      errors.push(problem("unknown-changed-id", `changed component was not found: ${id}`, { componentId: id }));
      continue;
    }
    normalized.push(id);
  }
  return errors.length > 0 ? failure(errors) : { ok: true, value: normalized.sort(compareText) };
}

function canonicalGraph(components, changedIds) {
  const componentResult = normalizeComponents(components);
  if (!componentResult.ok) {
    return componentResult;
  }
  const cycle = findCycle(componentResult.value);
  if (cycle) {
    return failure([problem("dependency-cycle", `dependency cycle detected: ${cycle.join(" -> ")}`, {
      componentId: cycle[0],
      dependencyId: cycle[1]
    })]);
  }
  const changedResult = normalizeChangedIds(changedIds, new Set(componentResult.value.map((component) => component.id)));
  if (!changedResult.ok) {
    return changedResult;
  }
  return { ok: true, value: { components: componentResult.value, changedIds: changedResult.value } };
}

export function validateGraph(input) {
  const errors = [];
  if (!exactKeys(input, WORKSPACE_FIELDS, "graph", errors, {}) || errors.length > 0) {
    return failure(errors);
  }
  return canonicalGraph(input.components, input.changedIds);
}

export function upsertComponent(components, candidate) {
  const currentResult = normalizeComponents(components);
  if (!currentResult.ok) {
    return currentResult;
  }
  const candidateErrors = [];
  const normalizedCandidate = normalizeComponent(candidate, "candidate", candidateErrors);
  if (!normalizedCandidate || candidateErrors.length > 0) {
    return failure(candidateErrors);
  }
  const next = currentResult.value.filter((component) => component.id !== normalizedCandidate.id);
  next.push(normalizedCandidate);
  const result = canonicalGraph(next, []);
  return result.ok ? { ok: true, value: result.value.components } : result;
}

export function removeComponent(components, id) {
  const currentResult = normalizeComponents(components);
  if (!currentResult.ok) {
    return currentResult;
  }
  const errors = [];
  const normalizedId = normalizeIdentifier(id, "component id", errors, {});
  if (normalizedId === null) {
    return failure(errors);
  }
  if (!currentResult.value.some((component) => component.id === normalizedId)) {
    return failure([problem("missing-component", `component was not found: ${normalizedId}`, { componentId: normalizedId })]);
  }
  const next = currentResult.value
    .filter((component) => component.id !== normalizedId)
    .map((component) => ({ ...component, dependsOn: component.dependsOn.filter((dependencyId) => dependencyId !== normalizedId) }));
  return { ok: true, value: next };
}

export function analyzeImpact(components, changedIds) {
  const graphResult = canonicalGraph(components, changedIds);
  if (!graphResult.ok) {
    return graphResult;
  }
  const { components: canonicalComponents, changedIds: canonicalChangedIds } = graphResult.value;
  const byId = new Map(canonicalComponents.map((component) => [component.id, component]));
  const reverse = new Map(canonicalComponents.map((component) => [component.id, []]));
  for (const component of canonicalComponents) {
    for (const dependencyId of component.dependsOn) {
      reverse.get(dependencyId).push(component.id);
    }
  }
  for (const dependents of reverse.values()) {
    dependents.sort(compareText);
  }

  const routes = new Map();
  const queue = canonicalChangedIds.map((id) => ({ id, path: [id] }));
  for (const entry of queue) {
    routes.set(entry.id, entry.path);
  }
  let cursor = 0;
  while (cursor < queue.length) {
    const entry = queue[cursor];
    cursor += 1;
    for (const dependentId of reverse.get(entry.id)) {
      const path = [...entry.path, dependentId];
      const existing = routes.get(dependentId);
      if (!existing || path.length < existing.length || (path.length === existing.length && comparePath(path, existing) < 0)) {
        routes.set(dependentId, path);
        queue.push({ id: dependentId, path });
      }
    }
  }

  const changed = new Set(canonicalChangedIds);
  const affected = [...routes.entries()]
    .map(([id, path]) => ({
      id,
      distance: path.length - 1,
      path,
      criticality: byId.get(id).criticality,
      direct: changed.has(id)
    }))
    .sort((left, right) => left.distance - right.distance || compareText(left.id, right.id));
  const score = affected.reduce((total, component) => total + WEIGHTS[component.criticality] * (component.direct ? 2 : 1), 0);
  const level = score >= 10 ? "high" : score >= 5 ? "medium" : "low";
  return {
    ok: true,
    value: {
      changedIds: canonicalChangedIds,
      affected,
      score,
      level,
      summary: `${affected.length} components affected \u00b7 ${level} risk`
    }
  };
}
