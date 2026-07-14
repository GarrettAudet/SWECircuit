# Review: V10 Bounded Executor Boundary

## Status

Candidate `ac70efc` passed all seven hosted jobs and correctness review. Security returned `REVISE` because presence-only checks could coexist with contradictory claims, and API/documentation returned `REVISE` because current status records depended on creating another candidate. Both findings now have causal corrections. The current acceptance state awaits exact-commit review and hosted CI; V10 is not merged.

## Review Outcome

The first postimplementation round returned `REVISE` from all three reviewers. Exact review of committed candidate `e3453e0` then returned `PASS` from security and `REVISE` from correctness plus API/documentation. The remaining findings were a non-atomic fulfillment snapshot and documentation that collapsed no-call terminal certainty into post-invocation acknowledgment. Those corrections were frozen and reviewed in later candidates.

Candidate `9d8907a` then passed all three reviews and hosted CI. The first integration-owner closeout search found a stale feature-spec sentence and produced `2c6dff4`. Expanded exact review of `2c6dff4` found the same old semantics in the practice register and plan, proving the first search was narrower than its completion claim.

Candidate `dbbeeb1` corrected the full cancellation claim family and passed hosted CI. Its broader correctness and security review found one final lifecycle rule in ADR 0002 and an independent authority-term defect in the research decision table. API/documentation passed.

Candidate `4c6818d` corrected those sources and passed hosted CI. Exact review then found that two public summaries still compressed invocation-scoped identity checking into apparent single use, the packaged guide omitted the full settlement prerequisite for terminal certainty, and two accepted practices rendered outside their table.

Candidate `b2d73e7` corrected those findings and passed hosted CI, but all three reviewers found that the prerequisite still had not reached every public summary and that the packaged grant explanation still lacked a standalone complete disclaimer. Candidate `ac70efc` added the ADR-to-surface matrix and executable parity fixtures; its exact review then exposed the need for target-line enforcement, contradiction rejection, and invariant acceptance-state wording.

## Spec Alignment

AC1 through AC7 are satisfied by local implementation evidence. AC8 is structurally complete through research, ADR, feature records, dogfood evidence, memory, and milestone preparation, but remains open until exact-candidate review is recorded.

## Architecture Alignment

The implementation follows ADR 0002:

- One host-selected packet and one caller-injected executor; no scheduler or dynamic loader.
- Runtime grant authority remains distinct from manifest requests and packet ceilings.
- Preflight snapshots and permission checks fail closed before invocation.
- Cancellation and deadlines use first host observation, early timer re-arming, a direct pre-call gate, and an acknowledgment bound anchored to the abort observation.
- Returned events remain caller-owned, deterministic, frozen, and V9-inspectable.
- Provider isolation, credentials, persistence, retries, merge, and memory remain host responsibilities.

## Verification Evidence

- `npm.cmd run verify`: corrected candidate passed with 275 tests, format, lint, typecheck, build, V10 dogfood, package dry run, and clean offline consumer.
- V10 dogfood: under-authorized grant returned `SC4206` with zero calls; corrected grant invoked once and produced seven inspectable events.
- Installed consumer: shipped guide present; public declarations compile under independent settings; a class executor runs; the real result is narrowed and inspected.
- Prior candidate `e3453e0` passed all seven jobs in GitHub Actions run `29355583567`, but exact review returned correctness `REVISE`, security `PASS`, and API/documentation `REVISE`; green CI did not override review.
- Candidate `9d8907a` received correctness, security, and API/documentation `PASS` verdicts and passed all seven jobs in GitHub Actions run `29357443883`.
- Candidate `2c6dff4` passed all seven jobs in GitHub Actions run `29358105210`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `dbbeeb1` passed all seven jobs in GitHub Actions run `29358867851`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `PASS`.
- Candidate `4c6818d` passed all seven jobs in GitHub Actions run `29359564312`; exact review returned correctness `REVISE`, security `PASS`, and API/documentation `REVISE`.
- Candidate `b2d73e7` passed all seven jobs in GitHub Actions run `29361203381`; exact review returned correctness `REVISE`, security `REVISE`, and API/documentation `REVISE`.
- Candidate `ac70efc` passed all seven jobs in GitHub Actions run `29364033724`; exact review returned correctness `PASS`, security `REVISE`, and API/documentation `REVISE`.
- Local gate: fresh `npm.cmd run verify` passes format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the clean offline consumer. The positive checker and all 62 isolated scenarios pass, comprising 59 expected rejections and three expected acceptances; 19 are public-contract parity cases. Exact-commit review and hosted CI remain.

## Findings

