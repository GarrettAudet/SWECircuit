# Test Plan

## Status

Complete.

## Automated Tests

- `node --test examples/triage-board/test/model.test.mjs examples/triage-board/test/storage.test.mjs`: 13 passed, 0 failed.
- Date coverage rejects impossible month lengths and invalid leap days while accepting valid leap days and timezone offsets.
- Import/export coverage round-trips the v1 envelope and rejects malformed JSON, unknown fields, duplicate IDs, invalid dates, invalid enums, and length violations.
- Storage coverage handles empty, valid, malformed, unavailable, and failed-write states.
- `node --check` passed for `src/app.js`, `src/model.js`, `src/storage.js`, and `server.mjs`.
- `scripts/check-template.ps1`: pass.

## Browser Scenarios

1. Seeded startup rendered all three status lanes.
2. Create, edit, move, delete, and refresh persistence passed.
3. Search, status/priority filtering, clear filters, and visible counts passed.
4. Export produced the expected download action and live-region status.
5. Empty required input and cancellation preserved valid state.
6. Focus returned to a logical issue action after create, move, edit, and delete.
7. Desktop 1280px and mobile 390px layouts had no horizontal overflow.
8. Browser error/warning console count was zero.

The browser host rejected attaching a generated local JSON fixture to the file chooser. No bypass was attempted. Import parsing and round-trip behavior remain covered by deterministic tests and independent source review; this is retained as a low residual evidence limitation.

## Review

The first independent review returned `fix` for calendar-exact dates, browser-evidence delivery, mutation focus, and color contrast. The correction wave closed all four findings. Final review handoff `sha256:d5827f70b3d410a961096c86a5a795e5c691f74b4594eca12e8f7cd5790e9bab` verified `pass`.

## Current Evidence

- Browser report: `evidence/browser/browser-qa.md`.
- Desktop capture: `evidence/browser/desktop-1280-final.jpg`.
- Mobile capture: `evidence/browser/mobile-390-final.jpg`.
- Final run inspection: `evidence/orchestration/run/inspection.json`.
- Exact specialist handoffs: `evidence/orchestration/handoffs/`.