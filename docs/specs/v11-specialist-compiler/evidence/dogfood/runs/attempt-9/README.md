# V11 Dogfood Attempt 9

## Outcome

`FIX`

## Candidate

- Goal revision: 9.
- Compilation: `sha256:93deaeb96c0565c5e83c5d32037b88935462577c7ca7399fc8bf47e8b20156fe`.
- Package: `sha256:2cc9dff1413b034cac16690cc264c6a96a52770c3730a943319675f435dbcc59`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Review Outcome

- Preparation: `PASS`; 34/34 source tuples and the immutable spec binding matched.
- Product/API: `PASS`; 12/12 contexts, no findings.
- Algorithm/lifecycle: initial host-scope `FIX`, then `CORRECTED_PASS`; 14/14 contexts and all algorithm recomputations passed. Undeclared dependency paths came from the host prompt, not the blueprint.
- Security/trace: `FIX`; 32/32 contexts matched, but active filters could run before rejection, Git `ident` was omitted, and attribute records were not parsed strictly enough.
- Release: intentionally stopped after 19/19 pre-command context checks when security invalidated the candidate. Partial evidence is not approval.

The integration owner's local canonical preflight passed 330/330 tests, both dogfoods, package inspection, and the offline consumer. That green suite did not override independent security review.

## Routing

Revision 10 reads and validates attributes before filtered hashing, rejects `ident`, validates exact `check-attr` records and terminal framing, adds adversarial regressions, and repeats the affected review and release lanes against a new digest pair.
