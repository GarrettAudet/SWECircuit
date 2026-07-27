# Triage Board Application Contract

## Product Boundary

The application lives under `examples/triage-board/`, has no runtime dependencies, makes no network
request, and stores data only in browser local storage.

## Issue Schema

```txt
Issue {
  id: non-empty string
  title: trimmed string, 1-120 characters
  details: trimmed string, 0-1000 characters
  priority: low | medium | high
  status: backlog | in_progress | done
  createdAt: ISO-8601 string
  updatedAt: ISO-8601 string
}
```

The persisted and exported envelope is:

```txt
{ version: 1, issues: Issue[] }
```

Unknown fields, duplicate identifiers, invalid enums, invalid dates, and length violations are
rejected. Import failure must not overwrite the current valid collection.

## Module Interfaces

`src/model.js` exports:

- `ISSUE_PRIORITIES`, `ISSUE_STATUSES`
- `createIssue(input, options?)`
- `updateIssue(issue, patch, options?)`
- `validateIssue(issue)`
- `filterIssues(issues, filters)`
- `groupIssues(issues)`
- `serializeIssueCollection(issues)`
- `parseIssueCollection(text)`
- `createSeedIssues(options?)`

`src/storage.js` exports:

- `STORAGE_KEY`
- `loadIssues(storage)`
- `saveIssues(storage, issues)`

The optional `options` object may supply deterministic `id` and `now` values for tests. Domain
functions never read the DOM or local storage directly.

## Presentation Contract

`index.html` owns the semantic application shell, toolbar, three status lanes, empty state, issue
dialog, import control, export control, and accessible live region. `styles.css` owns responsive
presentation. Neither file contains application state or persistence logic.

The interface is operational rather than promotional: restrained colors, compact controls, no
decorative gradients, no nested cards, and no oversized hero.

## Integration Contract

`src/app.js` imports only the published model and storage interfaces. It owns DOM binding,
rendering, dialog behavior, filtering, moves, import/export, persistence calls, and user feedback.
It must preserve one in-memory valid collection and persist only after a successful domain
operation.

## Verification Contract

- `test/model.test.mjs` verifies schema, mutation, filtering, grouping, and import/export behavior.
- `test/storage.test.mjs` verifies empty, valid, malformed, and failed-write storage behavior.
- Browser verification covers the complete user journey, responsive layouts, console output, and
  keyboard-visible interactions.
