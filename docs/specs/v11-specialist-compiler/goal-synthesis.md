# V11 Specialist Compiler Goal Synthesis

## Status

Compiled and dogfed. Revision-6 technical acceptance and post-integration reconstruction passed; clean branch preparation and the owner merge decision remain open.

## Goal And Criteria

Goal: ship an IDE-agnostic repository capability that converts stable atomic software work into the fastest safe, least-coordinated, evidence-complete specialist team under owner ceilings.

Stable criteria: AC1-AC13 in `spec.md`; all passed against the revision-6 digest pair.

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
- Release decision: any document integration may mutate is bound through an immutable pre-integration snapshot, and both trusted digests must reconstruct after integration before branch freeze.

These decisions map to GoalContract work units and authority, compiler hard gates and comparator, AgentBlueprint forbidden fields, and the digest-bound rendered manifest.

## Authority And Capabilities

- Current branch: `codex/v11-orchestration-planner`.
- Core authority: pure input validation, deterministic computation, and returned file values only.
- No filesystem, network, provider, credential, process, merge, or durable-memory authority enters compilation.

## Work And Agent Intents

Revision-6 dogfood decomposed release acceptance into six stable units: candidate preparation, product/API review, algorithm/lifecycle review, security/trace review, release verification, and release integration. The compiler selected one exact task-shaped blueprint for each unit and preserved their dependencies, context, authority, evidence, handoff, and stops.

The external host executed those contracts and preserved attempts 1-6, including the final attempt-5 replay `FIX` and release-host `FIX` retries 6A/6B. Core constructed and verified the package; it did not select providers, enforce permissions, execute work, persist handoffs, integrate changes, or merge.

## Optimization Assessment

Serial baseline: one agent owned all six work units, projected 40 planning units, and was ineligible because requested producer/reviewer independence could not be satisfied.

Selected candidate: six exact specialists, projected 23 planning units with peak concurrency 4, zero declared conflict pairs, eight handoffs, and visible duplicated context/permission costs. Exact search evaluated all 203 allowed canonical partitions and found 52 eligible.

Supplied consolidated-review alternative: four agents, projected 41 planning units. It remained eligible but lost under the fixed comparator.

The source-linked run is in `evidence/dogfood/report.json`. Planning values compare declared structure; they are not wall-clock predictions or runtime measurements.

## Compiler Preview

Runnable through `compileAgentBlueprints({ apiVersion: SPECIALIST_API_VERSION, kind: "SpecialistCompilationRequest", goal, proposedCandidates })`. It constructs candidates internally and returns one digest-bound `AgentBlueprintCompilation` without runtime supply; `renderSpecialistPackage(compilation)` returns the provider-neutral launch files.

## Verification And Integration

- Exact and bounded search, six golden selection cases, and fixed-scheduler rules passed.
- Strict source, declaration, package, consumer, template, canonical, and negative-matrix gates passed.
- Real V11 dogfood preserved the compilation, package, serial comparison, selected metrics, attempts, and handoffs.
- Three independent digest-bound acceptance reviews passed with no findings.
- Preparation and every reviewer bound `context.spec` only to the immutable pre-integration snapshot; the integration owner then reconstructed both trusted digests after the authorized output updates.

## Handoff

`pass` to branch freeze and the owner gate. Review compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161`, package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`, `review.md`, and `docs/milestones/v11.md`. [Post-integration replay](evidence/dogfood/handoffs/post-integration-replay-pass-attempt-6.md) reconstructed the approved pair after these output changes. Create and push the reviewed candidate, then request the explicit stacked V10+V11 merge decision. Stop before merge until approval.