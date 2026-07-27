# Goal Synthesis

## Status

Ready for compilation.

## Goal And Criteria

Build and independently verify the local Triage Board defined by AC1-AC9 in `spec.md`.

## Modules And Circuit

```txt
closed goal
  | implement.domain ─┐
  | implement.ui ─────┴─> integrate.application -> review.application
  | verified handoffs -> integration owner -> memory
```

The owner-approved module definitions and stable interfaces are in `app-contract.md`.

## Assumptions And Decisions

- Browser-native JavaScript is selected to remove dependency installation and framework setup.
- Two implementation roots may run concurrently because their write scopes do not overlap.
- The integration specialist waits for both roots and owns only controller, example metadata, and
  combined verification files.
- The final reviewer is read-only and independent from every producer.

## Authority And Capabilities

All agents may read the feature contract and their dependency outputs. Write permission is limited
to each blueprint's declared files. Network, secrets, Git mutation, package installation, merge,
and memory mutation are forbidden specialist effects.

## Work Units And Agent Demand

| Work unit | Dependency | Capability | Write scope |
| --- | --- | --- | --- |
| `implement.domain` | none | Domain validation and deterministic testing | model, storage, unit tests |
| `implement.ui` | none | Accessible operational interface design | HTML and CSS |
| `integrate.application` | both roots | Browser controller and combined application integration | controller, package metadata, example README |
| `review.application` | integration | Independent correctness, accessibility, and scope review | none |

Every unit returns one exact `SpecialistAgentHandoff` with its required evidence and artifact.

## Optimization Assessment

The serial candidate is mandatory. The useful parallel candidate runs the two disjoint roots
together, then integration, then independent review. More concurrent writers would add conflicts
without reducing the dependency path.

## Compiler Preview

V12 performed `exhaustive_partition_search_fixed_scheduler` over all 15 partitions. Five were
eligible. The one-agent serial baseline projected 25 planning units but was ineligible because it
could not satisfy producer/reviewer independence. The selected four-specialist atomic partition
projects 22 planning units with peak concurrency two and three dependency handoffs.

- Compilation: `sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82`
- Package: `sha256:2fe0cfb24e45b47a847b3d4f2213c7f29a8ed4fa94a99feed8294d1789f98bcb`
- Initial eligible wave: `implement.domain`, `implement.ui`
- Deferred waves: `integrate.application`, then `review.application`

## Verification And Integration

- Domain producer evidence covers AC3, AC4, and domain portions of AC1, AC2, and AC6.
- UI producer evidence covers presentation portions of AC1, AC2, and AC5.
- Integration evidence covers AC1-AC6.
- Independent review covers AC8.
- The V12 package, session, and raw handoffs cover AC7.
- Implementation notes and memory updates cover AC9.

## Handoff

`ready`: the exact package is approved and verified; launch only the two dependency-eligible root
contracts.
