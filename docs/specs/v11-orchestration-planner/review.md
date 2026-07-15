# V11 Review

## Status

Architecture review active. Round 1 outcome is `REVISE`; revision 2 has not yet received an independent verdict. This is not an implementation or merge review.

## Review Outcome

Round 1 correctly blocked implementation. Four independent reviewers inspected exact commit `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`; product/architecture found two high and three medium issues, while API, lifecycle, and security found nineteen additional medium issues. The source-preserving synthesis is in `architecture-review-round-1.md`.

Current stage outcome: `redesign`.

## Spec Alignment

Revision 2 now states the owner goal directly: a portable software-work coordinator takes one goal through user-selected modules, bounded decomposition, capability assignment, safe parallel work, integration, verification, review, owner approval, trace, and learning. It explicitly excludes IDE/API/model/provider routing.

## Architecture Alignment

ADR 0003 revision 2 resolves the two high blockers by making Circuit the sole policy graph and defining a complete port-bound ChildResultEnvelope. It also closes planning state, contract-family ownership, authority root, profile provenance, assignment timing, claim ordering, conflict policy, V10 mapping, join semantics, parent events, privacy bounds, portability, and the one-agent facade.

## Verification Evidence

The bootstrap candidate passed all local documentation and inherited package gates but those checks proved compatibility only. Round 1 review evidence is commit-bound and read-only. Revision 2 now passes placeholder, BOM-free LF byte, 138-reference source, whitespace, template, and canonical package checks with 275 inherited tests. The immutable commit, push, and Round 2 verdicts remain pending.

## Findings

| Severity | Finding | Resolution state |
| --- | --- | --- |
| High | Circuit and Plan both appeared to own routing, joins, gates, and integration policy | Resolved in revision 2 design; independent confirmation pending |
| High | Child output lacked a portable port-, packet-, commit-, worker-, and digest-bound handoff | Resolved in revision 2 design; independent confirmation pending |
| Medium | Planning, assignment, claim, lifecycle, conflict, cancellation, join, trace, privacy, and limits were not closed | Resolved normatively in ADR/spec/test plan; independent confirmation pending |
| Medium | V11 is stacked on technically accepted but unmerged V10 | Still open; blocks V11 acceptance and merge, not architecture review |

## Residual Risks

- Complete-wave reduction can trade latency for determinism.
- Capability profiles remain host-attested claims rather than proof of worker quality.
- Conservative scope rules can serialize useful work.
- The public surface may still be too broad until a one-agent prototype is tested.
- No architecture wording becomes implementation truth until schemas, code, fixtures, dogfood, and final review pass.

## Memory And Docs

Active context and the retrieval index must identify Round 1 as `REVISE`, revision 2 as pending, and V10 as owner-gated. Decisions, history, patterns, and the practice register are updated only after the architecture gate reaches a durable accepted event.
