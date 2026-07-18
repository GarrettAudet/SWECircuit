# V11 Dogfood Attempt 13

## Outcome

`FIX`.

## Candidate

- Goal revision: 13.
- Compilation: `sha256:e285fa743d83da8c340749e96daba48baaf5499ca08fea349d262e890314071b`.
- Package: `sha256:4641f6d3e61f40d96a11106cb40d55268a9535688b1e5aa677b41fa0381d3e65`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Evidence

- Preparation: 34/34, `PASS`.
- Algorithm/lifecycle: 14/14, `PASS`.
- Product/API: 12/12 and 10/10 matrix, `PASS`.
- Security/trace: two host-liveness stalls followed by 32/32 and `FIX` for an unauthenticated executed-consumer fixture.
- Release: 19/19 contexts, 60/60 focused tests, 335/335 canonical tests, executed installed TypeScript host, and complete checker matrix, `PASS` within the executable lane.

## Learning

Execution is not traceable merely because a process exits successfully. The exact program being executed must be inside the reviewer's authenticated context, and the wrapper must assert structured evidence from that program. Revision 13 is not eligible for integration or merge.

