# V11 Dogfood Attempt 20

## Outcome

Revision 20 is retired. Candidate A passed preparation, algorithm/lifecycle review, and product/API review. Security/trace returned `REVISE` for handoff privacy, metadata-control, and path-scalar gaps. Release verification returned `FIX` after final source freshness detected the causal correction. Integration did not launch.

## Immutable Identities

- Candidate A compilation: `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406`
- Candidate A package: `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025`
- Audit B compilation: `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608`
- Audit B package: `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`

## Decisive Handoffs

- Preparation `PASS`: 13,034 bytes, `sha256:88183afdbb1926dc8add5297f5d4d6e5d7a969cceb496b3830c7b82c602f905c`
- Algorithm/lifecycle `PASS`: 14,546 bytes, `sha256:597f854db3b74a7988fca4115c8670af4979d1ec54dbf9019e924b13c5b716a4`
- Product/API `PASS`: 16,691 bytes, `sha256:d10c0dd8f28f154d2f5b1df74d3578683cb9220103062877e14dc1acd4e5e5c1`
- Security/trace `REVISE`: 13,045 bytes, `sha256:5bae479434daf76448273df67860d90639bf73239dcda19eb9dfd5c77543dc9b`
- Release `FIX`: 12,084 bytes, `sha256:3910167d78940d64bed31bb7d4d968bfbc0f26910eecb759c7903e614ba0cc2a`

The archived approvals authorize only the exact retired digest pairs above. They cannot authorize revision 21 or any later candidate.
