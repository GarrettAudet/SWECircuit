# Revision 49 Test Plan

## Focused Regressions

- Distinguish glibc and musl package applicability.
- Detect a hostile ancestor `node_modules`.
- Require candidate-private TypeScript and exact lock version.
- Reject v1alpha3 and independently validate v1alpha4.
- Preserve canonical base64 install logs.
- Emit and authenticate a failed-install receipt.
- Compile the real `tsconfig.json`.
- Import `ajv` and `jsonc-parser` in a fresh ESM process.
- Reinspect the candidate dependency closure unchanged.
- Remove dependency/build output and reconstruct the exact source.

## Pre-Commit Gates

- `node --check` on changed JavaScript.
- Biome format and lint.
- Focused release suite: 55/55.
- Exact-lock causal probe: install, typecheck, ESM, closure, and cleanup pass.
- Template checker and `git diff --check`.

## Post-Commit Gates

- Exact copied production lifecycle.
- `npm.cmd run verify`.
- One canonical gate invocation for the exact commit.
- Fresh three-lane R2.
- Hosted CI.
