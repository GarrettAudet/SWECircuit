# Revision 13 Test Plan

## Focused

- `node --test test/v12-release-gate.test.mjs`
- `npm.cmd run consumer:check`
- `node --check scripts/run-v12-release-gate.mjs`
- `node --check scripts/check-packed-consumer.mjs`
- `git diff --check`

## Regression Conditions

- The release host supplies one absolute TypeScript entrypoint outside the candidate worktree.
- Duplicate case-insensitive supplies fail closed.
- Empty, relative, missing, directory, or symbolic-link supplies fail closed.
- The packed consumer compiles its TypeScript host through the validated entrypoint.
- No `node_modules`, cache, or scratch path is created inside exact candidate source.
- Exact source and Git context inspection remain unchanged.

## Release

After integration, rebuild affected V11 source evidence and its independent Audit B chain, run the complete repository gate and checker matrix, commit a new candidate, and execute the candidate-addressed canonical gate once.
