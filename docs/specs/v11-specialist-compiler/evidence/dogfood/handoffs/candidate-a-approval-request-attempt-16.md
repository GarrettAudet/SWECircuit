# Candidate A Approval Request: Attempt 16

## Decision

Approve the exact V11 Candidate A package below so its six specialist contracts may run in their compiled dependency waves.

## Exact Candidate A Identity

- Goal: `v11.specialist-compiler.release`, revision 16.
- Compilation: `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb`.
- Package: `sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1`.
- Search: exact enumeration of 203 partitions; 52 eligible candidates.
- Selected team: six task-shaped specialists, projected makespan 23, peak concurrency 4.

## Prelaunch Evidence

- Audit B was separately approved and verified at compilation `sha256:f9a0de491c7b015257a34752d72b41a16bae964f5b5268fb973289be0beb3f7b` and package `sha256:fb3ae5e99c1eb959b23ecbe856e244e0db46ec529a490759225b35f1e1d20926`.
- Wave 1 authenticated all 10 Candidate A artifacts.
- Wave 2 independently reproduced selection, hard gates, authority, evidence ownership, schedule, all rendered contracts, and the package root; outcome `PASS`.
- Cross-package authorization binds the exact audit handoff at `sha256:730de6024095031bd737cf0866588f4aff41e38c7cb0aed6e10a4994263aefd0`, 6,339 bytes.

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
