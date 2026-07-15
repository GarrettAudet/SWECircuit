# V11 Architecture Review Packet

## Status

Locally validated revision-3 candidate packet. Round 1 and Round 2 each returned four `REVISE` verdicts. Reviewers must inspect the same exact committed tree, including `orchestration-contract.md`, and record its commit hash. Implementation remains blocked until every required verdict is `PASS`.

## Product Question

Does revision 3 define one understandable, IDE/API/model/provider-neutral software-work system that begins with one agent, scales through host-authored bounded replication and capability assignment, and preserves integrated quality, owner control, and complete traceability?

```txt
GoalContract | PolicyBundle | Plan | safe specialist waves
             | integration | verification | review | owner
             | trace | memory proposals -> candidates
             | completed state/event -> merge-ready evidence
```

## Required Sources

- `docs/specs/v11-orchestration-planner/orchestration-contract.md`
- `docs/specs/v11-orchestration-planner/spec.md`
- `docs/specs/v11-orchestration-planner/plan.md`
- `docs/specs/v11-orchestration-planner/test-plan.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-1.md`
- `docs/specs/v11-orchestration-planner/architecture-review-round-2.md`
- `docs/architecture/decisions/0003-portable-orchestration-control-plane.md`
- V9/V10 schemas, public types, execution lifecycle, and ADRs 0001-0002

## Closed Decisions To Verify

1. One `runGoal` command union covers start and both continuation phases.
2. One supplied allowlisted profile is required; `requestedConcurrency` defaults to one and must be explicit above one.
3. PolicyBundle is OrchestrationPolicy plus the exact Circuit, Module closure, and WorkPacket-template closure; planner output is never policy.
4. Replication regions have exact graph/cardinality/route/join derivation and non-region nodes instantiate once.
5. GoalContract owns criterion coverage policy; the compiler derives exact producer/verifier/reviewer/evidence rows after lane selection.
6. WorkPacket owner is a logical role; Assignment is the only runtime assignee.
7. Seven separate orchestration roots leave V9/V10 artifact kinds and RunEvent unchanged.
8. RunAuthority is an independent root bound through every downstream digest.
9. Every value has exact ID, revision, digest projection, and uniqueness ownership.
10. Planning/session/state/result/command/request/event/child variants define required and forbidden fields.
11. Matching and wave subset selection have total deterministic algorithms.
12. Paths and host observations conservatively prevent alias/conflict overclaims.
13. Claims reserve worst-case reduction, consume grant-attempt keys, install before effects, and tickets bind every predecessor plus result limits.
14. Child variants and dispatch observations distinguish execution, V10 rejection, zero-call, unknown effect, and post-dispatch overflow.
15. Cancellation, queued input, decision actions, route budgets, terminal states, memory production, and resource closure are total.
16. Two-pass `all`/`any` reduction is independent of concurrency width and suppresses loser routing/output.
17. Parent event/journal content integrity, payload classification, canonical comparators, and byte limits are closed without claiming host authenticity.
18. The exact current root exports remain type-identical; separately named orchestration exports and explicit schema paths are additive.

## Required Invariants

- No planner/profile/manifest/result/input declaration grants authority or changes policy.
- No callback occurs before compiled Plan, accepted matching, installed claim, and bound ticket.
- No conflicting or unresolved writer scope shares a wave.
- No incomplete/substituted/unknown child result advances integration.
- No local worker success satisfies verifier/reviewer/owner gates.
- No sensitive/free-form body enters canonical roots/events.
- No provider-specific field affects matching or routing.
- No one-agent user needs to call advanced operations to resume.

## Reviewer A: Product And Architecture

Stress omitted versus explicit concurrency, one agent, ten disjoint lanes, no replication region, min-zero/max lanes, planner-added security gate, planner-authored acceptance, missing integration/memory witnesses, logical versus runtime owner, local success/integrated failure, and whether the PolicyBundle remains simple and singular.

PASS only if dynamic decomposition is genuinely user/host-authored, mechanically bounded, and the simple path is credible.

## Reviewer B: Public API And Compatibility

Stress every root/nested discriminator, operation/callback signature, required/forbidden field, start without prior identity, RFC 8785 projection, transition/journal circularity, ID scope, every comparator, event payload, actual current export inventory, explicit schema subpaths, and graph-wide semantic projection.

PASS only if schema/TypeScript/package implementers need not invent a field or ordering rule and V9/V10 consumers remain unchanged.

## Reviewer C: Lifecycle And Concurrency

Stress planner limits 1-8, no capacity, capacity loss, pre-execution requests, claim reserve and grant replay, V10 rejection/cancel/timeout, zero-call versus unknown effect, post-dispatch overflow, partial/duplicate/reordered and mixed batches, exact/different cancellation replay, queued input, final approval, `any` loser suppression, route exhaustion, deadlock, memory/merge evidence, and terminal immutability.

PASS only if every scenario has one reconstructable next state independent of concurrency width and no hidden distributed guarantee.

## Reviewer D: Security, Privacy, And Trace

Stress hostile planner/profile/manifest, PolicyBundle closure drift, executor/grant/attempt/availability substitution, stale/forged input and cancellation, malicious path aliases, false zero-call/dispatch status, forged output/VCS/journal observations, root-tail/event substitution, payload canaries, claim-reserve and post-dispatch exhaustion, semantic-projection laundering, and host/core guarantee wording.

PASS only if authority and handoffs fail closed, external attestations are honestly labeled, and canonical data excludes sensitive payload classes.

## Handoff Format

```txt
reviewed commit hash
verdict: PASS or REVISE
findings: severity, exact source, violated invariant, impact, smallest correction
residual risks
unchanged-worktree confirmation
```

Any material `REVISE` returns to redesign. Four `PASS` verdicts authorize implementation planning only and never approve merge.
