# V11 Architecture Review Round 4

## Status

Complete with four `REVISE` verdicts against exact commit `d486b7f49724651cc12a115ee483e70d67e62bbb`. The reviewers reported 10 high and 9 medium raw findings. Implementation remains blocked and the workflow returns to `redesign` for architecture revision 5.

## Review Contract

- Branch: `codex/v11-orchestration-planner`.
- Candidate: `d486b7f49724651cc12a115ee483e70d67e62bbb`.
- Candidate was pushed and local/upstream hashes matched before fan-out.
- Every reviewer independently confirmed the exact hash and a clean worktree before and after review.
- Reviewers were read-only and made no edits, installs, network calls, test runs, staging, commits, pushes, or branch changes.
- Product, API, lifecycle, and security roles reviewed independently; one verdict did not stop or influence the remaining reviews.

## Roster

| Role | Reviewer | Verdict | High | Medium |
| --- | --- | --- | ---: | ---: |
| Product/architecture | `019f68c4-9ef0-7c92-891a-87b7919419cc` | REVISE | 2 | 1 |
| API/compatibility | `019f68c4-b321-7652-9a03-f1958e325a10` | REVISE | 3 | 5 |
| Lifecycle/concurrency | `019f68c4-c73d-7ac0-8b48-76c3fc4c2711` | REVISE | 3 | 1 |
| Security/trace | `019f68c4-db5e-7192-a068-70075f7a06fd` | REVISE | 2 | 2 |

## Product And Architecture Handoff

### P-H1: Straight-through facade runs discard primary source artifacts

- Sources: `orchestration-contract.md:546`, `:2063`.
- Invariant: every facade result preserves enough primary source material to inspect the exact Plan, roster, packets, and trace without hidden callback capture.
- Failure: a one-message run can complete with only digests/projections while trace inspection requires the absent Plan and detached sources.
- Smallest correction: return one closed source-preserving run-evidence bundle from every terminal result and resumable nonterminal result.

### P-H2: The reviewed roster is not bound to the roster that executes

- Sources: `specialist-agent-kickoff.md:41`; `orchestration-contract.md:514`, `:1684`.
- Invariant: what the user reviews is exactly what core may execute.
- Failure: kickoff previews one narrow roster, then a nondeterministic callback supplies a different policy-legal generic or over-split proposal before effects.
- Smallest correction: bind the selected candidate/compiler result into start input or require a digest-bound pre-effect Plan approval boundary.

### P-M1: Direct compilation has no public TaskAuthorityProjection construction path

- Sources: `orchestration-contract.md:498`, `:1925`.
- Impact: an IDE cannot call the documented standalone preview without recreating a core derivation or intercepting a planning callback.
- Smallest correction: expose one pure projection derivation operation or derive the supply-free projection inside the direct compiler.

## Public API And Compatibility Handoff

### A-H1: Semantic projections have no canonical closed output shape

- Sources: `orchestration-contract.md:1167`, `:1184`, `:1842`.
- Invariant: identical retained semantics produce one interoperable JSON value and digest.
- Failure: implementations may emit arrays or differently keyed objects for the same trace and AcceptedWorkProjection.
- Smallest correction: define closed projection roots, rows, comparators, and exact public result types.

### A-H2: Four canonical comparator ranks are undefined

- Sources: `orchestration-contract.md:1220`, `:1232`, `:1240`, `:1260`.
- Invariant: every canonical array has one total comparator.
- Failure: owner kind, subject, context target kind, and locator kind can sort differently and change transitive digests.
- Smallest correction: enumerate every rank in normative order and reject unknown values.

### A-H3: The derived-digest registry is contradictory and incomplete

- Sources: `orchestration-contract.md:142`, `:148`, `:177`, `:639`.
- Invariant: every derived digest has one domain tag, exact framed preimage, and canonical shape.
- Failure: next-root projection uses unframed hashing while the registry requires framing; semantic and availability projection preimages remain open.
- Smallest correction: register all three projections and remove every alternate formula.

### A-M1: WaitGuard is not a closed reason/presence union

- Sources: `orchestration-contract.md:707`, `:1289`.
- Impact: invalid rejected-candidate presence compiles and fails only at runtime.
- Smallest correction: split capacity-unavailable and execution-not-started guards into exact union variants.

### A-M2: ExecutionCapture is structurally forgeable and dispatch has no typed rejection

- Sources: `orchestration-contract.md:864`, `:1377`, `:2001`.
- Impact: callers can construct the public marker shape, while pre-dispatch failure requires an invented throw or promise convention.
- Smallest correction: use a package-private nominal brand and return a closed dispatch success/rejection result.

### A-M3: The runGoal command byte ceiling includes non-JSON callbacks

- Sources: `orchestration-contract.md:866`, `:1119`, `:1637`.
- Impact: every command violates its own JCS byte rule unless implementations invent a projection.
- Smallest correction: limit a named serializable command-data projection and separately bound callback count/identity outside canonical bytes.

### A-M4: Public constant values are not completely declared

- Sources: `orchestration-contract.md:27`, `:37`, `:2102`.
- Impact: packed consumers cannot snapshot exact ORCHESTRATION_LIMITS or decide whether ORCHESTRATION_KINDS includes roots only.
- Smallest correction: publish exact readonly declarations and values for both constants.

### A-M5: AcceptedWorkAccumulator has two malformed field names

- Source: `orchestration-contract.md:680`.
- Impact: the prose uses section-sign-delimited names instead of exact JSON keys.
- Smallest correction: declare closed row types with exact `acceptedOutputs` and `acceptedEvidence` properties.

