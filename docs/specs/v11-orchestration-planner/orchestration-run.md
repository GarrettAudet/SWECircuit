# V11 Architecture Orchestration Run

## Status

Round 1 fan-out and fan-in complete with outcome `redesign`. Revision-2 integration is active. No implementation worker has been dispatched.

## Goal

Produce and independently review a portable architecture that moves a human software goal through user-selected modules, bounded decomposition, specialized capability assignment, safe parallel work, integration, verification, review, owner approval, trace, and learning without making an IDE, API, model, or provider the workflow authority.

## Pattern Chosen

Four bounded read-only specialist reviews in parallel, followed by one serialized integration owner.

## Why This Pattern

Product ownership, public contracts, concurrent lifecycle, and security are separable review dimensions. Read-only work removes file conflicts, fresh contexts reduce shared assumptions, exact-commit binding makes evidence attributable, and one integration owner preserves a coherent design.

## Branch And State

- Branch: `codex/v11-orchestration-planner`
- Baseline: V10 closeout `8ac3372`, technically accepted and owner-gated
- Round 1 reviewed commit: `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`
- Round 1 tree: clean before and after every review
- Current stage: architecture redesign
- Merge authority: repository owner only after separate V10 and V11 gates

## Roster

| Role | Agent identifier | Scope | Authority |
| --- | --- | --- | --- |
| Integration owner | Main IDE agent | Complete V11 source chain | Edit planning docs, validate, commit, push; no implementation before gate; no merge |
| Product/architecture | `019f6538-cf2a-7101-a2be-1fd4441ab674` | Product boundary, graph ownership, usability | Read-only findings |
| API/compatibility | `019f6538-e38e-7aa3-9711-4ebdc10a53ee` | Types, identity, versions, invalid states | Read-only findings |
| Lifecycle/concurrency | `019f6538-f7b1-74b0-a7ee-06c07c7f6ef9` | Claims, waves, results, joins, cancellation, liveness | Read-only findings |
| Security/trace | `019f6539-0d40-7230-b2b9-f5926abc92ee` | Authority, provenance, privacy, evidence | Read-only findings |

## Fan-Out Log

| Step | Work | Evidence | Outcome |
| --- | --- | --- | --- |
| 1 | Main agent audited V9/V10 and current product gap | Source chain and dated research snapshot | pass |
| 2 | Bootstrap candidate committed and pushed | `f559b4a` | pass |
| 3 | Four reviewers started from fresh read-only contexts | Exact commit verified by each | pass |
| 4 | Product/architecture review | 2 high, 3 medium | REVISE |
| 5 | API/compatibility review | 6 medium | REVISE |
| 6 | Lifecycle/concurrency review | 7 medium | REVISE |
| 7 | Security/trace review | 6 medium | REVISE |

No reviewer edited files, ran tests, installed dependencies, used network, staged, committed, or pushed.

## Handoffs

| Role | Primary handoff | Integrated decision |
| --- | --- | --- |
| Product/architecture | Circuit/Plan authority conflict; incomplete child-output handoff | Circuit is sole policy graph; Plan is derived instance graph; define complete ChildResultEnvelope |
| API/compatibility | Artifact/version ownership, result unions, assignment identity, matching, event version, bounds | Separate orchestration family; RFC 8785 digests; dynamic assignment; separate parent events; exact limits |
| Lifecycle/concurrency | Missing total mappings, unsafe claim ordering, races, capacity, joins, liveness | PlanningSession; claimed complete waves before effects; serialized batch reduction; closed state and V10 matrices |
| Security/trace | No independent authority root, weak profile provenance, ambiguous isolation and response binding | Host RunAuthority; allowlisted profile digests and executor binding; no overlap exceptions; full input/result identity |

The complete source-preserving handoff is `architecture-review-round-1.md`.

## Integration Decisions

- One facade, `runGoal`, defaults to one profile and concurrency one.
- Many agents are the same system with more allowlisted profiles and bounded slots.
- Circuit/Module policy is immutable workflow authority; planner output is proposal data.
- A separate orchestration contract family avoids breaking project artifacts and RunEvent.
- RunAuthority is host-supplied and every later object narrows it.
- Plans own immutable instances; state owns assignments and live availability.
- One coordinator commits complete conflict-safe waves before callbacks.
- Results reduce as one complete canonical batch.
- V11 allows no overlapping writes and no automatic retry.
- Tickets and results bind every parent, child, worker, packet, commit, port, and evidence identity.
- V10 dispositions, joins, cancellation, deadlock, uncertainty, and completion are total.
- Parent events reference child evidence; memory writes and merge remain owner/host actions.
- Exact privacy and resource ceilings are test obligations.

## Verification

### Bootstrap Candidate

- Placeholder scan: pass.
- BOM-free LF audit: pass.
- Source-reference audit: 26 references existed.
- `git diff --check`: pass.
- Template checker: pass.
- `npm.cmd run verify`: pass in 19.9 seconds with 275 inherited tests, deterministic V10 dogfood, package inspection, and offline packed consumer.
- Independent review: four `REVISE`; therefore architecture gate failed.

### Revision-2 Candidate

- Placeholder scan: pass.
- BOM-free LF audit: pass across 15 changed files.
- Concrete source-reference audit: pass for 138 existing paths; future schema and illustrative scope paths excluded explicitly.
- `git diff --check`: pass.
- Template checker: pass.
- `npm.cmd run verify`: pass in 19.7 seconds with 275 inherited tests, deterministic V10 dogfood, package inspection, and offline installed consumer.
- Immutable commit, push, and four fresh reviews: pending.

## Performance And Friction Observations

- Parallel read-only review completed four independent analyses without edit conflicts.
- The fan-out improved defect discovery before implementation but required one careful synthesis pass.
- Exact-commit review prevented green baseline tests from being misread as V11 proof.
- The bootstrap packet was too open-ended; revision 2 replaces review questions with closed decisions and executable negative fixtures.
- `apply_patch` remains unavailable in this Windows sandbox, so exact direct writes require extra byte and diff verification.

## Review

Current outcome: `redesign`. The architecture is more precise but unaccepted until Round 2. V10 remains a separate owner-gated baseline. No merge is requested.

## Memory Updates

- Active context: Round 1 `REVISE`, revision-2 design, no implementation.
- Retrieval index: source chain plus Round 1 evidence.
- Decisions/practice register/history: deferred until the architecture becomes a completed accepted event.

## Completion Handoff

Not complete. The next action is to validate and commit revision 2, then dispatch four fresh read-only reviewers against that exact commit. Four `PASS` verdicts authorize the first implementation slice; any material finding returns to redesign.
