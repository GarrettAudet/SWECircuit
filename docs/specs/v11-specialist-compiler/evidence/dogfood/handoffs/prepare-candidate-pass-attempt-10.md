# V11 Candidate Preparation Handoff: Attempt 10

## Outcome

`PASS`

## Candidate Binding

- Goal revision: 10.
- Compilation: `sha256:b5afa1bc523606956225516689dcda762758852aa1bcbd9463dd4b5ad9b923b4`.
- Package: `sha256:0c367895e0194b2fb543494c6df3c1172987eb457a4f1d19ab27d7fb5c600480`.
- Repository sources: 34 declared, 34 verified, 34 matched, zero mismatches.
- `context.spec`: exactly one 10,082-byte binding to the immutable pre-integration snapshot, digest `sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5`.

## Evidence Duties

- `evidence.algorithm-candidate`: `PASS`.
- `evidence.product-candidate`: `PASS`.
- `evidence.security-candidate`: `PASS`.

## Verification

`--check-evidence`, approval, manifest, package compilation, rendered contract, and both trusted digests matched reconstruction. The specialist confirmed that the correction structurally validates Git attributes before filtered hashing, rejects active `filter`, `working-tree-encoding`, and `ident`, and carries direct regression sources for side effects, malformed records, LF/CRLF, bare CR, ident, and binary fallback.

## Assumptions And Risks

The external digest pair is trusted. Immutable means byte-and-digest-bound pre-integration input, not an operating-system immutability claim. Regression sources were inspected but not executed in this lane; executable proof belongs to release verification.

Agent thread: `019f6ab7-223f-7b72-94bb-d823778990af`.
