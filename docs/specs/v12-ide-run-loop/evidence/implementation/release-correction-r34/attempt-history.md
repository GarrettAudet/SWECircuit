# Revision 34 Attempt History

## Revision 33 Exact Aggregate

- Candidate: `ff0b76d3e39bc9e7583e5956fe2c89af015630c6`.
- Tree: `b7bc9b67f5a00512f9518ed6ab96f5e78bd9eef0`.
- Result: 445/445 core tests and the copied-production lifecycle passed; V11 dogfood then stopped before V12 dogfood, package inspection, or installed-consumer verification.
- Failure: `context.gitattributes` expected 749 bytes / `sha256:8d0ac86b6407f4e8fd439c964560ad76b62c8506b2d218894a938e5b9c02da3a` and received 1,283 bytes / `sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`.
- Exact external stdout: 37,880 bytes, `sha256:250ecb1369cfb5724b062110f7432ae18b4d8e4ba17155a6db0d8f537e2d30bd`.
- Exact external stderr: 20,717 bytes, `sha256:439309f8991e2a258c7692f5d4c1b6e946a5f88ffeea8dbd8c6408e564e55fd2`.
- Exact external receipt: 1,228 bytes, `sha256:c3f8aa3dfa7b625eac03b4412c7aebaafa0078e52edd8ffcb425a04db9fb192b`.
- Source identity and clean-worktree state remained exact before and after the run.

## Diagnosis

All 58 V11 repository contexts were compared with the live source. Only `.gitattributes` differed. Its added binary rules protect raw Revision 31 handoffs, logs, patches, and receipts from newline normalization, so reverting it would remove a required byte-integrity control.

Revision 43 was archived before regeneration under `docs/specs/v11-specialist-compiler/evidence/dogfood/runs/attempt-43/`. Revision 44 refreshes only the changed `.gitattributes` tuple and retains exact authentication for the other 57 sources.

## Trust-Order Correction

The first Revision 44 preparation bound both approval files before semantic authorization. Independent review caught that Candidate A approval preceded the required Audit B handoff and cross-package authorization. Candidate A was never launched, its receipt retained `candidateLaunchApproved: false`, and the premature approval was revoked by restoring the exact archived Revision 43 approval bytes. Audit B approval and the non-launching receipt remained valid.

## Route

`verify -> diagnose -> fix -> review -> pass`. Revision 33 is retired as a release candidate. Revision 44 now has a verified 6,366-byte binder, `integrationReady: true`, an independent 10,233-byte semantic `pass`, 985-byte cross-package authorization, correctly ordered Candidate A reapproval, 31/31 dedicated dogfood regressions, and strict `--check-evidence` replay. Revision 34 still requires post-edit anti-drift checks, an immutable commit, and a fresh aggregate.
