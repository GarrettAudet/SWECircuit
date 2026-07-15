# V11 Architecture Review Round 3

## Status

Complete with four `REVISE` verdicts against exact commit `79f2b4e069d13910b561ffe4f6ca04a1b13acb61`. The reviewers reported 15 high and 10 medium raw findings. Implementation remains blocked and the workflow returns to `redesign` for architecture revision 4.

## Review Contract

- Branch: `codex/v11-orchestration-planner`
- Candidate: `79f2b4e069d13910b561ffe4f6ca04a1b13acb61`
- Candidate was pushed and local/remote hashes matched before fan-out.
- Every reviewer independently confirmed the exact hash and a clean worktree before and after review.
- Reviewers were read-only and made no edits, installs, network calls, test runs, staging, commits, pushes, or branch changes.
- Product, API, lifecycle, and security roles reviewed independently; one verdict did not stop or influence the remaining reviews.

## Roster

| Role | Reviewer | Verdict | High | Medium |
| --- | --- | --- | ---: | ---: |
| Product/architecture | `019f6762-aeb7-7750-ab8e-76bbaf1adcf5` | REVISE | 3 | 0 |
| API/compatibility | `019f6762-c34a-7760-acdd-500b9643cc14` | REVISE | 5 | 5 |
| Lifecycle/concurrency | `019f6762-d817-7dd0-a1ea-511592c6bb26` | REVISE | 4 | 3 |
| Security/trace | `019f6762-ec4e-7a81-98e7-1514b13fc284` | REVISE | 3 | 2 |

## Product And Architecture Handoff

### P-H1: Clarification answers cannot inform planning or downstream work

- Sources: `orchestration-contract.md:405`, `:447`, `:1114`.
- Invariant: material clarification must change planning or bounded downstream inputs without a hidden host side channel.
- Impact: planning drops the accepted answer before the next planner call; run clarification routes a fixed action without binding the answer to successor input.
- Smallest correction: retain accepted response refs/digests, expose the resumed planning response, and bind run clarification to an explicit successor input.

### P-H2: `runGoal` cannot resume from its own returned data

- Sources: `orchestration-contract.md:384`, `:1269`, `:1278`.
- Invariant: the one-agent facade resumes without advanced operations or undocumented callback capture.
- Impact: `continue_run` requires Plan and concrete WorkPackets that nonterminal facade results do not return and the original start caller did not possess.
- Smallest correction: return and accept one closed continuation bundle carrying the exact Plan, packets, root, and tail event.

### P-H3: Qualified acceptance evidence has no total satisfaction rule

- Sources: `orchestration-contract.md:139`, `:542`, `:788`; `src/model.ts:155`.
- Invariant: qualified evidence ownership and criterion coverage are mechanically decidable.
- Impact: V10 evidence carries a bare ID while V11 requirements distinguish source kind, source digest, collection, and ID; equal bare IDs can be distinct.
- Smallest correction: derive closed evidence-satisfaction rows from accepted child evidence to exact qualified requirements, Assignment, node function, criterion, and owner.

## Public API And Compatibility Handoff

### A-H1: Initial operations cannot produce their declared result types

- Sources: `orchestration-contract.md:426`, `:434`, `:562`, `:571`, `:1044`, `:1070`.
- Invariant: start success and every invalid start have truthful exhaustive result variants.
- Impact: successful starts require nonexistent predecessor digests; recognizable invalid IDs have neither a prior root for bound rejection nor permission to use unbound rejection.
- Smallest correction: add explicit start-success/start-rejection variants and total invalid-start classification.

### A-H2: A planning answer is unavailable to the next planner callback

- Sources: `orchestration-contract.md:405`, `:447`, `:1114`, `:1239`.
- Invariant: clarification is portable and callback inputs are sufficient.
- Impact: the next planner must depend on hidden closure or host state.
- Smallest correction: provide the validated response on the immediately resumed planner callback and close required/forbidden presence.

### A-H3: Report-to-result conversion is not authoritative or fully discriminated

- Sources: `orchestration-contract.md:25`, `:657`, `:663`, `:1145`; `src/types.ts:92`.
- Invariant: every nested value has one exact discriminator and accepted execution derives from the core-owned dispatch.
- Impact: ChildResultEnvelope variant discrimination is implicit and a callback can report a V10 value different from the one returned through `dispatchV10`.
- Smallest correction: declare the exact result discriminator/conditional fields and derive from, or exact-digest-bind to, the captured dispatch return.

### A-H4: Qualified evidence cannot be matched deterministically

