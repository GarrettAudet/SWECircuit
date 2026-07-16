# V11 Specialist Compiler Test Plan

## Status

In progress. Expected evidence is defined; implementation results remain pending.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification |
| --- | --- |
| AC1 | Public-API unit test compiles a valid goal and checks every selected blueprint field. |
| AC2 | Exact partition-count tests plus logical-order permutation and repeat-byte tests. |
| AC3 | Above-limit bounded-search fixture checks mode, sources, counts, and honest metadata. |
| AC4 | Six golden optimization fixtures assert selected canonical partitions and decisive metrics. |
| AC5 | Table-driven malformed/reference/authority/context/privacy/cycle/evidence/role-shape rejection tests. |
| AC6 | Blueprint closure, union, dependency, evidence, handoff, stop, and forbidden-field assertions. |
| AC7 | Serial visibility plus high-overhead, no-benefit, and required-independence selection tests. |
| AC8 | Renderer byte determinism, digest verification, hostile-text containment, and no-I/O tests. |
| AC9 | Dogfood run and manual IDE kickoff walkthrough. |
| AC10 | `npm.cmd run verify`, template checker, checker matrix, export probe, and hosted matrix. |
| AC11 | Source-linked dogfood package with compiler output and observed comparison. |
| AC12 | Three independent exact-commit PASS verdicts and completed review/milestone. |

## Automated Checks

- Unit: goal validation, authority projection, candidate generation, scheduling, metrics, selection, blueprint compilation, digesting, and rendering.
- Integration: public root exports, packed consumer, and generated specialist package consumed by a minimal IDE-host fixture.
- E2E: one goal contract through compile, render, simulated handoff verification, and package inspection without network access.
- Typecheck: strict TypeScript 7 project and clean installed consumer.
- Lint: Biome on source, tests, fixtures, and scripts.
- Build: declaration/source-map ESM build and package dry run.

## Golden Optimization Cases

1. `one-agent-optimal`: startup/handoff costs make the serial roster strictly best.
2. `genuinely-parallel`: disjoint heavy work shortens projected makespan with two specialists.
3. `under-split`: required producer/checker independence makes the serial partition ineligible.
4. `over-split`: atomic agents lose to a cohesive partition through handoff and startup costs.
5. `conflict-heavy`: equal write/conflict keys serialize apparent parallel work and prevent a false speed win.
6. `generic-role`: an extra `role` or provider-shaped field fails the closed candidate contract; the valid replacement compiles from exact work ownership.

## Manual Checks

- Read the generated package as a first-time IDE user and identify goal, selected roster, each specialist's exact boundary, launch digest, integration order, and required evidence without consulting implementation code.
- Compare serial and selected candidates and confirm the explanation follows the documented comparator.
- Confirm no README or guide claims that SWECircuit executes, schedules runtime capacity, sandboxes, merges, or updates memory in V11.

## Regression Coverage

- Reordered arrays or supplied candidate labels cannot change logical selection.
- Post-call mutation cannot change compiled values.
- Duplicate work ownership, group-induced cycles, unresolved context, authority surplus, missing evidence, and same-agent forbidden checks never produce a launchable compilation.
- Bounded output does not retain every exact-search candidate while its ordered evaluation digest remains stable.
- Generated Markdown cannot escape its dynamic fence.
- Existing V9/V10 exports and behavior remain unchanged.

## Skipped Checks

- Real provider execution, model comparison, worktree isolation, runtime cancellation, merge, and memory mutation are outside V11.
- No wall-clock speed claim is accepted from planning weights; observed dogfood timings are descriptive only.

## Verification Evidence

Pending T003-T010. Record exact commands, candidate commit, counts, durations, fixture hashes, dogfood artifacts, and reviewer verdicts here as they complete.
