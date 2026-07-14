# Review: V10 Bounded Executor Boundary

## Status

Acceptance candidate in preparation. Exact-commit independent re-review remains required.

## Review Outcome

The first postimplementation review round returned `REVISE` from correctness, security, and API/documentation reviewers. Every concrete finding has a causal implementation or contract fix plus focused regression coverage. Local verification is green; the candidate must still receive explicit `PASS` verdicts after it is committed and pushed.

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

- `npm.cmd run verify`: passed with 274 tests, format, lint, typecheck, build, V10 dogfood, package dry run, and clean offline consumer.
- V10 dogfood: under-authorized grant returned `SC4206` with zero calls; corrected grant invoked once and produced seven inspectable events.
- Installed consumer: shipped guide present; public declarations compile under independent settings; a class executor runs; the real result is narrowed and inspected.
- Workflow checker: last pre-candidate run passed with all 43 isolated negative scenarios; exact-candidate rerun is still required.

## Findings

| Severity | Finding | Resolution |
| --- | --- | --- |
| High | Cancellation or deadline could be observed before a microtask-scheduled executor still ran. | Removed the scheduling gap, armed observers first, added final and direct pre-call gates, timestamped observations, and added no-call race tests. |
| High | Sparse arrays and oversized records could expand work before the node budget rejected them. | Read array length and object keys before descriptor traversal, enforce remaining-node bounds, and test huge sparse and dense oversized values. |
| Medium | Forged signals, revoked proxies, live proxy traps, and prototype class methods were mishandled. | Added intrinsic signal brand checks, trap-free Node proxy rejection, safe reflection, prototype data-method lookup, and hostile-value tests. |
| Medium | The acknowledgment timer began after abort delivery and accepted late settlement; deadline timers could fire early. | Anchor acknowledgment to `abort.observedAt`, compare settlement timestamps strictly to the bound, and re-arm early timer wake-ups. |
| Medium | Public grant types, result narrowing, guide packaging, diagnostic wording, and adapter-table rendering drifted from runtime behavior. | Added `ExecutionGrantPermission`, explicit null narrowing, installed guide checks, broadened active exit-class wording, and repaired the table. |
| Medium | Emitted declarations failed under independent consumer settings. | Replaced incompatible optional-interface declarations with portable intersection aliases and retained an installed TypeScript consumer gate. |
| Gate | The first postimplementation round did not pass. | Preserve all three `REVISE` handoffs; require the same reviewers to inspect the immutable candidate and return explicit verdicts. |

## Residual Risks

- Trusted in-process executor code can ignore the grant, retain ambient authority, or block the event loop; V10 is not a sandbox.
- `abort_unconfirmed` means work may still be live and requires host quarantine or isolation.
- The kernel does not persist journals, schedule or retry packets, load providers, merge changes, or update memory automatically.
- The 0.x executor surface is intentionally unstable and the repository remains unlicensed.
- Run-owned temporary cleanup cannot survive process termination and remains subject to the previously documented identity-replacement boundary.

## Memory And Docs

The V10 candidate updates decisions, patterns, known issues, glossary, history, retrieval pointers, active context, public docs, ADRs, and the milestone. Final verdict identifiers and the exact candidate commit will be added as an evidence-only closeout after independent review.