## Lifecycle And Concurrency Handoff

### L-H1: Provisional any-join results cannot survive a fresh process

- Sources: `orchestration-contract.md:522`, `:682`, `:709`, `:980`.
- Invariant: every result that can later become accepted survives a returned continuation with all required semantics.
- Failure: a lower-priority provisional success waits on an unresolved higher-priority branch; after restart the higher branch fails, but only digests of the provisional success remain.
- Smallest correction: persist bounded provisional settlement rows with deterministic finalize/suppress transitions.

### L-H2: Wave-local matching makes downstream independence width-dependent

- Sources: `orchestration-contract.md:674`, `:773`, `:804`, `:1194`.
- Invariant: concurrency width cannot change accepted logical outcome under equal supply and child results.
- Failure: a preferred predecessor profile consumes the only profile that leaves a later independent reviewer feasible at width one, while a wider wave happens to choose the alternate profile and completes.
- Smallest correction: make predecessor assignment preserve every downstream independence constraint through a deterministic static or look-ahead feasibility rule.

### L-H3: A bound facade rejection can strand a nonterminal run

- Sources: `orchestration-contract.md:519`, `:546`, `:1645`, `:2079`.
- Invariant: every nonterminal facade boundary returns a complete continuation.
- Failure: a malformed repository-state callback yields rejected_bound after effects but returns neither state nor retryable continuation.
- Smallest correction: include a continuation for every bound rejection whose source state remains nonterminal, or terminalize the protocol failure deterministically.

### L-M1: Zero-effect route exhaustion has conflicting terminal classifications

- Sources: `orchestration-contract.md:954`, `:984`, `:1206`.
- Impact: an exhausted all-rejected any join is both failed/route_budget_exhausted and blocked/no branch executed.
- Smallest correction: define branch-level then parent-level precedence and one exact terminal code.

## Security, Authority, Trace, And Privacy Handoff

### S-H1: Planner-added context is not authority-bounded

- Sources: `orchestration-contract.md:363`, `:377`, `:382`.
- Invariant: every context source is inside an owner-approved source ceiling and readable scope before it can enter an intent or blueprint.
- Failure: a hostile planner adds a secret path or external memory reference, assigns a valid use, and causes materialization outside approved context.
- Smallest correction: add a closed context-source ceiling plus exact locator, path, digest, and authority subset checks.

### S-H2: Materialization binds context declarations rather than delivered content

- Sources: `orchestration-contract.md:398`, `:856`; `schemas/v1alpha1/common.schema.json:114`, `:137`.
- Invariant: equal blueprint/receipt digests imply equal delivered context bytes or equal explicitly external observations.
- Failure: a digest-optional path reference changes between planning and dispatch while every canonical orchestration digest remains equal.
- Smallest correction: bind every delivered item to resolved content digest, byte count, and resolution baseline/observation.

### S-M1: Attestors are allowlisted but not scoped by claim type

- Sources: `orchestration-contract.md:488`, `:888`, `:905`, `:1034`.
- Impact: an output or materialization attestor can also attest final repository state and unlock merge readiness.
- Smallest correction: bind every attestor entry to explicit allowed observation/materialization kinds.

### S-M2: Maximum blueprint count cannot fit the mandatory plan.compiled event

- Sources: `orchestration-contract.md:1067`, `:1123`, `:1130`.
- Impact: 256 digest strings exceed the 16,384-byte event ceiling before framing.
- Smallest correction: retain count plus ordered-list digest in the event or lower all affected maxima to byte-reachable values.

## Converged Revision-5 Obligations

1. Return a closed source-preserving RunEvidenceBundle from terminal and resumable facade boundaries; give semantic and accepted-work projections exact public shapes.
2. Bind the owner-reviewed semantic candidate and compiled roster to the launch that may execute, with no pre-effect callback substitution.
3. Expose a pure supply-free TaskAuthorityProjection derivation path for direct compiler use.
4. Complete the derived-digest registry and every canonical comparator/rank.
5. Close WaitGuard, dispatch capture/result, runGoal command-data, constants, accumulator-row, and projection declarations without optional invention.
6. Persist provisional settlements and define deterministic finalize/suppress behavior across fresh-process resume.
7. Preserve downstream independent-review feasibility across widths before accepting profile assignments.
8. Return continuations for every nonterminal bound rejection and define exact route-exhaustion precedence.
9. Add an owner-approved context-source ceiling and bind resolved delivered context bytes/observations through materialization and accepted evidence.
10. Scope attestors by claim kind and make mandatory event payloads byte-reachable at every declared maximum.
11. Add negative and boundary tests for every correction and preserve the Round-4 source chain in milestone and memory.

## Gate Decision

Round 4 outcome is `redesign`. T006A revision-4 integration remains historically complete, but architecture acceptance failed. No V11 runtime implementation, merge, or owner-approval request is authorized. Revision 5 must satisfy every converged obligation, pass local gates, freeze a new immutable commit, and receive four fresh independent `PASS` verdicts.

## Residual Risks

- V11 remains unimplemented and stacked on owner-gated V10.
- Process-local claims and captures have no durable crash recovery or distributed CAS guarantee.
- Host authentication, path resolution, materialization, output, and repository observations remain externally trusted facts, though Revision 5 must narrow their authority and bind their claims.
- Semantic optimization still requires golden-baseline dogfood; deterministic core measurements cannot prove a globally optimal decomposition.
