# V11 Prelaunch Audit B Approval Request: Attempt 18

## Requested Approval

Approve only this exact read-only Audit B package:

- Compilation: `sha256:6b2ff4940cd116618572d80fda9df8c3de455e0ec4c31c35009d28e6004e7048`.
- Package: `sha256:c7ad2f3b97801d426dfa51c4f630e40dfc817be627c6dc26b3282807fd234b28`.

This does not approve Candidate A for launch.

## Candidate Being Audited

- Goal revision: 18.
- Candidate compilation: `sha256:cac4d6f9c7702a5b3018f1a66df63a96f55805e0ddfde174a0f7db0048f12df3`.
- Candidate package: `sha256:5a1d43a399cabb60af82913eb5006afc312c3f2e816aac025fee1bd601736851`.
- Change from revision 17: require repository locator paths to be covered by source `readScope`; parse and semantically validate the exact Audit B handoff; reject Unicode bidirectional formatting controls; add direct adversarial regressions and promote the rules into the handbook and V11 contracts.
- Kernel evidence before compilation: format, lint, typecheck, build, 343/343 tests, V10 dogfood, 105-file package inspection, offline installed-consumer execution, and the template checker passed.

## Candidate Selection

Candidate A used `search.mode: exact` and `search.claim: exhaustive_partition_search_fixed_scheduler`. It evaluated all 203 partitions, found 52 eligible, and selected six singleton task specialists at projected makespan 23. The serial baseline projected 40 but is ineligible for `evidence_independence`.

## Audit Shape

Audit B used the same exact-search claim and evaluated both possible partitions. The serial baseline projected 13 but is ineligible because one agent cannot independently bind and review the candidate. The selected two-agent audit is sequential at projected makespan 16:

1. Binder `agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6`
   - Blueprint: `sha256:c7159f9cf2a2f3eb917ab396d7519a19e92f75897b722927705b3cb2a6a6017a`.
   - Contract: 13,433 raw bytes.
   - Contract SHA-256: `sha256:ee61c3115e510c8ea17a403d3423ea000ad07bb84488bda49aa821d3d7abf66d`.
2. Independent semantic reviewer `agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64`
   - Blueprint: `sha256:a6e344e9470d3113c35a1694b9c40ba8e3126748749fd3e7fb05c0d0feb168ce`.
   - Contract: 34,567 raw bytes.
   - Contract SHA-256: `sha256:dd6b8170326707f65c36986cd92e97f1b8f9cbc2d1698f3391360eaf71425d74`.

Both contracts are read-only. Audit B authenticates Candidate A's complete compilation and package plus the security-sensitive compiler context. It does not execute Candidate A, merge, update memory, access a provider, or recursively review itself.

## Semantic Gate

Wave 2 must return the exact closed `swecircuit/prelaunch-audit-handoff/v1alpha1` `PrelaunchAuditHandoff`. The host will parse the bound raw bytes and require the exact Audit B goal, reviewer agent and blueprint, both Candidate A and Audit B digest pairs, completed review work unit, review artifact, and both independent review duties with `status: pass`. Prose, a filename, or the authorization outcome cannot establish `PASS` alone.

## After Approval

The host will bind `prelaunch-audit/approval.json` to the exact Audit B pair, reconstruct and verify the package, run the binder, preserve its raw handoff, run a fresh independent semantic reviewer, and require the strict semantic `PASS` envelope. Only then will a cross-package launch authorization and separate Candidate A approval request be created.
