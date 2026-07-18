# V11 Dogfood Attempt 21

## Status

Retired before integration. Audit B passed, Candidate A launched under exact cross-package authorization, and the compiled review wave correctly returned one `REVISE` and one `FIX` that blocked the integration specialist.

## Bound Identities

- Candidate compilation: `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266`.
- Candidate package: `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`.
- Audit B compilation: `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c`.
- Audit B package: `sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90`.

## Execution Results

- Audit B binder: `PASS`; all 10 immutable candidate artifacts authenticated.
- Audit B semantic reviewer: `PASS`; all 203 partitions, selection, schedule, authority, evidence independence, digests, and package files reproduced.
- Candidate preparation: `PASS`; exact launch controls and 36 assigned source bindings authenticated.
- Product/API review: `PASS`.
- Security/trace review: `PASS`.
- Algorithm/lifecycle review: `REVISE`; caller object-key order could change rendered bytes and `packageDigest` while preserving the canonical compilation identity.
- Release verification: `FIX`; all preceding gates and 353/353 kernel tests passed, but the 119-case checker matrix exceeded the 900.5-second host timeout.
- Integration: not launched.

## Causal Corrections

- Replaced spread-based nested-record normalization with explicit field-order reconstruction.
- Extended permutation coverage to compare ordinary serialized compilation and the complete rendered package.
- Reworked the checker regression harness to exclude feature evidence from fixtures, use copy-on-write hard links, reuse a four-slot fixture pool, and run four isolated checker processes concurrently.

## Correction Evidence

- Focused compiler suite: 38/38 passed.
- Source-level kernel suite: 353/353 passed.
- Format, lint, typecheck, and build passed.
- Complete checker regression matrix: 119/119 passed in 213.3 seconds.

Revision 22 must bind these corrected source bytes into a fresh GoalContract, compilation, rendered package, Audit B package, approval records, and independent execution trace. No revision-21 approval or PASS carries forward.
