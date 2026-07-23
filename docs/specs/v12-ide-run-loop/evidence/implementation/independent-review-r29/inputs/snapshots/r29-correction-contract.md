# Revision 29 Copied-Lifecycle TypeScript Execution Contract

## Trigger

The exact Revision 28 package-bound reviewer returned verified `fix`: the copied fixture replaces `verify` with syntax-only checks, so its canonical lifecycle never executes or receipts the supplied TypeScript compiler through the production launcher.

## Objective

Make copied-production verification execute one bounded TypeScript compilation through `scripts/run-typescript.mjs`, prove the complete external binding and compiler sentinel from canonical raw evidence, and fail closed when the compiler persistently mutates during compilation.

## Scope

- `test/helpers/v12-release-review-lifecycle.mjs`
- `test/lifecycle/v12-release-review-lifecycle.test.mjs`
- `test/v12-release-review.test.mjs`
- One bounded TypeScript smoke fixture under `test/fixtures/`
- Production-identity values and release evidence that become causally stale

Do not weaken `scripts/run-typescript.mjs`, the canonical release gate, candidate materialization, package boundaries, cleanup, host duties, or the Candidate 13 one-shot rule.

## Required Behavior

1. The copied fixture `verify` command invokes the production TypeScript launcher against a bounded source input.
2. The externally supplied entrypoint is a plain, single-link, candidate-external wrapper whose exact bytes are authenticated by the existing launcher and which delegates to the real host TypeScript compiler.
3. A successful compilation emits one unique sentinel. The canonical log contains that sentinel and exactly one parseable `SWECIRCUIT_TYPESCRIPT_BINDING` receipt matching the supplied wrapper path, bytes, digest, link count, supply flag, and observed version.
4. Lifecycle output preserves the wrapper binding, delegated host binding, smoke-input identity, parsed receipt, sentinel count, and canonical log binding.
5. A separate exact copied candidate uses an external compiler that remains unchanged for version inspection, mutates its own bytes during compilation, and exits. The canonical gate must return `fail`, and its raw log must contain `TypeScript binding changed after compilation.`
6. Both positive and negative copied candidates preserve exact materialization, disposable Git context, live tracked state, evidence bytes, and cleanup.

## Host Boundary

The wrapper is test evidence for production-launcher behavior. It does not convert the kernel into a sandbox or authenticate transitive compiler files. Concurrent-writer isolation, trusted transitive bytes, native executables, runtime supply, process isolation, persistence, and merge remain external host duties.

## Acceptance

Revision 29 can return `pass` only after focused tests, formatting, lint, typecheck, build, the exact copied lifecycle, the canonical aggregate, refreshed source-bound V11 replay, and a fresh immutable package-bound independent review all pass. Candidate 13 must remain unconsumed until then.