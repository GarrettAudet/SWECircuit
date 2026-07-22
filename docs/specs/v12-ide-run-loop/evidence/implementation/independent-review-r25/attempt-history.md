# Revision 25 Independent Review Attempt History

## Compilation

- Search: `exact`.
- Claim: `exhaustive_partition_search_fixed_scheduler`.
- Evaluated: 1; eligible: 1; retained alternatives: 0.
- Selected shape: one read-only specialist for one atomic release-trust review.
- Compilation: `sha256:6f301893b1a620d9699d853e33e0e1c0716416caf87652c408d0d7766e43156d`.
- Package: `sha256:290e88b616d9836763aab1d3db3a0e56b46ff4b4af59499ef661976934b1a358`.
- Reviewer: `agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5` at `sha256:895e3f5b182dc649937a7c8ff40ad2230c413273c3cf20fec36463182bb32cdb`.
- Package reconstruction and 24-source authentication: `pass`.
- Host assignment: `gpt-5.6-sol`, `ultra`, read-only.

## Attempt 1

- Semantic outcome: `fix`.
- Raw handoff: `handoffs/agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5-fix-attempt-1.json`.
- Raw identity: 11,294 bytes at `sha256:e53bfd08cdd1b35e636e6887e1a5622a4a533f2e5e707d3fd478a9c6d75c0f70`.
- Package verification: rejected with `SC4310` at `/evidence/0/status`; the handoff used `fail` instead of the workflow outcome `fix`.
- Integration result: immutable rejected attempt; no semantic content accepted from this envelope.

## Attempt 2

- Scope: same package and semantic audit; only `/evidence/0/status` changed from `fail` to `fix`.
- Raw handoff: `handoffs/agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5-fix-attempt-2.json`.
- Raw identity: 11,293 bytes at `sha256:3ec88fb6484540f36cb37292719eb4355408eb560abe041b1ddde6774727a9d3`.
- Semantic digest: `sha256:9fb9d549ad031d33215204ab580212866ab9d0fa7bed91f5d1cc99883575c997`.
- Content digest: `sha256:7cef77aa61742b9cb39423f8d27c4130f1a3b7bd431b5fc8fe573b02df8e1ebd`.
- Complete-package verification: `pass`; semantic route: `fix`; `phaseReady: false`.
- Route: Revision 26 must close unprotected fixture Git reads, all inherited Git-local configuration, and hostile-process behavioral coverage before another freeze.
