import {
  parseWorkspace,
  SCHEMA_VERSION,
  serializeWorkspace
} from "./codec.js";
import {
  analyzeImpact,
  removeComponent,
  upsertComponent,
  validateGraph
} from "./graph.js";
import { loadWorkspace, saveWorkspace } from "./storage.js";
import {
  persistenceAnnouncement,
  recoveryFocusId,
  validationAnnouncement
} from "./ui-policy.js";
import {
  announce,
  preferredScrollBehavior,
  readComponentDraft,
  renderComponents,
  renderErrors,
  renderImpact
} from "./view.js";

const SEED_COMPONENTS = Object.freeze([
  Object.freeze({
    id: "api",
    name: "Public API",
    owner: "Platform",
    criticality: "high",
    dependsOn: Object.freeze(["database"])
  }),
  Object.freeze({
    id: "dashboard",
    name: "Operations Dashboard",
    owner: "Experience",
    criticality: "medium",
    dependsOn: Object.freeze(["api"])
  }),
  Object.freeze({
    id: "database",
    name: "Primary Database",
    owner: "Data",
    criticality: "high",
    dependsOn: Object.freeze([])
  }),
  Object.freeze({
    id: "worker",
    name: "Background Worker",
    owner: "Platform",
    criticality: "medium",
    dependsOn: Object.freeze(["database"])
  })
]);

function workspaceFromGraph(graph) {
  return {
    schemaVersion: SCHEMA_VERSION,
    components: graph.components,
    changedIds: graph.changedIds
  };
}

export function createSeedWorkspace() {
  return {
    schemaVersion: SCHEMA_VERSION,
    components: SEED_COMPONENTS.map((component) => ({
      ...component,
      dependsOn: [...component.dependsOn]
    })),
    changedIds: ["database"]
  };
}

export function createEmptyWorkspace() {
  return { schemaVersion: SCHEMA_VERSION, components: [], changedIds: [] };
}

export function validateIntegratedWorkspace(candidate) {
  const serialized = serializeWorkspace(candidate);
  if (!serialized.ok) {
    return serialized;
  }
  const parsed = parseWorkspace(serialized.value);
  if (!parsed.ok) {
    return parsed;
  }
  const graph = validateGraph({
    components: parsed.value.components,
    changedIds: parsed.value.changedIds
  });
  return graph.ok ? { ok: true, value: workspaceFromGraph(graph.value) } : graph;
}

export function applyComponentUpsert(workspace, candidate) {
  const componentResult = upsertComponent(workspace.components, candidate);
  if (!componentResult.ok) {
    return componentResult;
  }
  return validateIntegratedWorkspace({
    schemaVersion: SCHEMA_VERSION,
    components: componentResult.value,
    changedIds: workspace.changedIds
  });
}

export function applyChangedToggle(workspace, componentId, selected) {
  const changed = new Set(workspace.changedIds);
  if (selected) {
    changed.add(componentId);
  } else {
    changed.delete(componentId);
  }
  return validateIntegratedWorkspace({
    schemaVersion: SCHEMA_VERSION,
    components: workspace.components,
    changedIds: [...changed]
  });
}

