# V11 Dogfood Attempt 12

## Outcome

`FIX`.

## Candidate

- Goal revision: 12.
- Compilation: `sha256:9e5d2f7304b9100b40c1d96ad59a23c8dce73161386d478b2dda249ec921b1e5`.
- Package: `sha256:ed08d9b5d5e4c4f6195b1d0b86a01358b63e8fa0b6ca4d882982da96c589004a`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Evidence

- Preparation: 34/34, `PASS`.
- Algorithm/lifecycle: 14/14, `PASS` after a host liveness conclude request.
- Product/API: 12/12, `FIX` for the unexecuted, approval-inconsistent typed installed consumer.
- Security/trace: no terminal handoff before host closure; no conclusion claimed.
- Release: 19/19 contexts and substantial partial gates passed, but the complete matrix was stopped after candidate invalidation.

## Learning

Typechecking an example does not verify its runtime approval binding. A user-facing typed consumer must be emitted and executed against its own canonical goal and externally retained expectation. Revision 12 is not eligible for integration or merge.

