# Test Plan

## Status

Local release-candidate verification passes; hosted publication verification remains.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Independent first-read public-surface review |
| AC2 | Checker assertion and active-Markdown embed count |
| AC3 | Representative GIF frames plus independent visual review |
| AC4 | Positive and negative README capability fixtures |
| AC5 | Read-only CLI quick start and `npm run example:specialist` through the canonical gate |
| AC6 | Template checker, checker matrix, `npm run verify`, and `git diff --check` |
| AC7 | Closed Revision 5 review outcome with prior findings resolved |
| AC8 | Milestone and memory checker evidence |

## Automated Checks

- Unit: Existing kernel tests through `npm run verify`.
- Integration: Positive repository template check.
- E2E: Complete negative checker fixture matrix, read-only CLI quick start, and specialist example.
- Typecheck: `npm run typecheck` through the canonical gate.
- Lint: `npm run lint` and `git diff --check`.
- Build: `npm run build` through the canonical gate.
- Asset: Pillow frame, dimension, duration, palette, size, and representative-frame assertions.

## Manual Checks

- Inspect the opening, fan-out, fan-in, and final GIF frames at full and 600-pixel widths.
- Read only the opening sentence, GIF, and host boundary; confirm the product and ownership split are clear.
- Confirm the README presents one visual and no slide-like secondary diagram.

## Regression Coverage

- Reject a missing, plain-text-only, ownership-free, or second current GIF reference.
- Reject embedding the historical TraceRail overview as the primary visual.
- Accept developer-only, IDE-only, or disjunctive atomic decomposition; reject conjunctive ownership and core decomposition.
- Require conditional dependency-safe host execution and complete positive core/host anchors.
- Reject direct, alias, and modal overclaims for every explicit V11 host-owned capability family.
- Reject removing either tested local CLI command while rejecting public package or CLI claims.

## Skipped Checks

None. GitHub dark mode changes the page around the self-contained light GIF but not its internal palette.

## Verification Evidence

- Primary GIF: 920 x 560, 54 source frames, 913,700 bytes; mechanically validated and inspected at native and 600-pixel widths.
- Positive template checker: pass on the Revision 5 source tree.
- Complete checker matrix: pass in 282.9 seconds after restoring both CLI command fixtures.
- Targeted quick-start suite: 3/3 pass.
- Kernel suite: 370/370 pass.
- Revisions 1-3: exact non-pass history preserved under `evidence/review/attempt-1/` through `attempt-3/`.
- Revision 4: two exact review `pass` handoffs, then retired after canonical verification found the missing README CLI contract; exact evidence remains under `attempt-4/`.
- Revision 5 accepted pair: compilation `sha256:571b1b4e57401ab25b92e7973ef298d287f3175a68f6363f56177ea90b46f135`; package `sha256:09a7cdea81b1d3b81f681ee0f4808c166f526107c2da7a66701f1d1c086f79cd`.
- Revision 5 raw visual handoff: 2,531 bytes at `sha256:48e37c688d3a13c0fbb4aca039af695b6c841fb00956381be05cfd3b50e9b427`.
- Revision 5 raw boundary handoff: 3,806 bytes at `sha256:36fbbe2e738dc0fa02e76f4a729ad2c7ca84387a2db4b35a06325c74b8fd91eb`.
- Exact handoff verification: both `pass`; external integration record has `integrationReady: true`.
- Revision 31 Candidate A: compilation `sha256:4c3cb3249ff21f51387d05ed5b34810a5797844e137c755cfb8af01bb3fc221a`; package `sha256:7f54a2346f0e29fde56d537dc8677136f3723561d9a9b57574871a4484029e63`.
- Revision 31 Audit B: compilation `sha256:5a8c1a13e0daca3411a023283b44e1d3ec9cc09b620733641f851b48892237b3`; package `sha256:95c502bc2c71c048268115e1e3fa80860ff66c8f0715c21da8adeb7aa6222ea0`.
- Revision 31 trust root: exact binder and semantic Audit B handoffs `pass`; strict `node scripts/run-v11-dogfood.mjs --check-evidence` replay `pass`.
- Complete canonical `npm.cmd run verify`: pass, including 370/370 tests and clean offline installed-consumer compatibility.
- Exact-tree checker regression matrix: pass in 256.9 seconds.
- Final whitespace check, hosted branch CI, fast-forward, and final main observation: pending release publication.
