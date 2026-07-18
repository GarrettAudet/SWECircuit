# V11 Prelaunch Audit B Approval Request: Attempt 20

## Requested Approval

Approve only this exact read-only Audit B package:

- Compilation: `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608`.
- Package: `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`.

This does not approve Candidate A for launch.

## Candidate Being Audited

- Goal revision: 20.
- Candidate compilation: `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406`.
- Candidate package: `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025`.
- Change from revision 19: reject escaped lone UTF-16 surrogates in every launchable semantic-handoff text surface, preserve valid supplementary characters, require release TEMP/TMP and npm cache to resolve inside declared authority, and require any Windows short-path spelling to resolve to that same authorized target.
- Approval-independent evidence: format, lint, typecheck, build, 345/345 tests, V10 compatibility dogfood, two identical V11 reconstructions, 105-file package inspection, offline installed-consumer execution, and the template checker passed with repository-local temporary workspaces.

## Candidate Selection

Candidate A used `search.mode: exact` and `search.claim: exhaustive_partition_search_fixed_scheduler`. It evaluated all 203 partitions, found 52 eligible, and selected six singleton task specialists at projected makespan 23. The serial baseline projected 40 but is ineligible for `evidence_independence`.

## Audit Shape

Audit B used the same exact-search claim and evaluated both possible partitions. The serial baseline projected 13 but is ineligible because one agent cannot independently bind and review the candidate. The selected two-agent audit is sequential at projected makespan 16:

1. Binder `agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6`
   - Blueprint: `sha256:5077edc0a7e6252686b23cdefa2c03f58796ad9c0f4e988f06b98609d5898b08`.
   - Contract: 13,795 raw bytes.
   - Contract SHA-256: `sha256:1ea9b4c131180756a8a928272afd191935ab011a7fb5a72777056797ebe12116`.
2. Independent semantic reviewer `agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64`
   - Blueprint: `sha256:540815a3e5f6b1449a28d25662aac0c91a0b2edf83092a5b75ede0561c0c147d`.
   - Contract: 34,860 raw bytes.
   - Contract SHA-256: `sha256:474e677fea419e42fcbec9df5aaef88f733e5b07eaecd9d3512daa92019c8b1e`.

Both contracts are read-only. Audit B authenticates Candidate A's complete compilation and package plus the security-sensitive compiler context. It does not execute Candidate A, merge, update memory, access a provider, or recursively review itself.

## Host Verification Receipt

After approval, the external host independently reconstructs Candidate A and verifies Audit B against this exact approval. It then creates the closed `swecircuit/prelaunch-package-verification-receipt/v1alpha1` receipt outside both packages. The receipt binds both digest pairs, this approval's exact bytes, both agent contracts, and both launch waves; it keeps `candidateLaunchApproved: false`. The receipt is delivered only through each contract's declared `verification-receipt` runtime port and cannot change Audit B's package identity.

## Semantic Gate

Wave 2 must return the exact closed `swecircuit/prelaunch-audit-handoff/v1alpha1` `PrelaunchAuditHandoff`. The host parses the bound raw bytes and requires the exact Audit B goal, reviewer agent and blueprint, both Candidate A and Audit B digest pairs, completed review work unit, review artifact, and both independent review duties with `status: pass`. Prose, a filename, or the authorization outcome cannot establish `PASS` alone.

## After Approval

The host binds `prelaunch-audit/approval.json` to the exact Audit B pair, reconstructs Candidate A, approval-verifies Audit B, preserves the exact package-verification receipt, runs the binder, preserves its raw handoff, runs the independent semantic reviewer, and requires the strict semantic `PASS` envelope. Only then does it create cross-package launch authorization and request separate Candidate A approval.

## Exact Approval Wording

`I approve Audit B compilation sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608 and package sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf. Candidate A remains unapproved.`

