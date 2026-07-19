# Goal Synthesis

## Status

Reviewed for the architecture compilation.

## Goal And Criteria

Define an implementation-ready V12 architecture for a portable IDE Run Loop over one approved V11 specialist package. The design must satisfy AC1-AC9 in `spec.md` while keeping runtime supply and effects external.

## Modules And Circuit

```txt
reviewed V12 goal | product run-loop review | lifecycle/recovery review | authority/portability review | architecture synthesis
```

Selected owner-approved Modules:

- `spec`: testable product and IDE interaction contract.
- `architecture-review`: boundary, lifecycle, state, and ADR review.
- `plan`: implementation decomposition and verification mapping.
- `review`: independent evidence before implementation.

Required source records include ADR 0004, the deferred Revision-5 correction design, the Round-4 findings, the V11 compiler contract, the IDE kickoff, the V10 executor boundary, and the current public API.

## Assumptions And Decisions

- `assumption.host-assisted`: V12 coordinates host actions but performs no host effect. This is the smallest path to real IDE use.
- `assumption.single-package`: one run binds one approved specialist package. Multi-package runtime graphs remain deferred.
- `assumption.caller-persistence`: core returns immutable serializable values; the external host persists them.
- `decision.operation-shape`: non-blocking; architecture specialists recommend exact public operations before implementation.
- `decision.closeout-envelope`: non-blocking; architecture specialists recommend the smallest truthful closeout evidence.

## Authority And Capabilities

The architecture pass is read-only. Specialists may inspect only declared repository sources and return review artifacts. They may not edit files, run tests, access the network, launch descendants, or change Git state. The main agent remains the integration owner.

## Work Units And Agent Demand

- `analyze.product-run-loop`: define the one-message UX, artifact journey, usability boundary, and smallest valuable V12 behavior.
- `analyze.lifecycle-recovery`: map the deferred Round-4 obligations to a bounded monotonic session and identify what must remain deferred.
- `analyze.authority-portability`: audit package identity, handoff acceptance, host authority, persistence claims, and IDE neutrality.
- `integrate.architecture`: consume all three exact handoffs and produce one implementation-ready architecture decision brief, operation set, state model, failure routes, and test obligations.

The first three units are independent and read-only. Architecture integration depends on all three. Their write scopes are disjoint because every result is returned as a raw handoff rather than written into the repository.

## Optimization Assessment

The serial baseline is valid but unnecessarily delays three independent investigations. A legal parallel candidate can run the product, lifecycle, and authority analyses concurrently, then fan in once for architecture synthesis. V11 must evaluate every legal partition under the fixed scheduler and select the result rather than accepting a hand-authored roster.

## Compiler Preview

Pending exact context binding and `compileAgentBlueprints`. No provider, model, prompt, executor, credential, grant, or runtime profile enters the request.

## Verification And Integration

- Product evidence owns AC7 and the visible one-message path.
- Lifecycle evidence owns AC2-AC6 state and routing semantics.
- Authority evidence owns AC1, AC3-AC6, and AC9 boundary risks.
- Architecture synthesis maps every recommendation to AC1-AC9 and identifies implementation work units.
- The main agent verifies raw handoffs, assesses transitive fan-in, and freezes the integrated design.

## Handoff

`ready`: bind exact sources, compile the architecture specialists, review the deterministic roster, render and verify the package, then launch only the exact contracts.
