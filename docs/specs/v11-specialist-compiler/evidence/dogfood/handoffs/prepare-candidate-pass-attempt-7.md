# V11 Candidate Preparation Handoff: Attempt 7

## Outcome

`PASS` with a material follow-up risk.

## Candidate Binding

- Goal revision: 7.
- Compilation: `sha256:a53f5dc0f91267643de2a2aa38acfc39e7b6a8f36140864ab05d65abc4c6f66f`.
- Package: `sha256:83ab08aa6a50a9c7a5a912bcc982db56f88710d0b6d63b40c8297c96f7e62179`.
- Repository sources: 34 declared, 34 verified, 34 matched, zero mismatches.
- `context.spec`: exactly one binding to `path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md`.
- Manifest, external approval, derived package root, compilation file, and specialist contract bindings matched.

## Evidence Duties

- `evidence.algorithm-candidate`: `PASS`.
- `evidence.product-candidate`: `PASS`.
- `evidence.security-candidate`: `PASS`.

## Material Risk

The specialist found that the early raw-equals-filtered path proves clean-filter identity but does not prove the smudge half of a checkout round trip. In particular, LF bytes under `eol=crlf` can hash unchanged during clean filtering and then become CRLF during checkout. An active custom smudge filter can create the same class of gap.

## Follow-Up

Inspect Git attributes on every bound path, reject active custom filters or working-tree encodings, enforce canonical bytes for explicit `eol=lf` and `eol=crlf`, then recompile before independent review.

Agent thread: `019f6a8b-4bcc-7cf1-9365-ffcbed86b403`.
