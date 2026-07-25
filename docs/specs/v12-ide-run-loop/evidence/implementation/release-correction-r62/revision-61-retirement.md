# Revision 61 Retirement

## Identity

- Commit: `f0fec5cf01907f463ea1f129f2c7a1f8b8029ce5`.
- Tree: `53f7fbcd28515cf3defd353ca1a341db51deb5e9`.
- Hosted run: `30152068758`.

## Passed Evidence

- Exact committed copied lifecycle: 2 pass, 0 fail.
- Exact committed full verifier: `pass`.
- Hosted template plus Linux, Windows, and macOS Node 22/24 matrix: 7 pass, 0 fail.
- Focused release pair: 65 pass, 0 fail.
- Independent source, product, and traceability reviews: `pass`.

## Retirement Cause

The non-consuming exact-candidate rehearsal executed the same canonical verifier from a
blob-only candidate context. Its copied-production lifecycle reached the nested canonical
gate, which did not complete before the fixed 15-minute bound and reported timeout. The
enclosing lifecycle test completed in 950,166 ms. Revision 61 did not preserve the nested
result object, so no stronger internal-progress or eventual-pass claim is made.

## Gate Disposition

Revision 61's one-shot canonical gate was never invoked. Its candidate-addressed evidence
slot remains absent. The candidate is retired because the exact-candidate rehearsal failed.

## Route

`verify -> diagnose -> fix -> Revision 62`
