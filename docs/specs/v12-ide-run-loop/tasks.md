# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revisions 48-49 introduced candidate-private dependency authority and real-project lifecycle proof. Dogfooding retired Revision 50; independent reviews retired Revisions 51-52 after portability, cleanup, publication, and command-authority defects. Revision 53 retains an exact registry/SRI lock and offline candidate-private install, binds install logs and the private closure, binds nested npm command-to-target authority, preserves aggregate cleanup evidence, passes the release contract suite 61/61, and passes the exact-lock typecheck, ESM, and cleanup probe. No Revision 53 gate has been consumed. Exact committed lifecycle, full verification, one successor gate, fresh R2, hosted CI, milestone closeout, and merge remain; `releaseReady: false`. Scope is frozen to release blockers through `2026-07-25 00:03 MDT`.

## Task List

- [x] T001: Create the V12 branch and feature package from released V11.1.
  Verification: branch parent and active artifacts identify `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`.
- [x] T002: Compile the architecture work through V11.1.
  Verification: reviewed GoalContract, serial baseline, selected partition, compilation digest, package digest, and verified package are preserved.
- [x] T003: Execute and verify architecture specialists.
  Verification: exact raw handoffs verify; architecture integration has complete transitive `pass` fan-in.
- [x] T004: Freeze the V12 ADR and implementation contract.
  Verification: product, lifecycle, authority, API, and test obligations map to AC1-AC9 with no blocking decision.
- [x] T005: Compile and implement disjoint V12 work units.
  Verification: every code or documentation change maps to an exact task-shaped contract and handoff.
- [ ] T006: Run integrated verification and independent review.
  Verification: focused tests, canonical gate, package consumer, checker matrix, dogfood, and reviewer evidence pass.
- [ ] T007: Close memory, milestone, publication, and owner merge gate.
  Verification: exact candidate, CI, residual risks, and user-facing overview are preserved.

## Parallelization

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 now includes Revision 38's package-bound `pass`, Revision 39's exact gate `pass`, and its fresh-R2 `diagnose`. After Revision 40 passes an exact committed gate, fresh R2 may fan out across the three independent product/API/IDE, lifecycle/correctness, and security/trace domains.

## Out Of Scope

- Provider or model routing.
- Automatic subagent launch from core.
- Universal scheduling, retries, cancellation, or crash recovery.
- Automatic Git merge or memory mutation.

## Revision 41 Release Hardening

- [x] Preserve Revision 40 gate and fresh-R2 raw evidence.
- [x] Confirm ambient execution authority and incomplete review-source coverage.
- [x] Close gate environment, toolchain, npm configuration, and dependency identity.
- [x] Validate receipt v1alpha2 in the independent-review consumer.
- [x] Add the six omitted transitive sources and causal regressions.
- [x] Pass all 53 release-specific tests.
- [ ] Freeze one exact Revision 41 commit and run the complete verifier.
- [ ] Invoke the Revision 41 canonical gate exactly once.
- [ ] Complete fresh three-domain R2 review.
- [ ] Pass hosted CI, close the milestone, and merge to `main`.
