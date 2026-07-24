# Revision 43 Correction Contract

## Trigger

Revision 42 failed exact committed-source identity authentication before lifecycle execution.

## Objective

Bind the corrected release-gate digest to its exact 47,552-byte source length.

## Scope

- One byte-count field in the copied-production lifecycle identity map.
- Candidate 19 retirement and active release trace.

Runtime behavior, public APIs, schemas, modules, review topology, and gate authority are out of scope.

## Required Behavior

1. The committed gate byte count and SHA-256 digest match the exact source.
2. The copied lifecycle advances past identity authentication.
3. All later release gates retain their existing acceptance criteria.

## Route

`verify -> fix -> verify`