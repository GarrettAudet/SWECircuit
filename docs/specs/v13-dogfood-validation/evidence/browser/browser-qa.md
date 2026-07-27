# V13 Browser QA Evidence

## Environment

- Target: http://127.0.0.1:4173/
- Browser: Codex in-app Chromium browser
- Date: 2026-07-27
- Result: pass with one declared host-policy limitation

## Journey Assertions

- Seeded startup rendered backlog, in-progress, and done lanes with three valid issues.
- Create produced a valid backlog issue and focused its new Edit action.
- Move routed the issue to in-progress and focused the moved issue's new Edit action.
- Edit changed the title and focused the updated issue's new Edit action.
- Delete used the native confirmation dialog, removed the issue, and focused the next visible issue's Edit action.
- A replacement issue restored the three-issue board; reload preserved all three issues from local storage.
- Search for welcome returned one of three issues; Clear filters restored all three.
- Export completed with the live-region status Exported 3 issues.
- Empty required title was rejected without changing issue count, and Cancel preserved state.

## Responsive And Accessibility Assertions

- Desktop viewport: inner/client/scroll width 1280/1280/1280; no horizontal overflow.
- Mobile viewport: inner/client/scroll width 390/375/375; no horizontal overflow.
- Mobile header action bounds stayed inside x=16..358.67. The first-row controls were 167.33px each and the second-row New issue action was 342.67px wide. All three were 44px high.
- Move focus: Edit: Review incoming issues.
- Edit focus: Edit: Review incoming queue.
- Delete focus: Edit: Plan the next triage.
- Focus outline color #a15c00 measured 5.19:1 on white and 4.79:1 on the canvas; the lowest adjacent-surface result was 4.35:1.
- Placeholder color #65727d measured 4.93:1 on white.
- Browser error/warning console entries: 0.

## Screenshots

- desktop-1280-final.jpg: 45355 bytes, sha256:4a8aea301563ef23d618ee3347e3388abb524e47a46951c2e705801b71fb5e4c
- mobile-390-final.jpg: 35713 bytes, sha256:d656c0d799b3ad50e8e5a642808a854ecf1291fc9baca9857a4bda403da24615

## Server Assertions

- GET / returned 200 with the declared Content-Security-Policy.
- HEAD /styles.css returned 200.
- Unknown route returned 404.
- POST / returned 405.

## Declared Limitation

The browser host security policy rejected attaching a generated local JSON fixture to the local file chooser. The host did not bypass that control. Import/export schema round-trip, malformed envelopes, duplicate identifiers, impossible dates, and persistence validation are covered by 13 deterministic Node tests; the import handler was independently reviewed in source. This is a host evidence limitation, not reported as a successful browser upload.
