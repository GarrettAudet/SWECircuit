# Revision 47 Test Plan

## Causal Checks

- Resolve mixed-case Windows shell input through native realpath.
- Require exact equality between effective npm script shell and bound shell path.
- Report only mismatched field names when authority differs.

## Integrated Checks

- Combined 53-test release suite.
- Direct copied-production lifecycle.
- Exact committed copied-production lifecycle.
- Complete repository verifier.
- One exact canonical gate.
- Fresh three-domain R2 and hosted CI.

## Current Evidence

The release suite passes 53/53. The direct copied lifecycle evidence is 138,102 bytes at `sha256:e593a6df55090b2249856e86dbc2687dd20b8f78b300dc53f2c7a3eb20ca93cc`.