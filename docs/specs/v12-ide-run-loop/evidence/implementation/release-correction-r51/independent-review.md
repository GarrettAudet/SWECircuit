# Revision 51 Independent Pre-Freeze Review

## Outcome

`fix`

## Findings

- P0: an npm-11-only regression still rejected supported npm 10.
- P1: libc detection ran outside the owned-resource cleanup boundary.
- P1: the final receipt was written directly and could become visible partially.
- P1: Windows could bind one npm launcher while executing another resolved from `PATH`.

## Reviewed Identities

- Gate: 66,677 bytes, `sha256:2afa7be4f9beff45bc0bad348174e6b33863b60d9f95b2e14a01179ea405e118`.
- R2: 154,760 bytes, `sha256:c8f0cb87a185d36a1338cf939c82e9749fda41ac44fcee0e96cb7714de3ede03`.
- Lifecycle helper: 85,092 bytes, `sha256:f4f5abaf065db521a2845f9605587226f11c109900bbf2dddfc30a0963718f2a`.
- Gate test: 54,483 bytes, `sha256:60515493d645b17902d6adf59c2b43d27ca0757c9829a43228cdfb2e6cd1ce75`.

## Disposition

Revision 51 is retired before commit and before any one-shot gate. Revision 52 closes all four findings.
