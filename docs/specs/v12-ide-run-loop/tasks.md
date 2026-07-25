# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revisions 48-49 introduced candidate-private dependency authority and real-project lifecycle proof. Dogfooding and independent review retired Revisions 50-52. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Revisions 53-54 were retired before canonical gating after isolated verification exposed narrow host-contract defects. Revision 55 passed the exact lifecycle and full verifier, then its sole canonical gate at `7c0135c9604893f6baa933d123cd026323ee2912` returned `fail` after four release self-tests assumed filesystem-discoverable Git metadata. Revision 55 is permanently retired. Revision 56 passed exact lifecycle and full verification, then its sole canonical gate at `6dfb99f86a88837ad94c2e73a422c0f6ba2d8c1f` returned `fail`: exact source, materialization, execution authority, dependency closure, and cleanup passed; 457/458 core tests passed, while one Windows long-path self-test made the child-process working directory 260 characters under nested private `TEMP`. Revision 56 is permanently retired. Revision 57 keeps the committed tracked path above 260 characters while bounding source-repository and process-working-directory paths; its nested-private-`TEMP` regression, four causal tests, complete 24-test gate file, 61-test release contract, complete 458-test core suite, status invariants, template and quality gates, and independent review pass. Freeze and commit, exact successor lifecycle, full verification, one successor gate, fresh R2, hosted CI, milestone closeout, and merge remain; `releaseReady: false`. Scope is frozen to release blockers through `2026-07-25 00:03 MDT`.

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
