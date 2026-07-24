# Candidate 18 Retirement

## Candidate

V12 Revision 41 commit `da989f38c85431fa967352417d8222f50a72263d`, tree `9749361a7033fc400b6b3859639b24a8b7b4c9ce`.

## Verification Outcome

The exact committed-source `npm.cmd run verify` invocation ran for 520.8 seconds. Core verification passed, then the copied-production lifecycle failed before later dogfood, packaging, and consumer gates could complete.

Stable error: the copied canonical gate attempted to inspect candidate-local `node_modules/typescript/bin/tsc`, which is intentionally absent from its committed materialization.

## Root Cause

Revision 41 closed ambient environment authority but resolved the TypeScript entrypoint from the already-sanitized child environment. That discarded the explicit host supply accepted at gate startup and selected the copied candidate's nonexistent default path.

## Retirement

No Candidate 18 canonical gate was invoked or consumed. Candidate 18 is retired without reinterpretation. Revision 42 is the bounded successor and must pass the same committed lifecycle before its one-shot gate can run.