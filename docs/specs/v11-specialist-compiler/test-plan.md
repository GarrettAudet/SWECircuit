# V11 Specialist Compiler Test Plan

## Status

Revision 30 technical acceptance is `PASS` for the exact approved Candidate A pair. The two-phase trust root, five Candidate A handoffs, integration-ready fan-in, post-integration reconstruction, final local verification, and accepted archive are complete. Attempt 30b and the final integrated tree passed 119/119 checker cases and 370/370 canonical tests; the release lane also passed 133/133 focused regressions. Commit/push, hosted CI observation, and owner merge approval remain open.

## Acceptance Criteria Mapping

| Acceptance Criterion | Verification | Current Outcome |
| --- | --- | --- |
| AC1-AC3 | Public compiler, normalization, authority, locator, permission, and installed-consumer tests. | `PASS` |
| AC4-AC6 | Exact and bounded search, permutation invariance, deterministic selection reasons, and six reviewed golden cases. | `PASS` |
| AC7-AC9 | Adversarial validation, non-leaking diagnostics, blueprint closure, rendering, and trusted two-digest package verification. | `PASS` |
| AC10 | IDE kickoff, prelaunch audit, exact specialist contracts, raw handoffs, fan-in, and integration flow. | `PASS` |
| AC11 | Format, lint, typecheck, build, unit, schema, package-consumer, template, checker matrix, and canonical verification. | `PASS`: 119 checker, 133 focused, 370 canonical |
| AC12 | Source-linked Revision 30 report, serial comparison, selected metrics, exact packages, raw handoffs, and friction. | `PASS`; replay and archive complete |
| AC13 | Independent product/API, algorithm/lifecycle, and security/trace approval against one immutable digest pair. | `PASS` |
| AC14-AC19 | Candidate analysis, raw handoff/fan-in, first run, Audit B, README, and generated contracts. | `PASS` |
| AC20-AC24 | Public schema registry, clean packed consumers, media/control binding, retained approvals, and strict contained first-run host. | `PASS` |

## Canonical Automated Checks

Attempt 30b executed the exact pre-integration release matrix under the compiled release authority:

- Template checker: `PASS`.
- Complete Windows checker matrix: `119/119`.
- Focused strict JSON, path, schema, compiler, first-run, handoff, and runner regressions: `133/133`.
- `npm.cmd run verify`: `370/370` canonical tests plus format, lint, typecheck, build, examples, both dogfoods, package, and consumer gates.
- Package dry run: `114` files, `134.9 kB` packed.
- Offline installed consumer and explicit committed V11 evidence replay: `PASS`.

The post-integration host reconstructed both approved package pairs, reran the template checker, full 119-case matrix, and canonical verification, preserved the exact integration handoff, and archived attempt 30 with a deterministic 44-file manifest.

## Focused Release Suites

- Candidate construction and analysis: selected equivalence, no-eligible evidence, serial baseline, exact/bounded claims, deterministic ordering, and fail-closed compilation.
- Closed schemas: strict compilation of every definition, package-owned references, canonical outcome closure, and handoff object closure.
- Raw handoffs: UTF-8 and byte limits, trusted identity bindings, work/artifact/evidence completeness, deterministic artifact media, normalized LF acceptance, TAB/CR/CRLF and other control rejection, secret rejection, proxy/accessor non-invocation, duplicates, stale inputs, and transitive dependencies.
- First run: retained approval is bounded, strict, duplicate-aware, and recursively closed; unsafe or privacy-sensitive paths fail before I/O; repository bytes cross a canonical contained regular-file boundary; real context output is deterministic and approval-bound; the repository remains unchanged; and the command reports zero agents executed.
- Packed consumer: clean offline JavaScript and TypeScript hosts resolve all advertised specialist schemas through public package exports, compile strict schemas, import every public V11 operation, retain the same approval pair, and produce media-compliant handoffs from the packed artifact.

## Golden Optimization Cases

1. `one-agent-optimal`: startup and handoff costs make the serial roster strictly best.
2. `genuinely-parallel`: disjoint heavy work shortens projected makespan with two specialists.
3. `under-split`: requested producer/checker independence makes the serial partition ineligible.
4. `over-split`: atomic agents lose to a cohesive partition through handoff and startup costs.
5. `conflict-heavy`: equal write/conflict keys serialize apparent parallel work.
6. `generic-role`: role-only or provider-shaped input fails; exact task ownership compiles.

## Dogfood Evidence

- Revisions 17-29 remain immutable historical evidence under `evidence/dogfood/runs/`.
- Revision 24 stopped before launch on a contradictory prelaunch handoff contract. Revision 25 corrected that contract, then stopped on the concise-README compatibility regression. Revision 26 restored the public contract but retired after the binder returned an invalid nested handoff and the checker matrix found one stale expected diagnostic; zero results were accepted.
- Revision 27 preserved the complete prelaunch chain and exact Candidate A fan-out, then stopped with machine fan-in `integrationReady: false`; its packages, controls, five public-verified Candidate A results, three `FIX` findings, and retirement record are archived under `evidence/dogfood/runs/attempt-27/`.
- Revision 28 passed Audit B, preparation, algorithm/lifecycle, and security/trace, then stopped on matching product/API and release `FIX` findings for the stale first-run approval. Its complete non-ready run is archived under `evidence/dogfood/runs/attempt-28/`.
- Revision 29 passed Audit B, preparation, algorithm/lifecycle, and release, then stopped on product/API and security/trace `FIX` findings for authorization-summary drift and the first-run host boundary. Its complete non-ready run is archived under `evidence/dogfood/runs/attempt-29/`.
- Revision 30 preserves the GoalContract, exact Candidate A and Audit B packages and approvals, external receipt, semantic audit, cross-package authorization, five raw Candidate A handoffs, release evidence, and integration-ready fan-in. Attempt 30a is a bounded host-authority `FIX`; exact retry 30b is the accepted release handoff.
- Technical integration records the serial baseline and selected roster without presenting projected planning units as elapsed-time performance. Post-integration replay passed before the 44-file attempt-30 archive was created and hash-verified.

## Manual And Independent Checks

- Audit B confirms the exact Candidate A package is semantically sufficient and safe to launch before Candidate A receives approval.
- Product/API review checks that a first-time IDE host can use the public operations and every advertised schema dependency through supported package exports without hidden runtime, private-path, or network assumptions.
- Algorithm/lifecycle review checks candidate equivalence, search claims, deterministic selection, dependency closure, and integration ordering.
- Security/trace review checks parser boundaries, secret/control handling, normalized LF, deterministic artifact media, exact source/package/handoff bindings, permission language, and non-effect claims.
- Release verification runs the canonical gates under the exact release specialist authority and preserves stable output.
- The integration owner accepts only verified `PASS` handoffs and a ready transitive fan-in assessment.

## External Boundaries

No provider execution, model routing, worktree isolation, process scheduling, credential enforcement, merge automation, or memory mutation is claimed. The external host performs those effects. V11 verifies the contracts and evidence supplied at its boundary.

## Evidence Ownership

The integration owner preserves raw bytes before parsing and owns the final source chain. Any release document that integration may change is reviewed through an immutable pre-integration snapshot. A source, compilation, package, receipt, authorization, handoff, or replay mismatch retires the candidate and requires a new revision.
