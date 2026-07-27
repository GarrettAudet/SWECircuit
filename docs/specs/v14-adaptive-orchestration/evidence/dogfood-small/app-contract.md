# Release Board Application Contract

## Product Boundary

Release Board is a dependency-free static browser application under `examples/release-board/`.
It performs no network requests and stores only non-sensitive local release-check data.

## Check Shape

```js
{
  id: "check-...",
  title: "Run regression suite",
  owner: "Engineering",
  category: "test",
  status: "pending",
  evidence: ""
}
```

All fields are strings. Titles and owners are trimmed and required. Evidence is optional. Category
and status use the closed values in the goal. IDs are supplied by the integration layer and must be
non-empty.

## Domain Module

`src/model.js` exports pure operations for:

- validating and normalizing one check;
- adding, updating, and removing checks without mutating caller input;
- filtering checks by `all`, `blocked`, `pending`, or `passed`;
- deriving total, pending, passed, blocked, and `ready` summary values.

`src/storage.js` exports:

- one fixed storage key and schema version;
- strict serialization of normalized checks;
- safe parsing that returns `null` for malformed, wrong-version, or invalid data;
- no direct access to `window`, `localStorage`, or other host globals.

## Interface Module

`index.html` owns:

- a compact product header and readiness summary;
- an add-check form with title, owner, category, and evidence controls;
- a segmented filter control;
- one semantic check-list container and an empty state;
- a reusable template for a check row;
- a live region for concise action feedback.

`styles.css` owns a professional operational UI that is responsive at 390px and 1280px, preserves
visible keyboard focus, and does not hide labels required for comprehension.

The interface module contains no application state and no inline event handlers.

## Integration Boundary

The main IDE agent will add `src/app.js`, package metadata, a local server, README, and any small
integration smoke test after both specialist outputs are available. It may use `localStorage` only
through the pure storage serialization boundary.

## Verification

- Node tests cover normalization, immutable updates, filters, summaries, round-trip storage, and
  invalid storage.
- Static inspection confirms required IDs, labels, controls, module script, focus styles, and no
  remote assets.
- Browser verification confirms add, status change, filtering, persistence, deletion, keyboard
  focus, and responsive layout.
