# Candidate 7 Isolation-Test Correction Contract

## Goal

Retire Candidate 7 and independently verify the smallest causal correction for its exact-gate failure without weakening host-owned TypeScript enforcement.

## Frozen Diagnosis

Candidate 7 preserved exact source, disposable Git context, live repository state, and cleanup. Its canonical command passed 404 of 405 tests. The only failure occurred when the host-supply unit test called `resolveHostTypeScriptEntrypoint` with an empty synthetic environment inside the dependency-free candidate and therefore attempted to inspect candidate-local `node_modules`.

The production gate had already injected one validated `SWECIRCUIT_TYPESCRIPT_ENTRYPOINT` outside the candidate. The failure was an environment-sensitive unit-test default, not a production host-supply failure.

## Required Correction

- Permit the internal resolver test seam to receive an explicit default entrypoint.
- Keep the production default unchanged when no test-only third argument is supplied.
- Make the unit test use a temporary external plain file as its default.
- Prove injected defaults still reject relative, symbolic, and candidate-contained paths.
- Preserve Candidate 7 and its receipt and raw logs as immutable failed evidence.
- Do not create dependencies or runtime state inside candidate source.

## Authority

This package is read-only. The specialist may inspect the frozen evidence and corrected source and run the focused test commands, but may not edit files, alter Git state, use network access, launch descendants, or claim release approval.

## Pass Condition

Return `pass` only if the exact failure is causally closed, production enforcement remains unchanged, the focused regression passes, and no security or traceability regression is found. Otherwise return `fix`, `diagnose`, or `block` with exact evidence.
