# Revision 45 Correction Contract

## Trigger

Revision 44's copied lifecycle passed gate authority checks, then a release-review negative route failed because gate-only supply authority crossed the process boundary.

## Objective

Keep host dependency and TypeScript supplies available to the canonical gate while excluding them from the independent release-review parent.

## Scope

- Lifecycle review-parent environment construction.
- Existing release-review consumer regression.
- Candidate 21 retirement and release trace.

Gate receipt semantics, product APIs, schemas, specialist compilation, IDE Run Loop behavior, and runtime host effects are out of scope.

## Required Behavior

1. Remove the host dependency root key before release-review parent launch.
2. Remove the host TypeScript entrypoint key before release-review parent launch.
3. Preserve explicit supplies in canonical-gate environments.
4. Make the existing consumer suite assert both exclusions.
5. Pass exact lifecycle and all remaining release gates.

## Route

`verify -> fix -> verify`