# Active Context

## Current Focus

Portable AI SWE workflow template v3 bootstrap baseline: development milestones, desired edit state, and branch/merge workflow for clean baselines.

## Current Stage

V3 validated; creating the bootstrap baseline commit on `main`.

## Important Current Constraints

- Keep the system simple at the surface and robust underneath.
- Use milestones as concise version overviews, not replacements for specs or reviews.
- Preserve source artifacts before summarizing memory.
- Treat V1-V3 as the bootstrap exception that creates the first approved baseline on `main`.
- After this baseline is committed, develop future versions on dedicated branches.
- Do not install external frameworks or memory tools by default.

## Recently Learned

- The workflow needs an explicit target edit state: clean baseline, version branch, feature package, verification, review, milestone, approval, merge.
- A completed version should notify the user with a milestone overview so progress is visible from start to finish.
- Branch discipline is part of traceability because it separates draft version work from approved baselines.

## Next Likely Work

- Ask for approval to commit the bootstrap baseline on `main`.
- Start the next workflow version from a branch such as `codex/v4-example`.


