# Candidate A Approval Request: Attempt 17

## Decision

Approve the exact V11 Candidate A package below so its six specialist contracts may run in their compiled dependency waves.

## Exact Candidate A Identity

- Goal: `v11.specialist-compiler.release`, revision 17.
- Compilation: `sha256:3677db46ecd2a387239887ecff6d131f1d0616a2dba972ffbe63bdc0ee6b9984`.
- Package: `sha256:1cc61cead6a953633c8369e29270c92318e9c58381e2389a971bad5e1ecc72b0`.
- Search: exact enumeration of 203 partitions; 52 eligible candidates.
- Selected team: six task-shaped specialists, projected makespan 23, peak concurrency 4.
- Selection reason: the serial baseline is ineligible because it cannot satisfy requested producer/reviewer independence.

## Prelaunch Evidence

- Audit B was separately approved and verified at compilation `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff` and package `sha256:b5aa9a0db063fd06d1302842e7994d0ed6695182815520d7adbb3d0d612331eb`.
- Wave 1 authenticated all 10 Candidate A artifacts and reconstructed both trusted Candidate A digests.
- Wave 2 attempt 17A self-invalidated after a shell-quoting error widened one read; its `REVISE` handoff is preserved and contributes no semantic evidence.
- Fresh Wave 2 attempt 17B used literal-path-only reads, authenticated all 44 context items before and after review, independently reproduced search, selection, authority, evidence ownership, schedule, all rendered contracts, and the package root, and returned `PASS`.
- Cross-package authorization binds the exact attempt-17B raw handoff at `sha256:21df12f1253399a9e98dbcf0c5e98dc3b005bcb058ab2d6078947a9f227a1b73`, 11,116 bytes.

## Compiled Execution Waves

1. Start 0: `prepare.candidate` authenticates and prepares the immutable candidate.
2. Start 4: `review.algorithm-lifecycle`, `review.product-api`, `verify.release-gates`, and `review.security-trace` run independently in parallel.
3. Start 17: `integrate.release` runs only after all required predecessor handoffs pass.

## Authority Boundary

- No specialist has network or secrets authority.
- Reviewers are read-only; declared process demand is limited to their exact contract scopes.
- The release verifier may write only declared build, cache, and temporary verification outputs.
- The integration specialist may update only declared V11 release, milestone, and durable-memory artifacts.
- The external IDE host must enforce these scopes. Candidate approval does not approve a merge to `main`.

## Required Record

On approval, the integration owner writes only this exact pair to `evidence/dogfood/approval.json`, runs the complete two-package and cross-authorization gate, and launches only the manifest-resolved contracts in dependency order. Any changed byte retires this approval.
