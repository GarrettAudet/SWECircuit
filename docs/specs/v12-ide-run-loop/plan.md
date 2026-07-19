# Implementation Plan

## Status

Architecture accepted; implementation compilation is next.

## Steps

1. Compile and run independent product, lifecycle, and authority architecture analyses through V11.1.
2. Verify their raw handoffs, assess dependency fan-in, and freeze one V12 ADR and contract.
3. Recompile implementation work from the accepted design into disjoint code, schema, docs, and verification units.
4. Integrate through one owner, run focused and canonical verification, and obtain independent final review.
5. Dogfood the completed V12 loop, update memory and the milestone, publish a version branch, and merge only after owner approval.

## Architecture Approach

Implement the accepted four-operation `SpecialistRunSession` contract in `specialist-run-contract.md`. The session embeds the verified package and exact accepted handoffs, derives dependency eligibility and routing, and performs no scheduling or runtime effect.

## Dependencies

- V11.1 is the exact baseline and compiler used for dogfooding.
- The Round-4 correction design is mandatory input for any runtime-adjacent behavior.
- Architecture fan-in passed and is bound by `integration-verification.json`.

## Rollback

Every compilation and handoff is immutable and revisioned. A failed architecture or implementation candidate is preserved and retired; the branch returns to the last accepted design without rewriting evidence.
