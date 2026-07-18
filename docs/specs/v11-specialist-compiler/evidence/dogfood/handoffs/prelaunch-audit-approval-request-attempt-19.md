# V11 Prelaunch Audit B Approval Request: Attempt 19

## Requested Approval

Approve only this exact read-only Audit B package:

- Compilation: `sha256:d13e9dc388779d797cf5c412458a8a9ccc695001dbc1bee94de99df516bd9acb`.
- Package: `sha256:6e2de8a87e484ea7261ecbea0c972c558e907bc06e8af8b8efc2d20d3a21ded4`.

This does not approve Candidate A for launch.

## Candidate Being Audited

- Goal revision: 19.
- Candidate compilation: `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807`.
- Candidate package: `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed`.
- Change from revision 18: add the external closed `PrelaunchPackageVerificationReceipt`, bind its exact bytes into final authorization, declare it through valid `verification-receipt` runtime ports, compile the generated Audit B goal in regression coverage, and preserve the attempt-18 fail-closed evidence.
- Approval-independent evidence: format, lint, typecheck, build, 344/344 tests, V10 compatibility dogfood, deterministic V11 reconstruction, 105-file package inspection, offline installed-consumer execution, and the template checker passed. The canonical V11 command stopped only at its intentionally stale approval control.

## Candidate Selection

Candidate A used `search.mode: exact` and `search.claim: exhaustive_partition_search_fixed_scheduler`. It evaluated all 203 partitions, found 52 eligible, and selected six singleton task specialists at projected makespan 23. The serial baseline projected 40 but is ineligible for `evidence_independence`.

## Audit Shape

Audit B used the same exact-search claim and evaluated both possible partitions. The serial baseline projected 13 but is ineligible because one agent cannot independently bind and review the candidate. The selected two-agent audit is sequential at projected makespan 16:

1. Binder `agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6`
   - Blueprint: `sha256:bdfbd0a345d4fce6c4183e9d5fba128f838e8b319c676a4ea2581bebd8ef5182`.
   - Contract: 13,795 raw bytes.
   - Contract SHA-256: `sha256:ac2ba26ea27236d25960e902732aac96c6f5d80bdac1f1960ad3b8ec9df8bf0c`.
2. Independent semantic reviewer `agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64`
   - Blueprint: `sha256:690e564b287b121191af5e1acf6c801cdd0e4a9dbc4030b44373a8875dc0e1f4`.
   - Contract: 34,860 raw bytes.
   - Contract SHA-256: `sha256:205379a9e4b788842dcce1151cc31f672c1eb5b63af7bca28f38308ea912640a`.

Both contracts are read-only. Audit B authenticates Candidate A's complete compilation and package plus the security-sensitive compiler context. It does not execute Candidate A, merge, update memory, access a provider, or recursively review itself.

## Host Verification Receipt

After approval, the external host must independently reconstruct Candidate A and verify Audit B against this exact approval. It then creates a closed `swecircuit/prelaunch-package-verification-receipt/v1alpha1` receipt outside both packages. The receipt binds both digest pairs, this approval's exact bytes, both agent contracts, and both launch waves; it keeps `candidateLaunchApproved: false`. The receipt is delivered only through each contract's declared `verification-receipt` runtime port and cannot change Audit B's package identity.

## Semantic Gate

Wave 2 must return the exact closed `swecircuit/prelaunch-audit-handoff/v1alpha1` `PrelaunchAuditHandoff`. The host will parse the bound raw bytes and require the exact Audit B goal, reviewer agent and blueprint, both Candidate A and Audit B digest pairs, completed review work unit, review artifact, and both independent review duties with `status: pass`. Prose, a filename, or the authorization outcome cannot establish `PASS` alone.

## After Approval

The host will bind `prelaunch-audit/approval.json` to the exact Audit B pair, reconstruct Candidate A, approval-verify Audit B, preserve the exact package-verification receipt, run the binder, preserve its raw handoff, run the independent semantic reviewer, and require the strict semantic `PASS` envelope. Only then will it create cross-package launch authorization and request separate Candidate A approval.

## Exact Approval Wording

`I approve Audit B compilation sha256:d13e9dc388779d797cf5c412458a8a9ccc695001dbc1bee94de99df516bd9acb and package sha256:6e2de8a87e484ea7261ecbea0c972c558e907bc06e8af8b8efc2d20d3a21ded4. Candidate A remains unapproved.`
