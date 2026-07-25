# Tasks

## Status

Package and handoff verification authenticate artifacts; they do not establish release readiness alone. Revision 47's canonical gate failed and is permanently retired. Revision 53 retained an exact registry/SRI lock and offline candidate-private install; its evidence binds install logs and the private closure. Revision 58 commit `da74ef518638ad6b32ff4a767b057f44c82e6bd6` is permanently retired. Its exact copied lifecycle passed 2/2, but its exact full verifier and hosted run `30139492037` failed because changed top-level documentation invalidated approved V11 context identities and the hosted whitespace check rejected preserved raw `.log` evidence. Its one-shot gate was not invoked. Revision 59 restores the approved documentation bytes, keeps the Windows prerequisite in `WINDOWS.md`, authenticates the entire hosted workflow and fail-closed whitespace step, and passes 63/63 release tests, 460/460 core tests, V10/V11/V12 dogfood, both checkers, format, lint, typecheck, package inspection, and clean consumer verification. Independent Attempts 1 through 4 returned `fix` and were corrected; Attempt 5 passed with no blocking findings. Source freeze and commit are pending. Exact freeze and commit, committed lifecycle, full verifier, hosted CI, one successor gate, fresh R2, milestone closeout, and merge remain; `releaseReady: false`. Scope is frozen to release blockers through `2026-07-25 00:03 MDT`.

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

T003 ran three read-only architecture analyses in parallel and one dependent synthesis. T005 froze the shared session foundation, then ran transition and inspection in parallel with disjoint write scopes. T006 now preserves Revision 58's exact local and hosted retirement evidence while Revision 59 completes rereview. After Revision 59 passes exact committed verification and hosted CI, fresh R2 may fan out across the three independent product/API/IDE, lifecycle/correctness, and security/trace domains.

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

## Revision 58 Hosted Release Correction

- [x] Preserve Revision 57's exact local pass and hosted-CI failure.
- [x] Confirm Windows checkout and shallow-history root causes.
- [x] Add pre-checkout long-path setup, complete history, documentation, and focused regression.
- [x] Pass the complete pre-freeze contract and independent review.
- [x] Freeze and commit exact Revision 58 source.
- [x] Run exact lifecycle (`pass`), full verifier (`fail`), and hosted matrix (`fail`); retire without gate consumption.

## Revision 59 Release Correction

- [x] Preserve Revision 58's exact lifecycle pass, exact full-verifier failure, hosted failure, and unconsumed gate.
- [x] Restore V11-approved documentation identities and move the Windows prerequisite to `WINDOWS.md`.
- [x] Authenticate the enabled template-check job and reject Git-enumeration, exemption, and control-flow bypass mutations.
- [x] Pass focused and broad pre-freeze verification.
- [x] Obtain independent Attempt 5 pass with no blocking findings.
- [ ] Freeze and commit exact Revision 59 source.
- [ ] Pass exact lifecycle, full verifier, and hosted matrix.
- [ ] Consume one canonical gate and complete fresh three-domain R2.
- [ ] Close memory and the milestone, then merge to `main`.