| Severity | Finding | Resolution |
| --- | --- | --- |
| High | Cancellation or deadline could be observed before a microtask-scheduled executor still ran. | Removed the scheduling gap, armed observers first, added final and direct pre-call gates, timestamped observations, and added no-call race tests. |
| High | Sparse arrays and oversized records could expand work before the node budget rejected them. | Read array length and object keys before descriptor traversal, enforce remaining-node bounds, and test huge sparse and dense oversized values. |
| Medium | Forged signals, revoked proxies, live proxy traps, and prototype class methods were mishandled. | Added intrinsic signal brand checks, trap-free Node proxy rejection, safe reflection, prototype data-method lookup, and hostile-value tests. |
| Medium | The acknowledgment timer began after abort delivery and accepted late settlement; deadline timers could fire early. | Anchor acknowledgment to `abort.observedAt`, compare settlement timestamps strictly to the bound, and re-arm early timer wake-ups. |
| Medium | Public grant types, result narrowing, guide packaging, diagnostic wording, and adapter-table rendering drifted from runtime behavior. | Added `ExecutionGrantPermission`, explicit null narrowing, installed guide checks, broadened active exit-class wording, and repaired the table. |
| Medium | Emitted declarations failed under independent consumer settings. | Replaced incompatible optional-interface declarations with portable intersection aliases and retained an installed TypeScript consumer gate. |
| Medium | Fulfillment was timestamped while retaining the executor-owned raw settlement, so a queued mutation could change content before normalization. | Normalize and detach synchronously inside the fulfillment observer, carry only the frozen normalized settlement, and add a resolve-then-mutate regression. |
| Medium | Active guides implied every terminal cancellation acknowledged executor settlement, including no-call paths. | Distinguish proven no-call terminal certainty from post-invocation acknowledgment, and require the executor promise to remain pending until all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. |
| Gate | The first postimplementation round did not pass. | Preserve both review rounds; require all three reviewers to inspect the next immutable candidate and return explicit verdicts. |
| Gate | The `9d8907a` review prompt and closeout scan did not explicitly enumerate the feature spec, leaving one stale normative sentence after three `PASS` verdicts. | Correct the spec, search the complete contract surface, and require all three reviewers to inspect the final exact commit before AC8 closes. |
| Gate | The first closeout search matched only direct terminal-acknowledgment wording and missed synonymous claims in the plan and practice register. | Search the full claim family across all tracked docs, correct every active normative statement, narrow the historical completion claims, and repeat all three exact reviews. |
| Medium | ADR 0002 rule 6 still sent every abort win through bounded acknowledgment, including pre-invocation no-call paths. | Split the rule at invocation: return the terminal no-call journal before invocation; wait for bounded acknowledgment only after invocation. |
| Medium | The research decision table called the runtime grant ephemeral even though the kernel cannot prove freshness, single use, or replay prevention. | Rename it invocation-scoped and state the guarantees it does not provide. |
| Gate | Cancellation-term consistency did not cover adjacent authority adjectives. | Search security-significant adjectives and their disclaimed guarantees before declaring the contract ready. |
| Medium | Public schema and implementation summaries said the grant was bound to one call or invocation, implying consumption the stateless kernel does not enforce. | Describe invocation-scoped identity and permission assertions and explicitly state that the kernel does not consume grants or prevent reuse or replay. |
| Medium | The packaged executor guide defined terminal certainty without requiring the executor promise to cover all invocation-affecting activity. | Carry the ADR promise-liveness rule into the installed guide and state that transfer of live work is not acknowledgment. |
| Low | Two accepted V10 practices were appended below Rejection Criteria rather than inside the Current Practices table. | Move both rows before Promotion Criteria and preserve a blank structural boundary before the heading. |
| Medium | `b2d73e7` retained settlement-only shorthand in secondary public surfaces, so timely promise settlement could be read as sufficient terminal proof. | Map ADR 0002 to every public summary, use contract-compliant acknowledgment, and require stopped invocation-affecting activity plus no live-work transfer. |
| Medium | The packaged grant explanation did not independently state all guarantees the stateless kernel lacks. | State issuer-authentication, freshness, single-use, enforcement, revocation, consumption, reuse, and replay limits in the installed and schema guides. |
| Gate | Prose searches and positive structure checks did not prevent public-contract parity regressions. | Candidate `ac70efc` added an ADR-to-surface matrix, required checker terms, required register rows, and six isolated parity fixtures. |
| Gate | Presence-only section checks could pass while the intended contract line was incomplete or a contradictory positive claim remained nearby. | Bind each invariant to exactly one intended line, reject 11 contradictory claim classes across all checked surfaces, and add 13 preserving or relocation fixtures. |
| Gate | Candidate-dependent status prose became stale as soon as the candidate under review existed. | Describe the invariant acceptance gate instead: exact-commit review and hosted CI remain pending until recorded, without requiring an unnamed future commit. |

## Residual Risks

- Trusted in-process executor code can ignore the grant, retain ambient authority, or block the event loop; V10 is not a sandbox.
- `abort_unconfirmed` means work may still be live and requires host quarantine or isolation.
- The kernel does not persist journals, schedule or retry packets, load providers, merge changes, or update memory automatically.
- The 0.x executor surface is intentionally unstable and the repository remains unlicensed.
- Run-owned temporary cleanup cannot survive process termination and remains subject to the previously documented identity-replacement boundary.

## Memory And Docs

The V10 candidate updates decisions, patterns, known issues, glossary, history, retrieval pointers, active context, public docs, ADRs, and the milestone. Final verdict identifiers and the exact candidate commit will be added as an evidence-only closeout after independent review.