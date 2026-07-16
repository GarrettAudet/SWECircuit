# V11 Specialist Compiler Goal Synthesis

## Status

Ready for contract implementation.

## Goal And Criteria

Goal: ship an IDE-agnostic repository capability that converts stable atomic software work into the fastest safe, least-coordinated, evidence-complete specialist team under owner ceilings.

Stable criteria: AC1-AC12 in `spec.md`.

## Modules And Circuit

```txt
clarify | spec | architecture_review | plan | specialist_agent_compiler
        | implement | verify | review | memory
```

V11 implements `specialist_agent_compiler` and its provider-neutral handoff. Existing workflow modules remain the semantic source of atomic work units.

## Assumptions And Decisions

- Owner decision: specialize from exact task demand, never generic roles.
- Owner decision: optimize useful parallelism while preserving a strong serial baseline.
- Owner decision: remain IDE/API/model/provider agnostic.
- Architecture decision: defer runtime scheduling and ship the pure compiler first.
- Low-risk assumption: integer effort/start/handoff weights are sufficient for deterministic V11 planning comparisons.

These decisions map to GoalContract work units and authority, compiler hard gates and comparator, AgentBlueprint forbidden fields, and the digest-bound rendered manifest.

## Authority And Capabilities

- Current branch: `codex/v11-orchestration-planner`.
- Core authority: pure input validation, deterministic computation, and returned file values only.
- No filesystem, network, provider, credential, process, merge, or durable-memory authority enters compilation.

## Work And Agent Intents

The remaining implementation decomposes into contract/docs, compiler/algorithm, tests/golden fixtures, package integration, IDE/public docs, dogfood, and independent review. Until the compiler exists, one integration owner keeps overlapping TypeScript and public-contract edits serialized; read-only analysis and later independent review can fan out safely.

Every compiled specialist will derive from owned work-unit IDs rather than an authored role. Exact objectives, modules, ports, context, authority, evidence, dependencies, handoff, and stops are compiler output.

## Optimization Assessment

Serial baseline: one agent owns all remaining V11 work and performs one integrated verification/review chain.

Current safe candidate: one integration owner implements the tightly coupled compiler surface while independent read-only sidecars inspect existing kernel conventions and checker/process obligations. Golden-test design and later review can fan out once file scopes are disjoint.

Rejected over-split candidate: separate concurrent writers for types, validation, scheduling, digesting, and exports before the contract compiles. Those files share public types and invariants, so expected merge/reconciliation cost exceeds safe speed benefit.

The implemented compiler will recompute the real candidate comparison for later V11 tasks and replace this qualitative preview with exact metrics.

## Compiler Preview

Not runnable yet. The intended direct call is `compileAgentBlueprints({ goal, options, proposedCandidates })`; it constructs candidates internally and returns one digest-bound `AgentBlueprintCompilation` without runtime supply.

## Verification And Integration

- Exact/ bounded search and six golden selection cases.
- Strict source, declaration, package, consumer, template, and checker gates.
- Real V11 dogfood package.
- Three independent exact-commit acceptance reviews.

## Handoff

`ready`: implement the closed contract and validate the first golden serial/parallel cases before widening public docs.
