# Impact Planner Application Contract

## Workspace

```js
{
  schemaVersion: 1,
  components: [{
    id: "api",
    name: "Public API",
    owner: "Platform",
    criticality: "high",
    dependsOn: ["database"]
  }],
  changedIds: ["api"]
}
```

Canonical component order and every `dependsOn` or `changedIds` set are lexicographic by
identifier. Public functions never mutate caller-owned arrays or objects.

## Graph Module

`examples/impact-planner/src/graph.js` exports:

- `CRITICALITIES`
- `validateGraph(input)`
- `upsertComponent(components, candidate)`
- `removeComponent(components, id)`
- `analyzeImpact(components, changedIds)`

Every operation returns a closed result:

```js
{ ok: true, value }
{ ok: false, errors: [{ code, message, componentId?, dependencyId? }] }
```

`validateGraph` normalizes text, sorts canonical sets, rejects unknown keys and invalid values,
and reports deterministic errors. `analyzeImpact` follows reverse dependency edges from every
changed component. Its value is:

```js
{
  changedIds: ["database"],
  affected: [{
    id: "database",
    distance: 0,
    path: ["database"],
    criticality: "high",
    direct: true
  }, {
    id: "api",
    distance: 1,
    path: ["database", "api"],
    criticality: "high",
    direct: false
  }],
  score: 9,
  level: "medium",
  summary: "2 components affected · medium risk"
}
```

Affected rows sort by distance then identifier. A zero-component graph and an empty changed set
are valid and return score `0`, level `low`, and `0 components affected · low risk`.

## Codec And Storage Module

`examples/impact-planner/src/codec.js` exports:

- `SCHEMA_VERSION`
- `MAX_IMPORT_BYTES`
- `MAX_COMPONENTS`
- `parseWorkspace(text)`
- `serializeWorkspace(workspace)`

The codec accepts only plain JSON data with exact top-level and component keys. It rejects unsafe
keys (`__proto__`, `prototype`, `constructor`) anywhere, invalid UTF-8 byte size, wrong versions,
too many components, malformed structural values, and duplicate identifiers. It performs closed
structural validation; graph-reference and cycle validation remains the graph module's duty.
Serialization is deterministic, pretty-printed with two spaces, and ends with one LF.

`examples/impact-planner/src/storage.js` exports:

- `STORAGE_KEY`
- `loadWorkspace(storage)`
- `saveWorkspace(storage, workspace)`

`loadWorkspace` returns `{ ok: true, value: null }` when absent, otherwise delegates to the codec.
Storage exceptions return `{ ok: false, errors }`. `saveWorkspace` serializes before writing and
returns the same closed result shape.

## Interface Module

`examples/impact-planner/index.html`, `styles.css`, and `src/view.js` provide:

- Header, risk summary, component form, component list, changed-component controls, impact table,
  import/export controls, empty states, error summary, and live announcement region.
- Stable IDs: `component-form`, `component-id`, `component-name`, `component-owner`,
  `component-criticality`, `component-dependencies`, `component-list`, `changed-list`,
  `impact-summary`, `impact-table-body`, `import-file`, `import-button`, `export-button`,
  `reset-button`, `error-summary`, and `announcement`.
- A `<template id="component-template">` for component rows.
- Visible focus and errors, 44px minimum primary pointer targets, responsive layout without
  horizontal overflow, and reduced-motion behavior.

`src/view.js` exports:

- `readComponentDraft(form)`
- `renderComponents(container, template, components, changedIds)`
- `renderImpact(summaryElement, tableBody, impact)`
- `renderErrors(container, errors)`
- `announce(region, message)`
- `preferredScrollBehavior(reducedMotion)`

The view module owns DOM projection only. It does not own application state or storage.

## Integration Module

`examples/impact-planner/src/app.js` owns state and event wiring. It validates every mutation,
keeps current state unchanged on failure, persists successful changes, and distinguishes
operation success from persistence failure.

Required behavior:

- Seed a useful four-component example only when storage is absent.
- Add or update from the form and restore focus to the identifier field.
- Toggle changed components and recompute impact immediately.
- Delete components with focus recovery.
- Import through a local file only after codec and graph validation both pass.
- Export with a Blob download named `impact-planner-workspace.json`.
- Reset only after explicit confirmation.
- Announce success, validation failure, persistence failure, import, export, and reset outcomes.
- Honor reduced motion for all programmatic scrolling.

`server.mjs` serves only declared local assets from the application root, blocks traversal, emits
`Content-Security-Policy: default-src 'self'; connect-src 'none'; object-src 'none'; base-uri
'none'; frame-ancestors 'none'`, and defaults to `127.0.0.1:4175`.

## Handoff Contract

Every specialist must return the exact generated `SpecialistAgentHandoff` envelope. Artifact
content summarizes files, commands, outcomes, assumptions, and risks. A dependent agent launches
only after every transitive dependency handoff verifies and assesses as integration-ready.
