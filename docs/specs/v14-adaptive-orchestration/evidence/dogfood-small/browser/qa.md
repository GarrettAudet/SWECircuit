# Release Board Browser QA

## Result

Pass on 2026-07-27 using the Codex in-app browser against
`http://127.0.0.1:4174/`.

## Desktop

- Viewport: 1280 by 900.
- Initial state rendered four seeded checks and the correct `4 / 2 / 1 / 1` summary.
- Added `Accessibility audit complete` with owner, category, and evidence.
- Advanced the new check from pending to passed.
- Filtered to passed checks and observed only the two passed rows.
- Reloaded the page and confirmed the added passed check survived through local storage.
- Deleted the added check and confirmed the row and summary were updated.

Screenshot:
`release-board-desktop.png`
(`sha256:c0a55acf1ad42162df0a06e994a9bf3340761bf296a6d62edc746a54e64b9ead`).

## Mobile

- Viewport: 390 by 844.
- Document width equaled viewport width; no horizontal overflow was present.
- All four filter controls and every visible row action remained inside the viewport.
- The summary, work queue, lower rows, and add form remained legible without overlap.
- The header `Add check` command scrolled to the form and focused `#check-title`.
- The active browser reported prefers-reduced-motion: reduce; the shortcut used the tested
  reduced-motion branch and retained focus behavior.

Screenshots:

- `release-board-mobile.png`
  (`sha256:7f311db65f98f63f5e4089597f7615a4c3a0f490570d6bb897a29bc910d9a0ec`).
- `release-board-mobile-form.png`
  (`sha256:18a6ecd30f91e4b072aefc92294c401b6eedb8f0f37a89012e98169a11240429`).

## Diagnostics

- Browser console warnings: 0.
- Browser console errors: 0.
- Network behavior: the local server advertises `connect-src 'none'`; automated integration
  coverage confirms no remote assets.
