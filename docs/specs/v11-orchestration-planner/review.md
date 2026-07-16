# V11 Review

## Status

Round 3 is complete with four `REVISE` verdicts against exact commit `79f2b4e`; specialist and architecture-coherence preflights then returned four high/four medium and six high/six medium findings. Their revision-4 contract corrections are integrated and locally verified in the current working tree, but the tree remains unfrozen and unreviewed. This is not an implementation or merge review.

## Review Outcome

Round 3 inspected exact commit `79f2b4e069d13910b561ffe4f6ca04a1b13acb61` through four fresh read-only roles and found 15 high and 10 medium raw issues. The gate correctly stopped implementation and emitted `redesign`; complete evidence is preserved in `architecture-review-round-3.md`.

Revision 4 now addresses the 14 converged Round-3 obligations plus the owner's clarified requirement that the system construct optimized task-specific agents rather than merely match work to vaguely named profiles. A read-only specialist-compiler dogfood preflight then emitted `redesign` with four high and four medium gaps preserved in `specialist-compiler-preflight.md`. A separate coherence preflight found six high and six medium construction, continuation, API-union, and byte-reachability defects preserved in `architecture-coherence-preflight.md`. Those corrections are integrated in the current source chain. No revision-4 PASS verdict or runtime evidence exists yet.

## Spec Alignment

The revision-4 target is one IDE-agnostic path from a user message through repository-shipped `synthesizeGoal` and `goal-synthesis.md` to an approved module rail, serial/candidate specialist comparison, pure profile-free `compileAgentBlueprints`, explicit task-shaped AgentBlueprintIntents, complete supply-free AgentBlueprints, materialization receipts, bounded conflict-safe parallel waves, deterministic integration, qualified evidence, independent verification/review, a final repository-state witness, owner approval, merge-ready evidence, trace, and learning candidates.

The visible kickoff may select existing owner-approved catalog modules, name an optimization baseline, and record low-risk assumptions. A novel module, gate, route, authority grant, public-behavior choice, or destructive/security-sensitive capability must stop for an owner decision before effects, and the decision record must map to the exact launched field that reflects it.

## Architecture Alignment

ADR 0003, `orchestration-contract.md`, and `specialist-agent-compiler.md` now describe:

- Status-specific one-agent and multi-agent facade continuations carrying AcceptedWorkAccumulator semantics, with explicit interactions and facade start rejection.
- Causal planning/run clarification and per-activation approval.
- Independent pure `compileAgentBlueprints` with no runtime supply, predecessor-safe EvidenceBinding construction, and one complete task-shaped AgentBlueprint per invocation bound to TaskAuthorityProjection with registered context-use/field digests and exact structural measurements.
- A repository-shipped IDE synthesis contract and feature-package goal-synthesis record.
- A prompt-free host-attested AgentMaterializationReceipt before dispatch.
- Qualified EvidenceBindings and core-owned EvidenceSatisfactions.
- Deterministic matching, conflict-safe waves, attempt consumption, and exact reserves.
- Opaque capture of the real one-shot V10 dispatch result.
- Route-first outcomes, declared exits, queued-input pruning, and exhaustive terminal closure.
- Pre-request-bound RepositoryStateRequest, final RepositoryStateWitness, then acyclic AcceptedWorkProjection and MergeReadyEvidence.
- Closed SourceReference locators, derived-digest registry, detached GrantOffer references, byte-reachable resource arithmetic, portability projection, comparators, and additive package surface.

These are candidate contracts until the exact revision-4 tree passes local gates and four fresh independent reviews.

## Verification Evidence

Revision 3 exact commit `79f2b4e` passed placeholder, BOM-free LF, source-reference, diff, template, readonly declaration, export-inventory, and canonical package gates; `npm.cmd run verify` completed in 22.1 seconds with 275 inherited tests, deterministic V10 dogfood, package inspection, and the offline packed consumer. Four independent `REVISE` verdicts prove those gates were source-coherence and inherited-runtime evidence, not V11 acceptance.