export function applyComponentRemoval(workspace, componentId) {
  const componentResult = removeComponent(workspace.components, componentId);
  if (!componentResult.ok) {
    return componentResult;
  }
  return validateIntegratedWorkspace({
    schemaVersion: SCHEMA_VERSION,
    components: componentResult.value,
    changedIds: workspace.changedIds.filter((id) => id !== componentId)
  });
}

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required application element: ${id}`);
  }
  return element;
}

function startApplication() {
  const elements = {
    form: requireElement("component-form"),
    id: requireElement("component-id"),
    name: requireElement("component-name"),
    owner: requireElement("component-owner"),
    criticality: requireElement("component-criticality"),
    dependencies: requireElement("component-dependencies"),
    componentList: requireElement("component-list"),
    componentTemplate: requireElement("component-template"),
    changedList: requireElement("changed-list"),
    impactSummary: requireElement("impact-summary"),
    impactBody: requireElement("impact-table-body"),
    importFile: requireElement("import-file"),
    importButton: requireElement("import-button"),
    exportButton: requireElement("export-button"),
    resetButton: requireElement("reset-button"),
    errors: requireElement("error-summary"),
    announcement: requireElement("announcement"),
    componentEmpty: requireElement("component-empty"),
    changedEmpty: requireElement("changed-empty"),
    impactEmpty: requireElement("impact-empty"),
    componentCount: requireElement("component-count"),
    changedCount: requireElement("changed-count"),
    affectedCount: requireElement("affected-count"),
    riskScore: requireElement("risk-score")
  };

  let storage = null;
  try {
    storage = window.localStorage;
  } catch {
    storage = null;
  }

  let workspace = createEmptyWorkspace();
  let startupErrors = [];
  let startupMessage = "";

  if (storage) {
    const loaded = loadWorkspace(storage);
    if (!loaded.ok) {
      startupErrors = loaded.errors;
      startupMessage = "The saved workspace could not be loaded.";
    } else if (loaded.value === null) {
      workspace = createSeedWorkspace();
      const saved = saveWorkspace(storage, workspace);
      startupMessage = persistenceAnnouncement("Loaded the example workspace.", saved.ok);
      if (!saved.ok) {
        startupErrors = saved.errors;
      }
    } else {
      const integrated = validateIntegratedWorkspace(loaded.value);
      if (integrated.ok) {
        workspace = integrated.value;
      } else {
        startupErrors = integrated.errors;
        startupMessage = validationAnnouncement("Saved workspace", integrated.errors);
      }
    }
  } else {
    startupErrors = [{ code: "storage", message: "Local storage is unavailable." }];
    startupMessage = "Local storage is unavailable. Changes will remain in this session.";
  }

  function reducedMotion() {
    return typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollToElement(element) {
    element.scrollIntoView({
      behavior: preferredScrollBehavior(reducedMotion()),
      block: "center"
    });
  }

  function setErrors(errors) {
    renderErrors(elements.errors, errors);
    if (errors.length > 0) {
      scrollToElement(elements.errors);
    }
  }

  function renderChangedControls() {
    elements.changedList.replaceChildren();
    const selected = new Set(workspace.changedIds);
    for (const component of workspace.components) {
      const item = document.createElement("li");
      item.className = "changed-item";
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      const name = document.createElement("span");
      checkbox.type = "checkbox";
      checkbox.dataset.changedId = component.id;
      checkbox.checked = selected.has(component.id);
      name.textContent = `${component.name} (${component.id})`;
      label.append(checkbox, name);
      item.append(label);
      elements.changedList.append(item);
    }
  }

  function renderWorkspace() {
    renderComponents(
      elements.componentList,
      elements.componentTemplate,
      workspace.components,
      workspace.changedIds
    );
    for (const row of elements.componentList.querySelectorAll("[data-component-id]")) {
      const component = workspace.components.find((entry) => entry.id === row.dataset.componentId);
      if (!component) {
        continue;
      }
      row.querySelector('[data-action="edit"]')?.setAttribute("aria-label", `Edit ${component.name}`);
      row.querySelector('[data-action="delete"]')?.setAttribute("aria-label", `Delete ${component.name}`);
    }
    renderChangedControls();

    const impact = analyzeImpact(workspace.components, workspace.changedIds);
    if (!impact.ok) {
      setErrors(impact.errors);
      announce(elements.announcement, validationAnnouncement("Impact analysis", impact.errors));
      return;
    }
    renderImpact(elements.impactSummary, elements.impactBody, impact.value);
    elements.componentCount.textContent = String(workspace.components.length);
    elements.changedCount.textContent = String(workspace.changedIds.length);
    elements.affectedCount.textContent = String(impact.value.affected.length);
    elements.riskScore.textContent = String(impact.value.score);
    elements.componentEmpty.hidden = workspace.components.length > 0;
    elements.changedEmpty.hidden = workspace.changedIds.length > 0;
    elements.impactEmpty.hidden = impact.value.affected.length > 0;
  }

  function fail(result, action) {
    setErrors(result.errors);
    announce(elements.announcement, validationAnnouncement(action, result.errors));
  }

  function commit(result, successMessage, focusAfterRender = null) {
    if (!result.ok) {
      fail(result, successMessage);
      return false;
    }
    workspace = result.value;
    const saved = storage
      ? saveWorkspace(storage, workspace)
      : { ok: false, errors: [{ code: "storage", message: "Local storage is unavailable." }] };
    renderWorkspace();
    setErrors(saved.ok ? [] : saved.errors);
    announce(elements.announcement, persistenceAnnouncement(successMessage, saved.ok));
    focusAfterRender?.();
    return true;
  }

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!elements.form.reportValidity()) {
      announce(elements.announcement, "Component failed validation. Check the form fields.");
      return;
    }
    const draft = readComponentDraft(elements.form);
    const committed = commit(
      applyComponentUpsert(workspace, draft),
      `Saved ${draft.name}.`,
      () => elements.id.focus()
    );
    if (committed) {
      elements.form.reset();
      elements.criticality.value = "medium";
      elements.id.focus();
    }
  });

  elements.componentList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    const row = button?.closest("[data-component-id]");
    const componentId = row?.dataset.componentId;
    if (!button || !componentId) {
      return;
    }
    const componentIndex = workspace.components.findIndex((entry) => entry.id === componentId);
    const component = workspace.components[componentIndex];
    if (!component) {
      return;
    }

    if (button.dataset.action === "edit") {
      elements.id.value = component.id;
      elements.name.value = component.name;
      elements.owner.value = component.owner;
      elements.criticality.value = component.criticality;
      elements.dependencies.value = component.dependsOn.join(", ");
      scrollToElement(elements.form);
      elements.id.focus();
      announce(elements.announcement, `Editing ${component.name}.`);
      return;
    }

    if (button.dataset.action === "delete") {
      const nextComponents = workspace.components.filter((entry) => entry.id !== componentId);
      const focusId = recoveryFocusId(nextComponents, componentIndex);
      commit(
        applyComponentRemoval(workspace, componentId),
        `Deleted ${component.name}.`,
        () => {
          const target = focusId
            ? elements.componentList.querySelector(
              `[data-component-id="${CSS.escape(focusId)}"] [data-action="delete"]`
            )
            : elements.id;
          target?.focus();
        }
      );
    }
  });

  elements.changedList.addEventListener("change", (event) => {
    const checkbox = event.target.closest('input[type="checkbox"][data-changed-id]');
    if (!checkbox) {
      return;
    }
    const component = workspace.components.find((entry) => entry.id === checkbox.dataset.changedId);
    if (!component) {
      return;
    }
    commit(
      applyChangedToggle(workspace, component.id, checkbox.checked),
      `${component.name} ${checkbox.checked ? "added to" : "removed from"} the change set.`,
      () => elements.changedList
        .querySelector(`[data-changed-id="${CSS.escape(component.id)}"]`)
        ?.focus()
    );
  });

  elements.importButton.addEventListener("click", () => {
    elements.importFile.click();
  });

  elements.importFile.addEventListener("change", async () => {
    const [file] = elements.importFile.files;
    if (!file) {
      return;
    }
    try {
      const parsed = parseWorkspace(await file.text());
      if (!parsed.ok) {
        fail(parsed, "Import");
        return;
      }
      commit(validateIntegratedWorkspace(parsed.value), "Imported workspace.");
    } catch {
      const result = {
        ok: false,
        errors: [{ code: "import", message: "The selected file could not be read." }]
      };
      fail(result, "Import");
    } finally {
      elements.importFile.value = "";
    }
  });

  elements.exportButton.addEventListener("click", () => {
    const serialized = serializeWorkspace(workspace);
    if (!serialized.ok) {
      fail(serialized, "Export");
      return;
    }
    const url = URL.createObjectURL(new Blob([serialized.value], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "impact-planner-workspace.json";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setErrors([]);
    announce(elements.announcement, "Exported impact-planner-workspace.json.");
  });

  elements.resetButton.addEventListener("click", () => {
    if (!window.confirm("Reset the workspace to the example components?")) {
      announce(elements.announcement, "Reset cancelled.");
      return;
    }
    commit(createSeedWorkspaceResult(), "Reset workspace to the example.");
  });

  function createSeedWorkspaceResult() {
    return validateIntegratedWorkspace(createSeedWorkspace());
  }

  renderWorkspace();
  setErrors(startupErrors);
  if (startupMessage) {
    announce(elements.announcement, startupMessage);
  }
}

if (typeof document !== "undefined") {
  startApplication();
}
