# V11 Specialist Compiler Review

## Status

`PASS` for the revision-6 digest-bound technical candidate. AC1-AC13, T009-T010, and post-integration reconstruction are closed; clean branch preparation, the explicit owner merge decision, and merge remain open under T011.

## Review Outcome

No findings remain against the exact candidate below. Post-integration reconstruction also returned `pass`; the candidate may proceed to branch freeze and the owner gate, not merge without approval.

## Candidate Binding

- Compilation: `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161`.
- Package: `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- Preparation: [34/34 repository source bindings passed](evidence/dogfood/handoffs/prepare-candidate-pass-attempt-6.md); the [complete source ledger](evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json) preserves exact locators, scopes, bytes, SHA-256 values, and the single `context.spec` binding to the immutable pre-integration snapshot.
- Approval root: [the two expected digests](evidence/dogfood/approval.json) are retained outside the rendered package.

This is a byte- and digest-bound review identity in a shared dirty worktree. The live feature spec and memory records are integration outputs, not review inputs. The integration owner [reconstructed both trusted digests after integration](evidence/dogfood/handoffs/post-integration-replay-pass-attempt-6.md), and the exact revision-6 pair passed. No immutable Git commit, clean branch, push, hosted run, or merge is claimed here.

## Spec Alignment

| Criteria | Outcome | Primary Evidence |
| --- | --- | --- |
| AC1-AC3 | PASS | Product/API and security/trace reviewed public operations, canonical decisions, closed permission kinds, path validation, and exact task demand. |
| AC4-AC6 | PASS | Algorithm/lifecycle reviewed exact and bounded search, the fixed scheduler, deterministic comparator, permutation invariance, selection reason, and all six goldens. |
| AC7-AC9 | PASS | Security/trace reviewed fail-closed validation, blueprint authority closure, canonical rendering, two-digest verification, and adversarial tamper coverage. |
| AC10 | PASS | Product/API reviewed the IDE contract; the dogfood package exercised clarification artifacts through verified handoffs and integration. |
| AC11 | PASS | Release verification passed focused, canonical, consumer, package, template, and negative-matrix gates. |
| AC12 | PASS | The [dogfood report](evidence/dogfood/report.json) preserves the serial comparison, selected roster, package, launch waves, and source verification. |
| AC13 | PASS | Product/API, algorithm/lifecycle, and security/trace returned independent PASS verdicts against the same digest pair. |

AC1-AC13 are closed in [spec.md](spec.md). T009-T010 and post-integration replay are closed; T011 remains owner- and branch-gated in [tasks.md](tasks.md).

## Architecture Alignment

The candidate follows ADR 0004 and the frozen [Specialist Compiler contract](specialist-compiler-contract.md). Core validates and compiles supply-free demand, compares candidate partitions, renders file values, and verifies canonical package semantics. Provider/model selection, context delivery, permission enforcement, workspace isolation, process execution, persistence, retry, integration, merge, and memory mutation remain external host or workflow-stage effects. The PASS evidence does not claim V11 core performed them.

## Verification Evidence

The [revision-6 release handoff](evidence/dogfood/handoffs/verify-release-pass-attempt-6.md) records:

- 19/19 assigned release contexts and 9/9 package files matched before and after execution.
- Focused schema 7/7, compiler/golden 35/35, and host-containment 6/6 passed.
- `npm.cmd run verify` checked format across 72 files, lint across 60 files, passed typecheck/build, and passed 323/323 tests.
- V10 and V11 dogfood, the offline installed consumer, package verification, and the template checker passed.
- The package dry run contained 105 files, measured 122.9 kB, and reported SHA-1 `a5b920c84803fdcff88093aabef4c4fe74bf6249`.
- The complete negative checker matrix passed in 744.9 seconds.

The dogfood exact search evaluated 203 canonical candidates, selected six specialists at projected makespan 23, and retained the serial baseline at projected 40. The serial candidate was ineligible because requested evidence independence could not be satisfied by one agent. These values are deterministic planning units, not runtime speed measurements.

## Independent Reviews

| Review | Context Binding | Outcome | Findings |
| --- | --- | --- | --- |
| [Product/API](evidence/dogfood/handoffs/product-api-review-pass-attempt-6.md) | 12/12 | PASS | None |
| [Algorithm/lifecycle](evidence/dogfood/handoffs/algorithm-lifecycle-review-pass-attempt-6.md) | 14/14 | PASS | None |
| [Security/trace](evidence/dogfood/handoffs/security-trace-review-pass-attempt-6.md) | 32/32 | PASS | None |

Attempts 1-4 and every intermediate `REVISE` or `FIX` handoff remain preserved. Attempt 5 ended in [post-integration replay `FIX`](evidence/dogfood/handoffs/post-integration-replay-fix-attempt-5.md) because `context.spec` still targeted the mutable live spec. Revision-6 release attempts [6A](evidence/dogfood/handoffs/verify-release-fix-attempt-6a.md) and [6B](evidence/dogfood/handoffs/verify-release-fix-attempt-6b.md) remain `FIX` host retries for the 265-character Windows root and reviewer removal of the offline cache; neither changed source or the approved pair. Their causes and corrections are summarized in [debug-notes.md](debug-notes.md) and [root-cause-analysis.md](root-cause-analysis.md).

## Residual Risks

- Semantic work-unit quality, weights, context declarations, and conflict keys remain owner/IDE judgments.
- Bounded search above eight units can miss a better unconstructed partition and makes no global-optimum claim.
- An external host can ignore requested authority or alter work unless it verifies and honors both approved digests.
- V11 does not supply runtime execution, isolation, persistence, retry, merge, or automatic memory mutation.
- The branch is stacked on owner-gated V10; the baseline relationship requires an explicit owner decision before merge.
- README remains at its pre-approval candidate wording because this integration contract forbids public-file edits; an authorized release change must refresh it after the owner decision.

## Approval Gate

- Source branch: `codex/v11-orchestration-planner`.
- Target branch: `main`.
- Post-integration replay: `PASS`; the exact revision-6 compilation/package pair reconstructed from immutable inputs after the authorized output updates.
- Technical recommendation: freeze and push this exact tree, then request approval to merge the stacked V10+V11 line.
- Change gate: any subsequent semantic or bound-source change retires this candidate and requires a revised contract, package, and affected verification/review.
- Required owner action after the clean branch is presented: approve the stacked merge, or request a specific change. Any semantic or source change requires a new candidate binding and affected verification/review.
- Stop condition: no merge before that decision.

## Memory And Docs

Release state and durable limits are source-linked from [implementation-notes.md](implementation-notes.md), [the V11 milestone](../../milestones/v11.md), [active context](../../memory/active-context.md), [history](../../memory/history-ledger.md), [known issues](../../memory/known-issues.md), and [the retrieval index](../../memory/retrieval-index.md).