- Sources: `orchestration-contract.md:139`, `:542`, `:824`; `src/model.ts:155`.
- Invariant: duplicate bare evidence IDs never collapse qualified V9 sources.
- Impact: implementations must invent one-to-one/one-to-many evidence matching.
- Smallest correction: add a V11 evidence-binding value with duplicate-ID and cardinality rules.

### A-H5: Portability projection retains responder and cancellation provenance

- Sources: `orchestration-contract.md:447`, `:778`, `:884`, `:889`, `:894`.
- Invariant: traces differing only in host actor/attestor provenance project identically.
- Impact: raw InputResponse and CancellationRequest identity fields propagate through projected state and event digests.
- Smallest correction: project both value families and replace every referring digest with its projected digest.

### A-M1: `resultLimits` allocation has no deterministic algorithm

- Sources: `orchestration-contract.md:614`, `:653`, `:882`.
- Impact: implementations can allocate different ticket budgets for identical inputs.
- Smallest correction: define the full formula, rounding, remainder distribution, and tie-break order.

### A-M2: `journalBytes` conflicts with aggregate JCS accounting

- Sources: `orchestration-contract.md:125`, `:858`, `:876`.
- Impact: event-plus-comma cursor bytes omit the array brackets required by the generic aggregate rule.
- Smallest correction: include brackets or define the cursor as delimiter-stream bytes and compare aggregate limits as `journalBytes + 2`.

### A-M3: Two canonical arrays lack total comparators

- Sources: `orchestration-contract.md:530`, `:920`, `:970`.
- Impact: consumed child-attempt tuples and rejected candidate rows can change state/event digests by input order.
- Smallest correction: add exact lexicographic tuple comparators for both.

### A-M4: Agent-profile I/O vocabulary conflicts with V9 Module ports

- Sources: `orchestration-contract.md:459`, `:491`; `schemas/v1alpha1/common.schema.json:67`, `:70`, `:98`.
- Impact: root artifact kinds and Module `artifactType` are different vocabularies.
- Smallest correction: bind profile fields directly to Module `artifactType` and name them accordingly.

### A-M5: Goal evidence kinds exceed representable V9 requirements

- Sources: `orchestration-contract.md:139`, `:324`; `src/types.ts:71`; `schemas/v1alpha1/common.schema.json:248`.
- Impact: legal public kinds `commit` and `digest` cannot resolve to a V9 evidence requirement.
- Smallest correction: use the V9 requirement-kind subset or define a total tested fulfillment mapping.

## Lifecycle And Concurrency Handoff

### L-H1: Successful Circuit exits are mapped to failure

- Sources: `orchestration-contract.md:727`, `:742`; `test/fixtures/valid/circuit.json:61`.
- Invariant: V9 exits remain authoritative and normal completion is reachable.
- Impact: a successful memory exit has no outgoing route and falls into generic missing-successor failure.
- Smallest correction: settle declared exits before missing-successor logic; `pass` succeeds at an exit and every other outcome has an exact route/terminal mapping.

### L-H2: Pre-execution approval has no representable or persistent lifecycle

- Sources: `orchestration-contract.md:529`, `:768`, `:770`, `:772`.
- Invariant: risk approval occurs before availability/effects and applies once per activation.
- Impact: the only seed contract requires a claimed state, result, and Assignment that do not exist before matching; no consumed marker prevents repeated approval.
- Smallest correction: add a ready-state pre-execution seed variant and per-activation consumed approval binding.

### L-H3: Required serial/parallel equivalence is impossible

- Sources: `test-plan.md:180`, `:217`; `orchestration-contract.md:754`, `:893`, `:896`.
- Invariant: width equivalence compares accepted software semantics rather than necessarily different coordination topology.
- Impact: wave/revision/event topology and suppressed-loser evidence necessarily differ by concurrency width.
- Smallest correction: define a separate accepted-work projection that excludes coordination topology and suppressed-loser evidence.

### L-H4: Queued clarification actions survive skipped branches

- Sources: `orchestration-contract.md:754`, `:772`.
- Invariant: `any` losers never route or consume budgets after they become unreachable.
- Impact: a queued loser request can be promoted after another response establishes the winner.
- Smallest correction: recompute joins/liveness after every response, trace-discard stale seeds, and promote only the first live seed.

### L-M1: Attempt reuse is prevented only for an exact grant-digest tuple

- Sources: `orchestration-contract.md:517`, `:530`, `:638`, `:652`.
- Impact: a changed grant can reuse the same V10 `(runId, attemptId)`.
- Smallest correction: make that pair independently injective and consumed; retain grant digest as additional evidence.

### L-M2: Cancellation and uncertainty lack terminal child-state closure

