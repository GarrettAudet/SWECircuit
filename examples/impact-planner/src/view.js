const text = (value) => value == null ? "" : String(value);

export function readComponentDraft(form) {
  const data = new FormData(form);
  return {
    id: text(data.get("id")).trim(),
    name: text(data.get("name")).trim(),
    owner: text(data.get("owner")).trim(),
    criticality: text(data.get("criticality")).trim(),
    dependsOn: text(data.get("dependsOn")).split(",").map((item) => item.trim()).filter(Boolean)
  };
}

export function renderComponents(container, template, components, changedIds) {
  const changed = new Set(changedIds);
  container.replaceChildren();
  for (const component of components) {
    const fragment = template.content.cloneNode(true);
    const row = fragment.querySelector("[data-component-id]");
    row.dataset.componentId = component.id;
    row.dataset.changed = changed.has(component.id) ? "true" : "false";
    fragment.querySelector("[data-component-name]").textContent = component.name;
    fragment.querySelector("[data-component-id-label]").textContent = component.id;
    fragment.querySelector("[data-component-owner]").textContent = component.owner;
    fragment.querySelector("[data-component-criticality]").textContent = component.criticality;
    fragment.querySelector("[data-component-dependencies]").textContent = component.dependsOn.length ? `Depends on: ${component.dependsOn.join(", ")}` : "No dependencies";
    container.append(fragment);
  }
}

export function renderImpact(summaryElement, tableBody, impact) {
  summaryElement.textContent = impact.summary;
  summaryElement.dataset.level = impact.level;
  tableBody.replaceChildren();
  for (const item of impact.affected) {
    const row = document.createElement("tr");
    const values = [item.id, item.criticality, String(item.distance), item.path.join(" -> "), item.direct ? "Direct change" : "Dependency impact"];
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      if (index === 0) cell.className = "impact-component";
      cell.textContent = value;
      row.append(cell);
    });
    tableBody.append(row);
  }
}

export function renderErrors(container, errors) {
  container.replaceChildren();
  if (!errors.length) {
    container.hidden = true;
    return;
  }
  const heading = document.createElement("strong");
  heading.textContent = "Please fix the following:";
  container.append(heading);
  const list = document.createElement("ul");
  for (const error of errors) {
    const item = document.createElement("li");
    item.textContent = error.message;
    list.append(item);
  }
  container.append(list);
  container.hidden = false;
}

export function announce(region, message) {
  region.textContent = "";
  region.textContent = text(message);
}

export function preferredScrollBehavior(reducedMotion) {
  return reducedMotion ? "auto" : "smooth";
}
