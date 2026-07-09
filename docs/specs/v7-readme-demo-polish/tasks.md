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

- [x] T001: Capture V7 visual requirements.
  Scope: Feature package for the README demo polish work.
  Verification: `spec.md`, `plan.md`, `tasks.md`, and `test-plan.md` define the problem, acceptance criteria, approach, and checks.
- [x] T002: Regenerate the README demo GIFs.
  Scope: Replace the three tracked GIF assets under `docs/assets/` and add `docs/assets/source/generate-readme-demo-gifs.py`.
  Verification: Metadata inspection confirms dimensions and frame counts; visual spot check confirms readability.
- [x] T003: Update docs and memory.
  Scope: README wording, asset guidance, milestone, active context, history ledger, retrieval index, implementation notes, and review.
  Verification: Updated files link V7 source artifacts and asset paths.
- [x] T004: Validate and prepare handoff.
  Scope: Template checker, placeholder scan, non-ASCII scan, Git diff review, commit, and push.
  Verification: Commands pass or failures are recorded with routing.

## Dependencies

- T002 depended on T001.
- T003 depended on T002.
- T004 depended on T003.

## Out Of Scope

- Installing an external design or animation tool.
- Adding a website or runtime demo.
- Changing the TraceRail module, rail, or pack contracts.
