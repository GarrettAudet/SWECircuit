# Revision 48 Correction Contract

## Trigger

Revision 47's one-shot gate failed at `TS2688` after its lifecycle and complete verifier passed.

## Objective

Make the exact materialized candidate self-contained for TypeScript and Node ESM dependency resolution without ancestor fallback, live network access, install scripts, or unbound runtime authority.

## Required Behavior

1. Require candidate `node_modules` to be absent before provisioning.
2. Validate the exact candidate lock inventory, registry URLs, SRI, versions, platform applicability, and non-linked package entries.
3. Run authenticated npm with `ci --offline --ignore-scripts --no-audit --no-fund`.
4. Resolve direct dependencies inside candidate-private `node_modules` and place its `.bin` first in the closed command PATH.
5. Bind package and lock identities, exact install command/result, raw stdout/stderr, and the complete private closure in receipt v1alpha3.
6. Require toolchain, host closure, and candidate closure stability through verification.
7. Remove candidate dependencies and build output, then prove exact source, Git state, and cleanup.
8. Reject receipt v1alpha2 or any private-supply drift.

## Scope

Release-gate execution, receipt validation, causal tests, copied-lifecycle assertions, immutable Revision 47 evidence, and release trace only. Product APIs, schemas, IDE Run Loop semantics, provider choice, spawning, integration, and merge effects are unchanged.

## Route

`verify -> diagnose -> fix -> verify`