An earlier revision-4 source state passed a strict TypeScript 7.0.2 declaration probe and preserved 56 current exports while proposing 123 collision-free names. The specialist and coherence redesigns changed that declaration and inventory, so those results are superseded.

The corrected uncommitted working tree now passes `git diff --check`, the strict TypeScript 7.0.2 declaration probe over the complete normative API fence, an exact inventory of all 56 current exports plus 130 unique proposed names with no duplicate or existing-name collision, the template checker, and a 153-link local Markdown audit with zero broken links. The full 119-scenario checker matrix passed in 653.9 seconds. The latest `npm.cmd run verify` passed in 20.8 seconds with formatting, lint, typecheck, build, all 275 inherited tests, deterministic V10 dogfood, dry-run package inspection, and the offline packed consumer. Commit-bound four-lens review and every V11 runtime gate remain pending.

## Findings

| Source | Required correction | Revision-4 candidate response |
| --- | --- | --- |
| Round 3 | Total starts, resumable facade, causal clarification | Explicit start variants, closed continuations, response bindings |
| Round 3 | Qualified evidence ownership and gating | EvidenceBinding/EvidenceSatisfaction contracts |
| Round 3 | Declared exits, no-progress order, terminal closure | Route-first mapping and exhaustive closure table |
| Round 3 | Width equivalence without false raw-trace equality | Separate AcceptedWorkProjection |
| Round 3 | Dispatch return authority and replay safety | Core-owned opaque ExecutionCapture and attempt-pair consumption |
| Round 3 | Final software bytes absent from merge readiness | RepositoryStateRequest/Witness and tree/change digests |
| Round 3 | Free-form reference and resource/comparator gaps | SourceReference, exact reserves, bounds, and comparators |
| Owner refinement | Generic specialists do not deliver hyper-focused execution | Repository kickoff, AgentBlueprintIntent, built-in compiler, TaskAuthorityProjection, AgentBlueprint, and materialization receipt |
| Owner refinement | One message should set up the workflow | Repository-shipped `synthesizeGoal`, `goal-synthesis.md`, approved-catalog composition, and explicit novel/high-risk approval gate |
| Specialist preflight | Core lacked semantic intent input and supply-free demand | Address-bound intent plus TaskAuthorityProjection; core validates rather than invents |
| Specialist preflight | Optimization and materialization claims were unproven | Honest bounded scheduler claim, exact metric formulas, six golden baselines, and AgentMaterializationReceipt |
| Coherence preflight | Repository request and terminal evidence had digest cycles | Pre-request binding plus completed state/event -> AcceptedWorkProjection -> MergeReadyEvidence order |
| Coherence preflight | Evidence/blueprint construction and fresh-process evidence were incomplete | Intent-bound EvidenceBindings derived first plus state-carried AcceptedWorkAccumulator |
| Coherence preflight | Facade unions, start rejection, and owner kickoff binding were incomplete | Status-specific continuations/interactions, explicit start rejection, and decision-to-launched-field mapping |
| Coherence preflight | GrantOffer count and derived digests were not implementable exactly | Detached bounded offers, separate availability bytes, and one derived-digest registry |

## Residual Risks

- Revision 4 is substantially larger and may still expose schema, API, or lifecycle inconsistencies.
- Semantic specialization quality depends on the IDE/planner implementation; core can enforce intent/blueprint completeness and measure structure but cannot prove global optimality.
- Host observations and AgentMaterializationReceipts remain external claims, not independent core observation.
- Process-local active claims have no durable crash recovery.
- V10 remains owner-gated, so V11 cannot merge while stacked on that unapproved baseline.

## Memory And Docs

Active context and retrieval must point to all three failed review rounds, the revision-4 contract, `goal-synthesis.md`, `specialist-compiler-preflight.md`, `architecture-coherence-preflight.md`, and the Specialist Compiler requirement. Decisions and history should call revision 4 accepted only after one immutable candidate receives four PASS verdicts.