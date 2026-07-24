# Revision 49 Root Cause Analysis

## Reproduction

Revision 47's exact gate materialized the committed tree without `node_modules`. Revision 48 installed exact-lock dependencies, but its first independent review showed that verification still selected a host TypeScript path and could resolve undeclared ancestor packages.

## Evidence

- Review verdict: `fix`.
- Reviewed gate digest: `sha256:33ef4a7a5c04e5c2dc39d3489d6c1381270f8de6534c72d6a8f5609a5b6c6720`.
- Reviewed R2 digest: `sha256:a39e9326895800e165d7d2e29197d0e789597e0293a5a85445bae5338b2d632c`.
- The old copied lifecycle compiled a bounded smoke file with `--ignoreConfig --skipLibCheck`.
- A failed `npm ci` threw before receipt creation.

## Confirmed Cause

Dependency provenance, executable authority, resolver isolation, failure evidence, and causal tests were implemented as adjacent checks rather than one closed candidate-private boundary.

## Causal Fix

Receipt v1alpha4 binds candidate-private TypeScript, libc-aware lock derivation, exact ancestor absence, successful or failed install evidence, closure stability, and cleanup. The copied lifecycle now compiles the real project and executes fresh runtime imports.

## Regression Boundary

The focused suite and causal probe must pass before commit. The exact committed lifecycle and full verifier must then pass before the one permitted gate invocation.
