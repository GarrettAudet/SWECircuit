# Candidate A Approval Request: Attempt 20

## Decision

Approve the exact V11 Candidate A package below so its six specialist contracts may run in their compiled dependency waves. This approval is separate from the completed Audit B approval and does not approve a merge to `main`.

## Exact Candidate A Identity

- Goal: `v11.specialist-compiler.release`, revision 20.
- Compilation: `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406`.
- Package: `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025`.
- Search: exact enumeration of 203 partitions; 52 eligible candidates.
- Selected team: six singleton specialists, projected makespan 23, peak concurrency 4.
- Selection reason: the serial baseline is ineligible because it cannot satisfy requested producer/reviewer independence.

## Independent Prelaunch Evidence

- Audit B was separately approved at compilation `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608` and package `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`.
- External package-verification receipt: `prelaunch-audit/package-verification-receipt.json`, `sha256:42874365356f5763089f88986994eef65a9281b08d4409b04a5b6738640e3341`, 2,255 bytes, `PASS`, with `candidateLaunchApproved: false`.
- Audit B Wave 1 binding handoff: `handoffs/prelaunch-audit-binding-pass-attempt-20.json`, `sha256:6fcb784eb7ce6947da222efa5df226cc3a58845c6dea44a9467ba19955a7962d`, 13,672 bytes, `PASS`.
- Audit B Wave 2 semantic handoff: `handoffs/prelaunch-audit-pass-attempt-20.json`, `sha256:79d5049657cb0049b7234e14de8891a1b965f0cb18882d0a0c61df43444af9c0`, 8,597 bytes, `PASS`.
- Cross-package authorization: `launch-authorization.json`, `sha256:24d72c11fe3a4b675266d216f03d56762712ee31001954e31fa1689a004b2ff3`, 984 bytes.
- The repository prelaunch verifier reconstructed Candidate A, Audit B, and the receipt and returned `PASS`. The final approval-bound cross-authorization verifier runs only after this separate Candidate A approval is recorded.

## Exact Specialist Contracts

| Wave | Work unit | Agent | Blueprint | Contract bytes | Contract digest |
| --- | --- | --- | --- | ---: | --- |
| 1 | `prepare.candidate` | `agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730` | `sha256:af443cb5e62b8fe9f2660adfad751bfac73a20166371746cd136a63744b78a8e` | 24,212 | `sha256:4d14c8d6a26cfb0538c0b466758ca2d3d9fb13b6110d86512f906f9388ea62ac` |
| 2 | `review.algorithm-lifecycle` | `agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972` | `sha256:77b7b6d032f0e995510990f37bebfad519907a794abc3cecbdd06f46795e5399` | 13,789 | `sha256:748f07476b0c067308ef248226b595c2e0e11b369785904047cba99efb4d8133` |
| 2 | `review.product-api` | `agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e` | `sha256:e7e76dee758d067fb1366671d8ac152a8c9525028f090e31826c7bf56efa439a` | 11,595 | `sha256:9c60fafc2f636996f533845aff543a1d4066329a35356c42d52fa1b18ce6ee5c` |
| 2 | `verify.release-gates` | `agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8` | `sha256:35a70da6a28992d0cfe6ea3d31c91d5184ea1aced6c188da0672ac26ec2040e5` | 17,301 | `sha256:67c0edcdc8b6b8b72028f007c08996d3ac82b8a3b74be20508093952bb808a16` |
| 2 | `review.security-trace` | `agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc` | `sha256:18e96c372fc82ded5b6b63b11d0ec232a5403023e345008d2d7a962e4cacba24` | 23,111 | `sha256:884ab1a35d2580b1e9930f05e3f5a8b78dde7b5a0b5d9b1cb9cbd284175568a3` |
| 3 | `integrate.release` | `agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9` | `sha256:57f0cc9211500e15493316c102aa24e1aa041933d3b976955366d0232f84d609` | 8,557 | `sha256:0b185a83bfa301433fc60a560d68a85cb4d3af95255ddc87d2461ef041d9fd5d` |

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

`I approve Candidate A compilation sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406 and package sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025.`
