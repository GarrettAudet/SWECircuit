# Verify Release Gates Handoff: Attempt 1

## Binding

- Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
- Agent: `agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8`
- Work unit: `verify.release-gates`
- Verdict: `FIX`

## Failure

`npm.cmd run verify` exited `1` during `format:check`:

```text
Checked 71 files in 39ms. No fixes applied.
Found 2 errors.
scripts\fixtures\packed-consumer-host.ts format
scripts\run-v10-dogfood.mjs format
```

Biome reported formatting differences in both files. The stop condition prevented later package, consumer, dogfood, and template gates from being claimed.

## Handoff

```yaml
summary: >-
  Context integrity passed and both focused V11 suites passed, but the canonical
  kernel gate failed on two formatting violations.
workUnitsCompleted:
  - verify.release-gates: FIX
artifacts:
  - release-gate-evidence.md: returned inline; not written because authority is read-only
evidence:
  - context.compiler-tests: 34973 bytes, SHA-256 matched
  - context.schema: 14065 bytes, SHA-256 matched
  - context.schema-tests: 8982 bytes, SHA-256 matched
  - context.spec: 8132 bytes, SHA-256 matched
  - command: node --test test/specialist-schema.test.mjs
    result: PASS, exit 0, 6/6 tests
  - command: node --test test/specialist-compiler.test.mjs
    result: PASS, exit 0, 20/20 tests
  - command: npm.cmd run verify
    result: FIX, exit 1, format:check found 2 errors
assumptions:
  - The compiled package represents the dependency's delivered candidate.
  - Canonical verification must stop immediately after the first failing gate.
risks:
  - Remaining kernel, dogfood, package dry-run, installed-consumer, and template evidence remains unverified.
followUps:
  - Format the two reported files under authorized implementation ownership.
  - Re-run this exact independent release-gate contract from the beginning.
```

## Integration Response

The integration owner formatted only the two reported files. `npm.cmd run format:check` then passed across 71 files. This attempt remains preserved and is superseded only if the same compiled specialist completes the full rerun.
