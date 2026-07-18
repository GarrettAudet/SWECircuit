# V11 Dogfood Attempt 11

## Outcome

`FIX`.

## Candidate

- Goal revision: 11.
- Compilation: `sha256:4bb8eae6b779ebf666f8c9f156fb444dd0631a6e4b5c667dec53ee3327d5e89f`.
- Package: `sha256:a33c52c252df33e01224f07ed4bef10b1ed7615760b173793487caae2ee4b377`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Evidence

- Preparation: 34/34, `PASS` after correcting an external-host prompt that exceeded the compiled duty.
- Product/API: 12/12, `PASS`.
- Algorithm/lifecycle: 14/14, `PASS`.
- Security/trace: 32/32, `FIX` for Git attribute sentinel ambiguity.
- Release: 19/19 contexts, 59/59 focused tests, 334/334 canonical tests, and template checker `PASS`; stopped before the long matrix and final replay after candidate invalidation.

## Learning

Rendered sentinel text is not proof of Git attribute absence. A context guard must preserve attribute presence, reject transform occurrences before hashing, and require an explicit checkout EOL policy. Revision 11 is not eligible for integration or merge.

