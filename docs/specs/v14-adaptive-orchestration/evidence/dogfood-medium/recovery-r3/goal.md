# Impact Planner Recovery Revision 3

## Goal

Rebuild the successor package against the exact corrected Impact Planner bytes, independently re-verify the complete product, and obtain a fresh independent review without changing application code.

## Confirmed Cause

Revision 2 compiled its downstream specialist contracts before the graph recovery agent changed `examples/impact-planner/src/graph.js`. The repaired file was functionally correct and passed all tests, but its raw digest and byte count no longer matched the package context identity. The independent reviewer correctly returned `fix`.

## Scope

- Rebind every repository context source to the current candidate bytes.
- Verify the revision-2 graph recovery and integration handoffs.
- Run the complete Impact Planner test and syntax suites.
- Inspect security, accessibility, offline behavior, persistence, import/export, deterministic impact analysis, and browser behavior.
- Independently review the fresh package and exact candidate.

## Non-Goals

- Do not modify application or test files.
- Do not weaken context verification, handoff verification, or package identity.
- Do not install dependencies, access the network, update durable memory, mutate Git, or merge.
- Do not reinterpret the original application contract.

## Acceptance Criteria

1. Every declared repository context source matches its exact raw SHA-256 digest and byte count.
2. The revision-2 graph recovery and integration handoffs verify against their approved package identities.
3. The complete Impact Planner suite passes with no application changes.
4. Bounded localhost browser inspection confirms the critical user path with no console errors.
5. A separate read-only reviewer verifies context identity, predecessor lineage, product acceptance, security, accessibility, and evidence.
6. The adaptive run preserves revision-2 as a `fix` predecessor and settles only exact verified handoffs.

## Required Outcome

Revision 3 may return `pass` only when both the verifier and independent reviewer return schema-valid `pass` handoffs. Any identity mismatch, product regression, evidence gap, or material finding routes to another explicit successor.
