# V11 Prelaunch Audit B Approval Request: Attempt 21

## Requested Approval

Approve only this exact read-only Audit B package:

- Compilation: `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c`.
- Package: `sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90`.

This does not approve Candidate A for launch, integration, merge, or release.

## Candidate Being Audited

- Goal revision: 21.
- Candidate compilation: `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266`.
- Candidate package: `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`.
- Change from revision 20: apply high-confidence secret detection to semantic handoffs, reject all C0 controls in metadata while permitting only LF in Markdown artifacts, and reject lone UTF-16 surrogates before resolving variable authorization-handoff paths.
- Approval-independent evidence: focused build and 65 focused regressions passed; the full kernel suite passed 353/353 tests; format, lint, typecheck, build, Node syntax checks, and diff checks passed.

## Candidate Selection

Candidate A used `search.mode: exact` and `search.claim: exhaustive_partition_search_fixed_scheduler`. It evaluated all 203 partitions, found 52 eligible, and selected six singleton task specialists at projected makespan 23. The serial baseline projected 40 but is ineligible for `evidence_independence`.

## Audit Shape

Audit B used the same exact-search claim and evaluated both possible partitions. The serial baseline projected 13 but is ineligible because one agent cannot independently bind and review the candidate. The selected two-agent audit is sequential at projected makespan 16:

1. Binder `agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6`
   - Blueprint: `sha256:fca4710fa97fc929375872a9489def53000b1e8427043060c0c443eaa4ee331d`.
   - Contract: 13,795 raw bytes.
   - Contract SHA-256: `sha256:48b580134dc6df60b7d9761c4769a7931464665e6e4dd9147bd2b97720ad4ba9`.
2. Independent semantic reviewer `agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64`
   - Blueprint: `sha256:7de4560154b1bdcb91fd23bcf79cb433932f977f5536c0c1a04d9b7543c36ae2`.
   - Contract: 35,466 raw bytes.
   - Contract SHA-256: `sha256:23fb0ec14cd8f01a45b033d04fd5e54bd2a6e0cbff4e2535cd2dd65e7b577a7f`.

Both contracts are read-only. Audit B authenticates Candidate A's complete compilation and package plus the security-sensitive compiler context. It does not execute Candidate A, merge, update memory, access a provider, or recursively review itself.

## Host Verification Receipt

After approval, the external host independently reconstructs Candidate A and verifies Audit B against this exact approval. It then creates the closed `swecircuit/prelaunch-package-verification-receipt/v1alpha1` receipt outside both packages. The receipt binds both digest pairs, this approval's exact bytes, both agent contracts, and both launch waves; it keeps `candidateLaunchApproved: false`. The receipt is delivered only through each contract's declared `verification-receipt` runtime port and cannot change Audit B's package identity.

## Semantic Gate

Wave 2 must return the exact closed `swecircuit/prelaunch-audit-handoff/v1alpha1` `PrelaunchAuditHandoff`. The host parses the bound raw bytes and requires the exact Audit B goal, reviewer agent and blueprint, both Candidate A and Audit B digest pairs, completed review work unit, review artifact, and both independent review duties with `status: pass`. Prose, a filename, or the authorization outcome cannot establish `PASS` alone.

## After Approval

The host binds `prelaunch-audit/approval.json` to the exact Audit B pair, reconstructs Candidate A, approval-verifies Audit B, preserves the exact package-verification receipt, runs the binder, preserves its raw handoff, runs the independent semantic reviewer, and requires the strict semantic `PASS` envelope. Only then does it create cross-package launch authorization and request separate Candidate A approval.

## Exact Approval Wording

`I approve Audit B compilation sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c and package sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90. Candidate A remains unapproved.`
