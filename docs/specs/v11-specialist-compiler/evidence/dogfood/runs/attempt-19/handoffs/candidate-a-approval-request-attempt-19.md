# Candidate A Approval Request: Attempt 19

## Decision

Approve the exact V11 Candidate A package below so its six specialist contracts may run in their compiled dependency waves. This approval is separate from the completed Audit B approval and does not approve a merge to `main`.

## Exact Candidate A Identity

- Goal: `v11.specialist-compiler.release`, revision 19.
- Compilation: `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807`.
- Package: `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed`.
- Search: exact enumeration of 203 partitions; 52 eligible candidates.
- Selected team: six singleton specialists, projected makespan 23, peak concurrency 4.
- Selection reason: the serial baseline is ineligible because it cannot satisfy requested producer/reviewer independence.

## Independent Prelaunch Evidence

- Audit B was separately approved at compilation `sha256:d13e9dc388779d797cf5c412458a8a9ccc695001dbc1bee94de99df516bd9acb` and package `sha256:6e2de8a87e484ea7261ecbea0c972c558e907bc06e8af8b8efc2d20d3a21ded4`.
- External package-verification receipt: `prelaunch-audit/package-verification-receipt.json`, `sha256:181a8f18a71d6147573f34c1974c4f606bc98d32f37a9f3193fa314343b84228`, 2,255 bytes, `PASS`, with `candidateLaunchApproved: false`.
- Audit B Wave 1 binding handoff: `handoffs/prelaunch-audit-binding-pass-attempt-19.json`, `sha256:fffa466ecc7d238629b82211f2dc334c54c7ff4754ebbe9f447a6f61ccf4f4b3`, 14,912 bytes, `PASS`.
- Audit B Wave 2 semantic handoff: `handoffs/prelaunch-audit-pass-attempt-19.json`, `sha256:ca6be26ab5a0c17f7af7ad4e691ead4ecde4f1fb177f140011bc8e0da53f8653`, 8,738 bytes, `PASS`.
- Cross-package authorization: `launch-authorization.json`, `sha256:ff2a04c1905c54ab514d4c12e1369c133f3c597a496fbe0e3dc6166bbdbc96b7`, 984 bytes. The repository's exported strict verifier returned `PASS` against the frozen compilation and package evidence.

## Exact Specialist Contracts

| Wave | Work unit | Agent | Blueprint | Contract bytes | Contract digest |
| --- | --- | --- | --- | ---: | --- |
| 1 | `prepare.candidate` | `agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730` | `sha256:2c0466b45b0b29ea6ff456bbdcc5e6db3c6809b60d9efa7728ead95b2482eaf2` | 24,212 | `sha256:e12d06998da5d50e77e18e0bae4d181b1484e500593fffabb53172f4b96ea05b` |
| 2 | `review.algorithm-lifecycle` | `agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972` | `sha256:a4c0b3848a186b3723f8d6360345817c423d7bfd4e780b2efdd2a1552be97d54` | 13,789 | `sha256:e2a6d117973af85a9d65b249e1aab5886beca0a3169f6e81fca3ccc3a7ea2dbf` |
| 2 | `review.product-api` | `agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e` | `sha256:191692186617a92aa7e745b52a4c9d2c8260e7ce4e8d601235518464a6182694` | 11,595 | `sha256:cafdfe64a397af7bf380ebbf9878e6d162b5db4a30da2dffd1ff987c17df370e` |
| 2 | `verify.release-gates` | `agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8` | `sha256:a4a3461d97fde8b9228a041b3527c5c46abaffe6a76eb0395dfe923d1021c98a` | 16,843 | `sha256:9a2824a24c01669440298768ea24318e63e381375eb1cab8523602d4b373d71a` |
| 2 | `review.security-trace` | `agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc` | `sha256:9a8080300eba28c962d74689ac6e26d148359351b421376903d4e2917168d0ab` | 23,012 | `sha256:d1a24a33cf03ccf624ee7fb76cc0f83b91cf5063c505a40f467cc2dbd1edb2b3` |
| 3 | `integrate.release` | `agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9` | `sha256:fe9b5b355703a5e7ff7d6aff930a591c42777735fb647ee6a5f698f5436c38bc` | 8,557 | `sha256:9c8e5ec3eeef878efc9b4bac2fd3fd4a4de665930e08e186d7193fdd73cfde2d` |

## Compiled Execution Waves

1. Start 0: `prepare.candidate` authenticates and prepares the immutable candidate.
2. Start 4: algorithm, product/API, release verification, and security/trace specialists run independently in parallel.
3. Start 17: `integrate.release` runs only after all required predecessor handoffs pass.

## Authority Boundary

- No specialist has network or secrets authority.
- Preparation and review specialists are read-only.
- The release verifier may write only declared build, cache, and verification outputs.
- The integration specialist may update only declared V11 release, milestone, and durable-memory artifacts.
- The external IDE host must enforce these scopes. V11 compiles and verifies contracts; it does not itself enforce permissions, execute tools, or merge branches.

## Required Record

On approval, the integration owner writes only the exact Candidate A pair to `evidence/dogfood/approval.json`, runs the complete two-package and cross-authorization gate, and launches only the manifest-resolved contracts in dependency order. Any changed byte retires this approval.

Exact approval wording:

`I approve Candidate A compilation sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807 and package sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed.`