- Sources: `orchestration-contract.md:538`, `:548`, `:709`, `:710`, `:780`.
- Impact: active claims must disappear, but invocation/branch settlement and retained evidence are undefined.
- Smallest correction: add an exhaustive terminalization table for every invocation/branch status and terminal cause.

### L-M3: Deadlock detection conflicts with availability requirements

- Sources: `orchestration-contract.md:612`, `:1486`.
- Impact: no exact no-progress predicate decides whether capacity callback is irrelevant.
- Smallest correction: evaluate completion, terminal branch failure, deadlock, and resource closure before availability; require capacity only with a live ready invocation.

## Security, Authority, Trace, And Privacy Handoff

### S-H1: Reported execution is not bound to the actual V10 dispatch return

- Sources: `orchestration-contract.md:657`, `:670`, `:1145`.
- Invariant: authority-bearing results derive monotonically from the exactly-once core dispatch.
- Impact: a callback can dispatch once and submit a different internally consistent success.
- Smallest correction: core captures/detaches the real return and derives the envelope from it; post-entry mismatch is `effect_unknown`.

### S-H2: Merge readiness/projection are not content-bound to final repository state

- Sources: `orchestration-contract.md:684`, `:696`, `:797`, `:889`.
- Invariant: completion preserves the final observed software effect.
- Impact: per-ticket VCS observations need not represent the final head, and projection can equate different repository bytes.
- Smallest correction: require one final repository-state observation bound to all accepted writes, with final head, cleanliness/containment, and host-neutral tree/change digest; preserve it in merge evidence/projection.

### S-H3: Unconstrained reference strings bypass payload protection

- Sources: `orchestration-contract.md:700`, `:832`, `:1193`.
- Invariant: canonical values retain only classified bounded locators/digests.
- Impact: caller-controlled prose or credentials can be persisted in `sourceRef` or body-reference fields.
- Smallest correction: introduce one closed locator-only SourceReference and apply non-echoing secret/canary rejection before retention.

### S-M1: Output and observation maxima cannot coexist

- Sources: `orchestration-contract.md:696`, `:871`; `test-plan.md:202`.
- Impact: 64 outputs already require at least 66 observations, or 69 with filesystem writes, above the maximum 64.
- Smallest correction: align output/observation maxima and reservation/boundary tests.

### S-M2: Durable memory overclaims tail authentication

- Sources: `docs/memory/retrieval-index.md:53`; `orchestration-contract.md:116`, `:128`.
- Impact: future agents may treat content continuity as host/full-history authenticity.
- Smallest correction: use `content-bound tail continuity` and preserve the explicit authenticity/completeness boundary.

## Converged Revision-4 Obligations

1. Add total start-success/start-rejection variants and truthful predecessor fields.
2. Make clarification data causal: planning response exposure, run successor-input binding, pre-execution seed lifecycle, per-activation approval, and live-seed pruning.
3. Make the simple facade self-contained with a closed resumable continuation bundle.
4. Add qualified EvidenceSatisfaction bindings, cardinality, ownership, required/optional semantics, gate-failure routing, and V9-compatible evidence-kind vocabulary.
5. Define declared-exit settlement, exact no-progress ordering, and exhaustive terminal child/branch closure.
6. Separate accepted-work width equivalence from raw coordination/trace topology.
7. Consume V10 run/attempt identity independently of grant digest.
8. Make ChildResultEnvelope discrimination explicit and derive reported results from the captured one-shot dispatch return.
9. Add a final repository-state witness to completion, MergeReadyEvidence, and semantic projection.
10. Replace free-form retained references with a closed SourceReference locator contract and canary checks.
11. Complete portability projection for response/cancellation provenance and every transitive digest.
12. Close resource arithmetic: deterministic result-limit allocation, journal aggregate bytes, satisfiable observation/output maxima, and terminal reserves.
13. Add missing comparators and bind profile I/O to exact V9 Module artifact types.
14. Replace the stale durable-memory authentication label with content-bound continuity.

## Gate Decision

Round 3 outcome is `redesign`. T005's revision-3 integration remains historically complete, but architecture acceptance failed. No V11 runtime implementation, merge, or owner-approval request is authorized. Revision 4 must satisfy all converged obligations, pass local gates, freeze a new immutable commit, and receive four fresh independent `PASS` verdicts.

## Residual Risks

- V11 remains unimplemented and stacked on owner-gated V10.
- Process-local coordination has no durable claim, crash recovery, or distributed CAS guarantee.
- Host identity, path, VCS, output, and repository-state observations remain externally trusted facts.
- In-process callbacks retain ambient authority and can block liveness unless a host isolates them.
