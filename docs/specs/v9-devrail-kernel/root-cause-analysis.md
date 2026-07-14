# Root-Cause Analysis

Use this file when a failure required diagnosis or when a fix should teach future work.

## Status

Complete.

## Trigger

The required patch helper failed before creating the V9 intake artifacts.

## Reproduction

Use the exact helper invocation and absence checks recorded in debug-notes.md.

## Confirmed Root Cause

The Windows workspace patch-helper sandbox refresh failed before file access. The error signature and zero-write state match the V8.1 known issue.

## Why It Was Missed

The issue was not considered resolved; V8.1 explicitly retained it as a tool limitation. The normal edit policy still requires trying the patch helper first, so V9 reproduced the failure immediately.

## Fix

Use the repository-authorized bounded PowerShell write fallback only for the intended workspace files, then require diff review, positive validation, and regression validation.

## Regression Coverage

The repository checker and its fifteen-case regression suite validate the recovered artifacts. A platform-level patch-helper regression cannot be added inside this repository.

## Follow-Up Work

Keep the external patch-helper issue in failed attempts until the environment changes. Do not generalize direct-write fallback beyond the workspace and intended files.

## Memory Update

The existing failed-attempt and recovery-pattern entries remain authoritative. V9 implementation notes link this recurrence to the source evidence.

## T006 Parser And Validator Boundary RCA

### Trigger

The first schema-valid multi-artifact project caused an unexpected exception during Ajv uniqueItems validation.

### Confirmed Root Cause

jsonc-parser getNodeValue intentionally creates null-prototype objects. Ajv 8.20.0 delegates object equality for uniqueItems to a comparator that calls valueOf, which those objects do not have.

### Why It Was Missed

The toolchain probe proved imports, duplicate-key visibility, and isolated Ajv validation, but it did not pass getNodeValue output containing object arrays through an Ajv schema with uniqueItems.

### Fix

Keep jsonc-parser as the duplicate-aware structural parser, then use the native strict JSON.parse result after all parser-tree checks pass. Inputs remain capped at 1 MiB, so the second bounded parse does not create an unbounded resource path.

### Regression Coverage

The complete parallel-project fixture contains object arrays across modules, work packets, routes, joins, and fan-outs. It must validate without throwing, and all expected user-input failures must continue to return structured results.

### Follow-Up Work

Add parser-to-consumer compatibility to future dependency spikes whenever a library returns nonstandard object prototypes.

### Memory Update

Promote the parser-boundary lesson to implementation notes now and to durable patterns when T006 passes independent review.
## T010 Dogfood Review And Cleanup RCA

### Trigger

Two read-only reviewer attempts exceeded the integration owner's bounded handoff sequence, and the recovered implementation review found a possible temporary-workspace leak before the main guarded block.

### Confirmed Root Causes

- The external subagent runtime does not give V9 automatic heartbeat, deadline, interrupt-completion, or retry enforcement. File contracts supplied intent, but the integration owner still had to close and replace stalled attempts.
- `runDogfood()` started its guarded operation block after invoking the workspace callback and creating the project directory. Ownership was known, but cleanup was not yet guaranteed if either action threw.

### Smallest Causal Fix

- Preserve each stalled attempt, close it centrally, and retry a narrower read-only contract with the proven reviewer. Do not describe this manual recovery as kernel enforcement.
- Start the guarded block immediately after workspace identity capture, moving the callback and directory creation inside it.

### Regression Coverage

`test/dogfood-harness.test.mjs` injects one failure immediately after ownership capture and another during the operation circuit. Both capture the owned root and prove it is absent after failure. The run record preserves reviewer identities, failure sequence, recovery, findings, and final `PASS`.

### Durable Boundary

V9 can validate and reconstruct typed liveness evidence but cannot make an external agent runtime honor deadlines. Runtime enforcement remains future adapter or orchestrator work. Cleanup guarantees begin only after identity capture; if identity capture itself fails, conservative preservation remains safer than unproven deletion.
## T011 Packed-Consumer Gate RCA

### Trigger

AC6 named clean-package and clean-consumer checks, but the existing canonical gate only performed a package dry run and source-checkout execution.

### Confirmed Root Causes

- A Windows command shim is not a portable direct `spawnSync` executable in this host; npm's JavaScript entrypoint is the stable shell-free boundary available inside an npm script.
- The sandbox does not permit npm to mutate the user-profile cache, so cache ownership must remain inside the workspace.
- `npm ci` warms exact tarball content from the root lock without necessarily caching registry package metadata. A loose offline install still asks the resolver for that metadata.

### Smallest Causal Fix

- Invoke `npm_execpath` through `process.execPath`.
- Set the project cache to ignored `.local/npm-cache` and pass it explicitly inside the isolated consumer.
- Pack the private repository artifact, derive only the production dependency closure from the pinned root lock, generate an isolated consumer lock with exact resolved URLs and integrities, and run `npm ci --offline`.
- Execute the installed library from the consumer's `node_modules`, verify init, validate, and inspect, and remove only the identity-rechecked run-owned temporary root.

### Regression Coverage

`npm run verify` now includes the packed-consumer check after format, lint, typecheck, 209 tests, build, and package inspection. The check fails if required package files are absent, source/test/script files ship, package metadata gains a `bin`, installation needs the registry, module resolution escapes the consumer package, any shipped operation fails, or cleanup identity changes.

### Durable Boundary

This is a private artifact-consumption check, not package publication, registry ownership, or public CLI evidence. The root `npm ci` must warm the ignored repository-local cache before the explicitly offline consumer install. Cross-platform proof remains branch-CI evidence rather than a local inference.
