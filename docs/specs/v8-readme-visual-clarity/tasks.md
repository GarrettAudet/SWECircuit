# Tasks

## Status

Complete.

## Task List

Use this format for each task:

```txt
- [ ] T001: Short action statement
  Scope: What changes.
  Verification: Test, check, review, or evidence that proves completion.
```

## Tasks

- [x] T001: Capture the V8 clarity failure.
  Scope: Feature package, debug notes, and acceptance criteria.
  Verification: V8 spec, debug notes, and RCA explicitly name the V7 failure mode.
- [x] T002: Redesign and regenerate visual assets.
  Scope: `docs/assets/tracerail-core-rail.svg`, `docs/assets/source/generate-readme-demo-gifs.py`, and supporting GIFs.
  Verification: Python compile, supporting GIF generation, and browser SVG preview.
- [x] T003: Update README and asset docs.
  Scope: README visual section and `docs/assets/README.md`.
  Verification: README teaches `goal | spec | rail | gates | evidence | memory` before deeper module details.
- [x] T004: Update memory and milestone.
  Scope: active context, history ledger, retrieval index, patterns, known issues, and V8 milestone.
  Verification: Future agents can find V8 visual clarity rationale and source artifacts.
- [x] T005: Validate, review, commit, and push.
  Scope: template checker, generator compile, placeholder scan, non-ASCII scan, diff check, review notes, commit, push.
  Verification: Recorded in `test-plan.md` and `review.md`.

## Dependencies

- T002 depended on T001.
- T003 depended on T002.
- T004 depended on T003.
- T005 depended on T004.

## Out Of Scope

- Renaming TraceRail.
- Adding a live demo site.
- Installing animation, diagramming, or design dependencies.